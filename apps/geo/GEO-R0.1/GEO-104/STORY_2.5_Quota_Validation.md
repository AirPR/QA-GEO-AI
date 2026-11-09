# Story 2.5: Quota Validation & Warning System

**Story ID:** GEO-88  
**Titre:** [Story 2.5] Quota Validation & Warning System  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-104 (EPIC-002)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-88

## User Story

**As** an Editor  
**I want** the system to validate quotas at each step and show clear warnings  
**So that** I don't exceed my organization's limits

## Acceptance Criteria

1. **Given** an Editor at any wizard step, **When** a quota limit is reached, **Then**:
   - The corresponding "+ Add" button is disabled
   - A yellow warning banner is shown with the specific limit message
   - Limits tracked: markets, categories, questions per type, LLMs

2. **Given** the brand_markets quota is about to be exceeded, **When** the Editor tries to add more markets than allowed, **Then** the system shows:
   - "You have reached the maximum number of markets you can add. Please contact our sales team if you wish to add more."

3. **Given** the Editor submits the configuration, **When** backend validates quotas, **Then** it checks:
   - `brand_markets_used + new_markets <= max_brand_markets`
   - `categories <= max_categories`
   - `questions per type <= max_q_{type}`
   - `enabled LLMs <= max_llms`
   - Returns 400 for structural limits
   - Returns 403 for brand_market quota exceeded

## Technical Details

### API Endpoint
- **GET** `/api/v1/quota` (EDITOR role)

### Frontend
- Warning banners per limit type with used/max counts

### Error Response
```json
{
  "error": "QUOTA_EXCEEDED",
  "message": "string",
  "used": 5,
  "max": 10,
  "resetDate": "2026-04-17T00:00:00Z"
}
```

### Backend Implementation
- QuotaValidator in geo-config-manager
- Double validation pattern

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Applies to:** All wizard steps (2.1 through 2.4)
