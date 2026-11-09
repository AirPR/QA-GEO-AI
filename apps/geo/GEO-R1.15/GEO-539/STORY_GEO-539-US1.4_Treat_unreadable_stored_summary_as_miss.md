# US1.4 — Treat an unreadable stored summary as a miss

**Story ID:** GEO-539-US1.4 (Story ID: TBD in Jira)
**Epic:** GEO-539
**Statut:** ⏳ TBD
**Lien Jira Epic:** https://onclusive.atlassian.net/browse/GEO-539

## User Story

**As** a viewer,
**I want** a corrupt stored summary to be regenerated rather than shown,
**So that** I never see broken or partial text.

## Acceptance Criteria

### AC1 — Corrupt entry treated as cache miss
- **Given** a stored summary is corrupt or cannot be read back cleanly,
- **When** it is requested,
- **Then** it is treated as if no summary were stored and the summary is regenerated.

### AC2 — Corrupt entry replaced after regeneration
- **Given** an unreadable stored summary is regenerated,
- **When** generation completes,
- **Then** the corrupt entry is replaced with the fresh result.

## Notes Techniques

- "Cannot be read back cleanly" includes: JSON parse failure, missing required fields, encoding errors, truncated content.
- The replace operation must be atomic or at least ensure that a subsequent concurrent request does not read the corrupt entry.
- No user-visible error should be shown — the fallback is transparent and produces a valid summary.
