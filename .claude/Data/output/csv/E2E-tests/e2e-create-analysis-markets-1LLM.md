# e2e-create-analysis-markets-1LLM

- **Spec:** `.claude/Data/raw/playwright/e2e-create-analysis-markets-1LLM.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-MARKETS-1LLM-001](#e2e-markets-1llm-001) | Create a brand analysis on two countries with a single AI engine | UPDATE | GEO-1241, GEO-1260, GEO-1231, GEO-104, GEO-1233, GEO-1229, GEO-1237 |

---

## E2E-MARKETS-1LLM-001

**Create a brand analysis on two countries with a single AI engine**

| Field | Value |
|---|---|
| Status | UPDATE — same wizard changes; engines moved to Summary; no spec on disk (new spec under the same name) — behaviour change (confirmed at the gate); no spec on disk: new spec in the spec phase |
| Description | End-to-end: Create a brand analysis on two countries with a single AI engine. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate (new GEO-R1.3 wizard / dashboard). Assumptions: 5 prompts kept in total (QA rule); with 2 countries the ring counts one slot per prompt and per country; TC-GEO-1237-001 step 3 expected names follow the JDD countries (United States · English and France · French instead of United Kingdom · English and France · French). Consolidates TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-004, TC-GEO-1231-004, archive E2E-MARKETS-1LLM-001, TC-GEO-1231-010, TC-GEO-1233-001, TC-GEO-1229-003, TC-GEO-1237-001, TC-GEO-1237-006, TC-GEO-1237-010. Former id: E2E-MARKETS-1LLM-001. Archived in GEO-R1.0/e2e-create-analysis-markets-1LLM.csv. |
| Priority | High |
| Stories | GEO-1241, GEO-1260, GEO-1231, GEO-104, GEO-1233, GEO-1229, GEO-1237 |
| Precondition | Same as E2E-CREATE-DEFAULT-001; Claude allowed for the organisation (otherwise the engine step cannot be run); Room in the pool: each kept prompt costs one slot per country (TC-GEO-1229-002) |
| Labels | e2e,wizard,markets,llm-selection |
| QA Parent | GEO-104 |
| Components / QA Component | Wizard / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | — |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" |
| 2 | When the user selects the "Brand analysis" card |  | The card is shown selected |
| 3 | And the mode pill shows the mode |  | The product bar pill reads "Brand analysis" |
| 4 | When the user types the name of a suggested brand | S = "YVES SAINT LAURENT" (archive data) | The dropdown lists Brandfetch suggestions with their logo and domain, plus a "Custom Brand" row for "Nike" |
| 5 | And the user selects the suggestion | "YVES SAINT LAURENT" suggestion | The selected brand card shows today's card: the Nike logo, the name and the domain |
| 6 | When the user clicks Add country |  | The composer opens with a country select and a language select |
| 7 | When the user picks a country with several languages | Country: United States (English (EN)) | The language select becomes enabled and is prefilled with the default language of the country |
| 8 | When the Editor adds the second country France | Country: France, Add Market action | A second market row is created with country = France |
| 9 | Then the language French is auto-detected on the second market row | Auto-detected language: French | The Language field shows French (no manual selection needed) |
| 10 | When the user clicks Discover Categories |  | A loading screen is displayed |
| 11 | When discovery ends |  | The Categories step opens |
| 12 | And the Editor accepts the AI-discovered categories without modification | Default AI-discovered categories (no edits) | At least one AI-discovered category is visible on Step 2 |
| 13 | When the user clicks Generate Prompts and generation ends |  | The Prompts step shows one table with every prompt |
| 14 | When the user unticks 3 prompts | Untick every prompt but 5 | The 3 rows are greyed and the ring reads "U + 37 / P" |
| 15 | When the user clicks Review & Launch |  | The Summary step loads |
| 16 | Then the scope shows the markets | United States · English and France · French | United Kingdom · English and France · French, with no "Primary" tag |
| 17 | Then each allowed engine is a toggle, with ChatGPT and Gemini on by default |  | One toggle per allowed engine; ChatGPT and Gemini are on when allowed, every other allowed engine is off; if neither ChatGPT nor Gemini is allowed, every allowed engine is on |
| 18 | When the Editor disables all LLM engines except Claude | Disable all non-Claude LLM toggles | All LLM toggles are off except the Claude toggle which remains enabled |
| 19 | Then only the Claude LLM engine is enabled | Claude toggle aria-checked=true all others aria-checked=false | Exactly 1 LLM toggle is enabled and it corresponds to Claude |
| 20 | When the user clicks Create Analysis |  | The analysis is scheduled and the "Analysis created" confirmation opens; Back to Dashboard is hidden |
| 21 | Then the confirmation states the prompts, markets, categories and engines |  | 133 prompts, 2 markets, 2 categories and the names of the 3 engines |
| 22 | When the user clicks View analysis |  | The new analysis opens |
