### QA Test Plan for GEO-152 — Actions Center — Target Sources

**Updated:** 2026-10-12 | **Previous version:** GEO-1110 (2026-09-21) | **Source CSV:** testcases-coverage-epicGEO-152.csv (221 TCs)

**Objective:** Verify the Actions Center Target Sources funnel (top 100 domain source pool, page verification and negative passages), the ranked list with its split reason counts, the verdict tabs, the category and type filters, the details panel (reason tabs, associated prompts, Previous/Next navigation), the verifying and all-clear states, the analysis export (Excel, PPT, PDF), the two AI Citation Sources changes (Favorability removal and Related Prompts), and the localisation of the new copy in en-US, en-GB, fr-FR and es-ES.

#### Test Scenarios & Detailed Test Cases

**Source Pool Selection (stories: GEO-1116 & GEO-1169)**

- Scenario 1: Top-X Domain Pool - Verify that every listed target source belongs to the top 100 domains of the snapshot ranked by the AI Citation Sources Frequency (unique URLs, all markets, engines and question types). *(new)*
- Scenario 2: Non-Gap Sources Eligible - Verify that a source cited only in answers where the brand is visible, first and positive can appear in Target Sources when it has at least one missing or negative article. *(new)*
- Scenario 3: Owned and Competitor Domain Exclusion - Verify that brand-family domains (any country TLD) and competitor domains never appear in Target Sources, while a brand subdomain on a third-party media site stays eligible.
- Scenario 4: Model-Declared URL Exclusion - Verify that a URL the model wrote from memory rather than opened during web search never appears as an article of any target source.
- Scenario 5: Articles Recorded per Source - Verify that each target source carries the specific cited articles it was selected on, each identifiable by title and URL in the details panel.

**Article Verification and Passages (stories: GEO-1117 & GEO-1183)**

- Scenario 6: Brand Family Detection - Verify that an article naming the parent brand, a brand variation or a brand product (including a product never seen in an LLM answer) is never listed under "Lack of visibility".
- Scenario 7: Negative Depiction Rule - Verify that only articles stating or implying a criticism, failure, risk or harm attributable to the brand or its products, including factual unfavourable news, are listed under "Negative perception".
- Scenario 8: False Positives Excluded - Verify that an article naming the brand neutrally or positively contributes nothing to the article counts, the ranking or the badges of its source.
- Scenario 9: Unfetchable and Unchecked Articles - Verify that an article that could not be fetched or whose check could not complete contributes nothing to any count or rank and is not listed under either article tab.
- Scenario 10: Zero-Article Source Eliminated - Verify that a source with no missing or negative article after verification does not appear in Target Sources.
- Scenario 11: Passage Verbatim and Length - Verify that every negative passage is verbatim from the page (no rewording, no case change) and never exceeds 140 characters including spaces.
- Scenario 12: Passage Contains Brand Name - Verify that every negative passage contains the matched brand or product name, highlighted in the panel (e.g. "Tesla" or "Cybertruck" on the caranddriver.com article of the Tesla analysis). *(new)*
- Scenario 13: Ellipsis Join - Verify that a supporting sentence longer than 140 characters is shortened by joining the name part and the criticism part with "…". *(new)*

**Ranked Target Sources List (stories: GEO-1118 & GEO-1168)**

