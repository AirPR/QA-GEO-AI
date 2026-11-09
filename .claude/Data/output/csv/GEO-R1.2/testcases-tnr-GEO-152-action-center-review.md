# GEO-152 Action Center / Target Sources — TNR test case review (v1, CSV generated)

**Scope:** 15 bugs fixed in version 1.2 of epic GEO-152 (user decision 2026-10-06). **Source:** Jira bug tickets (read-only REST, 2026-10-06; raw responses in `.claude/Data/raw/.tmp-jira/tnr-GEO-*.json`). The latest QA verdict comment and the dev changelogs define the expected behaviour.
**CSV:** `.claude/Data/output/csv/GEO-R1.2/testcases-tnr-GEO-152-action-center.csv`: 19 TCs, 103 step rows (+1 header), 16 columns, `;` separator, UTF-8, CRLF. Labels = TNR, QA Parent = GEO-152, QA Regression = Yes, QA Story/Task = bug key.

## Test data

| Organisation | Analysis | UUID | Used by |
|---|---|---|---|
| QA-GEO | Toyota, period "Last 7 days" (rolling; 29 Sep–5 Oct 2026 on 2026-10-06, about 117 sources) | `439acd96-0b1b-4da4-9e07-612d38e9783e` | 1159, 1160, 1161, 1162, 1164, 1167, 1182, 1187, 1188, 1189, 1194 (normal state), 1202 |
| Onclusive | Nike | `51f6eb92-0d7a-4c77-8fa8-e46d5d610309` | 1158 (the ticket analysis 8f6d09b3 is unavailable) |
| GEO Stress Test 2026-10 | AstraZeneca / Cruz Roja Argentina | `458c20e9-…` / `a3eb5a05-…` | 1194 |
| GEO Stress Test 2026-10 | Victoria's Secret / MSC Croisieres / USPS | `0bd0b48c-…` / `dc801726-…` / `3e6da2fd-…` (from the GEO-1192 verdict) | 1191, 1192 |
| GEO Stress Test 2026-10 | Toyota, Nissan, Juventus FC, Hermès | not recorded, opened by name (OP-4) | 1191 |

Exports: the export icon opens "Export analysis as" with "PDF", "Presentation .pptx" and the spreadsheet option. The deck has 41 slides/pages and Action Center · Target Sources is the last one.

## Open bugs that must not fail a TNR TC

| Bug | Status (2026-10-06) | Subject | How the TCs avoid it |
|---|---|---|---|
| GEO-1201 | Feedback Required | Passage cut at 140 chars mid-word, no "…" | No expected result checks the end of a passage or the "…" marker (TC-002, TC-008, TC-018). |
| GEO-1190 | QA In Progress | Competitor or homonym counted as the brand | TC-008 checks that a highlight is present, not which brand it is on. |
| GEO-1203 | Ready for QA | Homonym or another company's product counted as the brand | Same as GEO-1190. |
| GEO-1204 | Backlog | Some negative pages still not negative; passage does not always support the verdict | TC-015 checks only the 5 pages fixed in the GEO-1192 verdict (+ routard.com threads). uk.trustpilot.com, the prc.gov press release and Google Play are not asserted. |
| GEO-1205 | Backlog | No in-run retry below the breaker threshold | TC-016 checks only the UI state. The retry is back-end only and is not checked. |

## Bug → TC inventory

| Bug | Jira status | TC(s) | Data |
|---|---|---|---|
| GEO-1158 | Passed QA | TC-TNR-AC-001 (Conditional) | Org Onclusive, Nike 51f6eb92-0d7a-4c77-8fa8-e46d5d610309 (the ticket analysis 8f6d09b3 is unavailable) |
| GEO-1159 | Passed QA | TC-TNR-AC-002 | QA-GEO Toyota 439acd96, Last 7 days, caranddriver.com |
| GEO-1160 | Passed QA | TC-TNR-AC-003 | QA-GEO Toyota 439acd96, PDF export in French then Spanish |
| GEO-1161 | Passed QA | TC-TNR-AC-004 | QA-GEO Toyota 439acd96, Last 7 days, frandroid.com |
| GEO-1162 | Passed QA | TC-TNR-AC-005 | QA-GEO Toyota 439acd96, Excel export in French then Spanish |
| GEO-1164 | Done | TC-TNR-AC-006 (Conditional) | QA-GEO Toyota 439acd96, Last 7 days, sample of Lack of visibility articles |
| GEO-1167 | Passed QA | TC-TNR-AC-007 | QA-GEO Toyota 439acd96, Last 7 days, caranddriver.com |
| GEO-1182 | Passed QA | TC-TNR-AC-008 | QA-GEO Toyota 439acd96, Last 7 days, edmunds.com / caradisiac.com / rpmweb.ca |
| GEO-1187 | Passed QA | TC-TNR-AC-009 | QA-GEO Toyota 439acd96, Last 7 days, frandroid.com, viewports 1280x720 and 1920x1080 |
| GEO-1188 | Passed QA | TC-TNR-AC-010 | QA-GEO Toyota 439acd96, interface British English |
| GEO-1189 | Passed QA | TC-TNR-AC-011, TC-TNR-AC-012 | QA-GEO Toyota 439acd96, Presentation .pptx (41 slides on 2026-10-06) ; QA-GEO Toyota 439acd96, PDF (41 pages on 2026-10-06) |
| GEO-1191 | Passed QA | TC-TNR-AC-013, TC-TNR-AC-014 (Conditional) | Org GEO Stress Test 2026-10: Toyota / caranddriver.com, Nissan / oneshift.com, Juventus FC / giemme.it ; Org GEO Stress Test 2026-10: Victoria's Secret 0bd0b48c / elle.com, Hermès / gqmagazine.fr |
| GEO-1192 | Passed QA | TC-TNR-AC-015 | Org GEO Stress Test 2026-10: Victoria's Secret 0bd0b48c, MSC Croisieres dc801726, USPS 3e6da2fd |
| GEO-1194 | Passed QA | TC-TNR-AC-016, TC-TNR-AC-017 | Org GEO Stress Test 2026-10: AstraZeneca 458c20e9, Cruz Roja Argentina a3eb5a05 ; QA-GEO Toyota 439acd96, Last 7 days |
| GEO-1202 | Passed QA | TC-TNR-AC-018, TC-TNR-AC-019 | QA-GEO Toyota 439acd96, Last 7 days: caranddriver.com, frandroid.com, topspeed.com, autobild.es ; QA-GEO Toyota 439acd96, Last 7 days, automobile-propre.com |

