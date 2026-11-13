# Align the Lite Analysis on Natural Answers

**Epic ID:** GEO-1532
**Status:** [BACKLOG] Backlog
**Assigned to:** Quentin.Reant
**Fix version:** 1.4
**Created:** 2026-10-23
**Updated:** 2026-10-27
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1532

## Description / Functional Need

_Jira description, verbatim._

The Lite Analysis (the free analysis a prospect gets before buying) still asks the engines for a fixed JSON structure and computes its metrics the old way: Share of Voice over 10 slots per visibility answer, Average Position with a penalty of 11 when the brand is absent, and the answer language forced to the insights language (GEO-918). Once GEO-678 ships, the full analysis reads natural answers with new rules, so a prospect would see one Share of Voice in the Lite Analysis and a different one after purchase.

The goal is to run the Lite Analysis on the same reader and the same formulas as the full analysis. This is low priority: it can ship after GEO-678, and until then the gap is accepted.

---

#### User Story 1.1: Use the natural answer reader in the Lite Analysis

Story ID: TBD

> As a prospect, I want the Lite Analysis to measure the same answers as the full product, so that the numbers I see before buying are the ones I get after.

Acceptance Criteria:

- Given a Lite Analysis, When a question is sent, Then it is sent the same way as in the full analysis (GEO-678 stories 1.1 and 1.11), with no JSON structure and no language rule
- Given a Lite Analysis answer, When it is read, Then the same reading rules as GEO-678 apply (brand recognition, ranking by first mention, competitive outcomes, sources)
- [NEW 27 OCT] Given a Perception prompt of the Lite Analysis, When I expand its row, Then the answer shows in the same answer card as the question panel of GEO-1498 (markdown rendered, clamped with "Show full answer", character count), not as plain text, so headings, lists and tables never show as raw markdown

#### User Story 1.2: Use the same formulas as the full analysis

Story ID: TBD

> As a prospect, I want the Lite Analysis metrics to use the full analysis formulas, so that my Share of Voice and position do not change after purchase.

Acceptance Criteria:

- Given a Lite Analysis, When Share of Voice is computed, Then it uses the GEO-678 formula (each brand family once per answer, over the brand families the answer names)
- Given a Lite Analysis, When Average Position is computed, Then it is the mean rank over the answers where the brand is named, ranks 1 to 10, with no penalty, as in the full analysis (GEO-1195)
- Given a Lite Analysis, When AI Choice is computed, Then it is Chosen plus Conditional over the counted competitive answers, as in the full analysis

---

### Scope boundaries

Out of scope

- [CHANGED 27 OCT] Any change to the layout of the Lite Analysis screens or to the upsell flow, except the Perception answer card of story 1.1
- Rendered capture for the Lite Analysis: it follows the route set for each engine in production

Dependencies

- GEO-678 (Natural Answer Collection and Parsing)
- [NEW 27 OCT] GEO-1498 (Natural Answer Display): the answer card reused in the Perception rows

## Scope

_No "Scope" section in the Jira description. The scope is the 2 user stories written in the description (Story ID: TBD in Jira, no child Story / Task created yet):_

- User Story 1.1: Use the natural answer reader in the Lite Analysis
- User Story 1.2: Use the same formulas as the full analysis

**Dependencies (verbatim):**

- GEO-678 (Natural Answer Collection and Parsing)
- [NEW 27 OCT] GEO-1498 (Natural Answer Display): the answer card reused in the Perception rows

## Out of Scope

- [CHANGED 27 OCT] Any change to the layout of the Lite Analysis screens or to the upsell flow, except the Perception answer card of story 1.1
- Rendered capture for the Lite Analysis: it follows the route set for each engine in production

## Associated Stories & Tasks

_No child Story or Task in Jira for this epic at import time._

| ID | Type | Title | Status |
|----|------|-------|--------|
| — | — | No child Story / Task | — |

**Stories planned in the epic description (not Jira issues yet):**

| Ref | Title | Story ID | ACs |
|-----|-------|----------|-----|
| User Story 1.1 | Use the natural answer reader in the Lite Analysis | TBD | 3 |
| User Story 1.2 | Use the same formulas as the full analysis | TBD | 3 |

Other children, not imported: none.

## Architecture

_No architecture section in the description._

## Acceptance Criteria — Summary

_No epic-level AC section. Aggregated from the 2 planned user stories (6 ACs, full text verbatim in the Description section above):_

- **User Story 1.1: Use the natural answer reader in the Lite Analysis** (3 ACs) — I want the Lite Analysis to measure the same answers as the full product, so that the numbers I see before buying are the ones I get after.
- **User Story 1.2: Use the same formulas as the full analysis** (3 ACs) — I want the Lite Analysis metrics to use the full analysis formulas, so that my Share of Voice and position do not change after purchase.

## Links

- https://onclusive.atlassian.net/browse/GEO-1532
