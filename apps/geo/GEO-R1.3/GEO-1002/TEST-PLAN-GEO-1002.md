### QA Test Plan for GEO-1002 — Setup Revamp: Prompt-Pool Quota and New-Analysis Wizard

**Updated:** 2026-10-25 | **Source CSV:** testcases-coverage-epicGEO-1002.csv (111 TCs) | **Status:** Approved 2026-10-25

**Objective:** Verify the rebuilt new-analysis wizard and the organisation-wide prompt pool: the Prompt pool field of the back office and the conversion of existing organisations from their old quota (GEO-1515), the pool rules shared by every analysis, the wizard steps Brand & Country, Categories, Prompts (suggestions, inline add, table sort / filter / edit, pool tracker) and Summary with creation and exit, prompt management in Manage Scope, the pool block and Prompts column of the GEO dashboard, and the background resolution of competitors when no Visibility prompt is kept. The wizard step called "Review" in the ACs is shown as "Summary" (dev 866136). Cross-epic integration and non-regression checks are in the release plan TEST-PLAN-GEO-R1.3.

#### Test Scenarios & Detailed Test Cases

**Organisation Prompt Pool in the Back Office (stories: GEO-1230)**

- Scenario 1: Prompt Pool Field Replaces Quotas - Verify that creating or editing an organisation shows one required "Prompt pool" field in place of the four per-type fields, "Countries" and "Categories max", while the user quota, collection frequency (Daily or One time) and allowed AI engines stay as today.
- Scenario 2: Pool Value and Usage Hint - Verify that the Prompt pool field accepts only a whole number of at least 1 and shows a usage hint such as "138 of 150 prompts in use."
- Scenario 3: Lowering the Pool Below Usage - Verify that saving a pool lower than the prompts in use shows a warning that existing prompts and running analyses are untouched and adding prompts stays blocked until the count fits, and that the save itself is not blocked.
- Scenario 4: Organisations List Prompts Column - Verify that the organisations list has a sortable "Prompts" column next to User quota showing prompts in use over the pool (e.g. 138 / 150), red only when usage is above the pool, and that the Frequency column and filter stay.

**Prompt Pool of Existing Organisations (stories: GEO-1515)**

- Scenario 5: Pool From the Old Quota - Verify that after the 1.3 deploy each existing organisation that had no pool shows in the back office the pool computed from its old quota values, countries x (categories x (Visibility + Competitive + Perception per category) + Brand Image per country). *(new)*
- Scenario 6: Full Quota Whatever the Usage - Verify that an organisation using fewer prompts than its old quota, or none, still gets the full old quota as its pool, not the number of prompts in use. *(new)*
- Scenario 7: Pools Set by an Admin Kept - Verify that an organisation whose pool was already set by an admin keeps that pool after the 1.3 deploy. *(new)*
- Scenario 8: Deleted Organisations Skipped - Verify that a deleted organisation gets no pool and still shows "—" in the Prompts column of the back office organisations list (all statuses). *(new)*
- Scenario 9: PM Review List - Verify that before the production run the PM has the list of production organisations with their name, old quota values, computed pool and prompts used today, with the organisations still on the default quota (8,000 prompts) flagged. *(new)*
- Scenario 10: Conversion Ships in 1.3 - Verify that the conversion ships in release 1.3, while the old quota values still exist, so that from the 1.3 deploy no existing organisation is left "not configured". *(new)*

**Shared Prompt Pool Rules (stories: GEO-1229)**

- Scenario 11: One Pool, No Structural Cap - Verify that keeping prompts in any analysis decreases the organisation balance and that no per-brand, per-category, per-country or per-language cap blocks the user.
- Scenario 12: One Slot per Market - Verify that a kept prompt running in two markets consumes two slots and that an unticked prompt consumes none.
- Scenario 13: Deleted Analysis Frees Its Slots - Verify that deleting an analysis returns its slots to the pool immediately, as shown by the dashboard pool block and the wizard ring.
- Scenario 14: Downgrade Leaves Existing Scope Untouched - Verify that reducing the pool below usage (back office) leaves existing prompts and running analyses untouched and blocks only adding prompts until the count fits.
- Scenario 15: Country Filter Rolls Up Languages - Verify that the market filter of an analysis with several country and language pairs lists one entry per country, which selects all its languages together.

