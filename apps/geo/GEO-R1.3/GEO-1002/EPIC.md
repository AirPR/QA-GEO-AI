# Setup Revamp - Prompt-Pool Quota and New-Analysis Wizard

**Epic ID:** GEO-1002
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Created:** 2026-07-20
**Updated:** 2026-10-20
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1002

## Description / Functional Need

This epic rebuilds the new-analysis wizard around a prompt pool. Today coverage is sold as a fixed per-brand, per-country and per-category unit, so cost grows with every client and agencies onboard only their largest accounts, and the Prompts step never shows what a selection will consume. Sales feedback and the pricing signals ask for the same things: multi-brand packaging, a simpler meter and no per-engine pricing. With this epic, prompts are the only meter, never engines: brands, categories, countries and languages are unlimited, and one pool is shared by every analysis of the organisation. A prompt costs one slot per market.

The wizard has four steps: Brand & Country, Categories, Prompts and Review. It opens from the New Analysis button of the GEO dashboard, straight on Brand & Country. The sidebar stepper names each step and carries Back to Dashboard, the footer keeps Back and the primary action fixed, and everything above the footer scrolls. Everything set during creation stays manageable after launch in Manage Scope.

The unbranded analysis and the Other fallback for unclassified prompts are in EPIC-035. It adds an Analysis Type step before Brand & Country and builds on this wizard and this pool, so this epic ships first. Until EPIC-035 ships, every prompt has a category and a question type.

### Dependencies

- EPIC-002 (GEO-104) and EPIC-006 (GEO-100): this wizard replaces the EPIC-002 wizard, and the pool replaces the per-type quotas, Countries and Categories max that the wizard and Manage Scope enforce today.
- EPIC-029 (GEO-680): story 1.12 adds the Prompt pool field next to its user quota in the back office.
- EPIC-023 (GEO-656, shipped): the Language for AI Insights on Brand & Country stays as it works today.
- EPIC-045 (GEO-1069): the brand website asked for a custom brand applies on Brand & Country.

### Notes

Updated 2026-10-09: over the pool, the wizard blocks only the launch; adding and ticking prompts stay possible so the user can assemble every prompt, then untick down to the pool (story 1.7). Criteria marked (Updated 2026-10-09) changed.

Updated 2026-10-20: competitors are resolved in the background when a market and category has no usable Visibility answer (story 1.4, delivered by STORY-45.13 / GEO-1251); in Manage Scope, a pool with no free slot disables Add prompt, Add country and Add category up front (story 1.10). Criteria marked (Updated 2026-10-20) changed.

This epic is the product side of the prompt-based pricing initiative (pricing v0.3). Plan names and price points are set outside the product, and engine access per plan is the upgrade lever. The functional rules come from the GEO flexible scope behaviour spec (rule IDs such as S3.12 are quoted where useful). The design is the Figma page "Onboarding / New Analysis V3" of the Measure - GEO Module file: https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707

Every UI string of this epic, with its key and its en-US, en-GB, fr-FR and es-ES text, is in the strings sheet, together with the glossary and the quota keys to remove. The criteria quote the English text only: https://docs.google.com/spreadsheets/d/1G3C6DF1B_GmOrga4BB9GYtxv1fc-x7mCsnxyVsumL8Y/edit

### User Stories (as written in the epic)

#### User Story 1.1: Share one prompt pool across all analyses

> As an agency user, I want to spend one prompt quota across any brand, category, country or language, so that each additional client becomes cheaper to onboard instead of costing a new fixed unit.

Acceptance Criteria:

- Given a pool of N prompts, When I keep prompts in any analysis, Then the balance decreases and no per-brand, per-category, per-country or per-language cap blocks me
- Given a kept prompt, When it runs in two markets, Then it consumes two slots; an unticked prompt consumes none
- Given an analysis is deleted, When the change is saved, Then its slots return to the pool immediately
- Given the pool is reduced by a downgrade or a non-renewal, When it applies, Then existing prompts and running analyses are untouched and only adding prompts is blocked until the count fits
- Given an analysis with several country and language pairs, When I filter it, Then I filter by country and its languages roll up together

