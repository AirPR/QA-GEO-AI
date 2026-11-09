# Sélecteurs CSS / Playwright — Référence complète

**Version :** 1.3 | **Mise à jour :** 2026-04-29
**Sources :** test-suite-epic102, test-suite-epic174, dashboard.html (DOM rendu), Playwright codegen
**Priorité :** `data-testid` > `aria-label` > `role+name` > heading text > CSS class

---

## Règles générales

> Le dashboard contient **deux éléments `<main>`** — toujours scoper les requêtes à `[data-testid="dashboard-layout"] main`.
> Préférer `data-testid` / `aria-label` / `role` au contenu texte sauf si celui-ci est une donnée de test dynamique.
> Pour les dialogs drill-in, distinguer `first` / `last` si plusieurs `[role="dialog"]` coexistent.

---

## Tableau global des sélecteurs

> Légende stabilité : ✅ Stable | ⚠️ Dynamique (valeur change selon les données) | ❌ Fragile (classe CSS)

| # | Sélecteur | Type | Page | Section | Stabilité |
|---|---|---|---|---|---|
| 1 | `aside[data-testid="main-sidebar"]` | data-testid | /geo | Sidebar | ✅ |
| 2 | `aside[data-testid="main-sidebar"] img[alt="Onclusive logo"]` | data-testid | /geo | Sidebar | ✅ |
| 3 | `nav[aria-label="Module navigation"]` | aria-label | /geo | Navigation modules | ✅ |
| 4 | `nav[aria-label="Module navigation"] button[aria-current="page"]` | aria | /geo | Navigation modules | ✅ |
| 5 | `nav[aria-label="Module navigation"] button:has-text("Mention")` | text | /geo | Navigation modules | ⚠️ |
| 6 | `nav[aria-label="Module navigation"] button:has-text("Review")` | text | /geo | Navigation modules | ⚠️ |
| 7 | `nav[aria-label="Module navigation"] button:has-text("Contact")` | text | /geo | Navigation modules | ⚠️ |
| 8 | `nav[aria-label="Module navigation"] button:has-text("Measure")` | text | /geo | Navigation modules | ⚠️ |
| 9 | `nav[aria-label="Utility navigation"]` | aria-label | /geo | Navigation utilitaire | ✅ |
| 10 | `a[href="/geo/settings"]` | href | /geo | Navigation utilitaire | ✅ |
| 11 | `div[aria-label="User menu"]` | aria-label | /geo | Navigation utilitaire | ✅ |
| 12 | `button[aria-current="page"]:has-text("GEO Metrics")` | aria+text | /geo | Top nav | ⚠️ |
| 13 | `h1:has-text("GEO Analytics Dashboard")` | heading | /geo | Header | ⚠️ |
| 14 | `button:has-text("New Analysis")` | text | /geo | Header | ⚠️ |
| 15 | `button[aria-label*="markets"]` | aria-label | /geo | Stats cards | ⚠️ |
| 16 | `button[aria-label*="categories"]` | aria-label | /geo | Stats cards | ⚠️ |
| 17 | `button[aria-label*="competitors"]` | aria-label | /geo | Stats cards | ⚠️ |
| 18 | `button[aria-label*="reports"]` | aria-label | /geo | Stats cards | ⚠️ |
| 19 | `button[aria-label*="questions"]` | aria-label | /geo | Stats cards | ⚠️ |
| 20 | `button[aria-label*="sources"]` | aria-label | /geo | Stats cards | ⚠️ |
| 21 | `table` | CSS | /geo | Tableau brands | ✅ |
| 22 | `tbody tr` | CSS | /geo | Tableau brands | ✅ |
| 23 | `span[title="<country>"] img` | attr | /geo | Tableau brands | ✅ |
| 24 | `button[aria-label="Manage scope for <brand>"]` | aria-label | /geo | Tableau brands | ⚠️ |
| 25 | `button[aria-label="Delete <brand>"]` | aria-label | /geo | Tableau brands | ⚠️ |
| 26 | `[data-testid="dashboard-layout"]` | data-testid | Dashboard | Layout | ✅ |
| 27 | `[data-testid="dashboard-top-section"]` | data-testid | Dashboard | Layout | ✅ |
| 28 | `[data-testid="dashboard-sidebar"]` | data-testid | Dashboard | Layout | ✅ |
| 29 | `[data-testid="dashboard-layout"] main` | data-testid | Dashboard | Layout | ✅ |
| 30 | `[data-testid="market-dropdown"]` | data-testid | Dashboard | Filtres | ✅ |
| 31 | `[data-testid="llm-dropdown"]` | data-testid | Dashboard | Filtres | ✅ |
| 32 | `[data-testid="snapshot-navigator"]` | data-testid | Dashboard | Navigator | ✅ |
| 33 | `button[aria-label="Back to Reports"]` | aria-label | Dashboard | Header | ✅ |
| 34 | `button[aria-label="Market filter"]` | aria-label | Dashboard | Header | ✅ |
| 35 | `button[aria-label="LLM engine filters"]` | aria-label | Dashboard | Header | ✅ |
| 36 | `[role="switch"][aria-label="Toggle ChatGPT"]` | role+aria | Dashboard | LLM dropdown | ✅ |
| 37 | `[role="switch"][aria-label="Toggle Gemini"]` | role+aria | Dashboard | LLM dropdown | ✅ |
| 38 | `[role="switch"][aria-label="Toggle Claude"]` | role+aria | Dashboard | LLM dropdown | ✅ |
| 39 | `[role="switch"][aria-label="Toggle Grok"]` | role+aria | Dashboard | LLM dropdown | ✅ |
| 40 | `[role="switch"][aria-label="Toggle Perplexity"]` | role+aria | Dashboard | LLM dropdown | ✅ |
| 41 | `a[aria-current="page"][href*="/dashboard/"]` | aria+href | Dashboard | Sidebar | ✅ |
| 42 | `[data-testid="dashboard-sidebar"] button:has-text("Categories")` | text | Dashboard | Sidebar | ⚠️ |
| 43 | `a[href*="/category/"]` | href | Dashboard | Sidebar | ✅ |
| 44 | `a[href*="/manage-scope"]` | href | Dashboard | Sidebar | ✅ |
| 45 | `[role="tablist"][aria-label="Dashboard sections"]` | role+aria | Dashboard | Tabs | ✅ |
| 46 | `[role="tab"][aria-controls="identity"]` | role+aria | Dashboard | Tabs | ✅ |
| 47 | `[role="tab"][aria-controls="performance"]` | role+aria | Dashboard | Tabs | ✅ |
| 48 | `[role="tab"][aria-controls="sources"]` | role+aria | Dashboard | Tabs | ✅ |
| 49 | `[role="tab"][aria-selected="true"]` | role+aria | Dashboard | Tabs | ✅ |
| 50 | `button[aria-label="Brand Image Positive"]` | aria-label | Identity | Corp. Reputation | ⚠️ |
| 51 | `button[aria-label="Employer Brand Positive"]` | aria-label | Identity | Corp. Reputation | ⚠️ |
| 52 | `button[aria-label="ESG / Sustainability Positive"]` | aria-label | Identity | Corp. Reputation | ⚠️ |
| 53 | `button[aria-label^="Leadership Positive"]` | aria-label | Identity | Corp. Reputation | ⚠️ |
| 54 | `h3:has-text("Brand Territory")` | heading | Identity | Brand Territory | ⚠️ |
| 55 | `button[aria-label^="AI Research:"]` | aria-label | Identity | Brand Territory | ⚠️ |
| 56 | `button[aria-label^="AI Assistants:"]` | aria-label | Identity | Brand Territory | ⚠️ |
| 57 | `button[aria-label*="%"]` | aria-label | Identity | Brand Territory | ⚠️ |
| 58 | `g[role="button"]` | role | Identity | Brand Territory (SVG) | ❌ |
| 59 | `div[role="list"][aria-label="Perception concepts"]` | role+aria | Identity | Top Concepts | ✅ |
| 60 | `button[aria-pressed="true"]` | aria | Identity | Top Concepts | ✅ |
| 61 | `div[role="listitem"] button[aria-expanded]` | role+aria | Identity | Top Concepts | ✅ |
| 62 | `div[aria-label*="Share of Voice"]` | aria-label | Performance | KPI Cards | ✅ |
| 63 | `div[aria-label*="Visibility"]` | aria-label | Performance | KPI Cards | ✅ |
| 64 | `div[aria-label*="Avg Position"]` | aria-label | Performance | KPI Cards | ✅ |
| 65 | `div[aria-label*="AI Choice"]` | aria-label | Performance | KPI Cards | ✅ |
| 66 | `div[aria-label*="Sentiment"]` | aria-label | Performance | KPI Cards | ✅ |
| 67 | `h3:has-text("Brand Rankings")` | heading | Performance | Brand Rankings | ⚠️ |
| 68 | `button[aria-label^="<brand>"]` | aria-label | Performance | Brand Rankings | ⚠️ |
| 69 | `tr[aria-label*="<brand>"]` | aria-label | Performance | Brand Rankings | ⚠️ |
| 70 | `svg[aria-label="Top ranked"]` | aria-label | Performance | Brand Rankings | ✅ |
| 71 | `.ml-0\.5` | CSS class | Performance | Brand Rankings expand | ❌ |
| 72 | `h3:has-text("AI Citation Sources")` | heading | Sources | Citation Sources | ⚠️ |
| 73 | `button[aria-label="Filter by source type"]` | aria-label | Sources | Citation Sources | ✅ |
| 74 | `button[aria-label="All source types"]` | aria-label | Sources | Citation Sources | ✅ |
| 75 | `button[aria-label*="Journalism"]` | aria-label | Sources | Citation Sources | ⚠️ |
| 76 | `button[aria-label*="Competitor Media"]` | aria-label | Sources | Citation Sources | ⚠️ |
| 77 | `button[aria-label="All domains"]` | aria-label | Sources | Citation Sources | ✅ |
| 78 | `button[aria-label="venturebeat.com"]` | aria-label | Sources | Citation Sources | ⚠️ |
| 79 | `tr[aria-label="<domain>"]` | aria-label | Sources | Citation Sources | ⚠️ |
| 80 | `[role="dialog"][aria-modal="true"]` | role+aria | Dashboard | Dialogs | ✅ |
| 81 | `button[aria-label="Close panel"]` | aria-label | Dashboard | Drill-in panel | ✅ |
| 82 | `button[aria-label="Close"]` | aria-label | Dashboard | All Sources modal | ✅ |
| 83 | `button[aria-label="Close detail panel"]` | aria-label | Dashboard | Territory panel | ✅ |
| 84 | `button[aria-label="All"]` | aria-label | Dashboard | Drill-in LLM pills | ✅ |
| 85 | `button[aria-label="chatgpt"]` | aria-label | Dashboard | Drill-in LLM pills | ✅ |
| 86 | `button[aria-label="gemini"]` | aria-label | Dashboard | Drill-in LLM pills | ✅ |
| 87 | `button[aria-label="claude"]` | aria-label | Dashboard | Drill-in LLM pills | ✅ |
| 88 | `button[aria-label="grok"]` | aria-label | Dashboard | Drill-in LLM pills | ✅ |
| 89 | `button[aria-label="perplexity"]` | aria-label | Dashboard | Drill-in LLM pills | ✅ |
| 90 | `a[href^="http"]` | href | Dashboard | Drill-in sources | ✅ |
| 91 | `.fixed` | CSS class | Dashboard | Backdrop modal | ❌ |
| 92 | `.rounded-full.p-1.text-slate-400` | CSS class | Dashboard | Bouton fermeture | ❌ |
| 93 | `[class*="animate-pulse"]` | CSS class | Dashboard | Skeleton loader | ❌ |

---

## Inventaires rapides

### `data-testid`

| Valeur | Élément |
|---|---|
| `main-sidebar` | Sidebar globale de l'application (page /geo) |
| `dashboard-layout` | Racine du dashboard d'analyse |
| `dashboard-top-section` | Header du dashboard (filtres, brand, boutons) |
| `dashboard-sidebar` | Sidebar de navigation du dashboard |
| `market-dropdown` | Dropdown de sélection du marché |
| `llm-dropdown` | Dropdown de sélection des LLM engines |
| `snapshot-navigator` | Navigateur de snapshots d'analyse |

### `aria-label` — inventaire complet

| aria-label | Sélecteur | Page |
|---|---|---|
| `Main navigation` | `aside[aria-label="Main navigation"]` | /geo |
| `Module navigation` | `nav[aria-label="Module navigation"]` | /geo |
| `Utility navigation` | `nav[aria-label="Utility navigation"]` | /geo |
| `User menu` | `div[aria-label="User menu"]` | /geo |
| `Back to Reports` | `button[aria-label="Back to Reports"]` | Dashboard |
| `LLM engine filters` | `button[aria-label="LLM engine filters"]` | Dashboard |
| `Market filter` | `button[aria-label="Market filter"]` | Dashboard |
| `Dashboard navigation` | `nav[aria-label="Dashboard navigation"]` | Dashboard |
| `Dashboard sections` | `[role="tablist"][aria-label="Dashboard sections"]` | Dashboard |
| `Filter by source type` | `button[aria-label="Filter by source type"]` | Dashboard |
| `Perception concepts` | `div[role="list"][aria-label="Perception concepts"]` | Dashboard |
| `Close panel` | `button[aria-label="Close panel"]` | Dialog drill-in |
| `Close` | `button[aria-label="Close"]` | Modal sources |
| `Close detail panel` | `button[aria-label="Close detail panel"]` | Dialog territoire |
| `Toggle ChatGPT` | `[role="switch"][aria-label="Toggle ChatGPT"]` | Dashboard (LLM dropdown) |
| `Toggle Gemini` | `[role="switch"][aria-label="Toggle Gemini"]` | Dashboard (LLM dropdown) |
| `Toggle Claude` | `[role="switch"][aria-label="Toggle Claude"]` | Dashboard (LLM dropdown) |
| `Toggle Grok` | `[role="switch"][aria-label="Toggle Grok"]` | Dashboard (LLM dropdown) |
| `Toggle Perplexity` | `[role="switch"][aria-label="Toggle Perplexity"]` | Dashboard (LLM dropdown) |
| `Brand Image Positive` | `button[aria-label="Brand Image Positive"]` | Dashboard (Identity) |
| `Employer Brand Positive` | `button[aria-label="Employer Brand Positive"]` | Dashboard (Identity) |
| `ESG / Sustainability Positive` | `button[aria-label="ESG / Sustainability Positive"]` | Dashboard (Identity) |
| `Leadership Positive …` | `button[aria-label^="Leadership Positive"]` | Dashboard (Identity) |
| `AI Research: 61.3%` | `button[aria-label="AI Research: 61.3%"]` | Dashboard (Brand Territory) |
| `All source types` | `button[aria-label="All source types"]` | Dashboard (Sources) |
| `Manage scope for <brand>` | `button[aria-label="Manage scope for Anthropic"]` | /geo |
| `Delete <brand>` | `button[aria-label="Delete Anthropic"]` | /geo |
| `<N> markets` | `button[aria-label="8 markets"]` | /geo |
| `<N> categories` | `button[aria-label="10 categories"]` | /geo |
| `<N> competitors` | `button[aria-label="28 competitors"]` | /geo |
| `<N> reports` | `button[aria-label="6 reports"]` | /geo |
| `<N> questions` | `button[aria-label="139 questions"]` | /geo |
| `<N> sources` | `button[aria-label="602 sources"]` | /geo |

