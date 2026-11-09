---
name: run-and-report
description: Reads a JIRA bug ticket description, replays the reproduction steps via MCP Playwright, delivers a verdict (CONFIRMED / FIXED / NOT REPRODUCIBLE) and adds a comment on the ticket (posted automatically with the proof when the fix is validated, after user confirmation otherwise).
---

# Command : /run-and-report

## Usage

```
/run-and-report --jira {jira_url} --url {app_url}
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--jira`  | Yes      | Full JIRA ticket URL (e.g. `https://onclusive.atlassian.net/browse/GEO-539`) |
| `--url`   | Yes      | Application base URL (e.g. `https://staging-geo.onclusive.com/geo`) |

## Example

```
/run-and-report --jira https://onclusive.atlassian.net/browse/GEO-539 --url https://staging-geo.onclusive.com/geo
```

## Execution Workflow

### Phase 1 — Read the JIRA ticket

Fetch the ticket via REST API:
```
GET {JIRA_URL}/rest/api/3/issue/{ISSUE_KEY}
Authorization: Basic base64(JIRA_EMAIL:JIRA_TOKEN)
```

Extract the following fields:
- `summary` : bug title
- `description` : full description (Atlassian Document Format → extract plain text)
- `priority.name` : priority (Blocker / Critical / High / Medium / Low)
- `status.name` : current ticket status
- Key sections inside the description:
  - **Steps to Reproduce** : ordered list of actions to replay
  - **Expected Result** : what the app should do
  - **Actual Result** : what the app does instead (the bug)
  - **Environment** : observed URL, environment, browser

Print in chat:
```
Ticket read : GEO-XXX
Title       : [bug title]
Priority    : [priority]
Status      : [status]

Steps to Reproduce:
  1. [step 1]
  2. [step 2]
  ...

Expected : [expected behavior]
Actual   : [observed behavior / the bug]
```

### Phase 2 — Interpret the steps

Analyze the steps to reproduce and identify:
- The starting URL (if different from `--url`)
- Actions to perform (navigation, clicks, filters, form input)
- The verification condition (what should or should not appear)
- Required test data (brand name, market, UUID, snapshot, etc.)

If any information is missing or ambiguous (e.g. UUID not specified, filter label unclear), ask the user before starting execution.

### Phase 3 — Execute via MCP Playwright

Replay the steps in real time using available MCP tools:

| MCP Tool | Usage |
|----------|-------|
| `mcp__playwright__browser_navigate` | Navigate to a URL |
| `mcp__playwright__browser_snapshot` | Inspect the DOM (accessibility tree) |
| `mcp__playwright__browser_click` | Click an element |
| `mcp__playwright__browser_type` | Type text into an input |
| `mcp__playwright__browser_hover` | Hover over an element (tooltips) |
| `mcp__playwright__browser_wait_for` | Wait for a selector or a fixed delay |
| `mcp__playwright__browser_evaluate` | Run JavaScript in the page |
| `mcp__playwright__browser_take_screenshot` | Capture a screenshot |
| `mcp__playwright__browser_press_key` | Press a keyboard key |
| `mcp__playwright__browser_select_option` | Select an option from a dropdown |

#### Authentication (if required)
If navigation triggers an Auth0 login:
1. Read `GEO_USER_EMAIL` and `GEO_USER_PASSWORD` from `.env`
2. Fill `input[name="username"]` → click "Continue"
3. Fill `input[name="password"]` → click "Continue" / "Log in"
4. Wait for the redirect back to the app

**Account per role** — pick the account from the TC precondition / data (role named in the TC, e.g. "EDITOR user", "READER user", "PQL account"); default = main account:

| Role | Email / password variables in `.env` |
|---|---|
| Main account (SUPER_ADMIN) | `GEO_USER_EMAIL` / `GEO_USER_PASSWORD` |
| EDITOR | `GEO_USER_EDITOR_EMAIL` / `GEO_USER_EDITOR_PASSWORD` |
| READER | `GEO_USER_READER_EMAIL` / `GEO_USER_READER_PASSWORD` |
| PQL / Lite (upsell page) | `GEO_USER_PQL_EMAIL` / `GEO_USER_PQL_PASSWORD` |

Switching account = log out, log in with the other account, check `GET /geo/api/v1/auth/me` (role, organisation, language); never change that account's language unless the TC asks; log back in with the main account at the end. No plain ADMIN account is known (the main one is SUPER_ADMIN). Never print a password.

**Organisation switch (user rule 2026-11-09)** — allowed without asking when the data of a TC or a bug lives in another
organisation (e.g. "GEO Stress Test 2026-10"): note `GET /geo/api/v1/auth/me` first, switch with the UI (or replay the
exact request the UI sends), read / test, then switch back to **QA-GEO** at the end — even after a failure — and check
`/auth/me` (org QA-GEO, language en-GB). In any organisation other than QA-GEO, **creating, updating or deleting data**
(analysis, run, category, prompt, Manage Scope, settings, JDD set-up or cleanup) needs the user's explicit OK first.
Report the switch in one line.


