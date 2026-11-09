# Epic GEO-100: Manage Scope

Données importées depuis Jira pour l'epic **GEO-100: EPIC-006 Manage Scope**

## 📋 Structure du Projet

### Documents Principaux

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic GEO-100 |
| **STORY_6.1_Manage_Scope_Markets_Categories.md** | Story 6.1 - Markets & Categories |
| **STORY_6.2_Manage_Scope_LLM_Configuration.md** | Story 6.2 - LLM Configuration |

## 🎯 Epic Overview

### EPIC-006: Manage Scope (GEO-100)

**Statut:** ✅ Done

L'utilisateur modifie le périmètre d'un rapport existant (marchés, catégories, configuration LLM).

### Stories

| ID | Titre | Statut | Lien |
|----|-------|--------|------|
| GEO-61 | [Story 6.1] Manage Scope — Markets & Categories | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-61) |
| GEO-60 | [Story 6.2] Manage Scope — LLM Configuration | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-60) |

## 📊 Architecture du Manage Scope

```
Manage Scope (GEO-100, Stories 6.1-6.2)
├── Story 6.1: Markets & Categories Management
│   ├── View current scope with metadata
│   ├── Add/remove markets with quota tracking
│   ├── Add/remove categories
│   └── Changes applied on next scheduled execution
│
└── Story 6.2: LLM Configuration
    ├── Enable/disable LLM engines
    ├── Validate minimum 1 LLM enabled
    └── Changes applied on next scheduled execution
```

## 📌 Accès Direct Jira

- **Epic:** https://onclusive.atlassian.net/browse/GEO-100
- **Projet:** https://onclusive.atlassian.net/browse/GEO

## 💡 Points Clés

- **2 stories** couvrant la gestion complète du scope
- **Markets & Categories** — Ajouter/supprimer avec suivi du quota
- **LLM Configuration** — Activer/désactiver les moteurs LLM
- **Exécution programmée** — Modifications appliquées à la prochaine exécution
- **Validation** — Minimum 1 LLM doit rester activé
- **2 stories complétées** — Epic entièrement livrée
