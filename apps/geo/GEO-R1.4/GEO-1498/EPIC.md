# Natural Answer Display in the Question Panel

**Epic ID:** GEO-1498
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Fix version:** 1.4
**Created:** 2026-10-19
**Updated:** 2026-11-13
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1498

## Description / Functional Need

With Natural Answer Parsing (EPIC-027, GEO-678), engines answer the way they would for a real user and the ranking, the competitive outcome, the perception themes and the sources are extracted from that answer afterwards. The stored answer becomes full prose: several paragraphs, lists, inline citation markers, and lengths that vary a lot between engines (24 words for Claude against 442 for ChatGPT in the design examples).

The question panel was built for a short, predictable answer. Today it shows only the text the engine wrote about the brand (Visibility and Competitive) or the extracted answer text (Perception), with the citation tags stripped. It does not hold a full answer.

[CHANGED 27 OCT] This epic owns the display only. The goal is that the user reads the full answer an engine gave and can check every extracted result against it. Competitive answers move from Won / Lost to four outcomes (Chosen, Conditional, Not chosen, Overlooked, defined in GEO-678), so the AI Choice card, the questions table and the question panel change with them. GEO-678 owns the parsing and stays parsing only. GEO-678 blocks this epic: the panel reads its output (outcomes, brand family, Not counted), so any change to that output during the build is reflected here before either ships. The design is GEO-1017 (Figma: Measure - GEO Module, page "Natural answer display").

The architect will go into the implementation details.

---

### Host Shells

The question panel opens from the questions table of a category view. Today it opens inline next to the table, which shrinks to make room. With this epic it becomes a full-height drawer over the page and over the host top bar, as drawn in GEO-1017 (frame 09, and the Unified Platform frame of the second round). It renders the same in both shells, and it opens only when the user clicks a row: no question opens by itself any more (the first-question auto-open of GEO-315 and GEO-345 is removed).

| Shell | How it is selected | Chrome it mounts | Chrome it does NOT mount |
|---|---|---|---|
| Unified Platform, standalone | Onclusive Social native mode off | GEO sidebar, GEO top bar, organisation control, user menu | - |
| Inside Onclusive Social | Onclusive Social native mode on | Onclusive Social top bar only | GEO sidebar, GEO top bar |

- Nothing in this epic needs the settings entry or the organisation control.
- [CHANGED 27 OCT] Inside Onclusive Social, the drawer and the citation mini card follow the Onclusive Social frame of GEO-1017 and behave like the target sources drawer (native dialog, focus trap, arrow keys to the previous or next question), with the same 470px width in both shells.
- The sticky panel header (story 1.2) sits at the top of the drawer, which covers the host top bar in both shells, as in frame 09.

---

### Surfaces and States

Surfaces in scope: the question panel on screen, the AI Choice KPI card, the competitive rows of the questions table, the AI Choice column of Brand Rankings, the name of the metric wherever it appears (prioritization matrices, trend graph, upsell results, PowerPoint and PDF), and the Raw Data sheet of the Excel export.

No change: scheduled emails, and the PowerPoint and PDF ring, which keeps one colour (only the metric name changes there).

States

| State | Answer card | Extracted blocks |
|---|---|---|
| Loading | Skeleton of frame 04e | Skeleton of frame 04e |
| Engine added after the last run | "Analysis pending", as today | Not shown |
| Panel failed to load | Error with Retry, as today | Not shown |
| Full answer, longer than the clamp | Clamped at about 8 lines, "Show full answer" | Rendered |
| Full answer, shorter than the clamp | Shown in full, no control | Rendered |
| One extraction failed | Shown in full | The failed block keeps its title and shows one amber italic line instead of its content |
| Analysis run before this epic shipped | [CHANGED 27 OCT] The tracked brand's excerpt, as today (no full answer is stored for those dates) | Rendered as today, a competitive win shows Chosen and a loss Not chosen |
| Answer that names no brand (Visibility) | Shown in full | Verdict "No brands named", no ranking rows |
| Answer with no inline citations | Shown in full, "no inline citations" in the header | Rendered |
| Answer not counted (cut, refused, empty) | "{engine} returned no answer for this run" | Not shown, engine pill marked "Not counted" |

In the Excel Raw Data sheet, an analysis run before this epic shipped keeps the existing content of the "Response" column, and its "Ranking" column is filled from the stored ranking. The EPIC text is the Excel spec, there is no frame.

Provability

