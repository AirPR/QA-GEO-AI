# E2E Scenarios — e2e-suite-GEO-R1.3

Generated 2026-10-28 · /gen-e2e-scenarios --project --version GEO-R1.3 --url https://staging-geo.onclusive.com/geo --no-run · **Review gate confirmed by the user on 2026-10-28 (all recommendations accepted). Suite written to csv/E2E-tests/ (step 9, --no-run); specs not touched, nothing run.**


## Final statuses (after the review gate, 2026-10-28)

- All recommendations accepted: 16 behaviour UPDATEs, 13 label UPDATEs, 30 RETIREs, 20 NEW.
- Found while writing the suite: **KPI-TC008** (E2E-CAT-KPI-005) also compared the removed Share of Voice KPI card → written as UPDATE (Visibility / Avg Position / AI Choice), flagged "needs confirmation"; **GEO-69-TC008** (E2E-CAT-PRIORITIZATION-008) kept as archived but flagged "needs confirmation" (compares a Share of Voice KPI card); **GEO-67-TC004 / TC007** (Perception rows): no newer source for Perception labels, wording kept, flagged "needs confirmation".
- Specs with no archive CSV, rebuilt from their test() / test.step() texts: **e2e-geo-analytics-dashboard** → E2E-GEO-DASHBOARD-001 **UPDATE** (Prompts column + "Brand / Topic" header, TC-GEO-1240-004 / TC-GEO-1243-014; needs confirmation); **e2e-hubspot-upsell-pql** → E2E-UPSELL-PQL-001…008 **KEEP** (no newer TC on the upsell flow), E2E-UPSELL-PQL-009…012 **RETIRE** (test.skip placeholders).
- Broken archive row GEO-69-TC007 repaired in E2E-tests/e2e-category-brand-prioritization-07.csv only (archive untouched).
- GEO-1546: TC-GEO-1240-001 step 3 kept as is in e2e-verify-analysis.csv — "align once GEO-1546 ships" (index note).
- E2E-READER-001 and E2E-MULTI-ORG-001: CSV written, spec blocked (Reader / multi-organisation account missing).

Final suite totals (archive + 2 extra specs + new): **81 KEEP · 31 UPDATE · 34 RETIRE · 20 NEW** — 132 CSVs. Index: `.claude/Data/output/csv/E2E-tests/E2E-SUITE-INDEX.md`.

Scenarios flagged "needs confirmation" in the index (5): E2E-CAT-PRIORITIZATION-008, E2E-CAT-KPI-005, E2E-CAT-QUESTIONS-TABLE-004, E2E-CAT-QUESTIONS-TABLE-007, E2E-GEO-DASHBOARD-001.

## Scope

- `--project` up to GEO-R1.3: every `testcases-*.csv` of GEO-R0.1, R0.2, R0.3, R1.0, R1.1, R1.15, R1.2, R1.3 (e2e-*.csv, *-review.md and E2E-tests/ are not TC sources; GEO-V1 is not a CSV folder)
- Test plan: `apps/geo/GEO-R1.3/TEST-PLAN-GEO-R1.3.md` (updated 2026-10-25, Approved) — sections "Cross-Epic Integration" (scenarios 190-206) and "Non-Regression" (207-217)
- Known bugs / PO decisions: `apps/geo/GEO-R1.3/GEO-1002-RUN-FINDINGS.md`, `GEO-1209-RUN-FINDINGS.md`, `GEO-1513-RUN-FINDINGS.md`; Jira read-only 2026-10-28 (open R1.3 bugs: GEO-1546 Ready for QA, GEO-1181 Ready for Release (backend Flink, no UI))
- Total: **1254 TCs** in 35 CSVs, **404 excluded**, 850 current

| Version | CSV | TCs | Excluded | Why |
|---|---|---|---|---|
| GEO-R0.1 | testcases-coverage-epic100-20260430.csv | 18 | 4 | 4 superseded by GEO-R1.3 prompt pool (TC-GEO-1239-009 / 010 / 011) |
| GEO-R0.1 | testcases-coverage-epic101-20260430.csv | 55 | 8 | 7 superseded by GEO-R1.2 Action Center - Target Sources (GEO-152); 1 backend / API only |
| GEO-R0.1 | testcases-coverage-epic102-20260430.csv | 117 | 41 | 7 superseded by GEO-R1.1 GEO-663 (4 KPI cards, archive e2e-brand-SOV); 15 superseded by GEO-R1.2 GEO-1125 / GEO-1126 (AI Engines Citation Sources); 19 superseded by GEO-R1.3 GEO-1068 + GEO-R1.1 GEO-648 (Top Concepts) |
| GEO-R0.1 | testcases-coverage-epic103-20260430.csv | 25 | 25 | 25 backend only (analysis pipeline) |
| GEO-R0.1 | testcases-coverage-epic104-20260430.csv | 74 | 74 | 74 superseded by GEO-R1.3 wizard (GEO-1002 / GEO-1209 / GEO-1069) |
| GEO-R0.1 | testcases-coverage-epic105-20260430.csv | 18 | 0 | — |
| GEO-R0.2 | testcases-coverage-epic99-20260430.csv | 14 | 10 | 10 not delivered (GEO-99 stories in Backlog) |
| GEO-R0.3 | testcases-coverage-epic257.csv | 22 | 0 | — |
| GEO-R0.3 | testcases-coverage-epic263.csv | 5 | 0 | — |
| GEO-R1.0 | testcases-coverage-epicGEO-200.csv | 52 | 0 | — |
| GEO-R1.0 | testcases-coverage-epicGEO-397.csv | 32 | 25 | 25 back office only (prerequisite, no UI step of the app) |
| GEO-R1.0 | testcases-coverage-storyGEO-237.csv | 12 | 0 | — |
| GEO-R1.0 | testcases-coverage-storyGEO-427.csv | 14 | 0 | — |
| GEO-R1.1 | testcases-coverage-epicGEO-648.csv | 14 | 0 | — |
| GEO-R1.15 | testcases-coverage-epicGEO-539.csv | 13 | 13 | 13 backend only (summary persistence / cache) |
| GEO-R1.15 | testcases-coverage-epicGEO-680.csv | 21 | 8 | 8 back office only (prerequisite, no UI step of the app) |
| GEO-R1.15 | testcases-coverage-epicGEO-681.csv | 40 | 26 | 26 back office only (prerequisite, no UI step of the app) |
| GEO-R1.2 | testcases-coverage-epicGEO-1113.csv | 7 | 7 | 7 back office only (prerequisite, no UI step of the app) |
| GEO-R1.2 | testcases-coverage-epicGEO-152 -GEO1116.csv | 5 | 5 | 5 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-coverage-epicGEO-152.csv | 221 | 8 | 3 backend / API only; 5 superseded by GEO-R1.3 TC-GEO-1184-* (GEO-1513) |
| GEO-R1.2 | testcases-coverage-storyGEO-1120.csv | 17 | 17 | 17 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-coverage-storyGEO-1125.csv | 17 | 17 | 17 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-coverage-storyGEO-1166.csv | 7 | 7 | 7 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-coverage-storyGEO-1168.csv | 29 | 29 | 29 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-coverage-storyGEO-1169.csv | 14 | 14 | 14 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-coverage-storyGEO-1173.csv | 4 | 4 | 4 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-coverage-storyGEO-1178.csv | 35 | 35 | 35 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-coverage-storyGEO-1183.csv | 9 | 9 | 9 duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv) |
| GEO-R1.2 | testcases-tnr-GEO-152-action-center.csv | 19 | 0 | — |
| GEO-R1.2 | testcases-tnr-GEO-152-stories.csv | 36 | 0 | — |
| GEO-R1.3 | testcases-coverage-epicGEO-1002.csv | 111 | 16 | 13 back office only (prerequisite, no UI step of the app); 2 flag OFF only (needs another account / environment); 1 backend / API only |
| GEO-R1.3 | testcases-coverage-epicGEO-1068.csv | 36 | 0 | — |
| GEO-R1.3 | testcases-coverage-epicGEO-1069.csv | 35 | 0 | — |
| GEO-R1.3 | testcases-coverage-epicGEO-1209.csv | 97 | 2 | 1 flag OFF only (needs another account / environment); 1 backend / API only |
| GEO-R1.3 | testcases-coverage-epicGEO-1513.csv | 9 | 0 | — |

Per version (TCs / excluded): GEO-R0.1 307/152 · GEO-R0.2 14/10 · GEO-R0.3 27/0 · GEO-R1.0 110/25 · GEO-R1.1 14/0 · GEO-R1.15 74/47 · GEO-R1.2 420/152 · GEO-R1.3 288/18

## Prerequisites check

- Language en-GB and `features.unbranded_analysis`: **to check before the run** (`GET https://staging-geo.onclusive.com/geo/api/v1/auth/me`). The local `storageState.json` (staging) dates from 2026-07-29 and is expired — delete it and let the Auth0 global setup regenerate it. Last known state: staging flag ON since 2026-10-19 (memory).
- Scenarios needing the flag **OFF** (test plan scenario 193, TC-GEO-1231-001, TC-GEO-1234-005, TC-GEO-1241-002): another account / environment → open point, no scenario.
- Analyses created by a scenario keep **only 5 prompts** (shared pool): E2E-CREATE-DEFAULT-001, E2E-MARKETS-1LLM-001, E2E-WIZARD-CUSTOM-001, E2E-UNBRANDED-CREATE-001 — **ask before each run**; delete the analysis afterwards if the user wants the pool back.
- Account setting change: E2E-EXPORT-LANG-001 switches the interface language (FR) — ask, then restore en-GB and check /auth/me.
- Back office (prompt pool value, allowed engines, organisation settings): prerequisites only, never UI steps of a spec.
- Missing test data (JDD): Reader account (E2E-READER-001), multi-organisation account (E2E-MULTI-ORG-001), analysis on a site with neither logo nor favicon (scenario 204 globe), UA with an Other-type prompt in a real category (TC-GEO-1248-004), brand analysis with Other prompts (scenario 197 brand side), JDD topic for E2E-UNBRANDED-CREATE-001 ("Postal services" already exists), A1 / A2 of the GEO-1069 runs (licter.com / custom brand without website), baseline XLSX / PPTX of Toyota 439acd96 (Sep 28 – Oct 4, 2026) for E2E-NR-OLDER-001.

## Existing E2E suite review

E2E-tests/ is empty, so the whole R1.0 archive (19 files, 133 scenarios after grouping by tc_id / Test name) is reviewed. Each archive TC becomes one scenario (`{file}-NN.csv` when a file holds several). Recommended status pre-filled — correct only the lines you disagree with.

Totals: **73 KEEP · 30 UPDATE · 30 RETIRE**

