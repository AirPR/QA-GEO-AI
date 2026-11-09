# Index — Epic GEO-397

## Fichiers générés

| # | Fichier | Description | Statut |
|---|---------|-------------|--------|
| 1 | EPIC.md | Vue d'ensemble complète de l'epic (goal, scope, AC) | 🟨 Ready for QA |
| 2 | README.md | Index rapide et liens Jira | — |
| 3 | INDEX.md | Ce fichier — index détaillé | — |
| 4 | epic-data.json | Données structurées JSON (epic + stories) | — |

## Liens Jira

- Epic GEO-397 : https://onclusive.atlassian.net/browse/GEO-397
- Projet GEO : https://onclusive.atlassian.net/browse/GEO

## Progression

```
Epic GEO-397 — User Administration improvements
Status: 🟨 Ready for QA
Assignee: Youssef.AitLaydi
Created: 2026-05-11 | Updated: 2026-05-19

Stories: 0 (aucune story associée à ce jour)

Scope items:
  [1] Brand Image questions default = 20 ............. in epic scope
  [2] Remove Frequency field ......................... in epic scope
  [3] Remove Competitors auto-detected field ......... in epic scope
  [4] Rename Brand x Markets max -> Markets .......... in epic scope
  [5] Replace LLMs Max with checkbox allow-list ...... in epic scope
  [6] Allow editing existing users ................... in epic scope
  [7] Super-admin role at user creation/edit ......... in epic scope
  [8] Enforce READER role restrictions in GEO ........ in epic scope

Acceptance Criteria: 8 (epic-level)
```

## Détails

| Champ | Valeur |
|-------|--------|
| Epic ID | GEO-397 |
| Titre court | User Administration improvements |
| Statut | Ready for QA |
| Assigné | Youssef.AitLaydi |
| Créée le | 2026-05-11 |
| Mise à jour | 2026-05-19 |
| Nombre de stories | 0 |
| Nombre d'AC épic | 8 |

## Composants Clés

- **Backoffice — Organisation form** : création et édition (champs Brand Image, Frequency, Competitors, Markets, LLMs allow-list)
- **Backoffice — User management** : liste utilisateurs, création, édition, rôle super-admin
- **Audit trail** : log des actions grant/revoke super-admin (acteur, cible, action, timestamp)
- **Frontend GEO** : enforcement rôle READER (bouton "New analysis" désactivé + tooltip, toutes entrées création bloquées côté client et serveur)
- **Migration données** : legacy LLMs-Max -> allow-list pré-cochée selon ordre canonique LLM

## Note d'import

Import réalisé le 2026-05-21 depuis https://onclusive.atlassian.net/browse/GEO-397.
Aucune story enfant trouvée via `parent = GEO-397` ni via `Epic Link = GEO-397` au moment de l'import.
