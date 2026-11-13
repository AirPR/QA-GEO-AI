# Index — GEO-1498: Natural Answer Display in the Question Panel

## Files

1. **EPIC.md** — epic overview, scope, 7 epic user stories — Ready for QA
2. **STORY_GEO-1564_Read_the_full_answer_in_the_question_pan.md** — Story, 14 ACs — Ready for QA — refers to STORY-50.1, GEO-1550, STORY-53.9, STORY-53.5, GEO-1017
3. **STORY_GEO-1565_Keep_the_question_and_the_engine_visible.md** — Story, 2 ACs + 8 technical / design ACs — Ready for QA — refers to STORY-53.9, STORY-53.1, GEO-1017
4. **STORY_GEO-1566_Trace_the_extracted_results_back_to_the.md** — Story, 14 ACs — Ready for QA — refers to STORY-50.2, GEO-1551, STORY-50.3, GEO-1552, STORY-50.4, GEO-1553, STORY-50.5, GEO-1554, STORY-53.7, STORY-53.5, GEO-1017
5. **STORY_GEO-1567_Resolve_inline_citations_to_their_source.md** — Story, 9 ACs — Ready for QA — refers to STORY-50.2, GEO-1551, STORY-53.6, GEO-1017
6. **STORY_GEO-1568_Keep_the_answer_readable_when_parsing_fa.md** — Story, 5 ACs — Ready for QA — refers to STORY-50.6, GEO-1555, STORY-50.7, GEO-1017
7. **STORY_GEO-1569_Export_the_full_answer_to_Excel.md** — Story, 9 ACs — Ready for QA — refers to STORY-50.1, GEO-1550, STORY-50.2, GEO-1551, STORY-50.4, GEO-1553, STORY-50.5, GEO-1554, STORY-50.6, GEO-1555, STORY-53.4, STORY-53.8
8. **STORY_GEO-1570_Show_the_competitive_outcome_in_four_buc.md** — Story, 19 ACs — Ready for QA — refers to STORY-53.8, STORY-50.5, GEO-1554, STORY-50.6, GEO-1555, STORY-50.7, GEO-1556, GEO-1017
9. **STORY_GEO-1571_Name_the_competitive_metric_AI_Choice_ev.md** — Story, 2 ACs — Ready for QA — refers to STORY-53.7, STORY-50.7, GEO-1556
10. **STORY_GEO-1572_Open_the_question_panel_as_a_drawer_in_b.md** — Story, 6 ACs + 16 technical / design ACs — Ready for QA — refers to GEO-678, STORY-53.2, GEO-1017
11. **STORY_GEO-1608_Show_the_images_of_the_answer_card.md** — Story, 6 ACs — Backlog (no fix version) — refers to STORY-53.1, GEO-1017, STORY-54.5, GEO-1599
12. **README.md** — summary
13. **INDEX.md** — this file
14. **epic-data.json** — structured data

## Jira Links

- Epic: https://onclusive.atlassian.net/browse/GEO-1498
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
- Project: https://onclusive.atlassian.net/browse/GEO

## Progress

```
GEO-1498 [Ready for QA]  fixVersion 1.4
├── GEO-1564 Story [Ready for QA]  STORY-53.1: Read the full answer in the question panel
├── GEO-1565 Story [Ready for QA]  STORY-53.2: Keep the question and the engine visible while reading
├── GEO-1566 Story [Ready for QA]  STORY-53.3: Trace the extracted results back to the answer
├── GEO-1567 Story [Ready for QA]  STORY-53.4: Resolve inline citations to their sources
├── GEO-1568 Story [Ready for QA]  STORY-53.5: Keep the answer readable when parsing fails
├── GEO-1569 Story [Ready for QA]  STORY-53.6: Export the full answer to Excel
├── GEO-1570 Story [Ready for QA]  STORY-53.7: Show the competitive outcome in four buckets
├── GEO-1571 Story [Ready for QA]  STORY-53.8: Name the competitive metric AI Choice everywhere
├── GEO-1572 Story [Ready for QA]  STORY-53.9: Open the question panel as a drawer in both shells
└── GEO-1608 Story [Backlog] (no fixVersion)  STORY-53.10: Show the images of the answer card

Not imported: GEO-1606 Bug [Done] | GEO-1605 Bug [Done] | GEO-1604 Bug [Done] | GEO-1603 Bug [Done] | GEO-1602 Bug [Done] | GEO-1601 Bug [Done] | GEO-1594 Bug [Ready for QA] | GEO-1017 Design Task [Done]
```

