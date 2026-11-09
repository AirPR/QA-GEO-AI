### QA Test Plan for GEO-1209 — Unbranded Analysis and Other Prompts

**Updated:** 2026-10-25 | **Source CSV:** testcases-coverage-epicGEO-1209.csv (97 TCs) | **Status:** Approved 2026-10-25

**Objective:** Verify the unbranded (topic) analysis behind its feature flag: the Analysis Type step and Topic & Country, prompt generation without a target brand (Visibility, Competitive with a fourth competitor, Category Topics), the topic Overview and Category view, the hidden Actions Center, the adapted exports and email, unbranded Manage Scope, and the Other fallback for prompts without a category or a type in the wizard, Manage Scope, the dashboard and the exports, in both analysis modes. The wizard step called "Review" in the ACs is shown as "Summary" (dev 866136). Cross-epic integration and non-regression checks are in the release plan TEST-PLAN-GEO-R1.3.

#### Test Scenarios & Detailed Test Cases

**Analysis Type Step (stories: GEO-1241)**

- Scenario 1: Two Analysis Type Cards - Verify that, with the unbranded flag ON, New Analysis opens Analysis Type with two cards, Brand analysis and Unbranded analysis, each saying what it measures with the copy validated and changed by the PO on 2026-10-21, and nothing selected.
- Scenario 2: Flag OFF, Wizard Unchanged - Verify that, with the unbranded flag OFF, New Analysis opens today's four-step wizard starting at Brand & Country, with no Analysis Type step and no mode pill.
- Scenario 3: Selection Enables Continue and the Pill - Verify that selecting a card enables the primary action and shows the mode pill "Brand analysis" or "Unbranded analysis" in the product bar.
- Scenario 4: Topic & Country Step - Verify that after selecting Unbranded analysis, Brand & Country is labelled Topic & Country and asks for an industry or topic instead of a brand, with no brand search, logo or website field.
- Scenario 5: Topic Question and Helper - Verify that Topic & Country asks "What industry or topic are you analyzing?" with the helper "The topic frames the analysis and is never measured. We measure the brands AI engines name."
- Scenario 6: Empty Topic Error - Verify that continuing with an empty topic shows a red border and the message "Add your industry or topic to continue."
- Scenario 7: Switching the Mode Clears the Later Steps - Verify that going back to Analysis Type and switching the mode opens a confirmation reading "Switching the mode clears your brand or topic, your countries, your categories and your prompts.", and that confirming clears them while cancelling keeps everything.
- Scenario 8: Topic Discovery Screen - Verify that continuing from a valid Topic & Country shows the category discovery screen on the brand layout with the topic texts "Scanning how AI engines see {topic} across your countries." and "This usually takes about 20 seconds. We look at your topic, your countries and their languages."
- Scenario 9: Unbranded Prompt Types - Verify that an unbranded analysis generates no Brand Image prompts, that Reputation becomes Category Topics, and that Competitive takes a fourth auto-resolved competitor in the brand's place.
- Scenario 10: Thirty Prompts per Category and Market - Verify that each category in each market gets 30 prompts (Visibility, Competitive and Category Topics), so that 2 markets with 3 categories give 180 prompts.
- Scenario 11: Unbranded Type Badges and Selects - Verify that type badges and type selects of an unbranded analysis show only Visibility, Competitive, Category Topics or Other.
- Scenario 12: Unbranded Pool Cost - Verify that each kept prompt of an unbranded analysis costs one slot per market, as in a brand analysis.
- Scenario 13: Summary Warning for InBrief and Top Topics - Verify that an unbranded analysis with no kept Category Topics prompt and no kept prompt in Other gets a Summary warning naming InBrief and Top Topics as metrics it will not produce.

**Unbranded Analysis Run (stories: GEO-1242)**

