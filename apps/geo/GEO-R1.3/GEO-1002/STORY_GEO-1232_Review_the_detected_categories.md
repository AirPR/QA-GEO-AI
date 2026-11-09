# GEO-1232: Review the detected categories

**Story ID:** GEO-1232
**Issue Type:** Story
**Title:** STORY-45.3: Review the detected categories
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-19
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1232

## User Story

> As a user on Categories, I want to keep, add or remove categories with their translations, so that the analysis covers the areas I care about.

## Acceptance Criteria

**AC1 — Detected categories with badge and translations; empty state**

- Given: Categories loads
- When: categories are detected from the brand
- Then: each shows an AI-generated badge and its translation per market language; with none, an empty state invites me to add one

**AC2 — Add category modal with editable translations**

- Given: I click Add category
- When: the modal opens
- Then: I enter a name and review an editable translation per market

**AC3 — Removing a category with prompts states the impact**

- Given: I remove a category that holds prompts
- When: I click remove
- Then: a confirmation states how many prompts across my markets are deleted with it, kept suggestions included

**AC4 — No limit**

- Given: I add or remove categories
- When: I do it
- Then: no limit applies

## Technical Details

### Rules (settled — OS-Team, 2026-10-08)

- Categories are a flat list: each row shows its translations without opening it, a pencil to edit and a cross to remove.
- Removing a category always asks for confirmation; the number of prompts deleted with it is stated when there is at least one, and those prompts are deleted at once.
- The last category can be removed: the empty state shows and Generate Prompts is disabled, and the stepper does not let me jump to Prompts or Review.
- In the Add category modal, translations are filled automatically when I confirm the name, and I can edit each one before adding. If translation fails, each market shows the name I typed with a notice to check it. With a single market, the name is used as is.
- The pencil opens the same modal as Edit Category. If I change the name, only the translations I did not edit are translated again.
- A name already used by another category of the analysis (whatever the letter case) shows an error and cannot be added.
- "One with no prompts is dropped at Review" (info banner) is delivered in STORY-45.8, not here.

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames 3.1, 3.2, 3.3 and 3.5. Frame 3.3 does not show the prompt count; AC3 applies.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1232
- External Spec: [epic-45/45-3-review-the-detected-categories.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-3-review-the-detected-categories.md)
