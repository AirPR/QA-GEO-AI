# Story 2.4: Step 4 — Review & Submit Configuration

**Story ID:** GEO-89  
**Titre:** [Story 2.4] Step 4 — Review & Submit Configuration  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-104 (EPIC-002)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-89

## User Story

**As** an Editor  
**I want** to review a summary of my configuration and select AI engines before submitting  
**So that** I can verify everything is correct before the analysis runs

## Acceptance Criteria

1. **Given** an Editor on Step 4, **When** the review page loads, **Then** it displays:
   - "Ready to analyze {Brand}" with subtitle "Configure your multi-country brand analysis"
   - 3 summary cards: Countries count, Categories count, Total Questions count
   - A section "What AI engines are you considering?" with LLM toggle cards

2. **Given** each LLM card, **When** displayed, **Then** it shows:
   - Logo
   - Name
   - Description
   - "Web search" checkbox
   - ON/OFF toggle
   - Default: Gemini ON, ChatGPT ON, others OFF

3. **Given** an Editor disabling ALL LLMs, **When** all toggles are OFF, **Then** the system auto-reactivates all LLMs (Smart-Select: never 0 active)

4. **Given** an Editor clicking "Review & Launch", **When** the configuration is submitted, **Then**:
   - The system performs double quota validation (frontend + backend re-check)
   - Saves atomically: report + markets + categories + questions + LLM config
   - Inserts `report_job_queue` entry with status PENDING
   - Increments `brand_markets_used` in quota
   - Returns 201 Created

5. **Given** the backend quota re-validation fails, **When** concurrent overcommit detected, **Then** the system returns 403 QUOTA_EXCEEDED with used/max/resetDate

6. **Given** a first-time configuration (no prior report), **When** saved successfully, **Then** the user is redirected to the report page (analysis starts automatically in V2)

7. **Given** a subsequent edit of an existing report, **When** saved successfully, **Then** changes are saved immediately; results produced at next scheduled weekly execution

## Technical Details

### API Endpoint
- **POST** `/api/v1/reports` (EDITOR role) — atomic save

### Validation
- Double validation: quota check at start AND end of configuration

### Frontend
- LlmToggleCard component with Web search checkbox
- ReviewSummary component with 3 metric cards

### Database
- **Flyway migrations:**
  - `llm_configurations` table
  - `report_job_queue` table

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 2.3 (Prompts Review)
- **Related:** Story 2.5 (Quota Validation)
