# Index - Epic GEO-104

## 📄 Fichiers du Projet

### 1. **README.md** ⭐ Commencer ici
   - Vue d'ensemble du projet
   - Architecture du wizard 4 étapes
   - Liens rapides vers Jira

### 2. **EPIC.md**
   - Epic GEO-104 complète
   - Synthèse des 8 items (7 stories + 1 test)
   - Vue d'ensemble générale

### 3. **STORY_2.1_Wizard_Layout.md**
   - Story GEO-94
   - Disposition et navigation du wizard
   - **Statut:** ✅ Done
   - **Dépendances:** Aucune (première story)

### 4. **STORY_2.1b_Brand_Search.md**
   - Story GEO-93
   - Recherche et sélection de marque (Brandfetch)
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 2.1

### 5. **STORY_2.1c_Market_Configuration.md**
   - Story GEO-92
   - Configuration pays + langue auto-détectée
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 2.1b

### 6. **STORY_2.2_AI_Category_Discovery.md**
   - Story GEO-91
   - Découverte IA des catégories pertinentes
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 2.1c

### 7. **STORY_2.3_Prompts_Review.md**
   - Story GEO-90
   - Revue et personnalisation des questions
   - 3 types: Sentiment, Visibility, Competitive
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 2.2

### 8. **STORY_2.4_Review_Submit.md**
   - Story GEO-89
   - Révision du résumé et sélection des LLMs
   - Sauvegarde atomique avec double validation
   - **Statut:** ✅ Done
   - **Dépendances:** Require Story 2.3

### 9. **STORY_2.5_Quota_Validation.md**
   - Story GEO-88
   - Système de validation quotas et warnings
   - S'applique à tous les steps du wizard
   - **Statut:** ✅ Done
   - **Dépendances:** Cross-cutting

### 10. **TEST_MANUAL.md**
   - Story GEO-119
   - Tests manuels complets (8 use cases)
   - Couvre tous les scénarios du wizard
   - **Statut:** ✅ Done
   - **Dépendances:** Validation finale

### 11. **epic-data.json**
   - Données structurées en JSON
   - Contient toutes les informations détaillées
   - Format: Epic → Stories → Détails techniques
   - Peut être utilisé pour intégration programmée

## 🔗 Liens Jira

- [Epic GEO-104](https://onclusive.atlassian.net/browse/GEO-104)
- [Story GEO-94](https://onclusive.atlassian.net/browse/GEO-94)
- [Story GEO-93](https://onclusive.atlassian.net/browse/GEO-93)
- [Story GEO-92](https://onclusive.atlassian.net/browse/GEO-92)
- [Story GEO-91](https://onclusive.atlassian.net/browse/GEO-91)
- [Story GEO-90](https://onclusive.atlassian.net/browse/GEO-90)
- [Story GEO-89](https://onclusive.atlassian.net/browse/GEO-89)
- [Story GEO-88](https://onclusive.atlassian.net/browse/GEO-88)
- [Test Manual GEO-119](https://onclusive.atlassian.net/browse/GEO-119)
- [Projet GEO](https://onclusive.atlassian.net/browse/GEO)

## 📊 Progression

```
[✅ Story 2.1] Wizard Layout & Navigation
        ↓
[✅ Story 2.1b] Brand Search (Brandfetch)
        ↓
[✅ Story 2.1c] Market Configuration
        ↓
[✅ Story 2.2] AI Category Discovery
        ↓
[✅ Story 2.3] Prompts Review
        ↓
[✅ Story 2.4] Review & Submit
        ↓
[✅ Story 2.5] Quota Validation
        ↓
[✅ Test Manual] Complete Wizard Testing
```

**Epic Status:** 🟨 **IN PROGRESS** (7 stories done, tests done, epic ongoing)

## 👨‍💼 Détails

- **Epic:** EPIC-002: Configuration de Rapport (Wizard 4 étapes)
- **Assigné à:** Youssef.AitLaydi
- **Créée le:** 2026-03-18
- **Statut:** In Progress
- **Projet:** GEO

## 💡 Comment Utiliser

1. **Pour une vue d'ensemble:** Lisez `README.md`
2. **Pour l'epic complet:** Ouvrez `EPIC.md`
3. **Pour les détails techniques:** Consultez chaque `STORY_X.X.md`
4. **Pour les tests:** Lisez `TEST_MANUAL.md`
5. **Pour l'intégration:** Utilisez `epic-data.json`
