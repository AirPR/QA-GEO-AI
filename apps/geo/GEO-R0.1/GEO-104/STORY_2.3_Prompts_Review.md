# Story 2.3: Step 3 — Prompts Review (Sentiment, Visibility, Competitive)

**Story ID:** GEO-90  
**Titre:** [Story 2.3] Step 3 — Prompts Review  
**Statut:** Done  
**Assigné à:** Youssef.AitLaydi  
**Epic:** GEO-104 (EPIC-002)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-90

## User Story

**As** an Editor  
**I want** to review and customize the auto-generated questions for each category and market  
**So that** the analysis asks exactly what matters to my brand

## Acceptance Criteria

1. **Given** an Editor entering Step 3, **When** questions are being generated, **Then** a loading state "Generating questions..." with spinner is shown

2. **Given** questions are loaded, **When** the Editor views Step 3, **Then**:
   - Market tabs are shown at the top (flag + country name + language abbreviation)
   - 3 sub-tabs are available: Sentiment | Visibility Analysis | Competitive Analysis
   - Questions are grouped by category with "X QUESTIONS" counter and "Reset" button

3. **Given** the Editor hovers over a question, **When** hover actions appear (pencil + trash icons), **Then**:
   - They can edit inline (Enter to save, Escape to cancel)
   - Or delete (with undo toast 5s)

4. **Given** the Editor submits a question without "?", **When** the question is saved, **Then** "?" is auto-appended

5. **Given** the Editor clears a question text and submits, **When** they press Enter/Apply, **Then**:
   - The system rejects the empty input
   - The last saved version is restored

6. **Given** the Editor types invalid characters (e.g., "!!!", single letter "A"), **When** they submit, **Then** the input shows error state (59px height) with "Please enter a valid question."

7. **Given** the Editor clicks "+ Add Question" beyond the quota limit, **When** the quota is reached, **Then** a blocking toast notification is shown

8. **Given** the Competitive Analysis sub-tab, **When** the Editor views competitive questions, **Then**:
   - An info banner explains "Competitors will be automatically detected from AI visibility results..."
   - Placeholder badges [Competitor 1] through [Competitor 5] are shown in grey

## Technical Details

### Frontend
- FlagTabs component
- QuestionItem component (inline edit)
- Underlined sub-tabs (not Button Group)

### Question Management
- Questions are default frontend templates per question type (not AI-generated)
- User customizes them in Step 3
- Stored in Zustand wizard state until submission

### Quota Enforcement
- `max_q_perception_per_category`
- `max_q_visibility_per_category`
- `max_q_competitive_per_category`

### Database
- **Flyway migrations:** `questions` table
  - reportId, marketId, categoryId, questionText, questionType

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- **Depends on:** Story 2.2 (AI Category Discovery)
- **Blocks:** Story 2.4 (Review & Submit)
