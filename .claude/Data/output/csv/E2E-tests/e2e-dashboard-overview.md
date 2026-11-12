# e2e-dashboard-overview

- **Spec:** `.claude/Data/raw/playwright/e2e-dashboard-overview.spec.js`
- **Active scenarios:** 20
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-DASHBOARD-OVERVIEW-001](#e2e-dashboard-overview-001) | Sidebar layout is displayed | KEEP | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-002](#e2e-dashboard-overview-002) | Categories accordion is auto-expanded | KEEP | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-003](#e2e-dashboard-overview-003) | Active view is highlighted | KEEP | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-004](#e2e-dashboard-overview-004) | Sidebar navigation is SPA | UPDATE | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-005](#e2e-dashboard-overview-005) | Dashboard pages load within 5 seconds | UPDATE | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-006](#e2e-dashboard-overview-006) | Discard Changes modal appears | KEEP | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-007](#e2e-dashboard-overview-007) | Category sub-items stay displayed for non-category sections | KEEP | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-008](#e2e-dashboard-overview-008) | Report header shows the brand name and the date range picker | UPDATE | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-009](#e2e-dashboard-overview-009) | Report header has an Export button | UPDATE | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-010](#e2e-dashboard-overview-010) | AC3 it shows: back arrow next to brand image | UPDATE | GEO-79 |
| [E2E-DASHBOARD-OVERVIEW-011](#e2e-dashboard-overview-011) | Default country filter is All Countries | UPDATE | GEO-78 |
| [E2E-DASHBOARD-OVERVIEW-012](#e2e-dashboard-overview-012) | All engines activated at analysis creation are active by default | UPDATE | GEO-174 |
| [E2E-DASHBOARD-OVERVIEW-013](#e2e-dashboard-overview-013) | 4 identity cards present below InBrief | KEEP | GEO-174 |
| [E2E-DASHBOARD-OVERVIEW-014](#e2e-dashboard-overview-014) | Each card shows sentiment and 3 AI bullets | KEEP | GEO-174 |
| [E2E-DASHBOARD-OVERVIEW-015](#e2e-dashboard-overview-015) | Drill-in panel opens with All + one tab per engine in scope | UPDATE | GEO-174 |
| [E2E-DASHBOARD-OVERVIEW-016](#e2e-dashboard-overview-016) | Per-LLM tab shows raw bullets and engine-specific sources | UPDATE | GEO-174 |
| [E2E-DASHBOARD-OVERVIEW-017](#e2e-dashboard-overview-017) | AI Engines dropdown lists engines | UPDATE | GEO-78 |
| [E2E-DASHBOARD-OVERVIEW-018](#e2e-dashboard-overview-018) | AI Perception Summary is displayed | UPDATE | GEO-72 |
| [E2E-DASHBOARD-OVERVIEW-019](#e2e-dashboard-overview-019) | KPI cards are displayed | UPDATE | GEO-107 |
| [E2E-DASHBOARD-OVERVIEW-020](#e2e-dashboard-overview-020) | AC5 the card shows "N/A" with a muted style instead of 0 | KEEP | GEO-107 |

---

## E2E-DASHBOARD-OVERVIEW-001

**Sidebar layout is displayed**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Verifies that the dashboard layout shows the expected sidebar structure. Consolidates archive GEO-79-TC001 (GEO-79). Former id: GEO-79-TC001. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated and opens a completed report |
| Labels | geo-102,dashboard,sidebar |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Sidebar,Layout |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an Editor opens a completed report dashboard | Completed report dashboard | The dashboard is available |
| 2 | When the dashboard loads | Dashboard load | The dashboard renders |
| 3 | Then the sidebar shows Overview, Categories sub-items (auto-expanded), and Manage Scope entries | Sidebar menu | The expected sections are visible |

---

## E2E-DASHBOARD-OVERVIEW-002

**Categories accordion is auto-expanded**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Verifies that the Categories accordion is auto-expanded by the app on dashboard load. Consolidates archive GEO-79-TC002 (GEO-79). Former id: GEO-79-TC002. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | Medium |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated and on the dashboard |
| Labels | geo-102,dashboard,sidebar |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Sidebar navigation |
| Smoke / Regression | No / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the dashboard sidebar is visible | Sidebar visible | The sidebar is rendered |
| 2 | When the dashboard loads | Initial load | No user action is required — the accordion is open by default |
| 3 | Then category sub-items are listed under Categories (auto-expanded — no click needed) | Expanded categories | The category-specific entries are visible |

---

## E2E-DASHBOARD-OVERVIEW-003

**Active view is highlighted**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Verifies that the active dashboard view is highlighted in the sidebar. Consolidates archive GEO-79-TC003 (GEO-79). Former id: GEO-79-TC003. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | Medium |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated and on the dashboard |
| Labels | geo-102,dashboard,sidebar |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Sidebar navigation |
| Smoke / Regression | No / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on a dashboard view | View selected | One view is currently open |
| 2 | When the dashboard loads | Initial render | The current view is rendered |
| 3 | Then the current sidebar item is visually highlighted (aria-current=page) | Active state | The current section is visually active |

---

## E2E-DASHBOARD-OVERVIEW-004

**Sidebar navigation is SPA**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Verifies that switching dashboard views updates content without reloading the page and keeps filters applied. Consolidates archive GEO-79-TC004 (GEO-79). Former id: GEO-79-TC004. Archived in GEO-R1.0/e2e-dashboard-overview.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): "market and LLM filters" → "country and AI engine filters" (GEO-1514 / AI Engines filter). |
| Priority | High |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated and has active filters |
| Labels | geo-102,dashboard,spa |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / SPA navigation,Filter persistence |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor has active country and AI engine filters | Applied filters (e.g. Country = France, one engine toggled off) | The filters are already set |
| 2 | When the Editor clicks a different sidebar item | Sidebar navigation | The view changes |
| 3 | Then the content area updates without full page reload and the filters remain applied | SPA result | The new view is shown and the filters are preserved |

---

## E2E-DASHBOARD-OVERVIEW-005

**Dashboard pages load within 5 seconds**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision) |
| Description | Verifies that dashboard pages load within five seconds. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): limit set to 5 seconds (user decision); observed 2.15 s to full Overview content on 04/11. Consolidates archive GEO-79-TC005 (GEO-79). Former id: GEO-79-TC005. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | Medium |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated and opens a dashboard view |
| Labels | geo-102,dashboard,performance |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Performance |
| Smoke / Regression | No / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor opens a dashboard view | Dashboard page | The target view is available |
| 2 | When the page is requested | Page load | The dashboard content starts loading |
| 3 | Then the page loads within 5 seconds | Load time measured from the navigation to the end of the skeleton loaders (Overview content rendered) | The dashboard is rendered within 5 seconds |

---

## E2E-DASHBOARD-OVERVIEW-006

**Discard Changes modal appears**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Verifies that unsaved changes trigger the discard changes modal when navigating back. Consolidates archive GEO-79-TC006 (GEO-79). Former id: GEO-79-TC006. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated and has unsaved changes on the dashboard |
| Labels | geo-102,dashboard,unsaved-changes |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Discard modal |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | SKIP 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor has unsaved changes in the current view | Dirty state | The current view contains unsaved changes |
| 2 | When the Editor clicks Back or navigates away | Back action | The user attempts to leave the dirty view |
| 3 | Then a Discard Changes modal is shown | Discard modal | The modal is displayed |

---

## E2E-DASHBOARD-OVERVIEW-007

**Category sub-items stay displayed for non-category sections**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Verifies that category sub-items remain visible on non-category sections (Categories accordion stays expanded). Consolidates archive GEO-79-TC007 (GEO-79). Former id: GEO-79-TC007. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | Medium |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated and opens a completed report dashboard |
| Labels | geo-102,dashboard,sidebar |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Sidebar,Category Views |
| Smoke / Regression | No / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on Overview (a non-category section) | Sidebar with multiple sections | Overview is active and Categories accordion is auto-expanded |
| 2 | When the dashboard loads with Overview active | Initial load | Category sub-items stay rendered alongside Overview |
| 3 | Then the category sub-items remain visible — the accordion stays expanded across non-category sections | Sidebar navigation state | Category sub-items are visible in the UI |

---

## E2E-DASHBOARD-OVERVIEW-008

**Report header shows the brand name and the date range picker**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision) |
| Description | Verifies that the report header displays the brand name and logo with the date range picker (no generation date). Aligned 2026-11-04 on the MCP run of 04/11 (user decision): the generation date is no longer displayed; the header shows the brand name, its logo and the date range picker. Consolidates archive GEO-79-TC008 (GEO-79). Former id: GEO-79-TC008. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | Medium |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated and opens a completed report |
| Labels | geo-102,dashboard,header |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Report header |
| Smoke / Regression | No / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor opens a completed report | Report header | The report header section is rendered |
| 2 | When the dashboard loads | Header render | The header shows the report identity |
| 3 | Then the brand name (e.g. Toyota) with its logo and the date range picker are displayed in the top section | Brand name + logo, date range picker (e.g. 'Last 7 days') | The brand name, its logo and the date range picker are visible; no 'Generated <date>' label is displayed |

---

## E2E-DASHBOARD-OVERVIEW-009

**Report header has an Export button**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision) |
| Description | Verifies that the report header exposes the Export action (no Share button). Aligned 2026-11-04 on the MCP run of 04/11 (user decision): there is no Share button; only the Export button ('Export analysis') is checked. Consolidates archive GEO-79-TC009 (GEO-79). Former id: GEO-79-TC009. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | Medium |
| Stories | GEO-79 |
| Precondition | An Editor is authenticated on the report dashboard |
| Labels | geo-102,dashboard,actions |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Header actions |
| Smoke / Regression | No / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the report dashboard | Report header | The dashboard header is rendered |
| 2 | When the Editor inspects the top-right of the dashboard | Header actions visible | The action buttons are rendered |
| 3 | Then an Export button is visible and clickable | Export button: aria-label 'Export analysis' (download icon) | The Export button is interactive; no Share button is displayed |

---

## E2E-DASHBOARD-OVERVIEW-010

**AC3 it shows: back arrow next to brand image**

| Field | Value |
|---|---|
| Status | UPDATE — top bar "LLM filter badges" is now the "AI Engines" filter with its count badge (TC-GEO-1120-017) — label; aligned on the observed result 2026-11-04 (user decision) |
| Description | Covers GEO-79 AC3 - it shows: a back arrow (aria-label=Back to Analysis) next to the brand image. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: top bar "LLM filter badges" is now the "AI Engines" filter with its count badge (TC-GEO-1120-017); driven by step 3 → TC-GEO-1120-017. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): the generation date is no longer displayed (date range picker instead). Consolidates archive GEO-79-TC010 (GEO-79). Former id: GEO-79-TC010. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-79 |
| Precondition | the dashboard Top Section (brand bar) |
| Labels | geo-102,dashboard,sidebar |
| QA Parent | GEO-79 |
| Components / QA Component | GEO Module / Sidebar,Layout |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the dashboard Top Section (brand bar) | Standard user data | Precondition is satisfied |
| 2 | When the dashboard loads | Standard user data | Action is executed |
| 3 | Then it shows: a back arrow ("Back to Analysis") next to the brand image, the brand name, the date range picker and the AI Engines filter | Standard user data | It shows: a back arrow next to the brand image, the brand name, the date range picker (e.g. 'Last 7 days') and the AI Engines filter with its count badge; no generation date |

---

## E2E-DASHBOARD-OVERVIEW-011

**Default country filter is All Countries**

| Field | Value |
|---|---|
| Status | UPDATE — "All Markets" now reads "All Countries" (TC-GEO-1120-017, GEO-1514) — label; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that the default market filter scopes the dashboard to all markets. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: "All Markets" now reads "All Countries" (TC-GEO-1120-017, GEO-1514); driven by step 3 → TC-GEO-1120-017. Consolidates archive GEO-78-TC001 (GEO-78). Former id: GEO-78-TC001. Archived in GEO-R1.0/e2e-dashboard-overview.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): title and steps "market" → "country" (GEO-1514), aria-label "Country filter — All countries". |
| Priority | High |
| Stories | GEO-78 |
| Precondition | An Editor is authenticated and opens the dashboard |
| Labels | geo-102,filters,market |
| QA Parent | GEO-78 |
| Components / QA Component | GEO Module / Market filter |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an Editor opens the Overview page | Dashboard overview | The dashboard is displayed |
| 2 | When the dashboard loads with no country change | Default filter | The default selection is applied |
| 3 | Then the country filter is set to All Countries | All Countries (aria-label "Country filter — All countries") | The dashboard aggregates all countries |

---

## E2E-DASHBOARD-OVERVIEW-012

**All engines activated at analysis creation are active by default**

| Field | Value |
|---|---|
| Status | UPDATE — "LLM Engines" filter is now "AI Engines" (TC-GEO-1120-017) — label; aligned on the observed result 2026-11-04 (user decision); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verify that all engines activated during analysis creation are active on the dashboard by default. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: "LLM Engines" filter is now "AI Engines" (TC-GEO-1120-017); driven by steps 1-2 → TC-GEO-1120-017. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): all engines activated during analysis creation are toggled ON (Active) by default (Toyota: 4 ON, Claude OFF and disabled, badge 4). Consolidates archive IDENTITY-TC001. Former id: IDENTITY-TC001. Archived in GEO-R1.0/e2e-dashboard-overview.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): filter button aria-label "LLM engine filters" → "AI engine filters", data-testid "llm-dropdown-trigger". |
| Priority | High |
| Stories | GEO-174 |
| Precondition | User is authenticated and on the dashboard |
| Labels | identity,llm-filter,dashboard |
| QA Parent | GEO-174 |
| Components / QA Component | GEO Module / LLM filter |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user is on the Toyota dashboard | URL: /dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The dashboard loads and displays the Identity tab with the AI Engines filter |
| 2 | When the user opens the AI Engines filter dropdown | AI Engines filter button (aria-label=AI engine filters, data-testid=llm-dropdown-trigger) | The dropdown opens showing the list of AI engines with toggles |
| 3 | Then all engines activated during analysis creation are toggled ON (Active) by default | button[role="switch"] — engines of the analysis scope (Toyota: ChatGPT, Gemini, Grok, Perplexity) | Every engine activated at analysis creation has aria-checked=true; an engine not activated at creation (Toyota: Claude) is OFF and disabled; the badge in the filter button shows the number of active engines (Toyota: "4") |

---

## E2E-DASHBOARD-OVERVIEW-013

**4 identity cards present below InBrief**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Verify that 4 identity cards are displayed below the InBrief summary: Brand Image, Employer Brand, ESG / Sustainability, Leadership. Consolidates archive IDENTITY-TC002. Former id: IDENTITY-TC002. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-174 |
| Precondition | User is authenticated and dashboard is loaded |
| Labels | identity,cards,dashboard |
| QA Parent | GEO-174 |
| Components / QA Component | GEO Module / Identity cards display |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user is on the Toyota dashboard with the Identity tab active | URL: /dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The Identity tab is active and content is fully loaded |
| 2 | When the Identity section is fully rendered | InBrief block + 4 cards below it | The InBrief summary block is visible and 4 cards are rendered below |
| 3 | Then exactly 4 cards are visible with titles: Brand Image, Employer Brand, ESG / Sustainability, Leadership | span.font-semibold for each card title | All 4 card titles are present in the DOM: "Brand Image" / "Employer Brand" / "ESG / Sustainability" / "Leadership" |

---

## E2E-DASHBOARD-OVERVIEW-014

**Each card shows sentiment and 3 AI bullets**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Verify that each identity card displays a sentiment badge and an AI-generated summary with exactly 3 bullet points. Consolidates archive IDENTITY-TC003. Former id: IDENTITY-TC003. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-174 |
| Precondition | 4 identity cards are visible |
| Labels | identity,sentiment,bullets,dashboard |
| QA Parent | GEO-174 |
| Components / QA Component | GEO Module / Identity cards content |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user is on the Toyota dashboard with the 4 identity cards visible | URL: /dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The 4 identity cards are rendered and visible |
| 2 | When the cards are fully rendered | 4 identity cards DOM (span.font-semibold + sentiment badge + li elements) | All 4 cards are visible with their content loaded |
| 3 | Then each card displays a sentiment badge (Positive / Negative / Neutral / Mixed) and exactly 3 AI-generated bullet points | sentiment span + 3 li elements per card | Each of the 4 cards has 1 non-empty sentiment badge and exactly 3 non-empty bullet points |

---

## E2E-DASHBOARD-OVERVIEW-015

**Drill-in panel opens with All + one tab per engine in scope**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision) |
| Description | Verify that clicking an identity card opens a drill-in panel with the All tab + one tab per engine of the analysis scope. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): the panel shows one tab per engine of the scope (Toyota: All + 4 engines, no Claude). Consolidates archive IDENTITY-TC004. Former id: IDENTITY-TC004. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-174 |
| Precondition | 4 identity cards are visible |
| Labels | identity,drill-in,panel,dashboard |
| QA Parent | GEO-174 |
| Components / QA Component | GEO Module / Drill-in panel |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user is on the Toyota dashboard with the 4 identity cards visible | URL: /dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The 4 identity cards are visible |
| 2 | When the user clicks on the Brand Image card | span.font-semibold:has-text("Brand Image") | A lateral drill-in panel slides open on the right side of the screen |
| 3 | Then the panel displays the "All" tab + one tab per engine of the analysis scope | 1 "All" text button + 1 button with aria-label per engine in scope (Toyota: ChatGPT / Gemini / Grok / Perplexity) | The "All" tab and one tab per active engine are present and visible (Toyota: 5 tabs — All, ChatGPT, Gemini, Grok, Perplexity; no Claude tab, Claude not in scope) |

