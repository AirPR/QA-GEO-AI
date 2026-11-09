# GEO-1125 — Test case review (v1, CSV generated)

**Story:** GEO-1125 — [Citation Sources] 10.10 — Remove the Favorability column from AI Citation Sources
**Epic:** GEO-152 | **Version:** GEO-R1.2 | **Status in Jira:** Ready for QA
**Source:** current Jira description of GEO-1125 (fetched 2026-10-05, saved as `.claude/Data/raw/.tmp-jira/GEO-1125.json` and `GEO-1125-description.txt`), cross-checked with `apps/geo/GEO-R1.2/GEO-152/STORY_GEO-1125_Citation_Sources_1010_Remove_the_Favorability_column_from_AI.md` and `EPIC.md` (User Story 1.10)
**Format reference:** `testcases-coverage-storyGEO-1178.csv` (not modified)
**CSV:** `.claude/Data/output/csv/GEO-R1.2/testcases-coverage-storyGEO-1125.csv` — 17 TCs, 91 steps
**Previous TCs (reference only, not modified):** `testcases-coverage-epicGEO-152.csv`, TC-GEO-1125-001..007

## Jira vs local file (AC diff)

- **No functional change.** The ACs, design ACs and notes in the Jira description are identical to the local STORY file, word for word. The only differences are formatting: Markdown bullets/headings and the link targets of the two spec links.
- **Jira history.** The description was last edited on 2026-09-17. The only later change is the status transition to Ready for QA (2026-09-24, Abdenasser Aroukhsiss). The local file (updated 2026-09-24) is therefore current.
- **EPIC.md, User Story 1.10:** the same 7 ACs, with no "Removed, not hidden" heading (the AC6 text is identical).
- **Local STORY file:** not rewritten.
- **Child issues:** GEO-1125 has none.

## Figma pass

- **Design source.** The Design Task is GEO-158 "Design - Actions Center" (Done), found by `parent = GEO-152 AND issuetype = "Design Task"`. It links to Figma file `xctSRqtM653zRS7QY3KMm0`, node `11725-93655`, the "AI Citation Sources" SECTION.
- **Children of the section:** 10 frames and 1 rectangle. None of them is an N0TE annotation.
- **Export:** 6 frames were exported as PNG in 3 batches (3 + 1 + 2), read visually, and the temp folder was deleted afterwards.

| Node | Frame name | Inferred state | Used in |
|------|------------|----------------|---------|
| 11725:94037 | AI Citation Sources - Legend Select / Source Filter | Card filtered to one source type (all rows "Journalism") | TC-001, TC-003 |
| 11725:93656 | AI Citation Sources - Legend Hover | Card with stacked-bar hover (segment highlighted) | TC-003 |
| 11725:93846 | AI Citation Sources - Legend Hover | Same, cursor on the Journalism segment | TC-003 |
| 11725:94227 | AI Citation Sources - All Domains + Hover | All domains modal with row hover | TC-002, TC-006, TC-007 |
| 11725:95113 | AI Citation Sources - Source Details | Source details side panel | TC-008 |
| 11725:125298 | AI Citation Sources - Source Details | Visually identical to 95113 | TC-008 |

Not exported: 95897 (Source Details Scroll), 96680, 127097 and 23353 (Cited URLs Modal). They belong to GEO-1126 and carry no column or badge relevant to this story.

**Exact texts used in the expected results:**

- **Card:**
  - Title: "LLM Engines Citation Sources"
  - Subtitle: "See which domains LLM Engines reference most often for your brand and niche"
  - Filter: "All source types"
  - Headers: "Domain ⇅", "Type ⇅", "Frequency ⇅"
  - Button: "All domains" with the count badge (522 in the design)
  - Row: favicon, domain, external-link icon, type chip, frequency
  - No fourth column and no badge in any frame.
- **Type chips seen:** "Journalism", "Social / UGC", "Competitor Media".
- **Legend:**
  - Competitor Media
  - Journalism
  - Corporate Blogs & Content
  - Social / UGC
  - Aggregators / Encyclopedic
  - Owned Media
  - Press Release
  - Government/NGO
  - Academic/Research
