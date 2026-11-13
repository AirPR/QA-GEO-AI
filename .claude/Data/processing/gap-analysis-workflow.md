# Gap Analysis Workflow — Processing

Pipeline en **2 étapes** pour détecter les écarts de couverture entre les Acceptance Criteria documentés (specs GitHub) et les Test Cases du CSV de chaque epic, puis générer un CSV des TCs manquants.

---

## Étape 1 — Analyse des gaps

Script : `.claude/Data/templates/analyze-gaps.js`
Trigger : `/analyze-gaps [epic_id] [epic_jira_url]`
Agent : `gap-analyzer-agent`

### Inputs
| Source | Chemin | Rôle |
|---|---|---|
| Métadonnées stories | `.claude/Data/raw/specs/_stories-epic{ID}.json` | Mapping `story_key → spec_file + title` |
| Specs canoniques | `.claude/Data/raw/specs/<epicFolder>/*.md` | AC source (téléchargées de GitHub si absentes) |
| Test cases existants | `.claude/Data/output/csv/testcases - epic{ID}.csv` | TCs implémentés |
| Token GitHub | `.env` → `GITHUB_TOKEN` | Auth pour fetch repo privé `AirPR/geo-analytics` |

### Outputs
| Type | Chemin |
|---|---|
| Rapport markdown | `.claude/Data/output/gap-reports/gap-report-epic{ID}-YYYYMMDD.md` |
| Cache specs | `.claude/Data/raw/specs/<epicFolder>/*.md` (réutilisé entre runs) |

### 4 buckets par story
- ✅ **ACs couvertes par des TCs** — lien explicite AC → TC[s]
- 🆕 **ACs non couvertes dans le CSV** — à ajouter
- ⚠️ **TCs orphelins** — TC sans AC valide ou référençant une AC inexistante
- ❌ **Story sans spec exploitable** — pas de lien GitHub, lien cassé, ou format AC non reconnu

### Formats AC supportés (auto-détectés)
| Format | Pattern | Exemple d'epic |
|---|---|---|
| **A** | `### AC{N}: Title` | epic-12 (UI Wizard/Dashboard) |
| **B** | `1. **Given** … **Then** …` | epic-12 pipeline (12.2, 12.3) |
| **C** | `1. **Title:**` | epic-4 (Dashboard Overview) |

### Auto-détection du séparateur CSV
Le parser compare le nombre de `;` vs `,` dans le header et choisit le plus fréquent. Permet de gérer les exports Quality Plus dans les deux formats sans config.

### Mapping TC↔AC
La colonne `QA Story task` du CSV est la source. Patterns acceptés :
- `GEO-187 AC1 - Layout Identity` (epic 174 — préfixe story)
- `AC1 - Sidebar layout` (epic 102 — sans préfixe)
- `AC1 - X and AC2 - Y` (multi-AC : un TC couvre plusieurs ACs)

---

## Étape 2 — Génération CSV des TCs manquants

Script : `.claude/Data/templates/gen-missing-tests.js`
Trigger : `node .claude/Data/templates/gen-missing-tests.js {epic_id}` (à brancher sur un slash command si besoin)

### Output unique
`.claude/Data/output/gap-reports/gap-csv/missing-tests-epic{ID}-YYYYMMDD.csv`

### Format CSV (17 colonnes, séparateur `,`)
```
tc_id,Description,QA Priority,Test name,Test step,Test data,Expected result,
Labels,QA Parent,Components,Smoke,QA Components,QA Precondition,
UI/Functional Test case,QA Regression,QA Story task,Requirement
```

### Structure Cucumber
Chaque TC = **3 lignes CSV** : Given / When / Then (toutes les colonnes répétées sauf `Test step` et `Expected result`).

### Règles de classification (verrouillées)
| AC type | Détection | Action |
|---|---|---|
| **Functional** | Pas de marqueur `NFR-` ou `NFR-BIx` dans titre/body | TC `Functional`, `Requirement = AC` |
| **NFR Performance** | Marqueur NFR + keywords `performance`, `wall-clock`, `< X seconds`, `latency`, `throughput`, `p9X` | TC `Performance`, `Requirement = NFR (Performance)` |
| **NFR autre** (Security, Multi-Tenant, Regression, Accessibility, …) | Marqueur NFR sans keyword Performance | **SKIP** |

### Numérotation TC continue
Le script lit le CSV existant pour trouver le `max(TC{N})` par story et continue au-delà :
- Story sans aucun TC → commence à TC1
- Story avec 12 TCs existants → nouveaux TCs partent de TC13

