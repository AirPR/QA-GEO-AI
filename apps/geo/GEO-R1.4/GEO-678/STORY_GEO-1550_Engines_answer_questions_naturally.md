# GEO-1550: STORY-50.1: Engines answer questions naturally

**Story ID:** GEO-1550
**Issue Type:** Story
**Title:** STORY-50.1: Engines answer questions naturally
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-27
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1550

## User Story

> As a user trusting the analysis, I want each engine to answer questions the way it naturally would for a real user, so that what I see reflects genuine engine behavior and not a constrained, artificial response.

- **As** a user trusting the analysis
- **I want** each engine to answer questions the way it naturally would for a real user
- **So that** what I see reflects genuine engine behavior and not a constrained, artificial response.

_As written in Jira:_

**As** a user trusting the analysis,
**I want** each engine to answer questions the way it naturally would for a real user,
**so that** what I see reflects genuine engine behavior and not a constrained, artificial response.

## Acceptance Criteria

_6 functional ACs + 14 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional ACs (verbatim GEO-678, User Story 1.1)

**AC1 — Natural response**

- Given: a question is sent to an engine
- When: the engine answers
- Then: it produces its natural response without being forced into a predefined output shape

**AC2 — Raw answer preserved**

- Given: an engine's natural answer
- When: it is recorded
- Then: the raw answer is preserved, meaning the full response of the engine or the vendor (answer text, search results and citation positions), not the text only, so it can be reviewed and re-parsed if needed

**AC3 — Real-user answer**

- Given: the same question asked to the same engine
- When: compared
- Then: the analyzed answer matches the kind of answer a real user would receive

**AC4 — No language instruction**

- Given: an analysis whose AI insights language is not the market language (eg: a France - French market with English insights)
- When: a question is sent to an engine
- Then: the engine gets no instruction on the language of its answer, so it answers in the language of the question, as a real user in that market would read it. This removes the rule added by GEO-918 that asks the engine to write its answer in the AI insights language.

**AC5 — Other and Category Topics prompts**

- Given: an Other-type prompt or a Category Topics prompt of an unbranded analysis
- When: it is sent
- Then: it is sent naturally too and its answer is read like a Perception answer (themes), while the setup calls (category and competitor discovery, prompt adaptation) keep their structured request

**AC6 — GEO text in the insights language**

- Given: natural answers in the market language
- When: GEO writes its own text from them (AI summaries, key concepts and themes)
- Then: that text is in the AI insights language, as today

### Technical ACs (dev context — not read by QA)

**TAC1 — Natural request shape**

- Given: `answerMode = NATURAL`, a French market (`FR`), insights language English, web search on, for each provider (OpenAI, Gemini, Claude, Grok, Perplexity) and each question type
- When: `buildOpenRouterRequest` runs
- Then: the user content is exactly the question text; for a provider outside `FLINK_NATURAL_COUNTRY_PARAM_PROVIDERS`, the only system content is `The user is located in France.` and the body has no country parameter; for a listed provider (default `perplexity`), the body carries its country parameter `FR` and has no system message; the body has no `text.format`, no `GROUNDING_JSON_PREFIX`, no "Prioritize", no `Market:` / `Category:` line, no language rule; tools are the same as on the structured branch.

**TAC2 — No country**

- Given: `answerMode = NATURAL` and a market without country code
- When: the request is built
- Then: there is no system message and no country parameter, for every provider.

**TAC2b — Parameter not taken for that country**

- Given: `answerMode = NATURAL`, `claude` listed in `FLINK_NATURAL_COUNTRY_PARAM_PROVIDERS`, a Moroccan market (`MA`)
- When: the request is built
- Then: the body has the system hint `The user is located in Morocco.` and no country parameter.
- And: with a French market and web search off for a listed provider whose country field T4a placed in the web search tool, the body has the hint `The user is located in France.` and no parameter.

**TAC3 — Structured branch unchanged**

- Given: `answerMode` absent, `STRUCTURED` or unknown
- When: the request is built
- Then: it is byte-identical to today's request (existing `OpenRouterDispatcher*Test` stay green unchanged).

**TAC4 — Full body kept**

- Given: a recorded OpenRouter Responses API body with `url_citation` annotations and `status = incomplete`, and a Perplexity Chat Completions body with `finish_reason = length`
- When: the natural branch builds the `ResponseEvent`
- Then: `responseBody` equals the HTTP body byte for byte; `finishState` is `incomplete:max_output_tokens` (or the reason found) and `length`; `rawResponse` is the answer text; no 502 is raised for a Gemini prose answer.

