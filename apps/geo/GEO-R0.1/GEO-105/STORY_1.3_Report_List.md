# Story 1.3: Report List (Basic)

**Story ID:** GEO-95  
**Titre:** [Story 1.3] Report List (Basic)  
**Statut:** Done  
**Assigné à:** Abdenasser Aroukhsiss  
**Epic:** GEO-105 (EPIC-001)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-95

## User Story

**As** an Editor  
**I want** to view a list of all reports for my organization with status and date  
**So that** I can see what's been configured and its current state

## Acceptance Criteria

1. **Given** an authenticated Editor with existing reports, **When** they view the report list, **Then** the system displays:
   - Report name
   - Status badge (PENDING/CONFIGURED)
   - Creation date
   - Number of markets
   - Number of categories
   - Results are sorted by most recent first
   - The list supports sorting and filtering
   - The list is paginated (limit/offset)
   - The list loads within 1 second

2. **Given** an authenticated Reader, **When** they view the report list, **Then** they see the same list in read-only mode (no create/edit/delete actions)

3. **Given** an authenticated user from organization A, **When** they view the report list, **Then** they only see reports belonging to organization A (zero cross-tenant data)

## Technical Details

### API Endpoint
- **GET** `/api/v1/reports` (requires READER role)
- **Pagination:** `?limit=20&offset=0`

### Database
- Uses reports table created in Story 1.1
- Query filters by organizationId for multi-tenancy

### Display Information
- Report name
- Status badge (PENDING/CONFIGURED)
- Creation date
- Number of markets
- Number of categories

### Performance Requirements
- Page load within 1 second
- Pagination support for large datasets
- Sorting and filtering capabilities

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** 
  - Story 1.1 (Auth0 Login & Organization Context)
  - Story 1.2 (Module Activation Gate)
