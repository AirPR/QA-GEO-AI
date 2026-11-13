# GEO-1565: STORY-53.2: Keep the question and the engine visible while reading

**Story ID:** GEO-1565
**Issue Type:** Story
**Title:** STORY-53.2: Keep the question and the engine visible while reading
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1565

## User Story

> As a GEO user reading a long answer, I want to always see which question and which engine I am reading, so that I don't lose context while I scroll.

- **As** a GEO user reading a long answer
- **I want** to always see which question and which engine I am reading
- **So that** I don't lose context while I scroll.

## Acceptance Criteria

_2 functional ACs + 8 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, User Story 1.2)

- Given an expanded answer, When I scroll the panel, Then the question stays pinned at the top together with the engine of the answer
- Given an expanded answer, When I switch engine tab, Then the new tab opens clamped and at the top, as in GEO-1017

### Technical Acceptance Criteria

**TAC1 — Pinned row**

- Given the drawer open on a Visibility question with 3 engines
- When the panel renders
- Then the tab list is inside an element with `position: sticky` and `top: 0` (class `sticky top-0`) that is a child of the drawer's scroll container, with a white background and a bottom border; the question header is outside the scroll container (53.9). Checked in the browser on staging in both shells: with the answer expanded and the content scrolled, the header stays at the top of the drawer and the tab row right under it, with no gap

**TAC2 — Scroll reset on an engine change**

- Given the drawer open, the scroll container at `scrollTop = 400`
- When another engine tab is selected by a click, then by ArrowRight inside the tab list
- Then `scrollTop` is `0` after each change, and the focus stays on the selected tab

**TAC3 — Collapsed on an engine change**

- Given a **legacy** (non-reader) Visibility answer and a Perception answer longer than the 500-character preview, « Show more » clicked — the 500-character preview / « Show more » is the legacy excerpt path only, kept exactly as before this story; a reader row (STORY-53.1, GEO-1564) uses the 8-line / 184px clamp and « Show full answer » instead, and resets the same way on an engine change, tested in 53.1's own spec
- When another engine tab is selected, then the first one again, once with the other engine's data cached and once not cached
- Then each tab shows « Show more » (collapsed), never « Show less », including after the new data arrives

**TAC4 — No regression on a new question**

- Given the drawer open on a scrolled question
- When the drawer moves to the next question (53.9 arrows)
- Then the content starts at its top with the first engine selected, as 53.9 TAC5

## Technical Details

### Scope note

Display only. The sticky header sits at the top of the drawer of STORY-53.9, which covers the host top bar in both shells (frame 09): depends on STORY-53.9. Clamp and expand: STORY-53.1. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").

## Dependencies

- **Blocks:** GEO-1564
- **Blocked by:** GEO-1572
- **relates to:** GEO-1602 (Bug, Done) — [GEO-Category] Prompt detail panel: the engine tabs leave a 16 px gap under the header once sticky, the answer scrolls through it
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1565
- External Spec: [53-2-keep-the-question-and-the-engine-visible-while-reading.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-2-keep-the-question-and-the-engine-visible-while-reading.md)
