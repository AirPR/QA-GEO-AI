# e2e-category-brand-rankings

- **Spec:** `.claude/Data/raw/playwright/e2e-category-brand-rankings.spec.js`
- **Active scenarios:** 6 · **Retired:** 3
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-CAT-RANKINGS-001](#e2e-cat-rankings-001) | Brand Rankings table is displayed for the category | UPDATE | GEO-68 |
| [E2E-CAT-RANKINGS-002](#e2e-cat-rankings-002) | Brand Rankings update when LLM filter changes | UPDATE | GEO-68 |
| [E2E-CAT-RANKINGS-003](#e2e-cat-rankings-003) | Parent row shows aggregated metrics and expandable variant badge | UPDATE | GEO-68 |
| [E2E-CAT-RANKINGS-004](#e2e-cat-rankings-004) | Target brand row is highlighted with amber/gold background | UPDATE | GEO-68 |
| [E2E-CAT-RANKINGS-006](#e2e-cat-rankings-006) | Table recalculates when LLM filter changes | UPDATE | GEO-68 |
| [E2E-CAT-RANKINGS-007](#e2e-cat-rankings-007) | All Markets filter aggregates data across all markets | UPDATE | GEO-68 |

---

## E2E-CAT-RANKINGS-001

**Brand Rankings table is displayed for the category**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | Verifies that the Brand Rankings table is displayed for the selected category. Consolidates archive GEO-68-TC001 (GEO-68). Former id: GEO-68-TC001. Archived in GEO-R1.0/e2e-category-brand-rankings.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags 89f17431 not on staging). |
| Priority | Medium |
| Stories | GEO-68 |
| Precondition | An Editor is authenticated and navigates to the category URL |
| Labels | geo-101,category-view,brand-rankings |
| QA Parent | GEO-68 |
| Components / QA Component | Category Views / Brand rankings |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an Editor navigates to the category Brand Rankings URL | Category URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis 89f17431 does not exist on staging) | The category page loads and the Performance tab is visible |
| 2 | When the rankings section loads | Rankings section render | The Brand Rankings section is visible on the page |
| 3 | Then the Brand Rankings table is shown with at least one brand row for the current category | Category-scoped rankings table | The table is rendered and contains at least one brand row |

---

## E2E-CAT-RANKINGS-002

**Brand Rankings update when LLM filter changes**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | Verifies that the Brand Rankings table updates when the LLM engine filter changes. Consolidates archive GEO-68-TC002 (GEO-68). Former id: GEO-68-TC002. Archived in GEO-R1.0/e2e-category-brand-rankings.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags 89f17431 not on staging); engine filter = AI Engines menu. |
| Priority | Medium |
| Stories | GEO-68 |
| Precondition | An Editor is authenticated and the Brand Rankings table is loaded |
| Labels | geo-101,category-view,brand-rankings,filters |
| QA Parent | GEO-68 |
| Components / QA Component | Category Views / Filter respect |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the category Brand Rankings table is loaded | Category URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis 89f17431 does not exist on staging) | The Brand Rankings table is visible with initial data |
| 2 | When the LLM engine filter is changed | Toggle one engine in the AI Engines menu (aria-label 'AI engine filters', data-testid 'llm-dropdown-trigger') | The filter is applied and a reload is triggered |
| 3 | Then the Brand Rankings table remains visible and reflects the updated LLM filter scope | Updated rankings after LLM filter change | The table is still visible and its data reflects the new LLM filter scope |

---

## E2E-CAT-RANKINGS-003

**Parent row shows aggregated metrics and expandable variant badge**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Covers AC2 — the parent row shows aggregated metrics and an expandable +N badge for brand variants. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): Share of Voice column removed (GEO-663) — step 3 checks the rank and Visibility % instead; observed columns Rank | Brand | Visibility % | Avg Position | AI Choice %. Consolidates archive GEO-68-TC003 (GEO-68). Former id: GEO-68-TC003. Archived in GEO-R1.0/e2e-category-brand-rankings.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags 89f17431 not on staging). |
| Priority | Medium |
| Stories | GEO-68 |
| Precondition | The Brand Rankings table is loaded |
| Labels | geo-101,category-view,brand-rankings |
| QA Parent | GEO-68 |
| Components / QA Component | Category Views / Brand rankings |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Brand Rankings table is loaded with brand data | Category URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis 89f17431 does not exist on staging) | The Brand Rankings table is visible |
| 2 | When the table renders | Brand Rankings table rendered | The table rows are visible |
| 3 | Then each visible brand row shows a rank and a Visibility % value, and there is no SOV % column | Columns: Rank / Brand / Visibility % / Avg Position / AI Choice % | Each brand row has a rank (number, or the trophy icon on the target brand row) and a numeric Visibility % value; no SOV % column header or cell is shown (removed by GEO-663) |

