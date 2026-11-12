# e2e-brand-visuals

- **Spec:** `.claude/Data/raw/playwright/e2e-brand-visuals.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-BRAND-VISUALS-001](#e2e-brand-visuals-001) | Brand visuals across analyses: lettermark for a custom brand without website, topic letter for unbranded | NEW | GEO-1263, GEO-1243 |

---

## E2E-BRAND-VISUALS-001

**Brand visuals across analyses: lettermark for a custom brand without website, topic letter for unbranded**

| Field | Value |
|---|---|
| Status | NEW; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | End-to-end: Brand visuals across analyses: lettermark for a custom brand without website, topic letter for unbranded. Pass 2 — cross-epic (scenario 204). Assumptions: Generic globe on the list (scenario 204) needs an analysis on a site without favicon: open point. Epics: GEO-1069, GEO-1209. Consolidates TC-GEO-1263-003, TC-GEO-1243-014. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): UA = bike d3fd1b30 on staging (the "Postal services" analysis does not exist there) — letter "B" + "bike". |
| Priority | High |
| Stories | GEO-1263, GEO-1243 |
| Precondition | Analysis A2 (custom brand created without website, GEO-1069 runs) and UA (staging QA-GEO: unbranded analysis bike d3fd1b30) |
| Labels | e2e-suite |
| QA Parent | GEO-1069 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PARTIAL 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user opens the report list |  | The A2 row shows the letter "L", not a logo searched by the brand name |
| 2 | And the user opens the Overview of A2 |  | The dashboard sidebar and header show the letter "L", not the favicon of D |
| 3 | Then the target brand row of the brand rankings in Overview shows the letter "L" |  | Letter "L", not the favicon of D |
| 4 | When the user opens a Category view | First category of A2 | The target brand row of the rankings shows the letter "L" |
| 5 | And the user opens a competitive view | e.g. the competitor comparison of A2 | The target brand shows the letter "L" |
| 6 | Then UA shows the topic with its first letter |  | A letter avatar "B" and "bike" (first letter of the topic) |
| 7 | And no domain is shown for UA |  | No domain or website under the topic |
| 8 | And brand analyses keep their logo and domain |  | Brand rows are unchanged |
