# US1.1 — Generate and store on first request

**Story ID:** GEO-539-US1.1 (Story ID: TBD in Jira)
**Epic:** GEO-539
**Statut:** ⏳ TBD
**Lien Jira Epic:** https://onclusive.atlassian.net/browse/GEO-539

## User Story

**As** a viewer opening a fresh analysis,
**I want** the AI summary to be generated and saved server-side the first time it is requested,
**So that** no one ever has to generate that same summary again.

## Acceptance Criteria

### AC1 — Summary generated and stored on first request
- **Given** an AI summary has never been generated for a given filter combination,
- **When** the first viewer opens that view,
- **Then** the summary is generated on demand and the result is stored on the server.

### AC2 — Persist before returning
- **Given** a summary is being generated for the first time,
- **When** generation completes,
- **Then** the result is persisted before being returned, not only returned to the requesting browser.

## Notes Techniques

- Generation stays lazy — no precomputation before a viewer requests the view.
- The cache key includes: analysis ID, scope (global|category), category ID (when scope=category), country (or "all"), set of selected AI engine IDs.
- The persistence step must complete (or at least be initiated durably) before the response is sent to the browser.
