# GEO-1268: Keep sorting and filtering consistent with the simplified display

**Story ID:** GEO-1268
**Issue Type:** Story
**Title:** 48.3 Keep sorting and filtering consistent with the simplified display
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1068
**Created:** 2026-10-16
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1268

## User Story

> As a GEO user organizing the concepts list, I want sorting and filtering to keep working on polarity, so that the simplification does not remove any way I navigate the list.

**Surface:** frontend, the sort and filters of the key concepts list.

## Acceptance Criteria

**AC1 — Sort by polarity group**

- Given: the sort options
- When: I sort by sentiment
- Then: concepts are ordered by polarity group (positive first, then mixed, then negative) without any numeric score being exposed

**AC2 — Filters unchanged**

- Given: the polarity filters
- When: I filter to positive, mixed or negative
- Then: filtering behaves exactly as it does today

**AC3 — Distribution summary unchanged**

- Given: the sentiment distribution summary above the list (share of positive, mixed and negative concepts)
- When: the view renders
- Then: it is unchanged by this epic

## Technical Details

### Rules (for QA)

- Inside a polarity group, concepts are ordered by frequency (highest first), then by name (A→Z) when frequencies are equal (decision D1, OS-Team 2026-10-16, PM on leave).
- The sort menu keeps its three entries (Frequency, Sentiment, A–Z).
- With a polarity filter on, « Sentiment » sorts a single group, so it reads as « by frequency ».

### PO validation (sync 2026-10-20)

- D1 validated by PO 2026-10-20: "OK for all your decisions." (Quentin Reant, PO/PM, GEO-1068 comment 865134, 2026-10-19 20:56 New York time = 2026-10-20); the epic now reads "1.3 sort tie-break by frequency then name (D1)" (epic 1.3 AC1 Updated 2026-10-20). Story text unchanged in Jira; AC1 numbering kept.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned

## Definition of Done

- [ ] All acceptance criteria verified (brand and unbranded analyses)
- [ ] No numeric sentiment score left on the covered surface
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1068
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1268
- External Spec: [epic-48/48-3-keep-sorting-and-filtering-consistent-with-the-simplified-display.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-48/48-3-keep-sorting-and-filtering-consistent-with-the-simplified-display.md)