#### User Story 1.2: Set the brand and the markets

> As a user on Brand & Country, I want to name my brand and add as many markets as I need, so that the prompts are localised for each country and language.

Acceptance Criteria:

- Given Brand & Country loads, When it renders, Then it asks "What brand are you analyzing?" and "Which countries do you want to analyze?"
- Given I click Add country, When the composer opens, Then I pick a country first, and the language select, disabled until then, is prefilled with its primary language and lists its other languages
- Given a market row, When I change its language, Then it applies, and one country in two languages means two market rows, with no limit on markets
- Given Brand & Country, When I fill it, Then the Language for AI Insights below the markets applies to this analysis's insights and summaries only
- Given the brand is empty, When I try to continue, Then the field shows a red border and a message naming it, such as "Add your brand to continue."
- Given Brand & Country is valid, When I continue, Then a loading screen states that category discovery takes about 20 seconds

Design: 2.1, 2.2, 2.2b, 2.2c, 2.2d, 2.3, 2.5

#### User Story 1.3: Review the detected categories

> As a user on Categories, I want to keep, add or remove categories with their translations, so that the analysis covers the areas I care about.

Acceptance Criteria:

- Given Categories loads, When categories are detected from the brand, Then each shows an AI-generated badge and its translation per market language; with none, an empty state invites me to add one
- Given I click Add category, When the modal opens, Then I enter a name and review an editable translation per market
- Given I remove a category that holds prompts, When I click remove, Then a confirmation states how many prompts across my markets are deleted with it, kept suggestions included
- Given I add or remove categories, When I do it, Then no limit applies

Design: 3.1, 3.2, 3.3, 3.5

#### User Story 1.4: Review the suggested prompts

> As a user on the Prompts step, I want a full set of suggested prompts already ticked, so that I start from a complete analysis and trim it to fit my pool.

Acceptance Criteria:

- Given Prompts loads, When suggestions are generated, Then each category in each market gets 10 prompts per question type, all ticked, each carrying the category and type that produced it
- Given a market and category keeps Competitive prompts but no Visibility prompt, or none of its Visibility prompts got an answer, When the analysis runs, Then a background call resolves up to 5 top competitors, invisible to the user, and they replace the placeholders in the Competitive prompts (Updated 2026-10-20)
- Given the Visibility answers name competitors, When the analysis runs, Then they are used as today and no background call is made (Updated 2026-10-20)
- Given the background call fails, When the analysis runs, Then the Competitive prompts still run with the competitor names left out, as today, and the analysis does not fail (Updated 2026-10-20)
- Given an analysis keeps only Competitive prompts, When it runs, Then it completes (Updated 2026-10-20)
- Given suggestions are generated, When Prompts loads, Then each market also gets 10 Brand Image prompts, so 2 markets with 3 categories give 2 x (10 + 3 x 30) = 200 prompts
- Given the suggestions exceed the free pool, When Prompts opens, Then it is in the over-pool state and I untick prompts until the count fits
- Given a muted row, When I tick it again and the pool has room, Then it is kept again without being regenerated
- Given a kept or muted prompt, When I click the trash icon, Then it is deleted, which is not the same as unticking
- Given I go back to Categories and add a category, When I return to Prompts, Then my ticked and unticked states, my edits and my custom prompts are kept, and only the new category gets its suggestions, 10 per type per market, all ticked

Design: 4.1, 4.8

#### User Story 1.5: Add a prompt inline

> As a user, I want to add my own prompt directly in the table, so that I can cover a question the generator did not produce without leaving the step.

Acceptance Criteria:

- Given Prompts, When I click Add prompt, Then an editable row opens at the top with a text input, category, type and market selects, and confirm and cancel
- Given the selects, When I open them, Then the category select lists only the analysis categories, with no Add category action (a category is added on Categories through Back), and the market select lists only the analysis markets, prefilled from context
- Given I type a prompt, When I confirm, Then nothing suggests or infers its category or type, and confirm stays disabled until both are picked
- Given I confirm, When the row is added, Then it is kept, highlighted, and marked with a CUSTOM badge