### `role` — inventaire

`tablist` · `tab` · `dialog` · `option` · `menuitem` · `menu` · `switch` · `tooltip` · `button` · `link` · `list` · `listitem`

---

## Page /geo — Liste des rapports

### Sidebar globale

```
aside[data-testid="main-sidebar"]          → conteneur sidebar (72px, bg-[#2d556e])
aside[data-testid="main-sidebar"] img[alt="Onclusive logo"]  → logo
```

### Navigation modules

```
nav[aria-label="Module navigation"]
nav[aria-label="Module navigation"] button                        → tous les modules
nav[aria-label="Module navigation"] button[aria-current="page"]   → module actif
nav[aria-label="Module navigation"] button:has-text("Mention")
nav[aria-label="Module navigation"] button:has-text("Review")
nav[aria-label="Module navigation"] button:has-text("Contact")
nav[aria-label="Module navigation"] button:has-text("Measure")    → actif (aria-current="page")
```

### Navigation utilitaire (bas de sidebar)

```
nav[aria-label="Utility navigation"]
a[href="/geo/settings"]                                            → Settings
nav[aria-label="Utility navigation"] button:has-text("Help")
nav[aria-label="Utility navigation"] button:has-text("Log out")
div[aria-label="User menu"]                                        → avatar utilisateur
```

