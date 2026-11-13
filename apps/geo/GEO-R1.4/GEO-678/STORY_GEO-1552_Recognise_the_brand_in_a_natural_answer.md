# GEO-1552: STORY-50.3: Recognise the brand in a natural answer

**Story ID:** GEO-1552
**Issue Type:** Story
**Title:** STORY-50.3: Recognise the brand in a natural answer
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1552

## User Story

> As a user, I want my brand to be recognised in a natural answer whenever the engine names it or one of its products, and only then, so that my visibility reflects what a real user reads.

- **As** a user
- **I want** my brand to be recognised in a natural answer whenever the engine names it or one of its products, and only then
- **So that** my visibility reflects what a real user reads.

## Acceptance Criteria

_9 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-678, User Story 1.3)

**AC1 — Brand or product named**

- Given: a natural answer
- When: it names the brand or one of its products (eg: "Brooks Adrenaline GTS" for Brooks)
- Then: the brand counts as named, using the same brand family as the Actions Center (the brand, its spelling variants, sub-brands, products and regional names)

**AC2 — Former name after a rebrand**

- Given: a brand known under a former name since a rebrand
- When: the answer uses only that name (eg: "BoursoBank" for Boursorama)
- Then: the brand family groups it under the brand and the brand counts as named

**AC3 — Source titles, links and domains do not count**

- Given: a brand that appears only in a source title, a link or a cited domain
- When: the answer text never names it
- Then: the brand counts as not named

**AC4 — Whole answer read**

- Given: a natural answer
- When: it is parsed
- Then: the whole answer text is read, including a closing question to the user, so a brand named in that question counts like any other mention

**AC5 — Homonyms**

- Given: a name shared by several companies (eg: "On", "Nickel", "Boots")
- When: it appears
- Then: the analysis decides from the context (the category, the brand website) whether it is the brand

**AC6 — Tone does not matter for visibility**

- Given: a visibility answer that names the brand with a negative or mixed tone
- When: it is parsed
- Then: the brand counts as named, and no tone is extracted or shown for visibility answers, as today

**AC7 — Entities that are not brands**

- Given: a natural answer
- When: it names retailers as places to buy (eg: "available at REI, Zappos or Amazon"), review sites, media, places, generic product types or brands of another category
- Then: they are kept out of the ranking and of Share of Voice

**AC8 — No top-10 cap**

- Given: an answer that names more than 10 brands
- When: it is parsed
- Then: every brand counts as named for Visibility and Share of Voice (the top-10 cap of GEO-1255 goes), and Average Position keeps ranks 1 to 10

**AC9 — Tracked brand and competitors are always brands**

- Given: the tracked brand or a configured competitor
- When: the answer names it
- Then: it always counts as a brand, whatever its type (a retailer or a review site can be a client)

## Technical Details

### Scope note

Backend only, depends on STORY-50.2 (GEO-1551). Rank by first mention and product rows: STORY-50.4. Share of Voice formula: STORY-50.7. Display: GEO-1498. Engines not switched to natural answers keep today's rules, including the top-10 cap. AC2, AC5 and AC8 depend on what an engine writes on the day: they are checked by the technical ACs, not by QA.

## Dependencies

- **Blocks:** GEO-1566, GEO-1553, GEO-1554, GEO-1555, GEO-1556
- **Blocked by:** GEO-1551
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1552
- External Spec: [50-3-recognise-the-brand-in-a-natural-answer.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-3-recognise-the-brand-in-a-natural-answer.md)
