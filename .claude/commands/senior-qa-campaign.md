---
name: senior-qa-campaign
description: Runs the whole QA campaign of an epic like a senior tester — imports the epic if needed, analyses the stories and every comment, generates and reviews the test cases, writes the test plan, prepares the test data, runs the tests story by story, triages the results, retests linked bugs, reports new bugs and builds the consolidated HTML report. Uses the project agents for each phase and stops only at the user approval gates. Trigger with /senior-qa-campaign.
---

<command-name>senior-qa-campaign</command-name>

# Command: /senior-qa-campaign

## Usage
```
/senior-qa-campaign {EPIC_KEY or URL} {VERSION} [--url URL] [--from PHASE] [--only PHASE,PHASE] [--stories KEY,KEY] [--no-figma] [--no-run]
```

| Parameter | Required | Description |
|---|---|---|
| `{EPIC_KEY}` | Yes | Epic key or Jira URL, e.g. `GEO-1226` |
| `{VERSION}` | Yes | Version folder, e.g. `GEO-R1.4` |
| `--url` | No | Application URL. Default `https://staging-geo.onclusive.com/geo` |
| `--from` | No | Resume at a phase (`import`, `analyse`, `tcs`, `plan`, `jdd`, `run`, `triage`, `bugs`, `report`) |
| `--only` | No | Run only these phases |
| `--stories` | No | Restrict the campaign to some stories / tasks of the epic |
| `--no-figma` | No | Skip the Figma analysis (by default it runs whenever a Figma link is found) |
| `--no-run` | No | Stop after the JDD (preparation only) |

Example: `/senior-qa-campaign GEO-1226 GEO-R1.4`

## How it runs (MANDATORY)

- **The campaign runs in the main conversation**, following `.claude/agents/senior-qa-tester-agent.md` (role, judgment
  rules, gates). Do NOT hand the whole campaign to one subagent: a subagent cannot start other agents.
- Each phase is delegated to the project agent named below with the `Agent` tool, **one at a time** (MCP agents share the
  browser). The coordinator keeps only each agent's conclusion, checks its output files, then moves on.
- A phase whose output already exists and is up to date is not redone (say so in one line). Re-importing / regenerating
  over existing files follows the agents' own change-plan rules.
- A short progress line to the user at each phase start (« Phase 3/9 : cas de test… »), in the user's language.
- Keep a campaign log in `apps/geo/{VERSION}/{EPIC}-RUN-FINDINGS.md` (section « Campagne »: date, phase, outputs).

## Phases

| # | Phase | Delegated to | Output | Gate (user) |
|---|---|---|---|---|
| 0 | Preflight | coordinator | env check | — |
| 1 | Import | `import-jira-epic-agent` (`/import-jira-epic`) | `apps/geo/{VERSION}/{EPIC}/` | re-import change plan only |
| 2 | Analyse | coordinator (+ `sync-tcs-epic-agent` if a CSV exists) | analysis notes, open points | — |
| 2b | Design (Figma) | `extract-figma-screen-agent` (`/extract-figma-screen --url … --nodes …`), then coordinator | `figmaScreens/{NN}_{EPIC}_{name}/` + « Design » notes | — |
| 3 | Test cases | `tc-csv-generator-from-ac-agent` (`/gen-tc-csv`) | `csv/{VERSION}/testcases-coverage-epic{EPIC}.csv` + `-review.md` | **review** of the TC list |
| 4 | Test plan | `test-plan-gen-agent` (`/gen-test-plan {EPIC} {VERSION}`) | `TEST-PLAN` markdown | push to Jira only on OK |
| 5 | Test data | `GEO-jdd-preparer-agent` (`/GEO-prepare-jdd`) | `jdd/{EPIC}/default.json` | **creations** (analysis, setting, override) |
| 6 | Run | `mcp-playwright-runner-agent` (`/run-mcp-PWT-tests --story`) per story; `playwright-runner-agent` for existing specs | real.json + run folder per story | none (read-only runs); writes need the phase 5 OK |
| 7 | Triage | coordinator | `{EPIC}-RUN-FINDINGS.md` with Decision column | **one** grouped validation |
| 8 | Bugs and retests | `bug-reporter-agent` (`/create-bugs` mode B), `qa-run-and-report-agent` (`/run-and-report`), `/comment-jira-bug` | Jira bugs, retest comments, reruns | bug drafts in one table |
| 9 | Report | `epic-report-consolidator-agent` (`/consolidate-epic-report`), then `/gen-release-map` if the release map exists | `runs/{VERSION}_{EPIC}_{TS}/` | — |

