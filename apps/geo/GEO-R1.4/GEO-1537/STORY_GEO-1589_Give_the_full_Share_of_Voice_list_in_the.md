# GEO-1589: STORY-51.2: Give the full Share of Voice list in the Excel export

**Story ID:** GEO-1589
**Issue Type:** Story
**Title:** STORY-51.2: Give the full Share of Voice list in the Excel export
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1537
**Fix version:** 1.4
**Created:** 2026-11-09
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1589

## User Story

> As a user, I want every brand and its Share of Voice in the export, so that I can see and reuse the brands the donut groups in Others.

- **As** a user
- **I want** every brand and its Share of Voice in the export
- **So that** I can see and reuse the brands the donut groups in Others.

## Acceptance Criteria

_7 functional ACs + 15 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1537, User Story 1.2)

- Given an Excel export, When it is generated, Then every sheet with a brand ranking table (overview, each category, and the landscape of an unbranded analysis) also has a Share of Voice table with the first 100 brands of its scope, then the number of brands left out: rank by Share of Voice, brand and Share of Voice %, with the tracked brand highlighted as in the ranking table
- Given a scope that names more than 100 brands, When the Share of Voice table is generated, Then it lists the first 100 brands, the 10 donut slices included, in the same order as the donut, and a last row says "and {N} more brands" ("and 1 more brand" for one)
- Given the brand ranking table of the Excel export, When it is generated, Then it shows the same brands, columns and order as the table in the app, so the Share of Voice column it has today goes
- Given the Share of Voice table of a sheet, When it is generated, Then it sits to the right of the brand ranking table, one empty column apart, starting on the same row, under the title "Share of Voice"

### Shared criteria that apply to the Excel table (GEO-1537, US 1.1 and US 1.3)

- Given two brands, When they are listed in the tooltip, the deck line or the Excel table, Then they are sorted by their exact Share of Voice, before rounding, and only brands with the exact same value are sorted by brand name from A to Z (two rows can then both read "2%")
- Given a brand with a Share of Voice under 0.5%, When it is listed in the tooltip, the deck line or the Excel table, Then its Share of Voice shows as "~0%"
- Given a PowerPoint, PDF or Excel export, When the Share of Voice donut, the line under it or the Excel Share of Voice table is generated, Then it uses the same data as the Share of Voice donut of the dashboard for the selected period and filters, so the brands and values match the app (today the deck slices use the last analysis date of the period only, while the number in the hole uses the whole period)

### Change (2026-11-10, PM — GEO-1537 comments 875375 and 875591)

The Share of Voice table lists the **first 100 brands** of its scope (the donut slices included, same order), then a last row « and N more brands » (« and 1 more brand » for one) when the scope names more. The PM updated the epic the same day: first criterion reworded, new second criterion for the last row, ties sorted by the exact value (shared criterion above). Strings confirmed: table header FR « Part de voix % », ES « Cuota de voz % »; last row FR « et N autres marques » / « et 1 autre marque », ES « y N marcas más » / « y 1 marca más ». Values stay written as text (« 9% »), as in the rest of the workbook. Already implemented, no code change.

### Change (2026-11-10, PM — GEO-1537 comment 875646)

- The number in the last row is written as the platform writes numbers in each language: « and 26,391 more brands », « et 26 391 autres marques », « y 26.391 marcas más ». 4-digit numbers are grouped too (« y 1.417 marcas más »). Same rule in the tooltip (STORY-51.1) and the deck line (STORY-51.3).
- A tracked brand ranked beyond 100 is not added to the table: rare case, not handled in V1.
- The note in brackets at the end of the shared « same data » criterion is removed from the epic by the PM.

### Design Acceptance Criteria (GEO-1543, D4)

- **DAC1 — Layout (frame 2.1):** Given an overview sheet, When it is generated, Then the ranking table is in columns A–E (Rank, Brand, Visibility %, Avg Position, AI Choice %), column F is empty and the Share of Voice table is in G–I (Rank, Brand, Share of Voice %), both starting on the same row (the section-title row)
- **DAC2 — Styles:** Given the Share of Voice table, When it is generated, Then its title row « Share of Voice » uses the sub-section style of « Brand ranking », its header row the table-header style, and the tracked brand row the ranking table's highlight (yellow-50, the workbook's styles win — design comment 875353); cells left-aligned like every % cell of the workbook
- **DAC3 — Category sheet (frame 2.2):** Given a category sheet, When it is generated, Then it has the same two tables for the category scope

