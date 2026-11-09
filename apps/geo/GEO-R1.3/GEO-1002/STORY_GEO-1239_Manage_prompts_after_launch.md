# GEO-1239: Manage prompts after launch

**Story ID:** GEO-1239
**Issue Type:** Story
**Title:** STORY-45.10: Manage prompts after launch
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-20
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1239

## User Story

> As a user of a running analysis, I want to manage its prompts in Manage Scope with the same rules as the wizard, so that I can change coverage without creating a new analysis.

## Acceptance Criteria

**AC1 — Same table, filters and tracker**

- Given: Manage Scope
- When: I open Prompts
- Then: I see the wizard's table, filters and pool tracker

**AC2 — Suggested Prompts**

- Given: retained unticked suggestions
- When: I open Prompts
- Then: they show under Suggested Prompts, and ticking one keeps it from the next run if the pool has room

**AC3 — Edit wording from the next run**

- Given: I edit a prompt
- When: I save
- Then: only the wording changes, from the next run

**AC4 — Delete frees the slot, keeps the history**

- Given: I delete a prompt
- When: I confirm
- Then: its slot returns to the pool and its past data points stay in the history

**AC5 — Last prompt of a group can be deleted**

- Given: the last prompt of a question type, category or market
- When: I delete it
- Then: it is allowed (the minimum of 1 prompt per group from GEO-581 goes away), and a warning names the metrics the analysis will stop producing

**AC6 — Version history**

- Given: prompts changed
- When: I open the version history
- Then: changes are grouped by date with their count and the original and edited wording

**AC7 — Category or type change**

- Given: I change a prompt's category or type
- When: it is saved
- Then: a category change keeps its history where it was collected, and a type change ends the old series and starts a new one

**AC8 — Add a category or a market**

- Given: I add a category or a market
- When: it is added
- Then: fresh suggestions for it join the retained set, with the pool in view

**AC9 — No free slot in the pool** *(Updated 2026-10-20)*

- Given: the pool has no free slot, exactly full or over
- When: I open Prompts in Manage Scope
- Then: Add prompt, Add country and Add category are disabled and suggestions cannot be ticked, until deleting or unticking prompts frees a slot

## Technical Details

### Rules (settled — OS-Team, 2026-10-08)

- The Prompts section uses the wizard's table (STORY-45.4 to STORY-45.6) and pool ring (STORY-45.7); the per-country and per-type tabs and the per-group Reset button are removed.
- Unticked suggestions are listed at the end of the table, greyed. Ticking one, or several at once, needs room in the pool; unticking frees the slot. Neither is written in the version history.
- Deleting asks for confirmation (no Undo here). The last prompt of a market × category × type group can be deleted or unticked; the warning names what stops: the metrics of that type, the category or market results, the competitors of the Competitive prompts when the last Visibility prompt goes, or the whole analysis.
- An analysis with no prompt left to collect does not stay "in progress": the next run is simply skipped.
- An analysis that keeps only Competitive prompts is not skipped: it runs and completes, with its competitors found in the background (STORY-45.13, GEO-1251, shipped in the same release). *(Updated 2026-10-09)*
- A category or type change is shown in the history as the prompt deleted from the old one and added to the new one; past results stay where they were collected. Choosing Brand Image sets the category to Overview; a change that creates a duplicate is refused; a Competitive prompt with [Competitor N] cannot change type.
- Add market and Add category show their suggestions all ticked with the pool in view; what I untick joins Suggested Prompts. They cannot be saved with no ticked prompt, nor over the pool. Their prompts now appear as "Added" in the history.
- With no free slot in the pool (exactly full, over or not configured), Add prompt, Add country and Add category are disabled up front; unticking, editing and deleting stay possible. *(Updated 2026-10-20 — PM decision, GEO-1002 comment 865136)*
- Prompts added by a user show a CUSTOM badge, in the wizard and in Manage Scope.
- Known limitation (since GEO-581): a Competitive prompt changed while a collection is running may already apply to that run.

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", Manage Scope frames MS.1 to MS.8. The "Pick category" rows of MS.4 belong to EPIC-035.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1239
- External Spec: [epic-45/45-10-manage-prompts-after-launch.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-10-manage-prompts-after-launch.md)