- Scenario 14: Page Title and Subtitle - Verify that the Actions Center opens on "Target Sources" with the subtitle "Sources to target to improve how AI engines represent your brand, sorted by the number of articles where your brand is missing or negatively represented". *(corrected)*
- Scenario 15: Default Ranking - Verify that sources are ordered by total article count (missing + negative) descending, with ties broken by number of reason badges.
- Scenario 16: Card and List Views - Verify that a card view and a table view are switchable by an explicit control and show the same fixed order with no user-triggered re-sorting.
- Scenario 17: Card Content - Verify that each card shows rank, logo and domain, source type, applicable badges and one reason line per applicable reason ("Not visible in N articles" / "Negative perception in N articles"), with no "Cited" line. *(corrected)*
- Scenario 18: Table Columns - Verify that the table shows only #, Source, Type and Articles, with a blue eye-off chip for missing and a purple thumb-down chip for negative, a chip omitted when its count is 0, and no Cited or Action column. *(corrected)*
- Scenario 19: Count Consistency - Verify that for a given source the card lines, table chips and panel tab counts are identical and that missing + negative equals the total used for ranking. *(new)*
- Scenario 20: Badge Origin Rule - Verify that "Improve visibility" appears when at least one article does not name the brand and "Improve perception" when at least one names it negatively, never derived from an answer outcome.
- Scenario 21: Two Badges per Surface - Verify that a source with both verdicts shows both badges and both reason lines, stacked on the card and inline in the details panel header.
- Scenario 22: Logo and Placeholder - Verify that the domain logo is shown next to the source name on the card, the table row and the details panel, with a neutral placeholder when no logo is returned.
- Scenario 23: Card Show More - Verify that with 12 sources or fewer all cards show without a button, and with more than 12 a "Show X more sources" button shows X = total - 12. *(corrected)*
- Scenario 24: Table Show More - Verify that the table shows 10 rows before a "Show X more sources" button. *(new)*

**Verdict Tabs (stories: GEO-1118)**

- Scenario 25: Three Verdict Tabs - Verify that "All", "Improve visibility" and "Improve perception" tabs scope the list, with "All" selected by default.
- Scenario 26: Verdict Tab Ranking - Verify that a verdict tab orders sources by the article count of that verdict alone.
- Scenario 27: Verdict Tab Membership - Verify that a source with no article of the selected verdict does not appear in that verdict tab.
- Scenario 28: Stable Badges Across Tabs - Verify that the badges of a listed source are identical in a verdict tab and in the "All" tab.
- Scenario 29: Empty Verdict Tab - Verify that a tab holding no source states that no source carries that verdict in the current scope and the other tabs stay reachable.

**Filters and Scope (stories: GEO-1120 & GEO-1168)**

- Scenario 30: Recompute Within Scope - Verify that applying a country, category, AI engine, date range or type filter recomputes counts, badges and order inside the selected scope rather than filtering the global list.
- Scenario 31: Ranks Renumbered - Verify that after any filter the displayed ranks are renumbered 1…N with no gaps.
- Scenario 32: Type Filter Content - Verify that the type filter lists only the source types present in the current scope with their source count, defaults to "All types", is single-select and has no leading icon. *(corrected)*
- Scenario 33: Type Filter Re-scope - Verify that selecting a source type keeps only sources of that type and recomputes ranks, counts and tab membership inside that selection.
- Scenario 34: Type Filter Label Truncation - Verify that the type filter input stays at 200 px with an ellipsis on a long label, the dropdown widens to the widest option, and the full name shows on hover.
- Scenario 35: Category Filter Content - Verify that a Category dropdown next to the type filter lists the analysis categories in left-menu order, defaults to "All categories" and is single-select. *(new)*
- Scenario 36: Category Filter Re-scope - Verify that selecting a category keeps only sources with at least one missing or negative article in answers of that category and recalculates their counts. *(new)*
- Scenario 37: Date Range Membership - Verify that an article counts only if at least one of its qualifying answers falls inside the effective date window.
- Scenario 38: Multi-Scope Articles - Verify that an article whose answers span several markets or engines counts in a selected scope only if at least one of its answers belongs to it.
- Scenario 39: Empty Sources Disappear - Verify that a source with no missing or negative article in the selected scope does not appear in the filtered list.
- Scenario 40: Filters Then Tab - Verify that category, type and page tabs combine, with filters defining the scope first and the tab selecting the verdict inside it, and the filtered empty state showing when nothing matches.
- Scenario 41: Seven-Day Source Window - Verify that the Actions Center pools sources over at least 7 days ending on the latest snapshot, uses a longer range in full, and that AI Citation Sources keeps the selected range.

**Verification Progress and All-Clear State (stories: GEO-1119 & GEO-1121 & GEO-1168)**

