# e2e-verify-analysis

- **Spec:** `.claude/Data/raw/playwright/e2e-verify-analysis.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-VERIFY-001](#e2e-verify-001) | Find a brand analysis on the GEO dashboard with its prompt pool and open it | UPDATE | GEO-104, GEO-1240, GEO-1243 |

---

## E2E-VERIFY-001

**Find a brand analysis on the GEO dashboard with its prompt pool and open it**

| Field | Value |
|---|---|
| Status | UPDATE — GEO dashboard now shows the pool block, a Prompts column and the "Brand / Topic" header — behaviour change (confirmed at the gate); TC-GEO-1240-001 step 3: align once GEO-1546 ships |
| Description | End-to-end: Find a brand analysis on the GEO dashboard with its prompt pool and open it. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate (new GEO-R1.3 wizard / dashboard). Assumptions: The Prompts column sum covers brand and unbranded analyses (scenario 196: one pool for both types). Known bugs: TC-GEO-1240-001 step 3 names the "N analyses" label next to the ring: GEO-1546 (Ready for QA) removes the duplicated label from the Analysis table header — align once GEO-1546 ships. Consolidates archive E2E-VERIFY-001, TC-GEO-1240-001, TC-GEO-1240-004, TC-GEO-1243-014. Former id: E2E-VERIFY-001. Archived in GEO-R1.0/e2e-verify-analysis.csv. |
| Priority | High |
| Stories | GEO-104, GEO-1240, GEO-1243 |
| Precondition | Analysis created by E2E-MARKETS-1LLM-001 (YSL, US + FR, Claude) or the JDD_PROFILE analysis; Unbranded flag ON (column "Brand / Topic") |
| Labels | e2e,verify,reports-list,dashboard |
| QA Parent | GEO-104 |
| Components / QA Component | Reports list / E2E verify |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the reports list | Navigation URL: BASE_URL | The reports list page is displayed with all existing analyses |
| 2 | Then a pool block is shown in the header of the Analysis table |  | Next to the number of analyses (e.g. "5 analyses"), the ring reads "U / P" |
| 3 | When the user hovers the ring |  | The popover splits used (U) and free (P - U) slots |
| 4 | Then a "Prompts" column is shown after Categories |  | "Prompts" header right after "Categories" |
| 5 | And the column adds up to the pool block | Sum of the Prompts column (Show more to list every analysis) | The sum equals U of the pool block "U / P" |
| 6 | When the list shows analysis UA |  | The column header reads "Brand / Topic" |
| 7 | And brand analyses keep their logo and domain |  | Brand rows are unchanged |
| 8 | When the Editor locates the brand row in the reports list | Brand name: configured via JDD_PROFILE (e.g. Dyson | YVES SAINT LAURENT) |
| 9 | When the Editor clicks on the brand analysis row | Click on the brand row | The browser navigates to a dashboard URL of the form /dashboard/{uuid} |
| 10 | Then the URL matches the pattern /dashboard/{uuid} | URL pattern: /dashboard/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX | The current URL contains /dashboard/ followed by a valid UUID |
| 11 | And the dashboard page shows the market United States | Expected market: United States | The text United States is visible on the dashboard page |
| 12 | And the dashboard page shows the market France | Expected market: France | The text France is visible on the dashboard page |
| 13 | And the dashboard page shows the LLM Claude | Expected LLM: Claude | The text Claude is visible on the dashboard page indicating the LLM engine used |
| 14 | And the dashboard page shows exactly 1 LLM engine | LLM count: 1 | Only 1 LLM engine (Claude) is referenced on the dashboard — no other LLM names (ChatGPT Gemini Grok Perplexity) are visible |
