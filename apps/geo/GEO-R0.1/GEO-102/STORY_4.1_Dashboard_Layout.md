# Story 4.1: Dashboard Layout & Sidebar Navigation

**Story ID:** GEO-79  
**Titre:** [Story 4.1] Dashboard Layout & Sidebar Navigation  
**Statut:** Done  
**Assigné à:** (Non spécifié)  
**Epic:** GEO-102 (EPIC-004)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-79

## User Story

**As** an Editor  
**I want** to navigate between report views via a sidebar  
**So that** I can easily access Overview, Actions Center, Category Views, and Settings

## Acceptance Criteria

1. **Given** an Editor viewing a completed report, **When** the dashboard loads, **Then**:
   - A sidebar shows: Overview, Actions Center, Category Views (expandable with sub-items per category), Settings
   - The active view is highlighted
   - Navigation does not reload the page (SPA)
   - Pages load within 2 seconds

2. **Given** the Editor switches views, **When** they click a sidebar item, **Then**:
   - The content area updates
   - Market/LLM filter state persists

## Technical Details

### Frontend
- Sidebar layout component
- React Router for view navigation

### State Management
- Filter state in Zustand
- Persists across view navigation

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Blocks:** All other dashboard stories
