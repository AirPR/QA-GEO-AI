# e2e-category-question-perception

- **Spec:** `.claude/Data/raw/playwright/e2e-category-question-perception.spec.js`
- **Active scenarios:** 4
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-QUESTION-PERCEPTION-001](#e2e-question-perception-001) | Perception: Themes = Aucun thème → panel shows empty themes section | UPDATE | GEO-668 |
| [E2E-QUESTION-PERCEPTION-002](#e2e-question-perception-002) | Perception: Themes = theme badges → panel shows themes list | UPDATE | GEO-668 |
| [E2E-QUESTION-PERCEPTION-003](#e2e-question-perception-003) | Perception: panel shows SENTIMENT + RESPONSE sections, no rank badges | UPDATE | GEO-668 |
| [E2E-QUESTION-PERCEPTION-004](#e2e-question-perception-004) | Perception: switching LLM engine keeps SENTIMENT section with per-engine value | UPDATE | GEO-668 |

---

## E2E-QUESTION-PERCEPTION-001

**Perception: Themes = Aucun thème → panel shows empty themes section**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | E2E - Perception: Themes column = "Aucun thème" (no themes detected in any LLM) → detail panel THEMES section shows empty state "Aucun thème détecté dans les résultats des LLM". Consolidates archive E2E-PERC-TH-01 (GEO-668). Former id: E2E-PERC-TH-01. Archived in GEO-R1.0/e2e-category-question-perception.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging Toyota categories Voitures hybrides / VUS. |
| Priority | High |
| Stories | GEO-668 |
| Precondition | User logged in, staging environment, Toyota report loaded, category with Perception questions visible |
| Labels | E2E,Perception,Themes-Panel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | SKIP 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Perception tab where no themes are detected in LLM results | Report: Toyota, Category: Voitures hybrides or VUS (Toyota 439acd96), Perception question with no themes across all LLMs |  |
| 2 | When I find a row where the Themes column shows "Aucun thème" (no themes detected in any LLM) |  |  |
| 3 | Then the detail panel THEMES section shows "Aucun thème détecté dans les résultats des LLM" (empty) |  | Themes column: "Aucun thème" or empty cell. Detail panel: THEMES section heading visible + empty-state message "Aucun thème détecté dans les résultats des LLM" displayed. No theme badge spans shown. |

---

## E2E-QUESTION-PERCEPTION-002

**Perception: Themes = theme badges → panel shows themes list**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | E2E - Perception: Themes column = theme badges (one or more themes detected in LLMs) → detail panel THEMES section shows the list of detected themes. Consolidates archive E2E-PERC-TH-02 (GEO-668). Former id: E2E-PERC-TH-02. Archived in GEO-R1.0/e2e-category-question-perception.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging Toyota categories Voitures hybrides / VUS. |
| Priority | High |
| Stories | GEO-668 |
| Precondition | User logged in, staging environment, Toyota report loaded, category with Perception questions that have detected themes |
| Labels | E2E,Perception,Themes-Panel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Perception tab where one or more themes are detected in LLM results | Report: Toyota, Category: Voitures hybrides or VUS (Toyota 439acd96), Perception question with at least one theme across LLMs |  |
| 2 | When I find a row where the Themes column shows one or more theme badges |  |  |
| 3 | Then the detail panel THEMES section shows the list of detected themes |  | Themes column: one or more theme badge spans visible. Detail panel: THEMES section heading visible + at least one theme badge span visible. "Aucun thème" empty-state NOT shown. |

---

## E2E-QUESTION-PERCEPTION-003

**Perception: panel shows SENTIMENT + RESPONSE sections, no rank badges**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | E2E - Perception detail panel: SENTIMENT section heading visible, sentiment card (Positive/Negative/Mixed) visible, RESPONSE section visible, no Favorable/Unranked rank badges present. Consolidates archive E2E-PERC-SENT-01 (GEO-668). Former id: E2E-PERC-SENT-01. Archived in GEO-R1.0/e2e-category-question-perception.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging Toyota category Voitures hybrides. |
| Priority | High |
| Stories | GEO-668 |
| Precondition | User logged in, staging environment, Toyota report loaded, category with Perception questions visible |
| Labels | E2E,Perception,Sentiment-Panel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given I am on the Perception tab and I open a question in the detail panel | Report: Toyota, Category: Voitures hybrides (Toyota 439acd96 / 21a79173), first Perception question |  |
| 2 | When the detail panel opens for a Perception question |  |  |
| 3 | Then SENTIMENT section and RESPONSE section are visible and no rank badges appear |  | Detail panel: SENTIMENT heading visible + sentiment card (bg-emerald-50 or amber or red) visible + RESPONSE heading visible + NO Favorable/Unranked span badges present. |

---

## E2E-QUESTION-PERCEPTION-004

**Perception: switching LLM engine keeps SENTIMENT section with per-engine value**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | E2E - Perception detail panel: switching between LLM engine buttons keeps SENTIMENT section visible and shows per-engine sentiment card. Consolidates archive E2E-PERC-SENT-02 (GEO-668). Former id: E2E-PERC-SENT-02. Archived in GEO-R1.0/e2e-category-question-perception.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): staging Toyota category Voitures hybrides. |
| Priority | High |
| Stories | GEO-668 |
| Precondition | User logged in, staging environment, Toyota report loaded, category with Perception questions visible, multiple LLMs active |
| Labels | E2E,Perception,Sentiment-Panel |
| QA Parent | GEO-668 |
| Components / QA Component | GEO Module / Questions Table |
| Smoke / Regression | Yes / No |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a Perception question detail panel is open with multiple LLM engines available | Report: Toyota, Category: Voitures hybrides (Toyota 439acd96 / 21a79173), first Perception question, at least 2 LLM engines active |  |
| 2 | When I switch to a second LLM engine in the panel |  |  |
| 3 | Then SENTIMENT section remains visible and a sentiment card is shown for the selected engine |  | After switching to 2nd LLM engine: SENTIMENT heading still visible + sentiment card visible for the new engine. |