- **Modal:**
  - Title: "LLM Engines Citation Source Details - All Domains"
  - Subtitle: "522 domains"
  - Search field: "Search domains..."
  - The same three headers.
- **Details panel:**
  - Title: "LLM Engines Citation Source Details"
  - Sections: "Related Prompts" with the "All related Prompts" control (badge 34 in the design), then "Cited URLs"
  - No favorability badge.
- **Staging facts used (run of 2026-09-25):**
  - Heading: "LLM Engines Citation Sources"
  - ES heading: "Fuentes de citación de los motores de IA"
  - "All domains (N)" opens a `<dialog>`
  - The domain keys of the API DTO
- **Uncovered visual states → [Figma] TC:** the source type filter and legend hover (DAC1 / DAC3) are not described by any AC. They are covered by TC-GEO-1125-003 [Figma].

## AC inventory

```
Story GEO-1125 — 7 ACs identified (numbering = Jira AC1..AC7, no technical bullet filtered):
AC-1: Section and modal carry Domain, Type, Frequency only      → TC-001, TC-002, TC-003 [Figma], TC-004
AC-2: Favorability is not a sort key (both tables)               → TC-005, TC-006
AC-3: No favorable/mixed/unfavorable badge (section, modal, panel)→ TC-007, TC-008
AC-4: XLSX and PPTX domain table carries Domain, Type, Frequency → TC-009, TC-010
AC-5: Lite (PQL) result table carries no Favorability column     → TC-011
AC-6: Removed, not hidden (backend computation removed)          → TC-012, TC-013
AC-7: Questions Analysis filter, question detail panel,
      Corporate Reputation sheet, Raw Data sheet unchanged       → TC-014, TC-015, TC-016, TC-017
```

## Changes vs the previous 7 TCs (epic CSV, reference only)

- **AC numbering is fixed.** The old TCs were numbered one step off the Jira ACs:
  - The modal check said "AC-2".
  - The sort check said "AC-3".
  - The badge check said "AC-4".
  - The exports said "AC-5".
  - The Jira numbering is used here.
- **AC-7 had no TC.** It now has 4, one per protected surface.
- **The old Lite TC (006) tested the wrong surface.** It checked the AI Citation Sources card under a Lite account. It now checks the Lite result table and its ghost rows, including the shared-colgroup column count and alignment, on staging with the PQL account. It is written as executable.
- **Exports are split into XLSX (TC-009) and PPTX (TC-010).** Both are executable: the runner downloads the file and parses the sheet XML or slide XML.
- **AC-6 is split** into an API contract check (TC-012) and a DOM "not hidden" check (TC-013).
- **Added** a [Figma] filter/hover TC (TC-003) and a localisation TC (TC-004).

## Shared preconditions

- **BASE:**
  - Staging: https://staging-geo.onclusive.com/geo
  - Standard account, app language en-US
  - Toyota dashboard 439acd96-0b1b-4da4-9e07-612d38e9783e, overview (Health Check) page, default dashboard filters
  - The section "LLM Engines Citation Sources" has at least 10 domains and the "All domains (N)" button. N is read at execution time.
- **EXPORT:** BASE, plus the "Export" button. The runner downloads and parses the file:
  - XLSX: `xl/workbook.xml`, `xl/sharedStrings.xml` and `xl/worksheets/*.xml`
  - PPTX: `ppt/slides/slide*.xml`
- **REF:** a reference export or screen state from before GEO-1125, used for the AC-7 "unchanged" comparisons (OP-6).
- **LITE:**
  - Staging, PQL account assiya.benramdane+geo@onclusive.com
  - A Lite analysis result is displayed, with its real table and gated ghost rows.
  - The two tables are table-fixed with a shared colgroup. They must keep the same column count and stay aligned.

## TCs grouped by AC

### AC-1

**TC-GEO-1125-001 - Citation Sources section shows only Domain Type and Frequency columns** | Priority: High | Smoke: Yes | Regression: Yes | Functional