## Test cases

### TC-TNR-AC-001 - [GEO-1158] Lack of visibility articles really do not name the brand (Nike)

- **Bug:** GEO-1158 (Passed QA) | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** regression of the fixed classification | **Conditional**
- **Description:** Non-regression of GEO-1158 (Passed QA, QA verdict BUG FIXED 2026-10-01): an article that names the brand must not be listed as a Lack of visibility article ("None of these articles mentions Nike anywhere on the page."), and the myimperfectlife.com Nike review must not push its source into Target Sources. Conditional - needs the current Nike analysis to cite the myimperfectlife.com review (the ticket analysis 8f6d09b3 is no longer available); if it is not cited, step 3 is recorded as "not cited" and only the sampling check (steps 4 to 6) applies.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "Onclusive". Nike analysis 51f6eb92-0d7a-4c77-8fa8-e46d5d610309 (the old Nike analysis 8f6d09b3 is unavailable), default period. The Tesla / aol.com part of the ticket was never verified (report unavailable) and is not covered.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Nike analysis | https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions | The Target Sources list is displayed with ranked source cards and their badges ("Improve visibility" / "Improve perception") |
| 2 | When the user clicks "Show N more sources" until the full list is displayed |  | All Target Sources of the analysis are listed and the "Show N more sources" button is no longer displayed |
| 3 | Then the user looks for myimperfectlife.com in the full list | myimperfectlife.com/reviews/nike-review-our-verdict-on-the-best-workout-clothes-brand-for-women | myimperfectlife.com is not listed with an "Improve visibility" badge, and no panel shows the Nike review with "None of these articles mentions Nike anywhere on the page." (record "not cited" if the source is absent) |
| 4 | When the user opens the details panel of the first source with an "Improve visibility" badge |  | The panel opens on the "Lack of visibility (N)" tab with the line "None of these articles mentions Nike anywhere on the page." |
| 5 | And the user opens the first 3 listed articles in new browser tabs |  | Each article page loads its content (no error page, no consent wall, no bot challenge) |
| 6 | Then the user searches "Nike" in the title and the body of each opened article | Ctrl+F "Nike" | For each of the 3 articles, "Nike" is found in neither the article title nor the article body (mentions in ads, image credits, logos or navigation do not count) |

### TC-TNR-AC-002 - [GEO-1159] Target Sources passages keep the capitalisation of the page

- **Bug:** GEO-1159 (Passed QA) | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1159 (Passed QA, QA verdict BUG FIXED 2026-09-29): passages are shown verbatim, with the capital letters of the page, never all in lower case. Expected results do not check how the passage ends (open bug GEO-1201).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time. Open bugs that must not fail this TC: GEO-1201 (passage cut mid-word without "…"), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand), GEO-1204 (some negative pages still not negative), GEO-1205 (no in-run retry below the breaker threshold).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards |
| 2 | When the user opens the details panel of caranddriver.com | caranddriver.com (if it has no negative article in the current window, use any source with the "Improve perception" badge) | The details panel opens with the header "#N · caranddriver.com" |
| 3 | And the user clicks the "Negative perception (N)" tab |  | The negative articles are listed with their title, their URL and a quoted passage in italics, under the line "Each of these articles mentions Toyota negatively." |
| 4 | Then the user compares each passage with the casing of normal text |  | Every passage keeps the capital letters of the page (sentence starts and proper nouns capitalised, "Toyota" written with a capital T); no passage is entirely in lower case |
| 5 | And the user checks the brand in each passage |  | The brand or product name is highlighted in each passage and keeps its original capitalisation |
| 6 | When the user opens the article of the first passage and searches the first words of the passage on the page | Ctrl+F on the first 5 words of the passage | The words are found on the page with exactly the same capitalisation as in the passage |

### TC-TNR-AC-003 - [GEO-1160] PDF export FR and ES - Target Sources table headers are separate and the last one reads the failing-articles label

