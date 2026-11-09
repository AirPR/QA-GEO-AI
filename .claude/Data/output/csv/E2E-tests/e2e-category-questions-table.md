# e2e-category-questions-table

- **Spec:** `.claude/Data/raw/playwright/e2e-category-questions-table.spec.js`
- **Active scenarios:** 13 · **Retired:** 3
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-CAT-QUESTIONS-TABLE-001](#e2e-cat-questions-table-001) | Questions table shows grouped questions and key columns | KEEP | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-002](#e2e-cat-questions-table-002) | Visibility favorability labels are displayed | UPDATE | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-003](#e2e-cat-questions-table-003) | Competitive favorability labels are displayed | UPDATE | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-004](#e2e-cat-questions-table-004) | Perception rows show theme badges, sentiment only in the detail panel | UPDATE | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-005](#e2e-cat-questions-table-005) | Questions table filters by favorability | KEEP | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-006](#e2e-cat-questions-table-006) | Expanding a question row shows detailed evidence panel | KEEP | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-007](#e2e-cat-questions-table-007) | Perception rows show themes without favorability or rank badges | UPDATE | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-008](#e2e-cat-questions-table-008) | Search input filters question rows by text | KEEP | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-009](#e2e-cat-questions-table-009) | Filters button opens favorability filter panel | UPDATE | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-010](#e2e-cat-questions-table-010) | Visibility row detail panel shows LLM rank badges and sources | KEEP | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-011](#e2e-cat-questions-table-011) | Competitive row detail panel shows win/loss, chosen brand, About and Sources | KEEP | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-012](#e2e-cat-questions-table-012) | Perception row detail panel shows sentiment and theme badges | KEEP | GEO-67 |
| [E2E-CAT-QUESTIONS-TABLE-014](#e2e-cat-questions-table-014) | Table recalculates when LLM filter changes | KEEP | GEO-67 |

---

## E2E-CAT-QUESTIONS-TABLE-001

**Questions table shows grouped questions and key columns**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verifies that the unified questions table groups questions by type and shows the expected columns. Consolidates archive GEO-67-TC001 (GEO-67). Former id: GEO-67-TC001. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | An Editor is authenticated and navigates to the category URL |
| Labels | geo-101,questions-table,display |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Question grouping,Question details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an Editor navigates to the category view | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The category page loads |
| 2 | When the questions table loads | Questions section renders | The questions section is visible |
| 3 | Then the questions table is visible with question rows showing question text, type tabs (Visibility / Competitive / Perception) and per-LLM badges | Table with question rows, type tabs, LLM badges | The table is rendered with at least one question row and question type tabs visible |

---

## E2E-CAT-QUESTIONS-TABLE-002

**Visibility favorability labels are displayed**

| Field | Value |
|---|---|
| Status | UPDATE — status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1) — behaviour change (confirmed at the gate) |
| Description | Verifies that favorability labels are derived correctly for visibility questions. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1); driven by step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04. Consolidates archive GEO-67-TC002 (GEO-67). Former id: GEO-67-TC002. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | Medium |
| Stories | GEO-67 |
| Precondition | An Editor is authenticated and the table contains visibility questions |
| Labels | geo-101,questions-table,favorability |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Favorability rules |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the questions table contains visibility questions | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The questions table is loaded with visibility questions visible |
| 2 | When the Visibility tab is selected | Click the Visibility type tab | The table filters to show only Visibility questions |
| 3 | Then at least one favorability badge is visible on a visibility question row (Favorable / Unfavorable / Unranked) | Favorability badge: Favorable, Unfavorable or Unranked | At least one favorability badge is visible on a visibility question row |

---

## E2E-CAT-QUESTIONS-TABLE-003

**Competitive favorability labels are displayed**

| Field | Value |
|---|---|
| Status | UPDATE — status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1) — behaviour change (confirmed at the gate) |
| Description | Verifies that favorability labels are derived correctly for competitive questions. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1); driven by step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04. Consolidates archive GEO-67-TC003 (GEO-67). Former id: GEO-67-TC003. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | Medium |
| Stories | GEO-67 |
| Precondition | An Editor is authenticated and the table contains competitive questions |
| Labels | geo-101,questions-table,favorability |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Favorability rules |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the questions table contains competitive questions | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The questions table is loaded with competitive questions visible |
| 2 | When the Competitive tab is selected | Click the Competitive type tab | The table filters to show only Competitive questions |
| 3 | Then at least one status (Won / Lost / Split) is visible on a competitive question row | Status: Won, Lost or Split | At least one status (Won / Lost / Split) is visible on a competitive question row |

---

## E2E-CAT-QUESTIONS-TABLE-004

**Perception rows show theme badges, sentiment only in the detail panel**