| Scenario (former id) | Archive file · spec | Last result | Status (recommended) | Reason | Changed steps → newer TC | Needs confirmation |
|---|---|---|---|---|---|---|
| TC-GEO-663-001 — Overview: KPI row shows exactly 4 cards without SOV | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-663-003 — Overview: Brand Rankings table has no SoV% column | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-663-005 — Brand Rankings default sort is Visibility% descending with correct Ran | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-663-006 — No SOV-related tooltips or i18n keys are visible after removal | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-001 — SOV dedicated card renders below KPI row on Overview | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-003 — Doughnut shows top 10 brands + Others slice with callouts and legend | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-004 — Target brand in top 10: arc emphasized and center label shows brand SO | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-005 — Target brand not in top 10: center label still shows brand SOV from KP | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-006 — Empty state displayed when scope has no responses | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-007 — Error state shows reload button that re-fetches inline | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-008 — Loading skeleton occupies chart area while data is fetching | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-009 — Filter changes recompute doughnut callouts legend and center label | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-010 — Doughnut with 10 or fewer brands shows no Others slice | GEO-R1.0/e2e-brand-SOV.csv · e2e-brand-SOV | SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| GEO-69-TC001 — GEO-69 TC1 - Category brand matrix is displayed | GEO-R1.0/e2e-category-brand-prioritization.csv · e2e-category-brand-prioritization | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-69-TC002 — GEO-69 TC2 - Category brand matrix updates when LLM filter changes | GEO-R1.0/e2e-category-brand-prioritization.csv · e2e-category-brand-prioritization | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-69-TC003 — GEO-69 TC3 - Hovering a data point shows brand metrics in tooltip | GEO-R1.0/e2e-category-brand-prioritization.csv · e2e-category-brand-prioritization | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-69-TC004 — GEO-69 TC4 - All markets view shows multiple brand data points | GEO-R1.0/e2e-category-brand-prioritization.csv · e2e-category-brand-prioritization | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-69-TC005 — GEO-69 TC5 - [SKIP] Specific market shows only brands from that market | GEO-R1.0/e2e-category-brand-prioritization.csv · e2e-category-brand-prioritization | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-69-TC006 — GEO-69 TC6 - [SKIP] Brand matrix shows empty state when no visibility | GEO-R1.0/e2e-category-brand-prioritization.csv · e2e-category-brand-prioritization | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-69-TC007 — GEO-69 TC7 - Quadrant legend shows all four quadrants with counts | GEO-R1.0/e2e-category-brand-prioritization.csv · e2e-category-brand-prioritization | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it (GEO-1524 Passed QA); the archive row is split over 3 CSV lines — merged when normalised | — | no |
| GEO-69-TC008 — GEO-69 TC8 - Brand tooltip metrics match category KPI cards | GEO-R1.0/e2e-category-brand-prioritization.csv · e2e-category-brand-prioritization | suite 30/05 (file: PASS / SKIP) | **KEEP** | kept as archived, but its comparison with a Share of Voice KPI card conflicts with GEO-663 (no SOV KPI card since R1.1); no newer TC gives the new reference | — | yes (possible conflict, found while writing the suite) |
| GEO-68-TC001 — Brand Rankings table is displayed for the category | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-68-TC002 — Brand Rankings update when LLM filter changes | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-68-TC003 — Parent row shows aggregated metrics and expandable variant badge | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-68-TC004 — Target brand row is highlighted with amber/gold background | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-68-TC005 — [SKIP] Table recalculates when market filter changes | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-68-TC006 — Table recalculates when LLM filter changes | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-68-TC007 — All Markets filter aggregates data across all markets | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **UPDATE** | "All Markets" now reads "All Countries" (TC-GEO-1120-017, GEO-1514) | steps 1, 3 → TC-GEO-1120-017 | no (label) |
| GEO-68-TC008 — [SKIP] Empty state message when no data available | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-68-TC009 — [SKIP] Error state shown with retry option on API failure | GEO-R1.0/e2e-category-brand-rankings.csv · e2e-category-brand-rankings | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| KPI-TC001 — TC001 — Category view shows summary and KPI cards | GEO-R1.0/e2e-category-kpi-cards.csv · e2e-category-kpi-cards | suite 30/05 (file: PASS / SKIP) | **UPDATE** | 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) | card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008) | yes (behaviour) |
| KPI-TC002 — TC002 — KPI cards show values and quality labels | GEO-R1.0/e2e-category-kpi-cards.csv · e2e-category-kpi-cards | suite 30/05 (file: PASS / SKIP) | **UPDATE** | 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) | card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008) | yes (behaviour) |
| KPI-TC003 — TC003 — KPI cards update when LLM filter changes | GEO-R1.0/e2e-category-kpi-cards.csv · e2e-category-kpi-cards | suite 30/05 (file: PASS / SKIP) | **UPDATE** | 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) | card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008) | yes (behaviour) |
| KPI-TC004 — TC004 — KPI card values format and (i) tooltip content | GEO-R1.0/e2e-category-kpi-cards.csv · e2e-category-kpi-cards | suite 30/05 (file: PASS / SKIP) | **UPDATE** | 5 KPI cards with Share of Voice → 4 cards without SOV (GEO-663, archive TC-GEO-663-002, R1.1); "AI Perception Summary / Powered by AI Sense" → InBrief logo; Sentiment tile kept (TC-GEO-1269-010) | card count / SOV tooltip → TC-GEO-663-002; KPI-TC001 step 3 → InBrief (TC-GEO-1231-008) | yes (behaviour) |
| KPI-TC008 — TC008 — KPI cards align with analyzed brand row in Brand Rankings | GEO-R1.0/e2e-category-kpi-cards.csv · e2e-category-kpi-cards | suite 30/05 (file: PASS / SKIP) | **UPDATE** | found while writing the suite: compares the Share of Voice KPI card, removed by GEO-663 (archive TC-GEO-663-002), and uses LLM Choice (now AI Choice) — comparison reduced to Visibility / Avg Position / AI Choice | steps 2-3 → TC-GEO-663-002 | yes (behaviour, added after the gate) |
| GEO-66-TC001 — Perception topics and sentiment filters are displayed | GEO-R1.0/e2e-category-perception-citation.csv · e2e-category-perception-citation | suite 30/05 (file: PASS / SKIP) | **UPDATE** | headings: "AI Perception Summary" → InBrief logo; "Top Concepts Associated with Your Brand" → "Top Topics Associated with Your Brand" | step 3 → TC-GEO-1266-002, TC-GEO-1231-008 | no (label) |
| GEO-66-TC002 — AI Citation Sources section is visible with source type breakdown | GEO-R1.0/e2e-category-perception-citation.csv · e2e-category-perception-citation | suite 30/05 (file: PASS / SKIP) | **UPDATE** | section renamed "AI Engines Citation Sources" (GEO-1196 / GEO-1200), Favorability column removed | step 3 → TC-GEO-1125-001 | no (label) |
| GEO-66-TC003 — [SKIP] Source detail shows full information | GEO-R1.0/e2e-category-perception-citation.csv · e2e-category-perception-citation | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-66-TC004 — [SKIP] Market filter recalculates perception topics and citation sourc | GEO-R1.0/e2e-category-perception-citation.csv · e2e-category-perception-citation | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-66-TC005 — [SKIP] LLM filter recalculates both components | GEO-R1.0/e2e-category-perception-citation.csv · e2e-category-perception-citation | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-66-TC006 — [SKIP] Empty state messages are displayed | GEO-R1.0/e2e-category-perception-citation.csv · e2e-category-perception-citation | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-66-TC007 — [SKIP] Error state displayed with retry option | GEO-R1.0/e2e-category-perception-citation.csv · e2e-category-perception-citation | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-66-TC012 — Sources classification: domain↔type mapping matches the oracle | GEO-R1.0/e2e-category-perception-citation.csv · e2e-category-perception-citation | suite 30/05 (file: PASS / SKIP) | **UPDATE** | section renamed "AI Engines Citation Sources" | steps 1-2 → TC-GEO-1125-001 | no (label) |
| E2E-QA-TC001 — TC001 — Default display (All tab) | GEO-R1.0/e2e-category-question-analysis.csv · e2e-category-question-analysis | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-QA-TC002 — TC002 — Visibility tab table | GEO-R1.0/e2e-category-question-analysis.csv · e2e-category-question-analysis | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-QA-TC003 — TC003 — Competitive tab table | GEO-R1.0/e2e-category-question-analysis.csv · e2e-category-question-analysis | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-QA-TC004 — TC004 — Perception tab table | GEO-R1.0/e2e-category-question-analysis.csv · e2e-category-question-analysis | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-QA-TC005 — TC005 — Visibility detail panel | GEO-R1.0/e2e-category-question-analysis.csv · e2e-category-question-analysis | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC on the question detail panel; check that its "AI Citation Sources" sub-heading was not renamed with the Overview section (GEO-1200) | — | no |
| E2E-QA-TC006 — TC006 — Competitive detail panel | GEO-R1.0/e2e-category-question-analysis.csv · e2e-category-question-analysis | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-QA-TC007 — TC007 — Perception detail panel | GEO-R1.0/e2e-category-question-analysis.csv · e2e-category-question-analysis | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-COMP-WN-01 Winner = Brand Name → Won all engines | GEO-R1.0/e2e-category-question-competitive.csv · e2e-category-question-competitive | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| E2E-COMP-WN-02 Winner = Competitor Name → Lost all engines | GEO-R1.0/e2e-category-question-competitive.csv · e2e-category-question-competitive | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| E2E-COMP-WN-03 Winner = Lost plain text → Lost all engines | GEO-R1.0/e2e-category-question-competitive.csv · e2e-category-question-competitive | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| E2E-COMP-WN-04 Winner = Split badge → per-engine mix, Split never per-engine | GEO-R1.0/e2e-category-question-competitive.csv · e2e-category-question-competitive | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| E2E-PERC-TH-01 Perception: Themes = Aucun thème → panel shows empty themes section | GEO-R1.0/e2e-category-question-perception.csv · e2e-category-question-perception | PASS / 1 SKIP 03/07 (file) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-PERC-TH-02 Perception: Themes = theme badges → panel shows themes list | GEO-R1.0/e2e-category-question-perception.csv · e2e-category-question-perception | PASS / 1 SKIP 03/07 (file) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-PERC-SENT-01 Perception: panel shows SENTIMENT + RESPONSE sections, no rank badges | GEO-R1.0/e2e-category-question-perception.csv · e2e-category-question-perception | PASS / 1 SKIP 03/07 (file) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-PERC-SENT-02 Perception: switching LLM engine keeps SENTIMENT section with per-engine value | GEO-R1.0/e2e-category-question-perception.csv · e2e-category-question-perception | PASS / 1 SKIP 03/07 (file) | **KEEP** | no newer TC contradicts it | — | no |
| E2E-VIS-WN-01 Winner = Brand Name → Favorable all engines | GEO-R1.0/e2e-category-question-visibility.csv · e2e-category-question-visibility | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| E2E-VIS-WN-02 Winner = Competitor Name → non-Favorable + ranking cross-check | GEO-R1.0/e2e-category-question-visibility.csv · e2e-category-question-visibility | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| E2E-VIS-WN-03 Winner = Unranked badge → Unranked all engines | GEO-R1.0/e2e-category-question-visibility.csv · e2e-category-question-visibility | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| E2E-VIS-WN-04 Winner = Split badge → per-engine mix, Split never per-engine | GEO-R1.0/e2e-category-question-visibility.csv · e2e-category-question-visibility | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC001 — Questions table shows grouped questions and key columns | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC002 — Visibility favorability labels are displayed | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **UPDATE** | status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1) | step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04 | yes (behaviour) |
| GEO-67-TC003 — Competitive favorability labels are displayed | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **UPDATE** | status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1) | step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04 | yes (behaviour) |
| GEO-67-TC004 — Perception favorability labels are displayed | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **UPDATE** | status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1) | step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04 | yes (Perception labels: no newer source, wording kept as archived) |
| GEO-67-TC005 — Questions table filters by favorability | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC006 — Expanding a question row shows detailed evidence panel | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC007 — Perception rows show sentiment and themes without rank badges | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **UPDATE** | status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1) | step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04 | yes (Perception labels: no newer source, wording kept as archived) |
| GEO-67-TC008 — Search input filters question rows by text | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC009 — Filters button opens favorability filter panel | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **UPDATE** | status badges "Favorable / Neutral / Unfavorable" → per-type labels (Visibility Favorable / Unfavorable / Unranked, Competitive Won / Lost / Split — GEO-668 / GEO-716, archive question-visibility / question-competitive, R1.1) | step 3 → archive E2E-VIS-WN-01..04, E2E-COMP-WN-01..04 | yes (behaviour) |
| GEO-67-TC010 — Visibility row detail panel shows LLM rank badges and sources | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC011 — Competitive row detail panel shows win/loss and ranking | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC012 — Perception row detail panel shows sentiment and theme badges | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC013 — [SKIP] Table filters by selected market | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-67-TC014 — Table recalculates when LLM filter changes | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **KEEP** | no newer TC contradicts it | — | no |
| GEO-67-TC015 — [SKIP] Empty state message when no question data available | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-67-TC016 — [SKIP] Error state shown with retry option on API failure | GEO-R1.0/e2e-category-questions-table.csv · e2e-category-questions-table | suite 30/05 (file: PASS / SKIP) | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| TC-GEO-663-002 — Category: KPI row shows exactly 4 cards without SOV and layout reflows | GEO-R1.0/e2e-category-SOV.csv · e2e-category-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-663-004 — Category: Brand Rankings table has no SoV% column | GEO-R1.0/e2e-category-SOV.csv · e2e-category-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| TC-GEO-664-002 — SOV dedicated card renders below KPI row on Category view | GEO-R1.0/e2e-category-SOV.csv · e2e-category-SOV | PASS 03/07 | **KEEP** | no newer TC contradicts it (non-regression, test plan scenario 217; GEO-1528 legend rounding Passed QA) | — | no |
| E2E-TOP-CONCEPT-001 — E2E TC4.1 - Top Concepts — Sort modes apply correctly | GEO-R1.0/e2e-category-top-concept.csv · e2e-category-top-concept | PASS 30/05 | **UPDATE** | simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068) | steps 3-5 → TC-GEO-1268-001/002 | yes (behaviour) |
| E2E-TOP-CONCEPT-002 — E2E TC4.2 - Top Concepts — Sentiment filter colors | GEO-R1.0/e2e-category-top-concept.csv · e2e-category-top-concept | PASS 30/05 | **UPDATE** | simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068) | steps 2-7 → TC-GEO-1266-005, TC-GEO-1268-005 | yes (behaviour) |
| E2E-TOP-CONCEPT-003 — E2E TC4.3 - Top Concepts — Detail panel coherence (title color section | GEO-R1.0/e2e-category-top-concept.csv · e2e-category-top-concept | PASS 30/05 | **UPDATE** | simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068) | steps 5, 7 → TC-GEO-1267-001/002/004 | yes (behaviour) |
| E2E-TOP-CONCEPT-004 — E2E TC4.4 - Top Concepts — Sources structure (title subtitle publisher | GEO-R1.0/e2e-category-top-concept.csv · e2e-category-top-concept | FAIL 30/05 | **UPDATE** | widget heading "Top Topics Associated with Your Brand" (TC-GEO-1266-002); sources unchanged (TC-GEO-1267-006) | Given step → TC-GEO-1266-002 | no (label) |
| E2E-TOP-CONCEPT-005 — E2E TC4.5 - Top Concepts — Sources search empty state and close | GEO-R1.0/e2e-category-top-concept.csv · e2e-category-top-concept | PASS 30/05 | **UPDATE** | widget heading "Top Topics Associated with Your Brand" (TC-GEO-1266-002); sources unchanged (TC-GEO-1267-006) | Given step → TC-GEO-1266-002 | no (label) |
| E2E-MARKETS-1LLM-001 — E2E TC2 - Create analysis with 2 markets and 1 LLM (YSL / US+FR / Clau | GEO-R1.0/e2e-create-analysis-markets-1LLM.csv · (no spec) | — | **UPDATE** | same wizard changes; engines moved to Summary; no spec on disk (new spec under the same name) | steps 1, 4-5, 10-17 → TC-GEO-1241-001, 1231-004, 1233-001, 1237-001/006/010 | yes (behaviour) |
| E2E-THERMOMIX-001 — E2E TC - Create analysis 3 markets + 4 LLMs (Thermomix / MA+US+FR / Pe | GEO-R1.0/e2e-create-analysis-markets-llms.csv · (no spec) | — | **RETIRE** | same journey as E2E-MARKETS-1LLM-001 (more countries / engines, 3x the pool cost); replaced by its UPDATE | TC-GEO-1231-004, TC-GEO-1237-006 (via E2E-MARKETS-1LLM-001) | no |
| E2E-CREATE-DEFAULT-001 — E2E TC1 - Create default analysis (Chanel / United States / English) | GEO-R1.0/e2e-create-default-analysis.csv · e2e-create-default-analysis | PASS 18/05 | **UPDATE** | new 5-step wizard, prompt pool, Summary, creation confirmation (GEO-R1.3) | steps 1, 4-5, 8-14 → TC-GEO-1241-001/003, 1231-004, 1233-001, 1229-003, 1237-001/006/010, 1240-004 | yes (behaviour) |
| GEO-79-TC001 — GEO-79 TC1 - Sidebar layout is displayed | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC002 — GEO-79 TC2 - Categories accordion is auto-expanded | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC003 — GEO-79 TC3 - Active view is highlighted | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC004 — GEO-79 TC4 - Sidebar navigation is SPA | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC005 — GEO-79 TC5 - Dashboard pages load within 2 seconds | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | FAIL 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC006 — GEO-79 TC6 - Discard Changes modal appears | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC007 — GEO-79 TC7 - Category sub-items stay displayed for non-category sectio | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC008 — GEO-79 TC8 - Report header shows name and generated date | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC009 — GEO-79 TC9 - Report header has Share and Export buttons | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-79-TC010 — GEO-79 TC10 - AC3 it shows: back arrow next to brand image | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | FAIL 03/07 | **UPDATE** | top bar "LLM filter badges" is now the "AI Engines" filter with its count badge (TC-GEO-1120-017) | step 3 → TC-GEO-1120-017 | no (label) |
| GEO-78-TC001 — GEO-78 TC1 - Default market filter is All Markets | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | FAIL 03/07 | **UPDATE** | "All Markets" now reads "All Countries" (TC-GEO-1120-017, GEO-1514) | step 3 → TC-GEO-1120-017 | no (label) |
| IDENTITY-TC001 — IDENTITY TC1 - All 5 LLM engines are active by default | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | FAIL 03/07 | **UPDATE** | "LLM Engines" filter is now "AI Engines" (TC-GEO-1120-017) | steps 1-2 → TC-GEO-1120-017 | no (label) |
| IDENTITY-TC002 — IDENTITY TC2 - 4 identity cards present below InBrief | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| IDENTITY-TC003 — IDENTITY TC3 - Each card shows sentiment and 3 AI bullets | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| IDENTITY-TC004 — IDENTITY TC4 - Drill-in panel opens with 6 LLM tabs | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | FAIL 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| IDENTITY-TC005 — IDENTITY TC5 - Per-LLM tab shows raw bullets and engine-specific sourc | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | FAIL 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| GEO-78-TC007 — GEO-78 TC7 - LLM Engines dropdown lists engines | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | FAIL 03/07 | **UPDATE** | "LLM Engines" dropdown is now "AI Engines" (TC-GEO-1120-017) | step 3 → TC-GEO-1120-017 | no (label) |
| GEO-72-TC001 — GEO-72 TC1 - AI Perception Summary is displayed | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **UPDATE** | "AI Perception Summary" is now InBrief (logo "InBrief powered by AI Sense", image — TC-GEO-1243-002 / TC-GEO-1231-008 definitions) | steps 2-3 → TC-GEO-1231-008 | no (label) |
| GEO-107-TC001 — GEO-107 TC1 - KPI cards are displayed | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | FAIL 03/07 | **UPDATE** | "LLM Choice" card label is now "AI Choice" (archive TC-GEO-663-001, R1.1) | step 3 → TC-GEO-663-001 | no (label) |
| GEO-107-TC011 — GEO-107 TC11 - AC5 the card shows "N/A" with a muted style instead of | GEO-R1.0/e2e-dashboard-overview.csv · e2e-dashboard-overview | PASS/SKIP 03/07 | **KEEP** | no newer TC contradicts it (non-regression of the brand Overview, test plan scenario 208) | — | no |
| E2E-IDENTITY-001 — TC001 — Dashboard loads with all 5 LLM engines active | GEO-R1.0/e2e-identity-cards-drill-in.csv · (no spec) | — | **RETIRE** | duplicate of e2e-dashboard-overview IDENTITY-TC001, no spec on disk | — | no |
| E2E-IDENTITY-002 — TC002 — 4 Identity cards present below InBrief | GEO-R1.0/e2e-identity-cards-drill-in.csv · (no spec) | — | **RETIRE** | duplicate of e2e-dashboard-overview IDENTITY-TC002, no spec on disk | — | no |
| E2E-IDENTITY-003 — TC003 — Each card shows sentiment + 3 AI bullets | GEO-R1.0/e2e-identity-cards-drill-in.csv · (no spec) | — | **RETIRE** | duplicate of e2e-dashboard-overview IDENTITY-TC003, no spec on disk | — | no |
| E2E-IDENTITY-004 — TC004 — Drill-in panel opens with 6 LLM tabs | GEO-R1.0/e2e-identity-cards-drill-in.csv · (no spec) | — | **RETIRE** | duplicate of e2e-dashboard-overview IDENTITY-TC004, no spec on disk | — | no |
| E2E-IDENTITY-005 — TC005 — Per-LLM tab shows raw bullets and engine-specific sources | GEO-R1.0/e2e-identity-cards-drill-in.csv · (no spec) | — | **RETIRE** | duplicate of e2e-dashboard-overview IDENTITY-TC005, no spec on disk | — | no |
| GEO-61-TC001 — Current scope is displayed on Manage Scope | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **UPDATE** | Countries no longer carry a "Primary" badge (primary market replaced by "Language for AI Insights", GEO-656 R1.1; no "Primary" tag in TC-GEO-1231-004 / TC-GEO-1237-001) | step 3 → TC-GEO-1231-008, TC-GEO-1237-001 step 3 | yes (behaviour) |
| GEO-61-TC002 — Add Country button is visible and enabled | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **KEEP** | still valid ("or equivalent" covers the sentence-case "Add country", GEO-1533); enabled only while the pool has room (TC-GEO-1239-011) | — | no |
| GEO-61-TC003 — Add Topic button is visible and enabled | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **UPDATE** | "+ Add Topic" is now "Add category" (TC-GEO-1239-010 step 1, sentence case GEO-1533 Passed QA) | step 3 → TC-GEO-1239-010 | no (label) |
| GEO-61-TC004 — Remove control visible on country row | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| GEO-61-TC005 — Remove control visible on category row | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| GEO-61-TC006 — [SKIP] Question and competitor updates are persisted | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; replaced by TC-GEO-1239-003 (edit a prompt, applied at the next run) — save action, open point | — | no |
| GEO-61-TC007 — [SKIP] Add Country disabled when max_brand_markets quota reached | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; quota replaced by the prompt pool: TC-GEO-1239-011 (needs a back-office pool change) — open point | — | no |
| GEO-61-TC008 — [SKIP] Add Topic disabled when max_categories quota reached | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; quota replaced by the prompt pool: TC-GEO-1239-011 — open point | — | no |
| GEO-61-TC009 — [SKIP] Reader role sees Manage Scope in read-only mode | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; replaced by NEW E2E-READER-001 (Reader account missing) | — | no |
| GEO-60-TC001 — AI Engines section shows 5 LLM cards with toggles | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| GEO-60-TC002 — [SKIP] Cannot disable the last active LLM | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-60-TC003 — [SKIP] LLM configuration persists until modified again | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-60-TC004 — [SKIP] Minimum 1 LLM constraint shows tooltip when last LLM toggle is | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-60-TC005 — [SKIP] Last active LLM toggle is visually disabled | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-60-TC006 — Web Search checkbox visible and interactive on enabled LLM card | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **KEEP** | no newer TC contradicts it | — | no |
| GEO-60-TC007 — [SKIP] Web search checkbox grayed out on disabled LLM card | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| GEO-60-TC008 — [SKIP] Reader role sees AI Engines in read-only mode | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; replaced by NEW E2E-READER-001 (Reader account missing) | — | no |
| GEO-60-TC009 — [SKIP] LLM configuration persists after navigation | GEO-R1.0/e2e-manage-scope.csv · e2e-manage-scope | PASS 03/07 | **RETIRE** | [SKIP] placeholder with no executable step; prerequisite listed in the open points | — | no |
| E2E-VERIFY-001 — E2E TC3 - Verify brand analysis (reports list + dashboard detail) | GEO-R1.0/e2e-verify-analysis.csv · e2e-verify-analysis | PASS 03/07 | **UPDATE** | GEO dashboard now shows the pool block, a Prompts column and the "Brand / Topic" header | new steps ← TC-GEO-1240-001, 1240-004, 1243-014 | yes (new assertions; GEO-1546) |

## UPDATE scenarios rebuilt from newer TCs (journeys whose steps change)

Label-only UPDATEs (dashboard overview, rankings, perception-citation, manage scope TC003) keep their archive wording with the new label; the table above names the newer TC. The four journeys below are rebuilt:

### E2E-CREATE-DEFAULT-001 : Create a brand analysis for a suggested brand with the new wizard (flag ON)

**Status:** UPDATE · **Pass:** UPDATE + cross-epic (test plan scenario 190) · **Spec:** `e2e-create-default-analysis` · **Archive:** GEO-R1.0/e2e-create-default-analysis.csv (E2E-CREATE-DEFAULT-001)

**TCs covered:** TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1231-003, TC-GEO-1260-004, TC-GEO-1231-004, TC-GEO-1231-010, TC-GEO-1232-001, archive create-default-analysis:E2E-CREATE-DEFAULT-001, TC-GEO-1233-001, TC-GEO-1229-003, TC-GEO-1236-001, TC-GEO-1237-001, TC-GEO-1237-006, TC-GEO-1237-010, TC-GEO-1240-004

**Stories:** GEO-1241, GEO-1231, GEO-1260, GEO-1232, GEO-104, GEO-1233, GEO-1229, GEO-1236, GEO-1237, GEO-1240

**Preconditions:** Staging, QA account allowed to create analyses, interface language en-GB, unbranded flag ON; Room in the prompt pool of the organisation for 5 prompts; ChatGPT and Gemini allowed for the organisation (TC-GEO-1237-006)

**Assumptions:** The analysis keeps only 5 prompts (QA rule): the untick step unticks every suggestion but 5, so the ring / "N selected" figures of TC-GEO-1229-003 scale to the real counts; Brand data of TC-GEO-1260-004 (Nike) replaces Chanel; the JDD may keep Chanel if the user prefers (same expected wording with the other brand name); Archive steps 15-16 ("Last update" column, "In progress") are kept: no newer TC describes this column on the R1.3 dashboard; verify the label on staging before the spec update

**Known bugs:** TC-GEO-1240-004 step 2 relies on the Analysis table header; GEO-1546 (Ready for QA) removes the duplicated "N analyses" label there (no impact on the Prompts column itself)

Changed steps (archive step → newer TC):

| Archive step | Newer TC driving the change | Needs confirmation |
|---|---|---|
| 1 (4-step stepper Brand & Market \| Categories \| Prompts \| Review) | TC-GEO-1241-001 (5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary) | yes (behaviour) |
| 2-3 (brand search, suggestion) | TC-GEO-1260-004 (suggestion card, no website field) + TC-GEO-1231-003 | no (label) |
| 4-5 (Add Market, language auto-detected) | TC-GEO-1231-004 (Add country composer, language prefilled) | yes (behaviour) |
| 6 (Discover Categories loading) | TC-GEO-1231-010 (loading screen, about 20 seconds, no footer) | no |
| 8-9 (Review Prompts, generated questions) | TC-GEO-1233-001 (Generate Prompts, one table, every suggestion ticked) | yes (behaviour) |
| new | TC-GEO-1229-003 + TC-GEO-1236-001 (untick down to 5 prompts, pool ring and popover) | yes (new steps) |
| 10-12 (Review step, 3 summary cards, LLM toggles) | TC-GEO-1237-001 / TC-GEO-1237-006 (Summary scope, engines allowed for the organisation, ChatGPT + Gemini on) | yes (behaviour) |
| 13-14 (Review & Launch, 201, redirect /report/{id}?tab=overview) | TC-GEO-1237-010 (Create Analysis, "Analysis created" confirmation, View analysis) | yes (behaviour) |
| new | TC-GEO-1240-004 (Prompts column on the dashboard) | yes (new step) |

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given the user is on the GEO dashboard of organisation T |  | The dashboard is displayed with New Analysis available | TC-GEO-1241-001 s1 |
| 2 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" | TC-GEO-1241-001 s2 |
| 3 | Then two cards "Brand analysis" and "Unbranded analysis" are displayed |  | Both cards are shown with their descriptions: Brand analysis "Measure how AI engines see, rank and compare your brand against its competitors." and Unbranded analysis "Measure an industry or a topic: which brands AI engines name, and what they say about it."; the Unbranded analysis card has no "No brand scorecard" point | TC-GEO-1241-001 s3 |
| 4 | And no card is selected |  | Neither card is selected and the primary action (Continue) is disabled | TC-GEO-1241-001 s4 |
| 5 | When the user selects the "Brand analysis" card |  | The card is shown selected | TC-GEO-1241-003 s2 |
| 6 | Then the primary action is enabled |  | Continue is enabled | TC-GEO-1241-003 s3 |
| 7 | And the mode pill shows the mode |  | The product bar pill reads "Brand analysis" | TC-GEO-1241-003 s4 |
| 8 | Then the brand question is displayed |  | "What brand are you analysing?" | TC-GEO-1231-003 s3 |
| 9 | And the countries question is displayed |  | "Which countries do you want to analyse?" | TC-GEO-1231-003 s4 |
| 10 | When the user types the name of a suggested brand | S = "Nike" | The dropdown lists Brandfetch suggestions with their logo and domain, plus a "Custom Brand" row for "Nike" | TC-GEO-1260-004 s2 |
| 11 | And the user selects the suggestion | "Nike" (nike.com) | The selected brand card shows today's card: the Nike logo, the name and the domain | TC-GEO-1260-004 s3 |
| 12 | Then no website field is displayed |  | No "What is your brand's website? (optional)" field is shown anywhere on the step | TC-GEO-1260-004 s4 |
| 13 | When the user clicks Add country |  | The composer opens with a country select and a language select | TC-GEO-1231-004 s2 |
| 14 | Then the language select is disabled until a country is picked |  | The language select is greyed and cannot be opened | TC-GEO-1231-004 s3 |
| 15 | When the user picks a country with several languages | Country: United States (default language English (EN)) | The language select becomes enabled and is prefilled with the default language of the country | TC-GEO-1231-004 s4 |
| 16 | When the user clicks Discover Categories |  | A loading screen is displayed | TC-GEO-1231-010 s2 |
| 17 | Then the loading screen states that category discovery takes about 20 seconds |  | The text states about 20 seconds (exact wording from the strings sheet) | TC-GEO-1231-010 s3 |
| 18 | And Brand & Country stays the active step with no footer |  | The stepper still marks Brand & Country; no footer is shown; Back to Dashboard is disabled | TC-GEO-1231-010 s4 |
| 19 | When discovery ends |  | The Categories step opens | TC-GEO-1231-010 s5 |
| 20 | Then each detected category shows an "AI generated" badge |  | Every detected row carries the "AI generated" badge | TC-GEO-1232-001 s3 |
| 21 | And the Editor accepts the AI-discovered categories without modification | Default AI-discovered categories (no edits) | At least one AI-discovered category is visible on Step 2 | archive create-default-analysis:E2E-CREATE-DEFAULT-001 s7 |
| 22 | When the user clicks Generate Prompts and generation ends |  | The Prompts step shows one table with every prompt | TC-GEO-1233-001 s2 |
| 23 | And each prompt carries the category and type that produced it |  | Each C1 row shows Category C1 and its type badge | TC-GEO-1233-001 s5 |
| 24 | When the user unticks 3 prompts | Untick every prompt but 5 (QA rule: test analyses keep 5 prompts) | The 3 rows are greyed and the ring reads "U + 37 / P" | TC-GEO-1229-003 s2 |
| 25 | Then the unticked prompts consume no slot |  | "37 selected" is shown and the popover "this analysis" part reads 37 | TC-GEO-1229-003 s3 |
| 26 | When the user hovers the ring |  | The popover opens | TC-GEO-1236-001 s2 |
| 27 | Then the popover splits other analyses, this analysis and free slots |  | Other analyses = U, Kept in this analysis = 40, Free = P - U - 40 | TC-GEO-1236-001 s3 |
| 28 | When the user clicks Review & Launch |  | The Summary step loads | TC-GEO-1237-001 s2 |
| 29 | And the AI engines are shown |  | The engines allowed for organisation T are shown as toggles | TC-GEO-1237-001 s5 |
| 30 | Then each allowed engine is a toggle, with ChatGPT and Gemini on by default |  | One toggle per allowed engine; ChatGPT and Gemini are on when allowed, every other allowed engine is off; if neither ChatGPT nor Gemini is allowed, every allowed engine is on | TC-GEO-1237-006 s3 |
| 31 | And the other engines are not shown |  | No engine outside the allowed list; no "Available on higher plans" or Upgrade block | TC-GEO-1237-006 s4 |
| 32 | When the user clicks Create Analysis |  | The analysis is scheduled and the "Analysis created" confirmation opens; Back to Dashboard is hidden | TC-GEO-1237-010 s2 |
| 33 | Then the confirmation states the prompts, markets, categories and engines |  | 133 prompts, 2 markets, 2 categories and the names of the 3 engines | TC-GEO-1237-010 s3 |
| 34 | When the user clicks View analysis |  | The new analysis opens | TC-GEO-1237-010 s5 |
| 35 | When the Editor navigates back to the reports list (BASE_URL) | Navigation to BASE_URL — reports list page | The reports list page is displayed with all existing analyses | archive create-default-analysis:E2E-CREATE-DEFAULT-001 s15 |
| 36 | Then the Chanel analysis row shows the value In progress in the Last update column | Brand: Chanel — Last update column | The Last update column of the Chanel row displays In progress indicating the analysis is running | archive create-default-analysis:E2E-CREATE-DEFAULT-001 s16 |
| 37 | Then a "Prompts" column is shown after Categories |  | "Prompts" header right after "Categories" | TC-GEO-1240-004 s2 |
| 38 | And the value of an analysis equals its kept prompts across its markets | Analysis A (Manage Scope > Prompts: ticked rows) | The Prompts value of A equals its number of ticked rows | TC-GEO-1240-004 s4 |

---

### E2E-MARKETS-1LLM-001 : Create a brand analysis on two countries with a single AI engine

**Status:** UPDATE · **Pass:** UPDATE (GEO-1002) · **Spec:** `e2e-create-analysis-markets-1LLM` · **Archive:** GEO-R1.0/e2e-create-analysis-markets-1LLM.csv (E2E-MARKETS-1LLM-001) — no spec on disk; absorbs GEO-R1.0/e2e-create-analysis-markets-llms.csv (E2E-THERMOMIX-001, RETIRE)

**TCs covered:** TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-004, TC-GEO-1231-004, archive create-analysis-markets-1LLM:E2E-MARKETS-1LLM-001, TC-GEO-1231-010, TC-GEO-1233-001, TC-GEO-1229-003, TC-GEO-1237-001, TC-GEO-1237-006, TC-GEO-1237-010

**Stories:** GEO-1241, GEO-1260, GEO-1231, GEO-104, GEO-1233, GEO-1229, GEO-1237

**Preconditions:** Same as E2E-CREATE-DEFAULT-001; Claude allowed for the organisation (otherwise the engine step cannot be run); Room in the pool: each kept prompt costs one slot per country (TC-GEO-1229-002)

**Assumptions:** 5 prompts kept in total (QA rule); with 2 countries the ring counts one slot per prompt and per country; TC-GEO-1237-001 step 3 expected names follow the JDD countries (United States · English and France · French instead of United Kingdom · English and France · French)

**Known bugs:** none open (Jira read 2026-10-28)

Changed steps (archive step → newer TC):

| Archive step | Newer TC driving the change | Needs confirmation |
|---|---|---|
| 1 (4-step stepper) | TC-GEO-1241-001 / TC-GEO-1241-003 | yes (behaviour) |
| 4-5 (Add Market) | TC-GEO-1231-004 | yes (behaviour) |
| 10-12 (Review Prompts / Review) | TC-GEO-1233-001, TC-GEO-1229-003 | yes (behaviour) |
| 13 (Markets summary card = 2) | TC-GEO-1237-001 step 3 (scope lists the markets) | yes (behaviour) |
| 14-15 (LLM toggles on Step 4) | kept, now on Summary (TC-GEO-1237-006: allowed engines only; TC-GEO-1237-007: only the last engine re-enables all) | yes (location) |
| 16-17 (Review & Launch, redirect) | TC-GEO-1237-010 | yes (behaviour) |

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" | TC-GEO-1241-001 s2 |
| 2 | When the user selects the "Brand analysis" card |  | The card is shown selected | TC-GEO-1241-003 s2 |
| 3 | And the mode pill shows the mode |  | The product bar pill reads "Brand analysis" | TC-GEO-1241-003 s4 |
| 4 | When the user types the name of a suggested brand | S = "YVES SAINT LAURENT" (archive data) | The dropdown lists Brandfetch suggestions with their logo and domain, plus a "Custom Brand" row for "Nike" | TC-GEO-1260-004 s2 |
| 5 | And the user selects the suggestion | "YVES SAINT LAURENT" suggestion | The selected brand card shows today's card: the Nike logo, the name and the domain | TC-GEO-1260-004 s3 |
| 6 | When the user clicks Add country |  | The composer opens with a country select and a language select | TC-GEO-1231-004 s2 |
| 7 | When the user picks a country with several languages | Country: United States (English (EN)) | The language select becomes enabled and is prefilled with the default language of the country | TC-GEO-1231-004 s4 |
| 8 | When the Editor adds the second country France | Country: France, Add Market action | A second market row is created with country = France | archive create-analysis-markets-1LLM:E2E-MARKETS-1LLM-001 s6 |
| 9 | Then the language French is auto-detected on the second market row | Auto-detected language: French | The Language field shows French (no manual selection needed) | archive create-analysis-markets-1LLM:E2E-MARKETS-1LLM-001 s7 |
| 10 | When the user clicks Discover Categories |  | A loading screen is displayed | TC-GEO-1231-010 s2 |
| 11 | When discovery ends |  | The Categories step opens | TC-GEO-1231-010 s5 |
| 12 | And the Editor accepts the AI-discovered categories without modification | Default AI-discovered categories (no edits) | At least one AI-discovered category is visible on Step 2 | archive create-analysis-markets-1LLM:E2E-MARKETS-1LLM-001 s9 |
| 13 | When the user clicks Generate Prompts and generation ends |  | The Prompts step shows one table with every prompt | TC-GEO-1233-001 s2 |
| 14 | When the user unticks 3 prompts | Untick every prompt but 5 | The 3 rows are greyed and the ring reads "U + 37 / P" | TC-GEO-1229-003 s2 |
| 15 | When the user clicks Review & Launch |  | The Summary step loads | TC-GEO-1237-001 s2 |
| 16 | Then the scope shows the markets | United States · English and France · French | United Kingdom · English and France · French, with no "Primary" tag | TC-GEO-1237-001 s3 |
| 17 | Then each allowed engine is a toggle, with ChatGPT and Gemini on by default |  | One toggle per allowed engine; ChatGPT and Gemini are on when allowed, every other allowed engine is off; if neither ChatGPT nor Gemini is allowed, every allowed engine is on | TC-GEO-1237-006 s3 |
| 18 | When the Editor disables all LLM engines except Claude | Disable all non-Claude LLM toggles | All LLM toggles are off except the Claude toggle which remains enabled | archive create-analysis-markets-1LLM:E2E-MARKETS-1LLM-001 s14 |
| 19 | Then only the Claude LLM engine is enabled | Claude toggle aria-checked=true all others aria-checked=false | Exactly 1 LLM toggle is enabled and it corresponds to Claude | archive create-analysis-markets-1LLM:E2E-MARKETS-1LLM-001 s15 |
| 20 | When the user clicks Create Analysis |  | The analysis is scheduled and the "Analysis created" confirmation opens; Back to Dashboard is hidden | TC-GEO-1237-010 s2 |
| 21 | Then the confirmation states the prompts, markets, categories and engines |  | 133 prompts, 2 markets, 2 categories and the names of the 3 engines | TC-GEO-1237-010 s3 |
| 22 | When the user clicks View analysis |  | The new analysis opens | TC-GEO-1237-010 s5 |

---

### E2E-VERIFY-001 : Find a brand analysis on the GEO dashboard with its prompt pool and open it

**Status:** UPDATE · **Pass:** UPDATE (GEO-1002 GEO-1240, GEO-1209 GEO-1243) + cross-epic (test plan scenario 196) · **Spec:** `e2e-verify-analysis` · **Archive:** GEO-R1.0/e2e-verify-analysis.csv (E2E-VERIFY-001)

**TCs covered:** archive verify-analysis:E2E-VERIFY-001, TC-GEO-1240-001, TC-GEO-1240-004, TC-GEO-1243-014

**Stories:** GEO-104, GEO-1240, GEO-1243

**Preconditions:** Analysis created by E2E-MARKETS-1LLM-001 (YSL, US + FR, Claude) or the JDD_PROFILE analysis; Unbranded flag ON (column "Brand / Topic")

**Assumptions:** The Prompts column sum covers brand and unbranded analyses (scenario 196: one pool for both types)

**Known bugs:** TC-GEO-1240-001 step 3 names the "N analyses" label next to the ring: GEO-1546 (Ready for QA) removes the duplicated label from the Analysis table header — needs confirmation once GEO-1546 is Passed QA

Changed steps (archive step → newer TC):

| Archive step | Newer TC driving the change | Needs confirmation |
|---|---|---|
| new | TC-GEO-1240-001 (pool block and popover), TC-GEO-1240-004 (Prompts column adds up to the pool) | yes (new steps) |
| new | TC-GEO-1243-014 steps 2 and 5 (header "Brand / Topic", brand rows unchanged) | no (label) |

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given an authenticated Editor navigates to the reports list | Navigation URL: BASE_URL | The reports list page is displayed with all existing analyses | archive verify-analysis:E2E-VERIFY-001 s1 |
| 2 | Then a pool block is shown in the header of the Analysis table |  | Next to the number of analyses (e.g. "5 analyses"), the ring reads "U / P" | TC-GEO-1240-001 s3 |
| 3 | When the user hovers the ring |  | The popover splits used (U) and free (P - U) slots | TC-GEO-1240-001 s4 |
| 4 | Then a "Prompts" column is shown after Categories |  | "Prompts" header right after "Categories" | TC-GEO-1240-004 s2 |
| 5 | And the column adds up to the pool block | Sum of the Prompts column (Show more to list every analysis) | The sum equals U of the pool block "U / P" | TC-GEO-1240-004 s3 |
| 6 | When the list shows analysis UA |  | The column header reads "Brand / Topic" | TC-GEO-1243-014 s2 |
| 7 | And brand analyses keep their logo and domain |  | Brand rows are unchanged | TC-GEO-1243-014 s5 |
| 8 | When the Editor locates the brand row in the reports list | Brand name: configured via JDD_PROFILE (e.g. Dyson | YVES SAINT LAURENT) | archive verify-analysis:E2E-VERIFY-001 s2 |
| 9 | When the Editor clicks on the brand analysis row | Click on the brand row | The browser navigates to a dashboard URL of the form /dashboard/{uuid} | archive verify-analysis:E2E-VERIFY-001 s3 |
| 10 | Then the URL matches the pattern /dashboard/{uuid} | URL pattern: /dashboard/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX | The current URL contains /dashboard/ followed by a valid UUID | archive verify-analysis:E2E-VERIFY-001 s4 |
| 11 | And the dashboard page shows the market United States | Expected market: United States | The text United States is visible on the dashboard page | archive verify-analysis:E2E-VERIFY-001 s5 |
| 12 | And the dashboard page shows the market France | Expected market: France | The text France is visible on the dashboard page | archive verify-analysis:E2E-VERIFY-001 s6 |
| 13 | And the dashboard page shows the LLM Claude | Expected LLM: Claude | The text Claude is visible on the dashboard page indicating the LLM engine used | archive verify-analysis:E2E-VERIFY-001 s7 |
| 14 | And the dashboard page shows exactly 1 LLM engine | LLM count: 1 | Only 1 LLM engine (Claude) is referenced on the dashboard — no other LLM names (ChatGPT Gemini Grok Perplexity) are visible | archive verify-analysis:E2E-VERIFY-001 s8 |

---

### E2E-TOP-CONCEPT-001..005 : Top Topics of a brand category: sort, polarity filters, detail panel, sources (simplified display)

**Status:** UPDATE · **Pass:** UPDATE (GEO-1068 + GEO-R1.1 GEO-648) · **Spec:** `e2e-category-top-concept` · **Archive:** GEO-R1.0/e2e-category-top-concept.csv (5 TCs, split into -01 … -05)

**TCs covered:** archive category-top-concept:E2E-TOP-CONCEPT-001, TC-GEO-1268-001, TC-GEO-1268-002, TC-GEO-1266-005, TC-GEO-1268-005, TC-GEO-1267-001, TC-GEO-1267-002, TC-GEO-1267-004, TC-GEO-1267-006, archive category-top-concept:E2E-TOP-CONCEPT-004, archive category-top-concept:E2E-TOP-CONCEPT-005

**Stories:** GEO-75, GEO-1268, GEO-1266, GEO-1267

**Preconditions:** Brand analysis category page with Positive, Mixed and Negative concepts (JDD dashboard_uuid / category_uuid)

**Assumptions:** Widget heading "Top Concepts Associated with …" is now "Top Topics Associated with Your Brand" (TC-GEO-1266-002)

**Known bugs:** Last suite run (30/05): E2E-TOP-CONCEPT-004 FAILED (sources structure) — spec maintenance

Changed steps (archive step → newer TC):

| Archive step | Newer TC driving the change | Needs confirmation |
|---|---|---|
| TC4.1 step 1 / TC4.2-4.5 Given (heading "Top Concepts Associated with") | TC-GEO-1266-002 ("Top Topics Associated with Your Brand") | no (label) |
| TC4.1 step 3 (Frequency = sources count order) | TC-GEO-1268-002 (frequency % decreases, ties A→Z) | yes (behaviour) |
| TC4.1 steps 4-5 (grouped by colour, either direction) | TC-GEO-1268-001 (Positive, then Mixed, then Negative; no score in the sort menu) | yes (behaviour) |
| TC4.2 (filters checked by green / yellow / red indicator) | TC-GEO-1266-005 (explicit polarity label) + TC-GEO-1268-005 (filter list = pill count) | yes (behaviour) |
| TC4.3 steps 5 and 7 (header colour, Positive / Negative indicators in the panel) | TC-GEO-1267-001 / 1267-002 (header "{f}% frequency • {label}", no score), TC-GEO-1267-004 (no barometer) | yes (behaviour) |
| TC4.4 / TC4.5 (sources, All sources, search) | kept; TC-GEO-1267-006 step 6 adds "no quote in the panel" | no |

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given an authenticated user opens the category page with concepts | Category URL: BASE_URL/dashboard/{dashboard_uuid}/category/{category_uuid} | The Top Concepts widget heading is visible (prefix Top Concepts Associated with) and the concept list is rendered | archive category-top-concept:E2E-TOP-CONCEPT-001 s1 |
| 2 | When the user opens the Sort dropdown and applies Sort by Frequency | Sort mode: Sort by Frequency | The dropdown closes and the trigger label updates to Sort by Frequency | archive category-top-concept:E2E-TOP-CONCEPT-001 s2 |
| 3 | Then the concept list is monotonically ordered by sources count | Sort mode: Frequency | Each consecutive concept has a sources count >= or <= the previous one (no random order) | archive category-top-concept:E2E-TOP-CONCEPT-001 s3 |
| 4 | When the user opens the sort menu |  | The menu lists "Sort by Frequency", "Sort by Sentiment" and "Sort A-Z", and no score entry | TC-GEO-1268-001 s2 |
| 5 | And the user selects Sentiment | Sort: Sentiment | The list is re-ordered | TC-GEO-1268-001 s3 |
| 6 | Then the Positive concepts come first, then the Mixed ones, then the Negative ones |  | Every "Positive" row is above every "Mixed" row, and every "Mixed" row is above every "Negative" row | TC-GEO-1268-001 s4 |
| 7 | And no numeric score is exposed |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on the rows or in the sort menu | TC-GEO-1268-001 s5 |
| 8 | When the user reads the frequency % inside the Positive group |  | The frequency % decreases from top to bottom (highest first) | TC-GEO-1268-002 s2 |
| 9 | And the user reads the frequency % inside the Mixed and the Negative groups |  | In each group the frequency % decreases from top to bottom | TC-GEO-1268-002 s3 |
| 10 | Then concepts with the same frequency are ordered by name A→Z | Two concepts of the same polarity with the same frequency % | The concept whose name comes first alphabetically is listed first | TC-GEO-1268-002 s4 |
| 11 | When the user applies Sort A-Z | Sort mode: Sort A-Z | The dropdown closes and the trigger label updates to Sort A-Z | archive category-top-concept:E2E-TOP-CONCEPT-001 s6 |
| 12 | Then the concept list is sorted alphabetically by concept name | Sort mode: A-Z | Concept names are in alphabetical order (case-insensitive ascending or descending) | archive category-top-concept:E2E-TOP-CONCEPT-001 s7 |
| 13 | When the user looks at the row of a Positive concept | Concept P | The meta line ends with a "Positive" pill styled like the "Positive" filter pill, without a count (e.g. "12 sources • Positive") | TC-GEO-1266-005 s2 |
| 14 | And the user looks at the row of a Mixed concept | Concept M | The meta line ends with a "Mixed" pill styled like the "Mixed" filter pill, without a count | TC-GEO-1266-005 s3 |
| 15 | And the user looks at the row of a Negative concept | Concept N | The meta line ends with a "Negative" pill styled like the "Negative" filter pill, without a count | TC-GEO-1266-005 s4 |
| 16 | Then the polarity can be read without relying on colour |  | Each row states its polarity in text; the coloured accent bar and the colour of the frequency % are still shown and match the label (green Positive, amber Mixed, red Negative) | TC-GEO-1266-005 s5 |
| 17 | When the user selects the Positive filter pill | Filter: Positive | Only "Positive" concepts are listed and their number equals the count of the Positive pill | TC-GEO-1268-005 s2 |
| 18 | And the user deselects Positive and selects Mixed | Filter: Mixed | Only "Mixed" concepts are listed and their number equals the count of the Mixed pill | TC-GEO-1268-005 s3 |
| 19 | And the user deselects Mixed and selects Negative | Filter: Negative | Only "Negative" concepts are listed and their number equals the count of the Negative pill | TC-GEO-1268-005 s4 |
| 20 | Then removing the filter restores the full list |  | All concepts are listed again; their number equals the sum of the three pill counts | TC-GEO-1268-005 s5 |
| 21 | When the user clicks the row of a Positive concept | Concept P | The concept detail panel opens with a coloured header showing the concept name and the close button | TC-GEO-1267-001 s2 |
| 22 | Then the header shows the frequency and the polarity label |  | The header reads "{f}% frequency • Positive", "Positive" in a white pill (e.g. "90% frequency • Positive") | TC-GEO-1267-001 s3 |
| 23 | And no sentiment score is shown in the panel |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown anywhere in the panel | TC-GEO-1267-001 s4 |
| 24 | And the panel frequency matches the clicked row |  | The frequency % in the header equals the frequency % of the row of P | TC-GEO-1267-001 s5 |
| 25 | When the user clicks the row of a Mixed concept | Concept M | The panel opens with the header in the Mixed (amber) colour and reads "{f}% frequency • Mixed", "Mixed" in a white pill readable on the header | TC-GEO-1267-002 s2 |
| 26 | And the user closes the panel and clicks the row of a Negative concept | Concept N | The panel opens with the header in the Negative (red) colour and reads "{f}% frequency • Negative", "Negative" in a white pill readable on the header | TC-GEO-1267-002 s3 |
| 27 | Then neither panel shows a sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown anywhere in the panel for M and N | TC-GEO-1267-002 s4 |
| 28 | Then the barometer gauge is not shown |  | No Negative-to-Positive gauge bar and no cursor are displayed in the panel | TC-GEO-1267-004 s3 |
| 29 | And no quote is shown in the panel |  | The panel has no quotes section and no quote text | TC-GEO-1267-006 s6 |
| 30 | And the user switches to the Sources section inside the panel | Click Sources section in the panel | The Sources content is shown with a subset of sources and the All sources button | archive category-top-concept:E2E-TOP-CONCEPT-004 s3 |
| 31 | Then every source row in the detail panel carries a title subtitle publisher logo at least one LLM logo image and a navigation link | Panel sources subset (visible inside #identity outside any radix popover) | Each source row in the panel exposes: a non-empty title a non-empty subtitle (URL/domain) a visible publisher/source logo image at least one visible LLM logo image (img with alt attribute matching chatgpt/claude/gemini/grok/openai/perplexity img.naturalWidth>0) and a visible navigation link with href (Open <title>) | archive category-top-concept:E2E-TOP-CONCEPT-004 s4 |
| 32 | When the user opens the All sources modal | Click All sources button | The All sources modal opens with the Search by title or URL input visible | archive category-top-concept:E2E-TOP-CONCEPT-004 s5 |
| 33 | Then every source row in the All sources modal carries a title subtitle publisher logo at least one LLM logo image and a navigation link | Modal sources full set (inside [id^=radix-] popover) | Each source row in the modal exposes: a non-empty title a non-empty subtitle (URL/domain) a visible publisher/source logo image at least one LLM logo image (img with alt attribute matching chatgpt/claude/gemini/grok/openai/perplexity img.naturalWidth>0) and a visible navigation link with href | archive category-top-concept:E2E-TOP-CONCEPT-004 s6 |
| 34 | And the All sources modal contains at least as many source rows as the panel (full set vs subset) | Modal source count vs panel source count | modalSources.length >= panelSources.length (the modal must expose at least as many sources as the inline panel — the modal is the full set the panel a subset) | archive category-top-concept:E2E-TOP-CONCEPT-004 s7 |
| 35 | When the user types 1555555 in the search input | Search query: 1555555 (non-matching) | The input value is updated and the source list reacts to the query | archive category-top-concept:E2E-TOP-CONCEPT-005 s3 |
| 36 | Then the message No sources match your search. is visible inside the modal | Empty state message: No sources match your search. | The text No sources match your search. is rendered inside the All sources modal | archive category-top-concept:E2E-TOP-CONCEPT-005 s4 |
| 37 | When the user presses Escape to close the All sources modal | Keyboard: Escape | The All sources modal is dismissed and the detail panel remains visible | archive category-top-concept:E2E-TOP-CONCEPT-005 s5 |
| 38 | And the user clicks the Close detail panel button | Click Close detail panel button | The detail panel is closed and the Close detail panel button is no longer visible | archive category-top-concept:E2E-TOP-CONCEPT-005 s6 |

---

## Excluded TCs

- **superseded by GEO-R1.3 prompt pool (TC-GEO-1239-009 / 010 / 011)** — 4 TCs: GEO-61-TC2, GEO-61-TC3, GEO-61-TC7, GEO-61-TC8
- **superseded by GEO-R1.2 Action Center - Target Sources (GEO-152)** — 7 TCs: GEO-65-TC1, GEO-65-TC2, GEO-64-TC1, GEO-64-TC2, GEO-63-TC1, GEO-62-TC1, GEO-62-TC2
- **backend / API only** — 6 TCs: GEO-70-TC7, TC-GEO-1125-012, TC-GEO-1168-028, TC-GEO-1169-014, TC-GEO-1251-003, TC-GEO-1242-008
- **superseded by GEO-R1.1 GEO-663 (4 KPI cards, archive e2e-brand-SOV)** — 7 TCs: GEO-73-TC1, GEO-73-TC2, GEO-73-TC3, GEO-73-TC4, GEO-73-TC5, GEO-73-TC6, GEO-73-TC7
- **superseded by GEO-R1.2 GEO-1125 / GEO-1126 (AI Engines Citation Sources)** — 15 TCs: GEO-77-TC1, GEO-77-TC2, GEO-77-TC3, GEO-77-TC4, GEO-77-TC5, GEO-77-TC6, GEO-77-TC7, GEO-77-TC8, GEO-77-TC9, GEO-77-TC10, GEO-77-TC11, GEO-77-TC12, GEO-77-TC13, GEO-77-TC14, GEO-77-TC15
- **superseded by GEO-R1.3 GEO-1068 + GEO-R1.1 GEO-648 (Top Concepts)** — 19 TCs: GEO-75-TC1, GEO-75-TC2, GEO-75-TC3, GEO-75-TC4, GEO-75-TC5, GEO-75-TC6, GEO-75-TC7, GEO-75-TC8, GEO-75-TC9, GEO-75-TC10, GEO-75-TC11, GEO-75-TC12, GEO-75-TC13, GEO-75-TC14, GEO-75-TC15, GEO-75-TC16, GEO-75-TC17, GEO-75-TC18, GEO-75-TC19
- **backend only (analysis pipeline)** — 25 TCs: GEO-87-TC1, GEO-87-TC2, GEO-87-TC3, GEO-86-TC1, GEO-86-TC2, GEO-86-TC3, GEO-86-TC4, GEO-86-TC5, GEO-85-TC1, GEO-85-TC2, GEO-83-TC1, GEO-83-TC2, GEO-83-TC3, GEO-84-TC1, GEO-84-TC2, GEO-84-TC3, GEO-86-TC6, GEO-85-TC3, GEO-85-TC4, GEO-84-TC4, GEO-83-TC4, GEO-83-TC5, GEO-83-TC6, GEO-82-TC1, GEO-82-TC2
- **superseded by GEO-R1.3 wizard (GEO-1002 / GEO-1209 / GEO-1069)** — 74 TCs: every TC of GEO-R0.1/testcases-coverage-epic104-20260430.csv (old 4-step wizard GEO-88…GEO-94)
- **not delivered (GEO-99 stories in Backlog)** — 10 TCs: GEO-57-TC1, GEO-57-TC2, GEO-57-TC3, GEO-56-TC1, GEO-56-TC2, GEO-55-TC1, GEO-55-TC2, GEO-55-TC3, GEO-57-TC4, GEO-55-TC4
- **back office only (prerequisite, no UI step of the app)** — 79 TCs: TC-GEO-397-001, TC-GEO-397-002, TC-GEO-397-003, TC-GEO-397-004, TC-GEO-397-005, TC-GEO-397-006, TC-GEO-397-007, TC-GEO-397-008, TC-GEO-397-009, TC-GEO-397-010, TC-GEO-397-011, TC-GEO-397-012, TC-GEO-397-013, TC-GEO-397-014, TC-GEO-397-015, TC-GEO-397-016, TC-GEO-397-017, TC-GEO-397-018, TC-GEO-397-019, TC-GEO-397-020, TC-GEO-397-021, TC-GEO-397-029, TC-GEO-397-030, TC-GEO-397-031, TC-GEO-397-032, TC-GEO-1051-001, TC-GEO-1051-002, TC-GEO-1051-003, TC-GEO-1051-004, TC-GEO-1051-005, TC-GEO-1051-006, TC-GEO-1051-007, TC-GEO-1051-008, TC-GEO-1058-001, TC-GEO-1058-002, TC-GEO-1058-003, TC-GEO-1058-004, TC-GEO-1058-005, TC-GEO-1058-006, TC-GEO-1058-007, TC-GEO-1058-008, TC-GEO-1058-009, TC-GEO-1059-001, TC-GEO-1059-002, TC-GEO-1059-003, TC-GEO-1059-004, TC-GEO-1060-001, TC-GEO-1060-002, TC-GEO-1060-003, TC-GEO-1060-004, TC-GEO-1060-005, TC-GEO-1063-001, TC-GEO-1063-002, TC-GEO-1063-003, TC-GEO-1063-004, TC-GEO-1063-005, TC-GEO-1063-006, TC-GEO-1063-007, TC-GEO-1063-008, TC-GEO-1172-001, TC-GEO-1172-002, TC-GEO-1172-003, TC-GEO-1172-004, TC-GEO-1172-005, TC-GEO-1172-006, TC-GEO-1172-007, TC-GEO-1230-001, TC-GEO-1230-002, TC-GEO-1230-003, TC-GEO-1230-004, TC-GEO-1230-005, TC-GEO-1230-006, TC-GEO-1230-007, TC-GEO-1230-008, TC-GEO-1230-009, TC-GEO-1230-010, TC-GEO-1515-001, TC-GEO-1515-002, TC-GEO-1515-003
- **backend only (summary persistence / cache)** — 13 TCs: TC-GEO-539-US1.1-001, TC-GEO-539-US1.1-002, TC-GEO-539-US1.2-001, TC-GEO-539-US1.2-002, TC-GEO-539-US1.2-003, TC-GEO-539-US1.3-001, TC-GEO-539-US1.3-002, TC-GEO-539-US1.3-003, TC-GEO-539-US1.4-001, TC-GEO-539-US1.4-002, TC-GEO-539-US1.5-001, TC-GEO-539-US1.5-002, TC-GEO-539-US1.5-003
- **duplicate (older copy of the TC in testcases-coverage-epicGEO-152.csv)** — 137 TCs: every TC of testcases-coverage-epicGEO-152 -GEO1116.csv, testcases-coverage-storyGEO-1120.csv, testcases-coverage-storyGEO-1125.csv, testcases-coverage-storyGEO-1166.csv, testcases-coverage-storyGEO-1168.csv, testcases-coverage-storyGEO-1169.csv, testcases-coverage-storyGEO-1173.csv, testcases-coverage-storyGEO-1178.csv, testcases-coverage-storyGEO-1183.csv (GEO-R1.2). The epic CSV holds the same ids with the later "Updated …" notes.
- **superseded by GEO-R1.3 TC-GEO-1184-* (GEO-1513)** — 5 TCs: TC-GEO-1184-001, TC-GEO-1184-002, TC-GEO-1184-003, TC-GEO-1184-004, TC-GEO-1184-005
- **flag OFF only (needs another account / environment)** — 3 TCs: TC-GEO-1231-001, TC-GEO-1234-005, TC-GEO-1241-002

Not excluded but not consolidated into E2E (stay in their per-epic suites): string / locale TCs, single-rule checks (passage length, tie-breaks…), GEO-200 cookie consent and GEO-237 / GEO-427 upsell (store / cookie level, existing specs test-suite-epic200 and e2e-hubspot-upsell-pql), GEO-257 SOV calculation, GEO-1183 passage checks, GEO-680 user management writes.

## New scenarios (per epic → cross-epic → non-regression)

### E2E-WIZARD-PROMPTS-001 : Shape the prompt list in the wizard, then leave without creating

**Status:** NEW · **Pass:** 1 — per epic (GEO-1002) · **Spec:** `e2e-wizard-prompts`

**TCs covered:** TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1238-001, TC-GEO-1231-010, TC-GEO-1233-001, TC-GEO-1235-001, TC-GEO-1235-003, TC-GEO-1233-004, TC-GEO-1233-005, TC-GEO-1234-001, TC-GEO-1234-003, TC-GEO-1234-006, TC-GEO-1235-008, TC-GEO-1236-001, TC-GEO-1238-005

**Stories:** GEO-1241, GEO-1238, GEO-1231, GEO-1233, GEO-1235, GEO-1234, GEO-1236

**Preconditions:** Staging, en-GB, flag ON, QA account allowed to create analyses; Nothing is created: the scenario ends with Exit and Discard

**Assumptions:** Counts quoted in the expected results (40, 39, C1 (60)…) depend on the categories discovered for the brand; the spec reads the live values

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" | TC-GEO-1241-001 s2 |
| 2 | When the user selects the "Brand analysis" card |  | The card is shown selected | TC-GEO-1241-003 s2 |
| 3 | Then the primary action is enabled |  | Continue is enabled | TC-GEO-1241-003 s3 |
| 4 | Given the user is on Brand & Country and has entered a brand and a market | Brand "Decathlon"; market GB (EN) | The entries are shown | TC-GEO-1238-001 s1 |
| 5 | When the user clicks Discover Categories |  | A loading screen is displayed | TC-GEO-1231-010 s2 |
| 6 | When discovery ends |  | The Categories step opens | TC-GEO-1231-010 s5 |
| 7 | Given the user is on the Categories step with category C1 |  | Generate Prompts is enabled | TC-GEO-1233-001 s1 |
| 8 | When the user clicks Generate Prompts and generation ends |  | The Prompts step shows one table with every prompt | TC-GEO-1233-001 s2 |
| 9 | When the table renders |  | All prompts of all markets are in one table, with no market or type tabs | TC-GEO-1235-001 s2 |
| 10 | Then the table shows its five columns |  | "Prompt", "Category", "Type", "Market", "Actions" | TC-GEO-1235-001 s3 |
| 11 | When the user clicks the sort trigger of the Category header |  | A menu opens with "Sort ascending", "Sort descending", a checkbox list and "Clear filter" | TC-GEO-1235-003 s2 |
| 12 | Then the checkbox list shows each value with its live count |  | C1 (60), C2 (60), Overview (20) and Other (0) (listed with no prompt in Other, by design: QA decision 2026-10-22, Q-06) | TC-GEO-1235-003 s3 |
| 13 | When the user checks C1 and chooses Sort ascending |  | Only C1 prompts are listed and the header shows the number 2 (1 value + 1 sort) | TC-GEO-1235-003 s4 |
| 14 | When the user clicks Clear filter |  | All prompts are listed again, the sort is removed and the header shows no number | TC-GEO-1235-003 s5 |
| 15 | When the user unticks a prompt and notes its wording | Any Visibility prompt of C1 | The row is greyed (muted) and the ring decreases by 1 | TC-GEO-1233-004 s2 |
| 16 | And the user ticks the same row again |  | The row is no longer greyed and the ring increases by 1 | TC-GEO-1233-004 s3 |
| 17 | Then the prompt is kept again without being regenerated |  | The row shows exactly the same wording, category, type and market as before | TC-GEO-1233-004 s4 |
| 18 | And the user clicks the trash icon of kept prompt B | Prompt B = another C1 row | Prompt B disappears from the table and an Undo toast is shown | TC-GEO-1233-005 s3 |
| 19 | When the user clicks Add prompt |  | An editable row opens at the top of the table | TC-GEO-1234-001 s2 |
| 20 | Then the row holds a text input and the category, type and market selects |  | Text input, Category select, Type select and Market select are displayed | TC-GEO-1234-001 s3 |
| 21 | And the row holds confirm and cancel |  | Confirm and cancel controls are displayed on the row | TC-GEO-1234-001 s4 |
| 22 | When the user opens the category select |  | Only C1 and C2 are listed, with no Add category action | TC-GEO-1234-003 s2 |
| 23 | And the user opens the market select |  | Only GB (EN) and FR (FR) are listed; the select is prefilled with GB (EN), the first market of the analysis | TC-GEO-1234-003 s3 |
| 24 | Given the user has filled a new row | Prompt: "Which brand sells the best kayaks" - Category C2 - Type Competitive - Market GB (EN) | Confirm is enabled; ring reads "X / P" | TC-GEO-1234-006 s1 |
| 25 | When the user confirms |  | The toast "Prompt added. It uses one pool slot." is shown | TC-GEO-1234-006 s2 |
| 26 | Then the row is added kept and highlighted |  | The row is ticked, highlighted, at the top of the table; the ring reads "X + 1 / P" | TC-GEO-1234-006 s3 |
| 27 | And the row is marked with a CUSTOM badge |  | CUSTOM badge on the row; the wording ends with "?" | TC-GEO-1234-006 s4 |
| 28 | When the user edits the wording of R without "?" | New wording: "Is Decathlon a trusted brand for running gear" | The edit field shows the new text | TC-GEO-1235-008 s2 |
| 29 | And the user saves |  | R shows "Is Decathlon a trusted brand for running gear?" | TC-GEO-1235-008 s3 |
| 30 | Then only the wording changed |  | Category C1, type Reputation, market GB (EN) and the ticked state of R are unchanged | TC-GEO-1235-008 s4 |
| 31 | When the user hovers the ring |  | The popover opens | TC-GEO-1236-001 s2 |
| 32 | Then the popover splits other analyses, this analysis and free slots |  | Other analyses = U, Kept in this analysis = 40, Free = P - U - 40 | TC-GEO-1236-001 s3 |
| 33 | When the user clicks Back to Dashboard |  | "Exit setup?" opens | TC-GEO-1238-005 s2 |
| 34 | And the user clicks Resume Setup |  | The confirmation closes | TC-GEO-1238-005 s3 |
| 35 | Then the user stays on the same step with every choice intact |  | Prompts step, "39 selected", the 2 unticked rows and the CUSTOM prompt unchanged | TC-GEO-1238-005 s4 |
| 36 | When the user clicks Back to Dashboard |  | The "Exit setup?" confirmation opens | TC-GEO-1238-001 s2 |
| 37 | And the confirmation offers Resume Setup and Exit and Discard |  | "Resume Setup" and "Exit and Discard" are shown | TC-GEO-1238-001 s4 |
| 38 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created | TC-GEO-1238-001 s5 |

---

### E2E-WIZARD-WEBSITE-001 : Custom brand website: field, URL normalisation, logo preview and errors (no creation)

**Status:** NEW · **Pass:** 1 — per epic (GEO-1069) · **Spec:** `e2e-wizard-brand-website`

**TCs covered:** TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-001, TC-GEO-1261-005, TC-GEO-1261-007, TC-GEO-1261-001, TC-GEO-1262-005, TC-GEO-1262-007, TC-GEO-1262-004, TC-GEO-1238-001

**Stories:** GEO-1241, GEO-1260, GEO-1261, GEO-1262, GEO-1238

**Preconditions:** Staging, en-GB, flag ON; Brand logo service reachable (Brandfetch quota — see memory GEO-1069 runs); Nothing is created: the scenario ends with Exit and Discard

**Assumptions:** Strings checked against the en-US copy validated by the PO (TC precondition); en-GB identical for these strings

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" | TC-GEO-1241-001 s2 |
| 2 | When the user selects the "Brand analysis" card |  | The card is shown selected | TC-GEO-1241-003 s2 |
| 3 | When the user types a brand name in the brand search | C = "Lictorix Geo" | The dropdown lists the matching suggestions, if any, and a "Custom Brand" row for "Lictorix Geo" | TC-GEO-1260-001 s2 |
| 4 | And the user selects the "Custom Brand" row (Lictorix Geo) |  | The custom brand card "Lictorix Geo" is displayed as the selected brand | TC-GEO-1260-001 s3 |
| 5 | Then a website field is displayed inline right under the selected custom brand card, above "Discover Categories" |  | The field has a globe icon and the same input style as the brand search | TC-GEO-1260-001 s4 |
| 6 | And the field label reads the validated copy |  | "What is your brand's website? (optional)" | TC-GEO-1260-001 s5 |
| 7 | And the field shows the validated placeholder and hint |  | Placeholder "example.com"; hint "We use it to show the right logo. Leave it empty to show your brand's initial." | TC-GEO-1260-001 s6 |
| 8 | And the empty field is not flagged as required |  | No required marker, no red border and no error message while the field is empty | TC-GEO-1260-001 s7 |
| 9 | When the user enters a value that is not a domain | "licter" | The value is typed, no error is shown while typing | TC-GEO-1261-005 s2 |
| 10 | And the field loses focus | Click outside the field | The website field has a red border and the message "Enter a valid website, such as example.com." is shown under it (same pattern as the brand error of step 1) | TC-GEO-1261-005 s3 |
| 11 | When the user clicks "Discover Categories" |  | The step is not left: no discovery loading screen, the error is still shown | TC-GEO-1261-005 s4 |
| 12 | Then the user can correct the input |  | The field is editable and still contains "licter" | TC-GEO-1261-005 s5 |
| 13 | And the user corrects the value to a valid domain | "licter.com" | The red border and the message disappear as soon as the value is valid, without leaving the field | TC-GEO-1261-007 s3 |
| 14 | When the user enters a full URL in the website field | "https://www.licter.com/fr/about?x=1" | The value is typed, no error is shown while typing | TC-GEO-1261-001 s2 |
| 15 | And the field loses focus | Click outside the field | No inline error is shown | TC-GEO-1261-001 s3 |
| 16 | Then the derived root domain is shown under the brand name |  | "licter.com" | TC-GEO-1261-001 s4 |
| 17 | And the logo preview is retrieved for that domain |  | The 32px avatar shows the logo found for licter.com instead of the letter "L" | TC-GEO-1261-001 s5 |
| 18 | When the user edits the website URL | W2 = "onclusive.com" | The avatar still shows the licter.com logo while typing | TC-GEO-1262-005 s2 |
| 19 | And the field loses focus | Click outside the field | The grey pulsing placeholder is shown | TC-GEO-1262-005 s3 |
| 20 | Then the preview updates to the logo of the new domain |  | The avatar shows the logo of onclusive.com and "onclusive.com" is under the brand name | TC-GEO-1262-005 s4 |
| 21 | And the previous domain's logo is never shown next to the new domain |  | At no moment is the licter.com logo shown with "onclusive.com" | TC-GEO-1262-005 s5 |
| 22 | When the user clears the website field and the field loses focus | (empty) | No error is shown | TC-GEO-1262-007 s2 |
| 23 | Then the lettermark is shown as the brand visual |  | The avatar shows the letter "L"; the licter.com logo and the domain under the brand name are no longer shown | TC-GEO-1262-007 s3 |
| 24 | When the user enters a domain with neither a brand logo nor a favicon and the field loses focus | W4 = "example.com" | The grey pulsing placeholder is shown | TC-GEO-1262-004 s2 |
| 25 | Then the general favicon is shown as the brand visual |  | The 32px avatar shows the generic grey globe of the favicon service (image from www.google.com/s2/favicons), not the letter "L" | TC-GEO-1262-004 s3 |
| 26 | And the domain is shown under the brand name |  | The W4 domain | TC-GEO-1262-004 s4 |
| 27 | When the user clicks Back to Dashboard | Custom brand "Lictorix Geo" entered | The "Exit setup?" confirmation opens | TC-GEO-1238-001 s2 |
| 28 | And the confirmation offers Resume Setup and Exit and Discard |  | "Resume Setup" and "Exit and Discard" are shown | TC-GEO-1238-001 s4 |
| 29 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created | TC-GEO-1238-001 s5 |

---

### E2E-MANAGE-SCOPE-PROMPTS-001 : Manage Scope > Prompts of a brand analysis: wizard table, pool tracker, suggestions and types (read-only)

**Status:** NEW · **Pass:** 1 — per epic (GEO-1002 / GEO-1209) · **Spec:** `e2e-manage-scope-prompts`

**TCs covered:** TC-GEO-1239-001, TC-GEO-1239-002, TC-GEO-1246-004, TC-GEO-1239-006

**Stories:** GEO-1239, GEO-1246

**Preconditions:** Brand analysis BA with retained unticked suggestions and a version history (JDD); Read-only: no tick, no save (Manage Scope saves at once — memory "Manage Scope autosave")

**Assumptions:** TC-GEO-1246-004 is limited to the Add prompt type list (steps 1-2): adding a market saves suggestions, so steps 3-4 stay an open point

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given the user is on the dashboard of analysis A |  | Manage Scope is reachable | TC-GEO-1239-001 s1 |
| 2 | When the user opens Manage Scope > Prompts |  | The Prompts section is displayed | TC-GEO-1239-001 s2 |
| 3 | Then the wizard's table is shown |  | Columns "Prompt", "Category", "Type", "Market", "Actions" in one table; no per-country or per-type tabs; no Reset button | TC-GEO-1239-001 s3 |
| 4 | And the wizard's filters are shown |  | Category, Type and Market header menus and the Show prompts menu | TC-GEO-1239-001 s4 |
| 5 | And the pool tracker is shown |  | The ring "U / P" with its popover | TC-GEO-1239-001 s5 |
| 6 | When the user scrolls to the end of the table |  | The unticked suggestions are listed, unticked and greyed, at the end of the table (no "Suggested Prompts" heading) | TC-GEO-1239-002 s2 |
| 7 | When the user opens the type select of Add prompt |  | The select lists Visibility, Competitive, Reputation, Brand Image and Other | TC-GEO-1246-004 s2 |
| 8 | When the user opens the version history |  | The version history is displayed | TC-GEO-1239-006 s2 |
| 9 | Then the changes are grouped by date with their count |  | A D2 group with 1 change and a D1 group with 2 changes | TC-GEO-1239-006 s3 |
| 10 | And each change shows the original and the edited wording |  | Original and edited wording of each of the 3 prompts | TC-GEO-1239-006 s4 |

---

### E2E-UNBRANDED-OVERVIEW-001 : Unbranded analysis: list entry and Overview built for a topic

**Status:** NEW · **Pass:** 1 — per epic (GEO-1209 + GEO-1068) · **Spec:** `e2e-unbranded-overview`

**TCs covered:** TC-GEO-1243-014, TC-GEO-1243-001, TC-GEO-1243-002, TC-GEO-1243-003, TC-GEO-1243-009, TC-GEO-1266-003, TC-GEO-1266-006, TC-GEO-1268-004, TC-GEO-1268-007, TC-GEO-1267-003, TC-GEO-1267-005, TC-GEO-1243-010, TC-GEO-1243-011, TC-GEO-1243-012

**Stories:** GEO-1243, GEO-1266, GEO-1268, GEO-1267

**Preconditions:** Existing unbranded analysis UA "Postal services" (or JDD topic), collection completed, with Category Topics prompts; Flag ON

**Assumptions:** Expected texts quote the topic "Postal services"; the JDD topic replaces it if another analysis is used

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given the user is on the GEO dashboard of organisation T |  | The analyses list is displayed | TC-GEO-1243-014 s1 |
| 2 | When the list shows analysis UA |  | The column header reads "Brand / Topic" | TC-GEO-1243-014 s2 |
| 3 | Then UA shows the topic with its first letter |  | A letter avatar "P" and "Postal services" | TC-GEO-1243-014 s3 |
| 4 | And no domain is shown for UA |  | No domain or website under the topic | TC-GEO-1243-014 s4 |
| 5 | When the user opens analysis UA |  | The analysis loads with its sidebar | TC-GEO-1243-001 s2 |
| 6 | Then the sidebar block shows the topic first letter in the logo slot |  | A letter avatar "P" is shown where a brand logo shows today | TC-GEO-1243-001 s3 |
| 7 | And the block shows the topic |  | "Postal services" is displayed next to the avatar | TC-GEO-1243-001 s4 |
| 8 | And no extra header, mode label or date is shown |  | No "Unbranded analysis" label, no generation date and no header above the block or the Overview | TC-GEO-1243-001 s5 |
| 9 | When the Overview renders |  | InBrief, Top Topics, Share of Voice, the landscape table and AI Citation Sources are shown | TC-GEO-1243-002 s2 |
| 10 | Then the scope bar and the KPI cards with their deltas are not shown |  | No scope bar, no KPI card, no delta | TC-GEO-1243-002 s3 |
| 11 | And Time Evolution and Category Prioritization are not shown |  | Neither widget is on the Overview | TC-GEO-1243-002 s4 |
| 12 | And Corporate Reputation, Brand Territory and the Brand Image hint are not shown |  | None of the three is on the Overview | TC-GEO-1243-002 s5 |
| 13 | When the user reads InBrief |  | InBrief shows exactly 3 bullets | TC-GEO-1243-003 s2 |
| 14 | And the caption is displayed |  | "Category summary generated by artificial intelligence" | TC-GEO-1243-003 s5 |
| 15 | When the widget loads |  | It is titled "Top Topics in the Category" | TC-GEO-1243-009 s2 |
| 16 | Then each topic describes the category |  | Every topic is an aspect of postal services (e.g. delivery times, tracking), not a brand | TC-GEO-1243-009 s3 |
| 17 | And no topic names a brand and no brand tag is shown |  | No brand name in any topic label; no brand tag | TC-GEO-1243-009 s4 |
| 18 | And each topic shows its sentiment and frequency as in Top Concepts today |  | Positive / Mixed / Negative grouping and the frequency are displayed per topic | TC-GEO-1243-009 s5 |
| 19 | When the user looks at the rows of Top Topics |  | Each row shows the topic, its frequency % and the meta line "{q} quotes • {n} sources • {Positive \| Mixed \| Negative}" | TC-GEO-1266-003 s2 |
| 20 | Then no row shows a numeric sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on any row | TC-GEO-1266-003 s3 |
| 21 | When the user looks at a topic row of each polarity | Topics P (Positive), M (Mixed), N (Negative) | Each meta line ends with its "Positive", "Mixed" or "Negative" pill without a count (e.g. "3 quotes • 12 sources • Negative"); the accent bar and the % colour are kept | TC-GEO-1266-006 s2 |
| 22 | When the user sorts Top Topics by Sentiment | Sort: Sentiment | The list is re-ordered | TC-GEO-1268-004 s2 |
| 23 | Then the topics are grouped Positive, then Mixed, then Negative, by frequency inside each group |  | Every "Positive" row is above every "Mixed" row, above every "Negative" row; the frequency % decreases inside each group | TC-GEO-1268-004 s3 |
| 24 | And no numeric score is exposed |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on any row | TC-GEO-1268-004 s4 |
| 25 | When the user selects each polarity filter in turn | Positive, then Mixed, then Negative | Each filter lists only the topics of that polarity and their number equals the pill count | TC-GEO-1268-007 s2 |
| 26 | And the user removes the filter |  | All topics are listed again | TC-GEO-1268-007 s3 |
| 27 | When the user clicks the row of a topic | Topic P | The detail panel opens with a coloured header showing the topic name and the close button | TC-GEO-1267-003 s2 |
| 28 | Then the header shows the frequency and the polarity label with no score |  | The header reads "{f}% frequency • Positive" with a white pill; No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown anywhere in the panel | TC-GEO-1267-003 s3 |
| 29 | Then the barometer gauge is not shown |  | No Negative-to-Positive gauge bar and no cursor are displayed in the panel | TC-GEO-1267-005 s3 |
| 30 | When the ring loads |  | The subtitle reads "How the answers split across entities" | TC-GEO-1243-010 s2 |
| 31 | Then no slice is enlarged and there is no centre value |  | All slices have the same radius; the centre of the ring is empty | TC-GEO-1243-010 s3 |
| 32 | And the ring keeps the brand analysis calculation |  | Top 10 brands by SOV and "Others" for the rest; the slices add up to 100 % | TC-GEO-1243-010 s4 |
| 33 | When the table loads |  | It is titled "Postal services landscape" | TC-GEO-1243-011 s2 |
| 34 | Then no row is highlighted |  | Every brand row has the same style | TC-GEO-1243-011 s3 |
| 35 | And no tooltip says "your brand" | Hover each column header and info icon | No tooltip contains "your brand" | TC-GEO-1243-011 s4 |
| 36 | When the widget loads |  | Its subtitle refers to the topic, not to "your brand" | TC-GEO-1243-012 s2 |
| 37 | Then the legend has no Owned Media and no Competitor Media |  | Neither entry is in the legend | TC-GEO-1243-012 s3 |
| 38 | And there is no Favorability column |  | No Favorability column in the sources table | TC-GEO-1243-012 s4 |
| 39 | When the user opens the related prompts modal of a source |  | The modal opens with its tabs | TC-GEO-1243-012 s5 |
| 40 | Then the Category Topics prompts are listed under a "Category Topics" tab |  | A "Category Topics" tab lists them; no "Perception" tab | TC-GEO-1243-012 s6 |

---

### E2E-UNBRANDED-CATEGORY-001 : Unbranded Category view, prompts, Other category and hidden Action Center

**Status:** NEW · **Pass:** 1 — per epic (GEO-1209 + GEO-1068) · **Spec:** `e2e-unbranded-category`

**TCs covered:** TC-GEO-1244-001, TC-GEO-1244-010, TC-GEO-1244-006, TC-GEO-1244-009, TC-GEO-1248-004, TC-GEO-1248-001, TC-GEO-1248-003, TC-GEO-1266-006, TC-GEO-1268-004, TC-GEO-1267-003, TC-GEO-1267-005, TC-GEO-1248-017, TC-GEO-1245-001, TC-GEO-1245-002

**Stories:** GEO-1244, GEO-1248, GEO-1266, GEO-1268, GEO-1267, GEO-1245

**Preconditions:** Same analysis UA, with a kept prompt in Other (category and type) and an Other-type prompt in category C1; Brand analysis BA for the Action Center comparison

**Assumptions:** TC-GEO-1248-004 needs an Other-type prompt in C1 ("Other (1)"); if absent the step is skipped (JDD "")

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user opens category C1 in the sidebar |  | The category view is displayed | TC-GEO-1244-001 s2 |
| 2 | Then there are no KPI cards |  | No KPI card and no delta | TC-GEO-1244-001 s3 |
| 3 | And InBrief and Top Topics follow the topic rules at category scope |  | InBrief shows 3 bullets about C1 with "Category summary generated by artificial intelligence"; "Top Topics in the Category" lists C1 topics with no brand | TC-GEO-1244-001 s4 |
| 4 | And the SOV ring and rankings are neutral |  | SOV ring with no enlarged slice and no centre value; rankings with no highlighted row | TC-GEO-1244-001 s5 |
| 5 | When the user looks at the tabs |  | Tabs ALL, Visibility, Competitive and Category Topics are shown, plus Other when its count is above 0 (hidden at 0); no "Perception" tab | TC-GEO-1244-010 s2 |
| 6 | And the user opens the "Category Topics" tab and a prompt |  | Category Topics rows show their themes in Winner / Themes; the detail panel opens | TC-GEO-1244-010 s3 |
| 7 | Then the detail panel labels it "Category Topics" |  | The panel type label reads "Category Topics", never "Perception" | TC-GEO-1244-010 s4 |
| 8 | When the user opens a Visibility prompt whose engines all rank the same brand family first | Check in the detail panel: same brand family first for every engine | The detail panel shows the same first brand family for every engine | TC-GEO-1244-006 s2 |
| 9 | Then its row shows that brand as winner |  | Winner / Themes shows the brand | TC-GEO-1244-006 s3 |
| 10 | And there are no favourability filters or count |  | No favourability filter and no favourability count above or in the table | TC-GEO-1244-006 s4 |
| 11 | When the user opens a Competitive prompt |  | The detail panel opens | TC-GEO-1244-009 s2 |
| 12 | Then the panel shows the full ranking |  | Every ranked brand is listed with its position | TC-GEO-1244-009 s3 |
| 13 | And the brand chosen per engine |  | Each engine shows the brand it chose | TC-GEO-1244-009 s4 |
| 14 | And no target brand block is shown |  | No block about a target brand or its position | TC-GEO-1244-009 s5 |
| 15 | When the user looks at the tabs |  | Tabs ALL, Visibility, Competitive, Category Topics, then "Other (1)" | TC-GEO-1248-004 s2 |
| 16 | Then the "Other" tab follows the type tabs with its count |  | "Other" is the last tab and its count is 1 | TC-GEO-1248-004 s3 |
| 17 | When the user opens the "Other" tab |  | The Other-type prompt is listed with the "Other" badge | TC-GEO-1248-004 s4 |
| 18 | Then its row shows its key concepts in Winner / Themes |  | Theme chips (with "+N" if more) and no winner | TC-GEO-1248-004 s5 |
| 19 | Then a last "Other" category is shown |  | "Other" is the last category entry, after C1 and C2 | TC-GEO-1248-001 s3 |
| 20 | When the user clicks "Other" |  | The Other category page opens | TC-GEO-1248-001 s4 |
| 21 | When the user opens the Other category page |  | The page loads with the tabs Identity and Sources (no Performance) | TC-GEO-1248-003 s2 |
| 22 | Then it shows the key concepts of its prompts and the prompts table |  | InBrief, Top Topics and Prompts Analysis are shown | TC-GEO-1248-003 s3 |
| 23 | And there are no KPI cards, SOV, Time Evolution, prioritization or rankings |  | None of these widgets is on the page | TC-GEO-1248-003 s4 |
| 24 | When the user opens the Other category page of U | Category Other | The key concept rows are displayed | TC-GEO-1266-006 s3 |
| 25 | Then every concept row states its polarity as a label |  | Each row ends with its "Positive", "Mixed" or "Negative" pill without a count, matching the colour of its accent bar | TC-GEO-1266-006 s4 |
| 26 | When the user opens the Other category page of U and sorts its concepts by Sentiment | Category Other, Sort: Sentiment | The concepts are grouped Positive, Mixed, Negative, by frequency inside each group, with no score | TC-GEO-1268-004 s5 |
| 27 | When the user opens the Other category page of U and clicks a concept row | Category Other, any concept | The panel header reads "{f}% frequency • {Positive \| Mixed \| Negative}" with a white pill and shows no sentiment score | TC-GEO-1267-003 s4 |
| 28 | When the user opens the Other category page of U and clicks a concept row | Category Other, any concept | The panel shows no gauge bar and no cursor | TC-GEO-1267-005 s4 |
| 29 | When the user opens the prompt that is Other on both dimensions |  | The detail panel opens | TC-GEO-1248-017 s2 |
| 30 | Then the panel shows an engine segmented control and the sentiment per engine |  | Engine selector; badge "Sentiment - {ENGINE}" | TC-GEO-1248-017 s3 |
| 31 | And it shows the themes, the response and the sources |  | Themes chips, Response text, Sources with "All sources" | TC-GEO-1248-017 s4 |
| 32 | When the user switches engine |  | Sentiment, themes, response and sources update for that engine | TC-GEO-1248-017 s5 |
| 33 | When the sidebar renders |  | Sections Identity, Performance and Sources are shown | TC-GEO-1245-001 s2 |
| 34 | Then the Action Center entry is hidden |  | No "Action Center" entry in the sidebar | TC-GEO-1245-001 s3 |
| 35 | When the user opens brand analysis BA |  | The sidebar is displayed | TC-GEO-1245-001 s4 |
| 36 | Then the brand analysis keeps its Action Center entry |  | "Action Center" is listed as today | TC-GEO-1245-001 s5 |
| 37 | Given the user has the Action Center URL of analysis UA | URL: Action Center path of BA with the UUID of UA | The URL is ready | TC-GEO-1245-002 s1 |
| 38 | When the user opens the URL directly |  | The page loads | TC-GEO-1245-002 s2 |
| 39 | Then the dashboard of UA is shown |  | The unbranded Overview (or dashboard) of UA is displayed, not an empty Action Center | TC-GEO-1245-002 s3 |

---

### E2E-UNBRANDED-SCOPE-001 : Manage Scope of an unbranded analysis: fixed topic, unbranded types, Other on inline selects (read-only)

**Status:** NEW · **Pass:** 1 — per epic (GEO-1209) · **Spec:** `e2e-unbranded-manage-scope`

**TCs covered:** TC-GEO-1242-014, TC-GEO-1246-003, TC-GEO-1247-012

**Stories:** GEO-1242, GEO-1246, GEO-1247

**Preconditions:** Analysis UA with prompts in Other on type and on category; Read-only (Add prompt opened then cancelled, nothing saved)

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user opens Manage Scope |  | Manage Scope is displayed | TC-GEO-1242-014 s2 |
| 2 | Then the topic is shown read-only |  | "Postal services" is displayed with no edit control, as the brand of a brand analysis | TC-GEO-1242-014 s3 |
| 3 | And the topic cannot be changed |  | No field, button or menu lets the user change the topic or the analysis mode | TC-GEO-1242-014 s4 |
| 4 | When the user clicks Add prompt and opens the type select |  | The select lists Visibility, Competitive, Category Topics and Other only | TC-GEO-1246-003 s2 |
| 5 | And the user cancels and opens the type select of an existing row |  | The select lists Visibility, Competitive, Category Topics and Other only; on a row already in Other, Other is the current value of the select and the list shows Visibility, Competitive and Category Topics | TC-GEO-1246-003 s3 |
| 6 | Then no Reputation or Brand Image type is offered |  | Neither "Reputation" nor "Brand Image" in either select | TC-GEO-1246-003 s4 |
| 7 | When the user opens Prompts |  | The prompt table is displayed | TC-GEO-1247-012 s2 |
| 8 | Then the prompt Other on its type shows an inline Type select |  | Type cell: inline select reading "Other" | TC-GEO-1247-012 s3 |
| 9 | And the prompt Other on its category shows an inline Category select |  | Category cell: inline select reading "Other" | TC-GEO-1247-012 s4 |

---

### E2E-ACTION-CENTER-001 : Prioritise Target Sources in the Action Center of a brand analysis

**Status:** NEW · **Pass:** 1 — per epic (GEO-152 R1.2 + GEO-1513 R1.3) · **Spec:** `e2e-action-center`

**TCs covered:** TC-GEO-1118-006, TC-GEO-1120-017, TC-GEO-1166-002, TC-GEO-1178-003, TC-GEO-1178-010, TC-GEO-1184-001, TC-GEO-1184-002, TC-GEO-1184-008, TC-GEO-1166-004, TC-GEO-1168-013, TC-GEO-1168-014

**Stories:** GEO-1118, GEO-1120, GEO-1166, GEO-1178, GEO-1184, GEO-1168

**Preconditions:** Brand analysis Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e (staging), Target Sources verified; Sort labels "Coverage" / "Prompts" kept by PO decision (GEO-1513 F-1, GEO-1184 Passed QA 27/10)

**Assumptions:** Source B = a source with both reasons and 3 engines (e.g. frandroid.com) — JDD

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given the user opens the Toyota analysis and clicks "Action Center" in the left menu | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The Target Sources page is displayed | TC-GEO-1118-006 s1 |
| 2 | Then the user checks the verdict tabs |  | Three tabs are shown, "ALL", "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION", each verdict tab with its icon | TC-GEO-1118-006 s2 |
| 3 | And the user checks the selected tab |  | "ALL" is underlined as the selected tab | TC-GEO-1118-006 s3 |
| 4 | Then the global filter bar at the top right shows the date, AI engine and country filters and the export icon |  | The bar shows "Last 7 days", "AI Engines" with its count badge, "All Countries" and the export (download) icon | TC-GEO-1120-017 s2 |
| 5 | And the global filter bar holds no category control |  | Categories are selected from the left navigation or from the page Category filter next to the Type filter ("All categories"), not from the global filter bar | TC-GEO-1120-017 s3 |
| 6 | And the user opens the details panel of the source ranked #1 |  | The panel header shows "#1 · {domain of card 1}", the footer shows "Source 1 of N" and card #1 shows the selected state | TC-GEO-1166-002 s2 |
| 7 | When the user clicks "Next source" |  | The panel stays open (no close / reopen) and its content is replaced by the source ranked #2 | TC-GEO-1166-002 s3 |
| 8 | Then the panel header, badges, article tabs and prompts belong to the source of card #2 |  | The header reads "#2 · {domain of card 2}" with its source type and reason badges; the footer reads "Source 2 of N" | TC-GEO-1166-002 s4 |
| 9 | And the selected state behind the panel moved to card #2 |  | Card #2 shows the selected state and card #1 no longer does | TC-GEO-1166-002 s5 |
| 10 | When the user opens the details panel of source B | Source B (e.g. frandroid.com) | The panel opens with the header "#k · {domain of B}" | TC-GEO-1178-003 s2 |
| 11 | Then both article tabs are displayed at the top of the panel, each with its icon |  | A two-segment control shows "Lack of visibility (a)" with the eye-off icon and "Negative perception (b)" with the thumb-down icon | TC-GEO-1178-003 s3 |
| 12 | And the "Lack of visibility" tab is the first tab |  | "Lack of visibility (a)" is the left segment, before "Negative perception (b)" | TC-GEO-1178-003 s4 |
| 13 | And the "Lack of visibility" tab is selected by default |  | "Lack of visibility (a)" is the active (white) segment, "None of these articles mentions Toyota anywhere on the page." is shown and its articles are listed | TC-GEO-1178-003 s5 |
| 14 | Then the engine filter is displayed above the prompts list |  | The filter sits between the heading and the first prompt row | TC-GEO-1178-010 s2 |
| 15 | And "All" is the first tab and is selected by default |  | "All" is the first tab, shown as the active (white) tab, with no count | TC-GEO-1178-010 s3 |
| 16 | And one tab is shown for each engine present in the prompts of source B | Engines in scope: ChatGPT, Gemini, Perplexity | Exactly 3 engine tabs follow "All" | TC-GEO-1178-010 s4 |
| 17 | And each engine tab shows the number of prompts of the list cited by that engine |  | Each engine tab shows the engine icon and its prompt count as a bare number, the engine name appears in the tooltip on hover; "All" covers the distinct prompts (counts overlap) | TC-GEO-1178-010 s5 |
| 18 | And the engine tabs are in the fixed order ChatGPT, Gemini, Perplexity, not sorted by count | QA decision | The order is "All", ChatGPT, Gemini, Perplexity (checked with the tooltips), whatever the counts | TC-GEO-1178-010 s6 |
| 19 | Given the user opens the Action Center of the chosen analysis | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | "Sort by" in the page header, left of the Card view / List view switch, shows "Coverage"; the cards are sorted by failing articles and each card shows "Used in N prompts" | TC-GEO-1184-001 s1 |
| 20 | When the user opens "Sort by" and selects "Prompts" | Sort by: Prompts | The list is re-sorted and "Sort by" shows "Prompts" | TC-GEO-1184-001 s2 |
| 21 | Then the cards are in descending order of their prompt count |  | The "Used in N prompts" value never increases from one card to the next | TC-GEO-1184-001 s3 |
| 22 | And the ranks are renumbered from 1 |  | The first card shows rank 1 and the ranks run with no gap | TC-GEO-1184-001 s4 |
| 23 | Given the user notes the prompt count of the card ranked #1 | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | The card shows "Used in N prompts" | TC-GEO-1184-002 s1 |
| 24 | When the user opens its details panel and clicks "Show X more prompts" on the "All" tab of "Prompts associated with this source" |  | The "All" tab reads "All (N)" with the N of the card and the full prompts list is displayed | TC-GEO-1184-002 s2 |
| 25 | Then the number of prompt rows equals N |  | The rows of "Prompts associated with this source" equal the card count | TC-GEO-1184-002 s3 |
| 26 | When the user selects the "IMPROVE VISIBILITY" tab |  | "Sort by" still shows "Prompts", the cards are in descending prompt count order and the ranks start at 1 | TC-GEO-1184-008 s2 |
| 27 | And the user switches to List view |  | "Sort by" still shows "Prompts" and the rows are in descending prompt count order | TC-GEO-1184-008 s5 |
| 28 | When the user reloads the page | browser reload (F5) | "Sort by" shows "Coverage" and the sources are ordered by failing articles | TC-GEO-1184-008 s6 |
| 29 | When the user selects the "IMPROVE PERCEPTION" tab | Tab: IMPROVE PERCEPTION | Only sources with the "Improve perception" badge are listed; the user notes their count Y | TC-GEO-1166-004 s2 |
| 30 | And the user selects a source type in the Type filter | Source type: Journalism (or any type listed with a count) | The list keeps only the sources of that type in the "IMPROVE PERCEPTION" tab; the user notes the new count Y | TC-GEO-1166-004 s3 |
| 31 | And the user opens the details panel of the 2nd source of the filtered list |  | The details panel opens for that source | TC-GEO-1166-004 s4 |
| 32 | Then the footer counter reads "Source 2 of Y" |  | The counter shows 2 (position in the filtered list) and Y (number of sources in the filtered list), not the global rank or the unfiltered total; the panel header also shows the filtered position "#2 · {domain}", not the global rank | TC-GEO-1166-004 s5 |
| 33 | And the user clicks "Next source" |  | The panel shows the 3rd source of the filtered list (not the next global rank): the header reads "#3 · {domain}" and the counter reads "Source 3 of Y" | TC-GEO-1166-004 s6 |
| 34 | Then a Category filter is displayed next to the Type filter |  | The Category dropdown is shown beside the Type dropdown | TC-GEO-1168-013 s2 |
| 35 | And the Category filter shows its default value |  | The Category dropdown reads "All categories" | TC-GEO-1168-013 s3 |
| 36 | When the user opens the Category filter |  | The list of categories is displayed | TC-GEO-1168-013 s4 |
| 37 | Then the options are the categories of the analysis | Categories listed in the left menu | Every category of the left menu is listed, and no other category | TC-GEO-1168-013 s5 |
| 38 | And the options are in the same order as the left menu |  | The option order matches the left menu order exactly | TC-GEO-1168-013 s6 |
| 39 | When the user selects category C1 in the Category filter | Category: C1 | The Category dropdown shows C1 and the list re-renders | TC-GEO-1168-014 s2 |
| 40 | Then only sources with at least one missing or negative article in C1 answers are listed |  | The total is lower than or equal to the total of step 1 and no card shows a 0 count | TC-GEO-1168-014 s3 |

---

### E2E-WIZARD-CUSTOM-001 : Create a brand analysis for a custom brand with a website and find its logo everywhere

**Status:** NEW · **Pass:** 2 — cross-epic (scenario 191) · **Spec:** `e2e-create-custom-brand`

**TCs covered:** TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-001, TC-GEO-1261-008, TC-GEO-1263-001, TC-GEO-1263-008, TC-GEO-1263-006, TC-GEO-1263-002

**Stories:** GEO-1241, GEO-1260, GEO-1261, GEO-1263

**Preconditions:** Creates an analysis (5 prompts) — ask before the run; Custom brand "Licter", website licter.com (TC data); a completed run is needed for the rankings / prompts steps (run the dashboard part on the next day or on the existing A1 of the GEO-1069 runs)

**Assumptions:** Steps after creation can point to the existing analysis A1 (licter.com) of the GEO-1069 runs to avoid waiting for a collection

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" | TC-GEO-1241-001 s2 |
| 2 | When the user selects the "Brand analysis" card |  | The card is shown selected | TC-GEO-1241-003 s2 |
| 3 | And the mode pill shows the mode |  | The product bar pill reads "Brand analysis" | TC-GEO-1241-003 s4 |
| 4 | When the user types a brand name in the brand search | C = "Licter" | The dropdown lists the matching suggestions, if any, and a "Custom Brand" row for "Lictorix Geo" | TC-GEO-1260-001 s2 |
| 5 | And the user selects the "Custom Brand" row (Lictorix Geo) |  | The custom brand card "Lictorix Geo" is displayed as the selected brand | TC-GEO-1260-001 s3 |
| 6 | Then a website field is displayed inline right under the selected custom brand card, above "Discover Categories" |  | The field has a globe icon and the same input style as the brand search | TC-GEO-1260-001 s4 |
| 7 | Given the custom brand "Licter" is selected with a full URL as website and a market | "https://www.licter.com/fr/about?x=1", United States / English (EN) | "licter.com" is shown under the brand name with its logo preview (logo noted as L1) | TC-GEO-1261-008 s1 |
| 8 | And the user clicks "Discover Categories" and checks the category discovery request in DevTools | DevTools Network, discover-categories request | The brand domain sent (entityDomain) is "licter.com", not the full URL typed (the Summary step shows neither the brand nor its domain) | TC-GEO-1261-008 s2 |
| 9 | When the user goes through Categories, Prompts and Summary and creates the analysis | Default categories, only 5 prompts kept (QA rule: test analyses keep 5 prompts, shared prompt pool) | The analysis A1 is created and "View analysis" is available | TC-GEO-1261-008 s3 |
| 10 | And the user checks the analysis creation request in DevTools | DevTools Network, creation request | The brand domain sent and returned is "licter.com", not the full URL typed | TC-GEO-1261-008 s4 |
| 11 | And the user opens the analysis from "View analysis" |  | The dashboard of A1 opens | TC-GEO-1261-008 s5 |
| 12 | Then the brand is displayed with the logo of the stored domain |  | The sidebar and header show logo L1 of licter.com, not a lettermark | TC-GEO-1261-008 s6 |
| 13 | When the user opens the report list |  | The A1 row shows logo L1 | TC-GEO-1263-001 s2 |
| 14 | And the user opens the Overview of A1 |  | The dashboard sidebar and header show logo L1 | TC-GEO-1263-001 s3 |
| 15 | Then the target brand row of the brand rankings in Overview shows logo L1 |  | Logo L1, not the favicon of a domain cited by the AI answers | TC-GEO-1263-001 s4 |
| 16 | When the user opens a Category view | First category of A1 | The target brand row of the rankings shows logo L1 | TC-GEO-1263-001 s5 |
| 17 | And the user opens a competitive view | e.g. the competitor comparison of A1 | The target brand shows logo L1 | TC-GEO-1263-001 s6 |
| 18 | When the user opens the prompts table of A1 |  | The prompts are listed with their winner | TC-GEO-1263-008 s2 |
| 19 | And the user locates a prompt whose winner is the target brand | "Licter" | The prompt row shows "Licter" as winner | TC-GEO-1263-008 s3 |
| 20 | Then the winner cell shows logo L1 |  | Logo L1 of licter.com, not a lettermark and not the favicon of a domain cited by the AI answers | TC-GEO-1263-008 s4 |
| 21 | Then only the target brand row shows logo L1 |  | Logo L1 on the target brand row | TC-GEO-1263-006 s2 |
| 22 | And each competitor row shows its own logo |  | Competitor logos are not replaced by logo L1 | TC-GEO-1263-006 s3 |
| 23 | And the brand variant rows keep their own visuals |  | Variant rows are not replaced by logo L1 | TC-GEO-1263-006 s4 |
| 24 | When the user opens a Category view | First category of A1 | Same result: L1 on the target brand row only, competitor and variant rows unchanged | TC-GEO-1263-006 s5 |
| 25 | When the user exports the analysis as PowerPoint |  | The .pptx file is downloaded | TC-GEO-1263-002 s2 |
| 26 | Then the cover slide shows logo L1 |  | Logo L1 of licter.com | TC-GEO-1263-002 s3 |
| 27 | And the target brand row of the rankings slide shows logo L1 |  | Logo L1, not the favicon of a domain cited by the AI answers | TC-GEO-1263-002 s4 |
| 28 | When the user exports the analysis as PDF |  | The .pdf file is downloaded | TC-GEO-1263-002 s5 |
| 29 | Then the cover and the rankings target row of the PDF show logo L1 |  | Logo L1 on both | TC-GEO-1263-002 s6 |

---

### E2E-UNBRANDED-CREATE-001 : Create an unbranded analysis end to end and open its topic Overview

**Status:** NEW · **Pass:** 2 — cross-epic (scenario 192) · **Spec:** `e2e-create-unbranded`

**TCs covered:** TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1241-005, TC-GEO-1241-006, TC-GEO-1260-007, TC-GEO-1241-011, TC-GEO-1241-012, TC-GEO-1229-003, TC-GEO-1241-004, TC-GEO-1242-001, TC-GEO-1243-001

**Stories:** GEO-1241, GEO-1260, GEO-1229, GEO-1242, GEO-1243

**Preconditions:** Creates an analysis (5 prompts) — ask before the run; Flag ON; topic from the JDD (TC data "Postal services" already exists in QA-GEO: pick another topic or delete after the run)

**Assumptions:** 5 prompts kept (QA rule) instead of the 180 of TC-GEO-1241-013 (counts not asserted)

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" | TC-GEO-1241-001 s2 |
| 2 | Then two cards "Brand analysis" and "Unbranded analysis" are displayed |  | Both cards are shown with their descriptions: Brand analysis "Measure how AI engines see, rank and compare your brand against its competitors." and Unbranded analysis "Measure an industry or a topic: which brands AI engines name, and what they say about it."; the Unbranded analysis card has no "No brand scorecard" point | TC-GEO-1241-001 s3 |
| 3 | And no card is selected |  | Neither card is selected and the primary action (Continue) is disabled | TC-GEO-1241-001 s4 |
| 4 | When the user selects the "Unbranded analysis" card instead |  | Only the Unbranded analysis card is selected; Continue stays enabled | TC-GEO-1241-003 s5 |
| 5 | Then the mode pill shows the new mode |  | The product bar pill reads "Unbranded analysis" | TC-GEO-1241-003 s6 |
| 6 | Then step 2 is labelled "Topic & Country" |  | The stepper and the step title read "Topic & Country", not "Brand & Country" | TC-GEO-1241-005 s3 |
| 7 | And the step asks for an industry or topic instead of a brand |  | A topic text field is displayed; there is no brand search, no brand logo and no brand website field | TC-GEO-1241-005 s4 |
| 8 | And the markets block and Language for AI Insights are displayed as in a brand analysis |  | The markets block (country, language) and Language for AI Insights are shown below the topic field | TC-GEO-1241-005 s5 |
| 9 | Then the field asks the topic question |  | "What industry or topic are you analysing?" is displayed as the field question | TC-GEO-1241-006 s3 |
| 10 | And a helper states that the topic frames the analysis and is never measured |  | The helper is shown under the field: "The topic frames the analysis and is never measured. We measure the brands AI engines name." | TC-GEO-1241-006 s4 |
| 11 | And the user types a topic | "Electric cars" | The topic is accepted | TC-GEO-1260-007 s3 |
| 12 | Then no website field is displayed |  | No "What is your brand's website? (optional)" field is shown on Topic & Country | TC-GEO-1260-007 s4 |
| 13 | Given the user is on Topic & Country with a valid topic and market | Topic: "Postal services"; market GB (EN) | "Discover Categories" is enabled | TC-GEO-1241-011 s1 |
| 14 | When the user clicks "Discover Categories" |  | The category discovery screen is displayed | TC-GEO-1241-011 s2 |
| 15 | Then the screen keeps the brand version layout |  | Same layout as the brand discovery screen (loader and two text lines) | TC-GEO-1241-011 s3 |
| 16 | And its text is the topic version |  | The text reads "Scanning how AI engines see Postal services across your countries." and "This usually takes about 20 seconds. We look at your topic, your countries and their languages."; it does not use the brand text ("Scanning how AI engines see {brand}..." / "We look at your brand...") | TC-GEO-1241-011 s4 |
| 17 | And discovery ends on Categories |  | The Categories step opens with the discovered categories | TC-GEO-1241-011 s5 |
| 18 | When the user opens the Type column filter |  | The filter lists Visibility, Competitive and Category Topics with their counts | TC-GEO-1241-012 s2 |
| 19 | Then there is no Brand Image and no Reputation prompt |  | Neither "Brand Image" nor "Reputation" is listed in the filter or shown on a badge | TC-GEO-1241-012 s3 |
| 20 | When the user filters on Competitive |  | Only Competitive rows are shown | TC-GEO-1241-012 s4 |
| 21 | Then each Competitive prompt holds four competitor slots and no brand |  | Each wording has 4 competitor slots ([Competitor 1] to [Competitor 4]) and names no target brand | TC-GEO-1241-012 s5 |
| 22 | When the user unticks 3 prompts | Untick every prompt but 5, keeping at least one Category Topics prompt | The 3 rows are greyed and the ring reads "U + 37 / P" | TC-GEO-1229-003 s2 |
| 23 | And the user continues to Prompts and then Summary |  | The pill reads "Unbranded analysis" on Prompts and on Summary | TC-GEO-1241-004 s3 |
| 24 | Given the user is on Summary of the unbranded scope |  | Summary shows the markets and the categories; the topic is not shown (PO decision 2026-10-26, GEO-1209 comment 867869) | TC-GEO-1242-001 s1 |
| 25 | When the user clicks Create Analysis |  | The creation confirmation is displayed with View analysis | TC-GEO-1242-001 s2 |
| 26 | And the user opens the GEO dashboard analyses list |  | The new analysis is listed as "Postal services" in the "Brand / Topic" column | TC-GEO-1242-001 s3 |
| 27 | And the user opens the analysis |  | The sidebar block shows "Postal services" | TC-GEO-1242-001 s4 |
| 28 | Then no target brand is set |  | No brand is shown as the analysis brand anywhere in the sidebar, Overview or Manage Scope | TC-GEO-1242-001 s5 |
| 29 | And the analysis stays unbranded | Manage Scope | Manage Scope shows the topic "Postal services" and no brand field | TC-GEO-1242-001 s6 |
| 30 | Then the sidebar block shows the topic first letter in the logo slot |  | A letter avatar "P" is shown where a brand logo shows today | TC-GEO-1243-001 s3 |
| 31 | And no extra header, mode label or date is shown |  | No "Unbranded analysis" label, no generation date and no header above the block or the Overview | TC-GEO-1243-001 s5 |

---

### E2E-WIZARD-EXIT-001 : Leave and switch the wizard across modes without losing or leaking choices

**Status:** NEW · **Pass:** 2 — cross-epic (scenario 194) · **Spec:** `e2e-wizard-exit`

**TCs covered:** TC-GEO-1238-003, TC-GEO-1241-008, TC-GEO-1241-009, TC-GEO-1238-001

**Stories:** GEO-1238, GEO-1241

**Preconditions:** Nothing is created

**Assumptions:** The "this brand" / "this topic" wording of scenario 194 has no TC: not asserted (open point)

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given the user has just opened the wizard and entered nothing |  | Brand & Country is empty | TC-GEO-1238-003 s1 |
| 2 | When the user clicks Back to Dashboard |  | The GEO dashboard is displayed with no confirmation | TC-GEO-1238-003 s2 |
| 3 | And the user opens the wizard again and clicks Back on Brand & Country |  | The GEO dashboard is displayed with no confirmation | TC-GEO-1238-003 s3 |
| 4 | Given the user created an unbranded scope up to the Categories step | Topic: "Postal services"; markets GB (EN), FR (FR); categories C1, C2 discovered | Categories shows C1 and C2 and the pill reads "Unbranded analysis" | TC-GEO-1241-008 s1 |
| 5 | When the user goes back to Analysis Type and selects "Brand analysis" |  | The confirmation opens | TC-GEO-1241-009 s2 |
| 6 | And the user cancels the confirmation |  | The confirmation closes | TC-GEO-1241-009 s3 |
| 7 | Then the mode is unchanged |  | The Unbranded analysis card is selected and the pill reads "Unbranded analysis" | TC-GEO-1241-009 s4 |
| 8 | When the user goes back to Analysis Type | Click step "Analysis Type" in the stepper | Analysis Type shows Unbranded analysis selected | TC-GEO-1241-008 s2 |
| 9 | And the user selects "Brand analysis" |  | A confirmation opens | TC-GEO-1241-008 s3 |
| 10 | Then the confirmation states what is cleared |  | The text starts with "Switching the mode clears your brand or topic, your countries, your categories and your prompts." | TC-GEO-1241-008 s4 |
| 11 | When the user confirms |  | The pill reads "Brand analysis" and the user continues to Brand & Country | TC-GEO-1241-008 s5 |
| 12 | Then the later steps are cleared |  | Brand & Country has no brand and none of the previous markets; Categories and Prompts hold none of the previous categories and prompts | TC-GEO-1241-008 s6 |
| 13 | Given the user is on Brand & Country and has entered a brand and a market | Brand "Decathlon"; market GB (EN) | The entries are shown | TC-GEO-1238-001 s1 |
| 14 | When the user clicks Back to Dashboard |  | The "Exit setup?" confirmation opens | TC-GEO-1238-001 s2 |
| 15 | Then the confirmation states that exiting discards every choice since there is no draft |  | The message names "Decathlon", says there is no draft and that every choice is discarded | TC-GEO-1238-001 s3 |
| 16 | And the confirmation offers Resume Setup and Exit and Discard |  | "Resume Setup" and "Exit and Discard" are shown | TC-GEO-1238-001 s4 |
| 17 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created | TC-GEO-1238-001 s5 |

---

### E2E-WIZARD-SUMMARY-001 : Summary warnings and the Other card in brand and unbranded scopes

**Status:** NEW · **Pass:** 2 — cross-epic (scenario 195) · **Spec:** `e2e-wizard-summary`

**TCs covered:** TC-GEO-1237-002, TC-GEO-1237-004, TC-GEO-1247-001, TC-GEO-1247-010, TC-GEO-1241-016, TC-GEO-1238-001

**Stories:** GEO-1237, GEO-1247, GEO-1241, GEO-1238

**Preconditions:** Brand scope with 2 countries (GB, FR) and 2 categories; then an unbranded scope; nothing is created

**Assumptions:** "Create Analysis disabled over the pool" (scenario 195) needs a back-office pool change (TC-GEO-1237-009): open point

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given the user unticks every prompt of FR (FR) | Filter Market = FR (FR), untick all 70 rows | No FR (FR) prompt is ticked | TC-GEO-1237-002 s1 |
| 2 | When the user clicks Review & Launch |  | Summary loads | TC-GEO-1237-002 s2 |
| 3 | Then France · French is greyed with a "dropped" tag |  | France · French greyed with "dropped"; United Kingdom · English not dropped | TC-GEO-1237-002 s3 |
| 4 | And the warning names France as dropped |  | The warning names France | TC-GEO-1237-002 s4 |
| 5 | Given the user unticks every Brand Image prompt | Filter Type = Brand Image, untick all 20 rows | No Brand Image prompt is ticked | TC-GEO-1237-004 s1 |
| 6 | When the user clicks Review & Launch |  | Summary loads | TC-GEO-1237-004 s2 |
| 7 | Then the warning names the missing question type |  | The warning names Brand Image | TC-GEO-1237-004 s3 |
| 8 | And the warning names the metrics the analysis will not produce |  | The warning reads "No Brand Image prompts are kept, so the Corporate Reputation cards and Brand Territory stay empty, with a prompt to add questions." | TC-GEO-1237-004 s4 |
| 9 | When the user adds a prompt with the type empty | Prompt: "What do runners say about trail shoes?" - Category C1 - Market GB (EN) - Type left at its default (Other) | The row is added | TC-GEO-1247-001 s2 |
| 10 | Then the type badges show the five brand values |  | Badges read Visibility, Competitive, Reputation, Brand Image and, for the new row, Other | TC-GEO-1247-001 s3 |
| 11 | And no Category Topics badge is shown |  | No "Category Topics" badge in a brand analysis | TC-GEO-1247-001 s4 |
| 12 | When the user goes to Summary |  | Summary is displayed | TC-GEO-1247-010 s2 |
| 13 | Then a card titled with "Other" is shown |  | The card title contains "Other"; neither "Unclassified" nor "uncategorised" appears | TC-GEO-1247-010 s3 |
| 14 | And it lists each kept Other prompt with its market and an inline select for the missing value |  | Row 1: text, GB (EN), Category select "Other"; row 2: text, FR (FR), Type select "Other" | TC-GEO-1247-010 s4 |
| 15 | And it states the prompts return key concepts only until classified and launch is not blocked |  | The note says key concepts only until classified; Create Analysis is enabled | TC-GEO-1247-010 s5 |
| 16 | When the user picks a category for row 1 in the card | Category: C1 | Row 1 leaves the card; row 2 stays | TC-GEO-1247-010 s6 |
| 17 | When the user filters on Type Category Topics and unticks every Category Topics prompt | Type filter: Category Topics | Every Category Topics row is unticked | TC-GEO-1241-016 s2 |
| 18 | And no prompt is in Other |  | The Type and Category filters list "Other" with a count of 0 (no prompt is in Other) | TC-GEO-1241-016 s3 |
| 19 | And the user goes to Summary | Review & Launch | The Summary step is displayed | TC-GEO-1241-016 s4 |
| 20 | Then the warning names InBrief and Top Topics as metrics the analysis will not produce |  | The warning names "InBrief" and "Top Topics" | TC-GEO-1241-016 s5 |
| 21 | When the user clicks Back to Dashboard |  | The "Exit setup?" confirmation opens | TC-GEO-1238-001 s2 |
| 22 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created | TC-GEO-1238-001 s5 |

---

### E2E-EXPORT-BRAND-001 : Export a brand analysis to PowerPoint, PDF and Excel

**Status:** NEW · **Pass:** 2 — cross-epic (scenarios 201-202) · **Spec:** `e2e-export-brand`

**TCs covered:** TC-GEO-1173-001, TC-GEO-1124-001, TC-GEO-1269-001, TC-GEO-1173-002, TC-GEO-1269-002, TC-GEO-1269-006, TC-GEO-1184-009

**Stories:** GEO-1173, GEO-1124, GEO-1269, GEO-1184

**Preconditions:** Toyota 439acd96 (brand, export allowed), period Sep 28 – Oct 4, 2026 for the concept checks; Downloads parsed by the spec (pptx / pdf / xlsx readers)

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user clicks the export (download) icon button in the analysis toolbar |  | The "Export analysis as" menu opens with the options "PDF", "Presentation .pptx" and "Spreadsheet .xls" | TC-GEO-1173-001 s2 |
| 2 | And the user selects "Presentation .pptx" | Option: Presentation .pptx | The PowerPoint export is generated and the .pptx file is downloaded | TC-GEO-1173-001 s3 |
| 3 | And the user opens the downloaded deck |  | The deck opens and all slides are listed | TC-GEO-1173-001 s4 |
| 4 | Then the last slide of the deck is the Action Center · Target Sources slide |  | The final slide shows the eyebrow "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself" with the ranked sources | TC-GEO-1173-001 s5 |
| 5 | And no Action Center slide appears before the other analysis sections |  | No "ACTION CENTER · TARGET SOURCES" slide is found in the middle of the deck (e.g. around slide 9) and no other section slide comes after it | TC-GEO-1173-001 s6 |
| 6 | Then the user opens the last slide of the deck |  | It shows "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself", M being the total noted in step 1 | TC-GEO-1124-001 s4 |
| 7 | And the user checks the top 3 cards and the table of the slide |  | The cards are the sources ranked 1 to 3 and the table rows follow ranks 4 to 10 of the ALL tab (visibility-only sources included), not the perception list on screen | TC-GEO-1124-001 s5 |
| 8 | And the user checks the counts of the slide |  | Each source shows its total of both verdicts (missing and negative counts as in the app), not its perception count only | TC-GEO-1124-001 s6 |
| 9 | And the user opens the key concepts slides |  | The key concepts section lists the concepts of B | TC-GEO-1269-001 s3 |
| 10 | Then each concept shows its source count, its polarity and its frequency % | Concepts P, M, N | Each concept row reads "{n} sources • {label}" with its frequency %: "Positive" for P, "Mixed" for M, "Negative" for N | TC-GEO-1269-001 s4 |
| 11 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts slide | TC-GEO-1269-001 s5 |
| 12 | And the user selects "PDF" | Option: PDF | The PDF export is generated and the .pdf file is downloaded | TC-GEO-1173-002 s3 |
| 13 | And the user opens the downloaded PDF |  | The PDF opens and all pages are listed | TC-GEO-1173-002 s4 |
| 14 | Then the last page of the PDF is the Action Center · Target Sources page |  | The final page shows the eyebrow "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself" with the ranked sources | TC-GEO-1173-002 s5 |
| 15 | And no Action Center page appears before the other analysis sections |  | No "ACTION CENTER · TARGET SOURCES" page is found in the middle of the PDF (e.g. around page 9) and no other section page comes after it | TC-GEO-1173-002 s6 |
| 16 | And the user opens the key concepts pages |  | The key concepts section lists the same concepts as the PowerPoint export | TC-GEO-1269-002 s3 |
| 17 | Then each concept shows its source count, its polarity and its frequency % | Concepts P, M, N | Each concept row reads "{n} sources • {label}" with its frequency % ("Positive", "Mixed" or "Negative") | TC-GEO-1269-002 s4 |
| 18 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts page | TC-GEO-1269-002 s5 |
| 19 | When the user exports the analysis as Excel in English | Format: XLSX; export language: English (EN) | A .xlsx file is downloaded | TC-GEO-1269-006 s2 |
| 20 | And the user opens every concepts table of the workbook |  | The concepts tables are present | TC-GEO-1269-006 s3 |
| 21 | Then each concepts table has the columns Concept, Sentiment, Sources, Frequency and Cited by |  | The header row reads "Concept", "Sentiment", "Sources", "Frequency", "Cited by" in this order; there is no "Score" column | TC-GEO-1269-006 s4 |
| 22 | And the Sentiment column holds the polarity label of each concept | Concepts P, M, N | "Positive" for P, "Mixed" for M, "Negative" for N; no numeric score in any cell | TC-GEO-1269-006 s5 |
| 23 | And the concepts and frequencies match the dashboard |  | Same concepts and same frequency values as the "Top Topics Associated with Your Brand" card of B | TC-GEO-1269-006 s6 |
| 24 | Given the user has exported the analysis as "Presentation .pptx" with "Coverage" selected in "Sort by" | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | A .pptx file is downloaded and the order of the Target Sources slide (top 3 cards and table) is noted | TC-GEO-1184-009 s1 |
| 25 | When the user selects "Prompts" in "Sort by" |  | The cards are re-sorted by prompt count | TC-GEO-1184-009 s2 |
| 26 | And the user exports the analysis again as "Presentation .pptx" |  | A .pptx file is downloaded | TC-GEO-1184-009 s3 |
| 27 | Then the exported order is not affected by the on-screen sort |  | The Target Sources slide order is the same as in step 1 (assumed, open question to the PO) | TC-GEO-1184-009 s4 |

---

### E2E-EXPORT-UNBRANDED-001 : Export an unbranded analysis to PowerPoint and Excel

**Status:** NEW · **Pass:** 2 — cross-epic (scenarios 201-202) · **Spec:** `e2e-export-unbranded`

**TCs covered:** TC-GEO-1245-003, TC-GEO-1245-004, TC-GEO-1248-015

**Stories:** GEO-1245, GEO-1248

**Preconditions:** Analysis UA with an Other section

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user runs the PowerPoint export and opens the file | Export > PowerPoint | The file downloads and opens | TC-GEO-1245-003 s2 |
| 2 | Then the cover and the titles use the topic |  | The cover reads "Postal services"; slide titles use the topic or the category names | TC-GEO-1245-003 s3 |
| 3 | And the dropped slides are skipped |  | No KPI cards, Time Evolution at Overview, Category Prioritization, Corporate Reputation, Brand Territory or Action Center slide; only the widgets of the unbranded dashboard | TC-GEO-1245-003 s4 |
| 4 | And no text says "your brand" | Search the file for "your brand" | No match | TC-GEO-1245-003 s5 |
| 5 | And no brand carries a target marker |  | No brand is highlighted or marked as target in rankings, SOV or matrix slides | TC-GEO-1245-003 s6 |
| 6 | When the user runs the XLSX export and opens the file | Export > XLSX | The file downloads and opens | TC-GEO-1245-004 s2 |
| 7 | Then the titles use the topic |  | Sheet titles and headers use "Postal services" or the category names | TC-GEO-1245-004 s3 |
| 8 | And the dropped sheets are skipped |  | No sheet for KPIs, Corporate Reputation, Brand Territory or Action Center; only the widgets of the unbranded dashboard | TC-GEO-1245-004 s4 |
| 9 | And no cell says "your brand" and no brand is marked as target | Search the file for "your brand" and "target" | No match; no target column or marker | TC-GEO-1245-004 s5 |
| 10 | When the user runs the PowerPoint export and opens the file | Export > PowerPoint | The file opens | TC-GEO-1248-015 s2 |
| 11 | Then it includes the Other section limited to key concepts |  | An "Other" section with its key concepts only: no KPI, SOV, rankings or Time Evolution slide for Other | TC-GEO-1248-015 s3 |
| 12 | When the user runs the XLSX export and opens the file | Export > XLSX | The file opens | TC-GEO-1248-015 s4 |
| 13 | Then it includes the Other section limited to key concepts |  | An "Other" sheet or section with key concepts only | TC-GEO-1248-015 s5 |

---

### E2E-EXPORT-LANG-001 : Exports in French: polarity labels and columns

**Status:** NEW · **Pass:** 2 — cross-epic (scenario 203) · **Spec:** `e2e-export-lang`

**TCs covered:** TC-GEO-1269-003, TC-GEO-1269-007

**Stories:** GEO-1269

**Preconditions:** Switches the account interface language to French (export language = site language) — ask before the run, restore en-GB at the end and check /api/v1/auth/me

**Assumptions:** Spanish (TC-GEO-1269-004 / 008) runs the same steps with es-ES — kept in the epic suite

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user exports the analysis as PowerPoint in French | Format: PPTX; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | A .pptx file is downloaded | TC-GEO-1269-003 s2 |
| 2 | Then each concept row shows the polarity label and the word "sources" in French | Concepts P, M, N | The positive, mixed and negative labels and "sources" are the French strings of the strings sheet; no English "Positive", "Mixed", "Negative" left | TC-GEO-1269-003 s3 |
| 3 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts slide | TC-GEO-1269-003 s4 |
| 4 | When the user exports the analysis as PDF in French | Format: PDF; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | The key concepts pages show the same French labels as the PowerPoint, with no score and no gauge | TC-GEO-1269-003 s5 |
| 5 | When the user exports the analysis as Excel in French | Format: XLSX; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | A .xlsx file is downloaded | TC-GEO-1269-007 s2 |
| 6 | Then the concepts tables have five columns and no Score column |  | The header row has the French equivalents of Concept, Sentiment, Sources, Frequency and Cited by, in this order; no Score column | TC-GEO-1269-007 s3 |
| 7 | And the Sentiment column holds the French polarity labels | Concepts P, M, N | The positive, mixed and negative labels are the French strings of the strings sheet; no English label and no numeric score | TC-GEO-1269-007 s4 |

---

### E2E-BRAND-VISUALS-001 : Brand visuals across analyses: lettermark for a custom brand without website, topic letter for unbranded

**Status:** NEW · **Pass:** 2 — cross-epic (scenario 204) · **Spec:** `e2e-brand-visuals`

**TCs covered:** TC-GEO-1263-003, TC-GEO-1243-014

**Stories:** GEO-1263, GEO-1243

**Preconditions:** Analysis A2 (custom brand created without website, GEO-1069 runs) and UA

**Assumptions:** Generic globe on the list (scenario 204) needs an analysis on a site without favicon: open point

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user opens the report list |  | The A2 row shows the letter "L", not a logo searched by the brand name | TC-GEO-1263-003 s2 |
| 2 | And the user opens the Overview of A2 |  | The dashboard sidebar and header show the letter "L", not the favicon of D | TC-GEO-1263-003 s3 |
| 3 | Then the target brand row of the brand rankings in Overview shows the letter "L" |  | Letter "L", not the favicon of D | TC-GEO-1263-003 s4 |
| 4 | When the user opens a Category view | First category of A2 | The target brand row of the rankings shows the letter "L" | TC-GEO-1263-003 s5 |
| 5 | And the user opens a competitive view | e.g. the competitor comparison of A2 | The target brand shows the letter "L" | TC-GEO-1263-003 s6 |
| 6 | Then UA shows the topic with its first letter |  | A letter avatar "P" and "Postal services" | TC-GEO-1243-014 s3 |
| 7 | And no domain is shown for UA |  | No domain or website under the topic | TC-GEO-1243-014 s4 |
| 8 | And brand analyses keep their logo and domain |  | Brand rows are unchanged | TC-GEO-1243-014 s5 |

---

### E2E-NR-OLDER-001 : An analysis created before the release keeps its concepts, filters, KPI tile and logos

**Status:** NEW · **Pass:** 3 — non-regression (scenarios 207, 211) · **Spec:** `e2e-nr-older-analysis`

**TCs covered:** TC-GEO-1266-007, TC-GEO-1266-008, TC-GEO-1267-007, TC-GEO-1268-006, TC-GEO-1268-008, TC-GEO-1269-010, TC-GEO-1263-005, TC-GEO-1269-011

**Stories:** GEO-1266, GEO-1267, GEO-1268, GEO-1269, GEO-1263

**Preconditions:** Analysis O = Toyota 439acd96 with the baseline filters (Sep 28 – Oct 4, 2026) and the baseline XLSX / PPTX of the GEO-1068 runs; O has no stored brand domain (TC-GEO-1263-005)

**Assumptions:** The baseline window must stay selectable in the date picker

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given the user is on the Overview of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok), sort: Frequency | The "Top Topics Associated with Your Brand" card is displayed | TC-GEO-1266-007 s1 |
| 2 | When the user compares the listed concepts with the baseline | Baseline XLSX, sheet "Overview", table "Top Concepts" (7 concepts) | The same 7 concepts are listed: Fiabilité, Efficacité énergétique, Leadership hybride, Usage urbain, Coûts d'entretien, Coût d'achat, Bruit à l'accélération; none added, none missing | TC-GEO-1266-007 s2 |
| 3 | And the user compares the frequency % of each concept with the baseline | Category page "Voitures hybrides" of O; baseline XLSX, sheet "Voitures hybrides", column "Frequency" | On "Voitures hybrides": Fiabilité 28%, Efficacité énergétique 28%, Leadership hybride 16%, Usage urbain 8%, Coûts d'entretien 7%, Bruit à l'accélération 6%, Coût d'achat 5% | TC-GEO-1266-007 s3 |
| 4 | And the user compares the polarity and the source count of each concept with the baseline | Baseline XLSX, columns "Sentiment" and "Sources" | Coût d'achat is Mixed (8 sources), Bruit à l'accélération is Negative (7 sources), the 5 others are Positive (Fiabilité 23, Efficacité énergétique 29, Leadership hybride 17, Usage urbain 19, Coûts d'entretien 10 sources); each polarity is now stated by its label | TC-GEO-1266-007 s4 |
| 5 | Then only the display changed |  | Same concepts, polarity and source counts as the baseline on the Overview and same frequencies as the baseline on "Voitures hybrides"; only the "{score} sentiment" text (e.g. "+86 sentiment") is gone | TC-GEO-1266-007 s5 |
| 6 | When the user looks at the rows of the "Top Topics Associated with Your Brand" card |  | Each row shows its frequency % and the meta line "{n} sources • {Positive \| Mixed \| Negative}" | TC-GEO-1266-008 s2 |
| 7 | Then no row shows a numeric sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "+86 sentiment", "-43 sentiment") is shown on any row | TC-GEO-1266-008 s3 |
| 8 | When the user opens the category page "Voitures hybrides" of O | Category C1 = Voitures hybrides | Its "Top Topics Associated with Your Brand" rows show frequency % and polarity label only, with no score | TC-GEO-1266-008 s4 |
| 9 | When the user clicks the row of a Negative concept | Concept N = Bruit à l'accélération | The concept detail panel opens with its frequency and the "Negative" label in the header | TC-GEO-1267-007 s2 |
| 10 | Then no sentiment score is shown in the panel |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-43 sentiment") is shown anywhere in the panel | TC-GEO-1267-007 s3 |
| 11 | And the barometer gauge is not shown |  | No Negative-to-Positive gauge bar and no cursor are displayed | TC-GEO-1267-007 s4 |
| 12 | When the user compares the three pill counts with the baseline | Baseline XLSX, sheet "Overview", table "Top Concepts": 5 Positive, 1 Mixed, 1 Negative | The pills show Positive 5, Mixed 1, Negative 1 | TC-GEO-1268-006 s2 |
| 13 | And the user selects the Positive filter | Filter: Positive | The list shows Fiabilité, Efficacité énergétique, Leadership hybride, Usage urbain and Coûts d'entretien only | TC-GEO-1268-006 s3 |
| 14 | And the user selects the Mixed filter | Filter: Mixed | The list shows Coût d'achat only | TC-GEO-1268-006 s4 |
| 15 | And the user selects the Negative filter | Filter: Negative | The list shows Bruit à l'accélération only | TC-GEO-1268-006 s5 |
| 16 | Then filtering behaves as before the release |  | Same counts and same filtered concepts as the baseline; only the row display is simplified | TC-GEO-1268-006 s6 |
| 17 | When the user compares the summary with the baseline | Baseline XLSX, sheet "Overview": "71% Positive · 14% Mixed · 14% Negative" (PPTX slide 4: 5 / 1 / 1 topics) | The summary shows 71% positive, 14% mixed and 14% negative | TC-GEO-1268-008 s2 |
| 18 | And the user sorts the list by Sentiment | Sort: Sentiment | The list is re-ordered | TC-GEO-1268-008 s3 |
| 19 | Then the distribution summary is unchanged |  | The summary still shows 71% positive, 14% mixed and 14% negative | TC-GEO-1268-008 s4 |
| 20 | When the user opens the category page "Voitures hybrides" of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok), category Voitures hybrides | The category metrics are displayed | TC-GEO-1269-010 s3 |
| 21 | Then the Sentiment KPI tile shows the baseline value | Baseline XLSX, sheet "Voitures hybrides", Gauge "Sentiment" (PPTX slide 14) | The Sentiment tile is shown with the value +75 and the band "Good", as in the baseline | TC-GEO-1269-010 s4 |
| 22 | And the concept rows of the page show no per-concept score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "+86 sentiment") is shown on the Top Topics rows | TC-GEO-1269-010 s5 |
| 23 | When the user opens the report list |  | The O row shows the same logo as the baseline (logo searched by the brand name) | TC-GEO-1263-005 s2 |
| 24 | And the user opens the Overview of O |  | The sidebar and header show the same logo as the baseline (favicon of the domain most cited by the AI answers) | TC-GEO-1263-005 s3 |
| 25 | Then the target brand row of the rankings shows the same logo as the baseline | Overview and one Category view | Favicon of the domain cited by the AI answers, as in the baseline | TC-GEO-1263-005 s4 |
| 26 | When the user exports O as PowerPoint |  | The .pptx file is downloaded | TC-GEO-1263-005 s5 |
| 27 | Then the cover and the rankings target row show the same visuals as the baseline |  | No surface switched to the lettermark or to another logo | TC-GEO-1263-005 s6 |
| 28 | When the user exports the analysis as PowerPoint in English | Format: PPTX; export language: English (EN) | A .pptx file is downloaded | TC-GEO-1269-011 s2 |
| 29 | Then the key concepts slides list the same concepts and frequencies as the baseline | Baseline PPTX slide 4 (Overview) and slide 17 (Voitures hybrides) | Overview (slide 4): the same 7 concepts as the baseline (frequencies not compared). Voitures hybrides (slide 17): Fiabilité 28%, Efficacité énergétique 28%, Leadership hybride 16%, Usage urbain 8%, Coûts d'entretien 7%, Bruit à l'accélération 6%, Coût d'achat 5% | TC-GEO-1269-011 s3 |
| 30 | And each concept row reads "{n} sources • {label}" with its frequency % |  | e.g. "23 sources • Positive" for Fiabilité, "8 sources • Mixed" for Coût d'achat, "7 sources • Negative" for Bruit à l'accélération | TC-GEO-1269-011 s4 |
| 31 | And no numeric sentiment score and no barometer are shown |  | No "{score} sentiment" text (baseline: "+86 sentiment", "-43 sentiment"), no -100 to +100 value and no gauge on any key concepts slide | TC-GEO-1269-011 s5 |

---

### E2E-NR-BRAND-001 : A brand analysis keeps its Action Center entry and category Sentiment tile with the flag ON

**Status:** NEW · **Pass:** 3 — non-regression (scenarios 208, 210, 211) · **Spec:** `e2e-nr-brand`

**TCs covered:** TC-GEO-1245-001, TC-GEO-1269-010

**Stories:** GEO-1245, GEO-1269

**Preconditions:** Brand analysis BA, flag ON

**Assumptions:** Scenarios 208, 209, 216 and 217 are covered by the KEEP archive scenarios (dashboard overview, questions table / visibility / competitive, question analysis Perception tab, brand SOV)

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | When the user opens brand analysis BA |  | The sidebar is displayed | TC-GEO-1245-001 s4 |
| 2 | Then the brand analysis keeps its Action Center entry |  | "Action Center" is listed as today | TC-GEO-1245-001 s5 |
| 3 | Given the user is on the category page C1 of brand analysis B | Analysis B, category C1 | The category metrics are displayed | TC-GEO-1269-010 s1 |
| 4 | Then the Sentiment KPI tile is shown with its -100 to +100 value |  | The Sentiment tile is displayed among the category metrics with its aggregate value, as before the release | TC-GEO-1269-010 s2 |
| 5 | And the concept rows of the page show no per-concept score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "+86 sentiment") is shown on the Top Topics rows | TC-GEO-1269-010 s5 |