### Barre de navigation produit (haut de page)

```
button[aria-current="page"]:has-text("GEO Metrics")    → onglet actif
button:has-text("TBD Capability")                       → onglets inactifs
```

### En-tête de page

```
h1:has-text("GEO Analytics Dashboard")
p:has-text("Monitor your brand's presence across AI search engines")
button:has-text("New Analysis")                          → bouton CTA principal
```

### Cartes de statistiques

```
button[aria-label="8 markets"]
button[aria-label="10 categories"]
button[aria-label="28 competitors"]
button[aria-label="6 reports"]
button[aria-label="139 questions"]
button[aria-label="602 sources"]

→ Valeur :  button[aria-label*="<type>"] span:first-child
→ Label :   button[aria-label*="<type>"] span:last-child
```

### Tableau des rapports (brands)

```
table                                                     → tableau principal
thead th:has-text("Brand")
thead th:has-text("Countries")
thead th:has-text("Categories")
thead th:has-text("Last update")
thead th:has-text("Actions")
tbody tr                                                  → toutes les lignes

→ Avatar brand :              td div.rounded
→ Nom brand :                 td span:first-child  (dans cellule brand)
→ Domaine brand :             td span:last-child   (dans cellule brand)
→ Drapeau pays :              span[title="United States"] img
→ Drapeau par pays :          span[title="<country>"] img
→ Liste catégories :          ul[role="list"] li span
→ Dernière mise à jour :      td:nth-child(4)
→ Bouton Manage scope :       button[aria-label="Manage scope for Anthropic"]
→ Bouton Delete :             button[aria-label="Delete Anthropic"]
→ Tooltip Manage scope :      span.group-hover/tooltip:block:has-text("Manage scope")
→ Tooltip Delete :            span.group-hover/tooltip:block:has-text("Delete")

Brands connus : Anthropic · Microsoft · BMW · OpenAI
```

