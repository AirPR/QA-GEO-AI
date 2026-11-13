# GEO-1564: STORY-53.1: Read the full answer in the question panel

**Story ID:** GEO-1564
**Issue Type:** Story
**Title:** STORY-53.1: Read the full answer in the question panel
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1564

## User Story

> As a GEO user, I want to read the full answer an engine gave to a question, so that I see exactly what a real user would get.

- **As** a GEO user
- **I want** to read the full answer an engine gave to a question
- **So that** I see exactly what a real user would get.

## Acceptance Criteria

_14 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, User Story 1.1)

- Given an answer longer than about 8 lines, When I open the question panel, Then the answer shows its first 8 lines behind a fade with a "Show full answer" link
- Given an answer shorter than the clamp, When I open the panel, Then it shows in full with no expand control
- Given a clamped answer, When I click "Show full answer", Then it expands in place and the panel scrolls internally, the panel width does not change
- Given an expanded answer, When I click "Show less" at the bottom, Then the answer collapses and the panel scrolls back to the top of the answer card
- Given an answer that contains headings, bold text, lists, tables, long URLs or code blocks, When it renders, Then each one renders as formatted content and nothing overflows the panel width
- Given I compare engines with very different answer lengths, When I switch engine tab, Then the header, tags, engine tabs and verdict stay at the same position, and a short answer ends without empty space
- Given the answer header, When it renders, Then it counts characters, not words, so it works the same for Japanese or Chinese answers

### Acceptance Criteria (from story file, copied on review)

**AC1 — Long answer clamped**

- Given: an answer longer than about 8 lines
- When: I open the question panel
- Then: the answer shows its first 8 lines behind a fade with a "Show full answer" link

**AC2 — Short answer in full**

- Given: an answer shorter than the clamp
- When: I open the panel
- Then: it shows in full with no expand control

**AC3 — Expand in place**

- Given: a clamped answer
- When: I click "Show full answer"
- Then: it expands in place and the panel scrolls internally, the panel width does not change

**AC4 — Collapse scrolls back**

- Given: an expanded answer
- When: I click "Show less" at the bottom
- Then: the answer collapses and the panel scrolls back to the top of the answer card

**AC5 — Rich content renders safely**

- Given: an answer that contains headings, bold text, lists, tables, long URLs or code blocks
- When: it renders
- Then: each one renders as formatted content and nothing overflows the panel width

**AC6 — Stable layout across engines**

- Given: I compare engines with very different answer lengths
- When: I switch engine tab
- Then: the header, tags, engine tabs and verdict stay at the same position, and a short answer ends without empty space

**AC7 — Character count, not word count**

- Given: the answer header
- When: it renders
- Then: it counts characters, not words, so it works the same for Japanese or Chinese answers

Backend: `AnswerComposer` (text + code-point `characterCount`), `QuestionDetailDto.answer` (FULL/EXCERPT/NONE), NATURAL rows skip JSON parsing / key_themes fallback. Frontend: `AnswerMarkdown` (react-markdown + remark-gfm, lazy-loaded, safe — no raw HTML, no unsafe link schemes, no images), `AnswerCard` (184px/8-line clamp, fade, Show full answer / Show less with scroll-back under the sticky engine row), wired under the verdict on Visibility, Competitive and Perception/Other, replacing EmptyProviderState for a FULL answer with no extraction yet. Legacy EXCERPT rows unchanged.

Backend suite: 3465/3465 green. Frontend suite: 3004/3005 green (1 pre-existing unrelated flaky test, `ReportListView.test.tsx`, confirmed via git history and isolated rerun). `pnpm build` confirms the lazy markdown chunk code-splits correctly. Biome clean on all touched files.

Open items carried to QA/PM/design per the story's own Open Questions: P1 (FR/ES copy — implemented at the spec's proposed default), D1 (184px/8-line clamp — implemented at the spec's proposed default, pending Jalal confirmation).

## Technical Details

### Scope note

Display only, depends on STORY-50.1 (GEO-1550, full raw answer stored). The panel is the drawer of STORY-53.9. States of the answer card (loading, pending, error, not counted, analysis run before this epic): STORY-53.5. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").

---

## Dependencies

- **Blocks:** GEO-1566, GEO-1567
- **Blocked by:** GEO-1550, GEO-1572, GEO-1565
- **relates to:** GEO-1601 (Bug, Done) — [GEO-Category] Prompt detail panel: a short natural answer is clipped with no fade and no "Show full answer" link
- **relates to:** GEO-1604 (Bug, Done) — [GEO-Category] Prompt detail panel: numbered lists in a natural answer lose their numbers and show an empty bullet line
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1564
- External Spec: [53-1-read-the-full-answer-in-the-question-panel.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-1-read-the-full-answer-in-the-question-panel.md)