---

### E2E-COUNTRY-FILTER-001 : Filter the dashboard by country across Overview and Category views

**Status:** NEW · **Pass:** 1 — per feature, older versions (GEO-R0.3 GEO-263 + R1.3) · **Spec:** `e2e-country-filter`

**TCs covered:** Market Dropdown UI, Selection Persistence, TC-GEO-1229-007, Single-Country UI

**Stories:** GEO-1229

**Preconditions:** Analysis M with United States (EN + ES) and France (TC-GEO-1229-007); a single-country analysis

**Assumptions:** Label alignment (GEO-1514 Market → Country, Ready for QA; R1.2 filter bar "All Countries"): "market(s)" / "All markets" in the R0.3 wording read "country / countries" / "All Countries" — label only

**Known bugs:** GEO-1514 (Ready for QA): until it ships, some labels may still read "market"

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given a multi-country report on Overview or Category view |  | Each market has a selectable checkbox and All markets shortcut is available | Market Dropdown UI s1 |
| 2 | When the user selects one or two markets | Market A, Market B | The dropdown trigger shows the market names | Market Dropdown UI s2 |
| 3 | And when the user selects three or more markets | Market A, B, C | The dropdown trigger shows the selected count (e.g. 3 markets) | Market Dropdown UI s3 |
| 4 | Then if the user deselects every market |  | The view falls back to All markets automatically | Market Dropdown UI s4 |
| 5 | Given the user has selected a subset of markets on Overview |  | Selection is active | Selection Persistence s1 |
| 6 | When they navigate to any Category view in the same session |  | The same market selection is applied on the Category view | Selection Persistence s2 |
| 7 | And when they reload the page |  | The selection is restored to what was active before the reload | Selection Persistence s3 |
| 8 | When the user opens the market (country) filter |  | The filter lists "United States" once and "France" once (no separate entry per language) | TC-GEO-1229-007 s2 |
| 9 | And the user selects "United States" only |  | The filter shows United States selected | TC-GEO-1229-007 s3 |
| 10 | Then the results roll up both languages of the country |  | The prompts and results shown include the English and the Spanish prompts of United States, and none of France | TC-GEO-1229-007 s4 |
| 11 | Given a single-country report |  | The user opens the market dropdown | Single-Country UI s1 |
| 12 | Then only that market is shown and no multi-select UI is displayed |  | Standard single-select dropdown is shown | Single-Country UI s2 |