**TAC5 — Size guard**

- Given: a natural body larger than `FLINK_NATURAL_MAX_BODY_BYTES`
- When: the dispatcher handles it
- Then: a FAILED `ResponseEvent` is emitted (the counter still advances), with the size in `errorMessage`.

**TAC6 — Storage**

- Given: a natural SUCCESS event
- When: `ResponseConsumer` handles it, then handles the same event again
- Then: one `llm_responses` row (`answer_mode = NATURAL`, route `API`, vendor `OPENROUTER`) and one `llm_response_payloads` row exist, with the same `response_uuid` and the body unchanged; the duplicate is skipped (idempotency unchanged).

**TAC7 — Old messages**

- Given: a `QuestionMessage` JSON without `answerMode` and a `ResponseEvent` JSON without the new fields
- When: they are deserialised (Flink and backend)
- Then: they read as `STRUCTURED` and are processed as today.

**TAC8 — Tenancy**

- Given: payload rows of organisations A and B
- When: the repository is queried with organisation A
- Then: only A's rows come back; querying B's `response_uuid` with A's id returns nothing.

**TAC9 — Switch off by default**

- Given: every `llm_providers.answer_mode` at its default `STRUCTURED`
- When: a report is processed
- Then: every question message carries `STRUCTURED` and no payload row is written.

**TAC10 — Enrichment guard**

- Given: a snapshot with natural SUCCESS rows
- When: the enrichment triggers run
- Then: those rows keep their default enrichment columns, no exception is raised, the report reaches its final status, and structured rows of the same report are enriched as today.

**TAC11 — Per-engine switch**

- Given: `gemini` set to `NATURAL`, the other analysis providers `STRUCTURED`, `gemini-internal` set to `NATURAL` by mistake, and an empty organisation list
- When: a report with Gemini, ChatGPT and Claude is processed, and category discovery runs in the wizard
- Then: Gemini messages carry `NATURAL`, ChatGPT and Claude messages carry `STRUCTURED`, the discovery call is structured, and one `WARN` names `gemini-internal`.

**TAC12 — Staging organisation guard**

- Given: `gemini` set to `NATURAL` and `GEO_NATURAL_ANSWERS_ORGANISATION_IDS` = organisation A
- When: reports of organisations A and B are processed
- Then: A's Gemini messages carry `NATURAL`, B's carry `STRUCTURED`.

**TAC13 — Retention**

- Given: monthly partitions from 26 months ago to 2 months ahead, and the `DEFAULT` partition
- When: the upkeep task runs (twice)
- Then: the partitions whose month ended more than 24 months ago are dropped, the others and `DEFAULT` remain, the next 2 months exist, and the second run changes nothing.

## Technical Details

### Also delivered here (verbatim GEO-678)

**User Story 1.11 AC3 — Country parameter, or the hint, on the API route** _(updated by the PM on 2026-10-30)_

- Given: an engine on its API route, natural or fallback
- When: the question is sent
- Then: the country goes through the engine's own country parameter where a staging check shows it reaches the engine, otherwise through the country hint "The user is located in {country}" as the only system instruction, never both, with no instruction on sources (today's "Prioritize {country}-language sources" goes), and the question is sent bare, with no "Market:", "Question:" or "Category:" line, as a real user would not type them

**User Story 1.6 AC4 — Raw answer kept**

- Given: parsing produces a result
- When: it is stored
- Then: the raw answer remains available so the extraction can be corrected and re-run later

### Scope note (OS-Team)

This story collects and stores the natural answer; it does not read it (reading = stories 50.2 onward, GEO-1551). The natural mode is switched on **engine by engine** (a setting per engine, off by default, analysis engines only; internal engines always stay structured). Engines are turned on in production only once 50.2 to 50.7 are live, one by one, decided with the PM from the comparison of story 1.4. QA checks it on staging, on a test organisation, with one engine switched on: in the same analysis that engine answers naturally while the others keep today's request. With every engine off, nothing changes. Full answers are kept 2 years, then purged. AC5 (Perception-style reading) and AC6 are delivered by the reader (50.2, 50.6).

## Dependencies

- **Blocks:** GEO-1564, GEO-1569, GEO-1551, GEO-1555, GEO-1557
- **Blocked by:** none in Jira links
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1550
- External Spec: [epic-50/50-1-engines-answer-questions-naturally.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-1-engines-answer-questions-naturally.md)
