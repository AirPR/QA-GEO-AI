### QA Test Plan for GEO-R1.3 — GEO-1002, GEO-1069, GEO-1209, GEO-1068, GEO-1513 — New-Analysis Wizard, Prompt Pool, Brand Website, Unbranded Analysis, Simplified Concepts and Target Sources Sort

**Updated:** 2026-10-25 | **Previous version:** TEST-PLAN-GEO-R1.3 (2026-10-22) | **Source CSV:** testcases-coverage-epicGEO-1002.csv (111 TCs), testcases-coverage-epicGEO-1069.csv (35 TCs), testcases-coverage-epicGEO-1209.csv (97 TCs), testcases-coverage-epicGEO-1068.csv (36 TCs), testcases-coverage-epicGEO-1513.csv (9 TCs), GEO-1226 pending — 288 TCs | **Status:** Approved 2026-10-25

**Objective:** Verify release GEO-R1.3 end to end: the rebuilt new-analysis wizard and the organisation-wide prompt pool (back office, pool conversion of existing organisations from their old quota, wizard tracker, Summary, Manage Scope, GEO dashboard and background competitor resolution — GEO-1002), the optional brand website asked for a custom brand with URL normalization, logo preview, consistent logo use across the analysis and its exports, and the website stored as the brand domain like a selected suggestion (GEO-1069), the unbranded (topic) analysis with its Analysis Type step, topic Overview, Category view, hidden Actions Center, adapted exports and email, and the Other fallback for unclassified prompts (GEO-1209), and the simplified key concepts display showing only frequency and an explicit polarity label in lists, detail panel, sort and filters, exports and for other users of the organisation (GEO-1068), and the Action Center improvements: the "Most prompts" sort with a prompt count on the Target Sources cards and the reuse of recent page verdicts to save Firecrawl captures (GEO-1513). Tests follow the dependency order GEO-1002 → GEO-1069 → GEO-1209 → GEO-1068, then GEO-1513, then a cross-epic integration pass (branded vs unbranded wizard, shared concept list, PPTX / PDF / XLSX exports, logos, Target Sources by analysis mode) and a non-regression pass on brand analyses and older analyses. GEO-1226 (Target Sources review pages) has fix version 1.3 but no Story or Task yet, so it has no scenario in this plan. Where a story and its epic text disagree, the story is the reference. The wizard step called "Review" in the ACs is shown as "Summary" (dev 866136).

#### Test Scenarios & Detailed Test Cases

##### GEO-1002 — Setup Revamp: Prompt-Pool Quota and New-Analysis Wizard

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

##### GEO-1069 — Ask for the Brand Website when a Custom Brand is Entered

**Brand Website Field (stories: GEO-1260)**

- Scenario 77: Website Asked for a Custom Brand - Verify that choosing the "Custom Brand" row of the brand search shows an optional website field before Discover Categories.
- Scenario 78: Website Asked When the Search Returns Nothing - Verify that a brand name returning no suggestion at all shows the same custom row and the same optional website field.
- Scenario 79: Website Left Empty - Verify that leaving the website empty lets the setup continue normally, with no logo retrieval and the brand shown as a neutral lettermark.
- Scenario 80: Suggestion Selected - Verify that selecting a dropdown suggestion requests no website and keeps today's brand card and flow.
- Scenario 81: Website Field Placement and Copy - Verify that the website field is inline under the custom brand card, before category discovery, with the label "What is your brand's website? (optional)", the placeholder "example.com" and the hint "We use it to show the right logo. Leave it empty to show your brand's initial."
- Scenario 82: No Website in an Unbranded Analysis - Verify that Topic & Country of an unbranded analysis never asks for a website.
- Scenario 83: Website Change Resets Categories - Verify that changing the website after categories were discovered resets the discovered categories, as renaming the brand does.

**URL Normalization (stories: GEO-1261)**

