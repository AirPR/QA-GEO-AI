# GEO-673: 24-2 — Evidenced Concept Sentiment (US 1.2)

**Story:** GEO-673
**Statut:** [DONE] Done
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-648
**Cree:** 2026-06-16
**Jira:** https://onclusive.atlassian.net/browse/GEO-673

## User Story
## In plain terms

A concept's sentiment (positive / mixed / negative) is currently **inferred from the whole answer** by the second AI step. This story makes the sentiment come **straight from the engine, grounded in that concept's own sources**. The engine returns **both** a label (positive/mixed/negative) **and a numeric score** per concept — so the Sentiment KPI keeps the same granularity it has today.

## Acceptance Criteria
**AC1** — Given a concept's sentiment (positive, mixed, or negative), When it is computed, Then it reflects what the attributed sources say about the brand, carried with the concept — rather than being inferred from the answer as a whole.

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-648
- Story: https://onclusive.atlassian.net/browse/GEO-673
