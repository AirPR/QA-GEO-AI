# e2e-category-question-competitive

- **Spec:** `.claude/Data/raw/playwright/e2e-category-question-competitive.spec.js`
- **Active scenarios:** 4
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-QUESTION-COMPETITIVE-001](#e2e-question-competitive-001) | Winner = Brand Name → Chosen on all engines | UPDATE | GEO-716, GEO-668 |
| [E2E-QUESTION-COMPETITIVE-002](#e2e-question-competitive-002) | Winner = Competitor Name → Not chosen on all engines | UPDATE | GEO-716, GEO-668 |
| [E2E-QUESTION-COMPETITIVE-003](#e2e-question-competitive-003) | Winner = Not chosen plain text → Not chosen on all engines | UPDATE | GEO-716, GEO-668 |
| [E2E-QUESTION-COMPETITIVE-004](#e2e-question-competitive-004) | Winner = Split badge → per-engine mix, Split never per-engine | UPDATE | GEO-716, GEO-668 |

---

## E2E-QUESTION-COMPETITIVE-001

**Winner = Brand Name → Chosen on all engines**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision); aligned on GEO-1570 / GEO-1498 2026-11-11 (GEO 1.4 ACs, user decision) |
| Description | E2E - Competitive: Winner = Brand Name → detail panel shows Chosen (emerald) for all counted LLM engines. Consolidates archive E2E-COMP-WN-01 (GEO-716, GEO-668). Former id: E2E-COMP-WN-01. Archived in GEO-R1.0/e2e-category-question-competitive.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging category Toyota › Voitures hybrides (Won / Lost expectation unchanged — PO question pending). 2026-11-11: aligned on GEO-1570 / GEO-1498 — per-engine outcome labels are now "Chosen" / "Conditional" / "Not chosen" / "Overlooked" (GEO-1570: "each engine pill shows that engine's outcome in the rank badge spot: emerald for Chosen and Conditional"); Winner cell = my brand with logo when every counted engine is Chosen (or a Chosen + Conditional mix); Won → Chosen. Observed 10/11: all 15 "Toyota" rows are "Chosen" (text-emerald-700) on all 4 engines; "Won" is not displayed. |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Toyota › Voitures hybrides (439acd96 / 21a79173) category loaded, Competitive tab active |
| Labels | E2E,Competitive,WinnerPanel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Competitive tab of a category where the tracked brand is chosen by every engine | Category: Voitures hybrides (Toyota 439acd96 / 21a79173), Brand: Toyota, Winner column = brand name with logo (bold span.font-medium.text-slate-900) |  |
| 2 | When I find a row where the Winner column shows the brand name (e.g., Toyota) |  |  |
| 3 | Then the detail panel shows an emerald Chosen (or Conditional) badge for every counted LLM engine | e.g. row "¿Cuál me recomiendas…: Toyota, Kia, Renault o Hyundai?" (10/11) | Winner column: brand name with logo (GEO-1570: every counted engine Chosen, or Chosen + Conditional mix). Detail panel: every counted engine pill shows "Chosen" (or "Conditional") in emerald (text-emerald-700) in the rank badge spot; "Won" is not displayed. |

---

## E2E-QUESTION-COMPETITIVE-002

**Winner = Competitor Name → Not chosen on all engines**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision); aligned on GEO-1570 / GEO-1498 2026-11-11 (GEO 1.4 ACs, user decision) |
| Description | E2E - Competitive: Winner = Competitor Name → detail panel shows Not chosen (red) for all counted LLM engines. Consolidates archive E2E-COMP-WN-02 (GEO-716, GEO-668). Former id: E2E-COMP-WN-02. Archived in GEO-R1.0/e2e-category-question-competitive.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf), example competitor Brandwatch (no Toyota "Electric Cars" category on staging) (Won / Lost expectation unchanged — PO question pending). 2026-11-11: aligned on GEO-1570 / GEO-1498 — GEO-1570: "every engine Not chosen with the same competitor and no condition → that competitor with logo"; per-engine pill red for Not chosen; Lost → Not chosen. Observed 10/11: row "Best for Social Listening Software: …", winner "Brandwatch" (text-slate-700), ChatGPT and Gemini "Not chosen" (text-red-600); "Lost" is not displayed. |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Competitive tab active, at least one competitor-winner row exists in Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf) |
| Labels | E2E,Competitive,WinnerPanel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Competitive tab where the same competitor brand is chosen by every engine | Category: Social Listening Software (Lictorix Geo f228f1fe / 3254e3bf — no Toyota "Electric Cars" category on staging), Brand: Lictorix Geo (absent), Winner column = competitor name with logo (span.text-slate-700:not(.font-medium)) |  |
| 2 | When I find a row where the Winner column shows a competitor brand name (e.g., Brandwatch) |  |  |
| 3 | Then the detail panel shows a red Not chosen badge for every counted LLM engine |  | Winner column: competitor name with logo (e.g., Brandwatch) — GEO-1570: every engine Not chosen with the same competitor, no condition. Detail panel: every counted engine pill shows "Not chosen" in red (text-red-600) in the rank badge spot; "Lost" is not displayed. |

