---
name: regression-test
description: Creates the regression test plan for the current version/release vs previous versions. Analyses existing coverage (CSV + Playwright specs), identifies gaps, generates missing TCs and runs specs. Trigger with /regression-test.
---

<command-name>regression-test</command-name>

# Skill : Regression Test — Current Version vs Previous Versions

## Trigger
```
/regression-test [--current VERSION] --previous VERSION[,VERSION] [--url URL] [--run?] [--gen-missing?]
```

Examples:
```
/regression-test --current GEO-V4 --previous GEO-V1,GEO-V2 --url https://geo.onclusive.com/geo --run
/regression-test --previous GEO-V1 --url https://staging-geo.onclusive.com/geo --gen-missing
/regression-test --current GEO-V4 --previous GEO-V1
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--current VERSION` | No | Current version (e.g. `GEO-V4`). If absent, auto-detect the most recent version in `apps/geo/data/` (descending alphabetical sort). |
| `--previous VERSION[,VERSION]` | **Yes** | Previous versions to cover (e.g. `GEO-V1` or `GEO-V1,GEO-V2`). Comma-separated. |
| `--url URL` | No* | Application URL — required if `--run` is passed. |
| `--run` | No | Execute covered Playwright specs after the analysis. |
| `--gen-missing` | No | Generate CSV TCs for UNCOVERED stories via `gen-tc-csv`. |

Without `--run` or `--gen-missing`: dry-run mode (analysis + coverage report only).

## Output Files

```
.claude/Data/output/regression/
├── regression-coverage-YYYYMMDD.md     (readable coverage matrix)
└── regression-coverage-YYYYMMDD.json   (structured data — source for HTML report)

.claude/Data/output/reports/runs/{DDMMYYYY-HHMM}/
└── REGRESSION-Report.html              (final HTML report if --run)
```

## 5-Phase Workflow

### Phase 1 — Version Discovery
1. List available folders in `apps/geo/data/`
2. If `--current` absent → take the most recent folder (descending alphabetical sort)
3. For each version in `--previous`:
   - List epics (sub-folders of `apps/geo/data/{VERSION}/`)
   - Read the `epic-data.json` file for each epic
   - Extract the list of stories: `story_key`, `title`, `epic_key`, `version`
4. Build the **reference list**: all stories from previous versions

### Phase 2 — Coverage Analysis
For each story in the reference list:

**CSV Detection**:
- Parse all CSVs in `.claude/Data/output/csv/` (separator `;`)
- Search for `story_key` in the `QA Story task` column (e.g. `GEO-79`)
- If found → note the CSV file(s) + number of TCs

**Playwright Spec Detection**:
- Search in `.claude/Data/raw/playwright/` for a `.spec.js` whose name contains the epic ID or story key
- Also check patterns: `test-suite-epic{ID}.spec.js`, `{feature-name}.spec.js`

**Results Detection**:
- Search in `.claude/Data/processed/testcases/test-results/` for a `real.json` linked to this epic/spec
- Extract last run date if available

**Classification**:
| Status | Condition |
|--------|-----------|
| `COVERED` | CSV + Playwright spec + real.json exist |
| `PARTIAL` | CSV exists, no automated Playwright spec |
| `UNCOVERED` | No CSV for this story |

### Phase 3 — Coverage Report (always produced)

Generate `.claude/Data/output/regression/regression-coverage-YYYYMMDD.json`:
```json
{
  "generated_at": "YYYY-MM-DD",
  "current_version": "GEO-V4",
  "previous_versions": ["GEO-V1", "GEO-V2"],
  "summary": {
    "total_stories": 45,
    "covered": 28,
    "partial": 8,
    "uncovered": 9,
    "coverage_pct": 62,
    "verdict": "CONDITIONAL"
  },
  "stories": [
    {
      "story_key": "GEO-79",
      "title": "Dashboard Overview KPI Cards",
      "epic_key": "GEO-102",
      "version": "GEO-V1",
      "status": "COVERED",
      "csv_files": ["testcases - epic102.csv"],
      "tc_count": 6,
      "spec_file": "GEO-dashboard-overview.spec.js",
      "real_json": "test-results-epic102-real.json",
      "last_run_date": "2026-07-09"
    }
  ]
}
```

Generate `.claude/Data/output/regression/regression-coverage-YYYYMMDD.md`:
```markdown
# Regression Coverage — {CURRENT} vs {PREVIOUS}
Date : YYYY-MM-DD | Verdict : GO / CONDITIONAL / NO-GO

## Summary
| Status | Count | % |
|--------|-------|---|
| COVERED | 28 | 62% |
| PARTIAL | 8 | 18% |
| UNCOVERED | 9 | 20% |

## Matrix by version

### GEO-V1
| Epic | Story | Title | Status | CSV | Spec | Last run |
|------|-------|-------|--------|-----|------|----------|
| GEO-102 | GEO-79 | Dashboard KPI | COVERED | testcases - epic102.csv | GEO-dashboard-overview.spec.js | 2026-07-09 |
...

## UNCOVERED Stories (priority coverage needed)
- GEO-XXX — {title} (GEO-V1 / GEO-102)
...
```

**Verdict rule**:
| Coverage % | Verdict |
|------------|---------|
| >= 80% | GO |
| 60% – 79% | CONDITIONAL |
| < 60% | NO-GO |

### Phase 4 — Missing TC Generation (`--gen-missing`)
- For each `UNCOVERED` story: call `Skill("gen-tc-csv", "{STORY_KEY} {VERSION}")` sequentially
- After each generation, update the story status in the coverage JSON (`UNCOVERED` → `PARTIAL`)
- Display the recap: X TCs generated for Y stories

### Phase 5 — Playwright Execution (`--run`)
- List unique specs where status is `COVERED` (at least one existing spec)
- For each spec: run `USE_AUTH=true npx playwright test {spec} --workers=2`
- Update corresponding `real.json` files
- Generate the final HTML report:
  - If all specs are `test-suite-epicXX.spec.js` → `node build-multi-epic-report.js`
  - If mix epic + E2E → `node build-e2e-suite-report.js`
  - Output path: `.claude/Data/output/reports/runs/{DDMMYYYY-HHMM}/REGRESSION-Report.html`

## Important Rules

- **Never run tests without `--run`** — default mode is dry-run
- **Never generate TCs without `--gen-missing`** — opt-in only
- **`--previous` is required** — if absent, display available versions and ask
- **If `--run` without `--url`** → explicit error, ask for the URL
- **Follow Git rules**: do not commit automatically, do not modify `processed/` or `raw/` files outside convention
- **Regression output folder**: `.claude/Data/output/regression/` — create if missing

## Agent Used
`regression-test-agent`

## Dispatch (MANDATORY)
When this command is triggered:
1. Use `Agent` with `subagent_type: regression-test-agent`
2. If the agent is not available in the session → use `general-purpose` passing the full content of `.claude/agents/regression-test-agent.md` as instructions
3. Never bypass this command by launching an agent directly without going through `/regression-test`
