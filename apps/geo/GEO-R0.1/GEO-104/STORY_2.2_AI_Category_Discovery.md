# Story 2.2: Step 2 — AI Category Discovery

**Story ID:** GEO-91  
**Titre:** [Story 2.2] Step 2 — AI Category Discovery  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-104 (EPIC-002)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-91

## User Story

**As** an Editor  
**I want** AI to detect relevant categories for my brand across my selected countries  
**So that** I don't have to manually research what categories apply

## Acceptance Criteria

1. **Given** an Editor transitioning from Step 1 to Step 2, **When** the system starts category discovery, **Then** an intermediate "Discovering Categories" screen is shown with:
   - Progress bar
   - Country status list
   - Note: "This typically takes 15-20 seconds"

2. **Given** category discovery completes successfully, **When** results are displayed, **Then**:
   - Each detected category shows an "AI GENERATED" badge
   - Categories are displayed in the primary market's language
   - Subtitle reads "We detected these categories for {Brand}"

3. **Given** the Editor on the categories result page, **When** they click "+ Add Category", **Then**:
   - They can enter a custom category name
   - The custom category is auto-translated for all markets
   - The custom category shows a "CUSTOM" badge

4. **Given** the Editor wants to remove a category, **When** they click the × icon on a category, **Then**:
   - A confirmation modal ("Removal") is shown
   - If only 1 category remains, the delete icon is hidden (Last One Rule)

5. **Given** category discovery returns 0 results, **When** the empty state is displayed, **Then** it shows an illustration + "Add Custom Category" CTA

6. **Given** the Editor with at least 1 category, **When** they click "Review Prompts", **Then** the system proceeds to Step 3

## Technical Details

### API Endpoint
- **POST** `/api/v1/analysis/discover-categories` (EDITOR role)

### Rate Limiting
- Redis Fixed Window: 100 RPM/org
- Key: `geo:ratelimit:wizard:{orgId}:{window}`

### AI Configuration
- Prompt API: `geo-wizard-discover-categories-v1` alias
- Model: Gemini Flash Lite

### Database
- **Flyway migrations:** `categories` table
  - reportId, name, origin, translations JSON

### Frontend
- CategoryAccordion component with expand/collapse for translations
- Edit Category modal (640x592px) with "Auto-translate" button

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 2.1c (Market Configuration)
- **Blocks:** Story 2.3 (Prompts Review requires categories)
