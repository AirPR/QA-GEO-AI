# US1.3 — Identify summaries by their full input combination

**Story ID:** GEO-539-US1.3 (Story ID: TBD in Jira)
**Epic:** GEO-539
**Statut:** ⏳ TBD
**Lien Jira Epic:** https://onclusive.atlassian.net/browse/GEO-539

## User Story

**As** a viewer changing filters,
**I want** each distinct combination of inputs to have its own stored summary,
**So that** switching country, category, or engine selection returns the summary that matches what I am looking at.

## Acceptance Criteria

### AC1 — Cache key covers all input dimensions
- **Given** a summary,
- **When** it is stored or retrieved,
- **Then** it is identified by the analysis, the scope (global or category), the category when the scope is a category, the country (or "all"), and the set of selected AI engines.

### AC2 — Previously seen combination served from store
- **Given** a viewer switches to a country or category combination seen before,
- **When** the view loads,
- **Then** the matching stored summary loads instantly with no new generation.

### AC3 — New engine subset triggers generation and storage
- **Given** a viewer selects an engine subset that has not been seen before,
- **When** the view loads,
- **Then** the summary is generated and stored, and subsequent requests for that exact subset are served from the store.

## Notes Techniques

- Cache key dimensions: `{ analysisId, scope: 'global'|'category', categoryId?: string, country: string|'all', engineIds: string[] (sorted) }`.
- The engine IDs set should be normalised (sorted, deduplicated) before hashing/storing so that selection order does not produce different keys.
- Switching a single dimension (e.g. country) must produce a separate entry, not overwrite the previous one.
