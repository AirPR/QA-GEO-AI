# e2e-category-brand-prioritization

- **Spec:** `.claude/Data/raw/playwright/e2e-category-brand-prioritization.spec.js`
- **Active scenarios:** 6 · **Retired:** 2
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-CAT-PRIORITIZATION-001](#e2e-cat-prioritization-001) | Category brand matrix is displayed | KEEP | GEO-69 |
| [E2E-CAT-PRIORITIZATION-002](#e2e-cat-prioritization-002) | Category brand matrix updates when LLM filter changes | KEEP | GEO-69 |
| [E2E-CAT-PRIORITIZATION-003](#e2e-cat-prioritization-003) | Hovering a data point shows brand metrics in tooltip | UPDATE | GEO-69 |
| [E2E-CAT-PRIORITIZATION-004](#e2e-cat-prioritization-004) | All markets view shows multiple brand data points | UPDATE | GEO-69 |
| [E2E-CAT-PRIORITIZATION-007](#e2e-cat-prioritization-007) | Quadrant legend shows all four quadrants with counts | KEEP | GEO-69 |
| [E2E-CAT-PRIORITIZATION-008](#e2e-cat-prioritization-008) | Brand tooltip metrics match category KPI cards | UPDATE | GEO-69 |

---

## E2E-CAT-PRIORITIZATION-001

**Category brand matrix is displayed**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verifies that the category brand matrix is displayed for the selected category. Consolidates archive GEO-69-TC001 (GEO-69). Former id: GEO-69-TC001. Archived in GEO-R1.0/e2e-category-brand-prioritization.csv. |
| Priority | Medium |
| Stories | GEO-69 |
| Precondition | An Editor is authenticated and opens a category view |
| Labels | geo-101,category-view,matrix |
| QA Parent | GEO-69 |
| Components / QA Component | Category Views / Brand matrix |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an Editor opens a category view | Category view | The category context is available |
| 2 | When the matrix loads | Brand matrix load | The matrix is rendered |
| 3 | Then the Brand Prioritization Matrix is shown with category-scoped data | Category-scoped matrix | The matrix shows only the current category data |

---

## E2E-CAT-PRIORITIZATION-002

**Category brand matrix updates when LLM filter changes**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verifies that the category brand matrix updates when LLM filter changes. Consolidates archive GEO-69-TC002 (GEO-69). Former id: GEO-69-TC002. Archived in GEO-R1.0/e2e-category-brand-prioritization.csv. |
| Priority | Medium |
| Stories | GEO-69 |
| Precondition | An Editor is authenticated and has active LLM filters |
| Labels | geo-101,category-view,matrix,filters |
| QA Parent | GEO-69 |
| Components / QA Component | Category Views / Filter respect |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given LLM filters are applied | Applied LLM filters | The category view is already scoped |
| 2 | When the LLM filter is changed | LLM filter change | A different LLM engine is toggled |
| 3 | Then the matrix reflects the new LLM filter scope and remains visible | Filtered matrix | The matrix data matches the LLM filter scope |

---

## E2E-CAT-PRIORITIZATION-003

**Hovering a data point shows brand metrics in tooltip**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | Covers GEO-69 AC2 - a tooltip displays brand name and metrics on hover. Consolidates archive GEO-69-TC003 (GEO-69). Former id: GEO-69-TC003. Archived in GEO-R1.0/e2e-category-brand-prioritization.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): UI label 'win rate' → 'AI Choice' (tooltip 'Visibility / AI Choice / SOV / Position'). |
| Priority | Medium |
| Stories | GEO-69 |
| Precondition | The matrix is populated |
| Labels | geo-101,category-view,matrix |
| QA Parent | GEO-69 |
| Components / QA Component | Category Views / Brand matrix |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the matrix is populated | Matrix populated | Brands and data points are visible |
| 2 | When a user hovers over a data point | Hover data point | Mouse moves over an SVG circle |
| 3 | Then brand metrics are accessible on the scatter (SOV, AI Choice, %) | Brand metrics accessible — tooltip e.g. 'Toyota (Target) \| Visibility 93% \| AI Choice 100% \| SOV 14% \| Position #1.1' (the point aria-label still reads 'win rate') | Scatter exposes brand name, SOV%, AI Choice% in accessible text (hover tooltip) |

---

## E2E-CAT-PRIORITIZATION-004

**All markets view shows multiple brand data points**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | Covers GEO-69 AC4 - All markets shows multiple brand data points. Consolidates archive GEO-69-TC004 (GEO-69). Former id: GEO-69-TC004. Archived in GEO-R1.0/e2e-category-brand-prioritization.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): market → country wording (GEO-1514). |
| Priority | Medium |
| Stories | GEO-69 |
| Precondition | All Countries filter is active (default) |
| Labels | geo-101,category-view,matrix |
| QA Parent | GEO-69 |
| Components / QA Component | Category Views / Brand matrix |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given All Countries filter (default state) | Default All Countries state | No specific country filter applied |
| 2 | When the matrix loads | Matrix load | Data points are rendered |
| 3 | Then multiple brand data points are shown across countries | Multiple data points | More than one data point visible |

---

## E2E-CAT-PRIORITIZATION-007

**Quadrant legend shows all four quadrants with counts**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (GEO-1524 Passed QA); the archive row is split over 3 CSV lines — merged when normalised; broken archive row repaired in this copy only |
| Description | Covers GEO-69 AC7 - quadrant legend shows Stars/Opportunity/At Risk/Monitor with counts. Consolidates archive GEO-69-TC007 (GEO-69). Former id: GEO-69-TC007. Archived in GEO-R1.0/e2e-category-brand-prioritization.csv. Broken archive row (priority and Test name missing) repaired in this copy. |
| Priority | Medium |
| Stories | GEO-69 |
| Precondition | The matrix data is loaded |
| Labels | geo-101,category-view,matrix |
| QA Parent | GEO-69 |
| Components / QA Component | Category Views / Brand matrix |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the matrix data loaded | Matrix loaded | The chart is fully rendered |
| 2 | When the quadrant legend section is rendered | Legend rendered | Cards below the chart are visible |
| 3 | Then all four quadrant cards are visible with a numeric count: Stars N, Opportunity N, At Risk N, Monitor N | All quadrant cards visible | Stars, Opportunity, At Risk, Monitor cards each show a count |
| 4 | And the N values in each quadrant legend card match the count of brand data points in that quadrant of the chart | Legend counts match chart | Each quadrant legend count (Stars N / Opportunity N / At Risk N / Monitor N) equals the number of brand data points plotted in that quadrant |

---

## E2E-CAT-PRIORITIZATION-008

**Brand tooltip metrics match category KPI cards on a 1-day period and a single country**

| Field | Value |
|---|---|
| Status | UPDATE — confirmed by the user 2026-10-28; aligned 2026-11-04 (user decision); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that the Brand Prioritization tooltip metrics for a target brand match the category KPI cards (Visibility, Avg Position). Updated 2026-10-28: Share of Voice comparison removed (no SOV KPI card since R1.1, GEO-663), user decision. Aligned 2026-11-04 (user decision): KPI cards pool the whole selected period, while the Brand Prioritization Matrix (like Brand Rankings and the other non-KPI widgets) shows the last day of the period only — PM decision of 07/07 (GEO-577), confirmed by the dev on GEO-1210 (Abandoned for this reason). The matrix has one point per brand and country, so it is compared with the KPI cards filtered on that same country, on a 1-day period (single snapshot). A gap on a multi-day period is expected behaviour, not a bug (MCP run 04/11, 7 days: France 98% / #1.6 vs 100% / #1.4). Reference check on staging, Toyota, 03/11, 1 day, Category View France: KPI vs Toyota fr-FR matrix point 100% / 100%, #1.375 / #1.375, AI Choice 85 / 85. Consolidates archive GEO-69-TC008 (GEO-69). Former id: GEO-69-TC008. Archived in GEO-R1.0/e2e-category-brand-prioritization.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides, target brand Toyota (Running Shoes / Adidas Adizero not on staging). |
| Priority | Medium |
| Stories | GEO-69 |
| Precondition | An Editor is authenticated and opens the GEO Analytics dashboard for a category (e.g., Toyota › Voitures hybrides, 439acd96 / 21a79173); the date range is set to a 1-day period (single snapshot) and the country filter to a single country |
| Labels | geo-101,category-view,matrix,tooltip,kpi |
| QA Parent | GEO-69 |
| Components / QA Component | Category Views / Brand matrix |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the GEO Analytics dashboard for a category (e.g., Toyota › Voitures hybrides) filtered on a 1-day period and a single country displays the KPI cards (Visibility, Avg Position) | Date range: 1 day (single snapshot, e.g. 'Latest report'); Country: one country (e.g., France) | The KPI cards Visibility and Avg Position are displayed at the top of the page with their values for that day and country |
| 2 | When the user hovers over the data point for the target brand (Toyota) and the selected country in the Brand Prioritization Matrix | Hover the target brand point of the selected country (e.g., fr-FR) | The tooltip is shown for the target brand and country with its metrics (Visibility, Position) |
| 3 | Then the tooltip Visibility and Position values are identical to the KPI cards | Tooltip matches KPIs (same day, same country) | Tooltip Visibility = card Visibility; tooltip Position = card Avg Position |

---

## Retired scenarios (no steps — kept for traceability)

| Scenario | Title | Reason |
|---|---|---|
| E2E-CAT-PRIORITIZATION-005 | [SKIP] Specific market shows only brands from that market | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-PRIORITIZATION-006 | [SKIP] Brand matrix shows empty state when no visibility data exists | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
