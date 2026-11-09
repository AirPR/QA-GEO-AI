# e2e-create-unbranded

- **Spec:** `.claude/Data/raw/playwright/e2e-create-unbranded.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-UNBRANDED-CREATE-001](#e2e-unbranded-create-001) | Create an unbranded analysis end to end and open its topic Overview | NEW | GEO-1241, GEO-1260, GEO-1229, GEO-1242, GEO-1243 |

---

## E2E-UNBRANDED-CREATE-001

**Create an unbranded analysis end to end and open its topic Overview**

| Field | Value |
|---|---|
| Status | NEW — ask before running (creates an analysis / changes a setting) |
| Description | End-to-end: Create an unbranded analysis end to end and open its topic Overview. Pass 2 — cross-epic (scenario 192). Assumptions: 5 prompts kept (QA rule) instead of the 180 of TC-GEO-1241-013 (counts not asserted). Epics: GEO-1209, GEO-1069, GEO-1002. Consolidates TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1241-005, TC-GEO-1241-006, TC-GEO-1260-007, TC-GEO-1241-011, TC-GEO-1241-012, TC-GEO-1229-003, TC-GEO-1241-004, TC-GEO-1242-001, TC-GEO-1243-001. |
| Priority | High |
| Stories | GEO-1241, GEO-1260, GEO-1229, GEO-1242, GEO-1243 |
| Precondition | Creates an analysis (5 prompts) — ask before the run; Flag ON; topic from the JDD (TC data "Postal services" already exists in QA-GEO: pick another topic or delete after the run) |
| Labels | e2e-suite |
| QA Parent | GEO-1209 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | — |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" |
| 2 | Then two cards "Brand analysis" and "Unbranded analysis" are displayed |  | Both cards are shown with their descriptions: Brand analysis "Measure how AI engines see, rank and compare your brand against its competitors." and Unbranded analysis "Measure an industry or a topic: which brands AI engines name, and what they say about it."; the Unbranded analysis card has no "No brand scorecard" point |
| 3 | And no card is selected |  | Neither card is selected and the primary action (Continue) is disabled |
| 4 | When the user selects the "Unbranded analysis" card instead |  | Only the Unbranded analysis card is selected; Continue stays enabled |
| 5 | Then the mode pill shows the new mode |  | The product bar pill reads "Unbranded analysis" |
| 6 | Then step 2 is labelled "Topic & Country" |  | The stepper and the step title read "Topic & Country", not "Brand & Country" |
| 7 | And the step asks for an industry or topic instead of a brand |  | A topic text field is displayed; there is no brand search, no brand logo and no brand website field |
| 8 | And the markets block and Language for AI Insights are displayed as in a brand analysis |  | The markets block (country, language) and Language for AI Insights are shown below the topic field |
| 9 | Then the field asks the topic question |  | "What industry or topic are you analysing?" is displayed as the field question |
| 10 | And a helper states that the topic frames the analysis and is never measured |  | The helper is shown under the field: "The topic frames the analysis and is never measured. We measure the brands AI engines name." |
| 11 | And the user types a topic | "Electric cars" | The topic is accepted |
| 12 | Then no website field is displayed |  | No "What is your brand's website? (optional)" field is shown on Topic & Country |
| 13 | Given the user is on Topic & Country with a valid topic and market | Topic: "Postal services"; market GB (EN) | "Discover Categories" is enabled |
| 14 | When the user clicks "Discover Categories" |  | The category discovery screen is displayed |
| 15 | Then the screen keeps the brand version layout |  | Same layout as the brand discovery screen (loader and two text lines) |
| 16 | And its text is the topic version |  | The text reads "Scanning how AI engines see Postal services across your countries." and "This usually takes about 20 seconds. We look at your topic, your countries and their languages."; it does not use the brand text ("Scanning how AI engines see {brand}..." / "We look at your brand...") |
| 17 | And discovery ends on Categories |  | The Categories step opens with the discovered categories |
| 18 | When the user opens the Type column filter |  | The filter lists Visibility, Competitive and Category Topics with their counts |
| 19 | Then there is no Brand Image and no Reputation prompt |  | Neither "Brand Image" nor "Reputation" is listed in the filter or shown on a badge |
| 20 | When the user filters on Competitive |  | Only Competitive rows are shown |
| 21 | Then each Competitive prompt holds four competitor slots and no brand |  | Each wording has 4 competitor slots ([Competitor 1] to [Competitor 4]) and names no target brand |
| 22 | When the user unticks 3 prompts | Untick every prompt but 5, keeping at least one Category Topics prompt | The 3 rows are greyed and the ring reads "U + 37 / P" |
| 23 | And the user continues to Prompts and then Summary |  | The pill reads "Unbranded analysis" on Prompts and on Summary |
| 24 | Given the user is on Summary of the unbranded scope |  | Summary shows the markets and the categories; the topic is not shown (PO decision 2026-10-26, GEO-1209 comment 867869) |
| 25 | When the user clicks Create Analysis |  | The creation confirmation is displayed with View analysis |
| 26 | And the user opens the GEO dashboard analyses list |  | The new analysis is listed as "Postal services" in the "Brand / Topic" column |
| 27 | And the user opens the analysis |  | The sidebar block shows "Postal services" |
| 28 | Then no target brand is set |  | No brand is shown as the analysis brand anywhere in the sidebar, Overview or Manage Scope |
| 29 | And the analysis stays unbranded | Manage Scope | Manage Scope shows the topic "Postal services" and no brand field |
| 30 | Then the sidebar block shows the topic first letter in the logo slot |  | A letter avatar "P" is shown where a brand logo shows today |
| 31 | And no extra header, mode label or date is shown |  | No "Unbranded analysis" label, no generation date and no header above the block or the Overview |
