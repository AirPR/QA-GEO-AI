# Story 7.1: Immutable Snapshot Storage

**Story ID:** GEO-57  
**Titre:** [Story 7.1] Immutable Snapshot Storage  
**Statut:** Backlog  
**Epic:** GEO-99 (EPIC-007)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-57

## User Story

**As** the system  
**I want** to store each analysis run as an immutable snapshot  
**So that** historical results are preserved and comparable

## Acceptance Criteria

1. **Given** an analysis execution completes, **When** results are finalized, **Then** a new snapshot is created with:
   - executedAt (timestamp)
   - totalQuestions (count)
   - successCount (count)
   - failedCount (count)
   - configSnapshot (resolved config including real competitor names)

2. **Given** a snapshot is created, **When** attempting to modify it, **Then** the snapshot is immutable (never modified after creation)

3. **Given** snapshots retention, **When** snapshots are created, **Then** snapshots are retained for at least 12 months

4. **Given** snapshot storage, **When** snapshots are created, **Then**:
   - snapshots table linked to reports (1:N relationship)
   - llm_responses linked to snapshots via snapshotId
   - configSnapshot JSON stores resolved competitive questions (placeholders replaced)

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- None (foundation story)

## Technical Notes

- Snapshots are point-in-time records of analysis execution
- Immutability ensures historical integrity
- ConfigSnapshot stores resolved competitive questions with real competitor names
- 12-month retention policy ensures sufficient historical data
- 1:N relationship with reports enables multi-snapshot per report