| Label | Produced by |
|---|---|
| "{n} characters · {n} citations" | Number of characters of the answer, number of sources cited in the text |
| "Extracted from {engine}'s answer" | The engine of the selected answer |
| "Source {n} of {total}" | The citation number of the marker and the number of sources cited in the text |
| Brand highlight in the answer | The brand mentions that GEO-678 finds in the answer |

## Scope

- GEO-1564 — STORY-53.1: Read the full answer in the question panel
- GEO-1565 — STORY-53.2: Keep the question and the engine visible while reading
- GEO-1566 — STORY-53.3: Trace the extracted results back to the answer
- GEO-1567 — STORY-53.4: Resolve inline citations to their sources
- GEO-1568 — STORY-53.5: Keep the answer readable when parsing fails
- GEO-1569 — STORY-53.6: Export the full answer to Excel
- GEO-1570 — STORY-53.7: Show the competitive outcome in four buckets
- GEO-1571 — STORY-53.8: Name the competitive metric AI Choice everywhere
- GEO-1572 — STORY-53.9: Open the question panel as a drawer in both shells
- GEO-1608 — STORY-53.10: Show the images of the answer card

### Dependencies

- GEO-678 (Natural Answer Parsing) must give the display, for each answer: the full answer text, the places where each brand is mentioned (including the other names an engine uses for it), the source each citation marker points to, the outcome of a Competitive question for each brand with the brand or brands picked, and which extractions failed or were not counted. Without them stories 1.3, 1.4, 1.5 and 1.7 cannot ship.
- GEO-1017: design of this epic.

## Out of Scope

- The parsing itself (GEO-678).
- [CHANGED 27 OCT] Images inside answers and the fullscreen image viewer (frames 08a and 08b): they come with AI Overviews (GEO-1005) and AI Mode (GEO-1006), which reuse this answer card. The "Not triggered" pill for a prompt with no AI Overview is in GEO-1005.
- Verbatim brand passages per source (GEO-676).

Left to the designer (GEO-1017)

- Nothing left on colours: the ring, the table badges, the tab badges and the cards follow production colours as set in story 1.7.

## Associated Stories & Tasks

| ID | Type | Title | Status | Fix version |
|----|------|-------|--------|-------------|
| GEO-1564 | Story | STORY-53.1: Read the full answer in the question panel | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1565 | Story | STORY-53.2: Keep the question and the engine visible while reading | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1566 | Story | STORY-53.3: Trace the extracted results back to the answer | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1567 | Story | STORY-53.4: Resolve inline citations to their sources | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1568 | Story | STORY-53.5: Keep the answer readable when parsing fails | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1569 | Story | STORY-53.6: Export the full answer to Excel | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1570 | Story | STORY-53.7: Show the competitive outcome in four buckets | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1571 | Story | STORY-53.8: Name the competitive metric AI Choice everywhere | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1572 | Story | STORY-53.9: Open the question panel as a drawer in both shells | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1608 | Story | STORY-53.10: Show the images of the answer card | [BACKLOG] Backlog | none |

Not imported (not Story / Task):

- GEO-1606 — Bug [Done] — [GEO-Category] Prompt detail panel: brands in the ranking of a natural answer show initials instead of their logo
- GEO-1605 — Bug [Done] — [GEO-Category] Prompt detail panel: clicking a ranking row scrolls its mention under the sticky engine tabs
- GEO-1604 — Bug [Done] — [GEO-Category] Prompt detail panel: numbered lists in a natural answer lose their numbers and show an empty bullet line
- GEO-1603 — Bug [Done] — [GEO-Category] Prompt detail panel: closing the drawer by clicking the backdrop leaves the focus on the page body
- GEO-1602 — Bug [Done] — [GEO-Category] Prompt detail panel: the engine tabs leave a 16 px gap under the header once sticky, the answer scrolls through it
- GEO-1601 — Bug [Done] — [GEO-Category] Prompt detail panel: a short natural answer is clipped with no fade and no "Show full answer" link
- GEO-1594 — Bug [Ready for QA] — [GEO-Category] Prompt detail ranking lists the same brand several times instead of folding products into their brand family
- GEO-1017 — Design Task [Done] — Design the natural answer display in the question detail

## Architecture

_No dedicated architecture section in the epic description; see the « Scope note » and technical sections of each story._

## Acceptance Criteria — Summary

_Epic user stories and acceptance criteria, copied verbatim from the epic description. The child stories restate them, sometimes with later changes._

#### User Story 1.1: Read the full answer in the question panel

