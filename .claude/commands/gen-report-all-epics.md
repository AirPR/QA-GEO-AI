---
name: gen-report-all-epics
description: Aggregates every per-epic real.json into a single multi-epic HTML dashboard with locked 3-section design (blue summary + epic list, compact stats, accordion epic→story→TC with steps/errors/screenshots). Trigger with /gen-report-all-epics.
---

<command-name>gen-report-all-epics</command-name>

# Skill : Multi-Epic Report Generation

## Trigger
/gen-report-all-epics [--epics 102,101,174?]

- No `--epics` flag → auto-discover every `test-results-epic{ID}-real.json` in `processed/testcases/test-results/`.
- `--epics 102,101` → restrict to the listed epic IDs.

## Prerequisites
For each epic to be included, the following file MUST exist (produced by `/run-tests` then `/export-results`) :
- `.claude/Data/processed/testcases/test-results/test-results-epic{ID}-real.json` (working artifact)

Per-epic screenshots must exist at `.claude/Data/output/reports/screenshots-epic{ID}/` at the moment the script runs (Playwright writes them there during `/run-tests`). The script then copies them into `runs/{TIMESTAMP}/screenshots-epic{ID}/` so each archived report is autonomous.

## Output
Every run is written directly inside its own timestamped folder — no root-level "current" file:

- `.claude/Data/output/reports/runs/DDMMYYYY-HHMM/`
  - `Report-forAllEpics.html` (frozen HTML, fully autonomous)
  - `screenshots-epic{ID}/` (frozen copies, independent of future Playwright runs)

To open the **latest** report, sort `runs/` by name (DDMMYYYY-HHMM is naturally sortable) and pick the most recent folder.

Console summary :
```
Wrote .../runs/DDMMYYYY-HHMM/Report-forAllEpics.html (+ N screenshot folders)
Verdict: GO|CONDITIONAL|NO-GO (xx.x%) · P/T passed across N epics, S stories
```

## Execution steps

1. Run the locked template script — never regenerate the HTML manually:
       node .claude/Data/templates/build-multi-epic-report.js
   or with explicit epic filter:
       node .claude/Data/templates/build-multi-epic-report.js --epics 102,101
2. Read the console summary and report it to the user (verdict + global stats).
3. Display the absolute path of the generated file.

## Locked design (do NOT deviate)

The output HTML MUST contain exactly **three sections** in this order:

### Section 1 — Global summary (BLUE THEME)
- Background: linear gradient `#1e3a8a → #2563eb`, white text
- Title text: `GEO QA — Release version 1`
- Sub-line: `Run executed on YYYY-MM-DD covering N epics:`
- Below the sub-line: list of epics, each card showing `[EPIC-{ID}] {epic_title}`
- Verdict badge top-right: `GO` (green ≥80%), `CONDITIONAL` (orange 60–80%), or `NO-GO` (red <60%) on white background
- The total test cases count is NOT shown here — it lives in Section 2

### Section 2 — Global statistics (COMPACT, single row)
8 metrics in this exact order, each rendered as a small centered card:
1. Epics
2. User stories
3. Total test cases
4. Passed (green value)
5. Failed (red value)
6. Skipped (grey value)
7. Success rate (verdict-coloured value, with `%`)
8. Duration (in seconds)

CSS rules :
- `display: grid; grid-template-columns: repeat(8, 1fr); gap: 8px`
- Section padding `14px 18px` (smaller than other sections)
- Stat value `font-size: 18px`, label `font-size: 9px uppercase`
- Responsive fallback: ≤1100px → 4 columns

### Section 3 — Per-epic detail (NATIVE HTML5 ACCORDION)

Three nested levels using `<details>`:

- **Epic block** (`<details class="epic-block">`)
  - Header: `EPIC-{ID}` badge · epic title · stats `Ntests · P✓ · F✘ · S- · rate% · verdict`
  - Border-left coloured per verdict
- **Story block** (`<details class="story-block">`)
  - Header: `GEO-{ID}` badge · story title · stats `P passed · F failed · S skipped`
- **Test case card** (`<details class="tc-card">`)
  - Summary: `TC{ID}` · test name · status badge · duration
  - Body (when expanded):
    - **Steps** with Given (blue) / When (orange) / Then (green) / And (grey) keywords
    - **Error details** (only for FAILED tests, never on passed/skipped)
    - **Screenshots** : 3 inline (Given/When/Then), 200px wide, clickable to open full-size in new tab
    - Then screenshot label is **red ("Then (FAIL)")** when the test failed

## Strict rules

- The HTML MUST be self-contained (no JS, no external CSS) so it works offline / in email previews.
- Screenshot paths MUST use `screenshots-epic{ID}/<file>.png` (siblings of the report file).
- Story titles come from the `EPIC_META` dictionary inside the template script. Adding a new epic = add an entry there (NOT in the report HTML).
- Never duplicate counts between Epic / Story / TC levels (each count appears at exactly one level).
- Error details are shown ONLY for FAILED status. PASSED tests show only steps + screenshots.
- Verdict thresholds are global: ≥80% GO, ≥60% CONDITIONAL, <60% NO-GO. Apply the same scale per epic in Section 3 headers.
- Do NOT create temporary `*.tmp.js` regeneration scripts — extend `build-multi-epic-report.js` itself if a feature is missing.