Design: 4.2, 4b.1 to 4b.6

#### User Story 1.6: Sort, filter and edit the prompt table

> As a user with many prompts, I want to sort and filter the table by column, so that I can find and fix prompts quickly.

Acceptance Criteria:

- Given Prompts, When the table renders, Then it shows the columns Prompt, Category, Type, Market and Actions
- Given the table renders, When I look at the type badges, Then each prompt shows its category and one of Visibility, Competitive, Reputation or Brand Image
- Given the Category, Type or Market header, When I click its sort trigger, Then a menu offers Sort ascending, Sort descending, a checkbox list of values with live counts and Clear filter, and the header then counts the controls applied
- Given combined filters match nothing, When the table renders, Then a no-results card names the filters in conflict with Clear all filters, and launch stays enabled
- Given the table is empty, When it renders, Then the filters and the pool tracker stay, and an empty-state card carries its own Add prompt
- Given I scroll, When the pool tracker line reaches the top, Then it and the table header stay pinned and only the body scrolls
- Given I edit a prompt, When I save, Then only the wording changes; category and type change only through the row selects
- Given the Prompt header, When I open its Show prompts menu, Then I can show All, Selected only or Unselected only, and the selected count stays in view

Design: 4.9, 4.12 to 4.18, 4.21, 4.22

#### User Story 1.7: Track the pool while selecting prompts

> As a user assembling prompts, I want to see the pool balance at all times, so that I never commit an analysis that overspends my quota.

Acceptance Criteria:

- Given Prompts, When my selection changes, Then the toolbar ring reads the slots used after creation over the pool, such as 138 / 150, and its popover splits other analyses, this analysis and free slots
- Given the selection is exactly at the limit, When the tracker updates, Then the ring turns amber with a short message and launch stays enabled
- Given the selection is over the limit, When the tracker updates, Then the ring turns red, the message states how many prompts are over, and Review & Launch is blocked until the count fits, while adding and ticking prompts stay possible so I can assemble every prompt, then untick down to the pool; in Manage Scope, ticking or adding still needs room in the pool (story 1.10) (Updated 2026-10-20)
- Given I am over the limit, When I look for a way back, Then the system never removes a prompt: I untick prompts or contact my account manager for a larger pool

Design: 4.4, 4.5, 4.19, 4.20

#### User Story 1.8: Review and create the analysis

> As a user on the Review step, I want to see the scope and the engines on one screen, so that I can confirm the analysis before it is created.

Acceptance Criteria:

- Given I reach Review, When it loads, Then I see the scope with its markets and categories, and the AI engines
- Given a market, a category or a question type has no kept prompt, When Review loads, Then a warning names it as dropped, or names the metrics the analysis will not produce
- Given the engines, When Review loads, Then the engines allowed for the organisation in the back office are toggles, on by default with at least one on, and the other engines are not shown, as today
- Given I change the engines, When the toggles change, Then engines never consume slots
- Given the pool is over the limit, When Review loads, Then Create Analysis is disabled
- Given I create the analysis, When it is scheduled, Then a confirmation states its prompts, markets, categories and engines, the unticked suggestions kept on the analysis, that prompt changes apply at the next run, and View analysis

Design: 5.1, 5.2, 7.6

#### User Story 1.9: Leave the wizard

> As a user who started a setup, I want a confirmation before I leave the wizard, so that I do not lose my choices by mistake.

Acceptance Criteria:

- Given any step, When I click Back to Dashboard, Then a confirmation states that exiting discards every choice, since there is no save as draft
- Given the confirmation, When I cancel, Then I stay on the same step with my choices intact

Design: 0.1, 0.2

#### User Story 1.10: Manage prompts after launch

> As a user of a running analysis, I want to manage its prompts in Manage Scope with the same rules as the wizard, so that I can change coverage without creating a new analysis.

