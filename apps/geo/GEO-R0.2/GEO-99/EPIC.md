# Epic GEO-99: Snapshots & Guided Tour

**Epic ID:** GEO-99  
**Titre:** EPIC-007: Snapshots & Guided Tour  
**Statut:** Backlog  
**Assigné à:** Youssef.AitLaydi  
**Créée le:** 2026-03-18  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-99

## 📋 Vue d'ensemble

L'utilisateur navigue entre les snapshots historiques et découvre le produit via un tour guidé.

### Objectif principal

Permettre aux utilisateurs de :
- Stocker et préserver les résultats d'analyse comme snapshots immuables
- Naviguer entre les snapshots historiques pour comparer les résultats
- Découvrir le produit via un tour guidé interactif

## 🎯 Stories incluses (3 stories)

| ID | Titre | Statut |
|----|-------|--------|
| GEO-57 | [Story 7.1] Immutable Snapshot Storage | Backlog |
| GEO-56 | [Story 7.2] Snapshot Navigation | Backlog |
| GEO-55 | [Story 7.3] Guided Tour | Backlog |

## 🏗️ Architecture Snapshots & Guided Tour

```
Snapshots & Guided Tour (GEO-99, Stories 7.1-7.3)
├── Story 7.1: Immutable Snapshot Storage
│   ├── Create snapshots on analysis completion
│   ├── Store executedAt, totalQuestions, successCount, failedCount
│   ├── Store configSnapshot with resolved competitor names
│   ├── Ensure immutability (never modified after creation)
│   └── Retain snapshots for 12+ months
│
├── Story 7.2: Snapshot Navigation
│   ├── Previous/Next controls for snapshot navigation
│   ├── Dashboard data reflects selected snapshot
│   ├── Display current snapshot date
│   └── Preserve filters across navigation
│
└── Story 7.3: Guided Tour
    ├── Activate via URL parameter
    ├── Navigate across Overview, Actions Center, Category views
    ├── Contextual tooltips for each step
    ├── 8-12 steps total
    ├── Allow advance or skip steps
    └── Use demo data if no real report exists
```

## 📊 Statut détaillé

- **Stories complétées:** 0
- **Stories en To Do:** 0
- **Stories en Backlog:** 3 (Stories 7.1, 7.2, 7.3)

## 🔗 Dépendances

**Dépend de:**
- GEO-101 (Dashboard Category Views & Actions Center) — for snapshot context
- GEO-102 (Dashboard Overview & Navigation) — for tour navigation

**Est dépendance de:**
- Aucune dépendance externe

## 💡 Points clés

- **Immutable Snapshots** — Point-in-time records of analysis execution preserved for 12+ months
- **Historical Comparison** — Navigate between snapshots with Previous/Next controls
- **Guided Tour** — Onboarding experience for new users with contextual tooltips
- **Demo Data Support** — Use demo data if no real report exists
- **URL Parameters** — Activate tour via `?tour=true` parameter
- **3 stories en Backlog** — Epic planned but not yet prioritized for development

## 📚 Documentation additionnelle

- Lisez `README.md` pour la vue d'ensemble du projet
- Lisez `INDEX.md` pour naviguer les fichiers
- Lisez chaque `STORY_X.X.md` pour les détails techniques
- Consultez `epic-data.json` pour les données structurées
