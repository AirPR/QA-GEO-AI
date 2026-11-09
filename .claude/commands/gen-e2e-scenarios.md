---
name: gen-e2e-scenarios
description: Reviews the existing E2E suite and consolidates test case CSV files (explicit list, one release or the whole project) into business-oriented E2E scenarios with Playwright specs. The current E2E suite lives in .claude/Data/output/csv/E2E-tests/. Trigger with /gen-e2e-scenarios.
---

<command-name>gen-e2e-scenarios</command-name>

# Skill : E2E Scenario Generation and E2E Suite Review

## Trigger
```
/gen-e2e-scenarios (--csv <file_or_pattern> [--csv <file2>] | --version <VERSION> | --project [--version <VERSION>])
                   --url <URL> [--output <name>] [--test-plan <file>] [--epics KEY,KEY] [--no-run?]
```

Examples:
```
# Whole project, newest release = GEO-R1.3, review + consolidation only (recommended first run)
/gen-e2e-scenarios --project --version GEO-R1.3 --url https://staging-geo.onclusive.com/geo --no-run

# One release (every CSV of GEO-R1.3 + its test plan)
/gen-e2e-scenarios --version GEO-R1.3 --url https://staging-geo.onclusive.com/geo --no-run

# One release, restricted to some epics
/gen-e2e-scenarios --version GEO-R1.3 --epics GEO-1002,GEO-1069 --url https://staging-geo.onclusive.com/geo

# Explicit CSVs (original mode)
/gen-e2e-scenarios --csv GEO-R1.2/testcases-coverage-epicGEO-152.csv --url https://staging-geo.onclusive.com/geo --output e2e-action-center
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--csv <file>` | One of the 3 scopes | Name or path of a CSV under `.claude/Data/output/csv/` (version subfolders included). Can be repeated. |
| `--version <VERSION>` | One of the 3 scopes | Every TC CSV of `.claude/Data/output/csv/{VERSION}/` (E2E CSVs `e2e-*.csv` excluded). With `--project`: the newest version to take into account. |
| `--project` | One of the 3 scopes | Every version folder `GEO-R*/` up to `--version` (default: the highest version folder). Newer TCs supersede older ones (see "Version precedence"). |
| `--url <URL>` | Yes | Target application URL for DOM inspection and execution (staging by default) |
| `--output <name>` | No | Base name of new E2E specs (default: derived, always prefixed `e2e-`) |
| `--test-plan <file>` | No | Test plan used for cross-epic and non-regression journeys. Default with `--version` / `--project`: `apps/geo/{VERSION}/TEST-PLAN-{VERSION}.md` if it exists |
| `--epics KEY,KEY` | No | Restrict the release CSVs to these epics (`testcases-coverage-epic{KEY}.csv`) |
| `--no-run` | No | Stop after the E2E suite files (`.md`) are written: no spec generation, no execution |

## The E2E suite (single source)

| Folder | Role |
|--------|------|
| `.claude/Data/output/csv/E2E-tests/` | **The current E2E suite**: **one Markdown file per spec** (`{SPEC_NAME}.md`) holding all its active scenarios (kept, updated or new) and its retired ones, plus `E2E-SUITE-INDEX.md` |
| `.claude/Data/output/csv/GEO-R1.0/e2e-*.csv` | Previous E2E suite (R1.0). **Read-only archive**: reviewed at every run while it has not been migrated, never edited, moved or deleted without the user's agreement |

When `E2E-tests/` already contains scenarios, the review starts from `E2E-tests/` (the R1.0 archive is
only re-read for scenarios not migrated yet).

## Execution Steps

1. **Resolve the scope** — CSV list (`--csv`), release CSVs (`--version`, `--epics`), or every version
   folder (`--project`); test plan; RUN-FINDINGS files `apps/geo/{VERSION}/*-RUN-FINDINGS.md`
2. **Read and parse** all TC CSVs (headers mapped by name, rows grouped by `Test name`)
3. **Select the current TCs** (see "TC state" and "Version precedence")
4. **Review the existing E2E suite** (see "E2E suite review") — every scenario of `E2E-tests/` and of
   the R1.0 archive gets a status KEEP / UPDATE / RETIRE
