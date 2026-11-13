# Natural Answer Collection and Parsing

**Epic ID:** GEO-678
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Fix version:** 1.4
**Created:** 2026-06-17
**Updated:** 2026-11-13
**Jira link:** https://onclusive.atlassian.net/browse/GEO-678

## Description / Functional Need

The analysis asks each AI engine to return its answer in a fixed structure instead of answering the way it would for a real user. This changes the answer itself (wording, nuance, length), so the analysis measures a constrained response, not what users read. With this EPIC each engine answers naturally, and the analysis reads that raw answer to derive the rankings, competitive outcomes, themes and sources it needs, so the product keeps the same metrics on real answers.

[CHANGED 27 OCT] The answers are also collected the way a real user sees them. Today every engine is called through its API (through OpenRouter), and that answer is not what a user reads in the engine's interface: on the test set below, the sources of an API answer and of the interface answer to the same prompt overlap only 7% to 18%, and the API route costs about seven times more per answer than managed rendered capture. Collection becomes route by engine. Public, no-login surfaces (logged-out ChatGPT and Gemini) move to rendered capture; Claude and Grok stay on their official API because their interface sits behind a login; Perplexity stays on its API while no capture vendor can reach it (one vendor is in outage, another has stopped its Perplexity service). Every answer is stored raw so it can be read again, and each country keeps getting its own answers.

A rendered answer cannot be forced into a schema, so one reader serves every route: the same rules turn an API answer and a rendered answer into the metrics the product consumes. The Google surfaces (AI Overviews, AI Mode) use this capture and this reader; adding them stays in their own EPICs. The switch to rendered capture in production waits for the legal sign-off and the vendor contract. The natural API route ships first, without waiting for capture: each later switch of an engine to capture has no marker on trends either, and clients are told by email.