- **Bug:** GEO-1160 (Passed QA) | **Priority:** Low | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy path (2 locales)
- **Description:** Non-regression of GEO-1160 (Passed QA, QA verdict BUG FIXED 2026-09-28): in the French and Spanish PDF exports, the last two column headers of the ranked sources table of the Action Center · Target Sources page are two separate headers, never concatenated ("Articles problématiquesCitée" / "Artículos problemáticosSitada"). Updated 2026-10-07: the "Cited" column was removed on purpose, the table now has 4 columns "# | Source | Type | <failing articles>"; the last column header must read "Articles problématiques" (FR) / "Artículos problemáticos" (ES) - it reads "Articles" / "Artículos" today (bug GEO-1222, open), so steps 4 and 6 fail until GEO-1222 is fixed. The test changes the saved interface language and restores en-GB at the end.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time. The test switches the interface language to French then Spanish (saved account setting) and must restore British English at the end. The deck has 41 pages on 2026-10-06 and the Action Center · Target Sources page is the last one (it was page 14 when the bug was raised).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user switches the interface language to French and clicks "Save changes" | Settings > Preferences > Interface Language = French | The interface is displayed in French |
| 2 | And the user opens the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The Toyota analysis is displayed in French |
| 3 | When the user clicks the export icon in the analysis toolbar and selects "PDF" |  | A PDF file of the analysis is downloaded |
| 4 | Then the user opens the Action Center · Target Sources page of the PDF | Last page (41 of 41 on 2026-10-06), title "Où l'effort RP paie d'abord" | The ranked sources table has 4 separate, readable column headers "# | Source | Type | Articles problématiques" (no "Citée" column, removed on purpose), with no concatenated header such as "Articles problématiquesCitée" |
| 5 | When the user switches the interface language to Spanish, saves, and exports the Toyota analysis as "PDF" again | Settings > Preferences > Interface Language = Spanish | A Spanish PDF file of the analysis is downloaded |
| 6 | Then the user opens the Action Center · Target Sources page of the Spanish PDF | Last page, title "Dónde rinde primero el esfuerzo de RR. PP." | The ranked sources table has 4 separate, readable column headers "# | Fuente | Tipo | Artículos problemáticos" (no "Citada" column, removed on purpose), with no concatenated header such as "Artículos problemáticosSitada" |
| 7 | And the user switches the interface language back to British English and clicks "Save changes" | Settings > Preferences > Interface Language = British English | The interface is displayed in British English again and the left menu shows "Action Center" |

### TC-TNR-AC-004 - [GEO-1161] Details panel shows 10 articles then a "Show N more articles" button

- **Bug:** GEO-1161 (Passed QA) | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path + boundary (more than 10 articles)
- **Description:** Non-regression of GEO-1161 (Passed QA, QA verdict BUG FIXED 2026-09-30): in the source details panel, a tab with more than 10 articles shows 10 articles followed by a "Show N more articles" button (progressive disclosure, same pattern as "Show N more sources"); the prompts list uses "Show N more prompts".
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards |
| 2 | When the user opens the details panel of a source with more than 10 articles in one tab | frandroid.com (31 articles on 2026-09-30); otherwise any source whose tab count is above 10 | The details panel opens with the header "#N · frandroid.com" and a tab count above 10, e.g. "Lack of visibility (N)" |
| 3 | Then the user checks the articles list of that tab |  | Exactly 10 articles are displayed, followed by the button "Show N more articles" where N = tab count - 10 (e.g. "Show 21 more articles" for 31 articles) |
| 4 | When the user clicks "Show N more articles" |  | All the articles of the tab are displayed (their number equals the tab count) and the button is no longer displayed |
| 5 | And the user scrolls to "Prompts associated with this source" |  | When the source has more prompts than the first rows shown, the list ends with a "Show N more prompts" button instead of the full list |

### TC-TNR-AC-005 - [GEO-1162] Excel export FR and ES - the Target Sources summary text is translated

- **Bug:** GEO-1162 (Passed QA) | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (2 locales)
- **Description:** Non-regression of GEO-1162 (Passed QA, QA verdict BUG FIXED 2026-09-29): in the Excel export, the text of the summary column of the target sources sheet is written in the export language (French "Cette source compte ...", Spanish "Esta fuente tiene ..."), never in English ("This source has ..."). The test changes the saved interface language and restores en-GB at the end.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time. The test switches the interface language to French then Spanish (saved account setting) and must restore British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user switches the interface language to French and clicks "Save changes" | Settings > Preferences > Interface Language = French | The interface is displayed in French |
| 2 | And the user opens the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The Toyota analysis is displayed in French |
| 3 | When the user clicks the export icon and selects the spreadsheet option | Spreadsheet export (.xlsx) | An Excel file of the analysis is downloaded |
| 4 | Then the user opens the target sources sheet and reads the summary column | Sheet "Sources à cibler", column "Résumé" | Every summary cell is in French, e.g. "Cette source compte N articles problématiques : ..."; no cell starts with "This source has" |
| 5 | When the user switches the interface language to Spanish, saves, and exports the Toyota analysis as a spreadsheet again | Settings > Preferences > Interface Language = Spanish | A Spanish Excel file of the analysis is downloaded |
| 6 | Then the user opens the target sources sheet and reads the summary column | Sheet "Fuentes a priorizar", column "Resumen" | Every summary cell is in Spanish, e.g. "Esta fuente tiene N artículos problemáticos: ..."; no cell starts with "This source has" |
| 7 | And the user switches the interface language back to British English and clicks "Save changes" | Settings > Preferences > Interface Language = British English | The interface is displayed in British English again and the left menu shows "Action Center" |

