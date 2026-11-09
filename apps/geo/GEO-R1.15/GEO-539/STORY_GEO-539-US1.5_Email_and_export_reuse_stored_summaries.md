# US1.5 — Email and export reuse stored summaries

**Story ID:** GEO-539-US1.5 (Story ID: TBD in Jira)
**Epic:** GEO-539
**Statut:** ⏳ TBD
**Lien Jira Epic:** https://onclusive.atlassian.net/browse/GEO-539

## User Story

**As** a recipient of the analysis-ready email or a generated export,
**I want** the summary it contains to come from the same server-side store,
**So that** the same text is consistent everywhere and is not generated again just for me.

## Acceptance Criteria

### AC1 — Email uses stored summary
- **Given** the analysis-ready email is sent,
- **When** it includes a perception summary,
- **Then** it uses the stored summary, or generates and stores one if missing, and never bypasses the store.

### AC2 — Export uses stored summary
- **Given** an export includes a summary,
- **When** it is produced,
- **Then** it reads the stored summary rather than generating a new one on the fly.

## Notes Techniques

- Both the email trigger and the export pipeline must route their summary retrieval through the same server-side store read path used by the UI.
- If no stored summary exists at the time of email/export generation, the store-first pattern from US1.1 applies: generate, persist, then use.
- The text in the email/export must be identical to what the UI shows for the same input combination.
