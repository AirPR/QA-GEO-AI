# e2e-wizard-prompts

- **Spec:** `.claude/Data/raw/playwright/e2e-wizard-prompts.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-WIZARD-PROMPTS-001](#e2e-wizard-prompts-001) | Shape the prompt list in the wizard, then leave without creating | NEW | GEO-1241, GEO-1238, GEO-1231, GEO-1233, GEO-1235, GEO-1234, GEO-1236 |

---

## E2E-WIZARD-PROMPTS-001

**Shape the prompt list in the wizard, then leave without creating**

| Field | Value |
|---|---|
| Status | NEW; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | End-to-end: Shape the prompt list in the wizard, then leave without creating. Pass 1 — per epic (GEO-1002). Assumptions: Counts quoted in the expected results (40, 39, C1 (60)…) depend on the categories discovered for the brand; the spec reads the live values. Epics: GEO-1209, GEO-1002. Consolidates TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1238-001, TC-GEO-1231-010, TC-GEO-1233-001, TC-GEO-1235-001, TC-GEO-1235-003, TC-GEO-1233-004, TC-GEO-1233-005, TC-GEO-1234-001, TC-GEO-1234-003, TC-GEO-1234-006, TC-GEO-1235-008, TC-GEO-1236-001, TC-GEO-1238-005. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): "Market" renamed "Country" (GEO-1514) in the steps, columns and selects; step 23 aligned on the country added at step 4 (GB (EN) only, no FR (FR)). |
| Priority | High |
| Stories | GEO-1241, GEO-1238, GEO-1231, GEO-1233, GEO-1235, GEO-1234, GEO-1236 |
| Precondition | Staging, en-GB, flag ON, QA account allowed to create analyses; Nothing is created: the scenario ends with Exit and Discard |
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
| 3 | Then the primary action is enabled |  | Continue is enabled |
| 4 | Given the user is on Brand & Country and has entered a brand and a country | Brand "Decathlon"; country GB (EN) | The entries are shown |
| 5 | When the user clicks Discover Categories |  | A loading screen is displayed |
| 6 | When discovery ends |  | The Categories step opens |
| 7 | Given the user is on the Categories step with category C1 |  | Generate Prompts is enabled |
| 8 | When the user clicks Generate Prompts and generation ends |  | The Prompts step shows one table with every prompt |
| 9 | When the table renders |  | All prompts of all countries are in one table, with no country or type tabs |
| 10 | Then the table shows its five columns |  | "Prompt", "Category", "Type", "Country", "Actions" |
| 11 | When the user clicks the sort trigger of the Category header |  | A menu opens with "Sort ascending", "Sort descending", a checkbox list and "Clear filter" |
| 12 | Then the checkbox list shows each value with its live count |  | C1 (60), C2 (60), Overview (20) and Other (0) (listed with no prompt in Other, by design: QA decision 2026-10-22, Q-06) |
| 13 | When the user checks C1 and chooses Sort ascending |  | Only C1 prompts are listed and the header shows the number 2 (1 value + 1 sort) |
| 14 | When the user clicks Clear filter |  | All prompts are listed again, the sort is removed and the header shows no number |
| 15 | When the user unticks a prompt and notes its wording | Any Visibility prompt of C1 | The row is greyed (muted) and the ring decreases by 1 |
| 16 | And the user ticks the same row again |  | The row is no longer greyed and the ring increases by 1 |
| 17 | Then the prompt is kept again without being regenerated |  | The row shows exactly the same wording, category, type and country as before |
| 18 | And the user clicks the trash icon of kept prompt B | Prompt B = another C1 row | Prompt B disappears from the table and an Undo toast is shown |
| 19 | When the user clicks Add prompt |  | An editable row opens at the top of the table |
| 20 | Then the row holds a text input and the category, type and country selects |  | Text input, Category select, Type select and Country select are displayed |
| 21 | And the row holds confirm and cancel |  | Confirm and cancel controls are displayed on the row |
| 22 | When the user opens the category select |  | Only C1 and C2 are listed, with no Add category action |
| 23 | And the user opens the country select |  | Only GB (EN), the country added at step 4, is listed; the select is prefilled with GB (EN), the first country of the analysis |
| 24 | Given the user has filled a new row | Prompt: "Which brand sells the best kayaks" - Category C2 - Type Competitive - Country GB (EN) | Confirm is enabled; ring reads "X / P" |
| 25 | When the user confirms |  | The toast "Prompt added. It uses one pool slot." is shown |
| 26 | Then the row is added kept and highlighted |  | The row is ticked, highlighted, at the top of the table; the ring reads "X + 1 / P" |
| 27 | And the row is marked with a CUSTOM badge |  | CUSTOM badge on the row; the wording ends with "?" |
| 28 | When the user edits the wording of R without "?" | New wording: "Is Decathlon a trusted brand for running gear" | The edit field shows the new text |
| 29 | And the user saves |  | R shows "Is Decathlon a trusted brand for running gear?" |
| 30 | Then only the wording changed |  | Category C1, type Reputation, country GB (EN) and the ticked state of R are unchanged |
| 31 | When the user hovers the ring |  | The popover opens |
| 32 | Then the popover splits other analyses, this analysis and free slots |  | Other analyses = U, Kept in this analysis = 40, Free = P - U - 40 |
| 33 | When the user clicks Back to Dashboard |  | "Exit setup?" opens |
| 34 | And the user clicks Resume Setup |  | The confirmation closes |
| 35 | Then the user stays on the same step with every choice intact |  | Prompts step, "39 selected", the 2 unticked rows and the CUSTOM prompt unchanged |
| 36 | When the user clicks Back to Dashboard |  | The "Exit setup?" confirmation opens |
| 37 | And the confirmation offers Resume Setup and Exit and Discard |  | "Resume Setup" and "Exit and Discard" are shown |
| 38 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created |
