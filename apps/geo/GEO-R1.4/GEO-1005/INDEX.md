# Index — GEO-1005: Add Google AI Overviews as a Tracked Surface

## Files

1. **EPIC.md** — epic overview, scope, 6 epic user stories — Action Needed
2. **STORY_GEO-1595_Select_AI_Overviews_as_an_engine.md** — Story, 5 ACs — Code Review — refers to GEO-1017
3. **STORY_GEO-1596_Capture_the_AI_Overview_per_country.md** — Story, 11 ACs — Code Review — refers to STORY-54.1, GEO-678
4. **STORY_GEO-1597_Handle_the_prompts_where_Google_shows_no.md** — Story, 6 ACs — Code Review — refers to STORY-54.2, GEO-1017
5. **STORY_GEO-1598_Read_the_AI_Overview_like_any_other_answ.md** — Story, 4 ACs — Code Review — refers to STORY-54.2, STORY-54.3, STORY-54.5
6. **STORY_GEO-1599_Read_the_AI_Overview_in_the_question_pan.md** — Story, 8 ACs — Code Review — refers to STORY-54.3, STORY-54.4, GEO-1017
7. **STORY_GEO-1600_Show_AI_Overviews_everywhere_engines_sho.md** — Story, 6 ACs — Code Review — refers to STORY-54.1, STORY-54.3, STORY-54.5, GEO-1532
8. **README.md** — summary
9. **INDEX.md** — this file
10. **epic-data.json** — structured data

## Jira Links

- Epic: https://onclusive.atlassian.net/browse/GEO-1005
- GEO-1595: https://onclusive.atlassian.net/browse/GEO-1595
- GEO-1596: https://onclusive.atlassian.net/browse/GEO-1596
- GEO-1597: https://onclusive.atlassian.net/browse/GEO-1597
- GEO-1598: https://onclusive.atlassian.net/browse/GEO-1598
- GEO-1599: https://onclusive.atlassian.net/browse/GEO-1599
- GEO-1600: https://onclusive.atlassian.net/browse/GEO-1600
- Project: https://onclusive.atlassian.net/browse/GEO

## Progress

```
GEO-1005 [Action Needed]  fixVersion 1.4
├── GEO-1595 Story [Code Review]  STORY-54.1: Select AI Overviews as an engine
├── GEO-1596 Story [Code Review]  STORY-54.2: Capture the AI Overview per country
├── GEO-1597 Story [Code Review]  STORY-54.3: Handle the prompts where Google shows no AI Overview
├── GEO-1598 Story [Code Review]  STORY-54.4: Read the AI Overview like any other answer
├── GEO-1599 Story [Code Review]  STORY-54.5: Read the AI Overview in the question panel
└── GEO-1600 Story [Code Review]  STORY-54.6: Show AI Overviews everywhere engines show

```

## Details

- Assignee: Abdenasser Aroukhsiss
- Created: 2026-07-20
- Updated: 2026-11-12
- Status: Action Needed
- Fix version: 1.4
- Children imported: 6 stories + 0 tasks

## Key Components

- **GEO-1595**: Two PRs, both to the integration branch: PR 1 "engine presentation refactor" (no behaviour change), PR 2 "AI Overviews engine" (one database migration, creation of an organisation with its engines, back office, wizard, Manage Scope). First story of the epic: the others depend on its migration. Design: GEO-1017 (Figma "Measure - GEO Module"), logo `google-g.svg` attached to GEO-1005, border and pie colour #34A853.
- **GEO-1596**: Depends on STORY-54.1 (the engine row and its columns). Covers the capture strategies, the no-API invariant, the excluded-country table and its use in both analysis phases, and the amber lines in the Review step, the add-country dialog and Manage Scope. Deploy order: Flink first, backend second. Out of repository: the engine key to add to the Flink provider list in the deployment overlays. Production capture also waits for the vendor contract and the approval to capture the Google surfaces (decisions of GEO-678).
- **GEO-1597**: Depends on STORY-54.2. Design: GEO-1017, frame 04d "Not counted". Includes one database migration (the "not counted" reason CHECK), to be applied before the backend that writes the new reason is deployed.
- **GEO-1598**: Depends on STORY-54.2 (the capture strategy and its request) and STORY-54.3 (blank answers are excluded before the reader). No database migration. No frontend change expected (checked in STORY-54.5).
- **GEO-1599**: Frontend verification and tests only; no migration, no backend change expected. Depends on STORY-54.3 and STORY-54.4. Design: GEO-1017 frames 01, 02, 03, 05 (answer card). Frames 08a and 08b are cited by the epic but have no recorded node id in the repository: the story asks to locate them for the day images are decided.
- **GEO-1600**: Closes the epic. Depends on STORY-54.1 (presentation refactor), STORY-54.3 (states) and STORY-54.5 (the panel). Frontend and exports; no migration. Lite Analysis is out of scope (GEO-1532).