**Wizard Shell and Brand & Country (stories: GEO-1231)**

- Scenario 16: Wizard Shell - Verify that New Analysis opens the wizard on its first step (Brand & Country with the unbranded flag OFF, Analysis Type with it ON) with a sidebar stepper naming each step and carrying Back to Dashboard, a fixed footer with Back and the primary action, and scrolling content above the footer.
- Scenario 17: Brand & Country Questions - Verify that Brand & Country asks "What brand are you analyzing?" and "Which countries do you want to analyze?".
- Scenario 18: Add Country Composer - Verify that in the Add country composer the language select is disabled until a country is picked, then is prefilled with the country's default language listed first, lists its other languages, and shows no "Primary" tag.
- Scenario 19: Market Language and No Market Limit - Verify that changing the language of a market row applies, that one country in two languages gives two market rows, and that no limit applies to the number of markets.
- Scenario 20: Language for AI Insights - Verify that the Language for AI Insights field below the markets applies only to the insights and summaries of this analysis.
- Scenario 21: Empty Brand Error - Verify that continuing with an empty brand shows a red border and a message naming the field, such as "Add your brand to continue.", and that Discover Categories then stays disabled until a brand is set.
- Scenario 22: Discovery Loading Screen - Verify that continuing from a valid Brand & Country shows a loading screen, with no footer, stating that category discovery takes about 20 seconds.

**Categories Step (stories: GEO-1232)**

- Scenario 23: Detected Categories and Empty State - Verify that each detected category shows an AI-generated badge and its translation per market language, and that an empty state invites the user to add one when none is detected.
- Scenario 24: Add Category Modal - Verify that Add category opens a modal where the user enters a name and reviews an editable translation per market before adding it.
- Scenario 25: Removing a Category States the Impact - Verify that removing a category that holds prompts asks for a confirmation stating how many prompts across the markets are deleted with it, kept suggestions included.
- Scenario 26: No Category Limit - Verify that categories can be added and removed with no limit applied.

**Suggested Prompts (stories: GEO-1233)**

- Scenario 27: Ten Suggestions per Type - Verify that each category in each market gets 10 suggested prompts per question type, all ticked, each carrying the category and type that produced it.
- Scenario 28: Brand Image Prompts per Market - Verify that each market also gets 10 Brand Image prompts, so that 2 markets with 3 categories give 2 x (10 + 3 x 30) = 200 prompts.
- Scenario 29: Over-Pool State on Arrival - Verify that when the suggestions exceed the free pool, Prompts opens in the over-pool state with nothing unticked automatically, and that unticking prompts until the count fits clears it.
- Scenario 30: Re-Ticking a Muted Row - Verify that re-ticking a muted row while the pool has room keeps it again with the same wording, without regenerating it.
- Scenario 31: Trash Deletes, Untick Mutes - Verify that the trash icon deletes a kept or muted prompt (with the 5-second Undo toast), whereas unticking only greys the row and keeps it on the analysis.
- Scenario 32: Returning From Categories Keeps the Work - Verify that going back to Categories, adding a category and returning to Prompts keeps the ticked and unticked states, edits and custom prompts, and adds only the new category's suggestions, 10 per type per market, all ticked.

**Inline Prompt Add (stories: GEO-1234)**

