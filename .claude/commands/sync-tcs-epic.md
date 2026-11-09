---
name: sync-tcs-epic
description: Synchronises the TC CSV with PO changes on a Jira epic. Detects added/modified/deleted ACs since the last generation date, reads the PO/dev comments posted since then, matches them against the open questions and run findings, proposes an action plan, and applies the delta to the CSV after confirmation.
---

<command-name>sync-tcs-epic</command-name>

# Skill: Sync TCs with Epic PO Changes and PO Answers

## Trigger
```
/sync-tcs-epic {epic_key} {version} [--since YYYY-MM-DD] [--questions {path}] [--findings {path}]
```

Examples:
```
/sync-tcs-epic GEO-152 GEO-R1.2 --since 2026-09-18
/sync-tcs-epic GEO-1002 GEO-R1.3 --since 2026-10-19 --findings apps/geo/GEO-R1.3/GEO-1002-RUN-FINDINGS.md
```

## Parameters
- `{epic_key}`: Jira epic key (required)
- `{version}`: version folder where the epic lives, e.g. `GEO-R1.3` (required). Local files: `apps/geo/{VERSION}/{EPIC_KEY}/` (`EPIC.md`, `STORY_*.md`, `TASK_*.md`, `epic-data.json`)
- `--since YYYY-MM-DD` (optional): date of the last TC generation / last sync. Only stories updated, and comments created, **on or after** this date are analysed. If absent, the agent asks for the date (suggest the CSV modification date).
- `--questions {path}` (optional): open-questions file for the PO/PM. Default: `apps/geo/{VERSION}/PO-PM-QUESTIONS-{VERSION}.md` if it exists.
- `--findings {path}` (optional): run-findings file (bugs, PO questions, proposed CSV changes from test runs), e.g. `apps/geo/{VERSION}/{EPIC_KEY}-RUN-FINDINGS.md`. Default: that path if it exists.

## Execution Steps

### Phase 1 — FETCH: Retrieve current Jira state
1. Read `.env` for `JIRA_URL`, `JIRA_TOKEN`, `JIRA_EMAIL`
2. Epic: `GET {JIRA_URL}/rest/api/3/issue/{EPIC_KEY}?fields=summary,description,updated,issuelinks`
3. Stories and tasks: `POST {JIRA_URL}/rest/api/3/search/jql`
   Body: `{"jql":"parent=\"{EPIC_KEY}\" AND issuetype in (Story,Task)","fields":["summary","description","status","updated","issuetype","issuelinks"],"maxResults":100}`
4. Linked bugs: every issue of type Bug linked to the epic or to one of its stories/tasks (from `issuelinks`), plus bugs cited in the questions/findings files
5. Comments: `GET {JIRA_URL}/rest/api/3/issue/{KEY}/comment?orderBy=created&maxResults=100` for the epic, every story/task, every design task and every linked bug. Use comments with `created >= --since` for the "what changed" summary, BUT match the open items (Phase 2b) against **ALL comments, any date, including threaded replies (`parentId`)** — an answer given before `--since` (e.g. in a reply to a dev question) still closes the item. Never propose a question to the PO that an existing comment or AC already answers (lesson 2026-10-22: GEO-1209 Q-02 / Q-08 / A16 / A18 were answered on 06/10 in reply 859152).
6. Changelog: `GET {JIRA_URL}/rest/api/3/issue/{KEY}/changelog?maxResults=100`; keep `description` and `status` changes on or after `--since` (who and when)
7. Save every raw response under `.tmp-jira/` (Windows: never pipe curl to `/dev/stdin`) and parse with `node -e "require('./.tmp-jira/<file>.json')"`
8. Display a summary table: issues with description changes, issues with new comments (author, date), issues skipped

### Phase 2 — DIFF AC: Compare Jira vs local files
For the epic and each story/task whose description changed:
1. Read the corresponding local `EPIC.md` / `STORY_*.md` / `TASK_*.md` from `apps/geo/{VERSION}/{EPIC_KEY}/`
2. Parse the Jira ADF description to markdown
3. Classify each AC into one of six categories:

| Category    | Detection signal                              | CSV action                        |
|-------------|-----------------------------------------------|-----------------------------------|
| AC_NEW      | Present in Jira, absent from local file       | ADD                               |
| AC_DELETED  | Absent from Jira, present locally             | DELETE (confirmation required)    |
| AC_REWRITTEN| Same number, business rule changed            | UPDATE                            |
| AC_RENUMBERED| Same content, different number               | FIX REF                           |
| AC_CONFIRMED| Context note added, no rule change            | Update EPIC.md / STORY_*.md / TASK_*.md only |
| AMBIGUOUS   | Cannot determine between REWRITTEN/CONFIRMED  | Present to user, wait for decision|

