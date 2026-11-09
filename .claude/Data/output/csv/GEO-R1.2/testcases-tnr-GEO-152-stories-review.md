# GEO-152 Action Center / Target Sources + Citation Sources — TNR test case review (stories and tasks, v1, CSV generated)

**Scope:** non-regression of the Stories and Tasks of epic GEO-152, version GEO-R1.2 (feature level, not bug level). **Sources (read-only):** `apps/geo/GEO-R1.2/GEO-152/` (EPIC.md, epic-data.json, STORY_*.md, TASK_*.md), the per-story CSVs of `.claude/Data/output/csv/GEO-R1.2/` and their staging run results (`processed/testcases/test-results/test-results-GEO-152-*-real.json`, runs of 2026-09-25 to 2026-10-06) for the current UI strings. Format reference: `testcases-tnr-GEO-152-action-center.csv` (bug-based TNR, not duplicated).
**CSV:** `.claude/Data/output/csv/GEO-R1.2/testcases-tnr-GEO-152-stories.csv`: 36 TCs, 204 step rows (+1 header), 16 columns, `;` separator, UTF-8 without BOM, CRLF. Labels = TNR, QA Parent = GEO-152, QA Regression = Yes, QA Story/Task = story/task key, Test Type = Manual.

## Test data

| Organisation | Analysis | UUID | Used by |
|---|---|---|---|
| QA-GEO | Toyota, period "Last 7 days" (rolling; 117 to 129 target sources on 2026-10-06; countries United States, France, Spain; categories Voitures hybrides > VUS > Voitures électriques) | `439acd96-0b1b-4da4-9e07-612d38e9783e` | ST-001 to ST-011, ST-013 to ST-020, ST-022 to ST-034 |
| QA-GEO | BYD, AI Engines = Gemini only (showed "All clear" on 2026-10-01/02, lists sources in its default scope) | `76aad462-a33f-4bdb-a925-2c1533e97a53` | ST-012 (candidate, Conditional) |
| Onclusive | Tesla (United States - English, 3 engines) | `4419839a-317f-4f9d-8a8c-32184906a2aa` | ST-035 |
| Onclusive | Nike (United States - English, 5 engines) | `51f6eb92-0d7a-4c77-8fa8-e46d5d610309` | ST-036 |
| Onclusive | Lidl Nederland (United Kingdom - English, 2 engines) | `1444d4ef-9555-4c35-bfd6-52af5128e180` | ST-036 |
| GEO Stress Test 2026-10 | AstraZeneca / Cruz Roja Argentina ("Pages could not be checked", not a valid all-clear) | `458c20e9-…` / `a3eb5a05-…` | referenced in ST-012 only (covered by TC-TNR-AC-016) |
| — | PQL account assiya.benramdane+geo@onclusive.com (Lite plan, /geo/upsell) | — | ST-021 (Conditional) |

Staging: https://staging-geo.onclusive.com/geo, QA account, interface en-GB (Settings > Preferences > Interface Language, "Save changes"). Date presets: Last analysis, Last 7 days, Last 30 days, Last 3 months, Last 12 months, All analyses; a preset applies only after "Apply". Exports: export icon → "Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls"; the deck had 41 slides on 2026-10-06 with Action Center · Target Sources last; the PDF has no text layer (render and read the pages).

## Open bugs that must not fail a TNR TC

| Bug | Subject | How the TCs avoid it |
|---|---|---|
| GEO-1201 | Passage cut at 140 chars mid-word, no "…" | No expected result checks how a passage ends or a "…" join (ST-003, ST-035, ST-036). ST-003 checks only the 140-character maximum, which held 124/124 on 2026-10-06. |
| GEO-1190 / GEO-1203 | Competitor, homonym or another company's product counted as the brand | ST-003 checks that a highlight is present, not which brand it is on; ST-036 accepts any brand-family name. |
| GEO-1204 | Some negative pages still not negative | No TC opens a page to judge its verdict. |
| GEO-1205 | No in-run retry | ST-008 checks the UI state only. |
| GEO-1210 / GEO-1211 | Excel gauges / Raw Data residuals | ST-018 reads only the Target Sources sheet; ST-020 reads only the citation sources domain table; the Raw Data sheet is not checked. |
| GEO-1167 follow-up (case duplicates "Kia"/"KIA", reopen candidate, 2026-10-06) | Prompt rows differing only by letter case | ST-031 and ST-034 fail only on exact duplicates; case pairs are recorded. |
| GEO-1183 Tesla AC-2 (consumerreports.org, brand only inside a link, 2026-10-06) | Passage without the brand | ST-036 covers Nike and Lidl Nederland only. |

## Story/Task → TC inventory

| Story/Task | Jira status | TC(s) | Data |
|---|---|---|---|
| GEO-1116 | QA In Progress | ST-001, ST-002 | QA-GEO Toyota 439acd96, Last 7 days |
| GEO-1117 | QA In Progress | ST-003, ST-004 | QA-GEO Toyota 439acd96, Last 7 days |
| GEO-1118 | QA In Progress | ST-005 (Smoke), ST-006, ST-007 | QA-GEO Toyota 439acd96, Last 7 days |
| GEO-1119 | QA In Progress | ST-008 (Conditional) | Analysis with a running verification (fresh run) |
| GEO-1120 | QA In Progress | ST-009, ST-010 (Smoke), ST-011 | QA-GEO Toyota 439acd96, Last 7 days / Last analysis / Last 30 days |
| GEO-1121 | Ready for QA | ST-012 (Conditional) | QA-GEO BYD 76aad462, AI Engines = Gemini only (candidate) |
| GEO-1122 | Ready for QA | ST-013 (Conditional) | QA-GEO daily analysis (Toyota 439acd96), Manage Scope change |
| GEO-1123 | Ready for QA | ST-014 (Smoke), ST-015, ST-016 | QA-GEO Toyota 439acd96, Last 7 days |
| GEO-1124 | QA In Progress | ST-017, ST-018 | QA-GEO Toyota 439acd96, PPTX + XLSX |
| GEO-1125 | Ready for QA | ST-019 (Smoke), ST-020, ST-021 (Conditional) | QA-GEO Toyota 439acd96 Overview; PQL account (Lite) |
| GEO-1126 | Ready for QA | ST-022 (Smoke), ST-023 | QA-GEO Toyota 439acd96 Overview |
| GEO-1144 | Ready for QA | ST-024, ST-025 | QA-GEO Toyota 439acd96, FR PPTX / ES PDF |
| GEO-1166 | Ready for QA | ST-026 (Smoke), ST-027 | QA-GEO Toyota 439acd96, Last 7 days |
| GEO-1168 | Ready for QA | ST-028 (Smoke), ST-029, ST-030 | QA-GEO Toyota 439acd96, app + PPTX/PDF |
| GEO-1169 | Ready for QA | ST-031 | QA-GEO Toyota 439acd96, Action Center + Overview |
| GEO-1173 | Ready for QA | ST-032 (Smoke) | QA-GEO Toyota 439acd96, PPTX + PDF |
| GEO-1178 | Ready for QA | ST-033 (Smoke), ST-034 | QA-GEO Toyota 439acd96, Last 7 days |
| GEO-1183 | Code Review | ST-035, ST-036 | Onclusive: Tesla 4419839a, Nike 51f6eb92, Lidl Nederland 1444d4ef |
| GEO-1184 | Backlog | — (excluded: not implemented) | — |

## Test cases

### TC-TNR-ST-001 - [GEO-1116] Owned brand and competitor domains are never listed as target sources

- **Story/Task:** GEO-1116 (QA In Progress) | **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (exclusion rule)
- **Description:** Non-regression of GEO-1116 (QA In Progress): a domain owned by the analysed brand (every country domain of the brand family, compared on the registrable name) or by a competitor of the analysis is never a target source, even when AI engines cite it. A media subdomain carrying the brand name (e.g. toyota.caranddriver.com) stays a legitimate target source and is not asserted. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. The competitor brands of the analysis are read on its Overview before the test (Hyundai, Honda and Peugeot domains were cited on 2026-10-02).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The Overview is displayed with the section "AI Engines Citation Sources" |
| 2 | When the user clicks "All domains" and searches "toyota" | Search field "Search domains…": toyota | The modal "Sources - All domains" lists the Toyota-owned domains cited by AI engines, e.g. toyota.fr, toyota.es, toyota.com (record them) |
| 3 | And the user searches the domains of the competitors of the analysis | e.g. hyundai.com, honda.com, peugeot.fr | The competitor domains cited by AI engines are listed (record them) |
| 4 | When the user opens the Action Center and clicks "Show N more sources" | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | All target sources are listed and the "Show N more sources" button is no longer displayed |
| 5 | Then the user searches the Toyota-owned domains in the list | Ctrl+F "toyota." and each recorded domain | No target source has a domain whose registrable name is "toyota" (toyota.fr, toyota.es, toyota.com, toyota.ca, toyota.co.uk...) |
| 6 | And the user searches each recorded competitor domain in the list | Ctrl+F each competitor domain recorded in step 3 | None of the recorded competitor domains is listed as a target source |

### TC-TNR-ST-002 - [GEO-1116] A target source carries the specific articles it was cited on