### TC-TNR-AC-006 - [GEO-1164] Unreadable or off-site pages are not listed as "No mention of the brand"

- **Bug:** GEO-1164 (Done) | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error handling | **Conditional**
- **Description:** Non-regression of GEO-1164 (Done, dev validation 2026-09-30): a page that answers an HTTP error (>= 400) or redirects to another site's home page is marked NOT_FETCHED, so it is not counted as a failing article and is not shown under "None of these articles mentions Toyota anywhere on the page." Conditional - needs a cited URL that answers an HTTP error or an off-site redirect at capture time (back-end rule; the ticket's truecar.com page now serves the real article). Without such a URL the TC is a sampling check of the Lack of visibility articles.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time. An error seen on a live page today may be transient and different from the page captured at analysis time: note the HTTP status and the capture date when a step fails.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards |
| 2 | When the user opens the details panel of the first 3 sources with an "Improve visibility" badge |  | Each panel opens on the "Lack of visibility (N)" tab with the line "None of these articles mentions Toyota anywhere on the page." |
| 3 | And the user opens every listed article URL of these panels in a new browser tab |  | Every article URL opens a page |
| 4 | Then the user checks each opened page |  | No listed article is an HTTP error page (404, 500, 503...), a "server error" or "application error" page, or a redirect to another site's home page or to unrelated content (e.g. an online gaming portal) |
| 5 | And the user looks for the truecar.com Toyota page among the Lack of visibility articles | truecar.com/best-cars-trucks/make-toyota/ | The truecar.com make-toyota page is not listed as a Lack of visibility article |

### TC-TNR-AC-007 - [GEO-1167] Each prompt appears once in "Prompts associated with this source"

- **Bug:** GEO-1167 (Passed QA) | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1167 (Passed QA, QA verdict BUG FIXED 2026-10-02): in the "Prompts associated with this source" section of the details panel, each unique prompt appears on one row only, with the icons of every engine that cites it (accepted design of 2026-10-02, not one row per engine).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards |
| 2 | When the user opens the details panel of caranddriver.com | caranddriver.com | The details panel opens with the header "#N · caranddriver.com" |
| 3 | And the user scrolls to "Prompts associated with this source" with the "All" engine tab selected |  | The section shows the engine tabs ("All" selected) and the prompts list |
| 4 | And the user clicks "Show N more prompts" |  | The full prompts list is displayed and the button is no longer displayed |
| 5 | Then the user compares the prompt texts of all rows |  | Each prompt text appears on one row only (no duplicate, even ignoring case, spacing and quotes) |
| 6 | And the user locates the rows of two prompts cited by several engines | "Best Electric Cars?", "Best Coches Eléctricos?" (otherwise any prompt cited by 2 engines or more) | Each of these prompts appears once, on a single row that shows the icons of all the engines citing it (e.g. ChatGPT and Gemini) |
| 7 | When the user clicks the ChatGPT engine tab |  | Only rows with the ChatGPT icon are listed, each prompt once, and their number equals the count of the ChatGPT tab |

### TC-TNR-AC-008 - [GEO-1182] The brand is highlighted in every Negative perception passage

- **Bug:** GEO-1182 (Passed QA) | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1182 (Passed QA, QA verdict BUG FIXED 2026-10-06): every Negative perception passage shows the brand or product name highlighted (110/110 on 2026-10-06), including "It took Toyota a long time..." on edmunds.com. Accepted: when the highlight is on a product name ("Toyota bZ4X"), a second standalone "Toyota" in the same passage may stay unhighlighted. Whether the highlighted entity is the right brand is out of scope (open bugs GEO-1190 / GEO-1203).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time. Open bugs that must not fail this TC: GEO-1201 (passage cut mid-word without "…"), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand), GEO-1204 (some negative pages still not negative), GEO-1205 (no in-run retry below the breaker threshold).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards |
| 2 | When the user opens the details panel of edmunds.com | edmunds.com (if absent from the current window, use any source with the "Improve perception" badge) | The details panel opens with the header "#N · edmunds.com" |
| 3 | And the user clicks the "Negative perception (N)" tab |  | The negative articles are listed, each with a quoted passage in italics |
| 4 | Then the user checks the bZ4X passages | "It took Toyota a long time to produce a mass-market electric vehicle…" (2023 and 2024 bZ4X) | "Toyota" is highlighted (bold on a highlight chip) in both passages |
| 5 | And the user checks every passage of the tab for a highlight |  | Every passage shows at least one highlighted brand or product name |
| 6 | When the user repeats the check on the Negative perception tab of caradisiac.com and rpmweb.ca | caradisiac.com, rpmweb.ca (or 2 other "Improve perception" sources) | Every passage of both tabs shows at least one highlighted brand or product name |

### TC-TNR-AC-009 - [GEO-1187] Engine filter tabs show icon and count, no truncation