---

### E2E-READER-001 : A Reader browses the organisation analyses and users in read-only mode

**Status:** NEW · **Pass:** 1 — per feature, older versions (GEO-R1.0 GEO-397 + GEO-R1.15 GEO-680) · **Spec:** `e2e-reader-role`

**TCs covered:** TC-GEO-397-022, TC-GEO-397-024, TC-GEO-397-026, TC-GEO-1053-001

**Stories:** GEO-397, GEO-1053

**Preconditions:** Reader account in the QA organisation (missing — open point)

**Assumptions:** Replaces the archive [SKIP] placeholders GEO-61-TC009 and GEO-60-TC008

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given a user with the READER role has valid credentials for the GEO application | READER role user credentials |  | TC-GEO-397-022 s1 |
| 2 | When the user logs in and the GEO home/dashboard page loads | GEO home or dashboard page |  | TC-GEO-397-022 s2 |
| 3 | Then the New analysis button is rendered in a visibly disabled/greyed-out state and is not clickable | Button: New analysis | The New analysis button appears disabled (greyed out) and clicking it produces no action | TC-GEO-397-022 s3 |
| 4 | Given a READER user is logged into GEO and at least one existing report is available in their organization | READER role user | existing report in the organization | TC-GEO-397-024 s1 |
| 5 | When the READER user opens an existing report | Existing report accessible to the organization |  | TC-GEO-397-024 s2 |
| 6 | Then all report sections (Overview, categories, AI Citation Sources, etc.) load completely with the full data the organization has access to and no section is hidden or restricted | Report sections: Overview, categories, AI Citation Sources | All sections load with full data | TC-GEO-397-024 s3 |
| 7 | Given a READER user has access to a report that has an on-demand run trigger | READER role user | report with on-demand run option | TC-GEO-397-026 s1 |
| 8 | When the READER user inspects the report actions available | On-demand run control |  | TC-GEO-397-026 s2 |
| 9 | Then the on-demand run control is disabled or absent for the READER | Action: on-demand run | The on-demand run action is disabled or hidden | TC-GEO-397-026 s3 |
| 10 | Given un utilisateur avec le rôle reader |  | Le reader est connecté dans l'application | TC-GEO-1053-001 s1 |
| 11 | When il ouvre les paramètres utilisateurs |  | La page des paramètres utilisateurs est chargée | TC-GEO-1053-001 s2 |
| 12 | Then il voit la liste des utilisateurs de son organisation avec le rôle de chacun (editor ou reader) |  | La liste affiche tous les membres avec leur rôle visible | TC-GEO-1053-001 s3 |

