# Command : /run-mcp-PWT-tests

## Usage
```
/run-mcp-PWT-tests --csv {csv_path} --url {url} [--spec {name}] [--mode libre|structured] [--tc {TC_ID}] [--story {STORY_KEY}]
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--csv`   | Yes | Path to the Quality Plus CSV file (e.g. `.claude/Data/output/csv/testcases-coverage-epicGEO-539.csv`) |
| `--url`   | Yes | Application starting URL (e.g. `https://staging-geo.onclusive.com/geo/dashboard/UUID`) |
| `--spec`  | No | Run name (used to name artefacts). Deduced from CSV if absent. |
| `--mode`  | No | `structured` (follows the CSV Given/When/Then) or `libre` (intelligent exploration). Default: `structured` |
| `--tc`    | No | Execute a single TC (e.g. `--tc TC-GEO-539-US1.1-001`). Useful for debugging. |
| `--story` | No | Filter TCs whose `QA Story task` column matches `STORY_KEY` (e.g. `--story GEO-448`). Compatible with `--tc`. |

## Examples
```
/run-mcp-PWT-tests --csv .claude/Data/output/csv/GEO-R1.2/testcases-coverage-epicGEO-539.csv --url https://staging-geo.onclusive.com/geo/dashboard/b9990bfa-90d6-4c98-b134-42af9907e3fe

/run-mcp-PWT-tests --csv .claude/Data/output/csv/GEO-R1.2/testcases-coverage-epicGEO-539.csv --url https://staging-geo.onclusive.com/geo/dashboard/b9990bfa-90d6-4c98-b134-42af9907e3fe --mode libre

/run-mcp-PWT-tests --csv .claude/Data/output/csv/GEO-R1.2/testcases-coverage-epicGEO-539.csv --url https://staging-geo.onclusive.com/geo/dashboard/b9990bfa-90d6-4c98-b134-42af9907e3fe --tc TC-GEO-539-US1.1-001
```

