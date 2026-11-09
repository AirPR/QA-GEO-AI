# GEO-1184: [Target Sources] Sort the cards by the number of prompts that use each source

**Story ID:** GEO-1184
**Issue Type:** Story
**Title:** [Target Sources] Sort the cards by the number of prompts that use each source
**Status:** [BACKLOG] Backlog
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-10-02
**Updated:** 2026-10-02
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1184

## User Story

_No "As a ... I want ... so that" block in the Jira description._

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

### Context

Today the Target Sources cards are sorted by the number of failing articles, then badges, then citations, then domain (TargetSourcesService.java:274 on developer). Nothing on the card tells the user how many prompts actually rely on a source, while it is the best signal of how much a source weighs in the AI answers: a source used in 25 prompts matters more than one used in 2, even with fewer failing articles.

The goal is to let the user sort the cards by the number of prompts answered using each source, and to show that number on the card so the ranking makes sense visually.

### Requirement

- We should add a sort option "Most prompts" on the Target Sources list. The current sort (failing articles) stays the default.
- The sort applies within the current tab (All, Improve visibility, Improve perception) and the current scope and period, the same way the default sort does today (10.6).
- Each card shows the number of prompts that use the source, eg: "Used in 24 prompts".
- The count is the number of distinct prompts whose answers cite the domain in the period, all LLMs and locales together. It is NOT qualifyingAnswerCitations, which counts answers (one prompt gives several answers across LLMs and runs). It must match the count in the "Prompts associated with this source" section of the panel.
- Ties are sorted by failing articles, then domain.

### Design

Needs a design: where the sort control sits next to the tabs, its wording, and how the prompt count shows on the card (in both host shells, standalone and OS native mode), and whether the sort choice is kept when switching tabs. Strings to be added to the strings sheet in FR/ES once the wording is locked.

### Acceptance criteria

- With "Most prompts" selected, the cards are in descending order of the prompt count shown on them.
- The count on a card equals the number of prompts listed in its panel.
- The default sort and the export are unchanged when the option is not selected.

## Technical Details

_No dedicated Technical Details / Implementation Notes section in the Jira description (see the repository spec link below if present)._

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** None mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] Localisation (en-US, en-GB, fr-FR, es-ES) checked where UI copy changes

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-152
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1184