Verify that the LLM Engines Citation Sources section carries the Domain, Type and Frequency columns only, with no Favorability column. Covers AC-1 (DAC1, Figma 11725:94037).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the overview page of the Toyota dashboard | Dashboard 439acd96-0b1b-4da4-9e07-612d38e9783e | The dashboard overview is displayed |
| 2 | When the LLM Engines Citation Sources section renders |  | "LLM Engines Citation Sources" and "See which domains LLM Engines reference most often for your brand and niche" are displayed, with the "All source types" filter, the stacked bar and its legend |
| 3 | Then the domain table shows exactly three column headers |  | The headers read "Domain", "Type" and "Frequency", in this order, each with a sort icon |
| 4 | And no Favorability column is present |  | No header or column labelled "Favorability" (or Favorable / Mixed / Unfavorable) is displayed; each row shows only the domain with its favicon and external-link icon, the type chip and the frequency |
| 5 | And the "All domains" button is displayed under the table |  | "All domains" with the count badge N is displayed under the last row |

**TC-GEO-1125-002 - All domains modal shows only Domain Type and Frequency columns** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the "All domains" modal carries the Domain, Type and Frequency columns only, also after a search. Covers AC-1 (DAC2, Figma 11725:94227).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the LLM Engines Citation Sources section is displayed |  | The domain table and the "All domains (N)" button are displayed |
| 2 | When the user clicks the "All domains" button |  | A modal opens with the title "LLM Engines Citation Source Details - All Domains", the subtitle "N domains" and the search field "Search domains..." |
| 3 | Then the modal table shows exactly three column headers |  | The headers read "Domain", "Type" and "Frequency", in this order, each with a sort icon |
| 4 | And no Favorability column is present in the modal |  | No header or column labelled "Favorability" (or Favorable / Mixed / Unfavorable) is displayed in the modal |
| 5 | When the user types a domain in the search field | Search term: the first domain of the list (for example "reuters") | The list is narrowed to the domains matching the term |
| 6 | Then the filtered table still shows only the Domain, Type and Frequency columns |  | The headers still read "Domain", "Type" and "Frequency" and no Favorability column appears |

**TC-GEO-1125-003 - [Figma] Source type filter and legend hover keep the three-column table** | Priority: Medium | Smoke: No | Regression: No | UI

[Figma] Verify that the source type filter and the legend hover states keep the table at Domain, Type and Frequency only. Covers AC-1 (DAC1 frame 11725:94037 "Legend Select / Source Filter", DAC3 frames 11725:93656 and 11725:93846 "Legend Hover").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the LLM Engines Citation Sources section is displayed with "All source types" |  | The domain table lists domains of several types |
| 2 | When the user hovers a segment of the stacked bar | Segment: Journalism | The Journalism segment is highlighted and the table behind it is unchanged |
| 3 | Then the table still shows only the Domain, Type and Frequency columns |  | The headers read "Domain", "Type" and "Frequency" and no Favorability column appears |
| 4 | When the user selects one source type in the "All source types" filter | Source type: Journalism | The table lists only domains with the "Journalism" type chip |
| 5 | Then the filtered table still shows only the Domain, Type and Frequency columns |  | The headers read "Domain", "Type" and "Frequency" and no Favorability column appears |

**TC-GEO-1125-004 - Citation Sources table has three columns in fr-FR and es-ES** | Priority: Medium | Smoke: No | Regression: No | Functional

Verify that the Citation Sources section and the All domains modal carry three columns and no translated Favorability header in the French and Spanish locales. Covers AC-1 (localisation, Definition of Done).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user switches the app language to es-ES | Locale: es-ES | The section heading reads "Fuentes de citación de los motores de IA" |
| 2 | When the Citation Sources section renders |  | The domain table is displayed |
| 3 | Then the table shows exactly three column headers |  | Three headers are displayed (Spanish labels of Domain, Type and Frequency) and no header reads "Favorabilidad" or any other translation of Favorability |
| 4 | And the All domains modal shows exactly three column headers |  | The modal opened from the "All domains" button shows the same three headers and no Favorability header |
| 5 | When the user switches the app language to fr-FR | Locale: fr-FR | The section heading is displayed in French |
| 6 | Then the section table and the All domains modal show exactly three column headers |  | Three headers are displayed in both tables and no header reads "Favorabilité" or any other translation of Favorability |


### AC-2