| Field | Value |
|---|---|
| Status | UPDATE — confirmed by the user 2026-10-28; aligned on the observed result 2026-11-04 (user decision) |
| Description | Verifies that favorability labels are derived correctly for perception questions. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1); driven by step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): Perception rows show only theme chips (+N) in 'Winner / Themes', no favorability badge (sentiment in the detail panel). Consolidates archive GEO-67-TC004 (GEO-67). Former id: GEO-67-TC004. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | Medium |
| Stories | GEO-67 |
| Precondition | An Editor is authenticated and the table contains perception questions |
| Labels | geo-101,questions-table,favorability |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Favorability rules |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP) — TC aligned on the observed result |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the questions table contains perception questions | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The questions table is loaded with perception questions visible |
| 2 | When the Perception tab is selected | Click the Perception type tab | The table filters to show only Perception questions |
| 3 | Then theme badges are displayed on the perception question rows and no favorability badge is shown on the rows | Theme chips (+N) in the 'Winner / Themes' column | At least one theme badge is visible on a perception question row; no Favorable / Neutral / Unfavorable badge is shown on the row (the sentiment is shown in the detail panel) |

---

## E2E-CAT-QUESTIONS-TABLE-005

**Questions table filters by favorability**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verifies that the questions table can filter rows by favorability. Consolidates archive GEO-67-TC005 (GEO-67). Former id: GEO-67-TC005. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | Medium |
| Stories | GEO-67 |
| Precondition | An Editor is authenticated and the table contains multiple question outcomes |
| Labels | geo-101,questions-table,filters |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Favorability filter |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the questions table is loaded with questions of different favorability values | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The questions table is visible with multiple rows |
| 2 | When the Editor opens the Filters panel and selects the Favorable filter | Click the Filters button and select Favorable | The favorability filter is applied |
| 3 | Then only Favorable questions remain visible in the table | Filtered rows showing only Favorable questions | The table shows only rows with a Favorable badge |

---

## E2E-CAT-QUESTIONS-TABLE-006

**Expanding a question row shows detailed evidence panel**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verifies that expanding a question row shows the detailed evidence panel. Consolidates archive GEO-67-TC006 (GEO-67). Former id: GEO-67-TC006. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | Medium |
| Stories | GEO-67 |
| Precondition | An Editor is authenticated and questions are visible in the table |
| Labels | geo-101,questions-table,expand-row |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Row details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the questions table is loaded with at least one question row | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The questions table is visible with at least one collapsed question row |
| 2 | When the Editor clicks on a question row to expand it | Click the first question row | The row expands and a detail panel appears below it |
| 3 | Then the expanded detail panel is visible with LLM context buttons, ranking or sentiment content, and at least one source | Detail panel with LLM buttons + content + sources | The detail panel is visible and contains LLM buttons and source content |

---

## E2E-CAT-QUESTIONS-TABLE-007

**Perception rows show themes without favorability or rank badges**

| Field | Value |
|---|---|
| Status | UPDATE — confirmed by the user 2026-10-28; aligned on the observed result 2026-11-04 (user decision) |
| Description | Covers AC4 — perception question rows show sentiment favorability and theme badges with no rank badges. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1); driven by step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): 25/25 Perception rows show theme chips and no rank badge, and none shows a favorability badge. Consolidates archive GEO-67-TC007 (GEO-67). Former id: GEO-67-TC007. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | Perception questions are displayed in the table |
| Labels | geo-101,questions-table,display |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Question grouping,Question details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP) — TC aligned on the observed result |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given perception questions are displayed in the questions table | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The Perception tab is active and perception questions are visible |
| 2 | When the table renders each perception row | Perception tab selected | Each perception row is rendered |
| 3 | Then each perception row shows at least one theme badge, and no favorability badge and no numeric rank badge are shown | Theme chips (+N) on perception row, no favorability badge, no rank badge | Each perception row has theme badges (+N when there are more). No Favorable / Neutral / Unfavorable badge and no numeric rank badge (#N) is shown on perception rows |

---

## E2E-CAT-QUESTIONS-TABLE-008

**Search input filters question rows by text**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Covers AC5 — the table filters rows by question text via the Search input (client-side filter). Consolidates archive GEO-67-TC008 (GEO-67). Former id: GEO-67-TC008. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | An Editor is searching questions |
| Labels | geo-101,questions-table,display |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Question grouping,Question details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the questions table is loaded | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The questions table is visible with multiple rows |
| 2 | When the Editor types a keyword in the "Search questions..." input field | Type a keyword matching at least one question in the search input | The table rows are filtered in real time as the Editor types |
| 3 | Then the visible rows are reduced to only those containing the search keyword, and no backend request is triggered | Only matching rows visible after search input | The table shows only rows containing the typed keyword |

---

## E2E-CAT-QUESTIONS-TABLE-009

**Filters button opens favorability filter panel**

| Field | Value |
|---|---|
| Status | UPDATE — status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1) — behaviour change (confirmed at the gate) |
| Description | Covers AC6 — the Filters button opens a panel where Favorable / Neutral / Unfavorable can be selected and combined with tabs and search. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1); driven by step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04. Consolidates archive GEO-67-TC009 (GEO-67). Former id: GEO-67-TC009. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | An Editor is filtering by favorability |
| Labels | geo-101,questions-table,display |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Question grouping,Question details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the questions table is loaded | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The questions table is visible |
| 2 | When the Editor clicks the Filters button and selects a favorability option (Favorable / Unfavorable / Unranked) | Click the Filters button and select one favorability option | The filter panel opens and a favorability option is selected |
| 3 | Then the table filters accordingly and the filter is combinable with the question type tabs and the search bar | Table filtered by favorability; filter active indicator visible | The table rows are filtered to match the selected favorability and the filter is stackable with the type tab and search |

