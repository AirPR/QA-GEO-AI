# GEO-672: 24-1 — Trustworthy Concept-Source Attribution (US 1.1)

**Story:** GEO-672
**Statut:** [DONE] Done
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-648
**Cree:** 2026-06-16
**Jira:** https://onclusive.atlassian.net/browse/GEO-672

## User Story
## In plain terms

Today, when a user clicks a concept in "Top Concepts" and sees its sources, those sources were **guessed after the fact** by a second AI step — and a bug attaches **every** source of an answer to **every** concept of that answer, so sources appear under concepts they don't discuss. This story makes **each AI engine return its concepts with the supporting sources already attached**, and removes the bug → the source list under a concept becomes trustworthy proof.

## Acceptance Criteria
**AC1** — Given an analysis runs, When an AI engine returns its concepts, Then each concept includes its own supporting sources nested in the response, rather than a separate flat source list bound afterward.

**AC2** — Given the Top Concepts panel, When concepts are derived, Then each concept is attributed only to sources that actually discuss it, with no source attached on an inferred or guessed binding.

**AC3** — Given a source that does not mention the brand, When the user views any concept, Then that source does not appear under the concept.

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-648
- Story: https://onclusive.atlassian.net/browse/GEO-672
