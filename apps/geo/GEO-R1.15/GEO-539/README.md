# GEO-539 — Persist AI summaries in backend

> EPIC-32 | Fix Version 1.2 | Label: August26

## Vue d'ensemble

Cette epic migre les résumés narratifs générés par l'IA (panels de perception sur les vues overview et category) d'un cache exclusivement côté navigateur vers un store server-side persistant. L'objectif est d'éliminer les regénérations redondantes pour chaque visiteur, chaque rechargement de page et chaque accès via lien partagé.

| Champ | Valeur |
|-------|--------|
| Epic | GEO-539 |
| Statut | QA In Progress |
| Assigné | Abdenasser Aroukhsiss |
| Fix Version | 1.2 (2026-09-24) |
| Créée | 2026-05-22 |
| Jira | https://onclusive.atlassian.net/browse/GEO-539 |

## Stories

| # | Story ID | Titre | Statut |
|---|----------|-------|--------|
| 1 | US1.1 | Generate and store on first request | ⏳ TBD |
| 2 | US1.2 | Serve the stored summary on every repeat request | ⏳ TBD |
| 3 | US1.3 | Identify summaries by their full input combination | ⏳ TBD |
| 4 | US1.4 | Treat an unreadable stored summary as a miss | ⏳ TBD |
| 5 | US1.5 | Email and export reuse stored summaries | ⏳ TBD |

> Les stories sont définies inline dans la description de l'epic Jira. Aucun ticket story séparé n'existe pour l'instant (Story ID: TBD).

## Architecture / Points clés

- **Clé de cache:** `{ analysisId, scope, categoryId?, country, engineIds[] (triés) }`
- **Génération lazy maintenue** — aucune précalculation avant la première demande
- **Invalidation** à chaque re-run de l'analyse
- **Fallback** sur les entrées corrompues : régénération transparente + remplacement de l'entrée corrompue
- **Consommateurs downstream** (email, export) : même chemin de lecture que l'UI

## Fichiers

```
GEO-539/
├── EPIC.md                                               ← vue d'ensemble + scope + AC synthèse
├── STORY_GEO-539-US1.1_Generate_and_store_on_first_request.md
├── STORY_GEO-539-US1.2_Serve_stored_summary_on_repeat_request.md
├── STORY_GEO-539-US1.3_Identify_summaries_by_input_combination.md
├── STORY_GEO-539-US1.4_Treat_unreadable_stored_summary_as_miss.md
├── STORY_GEO-539-US1.5_Email_and_export_reuse_stored_summaries.md
├── README.md                                             ← ce fichier
├── INDEX.md                                              ← index numéroté + progression
└── epic-data.json                                        ← données structurées (source pour scripts)
```

## Liens

- Epic Jira : https://onclusive.atlassian.net/browse/GEO-539
