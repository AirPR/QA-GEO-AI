# Story 4.2: Market & LLM Filters

**Story ID:** GEO-78  
**Titre:** [Story 4.2] Market & LLM Filters  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-78

## User Story

**As** an Editor  
**I want** to filter all dashboard data by market and LLM engine  
**So that** I can focus on specific geographic or engine-specific insights

## Acceptance Criteria

1. **Given** an Editor on any dashboard view, **When** they select a market filter, **Then**:
   - Default is "Master (All Markets)" which aggregates across all markets
   - Selecting a specific market scopes all KPIs, tables, and charts to that market
   - Filter state persists across view navigation

2. **Given** an Editor selecting LLM filter, **When** they deselect an LLM, **Then**:
   - All metrics are recalculated excluding that LLM's data
   - Perception summaries are regenerated with filtered source attribution
   - Min 1 LLM must remain selected

## Technical Details

### API Endpoint
- **GET** `/api/v1/reports/{id}/overview?marketCode=en-US&llmProvider=gemini`

### Aggregation
- Master aggregation: arithmetic mean across all category-market pairs

### Caching
- Caffeine cache (30-min TTL) for repeated identical filter requests

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 4.1 (Dashboard Layout)
- **Used by:** All KPI and visualization stories
