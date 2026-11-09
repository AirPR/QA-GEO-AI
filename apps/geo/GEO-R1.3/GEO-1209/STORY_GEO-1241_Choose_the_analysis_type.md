# GEO-1241: Choose the analysis type

**Story ID:** GEO-1241
**Issue Type:** Story
**Title:** STORY-46.1: Choose the analysis type
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1209
**Created:** 2026-10-08
**Updated:** 2026-10-19
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1241

## User Story

> As a user starting a new analysis, I want to choose between a brand analysis and an unbranded analysis, so that I can measure a whole industry when I do not have a target brand.

## Acceptance Criteria

**AC1 — Two cards, nothing selected**

- Given: I click New Analysis
- When: Analysis Type opens
- Then: two cards, Brand analysis and Unbranded analysis, each say what they measure, and nothing is selected

**AC1b — Flag off, wizard unchanged** (Updated 2026-10-19)

- Given: the unbranded flag is off
- When: I click New Analysis
- Then: the wizard is unchanged: four steps starting at Brand & Country, no Analysis Type step and no mode pill

**AC2 — Selection enables continue and the pill**

- Given: I select a card
- When: it is selected
- Then: the primary action is enabled and the mode pill shows the mode

**AC3 — Topic & Country step in unbranded** (Updated 2026-10-09)

- Given: I select Unbranded analysis
- When: I continue
- Then: Brand & Country is labelled Topic & Country and asks for an industry or topic instead of a brand

**AC4 — Topic question and helper**

- Given: an unbranded analysis
- When: Topic & Country loads
- Then: it asks "What industry or topic are you analyzing?" with a helper stating the topic frames the analysis and is never measured

**AC5 — Empty topic**

- Given: the topic is empty
- When: I try to continue
- Then: the field shows a red border and a message naming it

**AC6 — Switching the mode clears the later steps** (Updated 2026-10-09)

- Given: I went past Analysis Type
- When: I go back and switch the mode
- Then: a confirmation states that the brand or topic, the markets, the categories and the prompts are cleared, and confirming clears them

**AC7 — Topic version of the discovery screen** (Updated 2026-10-09)

- Given: Topic & Country is valid
- When: I continue
- Then: the category discovery screen shows a topic version of its text, on the same layout as the brand version

**AC8 — Prompt types in unbranded**

- Given: an unbranded analysis
- When: prompts are generated
- Then: there is no Brand Image, Reputation becomes Category Topics, and Competitive takes a fourth auto-resolved competitor in the brand's place (story 1.2 here, and EPIC-034 story 1.4)

**AC9 — 30 prompts per category and market**

- Given: an unbranded analysis
- When: suggestions are generated
- Then: each category in each market still gets 30 prompts (Visibility, Competitive and Category Topics), so 2 markets with 3 categories give 2 x (3 x 30) = 180 prompts

**AC10 — Type badges and selects**

- Given: the table renders in an unbranded analysis
- When: I look at the type badges or open a type select
- Then: they show Visibility, Competitive, Category Topics or Other

**AC11 — Pool cost**

- Given: an unbranded analysis
- When: its prompts are counted against the pool
- Then: each kept prompt costs one slot per market, the same as in a brand analysis

**AC12 — Review warning**

- Given: an unbranded analysis has no kept Category Topics prompt and no kept prompt in Other
- When: Review loads
- Then: the warning names InBrief and Top Topics as metrics the analysis will not produce

## Technical Details

### Rules (OS-Team, updated 2026-10-19)

- The wizard has five steps: Analysis Type, Brand & Country (Topic & Country in an unbranded analysis), Categories, Prompts, Review.
- The mode pill shows from step 1 onward and never changes after Analysis Type, unless the user goes back and switches the mode (AC6).
- Switching the mode after step 1 asks for a confirmation; cancelling keeps everything, confirming clears the brand or topic, the markets, the categories and the prompts.
- In an unbranded analysis there is no brand search, no brand logo and no brand website field.
- Category discovery uses the topic and returns 2 categories (46.2); its loading screen keeps the brand layout with a topic text.
- The topic cannot be changed after creation (rule owned by 46.2).
- Unbranded analysis and Other ship behind one global flag, off until validated, then on for every organisation; flag off, the wizard is today's four-step brand wizard: no Analysis Type step, no mode pill (AC1b).

