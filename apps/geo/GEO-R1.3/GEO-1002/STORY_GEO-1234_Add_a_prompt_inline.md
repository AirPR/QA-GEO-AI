# GEO-1234: Add a prompt inline

**Story ID:** GEO-1234
**Issue Type:** Story
**Title:** STORY-45.5: Add a prompt inline
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1234

## User Story

> As a user, I want to add my own prompt directly in the table, so that I can cover a question the generator did not produce without leaving the step.

## Acceptance Criteria

**AC1 — Editable row at the top**

- Given: Prompts
- When: I click Add prompt
- Then: an editable row opens at the top with a text input, category, type and market selects, and confirm and cancel

**AC2 — Selects limited to the analysis**

- Given: the selects
- When: I open them
- Then: the category select lists only the analysis categories, with no Add category action (a category is added on Categories through Back), and the market select lists only the analysis markets, prefilled from context

**AC3 — No inference, confirm gated**

- Given: I type a prompt
- When: I confirm
- Then: nothing suggests or infers its category or type, and confirm stays disabled until both are picked

**AC4 — Added row: kept, highlighted, CUSTOM**

- Given: I confirm
- When: the row is added
- Then: it is kept, highlighted, and marked with a CUSTOM badge

## Technical Details

### Rules (settled — OS-Team, 2026-10-08, updated 2026-10-09)

- For a Brand Image prompt, the category select is cleared and disabled, showing Overview: Brand Image prompts belong to a market, not to a category.
- The market is prefilled with the filtered market when the table is filtered on exactly one market, otherwise with the first market of the analysis. Category and type are never prefilled.
- Only one new row can be open at a time: clicking Add prompt again goes back to it. Cancel leaves the table unchanged.
- A "?" is added at the end if missing, as when editing a prompt.
- After confirm, a toast says "Prompt added. It uses one pool slot."; the row stays highlighted until the next action on the table, stays at the top until the next sort, and stays visible even if it does not match the active filters until the next filter change.
- A prompt identical to an existing one for the same market, category and type (ignoring letter case, extra spaces and the final "?"), ticked or not, shows an error and cannot be added. The same text in another market is accepted.
- A typed prompt is limited to 300 characters (confirmed by the PM on 2026-10-09); a counter shows from 250 characters.
- A custom prompt stays when I go back to Categories, add or rename a category and come back.
- Add prompt is disabled only while prompts are being generated. It stays available even above the pool, so I can add all my prompts and then decide what to untick; only Review & Launch is blocked over the pool (STORY-45.7, updated 2026-10-09).

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames 4.2 and 4b.1 to 4b.6.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1234
- External Spec: [epic-45/45-5-add-a-prompt-inline.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-5-add-a-prompt-inline.md)
