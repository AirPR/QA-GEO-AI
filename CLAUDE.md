# QA Workflow

This repository contains a Claude-driven QA pipeline.

## Architecture

    .claude/
    ├── commands/   ← Prompts des slash commands (source unique, chargé par /)
    ├── agents/     ← 10 agents IA (rôle + règles, référencent commands/)
    └── Data/
        ├── raw/        ← Données brutes en entrée (PRD, Jira, Playwright)
        ├── processed/  ← Données transformées et enrichies
        └── output/     ← Livrables finaux (CSV, bugs, rapports)

## Workflow en 10 étapes

    STEP 1  /read-prd          → prd-analyst-agent        → functional_requirements.json
    STEP 2  /fetch-jira        → jira-reader-agent         → acceptance_criteria_mapped.json
    STEP 3  /analyze-req       → testcase-generator-agent  → testcases_draft.json
            /gen-tests                                      → testcases_reviewed.json
    STEP 4  /export-csv        → csv-formatter-agent       → testcases_import_YYYYMMDD.csv
    STEP 5  /import-qp         → qualityplus-importer-agent → Quality Plus (API)
    STEP 6  /run-tests --epic ID --url URL → playwright-runner-agent → test-suite-epic{ID}.spec.js
                                                                      → test-results-epic{ID}-raw.json
    STEP 7  /export-results    → results-exporter-agent    → results_parsed.json
    STEP 8  /create-bugs       → bug-reporter-agent        → Jira + Quality Plus (API)
    STEP 9  /gen-report-all-epics → report-gen-all-epics-agent → runs/DDMMYYYY-HHMM/Report-forAllEpics.html
    STEP 10 /regression-test --current VERSION --previous VERSION[,VERSION] [--url URL] [--run?] [--gen-missing?]
                              → regression-test-agent      → output/regression/regression-coverage-YYYYMMDD.md
                                                             output/regression/regression-coverage-YYYYMMDD.json
                                                             runs/DDMMYYYY-HHMM/REGRESSION-Report.html (si --run)

## Campagne complète d'un epic — testeur senior

    /senior-qa-campaign {EPIC} {VERSION} [--url URL] [--from PHASE] [--only PHASES] [--stories KEYS]
      → senior-qa-tester-agent (exécuté dans la conversation principale : il délègue chaque phase)
      0 preflight → 1 /import-jira-epic → 2 analyse (commentaires, AC) → 3 /gen-tc-csv (revue)
      → 4 /gen-test-plan → 5 /GEO-prepare-jdd (GEO-jdd-preparer-agent) → 6 /run-mcp-PWT-tests par story
      → 7 triage ({EPIC}-RUN-FINDINGS.md, validation groupée) → 8 /create-bugs, /run-and-report
      → 9 /consolidate-epic-report (epic-report-consolidator-agent, build-epic-consolidated-report.js)

## Variables d'environnement requises

    JIRA_URL          URL de l'instance Jira
    JIRA_TOKEN        Token API Jira (Personal Access Token)
    JIRA_EMAIL        Email du compte Jira
    JIRA_PROJECT_KEY  Clé du projet Jira cible
    QP_URL            URL de l'instance Quality Plus
    QP_TOKEN          Token API Quality Plus
    QP_PROJECT_ID     ID du projet Quality Plus
    BASE_URL          URL de l'application à tester (pour Playwright)

## Conventions de nommage

    tc_id     : TC-[STORY_KEY]-[NNN]        ex: TC-PROJ42-001
    bug_id    : BUG-[STORY_KEY]-[NNN]       ex: BUG-PROJ42-001
    Fichiers  : [type]_YYYYMMDD.[ext]       ex: testcases_import_20260401.csv

## Conventions Playwright (multi-epic)