- **Story/Task:** GEO-1116 (QA In Progress) | **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1116 (QA In Progress): each target source is recorded with the specific article pages on which AI engines cited it, so its details panel lists article URLs of that domain, not only the domain. Covers AC-3. AC-1 and AC-2 (qualifying legs) are superseded by GEO-1169 (pool = top 100 domains by citation Frequency) and are not asserted.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user opens the details panel of the source ranked #1 | Source #1 (frandroid.com on 2026-10-06) | The details panel opens with the header "#1 · {domain}" |
| 3 | Then the user reads the article rows of the selected tab |  | Each row shows its article title (when the page has one) and a URL of the same domain as the source (e.g. "frandroid.com/..."), shown without protocol |
| 4 | And the user clicks "Show N more articles" if it is displayed |  | All the articles of the tab are listed and their number equals the tab count |
| 5 | When the user opens the first article URL in a new browser tab | First article of the tab | A specific article page of the source domain opens, not only the home page of the domain |

### TC-TNR-ST-003 - [GEO-1117] Lack of visibility articles show no passage, negative articles show a highlighted passage of at most 140 characters

- **Story/Task:** GEO-1117 (QA In Progress) | **ACs:** AC-2, AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1117 (QA In Progress): the page check classifies each failing article as "brand not named" (no passage shown) or "brand named negatively" (verbatim passage with the brand or product name highlighted, at most 140 characters including spaces). Covers AC-2, AC-7. How a passage ends and whether the highlighted name is the right brand are not checked (open bugs GEO-1201, GEO-1190 / GEO-1203).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Open bugs that must not fail this TC: GEO-1201 (passage cut mid-word without "…"), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand), GEO-1204 (some negative pages still not negative).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user opens the details panel of the first source carrying both "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION" badges | e.g. frandroid.com | The panel opens with the tabs "Lack of visibility (N)" (selected) and "Negative perception (N)" |
| 3 | Then the user checks the article rows of "Lack of visibility (N)" |  | The line "None of these articles mentions Toyota anywhere on the page." is shown once under the tabs and no row shows a quoted passage |
| 4 | When the user clicks "Negative perception (N)" |  | The line "Each of these articles mentions Toyota negatively." is shown and every row shows a quoted passage in italics |
| 5 | Then the user checks the brand in each passage |  | Every passage shows at least one highlighted brand or product name |
| 6 | And the user counts the characters of each passage | Text inside the curly quotes, spaces included | No passage is longer than 140 characters |

### TC-TNR-ST-004 - [GEO-1117] Every listed source has at least one failing article and no positive article is shown or counted

- **Story/Task:** GEO-1117 (QA In Progress) | **ACs:** AC-5, AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + state (no zero source)
- **Description:** Non-regression of GEO-1117 (QA In Progress): a source whose failing article count is zero does not appear, and articles naming the brand neutrally or positively never count. Covers AC-5, AC-9. AC-5 superseded by GEO-1168 for the panel part: positive articles are no longer shown in the panel (no "Positive articles" tab).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and switches to the list view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The table shows the columns "#", "Source", "Type", "Articles" |
| 2 | When the user clicks "Show N more sources" until all rows are listed |  | All target sources are listed and the button is no longer displayed |
| 3 | Then the user checks the Articles cell of every row |  | Every row shows at least one chip with a count of 1 or more (blue eye-off chip for missing, purple thumb-down chip for negative); no row shows a 0 count or an empty Articles cell |
| 4 | When the user opens the details panel of the row ranked #1 |  | The panel shows only the tab(s) "Lack of visibility (N)" and/or "Negative perception (N)" |
| 5 | Then the user looks for positive articles in the panel |  | No "Positive articles" tab, no positive count and no article covering the brand positively is shown |
| 6 | And the user compares the tab counts with the chips of row #1 |  | Each tab count equals the matching chip of the row (positive articles are not added to any count) |

### TC-TNR-ST-005 - [GEO-1118] Action Center opens on Target Sources with verdict tabs, filters, two views and the first 12 cards

- **Story/Task:** GEO-1118 (QA In Progress) | **ACs:** AC-2, AC-3, AC-6, AC-13 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1118 (QA In Progress): the Action Center opens on the "Target Sources" list with the verdict tabs ALL / IMPROVE VISIBILITY / IMPROVE PERCEPTION (ALL by default), the source type filter beside the tabs, a card view and a list view in the same fixed order, and an explicit control for the remaining sources. Covers AC-2, AC-3, AC-6, AC-13. AC-2 default label superseded by GEO-1168 ("All types", plus a Category filter); AC-13 superseded by GEO-1168 (12 cards before "Show X more sources"); subtitle per GEO-1168.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Toyota analysis and clicks "Action Center" in the left menu | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The page shows the title "Target Sources" and the subtitle "Sources to target to improve how AI engines represent your brand, sorted by the number of articles where your brand is missing or negatively represented" |
| 2 | Then the user checks the verdict tabs |  | Three tabs are shown, "ALL", "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION", and "ALL" is selected |
| 3 | And the user checks the filters beside the tabs |  | A Category filter reading "All categories" and a Type filter reading "All types" are displayed |
| 4 | And the user checks the cards |  | Exactly 12 source cards ranked 1 to 12 are displayed, followed by "Show N more sources" where N = total target sources - 12 |
| 5 | When the user switches to the list view |  | The sources are shown as table rows in the same order as the cards (row 1 = card 1, row 2 = card 2...) |
| 6 | And the user switches back to the card view |  | The cards are displayed again in the same order, with no sort control on the list |

### TC-TNR-ST-006 - [GEO-1118] Sources are ranked by their article total and each card shows rank, logo, domain, type, badges and reason lines

- **Story/Task:** GEO-1118 (QA In Progress) | **ACs:** AC-1, AC-4, AC-5, AC-12 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1118 (QA In Progress): the list is ordered by failing article count and each card shows its rank, logo, domain, type and reason badges, the badges matching the verdicts of its failing articles. Covers AC-1, AC-4, AC-5, AC-12. AC-1 and AC-4 superseded by GEO-1168: the count is split into "Not visible in N articles" / "Negative perception in N articles" (total = missing + negative) and the "Cited N× in gap answers" line is removed. The tie-break is not asserted (see review).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user reads the first 12 cards |  | Each card shows its rank, a logo (or a neutral placeholder) next to the domain in bold, a source type chip (e.g. "Journalism") and its reason badge(s) |
| 3 | Then the user compares the badges and the lines of each card |  | A card with "IMPROVE VISIBILITY" shows "Not visible in N article(s)", a card with "IMPROVE PERCEPTION" shows "Negative perception in N article(s)", a card with both badges shows both lines; no card shows "Cited" or "failing articles" |
| 4 | And the user computes the total of each card | Total = missing + negative | The totals never increase from one rank to the next (rank 1 holds the highest total) |
| 5 | When the user clicks "Show N more sources" |  | The remaining cards are listed and the order rule of step 4 still holds down to the last card |

### TC-TNR-ST-007 - [GEO-1118] Verdict tabs keep only the sources of that verdict, ranked on that verdict, with unchanged badges

- **Story/Task:** GEO-1118 (QA In Progress) | **ACs:** AC-8, AC-9, AC-10 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + state (tab switch)
- **Description:** Non-regression of GEO-1118 (QA In Progress): the "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION" tabs keep only the sources having articles of that verdict, ranked on that verdict alone, and the badges of a source do not change from one tab to another. Covers AC-8, AC-9, AC-10.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and notes a source with both badges | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | The source shows "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION" on the ALL tab |
| 2 | When the user selects the "IMPROVE VISIBILITY" tab |  | Only sources carrying the IMPROVE VISIBILITY badge are listed, ranked from 1 with no gap |
| 3 | Then the user checks the order of the tab |  | The sources are ordered by their "Not visible in N articles" count, highest first (never increasing from one rank to the next) |
| 4 | And the user checks the source noted in step 1 |  | It is listed with both badges, exactly as on the ALL tab |
| 5 | When the user selects the "IMPROVE PERCEPTION" tab |  | Only sources carrying the IMPROVE PERCEPTION badge are listed, ranked from 1 and ordered by their "Negative perception in N articles" count, highest first; no visibility-only source is listed |
| 6 | And the user checks the source noted in step 1 |  | It is listed with both badges, exactly as on the ALL tab |

### TC-TNR-ST-008 - [GEO-1119] Verifying state replaces the list during verification, then the list appears without reload

- **Story/Task:** GEO-1119 (QA In Progress) | **ACs:** AC-1, AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state transition | **Conditional**
- **Description:** Non-regression of GEO-1119 (QA In Progress): while article verification runs, the Action Center shows a plain verifying state instead of a partial list, and the list appears without a full page reload when verification completes. Covers AC-1, AC-2. The verifying state content follows GEO-1168 (title and spinner, no progress counter, no paragraph). Conditional - needs an analysis whose verification is running (new analysis or new scheduled execution); it cannot be produced on demand on the Toyota analysis. The title wording is not specified and is recorded at execution.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis of the organisation whose article verification is running - open its Action Center right after a new analysis finishes its collection or right after a scheduled execution starts verification (measured duration: a few seconds to about 4 minutes). Exports are not checked: a file exported during verification can show a list or the all-clear message by PM decision (not a defect). The in-run retry (GEO-1205, open) is back-end only and is not checked.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an analysis whose article verification is running | New analysis or scheduled execution in progress (record the analysis and the time) | The analysis dashboard is reachable |
| 2 | When the user opens its Action Center |  | The Target Sources area shows a verifying state with a title and a spinner (record the title) |
| 3 | Then the user checks that no partial list is shown |  | No source card, table row, tab count or "Show N more sources" button is displayed |
| 4 | And the user checks the content of the verifying state |  | No progress counter (e.g. "N / M") and no explanatory paragraph are shown under the title |
| 5 | When the user stays on the page without reloading until verification completes | Do not press F5 or reload | The verifying state is replaced by the ranked Target Sources list (or by the all-clear state) without a full page reload |

