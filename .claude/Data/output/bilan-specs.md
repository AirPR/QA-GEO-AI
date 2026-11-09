# Bilan des specs Playwright traitées

Généré le : 2026-05-02
Mis à jour le : 2026-05-05
Blueprint utilisé : selectors_blueprint.json v1.4

---

## E2E Suite — Create & Verify Analysis (3 specs indépendantes)

> Regroupées sous le projet `e2e-suite` dans `playwright.config.js`.
> Lancement groupé : `SPEC_NAME=e2e-suite USE_AUTH=true npx playwright test --project=e2e-suite`
> Rapport combiné : `node .claude/Data/templates/build-e2e-suite-report.js`

### create-default-analysis

**Fichier** : `.claude/Data/raw/playwright/create-default-analysis.spec.js`
**Source CSV** : `.claude/Data/output/csv/create-default-analysis.csv`
**Généré** : 2026-05-04
**Total tests** : 1 (E2E-CREATE-DEFAULT-001 — 16 steps)

| TC | Description |
|----|-------------|
| E2E-CREATE-DEFAULT-001 | Création d'une analyse Chanel (marché US/EN, catégories, prompts, LLMs par défaut, lancement, redirection, vérification "In progress") |

**Sélecteurs notables** :
- `[data-testid="reports-list"]` pour la liste des rapports
- `page.locator('tr').filter({ hasText: BRAND }).filter({ hasText: 'In progress' })` pour cibler la bonne ligne (plusieurs lignes possibles)

---

### create-analysis-markets-1LLM

**Fichier** : `.claude/Data/raw/playwright/create-analysis-markets-1LLM.spec.js`
**Source CSV** : `.claude/Data/output/csv/create-analysis-markets-1LLM.csv`
**Généré** : 2026-05-04
**Total tests** : 1 (E2E-MARKETS-1LLM-001 — 17 steps)

| TC | Description |
|----|-------------|
| E2E-MARKETS-1LLM-001 | Création d'une analyse YVES SAINT LAURENT avec 2 marchés (US/EN + FR/FR) et 1 seul LLM (Claude) — désactivation des autres LLMs via re-query while loop |

**Pattern clé — sélection LLM** :
- Re-query `[aria-checked="true"]` à chaque itération (évite les handles stale après re-render React)
- Clic sur le premier switch non-Claude trouvé, puis recommencer

---

### verify-analysis-ysl

**Fichier** : `.claude/Data/raw/playwright/verify-analysis-ysl.spec.js`
**Source CSV** : `.claude/Data/output/csv/verify-analysis-ysl.csv`
**Généré** : 2026-05-04
**Total tests** : 1 (E2E-VERIFY-YSL-001 — 8 steps)

| TC | Description |
|----|-------------|
| E2E-VERIFY-YSL-001 | Vérification de l'analyse YSL dans la liste des rapports + navigation dashboard (URL /dashboard/{uuid}, marchés US+FR via dropdown, LLM Claude, badge count = 1) |

**Sélecteurs notables** :
- UUID pattern : `/\/dashboard\/[0-9a-f]{8}-...-[0-9a-f]{12}/i`
- France via dropdown : `[role="option"]:has-text("France")` (Market filter n'affiche qu'1 valeur à la fois)
- Badge LLM count : `button:has-text("LLM Engines")` → `.getByText("1")`

---

## Epic 99 — Snapshot Navigation + Guided Tour + Sidebar Modules

**Fichier** : `.claude/Data/raw/playwright/test-suite-epic99.spec.js`
**Source CSV** : `.claude/Data/output/csv/testcases-coverage-epic99-20260430.csv`
**Généré** : 2026-04-30 | **Mis à jour** : 2026-05-05
**Total tests** : 19 | **Résultats** : 12 passed / 1 failed / 6 skipped

| Story | TCs | Description |
|-------|-----|-------------|
| GEO-56 | TC001, TC002, TC003, TC004, TC005 | Snapshot navigator (navigation, persistance filtres, boutons désactivés, snapshot unique) |
| GEO-57 | TC001, TC002, TC003, TC004 | Snapshot data model (création, immutabilité, rétention, stockage) |
| GEO-55 | TC001, TC002, TC003, TC004 | Guided tour (activation URL, avance/skip, données démo, tracking completion) — skippés si `tour_entry_url` vide |
| GEO-235 | TC001, TC002, TC003, TC004, TC005, TC006 | Sidebar module navigation (Mention, Review, Contact, Settings, Measure actif, URL manquante) |

