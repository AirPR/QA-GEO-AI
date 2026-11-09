# Epic GEO-100: Manage Scope

**Epic ID:** GEO-100  
**Titre:** EPIC-006: Manage Scope  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Créée le:** 2026-03-18  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-100

## 📋 Vue d'ensemble

L'utilisateur modifie le périmètre d'un rapport existant (marchés, catégories, configuration LLM).

### Objectif principal

Permettre aux utilisateurs de :
- Ajouter ou supprimer des marchés d'un rapport existant
- Ajouter ou supprimer des catégories d'un rapport existant
- Activer ou désactiver les moteurs LLM
- Ajuster le périmètre d'analyse sans créer un nouveau rapport

## 🎯 Stories incluses (2 stories)

| ID | Titre | Statut |
|----|-------|--------|
| GEO-61 | [Story 6.1] Manage Scope — Markets & Categories | ✅ Done |
| GEO-60 | [Story 6.2] Manage Scope — LLM Configuration | ✅ Done |

## 🏗️ Architecture Manage Scope

```
Manage Scope (GEO-100, Stories 6.1-6.2)
├── Story 6.1: Markets & Categories Management
│   ├── Add/remove markets with quota tracking
│   ├── Add/remove categories
│   └── Applied on next scheduled execution
│
└── Story 6.2: LLM Configuration
    ├── Enable/disable LLM engines
    ├── Minimum 1 LLM constraint
    └── Applied on next scheduled execution
```

## 📊 Statut détaillé

- **Stories complétées:** 2 (Stories 6.1, 6.2)
- **Stories en To Do:** 0
- **Stories en Backlog:** 0

## 🔗 Dépendances

**Dépend de:**
- Aucune dépendance externe

**Est dépendance de:**
- GEO-102 (Dashboard Overview & Navigation) — pour l'accès à la gestion des paramètres

## 💡 Points clés

- **Modification du périmètre** — Permet l'ajustement du scope sans créer un nouveau rapport
- **Gestion des marchés** — Avec suivi du quota des marchés utilisés
- **Gestion des catégories** — Sans impact sur le quota
- **Configuration LLM** — Activer/désactiver les moteurs avec contrainte d'au moins 1 activé
- **Exécution programmée** — Les modifications sont appliquées à la prochaine exécution programmée
- **Feedback utilisateur** — UI indique clairement quand les changements prendront effet
- **2 stories complétées** — Scope management totalement livré

## 📚 Documentation additionnelle

- Lisez `README.md` pour la vue d'ensemble du projet
- Lisez `INDEX.md` pour naviguer les fichiers
- Lisez chaque `STORY_X.X.md` pour les détails techniques
- Consultez `epic-data.json` pour les données structurées