5. **Consolidate new scenarios** in passes (see "Consolidation passes") — status NEW
6. **Check the run prerequisites** (see "Release prerequisites") and list what is missing
7. Write the consolidation document `.claude/Data/processed/e2e-scenarios/{RUN_NAME}-scenarios.md`
8. **Review gate — display the suite review + the new scenarios (statuses, traceability,
   preconditions, excluded TCs, known-bug steps, open points) and wait for user confirmation.**
   Nothing is written in `E2E-tests/`, no spec is touched and nothing runs before confirmation.
   The user corrects only the lines they disagree with.
9. **Write the E2E suite** in `E2E-tests/`: one `{SPEC_NAME}.md` per spec with its KEEP, UPDATE and NEW
   scenarios (RETIRE ones listed at the end without steps), then `E2E-SUITE-INDEX.md`.
   → stop here with `--no-run`
10. Inspect the DOM of the target URL (MCP Playwright or headless Playwright)
11. Generate new specs / update the specs of UPDATE scenarios + update `selectors_blueprint.json`
12. Create or update the real.json (steps from `test.step()`, screenshots from `shot()` calls)
13. Register new specs in the E2E suite (`playwright.config.js` project `e2e-suite` + `E2E_SPECS` of
    `build-e2e-suite-report.js`); comment out (never delete) the entries of RETIRE scenarios
14. **Before any step that creates an analysis or saves a scope / setting: ask the user** (QA autonomy rule)
15. Execute tests
16. Generate the HTML report with `build-e2e-suite-report.js` (run folder `runs/E2E-DDMMYYYY-HHMM/`)

`RUN_NAME` = `--output` if given, else `e2e-suite-{VERSION}` (`--project` / `--version`) or
`e2e-{feature}` (1 CSV) / `e2e-combined-{DDMMYYYY-HHMM}` (N CSVs).

## CSV Resolution

- Search each `--csv` **recursively** under `.claude/Data/output/csv/`, including every version folder
  (`GEO-R0.1/` … `GEO-R1.3/` and later). A value containing `/` is resolved relative to `.claude/Data/output/csv/`.
- Partial match allowed. If several files match (e.g. the same name in two versions) → list them and ask.
- If no file matches → error with the list of available files.
- `--version` / `--project`: take `testcases-*.csv` files; ignore `e2e-*.csv` (they are the E2E suite)
  and `*-review.md`.
- Map columns **by header name**. Header variants:
  - current (R1.2+): `Description;QA Priority;Test name;Test step;Test data;Expected result;Labels;QA Parent;Components;Smoke;QA Component;QA Precondition;QA Story/Task;QA Regression;UI/Functional Test case;Test Type`
  - older: `…;QA Components;QA Precondition;UI/Functional Test case;QA Regression;QA Story task`
  - R1.0 E2E CSVs: comma-separated, extra `tc_id`, `Coverage Source`, `Action` columns, sometimes
    lower-case names (`tc_id,description,priority,test_name,…`)
- Detect the separator (`;` or `,`) from the header row and honour quoted fields.

## TC state — use the latest version of each TC

- A TC whose description says it is **retired / superseded** is excluded (list it in "Excluded TCs").
- Apply the latest `Updated YYYY-MM-DD …` notes of the description: they record PO decisions and
  alignments with bug statuses (e.g. GEO-1222 Abandoned → header "Articles"; GEO-1224 → a negative
  article may show no quote). Never revert an aligned expectation to an older wording.
- A step that depends on a still-open bug is kept as is and flagged in the scenario
  ("expected to fail until GEO-XXXX is fixed") — never softened. Known bugs come from the TC description,
  the `*-RUN-FINDINGS.md` files and the bug status in Jira (read-only).
- Steps marked as backend / API / back office only (no UI surface of the app) are not turned into UI
  steps: list them as open points.

## Version precedence (`--project`, and E2E suite review)

