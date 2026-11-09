# Index - Epic GEO-103

## 📄 Fichiers du Projet

### 1. **README.md** ⭐ Commencer ici
   - Vue d'ensemble du projet
   - Architecture du pipeline 3 phases
   - Liens rapides vers Jira

### 2. **EPIC.md**
   - Epic GEO-103 complète
   - Synthèse des 6 stories
   - Vue d'ensemble générale

### 3. **STORY_3.1_First_Analysis_Execution.md**
   - Story GEO-87
   - Exécution première analyse (Flink + Kafka)
   - **Statut:** ✅ Done
   - **Dépendances:** Aucune (première story)

### 4. **STORY_3.2_Real_Time_Progress.md**
   - Story GEO-86
   - Suivi progression en temps réel (SSE)
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 3.1

### 5. **STORY_3.3_Visibility_Enrichment.md**
   - Story GEO-85
   - Enrichissement visibilité et découverte concurrents
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 3.1 & 3.2

### 6. **STORY_3.4_Perception_Analysis.md**
   - Story GEO-84
   - Analyse perception et insights réputation
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 3.1 (parallel to 3.3)

### 7. **STORY_3.5_Competitive_Execution.md**
   - Story GEO-83
   - Exécution compétitive et classification sources
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 3.1, 3.2, 3.3, 3.4

### 8. **STORY_3.5b_Improvement_Areas.md**
   - Story GEO-82
   - Calcul zones d'amélioration et cibles sources
   - **Statut:** ⚠️ Abandoned
   - **Dépendances:** Require Story 3.5

### 9. **epic-data.json**
   - Données structurées en JSON
   - Contient toutes les informations détaillées
   - Format: Epic → Stories → Détails techniques
   - Peut être utilisé pour intégration programmée

## 🔗 Liens Jira

- [Epic GEO-103](https://onclusive.atlassian.net/browse/GEO-103)
- [Story GEO-87](https://onclusive.atlassian.net/browse/GEO-87)
- [Story GEO-86](https://onclusive.atlassian.net/browse/GEO-86)
- [Story GEO-85](https://onclusive.atlassian.net/browse/GEO-85)
- [Story GEO-84](https://onclusive.atlassian.net/browse/GEO-84)
- [Story GEO-83](https://onclusive.atlassian.net/browse/GEO-83)
- [Story GEO-82](https://onclusive.atlassian.net/browse/GEO-82)
- [Projet GEO](https://onclusive.atlassian.net/browse/GEO)

## 📊 Progression

```
[✅ Story 3.1] First Analysis Execution
        ↓
[✅ Story 3.2] Real-Time Analysis Progress
        ↓
[✅ Story 3.3] Visibility Enrichment
[✅ Story 3.4] Perception Analysis (parallel)
        ↓
[✅ Story 3.5] Competitive Execution
        ↓
[⚠️ Story 3.5b] Improvement Areas (Abandoned)
```

**Epic Status:** 🟨 **IN PROGRESS** (5 stories done, 1 abandoned)

## 👨‍💼 Détails

- **Epic:** EPIC-003: Pipeline d'Analyse (Batch Execution)
- **Assignés à:** 
  - Abdenasser Aroukhsiss (Stories 3.1, 3.2, 3.5b)
  - Youssef.AitLaydi (Stories 3.3, 3.4, 3.5)
- **Créée le:** 2026-03-18
- **Statut:** In Progress
- **Projet:** GEO

## 💡 Comment Utiliser

1. **Pour une vue d'ensemble:** Lisez `README.md`
2. **Pour l'epic complet:** Ouvrez `EPIC.md`
3. **Pour les détails techniques:** Consultez chaque `STORY_X.X.md`
4. **Pour l'intégration:** Utilisez `epic-data.json`

## 🏗️ Architecture Technique Clé

- **Message Streaming:** Kafka (topics par LLM)
- **Stream Processing:** Flink 1.20 (geo-flink-jobs, Java 21, RocksDB)
- **Real-Time Updates:** SSE (Server-Sent Events)
- **AI Models:** 5 LLMs (OpenAI, Claude, Gemini, Grok, Perplexity)
- **Enrichment:** Gemini (Visibility, Perception)
- **Resilience:** Circuit Breaker, Retries, Idempotence
- **Monitoring:** Progress via kafka-report-status