#### Mandatory screenshots
Take a screenshot at each key step:
- `bug_{ISSUE_KEY}_step{N}.png` for each reproduction step — **local trace only, never posted to Jira**
- `bug_{ISSUE_KEY}_final.png` — **the proof screenshot**: the single image that shows the verdict
  (bug present or absent). It is the only screenshot posted to Jira.
- Output folder: `.claude/Data/output/reports/screenshots-{ISSUE_KEY}/`

The proof screenshot must, on its own, let a reader see the verdict:
- Capture the exact element the Expected / Actual Result is about (scroll it into view, expand the list,
  open the panel/tooltip) — not a generic page view
- If the proof needs a highlight, frame the relevant element in red — do NOT add a note such as "(red frame = QA annotation)" in the comment (user rule 2026-10-22)
- If the evidence is ephemeral (tooltip, dropdown, modal), capture it while it is visible

### Phase 4 — Verdict

Compare the observed state against the **Expected Result** and **Actual Result** from the ticket:

| Verdict | Condition |
|---------|-----------|
| **BUG CONFIRMED** | Observed behavior matches the Actual Result in the ticket (bug still present) |
| **BUG FIXED** | Observed behavior matches the Expected Result (bug is resolved) |
| **NOT REPRODUCIBLE** | Unable to follow the steps (missing data, different UI, environment unreachable) |

Print in chat:
```
Verdict : BUG CONFIRMED / BUG FIXED / NOT REPRODUCIBLE

Observation:
  Expected : [expected result from ticket]
  Observed : [what was seen in the app]

Proof screenshot (the only one posted to Jira):
  - .claude/Data/output/reports/screenshots-{ISSUE_KEY}/bug_{ISSUE_KEY}_final.png
Step screenshots (local trace only):
  - .claude/Data/output/reports/screenshots-{ISSUE_KEY}/bug_{ISSUE_KEY}_step{N}.png
```

### Phase 5 — JIRA comment

> **BUG FIXED → always post and move to Passed QA, no confirmation (user rule 2026-10-29).** When the verdict is **BUG FIXED**
> (the Expected Result is clearly observed and the proof screenshot shows it), post the verdict comment
> **with the proof screenshot embedded** right away, following the steps below, then report the link in one line.
> No tag (nothing is expected from anyone). Reply in the dev's thread if the ticket holds a fix note to answer.
> Then move the ticket to **Passed QA** (after the comment, never before): `GET /rest/api/2/issue/{KEY}/transitions`,
> pick the transition whose `to.name` is "Passed QA" (ids differ per workflow — never hard-code), POST it (expect 204)
> and check the status via GET. If no such transition exists, report it and leave the status as is.
>
> Any other verdict (BUG CONFIRMED, NOT REPRODUCIBLE, partial fix) or any doubt → show the draft and ask first.

> The thread, tag and verification rules are in `/comment-jira-bug` (`.claude/commands/comment-jira-bug.md`):
> when the ticket already has a comment to answer, reply in its thread (`parentId` = last comment, tag its author)
> instead of adding a new comment; comments to the PO tag him with a Jira mention.

For a verdict other than BUG FIXED, ask the user:
```
Do you want to add this verdict as a comment on ticket GEO-XXX?
  [Y] Yes — post the comment with the proof screenshot embedded
  [N] No  — stop here
```

If the verdict is BUG FIXED, or the user confirms, follow these steps **in order**:

> **MANDATORY — only the proof screenshot is posted, rendered as an image inside the comment body.**
> - Post **only** `bug_{ISSUE_KEY}_final.png` (the proof). Never upload or embed the `step{N}`
>   screenshots — they are a local trace of the replay, not evidence for the ticket.
> - Do NOT add a "Steps replayed" section to the comment — the ticket already holds the steps.
>   Verdict, Date, Environment, Expected/Observed and the captioned proof are enough.
> - Mentioning the file name only (e.g. "Screenshot : xxx.png (attached to issue)") is NOT acceptable:
>   the proof must render as an image, preceded by a short caption stating what it proves.
> - Exception: post another image only if the user explicitly asks for it.

#### Step 1 — Upload the proof screenshot as attachment

The ticket may already hold attachments with the same file name from a previous run — Jira
then cannot tell which one the comment refers to. Upload a **copy with a date suffix**
(`bug_{ISSUE_KEY}_final_YYYYMMDD.png`), made in the scratchpad / a temp dir (never in the repo).

One curl call, response saved to `.tmp-jira/`. On Windows (Git Bash), pass the file
path to `-F` in Windows form (`C:/Users/...`), not `/c/Users/...` — mingw curl does not translate it
and silently uploads nothing:

