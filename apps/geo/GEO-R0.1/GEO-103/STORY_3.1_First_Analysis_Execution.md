# Story 3.1: First Analysis Execution (End-to-End Pipeline)

**Story ID:** GEO-87  
**Titre:** [Story 3.1] First Analysis Execution (End-to-End Pipeline)  
**Statut:** Done  
**Assigné à:** Abdenasser Aroukhsiss  
**Epic:** GEO-103 (EPIC-003)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-87

## User Story

**As** an Editor  
**I want** my report to start analyzing automatically after first-time configuration  
**So that** I get results without manual intervention

## Acceptance Criteria

1. **Given** a report just submitted (status PENDING), **When** Flink polls every 90s with SKIP LOCKED, **Then** questions are dispatched to Kafka topics per enabled LLM

2. **Given** questions dispatched, **When** LLM dispatchers send to Prompt API at calibrated rates:
   - OpenAI: ~6ms
   - Claude: ~15ms
   - Gemini: ~40ms
   - Grok: ~100ms
   - Perplexity: ~120ms
   
   **Then** responses are persisted to PostgreSQL first, then published to kafka-responses

3. **Given** an LLM call fails after 3 retries, **When** the error occurs, **Then** response saved with status=FAILED, published to Kafka with status=FAILED, pipeline continues (never blocked)

4. **Given** a Circuit Breaker opens for one LLM (>5% errors), **When** it opens, **Then** only that dispatcher pauses 30s, others continue

## Technical Details

### New Module
- **geo-flink-jobs**
  - Separate Maven module
  - Flink 1.20
  - Java 21
  - RocksDB

### Configuration
- Flink checkpoints every 30s
- Polling interval: 90s with SKIP LOCKED

### Error Handling
- PromptApiClient with 60s timeout
- Resilience4j: @Retry + Circuit Breaker per LLM

### Retry Backoff
- OpenAI/Grok: 500ms → 1s → 2s
- Claude/Gemini/Perplexity: 5s → 10s → 20s

### Database
- **Flyway migrations:** `llm_responses` table
  - Includes nullable `snapshot_id` column (for future Epic 7 snapshot support)

### Kafka Topics
- `kafka-questions-{openai,gemini,claude,grok,perplexity}` (input)
- `kafka-responses` (output)

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Blocks:** Story 3.2 (Real-Time Progress), Story 3.3 (Visibility Enrichment)