Strict separation between **working artifacts** (in `processed/`) and **final
deliverables** (in `output/`). Screenshots and HTML reports are deliverables ; raw
JSON, parsed JSON, logs and the native Playwright report are working artifacts.

    CSV source       : .claude/Data/output/csv/testcases - epic{ID}.csv
    Spec file        : .claude/Data/raw/playwright/test-suite-epic{ID}.spec.js
    Raw results      : .claude/Data/raw/playwright/test-results-epic{ID}-raw.json

    Working artifacts (intermediate, not for sharing):
    .claude/Data/processed/testcases/test-results/      ← single shared folder for all epics
        ├── test-results-epic{ID}-real.json             ← parsed results consumed by the report scripts
        ├── execution-log-epic{ID}.txt                  ← raw Playwright log
        └── execution-log-epic{ID}-*.txt                ← ad-hoc logs (rerun, sanity)


    Final deliverables (shareable, single root):
    .claude/Data/output/reports/
        ├── screenshots-epic{ID}/                        ← TRANSIENT buffer: Playwright writes here during /run-tests,
        │                                                   then build-multi-epic-report.js MOVES it into runs/{TS}/
        │                                                   (copy + delete), so this folder never lingers after a
        │                                                   report is generated — only the frozen copy under runs/ stays.
        └── runs/                                        ← every run is fully autonomous (no root-level "current")
            └── DDMMYYYY-HHMM/
                ├── Report-forAllEpics.html             (frozen HTML)
                └── screenshots-epic{ID}/               (frozen copies of screenshots at run time)

    → To open the latest report, sort `runs/` by name (timestamps are naturally sortable) and pick the most recent.

    The dashboard uses the locked 3-section design (blue summary + epic list, compact stats, accordion Epic→Story→TC). It is produced by:
    .claude/Data/templates/build-multi-epic-report.js [--epics ID,ID,...] [--date YYYY-MM-DD]
        - No flag        → auto-discover every epic with a real.json
        - --epics list   → restrict to those epic IDs (output filename and structure unchanged)
        - Always writes inside `output/reports/runs/{DDMMYYYY-HHMM}/Report-forAllEpics.html`
        - Reads epic + story titles from .claude/Data/raw/test-data/epics-meta.json (single source of truth)

    → Screenshot paths inside HTML reports: `screenshots-epic{ID}/<file>.png` (siblings)
    → A new epic = a new pair of files in `test-results/` and a new `screenshots-epic{ID}/`
    → No overwrite between epics

## Règle de placement des artefacts d'epic (OBLIGATOIRE)

- Parsed JSON + logs → `processed/testcases/test-results/` (single shared folder, all epics)
- Final HTML deliverables → `.claude/Data/output/reports/`
- Screenshots → `.claude/Data/output/reports/screenshots-epic{ID}/` (sibling of the HTML so paths stay short)
- Spec files set `SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-epic{ID}')`

## Règles du projet

- Les modifications se font dans .claude/commands/ (source unique)
- Les agents dans .claude/agents/ référencent commands/ pour le prompt complet
- Les dossiers raw/ ne doivent contenir que des données non modifiées
- Les fichiers processed/ sont générés automatiquement, ne pas modifier manuellement
- Les fichiers output/ sont les seuls livrables destinés à être partagés
- Ne pas créer de fichiers temporaires (README, backup, scripts de debug)

## Création du real.json pour un nouveau spec E2E (OBLIGATOIRE)

À la **première exécution** d'un nouveau spec, créer manuellement le `test-results-{spec}-real.json` dans `processed/testcases/test-results/` avec :
- Les `steps[]` = textes exacts des `test.step()` du spec
- Les `screenshots[]` = noms exacts passés à `shot(page, '...')` dans le spec (préfixés par `screenshots-{spec}/`)
- **Ne jamais dériver les noms de screenshots depuis les titres de steps** — toujours lire les appels `shot()` dans le code

Après cette création initiale, `refreshRealFromRaw` met à jour automatiquement `status` / `duration` / `error` à chaque run — les screenshots et steps ne sont jamais écrasés.

## Mise à jour d'un TC existant (OBLIGATOIRE)

