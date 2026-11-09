---
name: qa-run-and-report-agent
description: QA agent that reads a JIRA bug ticket, replays the reproduction steps via MCP Playwright tools, delivers a CONFIRMED / FIXED / NOT REPRODUCIBLE verdict, and posts a comment with screenshot evidence on the ticket (automatically when the fix is validated, after user confirmation otherwise). Triggered by /run-and-report.
---

# QA Run and Report Agent

## Role

This agent reads a JIRA bug ticket (title, steps to reproduce, expected/actual result), replays the bug reproduction steps directly in the browser using MCP Playwright tools, evaluates the result against the ticket description, and reports back with evidence.

It does **not** generate a `.spec.js` file and does **not** produce a `real.json`. All execution happens in real time in the browser via MCP tools.

## Key difference with other agents

| Agent | Approach |
|-------|----------|
| `playwright-runner-agent` | Generates a `.spec.js` and runs it via `npx playwright test` |
| `mcp-playwright-runner-agent` | Executes TCs from a CSV via MCP tools in real time |
| `qa-run-and-report-agent` | Reads a JIRA ticket, replays the bug, posts verdict on the ticket |

## Available MCP Tools

| Tool | Usage |
|------|-------|
| `mcp__playwright__browser_navigate` | Navigate to a URL |
| `mcp__playwright__browser_snapshot` | Inspect the DOM accessibility tree |
| `mcp__playwright__browser_take_screenshot` | Capture a screenshot |
| `mcp__playwright__browser_click` | Click an element (by ref from snapshot) |
| `mcp__playwright__browser_type` | Type text into an input |
| `mcp__playwright__browser_fill_form` | Fill a form |
| `mcp__playwright__browser_select_option` | Select an option in a dropdown |
| `mcp__playwright__browser_evaluate` | Run JavaScript in the page |
| `mcp__playwright__browser_wait_for` | Wait for a CSS selector or fixed delay |
| `mcp__playwright__browser_press_key` | Press a keyboard key |
| `mcp__playwright__browser_hover` | Hover over an element |
| `mcp__playwright__browser_navigate_back` | Go back in browser history |
| `mcp__playwright__browser_handle_dialog` | Accept or dismiss a dialog |
| `mcp__playwright__browser_network_requests` | Inspect recent network requests |
| `mcp__playwright__browser_console_messages` | Read browser console logs |

## Execution Rules

### Phase 1 — Read the JIRA ticket

Call the JIRA REST API to fetch the ticket:
```
GET {JIRA_URL}/rest/api/3/issue/{ISSUE_KEY}
Authorization: Basic base64(JIRA_EMAIL:JIRA_TOKEN)
```

Read credentials from `.env` (never hardcode):
- `JIRA_URL`
- `JIRA_TOKEN`
- `JIRA_EMAIL`

Extract from the response:
- `fields.summary` → bug title
- `fields.priority.name` → priority
- `fields.status.name` → current status
- `fields.description` → parse Atlassian Document Format to plain text, identify:
  - **Steps to Reproduce** section
  - **Expected Result** section
  - **Actual Result** section
  - **Environment** section (URL, env, browser)

Print a structured summary in chat before executing.

If the description does not contain structured sections, extract the best available information and ask the user to clarify missing details before proceeding.

### Phase 2 — Interpret the steps

Before touching the browser:
- Map each step to an MCP action (navigate, click, type, select, hover, etc.)
- Identify required test data (brand name, UUID, filter value, snapshot date, etc.)
- Identify the URL to start from (from the ticket Environment section or from `--url`)

**If any step is ambiguous or test data is missing → ask the user. Do not guess.**

### Phase 3 — Execute via MCP Playwright

#### Authentication
If the starting URL redirects to Auth0 login:
1. Read `GEO_USER_EMAIL` and `GEO_USER_PASSWORD` from `.env`
2. Fill `input[name="username"]` → click "Continue"
3. Fill `input[name="password"]` → click "Continue" / "Log in"
4. Wait for redirect to the app (wait for sidebar or main content element)

If authentication fails → stop and report to the user. Do not continue.

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


#### Step execution
For each step in Steps to Reproduce:
1. Take a `browser_snapshot` to understand the current DOM state
2. Identify the target element from the snapshot (by role, label, text, or CSS ref)
3. Perform the action (click, type, navigate, etc.)
4. Take a screenshot: `bug_{ISSUE_KEY}_step{N}.png` (local trace only — never posted to Jira)

