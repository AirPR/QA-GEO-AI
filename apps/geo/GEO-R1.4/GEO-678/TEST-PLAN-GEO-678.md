### QA Test Plan for GEO-678 — Natural Answer Collection and Parsing

**Updated:** 2026-11-13 | **Source CSV:** pending | **Status:** DRAFT for review

**Objective:** Verify that each AI engine answers questions the way a real user reads them (no imposed output shape, no language instruction, the bare question with the country sent once), that answers are collected by rendered capture for public no-login surfaces (logged-out ChatGPT and Gemini) and through the official API for Claude, Grok and Perplexity, with an API fallback when capture fails, one answer per country and the raw answer kept, and that one shared reader turns any answer into the results the product consumes: brand recognition through the brand family (products, former names, other names, homonyms, no top-10 cap, retailers and non-brands left out), ranking by first mention with products folded into their brand, four competitive outcomes (Chosen, Conditional, Not chosen, Overlooked), perception themes, search sources and cited sources, and partial extraction rather than failure. The plan then checks the effect on the metrics (Visibility on counted answers, Average Position, AI Choice = Chosen + Conditional, every reader of a win, Share of Voice per brand family adding up to 100%, the search sources in AI Citation Sources and Target Sources, the analyses produced before the change) and the new Brand Image prompt set with its removal warnings, the Corporate Reputation cards filled from what the answer says and their sources. The display of these results (question panel, Excel Raw Data, AI Choice name and tooltips) is tested in GEO-1498.

#### Test Scenarios & Detailed Test Cases

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

#### Edge Cases & Boundary Conditions

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

#### Open Points (not blocking)

* GEO-1554: the reader test set holds Conditional answers only after the relabel (all 67 counted answers); whether collected answers for Chosen, Not chosen and Overlooked will be added is not answered (873295, 876545), so Scenario 28, Scenario 29, Scenario 32 and Scenario 33 need real staging prompts that give these outcomes.
* GEO-1562 AC3: an engine not switched at release stays on its API route, while the PM expects every engine to switch at release (870232 point 7); how one analysis date mixing a switched and a structured engine is shown is still open (876571).
* GEO-1550 / GEO-1558 / GEO-1560 / GEO-1561: the raw body, the route, the vendor, the capture time and locale and the country parameter or hint are not visible in the UI; Scenario 2, Scenario 64, Scenario 65, Scenario 71, Scenario 72 need dev evidence (stored rows or test reports); GEO-1561 AC1 (one vendor behind a layer) is architecture and is not testable by QA.
* GEO-1562 AC2: the switch decision per engine with no threshold is a process, not a behaviour; the comparison reports posted on GEO-678 (875132, 875549) are its evidence, no scenario.
* GEO-1550 AC3: "matches the kind of answer a real user would receive" has no measurable criterion; Scenario 1 checks the shape only.
* GEO-1556 AC13: Grok runs with no web search, so its natural answers have no source; turning its search on is to investigate with Engineering, so no source is expected for Grok in 1.4.
* GEO-1556 AC7 / AC10: the matrix bands and the Share of Voice bands are to be reviewed on the first runs with natural answers; the plan tests today's values.
* Prerequisite: the engines switched to natural answers and to rendered capture on staging and the organisations they apply to (staging guards), the Cloro dev key on staging (PO 870319), and a way to force a failed capture, a failed extraction and a failed fallback for Scenario 39, Scenario 41, Scenario 42, Scenario 74, Scenario 76.
* Prerequisite: test analyses with a France - French market and English insights, an unbranded analysis, an existing brand analysis created before the change, a homonym brand, a rebranded brand and a brand that is a retailer or review site.

**Environment:** Staging (https://staging-geo.onclusive.com/geo), org QA-GEO, interface en-GB checked with GET /geo/api/v1/auth/me (FR and ES only for the string scenarios, then en-GB restored).

**Priority:** High

#### AC Coverage by Story

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
