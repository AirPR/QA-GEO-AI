# Index - Epic GEO-174

## Fichiers du Projet

### 1. **README.md** ⭐ Commencer ici
   - Vue d'ensemble de la Brand Identity V0.2
   - Architecture pipeline et dashboard
   - Tableau des stories et décisions architecturales

### 2. **EPIC.md**
   - Epic GEO-174 complète
   - Synthèse des 8 stories + rétrospective
   - Vue d'ensemble générale

### 3. **STORY_12.1_Wizard_Brand_Image_Tab.md** — GEO-184
   - Onglet Brand Image dans Step 3 du wizard
   - 10 questions par défaut par marché
   - Renommage Sentiment → Reputation
   - **Statut:** ✅ Done

### 4. **STORY_12.2_Pipeline_Brand_Image_Dispatch.md** — GEO-185
   - Dispatch des questions brand image vers tous les LLMs
   - Instruction système dédiée brand image
   - Schéma JSON de réponse avec 4 dimensions + brand territory
   - **Statut:** ✅ Done | **Dépend de:** Story 12.1

### 5. **STORY_12.3_Pipeline_Brand_Image_Aggregation.md** — GEO-186
   - Agrégation par vote majoritaire du sentiment
   - Normalisation Brand Territory via Gemini
   - **Statut:** ✅ Done | **Dépend de:** Story 12.2

### 6. **STORY_12.4_Dashboard_Layout_Identity.md** — GEO-187
   - Restructuration Overview en 3 sections (Identity / Performance / Sources)
   - Navigation sticky avec IntersectionObserver
   - **Statut:** ✅ Done | **Parallélisable**

### 7. **STORY_12.5_Dashboard_Corporate_Reputation_Cards.md** — GEO-188
   - 4 cartes dimension en grille 2x2
   - Sentiment badge + insights consolidés
   - **Statut:** ✅ Done | **Dépend de:** Story 12.3 + 12.4

### 8. **STORY_12.6_Dashboard_Corporate_Reputation_Drill_in.md** — GEO-189
   - Panel latéral slide-out on-demand
   - Consolidation Gemini + breakdown par LLM
   - Cache par `(reportId, snapshotId, dimension, marketCode, llmKeys)`
   - **Statut:** ✅ Done | **Dépend de:** Story 12.5

### 9. **STORY_12.7_Dashboard_Brand_Territory_Chart.md** — GEO-190
   - Packed bubble chart (D3.js ou @nivo/circle-packing)
   - Détail panel par territoire avec contexte LLM
   - **Statut:** ✅ Done | **Dépend de:** Story 12.3 + 12.4

### 10. **STORY_12.8_Backward_Compatibility.md** — GEO-191
   - Graceful degradation pour rapports V0.1
   - Placeholder Identity section si pas de données brand image
   - **Statut:** ✅ Done | **Dépend de:** Story 12.4

### 11. **epic-data.json**
   - Données structurées en JSON
   - Toutes les stories avec AC et détails techniques

## Liens Jira

- [Epic GEO-174](https://onclusive.atlassian.net/browse/GEO-174)
- [GEO-184](https://onclusive.atlassian.net/browse/GEO-184) — Story 12.1
- [GEO-185](https://onclusive.atlassian.net/browse/GEO-185) — Story 12.2
- [GEO-186](https://onclusive.atlassian.net/browse/GEO-186) — Story 12.3
- [GEO-187](https://onclusive.atlassian.net/browse/GEO-187) — Story 12.4
- [GEO-188](https://onclusive.atlassian.net/browse/GEO-188) — Story 12.5
- [GEO-189](https://onclusive.atlassian.net/browse/GEO-189) — Story 12.6
- [GEO-190](https://onclusive.atlassian.net/browse/GEO-190) — Story 12.7
- [GEO-191](https://onclusive.atlassian.net/browse/GEO-191) — Story 12.8
- [GEO-194](https://onclusive.atlassian.net/browse/GEO-194) — Rétrospective

## Progression

```
[✅ Story 12.1] Wizard — Brand Image Tab
        ↓
[✅ Story 12.2] Pipeline — Brand Image Dispatch
        ↓
[✅ Story 12.3] Pipeline — Aggregation & Territory Normalization
        ↓
[✅ Story 12.4] Dashboard — Layout Identity/Performance/Sources (parallélisable)
        ↓
[✅ Story 12.5] Dashboard — Corporate Reputation Cards
        ↓
[✅ Story 12.6] Dashboard — Drill-in Panel (on-demand)
[✅ Story 12.7] Dashboard — Brand Territory Chart
[✅ Story 12.8] Backward Compatibility V0.1
```

**Epic Status:** 🟨 **IN PROGRESS** (8/8 stories done)
