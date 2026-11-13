# GEO-1554: STORY-50.5: Read the competitive outcome in four buckets

**Story ID:** GEO-1554
**Issue Type:** Story
**Title:** STORY-50.5: Read the competitive outcome in four buckets
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1554

## User Story

> As a user, I want each head-to-head answer to say whether the engine chose my brand, chose it only in some cases, or did not choose it, so that AI Choice reflects how engines really answer competitive questions.

- **As** a user
- **I want** each head-to-head answer to say whether the engine chose my brand, chose it only in some cases, or did not choose it
- **So that** AI Choice reflects how engines really answer competitive questions.

## Acceptance Criteria

_12 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-678, User Story 1.5)

**AC1 — Four outcomes**

- Given: a natural competitive answer
- When: it is parsed
- Then: it gets one of four outcomes for the tracked brand: Chosen, Conditional, Not chosen or Overlooked, and the brand or brands the answer picks are stored with it

**AC2 — Chosen**

- Given: an answer that picks the brand with no condition (eg: "the best pick from this set is Timberland" for Timberland)
- When: it is parsed
- Then: the outcome is Chosen

**AC3 — Chosen by lack of evidence**

- Given: an answer that picks the brand because the engine found nothing on the other brands
- When: it is parsed
- Then: the outcome is Chosen

**AC4 — Conditional, brand wins a condition**

- Given: an answer where the brand wins at least one condition (eg: "Choose Dr. Martens if you live somewhere wet, sloppy, and rainy... Choose UGGs if your winter is mostly dry and freezing cold")
- When: it is parsed
- Then: the outcome is Conditional

**AC5 — Conditional, tie or joint winners**

- Given: an answer that calls the brands equal, or names the brand among joint winners
- When: it is parsed
- Then: the outcome is Conditional

**AC6 — Not chosen**

- Given: an answer that picks another brand, a brand outside the question, or does not name the brand
- When: it is parsed
- Then: the outcome is Not chosen

**AC7 — Overlooked**

- Given: a conditional answer where the brand wins no condition
- When: it is parsed
- Then: the outcome is Overlooked

**AC8 — No condition stored**

- Given: a conditional answer
- When: it is parsed
- Then: only the outcome is stored, not the condition each brand wins: the user reads why in the answer

**AC9 — Declined or rejected**

- Given: an answer where the engine declines to pick or rejects the question
- When: it is parsed
- Then: it is not counted, like a refusal (story 1.6)

**AC10 — Negatively framed question**

- Given: a question framed negatively (eg: "Which brand isn't just greenwashing")
- When: it is parsed
- Then: the outcome follows the conclusion of the answer and never the order in which brands are named

**AC11 — One outcome per configured brand**

- Given: a competitive answer
- When: it is parsed
- Then: each configured brand of the question gets its own outcome, so one conditional answer can be Conditional for both brands of a head-to-head

**AC12 — Unbranded analysis**

- Given: an unbranded analysis (no tracked brand)
- When: a competitive answer is parsed
- Then: every brand of the question gets its outcome and the brand or brands the answer picks are stored, so the display can show the winner

## Technical Details

### Scope note

Backend only, depends on STORY-50.2 to 50.4 (GEO-1551, GEO-1552, GEO-1553). This story reads and stores the outcome. AI Choice and every view that reads whether the brand won are STORY-50.7; leaving a not-counted answer out of the metrics is STORY-50.6; the display (AI Choice donut, outcome on engine pills) is GEO-1498. Until GEO-1498, QA checks the stored outcome through the support read.

## Dependencies

- **Blocks:** GEO-1566, GEO-1569, GEO-1570, GEO-1555, GEO-1556
- **Blocked by:** GEO-1551, GEO-1552, GEO-1553
- **relates to:** GEO-1607 (Bug, Done) — [GEO-Enrichment] Natural competitive answer read as "Chosen" next to an "Overlooked" brand: Excel Raw Data shows "Chosen" with no brand
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1554
- External Spec: [50-5-read-the-competitive-outcome-in-four-buckets.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-5-read-the-competitive-outcome-in-four-buckets.md)
