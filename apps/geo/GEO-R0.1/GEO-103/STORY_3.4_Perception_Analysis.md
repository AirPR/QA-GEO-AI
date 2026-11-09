# Story 3.4: Perception Analysis & Reputation Insights

**Story ID:** GEO-84  
**Titre:** [Story 3.4] Perception Analysis & Reputation Insights  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-103 (EPIC-003)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-84

## User Story

**As** an Editor  
**I want** AI-generated reputation insights (concepts, sentiment) per category and market  
**So that** I understand how AI engines perceive my brand

## Acceptance Criteria

1. **AC1:** Consume PERCEPTION_COMPLETE trigger from `geo-enrichment-trigger`, call PerceptionEnrichmentService

2. **AC2:** 1 Gemini call per market × category
   - Model: `gemini-internal`
   - Extracts concepts with:
     - name
     - response_ids
     - quotes (text, source_url, sentiment_score)

3. **AC3:** Distribute concepts to individual responses via `response_ids`, store in `perception_concepts` JSONB

4. **AC4:** Stored fields:
   - `concept.name`
   - `concept.sentiment_score`
   - `concept.quotes[]`
   - NOT stored (query-time): frequency, sentiment label

5. **AC5:** No progress events (parallel enrichment, not on critical path)

6. **AC6:** Edge cases:
   - Zero perception responses (skip)
   - Gemini failure (1 retry then skip scope)
   - Idempotent on duplicate trigger

## Technical Details

### AI Model
- **Model:** `gemini-internal` (gemini-2.5-flash-lite)
- Confirmed by MVP code

### Retry Logic
- 1 retry per scope, then skip (perception_concepts = null)

### Reusable Components
- EnrichmentConsumer
- LlmResponseRepository
- ReportRefRepository (from Story 3.3)

## PM Decisions Required Before Implementation

- `concept.sentiment_score` derivation formula (from `quotes[].sentiment_score`)
- Exact Gemini prompt for concept extraction
- Sentiment label thresholds (Positive/Negative/Neutral)

## Definition of Done

- ✅ All acceptance criteria met
- ✅ PM decisions confirmed
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved

## Dependencies

- **Depends on:** Story 3.1 (First Analysis Execution)
- **Parallel to:** Story 3.3 (Visibility Enrichment)
- **Blocks:** Story 3.5 (Competitive Execution)