/run-mcp-PWT-tests --csv .claude/Data/output/csv/GEO-R1.2/testcases-coverage-epicGEO-539.csv --url https://staging-geo.onclusive.com/geo/dashboard/b9990bfa-90d6-4c98-b134-42af9907e3fe --story GEO-448
```

## Execution Workflow

### Phase 0 — Parsing and Preparation
1. Read the CSV file (separator `;`, UTF-8 encoding)
2. Group rows by `TC ID` to reconstruct each TC with its Given/When/Then steps
3. Identify TCs to execute:
   - If `--story STORY_KEY` is provided: keep only TCs whose `QA Story task` === `STORY_KEY`. If 0 TCs match → display available story keys in the CSV and stop.
   - If `--tc TC_ID` is provided: also filter by TC ID (both filters are cumulative).
   - Without filter: execute all TCs in the CSV.
4. Create the screenshots folder: `.claude/Data/output/reports/screenshots-{spec}/`
5. Create the run timestamp: `DDMMYYYY-HHMM`

### Phase 1 — Authentication
1. Navigate to the target URL
2. If redirected to a login page (Auth0):
   - Fill `input[name="username"]` with `GEO_USER_EMAIL` (read from `.env`)
   - Click "Continue"
   - Fill `input[name="password"]` with `GEO_USER_PASSWORD` (read from `.env`)
   - Click "Continue" / "Log In"
   - Wait for the redirect back to the app
3. Take a confirmation screenshot `auth_ok.png`

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


### Phase 2 — TC Execution

For each TC:

#### `structured` Mode
Strictly follow the `Given`, `When`, `Then` columns from the CSV:
- **Given**: set up the context (navigate, select filters)
- **When**: perform the triggering action
- **Then**: verify the expected result
- Take 3 screenshots: `{TC_ID}_step1_given.png`, `{TC_ID}_step2_when.png`, `{TC_ID}_step3_then.png`

#### `libre` Mode
The agent understands the TC intent and executes it intelligently:
- Do not look for word-for-word correspondence with the DOM
- Inspect the snapshot to find relevant elements
- Adapt selectors to the actual page structure
- More robust against UI labels that differ from CSV wording

### Phase 3 — PASS / FAIL / SKIP Decision

| Status | Condition |
|--------|-----------|
| **PASS** | All `Then` assertions are verified |
| **FAIL** | At least one assertion fails — document the observed vs expected gap |
| **SKIP** | The TC requires an unavailable prerequisite (e.g. 2nd browser context, backend API, email pipeline) |
| **PARTIAL** | Partial execution succeeds but a complete verification is not possible via UI |

### Phase 4 — Artefact Production

#### real.json
Write `.claude/Data/processed/testcases/test-results/test-results-{spec}-mcp-real.json`:
```json
{
  "spec": "{spec}",
  "runDate": "YYYY-MM-DD",
  "runMode": "mcp-playwright",
  "url": "{url}",
  "results": [
    {
      "tc_id": "TC-GEO-539-US1.1-001",
      "title": "...",
      "story_id": "US1.1",
      "status": "PASS",
      "duration": 0,
      "error": null,
      "screenshots": [
        "screenshots-{spec}/TC-GEO-539-US1.1-001_step1_given.png",
        "screenshots-{spec}/TC-GEO-539-US1.1-001_step2_when.png",
        "screenshots-{spec}/TC-GEO-539-US1.1-001_step3_then.png"
      ],
      "steps": [
        { "title": "Given ...", "status": "PASS" },
        { "title": "When ...", "status": "PASS" },
        { "title": "Then ...", "status": "PASS" }
      ],
      "notes": "Free qualitative observation (optional)"
    }
  ]
}
```

#### HTML Report
Generate `.claude/Data/output/reports/runs/{DDMMYYYY-HHMM}/MCP-Report-{spec}.html` with:
- **Section 1** (blue background): title, date, tested URL, verdict GO/CONDITIONAL/NO-GO
- **Section 2**: 6 compact stats: Total TCs | PASS | FAIL | SKIP | PARTIAL | Success rate
- **Section 3**: accordion by US → TC cards → steps + embedded screenshots
- Self-contained design (inline CSS, no external dependency)
- Screenshots referenced in relative path from the runs/ folder

### Phase 5 — Screenshots Copy

Copy (or move) the `.claude/Data/output/reports/screenshots-{spec}/` folder
to `.claude/Data/output/reports/runs/{DDMMYYYY-HHMM}/screenshots-{spec}/`
so that the HTML report is self-contained (relative paths).

### Phase 6 — Findings triage (one grouped validation per epic)

Once every story of the epic has run (or after a rerun), the coordinator — not each story agent — updates
`apps/geo/{VERSION}/{EPIC}-RUN-FINDINGS.md` (same layout as `GEO-1209-RUN-FINDINGS.md`) and shows it ONCE to the user.

1. **Before listing an item**, check it is worth the user's time:
   - read ALL comments of the epic, its stories and linked bugs (any date, threaded replies via `parentId`) and the current ACs;
     drop items already answered there (cite the answer instead);
   - drop items with no AC, rule or validated text behind them (no "nice to have" questions);
   - cross-check with known rules (e.g. a warning that explains a missing widget) before calling it a bug;
   - attach the annotated screenshot path (red frame, caption for invisible values such as aria-labels or API data).
2. **One table per type** — bugs, PO questions, CSV changes — with a **Decision** column pre-filled with the
   recommendation (`BUG Medium → GEO-12xx story`, `PO question`, `By design → align TC`, `CSV label fix`, `Drop`),
   the evidence path and the AC / rule cited.
3. Present the table in a short message ("sauf avis contraire j'applique la colonne Décision"); the user only corrects
   the rows they disagree with.
4. Then apply everything in one go: label fixes and TC alignments (CSV + review), bug drafts → `/create-bugs` (created
   only after the user's OK on the table), PO comment (exact text shown once, then posted), statuses in the findings file.

### Run folders to commit

Only ONE consolidated folder per epic is committed (consolidated HTML + copied screenshots), named `runs/{VERSION}_{EPIC}_{DDMMYYYY-HHMM}/` (e.g. `runs/GEO-R1.3_GEO-1209_22102026-1328/`); a new consolidation creates a folder with the new date and time and the previous one is removed from git (with the user's OK). Per-story run folders and
rerun folders stay local (not committed); their results are merged into the consolidated report.

## Important Rules

### TCs Not Executable via MCP
Some TCs cannot be verified via the user interface alone.
**Mandatory SKIPs** with documented reason:
- **Backend-only**: database persistence, cache key, server-side logic
- **Multi-context**: requires 2 simultaneous browser sessions
- **Email pipeline**: verifying email content
- **Export pipeline**: verifying PDF/DOCX export content

### Mandatory Screenshots
- Always take the 3 screenshots per TC (step1_given, step2_when, step3_then)
- If a step fails before step3_then: still take a screenshot of the current state
- Never leave a TC without any screenshot

### UI Filters (GEO)
- **Country/Market filter**: open the dropdown → select → wait for reload
- **LLM Toggles**: `button[aria-label="Toggle {LLM}"]`
- **Page reload**: use `browser_navigate` to the same URL to force a reload

### AI Summary (specific to GEO-539)
- Summary text: `.inbrief-content`, `[data-testid="ai-summary"]`, or narrative text area
- Wait for the spinner/skeleton to disappear before reading the content
- Compare texts via `browser_evaluate` + `innerText`

## Agent Used
`mcp-playwright-runner-agent`

## Dispatch (MANDATORY)
When this command is triggered:
1. Use `Agent` with `subagent_type: mcp-playwright-runner-agent`
2. If the agent is not available → use `general-purpose` passing the full content of `.claude/agents/mcp-playwright-runner-agent.md` as instructions
3. Never bypass this command by launching an agent directly without going through `/run-mcp-PWT-tests`