### TC-TNR-ST-009 - [GEO-1120] A country filter recomputes the list inside the scope and renumbers the ranks 1 to N

- **Story/Task:** GEO-1120 (QA In Progress) | **ACs:** AC-1, AC-5, AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + edge (scope narrowing)
- **Description:** Non-regression of GEO-1120 (QA In Progress): a country filter recomputes the counts, badges and order inside the selected scope (not a filter on the global list), sources with no failing article in the scope disappear, and the displayed ranks are renumbered 1...N with no gap. Covers AC-1, AC-5, AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. The analysis covers several countries (United States, France and Spain on 2026-10-06).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis with "All Countries" | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The list is displayed; the user notes the total (12 + N of "Show N more sources") and the reason lines of the #1 source |
| 2 | When the user keeps only one country in the countries filter | e.g. France (one of the countries of the analysis) | The countries filter shows the selected country and the list is recomputed |
| 3 | Then the user checks the ranks |  | The ranks start at 1 and run with no gap (1, 2, 3...) |
| 4 | And the user checks the source noted in step 1 | e.g. frandroid.com | If it is still listed, each of its "Not visible in N articles" / "Negative perception in N articles" counts is lower than or equal to its All Countries count and its badges match the lines it shows |
| 5 | And the user checks the size of the list |  | The total of target sources is lower than or equal to the All Countries total and no card shows a 0 count |
| 6 | When the user selects "All Countries" again |  | The total, the #1 source and its reason lines noted in step 1 are back |

### TC-TNR-ST-010 - [GEO-1120] Type filter lists only the types in scope and re-ranks inside the selection before the verdict tab

- **Story/Task:** GEO-1120 (QA In Progress) | **ACs:** AC-2, AC-3, AC-7 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1120 (QA In Progress): the source type filter lists only the types present in the current scope with their source count; selecting a type keeps only its sources, renumbers the ranks and recomputes the tab membership inside that selection (filters first, then the verdict tab). Covers AC-2, AC-3, AC-7. Default label "All types" per GEO-1168.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user opens the Type filter |  | It lists "All types" then only the source types present in the list, each with its count, e.g. "Journalism (N)"; no type shows a 0 count |
| 3 | And the user selects "Journalism" | Type: Journalism | Only cards with the "Journalism" chip are listed and their number equals the count shown for Journalism in the dropdown |
| 4 | Then the user checks the ranks |  | The ranks run 1, 2, 3... with no gap |
| 5 | When the user selects the "IMPROVE PERCEPTION" tab |  | Only Journalism sources carrying the IMPROVE PERCEPTION badge are listed, ranked from 1 with no gap |
| 6 | And the user selects the "ALL" tab and "All types" again |  | The full list and its total are displayed again |

### TC-TNR-ST-011 - [GEO-1120] With a period shorter than 7 days the Action Center still pools 7 days, AI Citation Sources does not

- **Story/Task:** GEO-1120 (QA In Progress) | **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge case (period boundary)
- **Description:** Non-regression of GEO-1120 (QA In Progress): the target list is pooled over at least 7 days ending on the most recent snapshot; a longer period is used in full; AI Citation Sources keeps the selected period, so the two views differ on a period under 7 days by design (not a defect). Covers AC-9. "Last analysis" (one snapshot) is the only preset shorter than 7 days.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. On 2026-10-06 the "Last 7 days" preset spanned 8 snapshots (30 Sep - 6 Oct): if the totals of step 3 differ, record the difference with the snapshot dates (see review).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis with "Last 7 days" | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The user notes the total of target sources T7, the #1 source and its reason lines |
| 2 | When the user selects the period "Last analysis" and clicks "Apply" | Date preset: Last analysis | The period filter shows "Last analysis" and the list is recomputed |
| 3 | Then the user compares the list with step 1 |  | The list is not reduced to one snapshot: its total equals T7 and the #1 source shows the same reason lines as in step 1 |
| 4 | When the user opens the Overview with "Last analysis" and clicks "All domains" in "AI Engines Citation Sources" |  | The modal subtitle "Showing N of M domains" gives M for the last analysis only (record M) |
| 5 | And the user selects "Last 7 days", clicks "Apply" and opens "All domains" again |  | M is higher than with "Last analysis": AI Citation Sources follows the selected period, so it differs from the Action Center on a period under 7 days (expected, not a bug) |
| 6 | When the user opens the Action Center with "Last 30 days" and clicks "Apply" | Date preset: Last 30 days | The total of target sources is higher than or equal to T7 (the 30-day period is used in full) |

### TC-TNR-ST-012 - [GEO-1121] All clear state shows the message alone, also on the exported slide

- **Story/Task:** GEO-1121 (Ready for QA) | **ACs:** AC-1, AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state (empty) | **Conditional**
- **Description:** Non-regression of GEO-1121 (Ready for QA): when no source survives verification, the Action Center shows the all-clear message alone, with no source list. Covers AC-1, AC-2. Copy superseded by GEO-1168 ("All clear" / "Every article used by AI engines describes your brand positively."). Step 6 also covers GEO-1124 AC-7 and GEO-1173 (all-clear slide last). Conditional - no genuine all-clear analysis exists on staging (scan of 54 reports on 2026-10-06); AstraZeneca / Cruz Roja show "Pages could not be checked", a different state covered by TC-TNR-AC-016.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis or a scope (AI Engines filter) where no source has a missing or negative article. Candidate: BYD 76aad462-a33f-4bdb-a925-2c1533e97a53 with the AI Engines filter on Gemini only showed "All clear" on 2026-10-01 and 2026-10-02 (its default scope lists sources). If no candidate shows the state, record "not available" and stop. AstraZeneca 458c20e9 and Cruz Roja Argentina a3eb5a05 ("Pages could not be checked") are not valid all-clear data. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of an analysis where no source has a missing or negative article | https://staging-geo.onclusive.com/geo/dashboard/76aad462-a33f-4bdb-a925-2c1533e97a53/actions - AI Engines = Gemini only (candidate) | The Action Center page is displayed |
| 2 | Then the user checks the Target Sources area |  | A check icon, the title "All clear" and the text "Every article used by AI engines describes your brand positively." are displayed |
| 3 | And the user checks that no list is shown under the message |  | No source card, table row, verdict tab count, filter result or "Show N more sources" button is displayed |
| 4 | And the user checks that it is not the unchecked-pages state |  | "Pages could not be checked" is not displayed |
| 5 | When the user exports the analysis as "Presentation .pptx" with the same scope | Same AI Engines filter as step 1 | A .pptx file is downloaded |
| 6 | Then the user opens the last slide of the deck |  | The last slide shows "ACTION CENTER · TARGET SOURCES", a check icon and "All clear" with its message alone, with no source list |

### TC-TNR-ST-013 - [GEO-1122] A scope addition takes effect at the next execution and the list then covers the new scope

- **Story/Task:** GEO-1122 (Ready for QA) | **ACs:** AC-1, AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state transition (scope change) | **Conditional**
- **Description:** Non-regression of GEO-1122 (Ready for QA): a Manage Scope change (here an added country) takes effect on the next scheduled execution, and after it the target list covers the full scope of that run under the same ranking rules. Covers AC-1, AC-5. AC-2 to AC-4 (same verification rules, re-check of pages, staleness window) are back-end only. Conditional - needs a scheduled execution after the change (daily analysis: next day); the scope is restored at the end.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A daily analysis whose scope may be changed temporarily (Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e was used on 2026-09-25 with Germany added, then restored). Manage Scope holds Countries, Categories, AI insights language, AI Engines and Prompts. Conditional: the check after the change needs the next scheduled execution to have completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the analysis and notes the list | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The user records the total of target sources, the #1 source and the countries offered by the countries filter |
| 2 | When the user adds a country in Manage Scope and saves | Manage Scope > Countries: add Germany (or any country not in scope) | The scope change is saved |
| 3 | Then the user reopens the Action Center before the next scheduled execution |  | The list is unchanged: same total and same #1 source as in step 1 |
| 4 | When the next scheduled execution has completed and the user reopens the Action Center | After the next daily run | The countries filter offers the added country and the Target Sources list is displayed (no verifying state) |
| 5 | And the user keeps only the added country in the countries filter |  | A Target Sources list ranked from 1 with the same card rules is displayed for that country (or the All clear state if no source has a missing or negative article) |
| 6 | And the user removes the added country in Manage Scope and saves |  | The original scope is saved |

### TC-TNR-ST-014 - [GEO-1123] Details panel opens beside the list and closes on a second click

