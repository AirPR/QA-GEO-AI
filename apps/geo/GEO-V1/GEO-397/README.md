# Epic GEO-397: User Administration improvements

Données importées depuis Jira pour l'epic **GEO-397: User Administration improvements — organization config defaults, LLM allow-list, user editing & super-admin**

## Structure du Projet

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic — goal, scope, out-of-scope, AC épic-level |
| **README.md** | Ce fichier — index rapide et liens |
| **INDEX.md** | Index détaillé des fichiers, progression, composants clés |
| **epic-data.json** | Données structurées (epic + stories au format JSON) |

## Epic Overview

GEO-397 vise à renforcer le backoffice User Administration afin que les admins internes puissent configurer les organisations, gérer les utilisateurs et attribuer des droits super-admin sans quitter l'interface. Les changements couvrent :

- Correction des valeurs par défaut du formulaire organisation (Brand Image = 20, suppression Frequency, suppression Competitors auto-detected)
- Renommage "Brand x Markets max" -> "Markets"
- Remplacement du champ numérique "LLMs Max" par une liste de cases à cocher par LLM (ChatGPT, Gemini, Grok, Claude, Perplexity)
- Ajout d'une action Edit sur les utilisateurs existants
- Gestion du rôle Super admin à la création et modification d'un utilisateur
- Enforcement des restrictions du rôle READER dans GEO (bouton "New analysis" désactivé, toutes les entrées de création de rapport bloquées, accès lecture intact)

## Stories

Aucune story associée à ce jour. L'epic est prête pour QA — les stories seront ajoutées lors d'un prochain import.

## Accès Direct Jira

- **Epic :** https://onclusive.atlassian.net/browse/GEO-397
- **Projet :** https://onclusive.atlassian.net/browse/GEO

## Points Clés

- 8 Acceptance Criteria épic-level couvrant tous les périmètres fonctionnels
- Impact backoffice (création/édition d'organisation et d'utilisateur) + frontend GEO (restriction READER)
- Migration des données existantes : legacy LLMs-Max -> allow-list pré-cochée selon ordre canonique LLM
- Audit trail obligatoire pour les grants/revokes super-admin

## Out of Scope

- Pas de modification de l'authentification / SSO
- Pas de modification du branding / theming au niveau organisation
- Pas de nouveaux rôles customer-facing au-delà de READER et du rôle par défaut (full CRUD) en V1
