# e2e-category-question-visibility

- **Spec:** `.claude/Data/raw/playwright/e2e-category-question-visibility.spec.js`
- **Active scenarios:** 4
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-QUESTION-VISIBILITY-001](#e2e-question-visibility-001) | Winner = Brand Name → Favorable all engines | UPDATE | GEO-716, GEO-668 |
| [E2E-QUESTION-VISIBILITY-002](#e2e-question-visibility-002) | Winner = Competitor Name → non-Favorable + ranking cross-check | UPDATE | GEO-716, GEO-668 |
| [E2E-QUESTION-VISIBILITY-003](#e2e-question-visibility-003) | Winner = Unranked badge → Unranked all engines | UPDATE | GEO-716, GEO-668 |
| [E2E-QUESTION-VISIBILITY-004](#e2e-question-visibility-004) | Winner = Split badge → per-engine mix, Split never per-engine | UPDATE | GEO-716, GEO-668 |

---

## E2E-QUESTION-VISIBILITY-001

**Winner = Brand Name → Favorable all engines**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | E2E - Visibility: Winner = Brand Name → detail panel shows Favorable (green) for all active LLM engines. Consolidates archive E2E-VIS-WN-01 (GEO-716, GEO-668). Former id: E2E-VIS-WN-01. Archived in GEO-R1.0/e2e-category-question-visibility.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging category names — Toyota › Voitures hybrides (no "Hybrid Cars" category on staging). |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Toyota › Voitures hybrides (439acd96 / 21a79173) category loaded, Visibility tab active |
| Labels | E2E,Visibility,WinnerPanel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Visibility tab of a category where the tracked brand wins | Category: Voitures hybrides (Toyota 439acd96 / 21a79173), Brand: Toyota, Winner column = brand name (bold span.font-medium.text-slate-900) |  |
| 2 | When I find a row where the Winner column shows the brand name (e.g., Toyota) |  |  |
| 3 | Then the detail panel shows Favorable (green) badge for every active LLM engine |  | Winner column: brand name with favicon. Detail panel: all LLM engine pills show Favorable (green) badge. |

---

## E2E-QUESTION-VISIBILITY-002

**Winner = Competitor Name → non-Favorable + ranking cross-check**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | E2E - Visibility: Winner = Competitor Name → detail panel shows Unfavorable/Unranked for all engines AND competitor matches #1 in ranking list. Observed result recorded 2026-11-04 (user decision): Lictorix Geo, winner 'Brandwatch' → Unranked on ChatGPT and Gemini, #1 = Brandwatch. Consolidates archive E2E-VIS-WN-02 (GEO-716, GEO-668). Former id: E2E-VIS-WN-02. Archived in GEO-R1.0/e2e-category-question-visibility.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging categories — Toyota Voitures hybrides / VUS, else Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf). |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Visibility tab active, at least one competitor-winner row with engine data exists across the Toyota categories Voitures hybrides / VUS or in Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf) |
| Labels | E2E,Visibility,WinnerPanel,CrossCheck |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Visibility tab of a category where the tracked brand is not ranked #1 | Categories: Voitures hybrides → VUS (Toyota, searched in order), then Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf), Brand: absent or not #1, Winner column = competitor name (span.text-slate-700); 04/11 and 10/11 runs: Lictorix Geo | The Visibility tab is active and lists rows where the tracked brand is not #1 |
| 2 | When I find a row where the Winner column shows a competitor brand name | 04/11 and 10/11 runs: Lictorix Geo, row "Most popular Social Listening solution?", winner 'Brandwatch' | The row's Winner column shows the competitor name (e.g. 'Brandwatch') and its detail panel opens |
| 3 | Then the panel shows Unfavorable or Unranked for all engines AND the competitor name matches #1 in the panel ranking list |  | Winner column: competitor name with favicon. Detail panel: all LLM engines show Unfavorable (amber) or Unranked (red). Cross-check: competitor name in Winner column = #1 brand in the panel ranking list (checked on first engine with available data). Observed 04/11: winner 'Brandwatch' → Unranked on ChatGPT and Gemini; #1 in the ranking list = Brandwatch on both engines. |

---

## E2E-QUESTION-VISIBILITY-003

**Winner = Unranked badge → Unranked all engines**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | E2E - Visibility: Winner = Unranked badge (red) → detail panel shows Unranked for all engines (no LLM consensus on #1). Consolidates archive E2E-VIS-WN-03 (GEO-716, GEO-668). Former id: E2E-VIS-WN-03. Archived in GEO-R1.0/e2e-category-question-visibility.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf) (no Toyota "Electric Cars" category on staging). |
| Priority | High |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf) category loaded, Visibility tab active, at least one Unranked-winner row exists |
| Labels | E2E,Visibility,WinnerPanel,Unranked |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Visibility tab where the brand is absent and LLMs disagree on which competitor is #1 | Category: Social Listening Software (Lictorix Geo f228f1fe / 3254e3bf — no Toyota "Electric Cars" category on staging), Brand: Lictorix Geo (absent), e.g. row "Which Social Listening solution do you recommend?", Winner column = red Unranked badge (data-testid=dashboard-questions-favorability-badge, border-red-200) |  |
| 2 | When I find a row where the Winner column shows the red Unranked badge |  |  |
| 3 | Then the detail panel shows Unranked (red, #--) badge for every active LLM engine |  | Winner column: red Unranked badge. Detail panel: all LLM engine pills show Unranked (red) badge with #--. Distinguishable from Competitor-winner rows: here LLMs disagree on #1. |

---

## E2E-QUESTION-VISIBILITY-004

**Winner = Split badge → per-engine mix, Split never per-engine**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | E2E - Visibility: Winner = Split badge (orange) → detail panel shows per-engine individual tiers, Split never appears as per-engine label. Consolidates archive E2E-VIS-WN-04 (GEO-716, GEO-668). Former id: E2E-VIS-WN-04. Archived in GEO-R1.0/e2e-category-question-visibility.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging categories — Toyota Voitures hybrides / VUS. |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Visibility tab active, at least one Split-winner row exists across the Toyota categories Voitures hybrides / VUS |
| Labels | E2E,Visibility,WinnerPanel,Split |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Visibility tab where LLMs give different tier results for the brand | Categories: Voitures hybrides → VUS (Toyota 439acd96, searched in order), Brand: Toyota (mixed results), Winner column = orange Split badge (span[class*='border-orange-200']) |  |
| 2 | When I find a row where the Winner column shows the orange Split badge |  |  |
| 3 | Then each engine independently shows its tier (Favorable/Unfavorable/Unranked) — Split never appears as a per-engine label in the panel |  | Winner column: orange Split badge. Detail panel: each LLM engine shows its individual badge (Favorable/Unfavorable/Unranked). Split never appears as a per-engine label — it is only an aggregate label in the Winner column. |
