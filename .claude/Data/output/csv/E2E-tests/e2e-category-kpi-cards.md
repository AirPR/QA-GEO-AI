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
| Status | UPDATE — 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) — behaviour change (confirmed at the gate); aligned on the observed result 2026-11-04 (user decision); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verify that the category view shows the AI Perception Summary section and 5 KPI cards on page load. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010); driven by card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008). Aligned 2026-11-04 on the MCP run of 04/11 (user decision): the category page has no H1/H2 heading; the category name is shown as the active sidebar entry (observed on Toyota > Voitures hybrides). Consolidates archive KPI-TC001 (GEO-70). Former id: KPI-TC001. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags edfe97e0 not on staging). |
| Priority | High |
| Stories | GEO-70 |
| Precondition | Editor is authenticated |
| Labels | e2e,kpi,category-view |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the Toyota › Voitures hybrides category page | URL: /dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis edfe97e0 does not exist on staging) | The category page loads with the Identity tab active |
| 2 | Then the category name 'Voitures hybrides' is shown as the active entry in the sidebar | Sidebar category entry (active) | The sidebar entry 'Voitures hybrides' is highlighted (aria-current='page') as the active view; the page itself has no H1/H2 heading with the category name |
| 3 | And the InBrief section is visible with its 'InBrief powered by AI Sense' logo | InBrief logo image | The InBrief block headed by the 'InBrief powered by AI Sense' logo (image) is visible |
| 4 | And 4 KPI cards are displayed: Visibility / Avg Position / AI Choice / Sentiment — and no Share of Voice card | div[aria-label] cards | 4 KPI cards are visible each identified by their aria-label |

---

## E2E-CAT-KPI-002

**KPI cards show values and quality labels**

| Field | Value |
|---|---|
| Status | UPDATE — 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) — behaviour change (confirmed at the gate); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verify that each KPI card displays a numeric value with unit and a quality label (Good / Fair / Poor). Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010); driven by card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008). Consolidates archive KPI-TC002 (GEO-70). Former id: KPI-TC002. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags edfe97e0 not on staging). |
| Priority | High |
| Stories | GEO-70 |
| Precondition | Editor is authenticated |
| Labels | e2e,kpi,values |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the Toyota › Voitures hybrides category page | URL: /dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis edfe97e0 does not exist on staging) | The category page loads with 4 KPI cards visible |
| 2 | When the KPI cards are rendered | 4 visible div[aria-label] cards | All 4 cards are fully rendered |
| 3 | Then each card shows: title / a numeric value (%, position #, or score) / a quality label (Good or Fair or Poor) | aria-label + p elements + quality span | Each card has a non-empty value and a quality label matching Good \| Fair \| Poor |

---

## E2E-CAT-KPI-003

**KPI cards update when LLM filter changes**

| Field | Value |
|---|---|
| Status | UPDATE — 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) — behaviour change (confirmed at the gate); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verify that KPI values update when the LLM filter is changed. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010); driven by card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008). Consolidates archive KPI-TC003 (GEO-70). Former id: KPI-TC003. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (luxury handbags edfe97e0 not on staging); engine filter selector data-testid='llm-dropdown-trigger' (aria-label 'AI engine filters'). |
| Priority | High |
| Stories | GEO-70 |
| Precondition | Editor is authenticated |
| Labels | e2e,kpi,filters |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor is on the Toyota › Voitures hybrides category page with all LLMs active | URL: /dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — the luxury handbags analysis edfe97e0 does not exist on staging) | The 4 KPI cards show initial values |
| 2 | When the Editor opens the LLM filter and deselects one LLM engine | [data-testid=llm-dropdown-trigger] (aria-label 'AI engine filters') | The AI Engines dropdown opens and one engine is deselected |
| 3 | Then the KPI cards reload and display updated values reflecting the new LLM scope | div[aria-label] cards | The 4 KPI cards remain visible and their values are consistent with the reduced LLM scope |

---

## E2E-CAT-KPI-004

**KPI card values format and (i) tooltip content**