**TC-GEO-1125-005 - Favorability is not a sort key in the Citation Sources section** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that only Domain, Type and Frequency are offered as sort keys in the section table and that Favorability is not. Covers AC-2.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the LLM Engines Citation Sources section is displayed |  | The domain table is displayed with the headers "Domain", "Type" and "Frequency" |
| 2 | When the user inspects the sortable headers of the table |  | Exactly three headers carry a sort icon: "Domain", "Type" and "Frequency" |
| 3 | And the user clicks the "Frequency" header |  | The rows are re-ordered by frequency |
| 4 | And the user clicks the "Domain" header |  | The rows are re-ordered alphabetically by domain |
| 5 | And the user clicks the "Type" header |  | The rows are re-ordered by type |
| 6 | Then no Favorability sort key is offered |  | No header, sort menu or sort option named "Favorability" exists, and no fourth sortable header is present |

**TC-GEO-1125-006 - Favorability is not a sort key in the All domains modal** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that only Domain, Type and Frequency are offered as sort keys in the All domains modal and that Favorability is not. Covers AC-2.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the "All domains" modal is open |  | "LLM Engines Citation Source Details - All Domains" is displayed with the headers "Domain", "Type" and "Frequency" |
| 2 | When the user inspects the sortable headers of the modal table |  | Exactly three headers carry a sort icon: "Domain", "Type" and "Frequency" |
| 3 | And the user clicks the "Frequency" header |  | The rows are re-ordered by frequency |
| 4 | And the user clicks the "Type" header |  | The rows are re-ordered by type |
| 5 | Then no Favorability sort key is offered |  | No header, sort menu or sort option named "Favorability" exists, and no fourth sortable header is present |


### AC-3

**TC-GEO-1125-007 - No favorability badge on domain rows of the section and the All domains modal** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that no favorable, mixed or unfavorable badge is shown for a domain in the section table and in the All domains modal. Covers AC-3.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the LLM Engines Citation Sources section is displayed |  | The domain table is displayed |
| 2 | When the domain rows of the section render |  | Each row shows the favicon, the domain with its external-link icon, the type chip (for example "Journalism", "Social / UGC", "Competitor Media") and the frequency |
| 3 | Then no favorability badge is shown on any row |  | No "Favorable", "Mixed" or "Unfavorable" badge, chip or coloured indicator is displayed on any domain row |
| 4 | When the user opens the "All domains" modal and scrolls through the list |  | The modal lists the domains with the same row layout |
| 5 | Then no favorability badge is shown on any row of the modal |  | No "Favorable", "Mixed" or "Unfavorable" badge, chip or coloured indicator is displayed on any domain row of the modal |

**TC-GEO-1125-008 - No favorability badge in the source details panel** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the source details panel of a domain shows no favorable, mixed or unfavorable badge. Covers AC-3 (Figma 11725:95113 / 11725:125298 "Source Details").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the LLM Engines Citation Sources section is displayed |  | The domain table is displayed |
| 2 | When the user clicks the first domain of the table | Domain: first row of the table | The side panel "LLM Engines Citation Source Details" opens |
| 3 | Then the panel shows its sections without any favorability badge |  | "Related Prompts" with the "All related Prompts (n)" control and "Cited URLs" are displayed, and no "Favorable", "Mixed" or "Unfavorable" badge is shown for the domain |
| 4 | When the user scrolls to the end of the panel |  | All sections of the panel have been displayed |
| 5 | Then no favorability badge or label is shown anywhere in the panel |  | No "Favorable", "Mixed" or "Unfavorable" badge, chip or label is shown in the panel header, the prompt rows or the cited URL rows |
| 6 | When the user opens the details panel of a domain from the "All domains" modal | Domain: any row of the modal | The side panel "LLM Engines Citation Source Details" opens for that domain |
| 7 | Then no favorability badge is shown in that panel either |  | No "Favorable", "Mixed" or "Unfavorable" badge is shown for the domain |


### AC-4