- Scenario 14: Mode and Topic Stored, No Target - Verify that a created unbranded analysis keeps its mode and topic with no target brand, and that the topic is its name in the dashboard, emails and exports.
- Scenario 15: No Brand Is the Target - Verify that no brand of an unbranded analysis is scored, highlighted, starred or protected as the target, and that every brand named by the answers is measured the same way.
- Scenario 16: Topic Split Into Two Categories - Verify that category discovery splits the topic into 2 consumer search areas (e.g. "postal services" into "parcel delivery" and "international shipping"), with no brand website.
- Scenario 17: Production Templates With Competitor 4 - Verify that Visibility prompts use the 10 production templates with {category} only and that Competitive prompts use the 10 production templates with [Competitor 4] in the {entity} slot, comparing the top 4 brands of that category and market.
- Scenario 18: Topic-Based Adaptation - Verify that prompts adapted and translated for each market are built around the topic and are not required to contain the topic word.
- Scenario 19: Ten Category Topics Prompts - Verify that each category gets the 10 Category Topics prompts, one per theme, from "What should I look for in {category}?" to "What are the main controversies in {category}?".
- Scenario 20: Category Topics Run as Written - Verify that Category Topics prompts are sent exactly as written, like prompts with the Other type, and that their answers are not framed around a brand.
- Scenario 21: Category Topics Analysis - Verify that each Category Topics answer yields the topics raised with a sentiment for the category as a whole, up to 12 topics per category with the production thresholds kept, and no brand tags displayed.
- Scenario 22: Competitive With Too Few Competitors - Verify that in an unbranded analysis a Competitive prompt outside Other is not sent and has no row in the prompts table when fewer than 2 competitors were extracted for its category and market, while a brand analysis still sends it with the empty slots removed.
- Scenario 23: Topic Not Editable - Verify that the topic of an unbranded analysis cannot be changed in Manage Scope, as the brand today.

**Unbranded Overview (stories: GEO-1243)**

- Scenario 24: Sidebar Topic Block - Verify that the sidebar block of an unbranded analysis shows the topic's first letter in the logo slot and the topic, with no extra header, mode label or date.
- Scenario 25: Hidden Brand Widgets - Verify that the unbranded Overview does not show the scope bar, KPI cards and deltas, Time Evolution, Category Prioritization, Corporate Reputation, Brand Territory or the Brand Image hint.
- Scenario 26: InBrief About the Topic - Verify that InBrief shows 3 bullets about what the answers say on the topic, built from Category Topics and Other-type answers, possibly naming brands attached to a topic, with "Category summary generated by artificial intelligence".
- Scenario 27: Dedicated Topic InBrief - Verify that the unbranded InBrief is a topic summary (not the brand Perception summary) whose bullets reflect the Category Topics and Other concepts of the Overview or the category and say why a topic comes up.
- Scenario 28: InBrief Format Check - Verify that InBrief bullets are 3 bullets of 150 characters max with no brand-name check, and that the widget shows its error state after the last failed attempt.
- Scenario 29: InBrief and Top Topics Hidden or Empty - Verify that InBrief and Top Topics are hidden for an analysis or category with no Category Topics and no Other prompts, and show an empty state when such prompts exist but returned no topic.
- Scenario 30: Top Topics in the Category - Verify that Top Concepts is titled "Top Topics in the Category" and that each topic describes the category, never names a brand, and shows its sentiment towards the category and its frequency, with no brand tags.
- Scenario 31: Neutral SOV Ring - Verify that the Share of Voice ring keeps the brand analysis calculation with no enlarged slice, no centre value and the subtitle "How the answers split across entities".
- Scenario 32: Topic Landscape Table - Verify that the rankings table is titled "{topic} landscape" with no highlighted row and tooltips without "your brand".
- Scenario 33: Unbranded Citation Sources - Verify that AI Citation Sources has a subtitle referring to the topic, no Owned Media or Competitor Media in its legend, no Favorability column, and a "Category Topics" tab in the related prompts modal listing every Category Topics prompt that cites the source, whatever its sentiment. *(corrected)*
- Scenario 34: Neutral Captions - Verify that every widget caption of the unbranded analysis describes the widget and never reminds the user that no brand is set.
- Scenario 35: Brand / Topic Column in the Analyses List - Verify that the analyses list shows a "Brand / Topic" column with the topic and its first letter and no domain for an unbranded analysis, and that the Competitors card also counts the brands detected in unbranded analyses.

**Unbranded Category View and Prompts (stories: GEO-1244)**