---

## E2E-DASHBOARD-OVERVIEW-016

**Per-LLM tab shows raw bullets and engine-specific sources**

| Field | Value |
|---|---|
| Status | UPDATE — aligned on the v0.2 PRD 2026-11-05 (user decision, not a 1.3 bug): one tab per engine of the analysis, per-engine bullets consolidated by Gemini, Grok may show no source in this panel |
| Description | Verify that switching to a specific LLM tab shows that engine's bullets and its specific cited sources. Updated 2026-11-05 after the MCP run of 30/10 (user decision): not a 1.3 bug — the scenario comes from v0.2 (GEO-174) and already failed on 03/07. Expected per the v0.2 PRD: tabs exist only for the engines of the analysis (no Claude tab when Claude is not one of its engines); the 3 bullets of each engine tab are an AI consolidation by Gemini (caption "Overview generated by artificial intelligence"), not the raw response array; Grok shows no source in this panel although the analysis has Grok sources — a known limitation of the Brand Image panel, not new. Outside the 1.3 scope. Consolidates archive IDENTITY-TC005. Former id: IDENTITY-TC005. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-174 |
| Precondition | Brand Image drill-in panel is open |
| Labels | identity,drill-in,llm-switch,sources |
| QA Parent | GEO-174 |
| Components / QA Component | GEO Module / Per-LLM drill-in |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has opened the Brand Image drill-in panel with the All tab active | Brand Image drill-in panel open — All tab selected | The panel is visible with the All tab active showing consolidated content |
| 2 | When the user switches to a specific LLM tab (ChatGPT, Gemini, Grok, Claude, Perplexity) | button[aria-label="ChatGPT"] \| "Gemini" \| "Grok" \| "Claude" \| "Perplexity" — only the engines of the analysis (e.g. Toyota: no Claude) | One tab per engine of the analysis (no Claude tab when Claude is not an analysis engine); the selected tab renders and the panel content updates for that engine |
| 3 | Then the panel shows that LLM's raw response array directly (no consolidation) and cited sources specific to that LLM | 3 li elements (bullets) + a[href] links (sources) — content must differ per engine | Each engine tab displays exactly 3 bullets distinct from the All view, consolidated by Gemini (caption "Overview generated by artificial intelligence", v0.2 PRD); ChatGPT, Gemini and Perplexity show at least 1 cited source specific to that engine; Grok may show no Sources block (known limitation of the Brand Image panel, not new) |