The reading rules below come from a test set of 499 answers collected on 20 Oct 2026 (18 test prompts and 12 prompts of a client analysis, through the engines' API without our instruction and through their rendered interface). In that set, most answers use bullets, headings or tables, about half of the visibility answers are split into "best for" sections, they name a median of 5 brands instead of 10, and two head-to-head answers out of three do not pick a single winner. The answers, their labels and the decision register are in this Drive folder, with a README for the dev team: [Dataset](https://drive.google.com/drive/folders/1_rS2XnVbI0z5DL97YFSMqRO_d2i4rg2V )  
  
For now the parsing needs to work on this dataset, as we are still waiting for the legal confirmation on UI scraping. In any case the parsing needs to work on both sources: the API natural answer from OpenRouter AND the UI scraping from the provider, with the same output. Read the README of the folder first: it lists every file, route and label.

## Scope

- GEO-1550 — STORY-50.1: Engines answer questions naturally
- GEO-1551 — STORY-50.2: Derive structured results from the natural answer
- GEO-1552 — STORY-50.3: Recognise the brand in a natural answer
- GEO-1553 — STORY-50.4: Rank brands in a natural answer
- GEO-1554 — STORY-50.5: Read the competitive outcome in four buckets
- GEO-1555 — STORY-50.6: Stay resilient when a natural answer cannot be fully parsed
- GEO-1556 — STORY-50.7: Preserve existing metrics and downstream views
- GEO-1558 — STORY-50.9: Collect answers the way a real user sees them
- GEO-1559 — STORY-50.10: Keep account-gated engines on the official API
- GEO-1560 — STORY-50.11: Keep per-country capture
- GEO-1561 — STORY-50.12: Fall back to the API when capture fails
- GEO-1562 — STORY-50.13: Compare each engine before switching it to rendered capture
- GEO-1557 — STORY-50.14: Suggest Brand Image prompts that cover each Corporate Reputation card
- GEO-1576 — STORY-50.15 Show the sources of natural Brand Image answers

## Out of Scope

- Adding new metrics or new question types beyond what the analysis already produces
- The Lite Analysis (GEO-1532, low priority), and reading brand websites from the answer: logos and grouping use the configured websites and the existing logo lookup
- Changing which engines are supported or how questions are generated, except the suggested Brand Image prompts (story 1.14)
- Adding the Google surfaces (AI Overviews, AI Mode): separate EPICs that use this capture and this reader
- Choosing the capture vendor and the legal posture: decisions this EPIC consumes
- The source citation passage extraction and source favorability work (covered by the citation-extraction and favorability EPICs), which consume the parsed sources but are specified separately
- A shopping or ads module built on the stored cards and ads
- Any message in the app about the method change: clients are told by email
- The API model versions used by each engine

## Associated Stories & Tasks

| ID | Type | Title | Status | Fix version |
|----|------|-------|--------|-------------|
| GEO-1550 | Story | STORY-50.1: Engines answer questions naturally | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1551 | Story | STORY-50.2: Derive structured results from the natural answer | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1552 | Story | STORY-50.3: Recognise the brand in a natural answer | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1553 | Story | STORY-50.4: Rank brands in a natural answer | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1554 | Story | STORY-50.5: Read the competitive outcome in four buckets | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1555 | Story | STORY-50.6: Stay resilient when a natural answer cannot be fully parsed | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1556 | Story | STORY-50.7: Preserve existing metrics and downstream views | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1558 | Story | STORY-50.9: Collect answers the way a real user sees them | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1559 | Story | STORY-50.10: Keep account-gated engines on the official API | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1560 | Story | STORY-50.11: Keep per-country capture | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1561 | Story | STORY-50.12: Fall back to the API when capture fails | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1562 | Story | STORY-50.13: Compare each engine before switching it to rendered capture | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1557 | Story | STORY-50.14: Suggest Brand Image prompts that cover each Corporate Reputation card | [READY FOR QA] Ready for QA | 1.4 |
| GEO-1576 | Story | STORY-50.15 Show the sources of natural Brand Image answers | [READY FOR QA] Ready for QA | 1.4 |

Not imported (not Story / Task):

- GEO-1607 — Bug [Done] — [GEO-Enrichment] Natural competitive answer read as "Chosen" next to an "Overlooked" brand: Excel Raw Data shows "Chosen" with no brand

## Architecture

_No dedicated architecture section in the epic description; see the « Scope note » and technical sections of each story._

## Acceptance Criteria — Summary

_Epic user stories and acceptance criteria, copied verbatim from the epic description. The child stories restate them, sometimes with later changes._

User Story 1.1: Engines answer questions naturally

Story ID: TBD

> As a user trusting the analysis, I want each engine to answer questions the way it naturally would for a real user, so that what I see reflects genuine engine behavior and not a constrained, artificial response.

Acceptance Criteria:

- Given a question is sent to an engine, When the engine answers, Then it produces its natural response without being forced into a predefined output shape
-  Given an engine's natural answer, When it is recorded, Then the raw answer is preserved, meaning the full response of the engine or the vendor (answer text, search results and citation positions), not the text only, so it can be reviewed and re-parsed if needed
- Given the same question asked to the same engine, When compared, Then the analyzed answer matches the kind of answer a real user would receive
- [CHANGED 27 OCT] Given an analysis whose AI insights language is not the language of the country (eg: France - French with English insights), When a question is sent to an engine, Then the engine gets no instruction on the language of its answer, so it answers in the language of the question, as a real user in that country would read it. This removes the rule added by GEO-918 that asks the engine to write its answer in the AI insights language.
- Given an Other-type prompt or a Category Topics prompt of an unbranded analysis, When it is sent, Then it is sent naturally too and its answer is read like a Perception answer (themes), while the setup calls (category and competitor discovery, prompt adaptation) keep their structured request
- [CHANGED 27 OCT] Given natural answers in the language of the country, When GEO writes its own text from them (AI summaries, key concepts and themes), Then that text is in the AI insights language, as today

#### User Story 1.2: Derive structured results from the natural answer

Story ID: TBD

> As a user, I want the rankings, competitive outcomes, perception themes, and sources to be extracted from each engine's natural answer, so that the metrics I rely on stay intact while reflecting real responses.

Acceptance Criteria:

- Given a natural visibility answer, When it is parsed, Then the brand ranking and the other entities mentioned are extracted from it, and the ranking only holds brands that the answer names
- Given a natural competitive answer, When it is parsed, Then its outcome for each brand is extracted from it (story 1.5), and not a ranking of the brands
- Given a natural perception answer, When it is parsed, Then the perception themes and their sentiment are extracted from it
- Given any natural answer that cites sources, When it is parsed, Then the cited sources are extracted with their links
-  Given a raw answer from any collection route, whether an engine answering naturally through its API or an answer captured from a rendered surface, When it is parsed, Then the same structured results are extracted regardless of how the answer was collected; GEO-1498 displays them, so any change to these results during the build is agreed with GEO-1498 first
- Given a natural answer, When it is parsed, Then the full answer text is stored with its formatting (paragraphs, lists, headings, tables) so it can be displayed as the engine wrote it
- Given a natural answer that names brands, When it is parsed, Then each mention of the tracked brand and of each competitor is identified in the text, including the other names an engine uses for a brand (eg: "Claude" for Anthropic), so the display can highlight them and link each ranked or chosen brand to its first mention
- Given a natural answer with inline citation markers, When it is parsed, Then each marker is linked to the source it points to, so the display can number the markers and the sources the same way, and two markers that point to the same page resolve to one source

#### User Story 1.3: Recognise the brand in a natural answer

Story ID: TBD

> As a user, I want my brand to be recognised in a natural answer whenever the engine names it or one of its products, and only then, so that my visibility reflects what a real user reads.

Acceptance Criteria:

- Given a natural answer, When it names the brand or one of its products (eg: "Brooks Adrenaline GTS" for Brooks), Then the brand counts as named, using the same brand family as the Actions Center (the brand, its spelling variants, sub-brands, products and regional names)
- Given a brand known under a former name since a rebrand, When the answer uses only that name (eg: "BoursoBank" for Boursorama), Then the brand family groups it under the brand and the brand counts as named
- Given a brand that appears only in a source title, a link or a cited domain, When the answer text never names it, Then the brand counts as not named
- Given a natural answer, When it is parsed, Then the whole answer text is read, including a closing question to the user, so a brand named in that question counts like any other mention
- Given a name shared by several companies (eg: "On", "Nickel", "Boots"), When it appears, Then the analysis decides from the context (the category, the brand website) whether it is the brand
- Given a visibility answer that names the brand with a negative or mixed tone, When it is parsed, Then the brand counts as named, and no tone is extracted or shown for visibility answers, as today
- Given a natural answer, When it names retailers as places to buy (eg: "available at REI, Zappos or Amazon"), review sites, media, places, generic product types or brands of another category, Then they are kept out of the ranking and of Share of Voice
- Given an answer that names more than 10 brands, When it is parsed, Then every brand counts as named for Visibility and Share of Voice (the top-10 cap of GEO-1255 goes), and Average Position keeps ranks 1 to 10
- Given the tracked brand or a configured competitor, When the answer names it, Then it always counts as a brand, whatever its type (a retailer or a review site can be a client)

#### User Story 1.4: Rank brands in a natural answer

Story ID: TBD

> As a user, I want the ranking of a natural answer to follow how the answer presents the brands, so that the position I see is the one a real user perceives.

Acceptance Criteria:

- Given a natural answer, When the brands are ranked, Then the rank of each brand family is the order of its first mention in the answer, intro sentence included, so the first brand named is number one
- Given an answer with list numbers, "best for" sections or a table, When the brands are ranked, Then the answer still gets one ranking by order of first mention, and the list numbers or section labels do not change it
- Given an answer that names several products of the same brand, When the brands are ranked, Then they fold into one entry for the brand at the position of its first mention, and each product keeps its own row in Brand Rankings with the position of its own first mention
- Given an answer that names no brand at all (eg: neighbourhoods only for a hotel question), When it is parsed, Then the brand counts as not named, the answer is left out of the Share of Voice denominator, it stays out of the question status as today (GEO-835), and the question panel shows the answer with the verdict "No brands named" and no ranking rows (display in GEO-1498); "Unranked" keeps its current meaning (no engine names the brand)

#### User Story 1.5: Read the competitive outcome in four buckets

Story ID: TBD

> As a user, I want each head-to-head answer to say whether the engine chose my brand, chose it only in some cases, or did not choose it, so that AI Choice reflects how engines really answer competitive questions.

Acceptance Criteria:

- Given a natural competitive answer, When it is parsed, Then it gets one of four outcomes for the tracked brand: Chosen, Conditional, Not chosen or Overlooked, and the brand or brands the answer picks are stored with it
- Given an answer that picks the brand with no condition (eg: "the best pick from this set is Timberland" for Timberland), When it is parsed, Then the outcome is Chosen
- Given an answer that picks the brand because the engine found nothing on the other brands, When it is parsed, Then the outcome is Chosen
- Given an answer where the brand wins at least one condition (eg: "Choose Dr. Martens if you live somewhere wet, sloppy, and rainy... Choose UGGs if your winter is mostly dry and freezing cold"), When it is parsed, Then the outcome is Conditional
- Given an answer that calls the brands equal, or names the brand among joint winners, When it is parsed, Then the outcome is Conditional
- Given an answer that picks another brand, a brand outside the question, or does not name the brand, When it is parsed, Then the outcome is Not chosen
- Given a conditional answer where the brand wins no condition, When it is parsed, Then the outcome is Overlooked
- Given a conditional answer, When it is parsed, Then only the outcome is stored, not the condition each brand wins: the user reads why in the answer
- Given an answer where the engine declines to pick or rejects the question, When it is parsed, Then it is not counted, like a refusal (story 1.6)
- Given a question framed negatively (eg: "Which brand isn't just greenwashing"), When it is parsed, Then the outcome follows the conclusion of the answer and never the order in which brands are named
- Given a competitive answer, When it is parsed, Then each configured brand of the question gets its own outcome, so one conditional answer can be Conditional for both brands of a head-to-head
- Given an unbranded analysis (no tracked brand), When a competitive answer is parsed, Then every brand of the question gets its outcome and the brand or brands the answer picks are stored, so the display can show the winner

#### User Story 1.6: Stay resilient when a natural answer cannot be fully parsed

Story ID: TBD

> As a user, I want the analysis to behave predictably when an engine's natural answer cannot be fully interpreted, so that one unparseable answer does not corrupt or block the rest of my analysis.

Acceptance Criteria:

- Given a natural answer that cannot be fully parsed, When it is processed, Then the parts that can be extracted are kept and the parts that cannot are recorded as unavailable rather than guessed
- Given an answer that yields no usable structured data, When the analysis aggregates results, Then that single answer is excluded without failing the question or the analysis
- Given one extraction that failed on an answer (eg: the ranking or the competitive outcome), When the metrics are computed, Then that answer is left out of the metric the extraction feeds, and is not counted as unranked or not chosen; today such an answer counts as not named, so this applies to new analysis dates only
- Given parsing produces a result, When it is stored, Then the raw answer remains available so the extraction can be corrected and re-run later
- [CHANGED 27 OCT] Given perception themes, When they are extracted, Then each answer is read in full, not cut, and a failure applies to the country and category being extracted, as the extraction runs per country and category
- Given an extraction that failed (eg: perception themes), When the next analysis run happens, Then the new run extracts it again from its own answers, and the analysis date where it failed keeps the extraction as unavailable
- Given an answer that is cut before its end, a refusal to answer, or an empty answer, When the metrics are computed, Then it is left out of every metric (today it counts as not named, new dates only), and the question panel shows it as not counted for that engine (display in GEO-1498)
- Given an answer that does answer the question but names no brand, When it is processed, Then it is not a refusal and follows the rule of story 1.4

#### User Story 1.7: Preserve existing metrics and downstream views

Story ID: TBD

> As a user, I want all existing dashboards, rankings, and source views to keep working after this change, so that moving to natural answers does not regress anything I already use.

Acceptance Criteria:

- Given an analysis produced with natural-answer parsing, When it is opened, Then every existing view renders in the same form, without missing data attributable to the change
- Given natural visibility answers, When Visibility is computed, Then it is the share of counted answers that name the brand
- Given natural visibility answers, When Average Position is computed, Then it stays the mean rank over the answers where the brand is named, ranks 1 to 10, with no penalty when the brand is absent, as today
- Given natural competitive answers, When AI Choice is computed for a brand, Then it is (Chosen + Conditional) divided by the counted competitive answers, so the AI Choice of the brands of one question no longer adds up to 100%; for a competitor (Brand Rankings, matrices, Excel) the denominator stays all counted competitive answers of the scope, as today
- Given any view, export or AI summary that reads whether the brand won a competitive answer (question status, Excel favorability and row colour, competitive improvements, AI Citation Sources competitive losses, executive and perception summaries), When it reads a natural answer, Then Chosen and Conditional count as a win and Not chosen and Overlooked as a loss, as in AI Choice and Target Sources
- Given AI Choice values, When the competitive improvements are detected, Then they use the same thresholds on AI Choice as today (an issue under 50%, Critical under 25%, Warning under 40%)
-  Given AI Choice values, When the Brand and Category Prioritization matrices are drawn, Then their Y axis stays AI Choice, and the quadrant lines (Visibility 50, AI Choice 50, as since GEO-1524) and the AI Choice quality bands (Good above 50, Fair from 25) stay, reviewed on the first analysis runs with natural answers
- Given a competitive answer, When Target Sources selects gap answers, Then Not chosen and Overlooked answers are gap answers, and Conditional answers are not
- Given natural visibility and competitive answers, When Share of Voice is computed, Then both count the same way: each brand family counts once per answer however many of its products are named, and the denominator is the number of brand families each answer names, not a fixed 10 per visibility answer (eg: Brooks, ASICS, HOKA, Saucony, New Balance in one answer gives Brooks 1 of 5; a competitive answer that names my brand and 2 others gives my brand 1 of 3, whatever its outcome), so the Share of Voice of all brands adds up to 100%, on every analysis date; the Share of Voice tooltip (today "Nike Air Max and Nike Pegasus ... that's 2 mentions", new text in GEO-1498 story 1.7) and the definition given to the AI summaries change to match, including the dates collected before this change
- Given the new Share of Voice values, When the quality bands are applied, Then they stay Good above 25, Fair from 15 to 25 and Poor under 15, and they are reviewed on the first analysis runs with natural answers
- Given a natural perception answer, When its themes are extracted, Then each theme gets a polarity (positive, mixed or negative) and an internal score that is never displayed, so the concept classification, the frequency and the category Sentiment tile work as today and the display follows Simplify Key Concepts (GEO-1068)
- Given a perception answer that misreads the question or where the engine says it knows little about the brand, When it is parsed, Then it is parsed like any other answer, with no special behaviour
- Given a natural answer with sources, When they are extracted, Then the sources are the ones the engine's search returned (the source list of the rendered page, or the search results of the API route), every one of them counts for the whole answer, not only for the top 10 brands, with no difference between sources cited inline and sources only listed, and a redirect link is resolved to the page it points to; Grok runs with no web search today, so it would return no source: turning its search on is to investigate with Engineering (cost per call), and the API route keeps its cap of 5 search results, so an API answer lists fewer sources than a captured one
- Given natural answers, When AI Citation Sources and Target Sources read their sources, Then they use these search sources, and the source list a model writes in its own answer today is no longer collected, so source volumes can drop on the first analysis date after the change
- Given a rendered answer with shopping cards, product cards, entity cards or sponsored ads, When it is parsed, Then they are stored but never count for visibility, ranking or Share of Voice
- Given analyses produced before this change, When they are opened, Then their answers are not re-parsed by the analysis (an ops replay of the enrichment uses the new reader on new dates and keeps the old reader on these dates), their Share of Voice uses the new formula like every other date, a competitive answer that ranked the brand first reads as Chosen and any other as Not chosen (no Conditional or Overlooked on those dates), trend charts show no marker, and stored Target Sources verdicts are checked again once on the first run after the change

#### User Story 1.8: Show the brands behind Others

Story ID: GEO-1537

> As a user, I want to see which brands make up Others in the Share of Voice donut and to get the full list in the export, so that a large Others slice is never a black box.

Acceptance Criteria:

- Moved to its own epic GEO-1537 (EPIC-049): it does not depend on natural answers, so it can ship on its own. The criteria live there.

#### User Story 1.9: Collect answers the way a real user sees them

Story ID: TBD

> As an analyst, I want the engines we already track collected as a real user sees them, so that my analysis reflects genuine engine behavior rather than an API approximation.

Acceptance Criteria:

- Given an already-tracked engine whose surface is public and no-login, When collection runs after the switch, Then its answer is obtained by rendered capture rather than an API call
- Given a captured answer, When it is stored, Then it is stored raw with its capture time and its locale, and can be read again later without capturing it again
- Given an answer, When it is recorded, Then the collection route actually used (rendered interface or API) and the vendor are stored with it; the route of each engine is set in production, and an answer collected through the API fallback (story 1.12) stores the API route
- Given a rendered answer, When it is stored for parsing, Then the widget text and markup the capture leaves in it are removed first (eg: "Let me narrow it down for you", "Go to product viewer dialog"), and parsing never relies on markdown created by a capture vendor
- Given a capture attempt that fails, When it ends, Then the failure is recorded, no partial answer is stored, and the answer is collected through the API fallback (story 1.12)

#### User Story 1.10: Keep account-gated engines on the official API

Story ID: TBD

> As the business, I want account-gated engines to stay on their official API, so that we never capture a surface that forms a contract at sign-in.

Acceptance Criteria:

- Given an account-gated engine (Claude, Grok), When collection runs, Then the official API is used and no rendered capture is attempted
- Given an engine that no capture vendor can reach today (eg: Perplexity), When collection runs, Then it stays on its official API until a vendor can capture it

#### User Story 1.11: Keep per-country capture

Story ID: TBD

> [CHANGED 27 OCT] As a customer tracking several countries, I want each country still captured in its own locale, so that country-level answers do not regress.

Acceptance Criteria:

- Given a prompt configured for a country, When rendered capture runs, Then it returns the answer served in that country, as the API route did
- Given the same prompt across several countries, When it is captured, Then each country's answer is stored and attributed to its country
- Given an engine on its API route, natural or fallback, When the question is sent, Then the country goes through the engine's own country parameter where a staging check shows it reaches the engine, otherwise through the country hint "The user is located in {country}" as the only system instruction, never both, with no instruction on sources (today's "Prioritize {country}-language sources" goes), and the question is sent bare, with no "Market:", "Question:" or "Category:" line, as a real user would not type them
- Given rendered capture, When a country is targeted, Then it uses the capture vendor's country setting and no instruction is added
- Given the capture vendor cannot target a country for an engine, When that engine is collected in that country, Then it uses the API fallback (story 1.12)

