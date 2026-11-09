# GEO-1513 Action center improvments — epic test case review (GEO-R1.3, generated 2026-10-23)

**Sources (read-only):** `apps/geo/GEO-R1.3/GEO-1513/` (EPIC.md, epic-data.json, STORY_GEO-1184_Target_Sources_Sort_the_cards_by_the_number_of_prompts_that_.md). Design reference: Design Task GEO-1208 (Done). Its decisions are summarised in the story file: designer comment of 2026-10-20, and the PO's comment on GEO-1184 of 2026-10-22: "design done ready for dev". Starting point: the 5 TCs TC-GEO-1184-001 to 005 of `.claude/Data/output/csv/GEO-R1.2/testcases-coverage-epicGEO-152.csv` (left unchanged) and their section in `testcases-coverage-epicGEO-152-review.md`. No Figma render (`--figma` not used); the design wording comes from the GEO-1208 comment.

**Scope:** targeted build for **GEO-1184 only** (Story, Ready for QA, moved from GEO-152 / R1.2). No AC changed compared with the R1.2 copy (Jira description checked 2026-10-23). GEO-1534 (Code Review, back-end only) is not covered by this file. **Out of Scope respected:** "The export does not change" (GEO-1184 / GEO-1208) is tested only as a non-regression (TC-GEO-1184-003, 009).

**CSV:** `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-epicGEO-1513.csv` — 9 TCs, 41 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. QA Parent = GEO-1513, QA Story/Task = GEO-1184, Components = GEO, QA Component = GEO Module, Labels empty, Test Type = Manual, QA Regression = Yes for Urgent/High.

## Summary

| Metric | Value |
|---|---|
| Test cases | 9 (5 kept and updated, 4 added) |
| Steps (CSV rows) | 41 |
| Stories / Tasks | 1 / 0 |
| Coverage | happy 4 · edge 3 · error 0 · state 2 |
| Priority | Urgent 0 · High 3 · Medium 4 · Low 2 |
| UI / Functional | UI 2 · Functional 7 |
| Smoke = Yes | 1 (TC-GEO-1184-001) |
| QA Regression = Yes | 3 |
| ACs covered | 3 / 3 + design decisions D-4, D-6, D-7 + open question Q-4 (assumed) |

| Story | Jira status | ACs | TCs | Steps | Smoke | Happy | Edge | Error | State |
|---|---|---|---|---|---|---|---|---|---|
| GEO-1184 | Ready for QA | 3 | 9 | 41 | 1 | 4 | 3 | 0 | 2 |

## Changes vs the R1.2 TCs (TC-GEO-1184-001 to 005)

| TC | Change |
|---|---|
| All 5 | QA Parent GEO-152 → GEO-1513. Removed "Not yet delivered / Backlog / design pending / provisional wording" from the descriptions and preconditions. The precondition now targets a BRAND analysis with Target Sources picked at execution (Toyota, Nike or Decathlon; read only) and states the GEO-1208 wording. The description keeps "Covers AC-N". |
| 001 | Step 1 checks that "Sort by" sits in the page header, left of the Card view / List view switch, and shows "Failing articles". Step 2 selects "Most prompts" from "Sort by". Behaviour unchanged. |
| 002 | Step 2 names the "All" tab of "Prompts associated with this source" and expects "All (N)" with the card's N. Behaviour unchanged. |
| 003 | Default sort named "Failing articles" (title, description, step 1). Steps 4-5 (export again with "Most prompts" selected) moved to the new TC-GEO-1184-009. They test the designer's open question Q-4, not AC-3 ("when the option is not selected"), and must stay Low / assumed. |
| 004 | "(record whether the sort stayed selected, open design point)" replaced by "the ranks restart at 1" (D-7). Persistence itself is now TC-GEO-1184-008. "Covers AC-1 within the current tab and scope". |
| 005 | "Sort by" wording only; "Covers AC-1 tie rule". |

## Test data