- Scenario 84: Reasonable URL Forms Accepted - Verify that a full URL, a bare domain, or an address with or without protocol, www prefix or trailing path is accepted and gives the full hostname without the protocol, the www prefix, the path or the query (https://www.brand.com/fr?x=1 gives brand.com, shop.brand.co.uk stays as is).
- Scenario 85: Invalid Website Inline Error - Verify that input that cannot be interpreted as a domain shows the inline message "Enter a valid website, such as example.com." on blur or on Discover Categories, blocks the step, and disappears once the value is valid or empty.
- Scenario 86: Derived Domain Stored - Verify that the derived domain is stored as the brand's domain of the created analysis, as shown by the domain-based logo after creation.

**Logo Preview (stories: GEO-1262)**

- Scenario 87: Logo Preview on Confirm - Verify that confirming a valid domain (blur or Enter) shows the retrieved logo in place of the 32px avatar of the custom brand card within moments, with the domain shown under the brand name.
- Scenario 88: General Favicon and Lettermark Fallbacks - Verify that a domain unknown to the brand logo service shows the general favicon (the site's favicon, or the generic globe when the site has none), and that the lettermark shows only when neither is available (the favicon fails to load).
- Scenario 89: Preview Follows a Website Correction - Verify that editing the website URL updates the preview to the logo of the new domain and never shows the previous domain's logo.
- Scenario 90: No Website, No Lookup - Verify that with no website provided the setup shows the lettermark as the brand visual and no logo lookup happens.

**Brand Logo Across the Analysis (stories: GEO-1263)**

- Scenario 91: Captured Domain Logo Everywhere - Verify that a custom brand with a captured domain shows the same domain-based logo in the report list, dashboard sidebar and header, rankings target row (Overview and Category views), competitive views and PowerPoint / PDF export.
- Scenario 92: Lettermark Everywhere Without Website - Verify that a custom brand with no website shows the neutral lettermark consistently in the same places, never a logo from a guessed domain (name search or AI-cited domain).
- Scenario 93: Older Analyses Unchanged - Verify that an analysis created before the release with no stored brand domain keeps today's logo behaviour on every surface.

**Captured Domain as the Brand Domain (stories: GEO-1263 & GEO-1261)**

- Scenario 94: Winner Logo in the Prompts Table - Verify that a prompt won by the target custom brand shows the captured-domain logo in the prompts table winner column, and the lettermark when no website was given.
- Scenario 95: Website Feeds Category Discovery - Verify that category discovery of a custom brand with a website uses that website as the brand domain, like a selected suggestion.
- Scenario 96: Owned-Domain Exclusion - Verify that cited sources on the captured domain are treated as the brand's own domain in AI Citation Sources.
- Scenario 97: Competitor Discovery Uses the Captured Domain - Verify that competitor discovery treats the captured domain as the analysed brand's domain, so a brand owned on that domain is not listed as a competitor.

##### GEO-1209 — Unbranded Analysis and Other Prompts

**Analysis Type Step (stories: GEO-1241)**

- Scenario 98: Two Analysis Type Cards - Verify that, with the unbranded flag ON, New Analysis opens Analysis Type with two cards, Brand analysis and Unbranded analysis, each saying what it measures with the copy validated and changed by the PO on 2026-10-21, and nothing selected.
- Scenario 99: Flag OFF, Wizard Unchanged - Verify that, with the unbranded flag OFF, New Analysis opens today's four-step wizard starting at Brand & Country, with no Analysis Type step and no mode pill.
- Scenario 100: Selection Enables Continue and the Pill - Verify that selecting a card enables the primary action and shows the mode pill "Brand analysis" or "Unbranded analysis" in the product bar.
- Scenario 101: Topic & Country Step - Verify that after selecting Unbranded analysis, Brand & Country is labelled Topic & Country and asks for an industry or topic instead of a brand, with no brand search, logo or website field.
- Scenario 102: Topic Question and Helper - Verify that Topic & Country asks "What industry or topic are you analyzing?" with the helper "The topic frames the analysis and is never measured. We measure the brands AI engines name."
- Scenario 103: Empty Topic Error - Verify that continuing with an empty topic shows a red border and the message "Add your industry or topic to continue."
- Scenario 104: Switching the Mode Clears the Later Steps - Verify that going back to Analysis Type and switching the mode opens a confirmation reading "Switching the mode clears your brand or topic, your countries, your categories and your prompts.", and that confirming clears them while cancelling keeps everything.
- Scenario 105: Topic Discovery Screen - Verify that continuing from a valid Topic & Country shows the category discovery screen on the brand layout with the topic texts "Scanning how AI engines see {topic} across your countries." and "This usually takes about 20 seconds. We look at your topic, your countries and their languages."
- Scenario 106: Unbranded Prompt Types - Verify that an unbranded analysis generates no Brand Image prompts, that Reputation becomes Category Topics, and that Competitive takes a fourth auto-resolved competitor in the brand's place.
- Scenario 107: Thirty Prompts per Category and Market - Verify that each category in each market gets 30 prompts (Visibility, Competitive and Category Topics), so that 2 markets with 3 categories give 180 prompts.
- Scenario 108: Unbranded Type Badges and Selects - Verify that type badges and type selects of an unbranded analysis show only Visibility, Competitive, Category Topics or Other.
- Scenario 109: Unbranded Pool Cost - Verify that each kept prompt of an unbranded analysis costs one slot per market, as in a brand analysis.
- Scenario 110: Summary Warning for InBrief and Top Topics - Verify that an unbranded analysis with no kept Category Topics prompt and no kept prompt in Other gets a Summary warning naming InBrief and Top Topics as metrics it will not produce.

**Unbranded Analysis Run (stories: GEO-1242)**

- Scenario 111: Mode and Topic Stored, No Target - Verify that a created unbranded analysis keeps its mode and topic with no target brand, and that the topic is its name in the dashboard, emails and exports.
- Scenario 112: No Brand Is the Target - Verify that no brand of an unbranded analysis is scored, highlighted, starred or protected as the target, and that every brand named by the answers is measured the same way.
- Scenario 113: Topic Split Into Two Categories - Verify that category discovery splits the topic into 2 consumer search areas (e.g. "postal services" into "parcel delivery" and "international shipping"), with no brand website.
- Scenario 114: Production Templates With Competitor 4 - Verify that Visibility prompts use the 10 production templates with {category} only and that Competitive prompts use the 10 production templates with [Competitor 4] in the {entity} slot, comparing the top 4 brands of that category and market.
- Scenario 115: Topic-Based Adaptation - Verify that prompts adapted and translated for each market are built around the topic and are not required to contain the topic word.
- Scenario 116: Ten Category Topics Prompts - Verify that each category gets the 10 Category Topics prompts, one per theme, from "What should I look for in {category}?" to "What are the main controversies in {category}?".
- Scenario 117: Category Topics Run as Written - Verify that Category Topics prompts are sent exactly as written, like prompts with the Other type, and that their answers are not framed around a brand.
- Scenario 118: Category Topics Analysis - Verify that each Category Topics answer yields the topics raised with a sentiment for the category as a whole, up to 12 topics per category with the production thresholds kept, and no brand tags displayed.
- Scenario 119: Competitive With Too Few Competitors - Verify that in an unbranded analysis a Competitive prompt outside Other is not sent and has no row in the prompts table when fewer than 2 competitors were extracted for its category and market, while a brand analysis still sends it with the empty slots removed.
- Scenario 120: Topic Not Editable - Verify that the topic of an unbranded analysis cannot be changed in Manage Scope, as the brand today.

**Unbranded Overview (stories: GEO-1243)**

- Scenario 121: Sidebar Topic Block - Verify that the sidebar block of an unbranded analysis shows the topic's first letter in the logo slot and the topic, with no extra header, mode label or date.
- Scenario 122: Hidden Brand Widgets - Verify that the unbranded Overview does not show the scope bar, KPI cards and deltas, Time Evolution, Category Prioritization, Corporate Reputation, Brand Territory or the Brand Image hint.
- Scenario 123: InBrief About the Topic - Verify that InBrief shows 3 bullets about what the answers say on the topic, built from Category Topics and Other-type answers, possibly naming brands attached to a topic, with "Category summary generated by artificial intelligence".
- Scenario 124: Dedicated Topic InBrief - Verify that the unbranded InBrief is a topic summary (not the brand Perception summary) whose bullets reflect the Category Topics and Other concepts of the Overview or the category and say why a topic comes up.
- Scenario 125: InBrief Format Check - Verify that InBrief bullets are 3 bullets of 150 characters max with no brand-name check, and that the widget shows its error state after the last failed attempt.
- Scenario 126: InBrief and Top Topics Hidden or Empty - Verify that InBrief and Top Topics are hidden for an analysis or category with no Category Topics and no Other prompts, and show an empty state when such prompts exist but returned no topic.
- Scenario 127: Top Topics in the Category - Verify that Top Concepts is titled "Top Topics in the Category" and that each topic describes the category, never names a brand, and shows its sentiment towards the category and its frequency, with no brand tags.
- Scenario 128: Neutral SOV Ring - Verify that the Share of Voice ring keeps the brand analysis calculation with no enlarged slice, no centre value and the subtitle "How the answers split across entities".
- Scenario 129: Topic Landscape Table - Verify that the rankings table is titled "{topic} landscape" with no highlighted row and tooltips without "your brand".
- Scenario 130: Unbranded Citation Sources - Verify that AI Citation Sources has a subtitle referring to the topic, no Owned Media or Competitor Media in its legend, no Favorability column, and a "Category Topics" tab in the related prompts modal listing every Category Topics prompt that cites the source, whatever its sentiment. *(corrected)*
- Scenario 131: Neutral Captions - Verify that every widget caption of the unbranded analysis describes the widget and never reminds the user that no brand is set.
- Scenario 132: Brand / Topic Column in the Analyses List - Verify that the analyses list shows a "Brand / Topic" column with the topic and its first letter and no domain for an unbranded analysis, and that the Competitors card also counts the brands detected in unbranded analyses.

**Unbranded Category View and Prompts (stories: GEO-1244)**

- Scenario 133: No KPI Cards at Category Scope - Verify that an unbranded Category view has no KPI cards and that InBrief, Top Topics, the SOV ring and rankings follow the Overview rules at category scope.
- Scenario 134: Time Evolution and Top 5 Matrix - Verify that Time Evolution shows the top 10 brands with no highlighted line and no Sentiment tab, and that Brand Prioritization plots the top 5 brands by SOV with no target dot.
- Scenario 135: Time Evolution Top 10 Rule - Verify that Time Evolution picks the top 10 brands by SOV in the latest collection of the selected window with the market and LLM filters applied, follows filter changes, and still needs 7 collections in the window.
- Scenario 136: Winner or Split - Verify that each prompt row shows the brand (not the product) ranked first when every engine ranks the same brand family first, including with a single engine selected, and "Split" otherwise (including 2 engines on A and 1 on B, or an engine with an empty ranking), with no favourability filters or count. *(corrected)*
- Scenario 137: Winner per Collection - Verify that the winner is computed per collection (the latest or the selected one), not over the date range.
- Scenario 138: Prompt Detail Panel Without Target - Verify that the prompt detail panel shows the full ranking and the brand chosen per engine, with no target brand block.
- Scenario 139: Category Topics Label - Verify that the prompts table tabs and the detail panel label Category Topics prompts "Category Topics", never "Perception", and that the topics list is announced as "Category Topics" to screen readers. *(corrected)*
- Scenario 140: Category Landscape Title - Verify that the rankings table at category scope is titled "{category} landscape".

**Unbranded Actions Center, Export and Email (stories: GEO-1245)**

- Scenario 141: Actions Center Hidden - Verify that the sidebar of an unbranded analysis hides the Actions Center entry and that opening the Actions Center URL directly shows the dashboard.
- Scenario 142: Unbranded Export - Verify that the XLSX and PowerPoint / PDF exports use the topic on the cover and in titles, give each category section its "{category} landscape" slide, skip dropped sheets and slides, have no Favorability column in Raw Data, never say "your brand", and put no target marker on any brand. *(corrected)*
- Scenario 143: Analysis Ready Email - Verify that the analysis ready email of an unbranded analysis uses the topic as the analysis name in its subject and body.

**Unbranded Manage Scope (stories: GEO-1246)**

- Scenario 144: Unbranded Fresh Suggestions - Verify that adding a category or a market to an unbranded analysis in Manage Scope brings 10 Visibility, 10 Competitive and 10 Category Topics suggestions per market, with no Reputation or Brand Image, and with the category name translated in the language of the new market in every prompt. *(corrected)*
- Scenario 145: Unbranded Type Select - Verify that adding or editing a prompt of an unbranded analysis in Manage Scope offers only Visibility, Competitive, Category Topics and Other in the type select.

**Other Fallback Classification (stories: GEO-1247)**

- Scenario 146: Brand Analysis Type Badges With Other - Verify that, with the flag ON, the type badges of a brand analysis show Visibility, Competitive, Reputation, Brand Image or Other.
- Scenario 147: Each Missing Dimension Falls Back Alone - Verify that a prompt saved without a category, without a type, or without both, is Other on that dimension only.
- Scenario 148: Inline Add Never Blocked - Verify that confirming an inline prompt with its category or type empty is accepted and the empty dimension falls back to Other (overrides GEO-1234 AC3 with the flag ON).
- Scenario 149: Other in the Column Filters - Verify that the Category and Type column filters list Other as a value of its own with its live count.
- Scenario 150: Other Inline Select and Warning Tint - Verify that the missing dimension of a prompt in Other reads "Other" in an inline select (ticked or not) in the wizard and Manage Scope, that a kept row is on the warning tint, and that picking a value removes the tint and updates the counts.
- Scenario 151: Non-Blocking Other Warning - Verify that kept prompts in Other trigger the table banner "{n} prompts are in Other." / "Pick a category and a type. Anything left as Other still runs, but it returns key concepts only, no metrics.", without blocking the launch.
- Scenario 152: Summary Other Card - Verify that Summary shows a card titled with "Other" (never "Unclassified" or "uncategorised") listing each kept Other prompt with its market and an inline select for the missing value, stating it returns key concepts only until classified, never blocking launch, and hidden when there is none.
- Scenario 153: Other Prompts in Manage Scope - Verify that Other prompts show on inline selects in the Prompts section of Manage Scope.
- Scenario 154: Other-Type Prompt Cost and Output - Verify that a prompt that is Other on its type consumes a full slot per market and returns key concepts only. *(corrected)*

**Other on the Dashboard (stories: GEO-1248)**

- Scenario 155: Other Sidebar Entry - Verify that the sidebar shows a last "Other" category when at least one kept prompt has no category, and hides it when there is none.
- Scenario 156: Other Category Page - Verify that the Other category page shows the key concepts of its prompts and the prompts table, with no KPI cards, SOV, Time Evolution, prioritization or rankings.
- Scenario 157: Other Tab in a Real Category - Verify that a real category with Other-type prompts shows an "Other" tab with its count after the type tabs, hidden at 0, whose rows show their key concepts in Winner / Themes.
- Scenario 158: Visibility and Competitive in the Other Category - Verify that a Visibility or Competitive prompt in the Other category is ranked and shows the brand ranked first or "Split", and feeds no KPI, SOV, rankings or Time Evolution.
- Scenario 159: Competitive in Other Runs as Written - Verify that a Competitive prompt in the Other category runs as the user wrote it, with hand-typed unfilled placeholders removed as in production, the sent wording being shown in the Prompts Analysis table and its detail panel. *(corrected)*
- Scenario 160: No Cross-Category Extraction - Verify that competitors named in Visibility answers of the Other category never appear in another category's competitive results.
- Scenario 161: Concepts Extracted, Excluded From KPIs - Verify that Other-type prompts produce key concepts that are excluded from KPIs and SOV, while Visibility and Competitive prompts in the Other category are ranked only and produce no concepts.
- Scenario 162: Other-Type Concepts Follow the Mode - Verify that the concepts of an Other-type prompt are about the brand with sentiment towards the brand in a brand analysis, and are topics with sentiment towards the category in an unbranded analysis.
- Scenario 163: Other Concepts Feed InBrief and Top Concepts - Verify in both modes that an Other-type prompt feeds InBrief and Top Concepts / Top Topics of its category and the Overview, and that a prompt in the Other category feeds the Overview and the Other category page.
- Scenario 164: Classification Takes Effect Next Run - Verify that an Other prompt classified in Manage Scope moves to its category and type at the next collection and feeds their metrics, while past collections stay where they were collected.
- Scenario 165: Other Section in Export - Verify that exports include the Other section, limited to key concepts.
- Scenario 166: Other Sources Tab and Detail Panel - Verify that the Other category page has the Sources tab of a category page and that a prompt opens the "Other Details" panel with sentiment per engine, themes, response and sources.

##### GEO-1068 — Simplify Key Concepts Sentiment Display

**Concept Row Display (stories: GEO-1266)**

- Scenario 167: Frequency and Polarity Only - Verify that each concept row of the key concepts list shows its frequency and its polarity and no numeric sentiment score (no "-80 sentiment").
- Scenario 168: Explicit Polarity Label - Verify that the polarity is stated as an explicit Positive / Mixed / Negative label in the row's meta line, not by colour alone, while the coloured bar and percentage colour stay.
- Scenario 169: Same Concepts, Same Frequency - Verify that the concepts listed and their frequency values are unchanged from before the release for the same analysis and filters.

**Concept Detail Panel (stories: GEO-1267)**

- Scenario 170: Panel Frequency and Polarity, No Score - Verify that the expanded concept view shows the concept's frequency and its polarity label (white pill on the coloured header) and no -100 to +100 sentiment score.
- Scenario 171: No Barometer - Verify that the expanded concept view no longer shows the Negative to Positive barometer gauge or its cursor.
- Scenario 172: Panel Sources Unchanged - Verify that the cited sources and all other existing panel content (coloured header, concept name, close button, frequency) remain unchanged, with no quotes added.

**Concept Sort and Filter (stories: GEO-1268)**

- Scenario 173: Sort by Polarity Group - Verify that sorting by Sentiment orders concepts positive first, then mixed, then negative, by frequency then A–Z inside a group, without exposing any numeric score.
- Scenario 174: Polarity Filters Unchanged - Verify that filtering to positive, mixed or negative behaves exactly as before the release.
- Scenario 175: Distribution Summary Unchanged - Verify that the sentiment distribution summary above the list (share of positive, mixed and negative concepts) is unchanged.

**Concept Exports and Other Users of the Organisation (stories: GEO-1269)**

- Scenario 176: Slide Export Concepts - Verify that the PPTX and PDF key concepts section shows each concept with "{n} sources • {Positive | Mixed | Negative}" with the polarity as a word in the export language and its frequency % in the polarity colour, with no numeric sentiment score and no barometer.
- Scenario 177: Same-Organisation User View - Verify that another user of the same organisation opening the analysis sees the key concepts view matching the simplified main view (epic 1.4 AC3).

##### GEO-1513 — Action Center Improvements

**Target Sources Most Prompts Sort (stories: GEO-1184)**

- Scenario 178: Most Prompts Order - Verify that with "Most prompts" selected the Target Sources cards are in descending order of the prompt count shown on them, ranks restarting at 1 in the new order. *(new)*
- Scenario 179: Sort Within Tab, Scope and Period - Verify that the Most prompts sort applies within the current tab (All, Improve visibility, Improve perception) and the current scope and period, the same way the default sort does. *(new)*
- Scenario 180: Prompt Count on Each Card - Verify that each card shows the number of prompts that use the source as "Used in N prompts" ("Used in 1 prompt" in the singular) on a line under the failing-article lines, in both sorts. *(new)*
- Scenario 181: Card Count Matches the Panel - Verify that the count on a card equals the number of distinct prompts listed in its "Prompts associated with this source" section, whose All tab shows the same total (e.g. "All (24)"), all engines and locales together. *(new)*
- Scenario 182: Tie Rule - Verify that sources with the same prompt count are ordered by failing articles, then by domain. *(new)*
- Scenario 183: Default Sort and Export Unchanged - Verify that, when Most prompts is not selected, the default sort by failing articles and the export are unchanged. *(new)*
- Scenario 184: Export Ignores the Sort - Verify that the PPTX and XLSX exports are identical whether Most prompts or the default sort is selected. *(new)*
- Scenario 185: Sort Control and Wording - Verify that the sort control sits in the page header left of the Card view / List view switch, is named "Sort by", and offers "Failing articles" (default) and "Most prompts" with their one-line descriptions. *(new)*
- Scenario 186: List View Prompts Column - Verify that the list view shows a "Prompts" column after "Articles" with a descending indicator while Most prompts is active. *(new)*
- Scenario 187: Sort Choice Persistence - Verify that the sort choice is kept when switching tabs, views, filters and while paging with Show more, and resets to the default on the next visit of the page. *(new)*

**Firecrawl Verdict Reuse (stories: GEO-1534)**

- Scenario 188: Recent Verdict Reused - Verify that a page whose verdict was confirmed by a capture less than N days ago is not captured again on the next run and keeps its existing verdict in Target Sources. *(new)*
- Scenario 189: Page Read Again After N Days - Verify that once N days have passed since its last real capture, the page is captured and judged again, a reuse never counting as a capture. *(new)*

##### Cross-Epic Integration

**Wizard End to End, Branded vs Unbranded (stories: GEO-1231 & GEO-1241 & GEO-1260 & GEO-1262 & GEO-1237 & GEO-1238)**

- Scenario 190: Brand Wizard With a Suggested Brand - Verify with the flag ON a full brand creation through the five steps (Analysis Type, Brand & Country with a Brandfetch suggestion, Categories, Prompts, Summary), with the "Brand analysis" pill on every step, no website field, and the analysis created and opened from View analysis.
- Scenario 191: Brand Wizard With a Custom Brand and Website - Verify a full brand creation with a custom brand and a website, from the logo preview on Brand & Country to the same logo in the report list, dashboard sidebar and header, rankings, prompts table winner and PowerPoint cover of the created analysis.
- Scenario 192: Unbranded Wizard End to End - Verify a full unbranded creation (Analysis Type, Topic & Country with no brand search, logo or website field, 2 discovered categories, 30 prompts per category and market, Summary, creation) ending on the unbranded Overview named after the topic.
- Scenario 193: Flag OFF Run - Verify with the flag OFF that the wizard has four steps and no mode pill, that the website field still works for a custom brand, and that no prompt can be saved in Other (inline confirm stays gated).
- Scenario 194: Exit Rules Across Modes - Verify that with only the analysis type picked Back to Dashboard leaves directly, and that once something is entered the exit confirmation names the brand or the topic ("this brand" / "this topic" when none is entered yet).
- Scenario 195: Summary Warnings Combined - Verify that Summary combines the dropped-scope warning, the InBrief / Top Topics warning (unbranded) and the Other card without conflict, and that Create Analysis is disabled over the pool in both modes.

**Prompt Pool and Manage Scope Across Modes (stories: GEO-1229 & GEO-1240 & GEO-1239 & GEO-1241 & GEO-1246 & GEO-1247 & GEO-1251)**

- Scenario 196: Pool Shared by Brand and Unbranded Analyses - Verify that brand and unbranded analyses, including their Other prompts, draw on the same pool and that the dashboard Prompts column adds up to the pool block across both types.
- Scenario 197: Manage Scope Across Modes - Verify that Manage Scope keeps Reputation and Brand Image for a brand analysis, offers only Visibility, Competitive, Category Topics and Other for an unbranded one, shows Other prompts on inline selects in both, and disables Add prompt, Add country and Add category with no free slot in both.
- Scenario 198: No Competitor Discovery in Unbranded - Verify that an unbranded analysis triggers no background competitor resolution and that the Other category is excluded from it, Competitive prompts relying only on the top brands of the visibility answers.

**Shared Concept List (stories: GEO-1266 & GEO-1267 & GEO-1268 & GEO-1243 & GEO-1248)**

- Scenario 199: Simplified Display on Top Topics and the Other Page - Verify that the rows of unbranded Top Topics and of the Other category page show the quote count, source count, frequency and polarity label with no score, and that sort and polarity filters behave as on brand Top Concepts.
- Scenario 200: Concept Detail Panel in Unbranded - Verify that the concept detail panel of an unbranded analysis shows frequency and the polarity pill with no score and no barometer, with sources unchanged.

**Exports PPTX / PDF / XLSX (stories: GEO-1269 & GEO-1263 & GEO-1245 & GEO-1248)**

- Scenario 201: PowerPoint and PDF Combined - Verify that a brand export carries the captured-domain logo on the cover and rankings target row with simplified concepts, and that an unbranded export carries the topic on the cover, no "your brand", the Other section and simplified concepts.
- Scenario 202: XLSX Combined - Verify that the XLSX concepts tables have the columns Concept · Sentiment · Sources · Frequency · Cited by with no "Score" column, that an unbranded XLSX uses the topic in titles and skips dropped sheets, and that the Other section is present.
- Scenario 203: Export Languages - Verify that the polarity labels and new export texts are translated in EN, FR and ES exports, and that export dates follow the export language (en-GB "22 Oct 2026", fr-FR "22 oct. 2026") while en-US keeps "Oct 22, 2026". *(corrected)*

**Brand Visuals and Localisation (stories: GEO-1262 & GEO-1263 & GEO-1243 & GEO-1241 & GEO-1247)**

- Scenario 204: Brand Visual Consistency - Verify on the analyses list, sidebar and rankings that a captured domain shows its logo, a site without favicon shows the generic globe (general favicon), a custom brand without website shows its initial, and an unbranded analysis shows the topic's first letter.
- Scenario 205: New Strings in Four Locales - Verify the new wizard, website field, unbranded and Other strings in en-US, en-GB, fr-FR and es-ES against the validated strings (GEO-1209 sheet validated by the PO on 2026-10-21 with its changes; GEO-1069 en-US validated).

**Target Sources by Analysis Mode (stories: GEO-1184 & GEO-1534 & GEO-1245)**

- Scenario 206: Target Sources Only in Brand Analyses - Verify that the Target Sources page with its Most prompts sort, prompt counts and reused verdicts is reached from the Actions Center of a brand analysis, while an unbranded analysis exposes no Actions Center entry and its Actions Center URL opens the dashboard. *(new)*

##### Non-Regression

**Brand and Older Analyses (stories: GEO-1243 & GEO-1244 & GEO-1245 & GEO-1246 & GEO-1263 & GEO-1266 & GEO-1269 & GEO-1242 & GEO-1240 & GEO-1231)**

- Scenario 207: Older Analyses Concepts - Verify that an analysis created before the release shows the same concepts and frequencies as before, with only the simplified display applied.
- Scenario 208: Brand Overview Unchanged With the Flag ON - Verify that a brand analysis Overview is unchanged when the unbranded flag is ON.
- Scenario 209: Brand Prompts Table Rules Unchanged - Verify that a brand analysis keeps today's winner, favourability and filter rules in its prompts table.
- Scenario 210: Brand Actions Center and Export Unchanged - Verify that a brand analysis keeps its Actions Center entry and today's export content, including the filled Favorability column of the XLSX Raw Data sheet. *(corrected)*
- Scenario 211: Category Sentiment KPI Tile Kept - Verify that the category-level sentiment KPI tile is still shown and unchanged (D5, validated by the PO).
- Scenario 212: Competitor Logos and Variant Rows Unchanged - Verify that competitor logos and the brand's variant rows in rankings are unchanged by the captured-domain logo rule.
- Scenario 213: Brand Competitive Prompt Cleaning - Verify that a brand analysis Competitive prompt with fewer competitors than placeholders is still sent and reads naturally with the empty slots removed.
- Scenario 214: Discovery Failure Fallbacks - Verify that a failed category discovery opens Categories empty with the error message and that a slow one offers "Add categories manually", as today.
- Scenario 215: Dashboard Lists Every Analysis - Verify that the GEO dashboard lists every analysis of the organisation, even beyond 100, with Show more / Show less working as today.
- Scenario 216: Brand Perception Tab and Label Kept - Verify that in a brand analysis the related prompts modal keeps its Perception tab listing negative answers only and the topics list keeps its "Perception topics" accessible name, only unbranded analyses changing (dev 867178, dev 866828). *(new)*
- Scenario 217: Share of Voice Values Kept - Verify, in brand and unbranded analyses, that each brand of the Share of Voice legend keeps the same rounded % as in the centre label, the KPI card and the tables and the ring is unchanged, only "Others" absorbing the rounding gap so that the legend adds up to 100% (dev 867241). *(new)*

#### Edge Cases & Boundary Conditions

**GEO-1002**

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

**GEO-1069**

* Brand name typed as an address (e.g. www.licter.com): website field prefilled with the normalized domain, so a logo is shown (OP-9 closed).
* URL normalization: https://www.licter.com/fr/about?x=1, http://licter.com, www.licter.com, licter.com/, LICTER.COM and licter.com:8080 give licter.com; shop.brand.co.uk stays shop.brand.co.uk (full hostname without www).
* Invalid website inputs: licter, licter .com, john@licter.com, ftp://licter.com, localhost and 192.168.0.1 show "Enter a valid website, such as example.com." and block the step; the server also refuses an invalid website at creation.
* Site with no favicon: the general favicon (Google's generic globe) is shown, not the lettermark (accepted by the PO, GEO-1262 AC2 amended 2026-10-20); the lettermark shows when there is no domain or the favicon fails to load.
* Website changed after a lookup: the previous domain's logo is never shown nor saved for the new domain; a grey pulsing placeholder shows during the lookup with no layout shift.
* Website changed after category discovery: the discovered categories are reset, as when the brand is renamed.
* Selected Brandfetch suggestion with neither domain nor logo (rare): now shows the lettermark.

**GEO-1209**

* No mode pill before a card is selected on Analysis Type, Continue disabled (A1, current behaviour accepted 2026-10-22).
* Mode switch cancelled: everything kept; confirmed: brand or topic, countries, categories and prompts cleared, and no country is prefilled afterwards, only "+ Add country" (A3).
* InBrief / Top Topics warning on Summary: it never blocks Create Analysis (A6).
* Unbranded Competitive prompt with 2 or 3 competitors: the missing slots are removed from the text; with 0 or 1: not sent and no row in the prompts table; Competitive prompts of the Other category always run as written.
* Unbranded brand whose name contains the topic (e.g. "Postal Services Inc" in "postal services"): can win like any other brand.
* Engine with an empty ranking, or a prompt with no engine answer: the row shows "Split"; no "No ranking returned" in the prompts table; with 2 engines a 1-vs-1 disagreement shows "Split".
* Single engine selected: the Winner shows the brand, not the product (e.g. "Ribble", not "Ribble Hybrid AL e"), in brand analyses too (dev 867179).
* Category Topics prompt with no enriched topic: the Winner / Themes cell shows the themes of the AI engine answer; a prompt with no theme at all reads "—" (dev 867180).
* Time Evolution with fewer than 7 collections in the window: the widget is hidden, as in production (QA decision 2026-10-22).
* InBrief and Top Topics: hidden when no Category Topics or Other prompt exists in the scope, empty state when such prompts returned no topic.
* InBrief bullets not matching the format (not 3 bullets, or over 150 characters): retried with the too-long bullet named, then the widget shows its error state after the last attempt.
* Category Topics: up to 12 topics per category; production thresholds kept (25 % for positive and neutral topics, 10 % for negative).
* Share of Voice legend: each brand keeps its usual rounding and "Others" takes the gap, so the legend adds up to 100% (dev 867241).
* Brand Prioritization: quadrants split at 50% on Visibility x AI Choice on the page, in the API and in the XLSX "Quadrant" column; points at 0% or 100% are drawn inside the plot and quadrant captions stay readable over a point (dev 867177).
* Add Country in Manage Scope: the category name is translated in every prompt of the new country, with the same translation on every attempt (dev 867352).
* Actions Center URL of an unbranded analysis opened directly: the dashboard is shown.
* Other tab in a real category at 0 prompts: hidden; Other sidebar entry disappears once no kept prompt is left in it.
* Other-type prompt returning few or no concepts: accepted; its row shows no theme.
* Unticked prompts in Other: not listed on the Summary card.
* Brand Image prompts: never shown as "Other" in the Category column.

**GEO-1068**

* Polarity filter on: the Sentiment sort sorts a single group and reads as by frequency.
* Equal frequencies: ordered by name A–Z, case and accents ignored.
* Chosen topic sort: kept when moving to a category page and back, as the period filter is.
* French XLSX export: Mixed concepts read "Mitigé", as in the summary line and the slide exports.

**GEO-1513**

* Source used in a single prompt: the card reads "Used in 1 prompt".
* Prompt count: distinct prompts whose answers cite the domain in the period, all engines and locales together, not the number of answers; a prompt cited by two engines counts once in "All (N)", so All can be smaller than the sum of the engine tabs.
* Equal prompt counts: ordered by failing articles, then domain.
* Default sort selected: the list view keeps its "Prompts" column without the descending indicator.
* Next visit of Target Sources: the sort resets to the default.
* Page that changed (brand added or removed) or became unreachable within N days: keeps its previous verdict for at most N days (GEO-1534 trade-off).
* N above 7 days: nothing more is saved, a verdict being judged again every 7 days anyway.

**Cross-epic**

* Category and Type filters with the flag ON and no prompt in Other: "Other (0)" stays listed (QA decision 2026-10-22).
* Unbranded flag OFF: no prompt can be saved in Other (inline confirm gated as in GEO-1234 AC3).
* Export dates: follow the export language (en-GB "22 Oct 2026", fr-FR "22 oct. 2026", es-ES "22 oct 2026"), en-US unchanged ("Oct 22, 2026") (dev 866827).

#### Open Points (not blocking)

**GEO-1002**

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

**GEO-1069**

* GEO-1263 (P1 validated 2026-10-20, epic In scope): GEO-1263 has no AC for the new scope (category discovery, owned-domain exclusion, competitor discovery, prompts table winner); Scenarios 94 to 97 trace to the epic In scope; AC text requested from the PO.
* GEO-1263: "the brand checks" are named in P1 only, not in the epic In scope nor in any AC; no scenario until the PO writes an AC.
* GEO-1263 AC3 (B2): Scenario 93 needs a custom-brand analysis (no stored domain) with an export or logo screenshots taken before GEO-1069 was deployed (test data still to find).
* GEO-1262 AC1 (prerequisite): Scenario 87 needs the Brandfetch brand-profile quota available on staging; without it only the favicon fallback can be checked.
* GEO-1262 AC2: the epic text (User Story 1.3) still reads "the site's favicon", while the story was amended to "the general favicon"; the story is tested (Scenario 88).
* GEO-1260 AC5: the AC names the "Custom Brand" row while the Rules still say "{name} — custom"; scenarios use "Custom Brand".
* GEO-1260 AC7 (OP-6): whether categories are reset at once or at the next Discover Categories is not stated; Scenario 83 checks only that the previous categories are not kept.
* GEO-1069 (OP-2, OP-4, OP-8, still open): lettermark for a Brandfetch suggestion with neither domain nor logo vs GEO-1260 AC4 "flow unchanged"; which screens are the "competitive views" of GEO-1263 AC1 (Scenario 91, to be tested on a ranked analysis such as Nike or Decathlon); no target delay for "within moments" (Scenario 87).
* GEO-1069: no Figma (OS-Team exception); the design review was validated by the designer on 2026-10-22 (GEO-1069 comment 866460); en-US copy validated, en-GB, fr-FR and es-ES texts are machine translations still to be reviewed.
* GEO-1069: extending the website request to manually added competitors is still open (out of scope today).
* GEO-1263 TAC1 to TAC4: database / export technical checks, not counted as QA ACs and not turned into scenarios.

**GEO-1209**

* GEO-1209 PO questions posted on 2026-10-22 (comment 866762), context added on 2026-10-26 (867843), no answer yet: should Summary show the topic of an unbranded analysis (Scenario 111); what the Competitors card of the GEO dashboard counts (Scenario 132); how a tie for the 5th place of the top 5 matrix is broken (Scenario 134). The unbranded InBrief error keeps the generic wording (PO 867725).
* GEO-1209 (dev 867241): the Share of Voice legend rule ("Others" takes the rounding gap) awaits the PO confirmation, two alternatives offered; it also applies to brand analyses.
* GEO-1209 (dev 867190): the quadrant card wording "High visibility, Low AI Choice", the "AI Choice" tooltip and the XLSX "Quadrant" column, whose values differ from older exports, await the PO confirmation; brand analyses are affected too.
* GEO-1247 AC6: the AC still reads "classifying them improves measurement accuracy", while the PO validated the shipped banner text used in Scenario 151; AC update requested from the PO.
* GEO-1247 AC9 (A18): the "keyword graph" does not exist and will not be built in 1.3 (PO 859152); Scenario 154 drops it; AC text not yet updated.
* GEO-1243 AC6 / AC10 (A11, A12): the empty-state and AI Citation Sources subtitle texts were validated as shipped but are not quoted in Jira; Scenarios 126 and 130 check meaning, not exact text.
* GEO-1209 (still open): display of the 4 Competitive placeholders in the prompts tables (A5); QUESTION_ADAPTATION of EN Category Topics prompts (A9); pool slot of a Competitive prompt not sent (A10); export formats holding the Other section (A21). A1, A3 and A6 were accepted as current behaviour on 2026-10-22; A16, A18 and A20 are answered.
* GEO-1209: Figma frames are pending updates by the designer (1.1 to 1.3, 2.4, 7.2, U.1 to U.3, 0.1, 4.3, 4.8, 5.1 to 5.3, 7.4, 7.5); the ACs are the reference.
* GEO-1243 AC4 (A14): InBrief input capped at the 25 most frequent topics; asked to the dev on 2026-10-22 (comment 866797), not checkable in the UI (needs an analysis with more than 25 topics and log or API access).
* GEO-1245 (A17): no export frame yet (GEO-1185 "PowerPoint export" still to come); default expectation is today's layouts with dropped slides skipped and topic titles; PDF scope not stated.
* GEO-1243 AC12 (A13): the "Brand / Topic" header and neutral subtitle show only when the list holds an unbranded analysis; PM to confirm whether they should always show.
* GEO-1248: GEO-1186 text is stale (excludes Other from Top Concepts, mentions a "classify in Manage Scope" hint); GEO-1248 AC9 is tested.
* GEO-1244 AC5 (A16): the prompts table reads one collection (the latest by default) and does not follow the date picker (QA decision 2026-10-22, by design); Scenario 137.
* GEO-1242 AC9: the 2-or-3-competitor cleaning (Scenario 119) needs a Competitive prompt with fewer than 3 competitors, i.e. a niche scope with few brands (test data).
* GEO-1242 AC2 (source classification receives the topic), AC5 (QUESTION_ADAPTATION input and dropped rule), AC7 (no Perception system instruction) and AC8 (extraction path, attached brands): only their visible output is testable (Scenarios 112, 115, 117 and 118); the internal inputs need log or API access.
* GEO-1243 AC4 (InBrief prompt input) and GEO-1248 AC6 / AC8 (extraction per market and category, Gemini extraction path): only the visible output is testable (Scenarios 124, 160 and 162).
* GEO-1248 AC10 and GEO-1244 AC3: need one or more new collections (7 for Time Evolution) after the change; plan them on daily analyses created early in the cycle.
* GEO-1209 test data still missing: unbranded analysis with GB (EN) + FR (FR) and 2 or more categories, a prompt Other on one dimension only, a brand analysis with an Other prompt, 3 engines, an engine returning an empty ranking, the QA mailbox for the analysis ready email (Scenario 143).

**GEO-1068**

* GEO-1068: since the 2026-10-20 epic update, epic 1.4 holds 3 ACs (slide export, XLSX, same organisation) while GEO-1269 keeps 2; QA keeps the story numbering (Scenario 176 includes the XLSX rule, Scenario 177 = epic 1.4 AC3).
* GEO-1068 (still open): polarity filters single or multiple selection and pill counts (A2); reversible Sentiment sort (A3); XLSX headers translated in FR / ES (A4); how the export language is chosen (A5); role needed by the other user of the organisation (A6, Scenario 177); no quote count on brand concept rows (A8).

**GEO-1513**

* GEO-1513: the epic description holds only its title; the scope is taken from its stories; Design Task GEO-1208 not imported.
* GEO-1184: the design names the sort options "Failing articles" (default) and "Most prompts" with their one-line descriptions (Scenario 185); confirm the final labels and descriptions with the PO.
* GEO-1184 / GEO-1208: the design decisions D-1 to D-7 were submitted "please confirm" and the PO answered only "design done ready for dev" (PO 866287); the designer questions (citations line, count following the filters, panel total vs engine tabs, export not following the sort) have no written PO answer; FR / ES strings still to add to the strings sheet.
* GEO-1534 (dev 867357): the approach and the value of N (3 proposed, options 0 / 2 / 3 / 4) await the PO approval; no AC section, one expected result; backend only, so Scenarios 188 and 189 are checked through the verdict kept in Target Sources plus the Firecrawl usage or logs (dev support needed), and testable only after the PO decision.

**GEO-1226**

* GEO-1226 (EPIC-049 Target Sources Improvements for Review Pages, "ready for dev" by the PO on 2026-10-22, read from Jira, not imported — run /import-jira-epic): no Story or Task yet (children: Design Task GEO-1497); its 10 epic-level ACs (review pages grouped as one article, every negative review listed, same count on card, panel and export) get scenarios once stories exist.

**Cross-epic**

* Wizard step naming (dev 866136): the step "Review" is shown as "Summary" (button "Review & Launch" unchanged) and 4 wizard texts were rewritten; the ACs of GEO-1237, GEO-1241, GEO-1247 still say "Review"; this plan uses "Summary".
* GEO-1514 (PO decision 2026-10-21, not yet delivered): the UI will say "country" instead of "market" everywhere; scenarios quoting "market" in UI texts change once it is delivered.
* GEO-1231 AC7 / GEO-1241: the first step depends on the unbranded flag (Brand & Country OFF, Analysis Type ON); Scenario 16 is run in both states.
* GEO-1247 AC3 / GEO-1234 AC3: with the flag ON the inline confirm is no longer gated; GEO-1234 AC3 is tested only with the flag OFF (Scenarios 35 and 193).
* GEO-1069 / GEO-1209 / GEO-1068: en-GB, fr-FR and es-ES texts of GEO-1069 are machine translations and the XLSX header translation of GEO-1068 is not stated (A4); Scenarios 203 and 205 check them against the validated strings.
* GEO-1184 / GEO-1245: Scenario 206 relies on Target Sources being reached through the Actions Center, which GEO-1245 hides in unbranded analyses; no AC states it for Target Sources.
* GEO-1002, GEO-1068, GEO-1069: stories are listed as "Story ID: TBD" in the epic text; mapping taken from epic-data.json.
* GEO-1002 / GEO-1209: epic numbers cited in the descriptions are inconsistent (EPIC-034/035/045/044 vs real EPIC-045/046/047/048); to report to the PO; this plan uses GEO keys only.

**Environment:** Staging — prerequisites: unbranded feature flag ON for GEO-1209 and the unbranded part of GEO-1068, plus one run with the flag OFF (GEO-1241 AC1b, GEO-1234 AC3); an organisation with a prompt pool set in the back office and back-office admin access (GEO-1230, GEO-1229 AC4, GEO-1240 AC3), plus an organisation at its pool for GEO-1239 AC9; production back office read-only access right after the 1.3 deploy and the review list geo-1515-1-organisations.csv (GEO-1515); a disposable QA analysis where Manage Scope saves are allowed; a Brandfetch-suggested brand and a custom brand, with a website that has a favicon only and one with no favicon (GEO-1069), and the Brandfetch brand-profile quota available on staging (GEO-1262 AC1); analyses created before the release for non-regression (GEO-1263 AC3 custom-brand baseline still to find, GEO-1266 AC3 Toyota baseline); a brand analysis with Target Sources data (Toyota) and dev support for the Firecrawl usage or logs (GEO-1534); daily analyses created early to obtain next-run and 7-collection data.

**Priority:** High

**Assignee:** Assiya.Benramdane (to confirm)

#### AC Coverage by Story

Result: **177 / 177 ACs covered** (GEO-1002 76/76, GEO-1069 17/17, GEO-1209 69/69, GEO-1068 11/11, GEO-1513 4/4). Every AC maps to at least one scenario. "Partial" = only the visible output is testable (see Open Points). GEO-1233 AC2 is counted as covered through GEO-1251 AC1. Scenarios 94 to 97 also trace to the GEO-1069 epic In scope rule, which has no story AC yet. Scenarios 185 to 187 trace to the GEO-1208 design decisions (D-1, D-2, D-6, D-7), not to an AC. GEO-1534 has no AC section; its expected result is counted as one AC.

**GEO-1229 — Share one prompt pool across all analyses**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One pool, no structural cap | 11, 196 | Yes |
| AC2 | One slot per market, unticked free | 12, 196 | Yes |
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
| AC7 | Wizard shell | 16, 190, 193 | Yes |

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
| AC3 | No inference, confirm gated | 35, 193 | Yes (flag OFF only; overridden by GEO-1247 AC3) |
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
| AC3 | Over the limit | 47, 48, 66, 197 | Yes |
| AC4 | System never removes a prompt | 49 | Yes |

**GEO-1237 — Review and create the analysis**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Scope and engines | 50, 190 | Yes |
| AC2 | Dropped scope and missing metrics | 51, 195 | Yes |
| AC3 | Engines allowed for the organisation | 52 | Yes (follows the Rules, AC text not updated) |
| AC4 | Engines are free | 53 | Yes |
| AC5 | Over the pool | 54, 195 | Yes |
| AC6 | Confirmation | 55, 190 | Yes |

**GEO-1238 — Leave the wizard**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Confirmation on Back to Dashboard | 56, 194 | Yes |
| AC2 | Cancel keeps everything | 57 | Yes |

**GEO-1239 — Manage prompts after launch**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Same table, filters and tracker | 58, 197 | Yes |
| AC2 | Suggested Prompts | 59 | Yes |
| AC3 | Edit wording from next run | 60 | Yes (needs a next run) |
| AC4 | Delete frees slot, keeps history | 61 | Yes |
| AC5 | Last prompt of a group can be deleted | 62 | Yes |
| AC6 | Version history | 63 | Yes (needs prompt changes over dates) |
| AC7 | Category or type change | 64 | Yes (needs a next run) |
| AC8 | Add a category or a market | 65 | Yes |
| AC9 | No free slot in the pool (new 2026-10-20) | 66, 197 | Yes |

**GEO-1240 — See the prompt pool on the GEO dashboard**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Pool block | 67 | Yes |
| AC2 | Exactly at the limit | 68 | Yes |
| AC3 | Over the limit | 69 | Yes (needs back-office access) |
| AC4 | Prompts column | 70, 196 | Yes |
| AC5 | Counts follow changes | 71 | Yes |

**GEO-1251 — Resolve competitors when no Visibility prompt is kept**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Competitors resolved in the background | 72 | Partial (backend only) |
| AC2 | Competitive prompts run without Visibility | 73 | Yes (1 to 3 names, templates have 3 slots) |
| AC3 | Visibility still wins | 74 | Partial (no-call not observable) |
| AC4 | Failed resolution never fails analysis | 75 | Partial (needs forced failure) |
| AC5 | Only Competitive prompts completes | 76 | Yes |

**GEO-1260 — Ask for the brand website when no suggestion is selected**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | No suggestion selected | 77, 191 | Yes |
| AC2 | No suggestion at all | 78 | Yes |
| AC3 | Left empty | 79 | Yes |
| AC4 | Suggestion selected | 80, 190 | Yes |
| AC5 | Placement and texts (new 2026-10-20) | 81 | Yes |
| AC6 | Unbranded (new 2026-10-20) | 82, 192 | Yes |
| AC7 | Website change resets categories (new 2026-10-20) | 83 | Yes (timing not stated) |

**GEO-1261 — Accept and normalize any reasonable URL input**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Any reasonable form (reworded 2026-10-20) | 84 | Yes |
| AC2 | Not a domain (reworded 2026-10-20) | 85 | Yes |
| AC3 | Stored | 86, 95, 96, 97 | Partial (verified through the logo and the domain uses after creation) |

**GEO-1262 — Retrieve and preview the logo from the provided domain**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Preview (reworded 2026-10-20) | 87, 191 | Yes (needs the Brandfetch quota available) |
| AC2 | Fallbacks (amended 2026-10-20) | 88, 204 | Yes |
| AC3 | Correction | 89 | Yes |
| AC4 | No website | 90 | Yes |

**GEO-1263 — Use the captured domain everywhere the brand appears**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Captured domain everywhere | 91, 94, 191, 201 | Yes |
| AC2 | No website: lettermark everywhere | 92, 94, 204 | Yes |
| AC3 | Older analyses unchanged | 93 | Yes (needs pre-release custom-brand baseline, B2) |

**GEO-1241 — Choose the analysis type**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Two cards, nothing selected | 98 | Yes |
| AC1b | Flag off, wizard unchanged | 99, 193 | Yes |
| AC2 | Selection enables continue and pill | 100, 190 | Yes |
| AC3 | Topic & Country step | 101, 192 | Yes |
| AC4 | Topic question and helper | 102 | Yes |
| AC5 | Empty topic | 103 | Yes |
| AC6 | Switching mode clears later steps | 104 | Yes |
| AC7 | Topic discovery screen | 105 | Yes |
| AC8 | Prompt types in unbranded | 106 | Yes |
| AC9 | 30 prompts per category and market | 107, 192 | Yes |
| AC10 | Type badges and selects | 108 | Yes |
| AC11 | Pool cost | 109, 196 | Yes |
| AC12 | Summary warning | 110, 195 | Yes |

**GEO-1242 — Run an analysis without a target brand**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Mode and topic stored, no target | 111, 192 | Yes |
| AC2 | No brand is the target | 112 | Partial (source classification input not observable) |
| AC3 | Topic split into 2 categories | 113 | Yes |
| AC4 | Production templates, [Competitor 4] | 114 | Yes |
| AC5 | Adaptation with the topic | 115 | Partial (prompt input not observable) |
| AC6 | 10 Category Topics prompts | 116 | Yes |
| AC7 | Category Topics run as written | 117 | Partial (system instruction not observable) |
| AC8 | Category Topics analysis | 118 | Partial (attached brands not displayed, thresholds not asserted) |
| AC9 | Competitive with too few competitors | 119, 213 | Yes |
| AC10 | Topic not editable | 120 | Yes |

**GEO-1243 — Show an Overview built for a topic**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Sidebar block | 121, 204 | Yes |
| AC2 | Hidden widgets | 122 | Yes |
| AC3 | InBrief about the topic | 123 | Yes |
| AC4 | Dedicated topic prompt | 124 | Partial (prompt input not observable) |
| AC5 | Format check | 125 | Yes (error state needs forced failure) |
| AC6 | Hidden or empty | 126 | Yes |
| AC7 | Top Topics | 127, 199 | Yes |
| AC8 | Neutral SOV ring | 128, 217 | Yes |
| AC9 | Landscape table | 129 | Yes |
| AC10 | Citation sources | 130, 216 | Yes |
| AC11 | Captions | 131 | Yes |
| AC12 | Analyses list | 132, 204 | Yes |

**GEO-1244 — Show the Category view and the prompts for a topic**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | No KPI cards | 133 | Yes |
| AC2 | Time Evolution and matrix | 134 | Yes |
| AC3 | Top 10 rule | 135 | Yes (needs 7 collections) |
| AC4 | Winner or Split | 136 | Yes |
| AC5 | Per collection | 137 | Yes |
| AC6 | Detail panel | 138 | Yes |
| AC7 | Category Topics label | 139, 216 | Yes |
| AC8 | Landscape title at category scope | 140 | Yes |

**GEO-1245 — Adapt the Actions Center, the export and the emails for a topic**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Actions Center hidden | 141, 206 | Yes |
| AC2 | Export | 142, 201, 202, 210 | Yes (no export frame) |
| AC3 | Analysis ready email | 143 | Yes (needs mailbox access) |

**GEO-1246 — Manage the prompts of an unbranded analysis**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Fresh suggestions per mode | 144, 197 | Yes |
| AC2 | Type select | 145, 197 | Yes |

**GEO-1247 — Classify prompts by question type with an Other fallback**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Type badges in a brand analysis | 146 | Yes |
| AC2 | Each missing dimension falls back alone | 147 | Yes |
| AC3 | Inline add never blocked | 148 | Yes |
| AC4 | Other in the column filters | 149 | Yes |
| AC5 | "Other" in an inline select | 150 | Yes |
| AC6 | Non-blocking table warning | 151 | Yes (validated banner text differs from the AC wording) |
| AC7 | Summary card | 152, 195 | Yes |
| AC8 | Manage Scope | 153, 197 | Yes |
| AC9 | Cost and output of an Other-type prompt | 154, 196 | Yes ("keyword graph" dropped, A18) |

**GEO-1248 — Show prompts in Other on the dashboard**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Sidebar entry | 155 | Yes |
| AC2 | Other category page | 156, 199 | Yes |
| AC3 | Other tab in a real category | 157 | Yes |
| AC4 | Visibility / Competitive in Other | 158 | Yes |
| AC5 | Competitive in Other runs as written | 159, 198 | Yes |
| AC6 | No cross-category extraction | 160 | Partial (verified through results only) |
| AC7 | Concepts extracted, excluded from KPIs | 161 | Yes |
| AC8 | Other-type prompt runs as written | 162 | Partial (extraction path not observable) |
| AC9 | Concepts feed InBrief and Top Concepts | 163 | Yes |
| AC10 | Classification takes effect next run | 164 | Yes (needs a next run) |
| AC11 | Export | 165, 201, 202 | Yes |
| AC12 | Sources tab and detail panel | 166 | Yes |

**GEO-1266 — Show only frequency and polarity on each concept**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Frequency and polarity only | 167, 199 | Yes |
| AC2 | Explicit label | 168, 199 | Yes |
| AC3 | Same concepts, same frequency | 169, 207 | Yes (baseline: Toyota exports of 2026-10-05) |

**GEO-1267 — Remove the score and barometer from the expanded concept view**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Frequency and polarity, no score | 170, 200 | Yes |
| AC2 | No barometer | 171, 200 | Yes |
| AC3 | Sources unchanged | 172, 200 | Yes |

**GEO-1268 — Keep sorting and filtering consistent with the simplified display**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Sort by polarity group | 173, 199 | Yes |
| AC2 | Filters unchanged | 174, 199 | Yes |
| AC3 | Distribution summary unchanged | 175 | Yes |

**GEO-1269 — Apply the simplified display everywhere concepts appear**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Slide export (incl. XLSX rule = epic 1.4 AC2) | 176, 201, 202, 203 | Yes |
| AC2 | Shared analysis (= epic 1.4 AC3, same organisation) | 177 | Yes |

**GEO-1184 — [Target Sources] Sort the cards by the number of prompts that use each source**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Most prompts: descending prompt count | 178, 179, 180, 182, 206 | Yes |
| AC2 | Card count equals the panel list | 181 | Yes |
| AC3 | Default sort and export unchanged | 183, 184 | Yes |

**GEO-1534 — [Target Sources] Firecrawl usage above the plan: the same pages are captured again every day**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| Expected | Verdict confirmed less than N days ago reused, no new capture | 188, 189, 206 | Partial (backend only; N pending PO; needs Firecrawl usage or logs) |
