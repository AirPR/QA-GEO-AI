### QA Test Plan for GEO-1498 — Natural Answer Display in the Question Panel

**Updated:** 2026-11-13 | **Source CSV:** pending | **Status:** Approved 2026-11-13

**Objective:** Verify that the question panel lets the user read the full answer an engine gave and check every extracted result against it: the panel opens on a row click only, as a 470px full-height drawer that behaves like the Target Sources drawer in both shells; the answer card clamps long answers at about 8 lines with "Show full answer", renders rich content, counts characters and keeps the question and the engine pinned; every ranked brand is highlighted and a ranking row scrolls to its first mention; the result card, the answer, the section "Extracted from this answer" and the sources come in that order; inline citations share one numbering with the Sources card and the Excel export; a failed extraction or a not counted answer changes only its own block. Competitive answers move to four outcomes (Chosen, Conditional, Not chosen, Overlooked) on the AI Choice donut card, the questions table, the engine pills, the outcome cards and Brand Rankings, the metric is named AI Choice everywhere with new definitions and a new Share of Voice tooltip, and the Excel Raw Data sheet carries the full answer, a new "Ranking" column and no Favorability column. Analyses run before this epic keep their excerpt and stored places. Images in the answer card (GEO-1608) are not part of this plan.

#### Test Scenarios & Detailed Test Cases

**Question Panel Drawer (stories: GEO-1572)**

- Scenario 1: Drawer Over the Page - Verify that a click on a row of the questions table opens the question panel as a full-height drawer over the page and the host top bar (frame 09) instead of inline next to a shrinking table.
- Scenario 2: No Auto-Open - Verify that opening a category view opens no question by itself and that the panel opens only on a row click.
- Scenario 3: Standalone Shell Behaviour - Verify in the standalone shell that the drawer renders as in Onclusive Social with the GEO sidebar, top bar, organisation control and user menu mounted, and behaves like the Target Sources drawer (native dialog, focus trap, arrow keys to the previous or next question) (PO 870232).
- Scenario 4: Onclusive Social Shell - Verify in the Onclusive Social native shell that only its top bar is mounted, and that the drawer and the citation mini card follow its GEO-1017 frame with the focus trap and the arrow keys.
- Scenario 5: Drawer Width - Verify that the drawer is 470px wide in both shells.
- Scenario 6: Header at the Top of the Drawer - Verify that the sticky panel header sits at the top of the drawer, which covers the host top bar, as in frame 09.
- Scenario 7: Focus Back on Close - Verify that closing the drawer with Escape, the close button or a click on the backdrop returns the focus to the question row (dev 876232).

**Full Answer Card (stories: GEO-1564 & GEO-1565)**

- Scenario 8: Long Answer Clamped - Verify that an answer longer than about 8 lines shows its first 8 lines behind a fade with a "Show full answer" link.
- Scenario 9: Short Answer in Full - Verify that an answer shorter than the clamp shows in full with no expand control and no clipped line.
- Scenario 10: Expand in Place - Verify that "Show full answer" expands the answer in place, the panel scrolls internally and its width does not change.
- Scenario 11: Show Less Scrolls Back - Verify that "Show less" at the bottom collapses the answer and scrolls the panel back to the top of the answer card.
- Scenario 12: Rich Content Renders - Verify that headings, bold text, numbered and bulleted lists, tables, long URLs and code blocks render as formatted content with nothing overflowing the panel width (numbered lists keep their numbers).
- Scenario 13: Stable Layout Across Engines - Verify that switching between engine tabs with very different answer lengths keeps the header, tags, engine tabs and verdict at the same position and that a short answer ends with no empty space.
- Scenario 14: Character Count - Verify that the answer header counts characters, not words, including for a Japanese or Chinese answer.
- Scenario 15: Question and Engine Pinned - Verify that scrolling an expanded answer keeps the question pinned at the top with the engine of the answer, with no gap between the header and the engine tabs.
- Scenario 16: Engine Switch Opens Clamped - Verify that switching engine tab from an expanded answer opens the new tab clamped and at the top.

**Tracing Results Back to the Answer (stories: GEO-1566)**