---

### E2E-MULTI-ORG-001 : A multi-organisation user lands in the last organisation, switches and gets the rights of each

**Status:** NEW · **Pass:** 1 — per feature, older versions (GEO-R1.15 GEO-681) · **Spec:** `e2e-multi-org`

**TCs covered:** TC-GEO-1055-001, TC-GEO-1056-001, TC-GEO-1057-002

**Stories:** GEO-1055, GEO-1056, GEO-1057

**Preconditions:** User member of two organisations, editor in A and reader in B (missing — open point)

**Assumptions:** The source steps have no Expected result column value: the Then text is the assertion

**Known bugs:** none open (Jira read 2026-10-28)

| # | Action | Test data | Expected result | Source TC |
|---|--------|-----------|-----------------|-----------|
| 1 | Given a user belongs to more than one organization and previously connected to organization B |  |  | TC-GEO-1055-001 s1 |
| 2 | When the user signs in |  |  | TC-GEO-1055-001 s2 |
| 3 | Then the user is by default redirected to organization B without being prompted to choose |  |  | TC-GEO-1055-001 s3 |
| 4 | Given a user belonging to multiple organizations is working in organization A |  |  | TC-GEO-1056-001 s1 |
| 5 | When the user opens the organization switcher and selects organization B |  |  | TC-GEO-1056-001 s2 |
| 6 | Then the user is now in organization B without having signed out or re-authenticated |  |  | TC-GEO-1056-001 s3 |
| 7 | Given the same user who is an editor in organization A and a reader in organization B |  |  | TC-GEO-1057-002 s1 |
| 8 | When the user is in organization B |  |  | TC-GEO-1057-002 s2 |
| 9 | Then no editor capabilities are available |  |  | TC-GEO-1057-002 s3 |
| 10 | And nothing in the interface suggests the user has editor rights in organization B |  |  | TC-GEO-1057-002 s4 |

