# GEO-1267: Remove the score and barometer from the expanded concept view

**Story ID:** GEO-1267
**Issue Type:** Story
**Title:** 48.2 Remove the score and barometer from the expanded concept view
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1068
**Created:** 2026-10-16
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1267

## User Story

> As a GEO user inspecting a concept, I want the expanded view to repeat only the frequency and polarity, so that the detail panel focuses on the sources behind the concept.

**Surface:** frontend, the concept detail panel (opened by a click on a concept row, brand and unbranded).

## Acceptance Criteria

**AC1 — Frequency and polarity, no score**

- Given: a concept
- When: I expand it
- Then: the detail view shows the concept's frequency and its polarity label and no -100 to +100 sentiment score

**AC2 — No barometer**

- Given: the expanded view
- When: it renders
- Then: the barometer gauge visualizing the sentiment score is no longer shown

**AC3 — Sources unchanged**

- Given: the expanded view
- When: it renders
- Then: the cited sources and all other existing content remain unchanged

## Technical Details

### Rules (for QA)

- Stays: the coloured header with the concept name and the close button, the frequency, the sources section.
- Goes: « -80 sentiment » in the header, the Negative → Positive gauge and its cursor.
- The panel shows no quotes today; this story adds none (decision D4).

### Design ACs

- No Figma (D0). The header keeps its polarity colour; the polarity label is the filter pill in a white variant so it stays readable on the coloured header (decision D7, OS-Team 2026-10-16, PM on leave): `90% frequency • [Positive]`.

### PO validation (sync 2026-10-20)

- D4 and D7 validated by PO 2026-10-20: "OK for all your decisions." (Quentin Reant, PO/PM, GEO-1068 comment 865134, 2026-10-19 20:56 New York time = 2026-10-20); "D0, D4, D5 and D7 need no change in the epic." Story text unchanged in Jira.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1267
- External Spec: [epic-48/48-2-remove-the-score-and-barometer-from-the-expanded-concept-view.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-48/48-2-remove-the-score-and-barometer-from-the-expanded-concept-view.md)
