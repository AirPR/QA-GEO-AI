# GEO-1229: Share one prompt pool across all analyses

**Story ID:** GEO-1229
**Issue Type:** Story
**Title:** STORY-45.1: Share one prompt pool across all analyses
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1229

## User Story

> As an agency user, I want to spend one prompt quota across any brand, category, country or language, so that each additional client becomes cheaper to onboard instead of costing a new fixed unit.

## Acceptance Criteria

**AC1 — One pool, no structural cap**

- Given: a pool of N prompts
- When: I keep prompts in any analysis
- Then: the balance decreases and no per-brand, per-category, per-country or per-language cap blocks me

**AC2 — One slot per market, unticked costs nothing**

- Given: a kept prompt
- When: it runs in two markets
- Then: it consumes two slots; an unticked prompt consumes none

**AC3 — Deleting an analysis frees its slots**

- Given: an analysis is deleted
- When: the change is saved
- Then: its slots return to the pool immediately

**AC4 — Downgrade never touches what exists**

- Given: the pool is reduced by a downgrade or a non-renewal
- When: it applies
- Then: existing prompts and running analyses are untouched and only adding prompts is blocked until the count fits

**AC5 — Filter by country, languages roll up**

- Given: an analysis with several country and language pairs
- When: I filter it
- Then: I filter by country and its languages roll up together

## Technical Details

### Rules (settled — OS-Team, 2026-10-08)

- This story replaces every previous quota limit: markets, categories and prompts per type are no longer capped. Users, lite analyses, collection frequency and allowed AI engines stay as today.
- An organisation whose pool is not set yet cannot add prompts; it sees a grey pool ring with a message to contact the account manager (wizard, Manage Scope, dashboard). Every organisation's pool is set before the release is enabled.
- Editing, deleting, removing a market or a category, and deleting an analysis are never blocked by the pool, even above the limit.
- The dashboard market filter lists one entry per country; a country with two languages (eg United States - English and Spanish) is one entry that selects both.
- The pool tracker in the wizard (STORY-45.7), on the dashboard (STORY-45.11) and the back-office field (STORY-45.12) are separate stories.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1002
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1229
- External Spec: [epic-45/45-1-share-one-prompt-pool-across-all-analyses.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-1-share-one-prompt-pool-across-all-analyses.md)
