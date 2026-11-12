# e2e-export-brand

- **Spec:** `.claude/Data/raw/playwright/e2e-export-brand.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-EXPORT-BRAND-001](#e2e-export-brand-001) | Export a brand analysis to PowerPoint, PDF and Excel | NEW | GEO-1173, GEO-1124, GEO-1269, GEO-1184 |

---

## E2E-EXPORT-BRAND-001

**Export a brand analysis to PowerPoint, PDF and Excel**

| Field | Value |
|---|---|
| Status | NEW; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | End-to-end: Export a brand analysis to PowerPoint, PDF and Excel. Pass 2 — cross-epic (scenarios 201-202). Epics: GEO-152, GEO-1068, GEO-1513. Consolidates TC-GEO-1173-001, TC-GEO-1124-001, TC-GEO-1269-001, TC-GEO-1173-002, TC-GEO-1269-002, TC-GEO-1269-006, TC-GEO-1184-009. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): step 27 refers to the order noted at step 24 (was "step 1"). |
| Priority | High |
| Stories | GEO-1173, GEO-1124, GEO-1269, GEO-1184 |
| Precondition | Toyota 439acd96 (brand, export allowed), period Sep 28 – Oct 4, 2026 for the concept checks; Downloads parsed by the spec (pptx / pdf / xlsx readers) |
| Labels | e2e-suite |
| QA Parent | GEO-152 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PARTIAL 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user clicks the export (download) icon button in the analysis toolbar |  | The "Export analysis as" menu opens with the options "PDF", "Presentation .pptx" and "Spreadsheet .xls" |
| 2 | And the user selects "Presentation .pptx" | Option: Presentation .pptx | The PowerPoint export is generated and the .pptx file is downloaded |
| 3 | And the user opens the downloaded deck |  | The deck opens and all slides are listed |
| 4 | Then the last slide of the deck is the Action Center · Target Sources slide |  | The final slide shows the eyebrow "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself" with the ranked sources |
| 5 | And no Action Center slide appears before the other analysis sections |  | No "ACTION CENTER · TARGET SOURCES" slide is found in the middle of the deck (e.g. around slide 9) and no other section slide comes after it |
| 6 | Then the user opens the last slide of the deck |  | It shows "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself", M being the total noted in step 1 |
| 7 | And the user checks the top 3 cards and the table of the slide |  | The cards are the sources ranked 1 to 3 and the table rows follow ranks 4 to 10 of the ALL tab (visibility-only sources included), not the perception list on screen |
| 8 | And the user checks the counts of the slide |  | Each source shows its total of both verdicts (missing and negative counts as in the app), not its perception count only |
| 9 | And the user opens the key concepts slides |  | The key concepts section lists the concepts of B |
| 10 | Then each concept shows its source count, its polarity and its frequency % | Concepts P, M, N | Each concept row reads "{n} sources • {label}" with its frequency %: "Positive" for P, "Mixed" for M, "Negative" for N |
| 11 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts slide |
| 12 | And the user selects "PDF" | Option: PDF | The PDF export is generated and the .pdf file is downloaded |
| 13 | And the user opens the downloaded PDF |  | The PDF opens and all pages are listed |
| 14 | Then the last page of the PDF is the Action Center · Target Sources page |  | The final page shows the eyebrow "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself" with the ranked sources |
| 15 | And no Action Center page appears before the other analysis sections |  | No "ACTION CENTER · TARGET SOURCES" page is found in the middle of the PDF (e.g. around page 9) and no other section page comes after it |
| 16 | And the user opens the key concepts pages |  | The key concepts section lists the same concepts as the PowerPoint export |
| 17 | Then each concept shows its source count, its polarity and its frequency % | Concepts P, M, N | Each concept row reads "{n} sources • {label}" with its frequency % ("Positive", "Mixed" or "Negative") |
| 18 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts page |
| 19 | When the user exports the analysis as Excel in English | Format: XLSX; export language: English (EN) | A .xlsx file is downloaded |
| 20 | And the user opens every concepts table of the workbook |  | The concepts tables are present |
| 21 | Then each concepts table has the columns Concept, Sentiment, Sources, Frequency and Cited by |  | The header row reads "Concept", "Sentiment", "Sources", "Frequency", "Cited by" in this order; there is no "Score" column |
| 22 | And the Sentiment column holds the polarity label of each concept | Concepts P, M, N | "Positive" for P, "Mixed" for M, "Negative" for N; no numeric score in any cell |
| 23 | And the concepts and frequencies match the dashboard |  | Same concepts and same frequency values as the "Top Topics Associated with Your Brand" card of B |
| 24 | Given the user has exported the analysis as "Presentation .pptx" with "Coverage" selected in "Sort by" | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | A .pptx file is downloaded and the order of the Target Sources slide (top 3 cards and table) is noted |
| 25 | When the user selects "Prompts" in "Sort by" |  | The cards are re-sorted by prompt count |
| 26 | And the user exports the analysis again as "Presentation .pptx" |  | A .pptx file is downloaded |
| 27 | Then the exported order is not affected by the on-screen sort |  | The Target Sources slide order is the same as in step 24 (assumed, open question to the PO) |
