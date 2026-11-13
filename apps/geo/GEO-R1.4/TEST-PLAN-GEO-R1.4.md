### QA Test Plan for GEO-R1.4 — GEO-678, GEO-1498, GEO-1537, GEO-1005, GEO-1226 — natural answers, natural answer display and AI Choice, brands behind Others, Google AI Overviews, review pages in Target Sources

**Updated:** 2026-11-13 | **Source CSV:** GEO-678 pending; GEO-1498 pending; GEO-1537 pending; GEO-1005 pending; GEO-1226 testcases-coverage-epicGEO-1226.csv (79 TCs) — 79 TCs | **Status:** DRAFT for review

**Objective:** Verify release 1.4 epic by epic in the user's order. GEO-678: engines answer naturally, answers are collected by rendered capture or the official API with a fallback, one per country, and one shared reader derives brand recognition, ranking by first mention, four competitive outcomes, themes and search sources, with the metrics kept (Visibility, Average Position, AI Choice = Chosen + Conditional, Share of Voice per brand family adding up to 100%) and the new Brand Image prompt set. GEO-1498: the question panel becomes a 470px drawer that shows the full answer, traces every extracted result back to it, numbers its citations, survives failed extractions and shows the four outcomes, with AI Choice named everywhere and the Excel Raw Data carrying the full answer. GEO-1537: the brands behind Others are listed in the donut tooltip, the Excel Share of Voice table and the PowerPoint / PDF donut. GEO-1005: Google AI Overviews becomes an engine, captured per country with no API fallback, "Not triggered" and "Not available" states, read and shown like the other engines. GEO-1226: review pages read as one article with their negative reviews in Target Sources. GEO-1006 and GEO-1212 have no story yet and are not planned. A cross-epic pass then follows one answer from collection to every surface (panel, tables, Share of Voice, Target Sources, exports, FR / ES), and a non-regression pass checks what the release keeps: structured engines, older analyses, Brand Pillars, scheduled emails, the brand slices, the Target Sources drawer, the Lite analysis and existing organisations.

#### Test Scenarios & Detailed Test Cases

##### GEO-678 — Natural Answer Collection and Parsing

**Natural Answers Collected (stories: GEO-1550)**

- Scenario 1: Natural Answer Shape - Verify that a question answered by a switched engine is stored and shown as the engine's own prose (paragraphs, lists, headings, tables) and not in a predefined output shape, as a real user would receive it.
- Scenario 2: Raw Answer Kept in Full - Verify with dev evidence that the raw answer is stored with the full engine or vendor response (answer text, search results and citation positions), not the text only, so it can be read again.
- Scenario 3: No Language Instruction - Verify on a France - French market with English AI insights that the engine answers in French, the language of the question, with no instruction on its answer language (the earlier rule asking for the insights language is removed).
- Scenario 4: GEO Text in the Insights Language - Verify on the same analysis that the AI summaries, key concepts and themes that GEO writes from the French answers are in English, the AI insights language, as today.
- Scenario 5: Other and Category Topics Prompts - Verify that an Other-type prompt and a Category Topics prompt of an unbranded analysis are answered naturally and read as themes like a Perception answer, while category and competitor discovery and prompt adaptation keep their structured request.

**Reading the Natural Answer (stories: GEO-1551)**

- Scenario 6: Ranking of Named Brands Only - Verify that the ranking extracted from a natural Visibility answer holds only brands that the answer text names, and that the other entities it mentions are kept apart from the ranking.
- Scenario 7: Competitive Answer Gives Outcomes - Verify that a natural Competitive answer gives an outcome per brand and never a ranking of the brands.
- Scenario 8: Perception Themes With Sentiment - Verify that a natural Perception answer gives its perception themes, each with its sentiment.
- Scenario 9: Cited Sources With Links - Verify that the sources cited by a natural answer are extracted with their links.
- Scenario 10: Same Results Whatever the Route - Verify on the same prompt answered through the API route and through rendered capture that the same kinds of results (ranking, outcomes, themes, sources) are extracted, using the route comparison of story 50.13 as evidence (875132).
- Scenario 11: Formatted Text Kept - Verify that the full answer text keeps its paragraphs, lists, headings and tables so the question panel shows it as the engine wrote it.
- Scenario 12: Brand Mentions Located - Verify that every mention of the tracked brand and of each competitor is located in the text, including another name the engine uses for a brand (e.g. "Claude" for Anthropic), so each ranked or chosen brand links to its first mention.
- Scenario 13: Citation Markers Linked - Verify that each inline citation marker is linked to the source it points to and that two markers pointing to the same page resolve to one source.

**Brand Recognition (stories: GEO-1552)**

- Scenario 14: Brand Named Through a Product - Verify that an answer naming only a product of the brand (e.g. "Brooks Adrenaline GTS" for Brooks) counts the brand as named, through the same brand family as the Actions Center.
- Scenario 15: Former Name After a Rebrand - Verify that an answer using only a former name of the brand (e.g. "BoursoBank" for Boursorama) counts the brand as named.
- Scenario 16: Titles, URLs and Domains Do Not Count - Verify that a brand appearing only in a source title, a URL or a cited domain counts as not named, that the label of a link written in the answer text counts as named, and that a label that is only a domain or a citation pill does not (PO 869743).
- Scenario 17: Closing Question Read - Verify that a brand named only in the closing question an engine asks the user counts as named like any other mention.
- Scenario 18: Homonyms Decided by Context - Verify that a name shared by several companies (e.g. "On", "Nickel", "Boots") counts as the brand only when the category and the brand website make it the brand.
- Scenario 19: Negative Tone Still Named - Verify that a Visibility answer naming the brand in a negative or mixed tone counts it as named, with no tone extracted or shown for Visibility answers, as today.
- Scenario 20: Retailers and Non-Brands Left Out - Verify that retailers named as places to buy (e.g. "available at REI, Zappos or Amazon"), review sites, media, places, generic product types and brands of another category are kept out of the ranking and of Share of Voice.
- Scenario 21: No Top-10 Cap - Verify that an answer naming more than 10 brands counts every brand as named for Visibility and Share of Voice, while Average Position keeps ranks 1 to 10.
- Scenario 22: Tracked Brand Always a Brand - Verify that a tracked brand or configured competitor that is a retailer or a review site always counts as a brand when the answer names it.

**Ranking (stories: GEO-1553)**

- Scenario 23: Rank by First Mention - Verify that each brand family is ranked by the order of its first mention in the answer, intro sentence included, so the first brand named is number one.
- Scenario 24: Lists and Sections Ignored - Verify that an answer with list numbers, "best for" sections or a table gets one ranking by order of first mention, whatever the list numbers or section labels say.
- Scenario 25: Products Fold Into Their Brand - Verify that for "Brooks Ghost …, HOKA Clifton …, Brooks Glycerin …" the brands rank Brooks 1 and HOKA 2, and that in Brand Rankings the Brooks Glycerin product row shows position 2, the position of its own first mention (PO 869746, 870318).
- Scenario 26: Answer Naming No Brand - Verify that an answer naming no brand at all (e.g. neighbourhoods only for a hotel question) counts the brand as not named, is left out of the Share of Voice denominator and of the question status, and that "Unranked" keeps its meaning (no engine names the brand).

**Competitive Outcome (stories: GEO-1554)**

- Scenario 27: One of Four Outcomes - Verify that every counted natural Competitive answer gets exactly one outcome for the tracked brand (Chosen, Conditional, Not chosen or Overlooked), stored with the brand or brands the answer picks.
- Scenario 28: Chosen Without Condition - Verify that an answer picking the brand with no condition (e.g. "the best pick from this set is Timberland") gives Chosen.
- Scenario 29: Chosen by Lack of Evidence - Verify that an answer picking the brand because the engine found nothing on the other brands gives Chosen.
- Scenario 30: Conditional When the Brand Wins a Case - Verify that an answer where the brand wins at least one condition gives Conditional, including an "it depends" answer and a hedged preference such as "I'd lean toward X, but I'd choose Y if…" (PO 873117).
- Scenario 31: Conditional on a Tie - Verify that an answer calling the brands equal, or naming the brand among joint winners, gives Conditional.
- Scenario 32: Not Chosen - Verify that an answer picking another brand, a brand outside the question, or not naming the brand gives Not chosen.
- Scenario 33: Overlooked - Verify that a conditional answer where the brand wins no condition gives Overlooked.
- Scenario 34: No Condition Stored - Verify that a conditional answer stores the outcome only and not the condition each brand wins, so no surface shows a condition per brand.
- Scenario 35: Declined or Rejected Not Counted - Verify that an answer where the engine declines to pick in every case or rejects the question is not counted, while an answer that picks a brand in at least one case is counted (dev 872677).
- Scenario 36: Negatively Framed Question - Verify that for a negatively framed question (e.g. "Which brand isn't just greenwashing") the outcome follows the conclusion of the answer and never the order in which brands are named.
- Scenario 37: One Outcome per Configured Brand - Verify that each configured brand of a head-to-head question gets its own outcome, so one conditional answer can be Conditional for both brands.
- Scenario 38: Unbranded Analysis Outcomes - Verify that in an unbranded analysis every brand of the question gets its outcome and the picked brand or brands are stored, so the winner can be shown.

**Partial Parsing and Not Counted Answers (stories: GEO-1555)**

- Scenario 39: Partial Extraction Kept - Verify that when an answer cannot be fully parsed, the parts that can be extracted are kept and the others are marked unavailable rather than guessed.
- Scenario 40: Answer With No Usable Data - Verify that an answer yielding no usable data is excluded on its own without failing the question or the analysis.
- Scenario 41: Failed Extraction Out of Its Metric - Verify on a new analysis date that an answer whose ranking or competitive outcome failed is left out of the metric that extraction feeds and is counted neither as unranked nor as not chosen.
- Scenario 42: Themes Failure per Country and Category - Verify that perception themes are read from the full answers and that a failed theme extraction applies only to the country and category being extracted.
- Scenario 43: Next Run Extracts Again - Verify that after a failed extraction the next run extracts again from its own answers, while the date where it failed keeps the extraction as unavailable.
- Scenario 44: Cut, Refused or Empty Not Counted - Verify on a new analysis date that a cut, refused or empty answer is left out of every metric instead of counting as not named.
- Scenario 45: No Brand Is Not a Refusal - Verify that an answer that answers the question but names no brand is not treated as a refusal and follows the no-brand rule of Scenario 26.

**Metrics and Downstream Views (stories: GEO-1556)**

- Scenario 46: Every View Renders - Verify that an analysis produced with natural answers opens every existing view in the same form, with no widget empty because of the change.
- Scenario 47: Visibility on Counted Answers - Verify that Visibility is the share of counted answers that name the brand.
- Scenario 48: Average Position - Verify that Average Position stays the mean rank over the answers that name the brand, ranks 1 to 10, with no penalty when the brand is absent.
- Scenario 49: AI Choice = Chosen + Conditional - Verify that AI Choice is (Chosen + Conditional) over the counted competitive answers, so the AI Choice of the brands of one question no longer adds up to 100%, and that for a competitor the denominator stays all counted competitive answers of the scope.
- Scenario 50: Every Reader of a Win - Verify that the question status, the competitive improvements, the AI Citation Sources competitive losses and the executive and perception summaries count Chosen and Conditional as a win and Not chosen and Overlooked as a loss.
- Scenario 51: Competitive Improvement Thresholds - Verify that the competitive improvements use today's AI Choice thresholds (an issue under 50%, Warning under 40%, Critical under 25%).
- Scenario 52: Prioritization Matrices - Verify that the Brand and Category Prioritization matrices keep AI Choice on the Y axis, the quadrant lines at Visibility 50 and AI Choice 50, and the AI Choice bands (Good above 50, Fair from 25).
- Scenario 53: Target Sources Gap Answers - Verify that Not chosen and Overlooked answers feed Target Sources as gap answers and Conditional answers do not.
- Scenario 54: Share of Voice per Brand Family - Verify that a Visibility answer naming Brooks, ASICS, HOKA, Saucony and New Balance gives Brooks 1 of 5, a Competitive answer naming the brand and 2 others gives it 1 of 3 whatever its outcome, each family counts once per answer, and all brands add up to 100% on every analysis date.
- Scenario 55: Share of Voice of a Product Row - Verify that a product row of Brand Rankings counts 1 in each answer naming it, over the same denominator as its brand, so the products of a brand can add up to more than the brand (PO 869747).
- Scenario 56: Share of Voice Bands - Verify that the Share of Voice quality bands stay Good above 25, Fair from 15 to 25 and Poor under 15.
- Scenario 57: Theme Polarity - Verify that each theme of a natural Perception answer gets a polarity (positive, mixed or negative) with no score displayed, and that the concept classification, the frequency and the category Sentiment tile work as today.
- Scenario 58: Off-Topic and Little-Known Answers - Verify that a Perception answer that misreads the question, or where the engine says it knows little about the brand, is parsed like any other answer.
- Scenario 59: Search Sources of the Whole Answer - Verify that the sources of a natural answer are the engine's search sources (the rendered source list, or the API search results capped at 5), all counted for the whole answer, inline or only listed alike, with redirect links resolved to their page.
- Scenario 60: Search Sources in Citation and Target Sources - Verify that AI Citation Sources and Target Sources read these search sources and no longer the source list a model writes in its answer, so source volumes can drop on the first date after the change.
- Scenario 61: Cards and Ads Never Counted - Verify that shopping cards, product cards, entity cards and sponsored ads of a rendered answer never count for Visibility, ranking or Share of Voice.
- Scenario 62: Analyses Produced Before the Change - Verify that an analysis produced before the change is not re-parsed, uses the new Share of Voice formula, reads a competitive answer that ranked the brand first as Chosen and any other as Not chosen, shows no trend marker, and has its stored Target Sources verdicts checked once on the first run after the change.

**Collection Routes and Countries (stories: GEO-1558 & GEO-1559 & GEO-1560 & GEO-1561 & GEO-1562)**