**TC-GEO-1125-009 - XLSX export AI Citation Sources table carries Domain Type and Frequency only** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the domain table of the AI Citation Sources section in the XLSX workbook carries Domain, Type and Frequency only. Covers AC-4.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the overview page of the Toyota dashboard |  | The "Export" button is displayed at the top right |
| 2 | When the user exports the analysis in Excel (XLSX) format | Format: XLSX | An .xlsx file is downloaded |
| 3 | And the runner opens the AI Citation Sources section of the workbook | Sheet: the sheet holding the AI Citation Sources domain table (see OP-4) | The sheet holding the citation sources domain table is found |
| 4 | Then the header row of the domain table carries Domain, Type and Frequency only |  | The header row has exactly three cells: "Domain", "Type" and "Frequency" |
| 5 | And no Favorability column or value is present in that table |  | No header reads "Favorability" and no cell of the table holds "Favorable", "Mixed" or "Unfavorable" |
| 6 | And the data rows match the domain table of the dashboard |  | The first rows list the same domains, types and frequencies as the section table on screen, with three cells per row |

**TC-GEO-1125-010 - PPTX export AI Citation Sources slide table carries Domain Type and Frequency only** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the domain table of the AI Citation Sources slide in the PowerPoint deck carries Domain, Type and Frequency only. Covers AC-4.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the overview page of the Toyota dashboard |  | The "Export" button is displayed at the top right |
| 2 | When the user exports the analysis in PowerPoint (PPTX) format | Format: PPTX | A .pptx file is downloaded |
| 3 | And the runner opens the AI Citation Sources slide of the deck | Slide: the slide titled "LLM Engines Citation Sources" (or "AI Citation Sources", see OP-4) | The slide XML holding the citation sources domain table is found |
| 4 | Then the domain table of the slide has exactly three columns |  | The table (a:tbl) has three a:gridCol entries and its header row reads "Domain", "Type" and "Frequency" |
| 5 | And no Favorability column or value is present on the slide |  | No text on the slide reads "Favorability", "Favorable", "Mixed" or "Unfavorable" |


### AC-5

**TC-GEO-1125-011 - Lite PQL result table has no Favorability column and stays aligned with its ghost rows** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the Lite (PQL) result table carries no Favorability column (no blurred grey pill column) and that the real table and the gated ghost rows keep the same column count and stay aligned. Covers AC-5.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is logged in with the PQL account on staging and a Lite analysis result is displayed | Account: assiya.benramdane+geo@onclusive.com | The Lite result page shows the result table and the gated ghost rows beneath it |
| 2 | When the result table renders |  | The table headers and the first real rows are displayed |
| 3 | Then no Favorability column is displayed in the result table |  | No header reads "Favorability" and no cell shows the blurred grey favorability pill |
| 4 | And no Favorability column is displayed in the gated ghost rows |  | No ghost row shows a blurred grey favorability pill in a dedicated column |
| 5 | And the real table and the ghost rows table have the same column count |  | Both tables have the same number of col entries in their colgroup and the same number of cells per row |
| 6 | And the columns of the ghost rows are aligned with the columns of the real table |  | For each column, the left and right edges of the ghost row cells match the header and real row cells (within 1 px); no column is shifted or overflowing |


### AC-6

**TC-GEO-1125-012 - Citation sources API returns no favorability field for a domain** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the backend no longer returns any favorability value in the domain data of the citation sources response (removed, not hidden). Covers AC-6.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the overview page of the Toyota dashboard |  | The page sends GET /geo/api/v1/reports/{id}/overview/citation-sources |
| 2 | When the citation sources response is received |  | The response status is 200 and it lists the domains shown in the section |
| 3 | Then no domain object carries a favorability field |  | No key named favorability, favorable, mixed, unfavorable or favorabilityLabel (any case) exists at any level of the domain objects |
| 4 | And each domain object carries only the citation source fields | Expected keys (captured 2026-09-25): domain, sourceType, frequency, citedBy, visibilityGaps, competitiveLosses, sentimentIssues, llmCitations, citedUrls | Every domain object has exactly these keys and no additional one |
| 5 | When the user opens the "All domains" modal |  | The modal lists the N domains |
| 6 | Then the data loaded for the modal carries no favorability field either |  | No request made to load the modal returns a favorability key for a domain |

**TC-GEO-1125-013 - Citation Sources DOM holds no hidden Favorability column** | Priority: Medium | Smoke: No | Regression: No | Functional

