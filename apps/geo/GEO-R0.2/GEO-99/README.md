# Epic GEO-99: Snapshots & Guided Tour

Données importées depuis Jira pour l'epic **GEO-99: EPIC-007 Snapshots & Guided Tour**

## 📋 Structure du Projet

### Documents Principaux

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic GEO-99 |
| **STORY_7.1_Immutable_Snapshot_Storage.md** | Story 7.1 - Immutable Snapshot Storage |
| **STORY_7.2_Snapshot_Navigation.md** | Story 7.2 - Snapshot Navigation |
| **STORY_7.3_Guided_Tour.md** | Story 7.3 - Guided Tour |

## 🎯 Epic Overview

### EPIC-007: Snapshots & Guided Tour (GEO-99)

**Statut:** Backlog

L'utilisateur navigue entre les snapshots historiques et découvre le produit via un tour guidé.

### Stories

| ID | Titre | Statut | Lien |
|----|-------|--------|------|
| GEO-57 | [Story 7.1] Immutable Snapshot Storage | Backlog | [Voir](https://onclusive.atlassian.net/browse/GEO-57) |
| GEO-56 | [Story 7.2] Snapshot Navigation | Backlog | [Voir](https://onclusive.atlassian.net/browse/GEO-56) |
| GEO-55 | [Story 7.3] Guided Tour | Backlog | [Voir](https://onclusive.atlassian.net/browse/GEO-55) |

## 📊 Architecture Snapshots & Guided Tour

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

## 📌 Accès Direct Jira

- **Epic:** https://onclusive.atlassian.net/browse/GEO-99
- **Projet:** https://onclusive.atlassian.net/browse/GEO

## 💡 Points Clés

- **3 stories** couvrant snapshots et onboarding
- **Immutable Snapshots** — Point-in-time analysis records preserved 12+ months
- **Snapshot Navigation** — Compare results over time with Previous/Next controls
- **Guided Tour** — Interactive onboarding with contextual tooltips
- **Demo Data Support** — Tour works without real report data
- **URL Activation** — Activate tour via `?tour=true` parameter
- **3 stories en Backlog** — Epic planned but not yet prioritized
