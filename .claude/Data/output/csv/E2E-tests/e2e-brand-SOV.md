# e2e-brand-SOV

- **Spec:** `.claude/Data/raw/playwright/e2e-brand-SOV.spec.js`
- **Active scenarios:** 13
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-BRAND-SOV-001](#e2e-brand-sov-001) | Overview: KPI row shows exactly 4 cards without SOV | KEEP | GEO-663 |
| [E2E-BRAND-SOV-002](#e2e-brand-sov-002) | Overview: Brand Rankings table has no SoV% column | KEEP | GEO-663 |
| [E2E-BRAND-SOV-003](#e2e-brand-sov-003) | Brand Rankings default sort is Visibility% descending with correct Rank order | KEEP | GEO-663 |
| [E2E-BRAND-SOV-004](#e2e-brand-sov-004) | No SOV-related tooltips or i18n keys are visible after removal | KEEP | GEO-663 |
| [E2E-BRAND-SOV-005](#e2e-brand-sov-005) | SOV dedicated card renders below KPI row on Overview | KEEP | GEO-664 |
| [E2E-BRAND-SOV-006](#e2e-brand-sov-006) | Doughnut shows top 10 brands + Others slice with callouts and legend | KEEP | GEO-664 |
| [E2E-BRAND-SOV-007](#e2e-brand-sov-007) | Target brand in top 10: arc emphasized and center label shows brand SOV | KEEP | GEO-664 |
| [E2E-BRAND-SOV-008](#e2e-brand-sov-008) | Target brand not in top 10: center label still shows brand SOV from KPI | KEEP | GEO-664 |
| [E2E-BRAND-SOV-009](#e2e-brand-sov-009) | Empty state displayed when scope has no responses | KEEP | GEO-664 |
| [E2E-BRAND-SOV-010](#e2e-brand-sov-010) | Error state shows reload button that re-fetches inline | KEEP | GEO-664 |
| [E2E-BRAND-SOV-011](#e2e-brand-sov-011) | Loading skeleton occupies chart area while data is fetching | KEEP | GEO-664 |
| [E2E-BRAND-SOV-012](#e2e-brand-sov-012) | Filter changes recompute doughnut callouts legend and center label | KEEP | GEO-664 |
| [E2E-BRAND-SOV-013](#e2e-brand-sov-013) | Doughnut with 10 or fewer brands shows no Others slice | KEEP | GEO-664 |

---

## E2E-BRAND-SOV-001

**Overview: KPI row shows exactly 4 cards without SOV**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-663-001 - Overview: KPI row shows exactly 4 cards without SOV. Consolidates archive TC-GEO-663-001 (GEO-663). Former id: TC-GEO-663-001. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-663 |
| Precondition |  |
| Labels | Overview page loads successfully |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is authenticated and navigates to the Overview dashboard | Valid user credentials | Overview dashboard URL |
| 2 | When the Performance KPI row renders |  | KPI row is visible |
| 3 | Then exactly 4 KPI cards are displayed in order: Visibility, Avg Position, AI Choice, Sentiment | Expected cards: Visibility / Avg Position / AI Choice / Sentiment | 4 KPI cards visible in the correct order |
| 4 | And no Share of Voice KPI card is rendered |  | No SOV card is present anywhere in the KPI row |
| 5 | And no Good/Fair/Poor quality pill for Share of Voice is rendered |  | No SOV quality pill (Good / Fair / Poor) is visible on the page |

---

## E2E-BRAND-SOV-002

**Overview: Brand Rankings table has no SoV% column**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-663-003 - Overview: Brand Rankings table has no SoV% column. Consolidates archive TC-GEO-663-003 (GEO-663). Former id: TC-GEO-663-003. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-663 |
| Precondition |  |
| Labels | Overview page loads successfully |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is authenticated and navigates to the Overview dashboard | Valid user credentials | Overview dashboard URL |
| 2 | When the Brand Rankings table renders |  | Brand Rankings table is visible |
| 3 | Then the table columns are exactly: Rank, Brand, Visibility %, Avg Position, AI Choice % | Expected columns: Rank / Brand / Visibility % / Avg Position / AI Choice % | Table header shows exactly those 5 columns in order |
| 4 | And there is no SoV% column header and no SoV% cell in any parent or variant row |  | No SoV% column header exists |

---

## E2E-BRAND-SOV-003

**Brand Rankings default sort is Visibility% descending with correct Rank order**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-663-005 - Brand Rankings default sort is Visibility% descending with correct Rank order. Consolidates archive TC-GEO-663-005 (GEO-663). Former id: TC-GEO-663-005. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-663 |
| Precondition |  |
| Labels | Brand Rankings table visible |
| QA Parent | GEO-640 |
| Components / QA Component | functional / GEO |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is on the Overview or a Category view with the Brand Rankings table visible | Overview or Category view URL | no explicit user sort applied |
| 2 | When no explicit user sort is applied |  | Default sort is in effect |
| 3 | Then the table rows are ordered by Visibility% descending |  | Row with the highest Visibility% appears first |
| 4 | And the Rank column reflects that order with rank 1 assigned to the brand with the highest Visibility% |  | Rank 1 = highest Visibility% |
| 5 | And the target brand highlight (trophy icon / YOU badge + amber row) is still rendered correctly |  | Target brand row is highlighted with amber background and YOU badge or trophy icon |

---

## E2E-BRAND-SOV-004

**No SOV-related tooltips or i18n keys are visible after removal**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-663-006 - No SOV-related tooltips or i18n keys are visible after removal. Consolidates archive TC-GEO-663-006 (GEO-663). Former id: TC-GEO-663-006. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | Medium |
| Stories | GEO-663 |
| Precondition |  |
| Labels | Page renders successfully |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is on the Overview or a Category view after the SOV removal | Valid user credentials | Overview or Category view |
| 2 | When the KPI row and Brand Rankings table are rendered |  | KPI row and Brand Rankings table are visible |
| 3 | Then no SOV-specific tooltip text or raw i18n key placeholder is visible in the UI |  | No Share of Voice tooltip remnant is shown |

---

## E2E-BRAND-SOV-005

**SOV dedicated card renders below KPI row on Overview**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-001 - SOV dedicated card renders below KPI row on Overview. Consolidates archive TC-GEO-664-001 (GEO-664). Former id: TC-GEO-664-001. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-664 |
| Precondition |  |
| Labels | Overview page loads successfully |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is authenticated and navigates to the Overview dashboard with data available | Valid user credentials | Overview dashboard URL with response data |
| 2 | When the page finishes loading |  | Page is fully loaded |
| 3 | Then a full-width Share of Voice card is visible directly below the KPI card row |  | Full-width SOV card is positioned immediately below the 4-card KPI row |
| 4 | And the card displays the title Share of Voice and the subtitle By brand, your brand is highlighted |  | Card header reads Share of Voice |
| 5 | And a doughnut chart comparing the target brand against top competitors is rendered inside the card |  | Doughnut chart is visible with multiple colored arcs |

---

## E2E-BRAND-SOV-006

**Doughnut shows top 10 brands + Others slice with callouts and legend**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-003 - Doughnut shows top 10 brands + Others slice with callouts and legend. Consolidates archive TC-GEO-664-003 (GEO-664). Former id: TC-GEO-664-003. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-664 |
| Precondition |  |
| Labels | functional |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the SOV doughnut chart is rendered with data containing more than 10 brands | Scope with more than 10 brands having SOV data | SOV card is visible with the doughnut rendered |
| 2 | When the chart finishes rendering |  | Doughnut arcs are fully drawn |
| 3 | Then the doughnut shows exactly the top 10 brands by SOV descending plus one Others slice aggregating all remaining share | Top 10 brands by SOV + Others residual | 11 arcs rendered (top 10 + Others) |
| 4 | And each arc >= ~2% displays an outside percentage callout |  | Callouts are visible outside arcs with SOV >= ~2% |
| 5 | And arcs with a value below ~2% have their callout hidden but their brand still appears in the legend | Brands with SOV < ~2% | No callout shown for small arcs |
| 6 | And a bottom-centered legend lists each brand with a color dot, name, and bold SOV percentage ordered by SOV desc with Others last |  | Legend is bottom-centered |

---

## E2E-BRAND-SOV-007

**Target brand in top 10: arc emphasized and center label shows brand SOV**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-004 - Target brand in top 10: arc emphasized and center label shows brand SOV. Consolidates archive TC-GEO-664-004 (GEO-664). Former id: TC-GEO-664-004. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-664 |
| Precondition |  |
| Labels | functional |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the SOV doughnut renders and the target brand is among the top 10 brands by SOV | Scope where the target brand ranks in the top 10 by SOV | SOV doughnut is visible |
| 2 | When the doughnut finishes rendering |  | All arcs are drawn |
| 3 | Then the target brand's arc is structurally emphasized (e.g. larger radius) relative to competitor arcs |  | Target brand arc is visually larger than competitor arcs (structural emphasis, not color-only) |
| 4 | And the persistent center label shows the target brand's name, SOV value, and Share of Voice — even when it is not the largest slice | Target brand not necessarily the largest slice | Center label always reads target brand name + SOV% + Share of Voice regardless of which arc is largest |

---

## E2E-BRAND-SOV-008

**Target brand not in top 10: center label still shows brand SOV from KPI**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-005 - Target brand not in top 10: center label still shows brand SOV from KPI. Consolidates archive TC-GEO-664-005 (GEO-664). Former id: TC-GEO-664-005. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-664 |
| Precondition |  |
| Labels | functional |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | SKIP 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the SOV doughnut renders and the target brand is NOT among the top 10 brands by SOV | Scope where the target brand's SOV ranks below top 10 | SOV doughnut is visible |
| 2 | When the doughnut finishes rendering |  | All arcs are drawn |
| 3 | Then the center label still shows the target brand's name and SOV value sourced from the KPI shareOfVoice field |  | Center label reads target brand name + correct SOV% |
| 4 | And no arc is popped out or highlighted for the target brand — its share is absorbed into Others |  | No dedicated slice is shown for the target brand |

---

## E2E-BRAND-SOV-009

**Empty state displayed when scope has no responses**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-006 - Empty state displayed when scope has no responses. Consolidates archive TC-GEO-664-006 (GEO-664). Former id: TC-GEO-664-006. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-664 |
| Precondition |  |
| Labels | functional |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | SKIP 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user is on the Overview or a Category view where the selected scope returns no responses | Scope/filters configured to return zero responses | Page is accessible |
| 2 | When the SOV card would render |  | SOV card area is rendered |
| 3 | Then the SOV card displays an empty state message such as No data to show or Adjust your filters or widen the date range to see this metric inside the card |  | Empty state message is visible inside the SOV card |
| 4 | And no misleading 0% value is displayed |  | The chart does not render a 0% value or an empty doughnut |

---

## E2E-BRAND-SOV-010

**Error state shows reload button that re-fetches inline**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-007 - Error state shows reload button that re-fetches inline. Consolidates archive TC-GEO-664-007 (GEO-664). Former id: TC-GEO-664-007. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-664 |
| Precondition |  |
| Labels | SOV card area is visible |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | SKIP 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the SOV chart data fails to load (network error or server error) | Simulated chart load failure | Page is accessible |
| 2 | When the card renders after the failure |  | SOV card has attempted to load data and failed |
| 3 | Then the card keeps its Share of Voice header and shows an error state with a crossed-chart icon, Couldn't load this chart message, helper text, and a Reload button |  | Card header visible |
| 4 | When the user clicks the Reload button |  | Reload button is clicked |
| 5 | Then the chart re-fetches its data inline without triggering a full page reload |  | Page does not fully reload |

---

## E2E-BRAND-SOV-011

**Loading skeleton occupies chart area while data is fetching**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-008 - Loading skeleton occupies chart area while data is fetching. Consolidates archive TC-GEO-664-008 (GEO-664). Former id: TC-GEO-664-008. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | Medium |
| Stories | GEO-664 |
| Precondition |  |
| Labels | Page navigation is initiated |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | GEO / Functional |
| UI/Functional · Test type | Functional · Automated |
| Last result | SKIP 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user navigates to the Overview or a Category view and the SOV chart request is in flight | Overview or Category view URL | slow or pending network response for SOV data |
| 2 | When the SOV data request is still in progress |  | Network request for SOV data has not yet resolved |
| 3 | Then a loading skeleton is displayed in the chart area of the SOV card |  | Skeleton placeholder occupies the doughnut area |

---

## E2E-BRAND-SOV-012

**Filter changes recompute doughnut callouts legend and center label**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-009 - Filter changes recompute doughnut callouts legend and center label. Consolidates archive TC-GEO-664-009 (GEO-664). Former id: TC-GEO-664-009. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | High |
| Stories | GEO-664 |
| Precondition |  |
| Labels | functional |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the SOV doughnut chart is rendered with a given scope (market, category, engine, period) | SOV doughnut visible with initial scope data | SOV card is visible with the doughnut rendered |
| 2 | When the user updates any filter (market, category, engine, or period) |  | Filter value is changed |
| 3 | Then the doughnut arcs, outside callouts, legend entries, and center label all recompute and refresh to reflect the new scope |  | Doughnut updates with new data |

---

## E2E-BRAND-SOV-013

**Doughnut with 10 or fewer brands shows no Others slice**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) |
| Description | TC-GEO-664-010 - Doughnut with 10 or fewer brands shows no Others slice. Consolidates archive TC-GEO-664-010 (GEO-664). Former id: TC-GEO-664-010. Archived in GEO-R1.0/e2e-brand-SOV.csv. |
| Priority | Medium |
| Stories | GEO-664 |
| Precondition |  |
| Labels | functional |
| QA Parent | GEO-640 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | SKIP 03/07 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the SOV doughnut renders with a scope containing 10 or fewer brands with SOV data | Scope with exactly 10 or fewer brands | SOV card is visible |
| 2 | When the chart finishes rendering |  | All arcs are drawn |
| 3 | Then all present brands are shown as individual arcs and no Others slice is displayed |  | No Others entry in the legend |
