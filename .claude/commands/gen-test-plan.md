---
name: gen-test-plan
description: Generates a QA test plan in GEO-1110 format, either for a whole release (every epic of a Jira fixVersion, with cross-epic integration and non-regression sections, plus one plan per epic) or for a single epic. Reads the imported epic files and all Jira comments, validates full AC coverage, extracts edge cases, flags open points, presents for review, then optionally pushes to Jira or creates a Sub-task.
---

<command-name>gen-test-plan</command-name>

# Skill: Test Plan Generation in GEO-1110 Format (release or epic)

## Trigger
```
# Release mode — every epic of the fixVersion
/gen-test-plan --release {fixVersion} [--label {VERSION_LABEL}] [--epics KEY,KEY] [--no-split] [common options]

# Epic mode — one epic
/gen-test-plan {epic_key} {version} [--jira-source TICKET] [common options]

common options: [--jira TICKET] [--create-subtask] [--previous TICKET DATE] [--env ENV] [--priority PRIORITY] [--assignee NAME] [--figma FOLDERS]
```

Examples:
```
# Whole release 1.3: release plan + one plan per epic
/gen-test-plan --release 1.3

# Release plan only, epics in a forced order
/gen-test-plan --release 1.3 --epics GEO-1002,GEO-1069,GEO-1209,GEO-1068 --no-split

# One epic, from local imported files
/gen-test-plan GEO-1069 GEO-R1.3

# One epic, ACs fetched from Jira (no local import), plan pushed to an existing ticket
/gen-test-plan GEO-1226 GEO-R1.3 --jira-source GEO-1226 --jira GEO-1110

# One epic, plan created as a Sub-task
/gen-test-plan GEO-440 GEO-V4 --jira GEO-1110 --create-subtask --env Staging --priority High
```

## Parameters

| Parameter | Mode | Required | Description |
|---|---|---|---|
| `--release {fixVersion}` | Release | Yes (release) | Jira fixVersion, e.g. `1.3`. Every epic with this fixVersion is in scope |
| `--label {VERSION_LABEL}` | Release | No | Version folder and plan name. Default `GEO-R{fixVersion}`, e.g. `GEO-R1.3` |
| `--epics {KEY,KEY}` | Release | No | Forces the order of the epics (others follow). Default: dependency order from `QA-READINESS-{LABEL}.md` if present, else `EPIC-0xx` number in the epic title, then key |
| `--no-split` | Release | No | Writes only the release plan (no per-epic plans) |
| `{epic_key}` | Epic | Yes (epic) | Jira epic key, e.g. `GEO-1069` |
| `{version}` | Epic | Yes (epic) | Version folder where the epic files live, e.g. `GEO-R1.3` |
| `--jira-source {TICKET}` | Epic | No | Fetch ACs from this Jira ticket instead of local files |
| `--jira {TICKET}` | Both | No | Jira ticket to update (description) or to create a Sub-task under |
| `--create-subtask` | Both | No | Create a Sub-task under `--jira` instead of updating its description |
| `--previous {TICKET} {DATE}` | Both | No | Previous plan reference for the metadata line. Default: the plan file already on disk (its `Updated` date) |
| `--env {ENV}` | Both | No | Test environment (default: Staging) |
| `--priority {PRIORITY}` | Both | No | Priority (default: High) |
| `--assignee {NAME}` | Both | No | Assignee name (default: omitted) |

## Outputs

| Mode | File |
|---|---|
| Release plan | `apps/geo/{LABEL}/TEST-PLAN-{LABEL}.md` |
| Per-epic plan (release mode, unless `--no-split`; and epic mode) | `apps/geo/{VERSION}/{EPIC_KEY}/TEST-PLAN-{EPIC_KEY}.md` |

The release plan and the per-epic plans come from one generation pass: same scenarios, same wording, same open points. Only the numbering differs (consecutive across the release in the release plan, from 1 in each epic plan), and the cross-epic and non-regression sections exist only in the release plan.

## Execution Steps

### Release mode
1. Parse parameters.
2. **List the epics** of the fixVersion from Jira (read-only): `project = GEO AND issuetype = Epic AND fixVersion = {fixVersion}`; order them (see `--epics`).
3. For each epic:
   - Local folder `apps/geo/{LABEL}/{EPIC_KEY}/` present → read `EPIC.md` + `STORY_*.md` / `TASK_*.md` (agent Mode A).
   - No local folder → read the epic and its children from Jira (agent Mode B) and say so in the summary. Suggest `/import-jira-epic` afterwards.
   - Epic with no Story / Task (e.g. only a Design Task) → no scenario; it is listed in the summary, not silently dropped.