- Scenario 63: Rendered Capture for Public Surfaces - Verify with the stored route that logged-out ChatGPT and Gemini answers are obtained by rendered capture once switched, not by an API call.
- Scenario 64: Raw Capture With Time and Locale - Verify with dev evidence that a captured answer is stored raw with its capture time and locale and can be read again without a new capture.
- Scenario 65: Route and Vendor Stored - Verify with dev evidence that each answer stores the route actually used (rendered interface or API) and the vendor, and that an answer collected through the API fallback stores the API route.
- Scenario 66: Capture Residue Removed - Verify that no widget text or markup left by the capture (e.g. "Let me narrow it down for you", "Go to product viewer dialog") appears in a captured answer shown in the question panel.
- Scenario 67: Claude and Grok on the Official API - Verify that Claude and Grok answers come from their official API and that no rendered capture is attempted for them.
- Scenario 68: Perplexity Stays on Its API - Verify that Perplexity answers stay on its official API while no capture vendor reaches it.
- Scenario 69: Answer of the Country - Verify that a prompt configured for a country returns, through rendered capture, the answer served in that country, as the API route did.
- Scenario 70: One Answer per Country - Verify that the same prompt in several countries stores one answer per country, each attributed to its country.
- Scenario 71: Country Parameter or Hint - Verify with dev evidence that an engine on its API route gets the country through its own country parameter where it reaches the engine, otherwise through the hint "The user is located in {country}", never both, and the bare question with no "Market:", "Question:" or "Category:" line and no source instruction (PO 870313).
- Scenario 72: Vendor Country Setting - Verify with dev evidence that rendered capture targets a country through the vendor's country setting and adds no instruction to the question.
- Scenario 73: Country the Vendor Cannot Target - Verify that an engine collected in a country the vendor cannot target for it gets its answer through the API fallback.
- Scenario 74: API Fallback on Capture Failure - Verify that when capture returns no usable answer (vendor down, engine not reached, capture failed or cut) the prompt still gets an answer for that run through the same engine's API, with the bare question and the country sent as in Scenario 71.
- Scenario 75: Fallback Answer Counted Like Any Other - Verify that an answer collected through the API fallback is parsed and counted like any other answer and keeps the API route.
- Scenario 76: Capture and Fallback Both Fail - Verify that when the API fallback also fails the answer is not counted.
- Scenario 77: Route Comparison Report - Verify as SUPER_ADMIN that the comparison of the two routes for an engine planned for capture gives, per engine, the brands named and ranks, competitive outcomes, themes and tone and sources (875132, 875549).
- Scenario 78: Engine Not Switched Stays on API - Verify that an engine not switched to rendered capture is collected through its API route.

**Brand Image Prompts and Corporate Reputation Cards (stories: GEO-1557 & GEO-1576)**

- Scenario 79: Ten Suggested Brand Image Prompts - Verify that a new brand analysis suggests, for each country and in its language, the 10 Brand Image prompts of the new set (4 Brand Image, 2 Employer Brand, 2 ESG / Sustainability, 2 Leadership).
- Scenario 80: Pool Count Unchanged - Verify that the new set still counts 10 Brand Image prompts per country against the prompt pool.
- Scenario 81: Cards From What the Answer Says - Verify that each Corporate Reputation card is filled only from what natural Brand Image answers say about its topic, whatever prompt was asked, that a passing mention supporting another topic fills nothing (e.g. a Chief Sustainability Officer in a sustainability answer feeds ESG only), and that a card nobody talks about shows "No data available" (PO 871829).
- Scenario 82: Employer Brand Rule - Verify that what employees say about working at the brand (pride, heritage, how they are managed at any level, the CEO approval rating) fills Employer Brand only, while Leadership holds what leaders do and decide (strategy, governance, executive appointments and pay, restructuring) (PO 872445, 876974).
- Scenario 83: Card Tone and Bullets - Verify that a card tone is the majority of the answers' tones and its bullets are in the AI insights language, as today.
- Scenario 84: Brand Territories - Verify that Brand Territory shows the product categories or industries each natural Brand Image answer links to the brand.
- Scenario 85: Founder or History Not Leadership - Verify that an answer, or a part of it, giving only the founder or the history of the brand does not feed the Leadership card.
- Scenario 86: Removal Popup in the Wizard - Verify that unticking or deleting a Brand Image prompt for the first time in a wizard setup opens "Remove this Brand Image prompt?" with its text, Remove and Cancel and no close cross, that Cancel keeps the prompt and that after Remove the popup does not show again in this setup.
- Scenario 87: Removal Warning in Manage Scope - Verify that in Manage Scope the first untick or delete of a Brand Image prompt since opening shows the same text inside the delete or last-prompt confirmation, or the wizard popup when there is no confirmation, and not again until Manage Scope is reopened.
- Scenario 88: Removal Popup in the Add Country Dialog - Verify that unticking a Brand Image prompt in the Add country dialog shows the wizard popup once per opening of the dialog (PO 872445).
- Scenario 89: No Card Sub-Label - Verify that Brand Image prompts show no card sub-label in the prompts table.
- Scenario 90: No Brand Image Prompt Kept - Verify that with no Brand Image prompt kept the Review warning says the Corporate Reputation cards and Brand Territory stay empty and the Manage Scope "What stops from the next run" box names it.
- Scenario 91: Unbranded Analysis - Verify that an unbranded analysis still gets no Brand Image prompt and no popup.
- Scenario 92: Existing Analyses Get Prompts 5 to 9 - Verify that an existing brand analysis gets prompts 5 to 9 of the set added to each country next to its current Brand Image prompts, counted against the pool even above it, with adding prompts blocked until the count fits.
- Scenario 93: Country Added Later Gets the New Set - Verify that a country added later to an existing analysis is suggested the new set of 10, so one analysis can mix both sets.
- Scenario 94: Sources on Filled Cards - Verify that the drill-in of a card filled by a natural Brand Image answer shows the sources the engine used for that answer, as for a structured engine.
- Scenario 95: No Source on an Empty Card - Verify that a card the answer does not fill gets no source from it ("No data available" shows no source).
- Scenario 96: Brand Image Sources in Cited and Target Sources - Verify that the search sources of Brand Image answers, natural or structured, count in Cited sources on the Overview and in the Target Sources list like those of Visibility, Competitive and Perception answers (PO 872446).
- Scenario 97: Structured Brand Image Answers - Verify that for a structured engine the cards are unchanged and its Brand Image sources now count in Cited sources and Target Sources, past snapshots included.

##### GEO-1498 — Natural Answer Display in the Question Panel

**Question Panel Drawer (stories: GEO-1572)**

- Scenario 98: Drawer Over the Page - Verify that a click on a row of the questions table opens the question panel as a full-height drawer over the page and the host top bar (frame 09) instead of inline next to a shrinking table.
- Scenario 99: No Auto-Open - Verify that opening a category view opens no question by itself and that the panel opens only on a row click.
- Scenario 100: Standalone Shell Behaviour - Verify in the standalone shell that the drawer renders as in Onclusive Social with the GEO sidebar, top bar, organisation control and user menu mounted, and behaves like the Target Sources drawer (native dialog, focus trap, arrow keys to the previous or next question) (PO 870232).
- Scenario 101: Onclusive Social Shell - Verify in the Onclusive Social native shell that only its top bar is mounted, and that the drawer and the citation mini card follow its GEO-1017 frame with the focus trap and the arrow keys.
- Scenario 102: Drawer Width - Verify that the drawer is 470px wide in both shells.
- Scenario 103: Header at the Top of the Drawer - Verify that the sticky panel header sits at the top of the drawer, which covers the host top bar, as in frame 09.
- Scenario 104: Focus Back on Close - Verify that closing the drawer with Escape, the close button or a click on the backdrop returns the focus to the question row (dev 876232).

**Full Answer Card (stories: GEO-1564 & GEO-1565)**

- Scenario 105: Long Answer Clamped - Verify that an answer longer than about 8 lines shows its first 8 lines behind a fade with a "Show full answer" link.
- Scenario 106: Short Answer in Full - Verify that an answer shorter than the clamp shows in full with no expand control and no clipped line.
- Scenario 107: Expand in Place - Verify that "Show full answer" expands the answer in place, the panel scrolls internally and its width does not change.
- Scenario 108: Show Less Scrolls Back - Verify that "Show less" at the bottom collapses the answer and scrolls the panel back to the top of the answer card.
- Scenario 109: Rich Content Renders - Verify that headings, bold text, numbered and bulleted lists, tables, long URLs and code blocks render as formatted content with nothing overflowing the panel width (numbered lists keep their numbers).
- Scenario 110: Stable Layout Across Engines - Verify that switching between engine tabs with very different answer lengths keeps the header, tags, engine tabs and verdict at the same position and that a short answer ends with no empty space.
- Scenario 111: Character Count - Verify that the answer header counts characters, not words, including for a Japanese or Chinese answer.
- Scenario 112: Question and Engine Pinned - Verify that scrolling an expanded answer keeps the question pinned at the top with the engine of the answer, with no gap between the header and the engine tabs.
- Scenario 113: Engine Switch Opens Clamped - Verify that switching engine tab from an expanded answer opens the new tab clamped and at the top.

**Tracing Results Back to the Answer (stories: GEO-1566)**

- Scenario 114: Every Ranked Brand Highlighted - Verify that every brand of the extracted ranking is highlighted in the answer, the tracked brand with its own style, and that brand names inside a table of the answer are not highlighted (PO 870232).
- Scenario 115: Other Names Highlighted - Verify that a name the engine uses for a brand that differs from the analysis (e.g. "Claude" for Anthropic) is highlighted as that brand.
- Scenario 116: Ranking Row Scrolls to the Mention - Verify that a click on a ranking row (or Enter or Space on it) expands the answer if needed and scrolls to the first mention of the brand, visible under the engine tabs, and highlights it.
- Scenario 117: Outcome Card Instead of Ranking - Verify that a Competitive question shows the outcome card and no ranking, that clicking a brand of the card scrolls to its first mention, that the "About {brand}" card is gone and that no brand carries a text badge or a chosen style of its own.
- Scenario 118: Brand Family With the Engine's Name - Verify that a brand in the outcome card or the ranking shows its brand family with the name the engine wrote below it when it differs (e.g. "BTL Aesthetics", then "Emsculpt Neo").
- Scenario 119: Unbranded Competitive Panel - Verify that in an unbranded analysis each engine tab shows the full answer then "{brand} was chosen" for a pick with no condition (frame 10g), otherwise one card per brand picked under a condition (frame 10h), with no result card above the answer and no pill badge.
- Scenario 120: No Brands Named Verdict - Verify that a Visibility answer naming no brand shows in full with the verdict "No brands named" on the red card, the line "{engine} answered without naming any brand, so this answer has no ranking." and no ranking rows.
- Scenario 121: Extracted From Labels - Verify that the result card carries "Extracted from {engine}'s answer" and that every block below the answer sits in the section "Extracted from this answer".
- Scenario 122: Panel Order and Subtitles - Verify that the panel shows the result card, the answer card, the section "Extracted from this answer" and the sources in that order, with the subtitle of each question type (Visibility, Competitive Chosen and Not chosen, Conditional and Overlooked, unbranded, Perception themes as grey text-only tags).
- Scenario 123: Nothing to Extract - Verify that "No brands named" and not counted answers show no section "Extracted from this answer", the sources following the answer card (frames 04f, 04d).
- Scenario 124: Brand Logos and Family Rows - Verify that each ranking row shows the brand's logo, the tracked brand included (from the report's domain) and competitors found by name, that the tracked brand row keeps its highlight, that every brand named is listed with no top-5 cap, and that products fold into one row per brand family at its best rank (PO 876328).
- Scenario 125: Older Dates One Row per Family - Verify that a Visibility panel of a date collected before natural answers shows one row per brand family numbered 1, 2, 3… with no gap, with the ranked product below the brand when it differs (e.g. "Toyota", then "Toyota Prius").
- Scenario 126: Position Card Names the Brand - Verify that the position card reads "{brand}'s Position", never a product name, and that the rank on the card, on the engine tab and on the brand's row is the same number.
- Scenario 127: Older Dates Keep Stored Places - Verify that for dates collected before natural answers Average Position, Brand Rankings, the questions table and the Excel export keep the stored places.

**Inline Citations and Sources (stories: GEO-1567)**

- Scenario 128: Shared Numbering - Verify that the citation markers [n] of an answer use the numbering of the Sources card of the panel.
- Scenario 129: Renumbered by First Citation - Verify that an answer citing [1] [4] [2] [5] shows [1] [2] [3] [4] in order of first citation, every marker takes the number of its source, and the Sources card and the Excel export use the same numbers.
- Scenario 130: Citation Mini Card - Verify that hovering or clicking a marker shows a mini card with the source title, the domain and "Source {n} of {total}", and highlights the matching row of the Sources card.
- Scenario 131: Same Page, One Number - Verify that two markers pointing to the same page show the same number and the page appears once in the Sources card.
- Scenario 132: Other Sources Cards Unchanged - Verify that the Sources cards of the Brand Image panel, the concept detail and the citation details keep today's behaviour.
- Scenario 133: Cited Sources First - Verify that the Sources card lists the sources the engine used for the answer, the sources cited in the text first with their numbers, then the others without a number.
- Scenario 134: Marker Opens the Full List - Verify that a marker pointing to a source outside the visible rows opens the full list on that source and highlights it.
- Scenario 135: Citation Count - Verify that "{n} citations" in the answer header equals the number of numbered sources in the Sources card.
- Scenario 136: All Sources Count - Verify that "All sources {n}" counts every source the engine used for the answer, cited in the text or not.
- Scenario 137: Excluded Source Marker - Verify that a marker pointing to a page of a domain excluded from the report is removed from the text and gets no number (PO 870232).

**Panel States and Parsing Failures (stories: GEO-1568)**

