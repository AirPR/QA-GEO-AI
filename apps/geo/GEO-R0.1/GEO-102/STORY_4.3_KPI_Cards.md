# Story 4.3: Overview — 5 KPI Cards

**Story ID:** GEO-107  
**Titre:** [Story 4.3] Overview — 5 KPI Cards  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-107

## User Story

**As** an Editor  
**I want** to see 5 key performance indicators for my brand  
**So that** I get an instant snapshot of my brand's AI presence

## Acceptance Criteria

1. **Given** an Editor on the Overview page, **When** the KPIs load, **Then** 5 cards are displayed:
   - Share of Voice
   - Visibility
   - Avg Position
   - Win Rate
   - Sentiment
   - Each shows current value with unit (%, position, score)
   - Each has a quality label (Good/Fair/Poor) based on thresholds
   - All KPIs respect active market and LLM filters

## KPI Formulas

- **SOV** = Visibility% × (2 / (AvgPosition + 1))
- **Visibility%** = mentionCount / totalLLMResponseCount × 100
- **Avg Position** = ceil(mean(target_rank)) with unranked = penalty 11
- **Win Rate** = winsCount / totalCompetitiveResponses × 100
- **Sentiment** = sum(score × freq) / sum(freq) displayed as -100 to +100

## Technical Details

### Computation
- All metrics computed dynamically at query time from enriched responses
- FAILED responses excluded from aggregation (denominator adjusts to SUCCESS pool)

### Quality Thresholds
- **SOV:** >50% Good, >25% Fair, ≤25% Poor
- **Position:** #1-#2 Good, #3-#4 Fair, #5+ Poor

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 4.1 & 4.2 (Layout and Filters)