### Phase 0 — Preflight
- `git status` (uncommitted files at risk), `git pull origin main` only if the tree is clean.
- `.env` has `JIRA_*`, `GEO_USER_*` (main, EDITOR, READER, PQL); `.mcp.json` has `--isolated`.
- Jira: epic exists, type Epic, its fixVersion and status, child statuses (stories in Ready for QA or later are testable;
  earlier ones are listed and left out unless the user says otherwise).
- Environment reachable; `GET /geo/api/v1/auth/me` = organisation QA-GEO, language en-GB, flags noted.
- **Bugs of the epic**: list every Bug that is a child of the epic or of its stories, or linked to them (issue links,
  `epic-data.json` `ignoredChildren`), with status and fixVersion. Those in **Ready for QA** go to phase 8 (retest);
  the others are noted (open bug = known FAIL for its TCs).

### Phase 1 — Import
- Folder missing → `/import-jira-epic {EPIC} {VERSION}`.
- Folder present → compare Jira `updated` of the epic and children with `epic-data.json`; changed → re-import (the agent
  shows its change plan; the user confirms).

### Phase 2 — Analyse (senior judgment)
- Read EPIC.md, every STORY / TASK file, the GitHub / Figma / strings-sheet links listed there.
- Read ALL Jira comments of the epic, its stories and linked bugs (every date, threaded replies).
- Build the analysis notes (in the findings file, section « Analyse »): testable ACs per story, dependencies (linked bugs
  to retest, other epics), data needs, environment constraints (flags, roles, languages, exports), risks, AC gaps and
  ambiguities → open points (requirement questions only, no bugs, rule « test plan = pre-campaign »).
- If a CSV already exists → `/sync-tcs-epic {EPIC} {VERSION} --since {epic creation date}` instead of regenerating.

### Phase 2b — Design (Figma), automatic when a link is found
1. **Detect** every Figma link (`figma.com/design/`, `/file/`, `/proto/`, `/board/`) in: EPIC.md, every STORY / TASK file,
   `epic-data.json` (`design`, `ignoredChildren` = Design Tasks), and in Jira the description, comments and remote links
   of the epic, its stories and its Design Task children. Keep the `node-id` of each link and the story it belongs to.
2. **Extract** the linked frames, one Figma file at a time: `/extract-figma-screen --url {link} --nodes {node-ids}
   --section {EPIC}_{short name}` (batches of 3, `FIGMA_TOKEN` from `.env`). Frames already extracted for the same
   node id and Figma `lastModified` are reused. `FIGMA_TOKEN` missing or 403 → say so, go on without design (open point).
3. **Analyse** the PNGs visually (Read tool), story by story, and write the « Design » section of the findings file:
   one line per frame → path, story, screen / state shown, exact UI texts (titles, buttons, empty states, tooltips, errors),
   states and variants (loading, empty, error, hover, disabled, languages), and **gaps**:
   - state or text in Figma with no AC → candidate `[Figma]` TC;
   - Figma contradicts an AC or a PO / dev comment → open point (the AC / comment wins until the PO answers);
   - AC with no design → noted, no blocker.
4. These notes feed phases 3 and 4. `--no-figma` skips this phase.

### Phase 3 — Test cases
- `/gen-tc-csv {EPIC} {VERSION} --figma` whenever phase 2b found Figma frames (pass the `figmaScreens/` folders and the
  « Design » notes so the agent uses the exact UI texts and adds `[Figma]` TCs for states no AC covers); no Figma, no flag.
- Each Design gap of phase 2b ends up as a TC, an open point, or a line « not tested, why ».
- Each bug of the epic (phase 0) has a regression TC (`Related bug: GEO-xxxx` in the description).
- Review as a senior tester before showing it: every AC covered (positive, negative, boundary), no TC without an AC or
  rule, roles / languages / exports covered when the ACs name them, linked bugs have a regression TC, data written in
  the TC. Fix obvious gaps with the agent, then show the review file ONCE (one table: story, TCs, ACs covered, open points).

### Phase 4 — Test plan
- `/gen-test-plan {EPIC} {VERSION}` from the reviewed TCs (pre-campaign content only: scope, scenarios, data,
  environment, open points, no results). Pushing it to Jira or creating the QA Test Plan sub-task = user OK.
- With Figma: pass `--figma {figmaScreens folders}` so the plan cites the design frame per scenario, lists the visual
  states to check, and the Figma ↔ AC contradictions as open points.

### Phase 5 — Test data
- Data in another organisation (e.g. GEO Stress Test 2026-10): switching organisation to read / test it is allowed
  (back to QA-GEO at the end, checked with `/auth/me`); creating, updating or deleting data there needs the user's OK
  (user rule 2026-11-09).
- `/GEO-prepare-jdd --version {VERSION} --epic {EPIC}`. Approved creations are done by the agent that needs them, with
  cleanup in the JDD `cleanup[]`; test analyses keep 5 prompts.