- Versions are ordered numerically: `GEO-R0.1 < GEO-R0.2 < GEO-R0.3 < GEO-R1.0 < GEO-R1.1 < GEO-R1.15 < GEO-R1.2 < GEO-R1.3`
  (`GEO-R1.15` is a patch of 1.1, so it sits between 1.1 and 1.2). `GEO-V1` is outside the chain:
  ask before using it.
- When a newer version has a TC on the same feature / screen / story as an older TC, the **newer TC
  wins**; the older one is excluded with "superseded by {VERSION} {TC id}".
- Within a release, when a story and its epic text disagree, the story is the reference.
- UI renames of a newer release apply to every older expectation that shows the same element
  (e.g. GEO-1514 Market → Country, wizard step "Review" shown as "Summary") — label alignment only;
  a change of behaviour goes to the review gate.

## E2E suite review (status per existing scenario)

Read every existing E2E scenario (`E2E-tests/*.md`, then the R1.0 archive `GEO-R1.0/e2e-*.csv` for
what is not migrated yet), its spec `.claude/Data/raw/playwright/{name}.spec.js` and its last result
(`processed/testcases/test-results/test-results-{name}-real.json`). Compare its steps with the current
TCs of the newer versions and the release test plan.

| Status | Rule | Effect |
|--------|------|--------|
| **KEEP** | Still matches the current behaviour (no newer TC contradicts it) | Copied into `E2E-tests/{SPEC_NAME}.md`, wording unchanged; spec untouched |
| **UPDATE** | The journey still exists but newer TCs change steps, labels, data or expected results (e.g. new wizard, prompt pool, concept polarity labels, Country wording) | Written in `E2E-tests/{SPEC_NAME}.md` with the newer TC wording; spec updated in place (same name); each changed step cites the newer TC |
| **RETIRE** | The feature or journey no longer exists, or is fully replaced by a NEW scenario | Listed without steps at the end of its spec file; spec entry commented out in the suite; listed in the index with the reason and the replacing scenario |
| **NEW** | A current journey not covered by any existing scenario | New section in a new or existing `{SPEC_NAME}.md` + new or extended spec |

- A R1.0 file holding several TCs stays one file (`{name}.md`) with one section per scenario;
  the tc_id is aligned on `E2E-{FEATURE}-{NNN}` and the old id is kept in the Description
  (`Former id: TC001`).
- Changing an expected result that touches a behaviour (not just a label) requires the user's
  confirmation — it is shown at the review gate, never applied silently.

## Consolidation passes (new scenarios)

Run the consolidation in passes, never on all TCs at once:
1. **Per epic** (or per feature for older versions): journeys inside one epic
2. **Cross-epic**: journeys from the "Cross-Epic Integration" section of the test plan (e.g. branded vs
   unbranded wizard, shared concept list, PPTX / PDF / XLSX exports, logos, Target Sources by analysis mode)
3. **Non-regression**: journeys from the "Non-Regression" section of the test plan (brand analyses and
   analyses created before the release)

Before creating a NEW scenario, check it does not duplicate a KEEP / UPDATE one — prefer extending the
existing scenario (UPDATE) when the journey is the same.

## Release prerequisites (check before writing specs, list missing ones as open points)

- Account interface language = en-GB (`GET /geo/api/v1/auth/me`); restore it after any language-switch step
- Feature flags read from `/auth/me` → `features` (e.g. `unbranded_analysis` for GEO-1209 / unbranded
  GEO-1068); a scenario needing the flag OFF is flagged as needing another account / environment
- Analyses created by a scenario keep **only 5 prompts** (shared prompt pool)
- Back office steps (prompt pool quota, organisation settings) are prerequisites, not UI steps of the spec
- Test data (UUIDs, brands, websites) go in the JDD; empty value `""` = step skipped on purpose

## E2E Conventions (CLAUDE.md — MANDATORY)

