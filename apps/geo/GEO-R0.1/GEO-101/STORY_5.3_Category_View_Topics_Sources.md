# Story 5.3: Category View — Perception Topics & Citation Sources

**Story ID:** GEO-66  
**Titre:** [Story 5.3] Category View — Perception Topics & Citation Sources  
**Statut:** To Do  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-101 (EPIC-005)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-66

## User Story

**As** an Editor  
**I want** to see perception topics and citation sources per category  
**So that** I can understand reputation themes and source landscape for each category

## Acceptance Criteria

1. **Given** an Editor on a category view, **When** perception topics load, **Then** they show:
   - Topic clustering with sentiment filtering (All/Positive/Mixed/Negative)
   - LLM attribution badges per concept

2. **Given** an Editor viewing citation sources per category, **When** the sources load, **Then** they include:
   - Perception-related sources
   - Highlight reputation gaps (domains cited by competitors but not by the brand)

3. **Given** an Editor clicking on any source, **When** the source detail opens, **Then** it shows:
   - Full URL, page title, normalized domain
   - Which LLM(s) cited the source

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 5.1 (category view context)

## Notes

- Perception summary and concepts should be created from all response types (perception, visibility, competitive) not just perception
