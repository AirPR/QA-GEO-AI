# Epic GEO-1498: Natural Answer Display in the Question Panel

Data imported from Jira for epic **GEO-1498: Natural Answer Display in the Question Panel**

> Last Jira sync: 2026-11-13 — 10 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_GEO-1564_Read_the_full_answer_in_the_question_pan.md** | Story GEO-1564 — STORY-53.1: Read the full answer in the question panel |
| **STORY_GEO-1565_Keep_the_question_and_the_engine_visible.md** | Story GEO-1565 — STORY-53.2: Keep the question and the engine visible while reading |
| **STORY_GEO-1566_Trace_the_extracted_results_back_to_the.md** | Story GEO-1566 — STORY-53.3: Trace the extracted results back to the answer |
| **STORY_GEO-1567_Resolve_inline_citations_to_their_source.md** | Story GEO-1567 — STORY-53.4: Resolve inline citations to their sources |
| **STORY_GEO-1568_Keep_the_answer_readable_when_parsing_fa.md** | Story GEO-1568 — STORY-53.5: Keep the answer readable when parsing fails |
| **STORY_GEO-1569_Export_the_full_answer_to_Excel.md** | Story GEO-1569 — STORY-53.6: Export the full answer to Excel |
| **STORY_GEO-1570_Show_the_competitive_outcome_in_four_buc.md** | Story GEO-1570 — STORY-53.7: Show the competitive outcome in four buckets |
| **STORY_GEO-1571_Name_the_competitive_metric_AI_Choice_ev.md** | Story GEO-1571 — STORY-53.8: Name the competitive metric AI Choice everywhere |
| **STORY_GEO-1572_Open_the_question_panel_as_a_drawer_in_b.md** | Story GEO-1572 — STORY-53.9: Open the question panel as a drawer in both shells |
| **STORY_GEO-1608_Show_the_images_of_the_answer_card.md** | Story GEO-1608 — STORY-53.10: Show the images of the answer card |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

With Natural Answer Parsing (EPIC-027, GEO-678), engines answer the way they would for a real user and the ranking, the competitive outcome, the perception themes and the sources are extracted from that answer afterwards. The stored answer becomes full prose: several paragraphs, lists, inline citation markers, and lengths that vary a lot between engines (24 words for Claude against 442 for ChatGPT in the design examples).