- Scenario 33: Editable Row at the Top - Verify that Add prompt opens one editable row at the top of the table with a text input, category, type and market selects, and confirm and cancel.
- Scenario 34: Selects Limited to the Analysis - Verify that the category select lists only the analysis categories with no Add category action, and that the market select lists only the analysis markets, prefilled from the filtered market or the first market.
- Scenario 35: No Inference, Confirm Gated (Flag OFF) - Verify, with the unbranded flag OFF, that nothing suggests or infers the category or type of a typed prompt and that confirm stays disabled until both are picked (with the flag ON this AC is overridden by GEO-1247 AC3).
- Scenario 36: Custom Row Added - Verify that a confirmed prompt is kept, highlighted, marked with a CUSTOM badge and announced by the toast "Prompt added. It uses one pool slot."

**Prompt Table Sort, Filter and Edit (stories: GEO-1235)**

- Scenario 37: Table Columns - Verify that the Prompts table shows the columns Prompt, Category, Type, Market and Actions.
- Scenario 38: Category and Type on Every Row - Verify that each prompt of a brand analysis shows its category and one of the types Visibility, Competitive, Reputation or Brand Image.
- Scenario 39: Header Sort and Filter Menus - Verify that the Category, Type and Market header menus offer Sort ascending, Sort descending, a checkbox list of values with live counts and Clear filter, and that the header then counts the controls applied.
- Scenario 40: No-Results Card - Verify that combined filters matching nothing show a no-results card naming the filters in conflict with Clear all filters, while launch stays enabled.
- Scenario 41: Empty Table - Verify that an empty table keeps the filters and the pool tracker and shows an empty-state card with its own Add prompt.
- Scenario 42: Pinned Tracker and Header - Verify that once the pool tracker line reaches the top while scrolling, it and the table header stay pinned and only the table body scrolls.
- Scenario 43: Edit Wording Only - Verify that editing a prompt and saving changes only its wording, and that category and type change only through the row selects.
- Scenario 44: Show Prompts Menu - Verify that the Prompt header Show prompts menu shows All, Selected only or Unselected only, and that the selected count stays in view.

**Pool Tracker in the Wizard (stories: GEO-1236)**

- Scenario 45: Ring and Popover - Verify that the toolbar ring reads the slots used after creation over the pool (e.g. 138 / 150) as the selection changes, and that its popover splits other analyses, this analysis and free slots.
- Scenario 46: Exactly at the Limit - Verify that a selection exactly at the limit turns the ring amber with a short message and keeps launch enabled.
- Scenario 47: Over the Limit in the Wizard - Verify that a selection over the limit turns the ring red with a message stating how many prompts are over, blocks Review & Launch until the count fits, and still allows adding and ticking prompts.
- Scenario 48: Over the Limit in Manage Scope - Verify that in Manage Scope ticking or adding a prompt still needs room in the pool, as set by GEO-1239 AC9 (Scenario 66).
- Scenario 49: The System Never Removes a Prompt - Verify that over the limit no prompt is removed or unticked by the system and that the only ways back are unticking prompts or contacting the account manager.

**Summary and Create (stories: GEO-1237)**

- Scenario 50: Scope and Engines Summary - Verify that the Summary step (Review in the ACs) shows the scope with its markets and categories, and the AI engines.
- Scenario 51: Dropped Scope and Missing Metrics - Verify that a market, a category or a question type with no kept prompt is named in a Summary warning as dropped (greyed with a "dropped" tag) or by the metrics the analysis will not produce.
- Scenario 52: Engines Allowed for the Organisation - Verify that only the engines allowed for the organisation in the back office are shown as toggles, with ChatGPT and Gemini on by default (every allowed engine on when neither is allowed) and at least one engine always on, and that other engines are not shown. *(corrected)*
- Scenario 53: Engines Never Consume Slots - Verify that toggling engines never changes the pool count.
- Scenario 54: Create Disabled Over the Pool - Verify that Create Analysis is disabled on Summary when the pool is over the limit, with a red banner stating how many prompts to untick.
- Scenario 55: Creation Confirmation - Verify that the confirmation of a scheduled analysis states its prompts, markets, categories and engines, the unticked suggestions kept on the analysis, that prompt changes apply at the next run, and offers View analysis.

**Leave the Wizard (stories: GEO-1238)**