- **Bug:** GEO-1187 (Passed QA) | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy path (2 viewports)
- **Description:** Non-regression of GEO-1187 (Passed QA, QA verdict BUG FIXED 2026-10-06, new behaviour accepted in comment 858930): the engine filter tabs of "Prompts associated with this source" show the engine icon and the prompt count only (engine name in the tooltip and the accessible label), with no ellipsis and no truncation.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time. Browser window 1280x720. The GEO-1178 acceptance criterion (icon + name + count) is superseded by the accepted icon + count layout.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis in a 1280x720 browser window | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards |
| 2 | When the user opens the details panel of frandroid.com | frandroid.com (otherwise any source with prompts from 3 engines) | The details panel opens with the header "#N · frandroid.com" |
| 3 | And the user scrolls to "Prompts associated with this source" |  | The engine filter tabs are displayed above the prompts list |
| 4 | Then the user checks the engine tabs |  | "All" is selected by default, followed by one tab per engine showing its icon and its count, e.g. "All \| [ChatGPT] 25 \| [Gemini] 12 \| [Perplexity] 68"; no label is cut, no ellipsis, no tab overflows |
| 5 | When the user hovers the ChatGPT tab |  | A tooltip shows the engine name with its count, e.g. "ChatGPT (25)" |
| 6 | And the user clicks the Perplexity tab |  | Only prompts cited by Perplexity are listed and their number equals the Perplexity tab count |
| 7 | When the user resizes the browser window to 1920x1080 |  | The engine tabs still show icon and count with no truncation and no ellipsis |

### TC-TNR-AC-010 - [GEO-1188] British English menu reads "Action Center"

- **Bug:** GEO-1188 (Passed QA) | **Priority:** Low | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy path + state (direct load / in-app navigation)
- **Description:** Non-regression of GEO-1188 (Passed QA, QA verdict BUG FIXED 2026-10-02): with the interface in British English (en-GB), the page name reads "Action Center" (same as en-US and as the export header "ACTION CENTER · TARGET SOURCES"), whether the page is loaded directly or reached by in-app navigation; "Action Centre" appears nowhere.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the interface language is British English | Settings > Preferences > Interface Language = British English (click "Save changes" if another language is selected) | British English is the saved interface language |
| 2 | When the user loads the Action Center page of the Toyota analysis directly | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions | The left menu entry reads "Action Center" |
| 3 | And the user navigates to the Overview with the left menu, then back to the Action Center |  | The left menu entry reads "Action Center" on both pages |
| 4 | Then the user searches "Action Centre" on the page and in the browser tab title | Ctrl+F "Action Centre" | "Action Centre" is found nowhere (menu, headings, browser tab title) |

### TC-TNR-AC-011 - [GEO-1189] PowerPoint export - category sections follow the left navigation order

- **Bug:** GEO-1189 (Passed QA) | **Priority:** Low | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (PPTX)
- **Description:** Non-regression of GEO-1189 (Passed QA, QA verdict BUG FIXED 2026-10-06), PowerPoint part: the category sections of the PPTX export follow the order of the left navigation, with Action Center · Target Sources as the last slide.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The analysis Overview is displayed with the left navigation |
| 2 | And the user notes the category order in the left navigation | Voitures hybrides > VUS > Voitures électriques (2026-10-06) | The categories are listed in the left navigation in this order |
| 3 | When the user clicks the export icon and selects "Presentation .pptx" |  | A .pptx file of the analysis is downloaded |
| 4 | Then the user checks the category section slides of the deck | 41 slides on 2026-10-06: Voitures hybrides 14-22, VUS 23-31, Voitures électriques 32-40 | The category sections follow the left navigation order: Voitures hybrides, then VUS, then Voitures électriques |
| 5 | And the user checks the last slide of the deck |  | The last slide is Action Center · Target Sources (slide 41 on 2026-10-06) |

### TC-TNR-AC-012 - [GEO-1189] PDF export - category sections follow the left navigation order

- **Bug:** GEO-1189 (Passed QA) | **Priority:** Low | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path (PDF)
- **Description:** Non-regression of GEO-1189 (Passed QA, QA verdict BUG FIXED 2026-10-06), PDF part: the category sections of the PDF export follow the order of the left navigation, with Action Center · Target Sources as the last page.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The analysis Overview is displayed with the left navigation |
| 2 | And the user notes the category order in the left navigation | Voitures hybrides > VUS > Voitures électriques (2026-10-06) | The categories are listed in the left navigation in this order |
| 3 | When the user clicks the export icon and selects "PDF" |  | A PDF file of the analysis is downloaded |
| 4 | Then the user checks the category section pages of the PDF | 41 pages on 2026-10-06: Voitures hybrides 14-22, VUS 23-31, Voitures électriques 32-40 | The category sections follow the left navigation order: Voitures hybrides, then VUS, then Voitures électriques |
| 5 | And the user checks the last page of the PDF |  | The last page is Action Center · Target Sources (page 41 on 2026-10-06) |

### TC-TNR-AC-013 - [GEO-1191] Ads, image credits, logos and related links are not counted as a brand mention