- Scenario 42: Verifying State - Verify that while verification runs the view shows the verifying title and spinner only, with no progress counter, no explanatory paragraph and no partial list. *(corrected)*
- Scenario 43: Auto-Transition on Completion - Verify that the target list becomes available without a full page reload when verification completes.
- Scenario 44: All-Clear Message - Verify that when no source survives verification the view shows "All clear" and "Every article used by AI engines describes your brand positively." instead of an empty list. *(corrected)*
- Scenario 45: All-Clear Alone - Verify that the all-clear state shows the message alone with no source list under it.

**Scope Changes (stories: GEO-1122)**

- Scenario 46: Scope Change on Next Execution - Verify that a Manage Scope change (country, topic, AI engine or question) takes effect on the next scheduled execution, which produces a new snapshot.
- Scenario 47: Full Scope After Run - Verify that once the execution completes the target list covers the full scope of the run, including the added scope, ranked under the same rules.

**Details Panel — Articles (stories: GEO-1123 & GEO-1168 & GEO-1178)**

- Scenario 48: Panel Open and Close - Verify that selecting a card opens the details panel beside the list and selecting the same card again closes it.
- Scenario 49: Panel Ignores Page Tab - Verify that a source opened from a verdict tab shows its articles of both verdicts in the panel.
- Scenario 50: Single-Reason Tab - Verify that a source with only missing (or only negative) articles shows only the "Lack of visibility (N)" (or "Negative perception (N)") tab with its explanation line. *(new)*
- Scenario 51: Both-Reason Tabs - Verify that a source with both reasons shows both tabs, "Lack of visibility" first and selected by default, and that switching tab does not change the prompts section. *(new)*
- Scenario 52: Tab Counts - Verify that each tab count matches the number of article rows in the tab and the card line of the source. *(new)*
- Scenario 53: Tab Explanation Line - Verify that each tab shows one explanation line with the analysis brand name ("None of these articles mentions {brand} anywhere on the page." / "Each of these articles mentions {brand} negatively.") instead of a per-article verdict line. *(new)*
- Scenario 54: Article Rows - Verify that each article shows its title, URL and citing engine icons, and negative articles also show their passage with the brand name highlighted.
- Scenario 55: Removed Panel Elements - Verify that the panel shows no positive article, no Key Takeaways (In-Brief) block and no header meta line (failing / positive / cited counts). *(new)*

**Details Panel — Prompts Associated With This Source (stories: GEO-1178 & GEO-1169 & GEO-1123)**

- Scenario 56: Prompts Section Placement - Verify that the "Prompts associated with this source" section sits below the articles, separated by a divider. *(corrected)*
- Scenario 57: All Citing Prompts - Verify that the section lists every prompt whose answer cites the source in the current scope, not only failing prompts. *(new)*
- Scenario 58: One Row per Prompt - Verify that each prompt appears once with its text, market flag and one icon per citing engine, and that no outcome is shown. *(corrected)*
- Scenario 59: Engine Filter - Verify that an engine filter shows "All" by default plus one tab per engine with its prompt count (icon and name with 2 or 3 engines, icon and count only beyond), and selecting a tab keeps only that engine's prompts. *(new)*
- Scenario 60: Engine Tabs Follow Scope - Verify that the engine tabs list only the engines selected in the page AI Engines filter. *(new)*
- Scenario 61: Show More Prompts - Verify that the list shows 6 prompts before a "Show X more prompts" button whose X is recalculated per engine tab. *(new)*

**Panel Navigation (stories: GEO-1166)**

- Scenario 62: Sticky Footer - Verify that the footer with "Previous", "Source N of M" and "Next source" stays visible at every panel scroll position. *(new)*
- Scenario 63: In-Place Source Swap - Verify that Previous / Next swaps the panel content in place, syncs the selected card or row behind the panel, and rebuilds the article tabs and engine filter for the new source. *(new)*
- Scenario 64: Counter Within Filtered Scope - Verify that the counter shows the position within the current filtered and tabbed list, not the global rank. *(new)*
- Scenario 65: First and Last Boundaries - Verify that "Previous" is disabled on the first source and "Next source" on the last, with no wrap-around. *(new)*
- Scenario 66: Card and List View Navigation - Verify that panel navigation works from both the card view and the list view. *(new)*

