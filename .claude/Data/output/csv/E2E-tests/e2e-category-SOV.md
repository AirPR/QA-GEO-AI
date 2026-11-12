# e2e-category-SOV

- **Spec:** `.claude/Data/raw/playwright/e2e-category-SOV.spec.js`
- **Active scenarios:** 3
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-CATEGORY-SOV-001](#e2e-category-sov-001) | Category: KPI row shows exactly 4 cards without SOV and layout reflows cleanly | KEEP | GEO-663 |
| [E2E-CATEGORY-SOV-002](#e2e-category-sov-002) | Category: Brand Rankings table has no SoV% column | KEEP | GEO-663 |
| [E2E-CATEGORY-SOV-003](#e2e-category-sov-003) | SOV dedicated card renders below KPI row on Category view | KEEP | GEO-664 |

---

## E2E-CATEGORY-SOV-001

**Category: KPI row shows exactly 4 cards without SOV and layout reflows cleanly**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-663-002 - Category: KPI row shows exactly 4 cards without SOV and layout reflows cleanly. Consolidates archive TC-GEO-663-002 (GEO-663). Former id: TC-GEO-663-002. Archived in GEO-R1.0/e2e-category-SOV.csv. |
| Priority | High |
| Stories | GEO-663 |
| Precondition |  |
| Labels | Category page loads successfully |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is authenticated and navigates to a Category view | Valid user credentials | Category view URL |
| 2 | When the Performance KPI row renders |  | KPI row is visible |
| 3 | Then it shows the same 4 KPI cards: Visibility, Avg Position, AI Choice, Sentiment — and no Share of Voice card | Expected cards: Visibility / Avg Position / AI Choice / Sentiment | 4 KPI cards present |
| 4 | And the KPI row layout reflows cleanly for 4 cards with no broken grid or empty cell |  | Row renders without visual gap, broken grid, or empty placeholder where SOV used to be |

---

## E2E-CATEGORY-SOV-002

**Category: Brand Rankings table has no SoV% column**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision) |
| Description | TC-GEO-663-004 - Category: Brand Rankings table has no SoV% column. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): column label 'LLM Choice%' renamed 'AI Choice %' (observed Rank | Brand | Visibility % | Avg Position | AI Choice %). Consolidates archive TC-GEO-663-004 (GEO-663). Former id: TC-GEO-663-004. Archived in GEO-R1.0/e2e-category-SOV.csv. |
| Priority | High |
| Stories | GEO-663 |
| Precondition |  |
| Labels | Category page loads successfully |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is authenticated and navigates to a Category view | Valid user credentials | Category view URL |
| 2 | When the Brand Rankings table renders |  | Brand Rankings table is visible |
| 3 | Then the table columns are exactly: Rank, Brand, Visibility %, Avg Position, AI Choice % | Expected columns: Rank / Brand / Visibility % / Avg Position / AI Choice % | Table header shows exactly those 5 columns |
| 4 | And there is no SoV% column header and no SoV% cell in any parent or variant row |  | No SoV% column header or data cell is rendered anywhere in the table |

---

## E2E-CATEGORY-SOV-003

**SOV dedicated card renders below KPI row on Category view**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-002 - SOV dedicated card renders below KPI row on Category view. Consolidates archive TC-GEO-664-002 (GEO-664). Former id: TC-GEO-664-002. Archived in GEO-R1.0/e2e-category-SOV.csv. |
| Priority | High |
| Stories | GEO-664 |
| Precondition |  |
| Labels | Category page loads successfully |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is authenticated and navigates to a Category view with data available | Valid user credentials | Category view URL with response data |
| 2 | When the page finishes loading |  | Page is fully loaded |
| 3 | Then a full-width Share of Voice card is visible directly below the KPI card row |  | Full-width SOV card is positioned immediately below the KPI row |
| 4 | And the card displays the title Share of Voice and the subtitle By brand, your brand is highlighted |  | Card header reads Share of Voice |