---

## Dashboard d'analyse — Layout

```
[data-testid="dashboard-layout"]                         → racine dashboard
[data-testid="dashboard-top-section"]                    → header (filtres + brand info)
[data-testid="dashboard-sidebar"]                        → sidebar de navigation
[data-testid="dashboard-layout"] main                    → contenu principal (à utiliser pour scoper)
```

---

## Dashboard d'analyse — Header (Top Section)

```
button[aria-label="Back to Reports"]                     → retour à la liste
[data-testid="dashboard-top-section"] div.h-8.w-8.rounded  → avatar brand (initiale)
[data-testid="dashboard-top-section"] span.font-semibold.text-2xl  → nom de la brand
[data-testid="dashboard-top-section"] span.text-xs       → date de génération
                                                           regex: Generated\s+\w+\s+\d{1,2},\s+\d{4}
button[aria-label^="Toggle "]                            → boutons toggle
[data-testid="dashboard-top-section"] button:has-text(/share/i)
[data-testid="dashboard-top-section"] button:has-text(/export/i)
```

---

## Dashboard d'analyse — Sidebar de navigation

```
[data-testid="dashboard-sidebar"]                        → conteneur

→ Lien Overview (actif) :
  a[aria-current="page"][href*="/dashboard/"]            active_class: bg-[#E0F2FE]

→ Bouton Categories (expandable) :
  [data-testid="dashboard-sidebar"] button:has-text("Categories")
  aria-expanded: "true" | "false"

→ Sous-items catégories :
  a[href*="/category/"]
  span.size-2.rounded-full                               → dot coloré par catégorie

→ Lien Manage Scope :
  a[href*="/manage-scope"]

→ Lien actif :       [aria-current="page"]
```

> **Attention :** Actions Center et Settings sont ABSENTS du DOM actuel — ne pas les asserter.

---

## Dashboard d'analyse — Filtres

### Market Dropdown

```
[data-testid="market-dropdown"]                          → conteneur
[data-testid="market-dropdown"] button                   → déclencheur
button[aria-label="Market filter"]                       → alt (aria)
[data-testid="market-dropdown"] button span.text-base    → emoji drapeau (🇺🇸)
[data-testid="market-dropdown"] button span.flex-1       → texte marché sélectionné
[role="option"]                                          → options dropdown
[role="option"], [role="menuitem"]                       → options alt

Valeurs connues : "All Markets" · "United States - English" · "France - French"
```

### LLM Dropdown

```
[data-testid="llm-dropdown"]                             → conteneur
[data-testid="llm-dropdown"] button                      → déclencheur
button[aria-label="LLM engine filters"]                  → alt (aria)
[data-testid="llm-dropdown"] button span.inline-flex.min-w-\[20px\]  → badge count (ex: "5")
[data-testid="llm-dropdown"] [role="switch"]             → switches LLM (tous)
[data-testid="llm-dropdown"] [role="switch"][aria-checked="true"]    → switch actif
Fermeture : Escape

→ Switches individuels (aria-labels exacts) :
  [role="switch"][aria-label="Toggle ChatGPT"]
  [role="switch"][aria-label="Toggle Gemini"]
  [role="switch"][aria-label="Toggle Claude"]
  [role="switch"][aria-label="Toggle Grok"]
  [role="switch"][aria-label="Toggle Perplexity"]
```

---

## Dashboard d'analyse — Snapshot Navigator

