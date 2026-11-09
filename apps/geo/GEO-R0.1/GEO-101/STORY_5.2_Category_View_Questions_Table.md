# Story 5.2: Category View — Unified Questions Table

**Story ID:** GEO-67  
**Titre:** [Story 5.2] Category View — Unified Questions Table  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-101 (EPIC-005)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-67

## User Story

**As** an Editor  
**I want** to see all questions for a category with per-LLM responses and favorability  
**So that** I can understand exactly how each AI engine answers

## Acceptance Criteria

1. **Given** an Editor on a category view, **When** the questions table loads, **Then** it shows:
   - All questions grouped by type (Visibility/Competitive/Perception)
   - Each row shows: question text, winner/themes, market flag, per-LLM rank badges
   - Favorability rules:
     - Visibility: Won=Favorable, Split=Neutral, Not Named=Unfavorable
     - Competitive: Won=Favorable, Split=Neutral, Lost=Unfavorable
     - Perception: Positive=Favorable, Mixed=Neutral, Negative=Unfavorable

2. **Given** an Editor filtering by favorability, **When** they select Favorable/Split/Not Favorable, **Then** the table filters accordingly (combinable with question type filter)

3. **Given** an Editor expanding a question row, **When** they click to expand, **Then**:
   - For visibility: full brand ranking list
   - For competitive: win/loss per LLM
   - For all: cited sources + full LLM response text per engine

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 5.1 (category view navigation)