- Scenario 56: Exit Confirmation - Verify that Back to Dashboard on any step where something was entered opens "Exit setup?" stating that exiting discards every choice since there is no draft, and that Exit and Discard returns to the dashboard.
- Scenario 57: Cancel Keeps Every Choice - Verify that Resume Setup, the cross and Esc keep the user on the same step with every choice intact.

**Manage Scope Prompts (stories: GEO-1239)**

- Scenario 58: Same Table, Filters and Tracker - Verify that the Prompts section of Manage Scope shows the wizard's table, filters and pool tracker, without per-country or per-type tabs.
- Scenario 59: Suggested Prompts - Verify that retained unticked suggestions show greyed under Suggested Prompts and that ticking one keeps it from the next run only if the pool has room.
- Scenario 60: Edit Wording From the Next Run - Verify that editing a prompt in Manage Scope changes only its wording, applied from the next run.
- Scenario 61: Delete Frees the Slot, Keeps the History - Verify that confirming a prompt deletion returns its slot to the pool and keeps its past data points in the history.
- Scenario 62: Last Prompt of a Group - Verify that deleting the last prompt of a question type, category or market is allowed and shows a warning naming the metrics the analysis will stop producing.
- Scenario 63: Version History - Verify that the version history groups prompt changes by date with their count and the original and edited wording.
- Scenario 64: Category or Type Change - Verify that a category change keeps the prompt's history where it was collected and that a type change ends the old series and starts a new one.
- Scenario 65: Add a Category or a Market - Verify that adding a category or a market brings fresh suggestions, all ticked, joining the retained set with the pool in view.
- Scenario 66: No Free Slot in Manage Scope - Verify that with the pool exactly full or over, Prompts in Manage Scope disables Add prompt, Add country and Add category and blocks ticking suggestions, while unticking, editing and deleting stay possible, until a slot is freed.

**Prompt Pool on the GEO Dashboard (stories: GEO-1240)**

- Scenario 67: Pool Block - Verify that the GEO dashboard shows a pool block with the kept prompts of all analyses over the pool (e.g. 138 / 150) with the wizard's ring, and that hovering it splits used and free.
- Scenario 68: Dashboard at the Limit - Verify that a pool exactly at the limit shows an amber ring with a short message while New Analysis stays available.
- Scenario 69: Dashboard Over the Limit - Verify that a pool over the limit shows a red ring with how many prompts are over, and that a new analysis can be started but not launched until the count fits.
- Scenario 70: Prompts Column - Verify that the analyses table has a sortable "Prompts" column after Categories showing the pool slots each analysis uses (kept prompts x markets), adding up to the pool block.
- Scenario 71: Counts Follow Changes - Verify that deleting or editing an analysis is reflected in the pool block and the Prompts column when coming back to the dashboard.

**Background Competitor Resolution (stories: GEO-1251 & GEO-1233)**

- Scenario 72: Competitors Resolved in the Background - Verify that an analysis with no Visibility prompt for a market and category gets its top competitors resolved when it runs, with no competitor step or visible call during setup.
- Scenario 73: Competitive Prompts Run Without Visibility - Verify that the Competitive prompts of a market and category with no Visibility prompt are sent with the resolved competitors named in place of the placeholders (1 to 3 names, the templates having 3 slots) with no trailing "or ?", and show results on the dashboard like any other Competitive result. *(corrected)*
- Scenario 74: Visibility Still Wins - Verify that for a market and category whose Visibility answers name competitors, the Competitive prompts use those competitors exactly as today.
- Scenario 75: Failed Resolution Never Fails the Analysis - Verify that when the background resolution fails or returns nothing usable, the Competitive prompts still run with the competitor names left out and the analysis completes.
- Scenario 76: Competitive-Only Analysis Completes - Verify that an analysis whose only kept prompts are Competitive completes with its Competitive results instead of staying in progress, its Share of Voice counting the Competitive wins only. *(corrected)*