- Scenario 17: Every Ranked Brand Highlighted - Verify that every brand of the extracted ranking is highlighted in the answer, the tracked brand with its own style, and that brand names inside a table of the answer are not highlighted (PO 870232).
- Scenario 18: Other Names Highlighted - Verify that a name the engine uses for a brand that differs from the analysis (e.g. "Claude" for Anthropic) is highlighted as that brand.
- Scenario 19: Ranking Row Scrolls to the Mention - Verify that a click on a ranking row (or Enter or Space on it) expands the answer if needed and scrolls to the first mention of the brand, visible under the engine tabs, and highlights it.
- Scenario 20: Outcome Card Instead of Ranking - Verify that a Competitive question shows the outcome card and no ranking, that clicking a brand of the card scrolls to its first mention, that the "About {brand}" card is gone and that no brand carries a text badge or a chosen style of its own.
- Scenario 21: Brand Family With the Engine's Name - Verify that a brand in the outcome card or the ranking shows its brand family with the name the engine wrote below it when it differs (e.g. "BTL Aesthetics", then "Emsculpt Neo").
- Scenario 22: Unbranded Competitive Panel - Verify that in an unbranded analysis each engine tab shows the full answer then "{brand} was chosen" for a pick with no condition (frame 10g), otherwise one card per brand picked under a condition (frame 10h), with no result card above the answer and no pill badge.
- Scenario 23: No Brands Named Verdict - Verify that a Visibility answer naming no brand shows in full with the verdict "No brands named" on the red card, the line "{engine} answered without naming any brand, so this answer has no ranking." and no ranking rows.
- Scenario 24: Extracted From Labels - Verify that the result card carries "Extracted from {engine}'s answer" and that every block below the answer sits in the section "Extracted from this answer".
- Scenario 25: Panel Order and Subtitles - Verify that the panel shows the result card, the answer card, the section "Extracted from this answer" and the sources in that order, with the subtitle of each question type (Visibility, Competitive Chosen and Not chosen, Conditional and Overlooked, unbranded, Perception themes as grey text-only tags).
- Scenario 26: Nothing to Extract - Verify that "No brands named" and not counted answers show no section "Extracted from this answer", the sources following the answer card (frames 04f, 04d).
- Scenario 27: Brand Logos and Family Rows - Verify that each ranking row shows the brand's logo, the tracked brand included (from the report's domain) and competitors found by name, that the tracked brand row keeps its highlight, that every brand named is listed with no top-5 cap, and that products fold into one row per brand family at its best rank (PO 876328).
- Scenario 28: Older Dates One Row per Family - Verify that a Visibility panel of a date collected before natural answers shows one row per brand family numbered 1, 2, 3… with no gap, with the ranked product below the brand when it differs (e.g. "Toyota", then "Toyota Prius").
- Scenario 29: Position Card Names the Brand - Verify that the position card reads "{brand}'s Position", never a product name, and that the rank on the card, on the engine tab and on the brand's row is the same number.
- Scenario 30: Older Dates Keep Stored Places - Verify that for dates collected before natural answers Average Position, Brand Rankings, the questions table and the Excel export keep the stored places.

**Inline Citations and Sources (stories: GEO-1567)**

- Scenario 31: Shared Numbering - Verify that the citation markers [n] of an answer use the numbering of the Sources card of the panel.
- Scenario 32: Renumbered by First Citation - Verify that an answer citing [1] [4] [2] [5] shows [1] [2] [3] [4] in order of first citation, every marker takes the number of its source, and the Sources card and the Excel export use the same numbers.
- Scenario 33: Citation Mini Card - Verify that hovering or clicking a marker shows a mini card with the source title, the domain and "Source {n} of {total}", and highlights the matching row of the Sources card.
- Scenario 34: Same Page, One Number - Verify that two markers pointing to the same page show the same number and the page appears once in the Sources card.
- Scenario 35: Other Sources Cards Unchanged - Verify that the Sources cards of the Brand Image panel, the concept detail and the citation details keep today's behaviour.
- Scenario 36: Cited Sources First - Verify that the Sources card lists the sources the engine used for the answer, the sources cited in the text first with their numbers, then the others without a number.
- Scenario 37: Marker Opens the Full List - Verify that a marker pointing to a source outside the visible rows opens the full list on that source and highlights it.
- Scenario 38: Citation Count - Verify that "{n} citations" in the answer header equals the number of numbered sources in the Sources card.
- Scenario 39: All Sources Count - Verify that "All sources {n}" counts every source the engine used for the answer, cited in the text or not.
- Scenario 40: Excluded Source Marker - Verify that a marker pointing to a page of a domain excluded from the report is removed from the text and gets no number (PO 870232).