#### User Story 1.12: Fall back to the API when capture fails

Story ID: TBD

> As a user, I want every prompt to get an answer in each run, so that a capture problem never leaves a hole in my analysis.

Acceptance Criteria:

- Given an engine on rendered capture, When a surface is captured, Then it goes through one capture vendor, behind a layer that lets the vendor be changed later without changing how answers are stored or parsed
- Given an engine on rendered capture, When the vendor returns no usable answer (vendor down or disallowed, engine not reachable, capture failed or cut), Then the answer is collected through the engine's official API with the bare question and the country sent as in story 1.11 (country parameter, or the country hint where the parameter does not reach the engine), the same request as the natural API route, so the prompt still gets an answer for that run
- Given an answer collected through the API fallback, When it is parsed and counted, Then it follows the same rules as any other answer and keeps the API route, so QA and support can see which answers came from the fallback
- Given the API fallback also fails, When the run ends, Then the answer is not counted (story 1.6)

#### User Story 1.13: Compare each engine before switching it to rendered capture

Story ID: TBD

> As a product owner, I want to see how an engine's results change between its API route and rendered capture, so that the switch of each engine is decided with the facts.

Acceptance Criteria:

- Given an engine planned for rendered capture, When the same prompts run through both routes, Then a comparison of the parsed results is produced (brands named and ranks, competitive outcomes, themes and tone, sources)
- Given the comparison, When the switch of that engine is decided, Then the decision is taken per engine from the comparison, with no pass or fail threshold
- Given an engine not yet switched, When collection runs, Then it stays on its API route