Strong signals:
- AC_NEW: "new", "added by PM", "added YYYY-MM-DD"
- AC_DELETED: "deleted", "do not implement"
- AC_REWRITTEN: "rewritten", "corrected by PM", "updated YYYY-MM-DD", changed values or conditions
- AC_CONFIRMED: "confirmed", accepted consequence, context note without new rule

**Caution rule**: When in doubt between AC_REWRITTEN and AC_CONFIRMED, classify as AMBIGUOUS and wait for human decision — never decide alone.

4. Prepare the updated local files with the latest Jira content (written in Phase 4, after confirmation)

### Phase 2b — ANSWERS: Analyse comments and match them to open items
1. **Classify each comment** (and each description change that answers a question):

| Class | Meaning |
|-------|---------|
| PO_DECISION | The PO/PM decides a behaviour, wording or scope (by design / to fix / out of scope / deferred) |
| DEV_ANSWER | A developer explains the implemented behaviour or a technical limit |
| BUG_STATUS | A bug is fixed, won't fix, duplicate or needs more info |
| QUESTION_BACK | The PO/dev asks QA a question in return |
| INFO | Context only, no decision |

   Identify the author's role from the epic/story history (reporter, assignee, PM named in the epic) — never guess from a name alone; if unclear, show the author and let the user decide.

2. **Read the open items**:
   - questions file (`--questions`): every question, decision (P*n*, D*n*, A*n*, OP-*n*, B*n*…) with its current status
   - findings file (`--findings`): every item with an ID (F-*nn* bugs, Q-*nn* PO questions, K-*nn* known bugs) and the proposed CSV changes marked **(PO, Q-nn)**

3. **Match** each open item to the comments / description changes that answer it (same story key, same AC, same quoted text or i18n key, explicit reference to the ID or to the QA comment). One comment can answer several items.

4. **Status per item**:

| Status | Meaning |
|--------|---------|
| ANSWERED | A clear decision exists — quote it (≤ 2 sentences) with issue key, author, date |
| PARTIAL | Part of the item is decided, part is still open |
| CONTRADICTS | The answer contradicts the current AC text or the current TC — needs an AC update request or a TC change |
| OPEN | No answer found |

5. **Derive the TC impact** of each ANSWERED / PARTIAL / CONTRADICTS item:
   - "by design" → UPDATE the TC expected result to the observed behaviour (and apply the linked proposed CSV change)
   - "to fix" / "bug" → keep the TC strict (expected result unchanged) and list the item as a bug to create with `/create-bugs` (mode B, draft only)
   - "out of scope" / "deferred" → propose SKIP marker or DELETE (confirmation required)
   - wording / string decision → UPDATE the exact text in the TC
   - bug fixed → mark the related TC for re-run; bug "won't fix" → align the TC with the PO decision

### Phase 3 — DELTA TC: Map changes to existing TCs
1. Read the CSV: `.claude/Data/output/csv/{VERSION}/testcases-coverage-epic{EPIC_KEY}.csv` (fallback: recursive search under `.claude/Data/output/csv/`) and its review file `testcases-coverage-epic{EPIC_KEY}-review.md`
2. For each AC change (Phase 2) and each answer impact (Phase 2b), locate the TC via `Covers AC-N` in column 1, via the TC IDs listed in the questions/findings item, or via column 13 (`QA Story/Task`)
3. Build one action plan, grouped by story:

```
STORY GEO-1237:
  UPDATE  TC-GEO-1237-006  Q-04 ANSWERED (PO, GEO-1002 comment 2026-10-19): ChatGPT + Gemini on by default
  KEEP    TC-GEO-1237-007  Q-03 ANSWERED "bug": TC unchanged, bug to create (F-xx)
  ADD     TC-GEO-1237-012  AC-3 new: ...
STORY GEO-1240:
  OPEN    TC-GEO-1240-004  Q-07 no answer — unchanged
```

4. Also list: the questions/findings items to update (status + decision quote), bugs to create, TCs to re-run, local files to update
5. **Present the full plan to the user and wait for confirmation before applying anything.**