| Field | Value |
|---|---|
| Status | UPDATE — 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) — behaviour change (confirmed at the gate); aligned on GEO-1571 2026-11-11 (GEO 1.4 ACs, user decision) |
| Description | Verify that each KPI card value has the correct numeric format and that hovering the (i) button displays the expected tooltip text. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010); driven by card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008). Consolidates archive KPI-TC004 (GEO-70). Former id: KPI-TC004. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. 2026-11-11: aligned on GEO-1571 / GEO-1498 — AI Choice tooltip text (GEO-1571, English text approved by the PO on GEO-1498, comment 870232, 29/10): "How often AI engines choose your brand in head-to-head competitive questions, outright or under conditions (Chosen + Conditional). Each brand is measured on its own, so the brands of a question do not add up to 100%." — identical to the [role=tooltip] text observed 10/11. The (i) button aria-label still reads "AI Choice: Your win rate on head-to-head competitive questions…" on staging (GEO-1571 leftover, to report at its retest); the aria-label is only used as a locator (prefix "AI Choice:") and is not asserted. |
| Priority | High |
| Stories | GEO-70 |
| Precondition | Editor is authenticated |
| Labels | e2e,kpi,format,tooltip |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the category page and clicks the Performance tab | URL: /dashboard/{DASHBOARD_UUID}/category/{CATEGORY_UUID} — Performance tab | The Performance tab is active and the 4 KPI cards are visible |
| 2 | When the KPI cards are fully rendered on the Performance tab | 4 visible div[aria-label] cards | All 4 KPI cards are rendered with their values |
| 3 | Then each card value matches its expected format (Visibility/AI Choice → %, Avg Position → #N, Sentiment → signed score) \| And hovering the (i) button on each card shows the correct tooltip: Visibility — "How often your brand is named..." \| Avg Position — "Your typical rank..." \| AI Choice — "How often AI engines choose your brand in head-to-head competitive questions..." \| Sentiment — "Average tone of how AI engines..." | button[aria-label^="KPI_NAME:"] + [role="tooltip"] | Each value matches its regex format. Each tooltip is visible on hover and its text matches the spec exactly — AI Choice (GEO-1571): "How often AI engines choose your brand in head-to-head competitive questions, outright or under conditions (Chosen + Conditional). Each brand is measured on its own, so the brands of a question do not add up to 100%." |

---

## E2E-CAT-KPI-005

**KPI cards align with analyzed brand row in Brand Rankings on a 1-day period**

| Field | Value |
|---|---|
| Status | UPDATE — confirmed by the user 2026-10-28; aligned 2026-11-04 (user decision); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Regression test for GEO-398 — verify the 4 KPI cards (Share of Voice / Visibility / Avg Position / LLM Choice) at the top of the category Performance tab agree with the analyzed brand row in the Brand Rankings table within the rounding tolerance (≤ 1pp on percentages, ≤ 1 rank on Avg Position). Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: found while writing the suite: compares the Share of Voice KPI card, removed by GEO-663 (archive TC-GEO-663-002), and uses LLM Choice (now AI Choice) — comparison reduced to Visibility / Avg Position / AI Choice; driven by steps 2-3 → TC-GEO-663-002. Aligned 2026-11-04 (user decision): KPI cards pool the whole selected period, while Brand Rankings (like the Brand Prioritization Matrix and the other non-KPI widgets) shows the last day of the period only — PM decision of 07/07 (GEO-577), confirmed by the dev on GEO-1210 (Abandoned for this reason). The comparison is therefore run on a 1-day period (single snapshot); a gap on a multi-day period is expected behaviour, not a bug (MCP run 04/11, 7 days, All Countries: AI Choice 87% vs 93%). Reference check on staging, Toyota, 03/11, 1 day, Overview All Countries: Visibility 98.5 / 98.5, AI Choice 74 / 74, Avg Position 2.50 / 2.50. Consolidates archive KPI-TC008 (GEO-70, GEO-398). Former id: KPI-TC008. Archived in GEO-R1.0/e2e-category-kpi-cards.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Toyota › Voitures hybrides (a569be85 not on staging). |
| Priority | High |
| Stories | GEO-70, GEO-398 |
| Precondition | Editor is authenticated; analysis has Brand Rankings data; the date range is set to a 1-day period (single snapshot) |
| Labels | e2e,kpi,brand-rankings,regression,GEO-398 |
| QA Parent | GEO-70 |
| Components / QA Component | Category Views / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor opens the category page on a 1-day period and clicks the Performance tab | URL: /dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/category/21a79173-c455-4e49-bf69-307dc2dba7e4 (Toyota › Voitures hybrides — a569be85 does not exist on staging); 10/11 run: 'Latest report' (09/11), All Countries; Date range: 1 day (single snapshot) | The Performance tab is active with KPI cards and the Brand Rankings table both visible |
| 2 | When the KPI cards and Brand Rankings table are fully rendered on the Performance tab | Performance tab DOM stable (networkidle) | Visibility / Avg Position / AI Choice KPI cards are visible AND the Brand Rankings heading + at least one data row are visible |
| 3 | Then Visibility / Avg Position / AI Choice values displayed in the KPI cards match the corresponding cells of the analyzed brand row in Brand Rankings, with absolute difference ≤ 1pp on percentages and ≤ 1 rank on Avg Position | KPI card values (parsed as numbers) vs analyzed brand row cells (parsed as numbers) | All 3 metrics agree within tolerance — no rounding gap > 1pp / 1 rank |