---

## E2E-DASHBOARD-OVERVIEW-017

**AI Engines dropdown lists engines**

| Field | Value |
|---|---|
| Status | UPDATE — "LLM Engines" dropdown is now "AI Engines" (TC-GEO-1120-017) — label; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that the LLM Engines filter dropdown displays all available engines. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: "LLM Engines" dropdown is now "AI Engines" (TC-GEO-1120-017); driven by step 3 → TC-GEO-1120-017. Consolidates archive GEO-78-TC007 (GEO-78). Former id: GEO-78-TC007. Archived in GEO-R1.0/e2e-dashboard-overview.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): title "LLM Engines dropdown" → "AI Engines dropdown". |
| Priority | Medium |
| Stories | GEO-78 |
| Precondition | An Editor is authenticated and on the dashboard |
| Labels | geo-102,filters,llm-dropdown |
| QA Parent | GEO-78 |
| Components / QA Component | GEO Module / LLM Engines dropdown |
| Smoke / Regression | No / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the dashboard | Dashboard | The dashboard is rendered |
| 2 | When the Editor opens the AI Engines dropdown | Open dropdown | The dropdown opens |
| 3 | Then the list of available LLMs is displayed with checkable items | AI Engines list | All LLMs are visible |

---

## E2E-DASHBOARD-OVERVIEW-018

