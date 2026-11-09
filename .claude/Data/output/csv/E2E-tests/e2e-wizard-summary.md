# e2e-wizard-summary

- **Spec:** `.claude/Data/raw/playwright/e2e-wizard-summary.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-WIZARD-SUMMARY-001](#e2e-wizard-summary-001) | Summary warnings and the Other card in brand and unbranded scopes | UPDATE | GEO-1237, GEO-1247, GEO-1241, GEO-1238 |

---

## E2E-WIZARD-SUMMARY-001

**Summary warnings and the Other card in brand and unbranded scopes**

| Field | Value |
|---|---|
| Status | UPDATE — Other card steps 14 and 16 fixed 2026-11-05 (user decision, not a bug: the scenario could not produce 2 rows) |
| Description | End-to-end: Summary warnings and the Other card in brand and unbranded scopes. Pass 2 — cross-epic (scenario 195). Assumptions: "Create Analysis disabled over the pool" (scenario 195) needs a back-office pool change (TC-GEO-1237-009): open point. Epics: GEO-1002, GEO-1209. Consolidates TC-GEO-1237-002, TC-GEO-1237-004, TC-GEO-1247-001, TC-GEO-1247-010, TC-GEO-1241-016, TC-GEO-1238-001. Updated 2026-11-05 after the MCP run of 02/11 (user decision, not a bug — the scenario was wrong): step 1 drops FR and step 9 sets the category to C1, so the Other card can only hold one row, the new prompt (GB (EN), Type select "Other"); the observed row is correct. Covered in 1.3 by the GEO-1241 and GEO-1247 TCs (Summary, Other card). |
| Priority | High |
| Stories | GEO-1237, GEO-1247, GEO-1241, GEO-1238 |
| Precondition | Brand scope with 2 countries (GB, FR) and 2 categories; then an unbranded scope; nothing is created |
| Labels | e2e-suite |
| QA Parent | GEO-1002 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 02/11 (MCP) — steps 14 and 16 fixed 2026-11-05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user unticks every prompt of FR (FR) | Filter Market = FR (FR), untick all 70 rows | No FR (FR) prompt is ticked |
| 2 | When the user clicks Review & Launch |  | Summary loads |
| 3 | Then France · French is greyed with a "dropped" tag |  | France · French greyed with "dropped"; United Kingdom · English not dropped |
| 4 | And the warning names France as dropped |  | The warning names France |
| 5 | Given the user unticks every Brand Image prompt | Filter Type = Brand Image, untick all 20 rows | No Brand Image prompt is ticked |
| 6 | When the user clicks Review & Launch |  | Summary loads |
| 7 | Then the warning names the missing question type |  | The warning names Brand Image |
| 8 | And the warning names the metrics the analysis will not produce |  | The warning reads "No Brand Image prompts are kept, so the Corporate Reputation cards and Brand Territory stay empty, with a prompt to add questions." |
| 9 | When the user adds a prompt with the type empty | Prompt: "What do runners say about trail shoes?" - Category C1 - Market GB (EN) - Type left at its default (Other) | The row is added |
| 10 | Then the type badges show the five brand values |  | Badges read Visibility, Competitive, Reputation, Brand Image and, for the new row, Other |
| 11 | And no Category Topics badge is shown |  | No "Category Topics" badge in a brand analysis |
| 12 | When the user goes to Summary |  | Summary is displayed |
| 13 | Then a card titled with "Other" is shown |  | The card title contains "Other"; neither "Unclassified" nor "uncategorised" appears |
| 14 | And it lists each kept Other prompt with its market and an inline select for the missing value |  | Exactly 1 row: "What do runners say about trail shoes?", GB (EN), Category C1, Type select "Other"; no FR (FR) row (FR dropped at step 1) |
| 15 | And it states the prompts return key concepts only until classified and launch is not blocked |  | The note says key concepts only until classified; Create Analysis is enabled |
| 16 | When the user picks a type for the row in the card | Type: Visibility | The row leaves the card |
| 17 | When the user filters on Type Category Topics and unticks every Category Topics prompt | Type filter: Category Topics | Every Category Topics row is unticked |
| 18 | And no prompt is in Other |  | The Type and Category filters list "Other" with a count of 0 (no prompt is in Other) |
| 19 | And the user goes to Summary | Review & Launch | The Summary step is displayed |
| 20 | Then the warning names InBrief and Top Topics as metrics the analysis will not produce |  | The warning names "InBrief" and "Top Topics" |
| 21 | When the user clicks Back to Dashboard |  | The "Exit setup?" confirmation opens |
| 22 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created |
