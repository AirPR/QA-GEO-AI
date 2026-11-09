# EPIC-001: Authentification & Accès Module

**Epic ID:** GEO-105  
**Statut:** Done  
**Assigné à:** Abdenasser Aroukhsiss  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-105

## Description

L'utilisateur peut se connecter via Auth0, accéder à son organisation et voir l'état d'activation du module Mesure. Inclut la liste de rapports de base.

## Stories Associées

1. **[Story 1.1] Auth0 Login & Organization Context** (GEO-97)
   - As an Editor or Reader, I want to log in via Auth0 SSO and have my organization automatically resolved
   - So that I can securely access only my organization's data

2. **[Story 1.2] Module Activation Gate** (GEO-96)
   - As a user, I want the system to check if the Mesure module is activated for my organization
   - So that I'm redirected to the sales page if not activated, or shown the module if activated

3. **[Story 1.3] Report List (Basic)** (GEO-95)
   - As an Editor, I want to view a list of all reports for my organization with status and date
   - So that I can see what's been configured and its current state
