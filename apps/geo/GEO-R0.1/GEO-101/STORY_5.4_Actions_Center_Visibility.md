# Story 5.4: Actions Center — Visibility Improvements Display

**Story ID:** GEO-65  
**Titre:** [Story 5.4] Actions Center — Visibility Improvements Display  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-101 (EPIC-005)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-65

## User Story

**As** an Editor  
**I want** to see visibility-related improvement areas  
**So that** I know where my brand is underperforming in AI search

## Acceptance Criteria

1. **Given** pre-computed visibility improvements from the pipeline, **When** the Actions Center loads, **Then** it displays:
   - low_visibility
   - poor_position
   - category_market_low
   - owned_media_gap
   
   Each shows:
   - Type badge
   - Severity indicator (Critical/Warning/Info)
   - Category name
   - LLM
   - Target domain count
   - Sorted by severity

2. **Renders** pre-computed results from Story 3.5b (no detection logic here)

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 3.5b (Improvement Areas Pre-computation in Pipeline)