#### Edge Cases & Boundary Conditions

* Prompt pool value 0, negative or decimal in the back office: refused; only a whole number of at least 1 is accepted.
* Back-office Prompts column at 150 / 150: not red; red only when usage is above the pool.
* Organisation with no pool set yet: grey ring "— / —" with a message to contact the account manager in the wizard, Manage Scope and dashboard, only the launch blocked; back office shows an empty field and "—", and a saved pool cannot be cleared back to empty.
* Old quota converted (GEO-1515): 3 countries, 2 categories, 10 Visibility, 10 Competitive and 10 Perception per category and 5 Brand Image per country give 3 x (2 x 30 + 5) = 195 prompts; the default quota (25 countries, 5 categories, 20 per type) gives 8,000 and is flagged in the review list.
* Converted pool equal to the prompts in use (e.g. 105 / 105): the organisation is full on day one, keeps everything, and cannot add a prompt until its pool is raised in the back office.
* Selection exactly at the limit: amber ring, launch enabled; "Need more room? Contact your account manager." shows only at the limit or over it.
* Over the pool in the wizard: Add prompt and ticking stay possible (Figma 4.5 superseded); only Review & Launch and Create Analysis are blocked.
* Pool with no free slot in Manage Scope (exactly full, over or not configured): Add prompt, Add country and Add category disabled up front and suggestions cannot be ticked; unticking, editing and deleting stay possible.
* Pool lowered while the user is on Summary: the ring keeps the old value until the user changes step; back on Prompts the ring is red with the number of prompts over, and Summary and Review & Launch cannot be opened, so no analysis is created over the pool.
* Pool lowered below what other analyses already use: the wizard ring stays red even with every prompt of the current analysis unticked.
* Another analysis takes slots meanwhile and creation is refused: the ring shows the real figures on return to Prompts.
* Single market: it cannot be removed (at least 2 markets needed to remove one); Undo after removing a market works even when the same country is used in another language.
* Market labels: the prompts table and filters use ISO country codes such as "GB (EN)", the Summary Markets card "United Kingdom · English".
* Category name already used in the analysis, whatever the letter case: error, cannot be added.
* Category translation fails: each market shows the typed name with a notice to check it; with a single market the name is used as is.
* Last category removed: empty state, Generate Prompts disabled, stepper does not allow jumping to Prompts or Summary.
* Typed prompt: limited to 300 characters with a counter from 250; a missing final "?" is added.
* Duplicate prompt for the same market, category and type (ignoring case, extra spaces and the final "?"), ticked or not: refused; the same text in another market is accepted.
* Brand Image chosen in Add prompt or a row select: category cleared, disabled and shown as Overview; leaving Brand Image asks for a category first.
* Competitive prompt containing [Competitor N]: cannot be switched to another type until the placeholders are removed.
* Filters active: never change which prompts are ticked or launched; "N selected" counts the whole analysis.
* No prompt at all in the table: Review & Launch disabled.
* Every category dropped, even with Brand Image prompts ticked: banner says at least one category needs a kept prompt and Create Analysis stays disabled.
* Neither Gemini nor ChatGPT allowed for the organisation: every allowed engine starts on.
* Last engine still on turned off: every allowed engine turns back on (QA decision 2026-10-20).
* No unticked suggestion at creation: the confirmation line about unticked suggestions is hidden.
* Only the analysis type picked: Back to Dashboard leaves directly with no confirmation.
* Back to Dashboard: disabled during category discovery and analysis creation, hidden on the "Analysis created" confirmation; a stepper back-click or the footer Back opens the earlier step with no dialog (dev 865946).
* Reload or close the tab with choices entered: browser confirmation; logout or session expiry: none.
* Delete in Manage Scope: confirmation ("Delete Prompt"), no Undo; an analysis with no prompt left skips its next run instead of staying in progress.
* Add market or Add category in Manage Scope: cannot be saved with no ticked prompt nor over the pool.
* Dashboard Prompts column: first click sorts descending, then ascending (QA decision 2026-10-20).
* Back-office Prompts sort: organisations with no pool ("—") grouped at the end in both directions and across pages (QA decision 2026-10-22, A5).
* Pool cannot be loaded on the dashboard: block hidden, page still works; no pool block on an empty dashboard.
* Background competitor whose website belongs to the analysed brand (e.g. "Jordan" on jordan.nike.com for Nike): left out of the competitors.
* Fewer competitors found than the prompt names: the prompt reads naturally ("Best for X: Nike, A or B?"), never "Nike, A, B or ?", in every language.

