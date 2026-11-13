# GEO-1553: STORY-50.4: Rank brands in a natural answer

**Story ID:** GEO-1553
**Issue Type:** Story
**Title:** STORY-50.4: Rank brands in a natural answer
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1553

## User Story

> As a user, I want the ranking of a natural answer to follow how the answer presents the brands, so that the position I see is the one a real user perceives.

- **As** a user
- **I want** the ranking of a natural answer to follow how the answer presents the brands
- **So that** the position I see is the one a real user perceives.

## Acceptance Criteria

_4 functional ACs + 6 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-678, User Story 1.4)

**AC1 — Rank by first mention**

- Given: a natural answer
- When: the brands are ranked
- Then: the rank of each brand family is the order of its first mention in the answer, intro sentence included, so the first brand named is number one

**AC2 — Lists, sections and tables do not change the ranking**

- Given: an answer with list numbers, "best for" sections or a table
- When: the brands are ranked
- Then: the answer still gets one ranking by order of first mention, and the list numbers or section labels do not change it

**AC3 — Products fold into their brand**

- Given: an answer that names several products of the same brand
- When: the brands are ranked
- Then: they fold into one entry for the brand at the position of its first mention, and each product keeps its own row in Brand Rankings with the position of its own first mention

**AC4 — No brands named**

- Given: an answer that names no brand at all (eg: neighbourhoods only for a hotel question)
- When: it is parsed
- Then: the brand counts as not named, the answer is left out of the Share of Voice denominator, it stays out of the question status as today (GEO-835), and the question panel shows the answer with the verdict "No brands named" and no ranking rows (display in GEO-1498); "Unranked" keeps its current meaning (no engine names the brand)

### Technical Acceptance Criteria (dev context, not read by QA)

**TAC1 — Intro counts (AC1)**

- Given: a committed `api_natural` answer whose label lists an intro mention, and its recorded reader reply
- When: the reading is built
- Then: the family named in the intro has the rank of that mention, and `brands[].rank` matches `brands_in_order` of the label.

**TAC2 — Segments and list numbers (AC2)**

- Given: `api_natural:perplexity:V02` (target leads a "best for" segment, not first overall) and a built answer whose numbered list starts at "3." with a brand named earlier in the intro
- When: the reading is built
- Then: the ranks follow the order of first mention; the segment lead and the list numbers change nothing.

**TAC3 — Products (AC3)**

- Given: an answer "Brooks Ghost …, HOKA Clifton …, Brooks Glycerin …", families Brooks and HOKA
- When: the columns are filled
- Then: Brooks has rank 1 and HOKA rank 2; there is one entry per product, Ghost 1, Clifton 2, Glycerin 2; the smallest rank of Brooks' entries is 1; with "Brooks Ghost …, Brooks Glycerin …, HOKA …" HOKA has rank 2; `BrandRankingsService` returns Brooks with two product rows.

**TAC4 — No brands (AC4)**

- Given: `api_natural:gemini:V04` (neighbourhoods only) and its recorded reply
- When: the reading is built and the question status is computed
- Then: `no_brands = true`, `is_mentioned = false`, `total_entities = 0`; Visibility counts it as not named; the question status ignores that engine (GEO-835 unchanged).

**TAC5 — Structured rows unchanged**

- Given: a snapshot mixing natural and structured rows
- When: it is enriched
- Then: structured rows keep `no_brands = NULL` and today's entries; existing ranking tests stay green unchanged.

**TAC6 — Comparison**

- Given: two reports of two organisations with 3 snapshots each and known responses
- When: the comparison endpoint is called by a SUPER_ADMIN
- Then: per engine and metric it returns the values per run, the spread of each method, the gap of the means and the stability flag of each method (none on Average Position); a method whose spread is 6 points on Visibility is flagged, a gap of 15 points between methods is not; an ADMIN or any other role gets 403; a report id that does not exist gets 404.

## Technical Details

### Scope note

Backend only, depends on STORY-50.2 (GEO-1551) and STORY-50.3 (GEO-1552). Leaving a no-brand answer out of the Share of Voice denominator is done with the new formula in STORY-50.7; the "No brands named" verdict and the ranking rows of the question panel are in GEO-1498. The 3-run comparison of the old and new methods (5-point tolerance, reported, not a gate) is a report for the PM, run once STORY-50.5 to 50.7 are on staging; it is not a QA check.

## Dependencies

- **Blocks:** GEO-1566, GEO-1569, GEO-1554, GEO-1555, GEO-1556
- **Blocked by:** GEO-1551, GEO-1552
- **relates to:** GEO-1594 (Bug, Ready for QA) — [GEO-Category] Prompt detail ranking lists the same brand several times instead of folding products into their brand family
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1553
- External Spec: [epic-50/50-4-rank-brands-in-a-natural-answer.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-4-rank-brands-in-a-natural-answer.md)