Story ID: TBD

> As a GEO user, I want to read the full answer an engine gave to a question, so that I see exactly what a real user would get.

Acceptance Criteria:

- Given an answer longer than about 8 lines, When I open the question panel, Then the answer shows its first 8 lines behind a fade with a "Show full answer" link
- Given an answer shorter than the clamp, When I open the panel, Then it shows in full with no expand control
- Given a clamped answer, When I click "Show full answer", Then it expands in place and the panel scrolls internally, the panel width does not change
- Given an expanded answer, When I click "Show less" at the bottom, Then the answer collapses and the panel scrolls back to the top of the answer card
- Given an answer that contains headings, bold text, lists, tables, long URLs or code blocks, When it renders, Then each one renders as formatted content and nothing overflows the panel width
- Given I compare engines with very different answer lengths, When I switch engine tab, Then the header, tags, engine tabs and verdict stay at the same position, and a short answer ends without empty space
- Given the answer header, When it renders, Then it counts characters, not words, so it works the same for Japanese or Chinese answers

#### User Story 1.2: Keep the question and the engine visible while reading

Story ID: TBD

> As a GEO user reading a long answer, I want to always see which question and which engine I am reading, so that I don't lose context while I scroll.

Acceptance Criteria:

- Given an expanded answer, When I scroll the panel, Then the question stays pinned at the top together with the engine of the answer
- Given an expanded answer, When I switch engine tab, Then the new tab opens clamped and at the top, as in GEO-1017

#### User Story 1.3: Trace the extracted results back to the answer

Story ID: TBD

> As a GEO user, I want to see where each extracted result comes from in the answer, so that I can check the ranking, the competitive outcome and the verdict myself.

Acceptance Criteria:

