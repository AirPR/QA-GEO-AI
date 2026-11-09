# E2E Scenarios — geo-640-e2e

## Source CSV(s)

- GEO-663 test cases (TC-GEO-663-001 to TC-GEO-663-006) — KPI row refactoring + Brand Rankings
- GEO-664 test cases (TC-GEO-664-001 to TC-GEO-664-010) — Dedicated SOV card

Total : 16 TCs analysés — 3 scénarios E2E générés — 6 TCs skippés

## Analyse DOM réelle (staging — Toyota dashboard)

URL inspectée : `https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e`
URL category inspectée : `.../category/21a79173-c455-4e49-bf69-307dc2dba7e4` (Hybrid Cars)

Sélecteurs `data-testid` confirmés sur staging :
- `kpi-card-visibility` / `kpi-card-avgPosition` / `kpi-card-winRate` / `kpi-card-sentiment` — les 4 KPI cards
- `kpi-card-label-{metric}` — labels des KPI cards
- `kpi-card-value-{metric}` — valeurs des KPI cards
- `dashboard-rankings-empty` / `dashboard-rankings-error` — Brand Rankings vide ou en erreur
- `dashboard-section-tab-performance` — onglet Performance
- `snapshot-navigator-trigger` — sélecteur de snapshot
- `llm-dropdown-trigger` — filtre LLM (5 switches : ChatGPT, Gemini, Grok, Claude, Perplexity)
- `market-dropdown-trigger` — filtre marché (All Countries, United States - English, France - French, Spain - Spanish…)
- `views-overview-title` — conteneur principal de la vue Overview

Structure SOV (confirmée par inspection DOM) :
- Section `id="performance"` contient les 4 KPI cards + la SOV card
- Heading `h3:has-text("Share of Voice")` suivi de subtitle "By brand, your brand is highlighted"
- Sur données vides : "No data to show" / "Couldn't load this chart"
- Pas de `data-testid` dédié pour la SOV card elle-même — sélection par heading h3

