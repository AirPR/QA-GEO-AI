# Story 12.1: Wizard — Brand Image Tab & Rename Sentiment Tab

**Story ID:** GEO-184
**Titre:** Story 12.1: Wizard — Brand Image Tab & Rename Sentiment Tab
**Statut:** Done
**Epic:** GEO-174 (EPIC-012)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-184

## User Story

**As** an Editor  
**I want** a Brand Image tab in Step 3 with 10 default open-ended questions per market, and the Sentiment tab renamed to Reputation  
**So that** I can configure brand identity questions alongside existing question types

## Acceptance Criteria

1. **Given** Editor on wizard Step 3, **When** loaded, **Then** 4 tabs in order: Brand Image, Reputation, Visibility Analysis, Competitive Analysis; former "Sentiment" tab is now labeled "Reputation" with identical content and behavior

2. **Given** Editor selects Brand Image tab for a market, **When** first load, **Then** 10 default brand image questions displayed (from PRD V0.2 Appendix) with `[brand]` replaced by configured brand name; loading state "Generating questions..." shown during initial generation

3. **Given** Editor on Brand Image tab, **When** edits/adds/deletes a question, **Then** question count updates in real-time; auto-punctuation appends "?" if missing; empty question input rejected — last saved version restored

4. **Given** Editor has 20 brand image questions for a market, **When** attempts to add 21st, **Then** action blocked with quota warning showing 20/20

5. **Given** Editor clicks "Reset" on Brand Image section, **When** reset completes, **Then** all 10 default questions restored

6. **Given** multiple markets configured, **When** Editor switches market tabs, **Then** brand image questions displayed per market with market-language translations; questions are brand-level (no category sub-sections)

7. **Given** Editor reaches Step 4 (Review), **When** summary renders, **Then** total question count includes brand image questions; brand image questions counted separately from category-scoped questions

## Technical Details

- **FRs couverts:** FR10b, FR11-ext
- **DB:** Add `BRAND_IMAGE` to question type enum
- **Scope:** Frontend + Backend + DB enum migration
- **Estimation:** ~3 jours

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
