# Story 4.7: AI Perception Summary (On-Demand)

**Story ID:** GEO-73  
**Titre:** [Story 4.7] AI Perception Summary (On-Demand)  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-73

## User Story

**As** an Editor  
**I want** AI-generated perception summaries that are scoped to my current filters  
**So that** I get a quick narrative of how AI sees my brand

## Acceptance Criteria

1. **Given** an Editor viewing any scope, **When** they access the perception summary for the first time with a specific filter combination, **Then**:
   - The system generates a summary via Gemini (3 bullet points, 150 chars max each)
   - Caches the result for subsequent access
   - Shows loading state during generation

2. **Given** the same filter combination is accessed again, **When** the cached result exists, **Then**:
   - It's served instantly without re-generation

3. **Given** 4 hierarchical levels, **Then** summaries are available at:
   - Global
   - Global per market
   - Per category
   - Per category × market

4. **Given** a new scheduled execution completes, **When** cache invalidation runs, **Then**:
   - All cached summaries are invalidated (regenerated on next access)

## Technical Details

### API Endpoint
- **GET** `/api/v1/reports/{id}/perception-summary?scope=...&market=...&category=...&llms=...`

### Storage
- Stored in `perception_summaries` table per snapshot

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 4.1 & 4.2 (Layout and Filters)