**AI Perception Summary is displayed**

| Field | Value |
|---|---|
| Status | UPDATE — "AI Perception Summary" is now InBrief (logo "InBrief powered by AI Sense", image — TC-GEO-1243-002 / TC-GEO-1231-008 definitions) — label |
| Description | Verifies that the AI Perception Summary loads with the expected structured content. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: "AI Perception Summary" is now InBrief (logo "InBrief powered by AI Sense", image — TC-GEO-1243-002 / TC-GEO-1231-008 definitions); driven by steps 2-3 → TC-GEO-1231-008. Consolidates archive GEO-72-TC001 (GEO-72). Former id: GEO-72-TC001. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-72 |
| Precondition | An Editor is authenticated and opens the overview page |
| Labels | geo-102,executive-summary,overview |
| QA Parent | GEO-72 |
| Components / QA Component | GEO Module / Summary display |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PARTIAL 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an Editor opens the Overview page | Overview page | The overview is visible |
| 2 | When the InBrief section loads | Summary load | The summary section renders |
| 3 | Then the summary shows perception findings, key opportunities, and warnings about misperceptions | Structured summary | The executive summary is visible |

---

## E2E-DASHBOARD-OVERVIEW-019

**KPI cards are displayed**

| Field | Value |
|---|---|
| Status | UPDATE — "LLM Choice" card label is now "AI Choice" (archive TC-GEO-663-001, R1.1) — label |
| Description | Verifies that all KPI cards are displayed with title, subtitle, ring, value, and quality label. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: "LLM Choice" card label is now "AI Choice" (archive TC-GEO-663-001, R1.1); driven by step 3 → TC-GEO-663-001. Consolidates archive GEO-107-TC001 (GEO-107). Former id: GEO-107-TC001. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-107 |
| Precondition | An Editor is authenticated and opens the overview page |
| Labels | geo-102,kpis,overview |
| QA Parent | GEO-107 |
| Components / QA Component | GEO Module / KPI display |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an Editor opens the Overview page | Overview page | The overview is visible |
| 2 | When the KPI section loads | KPI load | The metrics are calculated |
| 3 | Then KPI cards are visible for Visibility, AI Choice, and Sentiment with their labels | KPI cards | The KPI cards are visible and labeled |

---

## E2E-DASHBOARD-OVERVIEW-020

**AC5 the card shows "N/A" with a muted style instead of 0**

| Field | Value |
|---|---|
| Status | KEEP — no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) |
| Description | Covers GEO-107 AC5 - the card shows "N/A" with a muted style instead of 0. Consolidates archive GEO-107-TC011 (GEO-107). Former id: GEO-107-TC011. Archived in GEO-R1.0/e2e-dashboard-overview.csv. |
| Priority | High |
| Stories | GEO-107 |
| Precondition | no data for a KPI type (e.g., no competitive responses yet) |
| Labels | geo-102,kpis,overview |
| QA Parent | GEO-107 |
| Components / QA Component | GEO Module / KPI display |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given no data is available for a KPI type (e.g., no competitive responses yet) | Standard user data | Precondition is satisfied |
| 2 | When KPIs load | Standard user data | Action is executed |
| 3 | Then at least one KPI card shows "N/A" indicating no data available | Standard user data | The card shows "N/A" with a muted style instead of 0 |