---

## Test plan coverage (cross-epic and non-regression)

| Test plan scenario | E2E scenario |
|---|---|
| 190 Brand wizard, suggested brand | E2E-CREATE-DEFAULT-001 (UPDATE) |
| 191 Custom brand + website, logo everywhere | E2E-WIZARD-CUSTOM-001 (+ E2E-WIZARD-WEBSITE-001) |
| 192 Unbranded wizard end to end | E2E-UNBRANDED-CREATE-001 |
| 193 Flag OFF run | open point (flag OFF account) |
| 194 Exit rules across modes | E2E-WIZARD-EXIT-001 ("this brand / this topic" wording: open point) |
| 195 Summary warnings combined | E2E-WIZARD-SUMMARY-001 (over-pool part: open point) |
| 196 Pool shared by both types | E2E-VERIFY-001 (UPDATE) |
| 197 Manage Scope across modes | E2E-MANAGE-SCOPE-PROMPTS-001 + E2E-UNBRANDED-SCOPE-001 (no-free-slot part: open point) |
| 198 No competitor discovery in unbranded | open point (backend) |
| 199 / 200 Concepts in unbranded | E2E-UNBRANDED-OVERVIEW-001 + E2E-UNBRANDED-CATEGORY-001 |
| 201 / 202 PPTX, PDF, XLSX | E2E-EXPORT-BRAND-001 + E2E-EXPORT-UNBRANDED-001 + E2E-WIZARD-CUSTOM-001 (logo on cover) |
| 203 Export languages | E2E-EXPORT-LANG-001 (FR; ES stays in the epic suite) |
| 204 Brand visuals | E2E-BRAND-VISUALS-001 (+ E2E-WIZARD-CUSTOM-001; globe: open point) |
| 205 New strings in four locales | open point (string review, epic suites) |
| 206 Target Sources by mode | E2E-ACTION-CENTER-001 + E2E-UNBRANDED-CATEGORY-001 (TC-GEO-1245-001/002) |
| 207 Older analyses concepts | E2E-NR-OLDER-001 |
| 208 Brand Overview unchanged | archive e2e-dashboard-overview (KEEP / label UPDATE) |
| 209 Brand prompts table rules | archive e2e-category-questions-table / question-visibility / question-competitive |
| 210 Brand Actions Center and export | E2E-NR-BRAND-001 + E2E-EXPORT-BRAND-001 (Favorability column of XLSX Raw Data: no TC, open point) |
| 211 Category Sentiment KPI tile | E2E-NR-BRAND-001 + E2E-NR-OLDER-001 (TC-GEO-1269-010) |
| 212 Competitor logos and variant rows | E2E-WIZARD-CUSTOM-001 (TC-GEO-1263-006) + archive e2e-category-brand-rankings GEO-68-TC003 |
| 213 Brand Competitive prompt cleaning | open point (prompt text sent to the engines, TC-GEO-1242-013) |
| 214 Discovery failure fallbacks | open point (cannot be forced on staging) |
| 215 Dashboard lists every analysis | open point (no TC; needs > 100 analyses) |
| 216 Brand Perception tab kept | archive e2e-category-question-analysis E2E-QA-TC004 / e2e-category-question-perception |
| 217 Share of Voice values kept | archive e2e-brand-SOV / e2e-category-SOV (legend sum = 100 %: only TC-GEO-1243-010 for unbranded; brand: open point) |

