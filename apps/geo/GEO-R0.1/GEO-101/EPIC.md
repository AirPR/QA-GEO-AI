# Epic GEO-101: Dashboard — Category Views & Actions Center

**Epic ID:** GEO-101  
**Titre:** EPIC-005: Dashboard — Category Views & Actions Center  
**Statut:** In Progress  
**Assigné à:** Youssef.AitLaydi  
**Créée le:** 2026-03-18  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-101

## 📋 Vue d'ensemble

L'utilisateur analyse chaque catégorie en détail et voit les zones d'amélioration avec Priority Source Targets.

### Objectif principal

Permettre aux utilisateurs de :
- Naviguer et analyser les données par catégorie spécifique
- Comprendre la performance pour chaque catégorie avec des KPIs scoped
- Identifier les domaines clés à cibler pour amélioration en utilisant les Improvement Areas détaillées
- Créer un plan d'action concret avec Priority Source Targets

## 🎯 Stories incluses (8 stories)

### Category Views (Stories 5.1 - 5.3)

| ID | Titre | Statut |
|----|-------|--------|
| GEO-70 | [Story 5.1] Category View — Perception Summary & KPI Cards | ✅ Done |
| GEO-69 | [Story 5.1b] Category View — Brand Prioritization Matrix | To Do |
| GEO-68 | [Story 5.1c] Category View — Brand Rankings | To Do |
| GEO-67 | [Story 5.2] Category View — Unified Questions Table | ✅ Done |
| GEO-66 | [Story 5.3] Category View — Perception Topics & Citation Sources | To Do |

### Actions Center (Stories 5.4 - 5.5)

| ID | Titre | Statut |
|----|-------|--------|
| GEO-65 | [Story 5.4] Actions Center — Visibility Improvements Display | ✅ Done |
| GEO-64 | [Story 5.4b] Actions Center — Competitive Improvements Display | To Do |
| GEO-63 | [Story 5.4c] Actions Center — Reputation Improvements Display | ✅ Done |
| GEO-62 | [Story 5.5] Actions Center — Priority Source Targets & Detail Panel | Backlog |

## 🏗️ Architecture du Dashboard — Category Views & Actions Center

```
Dashboard Overview (GEO-102)
├── Category Views (GEO-101, Stories 5.1-5.3)
│   ├── Story 5.1: Perception Summary & KPI Cards
│   ├── Story 5.1b: Brand Prioritization Matrix
│   ├── Story 5.1c: Brand Rankings
│   ├── Story 5.2: Unified Questions Table
│   └── Story 5.3: Perception Topics & Citation Sources
│
└── Actions Center (GEO-101, Stories 5.4-5.5)
    ├── Story 5.4: Visibility Improvements Display
    ├── Story 5.4b: Competitive Improvements Display
    ├── Story 5.4c: Reputation Improvements Display
    └── Story 5.5: Priority Source Targets & Detail Panel
```

## 📊 Statut détaillé

- **Stories complétées:** 4 (Stories 5.1, 5.2, 5.4, 5.4c)
- **Stories en To Do:** 4 (Stories 5.1b, 5.1c, 5.3, 5.4b)
- **Stories en Backlog:** 1 (Story 5.5)

## 🔗 Dépendances

**Dépend de:**
- GEO-102 (Dashboard Overview & Navigation) — pour la navigation de base
- GEO-103 (Analysis Execution) — Story 3.5b pour les Improvement Areas pré-calculées

**Est dépendance de:**
- Aucune pour le moment (complète la suite du dashboard)

## 💡 Points clés

- **Analyse par catégorie** — Permet une inspection détaillée de la performance de chaque catégorie
- **5 KPIs scoped** — Les mêmes métriques que l'Overview mais filtrées par catégorie
- **Questions Table** — Montre toutes les questions avec les réponses par LLM pour chaque catégorie
- **Improvement Areas** — Affiche les zones d'amélioration pré-calculées (Visibility, Competitive, Reputation)
- **Priority Source Targets** — Identifie les domaines prioritaires à cibler avec les KPIs associés
- **Responsive Design** — Compatible avec plusieurs résolutions d'écran
- **Market & LLM Filters** — Tous les éléments respectent les filtres appliqués au niveau du rapport

## 📚 Documentation additionnelle

- Lisez `README.md` pour la vue d'ensemble du projet
- Lisez `INDEX.md` pour naviguer les fichiers
- Lisez chaque `STORY_X.X.md` pour les détails techniques
- Consultez `epic-data.json` pour les données structurées
