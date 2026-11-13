---
name: create-bugs
description: Analyses failed tests and creates corresponding bug tickets in Jira and Quality Plus. Deduplicates existing bugs, applies severity classification and attaches evidence. Trigger with /create-bugs after /export-results, or /create-bugs statique-bugs to generate bugs from manual screenshots.
---

<command-name>create-bugs</command-name>

# Skill : Bug Creation

## Trigger Modes

Two modes depending on the bug source:

### Mode A — `/create-bugs` (default, from Playwright tests)

Bug source: `test-results-epic{ID}-real.json` (auto failures produced by `/run-tests` + `/export-results`).

Flow:
1. Load `FAILED` results
2. Calculate severity, deduplicate against existing bugs
3. Build tickets and **create them directly** in Jira + Quality Plus
4. Attach error screenshot, save the report

→ No user confirmation step (automated pipeline after `/export-results`).

### Mode B — `/create-bugs statique-bugs` (from manual evidence: PNG and/or videos)

Bug source: **PNG** and/or **video** files (`.mp4`, `.webm`, `.mov`, `.gif`) in `.claude/Data/output/bugs/statique-bugs/`. Both types can coexist in the same folder — each file = one bug.

Flow:
1. **List all files** in the `statique-bugs/` folder (ignore any `_mapping.json`)
2. For each file, branch by type:
   - **PNG** → read the image (multimodal capability) and visually extract: page concerned, feature, element annotated in red, brand/market tested
   - **Video** → NEVER analyse automatically (cannot read a video). **Explicitly ask the user**: `page` / `feature` / `actual_behavior` / brand-market if relevant. The video will be attached as-is to the Jira ticket.
3. **Ask the user** for fields that cannot be deduced (applies to both types):
   - `story_key` (or label, e.g. `geo-category`)
   - `parent` (Jira Epic, e.g. `GEO-101`)
   - `severity` / `priority`
   - `expected_behavior` for each bug (NEVER infer, see `feedback_static_bug_expected.md`)
   - Actual observed URL if not visible
   - For videos only: `page`, `feature`, `actual_behavior` (since we cannot see them)
4. **Generate a draft** `.claude/Data/output/bugs/bugs_to_create_YYYYMMDD.json` with all fields filled
5. **Present the draft to the user** and **wait for explicit confirmation** before any API call
6. After confirmation: create tickets in Jira (mode B confirmation is MANDATORY, mode A is not)
7. Attach each PNG via REST `/rest/api/3/issue/{key}/attachments`
8. Update the JSON with `jira_key`, `jira_url`, `attachment.jira_attachment_id`

## Common Prerequisites

- Jira environment variables defined (`JIRA_URL`, `JIRA_TOKEN`, `JIRA_EMAIL`, `JIRA_PROJECT_KEY`)
- Every Jira call goes through REST with the token — Jira REST: read `.env` once for `JIRA_URL`, `JIRA_EMAIL`, `JIRA_TOKEN` (never print the token); `curl -u "$JIRA_EMAIL:$JIRA_TOKEN"`. Windows: save every response to `.tmp-jira/` and parse it with `node -e "const j=require('./.tmp-jira/...')"` (no `/dev/stdin`). No Atlassian connector (MCP).
- `JIRA_ASSIGNEE_DEFAULT`: accountId of the default assignee (fallback if no assignee specified)
- `JIRA_ASSIGNEES`: list of available assignees in `DisplayName:accountId` format, comma-separated
  ```
  JIRA_ASSIGNEES=Youssef.AitLaydi:712020:xxx,Assiya.Benramdane:712020:yyy
  ```
  Read this variable at startup to build a `displayName → accountId` lookup
- Quality Plus variables if needed (mode A only)
- For Mode A: `test-results-epic{ID}-real.json` must exist (produced by `/export-results`)
- For Mode B: at least 1 PNG or video file (`.mp4`, `.webm`, `.mov`, `.gif`) in `.claude/Data/output/bugs/statique-bugs/`

## Optional Parameters

- `--severity [level]`: create only bugs of a certain level (default: all)
- `--dry-run`: display bugs that would be created without API calls

## Execution Steps — Mode A (auto)

1. Load `test-results-epic{ID}-real.json` and filter entries with `status === "FAILED"`
2. For each failure, calculate severity:
   - Critical: nominal test failed on main functionality
   - High     : important test failed, workaround difficult
   - Medium   : alternative test failed, workaround possible
   - Low      : edge-case or cosmetic test
