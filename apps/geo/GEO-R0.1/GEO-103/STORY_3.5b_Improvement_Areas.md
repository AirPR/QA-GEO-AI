# Story 3.5b: Improvement Areas & Priority Source Targets Pre-Computation

**Story ID:** GEO-82  
**Titre:** [Story 3.5b] Improvement Areas & Priority Source Targets Pre-Computation  
**Statut:** Abandoned  
**Assigné à:** Abdenasser Aroukhsiss  
**Epic:** GEO-103 (EPIC-003)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-82

## User Story

**As** an Editor  
**I want** improvement areas and priority source targets calculated during the analysis pipeline  
**So that** the Actions Center loads instantly with pre-computed results

## Acceptance Criteria

1. **AC1:** Given all enrichment phases complete:
   - Visibility
   - Perception
   - Competitive
   - Source classification
   
   **When** the pipeline runs the improvement detection, **Then** 8 improvement types are detected:

   **Visibility (4):**
   - low_visibility
   - poor_position
   - category_market_low
   - owned_media_gap

   **Competitive (3):**
   - low_favorability
   - category_market_losing
   - low_source_favorability

   **Reputation (1):**
   - negative_sentiment

   Each detected per LLM per category with severity:
   - Critical: < 25%
   - Warning: < 40%
   - Info: < 50%

2. **AC2:** Given global favorability >= 95%, **Then** all competitive improvements are cleared

3. **AC3:** Given reputation items per category, **Then** max 3 reputation items surfaced (highest severity first)

4. **AC4:** Given detection complete, **When** results computed, **Then**:
   - Persisted to PostgreSQL (pre-computed, not on dashboard load)
   - Priority Source Targets computed per improvement area

5. **AC5:** Execution timing:
   - Runs after source classification completes
   - Before report status set to COMPLETED

## Technical Details

### Storage
- Results stored in `enriched_data` or dedicated `improvement_areas` table

### Dependencies
- Epic 5 Stories 5.4/5.5 only RENDER these pre-computed results

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Notes

- Status: **Abandoned** (as per Jira status)
- May be deferred to later epic

## Dependencies

- **Depends on:** Story 3.5 (Competitive Execution & Source Classification)
- **Used by:** Epic 5 Stories 5.4/5.5 (dashboard rendering)