- Scenario 138: One Failed Block - Verify that when one extraction failed only that block changes, keeping its title and showing one amber italic line, while the answer and the other blocks render normally.
- Scenario 139: Failed Extraction Not Shown as a Loss - Verify that an engine whose ranking or outcome failed is counted neither as unranked nor as not chosen in the questions table and the metrics.
- Scenario 140: Failed Date Line - Verify that the failed block reads "{Themes} could not be extracted from this answer. The next analysis run extracts its own answers; this date stays as it is." and never "will retry on the next analysis run".
- Scenario 141: Not Counted Engine Tab - Verify that an empty, cut or refused answer marks its pill "Not counted", its tab says "{engine} returned no answer for this run" and no extracted block shows.
- Scenario 142: Analysis Run Before This Epic - Verify that a question of an analysis run before this epic shows the tracked brand's excerpt with no clamp, no character count and no highlight, and the extracted blocks and sources as for any other answer.
- Scenario 143: Loading, Pending and Error States - Verify the skeleton of frame 04e while loading, "Analysis pending" for an engine added after the last run and the error with Retry when the panel fails to load, with no extracted block in the last two.
- Scenario 144: No Inline Citations - Verify that an answer with no inline citation shows in full with "no inline citations" in its header.
- Scenario 145: Legacy Excerpt Preview - Verify that an excerpt of an analysis run before this epic keeps its 500-character preview with "Show more", while a full answer uses the 8-line clamp (dev 876571).

**Excel Raw Data (stories: GEO-1569)**

- Scenario 146: Full Answer in Response - Verify that the "Response" column of the Raw Data sheet carries the full answer of each engine for every question type of an analysis with natural answers.
- Scenario 147: Ranking Column for Visibility - Verify that a Visibility row carries its brand ranking in a new "Ranking" column next to "Response", in today's format with every brand listed and no 10-brand cap, and "No brands named" for a counted answer naming no brand (PO 870232).
- Scenario 148: Competitive Response and Ranking - Verify that a Competitive row carries the full answer instead of the "About {brand}" and "About winner" text, and the outcome followed by the picked brand or brands in "Ranking" (e.g. "Conditional · Decathlon").
- Scenario 149: N/A for Other Types - Verify that Perception, Other and Brand Image rows read "N/A" in the "Ranking" column.
- Scenario 150: Brand Image Rows - Verify that a Brand Image question keeps one row per dimension with the dimension bullets in "Response", as today.
- Scenario 151: Older Analysis Columns - Verify that an analysis run before this epic exports the same columns, "Ranking" included, its Visibility rows showing the ranking in both "Response" and "Ranking".
- Scenario 152: Markers and Source URLs - Verify that markers [n] stay in the text, the "Source URLs" column lists the cited sources in the panel's numbering then the uncited ones without a number, and a URL that does not fit the cell does not shift the numbers after it.
- Scenario 153: Not Counted Natural Rows - Verify that a not counted natural answer (cut, refused, empty) has no row, while rows of analyses run before this epic that read "No ranking returned" or "No usable content returned" stay (PO 870232).
- Scenario 154: Favorability Column Removed - Verify that the Raw Data sheet has no "Favorability" column and no green or red row tint (PO 870232).
- Scenario 155: Long Answer Shortened - Verify that an answer longer than an Excel cell holds is shortened and marked like any other long cell of the export.

**Four Competitive Outcomes (stories: GEO-1570)**

