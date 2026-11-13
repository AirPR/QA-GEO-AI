# GEO-1551: STORY-50.2: Derive structured results from the natural answer

**Story ID:** GEO-1551
**Issue Type:** Story
**Title:** STORY-50.2: Derive structured results from the natural answer
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1551

## User Story

> As a user, I want the rankings, competitive outcomes, perception themes, and sources to be extracted from each engine's natural answer, so that the metrics I rely on stay intact while reflecting real responses.

- **As** a user
- **I want** the rankings, competitive outcomes, perception themes, and sources to be extracted from each engine's natural answer
- **So that** the metrics I rely on stay intact while reflecting real responses.

_As written in Jira:_

**As** a user,
**I want** the rankings, competitive outcomes, perception themes, and sources to be extracted from each engine's natural answer,
**so that** the metrics I rely on stay intact while reflecting real responses.

## Acceptance Criteria

_8 functional ACs + 13 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional ACs (verbatim GEO-678, User Story 1.2)

**AC1 — Visibility ranking and other entities**

- Given: a natural visibility answer
- When: it is parsed
- Then: the brand ranking and the other entities mentioned are extracted from it, and the ranking only holds brands that the answer names

**AC2 — Competitive outcome**

- Given: a natural competitive answer
- When: it is parsed
- Then: its outcome for each brand is extracted from it (story 1.5), and not a ranking of the brands

**AC3 — Perception themes**

- Given: a natural perception answer
- When: it is parsed
- Then: the perception themes and their sentiment are extracted from it

**AC4 — Sources**

- Given: any natural answer that cites sources
- When: it is parsed
- Then: the cited sources are extracted with their links

**AC5 — Same results whatever the route**

- Given: a raw answer from any collection route, whether an engine answering naturally through its API or an answer captured from a rendered surface
- When: it is parsed
- Then: the same structured results are extracted regardless of how the answer was collected; GEO-1498 displays them, so any change to these results during the build is agreed with GEO-1498 first

**AC6 — Formatted text kept**

- Given: a natural answer
- When: it is parsed
- Then: the full answer text is stored with its formatting (paragraphs, lists, headings, tables) so it can be displayed as the engine wrote it

**AC7 — Brand mentions located**

- Given: a natural answer that names brands
- When: it is parsed
- Then: each mention of the tracked brand and of each competitor is identified in the text, including the other names an engine uses for a brand (eg: "Claude" for Anthropic), so the display can highlight them and link each ranked or chosen brand to its first mention

**AC8 — Citation markers linked**

- Given: a natural answer with inline citation markers
- When: it is parsed
- Then: each marker is linked to the source it points to, so the display can number the markers and the sources the same way, and two markers that point to the same page resolve to one source

### Technical ACs (dev context — not read by QA)

**TAC1 — Rank by first mention**

- Given: the committed `api_natural` answer `V01` of each engine and a recorded reader reply
- When: the reading is built
- Then: `brands[].rank` follows the first offset of each family in the text, and the order of `names_found` in the reply does not change it.

**TAC2 — Names not in the text are dropped**

- Given: a recorded reply that adds a brand absent from the answer text
- When: the reading is built
- Then: that brand is not in `brands[]`, and the other brands keep their ranks.

**TAC3 — Grouped call keeps answers apart**

- Given: one question with 5 natural engines, where only ChatGPT names brand X
- When: the grouped reply attributes X to Gemini too
- Then: X is dropped from Gemini's reading (not found in Gemini's text) and kept for ChatGPT.

**TAC4 — Citation links**

- Given: a Responses API body with two `url_citation` annotations to the same URL and one to another, and a Perplexity body with `[1] [4] [2]`
- When: the citation links are built
- Then: the two markers to the same URL get the same indicative number, numbers run 1 to n in order of first citation, every marker resolves to one source, and each link's `[start, end)` is the exact marker in `raw_response`.

**TAC5 — Same reading for both routes**

