# Story 2.1b: Brand Search (Brandfetch)

**Story ID:** GEO-93  
**Titre:** [Story 2.1b] Brand Search (Brandfetch)  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-104 (EPIC-002)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-93

## User Story

**As** an Editor  
**I want** to search and select a brand with auto-complete suggestions  
**So that** I can identify my brand with its logo and domain

## Acceptance Criteria

1. **Given** an Editor on wizard Step 1, **When** they type a brand name, **Then** auto-complete suggestions appear with:
   - Logo from Brandfetch
   - Domain
   - Debounce: 300ms
   - A "Custom Brand" option is available if no match

2. **Given** an Editor with no brand entered, **When** they click "Discover Categories", **Then** the brand input shows a red border error

## Technical Details

### Frontend
- BrandSearch component

### API Endpoint
- **GET** `/api/v1/brands/search?q=` (requires EDITOR role)

### Backend
- BrandSearchProvider interface
- BrandfetchBrandSearchProvider implementation

### Response Contract
```json
[
  {
    "name": "string",
    "domain": "string",
    "logoUrl": "string"
  }
]
```

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Blocks:** Story 2.1c (Market Configuration requires brand to be selected)
