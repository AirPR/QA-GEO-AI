# e2e-geo-analytics-dashboard

- **Spec:** `.claude/Data/raw/playwright/e2e-geo-analytics-dashboard.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-GEO-DASHBOARD-001](#e2e-geo-dashboard-001) | GEO Analytics Dashboard displays correctly | UPDATE | GEO-95, GEO-1240, GEO-1243 |

---

## E2E-GEO-DASHBOARD-001

**GEO Analytics Dashboard displays correctly**

| Field | Value |
|---|---|
| Status | UPDATE — confirmed by the user 2026-10-28; subtitle and ANALYSES stat card aligned on the observed result 2026-11-05 (user decision, not a bug) |
| Description | GEO dashboard (analyses list) structure: heading, subtitle, New Analysis, 6 stat cards, Analysis table and totals. Scenario rebuilt from the test()/test.step() texts of e2e-geo-analytics-dashboard.spec.js (no archive CSV); expected results = the step texts. Updated 2026-10-28: the table now has the "Prompts" column after Categories (TC-GEO-1240-004) and the "Brand / Topic" header with the unbranded flag ON (TC-GEO-1243-014) — confirmed by the user 2026-10-28. Aligned 2026-11-05 on the MCP run of 02/11 (user decision, not a bug): the neutral subtitle "Monitor your presence across AI search engines" is intended (GEO-1243, decision Q8, for organisations with unbranded analyses), and the 4th stat card is labelled "ANALYSES" (GEO-1240, 27/10, agreed with the PO). Covered in 1.3. Consolidates spec E2E-GEO95-001 - GEO Analytics Dashboard displays correctly, TC-GEO-1240-004, TC-GEO-1243-014. Former id: E2E-GEO95-001. |
| Priority | High |
| Stories | GEO-95, GEO-1240, GEO-1243 |
| Precondition | Authenticated Editor (USE_AUTH=true), staging, interface language en-GB, unbranded flag ON |
| Labels | e2e-suite |
| QA Parent | GEO-105 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 02/11 (MCP) — expected results updated 2026-11-05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor opens the GEO Analytics Dashboard | URL: BASE_URL (GEO dashboard) | An authenticated Editor opens the GEO Analytics Dashboard |
| 2 | Then the heading GEO Analytics Dashboard is visible |  | The heading GEO Analytics Dashboard is visible |
| 3 | And the subtitle Monitor your presence across AI search engines is visible | Neutral subtitle (GEO-1243 Q8) | The subtitle Monitor your presence across AI search engines is visible |
| 4 | And the New Analysis button is visible |  | The New Analysis button is visible |
| 5 | And the 6 stat cards COUNTRIES CATEGORIES COMPETITORS ANALYSES PROMPTS SOURCES are displayed | Card label "ANALYSES" (GEO-1240) | The 6 stat cards COUNTRIES CATEGORIES COMPETITORS ANALYSES PROMPTS SOURCES are displayed |
| 6 | And the Analysis table is visible with columns Brand / Topic Countries Categories Prompts Last update and Actions | Flag ON: first header "Brand / Topic" (TC-GEO-1243-014); "Prompts" right after "Categories" (TC-GEO-1240-004) | The Analysis table is visible with columns Brand / Topic Countries Categories Prompts Last update and Actions |
| 7 | Then the CATEGORIES stat card total equals the sum of category chips displayed in the table |  | The CATEGORIES stat card total equals the sum of category chips displayed in the table |
| 8 | And the ANALYSES stat card total equals the number of rows in the Analysis table | Show more / Show all to list every analysis if the table is truncated (TC-GEO-1240-004 test data) | The ANALYSES stat card total equals the number of rows in the Analysis table |