- **Bug:** GEO-1191 (Passed QA) | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error handling (page chrome)
- **Description:** Non-regression of GEO-1191 (Passed QA, QA verdict FIXED - dev scope 2026-10-06): on the re-judged pages, a brand name that only appears in a dealer ad, an image credit, a client logo or a related-article title is not a mention, so the article is not a positive article. Only the 12 re-judged pages are checked; the 17 credit/logo/navigation-only positives and 6 positives without passage found outside that scope (not re-judged) are not asserted.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (access to the organisation "GEO Stress Test 2026-10"), interface language British English (en-GB), organisation switcher set to "GEO Stress Test 2026-10". These are one-time reports (single snapshot of 2026-10-05), so their data does not roll. Engine filter as in the QA verdict: ChatGPT. Report UUIDs of Toyota, Nissan and Juventus FC in this organisation are not recorded: open them from the analysis list by name.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis of the organisation "GEO Stress Test 2026-10" | Analysis "Toyota" (org GEO Stress Test 2026-10), AI Engines = ChatGPT | The Target Sources list is displayed |
| 2 | When the user opens the details panel of caranddriver.com and reads every tab | Articles "10Best Trucks and SUVs 2023", "Best SUVs 2023", bestselling EVs 2024 | No article has the passage "Priority Toyota Chesapeake" and none of the 3 articles is listed under the Positive articles tab |
| 3 | And the user opens the Action Center of the Nissan analysis and the details panel of oneshift.com | Analysis "Nissan" (org GEO Stress Test 2026-10); articles Hyundai Ioniq 5 review, BYD Atto 3, Car of the Year 2023 | No article has the passage "Nissan Serena e-POWER (2024) Review" and none of the 3 articles is listed under the Positive articles tab |
| 4 | And the user opens the Action Center of the Juventus FC analysis and the details panel of giemme.it | Analysis "Juventus FC" (org GEO Stress Test 2026-10) | The giemme.it article (client logo only) is not listed under the Positive articles tab |
| 5 | Then the user checks the passages of the remaining Positive articles of these panels |  | Each remaining positive article shows a passage taken from the article text, not an ad, an image credit, a logo or a related-article title |

### TC-TNR-AC-014 - [GEO-1191] A body mention or an editorial product selection is still counted as a mention

