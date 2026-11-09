# Story 2.1: Wizard Layout & Navigation

**Story ID:** GEO-94  
**Titre:** [Story 2.1] Wizard Layout & Navigation  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-104 (EPIC-002)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-94

## User Story

**As** an Editor  
**I want** a 4-step wizard layout with navigation controls  
**So that** I can progress through report configuration in a structured flow

## Acceptance Criteria

1. **Given** an Editor creating a new report, **When** the wizard loads, **Then** a 4-step stepper is displayed:
   - Brand & Country
   - Categories
   - Prompts
   - Review
   - Steps are navigable via Next/Back buttons
   - A sticky header shows current step title + progress bar
   - A sticky footer shows the CTA button

2. **Given** an Editor navigating back with unsaved changes, **When** isPristine is false, **Then** a "Discard Changes" modal is shown (462x222px)

## Technical Details

### Components
- WizardStepper component (4 steps)
- Sticky header with progress bar
- Sticky footer with CTA

### State Management
- Wizard state in Zustand (local, no URL deep-linking)

### Responsive Design
- ≥1280px: Full layout
- 1024-1279px: Compact layout
- <1024px: Blocked message

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