**Panel States and Parsing Failures (stories: GEO-1568)**

- Scenario 41: One Failed Block - Verify that when one extraction failed only that block changes, keeping its title and showing one amber italic line, while the answer and the other blocks render normally.
- Scenario 42: Failed Extraction Not Shown as a Loss - Verify that an engine whose ranking or outcome failed is counted neither as unranked nor as not chosen in the questions table and the metrics.
- Scenario 43: Failed Date Line - Verify that the failed block reads "{Themes} could not be extracted from this answer. The next analysis run extracts its own answers; this date stays as it is." and never "will retry on the next analysis run".
- Scenario 44: Not Counted Engine Tab - Verify that an empty, cut or refused answer marks its pill "Not counted", its tab says "{engine} returned no answer for this run" and no extracted block shows.
- Scenario 45: Analysis Run Before This Epic - Verify that a question of an analysis run before this epic shows the tracked brand's excerpt with no clamp, no character count and no highlight, and the extracted blocks and sources as for any other answer.
- Scenario 46: Loading, Pending and Error States - Verify the skeleton of frame 04e while loading, "Analysis pending" for an engine added after the last run and the error with Retry when the panel fails to load, with no extracted block in the last two.
- Scenario 47: No Inline Citations - Verify that an answer with no inline citation shows in full with "no inline citations" in its header.
- Scenario 48: Legacy Excerpt Preview - Verify that an excerpt of an analysis run before this epic keeps its 500-character preview with "Show more", while a full answer uses the 8-line clamp (dev 876571).

**Excel Raw Data (stories: GEO-1569)**

- Scenario 49: Full Answer in Response - Verify that the "Response" column of the Raw Data sheet carries the full answer of each engine for every question type of an analysis with natural answers.
- Scenario 50: Ranking Column for Visibility - Verify that a Visibility row carries its brand ranking in a new "Ranking" column next to "Response", in today's format with every brand listed and no 10-brand cap, and "No brands named" for a counted answer naming no brand (PO 870232).
- Scenario 51: Competitive Response and Ranking - Verify that a Competitive row carries the full answer instead of the "About {brand}" and "About winner" text, and the outcome followed by the picked brand or brands in "Ranking" (e.g. "Conditional · Decathlon").
- Scenario 52: N/A for Other Types - Verify that Perception, Other and Brand Image rows read "N/A" in the "Ranking" column.
- Scenario 53: Brand Image Rows - Verify that a Brand Image question keeps one row per dimension with the dimension bullets in "Response", as today.
- Scenario 54: Older Analysis Columns - Verify that an analysis run before this epic exports the same columns, "Ranking" included, its Visibility rows showing the ranking in both "Response" and "Ranking".
- Scenario 55: Markers and Source URLs - Verify that markers [n] stay in the text, the "Source URLs" column lists the cited sources in the panel's numbering then the uncited ones without a number, and a URL that does not fit the cell does not shift the numbers after it.
- Scenario 56: Not Counted Natural Rows - Verify that a not counted natural answer (cut, refused, empty) has no row, while rows of analyses run before this epic that read "No ranking returned" or "No usable content returned" stay (PO 870232).
- Scenario 57: Favorability Column Removed - Verify that the Raw Data sheet has no "Favorability" column and no green or red row tint (PO 870232).
- Scenario 58: Long Answer Shortened - Verify that an answer longer than an Excel cell holds is shortened and marked like any other long cell of the export.

**Four Competitive Outcomes (stories: GEO-1570)**

