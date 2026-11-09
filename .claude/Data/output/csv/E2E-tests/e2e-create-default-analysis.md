# e2e-create-default-analysis

- **Spec:** `.claude/Data/raw/playwright/e2e-create-default-analysis.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-CREATE-DEFAULT-001](#e2e-create-default-001) | Create a brand analysis for a suggested brand with the new wizard (flag ON) | UPDATE | GEO-1241, GEO-1231, GEO-1260, GEO-1232, GEO-104, GEO-1233, GEO-1229, GEO-1236, GEO-1237, GEO-1240 |

---

## E2E-CREATE-DEFAULT-001

**Create a brand analysis for a suggested brand with the new wizard (flag ON)**

| Field | Value |
|---|---|
| Status | UPDATE — new 5-step wizard, prompt pool, Summary, creation confirmation (GEO-R1.3) — behaviour change (confirmed at the gate) |
| Description | End-to-end: Create a brand analysis for a suggested brand with the new wizard (flag ON). Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate (new GEO-R1.3 wizard / dashboard). Assumptions: The analysis keeps only 5 prompts (QA rule): the untick step unticks every suggestion but 5, so the ring / "N selected" figures of TC-GEO-1229-003 scale to the real counts; Brand data of TC-GEO-1260-004 (Nike) replaces Chanel; the JDD may keep Chanel if the user prefers (same expected wording with the other brand name); Archive steps 15-16 ("Last update" column, "In progress") are kept: no newer TC describes this column on the R1.3 dashboard; verify the label on staging before the spec update. Known bugs: TC-GEO-1240-004 step 2 relies on the Analysis table header; GEO-1546 (Ready for QA) removes the duplicated "N analyses" label there (no impact on the Prompts column itself). Consolidates TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1231-003, TC-GEO-1260-004, TC-GEO-1231-004, TC-GEO-1231-010, TC-GEO-1232-001, archive E2E-CREATE-DEFAULT-001, TC-GEO-1233-001, TC-GEO-1229-003, TC-GEO-1236-001, TC-GEO-1237-001, TC-GEO-1237-006, TC-GEO-1237-010, TC-GEO-1240-004. Former id: E2E-CREATE-DEFAULT-001. Archived in GEO-R1.0/e2e-create-default-analysis.csv. |
| Priority | High |
| Stories | GEO-1241, GEO-1231, GEO-1260, GEO-1232, GEO-104, GEO-1233, GEO-1229, GEO-1236, GEO-1237, GEO-1240 |
| Precondition | Staging, QA account allowed to create analyses, interface language en-GB, unbranded flag ON; Room in the prompt pool of the organisation for 5 prompts; ChatGPT and Gemini allowed for the organisation (TC-GEO-1237-006) |
| Labels | e2e,wizard,happy-path,defaults |
| QA Parent | GEO-104 |
| Components / QA Component | Wizard / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 18/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard of organisation T |  | The dashboard is displayed with New Analysis available |
| 2 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" |
| 3 | Then two cards "Brand analysis" and "Unbranded analysis" are displayed |  | Both cards are shown with their descriptions: Brand analysis "Measure how AI engines see, rank and compare your brand against its competitors." and Unbranded analysis "Measure an industry or a topic: which brands AI engines name, and what they say about it."; the Unbranded analysis card has no "No brand scorecard" point |
| 4 | And no card is selected |  | Neither card is selected and the primary action (Continue) is disabled |
| 5 | When the user selects the "Brand analysis" card |  | The card is shown selected |
| 6 | Then the primary action is enabled |  | Continue is enabled |
| 7 | And the mode pill shows the mode |  | The product bar pill reads "Brand analysis" |
| 8 | Then the brand question is displayed |  | "What brand are you analysing?" |
| 9 | And the countries question is displayed |  | "Which countries do you want to analyse?" |
| 10 | When the user types the name of a suggested brand | S = "Nike" | The dropdown lists Brandfetch suggestions with their logo and domain, plus a "Custom Brand" row for "Nike" |
| 11 | And the user selects the suggestion | "Nike" (nike.com) | The selected brand card shows today's card: the Nike logo, the name and the domain |
| 12 | Then no website field is displayed |  | No "What is your brand's website? (optional)" field is shown anywhere on the step |
| 13 | When the user clicks Add country |  | The composer opens with a country select and a language select |
| 14 | Then the language select is disabled until a country is picked |  | The language select is greyed and cannot be opened |
| 15 | When the user picks a country with several languages | Country: United States (default language English (EN)) | The language select becomes enabled and is prefilled with the default language of the country |
| 16 | When the user clicks Discover Categories |  | A loading screen is displayed |
| 17 | Then the loading screen states that category discovery takes about 20 seconds |  | The text states about 20 seconds (exact wording from the strings sheet) |
| 18 | And Brand & Country stays the active step with no footer |  | The stepper still marks Brand & Country; no footer is shown; Back to Dashboard is disabled |
| 19 | When discovery ends |  | The Categories step opens |
| 20 | Then each detected category shows an "AI generated" badge |  | Every detected row carries the "AI generated" badge |
| 21 | And the Editor accepts the AI-discovered categories without modification | Default AI-discovered categories (no edits) | At least one AI-discovered category is visible on Step 2 |
| 22 | When the user clicks Generate Prompts and generation ends |  | The Prompts step shows one table with every prompt |
| 23 | And each prompt carries the category and type that produced it |  | Each C1 row shows Category C1 and its type badge |
| 24 | When the user unticks 3 prompts | Untick every prompt but 5 (QA rule: test analyses keep 5 prompts) | The 3 rows are greyed and the ring reads "U + 37 / P" |
| 25 | Then the unticked prompts consume no slot |  | "37 selected" is shown and the popover "this analysis" part reads 37 |
| 26 | When the user hovers the ring |  | The popover opens |
| 27 | Then the popover splits other analyses, this analysis and free slots |  | Other analyses = U, Kept in this analysis = 40, Free = P - U - 40 |
| 28 | When the user clicks Review & Launch |  | The Summary step loads |
| 29 | And the AI engines are shown |  | The engines allowed for organisation T are shown as toggles |
| 30 | Then each allowed engine is a toggle, with ChatGPT and Gemini on by default |  | One toggle per allowed engine; ChatGPT and Gemini are on when allowed, every other allowed engine is off; if neither ChatGPT nor Gemini is allowed, every allowed engine is on |
| 31 | And the other engines are not shown |  | No engine outside the allowed list; no "Available on higher plans" or Upgrade block |
| 32 | When the user clicks Create Analysis |  | The analysis is scheduled and the "Analysis created" confirmation opens; Back to Dashboard is hidden |
| 33 | Then the confirmation states the prompts, markets, categories and engines |  | 133 prompts, 2 markets, 2 categories and the names of the 3 engines |
| 34 | When the user clicks View analysis |  | The new analysis opens |
| 35 | When the Editor navigates back to the reports list (BASE_URL) | Navigation to BASE_URL — reports list page | The reports list page is displayed with all existing analyses |
| 36 | Then the Chanel analysis row shows the value In progress in the Last update column | Brand: Chanel — Last update column | The Last update column of the Chanel row displays In progress indicating the analysis is running |
| 37 | Then a "Prompts" column is shown after Categories |  | "Prompts" header right after "Categories" |
| 38 | And the value of an analysis equals its kept prompts across its markets | Analysis A (Manage Scope > Prompts: ticked rows) | The Prompts value of A equals its number of ticked rows |
