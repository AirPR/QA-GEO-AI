# GEO-1588: STORY-51.1: List the brands in the Others tooltip

**Story ID:** GEO-1588
**Issue Type:** Story
**Title:** STORY-51.1: List the brands in the Others tooltip
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1537
**Fix version:** 1.4
**Created:** 2026-11-09
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1588

## User Story

> As a user, I want to see which brands make up Others in the Share of Voice donut, so that a large Others slice is never a black box.

- **As** a user
- **I want** to see which brands make up Others in the Share of Voice donut
- **So that** a large Others slice is never a black box.

## Acceptance Criteria

_11 functional ACs + 12 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1537, User Story 1.1)

- Given the Share of Voice donut shows an Others slice, When I hover it, Then a tooltip lists the brands in Others with their Share of Voice, from the highest, up to 10 brands
- Given Others holds more than 10 brands, When I hover the slice, Then the tooltip ends with "and {N} more brands, see the export"
- Given the brands in Others, When the donut is drawn, Then the Others value is the sum of their Share of Voice, so the list always adds up to the slice, on every analysis date
- Given filters on the dashboard (period, country, AI engine, category), When I hover Others, Then the list uses the same filters as the donut
- Given the overview, a category tab or the landscape of an unbranded analysis, When the donut shows Others, Then the tooltip behaves the same way on each of them
- Given the Others tooltip, When it opens, Then its header shows Others, its Share of Voice and the number of brands it holds ("{n} brands", "1 brand")
- Given the Others tooltip, When it opens, Then it uses the data variant of the design system Tooltip (dark, with a tail pointing to the slice) and opens on the side of the slice with room
- Given two brands, When they are listed in the tooltip, the deck line or the Excel table, Then they are sorted by their exact Share of Voice, before rounding, and only brands with the exact same value are sorted by brand name from A to Z (two rows can then both read "2%")
- Given the Others slice or the Others item in the legend, When I hover it or reach it with the keyboard, Then the Others tooltip opens
- Given the tracked brand is in Others, When the tooltip or the deck line lists it, Then it has no particular treatment and is listed like any other brand
- Given a brand with a Share of Voice under 0.5%, When it is listed in the tooltip, the deck line or the Excel table, Then its Share of Voice shows as "~0%"

### Change (2026-11-10, PM — GEO-1537 comment 875591)

The criterion on ties is reworded: brands are sorted by their exact Share of Voice, and only exactly equal values go A to Z, so two rows can both read « 2% ». The FR / ES strings are confirmed as they are, and « see the export » is kept even when a scope names more than 100 brands. Already implemented, no code change.

### Change (2026-11-10, PM — GEO-1537 comment 875646)

- Numbers are written as the platform writes them in each language, in the « and N more brands » line and in the header « {n} brands »: « 1,427 brands … and 1,417 more brands, see the export », FR « 1 427 marques … et 1 417 autres marques, voir l'export », ES « 1.427 marcas … y 1.417 marcas más, ver la exportación ». Same rule in the Excel table (STORY-51.2) and the deck line (STORY-51.3).
- Touch screens: the tooltip does not open on touch, and this is accepted for this release (design agrees). If added later, a tap on the slice or the legend item toggles the tooltip.

### Design Acceptance Criteria (GEO-1543)

- **DAC1 — Anatomy:** dark surface (#1E293B, same as the DS Tooltip), 272 px body + tail, 12 px radius and padding, shadow; no info icon, no dismiss / link button. Header row: grey dot (slice colour) + « Others » left, slice % right, title style; under it « {n} brands » in the description style (slate-400); 1 px slate-600 divider; up to 10 rows brand left (description style, truncated with « … »), % right-aligned (title colour); then, when Others holds more than 10 brands, a divider and « and {N} more brands, see the export ». No colour dot per brand.
- **DAC2 — Placement:** next to the pointer on the side with room — left of the donut on the overview and category cards (tail on the right), right of the slice on the unbranded landscape card (tail on the left). Same component everywhere. No scroll: 10 rows max. From the Others legend item: above the item (to confirm by design).
- **DAC3 — Onclusive Social shell:** same component; OS native styling unchanged, the card is page content.

### Technical Acceptance Criteria

- **TAC1** — With `others` of 48 brands: hovering the Others arc shows the header « Others 58% », « 48 brands », exactly 10 rows in the received order, and « and 38 more brands, see the export ».
- **TAC2** — With `others` of 6 brands: 6 rows, no overflow line, no second divider.
- **TAC3** — With `others` of 1 brand: « 1 brand » (singular); with 11: « and 1 more brand, see the export ».
- **TAC4** — Focusing the Others legend button with Tab opens the tooltip; Escape closes it; focusing the Others arc opens it too and shows the blue outline; the svg has `role="group"` and the arc `role="button"` with its label.
- **TAC5** — A brand at 0.3 % in `others.brands` shows « ~0% »; the tracked brand in `others.brands` has the same markup as the others.
- **TAC6** — The header % equals the Others legend item % and the slice label (GEO-1528 value), including the case where `Math.round(others.sov)` differs from it by 1; when the GEO-1528 value is 0 with the slice drawn, all three read « ~0% ».
- **TAC7** — Without `others` (Lite), or with `others.sov` ≤ 0.05 (no slice), the Others arc and legend item have no `tabIndex`, no button, no tooltip; all 22 existing tests stay green unchanged.
- **TAC8** — The `side` passed to `SovOthersTooltip`: arc `right` on the neutral card, `left` on the branded card; legend item `top` in both.
- **TAC9** — Hovering a brand slice still shows the name pill; hovering Others does not when the tooltip is active, and still does without `others` (Lite).
- **TAC10** — `pnpm check`, `pnpm lint:i18n` and `pnpm test` green; the four locale files have the same new keys (parity test).
- **TAC11** — Hovering the Others arc opens the tooltip and the `<path>` gets `aria-describedby` (Radix `asChild` on SVG works).
- **TAC12** — (PM 2026-11-10, 875646) With `others.brandCount` = 1,427: header « 1,427 brands » and « and 1,417 more brands, see the export » (FR « 1 427 marques » / « et 1 417 autres marques, voir l'export », ES « 1.427 marcas » / « y 1.417 marcas más, ver la exportación »), the Others arc label too; same numbers as the Excel table and the deck line.

## Technical Details

### Scope note

Frontend only, on the overview, a category tab and the landscape of an unbranded analysis; the free Lite analysis donut is unchanged. Brand slices keep today's hover. Values in whole numbers (the Figma frames show one decimal, the epic rules it out). The tooltip header shows the same whole number as the Others slice and legend item. Data from STORY-51.4. Design: GEO-1543 (Figma « Measure - GEO Module », page « GEO-1543 - Brands behind Others in Share of Voice », flow 1).

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** GEO-1587
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1537
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1588
- External Spec: [51-1-list-the-brands-in-the-others-tooltip.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-1537-epic-51-others-brands/docs/implementation-artifacts/epics/epic-51/51-1-list-the-brands-in-the-others-tooltip.md)