### Extraction Given/When/Then
- **Format A & B** (epic-12) : extraction verbatim depuis le body de l'AC (présence de `**Given**`, `**When**`, `**Then**`)
- **Format C** (epic-4) ou body sans GWT explicite : fallback synthétique
  - `Given the system is configured per story "{title}"`
  - `When the behavior described by {AC_id} is exercised`
  - `Then {ac.title}`

### Propriétés dérivées par story
| Champ | Règle |
|---|---|
| `Components` / `QA Components` | Routage par titre : `wizard\|dashboard\|overview\|panel\|tab\|chart\|sidebar` → Frontend; `pipeline\|backend\|aggregation\|dispatch\|consumer` → Backend; sinon `Frontend,Backend` |
| `QA Priority` | `High` pour AC fonctionnel, `Medium` pour NFR Performance |
| `Smoke` | `No` (à valider manuellement avant promotion) |
| `QA Regression` | `Yes` |
| `Labels` | `geo-{epicId}-v0.2,{functional\|performance},{spec_filename_slug}` |
| `QA Story task` | `{STORY_KEY} {AC_id} - {AC.title:60}` |

---

## Pré-requis d'exécution

1. **GitHub access** : token avec scope `repo` autorisé pour l'org `AirPR` (SSO authorized). Token dans `.env` (`GITHUB_TOKEN=…`), jamais en clair dans la conversation.
2. **API Jira / Confluence** : `JIRA_URL`, `JIRA_EMAIL`, `JIRA_TOKEN` dans `.env` (le même token lit Jira et Confluence). Lecture Jira faite par l'agent en amont via curl REST, hors script Node — plus de connecteur Atlassian (MCP).
3. **Métadonnées stories** : fichier `_stories-epic{ID}.json` à constituer **manuellement** ou via l'agent au premier run (Jira + parsing des liens "Spec complète"). Format :
   ```json
   {
     "epicId": "174",
     "epicKey": "GEO-174",
     "epicTitle": "EPIC-12: Brand Identity Analysis (V0.2)",
     "baseUrl": "https://onclusive.atlassian.net",
     "githubRepo": "AirPR/geo-analytics",
     "githubBranch": "main",
     "githubBasePath": "docs/implementation-artifacts/epics",
     "githubEpicFolder": "epic-12",
     "specOrder": ["GEO-184", "GEO-185", …],
     "stories": {
       "GEO-184": { "title": "Story 12.1: …", "specFile": "12-1-….md" },
       …
       "GEO-XXX":  { "title": "…", "specFile": null, "noSpec": "manual_testing_story" }
     }
   }
   ```

---

## Limitations connues

- **Drift sémantique non détecté** : AC modifiée dans le spec mais TC pas mis à jour → ne sort pas en gap. Évolution future possible (hash AC entre runs).
- **Multi-AC inférence** : si un TC référence "AC1 et AC2" sans virgule, la regex `AC\d+` capture les deux ; mais une formulation très libre (« couvre les ACs liés à la perf ») n'est pas matchée.
- **NFR auto-détection par keywords** : si une AC n'a aucun marqueur `NFR-`, elle est traitée comme Functional même si elle est sémantiquement un NFR (ex: GEO-188 AC7 "Multi-Tenant Isolation" sans `NFR-` est classée Functional). Le mapping reste éditable à la main dans le CSV généré.
- **GitHub-only** : à ce jour le pipeline n'utilise pas Confluence (la source canonique est le GitHub `AirPR/geo-analytics`). Si un epic futur utilise Confluence, il faudra ajouter une stratégie d'extraction.

---

## Run d'exemple — Epic 174 (2026-04-29)

```bash
# 1. analyse
node .claude/Data/templates/analyze-gaps.js 174 https://onclusive.atlassian.net/browse/GEO-174
#   → 8 stories analysées, 64 ACs documentées, 36/64 couvertes (56%), 1 TC orphelin
#   → .claude/Data/output/gap-reports/gap-report-epic174-20260429.md

# 2. génération CSV des TCs manquants
node .claude/Data/templates/gen-missing-tests.js 174
#   → 25 TCs (23 Functional + 2 NFR Performance), 3 NFR non-Perf skipped
#   → .claude/Data/output/gap-reports/gap-csv/missing-tests-epic174-20260429.csv
```

| Métrique | Epic 174 | Epic 102 |
|---|---|---|
| Stories analysées | 8 | 11 |
| ACs documentées | 64 | 77 |
| ACs couvertes | 36 (56%) | 16 (21%) |
| TCs orphelins | 1 | 0 |
| Stories en erreur | 0 | 1 (story testing manuel sans spec GitHub) |