#### Open Points (not blocking)

* GEO-1515 (dev 866014, no PO answer on 2026-10-25): AC1 multiplies the categories by the countries while 1.2 checks the categories per organisation, which gives very large pools to 28 of the 84 production organisations (e.g. QA-GEO 24,400, demo organisations 96,800); the formula is to be confirmed by the PO before the deploy; Scenarios 5 to 7 follow AC1 as written.
* GEO-1515 (dev 866014): Nabep (105 / 105) and Roche Italia (70 / 70) will be full on day one, Trial - Great Eastern (113 / 140) and Toshiba Tec France (70 / 84) close to full; PO decision pending (pool to raise in the back office after 1.3).
* GEO-1515 AC1 to AC3: verifiable only in production right after the 1.3 deploy, read-only, against the review list geo-1515-1-organisations.csv; per-organisation checks on staging need a staging review list from the developer (not requested); AC4 has no TC yet (user decision 2026-10-22); Scenario 8 needs deleted organisations shown as "—" rows in the back office (test data).
* GEO-1515: once the conversion has run, no existing organisation is left without a pool; the "no pool" edge case needs an organisation created with no pool set (test data).
* GEO-1515 TAC1 to TAC7, GEO-1237 TAC1 to TAC5: database / migration technical checks, not counted as QA ACs and not turned into scenarios.
* GEO-1237 AC3: the AC says the allowed engines are "on by default", while the Rules and TAC3 turn on only ChatGPT and Gemini when allowed; Scenario 52 follows the Rules (QA decision 2026-10-22); AC text not yet updated.
* GEO-1239: Manage Scope saves ticks and category changes at once (dev 864688) and deleting a prompt asks for confirmation ("Delete Prompt" dialog), as the Rules say; there is no "Suggested Prompts" heading, suggestions sit at the end of the table (dev 863490) (Scenario 59).
* GEO-1238: rule amended on 2026-10-13 (analysis type alone is not a choice; topic named in the message) to align with GEO-1241; the Rules sentence "Going back to a previous step with unsaved changes keeps today's message" is obsolete since the dev decision 865946 (no dialog on a stepper back-click); Rules text not yet updated.
* GEO-1002 (questions for the PO): should a custom category name keep the case typed by the user or be put in Title Case, in every language including FR Visibility suggestions; should a typed custom prompt text be cleaned; French register ("vous" / "tu") and translation of category names on FR rows, with the FR / ES strings sheet (A8).
* GEO-1231 AC2 (A6): the AC still says "primary language", a concept removed by the PO (GEO-1231 comment 860312, replaced by the AI Insights field); Scenario 18 follows the PO; AC text not yet updated.
* GEO-1231 AC4 (A7, QA decision 2026-10-23): categories discovered in the AI Insights language are accepted; Scenario 20 checks the insights and summaries only.
* GEO-1233 AC2: delivered by GEO-1251 (the epic now splits it into 4 criteria matching GEO-1251, the story keeps it verbatim); covered by Scenarios 72 to 76, nothing tested under GEO-1233.
* GEO-1251 AC2 and AC5: the background call keeps at most 5 competitors while the templates have 3 slots (dev 860501), so 1 to 3 names are expected (Scenario 73); with no Visibility prompt, Share of Voice counts the Competitive wins only and Brand Rankings stay empty (dev 865950); the "Sentiment" type of AC5 is read as Reputation (A17, QA decision).
* GEO-1251 (backend only): AC1 and AC3 are verified only through their observable output (competitors named in Competitive results); "no background call made" cannot be observed in the UI; AC4 needs a forced failure of the background call (dev support).
* GEO-1002: whether a model that Gemini splits off its brand (e.g. "Renault Austral" next to "Renault") is folded back into the brand family awaits a PO decision (dev 865049); a Competitive prompt with fewer than 3 competitors is needed as test data for the natural wording with fewer competitors.
* GEO-1229 AC4, GEO-1230 AC3, GEO-1240 AC3: require back-office admin access to lower an organisation's pool below usage on staging.
* GEO-1239 AC3, AC6 and AC7: need one or more new collections after the change; plan them on daily analyses created early in the cycle.
* GEO-1239 (dev 867353): the category translation of Add Country (Manage Scope) runs with no randomness; PO confirmation asked.

