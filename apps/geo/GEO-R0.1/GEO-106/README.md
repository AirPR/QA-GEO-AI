# Epic GEO-106: Foundation Infrastructure

Données importées depuis Jira pour l'epic **GEO-106: EPIC-000 Foundation Infrastructure**

## 📋 Structure du Projet

### Documents Principaux

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic GEO-106 |
| **STORY_0.1_Shared_Infrastructure_Setup.md** | Story 0.1 - Shared Infrastructure Setup |
| **STORY_0.2_Database_Forward_Migrations_Seed_Data.md** | Story 0.2 - Database Forward Migrations + Seed Data |

## 🎯 Epic Overview

### EPIC-000: Foundation Infrastructure (GEO-106)

**Statut:** ✅ Done

Setup des composants d'infrastructure partagés nécessaires à tous les Epics.

### Stories

| ID | Titre | Statut | Lien |
|----|-------|--------|------|
| GEO-98 | [Story 0.1] Shared Infrastructure Setup | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-98) |
| GEO-108 | [Story 0.2] Database Forward Migrations + Seed Data | ✅ Done | [Voir](https://onclusive.atlassian.net/browse/GEO-108) |

## 📊 Architecture Foundation Infrastructure

```
Foundation Infrastructure (GEO-106, Stories 0.1-0.2)
├── Story 0.1: Shared Infrastructure Setup
│   ├── PromptApiClient + WebClient configuration
│   ├── PromptTemplateRegistrar
│   ├── EmailService + SendGrid skeleton
│   ├── KafkaConfig with 8 topics
│   ├── RedisConfig for rate limiting
│   ├── Resilience4j CircuitBreaker per LLM
│   ├── Flyway baseline
│   └── geo-flink-jobs Maven module (Flink 1.20)
│
└── Story 0.2: Database Forward Migrations + Seed Data
    ├── 8 Flyway migrations (4 config-manager, 4 analysis-processor)
    ├── JPA entities with @SQLRestriction
    ├── Spring Data repositories
    ├── All missing enums
    └── Complete BMW report seed (2 markets, 3 categories, ~96 questions)
```

## 📌 Accès Direct Jira

- **Epic:** https://onclusive.atlassian.net/browse/GEO-106
- **Projet:** https://onclusive.atlassian.net/browse/GEO

## 💡 Points Clés

- **2 stories** couvrant infrastructure complète
- **Shared Infrastructure** — PromptApiClient, EmailService, KafkaConfig, RedisConfig, CircuitBreaker
- **Database Setup** — 8 migrations pour 8 tables
- **JPA Entities** — Avec héritage et multi-tenant support (@SQLRestriction)
- **Seed Data** — BMW report complet sans UI wizard
- **Enable Parallel Development** — Epic 2 et Epic 3 peuvent démarrer en parallèle
- **2 stories complétées** — Epic entièrement livrée
