# Story 4.4: Overview — Category Prioritization Matrix

**Story ID:** GEO-77  
**Titre:** [Story 4.4] Overview — Category Prioritization Matrix  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-77

## User Story

**As** an Editor  
**I want** to see a visual matrix of my categories plotted by SOV vs Win Rate  
**So that** I can identify which categories are stars, opportunities, at risk, or need monitoring

## Acceptance Criteria

1. **Given** an Editor on the Overview page, **When** the matrix loads, **Then**:
   - SOV is on X-axis
   - Win Rate on Y-axis
   - Each data point = one category × market pair, with market flag
   - 4 quadrants:
     - **Stars:** high SOV + high win rate
     - **Opportunity:** low SOV + high win rate
     - **At Risk:** high SOV + low win rate
     - **Monitor:** low SOV + low win rate
   - Threshold: SOV 50%, Win Rate 50%

## Technical Details

### Data Points
- Each point represents a category-market combination
- Market flag displayed for easy identification

### Hover Interaction
- Tooltip with detailed information on hover

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 4.1 & 4.2 (Layout and Filters)
