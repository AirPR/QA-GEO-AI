# e2e-create-custom-brand

- **Spec:** `.claude/Data/raw/playwright/e2e-create-custom-brand.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-WIZARD-CUSTOM-001](#e2e-wizard-custom-001) | Create a brand analysis for a custom brand with a website and find its logo everywhere | NEW | GEO-1241, GEO-1260, GEO-1261, GEO-1263 |

---

## E2E-WIZARD-CUSTOM-001

**Create a brand analysis for a custom brand with a website and find its logo everywhere**

| Field | Value |
|---|---|
| Status | NEW — ask before running (creates an analysis / changes a setting); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | End-to-end: Create a brand analysis for a custom brand with a website and find its logo everywhere. Pass 2 — cross-epic (scenario 191). Assumptions: Steps after creation can point to the existing analysis A1 (Lictorix Geo f228f1fe, licter.com) of the GEO-1069 runs to avoid waiting for a collection. Epics: GEO-1209, GEO-1069. Consolidates TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-001, TC-GEO-1261-008, TC-GEO-1263-001, TC-GEO-1263-008, TC-GEO-1263-006, TC-GEO-1263-002. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): custom brand C = "Tikamoon QA" with website tikamoon.com (a Lictorix Geo / licter.com analysis already exists in QA-GEO); one brand name in every step (steps 4-5 read "Lictorix Geo" while the data said "Licter"); "market" renamed "country" (GEO-1514). |
| Priority | High |
| Stories | GEO-1241, GEO-1260, GEO-1261, GEO-1263 |
| Precondition | Creates an analysis (5 prompts) — ask before the run; Custom brand with no analysis in the organisation — run 10/11: "Tikamoon QA", website https://www.tikamoon.com/fr/about?x=1 (root domain tikamoon.com); a completed run is needed for the rankings / prompts steps (run the dashboard part on the next day or on the existing A1 of the GEO-1069 runs) |
| Labels | e2e-suite |
| QA Parent | GEO-1209 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PARTIAL 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" |
| 2 | When the user selects the "Brand analysis" card |  | The card is shown selected |
| 3 | And the mode pill shows the mode |  | The product bar pill reads "Brand analysis" |
| 4 | When the user types a brand name in the brand search | C = "Tikamoon QA" | The dropdown lists the matching suggestions, if any, and a "Custom Brand" row for "Tikamoon QA" |
| 5 | And the user selects the "Custom Brand" row (Tikamoon QA) |  | The custom brand card "Tikamoon QA" is displayed as the selected brand |
| 6 | Then a website field is displayed inline right under the selected custom brand card, above "Discover Categories" |  | The field has a globe icon and the same input style as the brand search |
| 7 | Given the custom brand "Tikamoon QA" is selected with a full URL as website and a country | "https://www.tikamoon.com/fr/about?x=1", United States / English (EN) | "tikamoon.com" is shown under the brand name with its logo preview (logo noted as L1) |
| 8 | And the user clicks "Discover Categories" and checks the category discovery request in DevTools | DevTools Network, discover-categories request | The brand domain sent (entityDomain) is "tikamoon.com", not the full URL typed (the Summary step shows neither the brand nor its domain) |
| 9 | When the user goes through Categories, Prompts and Summary and creates the analysis | Default categories, only 5 prompts kept (QA rule: test analyses keep 5 prompts, shared prompt pool) | The analysis A1 is created and "View analysis" is available |
| 10 | And the user checks the analysis creation request in DevTools | DevTools Network, creation request | The brand domain sent and returned is "tikamoon.com", not the full URL typed |
| 11 | And the user opens the analysis from "View analysis" |  | The dashboard of A1 opens |
| 12 | Then the brand is displayed with the logo of the stored domain |  | The sidebar and header show logo L1 of tikamoon.com, not a lettermark |
| 13 | When the user opens the report list |  | The A1 row shows logo L1 |
| 14 | And the user opens the Overview of A1 |  | The dashboard sidebar and header show logo L1 |
| 15 | Then the target brand row of the brand rankings in Overview shows logo L1 |  | Logo L1, not the favicon of a domain cited by the AI answers |
| 16 | When the user opens a Category view | First category of A1 | The target brand row of the rankings shows logo L1 |
| 17 | And the user opens a competitive view | e.g. the competitor comparison of A1 | The target brand shows logo L1 |
| 18 | When the user opens the prompts table of A1 |  | The prompts are listed with their winner |
| 19 | And the user locates a prompt whose winner is the target brand | "Tikamoon QA" | The prompt row shows "Tikamoon QA" as winner |
| 20 | Then the winner cell shows logo L1 |  | Logo L1 of tikamoon.com, not a lettermark and not the favicon of a domain cited by the AI answers |
| 21 | Then only the target brand row shows logo L1 |  | Logo L1 on the target brand row |
| 22 | And each competitor row shows its own logo |  | Competitor logos are not replaced by logo L1 |
| 23 | And the brand variant rows keep their own visuals |  | Variant rows are not replaced by logo L1 |
| 24 | When the user opens a Category view | First category of A1 | Same result: L1 on the target brand row only, competitor and variant rows unchanged |
| 25 | When the user exports the analysis as PowerPoint |  | The .pptx file is downloaded |
| 26 | Then the cover slide shows logo L1 |  | Logo L1 of tikamoon.com |
| 27 | And the target brand row of the rankings slide shows logo L1 |  | Logo L1, not the favicon of a domain cited by the AI answers |
| 28 | When the user exports the analysis as PDF |  | The .pdf file is downloaded |
| 29 | Then the cover and the rankings target row of the PDF show logo L1 |  | Logo L1 on both |