Fix version: 1.4 — Status: Ready for QA

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1564 | Story | STORY-53.1: Read the full answer in the question panel | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1564 |
| GEO-1565 | Story | STORY-53.2: Keep the question and the engine visible while reading | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1565 |
| GEO-1566 | Story | STORY-53.3: Trace the extracted results back to the answer | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1566 |
| GEO-1567 | Story | STORY-53.4: Resolve inline citations to their sources | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1567 |
| GEO-1568 | Story | STORY-53.5: Keep the answer readable when parsing fails | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1568 |
| GEO-1569 | Story | STORY-53.6: Export the full answer to Excel | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1569 |
| GEO-1570 | Story | STORY-53.7: Show the competitive outcome in four buckets | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1570 |
| GEO-1571 | Story | STORY-53.8: Name the competitive metric AI Choice everywhere | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1571 |
| GEO-1572 | Story | STORY-53.9: Open the question panel as a drawer in both shells | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1572 |
| GEO-1608 | Story | STORY-53.10: Show the images of the answer card | [BACKLOG] Backlog | https://onclusive.atlassian.net/browse/GEO-1608 |

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1498
- **Stories:**
  - GEO-1564: https://onclusive.atlassian.net/browse/GEO-1564
  - GEO-1565: https://onclusive.atlassian.net/browse/GEO-1565
  - GEO-1566: https://onclusive.atlassian.net/browse/GEO-1566
  - GEO-1567: https://onclusive.atlassian.net/browse/GEO-1567
  - GEO-1568: https://onclusive.atlassian.net/browse/GEO-1568
  - GEO-1569: https://onclusive.atlassian.net/browse/GEO-1569
  - GEO-1570: https://onclusive.atlassian.net/browse/GEO-1570
  - GEO-1571: https://onclusive.atlassian.net/browse/GEO-1571
  - GEO-1572: https://onclusive.atlassian.net/browse/GEO-1572
  - GEO-1608: https://onclusive.atlassian.net/browse/GEO-1608
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- **GEO-1564** (Read the full answer in the question panel): Display only, depends on STORY-50.1 (GEO-1550, full raw answer stored). The panel is the drawer of STORY-53.9. States of the answer card (loading, pending, error, not counted, analysis run before this epic): STORY-53.5. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1565** (Keep the question and the engine visible while reading): Display only. The sticky header sits at the top of the drawer of STORY-53.9, which covers the host top bar in both shells (frame 09): depends on STORY-53.9. Clamp and expand: STORY-53.1. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1566** (Trace the extracted results back to the answer): Display only, depends on STORY-50.2 (GEO-1551, mention positions), STORY-50.3 (GEO-1552, brand family and other names), STORY-50.4 (GEO-1553, ranking) and STORY-50.5 (GEO-1554, competitive outcome and picked brands). Story 1.7 = STORY-53.7, story 1.5 = STORY-53.5. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1567** (Resolve inline citations to their sources): Display only, depends on STORY-50.2 (GEO-1551, link between each citation marker and its source). The same numbering is used by the Excel export (STORY-53.6). Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1568** (Keep the answer readable when parsing fails): Display only, depends on STORY-50.6 (GEO-1555, answer status and state of each extraction). The metric exclusion (AC2) is computed by STORY-50.6 / STORY-50.7 and only checked here. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display", frames 04, 04c, 04d, 04e, 04f, 10f).
- **GEO-1569** (Export the full answer to Excel): Backend export only, the EPIC text is the Excel spec (no frame). Depends on STORY-50.1 (GEO-1550, full answer), STORY-50.2 (GEO-1551, citations), STORY-50.4 (GEO-1553, ranking), STORY-50.5 (GEO-1554, outcome) and STORY-50.6 (GEO-1555, not counted), and reuses the citation numbering of STORY-53.4. Scheduled emails, PowerPoint and PDF content do not change (metric name only: STORY-53.8).
- **GEO-1570** (Show the competitive outcome in four buckets): User Story 1.7 is split in two: this story carries the four outcomes on screen; the metric name "AI Choice" and the Share of Voice tooltip are STORY-53.8. Depends on STORY-50.5 (GEO-1554, outcomes and picked brands), STORY-50.6 (GEO-1555, not counted) and STORY-50.7 (GEO-1556, AI Choice = Chosen + Conditional computed by the backend). The PowerPoint and PDF ring keeps one colour. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1571** (Name the competitive metric AI Choice everywhere): User Story 1.7 is split in two: the four outcomes on screen are STORY-53.7; this story carries the metric name and the tooltip texts in every surface (prioritization matrices, trend graph, upsell results, PowerPoint and PDF, KPI and Brand Rankings tooltips) and the 4 locales. The new definitions describe the AI Choice and Share of Voice computed by STORY-50.7 (GEO-1556): the renaming can be built now, but the tooltip texts ship with STORY-50.7. Scheduled emails do not change.
- **GEO-1572** (Open the question panel as a drawer in both shells): Display only, no dependency on GEO-678: can start first. STORY-53.2 (sticky header) builds on it. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display", frame 09 and the Unified Platform / Onclusive Social frames of the second round).
- **GEO-1608** (Show the images of the answer card): Depends on STORY-53.1 (the full answer card) and on the capture storing the images it receives (for ChatGPT, a request option that is billed). Frontend and, probably, a field in the capture record and the question-detail response. Design: GEO-1017 frames 08a and 08b. Not part of STORY-54.5 (GEO-1599).
- **Note:** GEO-1608 is in status Backlog with fix version none — not part of the 1.4 delivery as it stands.

## Out of Scope

- The parsing itself (GEO-678).
- [CHANGED 27 OCT] Images inside answers and the fullscreen image viewer (frames 08a and 08b): they come with AI Overviews (GEO-1005) and AI Mode (GEO-1006), which reuse this answer card. The "Not triggered" pill for a prompt with no AI Overview is in GEO-1005.
- Verbatim brand passages per source (GEO-676).

Left to the designer (GEO-1017)

- Nothing left on colours: the ring, the table badges, the tab badges and the cards follow production colours as set in story 1.7.
