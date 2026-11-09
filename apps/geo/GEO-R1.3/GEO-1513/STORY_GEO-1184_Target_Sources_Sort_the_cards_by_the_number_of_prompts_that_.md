# GEO-1184: [Target Sources] Sort the cards by the number of prompts that use each source

**Story ID:** GEO-1184
**Issue Type:** Story
**Title:** [Target Sources] Sort the cards by the number of prompts that use each source
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1513
**Created:** 2026-10-02
**Updated:** 2026-10-22
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1184

**History:** moved from epic GEO-152 (GEO-R1.2) to GEO-1513 (GEO-R1.3). R1.2 local copy kept unchanged: `apps/geo/GEO-R1.2/GEO-152/STORY_GEO-1184_Target_Sources_Sort_the_cards_by_the_number_of_prompts_that_.md` (status Backlog, updated 2026-10-06). AC differences vs the R1.2 copy: **no AC change** (Jira description identical, checked 2026-10-23; only the status and the parent epic changed).

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

- Current sort: failing articles, then badges, then citations, then domain (`TargetSourcesService.java:274` on developer).
- The count is distinct prompts, NOT `qualifyingAnswerCitations` (answers).
- Design reference: Design Task **GEO-1208** (Done) — Figma page "GEO-1208 - Sort by number of prompts": https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17348-160625

## Comments — PO / dev / design decisions

_Summary of the Jira comments of GEO-1184 and of its design task GEO-1208 (read 2026-10-23). The ACs above are the reference; these points are not ACs._

| Date | Author | Ticket | Decision / information |
|------|--------|--------|------------------------|
| 2026-10-22 | Quentin Reant (PO) | GEO-1184 | Design done, ready for dev. |
| 2026-10-20 | Moulay AbdelJalal Aitelharch (design) | GEO-1208 | Design proposal submitted to the PO, see below. |

**Design decisions proposed in GEO-1208 (submitted "please confirm" to the PO):**
1. Sort control placement: in the page header, left of the Card view / List view switch ("display options" group), not next to the tabs (width constraint at 1280). Same position in OS native mode.
2. Wording: values "Failing articles" (default) and "Most prompts"; menu descriptions "Articles missing or negative about your brand" and "Prompts whose answers cite this source"; tooltip / accessible name "Sort by".
3. Subtitle: the sentence "sorted by the number of articles where your brand is missing or negatively represented" removed (revert possible if the PO prefers zero change on the default screen).
4. Card count: "Used in 24 prompts" (singular "Used in 1 prompt") as a secondary line under the failing-article lines, same place in both sorts.
5. Panel: the "All" tab of "Prompts associated with this source" shows the total, e.g. "All (24)".
6. List view: a "Prompts" column after "Articles" with a descending indicator while Most prompts is active; header-click sorting not part of this ticket.
7. Persistence: the choice is kept when switching tabs, views, filters and while paging with Show more; it resets to the default on the next visit. Ranks restart at 1 in the new order and in each tab.

**Open questions raised to the PO in GEO-1208 (no written answer found in the comments; the PO only posted "design done ready for dev" on GEO-1184 on 2026-10-22):**
1. Citations line: does the card still show "cited N× in gap answers"? If yes, the prompt line goes above it.
2. Filters: does the count follow the AI engine and market filters (design assumption) or is it always the union?
3. Panel total: a prompt cited by both engines counts once, so All can be smaller than the sum of the engine tabs.
4. Export: assumed never to follow the sort, even with Most prompts selected.
5. Wording lock: new strings (Sort by, Failing articles, Most prompts, the two descriptions, Used in {n} prompts, Used in 1 prompt, Prompts column, shortened subtitle) to be added to the Target Sources strings sheet with FR and ES: https://docs.google.com/spreadsheets/d/1Nab90jZNdxgAT5pouDk2QxLM5-6skrDF6p2A4w9o0z4/edit

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** GEO-1208 (design, Done)
- **Relates to:** GEO-1120 (default sort, 10.6), GEO-1208

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] Localisation (en-US, en-GB, fr-FR, es-ES) checked where UI copy changes

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1513
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1184
- Design Task: https://onclusive.atlassian.net/browse/GEO-1208
- Figma: https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17348-160625
- Previous epic (R1.2): https://onclusive.atlassian.net/browse/GEO-152
