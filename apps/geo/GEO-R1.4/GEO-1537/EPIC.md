# Show the Brands Behind Others

**Epic ID:** GEO-1537
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Fix version:** 1.4
**Created:** 2026-10-26
**Updated:** 2026-11-13
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1537

## Description / Functional Need

The Share of Voice donut shows the top 10 brands and puts the rest in one Others slice, and today hovering that slice only shows its name. On a category with many small brands, Others can be one of the largest slices and the user has no way to know what is inside it, not in the app and not in the exports.

The goal is to list the brands behind Others in the donut tooltip, to give the full Share of Voice list in the Excel export, and to name Others in the PowerPoint and PDF donut, where today it is a grey slice with no label. This was story 1.8 of GEO-678. It does not depend on natural answers, but it needs the Share of Voice formula of GEO-1556 (see Dependencies). [CHANGED 2026-11-05]

## Scope

- GEO-1588 — STORY-51.1: List the brands in the Others tooltip
- GEO-1589 — STORY-51.2: Give the full Share of Voice list in the Excel export
- GEO-1590 — STORY-51.3: Name Others in the PowerPoint and PDF donut
- GEO-1587 — STORY-51.4: Serve every brand behind Others from the Share of Voice distribution

### Dependencies

- GEO-1556 (story 50.7 of GEO-678). With the formula live today, each answer counts 10 positions even when it names fewer or more brands, so the Share of Voice of all brands does not add up to 100% and Others can never be the exact sum of its brands. GEO-1556 changes the formula so all brands add up to 100% on every analysis date. US 1.1 AC3 can only pass once it ships. [CHANGED 2026-11-05]
- The full brand list behind Others. Today the app only receives the top 10 brands and Others is computed as what is left, so the brands inside it never reach the app. The tooltip, the deck line and the Excel table need every brand with its Share of Voice and the brand count, from the same data as the donut. [NEW 2026-11-05]

## Out of Scope

- A full Share of Voice table slide in the deck: the full list lives in the Excel export
- Any change to the Share of Voice formula (GEO-678 owns it)
- One decimal in the tooltip, the deck line and the Excel table: Share of Voice stays in whole numbers as today [NEW 2026-11-05]
- The free Lite analysis: its Share of Voice donut keeps today's behaviour [NEW 2026-11-05]

## Associated Stories & Tasks

| ID | Type | Title | Status | Fix version |
|----|------|-------|--------|-------------|
| GEO-1588 | Story | STORY-51.1: List the brands in the Others tooltip | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1589 | Story | STORY-51.2: Give the full Share of Voice list in the Excel export | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1590 | Story | STORY-51.3: Name Others in the PowerPoint and PDF donut | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1587 | Story | STORY-51.4: Serve every brand behind Others from the Share of Voice distribution | [READY FOR QA] Ready for QA | 1.4 |

Not imported (not Story / Task):

- GEO-1543 — Design Task [Done] — Design the brands behind Others in the Share of Voice donut and the exports

## Architecture

_No dedicated architecture section in the epic description; see the « Scope note » and technical sections of each story._

## Acceptance Criteria — Summary

_Epic user stories and acceptance criteria, copied verbatim from the epic description. The child stories restate them, sometimes with later changes._

#### User Story 1.1: List the brands in the Others tooltip

Story ID: TBD

> As a user, I want to see which brands make up Others in the Share of Voice donut, so that a large Others slice is never a black box.

Acceptance Criteria:

- Given the Share of Voice donut shows an Others slice, When I hover it, Then a tooltip lists the brands in Others with their Share of Voice, from the highest, up to 10 brands
- Given Others holds more than 10 brands, When I hover the slice, Then the tooltip ends with "and {N} more brands, see the export"
- Given the brands in Others, When the donut is drawn, Then the Others value is the sum of their Share of Voice, so the list always adds up to the slice, on every analysis date
- Given filters on the dashboard (period, country, AI engine, category), When I hover Others, Then the list uses the same filters as the donut
- Given the overview, a category tab or the landscape of an unbranded analysis, When the donut shows Others, Then the tooltip behaves the same way on each of them
- Given the Others tooltip, When it opens, Then its header shows Others, its Share of Voice and the number of brands it holds ("{n} brands", "1 brand") [NEW 2026-11-05]
- Given the Others tooltip, When it opens, Then it uses the data variant of the design system Tooltip (dark, with a tail pointing to the slice) and opens on the side of the slice with room [NEW 2026-11-05]
- Given two brands, When they are listed in the tooltip, the deck line or the Excel table, Then they are sorted by their exact Share of Voice, before rounding, and only brands with the exact same value are sorted by brand name from A to Z (two rows can then both read "2%") [CHANGED 2026-11-10]
- Given the Others slice or the Others item in the legend, When I hover it or reach it with the keyboard, Then the Others tooltip opens [NEW 2026-11-05]
- Given the tracked brand is in Others, When the tooltip or the deck line lists it, Then it has no particular treatment and is listed like any other brand [NEW 2026-11-05]
- Given a brand with a Share of Voice under 0.5%, When it is listed in the tooltip, the deck line or the Excel table, Then its Share of Voice shows as "~0%" [NEW 2026-11-05]