---

## E2E-CAT-QUESTIONS-TABLE-010

**Visibility row detail panel shows LLM rank badges and sources**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Covers AC7 — expanding a Visibility question row shows the detail panel with LLM rank badges and sources. Consolidates archive GEO-67-TC010 (GEO-67). Former id: GEO-67-TC010. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | An Editor is expanding a visibility question row |
| Labels | geo-101,questions-table,display |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Question grouping,Question details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Visibility tab is active and at least one visibility question is visible | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The Visibility tab is selected and visibility rows are displayed |
| 2 | When the Editor clicks to expand a visibility question row | Click the first visibility question row | The row expands and the detail panel appears |
| 3 | Then the detail panel shows per-LLM rank buttons at the top, a position/rank value, and at least one source entry | Detail panel: LLM buttons + position rank + sources | The detail panel is visible with LLM buttons and at least one source listed |

---

## E2E-CAT-QUESTIONS-TABLE-011

**Competitive row detail panel shows win/loss, chosen brand, About and Sources**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision) |
| Description | Covers AC8 — expanding a Competitive question row shows the detail panel with win/loss badges and full ranking. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): the Competitive panel shows engine pills, the Won/Lost result with the chosen brand, an 'About' section and Sources — no ranked list of entities (same layout as E2E-CAT-QUESTION-ANALYSIS-006). Consolidates archive GEO-67-TC011 (GEO-67). Former id: GEO-67-TC011. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | An Editor is expanding a competitive question row |
| Labels | geo-101,questions-table,display |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Question grouping,Question details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP) — TC aligned on the observed result |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Competitive tab is active and at least one competitive question is visible | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The Competitive tab is selected and competitive rows are displayed |
| 2 | When the Editor clicks to expand a competitive question row | Click the first competitive question row | The row expands and the detail panel appears |
| 3 | Then the detail panel shows per-LLM buttons, a win/loss result badge with the chosen brand, an 'About' section and the Sources | Detail panel: LLM buttons + Won/Lost badge + "{brand} was chosen" + 'ABOUT {product}' + Sources | The detail panel shows the engine buttons, the result badge (e.g. 'Lost' with 'Dacia Duster was chosen'), the 'ABOUT …' text (e.g. 'ABOUT TOYOTA YARIS CROSS') and the Sources list; no ranked list of entities is shown |

---

## E2E-CAT-QUESTIONS-TABLE-012

**Perception row detail panel shows sentiment and theme badges**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Covers AC9 — expanding a Perception question row shows the detail panel with sentiment badge and theme badges. Consolidates archive GEO-67-TC012 (GEO-67). Former id: GEO-67-TC012. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | An Editor is expanding a perception question row |
| Labels | geo-101,questions-table,display |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Question grouping,Question details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Perception tab is active and at least one perception question is visible | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The Perception tab is selected and perception rows are displayed |
| 2 | When the Editor clicks to expand a perception question row | Click the first perception question row | The row expands and the detail panel appears |
| 3 | Then the detail panel shows a sentiment badge (Positive / Mixed / Negative), at least one theme badge, and at least one source | Detail panel: sentiment badge + theme badges + sources | The detail panel is visible with a sentiment badge and at least one theme badge |

---

## E2E-CAT-QUESTIONS-TABLE-014

**Table recalculates when LLM filter changes**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Covers AC11 — the table recalculates status and favorability from the filtered LLM pool when an LLM is deselected. Consolidates archive GEO-67-TC014 (GEO-67). Former id: GEO-67-TC014. Archived in GEO-R1.0/e2e-category-questions-table.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | LLM filter changes |
| Labels | geo-101,questions-table,display |
| QA Parent | GEO-67 |
| Components / QA Component | Questions table / Question grouping,Question details |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the questions table is loaded with all LLM engines active | Category URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The questions table is visible with initial data from all LLMs |
| 2 | When the user deselects one LLM engine from the LLM engine filter | Toggle off one LLM engine in the filter | The filter change triggers a reload of the questions table |
| 3 | Then the questions table remains visible and reflects the updated status/favorability based on the filtered LLM pool only | Questions table updated after LLM deselection | The table is still visible and reflects data from the remaining active LLMs |

---

## Retired scenarios (no steps — kept for traceability)

| Scenario | Title | Reason |
|---|---|---|
| E2E-CAT-QUESTIONS-TABLE-013 | [SKIP] Table filters by selected market | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-QUESTIONS-TABLE-015 | [SKIP] Empty state message when no question data available | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-QUESTIONS-TABLE-016 | [SKIP] Error state shown with retry option on API failure | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