| Item | Convention |
|------|------------|
| tc_id | `E2E-{FEATURE}-{NNN}` (e.g. `E2E-ACTION-CENTER-001`) — distinct from epic TC ids |
| E2E file | **1 Markdown file per spec**, all its scenarios inside: `.claude/Data/output/csv/E2E-tests/{SPEC_NAME}.md` (format below) |
| Suite index | `.claude/Data/output/csv/E2E-tests/E2E-SUITE-INDEX.md` |
| Spec | `.claude/Data/raw/playwright/{SPEC_NAME}.spec.js` (header comment `// Scenarios : .claude/Data/output/csv/E2E-tests/{SPEC_NAME}.md`) |
| Raw JSON | `.claude/Data/raw/playwright/test-results-{SPEC_NAME}-raw.json` (via `SPEC_NAME={SPEC_NAME}`) |
| Real JSON | `.claude/Data/processed/testcases/test-results/test-results-{SPEC_NAME}-real.json` |
| Screenshots | `.claude/Data/output/reports/screenshots-{SPEC_NAME}/` (transient, moved into the run folder by the report builder) |
| Report | `.claude/Data/output/reports/runs/E2E-DDMMYYYY-HHMM/EXECUTION_REPORT_REAL_e2e-suite.html` |

## {SPEC_NAME}.md format

