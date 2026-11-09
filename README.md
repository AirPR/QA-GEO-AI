# QA-GEO-AI — User Guide

> **This repository:** the GEO QA workflow in the Onclusive organization (AirPR).
> It was imported on 9 November 2026 from `QA-Workflow1` as a single commit. The history before that date (who changed which test case, and when) stays in the private repository [assiyabenramdane-dot/QA-Workflow1](https://github.com/assiyabenramdane-dot/QA-Workflow1).

A Claude Code–driven QA pipeline: import Jira epics → generate test cases → push to Quality Plus → run Playwright → report results → file bugs → regression coverage.

---

## 1. What you need first

| Requirement | Notes |
|---|---|
| Windows 10/11 + PowerShell | Commands below are PowerShell |
| [Git](https://git-scm.com/download/win) | Must be on `PATH` |
| [Node.js](https://nodejs.org) 18+ | Includes `npm` / `npx` |
| [Claude Code](https://claude.com/claude-code) CLI | `npm install -g @anthropic-ai/claude-code`, then log in with `claude` |
| Access to Jira, Quality Plus, and the GEO app (staging / prod) | Needed for the API tokens and test accounts |
| (Optional) Figma token | Only for `/extract-figma-screen` |

---

## 2. Install

```powershell
# 1. Clone
git clone https://github.com/AirPR/QA-GEO-AI QA-GEO-AI
cd QA-GEO-AI

# 2. Install Node dependencies (Playwright, csv-parse, xlsx, docx, pptxgenjs…)
npm install

# 3. Install the Playwright browsers
npx playwright install chromium

# 4. Create your environment file
copy .env.example .env
```

### Fill in `.env`

`.env` is git-ignored — never commit it. Edit the values:

| Variable | Purpose |
|---|---|
| `GEO_USER_EMAIL`, `GEO_USER_PASSWORD` | Login used by the Auth0 global-setup |
| `BASE_URL` | App under test (staging `https://staging-geo.onclusive.com/geo` or prod `https://geo.onclusive.com/geo`, **no trailing slash**) |
| `STAGING_/PROD_DASHBOARD_UUID`, `*_CATEGORY_UUID` | Dashboard / category used by E2E specs |
| `UPSELL_USER_EMAIL`, `UPSELL_USER_PASSWORD`, `UPSELL_URL` | Second account, only for epic 200 (upsell / PQL) |
| `JIRA_URL`, `JIRA_TOKEN`, `JIRA_PROJECT_KEY` | Jira REST API (also add `JIRA_EMAIL`, used for Basic auth) |
| `QP_URL`, `QP_TOKEN`, `QP_PROJECT_ID` | Quality Plus API |
| `FIGMA_TOKEN` | Figma export |
| `GITHUB_TOKEN` | GitHub access |

### Playwright MCP (only for `/run-mcp-PWT-tests` and `/run-and-report`)

`.mcp.json` launches `@playwright/mcp` with `--headless --isolated`. The path in the file points to a specific user's npm folder — update it to yours:

```powershell
npm install -g @playwright/mcp
npm root -g        # use this folder in .mcp.json → ...\@playwright\mcp\cli.js
```

Keep `--isolated`; without it, a previous session can lock the browser and block every `browser_*` tool.

### Verify the install

```powershell
npx playwright --version
claude            # run from the repo root; type / and check the commands appear
```

---

## 3. How the project is organised

```
.claude/
├── commands/     Slash-command prompts (single source of truth — edit here)
├── agents/       AI agents (role + rules; they reference commands/)
└── Data/
    ├── raw/        Unmodified inputs: Jira exports, Playwright specs, test-data (JDD), i18n
    ├── processed/  Auto-generated working files (parsed results, logs, auth session) — don't edit
    ├── output/     Shareable deliverables: CSVs, reports, regression matrices
    └── templates/  Report/CSV/QP scripts (build-multi-epic-report.js, qp-import.js…)
apps/geo/           Imported GEO epics: {VERSION}/{EPIC}/ (EPIC.md, STORY_*.md, epic-data.json, test plans, run findings)
Docs/               HowTo.txt (lessons learned), selectors_reference.md
```

Rules of thumb: `raw/` is read-only data, `processed/` is machine-written, only `output/` is for sharing. Don't create temporary README/backup/debug files.

---

## 4. Everyday use

Open a terminal in the repo root and start Claude Code:

```powershell
cd QA-GEO-AI
claude
```

Then type slash commands. **Always run them as slash commands** (`/gen-tc-csv …`), not by asking Claude to call an agent directly — the command enforces the naming, filtering and format rules.

### 4.1 The typical flow

| # | Command | What it does | Output |
|---|---|---|---|
| 1 | `/import-jira-epic GEO-123[,GEO-456]` | Pulls epics + Stories from Jira (REST) into local docs | `apps/geo/{VERSION}/{EPIC}/EPIC.md`, `STORY_*.md`, `epic-data.json` |
| 2 | `/gen-test-plan` *(optional)* | QA test plan from an epic or Jira ticket, optional push to Jira | markdown test plan |
| 3 | `/gen-tc-csv` | Test cases (Given/When/Then) from the Acceptance Criteria | `.claude/Data/output/csv/testcases-coverage-epic{KEY}.csv` |
| 4 | `/analyze-gaps` | Compares ACs (Jira + Confluence) with the CSV | gap report |
| 5 | `/import-qualityplus` | Pushes the CSV to Quality Plus | TCs in Quality Plus |
| 6 | `/run-tests --epic ID --url URL` | Generates + runs the Playwright spec for an epic | spec, raw JSON, `real.json`, screenshots, logs |
| 7 | `/export-results` | Syncs results and evidence to Quality Plus | statuses in Quality Plus |
| 8 | `/create-bugs` | Creates deduplicated Jira + Quality Plus bugs from failures (`/create-bugs statique-bugs` for manual screenshots) | bug tickets |
| 9 | `/gen-report-all-epics` | Multi-epic HTML dashboard | `output/reports/runs/DDMMYYYY-HHMM/Report-forAllEpics.html` |
| 10 | `/regression-test --current V --previous V1[,V2]` | Coverage matrix vs previous versions | `output/regression/regression-coverage-YYYYMMDD.md/.json` |

The original PRD-based path (`/read-prd`, `/fetch-jira`, `/analyze-req`, `/gen-tests`, `/export-csv`) is described in `CLAUDE.md` and in `.claude/commands/`.

### 4.2 Other commands

| Command | Use it to |
|---|---|
| `/gen-playwright-spec` | Generate a new E2E spec + initial `real.json`, update `selectors_blueprint.json` |
| `/gen-e2e-scenarios` | Consolidate several TC CSVs into business-level E2E scenarios |
| `/sync-tcs-epic` | Update the CSV after the PO changed ACs in Jira |
| `/extract-figma-screen` | Export Figma frames to `figmaScreens/` (batches of 3) |
| `/run-mcp-PWT-tests` | Run test cases through the MCP browser (CSV or Markdown plan), no spec generated |
| `/run-and-report` | Replay a Jira bug's steps, get CONFIRMED / FIXED / NOT REPRODUCIBLE, comment on the ticket |
| `/regression-test … --run --gen-missing` | Also execute covered specs / generate TCs for uncovered stories (both opt-in) |

### 4.3 Running Playwright directly (without Claude)

```powershell
# Epic spec  (individual rerun: --workers=2 max)
$env:EPIC_ID="101"; $env:USE_AUTH="true"
npx playwright test .claude/Data/raw/playwright/test-suite-epic101.spec.js --workers=2

# Single E2E spec
$env:SPEC_NAME="create-default-analysis"; $env:USE_AUTH="true"
npx playwright test .claude/Data/raw/playwright/create-default-analysis.spec.js

# Whole E2E suite — 4 workers for the entire suite, never per epic
$env:SPEC_NAME="e2e-suite"; $env:USE_AUTH="true"
npx playwright test --project=e2e-suite --workers=4

# Multilingual specs: add LOCALE=fr|es|en-us|en-gb
```

`USE_AUTH=true` makes `global-setup.js` log in via Auth0 and save the session to `.claude/Data/processed/auth/storageState.json` (never commit it).

Reports:

```powershell
node .claude/Data/templates/build-multi-epic-report.js [--epics 99,101]   # epic dashboard
node .claude/Data/templates/build-e2e-suite-report.js                     # E2E suite report
```

Both write to `.claude/Data/output/reports/runs/{DDMMYYYY-HHMM}/`. The latest run is the most recent folder name. Open the `.html` in a browser.

---

## 5. Where to find results

| What | Where |
|---|---|
| Test case CSVs | `.claude/Data/output/csv/` |
| HTML reports + screenshots | `.claude/Data/output/reports/runs/{VERSION}_{EPIC}_{DDMMYYYY-HHMM}/`: one consolidated folder per epic (several reports inside when an epic has staging, production and non-regression campaigns) |
| Regression coverage | `.claude/Data/output/regression/` |
| Parsed results and logs (working files) | `.claude/Data/processed/testcases/test-results/` |

---

## 6. Rules you must know

- **Failed means failed.** Assertions are never loosened to make a test pass; ask before adapting a test case.
- **Destructive actions** (delete/confirm/submit) are only performed when the CSV step says so; otherwise open the dialog, screenshot, then Cancel.
- **Editing a spec/TC:** update the CSV, update `real.json` steps by hand, rerun, regenerate the report.
- **Git:** `git pull origin main` only; ask before `reset --hard`, `clean -fd` or force push; never `rm -rf runs/` (delete one run folder at a time).
- **Never commit** `.env` or `storageState.json`.
- **Before each commit**, review whether `Docs/HowTo.txt` needs a new TÂCHE entry.
- **Staging vs prod** differ in some labels and data counts — inspect the DOM on the target environment before fixing a selector.

---

## 7. Troubleshooting

| Symptom | Fix |
|---|---|
| `git` / `node` not recognized | Install and reopen the terminal so `PATH` refreshes |
| Login fails / redirected to Auth0 | Check `GEO_USER_EMAIL` / `GEO_USER_PASSWORD`; run with `USE_AUTH=true` |
| Staging hangs on page load | Staging never reaches `networkidle`; specs must use `waitUntil: 'load'` |
| `browserContext.newPage: Test timeout exceeded`, or ENOENT parsing raw JSON | Too many Chromium instances — use 4 workers for the whole suite, 2 max for one epic |
| MCP `browser_*` tools blocked or MCP server "failed to connect" | Check the path in `.mcp.json`, that `@playwright/mcp` is installed, and that `--isolated` is present |
| `(screenshot missing)` in a report | Rerun the TC, then regenerate the report (screenshots must be copied into `runs/{TS}/` before the HTML is built) |
| Quality Plus import returns 200 with `errors[]` | Remove unsupported properties (`storyKey`, `component`, `precondition`); description must be ADF |
| Epic 200 upsell session errors | Regenerate `storageState-upsell.json` with the dummy `--grep="DOES_NOT_EXIST"` run (see `CLAUDE.md`) |

More lessons learned live in `Docs/HowTo.txt`; selector notes in `Docs/selectors_reference.md`; the full project rules in `CLAUDE.md`.