#### User Story 1.14: Suggest Brand Image prompts that cover each Corporate Reputation card

Story ID: TBD

> As a user, I want the suggested Brand Image prompts to ask about each part of Corporate Reputation, so that the cards still get data once engines answer naturally.

Without our instruction, an engine only talks about what the question asks: on the test set, Employer Brand came up in 1 answer of 64 to generic Brand Image prompts. Prompts 5 to 9 were tested on 23 Oct 2026 through the 5 engines' API without our instruction, for 3 brands (Dr. Martens in the UK, Nike in the US, Decathlon in France in French): they fed their target card in 74 answers of 75.

Acceptance Criteria:

- [CHANGED 27 OCT] Given suggestions are generated for a brand analysis, When Prompts loads, Then each country gets these 10 Brand Image prompts instead of the current ones, adapted to the language of the country as today: "What is {brand} known for?", "What is {brand}'s reputation?", "Is {brand} a trustworthy brand?", "What do customers complain about with {brand}?" (Brand Image), "Is {brand} a good company to work for?", "What do employees say about working at {brand}?" (Employer Brand), "How sustainable is {brand}?", "Is {brand} an ethical company?" (ESG / Sustainability), "Is {brand} a well-run company?", "Has {brand} been in the news recently?" (Leadership)
- [CHANGED 27 OCT] Given the new set, When the prompts are counted against the pool, Then it is still 10 Brand Image prompts per country, as in GEO-1002
- [CHANGED 3 NOV] Given a natural Brand Image answer, When it is parsed, Then each card (Brand Image, Employer Brand, ESG / Sustainability, Leadership) gets data only from what the answer says, whatever prompt was asked, a card that no answer talks about shows "No data available", the card tone is the majority of the answers' tones and its bullets are in the AI insights language, as today. A card needs the answer to say something about its topic (a fact, an opinion, a criticism) that can become a bullet: a passing mention that only supports another topic does not fill it (eg: a Chief Sustainability Officer named in a sustainability answer feeds ESG / Sustainability, not Leadership)
- Given natural Brand Image answers, When they are parsed, Then the brand territories are the product categories or industries each answer links to the brand, read from every Brand Image answer, and they feed Brand Territory as today (on the test set, the 4 general prompts gave territories in every answer)
- Given an answer, or a part of it, that only gives the founder or the history of the brand (eg: "Who founded Dr. Martens?"), When it is parsed, Then it does not feed the Leadership card, which needs current or recent executives, management, strategy decisions or governance
- [ADDED 3 NOV] Given a Corporate Reputation card filled from natural answers, When I open its drill-in, Then it shows the sources the engine used for those answers, and these sources also count in Cited sources (follow-up story)
- Given the wizard, When I untick or delete a Brand Image prompt for the first time in this setup, Then a popup titled "Remove this Brand Image prompt?" says "Brand Image prompts feed the Corporate Reputation cards. Removing them can leave some cards empty." with Remove and Cancel and no close cross, Cancel keeps the prompt, and after Remove the popup does not show again in this setup
- Given Manage Scope, When I untick or delete a Brand Image prompt for the first time since I opened it, Then the same text shows inside the delete or last-prompt confirmation, or in the wizard popup when the untick has no confirmation, and it does not show again until I open Manage Scope again
- Given the prompts table, When it renders, Then Brand Image prompts show no sub-label for their card
- Given no Brand Image prompt is kept, When Review loads, Then the warning built in GEO-1002 says the Corporate Reputation cards and Brand Territory stay empty, and in Manage Scope the "What stops from the next run" box names it, as built
- Given an unbranded analysis, When prompts are generated, Then there is still no Brand Image prompt and no popup
- [CHANGED 27 OCT] Given an existing brand analysis, When the change ships, Then prompts 5 to 9 of the set are added to each country and its current Brand Image prompts stay; they count against the pool, an organisation can go over it, and adding prompts stays blocked until the count fits
- [CHANGED 27 OCT] Given a country added later to an existing analysis, When its prompts are suggested, Then it gets the new set of 10, so one analysis can mix the old and new sets