3. Search for duplicates in Jira (same component + same error message): `POST /rest/api/3/search/jql` with a JQL on `project`, `issuetype = Bug` and the summary / error text
4. For new bugs, build the complete ticket
5. Create tickets via Jira API
   - Attach only the screenshot of the failing step (type: 'Error'), not the Given/When/Then screenshots
6. Link each bug to its test case in Quality Plus
7. Save the created bugs report

## Default fields — pre-fill the draft, the user only confirms (user rule 2026-10-22)

Pre-fill every draft with these defaults instead of asking each field one by one. Ask only when a default does not apply.

| Field | Default |
|---|---|
| Assignee | by epic: GEO-1209 / GEO-1068 → Abdenasser Aroukhsiss (`712020:c3b70d4b-ff45-4f0b-9feb-9cd412e1d06a`); GEO-1002 / GEO-1069 → Youssef Ait Laydi (`712020:9a3bc993-afd5-4a5e-b7b2-9cc67229f7f2`); otherwise the assignee of the linked story |
| Parent | the epic of the story where the defect was found |
| Link | `Relates` to the story (and to the older story when the defect contradicts a past release, e.g. GEO-1125) |
| Priority | High = a widget / feature does not work or returns an error (e.g. 502); Medium = wrong data or wrong behaviour; Low = wording, layout, accessibility, rounding |
| Production | `Does not exist in Production` + fixVersion 1.3 (33003); if the defect also shows on brand analyses / production: no parent, `Exists in Production` (14346) + fixVersion 1.2 (32374) |
| Fixed fields | component GEO Module (25539), Bug Found By = Automated QA (14349), Capacity = Roadmap Work (20951), Sprint = current sprint (`customfield_10006`), no labels |
| Status | moved to **To Do** right after creation |
| Expected result | PROPOSED from the AC / PO comment / dev rule cited (quote it) and flagged "to confirm"; never invented without a source |
| Evidence | annotated screenshot(s) already attached to the draft (red frame; caption for invisible values) — the user should never have to ask "show me" |

Present all drafts of a session in ONE table (title, priority, link, expected, evidence) and create them after a single OK.

## Execution Steps — Mode B (statique-bugs)

1. List files in `.claude/Data/output/bugs/statique-bugs/` (ignore any companion `_mapping.json`). Accepted extensions: `.png`, `.jpg`, `.jpeg`, `.mp4`, `.webm`, `.mov`, `.gif`.
2. For each file, branch by type:
   - **Image (PNG/JPG)**: read the image (Read tool) and visually extract:
     - Page / feature observed (from visible header, breadcrumb, sidebar)
     - Element annotated in red (defect area)
     - `actual_behavior` (what is observed)
   - **Video (mp4/webm/mov/gif)**: do NOT attempt to analyse it. Ask the user in chat:
     - `page` / `feature` observed
     - `actual_behavior` (what happens in the video)
     - `steps_to_reproduce` (since the video shows a sequence of actions)
   - In both cases, choose the title prefix according to the feature (see `reference_bug_title_prefix.md`):
     - `[GEO-Category]` if Category page
     - `[GEO-Report-list]` if reports list
     - `[GEO-Overview]` if Overview / Dashboard
     - `[GEO-Manage-scope]` if Manage Scope
     - `[Wizard]` if creation wizard
3. **Ask the user** for EACH bug:
   - `story_key` / label
   - `parent` Epic
   - `severity` / `priority`
   - `expected_behavior` (NEVER invent it)
   - `assignee` (default Youssef.AitLaydi unless otherwise requested — confirm)
   - Actual URL if not visible
   - `component` (default `GEO Module` — confirm)
4. Build a draft `bugs_to_create_YYYYMMDD.json` with:
   - Local `bug_id` (`BUG-{prefix}-NNN`)
   - All fields filled as above
   - `attachment.path` pointing to the source file (PNG or video)
   - `attachment.kind`: `"image"` or `"video"` (useful for rendering in Jira description)
   - `status: "to_create"` (will be set to `"created"` after push)