- Scenario 59: Four Labels in Three Languages - Verify that an outcome shows as "Chosen", "Conditional", "Not chosen" or "Overlooked", in French "Choisie", "Sous conditions", "Non choisie", "Ignorée" and in Spanish "Elegida", "Condicional", "No elegida", "Ignorada".
- Scenario 60: AI Choice Donut Card - Verify that the AI Choice KPI card keeps the KPI layout with a four-part amber donut (Chosen #F59E0B, Conditional #FCD34D, Not chosen #CBD5E1, Overlooked #E2E8F0, amber icon) on the Overview and the category view, its value being Chosen plus Conditional.
- Scenario 61: Donut Hover - Verify that hovering the AI Choice donut shows the number and share of answers in each of the four outcomes.
- Scenario 62: Winner Cell Shows My Brand - Verify that a competitive row whose counted engines are all Chosen, or mix Chosen and Conditional, shows my brand with its logo in "Winner / Themes".
- Scenario 63: Conditional Badge - Verify that a row whose counted engines are all Conditional shows "Conditional" in the green badge (green-50 fill, green-200 border, green-700 text).
- Scenario 64: Competitor Winner - Verify that a row whose counted engines are all Not chosen with the same competitor picked with no condition shows that competitor with its logo.
- Scenario 65: Not Chosen Text - Verify that a row whose counted engines are Not chosen with different picks, or mix Not chosen and Overlooked, shows "Not chosen" in plain grey text (e.g. Gemini picks UPS, ChatGPT gives UPS and FedEx the conditions).
- Scenario 66: Overlooked Badge - Verify that a row whose counted engines are all Overlooked shows "Overlooked" in the red badge (red-50 fill, red-200 border, red-700 text).
- Scenario 67: Split - Verify that a row mixing a Chosen or Conditional engine with a Not chosen or Overlooked one shows "Split".
- Scenario 68: Unbranded Winner Cell - Verify that an unbranded competitive row shows the brand every counted engine chose with no condition, otherwise "Split".
- Scenario 69: Not Counted Engine Left Out - Verify that an engine not counted, or whose outcome failed, is left out of the cell, the favorability and AI Choice.
- Scenario 70: Not Counted Chip - Verify that a row with no counted engine shows the grey "Not counted" chip and is neither Favorable nor Not favorable in the filter and the header bar, and left out of the "Favorable %" (PO 870232).
- Scenario 71: Favorability Filter - Verify that Favorable means every counted engine is Chosen or Conditional, Not Favorable every counted engine Not chosen or Overlooked, and Split a mix, in the filter and the header bar.
- Scenario 72: Engine Pill Outcome Badge - Verify that each engine pill of a competitive question shows its outcome in the rank badge place and size (emerald for Chosen and Conditional, red for Not chosen and Overlooked, grey "Not counted"), compact form included.
- Scenario 73: Outcome Card Titles - Verify that the card is titled "{brand}'s results - {engine}" with the outcome as its headline, green for Chosen and Conditional, red for Not chosen and Overlooked, with no text badge.
- Scenario 74: Conditional and Overlooked Cards - Verify that a Conditional or Overlooked card shows the outcome only, with no condition per brand.
- Scenario 75: Not Chosen Card - Verify that a Not chosen card shows "Not chosen" and "{brand} was chosen" for each picked brand.
- Scenario 76: Not Counted Tab Text - Verify that a not counted answer shows "{engine} returned no answer for this run" without the "may not have responded yet" line.
- Scenario 77: Brand Rankings AI Choice Column - Verify that the AI Choice column shows Chosen plus Conditional with no tooltip on the value, "—" for a brand with no outcome in the scope, no win for a brand that is not configured, and 0% for a configured brand never chosen.

**AI Choice Name and Tooltips (stories: GEO-1571)**

- Scenario 78: AI Choice Name Everywhere - Verify that the competitive metric is named "AI Choice" ("Choix IA", "Elección de IA") with the same capitalisation in the trend graph, the upsell KPI, gate and results, the unbranded Brand Rankings tooltip in 4 locales, PowerPoint and PDF, and that the upper-case "AI CHOICE" headers stay (PO 870232).
- Scenario 79: AI Choice Definitions - Verify that the KPI and Brand Rankings tooltips give the branded and unbranded definitions of Chosen plus Conditional in English, French and Spanish, as decided (PO 870232).
- Scenario 80: Share of Voice Tooltip - Verify that an info icon next to the "Share of Voice" chart title of the Overview and the category view of a brand analysis shows the new text in en-GB, en-US, French and Spanish (PO 870232).

#### Edge Cases & Boundary Conditions

* Answer just under the clamp: shown in full, no control; just over: first 8 lines, fade and "Show full answer".
* Japanese or Chinese answer: the header counts characters.
* Citations out of order or skipping numbers ([1] [4] [2] [5]): renumbered 1 to n by first citation in the panel and in Excel.
* Two markers to the same page: one number, one row in the Sources card.
* Marker to a domain excluded from the report: removed, no number (PO 870232).
* Brand named only inside a table of the answer: not highlighted.
* Answer naming no brand, or not counted: no section "Extracted from this answer".
* Competitive row with no counted engine: grey "Not counted" chip, neither Favorable nor Not favorable, out of "Favorable %".
* Mix of Not chosen and Overlooked: "Not chosen"; mix of Chosen or Conditional with Not chosen or Overlooked: "Split".
* Brand with no outcome in the scope: "—"; configured brand never chosen: 0%; brand not configured: no win.
* Competitor logo found by name can be another company's logo (accepted by the PM, 876328).
* Analysis run before this epic: excerpt as today, a win reads Chosen and a loss Not chosen, stored places kept, Raw Data rows "No ranking returned" kept.
* Answer longer than an Excel cell: shortened and marked like any long cell.

#### Open Points (not blocking)

* GEO-1498 / GEO-1562: how one analysis date mixing an engine switched to natural answers and an engine still structured is displayed is not answered (870232 point 7, 876544, 876571); no scenario until it is.
* GEO-1567 / GEO-1564: FR / ES copy of the citation strings (P1), AC5 "two numbers per row" (P2) and the clamp at 184 px / 8 lines (D1) are built at proposed defaults not yet confirmed by the PO and design; Scenario 8, Scenario 33 and Scenario 36 test these defaults as pending.
* GEO-1608: the images of the answer card (frames 08a, 08b) have ACs to be revised with the PM; no scenario in this plan.
* GEO-1571 AC2: the Share of Voice tooltip placement (info icon next to the chart title) is a PO decision (870232) not written in the AC text.
* Prerequisite: staging analyses with natural answers for every question type and engine, an unbranded analysis, an analysis run before the release, answers with tables, code blocks, out-of-order citations, an excluded source domain, a Japanese or Chinese answer, and competitive questions giving each outcome mix of the table.
* Prerequisite: access to the Onclusive Social native shell on staging for Scenario 4, and FR / ES interface for Scenario 59, Scenario 78, Scenario 79, Scenario 80, restoring en-GB after.

**Environment:** Staging (https://staging-geo.onclusive.com/geo), org QA-GEO, interface en-GB checked with GET /geo/api/v1/auth/me (FR and ES only for the string scenarios, then en-GB restored).

**Priority:** High

#### AC Coverage by Story

Result: **73 / 79 functional ACs covered** (GEO-1564 7/7, GEO-1565 2/2, GEO-1566 14/14, GEO-1567 9/9, GEO-1568 5/5, GEO-1569 9/9, GEO-1570 19/19, GEO-1571 2/2, GEO-1572 6/6, GEO-1608 0/6); the ACs with no scenario are flagged "No" with their reason and listed in Open Points, and "No — dev evidence" marks a scenario that needs dev evidence rather than the UI. Technical ACs are not mapped one by one: the observable ones are covered by the scenarios of their story, the others need dev evidence. "Partial" = only the visible output is testable.

**GEO-1564 — Read the full answer in the question panel**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Long answer clamped | 8 | Yes (184 px / 8 lines pending, open point) |
| AC2 | Short answer in full | 9 | Yes |
| AC3 | Expand in place | 10 | Yes |
| AC4 | Collapse scrolls back | 11 | Yes |
| AC5 | Rich content | 12 | Yes |
| AC6 | Stable layout across engines | 13 | Yes |
| AC7 | Character count | 14 | Yes (CJK data needed) |

**GEO-1565 — Keep the question and the engine visible while reading**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Question and engine pinned | 15 | Yes |
| AC2 | New tab clamped and at the top | 16 | Yes |

**GEO-1566 — Trace the extracted results back to the answer**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Every ranked brand highlighted | 17 | Yes |
| AC2 | Other names highlighted | 18 | Yes |
| AC3 | Row scrolls to first mention | 19 | Yes |
| AC4 | Outcome card, no About card | 20 | Yes |
| AC5 | Brand family with engine name | 21 | Yes |
| AC6 | Unbranded competitive panel | 22 | Yes |
| AC7 | No brands named | 23 | Yes |
| AC8 | Extracted from labels | 24 | Yes |
| AC9 | Order and subtitles | 25 | Yes |
| AC10 | Nothing to extract | 26 | Yes |
| AC11 | Logos, no cap, family rows | 27 | Yes |
| AC12 | Older dates one row per family | 28 | Yes |
| AC13 | Position card names the brand | 29 | Yes |
| AC14 | Older dates keep stored places | 30 | Yes |

**GEO-1567 — Resolve inline citations to their sources**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Shared numbering | 31 | Yes |
| AC2 | Renumbered by first citation | 32 | Yes (data needed) |
| AC3 | Mini card | 33 | Yes (FR / ES copy pending) |
| AC4 | Same page, one number | 34 | Yes |
| AC5 | Other Sources cards unchanged | 35 | Yes |
| AC6 | Cited first, then the others | 36 | Yes (two numbers per row pending) |
| AC7 | Marker opens the full list | 37 | Yes |
| AC8 | Citation count | 38 | Yes |
| AC9 | All sources count | 39 | Yes |

**GEO-1568 — Keep the answer readable when parsing fails**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One failed block | 41 | Partial (failure to be forced) |
| AC2 | Left out of the metric | 42 | Partial (failure to be forced) |
| AC3 | Failed date line | 43 | Partial (failure to be forced) |
| AC4 | Not counted | 44 | Yes |
| AC5 | Analysis run before this epic | 45, 48 | Yes |

**GEO-1569 — Export the full answer to Excel**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Full answer in Response | 49 | Yes |
| AC2 | Ranking column, Competitive text | 50, 51 | Yes |
| AC3 | Outcome and picked brands | 51 | Yes |
| AC4 | N/A | 52 | Yes |
| AC5 | Brand Image rows | 53 | Yes |
| AC6 | Older analysis | 54 | Yes |
| AC7 | Markers, Source URLs, rows removed | 55, 56 | Yes |
| AC8 | Favorability removed | 57 | Yes |
| AC9 | Long answer shortened | 58 | Yes (data needed) |

**GEO-1570 — Show the competitive outcome in four buckets**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Four labels | 59 | Yes |
| AC2 | AI Choice donut card | 60 | Yes |
| AC3 | Donut hover | 61 | Yes |
| AC4 | My brand in the cell | 62 | Yes |
| AC5 | Conditional badge | 63 | Yes |
| AC6 | Competitor winner | 64 | Yes |
| AC7 | Not chosen text | 65 | Yes |
| AC8 | Overlooked badge | 66 | Yes (test data, GEO-678 open point) |
| AC9 | Split | 67 | Yes |
| AC10 | Unbranded cell | 68 | Yes |
| AC11 | Not counted engine left out | 69 | Yes |
| AC12 | Not counted chip | 70 | Yes |
| AC13 | Favorability filter | 71 | Yes |
| AC14 | Engine pill badge | 72 | Yes |
| AC15 | Outcome card titles | 73 | Yes |
| AC16 | Conditional and Overlooked cards | 74 | Yes |
| AC17 | Not chosen card | 75 | Yes |
| AC18 | Not counted tab | 76 | Yes |
| AC19 | Brand Rankings AI Choice | 77 | Yes |

**GEO-1571 — Name the competitive metric AI Choice everywhere**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | AI Choice name and definitions | 78, 79 | Yes |
| AC2 | Share of Voice tooltip | 80 | Yes |

**GEO-1572 — Open the question panel as a drawer in both shells**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Full-height drawer | 1 | Yes |
| AC2 | No auto-open | 2 | Yes |
| AC3 | Standalone shell | 3, 7 | Yes |
| AC4 | Onclusive Social shell | 4 | Yes (shell access needed) |
| AC5 | 470px | 5 | Yes |
| AC6 | Header at the top | 6 | Yes |

**GEO-1608 — Show the images of the answer card (no fixVersion)**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1–AC6 | Images, captions, fullscreen viewer | — | No — ACs to be revised with the PM (open point) |
