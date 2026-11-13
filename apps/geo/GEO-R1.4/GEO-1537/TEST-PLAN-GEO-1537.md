### QA Test Plan for GEO-1537 — Show the Brands Behind Others

**Updated:** 2026-11-13 | **Source CSV:** pending | **Status:** Approved 2026-11-13

**Objective:** Verify that the brands behind the Others slice of the Share of Voice donut are no longer a black box: hovering or focusing Others (slice or legend item) on the overview, a category tab or the landscape of an unbranded analysis opens a tooltip with Others, its value and its brand count, the first 10 brands sorted by exact Share of Voice and "and N more brands, see the export", with the same filters as the donut and an Others value equal to the sum of its brands; the Excel export adds next to each brand ranking table a Share of Voice table of the first 100 brands with a last "and N more brands" row, the ranking table matching the app; the PowerPoint and PDF donut show the top 10 brands, an Others chip and a line under the donut, on the same data as the dashboard (whole selected period, or the last analysis date when no period is selected). Whole numbers, "~0%" under 0.5%, number formats and FR / ES strings are checked on every surface.

#### Test Scenarios & Detailed Test Cases

**Others Tooltip (stories: GEO-1588)**

- Scenario 1: Brands in Others Listed - Verify that hovering the Others slice opens a tooltip listing the brands in Others with their Share of Voice, from the highest, up to 10 brands.
- Scenario 2: And N More Brands - Verify that Others with more than 10 brands ends the tooltip with "and {N} more brands, see the export", "and 1 more brand, see the export" for 11 brands, and a thousands separator for large counts (e.g. "and 1,417 more brands") (PO 875646).
- Scenario 3: Others Equals Its Brands - Verify on several analysis dates that the Others value equals the sum of the Share of Voice of its brands, so the list always adds up to the slice.
- Scenario 4: Same Filters as the Donut - Verify that with period, country, AI engine and category filters the Others list uses the same filters as the donut.
- Scenario 5: Same Tooltip on Each Donut - Verify that the tooltip behaves the same on the overview, a category tab and the landscape of an unbranded analysis.
- Scenario 6: Tooltip Header - Verify that the header shows Others ("Autres" in French, "Otros" in Spanish), the same whole value as the slice and the legend, and the brand count ("48 brands", "1 brand", "1,427 brands", "1 427 marques", "1.427 marcas") (PO 876975).
- Scenario 7: Tooltip Component and Tail - Verify that the tooltip follows the GEO-1543 component "GEO / Others Tooltip [2.0]", opens after 150 ms on the side of the slice with room, and on branded cards points its tail at the middle of the Others arc's outer edge (design 875353, dev 876695).
- Scenario 8: Exact-Value Sort - Verify that brands are sorted by exact Share of Voice before rounding and only exact ties go A to Z, so two rows can both read "2%" (PO 875591).
- Scenario 9: Hover and Keyboard Open - Verify that hovering or tabbing to the Others slice or the Others legend item opens the tooltip, above the legend item when opened from it (frame 1.4), and that Escape closes it.
- Scenario 10: Tracked Brand in Others - Verify that the tracked brand, when it falls in Others, is listed like any other brand with no particular treatment.
- Scenario 11: Under 0.5% Shows ~0% - Verify that a brand under 0.5% shows "~0%" and that an Others slice whose value rounds to 0 shows "~0%" on the slice, the legend and the tooltip header (dev 875030).

**Excel Share of Voice Table (stories: GEO-1589)**

- Scenario 12: Share of Voice Table on Each Ranking Sheet - Verify that every sheet with a brand ranking table (overview, each category, unbranded landscape) has a Share of Voice table with rank, brand and Share of Voice %, the tracked brand highlighted as in the ranking table.
- Scenario 13: First 100 Brands Then the Rest - Verify that a scope naming more than 100 brands lists the first 100, the 10 donut slices included, in donut order, then a last row "and {N} more brands" ("and 1 more brand" for 101), with the thousands separator of each language (PO 875591, 875646).
- Scenario 14: Ranking Table Matches the App - Verify that the brand ranking table of the export shows the same brands, columns and order as the app and no longer has a Share of Voice column.
- Scenario 15: Table Placement and Styles - Verify that the Share of Voice table sits to the right of the ranking table, one empty column apart, from the same row, under the title "Share of Voice", with the workbook's navy header, left-aligned values and yellow-50 highlight (design 875353).
- Scenario 16: Sort and ~0% in Excel - Verify that the Excel table sorts by exact value with A to Z only for exact ties and shows "~0%" under 0.5%.
- Scenario 17: Same Data as the Dashboard - Verify that the Excel table gives the same brands and values as the dashboard donut for the selected period and filters, values written as text like the rest of the workbook (PO 875591).
- Scenario 18: French and Spanish Headers - Verify that a French or Spanish export reads "Part de voix" / "Part de voix %" or "Cuota de voz" / "Cuota de voz %", and the last row "et 30 autres marques" / "y 30 marcas más" with singular forms (PO 875591).

