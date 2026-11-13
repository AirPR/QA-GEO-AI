# Index — GEO-1537: Show the Brands Behind Others

## Files

1. **EPIC.md** — epic overview, scope, 3 epic user stories — Ready for QA
2. **STORY_GEO-1588_List_the_brands_in_the_Others_tooltip.md** — Story, 11 ACs + 12 technical / design ACs — Ready for QA — refers to STORY-51.4, GEO-1543
3. **STORY_GEO-1589_Give_the_full_Share_of_Voice_list_in_the.md** — Story, 7 ACs + 15 technical / design ACs — Ready for QA — refers to STORY-51.4, GEO-1543
4. **STORY_GEO-1590_Name_Others_in_the_PowerPoint_and_PDF_do.md** — Story, 9 ACs + 16 technical / design ACs — Ready for QA — refers to STORY-51.4, GEO-1543
5. **STORY_GEO-1587_Serve_every_brand_behind_Others_from_the.md** — Story, 4 ACs + 8 technical / design ACs — Ready for QA — refers to GEO-1556, STORY-51.1, STORY-51.2, STORY-51.3, GEO-1543
6. **README.md** — summary
7. **INDEX.md** — this file
8. **epic-data.json** — structured data

## Jira Links

- Epic: https://onclusive.atlassian.net/browse/GEO-1537
- GEO-1588: https://onclusive.atlassian.net/browse/GEO-1588
- GEO-1589: https://onclusive.atlassian.net/browse/GEO-1589
- GEO-1590: https://onclusive.atlassian.net/browse/GEO-1590
- GEO-1587: https://onclusive.atlassian.net/browse/GEO-1587
- Project: https://onclusive.atlassian.net/browse/GEO

## Progress

```
GEO-1537 [Ready for QA]  fixVersion 1.4
├── GEO-1588 Story [Ready for QA]  STORY-51.1: List the brands in the Others tooltip
├── GEO-1589 Story [Ready for QA]  STORY-51.2: Give the full Share of Voice list in the Excel export
├── GEO-1590 Story [Ready for QA]  STORY-51.3: Name Others in the PowerPoint and PDF donut
└── GEO-1587 Story [Ready for QA]  STORY-51.4: Serve every brand behind Others from the Share of Voice distribution

Not imported: GEO-1543 Design Task [Done]
```

## Details

- Assignee: Youssef.AitLaydi
- Created: 2026-10-26
- Updated: 2026-11-13
- Status: Ready for QA
- Fix version: 1.4
- Children imported: 4 stories + 0 tasks

## Key Components

- **GEO-1588**: Frontend only, on the overview, a category tab and the landscape of an unbranded analysis; the free Lite analysis donut is unchanged. Brand slices keep today's hover. Values in whole numbers (the Figma frames show one decimal, the epic rules it out). The tooltip header shows the same whole number as the Others slice and legend item. Data from STORY-51.4. Design: GEO-1543 (Figma « Measure - GEO Module », page « GEO-1543 - Brands behind Others in Share of Voice », flow 1).
- **GEO-1589**: Backend only. The Share of Voice table reads the same data as the dashboard donut (whole period). The ranking table, like the app, shows the last analysis date of the period, ordered by Visibility %. Whole numbers, « ~0% » under 0.5 % (the Figma frames show one decimal, the epic rules it out). When the Share of Voice table is longer than the ranking table, the next section starts below it. Data from STORY-51.4. Design: GEO-1543 (flow 2).
- **GEO-1590**: Backend only; the PDF is the deck rendered, so it follows. Every deck donut (overview and category KPI slides, Share of Voice slide of an unbranded deck) uses the dashboard's data; the tracked brand is no longer forced into the slices. The hole shows the Share of Voice of the whole period, as the dashboard. Whole numbers (the Figma frames show one decimal). Data from STORY-51.4. Design: GEO-1543 (flow 3).
- **GEO-1587**: Backend shared foundation of the epic, no Jira user story of its own (the epic's « Dependencies »: the full brand list behind Others). Almost no visible change: same slices and same Others slice, except between brands with exactly the same Share of Voice, whose order can change (A to Z), and, when the 10th and 11th brands tie, which one is the 10th slice. Depends on GEO-1556 (story 50.7b, done). Blocks STORY-51.1, STORY-51.2 and STORY-51.3. Design reference: GEO-1543 (rationale D2).
