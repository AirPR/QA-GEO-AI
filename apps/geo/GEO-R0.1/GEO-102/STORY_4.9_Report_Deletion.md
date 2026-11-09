# Story 4.9: Report Deletion

**Story ID:** GEO-71  
**Titre:** [Story 4.9] Report Deletion  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-71

## User Story

**As** an Editor  
**I want** to delete a report I no longer need  
**So that** I can manage my report inventory

## Acceptance Criteria

1. **Given** an Editor wanting to delete a report, **When** they confirm the deletion dialog, **Then**:
   - The report is soft-deleted
   - No longer visible in the list
   - Shared links for the deleted report return 404

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 4.1 (Dashboard Layout)