### Phase 6 — Run
- **Jira statuses at the start of the tests (automatic, user rule 2026-11-04)**: move the epic and every story / task
  that is tested in this campaign to **QA In Progress** (GET transitions, pick `to.name`, POST, expect 204, verify).
  Stories left out of the campaign keep their status. Report it in one line.
- One story at a time: `/run-mcp-PWT-tests --csv {CSV} --url {URL} --story {KEY}` (spec `{EPIC}-{STORY}-mcp`).
  Never two MCP agents at once. Pass the JDD path and the role-account table to the runner.
- After each story: read its real.json summary; an environment failure (session expired, 502, data missing) → fix the
  cause and rerun that story before going on.
- Language changes only for language TCs, then en-GB restored and checked; Manage Scope: never the header checkbox on a
  list with suggestions.
- End of phase: run the JDD `cleanup[]` (deletions approved in phase 5), check `/auth/me` and the pool.

### Phase 7 — Triage (senior judgment)
For every FAIL / PARTIAL / SKIP and every side finding:
1. Re-read the TC, the AC and the comments; check the evidence screenshot shows the defect (re-check live if in doubt).
2. Classify: product bug (new or existing), TC to align (label, data, behaviour decided by PO / dev), environment issue
   (rerun), PO question (AC silent or contradictory), not verifiable by QA (logs, DB) → dev request.
3. Look for an existing bug first (Jira search on the feature and the linked tickets); near duplicate → ask.
4. Write `apps/geo/{VERSION}/{EPIC}-RUN-FINDINGS.md`: one table per type, Decision column pre-filled with the
   recommendation, evidence path, AC / rule cited. Show it ONCE: « sauf avis contraire j'applique la colonne Décision ».
5. Apply in one go after the answer: CSV / review alignments, reruns (new `-rerun-` real.json + run folder), drafts.

### Phase 8 — Bugs and retests
- **Bugs in Ready for QA** (phase 0 list, refreshed now): retest each one, one at a time, with `/run-and-report`
  (`qa-run-and-report-agent`). Fix validated → comment with proof + Passed QA (automatic rule). Still present / partial →
  draft comment + `Action Needed` proposed in the grouped table. Results go to the findings file (table « Bugs retested »)
  and to a `-retest-bugs-` real.json when the bug has a TC, so the consolidated report shows them.
- New bugs: `/create-bugs statique-bugs` mode B with all drafts in ONE table (defaults of create-bugs: priority, parent,
  link, sprint, To Do), annotated evidence; created after one OK.
- Linked bugs in Ready for QA: `/run-and-report` each (fix validated → comment with proof + Passed QA, automatic).
- PO questions: one comment tagging the PO, text shown once, posted after OK.
- High-confidence factual comments (retest results, data asked by the dev) follow the CLAUDE.md autonomy table.

### Phase 9 — Report and wrap-up
- `/consolidate-epic-report --version {VERSION} --epic {EPIC}` with the campaign's real.json files (reruns last).
- Release map exists for the fixVersion → `/gen-release-map --version {fixVersion}` to refresh it.
- Update `Docs/HowTo.txt` (new lessons), then commit + push the consolidated folder, CSV, review, findings, JDD,
  test plan (autonomous per CLAUDE.md); per-story run folders stay local.
- **Jira statuses at the end of the campaign (automatic, user rule 2026-11-04)**, after the consolidated report:
  - story / task with at least one open bug (created in the campaign or linked, not Done / Passed QA / Abandoned),
    or a TC in FAIL caused by a product defect → **Action Needed**;
  - story / task with every TC passed (or accepted on evidence / requalified) and no open bug → **Passed QA**;
  - story / task still waiting only for data, PO answers or PARTIAL / SKIP steps → stays **QA In Progress** (say why);
  - epic → **Action Needed** if any tested story is Action Needed; **Passed QA** when every story is Passed QA;
    otherwise **QA In Progress**.
  GET transitions, pick `to.name`, POST, expect 204, verify each status; no comment needed; log the changes in the
  findings file « Campagne » and report them in one table. The same rule applies after each retest round of phase 8.
- Offer `/promote-passed-qa` when stories have every TC passed and no open bug.
- Final message (user's language), short table: phase → result; verdict and rate; bugs created / retested; open points
  waiting for PO / dev; data left on the environment; next step.

## Stop conditions
- Auth fails, environment down, epic not found, or a gate is waiting → stop, say what is needed, and how to resume
  (`--from {phase}`).
- Never weaken an assertion, never mark PASS a failing check, never change an expected behaviour without the user.

## Agent
`senior-qa-tester-agent` (see `.claude/agents/senior-qa-tester-agent.md`)
