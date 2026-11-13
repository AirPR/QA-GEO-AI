# GEO-1598: STORY-54.4: Read the AI Overview like any other answer

**Story ID:** GEO-1598
**Issue Type:** Story
**Title:** STORY-54.4: Read the AI Overview like any other answer
**Status:** [CODE REVIEW] Code Review
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1005
**Fix version:** 1.4
**Created:** 2026-11-11
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1598

## User Story

> As a GEO user, I want the AI Overview read with the same rules as the other engines, so that its rankings, outcomes, themes and sources compare with theirs.

- **As** a GEO user
- **I want** the AI Overview read with the same rules as the other engines
- **So that** its rankings, outcomes, themes and sources compare with theirs.

## Acceptance Criteria

_4 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1005, User Story 1.4)

- Given a captured AI Overview, When it is parsed, Then the shared reader of GEO-678 extracts the ranking, the competitive outcome, the themes and tone and the sources with the same rules as for the other engines, brand family included
- Given the widget text and markup that the Google page leaves in a capture (eg: "Show more", "AI responses may include mistakes", the feedback buttons), When the answer is stored for parsing, Then it is removed first, as GEO-678 story 1.10 does for the other rendered answers
- Given an AI Overview that cites sources as links next to its paragraphs and not as numbered markers, When the sources are read, Then each source keeps the place where the AI Overview cites it, so the panel numbers them as in GEO-1498 story 1.4
- Given an image in the AI Overview, When the answer is parsed, Then the image is not read: brands, outcomes and themes come from the text only

## Technical Details

### What the code and the vendor measurements add to the epic text

- The shared reader needs no change and has no engine-specific branch. It reads one grouped call per question across all engines, so an extra engine adds records to each call (checked with six).
- The place of each citation is the real work. A captured answer carries no citation place today (plain text, vendor citation pills without offsets). The vendor gives the places only in an optional markdown version of the answer, and story 50.9 (AC4) says parsing must never rely on markdown created by a capture vendor. The story keeps that rule and delivers the epic's criterion: the capture step reads the markdown once and stores plain text plus the places; the reader never parses vendor markdown.
- The captured path also has no way to receive citation places and no guard that the places match the stored text: the story adds both.
- Page residue: none was found in 24 measured AI Overviews, so the cleaning is minimal and defensive (whole-line removals only). The engine's own closing questions are prose and are kept.
- Images, videos, shopping cards, organic results and ads stay in the raw capture and are never read or counted.

### Scope note

Depends on STORY-54.2 (the capture strategy and its request) and STORY-54.3 (blank answers are excluded before the reader). No database migration. No frontend change expected (checked in STORY-54.5).

## Dependencies

- **Blocks:** GEO-1599
- **Blocked by:** GEO-1597
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1005
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1598
- External Spec: [54-4-read-the-ai-overview-like-any-other-answer.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1005-epic-54-stories/docs/implementation-artifacts/epics/epic-54/54-4-read-the-ai-overview-like-any-other-answer.md)