**Comportement GEO-235-TC001/TC002/TC003** (mis à jour 2026-05-05) :
- Deux résultats valides acceptés : session active → URL destination / pas de session → `auth-staging.onclusive.com/u/login/identifier`
- Pattern : `AUTH_REDIRECT_RE = /^https:\/\/auth-staging\.onclusive\.com\/u\/login\/identifier/`

**Bug connu** :
- GEO-56-TC002 FAILED : le filtre marché est réinitialisé lors du changement de snapshot (bug applicatif)

**Sélecteurs notables** :
- `BLUEPRINT.sidebar.nav_links.*` pour les liens de navigation
- `BLUEPRINT.common_patterns.skeleton_loader_exact` pour les états de chargement
- Fallback `[data-testid="snapshot-nav"], [class*="snapshot"]` pour le navigator

**Helpers** :
- `goToDashboard(page)` — navigation vers le dashboard principal
- `test.afterEach` red-frame annotation hook (CLAUDE.md obligatoire)

---

## Epic 100 — Manage Scope (Markets, Categories, LLM engines)

**Fichier** : `.claude/Data/raw/playwright/test-suite-epic100.spec.js`
**Source CSV** : `.claude/Data/output/csv/testcases-coverage-epic100-20260430.csv`
**Généré** : 2026-04-30 | **Mis à jour** : 2026-05-02
**Total tests** : 18

| Story | TCs | Description |
|-------|-----|-------------|
| GEO-61 | TC001, TC002, TC003, TC004, TC005, TC006, TC007, TC008, TC009 | Manage Scope (affichage scope, ajout marché, ajout catégorie, suppressions, mise à jour questions/concurrents, quotas marché/catégorie, Reader read-only) |
| GEO-60 | TC001, TC002, TC003, TC004, TC005, TC006, TC007, TC008, TC009 | LLM config (toggle + next run, dernier LLM verrouillé, persistance, message min-1, toggle désactivé, web search toggle, web search grisé, Reader RO, navigation + retour) |

**Sélecteurs notables** :
- `BLUEPRINT.manage_scope_page.*` — section dédiée ajoutée en v1.4 lors du traitement de cette spec
  - `markets_section.add_market_button`, `quota_banner`
  - `add_market_modal.container`, `wizard_steps`
  - `llm_engines_section.toggle`, `web_search_checkbox`, `min_one_lock_message`
  - `next_run_notice.selector`

**Helpers** :
- `goToManageScope(page)` — navigation vers `/geo/dashboard/:uuid/manage-scope`
- `test.afterEach` red-frame annotation hook (CLAUDE.md obligatoire)

**Blueprint mis à jour** : ajout de la section `manage_scope_page` (7 sous-sections) lors de la génération de cette spec

---

## Epic 101 — Category View + Actions Center

**Fichier** : `.claude/Data/raw/playwright/test-suite-epic101.spec.js`
**Source CSV** : `.claude/Data/output/csv/testcases-coverage-epic101-20260430.csv`
**Généré** : 2026-04-30 | **Mis à jour** : 2026-05-02
**Total tests** : 55

