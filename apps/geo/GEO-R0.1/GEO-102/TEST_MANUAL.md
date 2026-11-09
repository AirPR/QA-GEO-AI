# Test Manual: Dashboard — Overview & Navigation

**Story ID:** GEO-120  
**Titre:** Dashboard — Overview & Navigation — Tests manuels  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-120

## Objectif

Valider manuellement l'ensemble du dashboard Overview et sa navigation : sidebar, filtres marché/LLM, les 5 KPI cards, la matrice de priorisation, les Brand Rankings, Top Concepts, AI Citation Sources, le Perception Summary à la demande, l'Executive Summary et la suppression de rapport. Ces tests vérifient les interactions navigateur, la cohérence des données affichées, le comportement des filtres et le responsive.

## Use Cases à tester

### UC-01 — Layout du Dashboard et navigation Sidebar

**Étapes:**
1. Accéder au dashboard d'un rapport complété
2. Vérifier que la sidebar affiche : Overview, Actions Center, Category Views, Settings
3. Cliquer sur chaque item et vérifier le changement de contenu (SPA)
4. Vérifier que les pages chargent en moins de 2 secondes
5. Naviguer entre les vues et vérifier que l'état des filtres persiste

**Résultat attendu:** La sidebar fonctionne, navigation fluide (SPA), filtres persistent.

### UC-02 — Filtres Market & LLM

**Étapes:**
1. Vérifier le filtre marché par défaut "Master (All Markets)"
2. Sélectionner un marché spécifique et vérifier la mise à jour des KPIs
3. Désélectionner un LLM et vérifier le recalcul
4. Tenter de désélectionner tous les LLMs (doit rester au moins 1)
5. Naviguer avec filtres actifs et vérifier la persistance

**Résultat attendu:** Filtres corrects, min 1 LLM respecté, persistance confirmée.

### UC-03 — 5 KPI Cards

**Étapes:**
1. Vérifier les 5 cards: SOV, Visibility, Avg Position, Win Rate, Sentiment
2. Vérifier les labels de qualité (Good/Fair/Poor)
3. Appliquer un filtre marché et vérifier la mise à jour
4. Appliquer un filtre LLM et vérifier le recalcul

**Résultat attendu:** Les 5 KPIs affichent les bonnes valeurs avec labels corrects.

### UC-04 — Matrice de priorisation des catégories

**Étapes:**
1. Vérifier SOV en X et Win Rate en Y
2. Vérifier les 4 quadrants (Stars, Opportunity, At Risk, Monitor)
3. Vérifier les seuils: SOV 50%, Win Rate 50%
4. Survoler un point et vérifier le tooltip

**Résultat attendu:** La matrice affiche les 4 quadrants correctement.

### UC-05 — Brand Rankings et Top Concepts

**Étapes:**
1. Vérifier Brand Rankings: rang, brand (logo), SOV%, Visibility%, Avg Position, LLM Choice%
2. Vérifier les logos (Brandfetch) avec fallback first-letter avatar
3. Naviguer vers Top Concepts et vérifier: nom, sentiment distribution, fréquence
4. Appliquer des filtres et vérifier la mise à jour

**Résultat attendu:** Brand Rankings et Top Concepts affichent les colonnes correctes.

### UC-06 — AI Citation Sources

**Étapes:**
1. Vérifier le graphique à barres empilées des 11 catégories
2. Vérifier la table: domaine, type source, favorabilité, citations
3. Vérifier la cohérence entre graphique et table
4. Appliquer des filtres et vérifier la mise à jour

**Résultat attendu:** Graphique et table s'affichent correctement avec 11 catégories.

### UC-07 — Perception Summary et Executive Summary

**Étapes:**
1. Accéder au Perception Summary pour la première fois (état de chargement)
2. Vérifier 3 bullet points (max 150 chars chacun)
3. Revenir et vérifier le chargement instantané (cache)
4. Changer les filtres et vérifier la régénération
5. Accéder à l'Executive Summary et vérifier la structure

**Résultat attendu:** Perception Summary cache fonctionne, Executive Summary structure correcte.

### UC-08 — Suppression de rapport

**Étapes:**
1. Cliquer sur l'action de suppression
2. Vérifier la modale de confirmation
3. Confirmer la suppression
4. Vérifier que le rapport disparaît de la liste
5. Tenter d'accéder au lien partagé (doit retourner 404)

**Résultat attendu:** Rapport soft-deleted, liens retournent 404.

### UC-09 — Responsive et performance

**Étapes:**
1. Tester à ≥1440px (écran large)
2. Tester entre 1024-1439px (écran moyen)
3. Vérifier le comportement sidebar en mode compact
4. Vérifier la fluidité du chargement et des transitions

**Résultat attendu:** Dashboard utilisable à toutes résolutions, transitions fluides.

## Critères d'acceptation

- [ ] Tous les use cases listés sont vérifiés manuellement
- [ ] Aucun bug bloquant ou critique identifié
- [ ] Les résultats sont documentés dans le commentaire de la story

## Notes

- Environnement: staging ou local (localhost:3000/geo)
- Données: rapport avec analyse complétée, 2+ marchés, 3+ catégories, 2+ LLMs
- Vérifier les KPIs avec des valeurs connues pour cohérence des formules
- Perception Summary utilise Gemini — vérifier fallback en cas d'erreur
