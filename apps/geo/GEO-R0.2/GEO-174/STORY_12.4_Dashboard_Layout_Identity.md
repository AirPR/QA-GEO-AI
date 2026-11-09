# Story 12.4: Dashboard — Layout Identity / Performance / Sources

**Story ID:** GEO-187
**Titre:** Story 12.4: Dashboard — Layout Identity / Performance / Sources
**Statut:** Done
**Epic:** GEO-174 (EPIC-012)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-187
**Note:** Parallélisable (peut démarrer indépendamment des Stories 12.1-12.3)

## User Story

**As** an Editor  
**I want** the Overview and Category Views reorganized into 3 sections (Identity, Performance, Sources) with sticky tab navigation  
**So that** I can quickly navigate between brand identity, performance metrics, and citation sources

## Acceptance Criteria

1. **Given** Editor opens Overview, **When** page loads, **Then** 3 sections en scroll continu: Identity, Performance, Sources; sticky tab bar visible en haut

2. **Given** sticky tab bar, **When** user scrolls, **Then** onglet actif mis en évidence dynamiquement selon position de scroll (via `IntersectionObserver`); tab bar reste visible (`sticky top-0 z-10`)

3. **Given** sticky tab bar, **When** user clicks tab, **Then** page scrolle smooth vers cette section

4. **Given** Identity section in Overview, **When** renders, **Then** contient: AI Perception Summary, Corporate Reputation cards (FR32b), Brand Territory chart (FR32d), Sentiment & Key Concepts (FR32e)

5. **Given** Performance section in Overview, **When** renders, **Then** contient les composants V0.1 existants: 5 KPI cards, Category Prioritization Matrix, Brand Rankings

6. **Given** Sources section in Overview, **When** renders, **Then** contient les composants V0.1 existants: AI Citation Sources, Executive Summary

7. **Given** Editor opens a Category View, **When** page loads, **Then** même layout 3 sections; Identity section montre AI Perception Summary + Sentiment & Key Concepts (scoped à la catégorie); Corporate Reputation et Brand Territory NON affichés dans les Category Views

8. **Given** sticky tab navigation, **When** rendered, **Then** design: Inter 14px/500, `slate-500` inactif, `sky-700` actif, 2px underline indicator, `gap-8`, `py-3`, `transition-colors duration-150`

9. **Given** V0.1 components in Performance and Sources, **When** tested, **Then** aucune régression en fonctionnalité, data binding, ou behavior de filtres

## Technical Details

- **FRs couverts:** FR32-bi, FR32e (placement)
- **NFRs couverts:** NFR-BI2
- **Scope:** Frontend uniquement — refactoring layout pur
- **Estimation:** ~3 jours

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