| Story | TCs | Description |
|-------|-----|-------------|
| GEO-70 | kpi-TC001, TC001, TC003, TC004, TC005, TC006, TC007 | KPI cards + perception summary (affichage, filtres, 5 cartes, formules SOV/Visibility/WinRate/Sentiment, refetch, N/A, Gemini meta-LLM) |
| GEO-69 | TC001, TC002, TC003, TC004, TC005, TC006, TC007 | Brand Prioritization Matrix (affichage, filtres, tooltip hover, top-4 par marché, marché spécifique, empty state, légende quadrants) |
| GEO-68 | TC001, TC002, TC003, TC004, TC005, TC006, TC007, TC008, TC009 | Brand Rankings (affichage, filtres, variants agrégés +N badge, highlight amber-50, recalcul marché, recalcul LLM, all-markets, empty state, error state) |
| GEO-67 | TC001→TC016 | Questions Table (colonnes groupées, favorabilité visibility/competitive/perception, filtre favorabilité, expand row, règles couleur perception, search, bouton Filters, expand visibility/competitive/perception detail, filtre marché, filtre LLM, empty state, error state) |
| GEO-66 | TC001, TC002, TC003, TC004, TC005, TC006, TC007 | Perception Topics + Citation Sources (clustering, gaps réputation, source detail, recalcul marché/LLM, empty states, error state) |
| GEO-65 | TC001, TC002 | Actions Center — Visibility improvements (affichage avec badge/sévérité, résultats pré-calculés) |
| GEO-64 | TC001, TC002 | Actions Center — Competitive improvements (affichage, scope marché) |
| GEO-63 | TC001 | Actions Center — Reputation improvements (plafond 3 par catégorie, tri sévérité) |
| GEO-62 | TC001, TC002 | Actions Center — Priority Source Targets detail panel (sections Quick Stats/Priority Targets/Owned Media/Competitor Media, metadata domaines triés par impact) |
| GEO-193 | TC001, TC002 | Visual design (filter chips hover/active/disabled, responsive layout) |

**Remarque** : GEO-70-TC002 absent du CSV (saut TC001 → TC003) — comportement normal.

**Sélecteurs notables** :
- `BLUEPRINT.category_view.*` — KPI cards, brand matrix, brand rankings, questions table, perception topics, citation sources
- `BLUEPRINT.sidebar.nav_links.actions_center.selector` — navigation Actions Center
- `filtersButton` : `'button:has-text("Filters"), button[aria-label="Filters"], button[aria-label*="filter" i]'` (distinct des chips de favorabilité)
- Sélecteurs fallback `[class*="improvement"]`, `[class*="severity"]` pour l'Actions Center (pas encore de data-testid)

**Helpers** :
- `goToCategory(page)` — navigation vers `/dashboard/:uuid/category/:id`
- `openActionsCenter(page)` — URL directe + fallback sidebar si le heading n'est pas visible
- `test.afterEach` red-frame annotation hook (CLAUDE.md obligatoire)

---

## Epic 102 — GEO Dashboard Overview

**Fichier** : `.claude/Data/raw/playwright/test-suite-epic102.spec.js`
**Source CSV** : `.claude/Data/output/csv/testcases-coverage-epic102-20260430.csv`
**Généré** : 2026-04-30 | **Mis à jour** : 2026-05-02
**Total tests** : 117

| Story | TCs | Description |
|-------|-----|-------------|
| GEO-79 | TC001→TC010 | Dashboard sidebar layout, SPA navigation, active highlight, discard modal, report header, back button |
| GEO-78 | TC001→TC011 | Market/LLM filters (default, scope, persist, deselect, constraints, dropdown, disabled badge) |
| GEO-107 | TC001→TC011 | KPI cards (5 cards, quality labels Good/Fair/Poor, icons, ordinal Avg Pos, signed Sentiment, N/A) |
| GEO-77 | TC001→TC015 | Category Prioritization Matrix (axes, quadrants, tooltip, clusters, legend, market/LLM filters) |
| GEO-76 | TC001→TC014 | Brand Rankings (table, grouping, logo, trophy, expand, hover, sort, market/LLM filters, empty/error) |
| GEO-75 | TC001→TC019 | Top Concepts (sentiment strip, tabs, sort, detail panel, slider, sources modal, close, filters) |
| GEO-74 | TC001→TC023 | AI Citation Sources (legend bar, domain table, detail drawer, signals, modal, favorability, filters) |
| GEO-73 | TC001→TC007 | Perception Summary (first gen, cache, scopes, invalidation, filter integration, loading, error) |
| GEO-72 | TC001→TC004 | Executive Summary (display, reuse per run, loading state, error state) |
| GEO-71 | TC001→TC003 | Report Deletion (soft-delete dialog, quota decrement, error handling) |

**Changements par rapport à l'ancienne spec (51 tests → 117 tests)** :
- afterEach remplacé par la version obligatoire complète (banner fallback, CSS injection multi-sélecteur)
- 66 tests nouveaux (action KEEP manquants + action NEW du CSV)
- Tests supprimés car absents du nouveau CSV : GEO-79-TC011, GEO-107-TC012/TC013, GEO-71-TC004

