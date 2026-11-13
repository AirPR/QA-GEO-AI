# GEO-1590: STORY-51.3: Name Others in the PowerPoint and PDF donut

**Story ID:** GEO-1590
**Issue Type:** Story
**Title:** STORY-51.3: Name Others in the PowerPoint and PDF donut
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1537
**Fix version:** 1.4
**Created:** 2026-11-09
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1590

## User Story

> As a user who presents the deck, I want the Others slice named and its brands listed, so that the people I present to can read the donut without the app.

- **As** a user who presents the deck
- **I want** the Others slice named and its brands listed
- **So that** the people I present to can read the donut without the app.

## Acceptance Criteria

_9 functional ACs + 16 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1537, User Story 1.3)

- Given a PowerPoint or PDF export, When a Share of Voice donut is drawn, Then it shows the top 10 brands and Others, as on the dashboard
- Given the donut shows an Others slice, When the legend is drawn, Then Others is in the legend with its Share of Voice %, after the brands, in the same grey as the slice
- Given the donut shows an Others slice, When the slide is drawn, Then one line under the donut lists the brands in Others with their Share of Voice, from the highest, up to 10 brands, and ends with "and {N} more brands, see the Excel export" when Others holds more than 10
- Given the PDF export, When it is generated, Then it shows the same donut, legend and line as the PowerPoint export
- Given a PowerPoint, PDF or Excel export, When the Share of Voice donut, the line under it or the Excel Share of Voice table is generated, Then it uses the same data as the Share of Voice donut of the dashboard for the selected period and filters, so the brands and values match the app (today the deck slices use the last analysis date of the period only, while the number in the hole uses the whole period)
- Given the line under the donut, When it is drawn, Then it fits on 2 lines at most, and when the brands do not fit it lists fewer of them and the "and {N} more brands" count grows

### Shared criteria that apply to the deck line (GEO-1537, US 1.1)

- Given two brands, When they are listed in the tooltip, the deck line or the Excel table, Then they are sorted by their exact Share of Voice, before rounding, and only brands with the exact same value are sorted by brand name from A to Z (two rows can then both read "2%")
- Given the tracked brand is in Others, When the tooltip or the deck line lists it, Then it has no particular treatment and is listed like any other brand
- Given a brand with a Share of Voice under 0.5%, When it is listed in the tooltip, the deck line or the Excel table, Then its Share of Voice shows as "~0%"

### Change (2026-11-10, PM — GEO-1537 comment 875591)

The criterion on ties is reworded: brands are sorted by their exact Share of Voice, and only exactly equal values go A to Z, so two rows can both read « 2% ». The FR / ES strings are confirmed as they are (« Autres {n}% : », « Otros {n}%: »), and « see the Excel export » is kept even when a scope names more than 100 brands. Already implemented, no code change.

### Change (2026-11-10, PM — GEO-1537 comment 875646)

