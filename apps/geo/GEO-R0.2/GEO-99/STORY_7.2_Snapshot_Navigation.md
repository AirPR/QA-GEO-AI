# Story 7.2: Snapshot Navigation

**Story ID:** GEO-56  
**Titre:** [Story 7.2] Snapshot Navigation  
**Statut:** Backlog  
**Epic:** GEO-99 (EPIC-007)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-56

## User Story

**As** an Editor  
**I want** to navigate between analysis snapshots  
**So that** I can compare results over time

## Acceptance Criteria

1. **Given** an Editor viewing a report with multiple snapshots, **When** they use previous/next controls, **Then**:
   - All dashboard data reflects the selected snapshot's results
   - The current snapshot date is displayed

2. **Given** snapshot navigation is active, **When** switching between snapshots, **Then**:
   - All data visualizations update to show snapshot-specific results
   - Filters remain consistent across snapshot navigation

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- Story 7.1 (Immutable Snapshot Storage) — requires snapshots to be created first

## Technical Notes

- Snapshot navigation requires Previous/Next controls in the UI
- All dashboard components must subscribe to snapshot context
- Date display should clearly indicate which snapshot is being viewed
- Navigation should preserve user's current view/section
- Consider pagination for many snapshots
