# E2E Test Suite — GEO Analytics

Suite de tests Playwright couvrant les principales fonctionnalités de `https://staging-geo.onclusive.com/geo`.

## Prérequis

```bash
# Copier et remplir les credentials
cp .env.example .env
# GEO_USER_EMAIL=...
# GEO_USER_PASSWORD=...
```

## Structure de la suite (12 specs)

| Spec | Périmètre |
|------|-----------|
| `create-default-analysis` | Création d'une analyse |
| `verify-analysis` | Vérification marchés / LLMs / catégories |
| `GEO-dashboard-overview` | Sidebar, filtres LLM, KPI cards, AI Perception |
| `manage-scope` | Marchés, catégories, LLM engines |
| `category-perception-citation` | Perception topics + AI Citation Sources |
| `category-top-concept` | Top concepts |
| `category-question-analysis` | Analyse des questions |
| `category-questions-table` | Tableau des questions (detail panel) |
| `category-kpi-cards-analysis` | KPI cards category |
| `category-brand-prioritization-analysis` | Brand prioritization matrix |
| `category-brand-rankings-analysis` | Brand rankings |

## Lancement

### Un spec individuel
```bash
SPEC_NAME=manage-scope USE_AUTH=true \
  DASHBOARD_UUID=<uuid> \
  npx playwright test .claude/Data/raw/playwright/manage-scope.spec.js --project=chromium
```

### Spec category (nécessite aussi CATEGORY_ID)
```bash
SPEC_NAME=category-perception-citation USE_AUTH=true \
  DASHBOARD_UUID=<uuid> \
  CATEGORY_ID=<uuid> \
  npx playwright test .claude/Data/raw/playwright/category-perception-citation.spec.js --project=chromium
```

### Suite complète
```bash
SPEC_NAME=e2e-suite USE_AUTH=true npx playwright test --project=e2e-suite
```

## Variables d'environnement

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `USE_AUTH` | Oui | Active l'authentification Auth0 |
| `DASHBOARD_UUID` | Oui | UUID du dashboard cible |
| `CATEGORY_ID` | Specs category | UUID de la catégorie cible |
| `BASE_URL` | Non | Par défaut : `https://staging-geo.onclusive.com/geo` |
| `JDD_PROFILE` | Non | Profil de données : `default`, `dyson`, `toyota`… |
| `TARGET_SNAPSHOT` | Non | Snapshot cible (ex : `05 mai`), sinon le dernier |
| `SPEC_NAME` | Oui | Nom du spec pour nommer le raw.json de sortie |

## Données de test (JDD)

Architecture 3 couches fusionnées via `deepMerge` :
```
test-data/jdd/common.json                          ← partagé tous specs
test-data/jdd/{spec}-base.json                     ← données métier du spec
test-data/jdd/{spec}-{profile}.json                ← surcharges par profil
test-data/jdd/category/{spec}-{profile}.json       ← idem pour les specs category
```

## Rapport

```bash
# Génère dans runs/{DDMMYYYY-HHMM}/
node .claude/Data/templates/build-e2e-suite-report.js

# Avec un nom de dossier personnalisé
node .claude/Data/templates/build-e2e-suite-report.js --run-name 12052026-1430-Workflow
```

Rapport HTML : `.claude/Data/output/reports/runs/{folder}/EXECUTION_REPORT_REAL_e2e-suite.html`