## Traceability

- E2E-CREATE-DEFAULT-001 "Create a brand analysis for a suggested brand with the new wizard (flag ON)" ← TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1231-003, TC-GEO-1260-004, TC-GEO-1231-004, TC-GEO-1231-010, TC-GEO-1232-001, archive create-default-analysis:E2E-CREATE-DEFAULT-001, TC-GEO-1233-001, TC-GEO-1229-003, TC-GEO-1236-001, TC-GEO-1237-001, TC-GEO-1237-006, TC-GEO-1237-010, TC-GEO-1240-004
- E2E-MARKETS-1LLM-001 "Create a brand analysis on two countries with a single AI engine" ← TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-004, TC-GEO-1231-004, archive create-analysis-markets-1LLM:E2E-MARKETS-1LLM-001, TC-GEO-1231-010, TC-GEO-1233-001, TC-GEO-1229-003, TC-GEO-1237-001, TC-GEO-1237-006, TC-GEO-1237-010
- E2E-VERIFY-001 "Find a brand analysis on the GEO dashboard with its prompt pool and open it" ← archive verify-analysis:E2E-VERIFY-001, TC-GEO-1240-001, TC-GEO-1240-004, TC-GEO-1243-014
- E2E-TOP-CONCEPT-001..005 "Top Topics of a brand category: sort, polarity filters, detail panel, sources (simplified display)" ← archive category-top-concept:E2E-TOP-CONCEPT-001, TC-GEO-1268-001, TC-GEO-1268-002, TC-GEO-1266-005, TC-GEO-1268-005, TC-GEO-1267-001, TC-GEO-1267-002, TC-GEO-1267-004, TC-GEO-1267-006, archive category-top-concept:E2E-TOP-CONCEPT-004, archive category-top-concept:E2E-TOP-CONCEPT-005
- E2E-WIZARD-PROMPTS-001 "Shape the prompt list in the wizard, then leave without creating" ← TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1238-001, TC-GEO-1231-010, TC-GEO-1233-001, TC-GEO-1235-001, TC-GEO-1235-003, TC-GEO-1233-004, TC-GEO-1233-005, TC-GEO-1234-001, TC-GEO-1234-003, TC-GEO-1234-006, TC-GEO-1235-008, TC-GEO-1236-001, TC-GEO-1238-005
- E2E-WIZARD-WEBSITE-001 "Custom brand website: field, URL normalisation, logo preview and errors (no creation)" ← TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-001, TC-GEO-1261-005, TC-GEO-1261-007, TC-GEO-1261-001, TC-GEO-1262-005, TC-GEO-1262-007, TC-GEO-1262-004, TC-GEO-1238-001
- E2E-MANAGE-SCOPE-PROMPTS-001 "Manage Scope > Prompts of a brand analysis: wizard table, pool tracker, suggestions and types (read-only)" ← TC-GEO-1239-001, TC-GEO-1239-002, TC-GEO-1246-004, TC-GEO-1239-006
- E2E-UNBRANDED-OVERVIEW-001 "Unbranded analysis: list entry and Overview built for a topic" ← TC-GEO-1243-014, TC-GEO-1243-001, TC-GEO-1243-002, TC-GEO-1243-003, TC-GEO-1243-009, TC-GEO-1266-003, TC-GEO-1266-006, TC-GEO-1268-004, TC-GEO-1268-007, TC-GEO-1267-003, TC-GEO-1267-005, TC-GEO-1243-010, TC-GEO-1243-011, TC-GEO-1243-012
- E2E-UNBRANDED-CATEGORY-001 "Unbranded Category view, prompts, Other category and hidden Action Center" ← TC-GEO-1244-001, TC-GEO-1244-010, TC-GEO-1244-006, TC-GEO-1244-009, TC-GEO-1248-004, TC-GEO-1248-001, TC-GEO-1248-003, TC-GEO-1266-006, TC-GEO-1268-004, TC-GEO-1267-003, TC-GEO-1267-005, TC-GEO-1248-017, TC-GEO-1245-001, TC-GEO-1245-002
- E2E-UNBRANDED-SCOPE-001 "Manage Scope of an unbranded analysis: fixed topic, unbranded types, Other on inline selects (read-only)" ← TC-GEO-1242-014, TC-GEO-1246-003, TC-GEO-1247-012
- E2E-ACTION-CENTER-001 "Prioritise Target Sources in the Action Center of a brand analysis" ← TC-GEO-1118-006, TC-GEO-1120-017, TC-GEO-1166-002, TC-GEO-1178-003, TC-GEO-1178-010, TC-GEO-1184-001, TC-GEO-1184-002, TC-GEO-1184-008, TC-GEO-1166-004, TC-GEO-1168-013, TC-GEO-1168-014
- E2E-WIZARD-CUSTOM-001 "Create a brand analysis for a custom brand with a website and find its logo everywhere" ← TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-001, TC-GEO-1261-008, TC-GEO-1263-001, TC-GEO-1263-008, TC-GEO-1263-006, TC-GEO-1263-002
- E2E-UNBRANDED-CREATE-001 "Create an unbranded analysis end to end and open its topic Overview" ← TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1241-005, TC-GEO-1241-006, TC-GEO-1260-007, TC-GEO-1241-011, TC-GEO-1241-012, TC-GEO-1229-003, TC-GEO-1241-004, TC-GEO-1242-001, TC-GEO-1243-001
- E2E-WIZARD-EXIT-001 "Leave and switch the wizard across modes without losing or leaking choices" ← TC-GEO-1238-003, TC-GEO-1241-008, TC-GEO-1241-009, TC-GEO-1238-001
- E2E-WIZARD-SUMMARY-001 "Summary warnings and the Other card in brand and unbranded scopes" ← TC-GEO-1237-002, TC-GEO-1237-004, TC-GEO-1247-001, TC-GEO-1247-010, TC-GEO-1241-016, TC-GEO-1238-001
- E2E-EXPORT-BRAND-001 "Export a brand analysis to PowerPoint, PDF and Excel" ← TC-GEO-1173-001, TC-GEO-1124-001, TC-GEO-1269-001, TC-GEO-1173-002, TC-GEO-1269-002, TC-GEO-1269-006, TC-GEO-1184-009
- E2E-EXPORT-UNBRANDED-001 "Export an unbranded analysis to PowerPoint and Excel" ← TC-GEO-1245-003, TC-GEO-1245-004, TC-GEO-1248-015
- E2E-EXPORT-LANG-001 "Exports in French: polarity labels and columns" ← TC-GEO-1269-003, TC-GEO-1269-007
- E2E-BRAND-VISUALS-001 "Brand visuals across analyses: lettermark for a custom brand without website, topic letter for unbranded" ← TC-GEO-1263-003, TC-GEO-1243-014
- E2E-NR-OLDER-001 "An analysis created before the release keeps its concepts, filters, KPI tile and logos" ← TC-GEO-1266-007, TC-GEO-1266-008, TC-GEO-1267-007, TC-GEO-1268-006, TC-GEO-1268-008, TC-GEO-1269-010, TC-GEO-1263-005, TC-GEO-1269-011
- E2E-NR-BRAND-001 "A brand analysis keeps its Action Center entry and category Sentiment tile with the flag ON" ← TC-GEO-1245-001, TC-GEO-1269-010
- E2E-COUNTRY-FILTER-001 "Filter the dashboard by country across Overview and Category views" ← Market Dropdown UI, Selection Persistence, TC-GEO-1229-007, Single-Country UI
- E2E-READER-001 "A Reader browses the organisation analyses and users in read-only mode" ← TC-GEO-397-022, TC-GEO-397-024, TC-GEO-397-026, TC-GEO-1053-001
- E2E-MULTI-ORG-001 "A multi-organisation user lands in the last organisation, switches and gets the rights of each" ← TC-GEO-1055-001, TC-GEO-1056-001, TC-GEO-1057-002