---

## E2E-QUESTION-COMPETITIVE-003

**Winner = Not chosen plain text → Not chosen on all engines**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision); aligned on GEO-1570 / GEO-1498 2026-11-11 (GEO 1.4 ACs, user decision) |
| Description | E2E - Competitive: Winner = 'Not chosen' plain grey text (formerly 'Lost') → detail panel shows Not chosen (red) for all counted LLM engines. Consolidates archive E2E-COMP-WN-03 (GEO-716, GEO-668). Former id: E2E-COMP-WN-03. Archived in GEO-R1.0/e2e-category-question-competitive.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): data Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf) (no Toyota "Electric Cars" / "SUVs" categories on staging) (Won / Lost expectation unchanged — PO question pending). 2026-11-11: aligned on GEO-1570 / GEO-1498 — GEO-1570: "Not chosen with different picks or Not chosen + Overlooked → 'Not chosen' in plain grey text (as 'Lost' before)"; per-engine pill red for Not chosen and Overlooked. Observed 10/11: the plain text (span.text-slate-400.text-sm) reads "Not chosen" and every engine shows "Not chosen" (red) with "Sprout Social was chosen". |
| Priority | High |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Competitive tab active, at least one 'Not chosen' plain-text winner row exists in Lictorix Geo › Social Listening Software (f228f1fe / 3254e3bf) |
| Labels | E2E,Competitive,WinnerPanel,NotChosenPlain |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Competitive tab where the Winner column shows plain grey 'Not chosen' text (no badge border) | Category: Social Listening Software (Lictorix Geo f228f1fe / 3254e3bf), e.g. row "Lictorix Geo vs Brandwatch vs Sprout Social vs Meltwater for Social Listening Software?", Brand: Lictorix Geo (absent), Winner column = plain grey 'Not chosen' text (span.text-slate-400.text-sm) — GEO-1570: engines Not chosen with different picks, or Not chosen + Overlooked |  |
| 2 | When I find a row where the Winner column shows span.text-slate-400.text-sm with text 'Not chosen' |  |  |
| 3 | Then the detail panel shows a red Not chosen (or Overlooked) badge for every counted LLM engine |  | Winner column: plain grey 'Not chosen' text (no badge border, no competitor name, no 'Lost'). Detail panel: every counted engine pill shows "Not chosen" (or "Overlooked") in red in the rank badge spot, with "{competitor} was chosen" on a Not chosen engine (e.g. "Sprout Social was chosen"). |

---

## E2E-QUESTION-COMPETITIVE-004

**Winner = Split badge → per-engine mix, Split never per-engine**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision); aligned on GEO-1570 / GEO-1498 2026-11-11 (GEO 1.4 ACs, user decision) |
| Description | E2E - Competitive: Winner = Split badge (orange) → detail panel shows per-engine individual outcomes (Chosen / Conditional / Not chosen / Overlooked), Split never appears as per-engine label. Consolidates archive E2E-COMP-WN-04 (GEO-716, GEO-668). Former id: E2E-COMP-WN-04. Archived in GEO-R1.0/e2e-category-question-competitive.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging categories Toyota Voitures hybrides / VUS (Won / Lost expectation unchanged — PO question pending). 2026-11-11: aligned on GEO-1570 / GEO-1498 — GEO-1570: "mix Chosen/Conditional with Not chosen/Overlooked → 'Split'"; each engine pill shows its own outcome (emerald Chosen / Conditional, red Not chosen / Overlooked); Won → Chosen, Lost → Not chosen. Observed 10/11: row "La plus populaire pour les voitures hybrides : Toyota, Renault, Peugeot ou Hyundai ?" — Chosen (ChatGPT, Gemini, Grok) and Not chosen (Perplexity); Split never per engine; all 10 Split rows mix Chosen / Not chosen. |
| Priority | Critical |
| Stories | GEO-716, GEO-668 |
| Precondition | User logged in, staging environment, Competitive tab active, at least one Split-winner row exists across the Toyota categories Voitures hybrides / VUS |
| Labels | E2E,Competitive,WinnerPanel,Split |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Competitive tab where LLMs give different competitive results for the brand | Categories: Voitures hybrides → VUS (Toyota 439acd96, searched in order), Brand: Toyota (mixed results), Winner column = orange Split badge (span[class*='border-orange-200']) |  |
| 2 | When I find a row where the Winner column shows the orange Split badge |  |  |
| 3 | Then each engine independently shows its outcome (Chosen / Conditional / Not chosen / Overlooked) — Split never appears as a per-engine label in the panel |  | Winner column: orange Split badge (GEO-1570: mix of Chosen / Conditional with Not chosen / Overlooked). Detail panel: each LLM engine pill shows its own outcome — emerald for Chosen / Conditional, red for Not chosen / Overlooked. Split never appears as a per-engine label — it is only an aggregate label in the Winner column. At least one emerald (Chosen or Conditional) and one red (Not chosen or Overlooked) engine confirmed; "Won" / "Lost" are not displayed. |
