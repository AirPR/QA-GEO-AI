# Epic GEO-102: Dashboard — Overview & Navigation

Données importées depuis Jira pour l'epic **GEO-102: EPIC-004 Dashboard**

## 📋 Structure du Projet

### Documents Principaux

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic GEO-102 |
| **STORY_4.1_Dashboard_Layout.md** | Story 4.1 - Layout et navigation sidebar |
| **STORY_4.2_Market_LLM_Filters.md** | Story 4.2 - Filtres marché et LLM |
| **STORY_4.3_KPI_Cards.md** | Story 4.3 - 5 KPI Cards |
| **STORY_4.4_Prioritization_Matrix.md** | Story 4.4 - Matrice priorisation |
| **STORY_4.5_Brand_Rankings.md** | Story 4.5 - Classement des marques |
| **STORY_4.5b_Top_Concepts.md** | Story 4.5b - Concepts clés |
| **STORY_4.6_Citation_Sources.md** | Story 4.6 - Sources de citation |
| **STORY_4.7_Perception_Summary.md** | Story 4.7 - Résumé perception |
| **STORY_4.8_Executive_Summary.md** | Story 4.8 - Résumé exécutif |
| **STORY_4.9_Report_Deletion.md** | Story 4.9 - Suppression rapport |
| **TEST_MANUAL.md** | Tests manuels du dashboard |

## 🎯 Epic Overview

### EPIC-004: Dashboard — Overview & Navigation (GEO-102)

**Statut:** 🟨 In Progress

L'utilisateur consulte les KPIs agrégés, la matrice de priorisation, les Brand Rankings, Top Concepts, AI Citation Sources. Filtrage par marché et LLM. Perception Summary et Executive Summary générés à la demande.

### Stories

| ID | Titre | Statut | Lien |
|----|-------|--------|------|
| GEO-79 | [Story 4.1] Dashboard Layout & Sidebar | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-79) |
| GEO-78 | [Story 4.2] Market & LLM Filters | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-78) |
| GEO-107 | [Story 4.3] 5 KPI Cards | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-107) |
| GEO-77 | [Story 4.4] Prioritization Matrix | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-77) |
| GEO-76 | [Story 4.5] Brand Rankings | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-76) |
| GEO-75 | [Story 4.5b] Top Concepts | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-75) |
| GEO-74 | [Story 4.6] Citation Sources | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-74) |
| GEO-73 | [Story 4.7] Perception Summary | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-73) |
| GEO-72 | [Story 4.8] Executive Summary | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-72) |
| GEO-71 | [Story 4.9] Report Deletion | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-71) |
| GEO-120 | Tests Manuels | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-120) |

## 📊 Architecture du Dashboard

```
Dashboard Overview
├── Sidebar Navigation (Story 4.1)
├── Market & LLM Filters (Story 4.2)
│
└── Overview Page
    ├── 5 KPI Cards (Story 4.3)
    ├── Category Prioritization Matrix (Story 4.4)
    ├── Brand Rankings (Story 4.5)
    ├── Top Concepts (Story 4.5b)
    ├── AI Citation Sources (Story 4.6)
    ├── Perception Summary On-Demand (Story 4.7)
    ├── Executive Summary (Story 4.8)
    └── Report Deletion (Story 4.9)
```

## 📌 Accès Direct Jira

- **Epic:** https://onclusive.atlassian.net/browse/GEO-102
- **Projet:** https://onclusive.atlassian.net/browse/GEO

## 💡 Points Clés

- **10 stories** couvrant l'ensemble du dashboard
- **Sidebar navigation** avec 4 sections (Overview, Actions Center, Category Views, Settings)
- **Filtres flexibles** par marché (Master ou spécifique) et LLM (min 1)
- **5 KPIs** avec formules détaillées et seuils de qualité
- **Matrice** SOV vs Win Rate avec 4 quadrants
- **Brand Rankings** groupés par famille de marque
- **Concepts d'IA** avec distribution de sentiment
- **11 catégories** de sources de citation
- **Perception Summary** à la demande avec cache (4 niveaux)
- **Executive Summary** généré une fois par exécution
- **Tests manuels** couvrant 9 use cases
