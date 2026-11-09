# Story 1.2: Module Activation Gate

**Story ID:** GEO-96  
**Titre:** [Story 1.2] Module Activation Gate  
**Statut:** Done  
**Assigné à:** Abdenasser Aroukhsiss  
**Epic:** GEO-105 (EPIC-001)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-96

## User Story

**As** a user  
**I want** the system to check if the Mesure module is activated for my organization  
**So that** I'm redirected to the sales page if not activated, or shown the module if activated

## Acceptance Criteria

1. **Given** an authenticated user whose organization does NOT have the Mesure module activated, **When** they navigate to the Mesure module, **Then** the system redirects them to the sales/upgrade page

2. **Given** an authenticated user whose organization HAS the module activated but no reports exist, **When** they navigate to the Mesure module, **Then** the system displays an empty state with illustration and "Create Report" CTA button

3. **Given** an authenticated user whose organization HAS the module activated and reports exist, **When** they navigate to the Mesure module, **Then** the system displays the report list (Story 1.3)

## Technical Details

### Feature Logic
- Check module activation status in organization context
- Conditional routing based on activation status
- Integration with Story 1.1 (Auth0 & Organization Context)

### UI States
- Module not activated → Redirect to sales/upgrade page
- Module activated, no reports → Empty state with CTA
- Module activated, reports exist → Display report list

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 1.1 (Auth0 Login & Organization Context)
- **Blocks:** Story 1.3 (Report List should display when this gate passes)
