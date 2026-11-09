# Story 4.5b: Overview — Top Concepts

**Story ID:** GEO-75  
**Titre:** [Story 4.5b] Overview — Top Concepts  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-75

## User Story

**As** an Editor  
**I want** to see what key reputation concepts emerge from AI perception  
**So that** I understand the themes AI associates with my brand

## Acceptance Criteria

1. **Given** an Editor on the Overview page, **When** Top Concepts loads, **Then** it shows:
   - Concept name
   - Sentiment distribution (positive/mixed/negative)
   - Frequency (proportion of responses)
   - LLM attribution badges

2. **Given** concepts, **When** grouped, **Then**:
   - Concepts grouped by name (case-insensitive)
   - Frequency = response_ids.length / total_perception_responses

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 4.1 & 4.2 (Layout and Filters)
