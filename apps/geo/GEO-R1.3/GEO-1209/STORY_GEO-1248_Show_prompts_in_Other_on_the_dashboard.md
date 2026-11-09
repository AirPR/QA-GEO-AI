# GEO-1248: Show prompts in Other on the dashboard

**Story ID:** GEO-1248
**Issue Type:** Story
**Title:** STORY-46.8: Show prompts in Other on the dashboard
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1209
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1248

## User Story

> As a user, I want to see what my unclassified prompts return, so that a prompt in Other is never captured for nothing.

## Acceptance Criteria

**AC1 — Sidebar entry**

- Given: at least one kept prompt has no category
- When: the analysis loads
- Then: the sidebar shows a last "Other" category, hidden when there is none

**AC2 — Other category page**

- Given: the Other category page
- When: it loads
- Then: it shows the key concepts of its prompts and the prompts table, with no KPI cards, SOV, Time Evolution, prioritization or rankings

**AC3 — Other tab in a real category**

- Given: prompts in a real category carry the Other type
- When: I open that category's prompts table
- Then: an "Other" tab with its count follows the type tabs, hidden at 0, and its rows show their key concepts in Winner / Themes

**AC4 — Visibility / Competitive in the Other category** (Updated 2026-10-07)

- Given: a Visibility or Competitive prompt in the Other category
- When: its answers are enriched
- Then: it is ranked like any other prompt and its row shows the brand ranked first, or "Split" (production rule in a brand analysis, story 1.4 rule in an unbranded analysis), and it feeds no KPI, SOV, rankings or Time Evolution

**AC5 — Competitive in Other runs as written** (Updated 2026-10-07)

- Given: a Competitive prompt in the Other category
- When: it runs
- Then: it runs as the user wrote it with no [Competitor N] to fill (suggested prompts always carry a category), and unfilled placeholders typed by hand are removed as in production

**AC6 — No cross-category extraction** (Updated 2026-10-07)

- Given: Visibility answers in the Other category
- When: competitors are extracted
- Then: they feed no other category, since extraction runs per market and category as in production

**AC7 — Concepts extracted, excluded from KPIs** (Updated 2026-10-09)

- Given: prompts with the Other type
- When: answers are enriched and metrics computed
- Then: key concepts are extracted from them (today only Perception produces concepts), and they are excluded from KPIs and SOV; Visibility and Competitive prompts in the Other category are ranked only and produce no concepts, as anywhere in production

**AC8 — Other-type prompt runs as written** (Updated 2026-10-07)

- Given: a prompt with the Other type
- When: it runs
- Then: it runs as written without the Perception system instruction, its concepts are extracted afterwards by the existing Gemini extraction (the non engine-native path of ConceptExtractionService), and they follow the mode: about the brand with sentiment towards the brand in a brand analysis, topics with sentiment towards the category in an unbranded analysis

**AC9 — Concepts feed InBrief and Top Concepts**

- Given: prompts in Other
- When: InBrief and Top Concepts (Top Topics in an unbranded analysis) are generated
- Then: their concepts are part of the input in both modes: a prompt with the Other type feeds its category and the Overview, and a prompt in the Other category feeds the Overview and the Other category page

**AC10 — Classification takes effect next run**

- Given: I classify an Other prompt in Manage Scope
- When: the next collection runs
- Then: it moves to its category and type and feeds their metrics

**AC11 — Export**

- Given: an export
- When: it runs
- Then: it includes the Other section, limited to key concepts

**AC12 — Sources tab and detail panel** (Updated 2026-10-09)

- Given: the Other category page
- When: it loads
- Then: it also has the Sources tab of a category page, and a prompt opens the detail panel drawn in "Other Details", with sentiment per engine, themes, response and sources

## Technical Details

### Rules (OS-Team, updated 2026-10-09)

- Other prompts never change a KPI, the SOV, the rankings or Time Evolution, in either mode.
- An Other-type prompt that returns few or no concepts is fine (PM, 2026-10-07); its row shows no theme.
- Past collections stay where they were collected: classifying a prompt changes only the next collections.
- The Other entry is the last category of the sidebar and disappears when no kept prompt is left in it.
- Concepts come from prompts with the Other type and from Reputation / Category Topics prompts, wherever they sit; a Visibility or Competitive prompt in the Other category gives a winner or « Split », never themes.
- An existing brand analysis that gets its first Other prompt sees those themes in InBrief and Top Concepts from the next collection; its KPIs do not move (PM, Q16).

### Reviews

📊 [Functional & design review](https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho) — PM questions Q1–Q16, design points D1–D14 and the frame-by-frame epic ↔ design table. PM answers of 2026-10-09 (GEO-1209 comment, GEO-1248 comment) applied below.

### PM decisions (2026-10-09)

- T4: only Perception produces concepts in production, so Visibility and Competitive prompts in the Other category are ranked only, with no concepts; concepts come from Other-type prompts (and Category Topics); no extraction pass after Phase 2 (AC7, T4).
- Q1: Other-type prompts run as written (46.7 T9); their concepts use the existing legacy extraction (brand) or the attached Category Topics prompt (unbranded) (T2, T3).
- D7: keep the Sources tab on the Other category page (AC12, T7).
- D11: build the detail panel as drawn in « Other Details » (AC12, T6).
- Q16: existing brand analyses get Other themes in InBrief / Top Concepts once they add an Other prompt, KPIs unchanged — fine as designed.
- Design: U.4 and Other Details.

### Open points

- None blocking. 📝 The « as written » capture instruction of Other-type prompts (story 46.7) is reviewed by the PM after his leave.

### Design

Figma page « Analysis - Unbranded »:

- **U.4 Category · Other** (`16010:15376`): tabs Identity / Sources (no Performance); InBrief, Top Topics, Prompts Analysis; Sources section — kept (PM D7, AC12).
- **Questions Analysis - Other** (`15999:193869`, `16010:14502`): Other tab, « Other » badge, themes chips + « +N » in Winner / Themes.
- **Other Details · Ranking and Sentiment** (`16118:7957`): engine segmented control, « Sentiment - {ENGINE} » badge, Themes chips, Response, Sources + « All sources » — built as drawn (PM D11, AC12).
- ⚠️ GEO-1186 text is stale: it excludes Other from Top Concepts (superseded by AC9) and mentions a « classify in Manage Scope » hint absent from the AC.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned in the ticket (the epic cannot start before the GEO-1002 / EPIC-034 wizard exists)
- **Related (mentioned in the ticket or the epic):**
  - GEO-1244 (STORY-46.4: winner / Split rule in an unbranded analysis)
  - GEO-1247 (STORY-46.7: "as written" capture instruction of Other-type prompts)
  - GEO-156 (EPIC-011: export Other section)
  - GEO-1186 (Design Task: text stale, superseded by AC9)

## Definition of Done

- [ ] All acceptance criteria verified (unbranded / Other global flag ON)
- [ ] Brand analysis behaviour unchanged (regression check)
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1209
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1248
- External Spec: [epic-46/46-8-show-prompts-in-other-on-the-dashboard.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-46/46-8-show-prompts-in-other-on-the-dashboard.md)
- Functional & design review: https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
