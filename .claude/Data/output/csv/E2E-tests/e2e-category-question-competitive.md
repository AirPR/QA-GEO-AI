# e2e-category-question-competitive

- **Spec:** `.claude/Data/raw/playwright/e2e-category-question-competitive.spec.js`
- **Active scenarios:** 4
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-QUESTION-COMPETITIVE-001](#e2e-question-competitive-001) | Winner = Brand Name → Won all engines | KEEP | GEO-716, GEO-668 |
| [E2E-QUESTION-COMPETITIVE-002](#e2e-question-competitive-002) | Winner = Competitor Name → Lost all engines | KEEP | GEO-716, GEO-668 |
| [E2E-QUESTION-COMPETITIVE-003](#e2e-question-competitive-003) | Winner = Lost plain text → Lost all engines | KEEP | GEO-716, GEO-668 |
| [E2E-QUESTION-COMPETITIVE-004](#e2e-question-competitive-004) | Winner = Split badge → per-engine mix, Split never per-engine | KEEP | GEO-716, GEO-668 |

---

## E2E-QUESTION-COMPETITIVE-001

**Winner = Brand Name → Won all engines**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | E2E - Competitive: Winner = Brand Name → detail panel shows Won (green) for all active LLM engines. Consolidates archive E2E-COMP-WN-01 (GEO-716, GEO-668). Former id: E2E-COMP-WN-01. Archived in GEO-R1.0/e2e-category-question-competitive.csv. |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Toyota Hybrid Cars category loaded, Competitive tab active |
| Labels | E2E,Competitive,WinnerPanel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Competitive tab of a category where the tracked brand wins | Category: Hybrid Cars, Brand: Toyota, Winner column = brand name (bold span.font-medium.text-slate-900) |  |
| 2 | When I find a row where the Winner column shows the brand name (e.g., Toyota) |  |  |
| 3 | Then the detail panel shows Won (green) badge for every active LLM engine |  | Winner column: brand name with favicon. Detail panel: all LLM engine pills show Won (green) badge. |

---

## E2E-QUESTION-COMPETITIVE-002

**Winner = Competitor Name → Lost all engines**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | E2E - Competitive: Winner = Competitor Name → detail panel shows Lost (red) for all active LLM engines. Consolidates archive E2E-COMP-WN-02 (GEO-716, GEO-668). Former id: E2E-COMP-WN-02. Archived in GEO-R1.0/e2e-category-question-competitive.csv. |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Competitive tab active, at least one competitor-winner row exists in Electric Cars category |
| Labels | E2E,Competitive,WinnerPanel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Competitive tab where a competitor brand wins | Category: Electric Cars, Brand: Toyota (absent), Winner column = competitor name (span.text-slate-700:not(.font-medium)) |  |
| 2 | When I find a row where the Winner column shows a competitor brand name (e.g., Tesla) |  |  |
| 3 | Then the detail panel shows Lost (red) badge for every active LLM engine |  | Winner column: competitor name (e.g., Tesla). Detail panel: all active LLM engine pills show Lost (red) badge. |

---

## E2E-QUESTION-COMPETITIVE-003

**Winner = Lost plain text → Lost all engines**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | E2E - Competitive: Winner = 'Lost' plain text → detail panel shows Lost (red) for all active LLM engines. Consolidates archive E2E-COMP-WN-03 (GEO-716, GEO-668). Former id: E2E-COMP-WN-03. Archived in GEO-R1.0/e2e-category-question-competitive.csv. |
| Priority | High |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Competitive tab active, at least one 'Lost' plain-text winner row exists across Electric Cars / SUVs categories |
| Labels | E2E,Competitive,WinnerPanel,LostPlain |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Competitive tab where the Winner column shows plain 'Lost' text (no badge border) | Categories: Electric Cars → SUVs (searched in order), Brand: Toyota (absent), Winner column = plain 'Lost' text (span.text-slate-400.text-sm) |  |
| 2 | When I find a row where the Winner column shows span.text-slate-400.text-sm with text 'Lost' |  |  |
| 3 | Then the detail panel shows Lost (red) badge for every active LLM engine |  | Winner column: plain 'Lost' text (no badge border, no competitor name). Detail panel: all active LLM engine pills show Lost (red) badge. |

---

## E2E-QUESTION-COMPETITIVE-004

**Winner = Split badge → per-engine mix, Split never per-engine**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | E2E - Competitive: Winner = Split badge (orange) → detail panel shows per-engine individual Won/Lost, Split never appears as per-engine label. Consolidates archive E2E-COMP-WN-04 (GEO-716, GEO-668). Former id: E2E-COMP-WN-04. Archived in GEO-R1.0/e2e-category-question-competitive.csv. |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Competitive tab active, at least one Split-winner row exists across SUVs / Electric Cars categories |
| Labels | E2E,Competitive,WinnerPanel,Split |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Competitive tab where LLMs give different competitive results for the brand | Categories: SUVs → Electric Cars (searched in order), Brand: Toyota (mixed results), Winner column = orange Split badge (span[class*='border-orange-200']) |  |
| 2 | When I find a row where the Winner column shows the orange Split badge |  |  |
| 3 | Then each engine independently shows its result (Won/Lost) — Split never appears as a per-engine label in the panel |  | Winner column: orange Split badge. Detail panel: each LLM engine shows its individual badge (Won/Lost). Split never appears as a per-engine label — it is only an aggregate label in the Winner column. At least one Won and one Lost engine confirmed. |
