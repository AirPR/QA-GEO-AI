# GEO-1587: STORY-51.4: Serve every brand behind Others from the Share of Voice distribution

**Story ID:** GEO-1587
**Issue Type:** Story
**Title:** STORY-51.4: Serve every brand behind Others from the Share of Voice distribution
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1537
**Fix version:** 1.4
**Created:** 2026-11-09
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1587

## User Story

> As a GEO user, I want the Share of Voice donut, the Excel export and the deck to read the brands behind Others from one list computed once, so that the brands listed under Others always add up to the Others slice and match the app everywhere.

- **As** a GEO user
- **I want** the Share of Voice donut, the Excel export and the deck to read the brands behind Others from one list computed once
- **So that** the brands listed under Others always add up to the Others slice and match the app everywhere.

## Acceptance Criteria

_4 functional ACs + 8 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (OS-Team, derived from GEO-1537 « Dependencies », US 1.1 AC3 / AC8, US 1.3 AC5)

- Given a Share of Voice donut scope (overview or category, period, countries, AI engines), When the Share of Voice distribution is requested, Then it returns the brands of the slices (top 10, as today) and every other brand named in the scope with its Share of Voice, the number of those brands and the Others value
- Given the brands outside the top 10, When the Others value is returned, Then it is the sum of their exact Share of Voice (before rounding), so the listed brands always add up to the slice, on every analysis date
- Given brands in the distribution, When they are returned, Then they are sorted by Share of Voice from the highest, and only brands with the exact same Share of Voice, before rounding, by brand name from A to Z
- Given an export scope (period, countries, AI engines, category), When an export asks for the Share of Voice distribution, Then it gets the same result as the dashboard donut for the same scope, from the same cache

> **Change (2026-11-09, user decision, option C):** « from the same cache » no longer holds for the Excel export. The dashboard and the deck read the cached distribution, which lists the **first 10 brands** behind Others (count and value cover all of them); the Excel export reads the same computation **without cache** and gets every brand. Same slices, same Others value, same order for the same scope. PM informed.

> **Change (2026-11-10, PM — GEO-1537 comment 875591):** the PM confirmed that ties are on the exact Share of Voice (US 1.1 AC8 reworded in the epic); the third criterion now says so. Already implemented, no code change.

### Technical Acceptance Criteria

- **TAC1** — With 15 brand families named in scope, the response has 10 `brands` and `others.brandCount = 5`, `others.brands` the 5 others in order; `Σ brands.sov + others.sov = 100` within rounding (± 0.01 per brand).
- **TAC2** — With 10 families or fewer, all ≥ 0.5 %, `others` is absent from the response. With one family outside the slices at 0.03 %, `others` is present (the Excel export lists it) even though the donut draws no Others slice under 0.05 % — STORY-51.1 hides the tooltip in that case.
- **TAC3** — A family at 0.4 % ranked 9th by value is not in `brands` but is in `others.brands`; a family at an exact 0.496 % (0.50 rounded to 2 decimals) stays a slice.
- **TAC4** — Two families with the same exact Share of Voice come out « Alpha » before « beta » (case-insensitive), in `brands` and in `others.brands`. With 12 families at the same exact Share of Voice, the first 10 by name are the slices and the last 2 are in `others.brands`.
- **TAC5** — No family named in scope → `brands = []`, no `others` (today's empty case unchanged).
- **TAC6** — `isTargetBrand` is set on the tracked brand wherever it lands (slice or Others); unbranded analyses never set it. Matching is unchanged and the same as Brand Rankings (containment), so on the full list more than one family can carry `isTargetBrand = true`; STORY-51.2 decides how it highlights them.
- **TAC7** — Cross-tenant: the Share of Voice distribution requested with another organisation's id returns 404 (new service test).
- **TAC8** — The export scope gives the distribution the same snapshot ids and period key as the dashboard endpoint, with and without a period.

## Technical Details

### Scope note

Backend shared foundation of the epic, no Jira user story of its own (the epic's « Dependencies »: the full brand list behind Others). Almost no visible change: same slices and same Others slice, except between brands with exactly the same Share of Voice, whose order can change (A to Z), and, when the 10th and 11th brands tie, which one is the 10th slice. Depends on GEO-1556 (story 50.7b, done). Blocks STORY-51.1, STORY-51.2 and STORY-51.3. Design reference: GEO-1543 (rationale D2).

## Dependencies

- **Blocks:** GEO-1588, GEO-1589, GEO-1590
- **Blocked by:** none in Jira links
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1537
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1587
- External Spec: [51-4-serve-every-brand-behind-others-from-the-share-of-voice-distribution.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-1537-epic-51-others-brands/docs/implementation-artifacts/epics/epic-51/51-4-serve-every-brand-behind-others-from-the-share-of-voice-distribution.md)
