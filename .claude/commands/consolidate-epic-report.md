---
name: consolidate-epic-report
description: Builds the consolidated MCP HTML report of one epic from its run and rerun real.json files (latest real result per TC, CSV TCs never run listed as SKIP), copies the screenshots into runs/{VERSION}_{EPIC}_{DDMMYYYY-HHMM}/ and gives the GO / CONDITIONAL / NO-GO verdict. Trigger with /consolidate-epic-report.
---

<command-name>consolidate-epic-report</command-name>

# Command: /consolidate-epic-report

## Usage
```
/consolidate-epic-report --version {VERSION} --epic {EPIC_KEY} [--real a.json,b.json] [--note "text"]
```

| Parameter | Required | Description |
|---|---|---|
| `--version` | Yes | Version folder, e.g. `GEO-R1.4` |
| `--epic` | Yes | Epic key, e.g. `GEO-1226` (or `NO-EPIC-…` for tickets without an epic) |
| `--real` | No | real.json files, oldest first. Default: every `test-results-*{EPIC}*-real.json` of `processed/testcases/test-results/`, sorted by `runDate` |
| `--note` | No | One line shown under the stats (findings file, decisions, known bugs) |

## Steps

1. **List the inputs.** Pick the real.json files of the epic's campaign (story runs, reruns, retests). Leave out prod smoke
   runs and runs of another campaign unless the user asks. Show the list (file, runDate, TCs, statuses) in one table.
2. **Requalifications first.** A requalification decided in the findings file (TC aligned, FAIL accepted as by design,
   PARTIAL closed by a dev answer) must be written into a rerun real.json (new file `-rerun-…`, never edit the original
   run) before building, so the report stays reproducible.
3. **Build:**
   ```bash
   node .claude/Data/templates/build-epic-consolidated-report.js --version {VERSION} --epic {EPIC} \
     --real {a-real.json,b-real.json} --csv ".claude/Data/output/csv/{VERSION}/testcases-coverage-epic{EPIC}.csv" \
     --note "Findings and decisions: apps/geo/{VERSION}/{EPIC}-RUN-FINDINGS.md" --env "staging, QA-GEO, en-GB"
   ```
   - Merge rule: a later result replaces an earlier one, except a later SKIP never erases a PASS / FAIL / PARTIAL.
   - CSV TCs that never ran are listed as SKIP "Not run in this campaign".
   - `missingScreenshotDirs` not empty → find the folder (per-story run folder) and copy it in, or say which TCs show no image.
4. **Check** the page: open the HTML, compare the counts with the real.json files, check a few images load.
5. **Git** (autonomous, CLAUDE.md): commit the new consolidated folder with the CSV / findings / HowTo of the campaign.
   The previous consolidated folder of the same epic is removed from git only with the user's OK.
6. **Report** in one line: verdict, rate, counts, folder path.

## Rules
- Figures come from the real.json files; never edit the generated HTML by hand. A correction = a rerun real.json + rebuild.
- Success = (PASS + ½ PARTIAL) / (total − SKIP). GO ≥ 80 %, CONDITIONAL 60–79 %, NO-GO < 60 %.
- Per-story run folders stay local; only the consolidated folder is committed.
- `/gen-release-map` reads this report: keep the file name `MCP-Report-{EPIC}-consolidated.html`.

## Agent
`epic-report-consolidator-agent` (see `.claude/agents/epic-report-consolidator-agent.md`)