- **Story/Task:** GEO-1123 (Ready for QA) | **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + state (open / close)
- **Description:** Non-regression of GEO-1123 (Ready for QA): selecting a card opens the details panel beside the list with the source header, the article evidence and the prompts section, and a second click closes it. Covers AC-1. AC-1 brief part, AC-3 to AC-6 (brief) and AC-13 (header counts) superseded by GEO-1168: no Key Takeaways block and no header meta line. Observed 2026-10-05: the panel is a modal dialog and the second click closes it through the backdrop.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user clicks the card ranked #1 |  | The details panel opens on the right, the list stays visible behind it and card #1 shows the selected state |
| 3 | Then the user checks the panel header |  | It shows the logo, "#1 · {domain}", the source type chip, the reason badge(s) and a close (×) button, with no line of failing, positive or cited counts |
| 4 | And the user checks the panel body |  | It shows the article tab(s) "Lack of visibility (N)" / "Negative perception (N)" with their articles, then "Prompts associated with this source", and the footer "Previous" / "Source 1 of N" / "Next source"; no "Key Takeaways" block and no summary sentence |
| 5 | When the user clicks card #1 again | Click on the card area outside the panel | The panel closes and the list is displayed with no selected card |
| 6 | And the user opens the panel of card #1 again and clicks the close (×) button |  | The panel closes |

### TC-TNR-ST-015 - [GEO-1123] The panel shows every failing article of the source whatever the active verdict tab

- **Story/Task:** GEO-1123 (Ready for QA) | **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1123 (Ready for QA): a panel opened from a verdict tab still shows every failing article of the source across both verdicts. Covers AC-2. The brief part of AC-2 is superseded by GEO-1168 (no brief).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and notes the two reason lines of a source with both badges | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | The card shows "Not visible in N articles" and "Negative perception in N articles" |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab |  | Only sources carrying the IMPROVE PERCEPTION badge are listed |
| 3 | And the user opens the details panel of the source noted in step 1 |  | The details panel of the source opens |
| 4 | Then the user checks the article tabs |  | Both "Lack of visibility (N)" and "Negative perception (N)" are shown and their counts equal the two reason lines noted in step 1 |
| 5 | When the user clicks "Lack of visibility (N)" |  | The articles where the brand is not named are listed under "None of these articles mentions Toyota anywhere on the page.", although the page tab is IMPROVE PERCEPTION |

### TC-TNR-ST-016 - [GEO-1123] Article rows show their citing engines and prompt rows show no outcome

- **Story/Task:** GEO-1123 (Ready for QA) | **ACs:** AC-9, AC-15 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1123 (Ready for QA): each failing article shows the AI engines that cited it, and each prompt row shows the question, its engines and its country with no outcome (brand absent, competitor chosen, unfavorable). Covers AC-9, AC-15. Prompt rows follow GEO-1178 (one row per prompt, market flag, icons of every engine).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user opens the details panel of the source ranked #1 |  | The details panel opens with its articles listed |
| 3 | Then the user checks the article rows |  | Each article row shows the icon(s) of the AI engine(s) that cite it, right-aligned (engine name in the tooltip) |
| 4 | When the user scrolls to "Prompts associated with this source" |  | The prompt rows are listed |
| 5 | Then the user checks each prompt row |  | Each row shows the prompt text in quotes, the engine icon(s) and the market flag |
| 6 | And the user looks for an outcome on the prompt rows |  | No outcome such as "Brand absent", "Competitor chosen", "Unfavorable" or a winner (e.g. "Tesla #1") is shown on any row |

### TC-TNR-ST-017 - [GEO-1124] PowerPoint Target Sources slide is built from the ALL tab with every category and type, whatever the screen shows

- **Story/Task:** GEO-1124 (QA In Progress) | **ACs:** AC-1, AC-3, AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1124 (QA In Progress): the exported Target Sources section is always built from the ALL tab, with every category and source type, whatever tab and filters the user has on screen, and the deck shows the top sources with the full total. Covers AC-1, AC-3, AC-5. Whether the top 3 cards still carry the brief sentence after GEO-1168 is not asserted (see review).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis with default filters | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The user notes the sources ranked 1 to 10 of the ALL tab and the total M of target sources |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab, a category and the type "Journalism" | Category: Voitures hybrides; Type: Journalism | The screen shows a reduced list |
| 3 | And the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 4 | Then the user opens the last slide of the deck |  | It shows "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself" where M equals the total noted in step 1 |
| 5 | And the user checks the top 3 cards of the slide |  | They are the sources ranked 1, 2 and 3 on the ALL tab with default filters (step 1), not the filtered screen list |
| 6 | And the user checks the table of the slide |  | Ranks 4 to 10 follow the ALL-tab order of step 1, under the columns "#", "Source", "Type", "Articles", including types other than Journalism and visibility-only sources |

### TC-TNR-ST-018 - [GEO-1124] Excel Target Sources sheet follows the export scope and carries the evidence tables

- **Story/Task:** GEO-1124 (QA In Progress) | **ACs:** AC-2, AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1124 (QA In Progress): the Excel workbook carries a Target Sources sheet computed inside the export scope (countries, engines, period) with one title line, the ranked sources table and the evidence tables of the panel. Covers AC-2, AC-4. Only this sheet is read: the Overview gauges and the Raw Data sheet are touched by open bugs GEO-1210 / GEO-1211. The exact column set after GEO-1168 (positive articles, citations) is not asserted (see review).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). Open bugs that must not fail this TC: GEO-1210 / GEO-1211 (Excel gauges and Raw Data residuals, other sheets).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and keeps only one country | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - Country: United States | The list is recomputed; the user notes the #1 source and its reason lines |
| 2 | When the user exports the analysis as "Spreadsheet .xls" |  | An .xlsx file is downloaded |
| 3 | Then the user opens the Target Sources sheet and reads its first line | Sheet named Target Sources in the export language ("Sources à cibler" in French) | One title line "Toyota - {sheet} ({markets} · {engines} · snapshot {dates})" names the selected country and the engines of the page |
| 4 | And the user reads the first table of the sheet |  | It is the ranked sources table, starting with Rank, Domain, Source type, Badges; rank 1 is the #1 source noted in step 1 |
| 5 | And the user checks the counts of rank 1 |  | Its Brand absent and Depicted negatively values equal its "Not visible in N articles" and "Negative perception in N articles" lines, and its Brief cell is filled |
| 6 | And the user reads the tables below |  | A failing articles table (Domain, Source rank, Article title, URL, Verdict, Passage, Citing engines) and a failing prompts table (Domain, Source rank, Question, Engine, Country) follow; the Passage cell is empty for brand-absent articles |

### TC-TNR-ST-019 - [GEO-1125] AI Engines Citation Sources table, All domains modal and details panel show no Favorability

- **Story/Task:** GEO-1125 (Ready for QA) | **ACs:** AC-1, AC-2, AC-3 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1125 (Ready for QA): the AI Citation Sources section and the "All domains" modal carry Domain, Type and Frequency only, Favorability is not a sort key, and no favorability badge is shown in the section, the modal or the source details panel. Covers AC-1, AC-2, AC-3. Labels follow staging after GEO-625 ("Sources - All domains") and the LLM Engines to AI Engines rename.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, Overview page. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The section "AI Engines Citation Sources" is displayed with the "All source types" filter, the stacked bar and the domain table |
| 2 | Then the user checks the table headers |  | Exactly three headers "Domain", "Type" and "Frequency" are shown, each with a sort icon; no "Favorability" header |
| 3 | And the user checks the domain rows |  | Each row shows the favicon, the domain, the type chip and the frequency; no "Favorable", "Mixed" or "Unfavorable" badge |
| 4 | When the user clicks "All domains" |  | The modal "Sources - All domains" opens with "Showing N of M domains" and only the headers "Domain", "Type" and "Frequency" |
| 5 | And the user clicks each header of the modal |  | Only Domain, Type and Frequency re-order the rows; no Favorability sort is offered |
| 6 | When the user closes the modal and clicks the first domain of the table | e.g. toyota.fr | The panel "AI Engines Citation Source Details" opens with no favorability badge or label |

### TC-TNR-ST-020 - [GEO-1125] PowerPoint and Excel citation sources tables carry Domain, Type and Frequency only

- **Story/Task:** GEO-1125 (Ready for QA) | **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (2 formats)
- **Description:** Non-regression of GEO-1125 (Ready for QA): the AI Citation Sources domain table of the PowerPoint deck and of the Excel workbook carries Domain, Type and Frequency only. Covers AC-4. The Raw Data sheet keeps its Favorability column by design (AC-7) and is not checked (open bug GEO-1211).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, Overview page. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The section "AI Engines Citation Sources" is displayed |
| 2 | When the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 3 | Then the user opens the AI citation sources slide | Slide "Which sources shape your AI presence", eyebrow "SOURCES · OVERVIEW" | Its domain table shows exactly the headers "Domain", "Type" and "Frequency"; no text "Favorability", "Favorable", "Mixed" or "Unfavorable" on the slide |
| 4 | When the user exports the analysis as "Spreadsheet .xls" |  | An .xlsx file is downloaded |
| 5 | Then the user opens the AI citation sources domain table of the workbook | Overview sheet (first sheet) | Its header row holds exactly "Domain", "Type" and "Frequency"; no Favorability column in that table |

### TC-TNR-ST-021 - [GEO-1125] Lite (PQL) result table has no Favorability column and stays aligned with its ghost rows