Quand on modifie un spec (ajout/modification de `test.step()`, nouveau step, renommage) :
1. **Mettre à jour le CSV** — ajouter/modifier les lignes du TC concerné
2. **Mettre à jour le real.json** manuellement — éditer les `steps[]` du TC dans `processed/testcases/test-results/test-results-{spec}-real.json`
   - `refreshRealFromRaw` ne met à jour que `status` / `duration` / `error` — PAS les steps ni les screenshots
3. **Relancer le test** pour que le raw JSON soit à jour
4. **Régénérer le rapport** (`node build-e2e-suite-report.js` ou `build-multi-epic-report.js`)

## Règles d'exécution des tests (STRICT)

- Utiliser les textes EXACTS des étapes Given/When/Then du CSV dans les logs et le rapport — aucune reformulation
- Si le CSV dit "un message X est affiché", vérifier que ce message est VISIBLE dans le DOM — pas d'interprétation alternative (ex: "dropdown vide" ≠ "No results found")
- Si l'assertion échoue → le test est FAILED, point final — ne jamais marquer PASSED un test qui échoue
- Toujours explorer/naviguer dans l'application (inspection DOM, clics, navigation) avant de conclure qu'une fonctionnalité n'existe pas
- Ne jamais assouplir les assertions pour faire passer un test
- Demander confirmation à l'utilisateur avant d'adapter ou modifier un cas de test

## Capture de l'élément en erreur — règle universelle (OBLIGATOIRE)

Pour TOUTE assertion susceptible d'échouer sur un élément visible dans le DOM :
- **Toujours prendre un `shotAt(page, element, ...)` AVANT le `.toBe()` / `.toEqual()` / `.toContain()`**
- Cela garantit que le rapport montre l'état réel de l'app au moment de l'échec
- S'applique en particulier aux cas où `afterEach` ne peut pas annoter :
  - Éléments éphémères (tooltip, dropdown, modal) qui disparaissent avant `afterEach`
  - Assertions de valeur (`.toBe()`, string comparison) sans sélecteur CSS dans l'erreur
  - Steps intermédiaires (Given/When) qui ne produisent pas de `step3_then`

```js
// Obligatoire — capturer l'élément AVANT l'assertion
await shotAt(page, element, `${TC_ID}_step_description`);
expect(actualText).toBe(expectedText);
```

## Annotation automatique des échecs (OBLIGATOIRE)

Tout spec file généré par /run-tests DOIT inclure le bloc `test.afterEach` défini dans `commands/run-playwright.md`.
Ce hook est générique et s'applique à tous les epics :
- Pour tout test FAILED, il extrait le sélecteur CSS de l'erreur Playwright
- Il applique un cadre rouge (`outline: 4px solid #dc2626`) sur l'élément défaillant dans le DOM
- Si l'élément est caché, il remonte au premier ancêtre visible
- Il écrase le screenshot `{TC_ID}_step3_then.png` avec la version annotée
→ Le rapport HTML affiche automatiquement le cadre rouge pour chaque test échoué

## Annotation manuelle pour failures `.toBe()` — comparaisons de valeurs (OBLIGATOIRE)

