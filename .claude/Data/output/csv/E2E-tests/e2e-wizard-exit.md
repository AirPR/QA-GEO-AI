# e2e-wizard-exit

- **Spec:** `.claude/Data/raw/playwright/e2e-wizard-exit.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-WIZARD-EXIT-001](#e2e-wizard-exit-001) | Leave and switch the wizard across modes without losing or leaking choices | NEW | GEO-1238, GEO-1241 |

---

## E2E-WIZARD-EXIT-001

**Leave and switch the wizard across modes without losing or leaking choices**

| Field | Value |
|---|---|
| Status | NEW; aligned on the observed result 2026-11-04 (user decision) |
| Description | End-to-end: Leave and switch the wizard across modes without losing or leaking choices. Pass 2 — cross-epic (scenario 194). Assumptions: The "this brand" / "this topic" wording of scenario 194 has no TC: not asserted (open point). Epics: GEO-1002, GEO-1209. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): step 3 — Back on Brand & Country returns to Analysis Type (the 5-step wizard starts with Analysis Type); a second Back shows the dashboard. Consolidates TC-GEO-1238-003, TC-GEO-1241-008, TC-GEO-1241-009, TC-GEO-1238-001. |
| Priority | High |
| Stories | GEO-1238, GEO-1241 |
| Precondition | Nothing is created |
| Labels | e2e-suite |
| QA Parent | GEO-1002 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP) — TC aligned on the observed result |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has just opened the wizard and entered nothing |  | Brand & Country is empty |
| 2 | When the user clicks Back to Dashboard |  | The GEO dashboard is displayed with no confirmation |
| 3 | And the user opens the wizard again and clicks Back on Brand & Country, then Back on Analysis Type |  | Back on Brand & Country returns to step 1 Analysis Type (still /geo/new) with no confirmation; Back on Analysis Type then displays the GEO dashboard with no confirmation |
| 4 | Given the user created an unbranded scope up to the Categories step | Topic: "Postal services"; markets GB (EN), FR (FR); categories C1, C2 discovered | Categories shows C1 and C2 and the pill reads "Unbranded analysis" |
| 5 | When the user goes back to Analysis Type and selects "Brand analysis" |  | The confirmation opens |
| 6 | And the user cancels the confirmation |  | The confirmation closes |
| 7 | Then the mode is unchanged |  | The Unbranded analysis card is selected and the pill reads "Unbranded analysis" |
| 8 | When the user goes back to Analysis Type | Click step "Analysis Type" in the stepper | Analysis Type shows Unbranded analysis selected |
| 9 | And the user selects "Brand analysis" |  | A confirmation opens |
| 10 | Then the confirmation states what is cleared |  | The text starts with "Switching the mode clears your brand or topic, your countries, your categories and your prompts." |
| 11 | When the user confirms |  | The pill reads "Brand analysis" and the user continues to Brand & Country |
| 12 | Then the later steps are cleared |  | Brand & Country has no brand and none of the previous markets; Categories and Prompts hold none of the previous categories and prompts |
| 13 | Given the user is on Brand & Country and has entered a brand and a market | Brand "Decathlon"; market GB (EN) | The entries are shown |
| 14 | When the user clicks Back to Dashboard |  | The "Exit setup?" confirmation opens |
| 15 | Then the confirmation states that exiting discards every choice since there is no draft |  | The message names "Decathlon", says there is no draft and that every choice is discarded |
| 16 | And the confirmation offers Resume Setup and Exit and Discard |  | "Resume Setup" and "Exit and Discard" are shown |
| 17 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created |