```
[data-testid="snapshot-navigator"]                       → conteneur
[data-testid="snapshot-navigator"] button (first)        → flèche retour
Label pattern : "Analysis — 15 Apr 2026"
Label regex   : Analysis\s+[—–-]\s+\d+\s+\w+\s+\d{4}
```

---

## Dashboard d'analyse — Onglets (Identity / Performance / Sources)

```
[role="tablist"]                                         → conteneur onglets
[role="tablist"][aria-label="Dashboard sections"]
[role="tab"]                                             → onglet individuel
[role="tab"][aria-selected="true"]                       → onglet actif
[role="tab"][aria-controls="identity"]
[role="tab"][aria-controls="performance"]
[role="tab"][aria-controls="sources"]

Onglets connus : Identity · Performance · Sources
Note : le label est précédé d'une icône ligature Material Symbols dans le textContent
```

---

## Onglet Identity — Résumé exécutif

```
div.rounded-lg.border.border-red-200.bg-red-50           → conteneur erreur
p.text-red-700:has-text("Failed to generate perception summary.")
div.rounded-lg.border.border-red-200 button:has-text("Retry")
[class*="animate-pulse"]                                  → loader skeleton

h3:has-text("Corporate Reputation")                      → seul h3 de cette section
```

---

## Onglet Identity — Cartes Corporate Reputation

```
→ Sélecteurs par aria-label (codegen — préférés) :
  button[aria-label="Brand Image Positive"]
  button[aria-label="Employer Brand Positive"]
  button[aria-label="ESG / Sustainability Positive"]
  button[aria-label^="Leadership Positive"]          → contient contexte (ex: "CEO Dario")

→ Pattern aria-label : "{Dimension} {Sentiment} {contexte optionnel}"
  Sentiments possibles : Positive · Negative · Mixed

→ Sélecteurs alternatifs (par contenu span) :
  div[role="button"]:has(span:text-is("Brand Image"))
  div[role="button"]:has(span:text-is("Employer Brand"))
  div[role="button"]:has(span:text-is("ESG / Sustainability"))
  div[role="button"]:has(span:text-is("Leadership"))

→ Tag sentiment :   span:text-matches(/^(Positive|Negative|Mixed)$/)
→ Icône :           svg (first inside card)
→ Bullets :         ul li

Dimensions : Brand Image · Employer Brand · ESG / Sustainability · Leadership
```

> **Note :** Ces dimensions sont des `<span>`, PAS des `<h3>`. Les cartes ont un `role="button"` et un `aria-label` stable — préférer l'aria-label.

---

## Onglet Identity — Brand Territory

```
h3:has-text("Brand Territory")
p:has-text("Topics associated with your brand")

→ Bulles (codegen — préféré) :
  button[aria-label="AI Research: 61.3%"]
  button[aria-label="AI Assistants: 30.3%"]
  button[aria-label="AI Infrastructure: 6.7%"]
  button[aria-label="Software & Technology: 1.7%"]
  Pattern : button[aria-label^="<topic>:"]              → par topic (préfixe stable)
  Pattern : button[aria-label*="<N>%"]                  → par pourcentage

→ Sélecteurs SVG alternatifs :
  g[role="button"]                                       → bulles SVG
  g[aria-label*="<topic>"]                               → bulle par topic
  g[role="button"] > circle (first)                      → cercle de la bulle
  g[role="button"] text:first-of-type                    → label texte
  g[role="button"] text:last-of-type                     → pourcentage texte

div.pointer-events-none.absolute.z-10.rounded-lg         → tooltip hover

Bulles connues :
  AI Research           61.3%
  AI Assistants         30.3%
  AI Infrastructure      6.7%
  Software & Technology  1.7%
```

---

## Onglet Identity — Top Concepts

```
h3:has-text("Top Concepts Associated with Your Brand")
p:has-text("Click on a concept to view quotes and sources")

→ Barre sentiment :
  button[aria-label*="Positive"]
  button[aria-label*="Mixed"]
  button[aria-label*="Negative"]
  div.flex > div.h-1                                     → segments de la barre

→ Filtres :
  button[aria-pressed]:has-text(/^All/)
  button[aria-pressed]:has-text(/^Positive/)
  button[aria-pressed]:has-text(/^Mixed/)
  button[aria-pressed]:has-text(/^Negative/)
  button[aria-pressed="true"]                            → filtre actif

→ Tri :
  button:has(span:text-is("Sort by Frequency"))

→ Liste des concepts :
  div[role="list"][aria-label="Perception concepts"]
  div[role="listitem"] button[aria-expanded]             → item concept
  div.w-1.self-stretch.rounded-full                      → barre sentiment (dans item)
  span:has-text("sources")                               → compteur sources
  span:text-matches(/[+-]\d+\s*sentiment/)               → score sentiment
  p.font-medium.text-\[20px\]                            → pourcentage
```