Note dataset Toyota staging : toutes les valeurs affichent N/A (aucune donnée d'analyse disponible).
Les assertions vérifient la structure de la page, pas les valeurs numériques.

---

## Scénario E2E 1 : KPI row sans SOV + Brand Rankings sans colonne SoV% (Overview)

**TCs couverts :** TC-GEO-663-001, TC-GEO-663-003, TC-GEO-663-005, TC-GEO-663-006
**Préconditions :**
- Utilisateur authentifié via Auth0 (session storageState.json valide)
- Dashboard Toyota Overview accessible : `https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e`

**Hypothèses :**
- Les 4 KPI cards (Visibility, Avg Position, LLM Choice, Sentiment) sont toujours présentes même avec données N/A
- La colonne SoV% n'existe plus dans le tableau Brand Rankings (refactoring GEO-640)
- Le tri par défaut est Visibility% décroissant

| # | Action | Test data | Résultat attendu |
|---|--------|-----------|-----------------|
| 1 | Given : naviguer vers l'URL Overview du dashboard | `https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e` | Page chargée, titre "Toyota — GEO Analytics" |
| 2 | When : attendre que les KPI cards soient rendues | — | Les 4 KPI cards sont visibles : Visibility, Avg Position, LLM Choice, Sentiment |
| 3 | Then : vérifier qu'il y a exactement 4 KPI cards et aucune card "Share of Voice" dans le KPI row | `data-testid="kpi-card-visibility/avgPosition/winRate/sentiment"` | 4 KPI cards visibles, aucun `data-testid="kpi-card-shareOfVoice"` ou équivalent |
| 4 | And : vérifier que le tableau Brand Rankings n'a pas de colonne SoV% | Sélecteur `th` du tableau rankings | Aucun `th` avec texte "SoV%" ou "Share of Voice" dans le tableau |
| 5 | And : vérifier l'ordre de tri (Visibility% décroissant) | Colonne Visibility du tableau | Première ligne = brand avec Visibility% le plus élevé (si données disponibles) |

---

## Scénario E2E 2 : Carte SOV dédiée — rendu, doughnut, center label (Overview)

**TCs couverts :** TC-GEO-664-001, TC-GEO-664-003, TC-GEO-664-004
**Préconditions :**
- Utilisateur authentifié via Auth0 (session storageState.json valide)
- Dashboard Toyota Overview accessible

**Hypothèses :**
- La carte SOV est toujours rendue (même avec données vides) avec son heading et subtitle
- Le doughnut chart peut afficher "No data to show" si aucune analyse disponible
- La carte SOV est positionnée dans la section Performance, en dessous des 4 KPI cards

| # | Action | Test data | Résultat attendu |
|---|--------|-----------|-----------------|
| 1 | Given : naviguer vers l'URL Overview du dashboard | `https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e` | Page chargée |
| 2 | When : faire défiler la page pour atteindre la section Performance | — | La section Performance avec les KPI cards est visible |
| 3 | Then : vérifier que la carte SOV dédiée est visible avec son titre | `h3:has-text("Share of Voice")` | Heading "Share of Voice" visible |
| 4 | And : vérifier le subtitle de la carte SOV | Texte "By brand, your brand is highlighted" | Subtitle visible sous le titre |
| 5 | And : vérifier la présence du doughnut chart ou de l'état vide | SVG dans le conteneur SOV | Soit doughnut SVG visible, soit message "No data to show" visible |

---

## Scénario E2E 3 : Carte SOV sur Category view + réactivité aux filtres

**TCs couverts :** TC-GEO-663-002, TC-GEO-663-004, TC-GEO-664-002, TC-GEO-664-009
**Préconditions :**
- Utilisateur authentifié via Auth0
- Dashboard Toyota Overview accessible
- Au moins une Category accessible depuis la sidebar (ex: Hybrid Cars)

**Hypothèses :**
- La structure de la Category page est identique à l'Overview pour les KPI cards et la SOV card
- Le filtre LLM (5 switches) et le filtre marché sont disponibles sur la Category page
- Sur staging Toyota, les données peuvent être vides — les assertions testent la structure

| # | Action | Test data | Résultat attendu |
|---|--------|-----------|-----------------|
| 1 | Given : naviguer vers l'URL de la Category "Hybrid Cars" | `https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4` | Page category chargée |
| 2 | When : attendre que les KPI cards soient rendues | — | Les 4 KPI cards visibles (pas de SOV dans le KPI row) |
| 3 | Then : vérifier la présence de la carte SOV dédiée sur la Category page | `h3:has-text("Share of Voice")` | Heading "Share of Voice" visible |
| 4 | And : changer le filtre LLM (désactiver un LLM) | `[data-testid="llm-dropdown-trigger"]` + switch | La page se recharge, la carte SOV reflect le changement de filtre |
| 5 | And : remettre le filtre LLM à son état initial | Réactiver le LLM désactivé | Retour à l'état initial |

---

## TCs skippés et justification

| TC | Raison du skip |
|----|----------------|
| TC-GEO-664-005 | Requiert un état de données avec doughnut rempli — dataset Toyota staging vide (N/A) |
| TC-GEO-664-006 | Teste le center label avec valeur numérique — données N/A sur staging Toyota |
| TC-GEO-664-007 | Requiert plusieurs brands avec SOV > 0 pour vérifier la légende — données vides |
| TC-GEO-664-008 | Teste la mise en évidence de la brand cible dans le doughnut — données vides |
| TC-GEO-664-010 | Teste le comportement avec filtres combinés sur données réelles — hors portée staging |

---

## Traceabilité complète

| Scénario E2E | TCs originaux |
|---|---|
| E2E-GEO640-001 | TC-GEO-663-001, TC-GEO-663-003, TC-GEO-663-005, TC-GEO-663-006 |
| E2E-GEO640-002 | TC-GEO-664-001, TC-GEO-664-003, TC-GEO-664-004 |
| E2E-GEO640-003 | TC-GEO-663-002, TC-GEO-663-004, TC-GEO-664-002, TC-GEO-664-009 |
| Skippés | TC-GEO-664-005, TC-GEO-664-006, TC-GEO-664-007, TC-GEO-664-008, TC-GEO-664-010 |
