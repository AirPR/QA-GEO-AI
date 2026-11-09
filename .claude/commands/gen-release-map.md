---
name: gen-release-map
description: Builds and publishes the release map of a Jira fixVersion as a claude.ai Artifact — donut charts of the anomalies (bugs by status) and test cases (by verdict) for the release and for each epic, plus the epic tree (stories, design tasks, sub-tasks by status) and the bugs with no epic. Read-only on Jira. Trigger with /gen-release-map --version 1.3.
---

<command-name>gen-release-map</command-name>

# Skill: Release Map (anomalies and test cases per epic)

## Trigger
```
/gen-release-map --version {fixVersion} [--label {VERSION_LABEL}] [--epics KEY,KEY,...] [--new]
```

| Parameter | Required | Description |
|---|---|---|
| `--version` | Yes | Jira fixVersion, e.g. `1.3` |
| `--label` | No | Release label used in folder names and titles. Default `GEO-R{version}`, e.g. `GEO-R1.3` |
| `--epics` | No | Forces the order of the epics (the others follow). Default order: `EPIC-0xx` number in the epic title, then key |
| `--new` | No | Publishes a new Artifact instead of updating the existing one |

Examples:
```
/gen-release-map --version 1.3
/gen-release-map --version 1.4 --label GEO-R1.4
```

## What the page shows
1. Header: release label and Jira snapshot time (UTC); one-line introduction.
2. Totals line: epics, stories, design tasks, sub-tasks, the number of bugs of the fixVersion (label "bugs"), bugs with no epic.
3. Three release donuts, in this order: "Epics", "Test cases", "Bugs":
   - **Epics**: every epic of the fixVersion, by Jira status (QA In Progress = orange).
   - **Bugs**: every bug of `type = Bug AND project = GEO AND fixVersion = {version}`, by Jira status.
   - **Test cases**: sum of the latest consolidated report of each epic, by verdict (Passed / Partial / Failed / Skipped), with the release verdict.
4. Epic tree, one card per epic. The title reads `KEY, EPIC title, status`. Each card has:
   - status bars for design tasks and sub-tasks;
   - three donuts, each in its own tile with its legend underneath, in this order: **Stories** (by status), **Test cases** (with the verdict of the epic's consolidated report), **Bugs** (child bugs + bugs linked to the epic or its stories).
5. A "No epic parent" card for the bugs of the fixVersion without parent.
6. A table view of every ticket (links to Jira). No "How to read" section (removed at the user's request).

Hovering a slice or a segment shows the keys. The page follows the light / dark theme.

## Data sources
| Data | Source |
|---|---|
| Epics | Jira `project = GEO AND issuetype = Epic AND fixVersion = {version}` |
| Stories, tasks, child bugs | Jira `parent in (epics)` |
| Sub-tasks | Jira `parent in (children)` |
| Linked bugs | Issue links of type Bug on the epic, its children and sub-tasks |
| Bugs of the release | Jira `type = Bug AND project = GEO AND fixVersion = {version}` |
| Test cases | Latest folder `.claude/Data/output/reports/runs/{LABEL}_{EPIC}_{DDMMYYYY-HHMM}/` of each epic, file `*consolidated.html` |

Test-case rules:
- Figures are read from the consolidated report, never recomputed from the raw `real.json` files. Reruns would otherwise override the consolidation choices, such as an environment-blocked attempt that does not replace a PASS.
- Success = (PASS + ½ PARTIAL) / executed, SKIP excluded. Verdict: GO ≥ 80 %, CONDITIONAL 60–79 %, NO-GO < 60 %.
- The report's own verdict note (e.g. "4 FAIL = wording only") is shown next to the verdict.
- An epic with no consolidated report shows "no test case in the QA campaign".

## Execution Steps

### Step 1 — Build the page
```bash
node .claude/Data/templates/release-map/build-release-map.js --version {version} [--label {LABEL}] [--epics KEY,KEY]
```
- Reads `JIRA_URL`, `JIRA_EMAIL`, `JIRA_TOKEN` from `.env`.
- Writes `.claude/Data/output/reports/release-map/{LABEL}-release-map.html`.
- Prints a summary: epics, bug statuses, test figures per epic, epics without a consolidated report.
- A warning `no TC result found … (unknown report layout)` means the consolidated report uses a layout the script does not read. In that case, add the pattern to `consolidatedTests()` in the script rather than editing the page.

### Step 2 — Publish the Artifact
1. Find the existing Artifact: `Artifact` `action: "list"`, look for the title `{LABEL} Release Map`.
2. If it exists (and `--new` is not set):
   - Read it once with `action: "read"`. This is required before updating an Artifact from another conversation.
   - Publish with `file_path` = the generated page and `url` = its link. The link stays the same for everyone it was shared with.
3. Otherwise, publish a new Artifact with `file_path`, `icon: "chart"` and a one-sentence `description`.
4. The Artifact is private. Tell the user that people they want to show it to need access through the page's **Share** menu.

### Step 3 — Report to the user
Short message (in the user's language):
- the link;
- the release donuts in one line each, e.g. "46 bugs: 34 Passed QA, 4 Done, 4 To Do…" and "288 TCs: 91.2 % GO";
- epics with no consolidated report, and bugs with no epic parent (keys);
- anything that changed since the previous version of the page, if known.

## Rules
- **Read-only on Jira.** This command never changes a ticket (parent, status, comment). Setting a missing epic parent or a status is a separate request that needs the user's explicit approval.
- Do not commit the generated page unless the user asks; the Artifact is the deliverable.
- Change the look in `release-map.template.html` (placeholders `{{LABEL}}` and `/*DATA*/null`), never in the generated page.
- Keep the template theme-aware (tokens on `:root`, dark values under `prefers-color-scheme` and `[data-theme="dark"]`).
- Status colours: Passed QA / Done = green (Done hatched), Ready for QA = blue, Action Needed = red, To Do = grey, Abandoned = light grey hatched.
  - Other statuses take the colour of the closest group and keep their name: Ready for Release → Done, Feedback Required → Action Needed, Code Review / In Progress / Backlog → To Do.

## Files
| File | Role |
|---|---|
| `.claude/Data/templates/release-map/build-release-map.js` | Jira + consolidated reports → page |
| `.claude/Data/templates/release-map/release-map.template.html` | Page template (design, charts, table) |
| `.claude/Data/output/reports/release-map/{LABEL}-release-map.html` | Generated page, published as an Artifact |
