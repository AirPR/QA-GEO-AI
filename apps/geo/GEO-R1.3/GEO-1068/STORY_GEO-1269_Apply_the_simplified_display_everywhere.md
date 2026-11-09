# GEO-1269: Apply the simplified display everywhere concepts appear

**Story ID:** GEO-1269
**Issue Type:** Story
**Title:** 48.4 Apply the simplified display everywhere concepts appear
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1068
**Created:** 2026-10-16
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1269

## User Story

> As a user consuming the analysis outside the main view, I want exports and shared views to match the simplified display, so that no surface still shows the removed score.

**Surface:** backend, the exports (PPTX / PDF, XLSX). No frontend work for the shared view.

## Acceptance Criteria

**AC1 — Slide export**

- Given: a slide export of the analysis
- When: the key concepts section is exported
- Then: each concept shows frequency and polarity only, with no numeric sentiment score and no barometer

**AC2 — Shared analysis**

- Given: a shared analysis
- When: a recipient opens the key concepts view
- Then: the display matches the simplified main view

## Technical Details

### Rules (for QA)

- PPTX and PDF (the PDF is the same deck): each concept row reads `{n} sources • {Positive | Mixed | Negative}` in the export language (EN / FR / ES) and its frequency %; no « +80 sentiment ».
- The frequency % takes the polarity colour (green / amber / red, like the row's accent bar), as on the dashboard (decision D6).
- XLSX: the concepts tables have the columns Concept · Sentiment · Sources · Frequency · Cited by; the « Score » column is removed (decision D2).
- Shared analysis: no share link exists in the product yet; a recipient is any user of the same organisation opening the analysis, who sees the main view of 48.1–48.3 (decision D3). The category-level Sentiment KPI is unchanged (decision D5).

### Decisions

Decisions D2, D3, D5, D6 taken by OS-Team on 2026-10-16 while the PM is on leave; they will be reported in GEO-1068 at the end of the epic.

### PO validation (sync 2026-10-20)

- D2, D3, D5 and D6 validated by PO 2026-10-20: "OK for all your decisions." (Quentin Reant, PO/PM, GEO-1068 comment 865134, 2026-10-19 20:56 New York time = 2026-10-20). Epic 1.4 updated 2026-10-20: AC1 slide export (polarity colour, polarity word in the export language, D6), AC2 XLSX without Score column (D2), AC3 another user of the same organisation (D3); D5 needs no epic change. Story text unchanged in Jira; QA keeps the story numbering (AC1 includes the XLSX rule = epic 1.4 AC2; AC2 = epic 1.4 AC3).

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned
- **Related (mentioned in the ticket or the epic):**
  - GEO-1245 / GEO-1248 (exports, GEO-1209)

## Definition of Done

- [ ] All acceptance criteria verified (brand and unbranded analyses)
- [ ] No numeric sentiment score left on the covered surface
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1068
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1269
- External Spec: [epic-48/48-4-apply-the-simplified-display-everywhere-concepts-appear.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-48/48-4-apply-the-simplified-display-everywhere-concepts-appear.md)