### Phase 4 — APPLY: Apply the delta
After user confirmation, apply in this order: local EPIC/STORY/TASK files, CSV deletions, updates, ref fixes, additions, review file, questions/findings files.

**Deletions**: Remove all rows of the TC (every row with that TC ID in column 3).
**Updates**: Start from the CURRENT CSV rows (they may hold manual QA corrections made after generation: real UI labels, en-GB spelling, flag preconditions, SKIP markers, baselines). Change only what the AC change or the answer requires; never revert other text.
**Ref fixes**: Change only the `Covers AC-N` mention in column 1.
**Additions**: Insert new TCs after the last TC of the same story. Numbering = last existing + 1. Never reuse a deleted number.
**Review file**: mirror every CSV change in `testcases-coverage-epic{EPIC_KEY}-review.md` (TC section + summary counts).
**Questions / findings files**: set each matched item's status (ANSWERED / PARTIAL / CONTRADICTS) with the decision quote, source (issue key, author, date) and the TC action taken.

CSV format (16 columns, separator `;`, UTF-8, quotes doubled inside quoted cells):
col1: Description (first row) / empty | col2: QA Priority (first row) / empty | col3: Test name = TC ID + title (all rows)
col4: Test step (Given / When / Then / And) | col5: Test data | col6: Expected result
col7: Labels | col8: QA Parent (epic key) | col9: Components | col10: Smoke | col11: QA Component
col12: QA Precondition | col13: QA Story/Task | col14: QA Regression | col15: UI/Functional Test case | col16: Test Type

Cucumber rule: columns 1, 2, 7–16 filled ONLY on the first row of each TC.

All CSV modifications are done via Bash + Node.js with a real CSV parser (quoted cells may contain `;`), with systematic verification after each operation: every row has 16 fields, TC count per story, no lost quotes.

### Phase 5 — FINAL REPORT
```
## Sync {EPIC_KEY} — {date}

Issues with description changes: N | Issues with new comments: N
Open items: N | ANSWERED: N | PARTIAL: N | CONTRADICTS: N | still OPEN: N

| Story | DELETE | UPDATE | FIX REF | ADD | KEEP (bug) | SKIP |
|-------|--------|--------|---------|-----|------------|------|
| TOTAL | N      | N      | N       | N   | N          | N    |

TCs before: N | TCs after: N
CSV updated: .claude/Data/output/csv/{VERSION}/testcases-coverage-epic{KEY}.csv
Bugs to create: F-xx, ... (use /create-bugs mode B)
TCs to re-run: TC-..., ...
```

Warnings: orphan TCs, AMBIGUOUS ACs, items still OPEN, QUESTION_BACK comments waiting for QA, stories without local files, new ACs without TC.

## Key Rules

- **Mandatory confirmation** before any deletion or modification — present the plan first
- **Surgical** — only touch TCs of stories/items impacted since `--since`
- **Preserve manual QA corrections** — update from the current CSV, never regenerate a TC from scratch
- **Quote, don't paraphrase** — every decision used is quoted with its source (issue key, author, date)
- **No renumbering** — gaps in sequence are intentional (traceability)
- **AC reference mandatory** — every TC must contain `Covers AC-N` after update
- **Strict 16-column format** — enforced on every CSV row
- **Local files, CSV, review and questions/findings files always updated together**
- **Ambiguity = human** — never decide alone on a doubtful classification or an unclear author role
- **Read-only on Jira** — never post comments or create issues; bugs go through `/create-bugs`

## Edge Cases

| Case | Behaviour |
|------|-----------|
| Jira story/task without local file | Signal — suggest running /import-jira-epic first |
| TC without AC reference in description | Flag as orphan TC — do not modify automatically |
| New AC with no TC in CSV | Note in warnings — suggest /gen-tc-csv {STORY_KEY} {VERSION} |
| Brand new story in epic | Out of scope — use /import-jira-epic then /gen-tc-csv |
| --since absent | Ask the user (suggest CSV modification date) |
| Comment answers an item of another epic | Report it in the plan under "cross-epic" — do not apply it in this run |
| Answer only in an attachment / image | Report it as PARTIAL with the attachment name — ask the user |

## Agent Used
`sync-tcs-epic-agent`

## Dispatch (MANDATORY)
When this command is triggered:
1. Use `Agent` with `subagent_type: sync-tcs-epic-agent`
2. If the agent is unavailable, use `general-purpose` passing the full content of `.claude/agents/sync-tcs-epic-agent.md` as instructions
3. Never bypass this command by launching an agent directly