- **Story/Task:** GEO-1125 (Ready for QA) | **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy path | **Conditional**
- **Description:** Non-regression of GEO-1125 (Ready for QA): the Lite (PQL) result table carries no Favorability column, and the gated ghost rows beneath it keep the same columns, aligned. Covers AC-5. Conditional - needs the PQL account and one Lite analysis run (each run consumes a Lite analysis).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, dedicated PQL account assiya.benramdane+geo@onclusive.com (Lite plan) in its own fresh browser context, interface language left as saved. The account lands on /geo/upsell. Conditional: one Lite analysis is launched for the test.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is logged in with the PQL account in a fresh browser context | assiya.benramdane+geo@onclusive.com | The Lite page /geo/upsell is displayed |
| 2 | When the user launches one Lite analysis | e.g. Toyota, toyota.com, product "hybrid cars", United States | The Lite result page shows the result table and the gated ghost rows beneath it |
| 3 | Then the user checks the headers of the result table |  | No header reads "Favorability" and no cell shows a blurred grey favorability pill |
| 4 | And the user checks the ghost rows |  | No ghost row shows a blurred favorability pill, and the ghost row columns are aligned with the header columns (no shifted or overflowing column) |

### TC-TNR-ST-022 - [GEO-1126] Citation source details panel shows Related Prompts then Sources, one row per prompt

- **Story/Task:** GEO-1126 (Ready for QA) | **ACs:** AC-1, AC-2, AC-3, AC-6 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1126 (Ready for QA): the details panel of a cited domain shows the related prompts first and the cited URLs second, without the per-engine citation count block; a prompt produced by several engines appears once with every engine icon. Covers AC-1, AC-2, AC-3, AC-6. The "Cited URLs" heading of AC-3 is "Sources" / "All sources (n)" on staging since GEO-625 (observed 2026-10-05).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, Overview page. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The section "AI Engines Citation Sources" is displayed with its domain table |
| 2 | When the user clicks the first domain of the table | e.g. toyota.fr | The panel "AI Engines Citation Source Details" opens |
| 3 | Then the user checks the order of the sections |  | "Related Prompts" comes first and "Sources" second; no per-engine citation count block is shown |
| 4 | And the user checks the Related Prompts preview |  | The first prompts are listed with their text and the icons of the AI engines, followed by "All related Prompts" with the total count |
| 5 | And the user checks the prompts of the preview |  | Each prompt text appears on one row only, with all its engine icons on that row |
| 6 | And the user checks the Sources section |  | The first cited URLs are listed with their title, their address and the engine icons, followed by "All sources" with the total count |

### TC-TNR-ST-023 - [GEO-1126] All related Prompts modal has four question-type tabs, counts agree and search stays inside the tab

- **Story/Task:** GEO-1126 (Ready for QA) | **ACs:** AC-4, AC-5, AC-8, AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + edge (search in tab)
- **Description:** Non-regression of GEO-1126 (Ready for QA): the "All related Prompts" control opens a modal with the prompt count, a search field and four tabs (All, Visibility, Competitive, Perception) with their counts; the panel, modal and tab counts agree, and a search applies inside the selected tab. Covers AC-4, AC-5, AC-8, AC-9.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, Overview page. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the first domain of "AI Engines Citation Sources" is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - e.g. toyota.fr | The panel shows "All related Prompts" with its count n (record n) |
| 2 | When the user clicks "All related Prompts" |  | A modal "All related Prompts - {domain}" opens with the prompt count, a search field and the full list |
| 3 | Then the user checks the tabs of the modal |  | Four tabs "All", "Visibility", "Competitive" and "Perception" are shown, each with its count, and "All" is selected |
| 4 | And the user compares the counts |  | The modal count equals n and equals Visibility + Competitive + Perception |
| 5 | When the user selects "Visibility" and types a word of its first prompt in the search field | A word of the first Visibility prompt | Only Visibility prompts containing the word are listed |
| 6 | And the user selects "Perception" with the same search term |  | Only Perception prompts containing the term are listed (or the tab says there is none), and the other tabs stay reachable |

### TC-TNR-ST-024 - [GEO-1144] French interface - no English brief sentence in the Action Center or on the PowerPoint Target Sources slide

- **Story/Task:** GEO-1144 (Ready for QA) | **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (fr-FR)
- **Description:** Non-regression of GEO-1144 (Ready for QA): the deterministic Target Source sentence follows the interface language and never stays in English ("This source has ..."). Covers AC-1 (derived from the ticket, no numbered AC). Since GEO-1168 the brief block (Key Takeaways) is no longer shown in the panel, so the check is the panel and the PowerPoint slide; the Excel summary column is covered by TC-TNR-AC-005 (GEO-1162) and not repeated.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and must restore British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user switches the interface language to French and clicks "Save changes" | Settings > Preferences > Interface Language = French | The interface is displayed in French |
| 2 | When the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The title "Sources à cibler" is shown and the cards read "Non visible dans N articles" / "Perception négative dans N articles" |
| 3 | And the user opens the details panel of the source ranked #1 |  | The tabs read "Manque de visibilité (N)" / "Perception négative (N)" with "Aucun de ces articles ne mentionne Toyota sur la page."; no English sentence such as "This source has ..." is shown |
| 4 | When the user exports the analysis as "Presentation .pptx" |  | A French .pptx file is downloaded |
| 5 | Then the user reads the last slide of the deck |  | The header reads "ACTIONS · SOURCES À CIBLER" and every sentence is in French; no text contains "This source has", "unfavorable" or "where the brand" |
| 6 | And the user switches the interface language back to British English and clicks "Save changes" | Settings > Preferences > Interface Language = British English | The interface is displayed in British English and the left menu shows "Action Center" |

### TC-TNR-ST-025 - [GEO-1144] Spanish interface - no English brief sentence in the Action Center or on the PDF Target Sources page

- **Story/Task:** GEO-1144 (Ready for QA) | **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (es-ES)
- **Description:** Non-regression of GEO-1144 (Ready for QA): the deterministic Target Source sentence follows the interface language in Spanish and never stays in English. Covers AC-1 (derived from the ticket, no numbered AC). The Excel summary column is covered by TC-TNR-AC-005 (GEO-1162) and not repeated.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and must restore British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user switches the interface language to Spanish and clicks "Save changes" | Settings > Preferences > Interface Language = Spanish | The interface is displayed in Spanish |
| 2 | When the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The title "Fuentes a priorizar" is shown and the cards read "No visible en N artículos" / "Percepción negativa en N artículos" |
| 3 | And the user opens the details panel of the source ranked #1 |  | The tabs read "Falta de visibilidad (N)" / "Percepción negativa (N)" with "Ninguno de estos artículos menciona a Toyota en la página."; no English sentence is shown |
| 4 | When the user exports the analysis as "PDF" |  | A Spanish PDF file is downloaded |
| 5 | Then the user reads the last page of the PDF | Page rendered and read visually | The header reads "ACCIONES · FUENTES A PRIORIZAR" and every sentence is in Spanish; no text contains "This source has", "unfavorable" or "where the brand" |
| 6 | And the user switches the interface language back to British English and clicks "Save changes" | Settings > Preferences > Interface Language = British English | The interface is displayed in British English and the left menu shows "Action Center" |

### TC-TNR-ST-026 - [GEO-1166] Next source and Previous swap the panel in place, Previous is disabled on the first source

- **Story/Task:** GEO-1166 (Ready for QA) | **ACs:** AC-2, AC-4 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + boundary (first source)
- **Description:** Non-regression of GEO-1166 (Ready for QA): "Next source" and "Previous" swap the panel content in place and move the selected state of the card behind the panel; "Previous" is disabled (aria-disabled) on the first source, with no wrap-around. Covers AC-2, AC-4. The article tab resets to the first tab after navigation (rule confirmed 2026-10-04).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user opens the details panel of the card ranked #1 |  | The header shows "#1 · {domain}", the footer shows "Previous" / "Source 1 of N" / "Next source" (N = total target sources) and card #1 is selected |
| 3 | Then the user checks the "Previous" button |  | "Previous" is greyed out with aria-disabled="true"; clicking it does nothing (the panel still shows source 1, no jump to the last source) |
| 4 | When the user clicks "Next source" |  | The panel stays open and shows "#2 · {domain of card 2}", "Source 2 of N", the article tabs (first tab selected) and the prompts of source 2 |
| 5 | And the user checks the cards behind the panel |  | Card #2 shows the selected state and card #1 no longer does |
| 6 | When the user clicks "Previous" |  | The panel shows "#1 · {domain of card 1}" and "Source 1 of N" again and card #1 is selected again |

### TC-TNR-ST-027 - [GEO-1166] Counter follows the filtered list, Next source is disabled on the last source, footer stays sticky in list view

- **Story/Task:** GEO-1166 (Ready for QA) | **ACs:** AC-1, AC-3, AC-4, AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge case (filtered scope, last source)
- **Description:** Non-regression of GEO-1166 (Ready for QA): the footer counter and the header rank show the position in the filtered list (verdict tab and type filter applied), "Next source" is disabled on the last source with no wrap-around, the footer stays visible at every scroll position, and navigation works from the list view. Covers AC-1, AC-3, AC-4, AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis, selects "IMPROVE PERCEPTION" and the type "Journalism" | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - Type: Journalism | The filtered list is displayed; the user notes its number of sources Y |
| 2 | When the user switches to the list view and opens the details panel of row 2 |  | The header shows "#2 · {domain}" (position in the filtered list), the footer reads "Source 2 of Y" and row 2 is selected |
| 3 | And the user scrolls the panel content to the bottom and back to the top |  | "Previous", "Source 2 of Y" and "Next source" stay visible at the bottom of the panel at every scroll position |
| 4 | When the user clicks "Next source" until the last source of the filtered list |  | The footer reads "Source Y of Y" and the selected row follows each step |
| 5 | Then the user checks the "Next source" button |  | "Next source" is greyed out with aria-disabled="true"; clicking it does nothing (no jump to the first source) |
| 6 | And the user clicks "Previous" |  | The panel shows source Y-1, the footer reads "Source Y-1 of Y" and the matching row is selected |

