---
name: import-jira-epic
description: Imports one or more Jira epics (comma-separated list — keys or URLs) with their child Stories and Tasks, and generates the local documentation structure for each. Produces a consolidated final report.
---

<command-name>import-jira-epic</command-name>

# Skill : Import Jira Epic → local files

## Trigger
```
/import-jira-epic {epic_keys} {version}
```

`{epic_keys}` accepts **one or more epics** separated by commas — Jira keys or full URLs:

```
# Single epic
/import-jira-epic GEO-263 GEO-V4

# Multiple epics (keys only — recommended)
/import-jira-epic GEO-263,GEO-300,GEO-904 GEO-V4

# Multiple epics (full URLs)
/import-jira-epic https://onclusive.atlassian.net/browse/GEO-263,https://onclusive.atlassian.net/browse/GEO-300 GEO-V4
```

## Prerequisites
- Jira variables defined in `.env` (`JIRA_URL`, `JIRA_TOKEN`, `JIRA_EMAIL` — falls back to `GEO_USER_EMAIL` if missing)
- Keys or URLs pointing to **Epics** (not Stories or Tasks)
- Write access to `apps/geo/`

## Parameters
- `{epic_keys}`: one or more Jira keys / URLs separated by commas (required)
  - Short key: `GEO-263` (recommended — `JIRA_URL` read from `.env`)
  - Full URL: `https://onclusive.atlassian.net/browse/GEO-263`
  - Mixed list supported: `GEO-263,https://onclusive.atlassian.net/browse/GEO-300`
- `{version}`: target version folder (required)
  - Existing versions: `GEO-V1`, `GEO-V2`, `GEO-V4`
  - If absent, list available versions and ask the user

## Execution Steps

1. Parse `{epic_keys}` → extract the list of keys (split on `,`, strip spaces, extract `EPIC_KEY` from URL if needed)
2. For **each epic** in the list (sequential processing):
   a. REST call `GET /rest/api/3/issue/{EPIC_KEY}` (verify `issuetype.name === "Epic"`)
   b. REST call `POST /rest/api/3/search/jql` for child Stories **and Tasks** (`issuetype in (Story, Task)`)
   c. Check if `apps/geo/{VERSION}/{EPIC_KEY}/` exists → if yes, **re-import mode**: compute the change plan (NEW / CHANGED / RETYPED / UNCHANGED / REMOVED_FROM_EPIC), show it, ask confirmation
   d. Generate in this folder:
      - `EPIC.md` (overview + scope + stories + AC summary)
      - `STORY_{JIRA_KEY}_{Title}.md` (one per Story, with full User Story + ACs + Technical Details)
      - `TASK_{JIRA_KEY}_{Title}.md` (one per Task, same structure)
      - `README.md` (overview + stories table + architecture + Jira links)
      - `INDEX.md` (numbered index + progress + details)
      - `epic-data.json` (all structured data — Tasks go in `stories[]` with `"type": "Task"`)
   e. Display an intermediate summary for the current epic
3. Display the **consolidated final report**: all imported epics, number of stories and tasks, warnings.

## Expected Output
```
apps\geo\{VERSION}\
├── {EPIC_KEY_1}\
│   ├── EPIC.md
│   ├── STORY_{KEY}_{Title}.md
│   ├── TASK_{KEY}_{Title}.md
│   ├── README.md
│   ├── INDEX.md
│   └── epic-data.json
├── {EPIC_KEY_2}\
│   └── ...
└── {EPIC_KEY_N}\
    └── ...
```

Consolidated final report:
- Summary table: epic | folder | stories | tasks | status
- Any warnings (missing description, unparseable ACs, epic not found, etc.)

## Important Rules

- **If the folder already exists (re-import)**:
  - Show the change plan first and ask confirmation — never overwrite blindly.
  - Rewrite a STORY/TASK file only if it is new, or its full Jira `updated` timestamp (`stories[].updatedAt`), status or title differs from the local copy, or its prefix no longer matches the Jira type. Unchanged files are not touched.
  - Preserve local sections (e.g. "Delta depuis le ...", "TCs a regenerer", "Bugs lies", sync banners) in EPIC.md / README.md / INDEX.md, and unknown fields (e.g. `bugs[]`) in epic-data.json.
  - Files of tickets removed from the epic, or whose type became Bug/Sub-task/etc., are kept and reported, never deleted.
- **Epic folder name**: raw Jira key without transformation (e.g. `GEO-263`, not `epic-263`).
- **Tasks**: a Task gets its own `TASK_{KEY}_*.md` file but is listed in the same `stories[]` array (with `"type": "Task"`). `/gen-tc-csv`, `/sync-tcs-epic`, `/regression-test` and `/gen-test-plan` read both `STORY_*.md` and `TASK_*.md`. Bugs, Sub-tasks and Design Tasks remain excluded.
- **Faithfully preserve Jira content**: User Story and ACs copied without rephrasing, just reformatted as clean markdown.
- **Status emojis**: `Done` → done, `In Progress` → in progress, `To Do` → to do, `Blocked` → blocked (consistent with other epics).
- **External links**: if a story description references a Github/Confluence link (external spec), include it in the story file "Links" section.
- **Reference**: calibrate on `apps/geo/GEO-R0.1/GEO-102/` if in doubt about formatting.

## Agent Used
`import-jira-epic-agent`