---

## Onglet Performance — KPI Cards

```
div[aria-label*="Share of Voice"]                        → card Share of Voice
div[aria-label*="Visibility"]                            → card Visibility
div[aria-label*="Avg Position"]                          → card Avg Position
div[aria-label*="AI Choice"]                             → card AI Choice
div[aria-label*="Sentiment"]                             → card Sentiment

Exemples d'aria-label : "Share of Voice: 3%" · "Visibility: 15%" · "Avg Position: #10"
                         "AI Choice: 13%"    · "Sentiment: +61"

→ Valeur :        p.font-medium.text-\[20px\] (inside card)
→ Dot qualité :   span.h-2.w-2.rounded-full   (inside card)
→ Label qualité : span.text-\[10px\]           (sibling du dot)

Mapping qualité :
  Share of Voice / Visibility / Avg Position / AI Choice → Good · Fair · Poor
  Sentiment → Positive · Neutral · Negative
```

---

## Onglet Performance — Category Prioritization

```
h3:has-text("Category Prioritization")
p:has-text("Where to focus your efforts")

→ Scatter chart :    svg (recharts)
→ Points de données : svg circle, svg ellipse
→ Quadrants (labels) :
    "STARS"       — High visibility, High comp
    "OPPORTUNITY" — Low visibility, High comp
    "MONITOR"     — Low visibility, Low comp
    "AT RISK"     — High visibility, Low comp

→ Cards résumé (sous le chart) :
  div.flex.flex-1.flex-col:has(span:text-is("Stars"))
  div.flex.flex-1.flex-col:has(span:text-is("Opportunity"))
  div.flex.flex-1.flex-col:has(span:text-is("At Risk"))
  div.flex.flex-1.flex-col:has(span:text-is("Monitor"))
```

---

## Onglet Performance — Brand Rankings

```
h3:has-text("Brand Rankings")
p:has-text("Top brands by share of voice across all topics")

→ Tableau :          main table (first)
→ Headers :          Rank · Brand · SOV % · Visibility % · Avg Position · LLM Choice %
→ Colonne SOV :      nth-child(3)
→ Toutes les lignes : tbody tr
→ Ligne par brand (codegen) :
    button[aria-label="Google, 19 variants"]            → pattern : "{Brand}, {N} variants"
    button[aria-label^="<brand>"]                       → par brand (préfixe)
→ Ligne par brand (alt) :  tr[aria-label*="<brand>"]
→ Ligne expandable : tr[role="button"][aria-expanded]
→ LLM dans ligne expandée : div:has-text("Gemini"), locator('div').filter({ hasText: /^Gemini$/ })
→ Expand/collapse :  .ml-0\.5                           ⚠️ FRAGILE — classe Tailwind
→ Icône top 1 :      svg[aria-label="Top ranked"]
→ Logo brand :       img.h-7.w-7.rounded-full
→ Badge variantes :  span.rounded-full.bg-green-100    (ex: +19)
```

---

## Onglet Sources — AI Citation Sources

```
h3:has-text("AI Citation Sources")
p:has-text("See which domains AI tools reference most often")

→ Bouton filtre :    button[aria-label="Filter by source type"]
→ Barre par type :   div.flex.h-8.w-full.overflow-hidden.rounded-lg
→ Segments :         div.flex.h-8 > button[aria-label]
→ Segment par type (codegen) :
    button[aria-label="Journalism (1213)"]              → pattern : "{Type} ({count})"
    button[aria-label*="Journalism"]                    → alt (sans count)
    button[aria-label*="Competitor Media"]
    … (voir liste ci-dessous)
→ Reset filtre :     button[aria-label="All source types"]

Types de sources connus :
  Journalism · Competitor Media · Aggregators / Encyclopedic · Social / UGC
  Owned Media · Academic · Review Sites · Other · Corporate · Press Release

→ Tableau domaines (codegen) :
  button[aria-label="venturebeat.com"]                   → ligne par domaine (role=button)
  button[aria-label^="<domain>"]                         → pattern générique
→ Tableau domaines (alt) :
  tbody tr[role="button"]                                → ligne expandable
  tr[aria-label="<domain>"]                              → ligne par domaine
  span.inline-flex:has(svg)                              → badge favorabilité
  Favorabilité : Favorable · Unfavorable · Neutral

→ Bouton All domains :  button[aria-label="All domains"]  ou  button:has-text("All domains")
→ Badge count :         button:has-text("All domains") span.rounded-full
```