Verify that the Favorability column is removed from the DOM and not hidden (no hidden header, cell or col entry). Covers AC-6.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the LLM Engines Citation Sources section is displayed |  | The domain table is displayed |
| 2 | When the runner inspects the DOM of the section table |  | The table element, its colgroup (if any), header cells and row cells are read |
| 3 | Then the table holds exactly three columns in the DOM |  | Each header row has three th cells, each data row has three td cells and the colgroup (if any) has three col entries |
| 4 | And no hidden favorability element exists |  | No element with display:none, visibility:hidden, aria-hidden or zero width carries favorability text, a favorability class or a favorability data attribute |
| 5 | When the user opens the "All domains" modal and the runner inspects its table |  | The modal table is read |
| 6 | Then the modal table holds exactly three columns and no hidden favorability element |  | Three th per header row, three td per data row, and no hidden favorability element |


### AC-7

**TC-GEO-1125-014 - Questions Analysis favourability filter is unchanged** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the favourability filter of Questions Analysis is still present and works as before; the removal covers the source-level label only. Covers AC-7.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Questions Analysis page of the Toyota dashboard |  | The Questions Analysis page is displayed with its question list |
| 2 | When the user opens the favourability filter |  | The favourability filter is displayed with the same label and the same options as in the reference |
| 3 | And the user selects one favourability option | Option: the first option of the filter | The filter shows the selected option |
| 4 | Then the question list is narrowed to that favourability |  | Only questions with the selected favourability are listed and the count is updated |
| 5 | When the user clears the filter |  | The full question list is displayed again |

**TC-GEO-1125-015 - Question detail panel favourability is unchanged** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the question detail panel still shows its favourability information as before; the removal covers the source-level label only. Covers AC-7.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Questions Analysis page of the Toyota dashboard |  | The question list is displayed |
| 2 | When the user opens the detail panel of a question | Question: the first question of the list | The question detail panel opens |
| 3 | Then the favourability information of the question is displayed as before |  | The favourability label or indicator shown in the panel is present, with the same wording and position as in the reference |
| 4 | And the rest of the panel is unchanged |  | The panel sections are the same as in the reference |

**TC-GEO-1125-016 - XLSX Corporate Reputation sheet is unchanged** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the Corporate Reputation sheet of the XLSX workbook is unchanged; the removal covers the source-level label only. Covers AC-7.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user exports the analysis in Excel (XLSX) format | Format: XLSX | An .xlsx file is downloaded |
| 2 | When the runner opens the Corporate Reputation sheet | Sheet: Corporate Reputation | The sheet exists in the workbook |
| 3 | Then its header row is the same as in the reference export |  | Same column headers, same order, favourability-related columns included |
| 4 | And its rows hold favourability values as before |  | The favourability-related columns are filled with values of the same kind as in the reference |

**TC-GEO-1125-017 - XLSX Raw Data sheet is unchanged** | Priority: High | Smoke: No | Regression: Yes | Functional

Verify that the Raw Data sheet of the XLSX workbook is unchanged; the removal covers the source-level label only. Covers AC-7.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user exports the analysis in Excel (XLSX) format | Format: XLSX | An .xlsx file is downloaded |
| 2 | When the runner opens the Raw Data sheet | Sheet: Raw Data | The sheet exists in the workbook |
| 3 | Then its header row is the same as in the reference export |  | Same column headers, same order, favourability-related columns included |
| 4 | And its rows hold favourability values as before |  | The favourability-related columns are filled with values of the same kind as in the reference |


## Automation notes (for later spec generation, not CSV content)

- **AC-3 scans (TC-007, TC-008).** Restrict the scan to badge, chip and pill elements of the rows and the panel. Prompt texts or article titles can legitimately contain words like "mixed", so a page-wide text search would give false positives.
- **AC-5 alignment (TC-011).**
  - Read `table > colgroup > col` for both tables. Compare the counts, and compare the `cells.length` of the first real row and the first ghost row.
  - For each index i, compare `getBoundingClientRect().left/right` of the real header cell i and the ghost cell i (tolerance 1 px).
  - Take a `shotAt` of both tables before each assertion.