- **Bug:** GEO-1191 (Passed QA) | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge case (no over-removal) | **Conditional**
- **Description:** Non-regression of GEO-1191 (Passed QA, QA verdict FIXED - dev scope 2026-10-06), accepted behaviour: the chrome cleaning must not remove real mentions. elle.com (Victoria's Secret, body sentence) and gqmagazine.fr (Hermès, "Carré Hermès" in an editorial shopping selection, PO decision of 2026-10-05) stay named. Conditional - needs elle.com and gqmagazine.fr to be shown in the Target Sources list (a source with positive articles only may not be listed); otherwise check with the panel data and note it.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (access to the organisation "GEO Stress Test 2026-10"), interface language British English (en-GB), organisation switcher set to "GEO Stress Test 2026-10". These are one-time reports (single snapshot of 2026-10-05), so their data does not roll. Victoria's Secret report 0bd0b48c-e78a-4e43-b607-f0318b48f6ba; the Hermès report UUID is not recorded (open it by name).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Victoria's Secret analysis | https://staging-geo.onclusive.com/geo/dashboard/0bd0b48c-e78a-4e43-b607-f0318b48f6ba/actions | The Target Sources list is displayed |
| 2 | When the user opens the details panel of elle.com and clicks the Positive articles tab | elle.com best lingerie brands article | The best lingerie brands article is listed as a positive article |
| 3 | Then the user reads its passage |  | The passage is a sentence of the article naming Victoria's Secret (e.g. "Victoria's Secret has been the home of the push-up bra…" or "The then-Victoria's Secret model…"), not the image credit "Courtesy Victoria's Secret" |
| 4 | When the user opens the Action Center of the Hermès analysis and the details panel of gqmagazine.fr | Analysis "Hermès" (org GEO Stress Test 2026-10) | The gqmagazine.fr article is listed as a positive article |
| 5 | Then the user reads its passage |  | The passage names the product of the editorial selection, e.g. "Carré Hermès" |

### TC-TNR-AC-015 - [GEO-1192] Negative review pages and critical reports are listed as Negative perception

- **Bug:** GEO-1192 (Passed QA) | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1192 (Passed QA, QA verdict FIXED - partial scope 2026-10-06): the pages fixed by the judge change stay negative (Victoria's Secret nl-be and www Trustpilot, MSC Croisieres fr.trustpilot.com and routard.com, USPS prc.gov FY2023 financial report). The remaining cases (uk.trustpilot.com, prc.gov press release, Google Play, passage not supporting the verdict) are tracked in open bug GEO-1204 and are not asserted.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (access to the organisation "GEO Stress Test 2026-10"), interface language British English (en-GB), organisation switcher set to "GEO Stress Test 2026-10". These are one-time reports (single snapshot of 2026-10-05), so their data does not roll. Reports: Victoria's Secret 0bd0b48c-e78a-4e43-b607-f0318b48f6ba, MSC Croisieres dc801726-99e5-4e53-bf72-87b469ed5098, USPS 3e6da2fd-efdd-4a44-af41-435c74ed5e73. Engine filter as in the QA verdict: ChatGPT. Open bugs that must not fail this TC: GEO-1201 (passage cut mid-word without "…"), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand), GEO-1204 (some negative pages still not negative), GEO-1205 (no in-run retry below the breaker threshold).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Victoria's Secret analysis | https://staging-geo.onclusive.com/geo/dashboard/0bd0b48c-e78a-4e43-b607-f0318b48f6ba/actions | The Target Sources list is displayed |
| 2 | When the user opens the details panel of trustpilot.com and clicks the "Negative perception (N)" tab |  | The negative articles of trustpilot.com are listed |
| 3 | Then the user checks the Victoria's Secret Trustpilot pages | nl-be.trustpilot.com/review/www.victoriassecret.com, www.trustpilot.com/review/www.victoriassecret.com | Both pages are listed under Negative perception |
| 4 | When the user opens the Action Center of the MSC Croisieres analysis and the "Negative perception (N)" tab of trustpilot.com | https://staging-geo.onclusive.com/geo/dashboard/dc801726-99e5-4e53-bf72-87b469ed5098/actions - fr.trustpilot.com/review/www.msccroisieres.fr | fr.trustpilot.com/review/www.msccroisieres.fr is listed under Negative perception |
| 5 | And the user opens the "Negative perception (N)" tab of routard.com | routard.com forum (2 threads) | The 2 routard.com forum threads are listed under Negative perception |
| 6 | When the user opens the Action Center of the USPS analysis and the "Negative perception (N)" tab of prc.gov | https://staging-geo.onclusive.com/geo/dashboard/3e6da2fd-efdd-4a44-af41-435c74ed5e73/actions - FY2023FinancialReport.pdf | The prc.gov FY2023 financial report (PDF) is listed under Negative perception |

### TC-TNR-AC-016 - [GEO-1194] Nothing could be checked shows "Pages could not be checked", not "All clear"

- **Bug:** GEO-1194 (Passed QA) | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** state transition
- **Description:** Non-regression of GEO-1194 (Passed QA, QA verdict BUG FIXED 2026-10-06): when no cited page could be checked (nothingCouldBeChecked = true), Target Sources shows a distinct state - grey warning icon, "Pages could not be checked", "None of the cited pages could be checked." - with no green check and no "All clear". AstraZeneca and Cruz Roja Argentina have not been collected again since the fix, so this state is the expected one for them. The in-run retry is back-end only (follow-up GEO-1205, open) and is not checked.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (access to the organisation "GEO Stress Test 2026-10"), interface language British English (en-GB), organisation switcher set to "GEO Stress Test 2026-10". These are one-time reports (single snapshot of 2026-10-05), so their data does not roll. Reports AstraZeneca 458c20e9-1dcc-4e82-a05b-2fca56431396 and Cruz Roja Argentina a3eb5a05-3cfa-4132-a116-3fec6a9e0c87 (single snapshot 2026-10-05 01:57Z, not re-collected). If they are re-collected, this TC no longer applies to them.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the AstraZeneca analysis | https://staging-geo.onclusive.com/geo/dashboard/458c20e9-1dcc-4e82-a05b-2fca56431396/actions | The Action Center page is displayed |
| 2 | Then the user checks the Target Sources section |  | The section shows a grey warning icon, the title "Pages could not be checked" and the text "None of the cited pages could be checked." |
| 3 | And the user checks that the all-clear state is not shown |  | No "All clear" text, no green check icon and no source card are displayed |
| 4 | When the user opens the Action Center of the Cruz Roja Argentina analysis | https://staging-geo.onclusive.com/geo/dashboard/a3eb5a05-3cfa-4132-a116-3fec6a9e0c87/actions | The Action Center page is displayed |
| 5 | Then the user checks the Target Sources section |  | The section shows the grey warning icon, "Pages could not be checked" and "None of the cited pages could be checked.", with no "All clear" and no green check |

### TC-TNR-AC-017 - [GEO-1194] An analysis with checked pages still shows the normal source list

- **Bug:** GEO-1194 (Passed QA) | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state (non-regression of the normal state)
- **Description:** Non-regression of GEO-1194 (Passed QA, QA verdict BUG FIXED 2026-10-06), normal state: an analysis whose pages were checked still shows the ranked source list, without the "Pages could not be checked" warning and without "All clear". The regular green "All clear" state cannot be checked on staging (no such report on 2026-10-06).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Action Center page is displayed |
| 2 | Then the user checks the Target Sources section |  | The ranked source cards are displayed with their badges, followed by "Show N more sources" |
| 3 | And the user checks that no warning or all-clear state is shown |  | Neither "Pages could not be checked" nor "All clear" is displayed |

### TC-TNR-AC-018 - [GEO-1202] Negative perception passages show page text without markdown

- **Bug:** GEO-1202 (Passed QA) | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy path
- **Description:** Non-regression of GEO-1202 (Passed QA, last QA verdict BUG FIXED 2026-10-06, 0/108 negative passages with markup): passages are page text as a reader sees it, with no markdown link, link target, bold markers, image syntax, table pipes or escape backslash. Accepted as info only: the motortrend.com passage quoting an ad label; guideautoweb.com and autohebdo.net quoting the page header (judge passage choice, out of scope). Passage endings are not checked (open bug GEO-1201). Restricted to Toyota: older verdicts of other reports may still carry markup until they are re-judged.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time. Open bugs that must not fail this TC: GEO-1201 (passage cut mid-word without "…"), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand), GEO-1204 (some negative pages still not negative), GEO-1205 (no in-run retry below the breaker threshold).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards |
| 2 | When the user opens the "Negative perception (N)" tab of caranddriver.com | Article "2023 Toyota 4Runner Review, Pricing, and Specs" | The passage is page text, e.g. "The 2023 Toyota 4Runner isn't like most of the other mid-size crossovers and SUVs…", with no "[Skip to Content](https://…)" |
| 3 | And the user opens the "Negative perception (N)" tab of frandroid.com and of topspeed.com | "…le premier SUV compact Toyota bZ4X", "…Toyota moved just 13 Prius models" | No passage contains a link target such as "(https://" |
| 4 | And the user opens the "Negative perception (N)" tab of autobild.es |  | The passage contains no markdown table pipes ("\| … \|") |
| 5 | Then the user reads every Negative perception passage of the first 10 sources with the "Improve perception" badge | Markup to look for: [text](url), (https://, **, ![ or !Logo, table pipes, backslash | No passage contains link syntax, a link target, bold markers, image syntax, table pipes or a backslash escape character |

### TC-TNR-AC-019 - [GEO-1202] Article titles in the details panel show no escape backslash

- **Bug:** GEO-1202 (Passed QA) | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge case (apostrophes in titles)
- **Description:** Non-regression of GEO-1202 (Passed QA, last QA verdict BUG FIXED 2026-10-06, 0/2346 titles with a backslash), title part: article titles are shown as on the page, e.g. "l'électrique" and not "l\'électrique".
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days" (rolling window: on 2026-10-06 it covers 29 Sep - 5 Oct 2026, about 117 target sources), AI Engines and countries left at their defaults. Ranks, counts and the listed articles change with the window and must be read at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards |
| 2 | When the user opens the details panel of automobile-propre.com and reads the article titles of every tab | Title "Marché auto : encore un record pour l'électrique, les Tesla…" (if no longer listed, use any title with an apostrophe) | The title reads "l'électrique" with no backslash before the apostrophe |
| 3 | And the user reads the article titles of the details panels of the first 5 sources |  | Titles with an apostrophe are displayed as on the page |
| 4 | Then the user searches for a backslash in the opened panels | Ctrl+F "\" | No article title contains a backslash |

## Summary

- 19 TCs, 103 steps, 15 bugs. GEO-1189, GEO-1191, GEO-1194 and GEO-1202 have 2 TCs each because each ticket covers two independent checks.
- Coverage: happy path 12, edge 2, error handling 2, state 2, regression of the fixed classification 1.
- Smoke = Yes: TC-007 (GEO-1167), TC-016 (GEO-1194), TC-018 (GEO-1202). All TCs: QA Regression = Yes (TNR scope; this overrides the Medium/Low = No rule, per the request).
- Conditional: TC-TNR-AC-001 [GEO-1158], TC-TNR-AC-006 [GEO-1164], TC-TNR-AC-014 [GEO-1191].

## Open points (need a decision)

- OP-1 [GEO-1158, TC-001]: the ticket analysis (Nike 8f6d09b3) is unavailable. The new Nike analysis 51f6eb92 may not cite the myimperfectlife.com review, so the TC falls back to sampling the Lack of visibility articles. The Tesla / aol.com part was never verified and is not covered. Keep it as Conditional, or drop the specific check?
- OP-2 [GEO-1164, TC-006]: the fix is a back-end rule (NOT_FETCHED on HTTP >= 400 / off-site redirect). It can only be observed in the UI when a cited URL fails at capture time, so the TC is a sampling check. Keep it in the TNR, or replace it with a back-end/API check by dev?
- OP-3 [GEO-1160 TC-003, GEO-1162 TC-005]: the export language is assumed to follow the saved interface language. The FR/ES labels ("Articles problématiques" / "Citée", sheets "Sources à cibler" / "Fuentes a priorizar", columns "Résumé" / "Resumen") are the ones accepted on 2026-09-28/29 and may have been renamed since (GEO-1178 wording). Please confirm the current labels; the expected results are written so that the separation and the language are the checks.
- OP-4 [GEO-1191 TC-013/014]: the UUIDs of the Toyota, Nissan, Juventus FC and Hermès reports in "GEO Stress Test 2026-10" are not recorded, so the steps open them by name. The 17 credit/logo/navigation-only positives (BBC Studios theguardian.com x7, etc.) and the 6 positives without passage were not re-judged (question to dev open in the QA verdict). They are not asserted. Extend the TC once the re-judge decision is made?
- OP-5 [GEO-1191 TC-014]: elle.com and gqmagazine.fr may not be shown in the Target Sources list if they only carry positive articles. The TC is Conditional: when they are hidden, should the check be done with the panel data (API), or should the TC be dropped?
- OP-6 [GEO-1194 TC-016/017]: AstraZeneca and Cruz Roja show "Pages could not be checked" only while they are not re-collected. The regular green "All clear" state cannot be checked on staging (no such report), and en-US / fr / es were not covered by the verdict. Add language variants, or create a genuine All clear report?
- OP-7 [Toyota rolling window, TC-002/004/007/008/009/018/019]: the named sources and articles (caranddriver.com 4Runner 2023, edmunds.com bZ4X, caradisiac.com, rpmweb.ca, frandroid.com, topspeed.com, autobild.es, automobile-propre.com "l'électrique") may leave the "Last 7 days" window. Fallbacks are written in Test data. TC-018 is restricted to Toyota because dev says older verdicts of the other reports (25 on Tesla, Lidl NL and Nike) are cleaned only when they are re-judged at the release.
- OP-8 [GEO-1187 TC-009]: the TC follows the accepted icon + count layout (comment 858930). The GEO-1178 AC wording (icon + name + count) and the GEO-1178 CSV TCs should be aligned, or they will contradict this TNR TC.
- OP-9 [GEO-1167 TC-007]: the dev first proposed one row per engine (comment 854767), then followed the latest design (one row per prompt with all engine icons), and QA accepted that design. The TC asserts the accepted design; please confirm it is final.