Acceptance Criteria:

- Given Manage Scope, When I open Prompts, Then I see the wizard's table, filters and pool tracker
- Given retained unticked suggestions, When I open Prompts, Then they show under Suggested Prompts, and ticking one keeps it from the next run if the pool has room
- Given I edit a prompt, When I save, Then only the wording changes, from the next run
- Given I delete a prompt, When I confirm, Then its slot returns to the pool and its past data points stay in the history
- Given the last prompt of a question type, category or market, When I delete it, Then it is allowed (the minimum of 1 prompt per group from GEO-581 goes away), and a warning names the metrics the analysis will stop producing
- Given prompts changed, When I open the version history, Then changes are grouped by date with their count and the original and edited wording
- Given I change a prompt's category or type, When it is saved, Then a category change keeps its history where it was collected, and a type change ends the old series and starts a new one
- Given I add a category or a market, When it is added, Then fresh suggestions for it join the retained set, with the pool in view
- Given the pool has no free slot, exactly full or over, When I open Prompts in Manage Scope, Then Add prompt, Add country and Add category are disabled and suggestions cannot be ticked, until deleting or unticking prompts frees a slot (Updated 2026-10-20)

Design: Manage Prompts section, MS.1

#### User Story 1.11: See the prompt pool on the GEO dashboard

> As a user on the GEO dashboard, I want to see how much of my organisation's prompt pool is used, so that I know before I start a new analysis how much room I have.

Acceptance Criteria:

- Given the GEO dashboard, When it loads, Then a pool block shows the kept prompts of all analyses over the pool, such as 138 / 150, with the wizard's ring, and hovering it splits used and free
- Given the pool is exactly at the limit, When the dashboard loads, Then the ring is amber with a short message and New Analysis stays available
- Given the pool is over the limit, for example after a downgrade, When the dashboard loads, Then the ring is red with how many prompts are over, and a new analysis can be started but not launched until the count fits
- Given the analyses table, When it loads, Then a sortable "Prompts" column after Categories shows the pool slots each analysis uses (kept prompts × markets), so the column adds up to the pool block
- Given an analysis is deleted or edited, When I come back to the dashboard, Then the counts reflect it

Design: to come (0.1 Dashboard · Entry point)

#### User Story 1.12: Set the prompt pool of an organisation in the back office

> As an Onclusive admin, I want to set one prompt pool per organisation and see each organisation's usage in the list, so that the quota we sell is the quota the product enforces.

Acceptance Criteria:

- Given I create or edit an organisation, When the quotas render, Then one "Prompt pool" field replaces the four per-type fields and the "Countries" and "Categories max" fields, while the user quota, collection frequency (Daily or One time) and allowed AI engines stay as today
- Given the Prompt pool field, When I enter a value, Then it accepts a whole number of at least 1, with a hint such as "138 of 150 prompts in use."
- Given I lower the pool below usage, When I save, Then a warning states that existing prompts and running analyses are untouched and adding prompts stays blocked until the count fits
- Given the organisations list, When it loads, Then a sortable "Prompts" column next to User quota shows prompts in use over the pool, such as 138 / 150, in red when over, and the Frequency column and filter stay

## Scope

- User Story 1.1: Share one prompt pool across all analyses
- User Story 1.2: Set the brand and the markets
- User Story 1.3: Review the detected categories
- User Story 1.4: Review the suggested prompts
- User Story 1.5: Add a prompt inline
- User Story 1.6: Sort, filter and edit the prompt table
- User Story 1.7: Track the pool while selecting prompts
- User Story 1.8: Review and create the analysis
- User Story 1.9: Leave the wizard
- User Story 1.10: Manage prompts after launch
- User Story 1.11: See the prompt pool on the GEO dashboard
- User Story 1.12: Set the prompt pool of an organisation in the back office

_No dedicated "Scope" section in the epic description: scope listed from the epic's user stories 1.1 to 1.12 (STORY-45.13 / GEO-1251 was split out of User Story 1.4 AC2)._

## Out of Scope

