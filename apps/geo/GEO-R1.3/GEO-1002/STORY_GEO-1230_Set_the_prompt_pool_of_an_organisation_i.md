# GEO-1230: Set the prompt pool of an organisation in the back office

**Story ID:** GEO-1230
**Issue Type:** Story
**Title:** STORY-45.12: Set the prompt pool of an organisation in the back office
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-19
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1230

## User Story

> As an Onclusive admin, I want to set one prompt pool per organisation and see each organisation's usage in the list, so that the quota we sell is the quota the product enforces.

## Acceptance Criteria

**AC1 — One field replaces the old quotas**

- Given: I create or edit an organisation
- When: the quotas render
- Then: one "Prompt pool" field replaces the four per-type fields and the "Countries" and "Categories max" fields, while the user quota, collection frequency (Daily or One time) and allowed AI engines stay as today

**AC2 — Whole number ≥ 1, with usage hint**

- Given: the Prompt pool field
- When: I enter a value
- Then: it accepts a whole number of at least 1, with a hint such as "138 of 150 prompts in use."

**AC3 — Lowering below usage warns, never blocks**

- Given: I lower the pool below usage
- When: I save
- Then: a warning states that existing prompts and running analyses are untouched and adding prompts stays blocked until the count fits

**AC4 — Prompts column in the organisations list**

- Given: the organisations list
- When: it loads
- Then: a sortable "Prompts" column next to User quota shows prompts in use over the pool, such as 138 / 150, in red when over, and the Frequency column and filter stay

## Technical Details

### Rules (settled — OS-Team, 2026-10-08)

- The Prompt pool is required when creating an organisation.
- An organisation whose pool is not set yet (existing organisations right after STORY-45.1 ships, until an operator fills it) shows an empty Prompt pool field and "—" in the Prompts column, with no usage hint. Once a value is saved, it cannot be cleared back to empty.
- The Prompts value is red only when the prompts in use are above the pool (150 / 150 is not red).
- The Frequency, US and Created columns stay in the list, even though the design frame BO.2 does not show them (AC4 wins).
- Depends on STORY-45.1 (GEO-1229, Share one prompt pool across all analyses).

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames BO.1, BO.1b and BO.2.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** GEO-1229

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1002
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1230
- External Spec: [epic-45/45-12-set-the-prompt-pool-of-an-organisation-in-the-back-office.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-12-set-the-prompt-pool-of-an-organisation-in-the-back-office.md)
