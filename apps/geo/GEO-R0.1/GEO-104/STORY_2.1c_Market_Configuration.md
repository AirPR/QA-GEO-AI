# Story 2.1c: Market Configuration (Country + Language)

**Story ID:** GEO-92  
**Titre:** [Story 2.1c] Market Configuration (Country + Language)  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-104 (EPIC-002)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-92

## User Story

**As** an Editor  
**I want** to add countries with auto-detected language and designate a primary market  
**So that** I can define the geographic scope of my analysis

## Acceptance Criteria

1. **Given** an Editor with a brand selected, **When** they add a country, **Then**:
   - The language is auto-detected (e.g., France → French)
   - The language can be overridden via the edit icon
   - The first country is auto-marked as Primary when a second is added

2. **Given** an Editor adding a duplicate country+language combination, **When** they click "Discover Categories", **Then** the system shows an error on the duplicate rows

3. **Given** an Editor at the country quota limit, **When** they click "+ Add Country", **Then** the button is disabled and a warning banner is shown

## Technical Details

### Frontend
- CountryRow component

### Database
- **Flyway migrations:**
  - `markets` table: reportId, country, language, code, isPrimary
  - `quotas` table: (moved here to avoid forward dependency)

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 2.1b (Brand Search)
- **Blocks:** Story 2.2 (AI Category Discovery requires markets to be configured)
