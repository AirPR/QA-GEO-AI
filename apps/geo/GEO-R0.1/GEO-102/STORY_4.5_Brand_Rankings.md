# Story 4.5: Overview — Brand Rankings

**Story ID:** GEO-76  
**Titre:** [Story 4.5] Overview — Brand Rankings  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-76

## User Story

**As** an Editor  
**I want** to see how brands rank in my categories  
**So that** I understand my competitive position

## Acceptance Criteria

1. **Given** an Editor on the Overview page, **When** Brand Rankings loads, **Then** it shows a table with:
   - Rank
   - Brand (with logo)
   - SOV%
   - Visibility%
   - Avg Position
   - LLM Choice%
   - Brands are grouped by normalized brand family
   - Sorted by SOV desc

2. **Given** logos, **When** displayed, **Then**:
   - Brand logos from Brandfetch (domain-based)
   - Fallback: first-letter avatar

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 4.1 & 4.2 (Layout and Filters)
