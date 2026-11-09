# Story 1.1: Auth0 Login & Organization Context

**Story ID:** GEO-97  
**Titre:** [Story 1.1] Auth0 Login & Organization Context  
**Statut:** Done  
**Assigné à:** Abdenasser Aroukhsiss  
**Epic:** GEO-105 (EPIC-001)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-97

## User Story

**As** an Editor or Reader  
**I want** to log in via Auth0 SSO and have my organization automatically resolved  
**So that** I can securely access only my organization's data

## Acceptance Criteria

1. **Given** a user with valid Auth0 credentials, **When** they authenticate via Auth0, **Then** the system extracts organisationId from the JWT token and sets TenantContext, all subsequent API requests are scoped to that organization, Auth0 tokens are validated on every API request

2. **Given** an unauthenticated user accessing a protected endpoint, **When** the request has no valid token, **Then** the system returns 401 Unauthorized

3. **Given** an authenticated Reader, **When** they attempt to access Editor-only actions (create/edit/delete report), **Then** the system returns 403 Forbidden

## Technical Details

### Implementation Details
- Uses onclusive-auth-spring-boot-starter v1.4.0
- @PreAuthorize on controllers
- TenantContext.set(organisationId) from SecurityContext

### Database Migration
- Flyway migration for reports table
- Full schema: entityName, entityDomain, entityLogoUrl, status, organisationId, createdAt, updatedAt, isDeleted

### Frontend
- Auth0 SDK 2.10
- ProtectedRoute
- Zustand auth store
- **Note:** Already implemented in Sprint 0, no frontend work needed in this story

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
