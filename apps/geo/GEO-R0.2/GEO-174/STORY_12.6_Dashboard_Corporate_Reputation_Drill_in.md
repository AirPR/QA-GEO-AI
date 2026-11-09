# Story 12.6: Dashboard — Corporate Reputation Drill-in Panel (On-Demand LLM)

**Story ID:** GEO-189
**Titre:** Story 12.6: Dashboard — Corporate Reputation Drill-in Panel (On-Demand LLM)
**Statut:** Done
**Epic:** GEO-174 (EPIC-012)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-189
**Dépend de:** Story 12.5 (GEO-188)

## User Story

**As** an Editor  
**I want** to click a Corporate Reputation card to see a drill-in panel with on-demand LLM-consolidated insights and per-LLM raw breakdowns  
**So that** I can identify perception gaps between AI engines for each dimension

## Acceptance Criteria

1. **Given** Editor clicks a Corporate Reputation card, **When** first time (no cache), **Then** panel slide-out s'ouvre avec loading state "Analyzing dimension..."; appel LLM on-demand (Gemini via Bifrost) déclenché pour consolider les bullets; prompt utilise Insight Consolidation prompt (PRD V0.2 Appendix), scoped à la dimension cliquée

2. **Given** on-demand LLM consolidation call completes, **When** panel shows results, **Then** dimension name, sentiment badge, jusqu'à 3 insights consolidés (label 4-5 mots Title Case + détail max 120 chars); résultats cachés avec clé `(reportId, snapshotId, dimension, marketCode, llmKeys)`; cache invalidé à chaque nouvelle exécution planifiée

3. **Given** Editor clicks dimension card with cached results, **When** panel opens, **Then** résultats cachés servis en moins de 500ms (NFR-BI3); aucun appel LLM déclenché

4. **Given** on-demand LLM call fails, **When** fallback activé, **Then** panel montre les 3 premiers bullets raw uniques avec labels vides; indicateur d'erreur "Consolidation unavailable — showing raw data"

5. **Given** drill-in panel in aggregated view (tab "All"), **When** displayed, **Then** vue consolidée (from on-demand LLM)

6. **Given** user switches to specific LLM tab, **When** panel shows content, **Then** raw `raw_response` array de ce LLM affiché directement (pas de consolidation); sources citées spécifiques à ce LLM

7. **Given** only one LLM enabled, **When** panel opens, **Then** seul l'onglet "All" visible

8. **Given** cited sources, **When** displayed, **Then** dédupliquées par URL; news sources: url, title, publisher, published_date; other sources: url, title, optional channel

9. **Given** Editor changes market filter while panel is open, **When** filter changes, **Then** panel se ferme automatiquement

10. **Given** user closes panel, **When** closed, **Then** slide fermé; focus retourne aux cartes

## Key Design Decision

Tab "All" = consolidated (on-demand LLM). Onglets par-LLM = données raw stockées.

## Technical Details

- **FRs couverts:** FR32c, FR38-ext
- **NFRs couverts:** NFR-BI3
- **Scope:** Frontend + Backend (endpoint on-demand + cache)
- **Estimation:** ~3 jours
- **Dépend de:** Story 12.5

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
