# GEO-1235: Sort, filter and edit the prompt table

**Story ID:** GEO-1235
**Issue Type:** Story
**Title:** STORY-45.6: Sort, filter and edit the prompt table
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-19
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1235

## User Story

> As a user with many prompts, I want to sort and filter the table by column, so that I can find and fix prompts quickly.

## Acceptance Criteria

**AC1 — Columns**

- Given: Prompts
- When: the table renders
- Then: it shows the columns Prompt, Category, Type, Market and Actions

**AC2 — Category and type on every row**

- Given: the table renders
- When: I look at the type badges
- Then: each prompt shows its category and one of Visibility, Competitive, Reputation or Brand Image

**AC3 — Header menus**

- Given: the Category, Type or Market header
- When: I click its sort trigger
- Then: a menu offers Sort ascending, Sort descending, a checkbox list of values with live counts and Clear filter, and the header then counts the controls applied

**AC4 — No results**

- Given: combined filters match nothing
- When: the table renders
- Then: a no-results card names the filters in conflict with Clear all filters, and launch stays enabled

**AC5 — Empty table**

- Given: the table is empty
- When: it renders
- Then: the filters and the pool tracker stay, and an empty-state card carries its own Add prompt

**AC6 — Pinned tracker and header**

- Given: I scroll
- When: the pool tracker line reaches the top
- Then: it and the table header stay pinned and only the body scrolls

**AC7 — Edit wording only**

- Given: I edit a prompt
- When: I save
- Then: only the wording changes; category and type change only through the row selects

**AC8 — Show prompts**

- Given: the Prompt header
- When: I open its Show prompts menu
- Then: I can show All, Selected only or Unselected only, and the selected count stays in view

## Technical Details

### Rules (settled — OS-Team, 2026-10-08)

- One sort at a time: sorting a column replaces the previous sort. Types sort as Visibility, Reputation, Competitive, Brand Image; markets sort on their label (eg "UK (EN)").
- The counts in a menu follow the other active filters; a value with no prompt stays listed with 0. Brand Image prompts show the category "Overview", which is also a value of the Category menu.
- The number on a header = the values checked on that column, plus 1 if the table is sorted on it. Clear filter clears that column (values and sort); Clear all filters clears everything, Show prompts included.
- "N selected" counts the ticked prompts of the whole analysis, whatever the filters. Filters never change which prompts are ticked or launched.
- With no prompt at all, Review & Launch is disabled.
- Category and type show as selects when I hover a row or reach it with the keyboard. Choosing Brand Image sets the category to Overview; leaving Brand Image asks for a category first. A change that would create a duplicate is refused. The market of a prompt cannot be changed.
- A Competitive prompt that contains [Competitor N] cannot be switched to another type: a message asks to remove the placeholders first.
- Editing a prompt follows the same rules as adding one: "?" added if missing, duplicates refused, 300-character limit when the text is changed.
- A footnote under the table says "Unticked prompts cost nothing and stay on the analysis."

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames 4.9, 4.12 to 4.18, 4.21 and 4.22. The frames show no counts in the menus; AC3 applies. The "Pick category" selects of 4.22 belong to EPIC-035.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1235
- External Spec: [epic-45/45-6-sort-filter-and-edit-the-prompt-table.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-6-sort-filter-and-edit-the-prompt-table.md)