| Ref | Description | Used by |
|---|---|---|
| A | BRAND analysis with Target Sources, read only: Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926 (user's pick at execution) | all |
| T | Two sources with the same prompt count | TC-GEO-1184-005 |
| S1 | A source used in a single prompt in the period | TC-GEO-1184-006 (blocked by data if none) |

All counts, ranks and listed sources are read at execution (no hard-coded numbers).

## AC inventory and traceability

### GEO-1184 — [Target Sources] Sort the cards by the number of prompts that use each source (Story, Ready for QA)

| AC / decision | Label | TC(s) |
|---|---|---|
| AC-1 | "Most prompts" orders the cards by descending prompt count | GEO-1184-001 (+ 004 tab/scope, 005 tie rule) |
| AC-2 | Card count = prompts listed in the panel | GEO-1184-002 (+ 006 for the 1-prompt case) |
| AC-3 | Default sort and export unchanged when the option is not selected | GEO-1184-003 (+ 009 with the option selected, Q-4) |
| D-1 | "Sort by" in the page header, left of the Card view / List view switch | checked in GEO-1184-001 step 1 |
| D-2 | Values "Failing articles" (default) / "Most prompts" | GEO-1184-001, 003, 008 |
| D-4 | "Used in N prompts" / singular "Used in 1 prompt" | GEO-1184-001, 002, **006** |
| D-5 | Panel "All (N)" | GEO-1184-002, 006 |
| D-6 | List view "Prompts" column after "Articles", descending indicator | **GEO-1184-007** |
| D-7 | Sort kept across tabs, views, filters and Show more; reset on the next visit; ranks restart at 1 | **GEO-1184-008**, 004 |
| Q-4 | Export never follows the sort (assumed) | **GEO-1184-009** (Low) |

The descriptions of the new TCs (006 to 009) end with "Design decision GEO-1208 (designer, 2026-10-20), PO: 'design done ready for dev' (2026-10-22) — to confirm at execution".

## ACs filtered as technical

- Technical Details of GEO-1184 (`TargetSourcesService.java:274`, "NOT `qualifyingAnswerCitations`"): not turned into TCs. The visible part (distinct prompts, not answers) is checked by TC-GEO-1184-002 against the panel list.
- "Strings to be added to the strings sheet in FR/ES": localisation, not covered here (en-GB only).

## Ambiguous ACs and open points (flagged, not guessed)

The designer raised these questions to the PO in GEO-1208. No written answer was found; the PO only posted "design done ready for dev" on GEO-1184 on 2026-10-22. No TC was created for Q-1, Q-2, Q-3 and Q-5.

- OP-1 (Q-1) Citations line: does the card still show "cited N× in gap answers"? If yes, the prompt line goes above it. Not asserted; record what the card shows at execution.
- OP-2 (Q-2) Filters: does the prompt count follow the AI engine and country filters (the design's assumption), or is it always the union? TC-GEO-1184-004 step 5 keeps its R1.2 expectation: the count is lower than or equal to the All Countries count, which holds in both readings. TC-GEO-1184-008 checks only the sort choice and the order under a filter.
- OP-3 (Q-3) Panel total: a prompt cited by both engines counts once, so "All (N)" can be smaller than the sum of the engine tabs. TC-GEO-1184-002 compares the card with the "All" tab only.
- OP-4 (Q-4) Export: assumed never to follow the sort. TC-GEO-1184-009 (Low) is marked "assumed, open question to the PO".
- OP-5 (Q-5) Wording lock: the new strings are not locked in the strings sheet (FR / ES): Sort by, Failing articles, Most prompts, the two menu descriptions, Used in {n} prompts, Used in 1 prompt, Prompts column and the shortened subtitle. The TCs use the GEO-1208 en-GB wording; to confirm at execution.

Other points:

- OP-6 Design decisions with no dedicated TC: the D-2 menu descriptions ("Articles missing or negative about your brand", "Prompts whose answers cite this source") and the D-3 subtitle removal (can be reverted if the PO prefers no change on the default screen). The wording is not locked (Q-5); record what is shown at execution.
- OP-7 D-6: the design does not say whether the "Prompts" column stays in List view when "Failing articles" is selected. TC-GEO-1184-007 step 7 records it without asserting.
- OP-8 Cross-epic: TC-GEO-1118-003 (GEO-152, R1.2) expects "no sort control is offered" in Card / List view. That expectation is outdated once GEO-1184 ships, because the "Sort by" control exists. To align in the R1.2 CSV at the next sync of GEO-152 (not edited here).

## TCs needing special test data or conditions

- **Blocked by data if absent:** TC-GEO-1184-005 (two sources with the same prompt count), TC-GEO-1184-006 (a source used in a single prompt).
- **Export:** TC-GEO-1184-003 and 009 download a .pptx, checked from its XML parts or opened in PowerPoint.
- **Read only:** no analysis is created or modified. The filters changed by TC-GEO-1184-004 and 008 are reset after the run.

## Test cases

### GEO-1184 — [Target Sources] Sort the cards by the number of prompts that use each source

#### TC-GEO-1184-001 - Most prompts sort orders the cards by descending prompt count

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy | **Status:** kept, wording updated
- **Description:** Verify that with "Most prompts" selected in "Sort by" the cards are in descending order of the prompt count shown on them ("Used in N prompts"). Covers AC-1. Wording aligned with GEO-1208 (D-1, D-2, D-4, D-7).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the chosen analysis | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | "Sort by" in the page header, left of the Card view / List view switch, shows "Failing articles"; the cards are sorted by failing articles and each card shows "Used in N prompts" |
| 2 | When the user opens "Sort by" and selects "Most prompts" | Sort by: Most prompts | The list is re-sorted and "Sort by" shows "Most prompts" |
| 3 | Then the cards are in descending order of their prompt count |  | The "Used in N prompts" value never increases from one card to the next |
| 4 | And the ranks are renumbered from 1 |  | The first card shows rank 1 and the ranks run with no gap |

#### TC-GEO-1184-002 - Card prompt count equals the prompts listed in the panel

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy | **Status:** kept, wording updated
- **Description:** Verify that the prompt count on a card ("Used in N prompts") equals the number of prompts listed in "Prompts associated with this source" of its panel, whose "All" tab shows "All (N)" (distinct prompts, all LLMs and locales, not answer citations). Covers AC-2. Wording aligned with GEO-1208 (D-4, D-5).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes the prompt count of the card ranked #1 | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | The card shows "Used in N prompts" |
| 2 | When the user opens its details panel and clicks "Show X more prompts" on the "All" tab of "Prompts associated with this source" |  | The "All" tab reads "All (N)" with the N of the card and the full prompts list is displayed |
| 3 | Then the number of prompt rows equals N |  | The rows of "Prompts associated with this source" equal the card count |

#### TC-GEO-1184-003 - Default sort "Failing articles" and export are unchanged when "Most prompts" is not selected

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy | **Status:** kept, wording updated, steps 4-5 moved to TC-GEO-1184-009
- **Description:** Verify that the default sort "Failing articles" and the export are unchanged when "Most prompts" is not selected. Covers AC-3. Wording aligned with GEO-1208 (D-1, D-2). The export with "Most prompts" selected is checked by TC-GEO-1184-009 (open question Q-4).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source". Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX read from its XML parts or opened in PowerPoint). On 2026-10-06 the Toyota deck had 41 slides with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center with the default sort | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | "Sort by" shows "Failing articles" and the cards are ordered by failing article total (missing + negative), highest first |
| 2 | When the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 3 | Then the Target Sources slide follows the default order |  | The top 3 cards and the table follow the failing article order of the ALL tab |

#### TC-GEO-1184-004 - Most prompts sort applies inside the current tab and scope

- **ACs:** AC-1 (requirement: current tab and scope) | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state | **Status:** kept, wording updated
- **Description:** Verify that the "Most prompts" sort applies within the current verdict tab and the current scope and period, like the default sort. Covers AC-1 within the current tab and scope (requirement "the sort applies within the current tab ... and the current scope and period", not a numbered AC). Wording aligned with GEO-1208 (D-2, D-4, D-7: ranks restart at 1 in each tab).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "Most prompts" is selected in "Sort by" on the ALL tab | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | The cards are sorted by prompt count |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab |  | Only perception sources are listed |
| 3 | Then the perception sources are in descending order of their prompt count |  | The "Used in N prompts" value never increases from one card to the next and the ranks restart at 1 |
| 4 | When the user keeps a single country in the countries filter |  | The list is recomputed for that country |
| 5 | Then the prompt counts and the order are recomputed in that scope |  | Each card count is lower than or equal to its All Countries count and the order is descending |

#### TC-GEO-1184-005 - Ties of the Most prompts sort are broken by failing articles then domain

- **ACs:** AC-1 (requirement: tie rule) | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge | **Status:** kept, wording updated
- **Description:** Verify that sources with the same prompt count are sorted by failing articles, then by domain. Covers AC-1 tie rule (requirement "Ties are sorted by failing articles, then domain", not a numbered AC). Wording aligned with GEO-1208 (D-2, D-4).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source". The list holds at least two sources with the same prompt count.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "Most prompts" is selected in "Sort by" | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | The cards are sorted by prompt count |
| 2 | When the user locates two cards with the same "Used in N prompts" value |  | Two tied cards are found |
| 3 | Then the card with more failing articles comes first | Failing articles = missing + negative | The tied card with the higher total is ranked above |
| 4 | And cards tied on both counts are sorted by domain |  | The domains are in alphabetical order |

#### TC-GEO-1184-006 - A source used in a single prompt shows the singular "Used in 1 prompt"

- **ACs:** D-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge | **Status:** added
- **Description:** Verify that a card whose source is used in exactly one prompt shows the singular "Used in 1 prompt", never "Used in 1 prompts". Covers design decision D-4 (card count wording, singular form). TC blocked by data if no source with 1 prompt exists in the analyses of the precondition. Design decision GEO-1208 (designer, 2026-10-20), PO: 'design done ready for dev' (2026-10-22) — to confirm at execution
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source". At least one target source used in a single prompt in the period (read at execution in the last cards of the "Most prompts" order; another analysis of the precondition may be used; TC blocked by data if none).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "Most prompts" is selected in "Sort by" and all the cards are displayed | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days", "Show X more sources" clicked until no button is left | The last cards show the lowest prompt counts |
| 2 | When the user locates a card whose source is used in a single prompt |  | A card with a prompt count of 1 is found (if none in any analysis of the precondition, the TC is blocked by data) |
| 3 | Then the card shows the singular wording |  | "Used in 1 prompt", never "Used in 1 prompts" |
| 4 | And its details panel lists exactly one prompt |  | The "All" tab of "Prompts associated with this source" reads "All (1)" and one prompt row is listed |

#### TC-GEO-1184-007 - List view shows a "Prompts" column after "Articles" with a descending indicator while Most prompts is active

- **ACs:** D-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy | **Status:** added
- **Description:** Verify that in List view a "Prompts" column is shown right after "Articles", with a descending indicator while "Most prompts" is active, and that clicking the column header does not sort (header-click sorting not part of GEO-1184). Covers design decision D-6. Design decision GEO-1208 (designer, 2026-10-20), PO: 'design done ready for dev' (2026-10-22) — to confirm at execution
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "Most prompts" is selected in "Sort by" in Card view | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | The cards are sorted by prompt count |
| 2 | When the user switches to List view | Card view / List view switch | The sources are shown as table rows in the same order as the cards and "Sort by" still shows "Most prompts" |
| 3 | Then the table shows a "Prompts" column right after "Articles" |  | The "Prompts" column header is placed immediately after the "Articles" header |
| 4 | And the "Prompts" header shows a descending indicator |  | A descending sort indicator is displayed on the "Prompts" header only |
| 5 | And the "Prompts" values match the card counts and never increase from one row to the next |  | Row 1 shows the N of "Used in N prompts" of card 1 and the values are in descending order |
| 6 | When the user clicks the "Prompts" column header |  | The row order does not change (header-click sorting not part of this ticket) |
| 7 | And the user selects "Failing articles" in "Sort by" |  | The rows follow the failing article order and no descending indicator is shown on "Prompts" (record whether the "Prompts" column stays displayed, not stated by the design) |

#### TC-GEO-1184-008 - Sort choice is kept across tabs, views, filters and Show more, and resets to Failing articles on the next visit

- **ACs:** D-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state | **Status:** added
- **Description:** Verify that the "Most prompts" choice is kept when switching tabs, views and filters and while paging with "Show X more sources", and that it resets to the default "Failing articles" on the next visit (page reload, or leaving the Action Center and coming back). Covers design decision D-7. Only the sort choice and the order are checked: whether the count follows the AI engine and country filters is an open question (Q-2). Design decision GEO-1208 (designer, 2026-10-20), PO: 'design done ready for dev' (2026-10-22) — to confirm at execution
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "Most prompts" is selected in "Sort by" on the ALL tab in Card view | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | The cards are sorted by prompt count |
| 2 | When the user selects the "IMPROVE VISIBILITY" tab |  | "Sort by" still shows "Most prompts", the cards are in descending prompt count order and the ranks start at 1 |
| 3 | And the user clicks "Show X more sources" if the button is displayed |  | "Sort by" still shows "Most prompts" and the new cards continue the descending prompt count order |
| 4 | And the user keeps a single AI engine in the AI Engines filter | e.g. a single engine of the analysis | "Sort by" still shows "Most prompts" and the cards are in descending prompt count order |
| 5 | And the user switches to List view |  | "Sort by" still shows "Most prompts" and the rows are in descending prompt count order |
| 6 | When the user reloads the page | browser reload (F5) | "Sort by" shows "Failing articles" and the sources are ordered by failing articles |
| 7 | And the user selects "Most prompts", opens another page of the analysis and comes back to the Action Center | e.g. the analysis Overview, then the Action Center from the navigation | "Sort by" shows "Failing articles" and the sources are ordered by failing articles |

#### TC-GEO-1184-009 - Export does not follow the Most prompts sort

- **ACs:** AC-3 extended (Q-4) | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge | **Status:** added (takes over steps 4-5 of TC-GEO-1184-003)
- **Description:** Verify that the export keeps the default failing article order even when "Most prompts" is selected on screen. Covers AC-3 extended to "Most prompts" selected (designer open question Q-4: the export is assumed never to follow the sort; assumed, open question to the PO). Takes over steps 4-5 of the R1.2 version of TC-GEO-1184-003. Design decision GEO-1208 (designer, 2026-10-20), PO: 'design done ready for dev' (2026-10-22) — to confirm at execution
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A BRAND analysis with Target Sources in the Action Center, used read only (e.g. Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, Nike cce7a7dc-7519-446f-b6d9-d6dc60598835 or Decathlon b6c8b664-e146-464a-bbd7-78d9deb99926; the user may pick another one at execution), Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values (no hard-coded numbers). Design wording from GEO-1208 (designer, 2026-10-20; PO "design done ready for dev", 2026-10-22): sort control "Sort by" in the page header, left of the Card view / List view switch, values "Failing articles" (default) and "Most prompts"; card line "Used in N prompts"; panel tab "All (N)" in "Prompts associated with this source". Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX read from its XML parts or opened in PowerPoint). On 2026-10-06 the Toyota deck had 41 slides with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has exported the analysis as "Presentation .pptx" with "Failing articles" selected in "Sort by" | Action Center https://staging-geo.onclusive.com/geo/dashboard/{uuid}/actions of the chosen analysis - period "Last 7 days" | A .pptx file is downloaded and the order of the Target Sources slide (top 3 cards and table) is noted |
| 2 | When the user selects "Most prompts" in "Sort by" |  | The cards are re-sorted by prompt count |
| 3 | And the user exports the analysis again as "Presentation .pptx" |  | A .pptx file is downloaded |
| 4 | Then the exported order is not affected by the on-screen sort |  | The Target Sources slide order is the same as in step 1 (assumed, open question to the PO) |