- **AC-4 parsing (TC-009, TC-010).**
  - XLSX: resolve the sheet names from `xl/workbook.xml`, then the shared strings.
  - PPTX: find the slide whose text contains the section title, then count `a:gridCol` in its `a:tbl`.
- **AC-6 (TC-012).** Capture the response with `page.waitForResponse(/overview\/citation-sources/)`. Then walk every domain object recursively, looking for `/favo(u)?rab/i` keys and for the values Favorable / Mixed / Unfavorable.

## Coverage summary

| Type | Count | TCs |
|------|-------|-----|
| Happy path | 11 | 001, 002, 005, 006, 007, 008, 009, 010, 011, 012, 013 |
| Edge (filter/hover, locales) | 2 | 003 [Figma], 004 |
| State / regression guard | 4 | 014, 015, 016, 017 |
| Error handling | 0 | none implied by the ACs |

- **Totals:** 17 TCs, 91 steps.
- **Priority:**
  - High: 14
  - Medium: 3 (003, 004, 013)
- **Smoke:** 1 (TC-001).
- **QA Regression:** Yes on the 14 High TCs.
- **UI/Functional:**
  - UI: 1 (003)
  - Functional: 16
- **Filtered as technical:** none. The technical part lives in the repo spec and is not read by QA:
  - the DTO contract
  - the i18n keys
  - the scope-guard table
- **Ambiguous ACs:**
  - **AC-6** is only observable through the API contract and the DOM. Whether the computation is removed in code is a code-review matter (PR 549). See OP-5.
  - **AC-7 "unchanged"** needs a baseline. See OP-6.

## Open points (need a user decision)

- **OP-1 — Location of the section.** The TCs assume the section "LLM Engines Citation Sources" is on the overview (Health Check) page of the Toyota dashboard. This follows the Figma frames and the `/overview/citation-sources` endpoint. Confirm the navigation path on staging, and whether the default dashboard filters are acceptable.
- **OP-2 — Lite result table.**
  - **Headers and column count:** what are the exact headers of the Lite result table, and how many columns should remain? Today the table has 4 headers and a 5-entry colgroup, so after the change it is presumably 3 headers and a 4-entry colgroup. TC-011 only asserts that the two tables are equal and aligned, not an absolute number.
  - **Access:** how is a Lite analysis result reached with the PQL account? It could be an existing Lite analysis, or one that must be created first, in which case which brand?
- **OP-3 — Localised labels.**
  - The fr-FR section heading is unknown.
  - The fr-FR and es-ES labels of Domain / Type / Frequency are unknown.
  - TC-004 therefore asserts three headers and no "Favorabilité" / "Favorabilidad" header.
  - Provide the locked strings (copy sheet) if exact labels should be asserted, or drop TC-004 if localisation is out of QA scope for this story.
- **OP-4 — Export targets.**
  - Which sheet name of the XLSX holds the AI Citation Sources domain table?
  - What is the title of the PPTX slide ("LLM Engines Citation Sources" or "AI Citation Sources")?
  - How is the format selected in the "Export" menu?
- **OP-5 — AC-6 scope.**
  - **Expected key set:** TC-012 asserts the domain key set captured on 2026-09-25: domain, sourceType, frequency, citedBy, visibilityGaps, competitiveLosses, sentimentIssues, llmCitations, citedUrls. Confirm that `sentimentIssues` is not a favourability remnant. It is presumably the Perception prompts data of GEO-1126.
  - **Modal endpoint:** confirm whether the "All domains" modal uses the same endpoint or a separate one.
  - **Code-level removal:** accept that removing the backend computation is verified through the API contract plus the DOM only.
- **OP-6 — AC-7 baseline.**
  - **Reference:** "unchanged" needs a reference. It can be a pre-deployment export or screenshots of the 4 surfaces, or production if GEO-1125 is not yet released there. Which one should be used?
  - **Unknown labels:** the exact label and options of the Questions Analysis favourability filter are unknown, and so is the favourability indicator of the question detail panel. The TCs compare them to the reference instead of hardcoding values.
- **OP-7 — Sort direction.** The ACs do not specify the first-click direction (ascending or descending). TC-005 and TC-006 only assert that the rows are re-ordered and that no fourth sort key exists.