**Environment:** Staging — unbranded flag ON, plus one run with the flag OFF (GEO-1234 AC3 and the first wizard step); an organisation with a prompt pool and back-office admin access (GEO-1230, GEO-1229 AC4, GEO-1240 AC3), plus an organisation at its pool (GEO-1239 AC9); production back office read-only right after the 1.3 deploy with the review list geo-1515-1-organisations.csv (GEO-1515); a disposable QA analysis where Manage Scope saves are allowed; daily analyses created early for next-run data.

**Priority:** High

**Assignee:** Assiya.Benramdane (to confirm)

#### AC Coverage by Story

Result: **76 / 76 ACs covered** (GEO-1229 5/5, GEO-1230 4/4, GEO-1515 6/6, GEO-1231 7/7, GEO-1232 4/4, GEO-1233 7/7, GEO-1234 4/4, GEO-1235 8/8, GEO-1236 4/4, GEO-1237 6/6, GEO-1238 2/2, GEO-1239 9/9, GEO-1240 5/5, GEO-1251 5/5). Every AC maps to at least one scenario. "Partial" = only the visible output is testable (see Open Points). GEO-1233 AC2 is counted as covered through GEO-1251 AC1.

**GEO-1229 — Share one prompt pool across all analyses**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One pool, no structural cap | 11 | Yes |
| AC2 | One slot per market, unticked free | 12 | Yes |
| AC3 | Deleting an analysis frees slots | 13, 71 | Yes |
| AC4 | Downgrade never touches what exists | 14 | Yes (needs back-office access) |
| AC5 | Filter by country, languages roll up | 15 | Yes |

**GEO-1230 — Set the prompt pool of an organisation in the back office**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One field replaces the old quotas | 1 | Yes |
| AC2 | Whole number ≥ 1 with usage hint | 2 | Yes |
| AC3 | Lowering below usage warns, never blocks | 3 | Yes (needs back-office access) |
| AC4 | Prompts column in organisations list | 4 | Yes |

**GEO-1515 — Set the prompt pool of existing organisations from their old quota**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Pool from the old quota | 5 | Partial (production, after the deploy, against the review list) |
| AC2 | Current usage not taken into account | 6 | Partial (through the review list) |
| AC3 | Pools already set not touched | 7 | Partial (needs a pool set by an admin before the deploy) |
| AC4 | Deleted organisations skipped | 8 | Yes (no TC yet) |
| AC5 | Review list before production | 9 | Yes |
| AC6 | Done in 1.3 | 10 | Yes |

**GEO-1231 — Set the brand and the markets**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Questions | 17 | Yes |
| AC2 | Add a country: country then language | 18 | Yes |
| AC3 | Change language, no market limit | 19 | Yes |
| AC4 | Language for AI Insights | 20 | Yes |
| AC5 | Empty brand | 21 | Yes |
| AC6 | Discovery loading screen | 22 | Yes |
| AC7 | Wizard shell | 16 | Yes |

