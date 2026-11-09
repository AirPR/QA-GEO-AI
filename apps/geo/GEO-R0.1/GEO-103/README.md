# Epic GEO-103: Pipeline d'Analyse (Batch Execution)

Données importées depuis Jira pour l'epic **GEO-103: EPIC-003 Pipeline d'Analyse**

## 📋 Structure du Projet

### Documents Principaux

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic GEO-103 |
| **STORY_3.1_First_Analysis_Execution.md** | Story 3.1 - Exécution première analyse |
| **STORY_3.2_Real_Time_Progress.md** | Story 3.2 - Suivi progression temps réel |
| **STORY_3.3_Visibility_Enrichment.md** | Story 3.3 - Enrichissement visibilité |
| **STORY_3.4_Perception_Analysis.md** | Story 3.4 - Analyse perception |
| **STORY_3.5_Competitive_Execution.md** | Story 3.5 - Exécution compétitive |
| **STORY_3.5b_Improvement_Areas.md** | Story 3.5b - Zones d'amélioration (Abandoned) |

## 🎯 Epic Overview

### EPIC-003: Pipeline d'Analyse (Batch Execution) (GEO-103)

**Statut:** 🟨 In Progress

Le système exécute l'analyse sur tous les LLMs en parallèle via Kafka+Flink, enrichit les résultats, notifie en temps réel et par email. Inclut l'exécution hebdomadaire planifiée.

### Stories

| ID | Titre | Statut | Lien |
|----|-------|--------|------|
| GEO-87 | [Story 3.1] First Analysis Execution | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-87) |
| GEO-86 | [Story 3.2] Real-Time Analysis Progress | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-86) |
| GEO-85 | [Story 3.3] Visibility Enrichment | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-85) |
| GEO-84 | [Story 3.4] Perception Analysis | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-84) |
| GEO-83 | [Story 3.5] Competitive Execution | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-83) |
| GEO-82 | [Story 3.5b] Improvement Areas | ⚠️ Abandoned | [Voir](https://onclusive.atlassian.net/browse/GEO-82) |

## 📊 Architecture du Pipeline

```
Phase 1: Exécution
├── Story 3.1: First Analysis Execution (Flink + Kafka)
└── Story 3.2: Real-Time Analysis Progress (SSE)
        ↓
Phase 2: Enrichissement (Parallel)
├── Story 3.3: Visibility Enrichment & Competitor Discovery
└── Story 3.4: Perception Analysis & Reputation Insights
        ↓
Phase 3: Finalisation
├── Story 3.5: Competitive Execution & Source Classification
└── Story 3.5b: Improvement Areas & Priority Source Targets
```

## 👤 Assignation

- **Stories 3.1, 3.2, 3.5b:** Abdenasser Aroukhsiss
- **Stories 3.3, 3.4, 3.5:** Youssef.AitLaydi

## 📌 Accès Direct Jira

- **Epic:** https://onclusive.atlassian.net/browse/GEO-103
- **Projet:** https://onclusive.atlassian.net/browse/GEO

## 💡 Points Clés

- **Kafka + Flink** pour streaming et batch processing
- **5 LLMs** en parallèle avec calibrage des débits
- **Circuit Breaker** par LLM (>5% erreurs = pause 30s)
- **Progress SSE** en temps réel avec caching RocksDB
- **Enrichissement visibilité** avec découverte de concurrents via Gemini
- **Enrichissement perception** avec insights de réputation
- **Classification sources** avec 3 niveaux (regex, cache, Gemini)
- **Improvement detection** avec 8 types (visibility, competitive, reputation)

## 📝 Statuts

- **5 stories complétées** ✅
- **1 story abandonnée** ⚠️
- **Notifications (3.6) et Exécution hebdomadaire (3.7)** non trouvées dans les résultats de recherche
