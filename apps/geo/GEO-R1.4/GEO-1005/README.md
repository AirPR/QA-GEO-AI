# Epic GEO-1005: Add Google AI Overviews as a Tracked Surface

Data imported from Jira for epic **GEO-1005: Add Google AI Overviews as a Tracked Surface**

> Last Jira sync: 2026-11-13 — 6 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_GEO-1595_Select_AI_Overviews_as_an_engine.md** | Story GEO-1595 — STORY-54.1: Select AI Overviews as an engine |
| **STORY_GEO-1596_Capture_the_AI_Overview_per_country.md** | Story GEO-1596 — STORY-54.2: Capture the AI Overview per country |
| **STORY_GEO-1597_Handle_the_prompts_where_Google_shows_no.md** | Story GEO-1597 — STORY-54.3: Handle the prompts where Google shows no AI Overview |
| **STORY_GEO-1598_Read_the_AI_Overview_like_any_other_answ.md** | Story GEO-1598 — STORY-54.4: Read the AI Overview like any other answer |
| **STORY_GEO-1599_Read_the_AI_Overview_in_the_question_pan.md** | Story GEO-1599 — STORY-54.5: Read the AI Overview in the question panel |
| **STORY_GEO-1600_Show_AI_Overviews_everywhere_engines_sho.md** | Story GEO-1600 — STORY-54.6: Show AI Overviews everywhere engines show |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

Google AI Overviews is the AI summary shown at the top of Google Search results. For many audiences it is the AI answer they see most, and today GEO cannot say whether a brand appears in it: it has no official API, so the analysis does not track it.

Fix version: 1.4 — Status: Action Needed

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1595 | Story | STORY-54.1: Select AI Overviews as an engine | [CODE REVIEW] Code Review | https://onclusive.atlassian.net/browse/GEO-1595 |
| GEO-1596 | Story | STORY-54.2: Capture the AI Overview per country | [CODE REVIEW] Code Review | https://onclusive.atlassian.net/browse/GEO-1596 |
| GEO-1597 | Story | STORY-54.3: Handle the prompts where Google shows no AI Overview | [CODE REVIEW] Code Review | https://onclusive.atlassian.net/browse/GEO-1597 |
| GEO-1598 | Story | STORY-54.4: Read the AI Overview like any other answer | [CODE REVIEW] Code Review | https://onclusive.atlassian.net/browse/GEO-1598 |
| GEO-1599 | Story | STORY-54.5: Read the AI Overview in the question panel | [CODE REVIEW] Code Review | https://onclusive.atlassian.net/browse/GEO-1599 |
| GEO-1600 | Story | STORY-54.6: Show AI Overviews everywhere engines show | [CODE REVIEW] Code Review | https://onclusive.atlassian.net/browse/GEO-1600 |

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1005
- **Stories:**
  - GEO-1595: https://onclusive.atlassian.net/browse/GEO-1595
  - GEO-1596: https://onclusive.atlassian.net/browse/GEO-1596
  - GEO-1597: https://onclusive.atlassian.net/browse/GEO-1597
  - GEO-1598: https://onclusive.atlassian.net/browse/GEO-1598
  - GEO-1599: https://onclusive.atlassian.net/browse/GEO-1599
  - GEO-1600: https://onclusive.atlassian.net/browse/GEO-1600
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- **GEO-1595** (Select AI Overviews as an engine): Two PRs, both to the integration branch: PR 1 "engine presentation refactor" (no behaviour change), PR 2 "AI Overviews engine" (one database migration, creation of an organisation with its engines, back office, wizard, Manage Scope). First story of the epic: the others depend on its migration. Design: GEO-1017 (Figma "Measure - GEO Module"), logo `google-g.svg` attached to GEO-1005, border and pie colour #34A853.
- **GEO-1596** (Capture the AI Overview per country): Depends on STORY-54.1 (the engine row and its columns). Covers the capture strategies, the no-API invariant, the excluded-country table and its use in both analysis phases, and the amber lines in the Review step, the add-country dialog and Manage Scope. Deploy order: Flink first, backend second. Out of repository: the engine key to add to the Flink provider list in the deployment overlays. Production capture also waits for the vendor contract and the approval to capture the Google surfaces (decisions of GEO-678).
- **GEO-1597** (Handle the prompts where Google shows no AI Overview): Depends on STORY-54.2. Design: GEO-1017, frame 04d "Not counted". Includes one database migration (the "not counted" reason CHECK), to be applied before the backend that writes the new reason is deployed.
- **GEO-1598** (Read the AI Overview like any other answer): Depends on STORY-54.2 (the capture strategy and its request) and STORY-54.3 (blank answers are excluded before the reader). No database migration. No frontend change expected (checked in STORY-54.5).
- **GEO-1599** (Read the AI Overview in the question panel): Frontend verification and tests only; no migration, no backend change expected. Depends on STORY-54.3 and STORY-54.4. Design: GEO-1017 frames 01, 02, 03, 05 (answer card). Frames 08a and 08b are cited by the epic but have no recorded node id in the repository: the story asks to locate them for the day images are decided.
- **GEO-1600** (Show AI Overviews everywhere engines show): Closes the epic. Depends on STORY-54.1 (presentation refactor), STORY-54.3 (states) and STORY-54.5 (the panel). Frontend and exports; no migration. Lite Analysis is out of scope (GEO-1532).

## Out of Scope

- Google AI Mode (GEO-1006).
- The Lite Analysis (GEO-1532).
- The queries Google runs behind the AI Overview, and the AI Overview of a follow-up search.
- Reading brands inside images.

Still open (decision-gated, blocking production capture)

- The vendor contract (GEO-678). The legal sign-off on UI capture is obtained (11 Nov 2026).
- Approval to capture the Google surfaces: to confirm, the legal sign-off may not cover it.

Still open (non-blocking)

- Before the build, the team measures on a sample of prompts how often Google shows an AI Overview (eg: "AI Overview shown for 12 of 40 questions"), and then we decide whether the analysis shows this share as coverage context.
