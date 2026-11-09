# GEO-1233: Review the suggested prompts

**Story ID:** GEO-1233
**Issue Type:** Story
**Title:** STORY-45.4: Review the suggested prompts
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1233

## User Story

> As a user on the Prompts step, I want a full set of suggested prompts already ticked, so that I start from a complete analysis and trim it to fit my pool.

## Acceptance Criteria

**AC1 — 10 per type per category per market, all ticked**

- Given: Prompts loads
- When: suggestions are generated
- Then: each category in each market gets 10 prompts per question type, all ticked, each carrying the category and type that produced it

**AC2 — Competitors resolved in the background** → **delivered by STORY-45.13 (GEO-1251)** — resolved when the analysis runs, not during setup (PM comment, 2026-10-09). Kept here verbatim until the epic is reworded; nothing to build or test for it in this story.

- Given: no competitor is configured
- When: the analysis runs
- Then: a background call resolves the top competitors, invisible to the user, since the wizard has no competitor step

**AC3 — 10 Brand Image prompts per market**

- Given: suggestions are generated
- When: Prompts loads
- Then: each market also gets 10 Brand Image prompts, so 2 markets with 3 categories give 2 x (10 + 3 x 30) = 200 prompts

**AC4 — Over-pool state on arrival**

- Given: the suggestions exceed the free pool
- When: Prompts opens
- Then: it is in the over-pool state and I untick prompts until the count fits

**AC5 — Re-ticking a muted row**

- Given: a muted row
- When: I tick it again and the pool has room
- Then: it is kept again without being regenerated

**AC6 — Trash deletes, untick mutes**

- Given: a kept or muted prompt
- When: I click the trash icon
- Then: it is deleted, which is not the same as unticking

**AC7 — Coming back from Categories keeps my work**

- Given: I go back to Categories and add a category
- When: I return to Prompts
- Then: my ticked and unticked states, my edits and my custom prompts are kept, and only the new category gets its suggestions, 10 per type per market, all ticked

## Technical Details

### Rules (settled — OS-Team, 2026-10-08)

- All prompts of all markets are in one table (no market tabs, no type tabs); unticked rows are greyed.
- Nothing is unticked automatically when the suggestions exceed the pool; Review & Launch stays disabled until the count fits. The pool ring and its messages are delivered in STORY-45.7.
- Unticked prompts are saved on the analysis, do not use pool slots, are not sent to the AI engines and do not show as live prompts in Manage Scope.
- The per-category Reset button is removed.
- After the trash icon, an Undo toast stays for 5 seconds, as today.
- To go to Review, each category still needs at least one prompt (ticked or not) in each market, as today; the "dropped" warnings come with STORY-45.8.
- Add prompt (STORY-45.5), sorting and filters (STORY-45.6), the pool tracker (STORY-45.7) and the background competitor resolution (STORY-45.13) are separate stories.

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames 4.1 and 4.8 (4.5 for the over-pool state).

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1233
- External Spec: [epic-45/45-4-review-the-suggested-prompts.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-4-review-the-suggested-prompts.md)