**PowerPoint and PDF Donut (stories: GEO-1590)**

- Scenario 19: Top 10 and Others in the Deck - Verify that a PowerPoint or PDF Share of Voice donut shows the top 10 brands and Others, as on the dashboard, the tracked brand no longer forced into the slices.
- Scenario 20: Others in the Legend - Verify that the legend ends with the Others chip and its Share of Voice %, in the slice's grey.
- Scenario 21: Others Line Under the Donut - Verify that one line under the donut lists the brands in Others with their Share of Voice, from the highest, up to 10, ending with "and {N} more brands, see the Excel export" when Others holds more.
- Scenario 22: PDF Same as PowerPoint - Verify that the PDF export shows the same donut, legend and line as the PowerPoint export.
- Scenario 23: Hole and Slices on the Period - Verify that the deck slices and the number in the donut hole use the whole selected period, the same values as the dashboard donut, and the last analysis date when no period is selected (PO 876975).
- Scenario 24: Line on Two Lines at Most - Verify that the line fits on 2 lines at most and that with long or non-Latin names it lists fewer brands and the "and {N} more brands" count grows (design 875353).
- Scenario 25: Deck Sort, Tracked Brand and ~0% - Verify that the deck line sorts by exact value with A to Z only for exact ties, lists the tracked brand with no bold or colour and shows "~0%" under 0.5%.
- Scenario 26: Donut Centre - Verify that the evolution pill, the brand name and the value stay inside the donut hole, a long brand name being cut with "…" (design 875353).
- Scenario 27: Unbranded Deck - Verify that the Share of Voice slide of an unbranded deck shows the same Others chip and line, with no "and N more" part when Others holds 10 brands or fewer.
- Scenario 28: French and Spanish Deck - Verify that a French or Spanish deck reads "Autres {n}% :" / "Otros {n}%:" with the singular and plural forms of the "more" part.

**Share of Voice Distribution (stories: GEO-1587)**

- Scenario 29: Every Brand Behind Others - Verify that the brand count of the tooltip header equals the number of brands of the scope outside the top 10, and that the Excel table lists them up to the 100th brand.
- Scenario 30: Exports Match the Dashboard - Verify that the tooltip, the deck and the Excel export give the same slices, Others value and order for the same scope, the Excel reading the same computation without the cache (dev 875136).

#### Edge Cases & Boundary Conditions

* Others with 6 brands: 6 rows, no "more" line; 11 brands: "and 1 more brand"; 1 brand: "1 brand".
* Two brands with different exact values both shown "2%": kept in exact-value order; exact ties only: A to Z (PO 875591).
* Brand under 0.5%: "~0%"; Others rounding to 0: "~0%" on the slice, the legend and the header.
* Scope with more than 100 brands: 100 rows then "and {N} more brands"; 101 brands: "and 1 more brand".
* Large counts: "1,427 brands" / "1 427 marques" / "1.427 marcas"; "and 26,391 more brands" / "et 26 391 autres marques" / "y 26.391 marcas más" (PO 875646).
* Tracked brand beyond rank 100: not in the Excel Share of Voice table, nothing points to it (PO 875646).
* Tracked brand in Others: listed like any other brand.
* 10 brands or fewer, all at 0.5% or more: no Others slice, no tooltip, no chip, no line.
* No period selected: deck hole and slices on the last analysis date (PO 876975).
* Long or non-Latin brand names: the deck line lists fewer brands and the count grows.
* Touch screens: no tooltip on tap in this release (PO 875646).
* Unbranded landscape card: the tooltip opens to the right of the ring and keeps today's tail anchor (dev 876695).
* Other category sheet of the Excel export: no Share of Voice table.