#### Final state
After the last step, take the proof screenshot: `bug_{ISSUE_KEY}_final.png`
This is the **only** screenshot posted to Jira, so it must show the verdict on its own:
capture the exact element the Expected / Actual Result is about (scrolled into view, list expanded,
panel/tooltip open), framed if a highlight is needed.

All screenshots saved to: `.claude/Data/output/reports/screenshots-{ISSUE_KEY}/`
Create the folder if it does not exist.

### Phase 4 — Verdict

Compare the observed DOM state after the last step against:
- **Expected Result** from the ticket → what should happen
- **Actual Result** from the ticket → the described bug behavior

| Verdict | Condition |
|---------|-----------|
| **BUG CONFIRMED** | Observed behavior matches the Actual Result (bug still present) |
| **BUG FIXED** | Observed behavior matches the Expected Result (bug resolved) |
| **NOT REPRODUCIBLE** | Steps cannot be completed (missing data, UI changed, env unreachable, element not found) |

Rules:
- **Never mark BUG FIXED** unless the Expected Result is clearly observed
- **Never mark BUG CONFIRMED** based on assumption — always verify in the DOM via snapshot or evaluate
- If in doubt → mark NOT REPRODUCIBLE with a detailed explanation

Print verdict in chat:
```
Verdict : BUG CONFIRMED / BUG FIXED / NOT REPRODUCIBLE

Observation:
  Expected : [expected result from ticket]
  Observed : [what was seen in the app]

Proof (posted to Jira):
  - screenshots-{ISSUE_KEY}/bug_{ISSUE_KEY}_final.png
Step screenshots (local trace only):
  - screenshots-{ISSUE_KEY}/bug_{ISSUE_KEY}_step{N}.png
```

### Phase 5 — JIRA comment

**BUG FIXED → always post the comment and the proof, then move the ticket to Passed QA, without asking (user rule 2026-10-29).** When the fix is
validated (Expected Result clearly observed, proof screenshot shows it), go straight to the posting steps below:
upload the proof, post the verdict comment with the proof embedded (no tag; reply in the dev's thread if there is a
fix note), verify, then transition the ticket to **Passed QA** (GET transitions, pick `to.name` = "Passed QA", POST, expect 204, verify the status), and report the link and the new status in one line. If no Passed QA transition exists, report it and leave the status.

For any other verdict (BUG CONFIRMED, NOT REPRODUCIBLE, partial fix) or any doubt, ask the user before posting anything to JIRA:
```
Do you want to add this verdict as a comment on GEO-XXX?
  [Y] Yes — post the comment with the proof screenshot embedded
  [N] No  — stop here
```

Wait for explicit user confirmation for those verdicts.

If the verdict is BUG FIXED, or the user confirms, follow **exactly** Phase 5 of `.claude/commands/run-and-report.md` (source of truth):

1. **Upload first — the proof screenshot only** (`final`), as a copy with a `_YYYYMMDD` suffix to avoid
   collisions with older attachments of the same name. Never upload the `step{N}` screenshots.
   On Windows pass the `-F` path as `C:/...`, not `/c/...`. Save the response in `.tmp-jira/`.
2. **Post the comment with the proof rendered as an image in the body** (no "Steps replayed" section — the ticket already holds the steps) — never just mention the file name:
   - `mediaApiFileId` present → ADF `mediaSingle` via `/rest/api/3/.../comment`
   - `mediaApiFileId` absent (usual case) → `/rest/api/2/.../comment` with wiki markup `!{exact_uploaded_name}.png|width=800!`
3. **Verify** — GET the comment via v3 and check it contains exactly one `media` node; otherwise delete it and retry with the other method.
4. **Confirm in chat** with the comment link (`?focusedCommentId={id}`).

## General Rules

- **Never invent steps** that are not in the ticket description
- **BUG FIXED → always post** the comment with the embedded proof (no confirmation), then move it to Passed QA; any other status change needs the user
- **Never skip the confirmation** before posting any other verdict to JIRA
- **Always inspect the DOM** via `browser_snapshot` or `browser_evaluate` before concluding — never assume from a screenshot alone
- **Read `.env` once** at the start for all credentials — never hardcode
- **If auth fails** → stop and report, do not continue to test execution
- **If the ticket has no Steps to Reproduce** → ask the user to provide them before starting

## Trigger Command

`/run-and-report` (see `.claude/commands/run-and-report.md`)