- Given an answer, When it renders, Then the tracked brand and its competitors are highlighted in the text, the tracked brand with its own style, and brand names inside a table of the answer are not highlighted
- Given an engine that names a brand differently from the analysis (eg: "Claude" for Anthropic), When the answer renders, Then that name is highlighted as the brand too
- Given the extracted ranking, When I click a brand row, Then the answer expands if needed, scrolls to the first mention of that brand and highlights it
- [CHANGED 27 OCT] Given a Competitive question, When the panel renders, Then it shows the outcome card of story 1.7 and not a ranking, and clicking a brand of the card scrolls to its first mention in the answer; the "About {brand}" card of today goes, and brands carry no text badge: the tracked brand keeps its highlight, as today (the chosen brand has no style of its own)
- [NEW 27 OCT] Given a brand in the outcome card or the ranking, When it renders, Then it shows the brand family, as the questions table does since GEO-1530, with the name the engine wrote below it when it differs (eg: "BTL Aesthetics", then "Emsculpt Neo"), so the user finds it in the highlighted answer
- [NEW 27 OCT] Given an unbranded analysis (no tracked brand), When the panel of a Competitive question renders, Then each engine tab shows the full answer, then a winner card "{brand} was chosen" when the answer picks one brand with no condition (frame 10g), otherwise one card for each brand the answer picks under a condition, under "Brands the answer picks, derived from the answer above" (frame 10h); there is no result card above the answer and the pill has no badge
- Given a Visibility answer that names no brand, When the panel renders, Then the answer shows in full with the verdict "No brands named" on the red card, the line "{engine} answered without naming any brand, so this answer has no ranking." and no ranking rows; "Unranked" keeps its current meaning in the questions table (no engine names the brand)
- [CHANGED 27 OCT] Given any extracted block (verdict, ranking, competitive outcome, themes), When it renders, Then the result card above the answer carries "Extracted from {engine}'s answer", and every block below the answer sits in the section "Extracted from this answer"
- [NEW 27 OCT] Given the question panel, When it renders, Then it shows from top to bottom: the result card, the answer card, the section "Extracted from this answer", then the sources; the section has one subtitle line that says what it holds: "Brand ranking derived from the answer above" with the ranking rows (Visibility), "Winning brand derived from the answer above" with one brand card (Competitive, Chosen and Not chosen), "Brands the answer picks, derived from the answer above" with one card per brand (Competitive, Conditional and Overlooked, frames 10b and 10d), "Winner derived from the answer above" with the "{brand} was chosen" card (unbranded), "Perception themes derived from the answer above" with one grey tag per theme, text only, no click (Perception, frame 04a), as in GEO-1017 frames 01, 10a, 10b, 10c, 10g and 04
- [NEW 27 OCT] Given an answer with nothing to extract ("No brands named", not counted), When the panel renders, Then the section "Extracted from this answer" is not shown and the sources follow the answer card (frames 04f, 04d); when one extraction failed, the section stays with its subtitle and the amber line of story 1.5 replaces its content (frames 04, 04c, 10f)
- Given the ranking, When it renders, Then each brand shows its own logo, the tracked brand included (instead of today's check mark), the tracked brand row keeps its highlight, and the list shows every brand the answer names (no top-5 cap)

#### User Story 1.4: Resolve inline citations to their sources

Story ID: TBD

> As a GEO user, I want to see which source backs each claim of the answer without leaving the text, so that I can judge the answer quickly.

Acceptance Criteria:

- Given an answer with citation markers [n], When it renders, Then each marker uses one numbering shared with the Sources card of the panel
- Given an engine that numbers its citations out of order or skips numbers (eg: [1] [4] [2] [5]), When the answer renders, Then the sources are renumbered 1 to n in the order they are first cited (here [1] [2] [3] [4]), every marker takes the number of its source, and the Sources card and the Excel export use the same numbers
- Given a citation marker, When I hover or click it, Then a mini card shows the source title, the domain and "Source {n} of {total}", and the matching row in the Sources card is highlighted
- Given two markers that point to the same page, When the answer renders, Then both markers show the same number and the page shows once in the Sources card, with that one number
- Given the numbering, the two numbers per row and the opening of the full list on a source, When they are built, Then they apply to the Sources card of the question panel only, and the other surfaces that use the Sources card (Brand Image panel, concept detail, citation details) stay as today
- Given the Sources card, When it renders, Then it lists the sources the engine used for this answer, the sources cited in the text first with their numbers, then the others without a number
- Given a marker that points to a source outside the visible rows of the Sources card, When I click it, Then the full list opens on that source and highlights it
- Given the answer header, When it shows "{n} citations", Then the count matches the numbered sources in the Sources card
- Given the Sources card, When it shows "All sources {n}", Then the count includes every source the engine used for this answer, cited in the text or not

#### User Story 1.5: Keep the answer readable when parsing fails

Story ID: TBD

> As a GEO user, I want to read the answer even when part of it could not be parsed, so that one failed extraction never hides the rest.

Acceptance Criteria:

- Given an answer where one extraction failed (eg: perception themes, ranking, competitive outcome), When the panel renders, Then only that block changes: it keeps its title and shows one amber italic line instead of its content, as Corporate Reputation does for "AI consolidation unavailable", and the answer and the other blocks render normally
- Given an extraction that failed, When the analysis metrics are computed, Then that answer is left out of the metric the extraction feeds, it is not counted as unranked or not chosen
- Given an extraction that failed, When the next analysis run happens, Then the new run extracts it again from its own answers, and the analysis date where it failed keeps its line, which reads "{Themes} could not be extracted from this answer. The next analysis run extracts its own answers; this date stays as it is." (never "will retry on the next analysis run")
- Given an engine answer that is empty, cut or refused, When I open its tab, Then it is not counted: the pill is marked "Not counted", the panel says "{engine} returned no answer for this run" and shows no extracted block
- [CHANGED 27 OCT] Given an analysis run before this epic shipped, When I open a question, Then the answer card shows the tracked brand's excerpt as today, as no full answer is stored for those dates, with no clamp, no character count and no highlight, and the extracted blocks and sources show as for any other answer

#### User Story 1.6: Export the full answer to Excel

Story ID: TBD

> As a GEO user, I want the full answer of each engine in the Excel export, so that I can read and share the answers outside the product.

Acceptance Criteria:

- Given an analysis run with natural answers, When I export it to Excel, Then the "Response" column of the Raw Data sheet carries the full answer of each engine for every question type
- Given a Visibility question, When it is exported, Then the brand ranking that the "Response" column carries today moves to a new "Ranking" column next to it, in the same format; for a Competitive question the full answer replaces the "About {brand}" and "About winner" text the cell has today
- Given a Competitive question, When it is exported, Then the "Ranking" column carries the outcome (Chosen, Conditional, Not chosen or Overlooked) followed by the brand or brands the answer picks
- Given a Perception, Other or Brand Image question, When it is exported, Then the "Ranking" column says "N/A", as the other cells of the export
- Given a Brand Image question, When it is exported, Then its rows keep one row per dimension with the dimension bullets in the "Response" column, as today
- [CHANGED 27 OCT] Given an analysis run before this epic shipped, When I export it, Then the Raw Data sheet has the same columns as a new analysis, including "Ranking"; a Visibility row keeps the ranking its "Response" carries today, so the ranking shows in both columns
- [CHANGED 27 OCT] Given an answer with citation markers, When it is exported, Then the markers [n] stay in the text and the "Source URLs" column lists the cited sources in the same numbering, then the uncited ones without a number; the numbering is the panel's (one number per page), so a URL that does not fit the cell does not shift the numbers after it; answers that are not counted no longer appear (today they show as "No ranking returned" or "No usable content returned")
- [NEW 27 OCT] Given the Raw Data sheet, When it is exported, Then the "Favorability" column is removed: the outcome and the ranking columns carry that information
- Given an answer longer than an Excel cell can hold, When it is exported, Then it is shortened and marked the same way as any other long cell of the export today

#### User Story 1.7: Show the competitive outcome in four buckets

Story ID: TBD

> As a GEO user, I want to see when engines choose my brand, choose it only in some cases, or do not choose it, so that I understand how strong my position is in head-to-head questions.

Acceptance Criteria:

- Given a competitive outcome, When it is shown anywhere, Then it uses one of four labels: "Chosen", "Conditional", "Not chosen", "Overlooked" (French: "Choisie", "Sous conditions", "Non choisie", "Ignorée"; Spanish: "Elegida", "Condicional", "No elegida", "Ignorada")
- [CHANGED 27 OCT] Given any place that shows the competitive metric, When it renders, Then the metric is named "AI Choice" (French "Choix IA", Spanish "Elección de IA"), with the same capitalisation everywhere: the matrix tooltips are already renamed (GEO-1524); this replaces "AI choice" in PowerPoint, "Choix de l'IA" and "Elección de la IA" in the trend graph, "Elección IA" in the Spanish upsell KPI and its upgrade gate, the unbranded Brand Rankings tooltip in 4 locales, "LLM Choice %" in the upsell results "AI choice" in the trend graph, "Choix LLM %" and "Elección LLM %" in the upsell rankings, "LLM choice" in PowerPoint and PDF, and the definitions of the KPI and Brand Rankings tooltips, which say "win rate" and "100% means AI engines always pick your brand" today and must describe Chosen plus Conditional
- [NEW 27 OCT] Given the Share of Voice KPI tooltip, When it renders, Then it reads "Your share of all the brands named in AI responses. In each answer, every brand counts once, however many of its products are named: if Nike Air Max and Nike Pegasus both appear in the same answer, Nike counts as 1 mention." (en-GB and en-US), French "Votre part parmi toutes les marques citées dans les réponses des IA. Dans chaque réponse, chaque marque compte une seule fois, quel que soit le nombre de ses produits cités : si Nike Air Max et Nike Pegasus apparaissent dans la même réponse, Nike compte pour 1 mention.", Spanish "Su cuota entre todas las marcas mencionadas en las respuestas de la IA. En cada respuesta, cada marca cuenta una sola vez, sea cual sea el número de sus productos mencionados: si Nike Air Max y Nike Pegasus aparecen en la misma respuesta, Nike cuenta como 1 mención."
- [CHANGED 27 OCT] Given the AI Choice KPI card, When it renders, Then it keeps the layout of the other KPI cards (icon in the ring, value on the right, quality pill and delta, as today), and the ring becomes a donut in four parts: Chosen and Conditional highlighted (Chosen solid, Conditional lighter), Not chosen and Overlooked muted, the value being Chosen plus Conditional; the ring is amber on the Overview and on the category view, which loses its quality colour: Chosen #F59E0B, Conditional #FCD34D, Not chosen #CBD5E1, Overlooked #E2E8F0, the icon in amber
- Given the AI Choice donut, When I hover it, Then it shows the number and the share of answers in each of the four outcomes
- Given a competitive row of the questions table, When every counted engine is Chosen, or the counted engines mix Chosen and Conditional, Then the "Winner / Themes" cell shows my brand with its logo, as today, so the cell agrees with the Favorable filter
- Given a competitive row, When every counted engine is Conditional, Then the cell shows "Conditional" in the green badge (green-50 fill, green-200 border, green-700 text)
- Given a competitive row, When every counted engine is Not chosen and picked the same competitor with no condition, Then the cell shows that competitor with its logo, as today
- Given a competitive row, When every counted engine is Not chosen with different picks, or the counted engines mix Not chosen and Overlooked, Then the cell shows "Not chosen" in plain grey text, as "Lost" today, so the cell agrees with the Not Favorable filter (eg: Gemini picks UPS, ChatGPT gives UPS and FedEx the conditions, the cell shows "Not chosen")
- Given a competitive row, When every counted engine is Overlooked, Then the cell shows "Overlooked" in the red badge (red-50 fill, red-200 border, red-700 text)
- Given a competitive row, When the counted engines mix a Chosen or Conditional outcome with a Not chosen or Overlooked one, Then the cell shows "Split", as today
- Given an unbranded analysis (no tracked brand), When a competitive row renders, Then the cell shows the brand that every counted engine chose with no condition, otherwise "Split"
- [CHANGED 27 OCT] Given an engine that is not counted for a question, or whose outcome could not be extracted, When the cell, the favorability and AI Choice are computed, Then that engine is left out
- [NEW 27 OCT] Given a competitive row where no engine is counted, When it renders, Then the cell shows the grey "Not counted" chip and the row is neither Favorable nor Not favorable in the filter and the header bar
- Given the favorability filter and the header bar of the questions table, When they count competitive questions, Then Favorable means every counted engine is Chosen or Conditional, Not Favorable means every counted engine is Not chosen or Overlooked, and Split is a mix
- [CHANGED 27 OCT] Given the question panel of a competitive question, When it renders, Then each engine pill shows the outcome of that engine in the badge that shows the rank today, same size and place: emerald for Chosen and Conditional (as "#1"), red for Not chosen and Overlooked (as "#--"), grey "Not counted" when the engine is not counted or its outcome could not be extracted; the pill keeps the production layout, its compact form with many engines included
- [CHANGED 27 OCT] Given an engine whose outcome is Chosen, When its tab is open, Then the card is titled "{brand}'s results - {engine}" with "Chosen" as its headline, on the green card of a win today; Conditional uses the green card too, Not chosen and Overlooked the red card of a loss today, and the card carries no text badge
- Given an engine whose outcome is Conditional or Overlooked, When its tab is open, Then the card shows the outcome only, with no condition per brand: the user reads why in the answer, shown above the card
- Given an engine whose outcome is Not chosen, When its tab is open, Then the card shows "Not chosen" and "{brand} was chosen" for the brand or brands the answer picks
- Given an answer that is not counted, When its engine tab is open, Then the pill is marked "Not counted" and the tab shows "{engine} returned no answer for this run", without the "may not have responded yet" line
- [CHANGED 27 OCT] Given the AI Choice column of Brand Rankings, When it renders, Then each brand shows Chosen plus Conditional, with no tooltip on the value, as today; a brand with no outcome in the scope shows the existing "—", configured or not, a brand that is not configured gets no win from a competitive answer, and a configured brand with outcomes but never chosen shows 0%

## Links

- https://onclusive.atlassian.net/browse/GEO-1498
- GEO-1564: https://onclusive.atlassian.net/browse/GEO-1564
- GEO-1565: https://onclusive.atlassian.net/browse/GEO-1565
- GEO-1566: https://onclusive.atlassian.net/browse/GEO-1566
- GEO-1567: https://onclusive.atlassian.net/browse/GEO-1567
- GEO-1568: https://onclusive.atlassian.net/browse/GEO-1568
- GEO-1569: https://onclusive.atlassian.net/browse/GEO-1569
- GEO-1570: https://onclusive.atlassian.net/browse/GEO-1570
- GEO-1571: https://onclusive.atlassian.net/browse/GEO-1571
- GEO-1572: https://onclusive.atlassian.net/browse/GEO-1572
- GEO-1608: https://onclusive.atlassian.net/browse/GEO-1608
- GEO-1606 (Bug): https://onclusive.atlassian.net/browse/GEO-1606
- GEO-1605 (Bug): https://onclusive.atlassian.net/browse/GEO-1605
- GEO-1604 (Bug): https://onclusive.atlassian.net/browse/GEO-1604
- GEO-1603 (Bug): https://onclusive.atlassian.net/browse/GEO-1603
- GEO-1602 (Bug): https://onclusive.atlassian.net/browse/GEO-1602
- GEO-1601 (Bug): https://onclusive.atlassian.net/browse/GEO-1601
- GEO-1594 (Bug): https://onclusive.atlassian.net/browse/GEO-1594
- GEO-1017 (Design Task): https://onclusive.atlassian.net/browse/GEO-1017