4. **Read every Jira comment** of each epic, its Stories / Tasks, Sub-tasks and linked bugs (agent Level 3), plus the local QA files of the version (`PO-PM-QUESTIONS-*.md`, `QA-READINESS-*.md`, `*-RUN-FINDINGS.md`).
5. Build the scenarios per epic (same rules as epic mode), then the **Cross-Epic Integration** and **Non-Regression** sections (agent "Release mode" rules).
6. Read the TC CSVs of the version to fill the `Source CSV` metadata with the real counts.
7. **Review gate** (see below), then write the release plan and, unless `--no-split`, one plan per epic.
8. `--jira` / `--create-subtask` → as in epic mode, with the release plan.

### Epic mode
1. Parse parameters.
2. Read the source data: `--jira-source` → Jira; otherwise `apps/geo/{VERSION}/{EPIC_KEY}/`.
3. Read every Jira comment (agent Level 3) and the local QA files of the version.
4. Filter technical ACs, build the AC coverage map, group by functional area, extract edge cases, flag open points.
5. Read the epic's TC CSV for the `Source CSV` metadata.
6. Review gate, then write `apps/geo/{VERSION}/{EPIC_KEY}/TEST-PLAN-{EPIC_KEY}.md`.
7. `--jira` → update the ticket description; `--jira` + `--create-subtask` → create a Sub-task.

## Review gate
- **Epic mode**: display the full plan in the conversation with the coverage summary; write nothing until the user approves.
- **Release mode** (too long to read in the chat): write the plan files with `**Status:** DRAFT for review`, then display only:
  - the summary (epics, groups, scenarios, edge cases, open points, AC coverage per epic);
  - the cross-epic and non-regression scenarios in full;
  - the open points in full;
  - the file paths.
  On approval, set `**Status:** Approved {DATE}`. Nothing is pushed to Jira before approval.
- Corrections → apply, re-display the changed part, ask again.

## Expected response
- Mode, epics in scope (and which were read from Jira instead of local files), epics with no scenario.
- Per epic: functional groups, scenarios, edge cases, open points, AC coverage `X/Y`, untestable ACs.
- Release: cross-epic and non-regression scenario counts, total scenarios.
- Jira comments read / applied / questions left open.
- Files written (DRAFT or approved), Jira update / Sub-task status if requested.

## Key Rules
- **GEO-1110 format strictly**: `### ` title, bold group headers, `- Scenario N:` bullets, `*` edge cases and open points; epic sections in a release plan start with `##### {EPIC_KEY} — {Epic title}`
- **No sub-bullets** inside scenario bullets — one line per scenario
- **Scenario numbering**: consecutive across the whole document, never reset (per-epic files start at 1)
- **Technical AC filtering**: same strict rules as `/gen-tc-csv`
- **Out of scope**: never generate scenarios for behaviours listed in an epic's Out of Scope
- **Full AC coverage**: every functional AC maps to at least one scenario; untestable ACs flagged in Open Points; the coverage table is written as an annex (`#### AC Coverage by Story`)
- **Pre-campaign document**: the plan says what will be tested, as at the start of the campaign. No bugs (keys, statuses), no run results or findings, no execution status, even when the plan is generated late to catch up. Open points are requirement questions and test prerequisites only
- **Open points**: flag, never guess
- **Jira comments**: every comment of the epic, Stories/Tasks, Sub-tasks and linked bugs is read before writing; latest PO decision wins over stale AC text (gap flagged as open point); read-only on Jira
- **Jira push**: only when `--jira` is explicitly provided AND the user has approved the plan
- **Sub-task creation**: only when `--create-subtask` is explicitly provided AND the user has approved the plan
- **Existing plan on disk**: keep it as the previous version (metadata line), mark changed scenarios `*(new)*` / `*(corrected)*`, never delete it without asking

## Agent Used
`test-plan-gen-agent`

## Dispatch (MANDATORY)

When this command is triggered:
1. Use `Agent` with `subagent_type: test-plan-gen-agent`, passing the mode (release / epic) and all parameters
2. If the agent is not available in the session → use `general-purpose` passing the full content of `.claude/agents/test-plan-gen-agent.md` as instructions
3. Never bypass this command by launching an agent directly without going through `/gen-test-plan`
