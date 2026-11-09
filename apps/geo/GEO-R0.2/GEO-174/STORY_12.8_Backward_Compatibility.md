# Story 12.8: Backward Compatibility — V0.1 Reports

**Story ID:** GEO-191
**Titre:** Story 12.8: Backward Compatibility — V0.1 Reports
**Statut:** Done
**Epic:** GEO-174 (EPIC-012)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-191
**Dépend de:** Story 12.4 (GEO-187)

## User Story

**As** an Editor with a V0.1 report (no brand image data)  
**I want** the dashboard to display gracefully without errors  
**So that** existing reports continue to work after the V0.2 update

## Acceptance Criteria

1. **Given** report created before V0.2, **When** Editor opens Overview, **Then** Identity section affiche placeholder "No brand identity data — add Brand Image questions in Settings to enable this section"; sections Performance et Sources s'affichent normalement

2. **Given** V0.1 report, **When** Editor opens Category View, **Then** Identity section affiche AI Perception Summary et Sentiment & Key Concepts comme avant; aucune erreur liée aux brand image

3. **Given** V0.1 report, **When** Editor adds brand image questions via Manage Scope, **Then** analyse brand image s'exécute à la prochaine exécution planifiée sans nécessiter de re-run des types d'analyse V0.1 (NFR-BI7)

4. **Given** dashboard, **When** brand image data partially available (certains marchés avec données, d'autres sans), **Then** marchés sans données affichent "No data" au niveau dimension; marchés avec données s'affichent normalement

## Technical Details

- **NFRs couverts:** NFR-BI6, NFR-BI7
- **Scope:** Frontend + Backend (null-safe API responses)
- **Estimation:** ~1 jour
- **Dépend de:** Story 12.4

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