### TC-TNR-ST-028 - [GEO-1168] Card lines, table chips and panel tabs show the same split counts, with no Cited count

- **Story/Task:** GEO-1168 (Ready for QA) | **ACs:** AC-7, AC-8, AC-9, AC-11, AC-15, AC-19 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1168 (Ready for QA): the article count is split per reason everywhere - card lines, two chips in the table, panel tabs - with the same values, and no "Cited" count or Action column remains. Covers AC-7, AC-8, AC-9, AC-11, AC-15, AC-19.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and picks a two-badge source and a single-badge source | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com (both badges) and the first visibility-only source | The user notes the reason lines of both cards |
| 2 | Then the user checks the two cards |  | The two-badge card shows both badges and the two lines "Not visible in N articles" / "Negative perception in N articles"; the single-badge card shows one badge and one line; no card shows "Cited" |
| 3 | When the user switches to the list view |  | The headers are exactly "#", "Source", "Type", "Articles"; 10 rows are shown, then "Show N more sources" with N = total - 10; no Cited or Action column |
| 4 | Then the user checks the Articles chips of the two sources |  | The two-badge row shows a blue eye-off chip and a purple thumb-down chip equal to its two card lines; the single-badge row shows only its own chip |
| 5 | When the user opens the details panel of the two-badge row |  | The tabs "Lack of visibility (N)" / "Negative perception (N)" equal the chips, and no "Cited" text or count is shown in the panel |

### TC-TNR-ST-029 - [GEO-1168] Category filter lists the categories in left menu order and combines with the type filter and the verdict tab

- **Story/Task:** GEO-1168 (Ready for QA) | **ACs:** AC-12, AC-13, AC-14 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1168 (Ready for QA): the Category filter lists the categories of the analysis in the left menu order with "All categories" by default; selecting a category keeps only the sources with a missing or negative article in that category and recalculates their counts; Category, Type and the page tabs combine. Covers AC-12, AC-13, AC-14. The filtered empty state of AC-14 is not asserted (cannot be produced: the Type filter resets to "All types" when it no longer matches, observed 2026-10-01).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and notes the categories of the left menu | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - Voitures hybrides > VUS > Voitures électriques on 2026-10-06 | The user notes the total, the category order and the reason lines of frandroid.com (or of the #1 source) |
| 2 | When the user opens the Category filter |  | It lists "All categories" (selected) then the categories of the analysis in the left menu order; one choice at a time |
| 3 | And the user selects the first category | Category: Voitures hybrides | The list is recomputed: the total is lower than or equal to step 1, ranks start at 1, and the counts of the noted source are lower than or equal to its step 1 counts |
| 4 | And the user selects the type "Journalism" | Type: Journalism | Only Journalism sources impacting that category are listed |
| 5 | And the user selects the "IMPROVE PERCEPTION" tab |  | Only Journalism sources impacting that category and carrying the IMPROVE PERCEPTION badge are listed, ranked from 1 |
| 6 | When the user selects "All categories", "All types" and the "ALL" tab |  | The total and the reason lines noted in step 1 are back |

### TC-TNR-ST-030 - [GEO-1168] PowerPoint and PDF Target Sources slide use the split article copy and chips, with no Cited column

- **Story/Task:** GEO-1168 (Ready for QA) | **ACs:** AC-20 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (2 formats)
- **Description:** Non-regression of GEO-1168 (Ready for QA): the top source cards and the table of the exported Target Sources slide use the same split copy and chips as the app, with no Cited column. Covers AC-20.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and notes the reason lines of the cards ranked 1 to 3 | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The reason lines of the three cards are noted |
| 2 | When the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 3 | Then the user reads the top 3 cards of the last slide |  | Each card shows the same reason lines as the app, joined with " · " (e.g. "Not visible in 39 articles · Negative perception in 5 articles"), singular "1 article" when a count is 1 |
| 4 | And the user reads the table of the slide |  | The columns are "#", "Source", "Type", "Articles"; each Articles cell shows the eye-off and thumb-down chips with the app counts; no "Cited" column or text |
| 5 | When the user exports the analysis as "PDF" |  | A PDF file is downloaded |
| 6 | Then the user reads the last page of the PDF | Page rendered and read visually | The top cards and the table show the same split copy and chips as the deck, with no Cited column |

### TC-TNR-ST-031 - [GEO-1169] Prompts associated with this source lists every prompt that cites the source

- **Story/Task:** GEO-1169 (Ready for QA) | **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (relation between views)
- **Description:** Non-regression of GEO-1169 (Ready for QA): "Prompts associated with this source" lists every prompt whose answer cites the source in the scope, not only the failing ones, one row per prompt. Covers AC-6. Checked as a relation with the "All related Prompts" count of the same domain in AI Citation Sources (same period and engines). AC-1 to AC-4, AC-7 and AC-8 (selection of the top 100 domains, configuration, marker, log) are back-end only; AC-5 is covered by TC-TNR-ST-004 and TC-TNR-ST-012.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Known data issue (GEO-1167 follow-up, observed 2026-10-06): some prompts appear twice with a different letter case ("Kia" / "KIA"); such pairs are recorded, not failed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and the details panel of a source also listed in "AI Engines Citation Sources" | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | The panel shows "Prompts associated with this source" with "All" selected |
| 2 | When the user clicks "Show X more prompts" |  | The full prompts list is displayed; the user records its number of rows P |
| 3 | And the user opens the Overview with the same period and engines and opens the details panel of the same domain | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - via "All domains" if the domain is not in the first 10 rows | The panel "AI Engines Citation Source Details" shows "All related Prompts" with its count R |
| 4 | Then the user compares P and R |  | P equals R: the Action Center lists every prompt citing the domain, failing or not (a difference made only of case-duplicate prompts is recorded) |

### TC-TNR-ST-032 - [GEO-1173] Action Center is the last slide of the PowerPoint and the last page of the PDF

- **Story/Task:** GEO-1173 (Ready for QA) | **ACs:** AC-1, AC-2, AC-3 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (2 formats)
- **Description:** Non-regression of GEO-1173 (Ready for QA): the Action Center (Target Sources) section closes the PowerPoint and PDF exports, following the order of the tabs in GEO, and appears only once. Covers AC-1, AC-2, AC-3. The category order inside the deck is the GEO-1189 fix, covered by TC-TNR-AC-011 / TC-TNR-AC-012 and only checked here as part of the overall order.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, Overview page. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). The deck had 41 slides on 2026-10-06.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Toyota analysis and notes the left navigation | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The navigation shows the Overview, the categories (Voitures hybrides > VUS > Voitures électriques on 2026-10-06) and "Action Center" as the last entry |
| 2 | When the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 3 | Then the user checks the order of the slides |  | The deck runs cover, overview sections (IDENTITY, PERFORMANCE, SOURCES), category sections in the left navigation order, then the Action Center slide |
| 4 | And the user checks the last slide |  | It shows "ACTION CENTER · TARGET SOURCES" and "Where PR effort pays first", and no other slide of the deck carries this header |
| 5 | When the user exports the analysis as "PDF" |  | A PDF file is downloaded |
| 6 | Then the user checks the pages of the PDF | Pages rendered and read visually | The pages follow the same order as the deck and the last page is the only "ACTION CENTER · TARGET SOURCES" page |

### TC-TNR-ST-033 - [GEO-1178] Article tabs show their explanation line and counts matching the card

- **Story/Task:** GEO-1178 (Ready for QA) | **ACs:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-10 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + state (one / two reasons)
- **Description:** Non-regression of GEO-1178 (Ready for QA): the details panel shows "Lack of visibility (N)" and/or "Negative perception (N)" (only the tab of the reason when there is one, "Lack of visibility" first and selected when there are two), each with one explanation line using the analysis brand; the tab counts equal the article rows and the card lines; switching the article tab does not change the prompts section. Covers AC-1 to AC-5, AC-10. Supersedes GEO-1168 panel tabs and GEO-1123 AC-10 to AC-12.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and the details panel of a two-badge source | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | Two tabs are shown with their icons, "Lack of visibility (N)" on the left and selected, with "None of these articles mentions Toyota anywhere on the page." |
| 2 | When the user clicks "Show N more articles" if displayed and counts the rows |  | The number of rows equals the tab count and the "Not visible in N articles" line of the card |
| 3 | And the user clicks "Negative perception (N)" |  | "Each of these articles mentions Toyota negatively." is shown; the number of rows equals the tab count and the "Negative perception in N articles" line of the card |
| 4 | Then the user compares the prompts section on both tabs |  | "Prompts associated with this source" shows the same engine tabs, rows and "Show X more prompts" on both article tabs |
| 5 | When the user clicks "Next source" until a single-badge source is shown |  | Only the tab of its reason is shown, with its explanation line, and the engine filter is rebuilt for that source |