- The unbranded analysis, the Analysis Type step and the Other fallback (EPIC-035)
- Plan names and price points (pricing v0.3, set by Management and Sales)
- Buying or requesting prompts in the product: no payment, no pack or upgrade request; a larger pool goes through the account manager
- Billing and invoicing changes, and the advance-notice policy for price changes at renewal
- Agency workspaces and consolidated billing (client workspaces spec)
- AI "Suggest more" on the Prompts step, and save as draft in the wizard
- Bulk paste and CSV import of custom prompts, a later scale path

### Downstream (reflect in the analysis view and the export)

- Markets and categories dropped at creation do not appear in results or exports

### Still open (non-blocking)

- The pool and the plan given to existing organisations when the per-type quotas go, with the revenue impact checked by Revenue Ops first
- The engine set per plan: toggles exist for 5 engines only (Google AI Overviews, AI Mode and Copilot need theirs before a plan shows all 8), and the middle plans lose margin on current capture costs until the UI capture work ships
- Whether a no-card trial exists, and how it is set up for the organisation

## Associated Stories & Tasks

| ID | Type | Title | Status |
|----|------|-------|--------|
| GEO-1229 | Story | Share one prompt pool across all analyses | ⏳ Ready for QA |
| GEO-1231 | Story | Set the brand and the markets | ⏳ Ready for QA |
| GEO-1232 | Story | Review the detected categories | ⏳ Ready for QA |
| GEO-1233 | Story | Review the suggested prompts | ⏳ Ready for QA |
| GEO-1234 | Story | Add a prompt inline | ⏳ Ready for QA |
| GEO-1235 | Story | Sort, filter and edit the prompt table | ⏳ Ready for QA |
| GEO-1236 | Story | Track the pool while selecting prompts | ⏳ Ready for QA |
| GEO-1237 | Story | Review and create the analysis | ⏳ Ready for QA |
| GEO-1238 | Story | Leave the wizard | ⏳ Ready for QA |
| GEO-1239 | Story | Manage prompts after launch | ⏳ Ready for QA |
| GEO-1240 | Story | See the prompt pool on the GEO dashboard | ⏳ Ready for QA |
| GEO-1230 | Story | Set the prompt pool of an organisation in the back office | ⏳ Ready for QA |
| GEO-1251 | Story | Resolve competitors when no Visibility prompt is kept | ⏳ Ready for QA |
| GEO-1515 | Story | Set the prompt pool of existing organisations from their old quota | ⏳ Ready for QA |

**Total: 14 stories + 0 tasks — 75 ACs** (GEO-1515 added 2026-10-22)

## Architecture

_No architecture section in the epic description._ Design: Figma "Measure - GEO Module", page "Onboarding / New Analysis V3" (cited by the epic; the stories reference page "GEO-1012 - Wizard/Prompt Pool"). UI strings with en-US, en-GB, fr-FR and es-ES text: strings sheet (see Links).

## Acceptance Criteria — Summary

### GEO-1229 — Share one prompt pool across all analyses

- AC1: One pool, no structural cap
- AC2: One slot per market, unticked costs nothing
- AC3: Deleting an analysis frees its slots
- AC4: Downgrade never touches what exists
- AC5: Filter by country, languages roll up

### GEO-1231 — Set the brand and the markets

- AC1: Questions
- AC2: Add a country: country first, then language
- AC3: Change a market's language, no limit
- AC4: Language for AI Insights
- AC5: Empty brand
- AC6: Discovery loading screen
- AC7: Wizard shell (epic intro, applies to every step)

### GEO-1232 — Review the detected categories

- AC1: Detected categories with badge and translations; empty state
- AC2: Add category modal with editable translations
- AC3: Removing a category with prompts states the impact
- AC4: No limit

### GEO-1233 — Review the suggested prompts

- AC1: 10 per type per category per market, all ticked
- AC2: Competitors resolved in the background
- AC3: 10 Brand Image prompts per market
- AC4: Over-pool state on arrival
- AC5: Re-ticking a muted row
- AC6: Trash deletes, untick mutes
- AC7: Coming back from Categories keeps my work