```bash
curl -s -X POST -H "Authorization: Basic $AUTH" -H "X-Atlassian-Token: no-check" \
  -F "file=@{tmp_dir}/bug_{ISSUE_KEY}_final_{YYYYMMDD}.png;type=image/png" \
  "{JIRA_URL}/rest/api/3/issue/{ISSUE_KEY}/attachments" \
  -o .tmp-jira/{issue_key}-att-final-{YYYYMMDD}.json
```

From the response array extract:
- `id` → numeric attachment ID (e.g. `761476`)
- `mediaApiFileId` → UUID used to embed in ADF — **usually absent on this Jira instance** (see Step 2b)

#### Step 2a — Post comment with the proof embedded via ADF mediaSingle (if `mediaApiFileId` present)

Build the ADF comment body as a JS object and write it to a temp file, then post it with `--data-binary @file`. Include the screenshot using a `mediaSingle` node **after** the verdict text:

```json
{
  "body": {
    "type": "doc",
    "version": 1,
    "content": [
      {
        "type": "paragraph",
        "content": [
          { "type": "text", "text": "QA Verdict : ", "marks": [{ "type": "strong" }] },
          { "type": "text", "text": "BUG CONFIRMED / BUG FIXED / NOT REPRODUCIBLE", "marks": [{ "type": "strong" }] }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          { "type": "text", "text": "Date : {YYYY-MM-DD}" },
          { "type": "hardBreak" },
          { "type": "text", "text": "Environment : {app_url}" }
        ]
      },
      {
        "type": "paragraph",
        "content": [{ "type": "text", "text": "Observation :", "marks": [{ "type": "strong" }] }]
      },
      {
        "type": "bulletList",
        "content": [
          { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Expected : {expected result}" }] }] },
          { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Observed : {what was seen}" }] }] }
        ]
      },
      {
        "type": "paragraph",
        "content": [{ "type": "text", "text": "Reproduction executed via MCP Playwright." }]
      },
      {
        "type": "mediaSingle",
        "attrs": { "layout": "center" },
        "content": [
          {
            "type": "media",
            "attrs": {
              "id": "{mediaApiFileId}",
              "type": "file",
              "collection": "jira-attachment"
            }
          }
        ]
      }
    ]
  }
}
```

Put a caption paragraph (what the screenshot proves) right before the single `mediaSingle` node.

#### Step 2b — Fallback: v2 API with wiki markup (if `mediaApiFileId` is absent — the usual case)

Post via the **v2** endpoint, which accepts wiki markup and renders attachments inline by file name:

```
POST {JIRA_URL}/rest/api/2/issue/{ISSUE_KEY}/comment
Content-Type: application/json
{ "body": "*QA Verdict : BUG FIXED*\nDate : ...\nEnvironment : ...\n\n*Observation :*\n* Expected : ...\n* Observed : ...\n\nReproduction executed via MCP Playwright.\n\n*Proof — {what it shows}*\n!bug_{ISSUE_KEY}_final_{YYYYMMDD}.png|width=800!" }
```

- The name inside `!...!` must be the **exact uploaded file name** (with date suffix).
- Build the JSON with a node script written to a file, post with `--data-binary @file`.

#### Step 3 — Verify the images are embedded

`GET {JIRA_URL}/rest/api/3/issue/{ISSUE_KEY}/comment/{comment_id}` → the ADF body must contain exactly
one `media` node (the proof). If not, delete the comment you just created and retry with the other
method (2a ↔ 2b).

#### Step 4 — Confirm in chat

```
Comment posted on GEO-XXX — proof screenshot embedded in comment body (verified)
Link : https://onclusive.atlassian.net/browse/GEO-XXX?focusedCommentId={comment_id}
```

## Important Rules

- **Never invent steps**: if the description is incomplete, ask the user before executing
- **Never mark BUG FIXED** if the observed behavior does not match the Expected Result
- **Always take the proof screenshot** (`final`) before delivering the verdict — it must show the verdict on its own
- **Only the proof screenshot goes to Jira** — step screenshots stay local
- **BUG FIXED → always post** the comment with the embedded proof screenshot, without asking (user rule 2026-10-29); then move it to Passed QA
- **Confirmation is mandatory** before posting any other verdict (CONFIRMED, NOT REPRODUCIBLE, partial) or when in doubt
- **Read `.env`** for JIRA credentials (`JIRA_URL`, `JIRA_TOKEN`, `JIRA_EMAIL`) — never hardcode them

## Agent

`qa-run-and-report-agent` (see `.claude/agents/qa-run-and-report-agent.md`)

## Dispatch (MANDATORY)

When this command is triggered:
1. Use `Agent` with `subagent_type: qa-run-and-report-agent`
2. If the agent is not available → use `general-purpose` passing the full content of `.claude/agents/qa-run-and-report-agent.md` as instructions