### Technical Acceptance Criteria

- **TAC1** — Given an overview sheet with 48 brands in scope, When it is generated, Then the ranking table is in A–E (10 rows, no SOV column, ordered by Visibility % desc, rank 1..10), F is empty on those rows, the SOV table is in G–I with 48 rows in the distribution's order, rank 1..48, title « Share of Voice » on exactly the ranking title's row
- **TAC2** — Given an export with or without a period, When the SOV table is generated, Then its values come from the same service call and the same snapshots as the dashboard distribution of the same scope
- **TAC3** — Given the tracked brand, When both tables are generated, Then its row is highlighted in both tables, every flagged row when several are; unbranded workbook: no highlight in the SOV table
- **TAC4** — Given brands at 0.3 %, 0.00 and 12.4 %, When the SOV table is generated, Then they show « ~0% », « ~0% » and « 12% »
- **TAC5** — Given 48 SOV rows and 10 ranking rows, When the sheet is generated, Then the next section (sources) starts below the row of the 48th brand and no cell of the ranking table is lost
- **TAC6** — Given a category sheet, When it is generated, Then it has the same two tables for the category scope; the Other category sheet has no SOV table
- **TAC7** — Given an unbranded workbook, When it is generated, Then the landscape ranking table and the SOV table are both on the overview sheet and on each category sheet
- **TAC8** — Given a French or Spanish export, When the SOV table is generated, Then its title and header read « Part de voix » / « Part de voix % » or « Cuota de voz » / « Cuota de voz % »
- **TAC9** — Given an empty distribution, When the sheet is generated, Then there is no SOV table, the ranking table is unchanged and no exception is raised
- **TAC10** — Given another organisation's report, When it is exported, Then the export still returns 404 (the distribution call is scoped by organisation)
- **TAC11** — (PM 2026-11-10) Given a scope with 120 brands, When the SOV table is generated, Then it has 100 brand rows (rank 1..100) then « and 20 more brands » in column G (one cell, H–I empty), and the next section starts below that row; 101 brands → « and 1 more brand »; 100 brands or fewer → no such row (N counts every brand of the scope, the slices included); FR « et N autres marques », ES « y N marcas más »
- **TAC12** — (PM 2026-11-10, 875646) Given a scope with 26,491 brands, When the SOV table is generated, Then the last row reads EN « and 26,391 more brands », FR « et 26 391 autres marques », ES « y 26.391 marcas más »; numbers from 1,000 to 9,999 are grouped the same way as in the tooltip (« y 1.417 marcas más »)

## Technical Details

### Scope note

Backend only. The Share of Voice table reads the same data as the dashboard donut (whole period). The ranking table, like the app, shows the last analysis date of the period, ordered by Visibility %. Whole numbers, « ~0% » under 0.5 % (the Figma frames show one decimal, the epic rules it out). When the Share of Voice table is longer than the ranking table, the next section starts below it. Data from STORY-51.4. Design: GEO-1543 (flow 2).

### Code review (2026-11-10)

Second review of the « first 100 brands » change: no functional defect. TAC11 corrected (101 brands, not 91, give « and 1 more brand »), tests added at the 100 / 101 boundary, Javadoc repaired. Two product questions asked on GEO-1537 and answered the same day (875646): thousands separator added (TAC12, reviewed, no defect), tracked brand beyond rank 100 kept as is. Still to check by hand: open an export in Excel and LibreOffice.

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** GEO-1587
- **relates to:** GEO-1591 (Bug, Done) — Excel export fails with a 504 on a long period of a large analysis
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1537
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1589
- External Spec: [51-2-give-the-full-share-of-voice-list-in-the-excel-export.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-1537-epic-51-others-brands/docs/implementation-artifacts/epics/epic-51/51-2-give-the-full-share-of-voice-list-in-the-excel-export.md)
