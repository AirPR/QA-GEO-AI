# GEO-1266: Show only frequency and polarity on each concept

**Story ID:** GEO-1266
**Issue Type:** Story
**Title:** 48.1 Show only frequency and polarity on each concept
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1068
**Created:** 2026-10-16
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1266

## User Story

> As a GEO user scanning key concepts, I want each concept to show just its frequency and whether it is positive, mixed or negative, so that I can read the list at a glance without interpreting a numeric score.

**Surface:** frontend, the key concepts list (`TopConceptsCard`), shared by brand Top Concepts and unbranded Top Topics / Other page.

## Acceptance Criteria

**AC1 — Frequency and polarity only**

- Given: the key concepts list
- When: a concept is displayed
- Then: it shows its frequency and its polarity (positive, mixed or negative) and no numeric sentiment score

**AC2 — Explicit label**

- Given: a concept
- When: its polarity is displayed
- Then: the polarity is stated as an explicit label and not conveyed by color alone

**AC3 — Same concepts, same frequency**

- Given: the simplified display
- When: the list renders
- Then: which concepts appear and their frequency values are unchanged from today

## Technical Details

### Rules (for QA)

- Applies to brand Overview / category pages (Top Concepts), unbranded Overview / category pages (Top Topics) and the unbranded Other page.
- The row keeps its quote count (unbranded), its source count and its frequency %. « -80 sentiment » is replaced by the polarity label.
- The coloured bar and the colour of the % stay: the label is added, the colour is no longer the only cue.

### Design ACs

- No Figma (decision D0, OS-Team 2026-10-16, PM on leave): the label is the Positive / Mixed / Negative pill of the filters above the list, without the count, in the row's meta line: `[3 quotes •] 12 sources • [Negative]`.

### PO validation (sync 2026-10-20)

- D0 validated by PO 2026-10-20: "OK for all your decisions." (Quentin Reant, PO/PM, GEO-1068 comment 865134, 2026-10-19 20:56 New York time = 2026-10-20); "D0, D4, D5 and D7 need no change in the epic." Story text unchanged in Jira.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned
- **Related (mentioned in the ticket or the epic):**
  - GEO-1243 (Top Topics, GEO-1209)
  - GEO-1248 (Other page, GEO-1209)

## Definition of Done

- [ ] All acceptance criteria verified (brand and unbranded analyses)
- [ ] No numeric sentiment score left on the covered surface
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1068
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1266
- External Spec: [epic-48/48-1-show-only-frequency-and-polarity-on-each-concept.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-48/48-1-show-only-frequency-and-polarity-on-each-concept.md)
