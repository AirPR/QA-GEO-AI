---
name: promote-passed-qa
description: Checks every ticket of a Jira fixVersion (stories, tasks, epics, QA Test Plan sub-tasks) and moves to "Passed QA" the ones with no open bug and every test case run successfully in the latest consolidated report (PASS, or a PARTIAL / SKIP with a documented reason that is not pending work). Posts a short QA comment on each promoted ticket. Trigger with /promote-passed-qa --version 1.3.
---

# Skill: Promote ready tickets to "Passed QA"

## Trigger
```
/promote-passed-qa --version {fixVersion} [--label {VERSION_LABEL}] [--epics KEY,KEY,...] [--dry-run]
```

| Parameter | Required | Description |
|---|---|---|
| `--version` | Yes | Jira fixVersion, e.g. `1.3` |
| `--label` | No | Release label used in the run folder names. Default `GEO-R{version}` |
| `--epics` | No | Restrict the check to these epics |
| `--dry-run` | No | Report only: nothing is written to Jira |

Without `--dry-run` the transitions and comments are applied **without asking**. This is a user decision of 2026-10-27, an explicit exception to the rule "every Jira write needs a validation" for this command only.

## Rules

| Ticket | Promoted to Passed QA when |
|---|---|
| Story / Task | Status is Ready for QA, QA In Progress or Action Needed. At least one TC of the ticket is in the epic's latest consolidated report, and none of them is FAIL. Every PARTIAL / SKIP has a documented reason that is not pending work. No open bug is linked to the ticket. |
| Epic | Status is a QA status. Every story / task of the epic is closed (Passed QA, Done, Abandoned, Ready for Release), counting the promotions of this run. No open bug: child bugs, plus bugs linked to the epic or its stories / tasks. No FAIL in the consolidated report. |
| QA Test Plan sub-task | Its parent (epic, story or task) is closed, counting the promotions of this run. |

- **Test cases** come from the latest folder `.claude/Data/output/reports/runs/{LABEL}_{EPIC}_{DDMMYYYY-HHMM}/`, file `*consolidated.html`. A TC belongs to a story through its ID, `TC-GEO-{story}-NNN`.
- **A documented reason** is the "Skip reason", "Notes" or "Requalified" text of the TC in the report, at least 20 characters long.
- **Pending work is never accepted.** A reason with any of these patterns blocks the ticket:
  - "to run after", "after the 1.x deploy", "not deployed";
  - "to confirm", a PO decision or answer still expected;
  - "CSV gap", "pending", "still open", "waits for", "to rerun";
  - "to close", "not covered", "re-asked", "promised" (evidence still expected from the dev — added 2026-11-03 after GEO-1220 was promoted with TC-009 waiting for dev evidence).
- **Open bug** = any status other than Passed QA, Done, Abandoned, Ready for Release, Duplicate, Passed UAT, Closed, Released.
- **Tickets left alone:**
  - a ticket in a non-QA status (To Do, In Progress, Code Review…): reported as SKIPPED;
  - a story / task with no TC: reported as BLOCKED.

## Execution Steps

### Step 1 — Make sure the consolidated reports are current
The decision reads only the consolidated reports. Retests, reruns and PO answers have to be consolidated first (see the consolidation rule in `CLAUDE.md`), or a ticket is judged on stale results.

### Step 2 — Run the script
```bash
node .claude/Data/templates/release-readiness/promote-passed-qa.js --version {version} [--label {LABEL}] [--epics KEY,KEY] [--dry-run]
```
- Reads `JIRA_URL`, `JIRA_EMAIL` and `JIRA_TOKEN` from `.env`.
- **Order:** stories / tasks first, then epics, then QA Test Plans. A parent is promoted in the same run as its last child.
- **For each promoted ticket:**
  1. POST a top-level v2 comment in English. It gives the TC counts, each PARTIAL / SKIP with its reason, the closed linked bugs and the consolidated report path.
  2. Apply the "Passed QA" transition.
  3. GET the ticket to check its status. A mismatch is reported as ERROR.
- **Writes the report** `.claude/Data/output/release-readiness/{LABEL}-passed-qa-{YYYYMMDD-HHMM}[-dryrun].md`: one row per ticket with its verdict (PROMOTE, BLOCKED, SKIPPED, CLOSED, ERROR) and the reason.

### Step 3 — Report to the user
Short message, in the user's language:
- the promoted tickets, with their comment IDs;
- the blocked tickets, one line each with the reason (FAIL, pending TC, open bug, child not closed);
- the report path.

Then refresh the release map (`/gen-release-map --version {version}`) when it exists, so its statuses match.

## Rules
- Never promote a ticket from a FAIL, an unexplained PARTIAL / SKIP, or a pending one. Never soften the rule to promote a ticket.
- The comment carries no screenshot. The proof stays in the consolidated report.
- Comments are in English (project rule for every Jira write).
- Do not edit the consolidated reports to unblock a ticket. Rerun or consolidate first.

## Files
| File | Role |
|---|---|
| `.claude/Data/templates/release-readiness/promote-passed-qa.js` | Jira + consolidated reports → transitions, comments, report |
| `.claude/Data/output/release-readiness/` | Reports of each run |
