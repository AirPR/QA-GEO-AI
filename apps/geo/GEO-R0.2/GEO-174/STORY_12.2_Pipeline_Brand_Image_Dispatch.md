# Story 12.2: Pipeline — Brand Image Dispatch

**Story ID:** GEO-185
**Titre:** Story 12.2: Pipeline — Brand Image Dispatch
**Statut:** Done
**Epic:** GEO-174 (EPIC-012)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-185
**Dépend de:** Story 12.1 (GEO-184)

## User Story

**As** the System  
**I want** to dispatch brand image questions to all enabled LLMs with a dedicated system instruction  
**So that** each LLM returns structured data covering 4 corporate dimensions and brand territory

## Acceptance Criteria

1. **Given** report with brand image questions + enabled LLMs, **When** Phase 1 starts, **Then** brand image questions dispatched in parallel alongside visibility and perception questions; each question sent to each enabled LLM via Bifrost with brand image system instruction

2. **Given** brand image question dispatched, **When** LLM response received, **Then** response validated as JSON with schema:
   ```json
   {
     "dimensions": {
       "brand_image": { "sentiment", "raw_response", "sources_news", "sources_other" },
       "employer_brand": {...},
       "esg_sustainability": {...},
       "leadership": {...}
     },
     "brand_territory": [{"category", "context"}]
   }
   ```
   `raw_response` est un array de strings (max 3 items, max 120 chars chacun); `sentiment` est "positive", "mixed", "negative", ou null; réponses malformées rejetées et relancées

3. **Given** valid brand image LLM response, **When** persisted, **Then** JSON raw complet stocké tel quel; données par dimension dans tables normalisées; entrées brand territory stockent `category` + `context` uniquement

4. **Given** LLM returns null for dimension, **When** stored, **Then** null values stored (not skipped)

5. **Given** brand image question dispatched, **When** system instruction sent, **Then** instruction passée via mécanisme system instruction du provider (NOT prepended); user prompt inclut `{question}`, `{entity}`, `{country}`, `{language}`, `{dimensionList}`

6. **Given** report with zero enabled LLMs, **When** pipeline runs, **Then** brand image not dispatched and no error thrown

7. **Given** brand image responses persisted, **When** another organization queries, **Then** zero results returned (isolation tenant complète)

## Technical Details

- **FRs couverts:** FR28b, FR28c, FR28d, FR28g
- **DB:** New Flyway migration — tables normalisées pour dimension data + brand territory
- **Scope:** Backend + Flink + DB migration
- **Estimation:** ~3 jours
- **Dépend de:** Story 12.1

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
