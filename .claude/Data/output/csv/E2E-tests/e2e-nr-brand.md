# e2e-nr-brand

- **Spec:** `.claude/Data/raw/playwright/e2e-nr-brand.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-NR-BRAND-001](#e2e-nr-brand-001) | A brand analysis keeps its Action Center entry and category Sentiment tile with the flag ON | NEW | GEO-1245, GEO-1269 |

---

## E2E-NR-BRAND-001

**A brand analysis keeps its Action Center entry and category Sentiment tile with the flag ON**

| Field | Value |
|---|---|
| Status | NEW; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | End-to-end: A brand analysis keeps its Action Center entry and category Sentiment tile with the flag ON. Pass 3 — non-regression (scenarios 208, 210, 211). Assumptions: Scenarios 208, 209, 216 and 217 are covered by the KEEP archive scenarios (dashboard overview, questions table / visibility / competitive, question analysis Perception tab, brand SOV). Epics: GEO-1209, GEO-1068. Consolidates TC-GEO-1245-001, TC-GEO-1269-010. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging test data named (BA / B = Toyota, C1 = Voitures hybrides). |
| Priority | High |
| Stories | GEO-1245, GEO-1269 |
| Precondition | Brand analysis BA, flag ON (staging QA-GEO: BA / B = Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, C1 = Voitures hybrides) |
| Labels | e2e-suite |
| QA Parent | GEO-1209 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user opens brand analysis BA |  | The sidebar is displayed |
| 2 | Then the brand analysis keeps its Action Center entry |  | "Action Center" is listed as today |
| 3 | Given the user is on the category page C1 of brand analysis B | Analysis B, category C1 (staging: Toyota › Voitures hybrides) | The category metrics are displayed |
| 4 | Then the Sentiment KPI tile is shown with its -100 to +100 value |  | The Sentiment tile is displayed among the category metrics with its aggregate value, as before the release |
| 5 | And the concept rows of the page show no per-concept score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "+86 sentiment") is shown on the Top Topics rows |