`H.registerAfterEach` annote automatiquement les échecs `.toBeVisible()` (sélecteur Playwright dans l'erreur).
Pour les assertions `.toBe()` (comparaisons de valeurs : totaux, comptages, stat cards), il n'y a **pas** de sélecteur → pas d'annotation automatique.

**Règle** : quand deux valeurs sont comparées et que l'une provient d'un élément visible, encadrer cet élément si mismatch, AVANT `shotAt` :

```js
if (actualValue !== expectedValue) {
  await page.evaluate((val) => { /* paintOverlay sur l'élément source */ }, expectedValue);
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
}
await shotAt(page, cardEl, `${TC}_step3_then`);           // step3_then existe → isCustomError=true → afterEach conserve le screenshot
await page.evaluate(() => { document.querySelectorAll('[data-qa-annotation="bug"]').forEach(el => el.remove()); });
expect(actualValue, '...').toBe(expectedValue);
```

- Encadrer l'élément **censé afficher la bonne valeur** (ex: la stat card)
- Pattern complet dans `playwright-script-generator-agent.md` §"Annotation manuelle pour failures `.toBe()`"

## Capture screenshots — pas de "screenshot missing" dans le rapport (OBLIGATOIRE)

Le rapport HTML attend exactement 3 screenshots par TC (`step1_given`, `step2_when`,
`step3_then`). Si un fichier est absent sur disque, le rapport affiche un placeholder
`(screenshot missing)` — interdit en livrable.

Règle : à la fin du `test.afterEach`, après l'écriture annotée de `step3_then.png`,
**backfiller** les `step1_given` et `step2_when` qui n'existent pas encore sur disque
(test échoué avant d'atteindre son screenshot explicite). Le contenu reflète l'état de
la page au moment de l'échec — meilleur qu'un placeholder vide.

```js
for (const step of ['step1_given', 'step2_when']) {
  const p = path.join(SCREENSHOTS_DIR, `${tcId}_${step}.png`);
  if (!fs.existsSync(p)) {
    await page.screenshot({ path: p, fullPage: false }).catch(() => {});
  }
}
```

→ Ne jamais écraser un screenshot existant (le helper l'a déjà capturé à un meilleur
   moment). N'écrire que ceux qui manquent.

## Mise à jour de Docs/HowTo.txt avant tout commit (OBLIGATOIRE)

Avant chaque commit demandé par l'utilisateur, vérifier si des apprentissages
de la session courante méritent d'être documentés dans `Docs/HowTo.txt` :

- Nouvelles règles opérationnelles découvertes (sélecteurs, comportements UI, patterns)
- Corrections de bugs ou de configurations (JDD, spec, config Playwright)
- Nouvelles commandes ou workflows utilisés
- Tout ce qui éviterait de répéter la même erreur lors d'une prochaine session

**Procédure :**
1. Lire `Docs/HowTo.txt` pour identifier le dernier numéro de TÂCHE
2. Ajouter une section datée avec les nouvelles TÂCHE(s) numérotées à la suite
3. Inclure `Docs/HowTo.txt` dans le commit

**Exceptions — ne pas ajouter si :**
- La session n'a produit aucune nouvelle règle (ex : simple relecture, question)
- L'information est déjà présente dans le fichier
- L'utilisateur indique explicitement de ne pas mettre à jour HowTo.txt

## Règles Git (OBLIGATOIRE)

- **`git pull` = uniquement `git pull origin main`** — jamais autre chose sans confirmation explicite
- **Ne jamais lancer `git reset --hard` ou `git clean -fd`** sans demander confirmation à l'utilisateur — ces commandes sont irréversibles et suppriment définitivement les fichiers non commités
- **En cas de conflit lors d'un pull** : expliquer les conflits à l'utilisateur et attendre sa décision avant d'agir
- **Avant toute opération destructive** (reset, clean, force push) : vérifier `git status`, signaler les fichiers non commités à risque, et obtenir une confirmation explicite
- **Fichiers non commités = données précieuses** : toujours vérifier `git status` avant un pull pour identifier les fichiers à risque
- **`rm -rf runs/` = INTERDIT** — supprime TOUS les runs historiques définitivement. Toujours supprimer uniquement le sous-dossier ciblé :
  ```bash
  # ✅ Supprimer un run spécifique
  rm -rf .claude/Data/output/reports/runs/30052026-1104/
  # ❌ Interdit — supprime tout l'historique
  rm -rf .claude/Data/output/reports/runs/
  ```

## Règles de génération de spec Playwright (OBLIGATOIRE)

- **Toujours mettre à jour `selectors_blueprint.json`** en même temps que la génération d'un spec :
  - Ajouter une section dédiée par page/feature couverte (ex: `category_view`, `live_analysis_progress`)
  - Inclure chaque sélecteur utilisé dans le `SEL` object du spec
  - Marquer les sélecteurs fallback (`class*=`) avec `preferred_fix: data-testid="..."`
  - Fichier : `.claude/Data/raw/test-data/selectors_blueprint.json`
- **Toujours importer le blueprint dans chaque spec** :
  ```js
  const BLUEPRINT = require('../test-data/selectors_blueprint.json');
  ```
  Utiliser `BLUEPRINT.common_patterns.*` pour les patterns partagés (tooltip, skeleton loader, etc.)

## Authentification Auth0 (OBLIGATOIRE)

- `USE_AUTH=true` active le global-setup pour **tous** les epics — ne pas hardcoder dans le spec
- Commande : `EPIC_ID=XX USE_AUTH=true npx playwright test .claude/Data/raw/playwright/test-suite-epicXX.spec.js`
- Credentials : `GEO_USER_EMAIL` + `GEO_USER_PASSWORD` dans `.env` (copier depuis `.env.example`)
- Session sauvegardée : `.claude/Data/processed/auth/storageState.json`
- **Ne jamais committer `storageState.json`** — contient des cookies de session (données sensibles)
- Le `global-setup.js` parse `.env` manuellement — Playwright ne propage pas `.env` au processus globalSetup

## Architecture JDD (test-data)

- Deux couches : `common.json` (partagé tous epics) + `jdd/epic{ID}/default.json` (spécifique à l'epic)
- `default.json` surcharge ou complète `common.json` au chargement dans le spec
- Champs vides (`""`) = test skippé intentionnellement (ex : UUID non disponible, URL non configurée)
- `base_url` dans `common.json` : **sans trailing slash** (`/geo` et non `/geo/`)

## Règles d'extraction Figma (OBLIGATOIRE)

- Lire le `FIGMA_TOKEN` depuis `.env` — jamais en dur dans le code
- Exporter les frames par **batches de 3 maximum** pour éviter les timeouts API
- Dossier de sortie : `figmaScreens/` (pas de sous-dossier par epic)
- Exclure les frames de type `N0TE` (annotations uniquement, pas des écrans UI)
- Nommer les dossiers et fichiers avec un préfixe numérique (`01_`, `02_`…) pour maintenir l'ordre
- Remplacer les espaces par `_` dans les noms de fichiers

## Conventions de nommage E2E (OBLIGATOIRE)

- **tc_id format E2E** : `E2E-{FEATURE}-{NNN}` — distinct des TCs epic (`TC-[STORY_KEY]-[NNN]`)
  - ex : `E2E-CREATE-DEFAULT-001`, `E2E-MARKETS-1LLM-001`, `E2E-VERIFY-YSL-001`
- **1 fichier Markdown par spec E2E** — tous les scénarios du spec dans le même fichier (une section `## E2E-…` par scénario), jamais de fichiers `-01`, `-02`…
- **Fichier E2E** : `.claude/Data/output/csv/E2E-tests/{spec-name}.md` (pas de CSV ; un CSV Quality Plus se génère à la demande) — `E2E-tests/` = suite E2E courante + `E2E-SUITE-INDEX.md` ; `GEO-R1.0/e2e-*.csv` = archive en lecture seule (revue KEEP / UPDATE / RETIRE à chaque `/gen-e2e-scenarios`)
- **Spec E2E** : `.claude/Data/raw/playwright/{spec-name}.spec.js` (pas de préfixe `test-suite-epic`)
- **Raw JSON** : `test-results-{SPEC_NAME}-raw.json` (via `SPEC_NAME` env var)

## Architecture specs E2E vs specs epic

- **Specs epic** : lancés avec `EPIC_ID=XX`, résultats nommés `test-results-epic{ID}-raw.json`
- **Specs E2E** : lancés avec `SPEC_NAME={name}`, résultats nommés `test-results-{name}-raw.json`
- **`playwright.config.js`** calcule `RUN_ID` : `EPIC_ID ? epic{ID} : (SPEC_NAME || 'unknown')`
- **Lancement individuel** : `SPEC_NAME=create-default-analysis USE_AUTH=true npx playwright test .../create-default-analysis.spec.js`
- **Lancement groupé** (projet `e2e-suite`) : `SPEC_NAME=e2e-suite USE_AUTH=true npx playwright test --project=e2e-suite`
- **Rapport groupé** : `node .claude/Data/templates/build-e2e-suite-report.js`

## Règles de sélection Playwright — cas spécifiques (OBLIGATOIRE)

→ Voir `.claude/docs/playwright-selectors.md` pour le détail complet.

Résumé des règles :
- **Plusieurs lignes identiques** : chaîner deux `.filter()` — jamais `.first()` seul
- **Toggles React** : re-requêter `[aria-checked="true"]` à chaque itération (handles stale après re-render)
- **Dropdowns** : ouvrir avant d'asserter, fermer avec Escape
- **Snapshot navigator** : pattern category (dropdown) ≠ pattern overview (liste directe)
- **Portabilité** : toujours lire DASHBOARD_UUID/CATEGORY_UUID via `process.env` avec fallback JDD
- **Recharts ScatterChart** : vérifier circle cluster + foreignObject + g[aria-label] (staging et prod)
- **Tooltips Radix UI** : hover (pas clic), sélecteur `[role="tooltip"]`, assert avec `.toBe()`
- **Accordion sidebar** : vérifier si déjà expandé avant de cliquer
- **Compatibilité staging/prod** : labels renommés (Market→Country, etc.) → regex multi-valeur; LLM buttons via `button[aria-label="..."]`; comptage avec `toBeGreaterThanOrEqual`


## Visual Testing, SOV multilingue, multi-epic, cookies (OBLIGATOIRE)

→ Voir `.claude/docs/playwright-advanced.md` pour le détail complet.

- **Visual Testing** : opt-in via `VISUAL_TESTING=true`, baselines dans `visual-snapshots/`, assertions APRÈS fonctionnelles
- **SOV multilingue** : `LOCALE=fr|es|en-us|en-gb`, `waitUntil: "load"` sur staging (networkidle impossible), sovSubtitle hardcodé dans le spec
- **Cookies** : naviguer vers l'URL AVANT `page.evaluate()` pour `document.cookie`
- **Deux storageState** : régénérer `storageState-upsell.json` avec dummy `--grep="DOES_NOT_EXIST"` avant run epic200
- **Multi-epics** : 4 workers pour TOUTE la suite (pas par epic) — jamais plus de 2 workers en rerun individuel


## Règles du test de régression (OBLIGATOIRE)

- **Commande** : `/regression-test --current VERSION --previous VERSION[,VERSION] [--url URL] [--run?] [--gen-missing?]`
- **Agent** : `regression-test-agent` — fichier `.claude/agents/regression-test-agent.md`
- **Source des versions** : `apps/geo/` — chaque sous-dossier est une version (ex: `GEO-R0.1`, `GEO-R0.2`, `GEO-R1.1`, `GEO-R1.15`, `GEO-R1.2`, `GEO-V1`)
- **Source des stories** : `apps/geo/{VERSION}/{EPIC_KEY}/epic-data.json` (champ `stories[]`, Stories et Tasks) ou fichiers `STORY_*.md` / `TASK_*.md` si `epic-data.json` absent
- **Détection couverture CSV** : colonne `QA Story task` dans `.claude/Data/output/csv/` — croiser avec la `story_key`
- **Classification** :
  - `COVERED` = CSV + spec `.spec.js` + `real.json`
  - `PARTIAL` = CSV uniquement, pas de spec automatisé
  - `UNCOVERED` = aucun CSV pour la story
- **Verdict couverture** : GO ≥ 80% | CONDITIONAL 60–79% | NO-GO < 60%
  - Calcul : `(covered + partial × 0.5) / total × 100`
- **Sorties** :
  - `.claude/Data/output/regression/regression-coverage-YYYYMMDD.md` — matrice lisible
  - `.claude/Data/output/regression/regression-coverage-YYYYMMDD.json` — données structurées
  - `.claude/Data/output/reports/runs/{DDMMYYYY-HHMM}/REGRESSION-Report.html` — rapport HTML (si `--run`)
- **Mode par défaut = dry-run** : sans `--run` ni `--gen-missing`, seule l'analyse de couverture est produite
- **`--gen-missing`** : déclenche `gen-tc-csv` séquentiellement pour chaque story `UNCOVERED` — opt-in uniquement
- **`--run`** : exécute les specs `COVERED` avec `--workers=2` maximum par spec — jamais plus
- **`--previous` obligatoire** : si absent, afficher les versions disponibles et demander à l'utilisateur
- **Ne jamais modifier les fichiers `raw/`** pendant l'analyse (lecture seule)
- **Ne jamais supprimer de storageState.json** sans demande explicite de l'utilisateur

## Règles /run-and-report — MCP Playwright (OBLIGATOIRE)

- **Preuve fournie par l'utilisateur** : si l'utilisateur partage des screenshots ou exports comme preuve d'un verdict, les accepter directement → uploader en pièce jointe Jira et poster le commentaire sans re-vérifier via MCP Playwright. Ne pas redemander confirmation de l'évidence déjà fournie.
- **Curl response sur Windows** : `/dev/stdin` non supporté → toujours sauvegarder la réponse `curl` dans un fichier `.tmp-jira/` puis parser avec `node -e "const j=require('./fichier.json')"`
- **Upload attachment + comment** : toujours faire l'upload d'abord, puis poster le commentaire avec le screenshot **affiché en image dans le corps** (jamais seulement son nom). Si `mediaApiFileId` absent (cas habituel) → `POST /rest/api/2/issue/{key}/comment` en wiki markup `!{fichier}.png|width=800!`. Uploader une copie suffixée `_YYYYMMDD` pour éviter les collisions de noms, puis vérifier via GET v3 que le commentaire contient exactement un nœud `media`
- **Seul le screenshot de preuve va dans Jira** : uniquement `bug_{KEY}_final.png` (l'image qui montre le verdict). Les `step{N}` restent en local comme trace — jamais uploadés ni insérés. Pas de section « Steps replayed » dans le commentaire (les étapes sont déjà dans le ticket)
- **Plusieurs pièces jointes** : uploader chaque fichier séparément avec un appel curl dédié — ne pas chaîner dans une seule commande `-F`

## MCP Playwright — Configuration --isolated (OBLIGATOIRE)

- Le flag `--isolated` est défini dans `.mcp.json` depuis le 2026-09-25
- **Sans `--isolated`** : les sessions précédentes laissent un verrou sur le contexte navigateur → tous les outils MCP `browser_*` sont bloqués au démarrage
- **Avec `--isolated`** : chaque session obtient son propre contexte isolé — aucun conflit
- Si les outils MCP browser semblent bloqués : vérifier que `--isolated` est présent dans `.mcp.json`

## Règles /import-jira-epic — clé Story/Task (OBLIGATOIRE)

- Le dossier des epics est `apps/geo/{VERSION}/{EPIC_KEY}/` (PAS `apps/geo/data/`)
- Fichiers locaux : `STORY_{KEY}_*.md` pour une Story, `TASK_{KEY}_*.md` pour une Task — les deux dans `epic.stories[]` (champ `type`)
- Si la clé fournie est une **Story ou Task** (pas un Epic) :
  - **Option A (recommandée)** : ajouter un fichier `STORY_{KEY}_{Title}.md` (ou `TASK_{KEY}_{Title}.md`) dans le dossier de l'epic parent existant et mettre à jour `epic-data.json` pour inclure la nouvelle story dans `epic.stories[]`
  - **Option B** : ré-importer l'epic parent complet (destructif — demander confirmation)
  - Ne jamais créer un dossier `{STORY_KEY}/` à la racine de la version — les stories vivent toujours sous leur epic parent
- Les ACs sont extraites du champ `description` si `customfield_10049` est vide

## Autonomie QA — ce que l'agent fait sans demander (OBLIGATOIRE, règle utilisateur 2026-10-22)

| Fait sans demander (puis le signale en une ligne) | Demande toujours une validation explicite |
|---|---|
| Commit + push des rapports consolidés, CSV, reviews, fichiers de constats, HowTo (après mise à jour du HowTo) | Toute écriture Jira : commentaire, création de bug, changement de statut, édition |
| Corrections de libellés évidentes dans les CSV (texte UI renommé, faute, nom de bouton constaté) | Créer / supprimer une analyse, changer la langue du compte (hors TC de langue), enregistrer dans Manage Scope ou le back office |
| Changer d organisation quand les données d un TC ou d un bug y sont (lecture / test), puis revenir sur QA-GEO et vérifier `/auth/me` (règle utilisateur 2026-11-09) | Créer, modifier ou supprimer des données (JDD, analyse, run, scope, réglage) dans une organisation autre que QA-GEO |
| Relances MCP en lecture seule et rapports consolidés | Changer un résultat attendu qui touche à un comportement (pas seulement un libellé) |
| Passer un bug créé en To Do ; remplir sprint et champs fixes (`/create-bugs`) | Qualifier un constat en bug ou en question PO |
| Commentaire Jira factuel sûr à ~95 % (résultat de retest vérifié, AC vérifiée, données demandées par le dev, question déjà décidée) — posté puis signalé en une ligne (règle utilisateur 2026-10-29) | Commentaire au moindre doute (qualification, ton envers le PO, fait incertain) |
| `/run-and-report` verdict BUG FIXED : poster le commentaire avec la capture de preuve intégrée, puis passer le bug en Passed QA (règle utilisateur 2026-10-29) | Tout autre verdict (CONFIRMED, NOT REPRODUCIBLE, fix partiel) |
| `/senior-qa-campaign` statuts Jira : au début des tests, epic + stories testées en QA In Progress ; à la fin (et après chaque retest), story avec bug ouvert → Action Needed, story validée → Passed QA, epic → Action Needed si une story l est, Passed QA si toutes le sont (règle utilisateur 2026-11-04) | |
| `/promote-passed-qa` : passer en Passed QA (+ commentaire) les tickets de la release sans bug ouvert ni TC en échec / en attente (règle utilisateur 2026-10-27) | |

- **Dossiers de run** : ne committer qu'**un seul dossier consolidé par epic**, nommé `runs/{VERSION}_{EPIC}_{DDMMYYYY-HHMM}/` (ex. `runs/GEO-R1.3_GEO-1209_22102026-1328/`) : rapport consolidé + captures. Une nouvelle consolidation crée un dossier à la nouvelle date et heure ; l'ancien est retiré du dépôt (avec accord). Les dossiers de run par story et de rerun restent en local, non commités.
- **Validation groupée** : à la fin d'un run ou d'une synchro, présenter UNE fois le fichier `apps/geo/{VERSION}/{EPIC}-RUN-FINDINGS.md` avec la colonne « Décision » pré-remplie (recommandation) ; l'utilisateur ne corrige que les lignes en désaccord ; appliquer ensuite tout d'un coup.
- **Avant de proposer un point** (bug ou question PO) : lire TOUS les commentaires de l'epic, de ses stories et des bugs liés (toutes dates, réponses en fil) et les AC ; écarter ce qui est déjà répondu ou sans AC / règle derrière ; joindre la capture annotée.
- **Messages** : tableau court, une ligne par point, recommandation par défaut (« sauf avis contraire je fais X ») ; ne pas répéter ce qui est déjà fait.
