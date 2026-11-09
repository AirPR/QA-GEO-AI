# e2e-category-kpi-cards

- **Spec:** `.claude/Data/raw/playwright/e2e-category-kpi-cards.spec.js`
- **Active scenarios:** 5
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-CAT-KPI-001](#e2e-cat-kpi-001) | Category view shows summary and KPI cards | UPDATE | GEO-70 |
| [E2E-CAT-KPI-002](#e2e-cat-kpi-002) | KPI cards show values and quality labels | UPDATE | GEO-70 |
| [E2E-CAT-KPI-003](#e2e-cat-kpi-003) | KPI cards update when LLM filter changes | UPDATE | GEO-70 |
| [E2E-CAT-KPI-004](#e2e-cat-kpi-004) | KPI card values format and (i) tooltip content | UPDATE | GEO-70 |
| [E2E-CAT-KPI-005](#e2e-cat-kpi-005) | KPI cards align with analyzed brand row in Brand Rankings on a 1-day period | UPDATE | GEO-70, GEO-398 |

---

## E2E-CAT-KPI-001

**Category view shows summary and KPI cards**

| Field | Value |
|---|---|
| Status | UPDATE — 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) — behaviour change (confirmed at the gate); aligned on the observed result 2026-11-04 (user decision) |
| Description | Verify that the category view shows the AI Perception Summary section and 5 KPI cards on page load. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010); driven by card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008). Aligned 2026-11-04 on the MCP run of 04/11 (user decision): the category page has no H1/H2 heading; the category name is shown as the active sidebar entry (observed on Toyota > Voitures hybrides). Consolidates archive KPI-TC001 (GEO-70). Former id: KPI-TC001. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. |
| Priority | High |
| Stories | GEO-70 |
| Precondition | Editor is authenticated |
| Labels | e2e,kpi,category-view |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP) — TC aligned on the observed result |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the luxury handbags category page | URL: /dashboard/edfe97e0-e55f-404c-99a4-0436af8524a1/category/0ee96af2-3e87-49a6-bc0d-8b42594b8715 | The category page loads with the Identity tab active |
| 2 | Then the category name 'luxury handbags' is shown as the active entry in the sidebar | Sidebar category entry (active) | The sidebar entry 'luxury handbags' is highlighted as the active view; the page itself has no H1/H2 heading with the category name |
| 3 | And the InBrief section is visible with its 'InBrief powered by AI Sense' logo | InBrief logo image | The InBrief block headed by the 'InBrief powered by AI Sense' logo (image) is visible |
| 4 | And 4 KPI cards are displayed: Visibility / Avg Position / AI Choice / Sentiment — and no Share of Voice card | div[aria-label] cards | 4 KPI cards are visible each identified by their aria-label |

---

## E2E-CAT-KPI-002

**KPI cards show values and quality labels**

| Field | Value |
|---|---|
| Status | UPDATE — 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) — behaviour change (confirmed at the gate) |
| Description | Verify that each KPI card displays a numeric value with unit and a quality label (Good / Fair / Poor). Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010); driven by card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008). Consolidates archive KPI-TC002 (GEO-70). Former id: KPI-TC002. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. |
| Priority | High |
| Stories | GEO-70 |
| Precondition | Editor is authenticated |
| Labels | e2e,kpi,values |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the luxury handbags category page | URL: /dashboard/edfe97e0-e55f-404c-99a4-0436af8524a1/category/0ee96af2-3e87-49a6-bc0d-8b42594b8715 | The category page loads with 4 KPI cards visible |
| 2 | When the KPI cards are rendered | 4 visible div[aria-label] cards | All 4 cards are fully rendered |
| 3 | Then each card shows: title / a numeric value (%, position #, or score) / a quality label (Good or Fair or Poor) | aria-label + p elements + quality span | Each card has a non-empty value and a quality label matching Good \| Fair \| Poor |

---

## E2E-CAT-KPI-003

**KPI cards update when LLM filter changes**

| Field | Value |
|---|---|
| Status | UPDATE — 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) — behaviour change (confirmed at the gate) |
| Description | Verify that KPI values update when the LLM filter is changed. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010); driven by card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008). Consolidates archive KPI-TC003 (GEO-70). Former id: KPI-TC003. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. |
| Priority | High |
| Stories | GEO-70 |
| Precondition | Editor is authenticated |
| Labels | e2e,kpi,filters |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor is on the luxury handbags category page with all LLMs active | URL: /dashboard/edfe97e0-e55f-404c-99a4-0436af8524a1/category/0ee96af2-3e87-49a6-bc0d-8b42594b8715 | The 4 KPI cards show initial values |
| 2 | When the Editor opens the LLM filter and deselects one LLM engine | [data-testid=llm-dropdown] button | The LLM dropdown opens and one engine is deselected |
| 3 | Then the KPI cards reload and display updated values reflecting the new LLM scope | div[aria-label] cards | The 4 KPI cards remain visible and their values are consistent with the reduced LLM scope |

