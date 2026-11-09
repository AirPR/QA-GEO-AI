# Story 6.2: Manage Scope — LLM Configuration

**Story ID:** GEO-60  
**Titre:** [Story 6.2] Manage Scope — LLM Configuration  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-100 (EPIC-006)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-60

## User Story

**As** an Editor  
**I want** to enable or disable LLM engines for an existing report  
**So that** I can adjust which AI engines are included in future analyses

## Acceptance Criteria

1. **Given** an Editor on Manage Scope, **When** they toggle an LLM engine, **Then**:
   - The change is saved
   - Applied on the next scheduled execution
   - Minimum 1 LLM must remain enabled (validation constraint)

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- None (independent story)

## Technical Notes

- LLM configuration changes are applied on the next scheduled execution
- Business rule: Minimum 1 LLM must always remain enabled
- Validation should prevent users from disabling all LLMs
- Changes persist until explicitly modified again