- The PM removes the note in brackets at the end of the fifth criterion. The criterion itself is unchanged. **The number in the hole is the Share of Voice of the whole selected period, the same number as the centre of the dashboard donut** (it showed the last analysis date's value before this story).
- The number in « and N more brands » is written as the platform writes numbers in each language: « and 1,417 more brands, see the Excel export », « et 1 417 autres marques, voir l'export Excel », « y 1.417 marcas más, ver la exportación de Excel ». Same rule in the tooltip (STORY-51.1) and the Excel table (STORY-51.2).

### Design Acceptance Criteria (GEO-1543, D5)

- **Slide (frame 3.1):** Given a branded deck, When the KPI overview slide is drawn, Then the donut stays under the 4 KPI cards, the cards do not move, the Share of Voice card keeps its height, and its chart area shrinks to make room for the line; the centre shows the brand name, its Share of Voice and the evolution pill
- **Legend:** Given the donut shows an Others slice, When the legend is drawn, Then the brand chips are laid out as today and the Others chip comes last, grey (slate), « Others 58% », regular weight like the other brands
- **Others line:** Given the donut shows an Others slice, When the line is drawn, Then it sits under the chips, centred, 675 pt wide, 7 pt text, 10.5 pt line height, slate-500, 2 lines at most, with the lead « Others 58%: » in bold
- **Others callout:** Given the Others slice is large enough, When the donut is drawn, Then it gets its « 58% » outside label like the brand slices
- **Unbranded (frame 3.2):** Given an unbranded deck, When its Share of Voice slide is drawn, Then it shows the same chip and line under its donut, with no « and N more » part when Others holds 10 brands or fewer

### Technical Acceptance Criteria

- **TAC1** — Given an export with or without a period, When the overview and category donuts are fetched, Then the distribution is read with the dashboard's scope: the period's snapshots and period key (else the anchor snapshot alone), the category, the markets and the AI engines
- **TAC2** — Given the tracked brand is outside the top 10, When the KPI slide is drawn, Then it is not added to the slices and the centre still shows the entity name and the Share of Voice KPI of the period
- **TAC3** — Given the frame 3.1 data (48 brands in Others), When the line is computed at 675 pt, Then it reads « Others 58%: », 10 brands, « and 38 more brands, see the Excel export »; with a narrow box it lists fewer brands, the count grows, and it never takes more than 2 lines
- **TAC4** — Given 6 brands in Others, When the line is computed, Then all 6 are listed with no « more » part; Given 11 brands that all fit, Then 10 are listed + « and 1 more brand, see the Excel export »
- **TAC5** — Given a brand at 0.3 % in the line, When it is drawn, Then it reads « ~0% »; the tracked brand in Others has no bold or colour
- **TAC6** — Given an Others slice, When the legend is drawn, Then the Others chip is the last chip, grey, and its value is the dashboard slice's value
- **TAC7** — Given no Others, When the donut is drawn, Then there is no chip and no line, and the legend height, donut radius, ring width and centre stack are as today
- **TAC8** — Given a deck with Others, When the PDF is generated, Then it is generated without error with one page per slide (the Others text is checked on the deck the PDF is drawn from)
- **TAC9** — Given a French or Spanish deck, When the donut is drawn, Then it reads « Autres … » / « Otros … » with the singular and plural forms of the « more » part
- **TAC10** — Given a branded KPI slide with an Others line and a 2-row legend, with and without the evolution pill, When it is drawn, Then the pill and the name and value texts are inside the donut hole, the line ends inside the card, and the centre value is the Share of Voice KPI of the period
- **TAC11** — (PM 2026-11-10, 875646) Given 1,427 brands behind Others, When the line is computed, Then it ends with « and 1,417 more brands, see the Excel export » (FR « et 1 417 autres marques, voir l'export Excel », ES « y 1.417 marcas más, ver la exportación de Excel ») and still fits on 2 lines; the number is never split across the two lines

## Technical Details

### Scope note

Backend only; the PDF is the deck rendered, so it follows. Every deck donut (overview and category KPI slides, Share of Voice slide of an unbranded deck) uses the dashboard's data; the tracked brand is no longer forced into the slices. The hole shows the Share of Voice of the whole period, as the dashboard. Whole numbers (the Figma frames show one decimal). Data from STORY-51.4. Design: GEO-1543 (flow 3).

### Implementation notes (2026-11-09)

- The Others slice follows the dashboard as shipped by STORY-51.1: its size and its display threshold (> 0.05) use the summed Share of Voice of the brands behind Others.
- With a 3-row legend the donut hole keeps at least 42 pt and the ring thins (6 pt minimum); when the Others line is drawn the legend keeps 3 rows at most, longer brand names cut with « … ».
- **Code review:** Chinese and Japanese brand names are measured in the font they are drawn with, so the Others line stays on 2 lines for them too (they could take a third line before the fix); a long entity name in the hole is cut with « … » so it never wraps; the « Others » chip itself is never cut.
- **Cost check on staging:** Toyota (QA-GEO), « All reports » (147 snapshots, 2 categories): the deck adds about 1.6 s with a cold cache and about nothing once the dashboard donut was opened; today's PowerPoint takes 114 s on the server because of the Time Evolution slides (bug GEO-1591, not this story), the PDF adds 3 s of rendering.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1590
- External Spec: [51-3-name-others-in-the-powerpoint-and-pdf-donut.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-1537-epic-51-others-brands/docs/implementation-artifacts/epics/epic-51/51-3-name-others-in-the-powerpoint-and-pdf-donut.md)
