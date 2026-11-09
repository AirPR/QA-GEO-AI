# Story 5.5: Actions Center — Priority Source Targets & Detail Panel

**Story ID:** GEO-62  
**Titre:** [Story 5.5] Actions Center — Priority Source Targets & Detail Panel  
**Statut:** Backlog  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-101 (EPIC-005)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-62

## User Story

**As** an Editor  
**I want** to expand improvement areas and see priority source targets  
**So that** I have a concrete outreach plan for PR actions

## Acceptance Criteria

1. **Given** an Editor expanding an improvement area, **When** the detail panel opens, **Then** it shows:
   - Quick Stats (relevant KPIs for the issue)
   - Priority Source Targets (third-party domains with favorability, citation count, gap count)
   - Owned Media (brand-owned domains)
   - Competitor Media (competitor-owned domains)

2. **Given** Priority Source Targets listed, **When** displayed, **Then** each domain shows:
   - Favorability (Favorable/Neutral/Unfavorable)
   - Total citation count
   - Gaps count (questions where brand underperforms and domain is cited)
   - Per-LLM logo badges
   - Sorted by impact potential

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 5.4, 5.4b, 5.4c (improvement areas display)