## Known-bug steps

- No step of the proposed scenarios depends on a still-open bug: GEO-1522, GEO-1524, GEO-1528, GEO-1249, GEO-1232, GEO-1233, GEO-1234, GEO-1184, GEO-1507 are Passed QA (Jira 2026-10-28).
- GEO-1546 (Ready for QA) removes the duplicated "N analyses" label from the Analysis table header: TC-GEO-1240-001 step 3 (E2E-VERIFY-001) quotes that label — expected result to align once GEO-1546 is Passed QA (behaviour, needs confirmation).
- GEO-1514 (Ready for QA, Market → Country everywhere): country labels of E2E-COUNTRY-FILTER-001 and the label UPDATEs may still read "market" on staging until it ships.
- Open PO questions with a TC impact (not used as assertions here): GEO-1002 Q-01 (Title Case custom category name, TC-GEO-1232-003, asked 27/10), Q-02 (custom prompt case / spaces, TC-GEO-1234-007), Q-12 (FR tu / vous), GEO-1209 Q-05 / Q-07 (Competitors card cap, top-5 tie).

## Open points

- Flag OFF journey (scenario 193; TC-GEO-1231-001, TC-GEO-1234-005, TC-GEO-1241-002): needs an account / environment with `unbranded_analysis` OFF.
- Back office only (79 TCs: GEO-1230 pool field, GEO-1515 pool conversion, GEO-1113 frequency column, GEO-397 organisation forms, GEO-680 / GEO-681 back-office user and organisation management): prerequisites, no UI step.
- Pool limit states (TC-GEO-1236-002/003, TC-GEO-1237-009, TC-GEO-1239-011/012/013, TC-GEO-1240-002/003): need a back-office pool change on a disposable organisation → not in the E2E suite until the user agrees on a set-up.
- Manage Scope writes (TC-GEO-1239-003/004/009/010, TC-GEO-1246-001/002, TC-GEO-1246-004 steps 3-4, TC-GEO-1240-005, archive GEO-61-TC006, GEO-60 LLM saves): every change saves at once — needs a disposable analysis and the user's go.
- Backend / log only (GEO-1251 competitor resolution, scenario 198, TC-GEO-1242-008 / 013, GEO-539 summary cache, GEO-R0.1 pipeline epic103, TC-GEO-1169-014 selection log): no UI step.
- No TC behind test plan scenarios 205 (strings), 214, 215, the "this brand / this topic" exit wording (194), the brand SOV legend sum (217) and the filled Favorability column of the brand XLSX Raw Data (210).
- Archive normalisation: e2e-category-brand-prioritization.csv has a broken row (GEO-69-TC007 split over 3 lines), e2e-category-question-* use `</br>` inside single-row steps — split into Given / When / Then rows when written to E2E-tests/.
- Specs on disk without an archive CSV (out of this review): e2e-geo-analytics-dashboard.spec.js, e2e-hubspot-upsell-pql.spec.js (last suite 30/05: 8 FAIL) — decide whether to add them to E2E-tests/.
- Dashboard overview spec: 8 FAIL on 03/07 (selectors `llm-dropdown-trigger`, `kpi-card-visibility`) consistent with the "AI Engines" / KPI label changes — the spec update must re-inspect the DOM.
- Needs confirmation (behaviour changes): 18 archive scenarios flagged "yes" above + the 4 rebuilt UPDATE journeys.

## Storage format (2026-10-28, user decision)

The suite is stored as one Markdown file per spec in `.claude/Data/output/csv/E2E-tests/{SPEC_NAME}.md` (all its scenarios inside, retired ones listed at the end) — the per-scenario CSVs mentioned above were merged and removed. E2E-CAT-PRIORITIZATION-008 moved to UPDATE (Share of Voice comparison removed); the 5 "needs confirmation" scenarios were confirmed by the user. Final totals: 80 kept · 32 updated · 34 retired · 20 new.
