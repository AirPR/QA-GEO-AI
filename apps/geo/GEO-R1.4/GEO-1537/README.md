# Epic GEO-1537: Show the Brands Behind Others

Data imported from Jira for epic **GEO-1537: Show the Brands Behind Others**

> Last Jira sync: 2026-11-13 — 4 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_GEO-1588_List_the_brands_in_the_Others_tooltip.md** | Story GEO-1588 — STORY-51.1: List the brands in the Others tooltip |
| **STORY_GEO-1589_Give_the_full_Share_of_Voice_list_in_the.md** | Story GEO-1589 — STORY-51.2: Give the full Share of Voice list in the Excel export |
| **STORY_GEO-1590_Name_Others_in_the_PowerPoint_and_PDF_do.md** | Story GEO-1590 — STORY-51.3: Name Others in the PowerPoint and PDF donut |
| **STORY_GEO-1587_Serve_every_brand_behind_Others_from_the.md** | Story GEO-1587 — STORY-51.4: Serve every brand behind Others from the Share of Voice distribution |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

The Share of Voice donut shows the top 10 brands and puts the rest in one Others slice, and today hovering that slice only shows its name. On a category with many small brands, Others can be one of the largest slices and the user has no way to know what is inside it, not in the app and not in the exports.

Fix version: 1.4 — Status: Ready for QA

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1588 | Story | STORY-51.1: List the brands in the Others tooltip | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1588 |
| GEO-1589 | Story | STORY-51.2: Give the full Share of Voice list in the Excel export | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1589 |
| GEO-1590 | Story | STORY-51.3: Name Others in the PowerPoint and PDF donut | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1590 |
| GEO-1587 | Story | STORY-51.4: Serve every brand behind Others from the Share of Voice distribution | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1587 |

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1537
- **Stories:**
  - GEO-1588: https://onclusive.atlassian.net/browse/GEO-1588
  - GEO-1589: https://onclusive.atlassian.net/browse/GEO-1589
  - GEO-1590: https://onclusive.atlassian.net/browse/GEO-1590
  - GEO-1587: https://onclusive.atlassian.net/browse/GEO-1587
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- **GEO-1588** (List the brands in the Others tooltip): Frontend only, on the overview, a category tab and the landscape of an unbranded analysis; the free Lite analysis donut is unchanged. Brand slices keep today's hover. Values in whole numbers (the Figma frames show one decimal, the epic rules it out). The tooltip header shows the same whole number as the Others slice and legend item. Data from STORY-51.4. Design: GEO-1543 (Figma « Measure - GEO Module », page « GEO-1543 - Brands behind Others in Share of Voice », flow 1).
- **GEO-1589** (Give the full Share of Voice list in the Excel export): Backend only. The Share of Voice table reads the same data as the dashboard donut (whole period). The ranking table, like the app, shows the last analysis date of the period, ordered by Visibility %. Whole numbers, « ~0% » under 0.5 % (the Figma frames show one decimal, the epic rules it out). When the Share of Voice table is longer than the ranking table, the next section starts below it. Data from STORY-51.4. Design: GEO-1543 (flow 2).
- **GEO-1590** (Name Others in the PowerPoint and PDF donut): Backend only; the PDF is the deck rendered, so it follows. Every deck donut (overview and category KPI slides, Share of Voice slide of an unbranded deck) uses the dashboard's data; the tracked brand is no longer forced into the slices. The hole shows the Share of Voice of the whole period, as the dashboard. Whole numbers (the Figma frames show one decimal). Data from STORY-51.4. Design: GEO-1543 (flow 3).
- **GEO-1587** (Serve every brand behind Others from the Share of Voice distribution): Backend shared foundation of the epic, no Jira user story of its own (the epic's « Dependencies »: the full brand list behind Others). Almost no visible change: same slices and same Others slice, except between brands with exactly the same Share of Voice, whose order can change (A to Z), and, when the 10th and 11th brands tie, which one is the 10th slice. Depends on GEO-1556 (story 50.7b, done). Blocks STORY-51.1, STORY-51.2 and STORY-51.3. Design reference: GEO-1543 (rationale D2).

## Out of Scope

- A full Share of Voice table slide in the deck: the full list lives in the Excel export
- Any change to the Share of Voice formula (GEO-678 owns it)
- One decimal in the tooltip, the deck line and the Excel table: Share of Voice stays in whole numbers as today [NEW 2026-11-05]
- The free Lite analysis: its Share of Voice donut keeps today's behaviour [NEW 2026-11-05]