**Analysis Export (stories: GEO-1124 & GEO-1168 & GEO-1173 & GEO-1178)**

- Scenario 67: Export Uses All Tab - Verify that the PPT, PDF and Excel Target Sources section is built from the "All" tab whatever tab and view the user is on.
- Scenario 68: Export Scope Recompute - Verify that counts, badges and order in the exported section are recomputed inside the export markets, AI engines and date range.
- Scenario 69: Export Ignores Category and Type Filters - Verify that the exported section always covers all categories and source types whatever on-screen category and type filters are active.
- Scenario 70: Excel Four Stacked Tables - Verify that the Excel Target Sources tab holds the Ranked sources, Failing articles, Positive articles and Failing prompts tables in that order with the specified columns, an empty Passage for brand-absent articles, and no Verdict or Outcome column on blocks 3 and 4.
- Scenario 71: PPT and PDF Cards and Table - Verify that the deck top source cards use the split copy (e.g. "Not visible in 2 articles · Negative perception in 1 article") and the table uses the two-chip Articles column with no Cited column, following the capping convention of the other slides. *(corrected)*
- Scenario 72: Export All-Clear - Verify that the exported section carries the all-clear message alone when no source survives verification in the export scope.
- Scenario 73: Export Seven-Day Window - Verify that the exported Target Sources section pools at least 7 days while the AI Citation Sources section of the same export keeps the export range.
- Scenario 74: Action Center Last Slide - Verify that the Action Center section is the last slide of the PPT and PDF exports, matching the tab order of the app. *(new)*
- Scenario 75: Export Slide Header - Verify that the English PPT and PDF header reads "ACTION CENTER · TARGET SOURCES", French and Spanish keep "ACTIONS" and "ACCIONES", and no export shows "Actions Center" or "Actions Centre". *(new)*

**Remove Favorability from AI Citation Sources (stories: GEO-1125)**

- Scenario 76: Three Columns Only - Verify that the AI Citation Sources section and the "All domains" modal show Domain, Type and Frequency only, with no Favorability column.
- Scenario 77: No Favorability Sort - Verify that Favorability is not offered as a sort key in either table.
- Scenario 78: No Favorability Badge - Verify that no favorable, mixed or unfavorable badge is shown for a domain in the section, the modal or the source details panel.
- Scenario 79: Exports Three Columns - Verify that the XLSX and PPT AI Citation Sources domain table carries Domain, Type and Frequency only.
- Scenario 80: Lite Result Table - Verify that the Lite (PQL) result table carries no Favorability column.
- Scenario 81: Unchanged Surfaces - Verify that the Questions Analysis favourability filter, the question detail panel, the Corporate Reputation sheet and the Raw Data sheet are unchanged.

**Related Prompts in AI Citation Sources (stories: GEO-1126)**

- Scenario 82: Panel Structure - Verify that the domain details panel shows "Related Prompts" first and "Cited URLs" second, with no per-engine citation-count block.
- Scenario 83: Related Prompts Preview - Verify that the section lists the first prompts with text and engine icons, followed by an "All related Prompts" control carrying the total count.
- Scenario 84: Cited URLs Preview - Verify that the Cited URLs heading carries the total count, lists the first URLs with title, address and engine icons, and ends with an "All Cited URLs" control carrying the same total.
- Scenario 85: All Related Prompts Modal - Verify that the control opens a modal headed "All related Prompts - {domain}" with the prompt count, a search field over prompt text and the full list.
- Scenario 86: Modal Question-Type Tabs - Verify that the modal shows All, Visibility, Competitive and Perception tabs each with its own count, with All selected by default.
- Scenario 87: Prompt Deduplication - Verify that a prompt produced by several engines appears once with every citing engine's icon, in both the panel preview and the modal.
- Scenario 88: Perception Tab Lists Questions - Verify that the Perception tab lists one row per question and that no negative concept name appears in AI Citation Sources.
- Scenario 89: Search Within Tab - Verify that a search term shows only the prompts of the active tab matching the term.
- Scenario 90: Consistent Totals - Verify that the panel control, the modal header and the sum of the tab counts state the same total for a domain.
- Scenario 91: Empty Modal Tab - Verify that a tab with no prompt says so and the other tabs stay reachable.
- Scenario 92: Panel Follows Dashboard Scope - Verify that the panel prompts and URLs follow the market, AI engine and date filters, without the 7-day Actions Center window.