---

## Panels et dialogs

### Drill-in Panel

```
[role="dialog"][aria-modal="true"]                       → conteneur
[role="dialog"][aria-modal="true"] (first)               → premier dialog
button[aria-label="Close panel"]                         → fermeture
.rounded-full.p-1.text-slate-400                         → fermeture alt ⚠️ FRAGILE
.animate-pulse                                           → skeleton loader

→ Pills LLM (codegen — préférés) :
  button[aria-label="All"]                               → reset (tous les LLM)
  button[aria-label="chatgpt"]  ou  button[aria-label="openai"]
  button[aria-label="gemini"]
  button[aria-label="claude"]
  button[aria-label="grok"]
  button[aria-label="perplexity"]

→ Pills LLM (alt — fragile) :
  .inline-flex (first)                                   → barre onglets LLM
  .inline-flex button                                    → boutons LLM
  button:has(img[alt="<engine>"])                        → onglet par engine

a[href^="http"], a[href^="//"]                           → liens sources
button:has-text(/^All sources/) (first)                  → bouton "All sources"
span:text-matches(/^(Positive|Negative|Mixed)$/)         → tag sentiment
h2 (first)                                               → titre dimension

Engines connus : chatgpt · gemini · claude · grok · perplexity
```

### All Sources Modal

```
[role="dialog"][aria-modal="true"]:has-text(/Sources\s*-/) (first)
input[type="text"], input[type="search"], input[placeholder] (first)  → recherche
a[href^="http"]                                          → lignes sources
button[aria-label="Close"]                               → fermeture
```

### Territory Detail Panel

```
[role="dialog"][aria-modal="true"] (last)
button[aria-label="Close detail panel"] (first)
svg:has(path, circle) (first)                            → pie chart
p                                                        → paragraphes
```

---

## AI Perception Summary

```
:text-matches("AI Perception Summary", "i") (first)
:text-matches("Sentiment", "i") (first)
```

---

## Patterns communs

```
[role="dialog"]                                          → tout dialog
[role="dialog"][aria-modal="true"]                       → modal strict
[class*="animate-pulse"]                                 → skeleton loader (générique)
.animate-pulse                                           → skeleton loader (exact)
[role="tooltip"], [class*="tooltip"]                     → tooltip générique
aria-current="page"                                      → lien/bouton actif
.fixed (first)                                           → backdrop modal/overlay ⚠️ FRAGILE
```

---

## Routes de l'application

| Route | URL |
|---|---|
| Home (liste rapports) | `/geo` |
| Settings | `/geo/settings` |
| Dashboard brand | `/geo/dashboard/:uuid` |
| Vue catégorie | `/geo/dashboard/:uuid/category/:id` |
| Manage Scope dashboard | `/geo/dashboard/:uuid/manage-scope` |
| Lien catégorie (match) | `a[href*="/category/"]` |

---

## Points de fragilité & recommandations

| Problème | Recommandation |
|---|---|
| Corporate Reputation cards — aria-label inclut le contexte CEO | Utiliser `button[aria-label^="Leadership Positive"]` (préfixe) |
| Brand Territory bubbles — aria-label inclut le % (dynamique) | Utiliser `button[aria-label^="AI Research:"]` ou `button[aria-label*="%"]` |
| Brand Rankings rows — aria-label inclut le count variantes (dynamique) | Utiliser `button[aria-label^="Google"]` (préfixe brand) |
| Source type filter — aria-label inclut le count (dynamique) | Utiliser `button[aria-label*="Journalism"]` (contains) |
| Cards Stars/Opportunity/At Risk/Monitor — pas de `data-testid` | Identifier par text span |
| Barre LLM pills dans drill-in panel — aria-labels `chatgpt`/`openai` inconsistants | Tester les deux : `button[aria-label="chatgpt"], button[aria-label="openai"]` |
| Expand/collapse Brand Rankings — `.ml-0\.5` | Ajouter `data-testid="expand-variants"` |
| Backdrop modal — `.fixed` | Ajouter `data-testid="modal-backdrop"` |
| Close fragile — `.rounded-full.p-1.text-slate-400` | Préférer `button[aria-label="Close panel"]` |
| Share / Export — regex case-insensitive | Ajouter `data-testid="share-button"` / `"export-button"` |
| Actions Center / Settings dans sidebar dashboard | **ABSENTS du DOM** — ne pas asserter |
