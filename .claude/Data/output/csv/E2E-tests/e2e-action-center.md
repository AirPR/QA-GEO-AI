# e2e-action-center

- **Spec:** `.claude/Data/raw/playwright/e2e-action-center.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-ACTION-CENTER-001](#e2e-action-center-001) | Prioritise Target Sources in the Action Center of a brand analysis | NEW | GEO-1118, GEO-1120, GEO-1166, GEO-1178, GEO-1184, GEO-1168 |

---

## E2E-ACTION-CENTER-001

**Prioritise Target Sources in the Action Center of a brand analysis**

| Field | Value |
|---|---|
| Status | NEW; aligned on the observed result 2026-11-04 (user decision) |
| Description | End-to-end: Prioritise Target Sources in the Action Center of a brand analysis. Pass 1 — per epic (GEO-152 R1.2 + GEO-1513 R1.3). Assumptions: Source B = a source with both reasons and 3 engines (e.g. frandroid.com) — JDD. Epics: GEO-152, GEO-1513. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): step 15 — the "All" engine tab shows the distinct prompt count ("All (N)", observed "All (86)"), consistent with step 24. Consolidates TC-GEO-1118-006, TC-GEO-1120-017, TC-GEO-1166-002, TC-GEO-1178-003, TC-GEO-1178-010, TC-GEO-1184-001, TC-GEO-1184-002, TC-GEO-1184-008, TC-GEO-1166-004, TC-GEO-1168-013, TC-GEO-1168-014. |
| Priority | High |
| Stories | GEO-1118, GEO-1120, GEO-1166, GEO-1178, GEO-1184, GEO-1168 |
| Precondition | Brand analysis Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e (staging), Target Sources verified; Sort labels "Coverage" / "Prompts" kept by PO decision (GEO-1513 F-1, GEO-1184 Passed QA 27/10) |
| Labels | e2e-suite |
| QA Parent | GEO-152 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP) — TC aligned on the observed result |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Toyota analysis and clicks "Action Center" in the left menu | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The Target Sources page is displayed |
| 2 | Then the user checks the verdict tabs |  | Three tabs are shown, "ALL", "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION", each verdict tab with its icon |
| 3 | And the user checks the selected tab |  | "ALL" is underlined as the selected tab |
| 4 | Then the global filter bar at the top right shows the date, AI engine and country filters and the export icon |  | The bar shows "Last 7 days", "AI Engines" with its count badge, "All Countries" and the export (download) icon |
| 5 | And the global filter bar holds no category control |  | Categories are selected from the left navigation or from the page Category filter next to the Type filter ("All categories"), not from the global filter bar |
| 6 | And the user opens the details panel of the source ranked #1 |  | The panel header shows "#1 · {domain of card 1}", the footer shows "Source 1 of N" and card #1 shows the selected state |
| 7 | When the user clicks "Next source" |  | The panel stays open (no close / reopen) and its content is replaced by the source ranked #2 |
| 8 | Then the panel header, badges, article tabs and prompts belong to the source of card #2 |  | The header reads "#2 · {domain of card 2}" with its source type and reason badges; the footer reads "Source 2 of N" |
| 9 | And the selected state behind the panel moved to card #2 |  | Card #2 shows the selected state and card #1 no longer does |
| 10 | When the user opens the details panel of source B | Source B (e.g. frandroid.com) | The panel opens with the header "#k · {domain of B}" |
| 11 | Then both article tabs are displayed at the top of the panel, each with its icon |  | A two-segment control shows "Lack of visibility (a)" with the eye-off icon and "Negative perception (b)" with the thumb-down icon |
| 12 | And the "Lack of visibility" tab is the first tab |  | "Lack of visibility (a)" is the left segment, before "Negative perception (b)" |
| 13 | And the "Lack of visibility" tab is selected by default |  | "Lack of visibility (a)" is the active (white) segment, "None of these articles mentions Toyota anywhere on the page." is shown and its articles are listed |
| 14 | Then the engine filter is displayed above the prompts list |  | The filter sits between the heading and the first prompt row |
| 15 | And "All" is the first tab, is selected by default and shows the number of distinct prompts |  | "All (N)" is the first tab, shown as the active (white) tab, with N = the distinct prompts of the source (e.g. "All (86)" for autobild.es on 04/11) |
| 16 | And one tab is shown for each engine present in the prompts of source B | Engines in scope: ChatGPT, Gemini, Perplexity | Exactly 3 engine tabs follow "All" |
| 17 | And each engine tab shows the number of prompts of the list cited by that engine |  | Each engine tab shows the engine icon and its prompt count as a bare number, the engine name appears in the tooltip on hover; "All" covers the distinct prompts (counts overlap) |
| 18 | And the engine tabs are in the fixed order ChatGPT, Gemini, Perplexity, not sorted by count | QA decision | The order is "All", ChatGPT, Gemini, Perplexity (checked with the tooltips), whatever the counts |
| 19 | Given the user opens the Action Center of the chosen analysis | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | "Sort by" in the page header, left of the Card view / List view switch, shows "Coverage"; the cards are sorted by failing articles and each card shows "Used in N prompts" |
| 20 | When the user opens "Sort by" and selects "Prompts" | Sort by: Prompts | The list is re-sorted and "Sort by" shows "Prompts" |
| 21 | Then the cards are in descending order of their prompt count |  | The "Used in N prompts" value never increases from one card to the next |
| 22 | And the ranks are renumbered from 1 |  | The first card shows rank 1 and the ranks run with no gap |
| 23 | Given the user notes the prompt count of the card ranked #1 | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | The card shows "Used in N prompts" |
| 24 | When the user opens its details panel and clicks "Show X more prompts" on the "All" tab of "Prompts associated with this source" |  | The "All" tab reads "All (N)" with the N of the card and the full prompts list is displayed |
| 25 | Then the number of prompt rows equals N |  | The rows of "Prompts associated with this source" equal the card count |
| 26 | When the user selects the "IMPROVE VISIBILITY" tab |  | "Sort by" still shows "Prompts", the cards are in descending prompt count order and the ranks start at 1 |
| 27 | And the user switches to List view |  | "Sort by" still shows "Prompts" and the rows are in descending prompt count order |
| 28 | When the user reloads the page | browser reload (F5) | "Sort by" shows "Coverage" and the sources are ordered by failing articles |
| 29 | When the user selects the "IMPROVE PERCEPTION" tab | Tab: IMPROVE PERCEPTION | Only sources with the "Improve perception" badge are listed; the user notes their count Y |
| 30 | And the user selects a source type in the Type filter | Source type: Journalism (or any type listed with a count) | The list keeps only the sources of that type in the "IMPROVE PERCEPTION" tab; the user notes the new count Y |
| 31 | And the user opens the details panel of the 2nd source of the filtered list |  | The details panel opens for that source |
| 32 | Then the footer counter reads "Source 2 of Y" |  | The counter shows 2 (position in the filtered list) and Y (number of sources in the filtered list), not the global rank or the unfiltered total; the panel header also shows the filtered position "#2 · {domain}", not the global rank |
| 33 | And the user clicks "Next source" |  | The panel shows the 3rd source of the filtered list (not the next global rank): the header reads "#3 · {domain}" and the counter reads "Source 3 of Y" |
| 34 | Then a Category filter is displayed next to the Type filter |  | The Category dropdown is shown beside the Type dropdown |
| 35 | And the Category filter shows its default value |  | The Category dropdown reads "All categories" |
| 36 | When the user opens the Category filter |  | The list of categories is displayed |
| 37 | Then the options are the categories of the analysis | Categories listed in the left menu | Every category of the left menu is listed, and no other category |
| 38 | And the options are in the same order as the left menu |  | The option order matches the left menu order exactly |
| 39 | When the user selects category C1 in the Category filter | Category: C1 | The Category dropdown shows C1 and the list re-renders |
| 40 | Then only sources with at least one missing or negative article in C1 answers are listed |  | The total is lower than or equal to the total of step 1 and no card shows a 0 count |