- Scenario 36: No KPI Cards at Category Scope - Verify that an unbranded Category view has no KPI cards and that InBrief, Top Topics, the SOV ring and rankings follow the Overview rules at category scope.
- Scenario 37: Time Evolution and Top 5 Matrix - Verify that Time Evolution shows the top 10 brands with no highlighted line and no Sentiment tab, and that Brand Prioritization plots the top 5 brands by SOV with no target dot.
- Scenario 38: Time Evolution Top 10 Rule - Verify that Time Evolution picks the top 10 brands by SOV in the latest collection of the selected window with the market and LLM filters applied, follows filter changes, and still needs 7 collections in the window.
- Scenario 39: Winner or Split - Verify that each prompt row shows the brand (not the product) ranked first when every engine ranks the same brand family first, including with a single engine selected, and "Split" otherwise (including 2 engines on A and 1 on B, or an engine with an empty ranking), with no favourability filters or count. *(corrected)*
- Scenario 40: Winner per Collection - Verify that the winner is computed per collection (the latest or the selected one), not over the date range.
- Scenario 41: Prompt Detail Panel Without Target - Verify that the prompt detail panel shows the full ranking and the brand chosen per engine, with no target brand block.
- Scenario 42: Category Topics Label - Verify that the prompts table tabs and the detail panel label Category Topics prompts "Category Topics", never "Perception", and that the topics list is announced as "Category Topics" to screen readers. *(corrected)*
- Scenario 43: Category Landscape Title - Verify that the rankings table at category scope is titled "{category} landscape".

**Unbranded Actions Center, Export and Email (stories: GEO-1245)**

- Scenario 44: Actions Center Hidden - Verify that the sidebar of an unbranded analysis hides the Actions Center entry and that opening the Actions Center URL directly shows the dashboard.
- Scenario 45: Unbranded Export - Verify that the XLSX and PowerPoint / PDF exports use the topic on the cover and in titles, give each category section its "{category} landscape" slide, skip dropped sheets and slides, have no Favorability column in Raw Data, never say "your brand", and put no target marker on any brand. *(corrected)*
- Scenario 46: Analysis Ready Email - Verify that the analysis ready email of an unbranded analysis uses the topic as the analysis name in its subject and body.

**Unbranded Manage Scope (stories: GEO-1246)**

- Scenario 47: Unbranded Fresh Suggestions - Verify that adding a category or a market to an unbranded analysis in Manage Scope brings 10 Visibility, 10 Competitive and 10 Category Topics suggestions per market, with no Reputation or Brand Image, and with the category name translated in the language of the new market in every prompt. *(corrected)*
- Scenario 48: Unbranded Type Select - Verify that adding or editing a prompt of an unbranded analysis in Manage Scope offers only Visibility, Competitive, Category Topics and Other in the type select.

**Other Fallback Classification (stories: GEO-1247)**

- Scenario 49: Brand Analysis Type Badges With Other - Verify that, with the flag ON, the type badges of a brand analysis show Visibility, Competitive, Reputation, Brand Image or Other.
- Scenario 50: Each Missing Dimension Falls Back Alone - Verify that a prompt saved without a category, without a type, or without both, is Other on that dimension only.
- Scenario 51: Inline Add Never Blocked - Verify that confirming an inline prompt with its category or type empty is accepted and the empty dimension falls back to Other (overrides GEO-1234 AC3 with the flag ON).
- Scenario 52: Other in the Column Filters - Verify that the Category and Type column filters list Other as a value of its own with its live count.
- Scenario 53: Other Inline Select and Warning Tint - Verify that the missing dimension of a prompt in Other reads "Other" in an inline select (ticked or not) in the wizard and Manage Scope, that a kept row is on the warning tint, and that picking a value removes the tint and updates the counts.
- Scenario 54: Non-Blocking Other Warning - Verify that kept prompts in Other trigger the table banner "{n} prompts are in Other." / "Pick a category and a type. Anything left as Other still runs, but it returns key concepts only, no metrics.", without blocking the launch.
- Scenario 55: Summary Other Card - Verify that Summary shows a card titled with "Other" (never "Unclassified" or "uncategorised") listing each kept Other prompt with its market and an inline select for the missing value, stating it returns key concepts only until classified, never blocking launch, and hidden when there is none.
- Scenario 56: Other Prompts in Manage Scope - Verify that Other prompts show on inline selects in the Prompts section of Manage Scope.
- Scenario 57: Other-Type Prompt Cost and Output - Verify that a prompt that is Other on its type consumes a full slot per market and returns key concepts only. *(corrected)*

