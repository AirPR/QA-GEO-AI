# GEO-174 — PRD for V0.2: Brand Identity

**Epic:** EPIC-012 — Brand Identity (V0.2)
**Projet:** GEO — AI Presence Module
**Statut:** In Progress
**Version:** 0.2 (release date: 2026-04-17)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-174

---

## Objectif

Introduire une couche "Brand Identity" dans l'AI Presence Module, permettant aux Editors de comprendre comment les moteurs IA perçoivent leur marque à travers 4 dimensions de réputation corporate, les associations catégorielles spontanées (Brand Territory), et une réorganisation de la navigation du dashboard.

---

## Architecture

### Nouvelles fonctionnalités
```
Wizard Step 3
  └── Brand Image Tab (10 questions par marché)
         ↓
Pipeline Phase 1
  └── Dispatch questions → 5 LLMs (Bifrost)
         ↓
Aggregation
  └── Majority-vote sentiment + Gemini territory normalization
         ↓
Dashboard — Overview Identity Section
  ├── Corporate Reputation Cards (2x2 grid)
  │   └── Drill-in Panel (on-demand Gemini consolidation)
  └── Brand Territory Chart (packed bubbles)
```

### Layout restructuré (Overview & Category Views)
```
[Identity]     ← Corporate Reputation + Brand Territory + AI Perception
[Performance]  ← KPI cards, Matrix, Brand Rankings (V0.1 unchanged)
[Sources]      ← Citation Sources, Executive Summary (V0.1 unchanged)
```

---

## Stories

| Story | Jira | Scope | Statut |
|-------|------|-------|--------|
| 12.1 Wizard Brand Image Tab | GEO-184 | Frontend + Backend + DB | ✅ Done |
| 12.2 Pipeline Brand Image Dispatch | GEO-185 | Backend + Flink + DB | ✅ Done |
| 12.3 Pipeline Aggregation & Territory | GEO-186 | Backend (enrichment) | ✅ Done |
| 12.4 Dashboard Layout Identity | GEO-187 | Frontend only | ✅ Done |
| 12.5 Dashboard Corporate Reputation Cards | GEO-188 | Frontend | ✅ Done |
| 12.6 Dashboard Drill-in Panel | GEO-189 | Frontend + Backend | ✅ Done |
| 12.7 Dashboard Brand Territory Chart | GEO-190 | Frontend | ✅ Done |
| 12.8 Backward Compatibility | GEO-191 | Frontend + Backend | ✅ Done |

---

## Décisions Architecturales Clés

| ID | Décision |
|----|----------|
| DA1 | BRAND_IMAGE est brand-level (`category_id = NULL`) |
| DA2 | JSON nested `{ "dimensions": {...} }` + `raw_response` en array JSON |
| DA3 | `CounterState.serialVersionUID` doit être incrémenté à chaque ajout de champ (RocksDB) |
| DA4 | Majority-vote sentiment : nulls exclus, égalité → mixed, tout-null → null |
| DA5 | Cache clé drill-in inclut `snapshotId` → invalidation naturelle par nouvelle exécution |

---

## Dette Technique (depuis GEO-194)

| ID | Priorité | Description | Statut |
|----|----------|-------------|--------|
| D1 | High | `@PreAuthorize` manquant sur `/overview/corporate-reputation` | ✅ GEO-195 |
| D2 | High | 7 tests pre-existants en échec | ✅ GEO-196 |
| D3 | Medium | Convention `CounterState.serialVersionUID++` non documentée | ✅ GEO-197 |
| D4 | High | Double source de vérité PromptBuilder / PromptTemplateBuilder | ✅ GEO-198 |