**Localisation (stories: GEO-1168 & GEO-1178)**

- Scenario 93: Strings in Four Locales - Verify that every new and changed Target Sources string (subtitle, card lines, chips, filters, panel tabs and explanation lines, prompts section, all-clear) exists in en-GB, en-US, fr-FR and es-ES with singular and plural forms. *(corrected)*
- Scenario 94: Spanish Usted Register - Verify that the new Spanish strings use "usted" ("su marca") as in the rest of the app.
- Scenario 95: Language Switch Coverage - Verify that switching the app language updates the card lines, chips, tabs, filters and the export.
- Scenario 96: Page Name per Locale - Verify that the page name reads "Action Center" in en-US and en-GB, "Centre d'actions" in French and "Centro de acciones" in Spanish. *(new)*

**Sort by Most Prompts (stories: GEO-1184)**

- Scenario 97: Most Prompts Sort - Verify that with "Most prompts" selected the cards are in descending order of the prompt count shown on them. *(new)*
- Scenario 98: Prompt Count Matches Panel - Verify that the prompt count on a card equals the number of prompts listed in its details panel. *(new)*
- Scenario 99: Default Sort Unchanged - Verify that the default sort and the export are unchanged when "Most prompts" is not selected. *(new)*

#### Edge Cases & Boundary Conditions

* Source with both verdicts: both badges (stacked on the card, inline in the panel header), both reason lines on the card and both chips in the table.
* Reason count of 0: the matching table chip and card line are omitted, and the matching panel tab is not shown.
* Count equal to 1: singular form ("Not visible in 1 article", "Negative perception in 1 article", "Show 1 more prompt").
* Exactly 12 sources: all cards shown and no "Show X more sources" button; with more than 12, X = total - 12.
* Negative-depiction boundaries: a favourable statement about a competitor is not negative; factual unfavourable news (recall, lawsuit, poor result) is negative; a weak incidental criticism in a neutral article is not negative; an ambiguous depiction is neutral.
* Product named on the page but never seen in any LLM answer: counts as the brand family being named.
* Unfetchable page or check not completed (engine unavailable, unsupported language, unusable content): contributes nothing to any count or rank.
* Brand subdomain on a third-party media site (e.g. toyota.caranddriver.com): eligible; brand domain on any country TLD (e.g. toyota.fr): excluded.
* Supporting sentence longer than 140 characters: name part and criticism part joined with "…", whole passage still at most 140 characters.
* Top 100 domain whose articles all name the brand positively or neutrally: not listed; if no top 100 domain qualifies, the all-clear state shows.
* Prompt cited by several engines: one row with one icon per engine, in the Target Sources panel and in AI Citation Sources Related Prompts.
* Source whose prompts are cited by a single engine: the engine filter shows "All" plus one engine tab (PO confirmation on GEO-1178, 2026-10-04).
* More than 3 engines in the engine filter: tabs show icon and count only; with 2 or 3 engines, icon and name.
* First or last source in panel navigation: "Previous" or "Next source" disabled, no wrap-around.
* Date range shorter than 7 days: the Actions Center pools at least 7 days while AI Citation Sources and its details panel keep the shorter range; intentional, do not file as a defect.
* Report with fewer than 7 days of history: the Actions Center uses every available day.
* Export started while verification runs: the export may carry the all-clear message while the screen shows the verifying state; accepted, do not file as a defect.
* Filter and tab combination with no matching source: the filtered empty state shows and the other tabs stay reachable.
* Long source type name (e.g. "Aggregator/Encyclopedic"): input stays at 200 px with an ellipsis, the dropdown widens, the full name shows on hover.
* Perception tab of the Related Prompts modal: one perception answer with several negative concepts gives one row.

