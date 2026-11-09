# GEO-1240: See the prompt pool on the GEO dashboard

**Story ID:** GEO-1240
**Issue Type:** Story
**Title:** STORY-45.11: See the prompt pool on the GEO dashboard
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1240

## User Story

> As a user on the GEO dashboard, I want to see how much of my organisation's prompt pool is used, so that I know before I start a new analysis how much room I have.

## Acceptance Criteria

**AC1 — Pool block**

- Given: the GEO dashboard
- When: it loads
- Then: a pool block shows the kept prompts of all analyses over the pool, such as 138 / 150, with the wizard's ring, and hovering it splits used and free

**AC2 — Exactly at the limit**

- Given: the pool is exactly at the limit
- When: the dashboard loads
- Then: the ring is amber with a short message and New Analysis stays available

**AC3 — Over the limit**

- Given: the pool is over the limit, for example after a downgrade
- When: the dashboard loads
- Then: the ring is red with how many prompts are over, and a new analysis can be started but not launched until the count fits

**AC4 — Prompts column**

- Given: the analyses table
- When: it loads
- Then: a sortable "Prompts" column after Categories shows the pool slots each analysis uses (kept prompts × markets), so the column adds up to the pool block

**AC5 — Counts follow changes**

- Given: an analysis is deleted or edited
- When: I come back to the dashboard
- Then: the counts reflect it

## Technical Details

### Rules (settled — OS-Team, 2026-10-08)

- The pool block sits in the header of the "Reports" table, next to the number of reports, and is visible to every role.
- Without a pool set for the organisation, the ring is grey "— / —" with a message to contact the account manager. If the pool cannot be loaded, the block is hidden and the page still works.
- New Analysis stays available whatever the pool (only readers cannot create, as today); launching is blocked inside the wizard (STORY-45.7, STORY-45.8).
- The "Prompts" column and the "Prompts" stats card show the same numbers as the pool block: one ticked prompt in one market = one slot.
- Sorting works on one column at a time (Brand or Prompts).
- No pool block on the empty dashboard (no analysis yet, or after deleting the last one).
- Every analysis of the organisation is listed, even beyond 100 (today the list stops at the 100 most recent); Show more / Show less keeps working as today.

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames 0.1, 0.1b, 0.1c and 0.1d.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1240
- External Spec: [epic-45/45-11-see-the-prompt-pool-on-the-geo-dashboard.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-11-see-the-prompt-pool-on-the-geo-dashboard.md)
