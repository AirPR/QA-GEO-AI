---
name: gen-tc-csv
description: Generates test cases in Quality Plus CSV format from the Acceptance Criteria of an imported epic or story.
---

<command-name>gen-tc-csv</command-name>

# Skill: Test Case CSV Generation from ACs

## Trigger
```
/gen-tc-csv {epic_key_or_story_key} {version?} [--figma]
```

Examples:
```
/gen-tc-csv GEO-440 GEO-V4
/gen-tc-csv GEO-237 GEO-V4
/gen-tc-csv GEO-200 GEO-V4
/gen-tc-csv GEO-152 GEO-V4 --figma
```

## Parameters
- `{epic_key_or_story_key}`: Jira key of the epic or story (required)
  - Epic → generates TCs for all its stories → `testcases-coverage-epic{KEY}.csv`
  - Story → generates TCs for that story only → `testcases-coverage-story{KEY}.csv`
- `{version}`: version folder where STORY_*.md / TASK_*.md files are stored (e.g. `GEO-V4`)
  - If absent, search automatically in `apps/geo/data/`
- `--figma` (optional): activate Figma design enrichment via a single unified flow:
  - Discovers Design Task child issues in Jira → extracts Figma links → exports frames as **rendered PNG images** via the Figma Image Export API → Claude reads them visually
  - Enriches TCs with exact UI texts from the design and adds TCs (tagged `[Figma]`) for visual states not covered by ACs
  - Fallback: if no Design Task is found in Jira, reads local `figmaScreens/` PNGs instead

## Execution Steps

1. Identify whether the key is an epic or a story
2. **[--figma only] Figma enrichment**:
   - Call Jira to find Design Task children → extract `figma.com/design/` links
   - For each link: call Figma Image Export API (`/v1/images/{file_id}?ids={node-id}&format=png`) → download the rendered PNG to a temp folder
   - Read each PNG with Claude vision → extract exact UI texts, element states, implicit business rules
   - Delete temp folder after analysis
   - Fallback: if no Design Task found → read local `figmaScreens/` PNGs
3. Read `EPIC.md` first (scope, out-of-scope, epic-level ACs)
4. Read `STORY_*.md / TASK_*.md` files from `apps/geo/data/{VERSION}/{EPIC_KEY}/`
5. **[--figma only]** Cross-reference visual findings with ACs:
   - Replace paraphrased expected results with exact UI strings from the design
   - Generate `[Figma]` TCs for visual states not covered by any AC
6. Number ACs if not already numbered (AC-1, AC-2…) and reuse those IDs
7. Filter out technical bullets (see filtering rules)
8. Produce **Part 1 — Human-readable review** (one block per TC, grouped by AC + coverage summary; Figma-sourced TCs marked `[Figma]`)
9. Generate the CSV in Quality Plus format (one Cucumber step per line, 16 columns)
10. Write the file to `.claude/Data/output/csv/`

## Expected Output
```
.claude/Data/output/csv/
├── testcases-coverage-epic{KEY}.csv    (if epic)
└── testcases-coverage-story{KEY}.csv  (if story)
```

The response contains two parts in order:
- **Part 1**: human-readable review (one block per TC with its steps, then coverage summary + flagged ambiguous ACs)
- **Part 2**: complete CSV inside a ```csv code block

Final report includes:
- Path of the generated CSV file
- Number of stories processed, TCs generated, total steps
- Coverage: happy-path / edge / error / state
- ACs skipped (filtered as technical)
- Ambiguous ACs flagged (flag, do not guess)

## Key Rules

- **Strict filtering**: exclude all technical bullets (Endpoint, Backend, Zustand, SDK, etc.)
- **Strict Cucumber**: one step per CSV row; case-level fields on the FIRST row only, empty on continuation rows
- **Traceability**: `QA Story task` column points to the source story key; Description includes the covered AC ID (e.g. "Covers AC-2")
- **TC naming**: `TC-{STORY_KEY}-{NNN} - {Short description}`
- **Independence**: each TC must be self-contained
- **No padding**: generate edge/error/state cases only if the AC explicitly implies them

## Agent Used
`tc-csv-generator-from-ac-agent`

## Dispatch (MANDATORY)

When this command is triggered:
1. Use `Agent` with `subagent_type: tc-csv-generator-from-ac-agent`
2. If the agent is not available in the session → use `general-purpose` passing the full content of `.claude/agents/tc-csv-generator-from-ac-agent.md` as instructions
3. Never bypass this command by launching an agent directly without going through `/gen-tc-csv`