**Other on the Dashboard (stories: GEO-1248)**

- Scenario 58: Other Sidebar Entry - Verify that the sidebar shows a last "Other" category when at least one kept prompt has no category, and hides it when there is none.
- Scenario 59: Other Category Page - Verify that the Other category page shows the key concepts of its prompts and the prompts table, with no KPI cards, SOV, Time Evolution, prioritization or rankings.
- Scenario 60: Other Tab in a Real Category - Verify that a real category with Other-type prompts shows an "Other" tab with its count after the type tabs, hidden at 0, whose rows show their key concepts in Winner / Themes.
- Scenario 61: Visibility and Competitive in the Other Category - Verify that a Visibility or Competitive prompt in the Other category is ranked and shows the brand ranked first or "Split", and feeds no KPI, SOV, rankings or Time Evolution.
- Scenario 62: Competitive in Other Runs as Written - Verify that a Competitive prompt in the Other category runs as the user wrote it, with hand-typed unfilled placeholders removed as in production, the sent wording being shown in the Prompts Analysis table and its detail panel. *(corrected)*
- Scenario 63: No Cross-Category Extraction - Verify that competitors named in Visibility answers of the Other category never appear in another category's competitive results.
- Scenario 64: Concepts Extracted, Excluded From KPIs - Verify that Other-type prompts produce key concepts that are excluded from KPIs and SOV, while Visibility and Competitive prompts in the Other category are ranked only and produce no concepts.
- Scenario 65: Other-Type Concepts Follow the Mode - Verify that the concepts of an Other-type prompt are about the brand with sentiment towards the brand in a brand analysis, and are topics with sentiment towards the category in an unbranded analysis.
- Scenario 66: Other Concepts Feed InBrief and Top Concepts - Verify in both modes that an Other-type prompt feeds InBrief and Top Concepts / Top Topics of its category and the Overview, and that a prompt in the Other category feeds the Overview and the Other category page.
- Scenario 67: Classification Takes Effect Next Run - Verify that an Other prompt classified in Manage Scope moves to its category and type at the next collection and feeds their metrics, while past collections stay where they were collected.
- Scenario 68: Other Section in Export - Verify that exports include the Other section, limited to key concepts.
- Scenario 69: Other Sources Tab and Detail Panel - Verify that the Other category page has the Sources tab of a category page and that a prompt opens the "Other Details" panel with sentiment per engine, themes, response and sources.

#### Edge Cases & Boundary Conditions

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

#### Open Points (not blocking)

