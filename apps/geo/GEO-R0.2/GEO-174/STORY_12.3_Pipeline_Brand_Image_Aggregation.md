# Story 12.3: Pipeline — Brand Image Aggregation & Territory Normalization

**Story ID:** GEO-186
**Titre:** Story 12.3: Pipeline — Brand Image Aggregation & Territory Normalization
**Statut:** Done
**Epic:** GEO-174 (EPIC-012)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-186
**Dépend de:** Story 12.2 (GEO-185)

## User Story

**As** the System  
**I want** to aggregate brand image responses using majority-vote sentiment and normalize brand territory via a single Gemini call  
**So that** consolidated territory data is ready for dashboard display

## Acceptance Criteria

1. **Given** all brand image responses for a market received, **When** aggregation runs, **Then** per-dimension sentiment dérivé par vote majoritaire sur toutes les réponses (nulls exclus); égalité positive/négative → "mixed"; toutes-nulls → null (not "mixed")

2. **Given** only one LLM enabled, **When** aggregation runs, **Then** réponse de ce seul LLM détermine le sentiment directement

3. **Given** brand territory categories from all questions and all LLMs, **When** territory normalization (single Gemini call via Bifrost), **Then** catégories sémantiquement similaires regroupées sous noms canoniques (1-3 mots); chaque entrée enrichie avec `category_normalized` et `context_normalized`; mention counts sommés par groupe normalisé; chaque catégorie d'entrée apparaît dans exactement un groupe (NFR-BI5)

4. **Given** 3 or fewer unique territory categories, **When** normalization triggered, **Then** appel LLM sauté — correspondance insensible à la casse utilisée; `category_normalized` = `category`, `context_normalized` = `context`

5. **Given** Gemini territory normalization fails, **When** fallback activé, **Then** catégories avec noms identiques en minuscule regroupées; `category_normalized` = raw `category`

6. **Given** full aggregation pipeline completes for a market, **When** measured, **Then** temps total d'agrégation < 15 secondes (NFR-BI1)

## Technical Details

- **FRs couverts:** FR28e, FR28f
- **NFRs couverts:** NFR-BI1, NFR-BI4, NFR-BI5
- **Note:** Seule la normalisation territory s'exécute en batch; la consolidation insights est on-demand (Story 12.6)
- **Scope:** Backend (enrichissement)
- **Estimation:** ~2.5 jours
- **Dépend de:** Story 12.2

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