**GEO-1232 — Review the detected categories**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Badge and translations; empty state | 23 | Yes |
| AC2 | Add category modal | 24 | Yes |
| AC3 | Removal states the impact | 25 | Yes |
| AC4 | No limit | 26 | Yes |

**GEO-1233 — Review the suggested prompts**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | 10 per type per category per market, ticked | 27 | Yes |
| AC2 | Competitors resolved in the background | 72 (via GEO-1251) | Delivered by GEO-1251 |
| AC3 | 10 Brand Image prompts per market | 28 | Yes |
| AC4 | Over-pool state on arrival | 29 | Yes |
| AC5 | Re-ticking a muted row | 30 | Yes |
| AC6 | Trash deletes, untick mutes | 31 | Yes |
| AC7 | Coming back from Categories keeps work | 32 | Yes |

**GEO-1234 — Add a prompt inline**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Editable row at the top | 33 | Yes |
| AC2 | Selects limited to the analysis | 34 | Yes |
| AC3 | No inference, confirm gated | 35 | Yes (flag OFF only; overridden by GEO-1247 AC3) |
| AC4 | Added row: kept, highlighted, CUSTOM | 36 | Yes |

**GEO-1235 — Sort, filter and edit the prompt table**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Columns | 37 | Yes |
| AC2 | Category and type on every row | 38 | Yes |
| AC3 | Header menus | 39 | Yes |
| AC4 | No results | 40 | Yes |
| AC5 | Empty table | 41 | Yes |
| AC6 | Pinned tracker and header | 42 | Yes |
| AC7 | Edit wording only | 43 | Yes |
| AC8 | Show prompts | 44 | Yes |

**GEO-1236 — Track the pool while selecting prompts**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Ring and popover | 45 | Yes |
| AC2 | Exactly at the limit | 46 | Yes |
| AC3 | Over the limit | 47, 48, 66 | Yes |
| AC4 | System never removes a prompt | 49 | Yes |

**GEO-1237 — Review and create the analysis**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Scope and engines | 50 | Yes |
| AC2 | Dropped scope and missing metrics | 51 | Yes |
| AC3 | Engines allowed for the organisation | 52 | Yes (follows the Rules, AC text not updated) |
| AC4 | Engines are free | 53 | Yes |
| AC5 | Over the pool | 54 | Yes |
| AC6 | Confirmation | 55 | Yes |

**GEO-1238 — Leave the wizard**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Confirmation on Back to Dashboard | 56 | Yes |
| AC2 | Cancel keeps everything | 57 | Yes |

**GEO-1239 — Manage prompts after launch**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Same table, filters and tracker | 58 | Yes |
| AC2 | Suggested Prompts | 59 | Yes |
| AC3 | Edit wording from next run | 60 | Yes (needs a next run) |
| AC4 | Delete frees slot, keeps history | 61 | Yes |
| AC5 | Last prompt of a group can be deleted | 62 | Yes |
| AC6 | Version history | 63 | Yes (needs prompt changes over dates) |
| AC7 | Category or type change | 64 | Yes (needs a next run) |
| AC8 | Add a category or a market | 65 | Yes |
| AC9 | No free slot in the pool (new 2026-10-20) | 66 | Yes |

**GEO-1240 — See the prompt pool on the GEO dashboard**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Pool block | 67 | Yes |
| AC2 | Exactly at the limit | 68 | Yes |
| AC3 | Over the limit | 69 | Yes (needs back-office access) |
| AC4 | Prompts column | 70 | Yes |
| AC5 | Counts follow changes | 71 | Yes |

**GEO-1251 — Resolve competitors when no Visibility prompt is kept**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Competitors resolved in the background | 72 | Partial (backend only) |
| AC2 | Competitive prompts run without Visibility | 73 | Yes (1 to 3 names, templates have 3 slots) |
| AC3 | Visibility still wins | 74 | Partial (no-call not observable) |
| AC4 | Failed resolution never fails analysis | 75 | Partial (needs forced failure) |
| AC5 | Only Competitive prompts completes | 76 | Yes |