* GEO-1209 PO questions posted on 2026-10-22 (comment 866762), context added on 2026-10-26 (867843), no answer yet: should Summary show the topic of an unbranded analysis (Scenario 14); what the Competitors card of the GEO dashboard counts (Scenario 35); how a tie for the 5th place of the top 5 matrix is broken (Scenario 37). The unbranded InBrief error keeps the generic wording (PO 867725).
* GEO-1209 (dev 867241): the Share of Voice legend rule ("Others" takes the rounding gap) awaits the PO confirmation, two alternatives offered; it also applies to brand analyses.
* GEO-1209 (dev 867190): the quadrant card wording "High visibility, Low AI Choice", the "AI Choice" tooltip and the XLSX "Quadrant" column, whose values differ from older exports, await the PO confirmation; brand analyses are affected too.
* GEO-1247 AC6: the AC still reads "classifying them improves measurement accuracy", while the PO validated the shipped banner text used in Scenario 54; AC update requested from the PO.
* GEO-1247 AC9 (A18): the "keyword graph" does not exist and will not be built in 1.3 (PO 859152); Scenario 57 drops it; AC text not yet updated.
* GEO-1243 AC6 / AC10 (A11, A12): the empty-state and AI Citation Sources subtitle texts were validated as shipped but are not quoted in Jira; Scenarios 29 and 33 check meaning, not exact text.
* GEO-1209 (still open): display of the 4 Competitive placeholders in the prompts tables (A5); QUESTION_ADAPTATION of EN Category Topics prompts (A9); pool slot of a Competitive prompt not sent (A10); export formats holding the Other section (A21). A1, A3 and A6 were accepted as current behaviour on 2026-10-22; A16, A18 and A20 are answered.
* GEO-1209: Figma frames are pending updates by the designer (1.1 to 1.3, 2.4, 7.2, U.1 to U.3, 0.1, 4.3, 4.8, 5.1 to 5.3, 7.4, 7.5); the ACs are the reference.
* GEO-1243 AC4 (A14): InBrief input capped at the 25 most frequent topics; asked to the dev on 2026-10-22 (comment 866797), not checkable in the UI (needs an analysis with more than 25 topics and log or API access).
* GEO-1245 (A17): no export frame yet (GEO-1185 "PowerPoint export" still to come); default expectation is today's layouts with dropped slides skipped and topic titles; PDF scope not stated.
* GEO-1243 AC12 (A13): the "Brand / Topic" header and neutral subtitle show only when the list holds an unbranded analysis; PM to confirm whether they should always show.
* GEO-1248: GEO-1186 text is stale (excludes Other from Top Concepts, mentions a "classify in Manage Scope" hint); GEO-1248 AC9 is tested.
* GEO-1244 AC5 (A16): the prompts table reads one collection (the latest by default) and does not follow the date picker (QA decision 2026-10-22, by design); Scenario 40.
* GEO-1242 AC9: the 2-or-3-competitor cleaning (Scenario 22) needs a Competitive prompt with fewer than 3 competitors, i.e. a niche scope with few brands (test data).
* GEO-1242 AC2 (source classification receives the topic), AC5 (QUESTION_ADAPTATION input and dropped rule), AC7 (no Perception system instruction) and AC8 (extraction path, attached brands): only their visible output is testable (Scenarios 15, 18, 20 and 21); the internal inputs need log or API access.
* GEO-1243 AC4 (InBrief prompt input) and GEO-1248 AC6 / AC8 (extraction per market and category, Gemini extraction path): only the visible output is testable (Scenarios 27, 63 and 65).
* GEO-1248 AC10 and GEO-1244 AC3: need one or more new collections (7 for Time Evolution) after the change; plan them on daily analyses created early in the cycle.
* GEO-1209 test data still missing: unbranded analysis with GB (EN) + FR (FR) and 2 or more categories, a prompt Other on one dimension only, a brand analysis with an Other prompt, 3 engines, an engine returning an empty ranking, the QA mailbox for the analysis ready email (Scenario 46).

**Environment:** Staging — unbranded feature flag ON, plus one run with the flag OFF (GEO-1241 AC1b); an unbranded analysis with GB (EN) + FR (FR) and 2 or more categories; a brand analysis with an Other prompt; 3 engines; daily analyses created early for next-run and 7-collection data; the QA mailbox for the analysis ready email.

**Priority:** High

**Assignee:** Assiya.Benramdane (to confirm)

#### AC Coverage by Story

Result: **69 / 69 ACs covered** (GEO-1241 13/13, GEO-1242 10/10, GEO-1243 12/12, GEO-1244 8/8, GEO-1245 3/3, GEO-1246 2/2, GEO-1247 9/9, GEO-1248 12/12). Every AC maps to at least one scenario. "Partial" = only the visible output is testable (see Open Points).

**GEO-1241 — Choose the analysis type**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Two cards, nothing selected | 1 | Yes |
| AC1b | Flag off, wizard unchanged | 2 | Yes |
| AC2 | Selection enables continue and pill | 3 | Yes |
| AC3 | Topic & Country step | 4 | Yes |
| AC4 | Topic question and helper | 5 | Yes |
| AC5 | Empty topic | 6 | Yes |
| AC6 | Switching mode clears later steps | 7 | Yes |
| AC7 | Topic discovery screen | 8 | Yes |
| AC8 | Prompt types in unbranded | 9 | Yes |
| AC9 | 30 prompts per category and market | 10 | Yes |
| AC10 | Type badges and selects | 11 | Yes |
| AC11 | Pool cost | 12 | Yes |
| AC12 | Summary warning | 13 | Yes |