---

## E2E-CAT-RANKINGS-004

**Target brand row is highlighted with amber/gold background**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | Covers AC3 — the target brand row is visually highlighted with a warm yellow/gold background. Consolidates archive GEO-68-TC004 (GEO-68). Former id: GEO-68-TC004. Archived in GEO-R1.0/e2e-category-brand-rankings.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags 89f17431 not on staging). |
| Priority | Medium |
| Stories | GEO-68 |
| Precondition | User is authenticated and Brand Rankings table is loaded |
| Labels | geo-101,category-view,brand-rankings |
| QA Parent | GEO-68 |
| Components / QA Component | Category Views / Brand rankings |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Brand Rankings table is loaded | Category URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis 89f17431 does not exist on staging) | The Brand Rankings table is visible |
| 2 | When the table renders | Brand Rankings table rendered | The table rows are visible |
| 3 | Then the target brand row has a warm yellow/gold (amber) background highlight that distinguishes it from other rows | Visual amber/gold highlight on target brand row (bg-amber-50) | At least one row in the table has an amber/yellow background class applied |

---

## E2E-CAT-RANKINGS-006

**Table recalculates when LLM filter changes**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | Covers AC5 — the table recalculates from the filtered LLM response pool when an LLM is deselected. Consolidates archive GEO-68-TC006 (GEO-68). Former id: GEO-68-TC006. Archived in GEO-R1.0/e2e-category-brand-rankings.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags 89f17431 not on staging); engine filter = AI Engines menu. |
| Priority | Medium |
| Stories | GEO-68 |
| Precondition | LLM filter active with all engines enabled |
| Labels | geo-101,category-view,brand-rankings |
| QA Parent | GEO-68 |
| Components / QA Component | Category Views / Brand rankings |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Brand Rankings table is loaded with all LLM engines active | Category URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis 89f17431 does not exist on staging) | The Brand Rankings table is visible with initial data from all LLMs |
| 2 | When the user deselects one LLM engine from the filter | Toggle off one engine in the AI Engines menu (aria-label 'AI engine filters', data-testid 'llm-dropdown-trigger'), e.g. ChatGPT | The filter change triggers a data reload |
| 3 | Then the Brand Rankings table recalculates and remains visible, reflecting the filtered LLM response pool | Rankings updated after LLM deselection | The table is still visible and reflects the updated data from the remaining active LLMs |

---

## E2E-CAT-RANKINGS-007

**All Markets filter aggregates data across all markets**

| Field | Value |
|---|---|
| Status | UPDATE — "All Markets" now reads "All Countries" (TC-GEO-1120-017, GEO-1514) — label; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Covers AC6 — with All Markets filter all visibility and competitive responses are aggregated across markets. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: "All Markets" now reads "All Countries" (TC-GEO-1120-017, GEO-1514); driven by steps 1, 3 → TC-GEO-1120-017. Consolidates archive GEO-68-TC007 (GEO-68). Former id: GEO-68-TC007. Archived in GEO-R1.0/e2e-category-brand-rankings.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags 89f17431 not on staging); market → country wording (GEO-1514). |
| Priority | Medium |
| Stories | GEO-68 |
| Precondition | "All Countries" filter active (default state) |
| Labels | geo-101,category-view,brand-rankings |
| QA Parent | GEO-68 |
| Components / QA Component | Category Views / Brand rankings |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the category view is loaded with the default All Countries scope | Category URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis 89f17431 does not exist on staging) | The category page loads in the default All Countries state |
| 2 | When the Brand Rankings table renders | Default All Countries scope, no specific country selected (Toyota category covers United States / France / Spain) | The Brand Rankings table is visible |
| 3 | Then the Brand Rankings table shows a unified brand list aggregated across all countries, not a per-country breakdown | Aggregated brand list across all countries, single ranking table | The table shows a single unified list of brands (not split per country) |

---

## Retired scenarios (no steps — kept for traceability)

| Scenario | Title | Reason |
|---|---|---|
| E2E-CAT-RANKINGS-005 | [SKIP] Table recalculates when market filter changes | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-RANKINGS-008 | [SKIP] Empty state message when no data available | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-RANKINGS-009 | [SKIP] Error state shown with retry option on API failure | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
