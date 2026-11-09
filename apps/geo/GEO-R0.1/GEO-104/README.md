# Epic GEO-104: Configuration de Rapport (Wizard 4 étapes)

Données importées depuis Jira pour l'epic **GEO-104: EPIC-002 Configuration de Rapport**

## 📋 Structure du Projet

### Documents Principaux

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic GEO-104 |
| **STORY_2.1_Wizard_Layout.md** | Story 2.1 - Disposition et navigation wizard |
| **STORY_2.1b_Brand_Search.md** | Story 2.1b - Recherche de marque Brandfetch |
| **STORY_2.1c_Market_Configuration.md** | Story 2.1c - Configuration des marchés |
| **STORY_2.2_AI_Category_Discovery.md** | Story 2.2 - Découverte IA des catégories |
| **STORY_2.3_Prompts_Review.md** | Story 2.3 - Revue et personnalisation des prompts |
| **STORY_2.4_Review_Submit.md** | Story 2.4 - Révision et soumission |
| **STORY_2.5_Quota_Validation.md** | Story 2.5 - Validation quotas et warnings |
| **TEST_MANUAL.md** | Tests manuels du wizard complet |

## 🎯 Epic Overview

### EPIC-002: Configuration de Rapport (Wizard 4 étapes) (GEO-104)

**Statut:** 🟨 In Progress

L'éditeur peut configurer un rapport complet via le wizard : marque (Brandfetch), pays avec langue auto-détectée, catégories IA, questions (perception/visibility/competitive), sélection des LLMs. Sauvegarde atomique avec validation de quotas.

### Stories

| ID | Titre | Statut | Lien |
|----|-------|--------|------|
| GEO-94 | [Story 2.1] Wizard Layout & Navigation | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-94) |
| GEO-93 | [Story 2.1b] Brand Search (Brandfetch) | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-93) |
| GEO-92 | [Story 2.1c] Market Configuration | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-92) |
| GEO-91 | [Story 2.2] AI Category Discovery | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-91) |
| GEO-90 | [Story 2.3] Prompts Review | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-90) |
| GEO-89 | [Story 2.4] Review & Submit | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-89) |
| GEO-88 | [Story 2.5] Quota Validation | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-88) |
| GEO-119 | Configuration Tests Manuels | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-119) |

## 📊 Architecture du Wizard

```
Étape 1: Brand & Country Configuration
├── Story 2.1: Wizard Layout & Navigation
├── Story 2.1b: Brand Search (Brandfetch)
└── Story 2.1c: Market Configuration (Country + Language)
        ↓
Étape 2: AI Category Discovery
└── Story 2.2: Step 2 — AI Category Discovery
        ↓
Étape 3: Prompts Review
└── Story 2.3: Step 3 — Prompts Review
        ↓
Étape 4: Review & Submit
├── Story 2.4: Step 4 — Review & Submit Configuration
└── Story 2.5: Quota Validation & Warning System (Cross-cutting)
```

## 👤 Assignation

Toutes les stories sont assignées à: **Youssef.AitLaydi**

## 📌 Accès Direct Jira

- **Epic:** https://onclusive.atlassian.net/browse/GEO-104
- **Projet:** https://onclusive.atlassian.net/browse/GEO

## 💡 Points Clés

- **Wizard 4 étapes** avec navigation fluide
- **Brandfetch integration** pour recherche de marques
- **AI-powered category discovery** avec Gemini Flash Lite
- **Multi-market support** avec langue auto-détectée
- **Atomic save** avec double validation quotas
- **Quota management** avec warnings et blocking
- **LLM selection** avec smart-select (jamais 0 active)