```markdown
# {SPEC_NAME}

- **Spec:** `.claude/Data/raw/playwright/{SPEC_NAME}.spec.js`
- **Active scenarios:** N · **Retired:** R
- **Source:** E2E suite review up to {VERSION} ({YYYY-MM-DD}) — `.claude/Data/processed/e2e-scenarios/{RUN_NAME}-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-XXX-001](#e2e-xxx-001) | {title} | KEEP | GEO-AAAA |

---

## E2E-XXX-001

**{title}**

| Field | Value |
|---|---|
| Status | KEEP / UPDATE / NEW — {note} |
| Description | {description + traceability: Consolidates …, Former id …, Archived in …} |
| Priority | High / Medium / Low |
| Stories | GEO-AAAA, GEO-BBBB |
| Precondition | … |
| Labels | … |
| QA Parent | … |
| Components / QA Component | … / … |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 / — |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given … | … | … |
| 2 | When … | … | … |
| 3 | Then … | … | … |

---

## Retired scenarios (no steps — kept for traceability)

| Scenario | Title | Reason |
|---|---|---|
| E2E-XXX-009 | … | … |
```

- A `|` inside a cell is escaped as `\|`; a line break inside a cell becomes `<br>`
- A Quality Plus import of E2E scenarios is built from these files on request (CSV, current header) — never stored in `E2E-tests/`

## E2E-SUITE-INDEX.md format

```markdown
# E2E Suite — up to {VERSION} (generated {YYYY-MM-DD})

| Scenario | Title | Status | Spec | Stories | Source (archive / TCs) | Last result | Note |
|----------|-------|--------|------|---------|------------------------|-------------|------|
| E2E-WIZARD-001 | Create a branded analysis with the new wizard | UPDATE | e2e-create-default-analysis | GEO-104, GEO-AAAA | GEO-R1.0/e2e-create-default-analysis.csv + TC-GEOAAAA-003… | FAIL 13/10 | 4-step stepper → new wizard steps |
| E2E-CATEGORY-SOV-001 | … | KEEP | e2e-category-SOV | GEO-663 | GEO-R1.0/e2e-category-SOV.csv | PASS | |
| E2E-IDENTITY-001 | … | RETIRE | (commented out) | … | GEO-R1.0/e2e-identity-cards-drill-in.csv | — | replaced by E2E-… |

Totals: K kept · U updated · R retired · N new
```

## Output Files

```
.claude/Data/processed/e2e-scenarios/{RUN_NAME}-scenarios.md        (suite review + consolidation)
.claude/Data/output/csv/E2E-tests/{SPEC_NAME}.md                     (1 file per spec, all its scenarios)
.claude/Data/output/csv/E2E-tests/E2E-SUITE-INDEX.md                (the list of the current E2E suite)
.claude/Data/raw/playwright/{SPEC_NAME}.spec.js                     (new or updated specs)
.claude/Data/raw/test-data/selectors_blueprint.json                 (new / updated sections)
.claude/Data/processed/testcases/test-results/
  ├── test-results-{SPEC_NAME}-real.json
  └── execution-log-{SPEC_NAME}.txt
.claude/Data/output/reports/runs/E2E-DDMMYYYY-HHMM/
  ├── EXECUTION_REPORT_REAL_e2e-suite.html
  └── screenshots-{SPEC_NAME}/
```

## Final Report Displayed

```
Scope         : --project up to GEO-R1.3 (N TC CSVs, M TCs, K excluded: retired / superseded / backend only)
Suite review  : K kept · U updated · R retired · N new  → .claude/Data/output/csv/E2E-tests/E2E-SUITE-INDEX.md
E2E files     : .claude/Data/output/csv/E2E-tests/{SPEC_NAME}.md …
Specs         : new: … | updated: … | retired (commented out): …
Environment   : staging | production (read-only)
Results       : X passed / Y failed / Z skipped
HTML Report   : .claude/Data/output/reports/runs/E2E-DDMMYYYY-HHMM/EXECUTION_REPORT_REAL_e2e-suite.html

Traceability:
  E2E-XXX-001 "{title}" <- TC-XXX-001, TC-XXX-002, TC-YYY-003
Known bugs expected to fail: GEO-XXXX (step N of E2E-XXX-001)
Open points: {missing prerequisites, back office steps, flag OFF runs}
```

## Consolidation Prompt (passed to the agent)

You are a Senior QA Engineer specialized in end-to-end testing.

Your task is to review the existing E2E suite and analyze a collection of detailed test cases, then consolidate them into one or more business-oriented E2E scenarios.

Instructions:
- Review every existing E2E scenario and give it a status KEEP / UPDATE / RETIRE against the newer TCs.
- Review all test cases and identify their purpose and dependencies.
- Use the latest state of each TC (apply its `Updated …` notes, exclude retired / superseded TCs, newer version wins).
- Remove duplicate or overlapping steps.
- Preserve the logical sequence of actions required by the user journey.
- Merge related test cases into complete end-to-end scenarios; prefer extending an existing scenario over creating a duplicate.
- Include only the essential steps required to validate the business flow.
- For each step, specify: Action to perform / Test data (if available) / Expected result.
- Keep the exact Given/When/Then wording of the source steps — no rewording of expected results.
- Highlight any missing prerequisites, assumptions, or dependencies.
- If some test cases are independent, create multiple E2E scenarios.
- Do not invent business rules that are not present in the input.
- Maintain traceability by listing the original test cases (and the archived E2E scenario) contributing to each E2E scenario.

## Execution Rules (STRICT — CLAUDE.md)

- Assertions use the exact expected results of the CSV; never soften an assertion to make a test pass.
- If an assertion fails → the test is FAILED.
- Explore the application (DOM, clicks, navigation) before concluding a feature does not exist.
- Ask the user before adapting or modifying a test case (the review gate is that confirmation).
- Ask before creating an analysis or saving a scope / setting (QA autonomy rule).
- Staging by default. If `--url` is production: read-only (no analysis creation, no scope change),
  pass `BASE_URL` as an env var (never edit `.env`), refresh `storageState.json` (domain-scoped),
  and add a banner "Executed on PRODUCTION" in the report — the CSV data URLs are written for staging.
- Never edit, move or delete the R1.0 archive (`GEO-R1.0/e2e-*.csv`) or the source TC CSVs.

## Agent Used
`e2e-scenario-generator-agent`

## Dispatch (MANDATORY)

When this command is triggered:
1. Use `Agent` with `subagent_type: e2e-scenario-generator-agent`
2. Pass the full prompt including: scope (CSV paths / version / project), epics filter, test plan, target URL, output name, --no-run flag
3. The agent stops at the review gate (step 8) and returns the suite review + consolidation; resume it after the user confirms
4. Never bypass by launching an agent directly without going through `/gen-e2e-scenarios`
