# Test Manual: Configuration de Rapport (Wizard 4 étapes)

**Story ID:** GEO-119  
**Titre:** Configuration de Rapport (Wizard 4 étapes) — Tests manuels  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-104 (EPIC-002)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-119

## Objectif

Valider manuellement l'ensemble du parcours de configuration de rapport via le wizard 4 étapes. Ces tests couvrent:
- Recherche de marque (Brandfetch)
- Configuration des marchés
- Découverte de catégories par IA
- Revue des prompts
- Soumission finale
- Validation des quotas

## Use Cases à tester

### UC-01 — Navigation complète du Wizard (4 étapes)

**Préconditions:** L'utilisateur est connecté en tant qu'Editor, le module est activé, aucun rapport n'existe.

**Étapes:**
1. Cliquer sur "Create Report" depuis la liste des rapports
2. Vérifier que le stepper affiche les 4 étapes
3. Naviguer via les boutons Next/Back entre chaque étape
4. Vérifier que la barre de progression et le titre de l'étape se mettent à jour
5. Vérifier que le footer sticky avec le CTA est visible en permanence
6. Naviguer en arrière avec des modifications non sauvegardées

**Résultat attendu:** Le stepper reflète l'étape courante, les boutons Next/Back fonctionnent correctement, la modale "Discard Changes" (462×222px) apparaît si des changements non sauvegardés existent.

### UC-02 — Recherche de marque Brandfetch et sélection

**Préconditions:** L'utilisateur est sur l'étape 1 du wizard.

**Étapes:**
1. Taper un nom de marque dans le champ de recherche (ex: "BMW")
2. Vérifier que les suggestions apparaissent avec logo + domaine (debounce 300ms)
3. Sélectionner une marque dans les suggestions
4. Vérifier l'option "Custom Brand" si aucune correspondance
5. Ne pas saisir de marque et cliquer "Discover Categories →"

**Résultat attendu:** Les suggestions s'affichent correctement. L'option "Custom Brand" est disponible. Sans marque saisie, le champ affiche une bordure rouge d'erreur.

### UC-03 — Configuration des marchés (Country + Language)

**Préconditions:** Une marque est sélectionnée à l'étape 1.

**Étapes:**
1. Ajouter un premier pays (ex: France) → vérifier la langue auto-détectée (French)
2. Modifier la langue via l'icône d'édition
3. Ajouter un second pays → vérifier que le premier est auto-marqué comme Primary
4. Tenter d'ajouter une combinaison pays+langue en doublon
5. Atteindre la limite de quota de marchés → tenter d'ajouter un pays supplémentaire

**Résultat attendu:** La langue est auto-détectée et modifiable. Le premier marché devient Primary automatiquement. Les doublons affichent une erreur. Le bouton "+ Add Country" est désactivé avec un warning banner à la limite de quota.

### UC-04 — Découverte de catégories par IA (Étape 2)

**Préconditions:** L'utilisateur a configuré sa marque et ses marchés à l'étape 1.

**Étapes:**
1. Passer de l'étape 1 à l'étape 2
2. Vérifier l'écran intermédiaire "Discovering Categories" avec barre de progression
3. Une fois terminé, vérifier que chaque catégorie a un badge "AI GENERATED"
4. Vérifier que les catégories sont affichées dans la langue du marché primaire
5. Cliquer "+ Add Category" et saisir un nom personnalisé
6. Supprimer une catégorie → vérifier la modale de confirmation
7. Tenter de supprimer la dernière catégorie restante

**Résultat attendu:** L'écran de chargement s'affiche correctement. Les badges AI GENERATED et CUSTOM sont visibles. L'ajout et la suppression fonctionnent avec les règles métier (Last One Rule respectée).

### UC-05 — Revue des prompts (Étape 3)

**Préconditions:** Des catégories sont validées à l'étape 2.

**Étapes:**
1. Entrer dans l'étape 3 → vérifier l'état de chargement "Generating questions..."
2. Vérifier les onglets de marché en haut (drapeau + pays + abréviation langue)
3. Vérifier les 3 sous-onglets : Sentiment | Visibility Analysis | Competitive Analysis
4. Vérifier le regroupement par catégorie avec compteur "X QUESTIONS" et bouton "Reset"
5. Survoler une question → vérifier les icônes crayon + corbeille
6. Modifier une question en ligne (Enter pour sauver, Escape pour annuler)
7. Supprimer une question → vérifier le toast d'annulation (5s)
8. Soumettre une question sans "?" → vérifier l'ajout automatique
9. Soumettre une question vide → vérifier le rejet et la restauration

**Résultat attendu:** Le chargement, les onglets, l'édition inline, la suppression avec undo, l'auto-append "?" et le rejet des questions vides fonctionnent conformément aux spécifications.

### UC-06 — Revue finale et soumission (Étape 4)

**Préconditions:** Les prompts sont configurés à l'étape 3.

**Étapes:**
1. Accéder à l'étape 4 → vérifier le titre "Ready to analyze {Brand}"
2. Vérifier les 3 cartes de résumé : Countries, Categories, Total Questions
3. Vérifier les toggles LLM avec checkbox "Web search" par LLM
4. Vérifier les valeurs par défaut : Gemini ON, ChatGPT ON
5. Désélectionner tous les LLMs → vérifier le Smart-Select (réactivation de tous)
6. Cliquer "Review & Launch 🚀" → vérifier la sauvegarde atomique

**Résultat attendu:** Le résumé affiche les bonnes valeurs. Les toggles LLM et le Smart-Select fonctionnent. La soumission lance l'analyse et redirige vers la page du rapport.

### UC-07 — Validation des quotas et warnings

**Préconditions:** L'utilisateur est dans le wizard, proche des limites de quota.

**Étapes:**
1. Ajouter des marchés jusqu'à la limite max_brand_markets
2. Ajouter des catégories jusqu'à la limite max_categories
3. Ajouter des questions au-delà des limites par type
4. Vérifier les banners d'avertissement à chaque dépassement

**Résultat attendu:** Des banners d'avertissement clairs s'affichent avec les compteurs used/max. Les actions au-delà des limites sont bloquées ou signalées.

### UC-08 — Responsive et résolutions d'écran

**Préconditions:** Le wizard est ouvert.

**Étapes:**
1. Tester à résolution ≥1280px → vérifier l'affichage complet
2. Tester entre 1024-1279px → vérifier le mode compact
3. Tester en dessous de 1024px → vérifier le message de blocage

**Résultat attendu:** L'affichage s'adapte correctement aux 3 breakpoints définis.

## Critères d'acceptation

- [ ] Tous les use cases listés sont vérifiés manuellement
- [ ] Aucun bug bloquant ou critique identifié
- [ ] Les résultats sont documentés dans le commentaire de la story

## Notes

- Environnement de test : staging ou local (localhost:3000/geo)
- Données nécessaires : un compte Editor Auth0 valide, une organisation avec quota activé
- Tester avec au moins 2 marchés et 3 catégories pour couvrir les cas limites
- Les questions Competitive utilisent des placeholders [Competitor 1-5] — vérifier leur affichage correct