5. **Display the draft to the user** and **explicitly ask for confirmation** before creating in Jira
6. If the user validates:
   a. Create each bug via Jira REST API (`POST /rest/api/3/issue`) with in `fields`:
      - `project`, `issuetype`, `summary`, `description`
      - `parent: {"key": "GEO-XXX"}` — **required if a parent Epic is provided** (otherwise omitted)
      - `priority`, `labels`, `components`, `assignee`
      - **the 3 mandatory custom fields of the GEO project**:
        - `customfield_13220` (Bug Found By): `{"value": "Automated QA"}`
        - `customfield_13208` (Exists in Production?): `{"value": "Does not exist in Production"}`
        - `customfield_17549` (Capacity Utilization): ask the user — possible values: `Keeping the lights on`, `Roadmap Work`, `Client request`
          → If the API returns `"not on the appropriate screen"` for this field, silently remove it and resubmit without it
      - **Sprint** (`customfield_10006`, rule 2026-10-21): the current sprint **"GEO + Digimind Sprint 1"** (id `14578`) → `"customfield_10006": 14578` (a number, not an object).
        Before each creation, check that this sprint is still active (`GET /rest/agile/1.0/sprint/14578` → `state: "active"`, or read `customfield_10006` on a recent GEO bug); if it is closed, ask the user which sprint to use. Show the sprint in the draft. Verify after creation that `customfield_10006` holds it.
      - `assignee_account_id` (if provided)
   b. Attach the file (PNG or video) via curl REST — Jira API accepts any MIME type:
      ```bash
      curl -u "$JIRA_EMAIL:$JIRA_TOKEN" -X POST \
        -H "X-Atlassian-Token: no-check" \
        -F "file=@<path>" \
        "$JIRA_URL/rest/api/3/issue/{KEY}/attachments"
      ```
7. Update the final JSON with `jira_key`, `jira_url`, `jira_id`, `attachment.jira_attachment_id`, `status: "created"`

## Evidence Screenshots — highlight the elements to check (MANDATORY, both modes)

Every bug must carry screenshots in which the reader sees **at a glance** what to look at.
Reference example: GEO-1161 (red frame around the defective articles list + second screenshot
framing the reference pattern "Afficher 143 sources de plus").

1. **Frame the defective element** with a red rectangle — never send a raw, unannotated page view:
   - Live page (MCP Playwright / spec): add an overlay before the screenshot, scroll the element into view,
     wait 2 animation frames, take the screenshot, then remove the overlay:
     ```js
     // in browser_evaluate — el = the defective element (or its first visible ancestor)
     const r = el.getBoundingClientRect();
     const o = document.createElement('div');
     o.setAttribute('data-qa-annotation', 'bug');
     Object.assign(o.style, { position: 'fixed', left: (r.left - 6) + 'px', top: (r.top - 6) + 'px',
       width: (r.width + 12) + 'px', height: (r.height + 12) + 'px', border: '4px solid #dc2626',
       borderRadius: '6px', pointerEvents: 'none', zIndex: 2147483647 });
     document.body.appendChild(o);
     ```
     Use an overlay (not `outline` on the element itself) so that `overflow: hidden` parents don't clip the frame.
   - Frame **only** the elements the bug is about (e.g. the truncated tab bar, the missing button area,
     the wrong value) — not neighbouring elements.
2. **Frame the reference when the bug is an inconsistency**: if the expected behaviour exists elsewhere
   in the app (same pattern, correct value, other locale), take a **second screenshot** framing that
   reference element (GEO-1161: the "Show more sources" button of the main table).
3. **Ephemeral elements** (tooltip, dropdown, modal): capture while visible.
4. **User-provided screenshot** (mode B or evidence shared in chat): keep it as an attachment. If its
   red frames do not point at the defect, also produce an annotated proof screenshot from the live page
   (staging only) and make it the main image.
5. **Embed the screenshots in the description** (not only as attachments), each preceded by a short
   caption saying what is framed — via REST v2 wiki markup `!{exact_file_name}.png|width=800!`
   (`mediaApiFileId` is usually absent on this instance). Verify via GET v3 that the description
   contains one `media` node per embedded screenshot.
6. **File naming / location**: `bug_{STORY_KEY}_{short-slug}.png` (+ `_reference.png` for the
   reference shot) in `.claude/Data/output/reports/screenshots-{STORY_KEY}/`.

## Language (MANDATORY)

Everything written in Jira — summary, description, captions, comments — is **in English**, even when the
user chats in another language.

## Bugs found outside a test run