---

## E2E-CAT-KPI-004

**KPI card values format and (i) tooltip content**

| Field | Value |
|---|---|
| Status | UPDATE — 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) — behaviour change (confirmed at the gate) |
| Description | Verify that each KPI card value has the correct numeric format and that hovering the (i) button displays the expected tooltip text. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010); driven by card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008). Consolidates archive KPI-TC004 (GEO-70). Former id: KPI-TC004. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. |
| Priority | High |
| Stories | GEO-70 |
| Precondition | Editor is authenticated |
| Labels | e2e,kpi,format,tooltip |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the category page and clicks the Performance tab | URL: /dashboard/{DASHBOARD_UUID}/category/{CATEGORY_UUID} — Performance tab | The Performance tab is active and the 4 KPI cards are visible |
| 2 | When the KPI cards are fully rendered on the Performance tab | 4 visible div[aria-label] cards | All 4 KPI cards are rendered with their values |
| 3 | Then each card value matches its expected format (Visibility/AI Choice → %, Avg Position → #N, Sentiment → signed score) \| And hovering the (i) button on each card shows the correct tooltip: Visibility — "How often your brand is named..." \| Avg Position — "Your typical rank..." \| AI Choice — "Your win rate on head-to-head..." \| Sentiment — "Average tone of how AI engines..." | button[aria-label^="KPI_NAME:"] + [role="tooltip"] | Each value matches its regex format. Each tooltip is visible on hover and its text matches the spec exactly. |

---

## E2E-CAT-KPI-005

**KPI cards align with analyzed brand row in Brand Rankings on a 1-day period**

| Field | Value |
|---|---|
| Status | UPDATE — confirmed by the user 2026-10-28; aligned 2026-11-04 (user decision) |
| Description | Regression test for GEO-398 — verify the 4 KPI cards (Share of Voice / Visibility / Avg Position / LLM Choice) at the top of the category Performance tab agree with the analyzed brand row in the Brand Rankings table within the rounding tolerance (≤ 1pp on percentages, ≤ 1 rank on Avg Position). Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: found while writing the suite: compares the Share of Voice KPI card, removed by GEO-663 (archive TC-GEO-663-002), and uses LLM Choice (now AI Choice) — comparison reduced to Visibility / Avg Position / AI Choice; driven by steps 2-3 → TC-GEO-663-002. Aligned 2026-11-04 (user decision): KPI cards pool the whole selected period, while Brand Rankings (like the Brand Prioritization Matrix and the other non-KPI widgets) shows the last day of the period only — PM decision of 07/07 (GEO-577), confirmed by the dev on GEO-1210 (Abandoned for this reason). The comparison is therefore run on a 1-day period (single snapshot); a gap on a multi-day period is expected behaviour, not a bug (MCP run 04/11, 7 days, All Countries: AI Choice 87% vs 93%). Reference check on staging, Toyota, 03/11, 1 day, Overview All Countries: Visibility 98.5 / 98.5, AI Choice 74 / 74, Avg Position 2.50 / 2.50. Consolidates archive KPI-TC008 (GEO-70, GEO-398). Former id: KPI-TC008. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. |
| Priority | High |
| Stories | GEO-70, GEO-398 |
| Precondition | Editor is authenticated; analysis has Brand Rankings data; the date range is set to a 1-day period (single snapshot) |
| Labels | e2e,kpi,brand-rankings,regression,GEO-398 |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP, 7-day period — expected behaviour, TC aligned) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor opens the category page on a 1-day period and clicks the Performance tab | URL: /dashboard/a569be85-fec0-4a10-8950-6f5d48ee6bfd/category/8ba4d76d-a03f-413b-b2a1-ca612d045fd6; Date range: 1 day (single snapshot) | The Performance tab is active with KPI cards and the Brand Rankings table both visible |
| 2 | When the KPI cards and Brand Rankings table are fully rendered on the Performance tab | Performance tab DOM stable (networkidle) | Visibility / Avg Position / AI Choice KPI cards are visible AND the Brand Rankings heading + at least one data row are visible |
| 3 | Then Visibility / Avg Position / AI Choice values displayed in the KPI cards match the corresponding cells of the analyzed brand row in Brand Rankings, with absolute difference ≤ 1pp on percentages and ≤ 1 rank on Avg Position | KPI card values (parsed as numbers) vs analyzed brand row cells (parsed as numbers) | All 3 metrics agree within tolerance — no rounding gap > 1pp / 1 rank |