#### Open Points (not blocking)

* GEO-1116: AC1 (three qualifying legs), AC2 (ranked-low does not qualify) and AC5 (not bounded by the AI Citation Sources cap) are superseded by GEO-1169 (top 100 domains by Frequency, sources from non-gap answers now eligible); the GEO-1116 description was not updated, so no scenario covers them.
* GEO-1123: AC3 to AC7 (deterministic brief, no zero counts, singular forms, In-Brief treatment, per-article "no mention" line) and AC10 to AC14 (Failing/Positive tabs, positive article content, header counts, positives outside the panel) are superseded by GEO-1168 and GEO-1178; the qualifying part of AC15 is superseded by GEO-1169 (all citing prompts); AC15 still says "blocked by GEO-1128" although GEO-1128 is Done; the description was not updated, so no scenario covers them.
* GEO-1118: AC13 (top ten) is superseded by GEO-1168 (12 cards, 10 table rows); the citation-count tie-break of AC1 and AC8 is no longer observable since GEO-1168 removed every "Cited" count, and the epic body (citation count redefined 2026-09-17) differs from the GEO-1118 story text.
* GEO-1118 AC8 / GEO-1168: in a verdict tab, it is not specified whether a card shows only the reason line of that verdict or both lines.
* GEO-1124 AC4 / GEO-1168: the Excel tab is still specified with a Brief column, a "Citations in qualifying answers" column and a Positive articles block, while GEO-1168 removes the Cited count from the export and positive articles from the panel; PO to confirm the Excel columns.
* GEO-1124 AC5 / GEO-1168: the deck brief for the top three sources is not mentioned by GEO-1168, which gives the top cards the split copy; PO to confirm whether the brief remains on the top three cards.
* GEO-1178 / GEO-1188: GEO-1178 specifies "Action Centre" in en-GB; QA decision 2026-10-12 aligned with GEO-1188: "Action Center" in en-GB. The GEO-1178 description still says "Action Centre".
* GEO-1117: AC1 (no cap on articles), AC4 (verdict persisted, never re-judged within an analysis) and AC6 (false-positive passage persisted) have no UI surface and are untestable through the application.
* GEO-1122: AC3 (conditional re-check on every run) and AC4 (staleness window) have no UI surface; the staleness value (7 days proposed) is still awaiting PM confirmation.
* GEO-1169: AC4 (changing X applies to the next run without a release) needs configuration access and a new run, so it is not testable by QA alone; AC7 and AC8 (idempotency marker, selection log) are technical and excluded.
* GEO-1183: AC4 (verdicts unchanged after the re-judge) needs a pre-re-judge verdict baseline and is not verifiable from the UI.
* GEO-1125: AC6 (backend computation removed, not hidden) is technical and only verifiable on the API response.
* GEO-1126: AC3 requires an "All Cited URLs" control but no AC states what activating it opens (the design shows a Cited URLs modal); Scenario 84 covers presence and count only.
* GEO-1168: removal of the unused keys from the four locale files is a code check, not a UI behaviour.
* GEO-1166: keyboard ArrowLeft/ArrowRight navigation, panel scroll reset and the analytics event are in the implementation notes only, not in the ACs, so no scenario covers them.
* GEO-1184: Backlog, not delivered; the design is pending (sort control placement and wording, prompt count on the card, sort persistence across tabs, FR/ES strings), so Scenarios 97 to 99 cannot run until delivery.
* GEO-1134: the existing es-ES strings breaking the usted rule are out of scope for this epic and tracked separately.

**Environment:** Staging

**Priority:** High

**Assignee:** Assiya.Benramdane
