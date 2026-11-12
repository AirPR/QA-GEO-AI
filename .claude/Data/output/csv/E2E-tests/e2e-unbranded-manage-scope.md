# e2e-unbranded-manage-scope

- **Spec:** `.claude/Data/raw/playwright/e2e-unbranded-manage-scope.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-UNBRANDED-SCOPE-001](#e2e-unbranded-scope-001) | Manage Scope of an unbranded analysis: fixed topic, unbranded types, Other on inline selects (read-only) | NEW | GEO-1242, GEO-1246, GEO-1247 |

---

## E2E-UNBRANDED-SCOPE-001

**Manage Scope of an unbranded analysis: fixed topic, unbranded types, Other on inline selects (read-only)**

| Field | Value |
|---|---|
| Status | NEW; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | End-to-end: Manage Scope of an unbranded analysis: fixed topic, unbranded types, Other on inline selects (read-only). Pass 1 — per epic (GEO-1209). Consolidates TC-GEO-1242-014, TC-GEO-1246-003, TC-GEO-1247-012. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): UA = bike d3fd1b30 (the "Postal services" analysis is not on staging), so the topic reads "bike". |
| Priority | High |
| Stories | GEO-1242, GEO-1246, GEO-1247 |
| Precondition | Analysis UA (staging: bike d3fd1b30) with prompts in Other on type and on category; Read-only (Add prompt opened then cancelled, nothing saved) |
| Labels | e2e-suite |
| QA Parent | GEO-1209 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PARTIAL 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user opens Manage Scope |  | Manage Scope is displayed |
| 2 | Then the topic is shown read-only |  | "bike" is displayed with no edit control, as the brand of a brand analysis |
| 3 | And the topic cannot be changed |  | No field, button or menu lets the user change the topic or the analysis mode |
| 4 | When the user clicks Add prompt and opens the type select |  | The select lists Visibility, Competitive, Category Topics and Other only |
| 5 | And the user cancels and opens the type select of an existing row |  | The select lists Visibility, Competitive, Category Topics and Other only; on a row already in Other, Other is the current value of the select and the list shows Visibility, Competitive and Category Topics |
| 6 | Then no Reputation or Brand Image type is offered |  | Neither "Reputation" nor "Brand Image" in either select |
| 7 | When the user opens Prompts |  | The prompt table is displayed |
| 8 | Then the prompt Other on its type shows an inline Type select |  | Type cell: inline select reading "Other" |
| 9 | And the prompt Other on its category shows an inline Category select |  | Category cell: inline select reading "Other" |