### Reviews

📊 [Functional & design review](https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho) — PM questions Q1–Q15, design points D1–D14 and the frame-by-frame epic ↔ design table. PM answers of 2026-10-09 (GEO-1209 comment) applied below.

### PM decisions (2026-10-09)

- Step 2 is « Topic & Country » in an unbranded analysis (was « Markets »).
- Q10: switching the mode clears the brand or topic, the markets, the categories and the prompts after a confirmation (now AC6, no longer an assumption).
- D13: text-only topic variant of the discovery screen, no new frame (now AC7).
- Q9: one global flag, off until validated, then on for everyone.
- Q15: the topic is not editable after creation (AC in 1.2).
- Q8: missing strings are added by us, status « Proposed », reviewed by the PM after his leave.

### PM decisions (2026-10-19)

- Option A (GEO-1241 comment): while the flag is off the wizard is unchanged, with no Analysis Type step and no mode pill (new AC1b, added to the epic in story 1.1). Already the shipped behaviour.

### Open points

- 🎨 **Designer (non-blocking):** frames 1.1–1.3 lose « You can add a brand later », 2.4 / 7.2 get the « Topic & Country » stepper label, 2.5 keeps its layout with a topic text (GEO-1241 comment #860365). Dev follows the ACs meanwhile.
- 📝 **PM review after leave:** the strings we add with status « Proposed » (T11).

### Design

Figma `Measure - GEO Module`, page « Onboarding / New Analysis V3 » (node `13458:101707`); visuals of the wizard shell, table and Review from page « GEO-1012 - Wizard/Prompt Pool » (section `16364:78415`).

- **DAC1 — 1.1 Nothing selected** (`13480:5744`), **1.2 Brand selected** (`13480:1924`), **1.3 Unbranded selected** (`13480:5977`): title « What do you want to measure? », two cards with icon, badge (Default / Advanced), one-line description and 3 check lines; Continue bottom right. « You can add a brand later » is removed (adding a brand is out of this version); the designer updates the frames (GEO-1241 comment #860365) — use the strings sheet copy, not the frame.
- **DAC2 — Mode pill** top right of the product bar: « Brand analysis » / « Unbranded analysis ».
- **DAC3 — 2.4 / 7.2 Topic & Country** (`13485:3506`, `13532:11287`): stepper label « Topic & Country » (the designer updates 2.4 / 7.2), field « What industry or topic are you analyzing? », helper « The topic frames the analysis. It is never measured. What gets measured is whichever brands the AI answers name. », then the 45.2 markets block and Language for AI Insights; primary « Discover Categories ».
- **DAC4 — 7.3 Categories** (`13532:11337`): header « We detected these categories for {topic}. … » (sample shows 3 categories; discovery returns 2).
- **DAC5 — 7.4 Prompts · Unbranded types** (`13533:11984`): type badges Visibility / Competitive / Category Topics.
- **DAC6 — 2.5 Discovering categories** (`13485:3723`): same layout for a topic, only the text changes (no new frame, PM D13). Brand text today: « Scanning how AI engines see {brand} across your markets. » / « We look at your brand, your markets and their languages. »
- **Review (7.5)** is stale (plans / Upgrade, review D2): use 45.8's 5.x frames + the AC12 warning.
- **Copy:** strings sheet shared with GEO-1002 (4 locales). Missing keys of this story are added by us with status « Proposed » (T11); the PM reviews them after his leave.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned in the ticket (the epic cannot start before the GEO-1002 / EPIC-034 wizard exists)
- **Related (mentioned in the ticket or the epic):**
  - GEO-1002 (EPIC-034 wizard, prompt table and pool; AC8 cites EPIC-034 story 1.4 = GEO-1233)
  - GEO-1231 (STORY-45.2: markets block and Language for AI Insights reused on Topic & Country)
  - GEO-1237 (STORY-45.8: Review frames 5.x reused, AC12 warning)
  - GEO-1242 (STORY-46.2: discovery returns 2 categories, topic not editable)

## Definition of Done

- [ ] All acceptance criteria verified (unbranded / Other global flag ON)
- [ ] Brand analysis behaviour unchanged (regression check)
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1209
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1241
- External Spec: [epic-46/46-1-choose-the-analysis-type.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-46/46-1-choose-the-analysis-type.md)
- Functional & design review: https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
