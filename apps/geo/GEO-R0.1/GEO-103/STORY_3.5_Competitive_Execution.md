# Story 3.5: Competitive Execution & Source Classification

**Story ID:** GEO-83  
**Titre:** [Story 3.5] Competitive Execution & Source Classification  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-103 (EPIC-003)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-83

## User Story

**As** an Editor  
**I want** competitive analysis completed and all citation sources classified  
**So that** I can see my brand vs competitors and know which publications to target

## Acceptance Criteria

1. **AC1:** Flink extends ResponseCounter for Phase 2 competitive counting (50→80% progress)

2. **AC2:** Flink emits CLASSIFY_SOURCES when all 3 counts at 100%:
   - Visibility + Perception + Competitive

3. **AC3:** Competitive response enrichment:
   - `target_rank`, `is_first`
   - 100% local, zero LLM call

4. **AC4:** Extract sources from ALL responses:
   - Visibility + Perception + Competitive
   - Create `response_sources` rows

5. **AC5:** 3-level source classification:
   - Regex → Shared cache → Gemini
   - 11 categories

6. **AC6:** 11 source categories with priority rules:
   - Brand → Owned
   - Competitor → Competitor Media

7. **AC7:** Report finalization:
   - Processor publishes PIPELINE_COMPLETE
   - ReportStatusService evaluates COMPLETED/COMPLETED_PARTIAL/FAILED

8. **AC8:** Progress events 50→100%:
   - Phase 2 counting + enrichment + classification + finalization

9. **AC9-AC10:** Edge cases + Idempotency (Kafka at-least-once)

## Technical Details

### Architecture Update
- `geo-report-status` producer: Flink + Processor (was Flink-only)
- CLASSIFY_SOURCES: 4th trigger on `geo-enrichment-trigger`

### Key Decisions
- Phase 2 counting: Flink extends ResponseCounter (same pattern as Phase 1)
- Competitive enrichment: 100% local, no LLM
- Competitors already known from Story 3.3
- Source classification on raw response URLs
- `domain_classifications`: cross-tenant shared cache (no `organisationId`)
- 3 retries Gemini + regex fallback
  - `.edu` → Academic
  - `.gov` → Gov
  - else → Other

### Domain Normalization
- Lowercase
- Strip www
- Root domain (from MVP pattern)

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved

## Dependencies

- **Depends on:** 
  - Story 3.1 (First Analysis Execution)
  - Story 3.2 (Real-Time Progress)
  - Story 3.3 (Visibility Enrichment)
  - Story 3.4 (Perception Analysis)
- **Blocks:** Story 3.5b (Improvement Areas)
