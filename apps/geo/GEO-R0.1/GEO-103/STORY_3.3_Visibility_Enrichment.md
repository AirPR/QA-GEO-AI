# Story 3.3: Visibility Enrichment & Competitor Discovery

**Story ID:** GEO-85  
**Titre:** [Story 3.3] Visibility Enrichment & Competitor Discovery  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-103 (EPIC-003)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-85

## User Story

**As** an Editor  
**I want** the system to identify my top competitors from AI visibility results  
**So that** competitive analysis uses real market data instead of placeholders

## Acceptance Criteria

1. **AC1:** Consume VISIBILITY_COMPLETE trigger from `geo-enrichment-trigger` Kafka topic, start enrichment pipeline

2. **AC2:** Enrich visibility responses with:
   - `target_rank`
   - `is_mentioned`
   - `is_first`
   - `total_entities`
   - `mentioned_entities` (JSONB)

3. **AC3:** Brand matching via Gemini AI (2-step: text similarity + AI grouping → normalized_name)

4. **AC4:** Extract top 5 competitors per market × category:
   - By mention count desc
   - Avg position asc
   - Penalty rank 11 for absent

5. **AC5:** Replace [Competitor 1-5] placeholders in memory (original templates preserved), dispatch Phase 2 competitive questions to Kafka

6. **AC6:** Emit progress events 40→50% via `geo-report-status`

7. **AC7:** Edge cases:
   - Zero visibility questions (skip)
   - Target brand absent
   - Fewer than 5 competitors
   - Gemini failure (fallback to text similarity)

## Technical Details

### Data Access
- Entity name: direct DB read from `reports` table
- Cross-service read, authorized per architecture

### Storage
- No write on questions table
- Placeholder replacement in memory only
- Final text stored in `llm_responses.question_text`

### Key Decision
- Competitors extracted in memory (no `extracted_competitors` table)
- Recoverable from enriched `llm_responses`

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved

## Dependencies

- **Depends on:** Story 3.1 (First Analysis Execution), Story 3.2 (Real-Time Progress)
- **Blocks:** Story 3.5 (Competitive Execution)
