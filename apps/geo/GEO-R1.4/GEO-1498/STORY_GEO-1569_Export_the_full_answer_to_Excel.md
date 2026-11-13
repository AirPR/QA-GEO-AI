# GEO-1569: STORY-53.6: Export the full answer to Excel

**Story ID:** GEO-1569
**Issue Type:** Story
**Title:** STORY-53.6: Export the full answer to Excel
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1569

## User Story

> As a GEO user, I want the full answer of each engine in the Excel export, so that I can read and share the answers outside the product.

- **As** a GEO user
- **I want** the full answer of each engine in the Excel export
- **So that** I can read and share the answers outside the product.

## Acceptance Criteria

_9 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, User Story 1.6)

- Given an analysis run with natural answers, When I export it to Excel, Then the "Response" column of the Raw Data sheet carries the full answer of each engine for every question type
- Given a Visibility question, When it is exported, Then the brand ranking that the "Response" column carries today moves to a new "Ranking" column next to it, in the same format; for a Competitive question the full answer replaces the "About {brand}" and "About winner" text the cell has today
- Given a Competitive question, When it is exported, Then the "Ranking" column carries the outcome (Chosen, Conditional, Not chosen or Overlooked) followed by the brand or brands the answer picks
- Given a Perception, Other or Brand Image question, When it is exported, Then the "Ranking" column says "N/A", as the other cells of the export
- Given a Brand Image question, When it is exported, Then its rows keep one row per dimension with the dimension bullets in the "Response" column, as today
- Given an analysis run before this epic shipped, When I export it, Then the Raw Data sheet has the same columns as a new analysis, including "Ranking"; a Visibility row keeps the ranking its "Response" carries today, so the ranking shows in both columns
- Given an answer with citation markers, When it is exported, Then the markers [n] stay in the text and the "Source URLs" column lists the cited sources in the same numbering, then the uncited ones without a number; the numbering is the panel's (one number per page), so a URL that does not fit the cell does not shift the numbers after it; only a **natural** answer that is not counted (cut, refused, empty) no longer appears — a row of an analysis run before this epic that reads "No ranking returned" or "No usable content returned" stays as today (PM, 2026-10-29, answer on GEO-1498: "only the not-counted natural answers disappear, rows of analyses run before this epic that read 'No ranking returned' / 'No usable content returned' stay as today, per the compatibility rule of story 1.6")
- Given the Raw Data sheet, When it is exported, Then the "Favorability" column is removed: the outcome and the ranking columns carry that information
- Given an answer longer than an Excel cell can hold, When it is exported, Then it is shortened and marked the same way as any other long cell of the export today

## Technical Details

### Scope note

Backend export only, the EPIC text is the Excel spec (no frame). Depends on STORY-50.1 (GEO-1550, full answer), STORY-50.2 (GEO-1551, citations), STORY-50.4 (GEO-1553, ranking), STORY-50.5 (GEO-1554, outcome) and STORY-50.6 (GEO-1555, not counted), and reuses the citation numbering of STORY-53.4. Scheduled emails, PowerPoint and PDF content do not change (metric name only: STORY-53.8).

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** GEO-1550, GEO-1551, GEO-1553, GEO-1554, GEO-1555, GEO-1567, GEO-1556, GEO-1557, GEO-1576
- **relates to:** GEO-1607 (Bug, Done) — [GEO-Enrichment] Natural competitive answer read as "Chosen" next to an "Overlooked" brand: Excel Raw Data shows "Chosen" with no brand
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1569
- External Spec: [53-6-export-the-full-answer-to-excel.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-6-export-the-full-answer-to-excel.md)
