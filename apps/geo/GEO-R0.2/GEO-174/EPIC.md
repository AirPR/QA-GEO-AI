# EPIC-012: Brand Identity (V0.2)

**Epic ID:** GEO-174
**Statut:** In Progress
**Assigné à:** Youssef.AitLaydi
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-174

## Description

PRD for V0.2 - Brand Identity. Nouvelle couche montrant comment les moteurs IA perçoivent la marque au-delà des catégories produits, à travers 4 dimensions de réputation corporate.

### Ce que V0.2 ajoute
- **Brand Image Analysis** — 10 questions ouvertes par marché sur 4 dimensions de réputation corporate
- **Corporate Reputation Pillars** — 4 cartes de dimension (Brand Image, Employer Brand, ESG/Sustainability, Leadership) avec sentiment, insights, drill-in par LLM
- **Brand Territory** — Packed bubble chart montrant les associations catégorielles spontanées
- **Identity/Performance/Sources Layout** — 3 sections en scroll continu avec navigation sticky par onglets

## Stories Associées

### Wizard (Configuration)
1. **[Story 12.1] Wizard — Brand Image Tab & Rename Sentiment Tab** (GEO-184) ✅ Done
   - Onglet Brand Image dans Step 3, 10 questions par défaut, renommage Sentiment → Reputation

### Pipeline (Backend)
2. **[Story 12.2] Pipeline — Brand Image Dispatch** (GEO-185) ✅ Done
   - Dispatch des questions brand image vers tous les LLMs avec instruction système dédiée

3. **[Story 12.3] Pipeline — Brand Image Aggregation & Territory Normalization** (GEO-186) ✅ Done
   - Agrégation par vote majoritaire + normalisation Brand Territory via Gemini

### Dashboard (Frontend)
4. **[Story 12.4] Dashboard — Layout Identity / Performance / Sources** (GEO-187) ✅ Done
   - Réorganisation en 3 sections avec navigation sticky

5. **[Story 12.5] Dashboard — Corporate Reputation Cards** (GEO-188) ✅ Done
   - 4 cartes de dimension en grille 2x2 avec sentiment et insights consolidés

6. **[Story 12.6] Dashboard — Corporate Reputation Drill-in Panel** (GEO-189) ✅ Done
   - Panel latéral on-demand avec consolidation LLM et breakdown par LLM

7. **[Story 12.7] Dashboard — Brand Territory Chart** (GEO-190) ✅ Done
   - Packed bubble chart avec détail panel par territoire

8. **[Story 12.8] Backward Compatibility — V0.1 Reports** (GEO-191) ✅ Done
   - Graceful degradation pour les rapports V0.1 sans données brand image

### Rétrospective
9. **Retrospective Epic 12** (GEO-194) ✅ Done
   - Décisions architecturales, dette technique identifiée, décisions PM
