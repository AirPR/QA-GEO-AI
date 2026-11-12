# e2e-export-unbranded

- **Spec:** `.claude/Data/raw/playwright/e2e-export-unbranded.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-EXPORT-UNBRANDED-001](#e2e-export-unbranded-001) | Export an unbranded analysis to PowerPoint and Excel | NEW | GEO-1245, GEO-1248 |

---

## E2E-EXPORT-UNBRANDED-001

**Export an unbranded analysis to PowerPoint and Excel**

| Field | Value |
|---|---|
| Status | NEW; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | End-to-end: Export an unbranded analysis to PowerPoint and Excel. Pass 2 — cross-epic (scenarios 201-202). Consolidates TC-GEO-1245-003, TC-GEO-1245-004, TC-GEO-1248-015. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): UA = bike d3fd1b30 (the "Postal services" analysis is not on staging), so the topic reads "bike". |
| Priority | High |
| Stories | GEO-1245, GEO-1248 |
| Precondition | Analysis UA with an Other section (staging: bike d3fd1b30) |
| Labels | e2e-suite |
| QA Parent | GEO-1209 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user runs the PowerPoint export and opens the file | Export > PowerPoint | The file downloads and opens |
| 2 | Then the cover and the titles use the topic |  | The cover reads "bike"; slide titles use the topic or the category names |
| 3 | And the dropped slides are skipped |  | No KPI cards, Time Evolution at Overview, Category Prioritization, Corporate Reputation, Brand Territory or Action Center slide; only the widgets of the unbranded dashboard |
| 4 | And no text says "your brand" | Search the file for "your brand" | No match |
| 5 | And no brand carries a target marker |  | No brand is highlighted or marked as target in rankings, SOV or matrix slides |
| 6 | When the user runs the XLSX export and opens the file | Export > XLSX | The file downloads and opens |
| 7 | Then the titles use the topic |  | Sheet titles and headers use "bike" or the category names |
| 8 | And the dropped sheets are skipped |  | No sheet for KPIs, Corporate Reputation, Brand Territory or Action Center; only the widgets of the unbranded dashboard |
| 9 | And no cell says "your brand" and no brand is marked as target | Search the file for "your brand" and "target" | No match; no target column or marker |
| 10 | When the user runs the PowerPoint export and opens the file | Export > PowerPoint | The file opens |
| 11 | Then it includes the Other section limited to key concepts |  | An "Other" section with its key concepts only: no KPI, SOV, rankings or Time Evolution slide for Other |
| 12 | When the user runs the XLSX export and opens the file | Export > XLSX | The file opens |
| 13 | Then it includes the Other section limited to key concepts |  | An "Other" sheet or section with key concepts only |
