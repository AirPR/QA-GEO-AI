# Story 7.3: Guided Tour

**Story ID:** GEO-55  
**Titre:** [Story 7.3] Guided Tour  
**Statut:** Backlog  
**Epic:** GEO-99 (EPIC-007)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-55

## User Story

**As** a new user  
**I want** a guided tour of the product  
**So that** I can understand the key features quickly

## Acceptance Criteria

1. **Given** a user accessing the product with a tour URL parameter, **When** the tour activates, **Then**:
   - It navigates automatically across views (Overview, Actions Center, Category)
   - Contextual tooltips are displayed for each step
   - The user can advance or skip steps

2. **Given** a guided tour is active, **When** the user completes or skips it, **Then**:
   - The tour has 8-12 steps total
   - Demo data is used if no real report exists
   - Tour completion is tracked for analytics

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- Story 7.1 (Immutable Snapshot Storage) — for demo data reference
- Story 7.2 (Snapshot Navigation) — if navigating snapshots in tour

## Technical Notes

- Tour activation via URL parameter (e.g., `?tour=true`)
- Steps should cover: Overview dashboard, Actions Center, Category View, Snapshots/History
- Contextual tooltips highlight key UI elements
- Demo data fallback for new accounts without reports
- Consider analytics tracking: tour started, step viewed, step skipped, tour completed
- Steps should be interactive and allow clicking through UI elements
- Consider mobile responsiveness for tour UI