## Details

- Assignee: Abdenasser Aroukhsiss
- Created: 2026-10-19
- Updated: 2026-11-13
- Status: Ready for QA
- Fix version: 1.4
- Children imported: 10 stories + 0 tasks

## Key Components

- **GEO-1564**: Display only, depends on STORY-50.1 (GEO-1550, full raw answer stored). The panel is the drawer of STORY-53.9. States of the answer card (loading, pending, error, not counted, analysis run before this epic): STORY-53.5. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1565**: Display only. The sticky header sits at the top of the drawer of STORY-53.9, which covers the host top bar in both shells (frame 09): depends on STORY-53.9. Clamp and expand: STORY-53.1. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1566**: Display only, depends on STORY-50.2 (GEO-1551, mention positions), STORY-50.3 (GEO-1552, brand family and other names), STORY-50.4 (GEO-1553, ranking) and STORY-50.5 (GEO-1554, competitive outcome and picked brands). Story 1.7 = STORY-53.7, story 1.5 = STORY-53.5. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1567**: Display only, depends on STORY-50.2 (GEO-1551, link between each citation marker and its source). The same numbering is used by the Excel export (STORY-53.6). Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1568**: Display only, depends on STORY-50.6 (GEO-1555, answer status and state of each extraction). The metric exclusion (AC2) is computed by STORY-50.6 / STORY-50.7 and only checked here. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display", frames 04, 04c, 04d, 04e, 04f, 10f).
- **GEO-1569**: Backend export only, the EPIC text is the Excel spec (no frame). Depends on STORY-50.1 (GEO-1550, full answer), STORY-50.2 (GEO-1551, citations), STORY-50.4 (GEO-1553, ranking), STORY-50.5 (GEO-1554, outcome) and STORY-50.6 (GEO-1555, not counted), and reuses the citation numbering of STORY-53.4. Scheduled emails, PowerPoint and PDF content do not change (metric name only: STORY-53.8).
- **GEO-1570**: User Story 1.7 is split in two: this story carries the four outcomes on screen; the metric name "AI Choice" and the Share of Voice tooltip are STORY-53.8. Depends on STORY-50.5 (GEO-1554, outcomes and picked brands), STORY-50.6 (GEO-1555, not counted) and STORY-50.7 (GEO-1556, AI Choice = Chosen + Conditional computed by the backend). The PowerPoint and PDF ring keeps one colour. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").
- **GEO-1571**: User Story 1.7 is split in two: the four outcomes on screen are STORY-53.7; this story carries the metric name and the tooltip texts in every surface (prioritization matrices, trend graph, upsell results, PowerPoint and PDF, KPI and Brand Rankings tooltips) and the 4 locales. The new definitions describe the AI Choice and Share of Voice computed by STORY-50.7 (GEO-1556): the renaming can be built now, but the tooltip texts ship with STORY-50.7. Scheduled emails do not change.
- **GEO-1572**: Display only, no dependency on GEO-678: can start first. STORY-53.2 (sticky header) builds on it. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display", frame 09 and the Unified Platform / Onclusive Social frames of the second round).
- **GEO-1608**: Depends on STORY-53.1 (the full answer card) and on the capture storing the images it receives (for ChatGPT, a request option that is billed). Frontend and, probably, a field in the capture record and the question-detail response. Design: GEO-1017 frames 08a and 08b. Not part of STORY-54.5 (GEO-1599).