#### User Story 1.2: Give the full Share of Voice list in the Excel export

Story ID: TBD

> As a user, I want every brand and its Share of Voice in the export, so that I can see and reuse the brands the donut groups in Others.

Acceptance Criteria:

- Given an Excel export, When it is generated, Then every sheet with a brand ranking table (overview, each category, and the landscape of an unbranded analysis) also has a Share of Voice table with the first 100 brands of its scope, then the number of brands left out: rank by Share of Voice, brand and Share of Voice %, with the tracked brand highlighted as in the ranking table [CHANGED 2026-11-10]
- Given a scope that names more than 100 brands, When the Share of Voice table is generated, Then it lists the first 100 brands, the 10 donut slices included, in the same order as the donut, and a last row says "and {N} more brands" ("and 1 more brand" for one) [NEW 2026-11-10]
- Given the brand ranking table of the Excel export, When it is generated, Then it shows the same brands, columns and order as the table in the app, so the Share of Voice column it has today goes
- Given the Share of Voice table of a sheet, When it is generated, Then it sits to the right of the brand ranking table, one empty column apart, starting on the same row, under the title "Share of Voice" [NEW 2026-11-05]

#### User Story 1.3: Name Others in the PowerPoint and PDF donut

Story ID: TBD

> As a user who presents the deck, I want the Others slice named and its brands listed, so that the people I present to can read the donut without the app.

Acceptance Criteria:

- Given a PowerPoint or PDF export, When a Share of Voice donut is drawn, Then it shows the top 10 brands and Others, as on the dashboard [CHANGED 2026-11-05]
- Given the donut shows an Others slice, When the legend is drawn, Then Others is in the legend with its Share of Voice %, after the brands, in the same grey as the slice
- Given the donut shows an Others slice, When the slide is drawn, Then one line under the donut lists the brands in Others with their Share of Voice, from the highest, up to 10 brands, and ends with "and {N} more brands, see the Excel export" when Others holds more than 10
- Given the PDF export, When it is generated, Then it shows the same donut, legend and line as the PowerPoint export
- Given a PowerPoint, PDF or Excel export, When the Share of Voice donut, the line under it or the Excel Share of Voice table is generated, Then it uses the same data as the Share of Voice donut of the dashboard for the selected period and filters, so the brands and values match the app [CHANGED 2026-11-13]
- Given the line under the donut, When it is drawn, Then it fits on 2 lines at most, and when the brands do not fit it lists fewer of them and the "and {N} more brands" count grows [NEW 2026-11-05]

Strings (EN / FR / ES), checked against the platform strings: [CHANGED 2026-11-10]

- "{n} brands" / "1 brand" - FR "{n} marques" / "1 marque" - ES "{n} marcas" / "1 marca"
- "and {n} more brands, see the export" - FR "et {n} autres marques, voir l'export" - ES "y {n} marcas más, ver la exportación"
- "and 1 more brand, see the export" - FR "et 1 autre marque, voir l'export" - ES "y 1 marca más, ver la exportación"
- "and {n} more brands, see the Excel export" - FR "et {n} autres marques, voir l'export Excel" - ES "y {n} marcas más, ver la exportación de Excel"
- "and 1 more brand, see the Excel export" - FR "et 1 autre marque, voir l'export Excel" - ES "y 1 marca más, ver la exportación de Excel"
- "Others {n}%:" - FR "Autres {n}% :" - ES "Otros {n}%:" [CHANGED 2026-11-06]
- "Share of Voice" (Excel table title) - FR "Part de voix" - ES "Cuota de voz"
- "Share of Voice %" (Excel table header) - FR "Part de voix %" - ES "Cuota de voz %" [NEW 2026-11-10]
- "and {n} more brands" / "and 1 more brand" (last row of the Excel table) - FR "et {n} autres marques" / "et 1 autre marque" - ES "y {n} marcas más" / "y 1 marca más" [NEW 2026-11-10]

## Links

- https://onclusive.atlassian.net/browse/GEO-1537
- GEO-1588: https://onclusive.atlassian.net/browse/GEO-1588
- GEO-1589: https://onclusive.atlassian.net/browse/GEO-1589
- GEO-1590: https://onclusive.atlassian.net/browse/GEO-1590
- GEO-1587: https://onclusive.atlassian.net/browse/GEO-1587
- GEO-1543 (Design Task): https://onclusive.atlassian.net/browse/GEO-1543