## Links

- https://onclusive.atlassian.net/browse/GEO-678
- GEO-1550: https://onclusive.atlassian.net/browse/GEO-1550
- GEO-1551: https://onclusive.atlassian.net/browse/GEO-1551
- GEO-1552: https://onclusive.atlassian.net/browse/GEO-1552
- GEO-1553: https://onclusive.atlassian.net/browse/GEO-1553
- GEO-1554: https://onclusive.atlassian.net/browse/GEO-1554
- GEO-1555: https://onclusive.atlassian.net/browse/GEO-1555
- GEO-1556: https://onclusive.atlassian.net/browse/GEO-1556
- GEO-1558: https://onclusive.atlassian.net/browse/GEO-1558
- GEO-1559: https://onclusive.atlassian.net/browse/GEO-1559
- GEO-1560: https://onclusive.atlassian.net/browse/GEO-1560
- GEO-1561: https://onclusive.atlassian.net/browse/GEO-1561
- GEO-1562: https://onclusive.atlassian.net/browse/GEO-1562
- GEO-1557: https://onclusive.atlassian.net/browse/GEO-1557
- GEO-1576: https://onclusive.atlassian.net/browse/GEO-1576
- GEO-1607 (Bug): https://onclusive.atlassian.net/browse/GEO-1607