#### Open Points (not blocking)

* GEO-1588: on a small Others the tooltip covers the left part of the arc and a neighbour's label, and the dark tail is hard to see on the grey arc; raised to design as design questions (876731), no decision yet — Scenario 7 checks the anchor only.
* GEO-1588: the tail anchor of the unbranded landscape card is being checked with design (876695).
* GEO-1588 AC7 (and epic US 1.1 AC7): the AC text still asks for "the data variant of the design system Tooltip", which does not exist; the reference is the GEO-1543 component "GEO / Others Tooltip [2.0]" (875353, 876695) — AC text not yet updated in the epic.
* GEO-1588 DAC2: "(to confirm by design)" is confirmed by design (875353, frame 1.4); check that the Jira text is aligned.
* GEO-1589 AC7 / GEO-1590 AC5: the shared criterion still ends with the outdated note "(today the deck slices use the last analysis date of the period only…)", removed from the epic by the PM (876975) and asked to be removed from both stories (876976, 876977) — AC text not yet updated; Scenario 23 tests the whole period.
* GEO-1588 AC3: Others equal to the sum of its brands needs the Share of Voice formula of GEO-1556 on every date.
* Prerequisite: staging analyses with an Others slice of more than 10 brands, one of fewer than 10, a scope naming more than 100 brands, a brand under 0.5%, exact-value ties, the tracked brand inside Others, an unbranded analysis, and FR / ES interface and exports.

**Environment:** Staging (https://staging-geo.onclusive.com/geo), org QA-GEO, interface en-GB checked with GET /geo/api/v1/auth/me (FR and ES only for the string scenarios, then en-GB restored).

**Priority:** High

#### AC Coverage by Story

Result: **31 / 31 functional ACs covered** (GEO-1588 11/11, GEO-1589 7/7, GEO-1590 9/9, GEO-1587 4/4); the ACs with no scenario are flagged "No" with their reason and listed in Open Points, and "No — dev evidence" marks a scenario that needs dev evidence rather than the UI. Technical ACs are not mapped one by one: the observable ones are covered by the scenarios of their story, the others need dev evidence. "Partial" = only the visible output is testable.

**GEO-1588 — List the brands in the Others tooltip**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Brands listed, up to 10 | 1 | Yes |
| AC2 | And N more brands | 2 | Yes |
| AC3 | Others = sum of its brands | 3 | Yes |
| AC4 | Same filters | 4 | Yes |
| AC5 | Overview, category, landscape | 5 | Yes |
| AC6 | Header | 6 | Yes |
| AC7 | Component and side | 7 | Yes (reference component, open point) |
| AC8 | Exact-value sort | 8 | Yes (tie data needed) |
| AC9 | Hover and keyboard | 9 | Yes |
| AC10 | Tracked brand | 10 | Yes |
| AC11 | ~0% | 11 | Yes |

**GEO-1589 — Give the full Share of Voice list in the Excel export**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Share of Voice table, first 100 | 12 | Yes |
| AC2 | More than 100 brands | 13 | Yes (data needed) |
| AC3 | Ranking table matches the app | 14 | Yes |
| AC4 | Placement | 15 | Yes |
| AC5 | Exact-value sort | 16 | Yes |
| AC6 | ~0% | 16 | Yes |
| AC7 | Same data as the dashboard | 17 | Yes (AC note outdated, open point) |

**GEO-1590 — Name Others in the PowerPoint and PDF donut**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Top 10 and Others | 19 | Yes |
| AC2 | Others in the legend | 20 | Yes |
| AC3 | Line under the donut | 21 | Yes |
| AC4 | PDF same as PowerPoint | 22 | Yes |
| AC5 | Same data as the dashboard | 23 | Yes (AC note outdated, open point) |
| AC6 | Two lines at most | 24 | Yes |
| AC7 | Exact-value sort | 25 | Yes |
| AC8 | Tracked brand | 25 | Yes |
| AC9 | ~0% | 25 | Yes |

**GEO-1587 — Serve every brand behind Others from the Share of Voice distribution**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Every brand of the scope returned | 29 | Partial (seen through the tooltip and Excel) |
| AC2 | Others = exact sum | 3 | Yes |
| AC3 | Sort, exact ties A to Z | 8, 16 | Yes |
| AC4 | Exports get the same result | 30, 17, 23 | Yes |