- Given: a reader input built from an API body and one built from a captured record with the same text and sources
- When: the code-side computation runs on the same recorded reply
- Then: brands, ranks, spans and citation links are equal.

**TAC6 — Columns for today's dashboard**

- Given: a snapshot with natural visibility rows for Gemini and structured rows for ChatGPT
- When: `VisibilityEnrichmentService.enrich` runs
- Then: Gemini rows get `mentioned_entities`, `is_mentioned`, `target_rank`, `total_entities` from the reading and `reader_version` set; ChatGPT rows are enriched exactly as today (existing tests unchanged); competitors are extracted from both.

**TAC7 — No transaction across LLM calls**

- Given: the reader service
- When: it runs
- Then: no `@Transactional` method calls the gateway (verified by test with a gateway mock that asserts `TransactionSynchronizationManager.isActualTransactionActive() == false`).

**TAC8 — Fallback on a bad grouped reply**

- Given: a grouped reply that is not valid JSON
- When: the reader handles it
- Then: each answer is read alone; an answer whose single reading also fails gets every extraction marked unavailable, and the snapshot enrichment completes.

**TAC9 — Fixtures hold no client data**

- Given: the committed fixtures
- When: `NaturalAnswerFixturesTest` runs
- Then: every record has a prompt family in `V`, `C`, `P`, `BN`, and no body contains a `request` object.

**TAC10 — Tenancy**

- Given: payload rows of organisations A and B
- When: the reader loads the bodies of A's snapshot
- Then: only A's bodies are read (repository methods take `organisationId`).

**TAC11 — Offsets on the stored text**

- Given: a committed Gemini `api_natural` body whose answer text holds Vertex redirect URLs, and the `raw_response` that 50.1 T11 stores for it (redirects replaced by longer or shorter destinations)
- When: the citation links and the mention spans are built
- Then: every `raw_response.substring(start, end)` is the exact marker or the exact brand name, every link `url` is the destination, never the redirect; on a body whose text has no Vertex URL the offsets equal the annotation offsets; on a `raw_response` that differs from the body in any other way the links are empty and one `WARN` is logged.

**TAC12 — UTF-16 offsets**

- Given: an answer with Chinese or Japanese text and an emoji before a brand name and before a citation marker
- When: the spans and links are built
- Then: the offsets are UTF-16 code units of `raw_response` (an emoji counts 2), and the substring check of TAC11 holds.

**TAC13 — Span coverage and exact names**

- Given: an answer that writes `HOKA` and `Clifton 9` (a HOKA product) and picks a brand that is neither tracked nor configured
- When: the spans are built
- Then: every occurrence of each family of `brands[]` and `picked[]` has a span, the picked brand included; the spans read `HOKA` and `Clifton 9` as written (not `Hoka`), with `family` = the HOKA family; no span overlaps a citation range.

## Technical Details

### Scope note (OS-Team)

This story builds the reader and produces every field of the output contract. The finer rules land on top of it: brand recognition and the end of the top-10 cap (50.3), ranking details and the 3-run comparison (50.4), competitive outcome columns (50.5), answers not counted (50.6), metrics (50.7), Brand Image reading (50.14). QA checks on staging with one engine switched to natural: brands in order of first mention in the question panel, no brand the answer does not name, sources = the engine's search results on its route (5 for ChatGPT, Claude and Gemini; Perplexity returns its full citation list, up to 15; none for Grok). Mention positions and citation numbering have no screen before GEO-1498 and are checked by the technical tests. Quality vs. the labels (target 95% per field) is reported per engine, not a gate.

## Dependencies

- **Blocks:** GEO-1566, GEO-1567, GEO-1569, GEO-1552, GEO-1553, GEO-1554, GEO-1556, GEO-1557, GEO-1555
- **Blocked by:** GEO-1550
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1551
- External Spec: [epic-50/50-2-derive-structured-results-from-the-natural-answer.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-2-derive-structured-results-from-the-natural-answer.md)