A bug spotted while preparing TCs, during `/run-and-report`, or reported by the user in chat is created
**through this command in mode B** (same fields, same questions, draft + confirmation, same evidence
rules) — never with ad-hoc API calls.

## Jira Bug Ticket Template

Each ticket created via Jira API must follow this structure:

**Summary**: `[Feature-prefix] Short defect description` (e.g. `[GEO-Category] Wrong empty-state wording in THEMES section`)
**Issue Type**: `Bug`
**Priority**: `Critical | High | Medium | Low`
**Labels**: `[story_key]`, `[component]`, `qa-static-bug` (mode B) or `qa-automation` (mode A)
**Component**: `GEO Module` (default, confirm in mode B)
**Custom Fields**:
- `Bug Found By` = `Automated QA`
- `Exists in Production?` = `Does not exist in Production`

**Description (Atlassian Document Format or Markdown)**:

### Description

[Defect description: what is not working and the user impact]

### Steps to Reproduce

1. [First action]
2. [Second action]
3. [Action that triggers the bug]
4. [Observe the result]

### Expected Result

[What the application should do — provided by the user in mode B]

### Actual Result

[What the application actually does]

### Environment

- **URL observed**: `[text](url)` (explicit markdown link — a bare URL does not always auto-link in Jira)
- **Environment**: staging
- **Browser**: Chromium 1.59.1 (mode A) or manual test browser (mode B)
- **Component**: GEO Module
- **Parent Epic**: GEO-XXX

## Expected Output

- `.claude/Data/output/bugs/bugs_to_create_YYYYMMDD.json` (draft + created final)
- Tickets created in Jira with their keys (BUG-XXX or GEO-XXX depending on project)
- Summary: X bugs created, Y duplicates ignored, Z errors
- Mode A: invitation to run `/gen-report` to finalise the cycle
- Mode B: recap of Jira links (`https://onclusive.atlassian.net/browse/{KEY}`) to validate visually

## Strict Rules (mode B)

1. **NEVER** infer `expected_behavior` from a screenshot — always ask the user (see `feedback_static_bug_expected.md`)
2. **NEVER** create in Jira without explicit user confirmation of the draft
3. **ALWAYS** ask/validate the `assignee` (default Youssef.AitLaydi unless otherwise instructed)
4. **ALWAYS** use the title prefix adapted to the feature (see `reference_bug_title_prefix.md`) — `[GEO-Category]`, `[GEO-Overview]`, `[GEO-Report-list]`, `[GEO-Manage-scope]`, `[Wizard]`
5. **ALWAYS** align internal `story_key` with the observed feature (`geo-overview`, `geo-report-list`, `geo-category`, `geo-manage-scope`, `wizard`) — not fixed to `geo-category`
6. **ALWAYS** render the observed URL as a markdown link `[text](url)` (never as a bare URL)
7. **ALWAYS** include the 3 mandatory GEO project custom fields otherwise creation fails (`customfield_13220`, `customfield_13208`, `customfield_17549`)
   - `customfield_17549` (Capacity Utilization): **always ask the user** — values: `Keeping the lights on` / `Roadmap Work` / `Client request`
   - If the API returns `"not on the appropriate screen"` for `customfield_17549`, silently remove it and resubmit — do not notify the user
   - **ALWAYS** move every created bug from Backlog to **To Do** right after creation (GET /transitions, pick to.name = "To Do"), then verify the status (user rule 2026-10-22)
   - **ALWAYS** set the Sprint (`customfield_10006`) to the current sprint "GEO + Digimind Sprint 1" (id 14578) — ask the user if that sprint is no longer active
8. **DO NOT** attach the file (PNG or video) multiple times — check the list of existing attachments before uploading to avoid duplicates
9. **ONE meaningful label** per bug (e.g. `category-snapshot`, `read-more`, `themes-wording`) — no multi-tagging with `qa-static-bug` + `geo-category` + sub-tags (see `feedback_bug_single_label.md`)
10. **Severity / priority — strict mapping**:
    - `bloquant` / `blocker` → priority **`Blocker`** (id 10100 in GEO, != Critical)
    - `critique` / `critical` → priority **`Critical`**
    - `majeur` / `high` → `High`, `medium` → `Medium`, `low` → `Low`
    - See `reference_bug_severity_levels.md` — NEVER automatically translate "bloquant" as "Critical"
