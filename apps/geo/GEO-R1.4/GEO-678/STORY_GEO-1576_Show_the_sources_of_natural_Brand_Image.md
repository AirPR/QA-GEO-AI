# GEO-1576: STORY-50.15 Show the sources of natural Brand Image answers

**Story ID:** GEO-1576
**Issue Type:** Story
**Title:** STORY-50.15 Show the sources of natural Brand Image answers
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-11-03
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1576

## User Story

> As a user, I want the Corporate Reputation cards of an engine that answers naturally to show the sources it used, and those sources to count in Cited sources, so that I see where each card comes from, as for engines that answer in the structured way.

- **As** a user
- **I want** the Corporate Reputation cards of an engine that answers naturally to show the sources it used, and those sources to count in Cited sources
- **So that** I see where each card comes from, as for engines that answer in the structured way.

_As written in Jira:_

**As** a user,
**I want** the Corporate Reputation cards of an engine that answers naturally to show the sources it used, and those sources to count in Cited sources,
**so that** I see where each card comes from, as for engines that answer in the structured way.

Follow-up of story 50.14b (GEO-1557, question Q2), asked by the PM on GEO-1557 (comment 871807, 2026-11-03): « Let's show the sources used please [...] These sources should also count in Cited sources. » Scope settled by the PM on this ticket (comment 872446, 2026-11-04): « let's make the brand images sources count in cited sources and target sources please. No reextract for history ».

## Acceptance Criteria

_4 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional ACs

**AC1 — Sources on the cards**

- Given: a natural Brand Image answer that fills one or more Corporate Reputation cards (Brand Image, Employer Brand, ESG / Sustainability, Leadership)
- When: the user opens the drill-in of one of these cards
- Then: the card shows the sources the engine used for that answer, as for an engine that answers in the structured way

**AC2 — No source on an empty card**

- Given: a natural Brand Image answer that does not fill a card
- When: the user opens that card
- Then: the answer adds no source to it ("No data available" shows no source, as today)

**AC3 — Brand Image sources count in Cited sources and Target Sources** _(PM answer 2026-11-04, comment 872446)_

- Given: Brand Image answers with search sources, from any engine (natural or structured)
- When: the user reads Cited sources on the Overview and the Target Sources list
- Then: their sources count, as those of the Visibility, Competitive and Perception answers
- And: a category page (Cited sources, Target Sources filtered on a category) does not count them, as Brand Image answers belong to no category (same rule as the cited-domain count Target Sources already shows)
- And: snapshots read before this story keep no source for their natural Brand Image answers (no re-extraction)

**AC4 — Structured Brand Image answers read like natural ones**

- Given: an engine that answers in the structured way
- When: the cards, Cited sources and Target Sources are read
- Then: the cards are unchanged; its Brand Image sources now count in Cited sources and Target Sources too (AC3), including on its past snapshots (sources already stored)

### Rules (for QA)

Staging, one engine switched to natural answers, an analysis with Brand Image prompts: each card filled by that engine shows the sources of its answers in the drill-in, a card it does not fill shows none; Cited sources on the Overview and the Target Sources list (no category filter) now also count the sources of the Brand Image answers, for every engine, natural or structured; a category page does not count them.

## Technical Details

_No technical details in the Jira description._

## Dependencies

- **Blocks:** GEO-1569
- **Blocked by:** none in Jira links

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1576
- External Spec: [docs/implementation-artifacts/epics/epic-50/50-15-show-the-sources-of-natural-brand-image-answers.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-15-show-the-sources-of-natural-brand-image-answers.md)
