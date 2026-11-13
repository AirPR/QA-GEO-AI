# GEO-1567: STORY-53.4: Resolve inline citations to their sources

**Story ID:** GEO-1567
**Issue Type:** Story
**Title:** STORY-53.4: Resolve inline citations to their sources
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1567

## User Story

> As a GEO user, I want to see which source backs each claim of the answer without leaving the text, so that I can judge the answer quickly.

- **As** a GEO user
- **I want** to see which source backs each claim of the answer without leaving the text
- **So that** I can judge the answer quickly.

## Acceptance Criteria

_9 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, User Story 1.4)

- Given an answer with citation markers [n], When it renders, Then each marker uses one numbering shared with the Sources card of the panel
- Given an engine that numbers its citations out of order or skips numbers (eg: [1] [4] [2] [5]), When the answer renders, Then the sources are renumbered 1 to n in the order they are first cited (here [1] [2] [3] [4]), every marker takes the number of its source, and the Sources card and the Excel export use the same numbers
- Given a citation marker, When I hover or click it, Then a mini card shows the source title, the domain and "Source {n} of {total}", and the matching row in the Sources card is highlighted
- Given two markers that point to the same page, When the answer renders, Then both markers show the same number and the page shows once in the Sources card, with that one number
- Given the numbering, the two numbers per row and the opening of the full list on a source, When they are built, Then they apply to the Sources card of the question panel only, and the other surfaces that use the Sources card (Brand Image panel, concept detail, citation details) stay as today
- Given the Sources card, When it renders, Then it lists the sources the engine used for this answer, the sources cited in the text first with their numbers, then the others without a number
- Given a marker that points to a source outside the visible rows of the Sources card, When I click it, Then the full list opens on that source and highlights it
- Given the answer header, When it shows "{n} citations", Then the count matches the numbered sources in the Sources card
- Given the Sources card, When it shows "All sources {n}", Then the count includes every source the engine used for this answer, cited in the text or not

## Technical Details

### Scope note

Display only, depends on STORY-50.2 (GEO-1551, link between each citation marker and its source). The same numbering is used by the Excel export (STORY-53.6). Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").

---

### Implementation summary (review, 2026-11-04)

Backend: `AnswerComposer` second overload (citation part) — validates and groups citation ranges (`UrlNormalizer.canonicalize`), renumbers 1..n in order of first citation, unions with stored `response_sources`, filters excluded domains (shared matcher with `ResponseSourceExtractor` via `DomainNormalizer.parseExcludedCsv`), shifts carried mentions, keeps a non-domain link's label as text with `[n]` appended right after it. Runs only when a `FULL` row's `reader_version` is set and `sourcesState = OK`; otherwise the 53.1 no-citation overload is used unchanged. `AnswerDto`/`SourceDto` gained additive `citations`/`citationCount`/`number` fields; new `CitationDto`.

Frontend: `remarkAnswerDecorations.ts` (remark plugin, hand-rolled mdast walker — no new dependency), `CitationMarker` (controlled `Tooltip` mini card, hover/focus/click/Escape per AC3/AC7), `CitationContext` (shared with the sibling `SourcesSection`, reset on engine switch), numbered opt-in mode on `SourcesSection`/`SourcesModal`/`SourceItem` (chip, dash for uncited, divider before uncited rows, scroll-to-row). i18n in all 4 locales (French/Spanish at the spec's own proposed texts, PM confirmation pending).

Tests: backend `AnswerComposerTest` (16, TAC1-TAC7 + T-E) + 2 new `QuestionDetailServiceTest` cases; frontend `remarkAnswerDecorations.test.ts` (6, incl. TAC13 and T-B), `CitationMarker.test.tsx` (6, TAC10/TAC11), `Sources.test.tsx` (+7, incl. TAC12), `AnswerMarkdown.test.tsx` (+2). Full regression: backend 3621/3621; frontend 3030/3032 (2 confirmed pre-existing unrelated flaky tests: `ReportListView` TAC5, `AddCategoryDialog` — both pass in isolation, neither touched by this branch); `pnpm build` green.

Open items flagged, implemented at the spec's own proposed defaults (not yet confirmed): P1 (FR/ES copy), P2 (AC5 "two numbers per row", non-blocking), D1-D4 (design). Not done this session: TAC14 (staging p95 timing) and the browser check on staging in both shells with real citations.

## Dependencies

- **Blocks:** GEO-1569, GEO-1566
- **Blocked by:** GEO-1551, GEO-1564, GEO-1572, GEO-1555
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1567
- External Spec: [53-4-resolve-inline-citations-to-their-sources.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-4-resolve-inline-citations-to-their-sources.md)
