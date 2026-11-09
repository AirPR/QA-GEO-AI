# e2e-nr-older-analysis

- **Spec:** `.claude/Data/raw/playwright/e2e-nr-older-analysis.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-NR-OLDER-001](#e2e-nr-older-001) | An analysis created before the release keeps its concepts, filters, KPI tile and logos | NEW | GEO-1266, GEO-1267, GEO-1268, GEO-1269, GEO-1263 |

---

## E2E-NR-OLDER-001

**An analysis created before the release keeps its concepts, filters, KPI tile and logos**

| Field | Value |
|---|---|
| Status | NEW |
| Description | End-to-end: An analysis created before the release keeps its concepts, filters, KPI tile and logos. Pass 3 — non-regression (scenarios 207, 211). Assumptions: The baseline window must stay selectable in the date picker. Epics: GEO-1068, GEO-1069. Consolidates TC-GEO-1266-007, TC-GEO-1266-008, TC-GEO-1267-007, TC-GEO-1268-006, TC-GEO-1268-008, TC-GEO-1269-010, TC-GEO-1263-005, TC-GEO-1269-011. |
| Priority | High |
| Stories | GEO-1266, GEO-1267, GEO-1268, GEO-1269, GEO-1263 |
| Precondition | Analysis O = Toyota 439acd96 with the baseline filters (Sep 28 – Oct 4, 2026) and the baseline XLSX / PPTX of the GEO-1068 runs; O has no stored brand domain (TC-GEO-1263-005) |
| Labels | e2e-suite |
| QA Parent | GEO-1068 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | — |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok), sort: Frequency | The "Top Topics Associated with Your Brand" card is displayed |
| 2 | When the user compares the listed concepts with the baseline | Baseline XLSX, sheet "Overview", table "Top Concepts" (7 concepts) | The same 7 concepts are listed: Fiabilité, Efficacité énergétique, Leadership hybride, Usage urbain, Coûts d'entretien, Coût d'achat, Bruit à l'accélération; none added, none missing |
| 3 | And the user compares the frequency % of each concept with the baseline | Category page "Voitures hybrides" of O; baseline XLSX, sheet "Voitures hybrides", column "Frequency" | On "Voitures hybrides": Fiabilité 28%, Efficacité énergétique 28%, Leadership hybride 16%, Usage urbain 8%, Coûts d'entretien 7%, Bruit à l'accélération 6%, Coût d'achat 5% |
| 4 | And the user compares the polarity and the source count of each concept with the baseline | Baseline XLSX, columns "Sentiment" and "Sources" | Coût d'achat is Mixed (8 sources), Bruit à l'accélération is Negative (7 sources), the 5 others are Positive (Fiabilité 23, Efficacité énergétique 29, Leadership hybride 17, Usage urbain 19, Coûts d'entretien 10 sources); each polarity is now stated by its label |
| 5 | Then only the display changed |  | Same concepts, polarity and source counts as the baseline on the Overview and same frequencies as the baseline on "Voitures hybrides"; only the "{score} sentiment" text (e.g. "+86 sentiment") is gone |
| 6 | When the user looks at the rows of the "Top Topics Associated with Your Brand" card |  | Each row shows its frequency % and the meta line "{n} sources • {Positive \| Mixed \| Negative}" |
| 7 | Then no row shows a numeric sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "+86 sentiment", "-43 sentiment") is shown on any row |
| 8 | When the user opens the category page "Voitures hybrides" of O | Category C1 = Voitures hybrides | Its "Top Topics Associated with Your Brand" rows show frequency % and polarity label only, with no score |
| 9 | When the user clicks the row of a Negative concept | Concept N = Bruit à l'accélération | The concept detail panel opens with its frequency and the "Negative" label in the header |
| 10 | Then no sentiment score is shown in the panel |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-43 sentiment") is shown anywhere in the panel |
| 11 | And the barometer gauge is not shown |  | No Negative-to-Positive gauge bar and no cursor are displayed |
| 12 | When the user compares the three pill counts with the baseline | Baseline XLSX, sheet "Overview", table "Top Concepts": 5 Positive, 1 Mixed, 1 Negative | The pills show Positive 5, Mixed 1, Negative 1 |
| 13 | And the user selects the Positive filter | Filter: Positive | The list shows Fiabilité, Efficacité énergétique, Leadership hybride, Usage urbain and Coûts d'entretien only |
| 14 | And the user selects the Mixed filter | Filter: Mixed | The list shows Coût d'achat only |
| 15 | And the user selects the Negative filter | Filter: Negative | The list shows Bruit à l'accélération only |
| 16 | Then filtering behaves as before the release |  | Same counts and same filtered concepts as the baseline; only the row display is simplified |
| 17 | When the user compares the summary with the baseline | Baseline XLSX, sheet "Overview": "71% Positive · 14% Mixed · 14% Negative" (PPTX slide 4: 5 / 1 / 1 topics) | The summary shows 71% positive, 14% mixed and 14% negative |
| 18 | And the user sorts the list by Sentiment | Sort: Sentiment | The list is re-ordered |
| 19 | Then the distribution summary is unchanged |  | The summary still shows 71% positive, 14% mixed and 14% negative |
| 20 | When the user opens the category page "Voitures hybrides" of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok), category Voitures hybrides | The category metrics are displayed |
| 21 | Then the Sentiment KPI tile shows the baseline value | Baseline XLSX, sheet "Voitures hybrides", Gauge "Sentiment" (PPTX slide 14) | The Sentiment tile is shown with the value +75 and the band "Good", as in the baseline |
| 22 | And the concept rows of the page show no per-concept score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "+86 sentiment") is shown on the Top Topics rows |
| 23 | When the user opens the report list |  | The O row shows the same logo as the baseline (logo searched by the brand name) |
| 24 | And the user opens the Overview of O |  | The sidebar and header show the same logo as the baseline (favicon of the domain most cited by the AI answers) |
| 25 | Then the target brand row of the rankings shows the same logo as the baseline | Overview and one Category view | Favicon of the domain cited by the AI answers, as in the baseline |
| 26 | When the user exports O as PowerPoint |  | The .pptx file is downloaded |
| 27 | Then the cover and the rankings target row show the same visuals as the baseline |  | No surface switched to the lettermark or to another logo |
| 28 | When the user exports the analysis as PowerPoint in English | Format: PPTX; export language: English (EN) | A .pptx file is downloaded |
| 29 | Then the key concepts slides list the same concepts and frequencies as the baseline | Baseline PPTX slide 4 (Overview) and slide 17 (Voitures hybrides) | Overview (slide 4): the same 7 concepts as the baseline (frequencies not compared). Voitures hybrides (slide 17): Fiabilité 28%, Efficacité énergétique 28%, Leadership hybride 16%, Usage urbain 8%, Coûts d'entretien 7%, Bruit à l'accélération 6%, Coût d'achat 5% |
| 30 | And each concept row reads "{n} sources • {label}" with its frequency % |  | e.g. "23 sources • Positive" for Fiabilité, "8 sources • Mixed" for Coût d'achat, "7 sources • Negative" for Bruit à l'accélération |
| 31 | And no numeric sentiment score and no barometer are shown |  | No "{score} sentiment" text (baseline: "+86 sentiment", "-43 sentiment"), no -100 to +100 value and no gauge on any key concepts slide |