**Sélecteurs notables** :
- `BLUEPRINT.sidebar.nav_links.*` pour la navigation sidebar
- `BLUEPRINT.overview_page.*` pour matrix, brand rankings, top concepts, citation sources
- `BLUEPRINT.drill_in_panel.*` pour les panneaux de détail
- `BLUEPRINT.top_section_actions.*` pour le header

**Helpers** :
- `openDashboard(page)` — goto + ensureSnapshot
- `openReportsList(page)` — goto REPORTS_URL
- `ensureSnapshot(page, label)` — navigation snaphots
- `screenshot(page, tcId, step)` — capture 3 étapes

---

## Epic 103 — Analysis Pipeline + Progress Display

**Fichier** : `.claude/Data/raw/playwright/test-suite-epic103.spec.js`
**Source CSV** : `.claude/Data/output/csv/testcases-coverage-epic103-20260430.csv`
**Généré** : 2026-04-30
**Total tests** : 25

| Story | TCs | Description |
|-------|-----|-------------|
| GEO-87 | TC001, TC002, TC003 | Analysis pipeline premier démarrage (auto-start, LLM failure handling, parallel execution) |
| GEO-86 | TC001→TC006 | Frontend progress display (SSE, états COMPLETED/COMPLETED_PARTIAL/FAILED, reconnexion) |
| GEO-85 | TC001→TC004 | Competitor enrichment (remplacement placeholders, AI normalization, trigger consumption) |
| GEO-84 | TC001→TC004 | Perception enrichment (triggers, stockage concepts, edge cases, stored vs computed fields) |
| GEO-83 | TC001→TC006 | Pipeline finalization (success/partial/failed, competitive enrichment, source extraction, classification 3 niveaux) |
| GEO-82 | TC001, TC002 | Improvement detection (8 types, stockage PostgreSQL pré-calculé) |

---

## Epic 104 — Report Creation Wizard

**Fichier** : `.claude/Data/raw/playwright/test-suite-epic104.spec.js`
**Source CSV** : `.claude/Data/output/csv/testcases-coverage-epic104-20260430.csv`
**Généré** : 2026-04-30
**Total tests** : 74

| Story | TCs | Description |
|-------|-----|-------------|
| GEO-94 | TC001→TC005 | Wizard shell (stepper, navigation, sticky header/footer, discard modal) |
| GEO-93 | TC001→TC005 | Brand search (autocomplete, debounce, option custom, validation) |
| GEO-92 | TC001→TC010 | Step 1 Markets (sélection pays, langue auto, primary, doublons, quota, suppression undo) |
| GEO-91 | TC001→TC013 | Step 2 Categories (discovery, custom, suppression, quota, Last One Rule, rate limiting) |
| GEO-90 | TC001→TC017 | Step 3 Questions (génération, édition inline, suppression undo, auto-ponctuation, quota, competitive banner) |
| GEO-89 | TC001→TC012 | Step 5 Review & Launch (LLM cards, smart-select, atomic save, double validation backend, redirect) |
| GEO-88 | TC001→TC012 | Quota enforcement (market, category, question, LLM quotas, bannières, validation backend) |

---

## Epic 105 — Reports List + Auth & RBAC

**Fichier** : `.claude/Data/raw/playwright/test-suite-epic105.spec.js`
**Source CSV** : `.claude/Data/output/csv/testcases-coverage-epic105-20260430.csv`
**Généré** : 2026-04-30
**Total tests** : 18

| Story | TCs | Description |
|-------|-----|-------------|
| GEO-95 | TC001→TC009 | Reports list (champs, badges statut, tri, filtre, pagination, perf <1s, Reader RO, multi-tenant) |
| GEO-96 | TC001, TC002, TC003 | Module activation (unactivated → upgrade, empty state, list affiché) |
| GEO-97 | TC001→TC006 | Auth & RBAC (Auth0 login + org context, token 401, Reader cannot create/edit/delete) |

---

## Epic 174 — Brand Identity (v0.2)

**Fichier** : `.claude/Data/raw/playwright/test-suite-epic174.spec.js`
**Source CSV** : `.claude/Data/output/csv/testcases-coverage-epic174-20260430.csv`
**Généré** : 2026-04-30
**Total tests** : 72