**GEO-1242 — Run an analysis without a target brand**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Mode and topic stored, no target | 14 | Yes |
| AC2 | No brand is the target | 15 | Partial (source classification input not observable) |
| AC3 | Topic split into 2 categories | 16 | Yes |
| AC4 | Production templates, [Competitor 4] | 17 | Yes |
| AC5 | Adaptation with the topic | 18 | Partial (prompt input not observable) |
| AC6 | 10 Category Topics prompts | 19 | Yes |
| AC7 | Category Topics run as written | 20 | Partial (system instruction not observable) |
| AC8 | Category Topics analysis | 21 | Partial (attached brands not displayed, thresholds not asserted) |
| AC9 | Competitive with too few competitors | 22 | Yes |
| AC10 | Topic not editable | 23 | Yes |

**GEO-1243 — Show an Overview built for a topic**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Sidebar block | 24 | Yes |
| AC2 | Hidden widgets | 25 | Yes |
| AC3 | InBrief about the topic | 26 | Yes |
| AC4 | Dedicated topic prompt | 27 | Partial (prompt input not observable) |
| AC5 | Format check | 28 | Yes (error state needs forced failure) |
| AC6 | Hidden or empty | 29 | Yes |
| AC7 | Top Topics | 30 | Yes |
| AC8 | Neutral SOV ring | 31 | Yes |
| AC9 | Landscape table | 32 | Yes |
| AC10 | Citation sources | 33 | Yes |
| AC11 | Captions | 34 | Yes |
| AC12 | Analyses list | 35 | Yes |

**GEO-1244 — Show the Category view and the prompts for a topic**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | No KPI cards | 36 | Yes |
| AC2 | Time Evolution and matrix | 37 | Yes |
| AC3 | Top 10 rule | 38 | Yes (needs 7 collections) |
| AC4 | Winner or Split | 39 | Yes |
| AC5 | Per collection | 40 | Yes |
| AC6 | Detail panel | 41 | Yes |
| AC7 | Category Topics label | 42 | Yes |
| AC8 | Landscape title at category scope | 43 | Yes |

**GEO-1245 — Adapt the Actions Center, the export and the emails for a topic**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Actions Center hidden | 44 | Yes |
| AC2 | Export | 45 | Yes (no export frame) |
| AC3 | Analysis ready email | 46 | Yes (needs mailbox access) |

**GEO-1246 — Manage the prompts of an unbranded analysis**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Fresh suggestions per mode | 47 | Yes |
| AC2 | Type select | 48 | Yes |

**GEO-1247 — Classify prompts by question type with an Other fallback**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Type badges in a brand analysis | 49 | Yes |
| AC2 | Each missing dimension falls back alone | 50 | Yes |
| AC3 | Inline add never blocked | 51 | Yes |
| AC4 | Other in the column filters | 52 | Yes |
| AC5 | "Other" in an inline select | 53 | Yes |
| AC6 | Non-blocking table warning | 54 | Yes (validated banner text differs from the AC wording) |
| AC7 | Summary card | 55 | Yes |
| AC8 | Manage Scope | 56 | Yes |
| AC9 | Cost and output of an Other-type prompt | 57 | Yes ("keyword graph" dropped, A18) |

**GEO-1248 — Show prompts in Other on the dashboard**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Sidebar entry | 58 | Yes |
| AC2 | Other category page | 59 | Yes |
| AC3 | Other tab in a real category | 60 | Yes |
| AC4 | Visibility / Competitive in Other | 61 | Yes |
| AC5 | Competitive in Other runs as written | 62 | Yes |
| AC6 | No cross-category extraction | 63 | Partial (verified through results only) |
| AC7 | Concepts extracted, excluded from KPIs | 64 | Yes |
| AC8 | Other-type prompt runs as written | 65 | Partial (extraction path not observable) |
| AC9 | Concepts feed InBrief and Top Concepts | 66 | Yes |
| AC10 | Classification takes effect next run | 67 | Yes (needs a next run) |
| AC11 | Export | 68 | Yes |
| AC12 | Sources tab and detail panel | 69 | Yes |