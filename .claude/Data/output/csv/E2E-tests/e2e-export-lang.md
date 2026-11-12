# e2e-export-lang

- **Spec:** `.claude/Data/raw/playwright/e2e-export-lang.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-EXPORT-LANG-001](#e2e-export-lang-001) | Exports in French: polarity labels and columns | NEW | GEO-1269 |

---

## E2E-EXPORT-LANG-001

**Exports in French: polarity labels and columns**

| Field | Value |
|---|---|
| Status | NEW — ask before running (creates an analysis / changes a setting) |
| Description | End-to-end: Exports in French: polarity labels and columns. Pass 2 — cross-epic (scenario 203). Assumptions: Spanish (TC-GEO-1269-004 / 008) runs the same steps with es-ES — kept in the epic suite. Consolidates TC-GEO-1269-003, TC-GEO-1269-007. |
| Priority | High |
| Stories | GEO-1269 |
| Precondition | Switches the account interface language to French (export language = site language) — ask before the run, restore en-GB at the end and check /api/v1/auth/me |
| Labels | e2e-suite |
| QA Parent | GEO-1068 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PARTIAL 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user exports the analysis as PowerPoint in French | Format: PPTX; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | A .pptx file is downloaded |
| 2 | Then each concept row shows the polarity label and the word "sources" in French | Concepts P, M, N | The positive, mixed and negative labels and "sources" are the French strings of the strings sheet; no English "Positive", "Mixed", "Negative" left |
| 3 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts slide |
| 4 | When the user exports the analysis as PDF in French | Format: PDF; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | The key concepts pages show the same French labels as the PowerPoint, with no score and no gauge |
| 5 | When the user exports the analysis as Excel in French | Format: XLSX; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | A .xlsx file is downloaded |
| 6 | Then the concepts tables have five columns and no Score column |  | The header row has the French equivalents of Concept, Sentiment, Sources, Frequency and Cited by, in this order; no Score column |
| 7 | And the Sentiment column holds the French polarity labels | Concepts P, M, N | The positive, mixed and negative labels are the French strings of the strings sheet; no English label and no numeric score |