| Story | TCs | Description |
|-------|-----|-------------|
| GEO-184 | TC001→TC008 | Brand Image wizard (tab order/rename, 10 questions défaut, CRUD, quota 20, reset, per-market, step 4 review, payload backend) |
| GEO-185 | TC001, TC002 | Backend storage (raw JSON stocké tel quel, brand image questions non dispatchées si absent) |
| GEO-186 | TC001, TC002 | Business rules + multi-tenant scoping (organisation_id enforced) |
| GEO-187 | TC001→TC013 | Overview layout (3 sections sticky tabs, scroll-spy, sticky header, sidebar nav, category view exclusion, perf/sources inchangés) |
| GEO-188 | TC001→TC010 | Corporate Reputation cards (grille 2×2, contenu, couleur sentiment, hover, filtre marché, empty state, perf, isolation) |
| GEO-189 | TC001→TC018 | Drill-in panel (ouverture, loading, All tab InBrief, tabs per-LLM, sources, modal All Sources, cache, fallback, keyboard a11y) |
| GEO-190 | TC001→TC015 | Brand Territory chart (render, bulles nom/%, taille proportionnelle, légende, hover tooltip, clic panel détail, filtre marché) |
| GEO-191 | TC001→TC004 | Backward compatibility (V0.1 graceful degradation, Category View stable, partial market data) |

---

## Résumé global

| Spec | Type | Stories / Features | Tests | CSV source |
|------|------|--------------------|-------|------------|
| create-default-analysis.spec.js | E2E | Création analyse Chanel | 1 (16 steps) | create-default-analysis.csv |
| create-analysis-markets-1LLM.spec.js | E2E | Création analyse YSL / 2 marchés / 1 LLM | 1 (17 steps) | create-analysis-markets-1LLM.csv |
| verify-analysis-ysl.spec.js | E2E | Vérification analyse YSL | 1 (8 steps) | verify-analysis-ysl.csv |
| test-suite-epic99.spec.js | Epic | GEO-56, GEO-57, GEO-55, GEO-235 | 19 | testcases-coverage-epic99-20260430.csv |
| test-suite-epic100.spec.js | Epic | GEO-61, GEO-60 | 18 | testcases-coverage-epic100-20260430.csv |
| test-suite-epic101.spec.js | Epic | GEO-70, GEO-69, GEO-68, GEO-67, GEO-66, GEO-65, GEO-64, GEO-63, GEO-62, GEO-193 | 55 | testcases-coverage-epic101-20260430.csv |
| test-suite-epic102.spec.js | Epic | GEO-79, GEO-78, GEO-107, GEO-77, GEO-76, GEO-75, GEO-74, GEO-73, GEO-72, GEO-71 | 117 | testcases-coverage-epic102-20260430.csv |
| test-suite-epic103.spec.js | Epic | GEO-87, GEO-86, GEO-85, GEO-84, GEO-83, GEO-82 | 25 | testcases-coverage-epic103-20260430.csv |
| test-suite-epic104.spec.js | Epic | GEO-94, GEO-93, GEO-92, GEO-91, GEO-90, GEO-89, GEO-88 | 74 | testcases-coverage-epic104-20260430.csv |
| test-suite-epic105.spec.js | Epic | GEO-95, GEO-96, GEO-97 | 18 | testcases-coverage-epic105-20260430.csv |
| test-suite-epic174.spec.js | Epic | GEO-184, GEO-185, GEO-186, GEO-187, GEO-188, GEO-189, GEO-190, GEO-191 | 72 | testcases-coverage-epic174-20260430.csv |
| **TOTAL** | | **48 stories + 3 E2E** | **401 tests** | |

**Règles appliquées à toutes les specs** :
- `test.afterEach` red-frame annotation (encadré rouge #dc2626 sur l'élément défaillant, banner fallback si absent du DOM)
- Screenshots 3 étapes : `step1_given`, `step2_when`, `step3_then`
- `SCREENSHOTS_DIR` : `.claude/Data/output/reports/screenshots-epic{ID}/`
- `BLUEPRINT` importé via `require('../test-data/selectors_blueprint.json')`
- Sélecteurs CSS exacts des étapes Given/When/Then du CSV — aucune reformulation