- Scenario 156: Four Labels in Three Languages - Verify that an outcome shows as "Chosen", "Conditional", "Not chosen" or "Overlooked", in French "Choisie", "Sous conditions", "Non choisie", "Ignorée" and in Spanish "Elegida", "Condicional", "No elegida", "Ignorada".
- Scenario 157: AI Choice Donut Card - Verify that the AI Choice KPI card keeps the KPI layout with a four-part amber donut (Chosen #F59E0B, Conditional #FCD34D, Not chosen #CBD5E1, Overlooked #E2E8F0, amber icon) on the Overview and the category view, its value being Chosen plus Conditional.
- Scenario 158: Donut Hover - Verify that hovering the AI Choice donut shows the number and share of answers in each of the four outcomes.
- Scenario 159: Winner Cell Shows My Brand - Verify that a competitive row whose counted engines are all Chosen, or mix Chosen and Conditional, shows my brand with its logo in "Winner / Themes".
- Scenario 160: Conditional Badge - Verify that a row whose counted engines are all Conditional shows "Conditional" in the green badge (green-50 fill, green-200 border, green-700 text).
- Scenario 161: Competitor Winner - Verify that a row whose counted engines are all Not chosen with the same competitor picked with no condition shows that competitor with its logo.
- Scenario 162: Not Chosen Text - Verify that a row whose counted engines are Not chosen with different picks, or mix Not chosen and Overlooked, shows "Not chosen" in plain grey text (e.g. Gemini picks UPS, ChatGPT gives UPS and FedEx the conditions).
- Scenario 163: Overlooked Badge - Verify that a row whose counted engines are all Overlooked shows "Overlooked" in the red badge (red-50 fill, red-200 border, red-700 text).
- Scenario 164: Split - Verify that a row mixing a Chosen or Conditional engine with a Not chosen or Overlooked one shows "Split".
- Scenario 165: Unbranded Winner Cell - Verify that an unbranded competitive row shows the brand every counted engine chose with no condition, otherwise "Split".
- Scenario 166: Not Counted Engine Left Out - Verify that an engine not counted, or whose outcome failed, is left out of the cell, the favorability and AI Choice.
- Scenario 167: Not Counted Chip - Verify that a row with no counted engine shows the grey "Not counted" chip and is neither Favorable nor Not favorable in the filter and the header bar, and left out of the "Favorable %" (PO 870232).
- Scenario 168: Favorability Filter - Verify that Favorable means every counted engine is Chosen or Conditional, Not Favorable every counted engine Not chosen or Overlooked, and Split a mix, in the filter and the header bar.
- Scenario 169: Engine Pill Outcome Badge - Verify that each engine pill of a competitive question shows its outcome in the rank badge place and size (emerald for Chosen and Conditional, red for Not chosen and Overlooked, grey "Not counted"), compact form included.
- Scenario 170: Outcome Card Titles - Verify that the card is titled "{brand}'s results - {engine}" with the outcome as its headline, green for Chosen and Conditional, red for Not chosen and Overlooked, with no text badge.
- Scenario 171: Conditional and Overlooked Cards - Verify that a Conditional or Overlooked card shows the outcome only, with no condition per brand.
- Scenario 172: Not Chosen Card - Verify that a Not chosen card shows "Not chosen" and "{brand} was chosen" for each picked brand.
- Scenario 173: Not Counted Tab Text - Verify that a not counted answer shows "{engine} returned no answer for this run" without the "may not have responded yet" line.
- Scenario 174: Brand Rankings AI Choice Column - Verify that the AI Choice column shows Chosen plus Conditional with no tooltip on the value, "—" for a brand with no outcome in the scope, no win for a brand that is not configured, and 0% for a configured brand never chosen.

**AI Choice Name and Tooltips (stories: GEO-1571)**

- Scenario 175: AI Choice Name Everywhere - Verify that the competitive metric is named "AI Choice" ("Choix IA", "Elección de IA") with the same capitalisation in the trend graph, the upsell KPI, gate and results, the unbranded Brand Rankings tooltip in 4 locales, PowerPoint and PDF, and that the upper-case "AI CHOICE" headers stay (PO 870232).
- Scenario 176: AI Choice Definitions - Verify that the KPI and Brand Rankings tooltips give the branded and unbranded definitions of Chosen plus Conditional in English, French and Spanish, as decided (PO 870232).
- Scenario 177: Share of Voice Tooltip - Verify that an info icon next to the "Share of Voice" chart title of the Overview and the category view of a brand analysis shows the new text in en-GB, en-US, French and Spanish (PO 870232).

##### GEO-1537 — Show the Brands Behind Others

**Others Tooltip (stories: GEO-1588)**

- Scenario 178: Brands in Others Listed - Verify that hovering the Others slice opens a tooltip listing the brands in Others with their Share of Voice, from the highest, up to 10 brands.
- Scenario 179: And N More Brands - Verify that Others with more than 10 brands ends the tooltip with "and {N} more brands, see the export", "and 1 more brand, see the export" for 11 brands, and a thousands separator for large counts (e.g. "and 1,417 more brands") (PO 875646).
- Scenario 180: Others Equals Its Brands - Verify on several analysis dates that the Others value equals the sum of the Share of Voice of its brands, so the list always adds up to the slice.
- Scenario 181: Same Filters as the Donut - Verify that with period, country, AI engine and category filters the Others list uses the same filters as the donut.
- Scenario 182: Same Tooltip on Each Donut - Verify that the tooltip behaves the same on the overview, a category tab and the landscape of an unbranded analysis.
- Scenario 183: Tooltip Header - Verify that the header shows Others ("Autres" in French, "Otros" in Spanish), the same whole value as the slice and the legend, and the brand count ("48 brands", "1 brand", "1,427 brands", "1 427 marques", "1.427 marcas") (PO 876975).
- Scenario 184: Tooltip Component and Tail - Verify that the tooltip follows the GEO-1543 component "GEO / Others Tooltip [2.0]", opens after 150 ms on the side of the slice with room, and on branded cards points its tail at the middle of the Others arc's outer edge (design 875353, dev 876695).
- Scenario 185: Exact-Value Sort - Verify that brands are sorted by exact Share of Voice before rounding and only exact ties go A to Z, so two rows can both read "2%" (PO 875591).
- Scenario 186: Hover and Keyboard Open - Verify that hovering or tabbing to the Others slice or the Others legend item opens the tooltip, above the legend item when opened from it (frame 1.4), and that Escape closes it.
- Scenario 187: Tracked Brand in Others - Verify that the tracked brand, when it falls in Others, is listed like any other brand with no particular treatment.
- Scenario 188: Under 0.5% Shows ~0% - Verify that a brand under 0.5% shows "~0%" and that an Others slice whose value rounds to 0 shows "~0%" on the slice, the legend and the tooltip header (dev 875030).

**Excel Share of Voice Table (stories: GEO-1589)**

- Scenario 189: Share of Voice Table on Each Ranking Sheet - Verify that every sheet with a brand ranking table (overview, each category, unbranded landscape) has a Share of Voice table with rank, brand and Share of Voice %, the tracked brand highlighted as in the ranking table.
- Scenario 190: First 100 Brands Then the Rest - Verify that a scope naming more than 100 brands lists the first 100, the 10 donut slices included, in donut order, then a last row "and {N} more brands" ("and 1 more brand" for 101), with the thousands separator of each language (PO 875591, 875646).
- Scenario 191: Ranking Table Matches the App - Verify that the brand ranking table of the export shows the same brands, columns and order as the app and no longer has a Share of Voice column.
- Scenario 192: Table Placement and Styles - Verify that the Share of Voice table sits to the right of the ranking table, one empty column apart, from the same row, under the title "Share of Voice", with the workbook's navy header, left-aligned values and yellow-50 highlight (design 875353).
- Scenario 193: Sort and ~0% in Excel - Verify that the Excel table sorts by exact value with A to Z only for exact ties and shows "~0%" under 0.5%.
- Scenario 194: Same Data as the Dashboard - Verify that the Excel table gives the same brands and values as the dashboard donut for the selected period and filters, values written as text like the rest of the workbook (PO 875591).
- Scenario 195: French and Spanish Headers - Verify that a French or Spanish export reads "Part de voix" / "Part de voix %" or "Cuota de voz" / "Cuota de voz %", and the last row "et 30 autres marques" / "y 30 marcas más" with singular forms (PO 875591).

**PowerPoint and PDF Donut (stories: GEO-1590)**

- Scenario 196: Top 10 and Others in the Deck - Verify that a PowerPoint or PDF Share of Voice donut shows the top 10 brands and Others, as on the dashboard, the tracked brand no longer forced into the slices.
- Scenario 197: Others in the Legend - Verify that the legend ends with the Others chip and its Share of Voice %, in the slice's grey.
- Scenario 198: Others Line Under the Donut - Verify that one line under the donut lists the brands in Others with their Share of Voice, from the highest, up to 10, ending with "and {N} more brands, see the Excel export" when Others holds more.
- Scenario 199: PDF Same as PowerPoint - Verify that the PDF export shows the same donut, legend and line as the PowerPoint export.
- Scenario 200: Hole and Slices on the Period - Verify that the deck slices and the number in the donut hole use the whole selected period, the same values as the dashboard donut, and the last analysis date when no period is selected (PO 876975).
- Scenario 201: Line on Two Lines at Most - Verify that the line fits on 2 lines at most and that with long or non-Latin names it lists fewer brands and the "and {N} more brands" count grows (design 875353).
- Scenario 202: Deck Sort, Tracked Brand and ~0% - Verify that the deck line sorts by exact value with A to Z only for exact ties, lists the tracked brand with no bold or colour and shows "~0%" under 0.5%.
- Scenario 203: Donut Centre - Verify that the evolution pill, the brand name and the value stay inside the donut hole, a long brand name being cut with "…" (design 875353).
- Scenario 204: Unbranded Deck - Verify that the Share of Voice slide of an unbranded deck shows the same Others chip and line, with no "and N more" part when Others holds 10 brands or fewer.
- Scenario 205: French and Spanish Deck - Verify that a French or Spanish deck reads "Autres {n}% :" / "Otros {n}%:" with the singular and plural forms of the "more" part.

**Share of Voice Distribution (stories: GEO-1587)**

- Scenario 206: Every Brand Behind Others - Verify that the brand count of the tooltip header equals the number of brands of the scope outside the top 10, and that the Excel table lists them up to the 100th brand.
- Scenario 207: Exports Match the Dashboard - Verify that the tooltip, the deck and the Excel export give the same slices, Others value and order for the same scope, the Excel reading the same computation without the cache (dev 875136).

##### GEO-1005 — Add Google AI Overviews as a Tracked Surface

**Engine Selection (stories: GEO-1595)**

- Scenario 208: AI Overviews Engine Card - Verify that for an organisation allowed Google AI Overviews the wizard engine step and Manage Scope show one more card after Gemini, named "Google AI Overviews", with the Google "G" logo, the green border #34A853 and no description.
- Scenario 209: Back Office Option Off by Default - Verify that Google AI Overviews is one more allowed engine in the back office, off by default for new and existing organisations.
- Scenario 210: Prompt Pool Unchanged - Verify that turning on Google AI Overviews does not change the prompt pool count.
- Scenario 211: Collected From the Next Run - Verify that Google AI Overviews turned on in Manage Scope of an existing analysis is collected from the next run.
- Scenario 212: At Least One Engine at Creation - Verify that creating an organisation in the back office requires at least one AI engine, Create staying disabled while none is ticked, with "Seleccione al menos un motor de IA" in Spanish (PO 876278, 876972).

**Capture per Country (stories: GEO-1596)**

- Scenario 213: Captured From the Country's Google Page - Verify that the AI Overview of a prompt is captured from the Google Search page of the prompt's country, through the capture vendor and its country setting, with no instruction added.
- Scenario 214: Full AI Overview After Show More - Verify that an AI Overview shown in part behind "Show more" is stored in full, as a user reads it after "Show more".
- Scenario 215: Raw Answer Kept - Verify with dev evidence that the raw AI Overview is kept with its route, vendor, country and date, text, sources and source places.
- Scenario 216: No API Fallback - Verify that when the vendor returns no usable AI Overview the answer is not counted and the question is never sent to the Gemini API in its place.
- Scenario 217: Excluded Countries - Verify that no AI Overview is collected in the countries the vendor cannot capture (China, Cuba, Ethiopia, Iceland, Iran, Sri Lanka on 6 Nov 2026).
- Scenario 218: Review Banner Line - Verify that selecting Google AI Overviews with excluded countries adds "Google AI Overviews won't apply to {countries}." to the amber Review banner with every country named, the list joined in the page language (e.g. "France, Espagne et Italie"), and that creation stays allowed (PO 876972).
- Scenario 219: Every Country Excluded - Verify that when every selected country is excluded the line reads "Google AI Overviews won't apply to any of your selected countries." and creation stays allowed even with AI Overviews as the only engine.
- Scenario 220: Run Fails With No Applicable Engine - Verify that a run where no engine of the analysis applies to the selected countries fails with "No selected engine applies to the selected countries." (PO 876279).
- Scenario 221: Add-Country Dialog Line - Verify that adding an excluded country in Manage Scope to an analysis with Google AI Overviews shows "Google AI Overviews won't apply to {countries}." in the dialog before confirming, and adding stays allowed.
- Scenario 222: Manage Scope Line - Verify that Manage Scope of an analysis with Google AI Overviews and an excluded country shows the amber line under the AI engines when turning the engine on and on every later opening, as long as such a country remains.

**Prompts Without an AI Overview (stories: GEO-1597)**

- Scenario 223: Not Triggered Is a Result - Verify that a prompt whose Google page shows no AI Overview is stored as "not triggered", a result and not a failed capture.
- Scenario 224: Not Available Pill and Tab - Verify that a question of an excluded country shows the AI Overviews pill "Not available" in the grey badge and the tab "Google AI Overviews is not available in {country}." with no extracted block and no sources (frame 04d) (PO 876972).
- Scenario 225: Left Out of the Metrics - Verify that a prompt with no AI Overview is left out of every metric for that date, never counted as not named, unranked or not chosen.
- Scenario 226: Not Triggered Pill and Tab - Verify that the pill shows "Not triggered" in the grey "Not counted" badge, rank badge place and size, compact form included, and the tab reads "No AI Overview was returned for this question in {country}." with its fr-FR and es-ES texts, no extracted block and no sources (PO 876294).
- Scenario 227: Trend Gap - Verify that a prompt with an AI Overview on one date and none on the next gives no AI Overviews value for that date in the trends.
- Scenario 228: No Excel Row - Verify that a prompt with no AI Overview has no AI Overviews row in the Excel Raw Data sheet.

**Reading the AI Overview (stories: GEO-1598)**

- Scenario 229: Shared Reader - Verify that the ranking, competitive outcome, themes and tone and sources of an AI Overview are extracted with the same rules as the other engines, brand family included.
- Scenario 230: Google Page Residue Removed - Verify that "Show more", "AI responses may include mistakes" and the feedback buttons never appear in an AI Overview shown in the question panel.
- Scenario 231: Source Places Kept - Verify that sources cited as links next to the paragraphs keep the place where the AI Overview cites them, so the panel numbers them as for the other engines.
- Scenario 232: Text Only Read - Verify that brands, outcomes and themes of an AI Overview come from its text only.

**AI Overview in the Question Panel (stories: GEO-1599)**

- Scenario 233: Full Answer Card - Verify that an AI Overview tab uses the full answer card with no change (clamp, "Show full answer", brand highlights, citation mini card, Sources card).
- Scenario 234: No Inline Citations - Verify that an AI Overview with no numbered citation shows "no inline citations" in its header and lists its sources in the Sources card.
- Scenario 235: Header Counts - Verify that the character and citation counts of an AI Overview header count its text and cited sources only.

**AI Overviews Everywhere Engines Show (stories: GEO-1600)**

- Scenario 236: Filters and Breakdowns - Verify that AI Overviews is one more engine with its name and logo in the engine filters and the per-engine breakdowns (KPIs, Brand Rankings, trends, sources, Corporate Reputation panel, Brand Territory pie in green, Related Prompts modal).
- Scenario 237: Engine Order - Verify that every engine list (wizard, Manage Scope, filters, panel pills, Actions Center tabs, export engine lists) follows ChatGPT, Gemini, Google AI Overviews, then Grok, Claude and Perplexity, the PowerPoint export now listing Grok before Claude (PO 876278, 876281).
- Scenario 238: Compact Pill - Verify that with 4 engines or more the AI Overviews pill shows its logo only, with "Google AI Overviews" in the tooltip.
- Scenario 239: Logo Everywhere - Verify that the AI Overviews logo shows in the wizard, Manage Scope, back office, engine filters, pills, Sources card, Actions Center and exports, never a blank or default icon.
- Scenario 240: Exports - Verify that Excel, PowerPoint and PDF exports show "Google AI Overviews" wherever they show an engine.
- Scenario 241: Analysis Without AI Overviews - Verify that an analysis without AI Overviews shows it nowhere and the other engines as today.

##### GEO-1226 — Target Sources Improvements for Review Pages

**Negative Review Entries (stories: GEO-1547)**

- Scenario 242: One Entry per Negative Review - Verify that a single-company review page where 4 users criticise the brand gives 4 entries, one per review, under its page block (Figma 1.1).
- Scenario 243: Long Review Cut at 140 Characters - Verify that a negative review longer than 140 characters is quoted verbatim and shortened to 140 characters or less with a single "…" on a word boundary, as in the 140-character passage rule.
- Scenario 244: Short Review Shown Whole - Verify that a negative review of 140 characters or less is shown whole with no "…", although the demo reviews of Figma 1.1 and 1.2 end with "…".
- Scenario 245: Entry Quoted Verbatim - Verify that every entry is found word for word on the live page, in the language of the page, and that its page block opens that page.
- Scenario 246: Each Review Listed Once - Verify that a review repeated within a page, or carried over onto a later page block, is listed once in the article, and that the page block counts and the article chip count distinct reviews only (dev 875183). *(new)*
- Scenario 247: Review Without the Brand Name - Verify that on a review page about one company of the brand family a negative review that does not name the brand (e.g. "A EVITER ABSOLUMENT - POUR PRENDRE VOTRE ARGENT ILS SONT FORTS") is listed (Figma 1.1).
- Scenario 248: No Page Chrome Quoted - Verify that no entry is the page title, a menu, a banner or a summary written by the site.
- Scenario 249: Criticism Listed Even in a 4–5★ Review, No Company Reply - Verify that a review that criticises the brand is listed even when it is rated 4 or 5 stars, and that a review holding no criticism of the brand or a reply from the company is never listed (PO 876255: any criticism = listed). *(corrected)*
- Scenario 250: Ten Entries per Page - Verify that a page with more than 10 negative reviews lists 10 entries and its count reads "10 negative reviews", with nothing saying that more exist.
- Scenario 251: Cap and Cut on One Page - Verify that a page with 11 or more negative reviews, one of them longer than 140 characters, lists 10 entries and the long one ends with "…" on a word boundary within 140 characters.
- Scenario 252: Page With One Negative Review - Verify that a review page holding a single negative review is negative and shows its page block with "1 negative review".
- Scenario 253: Review Page With No Negative Review - Verify that a review page whose reviews hold no criticism of the brand is not listed in Negative perception.
- Scenario 254: Comparison Page Keeps Today's Rule - Verify that a comparison page rating several companies on a Review Sites domain (e.g. seedly.sg, lecomparateurassurance.com) keeps one passage per page that names the brand (PO 869090).
- Scenario 255: App Store Pages Out of Scope - Verify that a Google Play or App Store page keeps today's one-passage rule and gets no review layout (PO 869090).
- Scenario 256: Other Sources Keep One Passage - Verify that a page of a source not classified Review Sites keeps one passage per page that names the brand, as today.
- Scenario 257: Reviews Kept on Reuse - Verify that after a later run that reuses the verdict of an unchanged review page, its review entries are still shown in the panel.

**Review Page as One Article (stories: GEO-1548)**

- Scenario 258: One Article per Subdomain - Verify that the paginated pages of one review page show as one article per subdomain (e.g. fr.trustpilot.com and fr-be.trustpilot.com for cnp.fr) instead of one article per page (Figma 1.0 vs 1.1).
- Scenario 259: Different Paths Never Grouped - Verify that two review pages on the same host with different paths (e.g. /review/cnp.fr and /review/axa.fr) stay two articles.
- Scenario 260: Subdomains Never Grouped - Verify that the same review page on two subdomains (e.g. www, uk or nl-be trustpilot.com) gives two articles.
- Scenario 261: Pagination Parameters Grouped - Verify that the pages of one review page that differ only by the page, p or pg parameter are grouped into one article.
- Scenario 262: URL Variants Not Merged - Verify that scheme, www or trailing-slash variants of one review page are not merged into one article (dev note GEO-1548).
- Scenario 263: Article Title Without Page Part - Verify that pages titled "Avis de CNP Assurances | Lisez les avis marchands de cnp.fr | 2 sur 30" give the article title "Avis de CNP Assurances" (Figma 1.1).
- Scenario 264: Untitled Grouped Article - Verify that a grouped review article with no page title shows its URL without https:// as title, with runs of spaces collapsed and the text cut before the first " | ", while a one-page review article keeps the engine citation title (dev 875175). *(new)*
- Scenario 265: Grouped Article Negative - Verify that a grouped article shows in Negative perception when at least one of its pages is negative.
- Scenario 266: Grouped Article in Lack of Visibility - Verify that a grouped article whose pages never name the brand shows in Lack of visibility as one article (Figma 1.3).
- Scenario 267: Not in Lack of Visibility When Named - Verify that a grouped article is not in Lack of visibility when one of its pages names the brand.
- Scenario 268: Same Article Count on Card and Panel - Verify that the card lines "Not visible in N articles" and "Negative perception in N articles" and the panel tab counts give the same number of articles for a review site.
- Scenario 269: Card Sort by Articles - Verify that the card sort based on failing articles counts grouped articles, not pages, so a review site no longer ranks higher only because it is paginated.
- Scenario 270: Exports Give the Same Article Count - Verify that the XLSX, PDF and PPTX exports give the same number of articles per review site as the card and the panel.
- Scenario 271: Review Count of an Article - Verify that an article whose pages hold 4, 2, 3 and 2 negative reviews counts 11 negative reviews in its chip.
- Scenario 272: Review Count in the Exports - Verify that the XLSX shows the number of negative reviews per article, equal to the panel chip and with no quote, and that the PDF and PPTX, which list the top 10 sources only, give a number of articles equal to the card and no article row (PO 873111). *(corrected)*
- Scenario 273: Other Sources One Article per URL - Verify that a source not classified Review Sites keeps one article per URL, including URLs that differ only by ?p= on a Journalism source (dev 868944).
- Scenario 274: Prompts Section Unchanged - Verify that the "Prompts associated with this source" section of a review site is unchanged, with its All and per-engine tabs and prompt rows (Figma 1.1).
- Scenario 275: Comparison Page Alone in Its Article - Verify that a review-site page without stored reviews that is the only page of its article keeps its classic passage (dev note GEO-1548).
- Scenario 276: Grouped Article Without Stored Review - Verify that a grouped review article none of whose pages holds a stored review is not counted as negative (not in Negative perception, not on the card count, not in the export), and that a page merged into a group never shows its classic passage (PO 873111). *(corrected)*
- Scenario 277: Card and Panel Agree on Any Source - Verify that the card count and the panel tab count also agree on a source not classified Review Sites, both counting verified pages only.

**Review Panel Layout (stories: GEO-1549)**

- Scenario 278: Reviews by Page - Verify that a grouped article lists its reviews by page in page order, each page block starting with the page URL as a link written without https:// and leading www. like the article URL line (the link opening the full URL), then its count (e.g. "4 negative reviews"), then its reviews (Figma 1.1, 1.2; dev 872953). *(corrected)*
- Scenario 279: Long Page URL in Full - Verify that a long page URL in a page block is shown in full and wraps, with no truncation.
- Scenario 280: Page Link Opens a New Tab - Verify that the page URL of a page block opens that page in a new tab and shows the external link icon (Figma 1.1).
- Scenario 281: No Empty Page Block - Verify that a page with no negative review gets no page block, so every block shows a count of 1 or more and at least one entry (Figma 1.1, 1.2).
- Scenario 282: Article Chip - Verify that the chip under the article title reads the number of negative reviews of the article, e.g. "17 negative reviews", shown in upper case by the design style (Figma 1.1).
- Scenario 283: Singular Forms - Verify that an article or a page with one negative review reads "1 negative review" (Figma 1.1).
- Scenario 284: No Page Count or Total - Verify that the panel shows no page-count chip, no "of 20 reviews", no "Page N" and no rating (PO 865680).
- Scenario 285: Grouped URL Line Plain Text - Verify that the URL line of an article grouping several pages (e.g. fr.trustpilot.com/review/cnp.fr) is plain text and opens nothing (Figma 1.1).
- Scenario 286: One-Page Review Page - Verify that a review page with one page has no page block, shows its reviews under the title, and that its URL line opens the page, as today (Figma 1.4).
- Scenario 287: Quote-Only Entry - Verify that each entry is the quote only, with no user name, rating or date (Figma 1.1).
- Scenario 288: First 10 Reviews Then Show More - Verify that an article with 17 negative reviews shows its first 10 reviews, the header of the page where the cut falls above its first review, then "Show 7 more reviews" (Figma 1.1).
- Scenario 289: Show More Expands the Article - Verify that a click on "Show 7 more reviews" shows all 17 reviews in page order and leaves no button and no "Show less" in the article (Figma 1.2).
- Scenario 290: Exactly 10 Reviews - Verify that an article with exactly 10 negative reviews shows them all with no Show more button.
- Scenario 291: Show 1 More Review - Verify that an article with 11 negative reviews shows "Show 1 more review".
- Scenario 292: More Than 20 Reviews - Verify that one click on "Show N more reviews" shows all the remaining reviews of the article, N being the total left, also when more than 20 reviews remain (Figma 1.2, designer 865575). *(corrected)*
- Scenario 293: Reviews and Articles Show More Together - Verify that "Show N more reviews" inside an article and "Show N more articles" of the list work independently in the same tab.
- Scenario 294: Cited-By Union - Verify that the cited-by icons of a grouped article are the engines that cite any of its pages.
- Scenario 295: Lack of Visibility Pages as Links - Verify that a review page in Lack of visibility shows as one article listing each of its pages, page 1 included, as a link, with no quote (Figma 1.3).
- Scenario 296: Lack of Visibility Without Chip - Verify that a review article in Lack of visibility shows no "N negative reviews" chip and no count per page (Figma 1.3).
- Scenario 297: Panel Frame Unchanged - Verify that the panel header and its chips, the tab subtitles "Each of these articles mentions {brand} negatively." and "None of these articles mentions {brand} anywhere on the page.", and the footer "Previous" · "Source N of M" · "Next source" are unchanged (Figma 1.1, 1.3).
- Scenario 298: OS Native Shell - Verify that in the Onclusive Social native shell the review panel is identical to the standalone one (Figma 2.1).
- Scenario 299: French Strings - Verify with the interface in French that the chip, page count and Show more texts match the locked FR strings in singular and plural, then restore en-GB.
- Scenario 300: Spanish Strings - Verify with the interface in Spanish that the chip, page count and Show more texts match the locked ES strings in singular and plural, then restore en-GB.

**Checks Needing Dev Evidence (stories: GEO-1547 & GEO-1548 & GEO-1549)**

- Scenario 301: Optional Review Fields - Verify with the dev test reports (872714) that candidates and verdicts without the new review fields keep today's behaviour with no error. *(corrected)*
- Scenario 302: Only Review Pages Re-judged - Verify with the dev test reports (872714) that after the deploy only review-site pages are re-judged once, while a non-review page keeps its passage. *(corrected)*
- Scenario 303: Not-Fetched Page Counts Nowhere - Verify that a page that was not fetched counts nowhere, with the card, the panel and the XLSX giving the same article count (dev evidence for the page state).
- Scenario 304: Group Without Checked Page - Verify with the dev test reports (872714) that a group whose pages were all not fetched or failed the check is in no tab. *(corrected)*
- Scenario 305: Older Article Format - Verify with the dev test reports (872714) that an article without pages in the API response renders as today's row with its passage. *(corrected)*

**Review Pages Previously Misjudged and Rules Kept on Other Sources (stories: GEO-1547)**

- Scenario 306: Trustpilot Pages Now Negative - Verify that review pages with negative reviews that were judged not negative (Victoria's Secret uk.trustpilot.com and trustpilot.com/review/www.victoriassecret.co.uk, Verisure es.trustpilot.com) are negative with review entries (dev 864969).
- Scenario 307: Review Entries Instead of Header - Verify that MSC Croisières fr.trustpilot.com shows review entries instead of the page header as its passage (dev 858815, 864969).
- Scenario 308: Negative Pages Stay Negative - Verify that MSC fr.trustpilot.com and the routard.com forum, Victoria's Secret nl-be and www trustpilot.com, the USPS prc.gov PDF and Verisure comparador-alarmas.es stay negative, with no negative passage on a page judged not negative (dev 858472).
- Scenario 309: No Chrome on Other Sources - Verify that on non-review sources (e.g. Toyota: edmunds, alvolante, frandroid, caradisiac) no passage is a page title, cookie banner, menu or favourable sentence, and that a criticism naming the brand late is joined to the nearest brand name with "…" (dev 860052).
- Scenario 310: No Quote Rather Than Header - Verify that a non-review article with no good quote stays listed without a quote rather than showing the page title, its H1 header or a byline with date and share widget (PO 859761, dev 875705). *(corrected)*
- Scenario 311: 140-Character Rule on Other Sources - Verify that passages of non-review sources stay at 140 characters or less, cut with a single "…" on a whole word (140-character passage rule).

##### Cross-Epic Integration

**Natural Answer From Collection to Display (stories: GEO-1551 & GEO-1553 & GEO-1556 & GEO-1566 & GEO-1569)**

- Scenario 312: One Ranking Everywhere - Verify on one natural Visibility prompt and engine that the brands and ranks read by the reader are the same in the panel ranking rows, the highlights of the answer, the brand's row of Brand Rankings and the Excel "Ranking" column.
- Scenario 313: Products Folded the Same Way - Verify on an answer naming several products of one brand that the panel shows one row for the brand family, Brand Rankings keeps the product rows at their own first-mention position, and the Share of Voice counts the brand once in that answer.

**Competitive Outcome From Parsing to Every Surface (stories: GEO-1554 & GEO-1556 & GEO-1570 & GEO-1569 & GEO-1571)**

- Scenario 314: One Outcome, Six Places - Verify that the outcome read for one engine of a competitive question is the same on the engine pill, the outcome card, the "Winner / Themes" cell, the AI Choice donut hover count, the Excel "Ranking" cell and the PowerPoint AI Choice figure.
- Scenario 315: AI Choice Value Matches the Donut - Verify that the AI Choice KPI value equals Chosen plus Conditional over the counted answers shown in the donut hover, and that the brand's AI Choice in Brand Rankings gives the same value for the same scope.

**Not Counted and Failed Answers Across Epics (stories: GEO-1555 & GEO-1568 & GEO-1570 & GEO-1569 & GEO-1597)**

- Scenario 316: Not Counted End to End - Verify that a cut, refused or empty natural answer is left out of Visibility, Share of Voice and AI Choice, shows "Not counted" on its pill, its tab and, when no engine is counted, in the table cell, and has no Excel Raw Data row.
- Scenario 317: Not Triggered Next to Not Counted - Verify on one question with ChatGPT, Gemini and AI Overviews that a "Not triggered" AI Overview and a not counted answer use the same grey badge in the same place and size, compact pills included, and both hide the section "Extracted from this answer".

**AI Overviews Through the Shared Reader and Panel (stories: GEO-1598 & GEO-1599 & GEO-1600 & GEO-1564 & GEO-1566 & GEO-1567 & GEO-1570)**

- Scenario 318: AI Overview Read Like ChatGPT and Gemini - Verify on one question answered by ChatGPT, Gemini and AI Overviews that the three tabs share the clamp, the brand highlights, the citation numbering, the mini card and the Sources card, and that the AI Overviews ranking or outcome follows the same rules.
- Scenario 319: AI Overviews in AI Choice and Excel - Verify that AI Overviews competitive outcomes count in the AI Choice donut and the questions table cell like any engine, and that its Excel Raw Data rows carry its full answer and "Ranking" under the name "Google AI Overviews".
- Scenario 320: Engine Order in the New Panel - Verify that the engine pills and tabs of the question drawer, the AI Choice filter and the Excel Raw Data rows follow ChatGPT, Gemini, Google AI Overviews, Grok, Claude, Perplexity.

**Share of Voice Formula Feeding Others (stories: GEO-1553 & GEO-1556 & GEO-1571 & GEO-1587 & GEO-1588 & GEO-1589 & GEO-1590 & GEO-1600)**

- Scenario 321: Donut Adds Up on Every Date - Verify on a natural date and on a date collected before the change that the slices and Others add up to 100% and that Others equals the sum of the brands listed in its tooltip and in the Excel table.
- Scenario 322: Products Count Once in Others - Verify that a brand named through two products in one answer counts once in the donut, the Others tooltip and the Excel Share of Voice table, as the new Share of Voice tooltip text says.
- Scenario 323: No-Brand Answers Out of the Denominator - Verify that adding a no-brand answer to the scope leaves the Share of Voice of the donut, the Others list and the Excel table unchanged.
- Scenario 324: Others per Engine - Verify that filtering the dashboard on one engine, AI Overviews included, gives the donut, the Others tooltip, the deck line and the Excel Share of Voice table of that engine's answers only.

**Target Sources With the New Search Sources (stories: GEO-1556 & GEO-1576 & GEO-1547 & GEO-1548 & GEO-1549)**

- Scenario 325: Review Pages From Search Sources - Verify that after a run with natural answers the review-site pages coming from the engines' search sources are grouped into one article per review page, with review entries and the same article count on the card, the panel and the XLSX.
- Scenario 326: Brand Image Sources in Target Sources - Verify that a review page cited only by a Brand Image answer appears in the Target Sources list and Cited sources and follows the review page rules in the panel.
- Scenario 327: Gap Answers Feed Review Pages - Verify that review pages cited by Not chosen and Overlooked answers feed Target Sources while those cited only by Conditional answers do not.
- Scenario 328: Two Drawers Alike - Verify that the question drawer and the Target Sources review panel open at the same 470px width with the same focus trap, Escape and arrow-key navigation, in both shells.

**One Export, Several Epics (stories: GEO-1569 & GEO-1571 & GEO-1589 & GEO-1590 & GEO-1600 & GEO-1548)**

- Scenario 329: Excel Workbook of the Release - Verify that one Excel export of a natural analysis with AI Overviews has the Raw Data sheet with "Ranking" and no Favorability, the Share of Voice table next to a ranking table without a Share of Voice column, "Google AI Overviews" in every engine list and the negative review count per review article, and that a long period of a large analysis exports without a timeout (dev 875769).
- Scenario 330: PowerPoint and PDF of the Release - Verify that one PowerPoint and one PDF export show "AI Choice", the Others chip and line under the donut, "Google AI Overviews" and Grok before Claude in the engine lists.

**French and Spanish Across the Release (stories: GEO-1570 & GEO-1571 & GEO-1588 & GEO-1589 & GEO-1590 & GEO-1596 & GEO-1597 & GEO-1549)**

- Scenario 331: French Pass - Verify with the interface in French the outcome labels, "Choix IA" and its definitions, the Share of Voice tooltip, the "Autres" tooltip header and "et N autres marques", the "Part de voix %" Excel header, the AI Overviews banner and tab texts and the review chips, then restore en-GB.
- Scenario 332: Spanish Pass - Verify the same strings with the interface and exports in Spanish ("Elección de IA", "Otros", "Cuota de voz %", "Seleccione al menos un motor de IA"), then restore en-GB.

##### Non-Regression

**Engines and Analyses Not Changed by the Release (stories: GEO-1550 & GEO-1552 & GEO-1556 & GEO-1562 & GEO-1568 & GEO-1569)**

- Scenario 333: Structured Engine Unchanged - Verify that an engine not switched to natural answers keeps today's answers, ranking rules and top-10 cap (GEO-1552 scope note, GEO-1562 AC3).
- Scenario 334: Older Analysis Across Views - Verify that an analysis run before the release opens the dashboard, the question drawer, the questions table, Brand Rankings, the Excel and the deck with no empty widget and no error, its answer cards showing the excerpt (GEO-1556 AC1, GEO-1568 AC5, GEO-1569 AC6).
- Scenario 335: Past Snapshots Not Re-read - Verify that natural snapshots collected before Brand Image sources existed are not re-extracted and keep no Brand Image source (PO 872445).

**Surfaces Kept as Today (stories: GEO-1569 & GEO-1571 & GEO-1570 & GEO-1587 & GEO-1588 & GEO-1572 & GEO-1549)**

- Scenario 336: Brand Pillars Sheet - Verify that the Brand Pillars sheet of the Excel export keeps its Favorability column and row tint (PO 870232).
- Scenario 337: Scheduled Emails and Deck Ring - Verify that scheduled emails are unchanged and that the PowerPoint and PDF AI Choice ring keeps one colour, only the metric name changing (GEO-1498 surfaces).
- Scenario 338: Upper-Case AI Choice Headers - Verify that the matrix axis "AI CHOICE" and the Excel trend header "AI CHOICE (%)" stay as they are (PO 870232).
- Scenario 339: Brand Slices of the Donut - Verify that the brand slices of the Share of Voice donut keep their values, order and name pill on hover, only exact ties being reordered A to Z (GEO-1587 scope note, GEO-1588 TAC9).
- Scenario 340: Target Sources Drawer - Verify that the Target Sources drawer opens, closes and navigates as before the drawer of the question panel was built on the same mechanism (GEO-1572 TAC2).

**Lite Analysis (stories: GEO-1588 & GEO-1600 & GEO-1550)**

- Scenario 341: Lite Share of Voice Donut - Verify that the Share of Voice donut of the free Lite analysis keeps today's behaviour with no Others tooltip (GEO-1537 out of scope, GEO-1588 TAC7).
- Scenario 342: Lite Analysis Engines and Answers - Verify that the Lite analysis shows no Google AI Overviews and keeps today's answers and display (GEO-678 and GEO-1005 out of scope).

**Organisations and Engine Settings (stories: GEO-1595 & GEO-1600)**

- Scenario 343: Existing Organisations and Analyses - Verify that existing organisations keep their allowed engines with Google AI Overviews off and that their analyses show the same engines as before the release (GEO-1595 AC2, GEO-1600 AC6).

#### Edge Cases & Boundary Conditions

**GEO-678**

* Answer naming more than 10 brands: every brand counts for Visibility and Share of Voice; Average Position keeps ranks 1 to 10.
* Answer naming no brand: brand not named, out of the Share of Voice denominator and of the question status, not a refusal.
* Products of one brand: the brand ranks at the first mention of its family; a product row shows the position of its own first mention ("Brooks Ghost, HOKA Clifton, Brooks Glycerin" gives Brooks 1, HOKA 2, Brooks Glycerin row 2) (PO 870318).
* Product row Share of Voice: counts 1 per answer naming it over its brand's denominator, products can add up to more than their brand (PO 869747).
* Brand only in a link URL, a source title or a domain: not named; brand in the label of a link in the text: named (PO 869743).
* "It depends" answer where the brand wins a case: Conditional; hedged preference with an exception for the competitor: Conditional (PO 873117); no brand picked in any case: not counted (dev 872677).
* Conditional answer where the brand wins no condition: Overlooked.
* Negatively framed question: the outcome follows the conclusion, never the order of the names.
* Cut, refused or empty answer, or a failed extraction: left out of the metric it feeds on new dates only, never counted as not named, unranked or not chosen.
* Capture fails: API fallback with the same engine; fallback fails too: not counted.
* Country the vendor cannot target for an engine: API fallback for that engine in that country.
* API route: at most 5 search results per answer, so an API answer lists fewer sources than a captured one.
* Passing mention that only supports another topic: fills no card (PO 871829).
* Manager complaints at any level and the CEO approval rating in employee reviews: Employer Brand, not Leadership (PO 876974).
* Existing analysis above the prompt pool after prompts 5 to 9 are added: allowed, adding prompts stays blocked until the count fits.
* Analyses produced before the change: not re-parsed, first rank = Chosen, any other = Not chosen, no Conditional or Overlooked, no trend marker.
* Natural snapshots read before Brand Image sources existed: not re-read, the next runs bring the sources (PO 872445).

**GEO-1498**

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

**GEO-1537**

* Others with 6 brands: 6 rows, no "more" line; 11 brands: "and 1 more brand"; 1 brand: "1 brand".
* Two brands with different exact values both shown "2%": kept in exact-value order; exact ties only: A to Z (PO 875591).
* Brand under 0.5%: "~0%"; Others rounding to 0: "~0%" on the slice, the legend and the header.
* Scope with more than 100 brands: 100 rows then "and {N} more brands"; 101 brands: "and 1 more brand".
* Large counts: "1,427 brands" / "1 427 marques" / "1.427 marcas"; "and 26,391 more brands" / "et 26 391 autres marques" / "y 26.391 marcas más" (PO 875646).
* Tracked brand beyond rank 100: not in the Excel Share of Voice table, nothing points to it (PO 875646).
* Tracked brand in Others: listed like any other brand.
* 10 brands or fewer, all at 0.5% or more: no Others slice, no tooltip, no chip, no line.
* No period selected: deck hole and slices on the last analysis date (PO 876975).
* Long or non-Latin brand names: the deck line lists fewer brands and the count grows.
* Touch screens: no tooltip on tap in this release (PO 875646).
* Unbranded landscape card: the tooltip opens to the right of the ring and keeps today's tail anchor (dev 876695).
* Other category sheet of the Excel export: no Share of Voice table.

**GEO-1005**

* Excluded country (6 on 6 Nov 2026): no capture, not a failure, "Not available" in the panel.
* Every selected country excluded with AI Overviews as the only engine: creation allowed; the run fails with "No selected engine applies to the selected countries." (PO 876279).
* Capture with no usable AI Overview: not counted, no API fallback, never sent to Gemini.
* Prompt with no AI Overview: "Not triggered", no metric value, no trend point, no Excel row.
* AI Overview partly behind "Show more": stored in full.
* AI Overview citing links but no numbered marker: "no inline citations" in the header, sources still listed.
* 4 engines or more: logo-only pill, name in the tooltip.
* {countries} with several countries: joined in the page language, no hard-coded "and" (PO 876972).

**GEO-1226**

* Page with more than 10 negative reviews: 10 entries, count "10 negative reviews", nothing says more exist (epic changelog 2026-10-22).
* Review longer than 140 characters: cut to 140 or less, "…" included, single "…" character, on a word boundary; 140 or less: shown whole.
* Review that does not name the brand: listed on a single-company review page only; a comparison page on a Review Sites domain keeps the one-passage rule with the brand name (PO 869090).
* "The brand" includes its products: a review page of a product (e.g. Digimind) counts as a page about the brand (Onclusive) (dev 868944, PO 869090).
* Google Play and App Store pages: out of scope, today's rule (PO 869090).
* Same host, different paths: never grouped; same review page on two subdomains (fr vs fr-be, www vs uk): two articles.
* Scheme, www or trailing-slash variants of one review page: never merged (dev note GEO-1548).
* page, p or pg parameter: grouped on Review Sites only; ?p= on any other source type stays one article per URL (dev 868944).
* Grouped article with at least one negative page: Negative perception; Lack of visibility only when none of its pages names the brand.
* Grouped article none of whose pages holds a stored review: not negative in the tab, on the card or in the export; no classic passage for a merged page (PO 873111).
* Group whose pages were all not fetched or failed the check: in no tab; a page not fetched counts nowhere.
* Comparison page without stored reviews alone in its article: classic passage (dev note GEO-1548).
* Article with exactly 10 reviews: no Show more; 11 reviews: "Show 1 more review"; 17 reviews: "Show 7 more reviews", then all 17 and no button left; one click always shows all the remaining reviews.
* 10th review inside a page: that page's header shows above the reviews before the cut, the rest after the click (Figma 1.1).
* One-page review page: no page block, reviews under the title, URL line is a link.
* Page with no negative review: no page block (Figma 1.1, 1.2).
* Long page URL: shown in full and wraps.
* Lack of visibility review article: pages as links, no quote, no chip, no count (Figma 1.3).
* Non-review article with no good quote: listed without a quote, never the page header (PO 859761).
* Reviews in a foreign language: quoted verbatim in the page language, not translated.
* Review repeated within a page or across page blocks: listed once, counts are distinct reviews (dev 875183).
* Grouped article with no page title: URL without https:// as title; one-page review article: engine citation title (dev 875175).
* Non-review pages fixed by the earlier passage work (press release passage, Google Play app page): out of scope of this epic (PO 875376).

**Cross-epic**

* Same answer seen on the panel, Brand Rankings and Excel: one ranking, one outcome, one citation numbering.
* Grey badge in the pill: "Not counted", "Not triggered" and "Not available" share its place, size and colour.
* Natural and pre-change dates in one period: Share of Voice on the new formula for both, ranks and outcomes as stored for the older dates.

#### Open Points (not blocking)

**GEO-678**

* GEO-1554: the reader test set holds Conditional answers only after the relabel (all 67 counted answers); whether collected answers for Chosen, Not chosen and Overlooked will be added is not answered (873295, 876545), so Scenario 28, Scenario 29, Scenario 32 and Scenario 33 need real staging prompts that give these outcomes.
* GEO-1562 AC3: an engine not switched at release stays on its API route, while the PM expects every engine to switch at release (870232 point 7); how one analysis date mixing a switched and a structured engine is shown is still open (876571).
* GEO-1550 / GEO-1558 / GEO-1560 / GEO-1561: the raw body, the route, the vendor, the capture time and locale and the country parameter or hint are not visible in the UI; Scenario 2, Scenario 64, Scenario 65, Scenario 71, Scenario 72 need dev evidence (stored rows or test reports); GEO-1561 AC1 (one vendor behind a layer) is architecture and is not testable by QA.
* GEO-1562 AC2: the switch decision per engine with no threshold is a process, not a behaviour; the comparison reports posted on GEO-678 (875132, 875549) are its evidence, no scenario.
* GEO-1550 AC3: "matches the kind of answer a real user would receive" has no measurable criterion; Scenario 1 checks the shape only.
* GEO-1556 AC13: Grok runs with no web search, so its natural answers have no source; turning its search on is to investigate with Engineering, so no source is expected for Grok in 1.4.
* GEO-1556 AC7 / AC10: the matrix bands and the Share of Voice bands are to be reviewed on the first runs with natural answers; the plan tests today's values.
* Prerequisite: the engines switched to natural answers and to rendered capture on staging and the organisations they apply to (staging guards), the Cloro dev key on staging (PO 870319), and a way to force a failed capture, a failed extraction and a failed fallback for Scenario 39, Scenario 41, Scenario 42, Scenario 74, Scenario 76.
* Prerequisite: test analyses with a France - French market and English insights, an unbranded analysis, an existing brand analysis created before the change, a homonym brand, a rebranded brand and a brand that is a retailer or review site.

**GEO-1498**

* GEO-1498 / GEO-1562: how one analysis date mixing an engine switched to natural answers and an engine still structured is displayed is not answered (870232 point 7, 876544, 876571); no scenario until it is.
* GEO-1567 / GEO-1564: FR / ES copy of the citation strings (P1), AC5 "two numbers per row" (P2) and the clamp at 184 px / 8 lines (D1) are built at proposed defaults not yet confirmed by the PO and design; Scenario 105, Scenario 130 and Scenario 133 test these defaults as pending.
* GEO-1608: the images of the answer card (frames 08a, 08b) have ACs to be revised with the PM; no scenario in this plan.
* GEO-1571 AC2: the Share of Voice tooltip placement (info icon next to the chart title) is a PO decision (870232) not written in the AC text.
* Prerequisite: staging analyses with natural answers for every question type and engine, an unbranded analysis, an analysis run before the release, answers with tables, code blocks, out-of-order citations, an excluded source domain, a Japanese or Chinese answer, and competitive questions giving each outcome mix of the table.
* Prerequisite: access to the Onclusive Social native shell on staging for Scenario 101, and FR / ES interface for Scenario 156, Scenario 175, Scenario 176, Scenario 177, restoring en-GB after.

**GEO-1537**

* GEO-1588: on a small Others the tooltip covers the left part of the arc and a neighbour's label, and the dark tail is hard to see on the grey arc; raised to design as design questions (876731), no decision yet — Scenario 184 checks the anchor only.
* GEO-1588: the tail anchor of the unbranded landscape card is being checked with design (876695).
* GEO-1588 AC7 (and epic US 1.1 AC7): the AC text still asks for "the data variant of the design system Tooltip", which does not exist; the reference is the GEO-1543 component "GEO / Others Tooltip [2.0]" (875353, 876695) — AC text not yet updated in the epic.
* GEO-1588 DAC2: "(to confirm by design)" is confirmed by design (875353, frame 1.4); check that the Jira text is aligned.
* GEO-1589 AC7 / GEO-1590 AC5: the shared criterion still ends with the outdated note "(today the deck slices use the last analysis date of the period only…)", removed from the epic by the PM (876975) and asked to be removed from both stories (876976, 876977) — AC text not yet updated; Scenario 200 tests the whole period.
* GEO-1588 AC3: Others equal to the sum of its brands needs the Share of Voice formula of GEO-1556 on every date.
* Prerequisite: staging analyses with an Others slice of more than 10 brands, one of fewer than 10, a scope naming more than 100 brands, a brand under 0.5%, exact-value ties, the tracked brand inside Others, an unbranded analysis, and FR / ES interface and exports.

**GEO-1005**

* GEO-1596 AC9: one banner with one line per Google engine needs Google AI Mode (GEO-1006), which has no story yet; not testable in this plan.
* GEO-1599 AC2 to AC5 (images) are moved to GEO-1608 (876497) and get no scenario; AC6 (broken image hidden) is not testable since the vendor returns no image in the AI Overview, and AC7 is checked on text and citations only (Scenario 235).
* GEO-1598 AC4: no image is returned by the vendor, so "images not read" is checked only as text-only reading (Scenario 232).
* GEO-1597: how "Not available" (excluded country) shows in the Excel Raw Data and in the trends is not defined (dev 876069); no scenario until answered.
* GEO-1597: how "Not triggered" and "Not available" show in the Questions Analysis table is not defined; the ACs and frame 04d cover the question panel only.
* GEO-1596 / GEO-1597: leaving AI Overviews out of the metrics for a whole excluded country is stated in a dev comment (876069) and not in the ACs — AC text not yet updated.
* GEO-1596 AC5: the excluded-country list comes from the vendor and can change (876069); the plan uses the 6 countries of 6 Nov 2026 and the stored list read before the run.
* GEO-1005: the approval to capture the Google surfaces is still "to confirm"; tests run on staging only.
* Prerequisite: the stories deployed on staging, AI Overviews answers captured with the Cloro dev key, the corrected FR / ES strings (876972, 877165), and prompts that give no AI Overview (97% of 165 real prompts had one, 876490), e.g. generic UK Visibility prompts.

**GEO-1226**

* GEO-1549: the epic says the Show more of reviews takes "the same step as the articles list (GEO-1161)", while Figma 1.2 and the designer (865575) show one click revealing all the rest; the plan follows Figma (Scenario 289, Scenario 292); the epic text is not aligned and no PO comment covers more than 20 reviews.
* GEO-1548 AC3: title rule for review sites other than Trustpilot — which title formats count as the page part ("Page 2", "- Page 3", "(2/29)"…) and which page's title the article uses (no answer in any comment).
* GEO-1548: a one-page review article keeps the engine citation title with its runs of spaces (e.g. "Orange   Avis   246"), as story AC T10 says; cleaning these titles too is left to the PM, no decision yet (dev 875175) — Scenario 264.
* GEO-1547 AC2 vs Figma 1.1, 1.2 and 2.1: demo reviews of 68 to 87 characters end with "…"; the AC wins (cut only above 140 characters) — Scenario 244.
* GEO-1547 TAC1, GEO-1548 TAC4, GEO-1549 TAC3: not testable in the UI; the dev test reports (872714) are the evidence (Scenario 301, Scenario 304, Scenario 305); GEO-1547 TAC2, TAC3, TAC5 and GEO-1548 TAC1, TAC3 are only partly visible (Scenario 302, Scenario 245, Scenario 257, Scenario 261, Scenario 303).
* GEO-1547 (dev note): the judge was validated on synthetic fixtures; the tests must use real staging review pages, not only the ticket example.
* Prerequisite (all stories): staging analyses with a paginated single-company review page on a Review Sites domain, run after the review-v1 deploy; the cases with no staging data (fewer than 10, 11 or 17 reviews, cut inside a page, multi-page Lack of visibility article, more than 10 articles, ?p= / ?pg= URLs) are covered by the dev unit tests (873345), live data still to be found for them and for a long page URL and a page with more than 10 reviews; is there a staging equivalent of CNP Assurances, or may AC1 / AC3 be checked read-only on production?
* Prerequisite (GEO-1549): read access to the strings sheet tab "GEO-1226 Review pages" for the FR / ES expected texts, and the build where the provisional FR / ES translations are replaced (dev note GEO-1549) — Scenario 299 and Scenario 300.
* Prerequisite (GEO-1549): access to the Onclusive Social native shell on staging (Figma 2.1); the shell demo texts of the frame are not part of the delivery — Scenario 298.
* Prerequisite (GEO-1547): review mode has no UI marker; the panel API response (reviews / pageTitle / grouped) or the dev must tell which pages got review mode and which were treated as comparison pages — Scenario 247, Scenario 254, Scenario 275.
* Prerequisite: the GitHub specs of epic 49 were not read (no access from this workflow); the Jira ACs copied in the local story files are the reference.

**Cross-epic**

* GEO-1006 (Google AI Mode): no Story / Task in Jira (6 planned stories, 36 ACs); not planned. The one banner for two Google engines (GEO-1596 AC9), the AI Mode place in the engine order, its "Not available" state next to AI Overviews and its colour #EA4335 are to be planned when its stories exist.
* GEO-1212 (AI Disclosure): no Story / Task in Jira (6 planned stories, 26 ACs); not planned. The disclosure footer on the analysis page, in the question drawer and the Target Sources review panel, and the line on the deck, the PDF and every Excel sheet (including the Raw Data row 1 shift) are to be planned when its stories exist.
* GEO-1532 (EPIC-052, Lite on natural answers): excluded by the user's list; the Lite analysis is checked only as non-regression.
* Cross-epic data: one staging analysis on natural answers with ChatGPT, Gemini and AI Overviews, a review-site page in its sources, an Others slice of more than 10 brands and a scope above 100 brands would let Scenario 314, Scenario 318, Scenario 324, Scenario 325 and Scenario 329 run on the same data.

**Environment:** Staging (https://staging-geo.onclusive.com/geo), org QA-GEO (review-site analyses also in org GEO Stress Test 2026-10), interface en-GB checked with GET /geo/api/v1/auth/me (FR and ES only for the string scenarios, then en-GB restored); standalone shell and Onclusive Social native shell; Excel, PowerPoint and PDF exports.

**Priority:** High

#### AC Coverage by Story

Result: **265 / 279 functional ACs covered** across the 5 planned epics (GEO-678 96/98, GEO-1498 73/79, GEO-1537 31/31, GEO-1005 34/40, GEO-1226 31/31).

##### GEO-678 — Natural Answer Collection and Parsing

Result: **96 / 98 functional ACs covered** (GEO-1550 6/6, GEO-1551 8/8, GEO-1552 9/9, GEO-1553 4/4, GEO-1554 12/12, GEO-1555 8/8, GEO-1556 16/16, GEO-1558 5/5, GEO-1559 2/2, GEO-1560 5/5, GEO-1561 3/4, GEO-1562 2/3, GEO-1557 12/12, GEO-1576 4/4); the ACs with no scenario are flagged "No" with their reason and listed in Open Points, and "No — dev evidence" marks a scenario that needs dev evidence rather than the UI. Technical ACs are not mapped one by one: the observable ones are covered by the scenarios of their story, the others need dev evidence. "Partial" = only the visible output is testable.

**GEO-1550 — Engines answer questions naturally**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Natural response | 1 | Yes |
| AC2 | Raw answer preserved | 2 | No — dev evidence |
| AC3 | Real-user answer | 1 | Partial (no measurable criterion) |
| AC4 | No language instruction | 3 | Yes |
| AC5 | Other and Category Topics prompts | 5 | Partial (setup calls not visible) |
| AC6 | GEO text in the insights language | 4 | Yes |

**GEO-1551 — Derive structured results from the natural answer**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Ranking of named brands only | 6 | Yes |
| AC2 | Competitive outcome, no ranking | 7 | Yes |
| AC3 | Perception themes | 8 | Yes |
| AC4 | Sources with links | 9 | Yes |
| AC5 | Same results whatever the route | 10 | Partial (comparison report) |
| AC6 | Formatted text kept | 11 | Yes |
| AC7 | Brand mentions located | 12 | Yes |
| AC8 | Citation markers linked | 13 | Yes |

**GEO-1552 — Recognise the brand in a natural answer**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Brand or product named | 14 | Yes |
| AC2 | Former name | 15 | Yes (depends on what the engine writes) |
| AC3 | Titles, links, domains | 16 | Yes |
| AC4 | Whole answer read | 17 | Yes |
| AC5 | Homonyms | 18 | Yes (depends on what the engine writes) |
| AC6 | Tone does not matter | 19 | Yes |
| AC7 | Non-brands left out | 20 | Yes |
| AC8 | No top-10 cap | 21 | Yes (depends on what the engine writes) |
| AC9 | Tracked brand always a brand | 22 | Yes |

**GEO-1553 — Rank brands in a natural answer**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Rank by first mention | 23 | Yes |
| AC2 | Lists and sections ignored | 24 | Yes |
| AC3 | Products fold into their brand | 25 | Yes |
| AC4 | No brands named | 26, 45 (verdict display: GEO-1498) | Yes |

**GEO-1554 — Read the competitive outcome in four buckets**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Four outcomes, picked brands stored | 27 | Yes |
| AC2 | Chosen | 28 | Yes (test data, open point) |
| AC3 | Chosen by lack of evidence | 29 | Yes (test data, open point) |
| AC4 | Conditional, brand wins a condition | 30 | Yes |
| AC5 | Conditional, tie or joint winners | 31 | Yes |
| AC6 | Not chosen | 32 | Yes (test data, open point) |
| AC7 | Overlooked | 33 | Yes (test data, open point) |
| AC8 | No condition stored | 34 | Yes |
| AC9 | Declined or rejected | 35 | Yes |
| AC10 | Negatively framed question | 36 | Yes |
| AC11 | One outcome per configured brand | 37 | Yes |
| AC12 | Unbranded analysis | 38 | Yes |

**GEO-1555 — Stay resilient when a natural answer cannot be fully parsed**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Partial extraction kept | 39 | Partial (failure to be forced) |
| AC2 | No usable data | 40 | Partial (failure to be forced) |
| AC3 | Failed extraction out of its metric | 41 | Partial (failure to be forced) |
| AC4 | Raw answer kept (delivered by GEO-1550) | 2 | No — dev evidence |
| AC5 | Themes in full, failure per country and category | 42 | Partial (failure to be forced) |
| AC6 | Next run extracts again | 43 | Partial (failure to be forced) |
| AC7 | Cut, refused, empty not counted | 44 (panel display: GEO-1498) | Yes |
| AC8 | No brand is not a refusal | 45 | Yes |

**GEO-1556 — Preserve existing metrics and downstream views**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Every view renders | 46 | Yes |
| AC2 | Visibility | 47 | Yes |
| AC3 | Average Position | 48 | Yes |
| AC4 | AI Choice | 49 | Yes |
| AC5 | Every reader of "won" | 50 | Yes |
| AC6 | Improvement thresholds | 51 | Yes |
| AC7 | Prioritization matrices | 52 | Yes |
| AC8 | Target Sources gap answers | 53 | Partial (gap selection seen through the sources listed) |
| AC9 | Share of Voice | 54, 55 | Yes |
| AC10 | SOV bands | 56 | Yes |
| AC11 | Perception themes | 57 | Yes |
| AC12 | Off-topic and little-known | 58 | Yes |
| AC13 | Sources | 59 | Yes (Grok, open point) |
| AC14 | Search sources in Citation and Target Sources | 60 | Yes |
| AC15 | Cards and ads | 61 | Partial (cards not shown) |
| AC16 | Analyses produced before the change | 62 | Yes |

**GEO-1558 — Collect answers the way a real user sees them**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Rendered capture for public surfaces | 63 | Partial (route not visible in the UI) |
| AC2 | Raw capture kept | 64 | No — dev evidence |
| AC3 | Route and vendor stored | 65 | No — dev evidence |
| AC4 | Capture residue removed | 66 | Yes |
| AC5 | Failed capture | 74 | Partial (failure to be forced) |

**GEO-1559 — Keep account-gated engines on the official API**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Claude and Grok on API | 67 | Partial (route not visible in the UI) |
| AC2 | Perplexity on API | 68 | Partial (route not visible in the UI) |

**GEO-1560 — Keep per-country capture**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Answer of the country | 69 | Yes |
| AC2 | One answer per country | 70 | Yes |
| AC3 | Country parameter or hint | 71 | No — dev evidence |
| AC4 | Vendor country setting | 72 | No — dev evidence |
| AC5 | Country the vendor cannot target | 73 | Partial (route not visible in the UI) |

**GEO-1561 — Fall back to the API when capture fails**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One vendor behind a layer | — | No — architecture (open point) |
| AC2 | API fallback | 74 | Partial (failure to be forced) |
| AC3 | Fallback counted, keeps API route | 75 | Partial (route not visible in the UI) |
| AC4 | Both fail, not counted | 76 | Partial (failure to be forced) |

**GEO-1562 — Compare each engine before switching it to rendered capture**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Comparison of the parsed results | 77 | Yes (SUPER_ADMIN) |
| AC2 | Decision per engine, no threshold | — | No — process (open point) |
| AC3 | Not switched = API | 78 | Partial (open point) |

**GEO-1557 — Suggest Brand Image prompts that cover each Corporate Reputation card**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | The 10 suggested prompts | 79 | Yes |
| AC2 | Pool count unchanged | 80 | Yes |
| AC3 | Cards from what the answer says | 81, 82, 83 | Yes |
| AC4 | Brand territories | 84 | Yes |
| AC5 | Founder or history is not Leadership | 85 | Yes |
| AC6 | Removal popup in the wizard | 86 | Yes |
| AC7 | Removal warning in Manage Scope | 87, 88 | Yes |
| AC8 | No card sub-label | 89 | Yes |
| AC9 | No Brand Image prompt kept | 90 | Yes |
| AC10 | Unbranded analysis | 91 | Yes |
| AC11 | Existing analyses get prompts 5 to 9 | 92 | Yes |
| AC12 | Country added later | 93 | Yes |

**GEO-1576 — Show the sources of natural Brand Image answers**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Sources on the cards | 94 | Yes |
| AC2 | No source on an empty card | 95 | Yes |
| AC3 | Brand Image sources in Cited and Target Sources | 96 | Yes |
| AC4 | Structured Brand Image answers | 97 | Yes |

##### GEO-1498 — Natural Answer Display in the Question Panel

Result: **73 / 79 functional ACs covered** (GEO-1564 7/7, GEO-1565 2/2, GEO-1566 14/14, GEO-1567 9/9, GEO-1568 5/5, GEO-1569 9/9, GEO-1570 19/19, GEO-1571 2/2, GEO-1572 6/6, GEO-1608 0/6); the ACs with no scenario are flagged "No" with their reason and listed in Open Points, and "No — dev evidence" marks a scenario that needs dev evidence rather than the UI. Technical ACs are not mapped one by one: the observable ones are covered by the scenarios of their story, the others need dev evidence. "Partial" = only the visible output is testable.

**GEO-1564 — Read the full answer in the question panel**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Long answer clamped | 105 | Yes (184 px / 8 lines pending, open point) |
| AC2 | Short answer in full | 106 | Yes |
| AC3 | Expand in place | 107 | Yes |
| AC4 | Collapse scrolls back | 108 | Yes |
| AC5 | Rich content | 109 | Yes |
| AC6 | Stable layout across engines | 110 | Yes |
| AC7 | Character count | 111 | Yes (CJK data needed) |

**GEO-1565 — Keep the question and the engine visible while reading**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Question and engine pinned | 112 | Yes |
| AC2 | New tab clamped and at the top | 113 | Yes |

**GEO-1566 — Trace the extracted results back to the answer**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Every ranked brand highlighted | 114 | Yes |
| AC2 | Other names highlighted | 115 | Yes |
| AC3 | Row scrolls to first mention | 116 | Yes |
| AC4 | Outcome card, no About card | 117 | Yes |
| AC5 | Brand family with engine name | 118 | Yes |
| AC6 | Unbranded competitive panel | 119 | Yes |
| AC7 | No brands named | 120 | Yes |
| AC8 | Extracted from labels | 121 | Yes |
| AC9 | Order and subtitles | 122 | Yes |
| AC10 | Nothing to extract | 123 | Yes |
| AC11 | Logos, no cap, family rows | 124 | Yes |
| AC12 | Older dates one row per family | 125 | Yes |
| AC13 | Position card names the brand | 126 | Yes |
| AC14 | Older dates keep stored places | 127 | Yes |

**GEO-1567 — Resolve inline citations to their sources**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Shared numbering | 128 | Yes |
| AC2 | Renumbered by first citation | 129 | Yes (data needed) |
| AC3 | Mini card | 130 | Yes (FR / ES copy pending) |
| AC4 | Same page, one number | 131 | Yes |
| AC5 | Other Sources cards unchanged | 132 | Yes |
| AC6 | Cited first, then the others | 133 | Yes (two numbers per row pending) |
| AC7 | Marker opens the full list | 134 | Yes |
| AC8 | Citation count | 135 | Yes |
| AC9 | All sources count | 136 | Yes |

**GEO-1568 — Keep the answer readable when parsing fails**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One failed block | 138 | Partial (failure to be forced) |
| AC2 | Left out of the metric | 139 | Partial (failure to be forced) |
| AC3 | Failed date line | 140 | Partial (failure to be forced) |
| AC4 | Not counted | 141 | Yes |
| AC5 | Analysis run before this epic | 142, 145 | Yes |

**GEO-1569 — Export the full answer to Excel**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Full answer in Response | 146 | Yes |
| AC2 | Ranking column, Competitive text | 147, 148 | Yes |
| AC3 | Outcome and picked brands | 148 | Yes |
| AC4 | N/A | 149 | Yes |
| AC5 | Brand Image rows | 150 | Yes |
| AC6 | Older analysis | 151 | Yes |
| AC7 | Markers, Source URLs, rows removed | 152, 153 | Yes |
| AC8 | Favorability removed | 154 | Yes |
| AC9 | Long answer shortened | 155 | Yes (data needed) |

**GEO-1570 — Show the competitive outcome in four buckets**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Four labels | 156 | Yes |
| AC2 | AI Choice donut card | 157 | Yes |
| AC3 | Donut hover | 158 | Yes |
| AC4 | My brand in the cell | 159 | Yes |
| AC5 | Conditional badge | 160 | Yes |
| AC6 | Competitor winner | 161 | Yes |
| AC7 | Not chosen text | 162 | Yes |
| AC8 | Overlooked badge | 163 | Yes (test data, GEO-678 open point) |
| AC9 | Split | 164 | Yes |
| AC10 | Unbranded cell | 165 | Yes |
| AC11 | Not counted engine left out | 166 | Yes |
| AC12 | Not counted chip | 167 | Yes |
| AC13 | Favorability filter | 168 | Yes |
| AC14 | Engine pill badge | 169 | Yes |
| AC15 | Outcome card titles | 170 | Yes |
| AC16 | Conditional and Overlooked cards | 171 | Yes |
| AC17 | Not chosen card | 172 | Yes |
| AC18 | Not counted tab | 173 | Yes |
| AC19 | Brand Rankings AI Choice | 174 | Yes |

**GEO-1571 — Name the competitive metric AI Choice everywhere**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | AI Choice name and definitions | 175, 176 | Yes |
| AC2 | Share of Voice tooltip | 177 | Yes |

**GEO-1572 — Open the question panel as a drawer in both shells**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Full-height drawer | 98 | Yes |
| AC2 | No auto-open | 99 | Yes |
| AC3 | Standalone shell | 100, 104 | Yes |
| AC4 | Onclusive Social shell | 101 | Yes (shell access needed) |
| AC5 | 470px | 102 | Yes |
| AC6 | Header at the top | 103 | Yes |

**GEO-1608 — Show the images of the answer card (no fixVersion)**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1–AC6 | Images, captions, fullscreen viewer | — | No — ACs to be revised with the PM (open point) |

##### GEO-1537 — Show the Brands Behind Others

Result: **31 / 31 functional ACs covered** (GEO-1588 11/11, GEO-1589 7/7, GEO-1590 9/9, GEO-1587 4/4); the ACs with no scenario are flagged "No" with their reason and listed in Open Points, and "No — dev evidence" marks a scenario that needs dev evidence rather than the UI. Technical ACs are not mapped one by one: the observable ones are covered by the scenarios of their story, the others need dev evidence. "Partial" = only the visible output is testable.

**GEO-1588 — List the brands in the Others tooltip**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Brands listed, up to 10 | 178 | Yes |
| AC2 | And N more brands | 179 | Yes |
| AC3 | Others = sum of its brands | 180 | Yes |
| AC4 | Same filters | 181 | Yes |
| AC5 | Overview, category, landscape | 182 | Yes |
| AC6 | Header | 183 | Yes |
| AC7 | Component and side | 184 | Yes (reference component, open point) |
| AC8 | Exact-value sort | 185 | Yes (tie data needed) |
| AC9 | Hover and keyboard | 186 | Yes |
| AC10 | Tracked brand | 187 | Yes |
| AC11 | ~0% | 188 | Yes |

**GEO-1589 — Give the full Share of Voice list in the Excel export**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Share of Voice table, first 100 | 189 | Yes |
| AC2 | More than 100 brands | 190 | Yes (data needed) |
| AC3 | Ranking table matches the app | 191 | Yes |
| AC4 | Placement | 192 | Yes |
| AC5 | Exact-value sort | 193 | Yes |
| AC6 | ~0% | 193 | Yes |
| AC7 | Same data as the dashboard | 194 | Yes (AC note outdated, open point) |

**GEO-1590 — Name Others in the PowerPoint and PDF donut**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Top 10 and Others | 196 | Yes |
| AC2 | Others in the legend | 197 | Yes |
| AC3 | Line under the donut | 198 | Yes |
| AC4 | PDF same as PowerPoint | 199 | Yes |
| AC5 | Same data as the dashboard | 200 | Yes (AC note outdated, open point) |
| AC6 | Two lines at most | 201 | Yes |
| AC7 | Exact-value sort | 202 | Yes |
| AC8 | Tracked brand | 202 | Yes |
| AC9 | ~0% | 202 | Yes |

**GEO-1587 — Serve every brand behind Others from the Share of Voice distribution**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Every brand of the scope returned | 206 | Partial (seen through the tooltip and Excel) |
| AC2 | Others = exact sum | 180 | Yes |
| AC3 | Sort, exact ties A to Z | 185, 193 | Yes |
| AC4 | Exports get the same result | 207, 194, 200 | Yes |

##### GEO-1005 — Add Google AI Overviews as a Tracked Surface

Result: **34 / 40 functional ACs covered** (GEO-1595 5/5, GEO-1596 10/11, GEO-1597 6/6, GEO-1598 4/4, GEO-1599 3/8, GEO-1600 6/6); the ACs with no scenario are flagged "No" with their reason and listed in Open Points, and "No — dev evidence" marks a scenario that needs dev evidence rather than the UI. Technical ACs are not mapped one by one: the observable ones are covered by the scenarios of their story, the others need dev evidence. "Partial" = only the visible output is testable.

**GEO-1595 — Select AI Overviews as an engine**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Engine card | 208 | Yes |
| AC2 | Back office option | 209 | Yes |
| AC3 | Pool unchanged | 210 | Yes |
| AC4 | Next run | 211 | Yes |
| AC5 | At least one engine | 212 | Yes |

**GEO-1596 — Capture the AI Overview per country**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Country page, vendor setting | 213 | Partial (capture settings not visible) |
| AC2 | Full after Show more | 214 | Yes |
| AC3 | Raw kept | 215 | No — dev evidence |
| AC4 | No API fallback | 216 | Partial (failure to be forced) |
| AC5 | Excluded countries | 217 | Yes |
| AC6 | Review line | 218 | Yes |
| AC7 | All countries excluded | 219 | Yes |
| AC8 | Run fails | 220 | Yes |
| AC9 | One banner for both Google engines | — | No — needs GEO-1006 (open point) |
| AC10 | Add-country dialog | 221 | Yes |
| AC11 | Manage Scope line | 222 | Yes |

**GEO-1597 — Handle the prompts where Google shows no AI Overview**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Not triggered stored | 223 | Yes (data needed) |
| AC2 | Not available | 224 | Yes |
| AC3 | Out of the metrics | 225 | Yes |
| AC4 | Not triggered pill and tab | 226 | Yes |
| AC5 | Trends | 227 | Yes (two dates needed) |
| AC6 | No Excel row | 228 | Yes |

**GEO-1598 — Read the AI Overview like any other answer**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Shared reader | 229 | Yes |
| AC2 | Residue removed | 230 | Yes |
| AC3 | Source places | 231 | Yes |
| AC4 | Images not read | 232 | Partial (no image returned, open point) |

**GEO-1599 — Read the AI Overview in the question panel**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Full answer card | 233 | Yes |
| AC2–AC5 | Images, captions, viewer | — | No — moved to GEO-1608 (876497) |
| AC6 | Broken image hidden | — | No — no image returned (open point) |
| AC7 | Images not counted | 235 | Partial (text and citations only) |
| AC8 | No inline citations | 234 | Yes |

**GEO-1600 — Show AI Overviews everywhere engines show**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Filters and breakdowns | 236 | Yes |
| AC2 | Engine order | 237 | Yes |
| AC3 | Compact pill | 238 | Yes |
| AC4 | Logo everywhere | 239 | Yes |
| AC5 | Exports | 240 | Yes |
| AC6 | Analysis without AI Overviews | 241 | Yes |

##### GEO-1226 — Target Sources Improvements for Review Pages

Result: **31 / 31 functional ACs covered** (GEO-1226 10/10, GEO-1547 7/7, GEO-1548 7/7, GEO-1549 7/7), plus 12 technical ACs each mapped to a scenario (4 fully testable in the UI, 5 partly, 3 dev evidence only). "Partial" = only the visible output is testable (see Open Points).

**GEO-1226 — Epic-level ACs**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One article for fr and one for fr-be trustpilot | 258 | Yes (staging equivalent of CNP needed, open point) |
| AC2 | 4 negative reviews give 4 entries | 242 | Yes |
| AC3 | Verbatim entry, page block opens the page | 245, 278 | Yes |
| AC4 | No title, menu, banner or positive review | 248, 249 | Yes |
| AC5 | Review without the brand name listed | 247 | Yes (review mode marker needed) |
| AC6 | Different paths never grouped | 259 | Yes |
| AC7 | Same count on card, panel and export | 268, 270 | Yes |
| AC8 | First 10 reviews then Show N more | 288 | Yes |
| AC9 | Lack of visibility as one article, only when no page names the brand | 266, 267, 295 | Yes |
| AC10 | Page with more than 10 lists 10, count 10 | 250 | Yes (data needed) |

**GEO-1547 — List every negative review of a review page**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One entry per negative review | 242, 246 | Yes |
| AC2 | Verbatim, 140 characters with "…" | 243, 244 | Yes |
| AC3 | Brand name not required on a review page | 247, 254, 256 | Yes (review mode marker needed) |
| AC4 | Never chrome or a positive review | 248, 249 | Yes |
| AC5 | At most 10 per page | 250 | Yes (data needed) |
| AC6 | Page negative with one negative review | 252, 253 | Yes |
| AC7 | Other sources unchanged | 255, 256, 309, 310, 311 | Yes |
| TAC1 | Optional contract | 301 | No — dev evidence |
| TAC2 | Only review pages re-judged | 302 | Partial (re-judgement not visible) |
| TAC3 | Verbatim only | 245 | Partial (dropped quotes not visible) |
| TAC4 | Cap and cut | 251 | Yes (data needed) |
| TAC5 | Reviews survive reuse | 257 | Partial (reuse not visible) |

**GEO-1548 — Group the pages of a review page into one article**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One article per review page and subdomain | 258 | Yes (staging equivalent of CNP needed) |
| AC2 | Same page only, subdomains never grouped | 259, 260, 262 | Yes |
| AC3 | Title without the page part | 263, 264 | Yes (other title formats, open point) |
| AC4 | Negative and Lack of visibility tabs | 265, 266, 267, 276 | Yes (no stored review: dev tests, PO 873111) |
| AC5 | Same number everywhere, card sort | 268, 269, 270, 277 | Yes |
| AC6 | Review counts 4+2+3+2 = 11 | 271, 272 | Yes |
| AC7 | Other sources and Prompts section unchanged | 273, 274, 275 | Yes |
| TAC1 | Grouping key page / p / pg | 261 | Partial (only parameters present in real data) |
| TAC2 | Journalism ?p= stays two articles | 273 | Yes (data needed) |
| TAC3 | Same count, not-fetched page nowhere | 303 | Partial (page state not visible) |
| TAC4 | No vacuous Lack of visibility | 304 | No — dev evidence |

**GEO-1549 — Show review pages in the Target Sources panel**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Reviews by page under page URL links | 278, 279, 280, 281 | Yes |
| AC2 | Article chip, no page count, no total | 282, 283, 284 | Yes |
| AC3 | Plain URL line, one-page review page | 285, 286 | Yes |
| AC4 | Quote-only entry | 287 | Yes |
| AC5 | First 10 reviews, Show N more, cut inside a page | 288, 289, 290, 291, 292, 293 | Yes (epic text, open point) |
| AC6 | Cited-by icons union | 294 | Yes (multi-engine data needed) |
| AC7 | Lack of visibility pages as links, no quote | 295, 296 | Yes |
| TAC1 | Step counts reviews (17 → 10 + Show 7 more) | 288, 289 | Yes (data needed) |
| TAC2 | One page, no page block | 286 | Yes |
| TAC3 | Older API article without pages | 305 | No — dev evidence |
| DoD | EN / FR / ES strings, both shells | 282, 283, 291, 297, 298, 299, 300 | Yes (strings sheet and OS native access needed) |

GEO-1006 and GEO-1212: no Story / Task in Jira, no AC mapped (36 and 26 planned ACs, see Open Points, Cross-epic).