### GEO-1234 — Add a prompt inline

- AC1: Editable row at the top
- AC2: Selects limited to the analysis
- AC3: No inference, confirm gated
- AC4: Added row: kept, highlighted, CUSTOM

### GEO-1235 — Sort, filter and edit the prompt table

- AC1: Columns
- AC2: Category and type on every row
- AC3: Header menus
- AC4: No results
- AC5: Empty table
- AC6: Pinned tracker and header
- AC7: Edit wording only
- AC8: Show prompts

### GEO-1236 — Track the pool while selecting prompts

- AC1: Ring and popover
- AC2: Exactly at the limit
- AC3: Over the limit (Updated 2026-10-09)
- AC4: The system never removes a prompt

### GEO-1237 — Review and create the analysis

- AC1: Scope and engines
- AC2: Dropped scope and missing metrics
- AC3: Engines allowed for the organisation
- AC4: Engines are free
- AC5: Over the pool
- AC6: Confirmation

### GEO-1238 — Leave the wizard

- AC1: Confirmation on Back to Dashboard
- AC2: Cancel keeps everything

### GEO-1239 — Manage prompts after launch

- AC1: Same table, filters and tracker
- AC2: Suggested Prompts
- AC3: Edit wording from the next run
- AC4: Delete frees the slot, keeps the history
- AC5: Last prompt of a group can be deleted
- AC6: Version history
- AC7: Category or type change
- AC8: Add a category or a market

### GEO-1240 — See the prompt pool on the GEO dashboard

- AC1: Pool block
- AC2: Exactly at the limit
- AC3: Over the limit
- AC4: Prompts column
- AC5: Counts follow changes

### GEO-1230 — Set the prompt pool of an organisation in the back office

- AC1: One field replaces the old quotas
- AC2: Whole number ≥ 1, with usage hint
- AC3: Lowering below usage warns, never blocks
- AC4: Prompts column in the organisations list

### GEO-1251 — Resolve competitors when no Visibility prompt is kept

- AC1: Competitors resolved in the background
- AC2: Competitive prompts run even without Visibility
- AC3: Visibility still wins when it exists
- AC4: A failed resolution never fails the analysis
- AC5: An analysis with only Competitive prompts completes

### GEO-1515 — Set the prompt pool of existing organisations from their old quota

- AC1: Pool from the old quota
- AC2: Current usage is not taken into account
- AC3: Pools already set are not touched
- AC4: Deleted organisations are skipped
- AC5: Review list before production
- AC6: Done in 1.3

## Links

- https://onclusive.atlassian.net/browse/GEO-1002
- GEO-1229: https://onclusive.atlassian.net/browse/GEO-1229
- GEO-1231: https://onclusive.atlassian.net/browse/GEO-1231
- GEO-1232: https://onclusive.atlassian.net/browse/GEO-1232
- GEO-1233: https://onclusive.atlassian.net/browse/GEO-1233
- GEO-1234: https://onclusive.atlassian.net/browse/GEO-1234
- GEO-1235: https://onclusive.atlassian.net/browse/GEO-1235
- GEO-1236: https://onclusive.atlassian.net/browse/GEO-1236
- GEO-1237: https://onclusive.atlassian.net/browse/GEO-1237
- GEO-1238: https://onclusive.atlassian.net/browse/GEO-1238
- GEO-1239: https://onclusive.atlassian.net/browse/GEO-1239
- GEO-1240: https://onclusive.atlassian.net/browse/GEO-1240
- GEO-1230: https://onclusive.atlassian.net/browse/GEO-1230
- GEO-1251: https://onclusive.atlassian.net/browse/GEO-1251
- GEO-1515: https://onclusive.atlassian.net/browse/GEO-1515
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
- UI strings sheet: https://docs.google.com/spreadsheets/d/1G3C6DF1B_GmOrga4BB9GYtxv1fc-x7mCsnxyVsumL8Y/edit
