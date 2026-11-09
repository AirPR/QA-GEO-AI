# US1.2 — Serve the stored summary on every repeat request

**Story ID:** GEO-539-US1.2 (Story ID: TBD in Jira)
**Epic:** GEO-539
**Statut:** ⏳ TBD
**Lien Jira Epic:** https://onclusive.atlassian.net/browse/GEO-539

## User Story

**As** any viewer of an analysis,
**I want** a previously generated summary to load instantly,
**So that** I never wait for or pay for a regeneration of something already produced.

## Acceptance Criteria

### AC1 — Stored summary served on repeat request
- **Given** the same filter combination has been generated before,
- **When** any viewer opens that view from any browser, session, or shared link,
- **Then** the summary loads from the server with no new generation.

### AC2 — Result identical to first requester
- **Given** a stored summary exists,
- **When** it is served,
- **Then** the result is identical to what the first requester received for the same inputs.

## Notes Techniques

- Applies to all request origins: any browser, any authenticated session, shared links.
- The stored result is returned as-is without re-running the AI engine.
- A stored summary is invalidated when the parent analysis is rerun (see epic scope).