### TC-TNR-ST-034 - [GEO-1178] Prompts list shows one row per prompt, engine tabs follow the AI Engines filter, 6 rows then Show X more prompts

- **Story/Task:** GEO-1178 (Ready for QA) | **ACs:** AC-6, AC-7, AC-8, AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + edge (engine scope)
- **Description:** Non-regression of GEO-1178 (Ready for QA): "Prompts associated with this source" shows one row per prompt with its market flag and one icon per citing engine, an engine filter ("All" then one tab per engine of the page scope), 6 rows then "Show X more prompts" recalculated per engine tab. Covers AC-6, AC-7, AC-8, AC-9. Engine tab layout per GEO-1187 (accepted): with 3 engines icon + count only (name in the tooltip), with 1 or 2 engines icon + name + count.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center /geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (rolling window; a date preset applies only after clicking "Apply"; on 2026-10-06 about 117 to 129 target sources), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources change with the window and must be read at execution time: the expected results check relations, not fixed values. Known data issue (GEO-1167 follow-up, observed 2026-10-06): some prompts appear twice with a different letter case ("Kia" / "KIA"); only exact duplicates fail this TC.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and the details panel of the source ranked #1 | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The details panel opens |
| 2 | When the user scrolls to "Prompts associated with this source" |  | "All" is selected, followed by one tab per engine with its icon and count (name in the tooltip); 6 rows are shown, then "Show X more prompts" |
| 3 | Then the user checks the rows |  | Each row shows the prompt text, the market flag and one icon per citing engine; no prompt text appears on two rows |
| 4 | When the user clicks an engine tab | e.g. ChatGPT | Only rows with that engine icon are listed: 6 rows then "Show X more prompts" with X = tab count - 6 (no button when the tab count is 6 or less) |
| 5 | And the user turns one engine off in the AI Engines filter of the page and reopens the panel of the #1 source | e.g. Gemini off ("AI Engines 2") | The engine filter shows no tab for the removed engine (2 engines: icon, name and count) and no row shows its icon |
| 6 | And the user turns the engine back on in the AI Engines filter |  | The default AI Engines selection is restored |

### TC-TNR-ST-035 - [GEO-1183] Tesla - the Car and Driver EV of the Year passage names Tesla or Cybertruck with a highlight

- **Story/Task:** GEO-1183 (Code Review) | **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1183 (Code Review): on the caranddriver.com article "Presenting Car and Driver's 2024 EV of the Year", the negative passage contains "Tesla" or "Cybertruck" and the name is highlighted in the panel. Covers AC-1. The "…" join and the 140-character cut are not asserted (open bug GEO-1201).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "Onclusive" (not QA-GEO). Tesla analysis 4419839a-317f-4f9d-8a8c-32184906a2aa, AI Engines and countries at their defaults (United States - English, 3 engines on 2026-10-06). The article was listed on the period "5 Oct 2026"; if it is not listed with "Last 7 days", select the day 5 Oct 2026 and click "Apply". Open bugs that must not fail this TC: GEO-1201 (passage cut mid-word without "…"), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand), GEO-1204 (some negative pages still not negative).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Tesla analysis | https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions - period "Last 7 days" (or "5 Oct 2026") | The Target Sources cards are displayed on the ALL tab |
| 2 | When the user opens the details panel of caranddriver.com | caranddriver.com (#5 on "5 Oct 2026") | The panel opens with the header "#N · caranddriver.com", the tab "Negative perception (N)" and "Each of these articles mentions Tesla negatively." |
| 3 | And the user locates the article "Presenting Car and Driver's 2024 EV of the Year" | caranddriver.com/news/a61836993/hyundai-ioniq-5-n-ev-of-the-year-2024/ | The row shows its title, its URL and a quoted passage in italics |
| 4 | Then the user reads the passage |  | The passage contains "Tesla" or "Cybertruck" and is not only "know that the one we rented broke on the second day, effectively parking itself with just a few hundred miles on its odometer." |
| 5 | And the user checks the highlight |  | "Tesla" (or "Cybertruck") is shown in bold on a highlight chip inside the passage |

### TC-TNR-ST-036 - [GEO-1183] Nike and Lidl Nederland - every negative passage contains the brand or a product name

- **Story/Task:** GEO-1183 (Code Review) | **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (2 analyses)
- **Description:** Non-regression of GEO-1183 (Code Review): no negative passage of the Target Sources panel is missing the brand or product name, on the Nike and Lidl Nederland analyses where this was observed working on 2026-10-06. Covers AC-2 (Nike and Lidl Nederland part; the Tesla part is not included: 1 passage with the brand only inside a link on 2026-10-06). The "…" join and the 140-character cut are not asserted (open bug GEO-1201).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "Onclusive" (not QA-GEO). Nike analysis 51f6eb92-0d7a-4c77-8fa8-e46d5d610309 (29 sources with negative articles, 41 passages on 2026-10-06) and Lidl Nederland analysis 1444d4ef-9555-4c35-bfd6-52af5128e180 (25 sources, 29 passages on 2026-10-06), default periods and filters. The panel line "Each of these articles mentions Lidl Nederland negatively." is accepted (analysis brand name). Open bugs that must not fail this TC: GEO-1201 (passage cut mid-word without "…"), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand), GEO-1204 (some negative pages still not negative).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Nike analysis and selects "IMPROVE PERCEPTION" | https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions | Only sources carrying the IMPROVE PERCEPTION badge are listed |
| 2 | When the user opens the details panel of the first source |  | The panel opens on "Negative perception (N)" with "Each of these articles mentions Nike negatively." |
| 3 | Then the user reads every passage, then clicks "Next source" up to the last source | Footer "Source k of M" | Every quoted passage contains "Nike" or a Nike product name as written on the page |
| 4 | When the user opens the Action Center of the Lidl Nederland analysis and selects "IMPROVE PERCEPTION" | https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions | Only sources carrying the IMPROVE PERCEPTION badge are listed |
| 5 | And the user opens the details panel of the first source |  | The panel opens on "Negative perception (N)" with "Each of these articles mentions Lidl Nederland negatively." |
| 6 | Then the user reads every passage, then clicks "Next source" up to the last source | Footer "Source k of M" | Every quoted passage contains "Lidl" or a Lidl product name as written on the page |

## Excluded ACs (not in this TNR)

| Story/Task | AC(s) | Reason |
|---|---|---|
| GEO-1116 | AC-1, AC-2 | Selection legs; superseded by GEO-1169 (pool = top 100 domains by Frequency) and back-end only |
| GEO-1116 | AC-5, AC-6 | AC-5 superseded by GEO-1169 (the pool now comes from the citation Frequency) and back-end; AC-6 provenance (GROUNDED) is back-end only |
| GEO-1117 | AC-1, AC-3, AC-4, AC-6 | Back-end: no cap, product discovery, persisted verdicts never re-judged, false positives persisted |
| GEO-1117 | AC-8, AC-11 | Unfetchable / check not completed: back-end; the UI state "Pages could not be checked" is covered by TC-TNR-AC-016 (GEO-1194) |
| GEO-1117 | AC-10 | Definition of negative: judgement of the engine, not checkable as a feature regression (open bug GEO-1204) |
| GEO-1118 | AC-11 | Empty verdict tab: no staging data with an empty tab (skipped on 2026-09-25) |
| GEO-1118 | AC-1 tie-break, AC-5 origin of badges | Tie-break no longer visible on screen (cited count removed by GEO-1168); badge origin is back-end |
| GEO-1118 | DAC6 | Long type name crop: no "Aggregator/Encyclopedic" source in scope (skipped on 2026-09-25) |
| GEO-1120 | AC-4, AC-8 | AC-4 needs data with articles outside the window (skipped 2026-09-25); AC-8 (type filter vs export) is covered by ST-017 (GEO-1124 AC-3) |
| GEO-1121 | — | None (ST-012 is Conditional) |
| GEO-1122 | AC-2, AC-3, AC-4 | Back-end: same verification rules, page re-check by the provider, staleness window |
| GEO-1123 | AC-3 to AC-6, AC-10 to AC-14 | Superseded by GEO-1168 / GEO-1178 (brief and Key Takeaways removed, positive articles and header counts removed) |
| GEO-1123 | AC-7, AC-8 | Covered by ST-003 (GEO-1117) and ST-033 (GEO-1178) |
| GEO-1124 | AC-6 | Deleted by the PM (2026-09-17) |
| GEO-1124 | AC-7, AC-8 | AC-7 covered by ST-012 step 6 (Conditional); AC-8 (7-day floor in the export) not selected for the TNR (the on-screen floor is ST-011) |
| GEO-1125 | AC-6 | Back-end removal (API / DTO check, not a UI regression) |
| GEO-1125 | AC-7 | Untouched surfaces: Raw Data sheet touched by open bug GEO-1211; Questions Analysis favourability filter blocked on 2026-10-05 (empty prompt data) |
| GEO-1126 | AC-7, AC-10, AC-11 | Not selected for the TNR budget (Perception rows, empty tab, scope under 7 days); AC-10 had no empty-state message on 2026-09-25 |
| GEO-1166 | Implementation notes (keyboard ArrowLeft/ArrowRight, analytics event action_center.source_nav) | Not acceptance criteria; analytics is back-end |
| GEO-1168 | AC-1 to AC-6 | Panel tabs moved to GEO-1178 (ST-033, ST-034) |
| GEO-1168 | AC-10, AC-16, AC-17, AC-18 | Covered by ST-005 (12 cards), ST-014 (no Key Takeaways / meta line), ST-008 (verifying state), ST-012 (all-clear copy) |
| GEO-1168 | AC-14 filtered empty state | Cannot be produced: the Type filter resets to "All types" when no source matches (2026-10-01) |
| GEO-1168 | AC-21 to AC-24 | Translations: FR/ES card lines and tabs covered by ST-024 / ST-025; locale-file key removal (AC-23) is a code check; FR/ES subtitle and all-clear body differ from the ticket table (FAIL on 2026-10-01) and are not asserted |
| GEO-1169 | AC-1 to AC-4, AC-7, AC-8 | Back-end: top-X selection, Frequency ranking, configuration of X, idempotence marker, selection log |
| GEO-1169 | AC-5 | Covered by ST-004 (no zero source) and ST-012 (all clear) |
| GEO-1178 | AC-11, AC-12, AC-13 | FR/ES strings covered by ST-024 / ST-025; page name and export header are covered by TC-TNR-AC-010 (GEO-1188) and ST-032; en-GB "Action Centre" superseded by GEO-1188 |
| GEO-1183 | AC-2 (Tesla part), AC-3, AC-4 | Tesla: 1 passage with the brand only inside a link (FAIL 2026-10-06); AC-3 "…" join / 140-char cut: open bug GEO-1201; AC-4 verdicts unchanged after re-judge: BLOCKED (needs a re-judge) |
| GEO-1184 | all | Backlog, not implemented (sort "Most prompts") |

