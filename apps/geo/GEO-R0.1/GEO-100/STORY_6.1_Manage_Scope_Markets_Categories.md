# Story 6.1: Manage Scope — Markets & Categories

**Story ID:** GEO-61  
**Titre:** [Story 6.1] Manage Scope — Markets & Categories  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-100 (EPIC-006)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-61

## User Story

**As** an Editor  
**I want** to add/remove markets and categories on an existing report  
**So that** I can adjust my analysis scope without creating a new report

## Acceptance Criteria

1. **Given** an Editor on the Settings/Manage Scope page, **When** they view the current scope, **Then** they see:
   - List of countries (with Primary indicator)
   - List of categories
   - Enabled LLM engines
   - Question counts per category/market
   - Analysis metadata (creation date, last analysis, execution time)

2. **Given** an Editor adding a new market, **When** they save the change, **Then**:
   - Quota is consumed (brand_markets_used + 1)
   - The change is included in the next scheduled execution
   - UI shows "Changes will take effect on next scheduled execution"

3. **Given** an Editor adding a new category, **When** they save, **Then**:
   - No additional brand_market quota consumed
   - Included in next scheduled execution

4. **Given** an Editor modifying questions or adding competitors, **When** they save, **Then**:
   - Changes persisted and applied on next run

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- None (independent story)

## Technical Notes

- Scope modifications are applied on the next scheduled execution
- Quota tracking is essential for market additions
- Category additions do not consume additional quota
- UI should provide clear feedback about when changes take effect
