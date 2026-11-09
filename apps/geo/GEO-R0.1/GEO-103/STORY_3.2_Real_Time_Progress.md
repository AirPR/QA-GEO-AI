# Story 3.2: Real-Time Analysis Progress

**Story ID:** GEO-86  
**Titre:** [Story 3.2] Real-Time Analysis Progress  
**Statut:** Done  
**Assigné à:** Abdenasser Aroukhsiss  
**Epic:** GEO-103 (EPIC-003)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-86

## User Story

**As** an Editor  
**I want** to see my analysis progressing in real-time  
**So that** I know the execution is advancing and which LLMs have completed

## Acceptance Criteria

1. **Given** an Editor viewing a report during analysis, **When** they connect to SSE endpoint, **Then** they receive progress events:
   - `{ type: "progress", progress: 0-100, completedModels, pendingModels }`

2. **Given** Flink counting responses via `keyBy(reportId)` + RocksDB, **When** every ~10 responses, **Then** progress event published to `kafka-report-status`

3. **Given** analysis completes, **When** it finishes, **Then** Editor receives:
   - `{ type: "complete", status: "COMPLETED"/"COMPLETED_PARTIAL"/"FAILED" }`

4. **Given** SSE connection drops, **When** client reconnects, **Then**:
   - Current state received immediately
   - Heartbeat every 30s
   - Max 5 connections/key
   - TTL 30min

## Technical Details

### API Endpoint
- **GET** `/api/v1/reports/{id}/progress` (requires READER role)

### Flink State
- RocksDB state:
  - `visibility_count`
  - `perception_count`
  - `phase2_count`
  - `processedIds` (for idempotence via dedup by responseId)

### Frontend
- SseProgress component with per-LLM progress bars

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 3.1 (First Analysis Execution)
- **Blocks:** Story 3.3 (Visibility Enrichment)