## Superseded ACs (current behaviour asserted)

| Original AC | Superseded by | Current behaviour asserted | TC(s) |
|---|---|---|---|
| GEO-1118 AC-1, AC-4, AC-7 (failing article count, "Cited N× in gap answers") | GEO-1168 | Card lines "Not visible in N articles" / "Negative perception in N articles", total = missing + negative, no Cited line | ST-006, ST-028 |
| GEO-1118 AC-2 ("All source types") | GEO-1168 | Type filter "All types" + Category filter "All categories" | ST-005, ST-010, ST-029 |
| GEO-1118 AC-13 (top ten) | GEO-1168 | 12 cards then "Show X more sources" (X = total - 12); table 10 rows | ST-005, ST-028 |
| GEO-1116 AC-1, AC-2, AC-5 (failing-prompt pool) | GEO-1169 | Pool = top 100 domains by citation Frequency; prompts list = every prompt citing the source | ST-002, ST-031 |
| GEO-1117 AC-5 (panel shows positive articles) | GEO-1168 | No positive article anywhere in the panel | ST-004 |
| GEO-1119 AC-1 (verifying state content) | GEO-1168 | Title + spinner, no progress counter, no paragraph | ST-008 |
| GEO-1121 DAC1 copy | GEO-1168 | "All clear" / "Every article used by AI engines describes your brand positively." | ST-012 |
| GEO-1123 AC-3 to AC-6 (brief), AC-10 to AC-14 (Failing/Positive tabs, header counts) | GEO-1168 / GEO-1178 | Tabs "Lack of visibility (N)" / "Negative perception (N)" with one explanation line; no brief, no header meta line | ST-014, ST-015, ST-033 |
| GEO-1123 AC-15 (engine, country) | GEO-1178 | One row per prompt, market flag, icon of every citing engine, no outcome | ST-016, ST-034 |
| GEO-1178 engine tab label (icon + name + count for 2-3 engines) | GEO-1187 (accepted 2026-10-06) | 3 engines: icon + count, name in the tooltip; 1-2 engines: icon + name + count | ST-034 |
| GEO-1178 AC-12 (en-GB "Action Centre") | GEO-1188 (QA decision 2026-10-02, fixed) | "Action Center" in en-GB | ST-024, ST-025 (restore step) |
| GEO-1124 AC-4 / AC-5 export layout | GEO-1168 (export copy) / GEO-1173 (last slide) | Slide table "#", "Source", "Type", "Articles" with chips, no Cited column; Action Center slide last | ST-017, ST-030, ST-032 |
| GEO-1126 AC-3 ("Cited URLs", "All Cited URLs") | GEO-625 (unified Sources labels, observed 2026-10-05) | "Sources" / "All sources (n)" | ST-022 |
| GEO-1144 (brief in the panel) | GEO-1168 (Key Takeaways removed) | No English sentence on the panel and on the exported slide/page | ST-024, ST-025 |

## Ambiguous points (flagged, not guessed)

- AMB-1 [GEO-1123 AC-1, ST-014]: the panel is a modal dialog; the "second click on the same card" closes it through the backdrop, and clicking another card while the panel is open closes it instead of switching (observed 2026-10-05). The TC asserts only the close. Is switching on another card expected?
- AMB-2 [GEO-1118 AC-1, ST-006]: after GEO-1168 the citation count is no longer shown, so the tie-break (badges, then citations, then domain per GEO-1184 context) cannot be read on screen. Ties exist (e.g. 15/15, 11/11/11). Only the non-increasing total is asserted.
- AMB-3 [GEO-1118 AC-8, ST-007]: on a verdict tab, does the card show both reason lines or only the line of the tab? Not specified after GEO-1168; the TC asserts only the order by the tab's count and the unchanged badges.
- AMB-4 [GEO-1124 AC-4 / AC-5, ST-017 / ST-018]: after GEO-1168 (positive articles removed from the panel, no Cited count on any surface), does the Excel sheet still carry the Positive articles table and the Citations column, and do the PPTX top-3 cards still carry the brief sentence? Not asserted.
- AMB-5 [GEO-1124, ST-018]: the English name of the Target Sources sheet is not recorded (French "Sources à cibler" observed 2026-09-25).
- AMB-6 [GEO-1125 AC-4, ST-020]: the sheet that holds the AI Citation Sources domain table is assumed to be the Overview sheet (first sheet); to confirm.
- AMB-7 [GEO-1126 AC-3/AC-4, ST-022 / ST-023]: "Cited URLs" became "Sources" / "All sources (n)" with GEO-625; the English title of the prompts modal ("All related Prompts - {domain}") was last read in French ("Tous les prompts associés - frmf.ma", 2026-09-25) and is to be re-checked.
- AMB-8 [GEO-1120 AC-9, ST-011]: the 7-day floor ends on the most recent snapshot, while the "Last 7 days" preset spanned 8 snapshots on 2026-10-06; the "Last analysis" and "Last 7 days" totals may differ by one snapshot. The TC records any difference with the snapshot dates. Also open on the PM side: wording for short history (ONE_TIME organisations).
- AMB-9 [GEO-1169 AC-6, ST-031]: the relation "prompts of the Action Center panel = All related Prompts of AI Citation Sources" assumes both views cover the same window and the same prompt grouping (case duplicates "Kia"/"KIA" seen in the Action Center). To confirm with dev.
- AMB-10 [GEO-1119, ST-008]: the verifying title wording is not specified in GEO-1119 / GEO-1168 and has never been observed on staging; it is recorded at execution.
- AMB-11 [GEO-1144, ST-024 / ST-025]: the ticket has no numbered AC; AC-1 is derived from "The bug" section. Since GEO-1168 the brief is no longer in the panel, so the remaining surfaces are the exports (Excel summary column = TC-TNR-AC-005).
- AMB-12 [GEO-1168 translations]: the FR/ES page subtitle and the FR all-clear body differ from the ticket table (FAIL on 2026-10-01: "triées par nombre", "Fuentes a las que dirigirse", "positivement"). Not asserted in this TNR; decision needed (fix the strings or the ticket).
- AMB-13 [GEO-1121, ST-012]: no genuine all-clear analysis exists on staging; the BYD Gemini-only scope is a candidate only. Create a dedicated all-clear report, or keep the TC Conditional?
- AMB-14 [GEO-1116 AC-4, ST-001]: stellantis.com (group owning competitor brands) was listed as a target source on 2026-09-28. Whether a group domain belongs to a competitor family is not specified; the TC checks only the competitor domains of the analysis.
- AMB-15 [GEO-1122, ST-013]: the TC changes the scope of a shared daily analysis for one execution. Use a disposable analysis instead of Toyota?

## Summary

- 36 TCs, 204 steps, 18 stories/tasks (GEO-1184 excluded).
- TCs per story/task: GEO-1116: 2, GEO-1117: 2, GEO-1118: 3, GEO-1119: 1, GEO-1120: 3, GEO-1121: 1, GEO-1122: 1, GEO-1123: 3, GEO-1124: 2, GEO-1125: 3, GEO-1126: 2, GEO-1144: 2, GEO-1166: 2, GEO-1168: 3, GEO-1169: 1, GEO-1173: 1, GEO-1178: 2, GEO-1183: 2.
- Smoke = Yes (9): ST-005 [GEO-1118], ST-010 [GEO-1120], ST-014 [GEO-1123], ST-019 [GEO-1125], ST-022 [GEO-1126], ST-026 [GEO-1166], ST-028 [GEO-1168], ST-032 [GEO-1173], ST-033 [GEO-1178].
- Conditional (4): ST-008 [GEO-1119], ST-012 [GEO-1121], ST-013 [GEO-1122], ST-021 [GEO-1125].
- Priority: Urgent 0, High 23, Medium 13, Low 0. UI/Functional: UI 1, Functional 35. All TCs: QA Regression = Yes (TNR scope).
