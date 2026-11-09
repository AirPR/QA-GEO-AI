# Unbranded Analysis and Other Prompts

**Epic ID:** GEO-1209
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Created:** 2026-10-06
**Updated:** 2026-10-19
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1209

## Description / Functional Need

This epic opens GEO to analyses without a brand, and lets a prompt run without a category or a question type. An unbranded analysis measures an industry or a topic instead of a brand (football, car insurance, frozen food). The topic frames the analysis and is never measured: the measured entities are the brands the AI answers name. Everything set during creation stays manageable after launch in Manage Scope. An unbranded analysis stays unbranded: adding a brand to it comes in a later version.

It builds on the new-analysis wizard and the prompt pool of EPIC-034 (https://onclusive.atlassian.net/browse/GEO-1002). This epic adds a first step, Analysis Type, before Brand & Country, so the wizard has five steps: Analysis Type, Brand & Country (Topic & Country in an unbranded analysis), Categories, Prompts and Review. From step 1 onward a mode pill in the product bar reads Brand analysis or Unbranded analysis. An unbranded analysis consumes the pool exactly like a brand analysis. Both features ship behind one global flag, off until validated, then on for every organisation. While the flag is off, the wizard stays as it is today: four steps, no Analysis Type step and no mode pill.

A prompt that misses its category or its type falls back to Other instead of being blocked. It still runs and returns key concepts, which feed InBrief and Top Concepts (Top Topics in an unbranded analysis), and it moves to its category and type once classified. In EPIC-034 both are required.

The functional rules come from the GEO flexible scope behaviour spec (rule IDs such as S3.12 are quoted where useful). The design is the Figma page "Onboarding / New Analysis V3" of the Measure - GEO Module file: [https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707](https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707)

Every UI string of this epic, with its key and its en-US, en-GB, fr-FR and es-ES text, is in the strings sheet shared with EPIC-034. The criteria quote the English text only: [https://docs.google.com/spreadsheets/d/1G3C6DF1B_GmOrga4BB9GYtxv1fc-x7mCsnxyVsumL8Y/edit](https://docs.google.com/spreadsheets/d/1G3C6DF1B_GmOrga4BB9GYtxv1fc-x7mCsnxyVsumL8Y/edit)

### Dependencies

- EPIC-034 (https://onclusive.atlassian.net/browse/GEO-1002): the wizard, the prompt table, the prompt pool and Manage Scope prompts. This epic cannot start before the EPIC-034 wizard exists.
- EPIC-010 (https://onclusive.atlassian.net/browse/GEO-152): story 1.5 hides the Actions Center entry.
- EPIC-011 (https://onclusive.atlassian.net/browse/GEO-156): stories 1.5 and 1.8 change the XLSX and PowerPoint exports.
- EPIC-017 (https://onclusive.atlassian.net/browse/GEO-428): story 1.5 changes the analysis ready email.
- EPIC-044 (https://onclusive.atlassian.net/browse/GEO-1068): Top Topics in story 1.3 uses the same simplified concept display.

### Notes

Updated 2026-10-07 after the dev questions on https://onclusive.atlassian.net/browse/GEO-1209 (comment of 2026-10-07): criteria marked (Updated 2026-10-07) changed. Rule: where this epic says nothing, the behaviour stays as in production.

Updated 2026-10-09 after the functional and design review of the dev team (Q1 to Q16, D1 to D14, comment of 2026-10-09 on https://onclusive.atlassian.net/browse/GEO-1209): criteria marked (Updated 2026-10-09) changed. The Category Topics analysis prompt and the InBrief topic prompt are attached to https://onclusive.atlassian.net/browse/GEO-1209.

- 1.1: step 2 is "Topic & Country"; switching the mode clears the later steps after a confirmation; text-only topic variant of the discovery screen
- 1.2: Category Topics questions run as written; the analysis keeps the brands attached to each topic; sentiment is for the category as a whole; competitive prompts with too few competitors are sent with the cleaned text in a brand analysis (changed for unbranded on 2026-10-19, see below); the topic is not editable
- 1.3: no header, the sidebar block mirrors the brand one; InBrief may name the brands attached to a topic, the brand-name check is removed; empty state when topic prompts returned nothing; "Category Topics" label; home list column "Brand / Topic"
- 1.4: matrix shows the top 5 brands by SOV; winner follows the production rule as is; "{category} landscape" at category scope; "Category Topics" label
- 1.7: "Other" is the only term, in the wizard too
- 1.8: Visibility and Competitive prompts in the Other category are ranked only, no concepts; Sources tab and detail panel of the Other category

Updated 2026-10-19 after the staging check of the unbranded analysis (comments of 2026-10-15 and 2026-10-19 on GEO-1209, GEO-1242 and GEO-1243): criteria marked (Updated 2026-10-19) changed. The Category Topics analysis prompt and the InBrief topic prompt in the repo (PR #801) replace the versions attached to GEO-1209.

- 1.1: with the flag off, the wizard is unchanged
- 1.2: in an unbranded analysis, a Competitive prompt with fewer than 2 competitors is not sent (PR #808); Category Topics extraction keeps up to 12 topics per category instead of 7 (PR #801)
- 1.3: the InBrief topic prompt gets one quote per topic, so the bullets say why a topic comes up (PR #801)

### User Stories (as written in the epic)

#### User Story 1.1: Choose the analysis type

> As a user starting a new analysis, I want to choose between a brand analysis and an unbranded analysis, so that I can measure a whole industry when I do not have a target brand.

Acceptance Criteria:

- Given I click New Analysis, When Analysis Type opens, Then two cards, Brand analysis and Unbranded analysis, each say what they measure, and nothing is selected
- Given the unbranded flag is off, When I click New Analysis, Then the wizard is unchanged: four steps starting at Brand & Country, no Analysis Type step and no mode pill (Updated 2026-10-19)
- Given I select a card, When it is selected, Then the primary action is enabled and the mode pill shows the mode
- Given I select Unbranded analysis, When I continue, Then Brand & Country is labelled Topic & Country and asks for an industry or topic instead of a brand (Updated 2026-10-09)
- Given an unbranded analysis, When Topic & Country loads, Then it asks "What industry or topic are you analyzing?" with a helper stating the topic frames the analysis and is never measured
- Given the topic is empty, When I try to continue, Then the field shows a red border and a message naming it
- Given I went past Analysis Type, When I go back and switch the mode, Then a confirmation states that the brand or topic, the markets, the categories and the prompts are cleared, and confirming clears them (Updated 2026-10-09)
- Given Topic & Country is valid, When I continue, Then the category discovery screen shows a topic version of its text, on the same layout as the brand version (Updated 2026-10-09)
- Given an unbranded analysis, When prompts are generated, Then there is no Brand Image, Reputation becomes Category Topics, and Competitive takes a fourth auto-resolved competitor in the brand's place (story 1.2 here, and EPIC-034 story 1.4)
- Given an unbranded analysis, When suggestions are generated, Then each category in each market still gets 30 prompts (Visibility, Competitive and Category Topics), so 2 markets with 3 categories give 2 x (3 x 30) = 180 prompts
- Given the table renders in an unbranded analysis, When I look at the type badges or open a type select, Then they show Visibility, Competitive, Category Topics or Other
- Given an unbranded analysis, When its prompts are counted against the pool, Then each kept prompt costs one slot per market, the same as in a brand analysis
- Given an unbranded analysis has no kept Category Topics prompt and no kept prompt in Other, When Review loads, Then the warning names InBrief and Top Topics as metrics the analysis will not produce

Design: 1.1, 1.2, 1.3, 7.1

#### User Story 1.2: Run an analysis without a target brand

> As a user creating an unbranded analysis, I want the topic to replace the brand everywhere the analysis needs a subject, so that the analysis runs and measures every brand the answers name.

Acceptance Criteria:

- Given an unbranded analysis, When it is created, Then it stores its mode and topic with no target brand, and the topic is its name in the dashboard, emails and exports
- Given its answers, When they are processed, Then no brand is scored or treated as the target, brand grouping protects no target, and source classification receives the topic and the brands named
- Given Categories, When categories are discovered, Then the topic is split into 2 consumer search areas, such as "postal services" into "parcel delivery" and "international shipping", with no brand website
- Given Visibility and Competitive prompts, When they are generated, Then they use the 10 production templates of each type (frontend/src/utils/questionTemplates.ts): Visibility is unchanged and uses {category} only, and in Competitive the {entity} slot becomes [Competitor 4], so each competitive prompt compares the top 4 brands from that category and market's visibility answers (Updated 2026-10-07)
- Given prompts are adapted and translated for a market, When they are generated, Then QUESTION_ADAPTATION receives the topic instead of the brand and drops the "entity must not appear" rule, and the topic does not have to appear in the text since the category already carries it (Updated 2026-10-07)
- Given Category Topics prompts, When they are generated, Then each category gets these 10, one per theme:

| **Theme** | **Prompt** |
|---|---|
| Selection criteria | What should I look for in {category}? |
| Quality | What makes {category} good quality? |
| Price and value | What is good value for money in {category}? |
| Experience | What do people like most about {category}? |
| Problems | What are the most common problems with {category}? |
| Trust and safety | How do I know which {category} options I can trust? |
| Trends | What is changing in {category} right now? |
| Ethics and sustainability | What are the ethical and environmental concerns around {category}? |
| Expert advice | What do experts recommend about {category}? |
| Controversies | What are the main controversies in {category}? |

- Given Category Topics prompts, When they run, Then they run as written without the Perception system instruction, like prompts with the Other type (Updated 2026-10-09)
- Given a Category Topics answer, When it is analysed, Then the Category Topics analysis prompt (PR #801) returns up to 12 topics per category, their sentiment for the category as a whole and up to 3 brands attached to each topic as written in the answers, on the non engine-native extraction path even when engine-native concepts are on; the production thresholds stay (25% for positive and neutral topics, 10% for negative) (Updated 2026-10-19)
- Given a Competitive prompt of an unbranded analysis, outside the Other category, When fewer than 2 competitors were extracted for its category and market, Then it is not sent for this run and has no row in the prompts table (Updated 2026-10-19)
- Given a Competitive prompt of a brand analysis, When fewer than 2 competitors were extracted for its category and market, Then it is still sent with the empty slots removed from the text, as in production (Updated 2026-10-19)
- Given an unbranded analysis, When I open Manage Scope, Then the topic cannot be changed, as the brand today (Updated 2026-10-09)

#### User Story 1.3: Show an Overview built for a topic

> As a user of an unbranded analysis, I want an Overview that shows who leads the topic and what the answers say about it, so that I read the landscape without a brand scorecard.

Acceptance Criteria:

- Given the analysis loads, When the sidebar renders, Then its block shows the topic's first letter in the logo slot and the topic, as the brand block does today, with no extra header, mode label or date (Updated 2026-10-09)
- Given the Overview loads, When it renders, Then the scope bar, the KPI cards and deltas, Time Evolution, Category Prioritization, Corporate Reputation, Brand Territory and the Brand Image hint are not shown
- Given InBrief, When it is generated, Then 3 bullets built from the Category Topics answers and the answers of prompts with the Other type say what the answers say about the topic, may name the brands the answers attach to a topic, and carry "Category summary generated by artificial intelligence" (Updated 2026-10-09)
- Given an unbranded analysis, When InBrief is generated, Then it uses a dedicated topic prompt, not the brand Perception summary, with the Category Topics concepts and the concepts of prompts with the Other type (label, sentiment, frequency, attached brands and one quote) of the Overview or the category as input, so each bullet says why a topic comes up, not only that it comes up (Updated 2026-10-19)
- Given the generated bullets, When they are checked, Then only the format is checked (3 bullets of 150 characters max), with no brand-name check, and after the last failed attempt the widget shows its error state (Updated 2026-10-09)
- Given an analysis or a category with no Category Topics prompts and no prompts in Other, When the Overview or the category loads, Then InBrief and Top Topics are hidden, since no prompt feeds them; when such prompts exist but returned no topic, both show an empty state (Updated 2026-10-09)
- Given Top Concepts, When it loads, Then it is titled "Top Topics in the Category", and each topic describes the category, never names a brand, has its sentiment towards the category and its frequency, as in Top Concepts today, with no brand tags (Updated 2026-10-07)
- Given the Share of Voice ring, When it loads, Then it keeps the brand analysis calculation, with no enlarged slice, no centre value and the subtitle "How the answers split across entities"
- Given the rankings table, When it loads, Then it is titled "{topic} landscape", with no highlighted row and tooltips without "your brand"
- Given AI Citation Sources, When it loads, Then its subtitle refers to the topic, its legend has no Owned Media or Competitor Media, there is no Favorability column, and the related prompts modal lists the Category Topics prompts under a "Category Topics" tab (Updated 2026-10-09)
- Given any widget caption, When it renders, Then it describes the widget and never reminds the user that no brand is set
- Given the GEO dashboard analyses list, When it shows an unbranded analysis, Then the column is titled "Brand / Topic" and shows the topic with its first letter, no domain, and the Competitors card also counts the brands detected in unbranded analyses (Updated 2026-10-09)

Design: U.1 (page "Analysis - Unbranded")

#### User Story 1.4: Show the Category view and the prompts for a topic

> As a user of an unbranded analysis, I want each category page and the prompt details to compare brands with no target, so that I see which brand wins each category and each prompt.

Acceptance Criteria:

- Given a Category view, When it loads, Then there are no KPI cards, and InBrief, Top Topics, the SOV ring and rankings follow story 1.3 at category scope
- Given Time Evolution and Brand Prioritization, When they load, Then Time Evolution shows the top 10 brands with no highlighted line and no Sentiment tab, and the matrix plots the top 5 brands by SOV with no target dot (Updated 2026-10-09)
- Given Time Evolution, When it selects its 10 brands, Then it uses the production rule: top 10 by SOV in the latest collection inside the selected window, with the market and LLM filters applied, so the list follows the filters, and the chart still needs 7 collections in the window (Updated 2026-10-07)
- Given the prompts table, When it loads, Then each prompt shows the brand ranked first when every engine ranks the same brand family first, otherwise "Split", following the production rule as is (2 engines on A and 1 on B is Split, an engine with an empty ranking makes it Split), with no favourability filters or count (Updated 2026-10-09)
- Given the prompts table, When the winner is computed, Then it is per collection (the latest or the selected one), not over the date range, as in production (Updated 2026-10-07)
- Given a prompt detail panel, When it opens, Then it shows the full ranking and the brand chosen per engine, with no target brand block
- Given the prompts table tabs and the detail panel, When they show Category Topics prompts, Then they are labelled "Category Topics", not "Perception" (Updated 2026-10-09)
- Given the rankings table at category scope, When it loads, Then it is titled "{category} landscape" (Updated 2026-10-09)

Design: U.2, U.3 (page "Analysis - Unbranded")

#### User Story 1.5: Adapt the Actions Center, the export and the emails for a topic

> As a user of an unbranded analysis, I want every other surface to follow the same rules as the dashboard, so that nothing shows a brand scorecard I did not ask for.

Acceptance Criteria:

- Given the sidebar, When it renders, Then the Actions Center entry is hidden
- Given an XLSX or PowerPoint export, When I run it, Then the cover and titles use the topic, dropped sheets and slides are skipped, no text says "your brand" and no brand carries a target marker
- Given the analysis ready email, When it is sent, Then its subject and body use the topic as the analysis name

#### User Story 1.6: Manage the prompts of an unbranded analysis

> As a user of a running unbranded analysis, I want Manage Scope to suggest prompts that fit a topic, so that a category or a market I add later gets the same mix as at creation.

Acceptance Criteria:

- Given an unbranded analysis in Manage Scope, When I add a category or a market, Then its fresh suggestions are 10 Visibility, 10 Competitive and 10 Category Topics prompts per market, with no Reputation or Brand Image
- Given an unbranded analysis in Manage Scope, When I add or edit a prompt, Then the type select lists Visibility, Competitive, Category Topics and Other only

#### User Story 1.7: Classify prompts by question type with an Other fallback

> As a user, I want every prompt labelled with a category and a question type, defaulting to Other when one is missing, so that no prompt is lost and I can see the analytical mix.

Acceptance Criteria:

- Given the table renders in a brand analysis, When I look at the type badges, Then they show Visibility, Competitive, Reputation, Brand Image or Other
- Given a prompt misses its category or its type, When it is saved, Then that dimension alone is Other, so a prompt can be Other on one or both
- Given I add a prompt inline, When I confirm with its category or type empty, Then that dimension falls back to Other, instead of the confirm staying disabled as in EPIC-034
- Given the Category or Type column filter, When it opens, Then Other is a value of its own with its live count
- Given a prompt in Other, When it renders in the wizard or in Manage Scope, Then the missing dimension reads "Other" in an inline select, ticked or not, a kept row is on the warning tint, and picking a value removes the tint and updates the counts (Updated 2026-10-09)
- Given kept prompts sit in Other, When the table renders, Then a warning states that classifying them improves measurement accuracy, and nothing blocks the launch
- Given kept prompts sit in Other, When Review loads, Then a card titled with "Other" (never "Unclassified" or "uncategorised") lists each with its market and an inline select for the missing value, states it returns key concepts only until classified, and never blocks launch; with none, the card is hidden (Updated 2026-10-09)
- Given Manage Scope, When I open Prompts, Then Other prompts show on inline selects
- Given a prompt is Other on its type, When it runs, Then it consumes a full slot and returns key concepts only, no keyword graph (Updated 2026-10-07)

Design: 4.3, 4.10, 4.11

#### User Story 1.8: Show prompts in Other on the dashboard

> As a user, I want to see what my unclassified prompts return, so that a prompt in Other is never captured for nothing.

Acceptance Criteria:

- Given at least one kept prompt has no category, When the analysis loads, Then the sidebar shows a last "Other" category, hidden when there is none
- Given the Other category page, When it loads, Then it shows the key concepts of its prompts and the prompts table, with no KPI cards, SOV, Time Evolution, prioritization or rankings
- Given prompts in a real category carry the Other type, When I open that category's prompts table, Then an "Other" tab with its count follows the type tabs, hidden at 0, and its rows show their key concepts in Winner / Themes
- Given a Visibility or Competitive prompt in the Other category, When its answers are enriched, Then it is ranked like any other prompt and its row shows the brand ranked first, or "Split" (production rule in a brand analysis, story 1.4 rule in an unbranded analysis), and it feeds no KPI, SOV, rankings or Time Evolution (Updated 2026-10-07)
- Given a Competitive prompt in the Other category, When it runs, Then it runs as the user wrote it with no [Competitor N] to fill (suggested prompts always carry a category), and unfilled placeholders typed by hand are removed as in production (Updated 2026-10-07)
- Given Visibility answers in the Other category, When competitors are extracted, Then they feed no other category, since extraction runs per market and category as in production (Updated 2026-10-07)
- Given prompts with the Other type, When answers are enriched and metrics computed, Then key concepts are extracted from them (today only Perception produces concepts), and they are excluded from KPIs and SOV; Visibility and Competitive prompts in the Other category are ranked only and produce no concepts, as anywhere in production (Updated 2026-10-09)
- Given a prompt with the Other type, When it runs, Then it runs as written without the Perception system instruction, its concepts are extracted afterwards by the existing Gemini extraction (the non engine-native path of ConceptExtractionService), and they follow the mode: about the brand with sentiment towards the brand in a brand analysis, topics with sentiment towards the category in an unbranded analysis (Updated 2026-10-07)
- Given prompts in Other, When InBrief and Top Concepts (Top Topics in an unbranded analysis) are generated, Then their concepts are part of the input in both modes: a prompt with the Other type feeds its category and the Overview, and a prompt in the Other category feeds the Overview and the Other category page
- Given I classify an Other prompt in Manage Scope, When the next collection runs, Then it moves to its category and type and feeds their metrics
- Given an export, When it runs, Then it includes the Other section, limited to key concepts
- Given the Other category page, When it loads, Then it also has the Sources tab of a category page, and a prompt opens the detail panel drawn in "Other Details", with sentiment per engine, themes, response and sources (Updated 2026-10-09)

Design: U.4, Other Details (page "Analysis - Unbranded")

## Scope

- User Story 1.1: Choose the analysis type
- User Story 1.2: Run an analysis without a target brand
- User Story 1.3: Show an Overview built for a topic
- User Story 1.4: Show the Category view and the prompts for a topic
- User Story 1.5: Adapt the Actions Center, the export and the emails for a topic
- User Story 1.6: Manage the prompts of an unbranded analysis
- User Story 1.7: Classify prompts by question type with an Other fallback
- User Story 1.8: Show prompts in Other on the dashboard

_No dedicated "Scope" section in the epic description: scope listed from the epic's user stories 1.1 to 1.8 (STORY-46.1 to 46.8 = GEO-1241 to GEO-1248)._

## Out of Scope

- The prompt pool, the prompt table and the wizard steps Brand & Country to Review (EPIC-034)
- Plan names and price points (pricing v0.3, set by Management and Sales)
- Agency workspaces and consolidated billing (client workspaces spec)
- Adding a brand to an unbranded analysis, a later version

_The "Still open (non-blocking)" point on Category Topics extraction was removed from the epic on 2026-10-19 (PO, GEO-1209 comment 865133): up to 12 topics per category, production thresholds kept._

## Associated Stories & Tasks

| ID | Type | Title | Status |
|----|------|-------|--------|
| GEO-1241 | Story | STORY-46.1: Choose the analysis type | ⏳ Ready for QA |
| GEO-1242 | Story | STORY-46.2: Run an analysis without a target brand | ⏳ Ready for QA |
| GEO-1243 | Story | STORY-46.3: Show an Overview built for a topic | ⏳ Ready for QA |
| GEO-1244 | Story | STORY-46.4: Show the Category view and the prompts for a topic | ⏳ Ready for QA |
| GEO-1245 | Story | STORY-46.5: Adapt the Actions Center, the export and the emails for a topic | ⏳ Ready for QA |
| GEO-1246 | Story | STORY-46.6: Manage the prompts of an unbranded analysis | ⏳ Ready for QA |
| GEO-1247 | Story | STORY-46.7: Classify prompts by question type with an Other fallback | ⏳ Ready for QA |
| GEO-1248 | Story | STORY-46.8: Show prompts in Other on the dashboard | ⏳ Ready for QA |

**Total: 8 stories + 0 tasks — 69 ACs**

## Architecture

_No architecture section in the epic description._ Design: Figma "Measure - GEO Module", page "Onboarding / New Analysis V3" (wizard, node 13458:101707) and page "Analysis - Unbranded" (frames U.1 to U.4, Other Details). UI strings with en-US, en-GB, fr-FR and es-ES text: strings sheet shared with GEO-1002 (see Links). Two prompts are attached to the Jira epic (Category Topics analysis prompt, InBrief topic prompt) and are not imported here.

## Acceptance Criteria — Summary

### GEO-1241 — Choose the analysis type

- AC1: Two cards, nothing selected
- AC1b: Flag off, wizard unchanged (Updated 2026-10-19)
- AC2: Selection enables continue and the pill
- AC3: Topic & Country step in unbranded (Updated 2026-10-09)
- AC4: Topic question and helper
- AC5: Empty topic
- AC6: Switching the mode clears the later steps (Updated 2026-10-09)
- AC7: Topic version of the discovery screen (Updated 2026-10-09)
- AC8: Prompt types in unbranded
- AC9: 30 prompts per category and market
- AC10: Type badges and selects
- AC11: Pool cost
- AC12: Review warning

### GEO-1242 — Run an analysis without a target brand

- AC1: Mode and topic stored, no target
- AC2: No brand is the target
- AC3: Topic split into 2 categories
- AC4: Production templates, [Competitor 4] (Updated 2026-10-07)
- AC5: Adaptation with the topic (Updated 2026-10-07)
- AC6: 10 Category Topics prompts per category
- AC7: Category Topics questions run as written (Updated 2026-10-09)
- AC8: Category Topics analysis (Updated 2026-10-09)
- AC9: Competitive with too few competitors (Updated 2026-10-19)
- AC10: Topic not editable (Updated 2026-10-09)

### GEO-1243 — Show an Overview built for a topic

- AC1: Sidebar block (Updated 2026-10-09)
- AC2: Hidden widgets
- AC3: InBrief about the topic (Updated 2026-10-09)
- AC4: Dedicated topic prompt (Updated 2026-10-19)
- AC5: Format check (Updated 2026-10-09)
- AC6: Hidden or empty (Updated 2026-10-09)
- AC7: Top Topics (Updated 2026-10-07)
- AC8: Neutral SOV ring
- AC9: Landscape table
- AC10: Citation sources (Updated 2026-10-09)
- AC11: Captions
- AC12: Analyses list (new, 2026-10-09)

### GEO-1244 — Show the Category view and the prompts for a topic

- AC1: No KPI cards
- AC2: Time Evolution and matrix (Updated 2026-10-09)
- AC3: Top 10 rule (Updated 2026-10-07)
- AC4: Winner or Split (Updated 2026-10-09)
- AC5: Per collection (Updated 2026-10-07)
- AC6: Detail panel
- AC7: Category Topics label (Updated 2026-10-09)
- AC8: Landscape title at category scope (Updated 2026-10-09)

### GEO-1245 — Adapt the Actions Center, the export and the emails for a topic

- AC1: Actions Center hidden
- AC2: Export
- AC3: Analysis ready email

### GEO-1246 — Manage the prompts of an unbranded analysis

- AC1: Fresh suggestions per mode
- AC2: Type select

### GEO-1247 — Classify prompts by question type with an Other fallback

- AC1: Type badges in a brand analysis
- AC2: Each missing dimension falls back alone
- AC3: Inline add never blocked
- AC4: Other in the column filters
- AC5: « Other » in an inline select (Updated 2026-10-09)
- AC6: Non-blocking table warning
- AC7: Review card (Updated 2026-10-09)
- AC8: Manage Scope
- AC9: Cost and output of an Other-type prompt (Updated 2026-10-07)

### GEO-1248 — Show prompts in Other on the dashboard

- AC1: Sidebar entry
- AC2: Other category page
- AC3: Other tab in a real category
- AC4: Visibility / Competitive in the Other category (Updated 2026-10-07)
- AC5: Competitive in Other runs as written (Updated 2026-10-07)
- AC6: No cross-category extraction (Updated 2026-10-07)
- AC7: Concepts extracted, excluded from KPIs (Updated 2026-10-09)
- AC8: Other-type prompt runs as written (Updated 2026-10-07)
- AC9: Concepts feed InBrief and Top Concepts
- AC10: Classification takes effect next run
- AC11: Export
- AC12: Sources tab and detail panel (Updated 2026-10-09)

## Links

- https://onclusive.atlassian.net/browse/GEO-1209
- GEO-1241: https://onclusive.atlassian.net/browse/GEO-1241
- GEO-1242: https://onclusive.atlassian.net/browse/GEO-1242
- GEO-1243: https://onclusive.atlassian.net/browse/GEO-1243
- GEO-1244: https://onclusive.atlassian.net/browse/GEO-1244
- GEO-1245: https://onclusive.atlassian.net/browse/GEO-1245
- GEO-1246: https://onclusive.atlassian.net/browse/GEO-1246
- GEO-1247: https://onclusive.atlassian.net/browse/GEO-1247
- GEO-1248: https://onclusive.atlassian.net/browse/GEO-1248
- Related epic GEO-1002 (wizard and prompt pool): https://onclusive.atlassian.net/browse/GEO-1002
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
- UI strings sheet: https://docs.google.com/spreadsheets/d/1G3C6DF1B_GmOrga4BB9GYtxv1fc-x7mCsnxyVsumL8Y/edit
- Functional & design review: https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho
