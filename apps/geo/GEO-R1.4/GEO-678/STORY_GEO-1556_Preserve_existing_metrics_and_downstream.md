# GEO-1556: STORY-50.7: Preserve existing metrics and downstream views

**Story ID:** GEO-1556
**Issue Type:** Story
**Title:** STORY-50.7: Preserve existing metrics and downstream views
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1556

## User Story

> As a user, I want all existing dashboards, rankings, and source views to keep working after this change, so that moving to natural answers does not regress anything I already use.

- **As** a user
- **I want** all existing dashboards, rankings, and source views to keep working after this change
- **So that** moving to natural answers does not regress anything I already use.

## Acceptance Criteria

_16 functional ACs + 12 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-678, User Story 1.7)

**AC1 — Every view renders**

- Given: an analysis produced with natural-answer parsing
- When: it is opened
- Then: every existing view renders in the same form, without missing data attributable to the change

**AC2 — Visibility**

- Given: natural visibility answers
- When: Visibility is computed
- Then: it is the share of counted answers that name the brand

**AC3 — Average Position**

- Given: natural visibility answers
- When: Average Position is computed
- Then: it stays the mean rank over the answers where the brand is named, ranks 1 to 10, with no penalty when the brand is absent, as today

**AC4 — AI Choice**

- Given: natural competitive answers
- When: AI Choice is computed for a brand
- Then: it is (Chosen + Conditional) divided by the counted competitive answers, so the AI Choice of the brands of one question no longer adds up to 100%; for a competitor (Brand Rankings, matrices, Excel) the denominator stays all counted competitive answers of the scope, as today

**AC5 — Every reader of "won"**

- Given: any view, export or AI summary that reads whether the brand won a competitive answer (question status, competitive improvements, AI Citation Sources competitive losses, executive and perception summaries)
- When: it reads a natural answer
- Then: Chosen and Conditional count as a win and Not chosen and Overlooked as a loss, as in AI Choice and Target Sources

> **PM, 2026-10-29, answer on GEO-1498 (readiness point 1):** "Excel favorability and row colour" is removed from this AC — the Raw Data sheet loses its Favorability column and its tint entirely (GEO-1498 story 1.6, STORY-53.6), it is not rewritten through the resolver; Brand Pillars keeps its own Favorability column and tint as today, untouched by this story.

**AC6 — Competitive improvements thresholds**

- Given: AI Choice values
- When: the competitive improvements are detected
- Then: they use the same thresholds on AI Choice as today (an issue under 50%, Critical under 25%, Warning under 40%)

**AC7 — Prioritization matrices**

- Given: AI Choice values
- When: the Brand and Category Prioritization matrices are drawn
- Then: their Y axis stays AI Choice, and the quadrant lines (Visibility 50, AI Choice 50, as since GEO-1524) and the AI Choice quality bands (Good above 50, Fair from 25) stay, reviewed on the first analysis runs with natural answers

**AC8 — Target Sources gap answers**

- Given: a competitive answer
- When: Target Sources selects gap answers
- Then: Not chosen and Overlooked answers are gap answers, and Conditional answers are not

**AC9 — Share of Voice**

- Given: natural visibility and competitive answers
- When: Share of Voice is computed
- Then: both count the same way: each brand family counts once per answer however many of its products are named, and the denominator is the number of brand families each answer names, not a fixed 10 per visibility answer (eg: Brooks, ASICS, HOKA, Saucony, New Balance in one answer gives Brooks 1 of 5; a competitive answer that names my brand and 2 others gives my brand 1 of 3, whatever its outcome), so the Share of Voice of all brands adds up to 100%, on every analysis date; the Share of Voice tooltip (today "Nike Air Max and Nike Pegasus ... that's 2 mentions", new text in GEO-1498 story 1.7) and the definition given to the AI summaries change to match, including the dates collected before this change

**AC10 — SOV bands**

- Given: the new Share of Voice values
- When: the quality bands are applied
- Then: they stay Good above 25, Fair from 15 to 25 and Poor under 15, and they are reviewed on the first analysis runs with natural answers

**AC11 — Perception themes**

- Given: a natural perception answer
- When: its themes are extracted
- Then: each theme gets a polarity (positive, mixed or negative) and an internal score that is never displayed, so the concept classification, the frequency and the category Sentiment tile work as today and the display follows Simplify Key Concepts (GEO-1068)

**AC12 — Off-topic and little-known**

- Given: a perception answer that misreads the question or where the engine says it knows little about the brand
- When: it is parsed
- Then: it is parsed like any other answer, with no special behaviour

**AC13 — Sources**

- Given: a natural answer with sources
- When: they are extracted
- Then: the sources are the ones the engine's search returned (the source list of the rendered page, or the search results of the API route), every one of them counts for the whole answer, not only for the top 10 brands, with no difference between sources cited inline and sources only listed, and a redirect link is resolved to the page it points to; Grok runs with no web search today, so it would return no source: turning its search on is to investigate with Engineering (cost per call), and the API route keeps its cap of 5 search results, so an API answer lists fewer sources than a captured one

**AC14 — Search sources in Citation Sources and Target Sources**

- Given: natural answers
- When: AI Citation Sources and Target Sources read their sources
- Then: they use these search sources, and the source list a model writes in its own answer today is no longer collected, so source volumes can drop on the first analysis date after the change

**AC15 — Cards and ads**

- Given: a rendered answer with shopping cards, product cards, entity cards or sponsored ads
- When: it is parsed
- Then: they are stored but never count for visibility, ranking or Share of Voice

**AC16 — Analyses produced before the change**

- Given: analyses produced before this change
- When: they are opened
- Then: their answers are not re-parsed by the analysis (an ops replay of the enrichment uses the new reader on new dates and keeps the old reader on these dates), their Share of Voice uses the new formula like every other date, a competitive answer that ranked the brand first reads as Chosen and any other as Not chosen (no Conditional or Overlooked on those dates), trend charts show no marker, and stored Target Sources verdicts are checked again once on the first run after the change

### Technical Acceptance Criteria (dev context, not read by QA)

Delivered in two PRs under this ticket: 50.7a (TAC1-TAC4, TAC7, TAC8, TAC9 first half, PR #946) and 50.7b (TAC5, TAC6, TAC9 second half, TAC10, TAC11, PR #947).

**TAC1 — Resolver**

- Given: a natural answer with `competitive_outcomes` Hoka `CONDITIONAL`, Brooks `OVERLOOKED`; a legacy answer with `is_first = true`; a legacy answer whose first entity is Brooks; a legacy answer whose first entity is Saucony (not a brand of the question); a legacy answer with `total_entities = 0`; a natural answer with `outcome_state = UNAVAILABLE`
- When: the resolver is asked for Hoka and Brooks
- Then: natural: Hoka `CONDITIONAL` (win), Brooks `OVERLOOKED` (gap); legacy 1: tracked brand `CHOSEN`; legacy 2: Brooks `CHOSEN` (a configured competitor of the question), tracked brand `NOT_CHOSEN`; legacy 4, `total_entities = 0`: `UNAVAILABLE` for every brand, left out of AI Choice; legacy 3, first entity Saucony, not a brand of the question: Saucony `NONE` (no win, no gap), tracked brand `NOT_CHOSEN`; a configured competitor of the category absent from the question: `NONE` on every row; unavailable: `UNAVAILABLE`, left out of AI Choice.

**TAC2 — No direct** `is_first` reader left

- Given: the codebase after T2
- When: an ArchUnit (or grep-based) test scans `service/aggregator`, `service/insights`, `service/export`
- Then: `getIsFirst()` is called only by `CompetitiveOutcomeResolver`, and by `XlsxExportService.favorabilityFromResponse` until 53.6 deletes it (one named exception in the test, removed by 53.6, T-C).

**TAC3 — AI Choice (AC4)**

- Given: 4 counted natural competitive answers for the tracked brand: Chosen, Conditional, Not chosen, Overlooked, and one excluded answer
- When: the KPI is computed
- Then: AI Choice = 2 / 4 = 50 %; a competitor Conditional in 1 of the same 4 answers has 1 / 4; a configured competitor of the category that is in none of the questions of the scope has no value (`null`), not 0 %; with the 4 answers split 3 for ChatGPT (Chosen, Conditional, Not chosen) and 1 for Gemini (Overlooked), the value stays the pooled 2 / 4 = 50 %, not the mean of 67 % and 0 % (33 %).

**TAC4 — Readers of "won" (AC5)**

- Given: a question whose engines answered Conditional and Overlooked for the tracked brand
- When: question status, competitive improvements and Citation Sources losses are computed
- Then: Conditional counts as a win, Overlooked as a loss, in each.

**TAC5 — SOV example (AC9)**

- Given: `ui_cloro:gemini:V01` stored as one visibility answer with Brooks, ASICS, HOKA, Saucony, New Balance, and one competitive answer naming the tracked brand and 2 others
- When: SOV is computed
- Then: Brooks = 1 / 5 on the first alone; the tracked brand gets 1 / 3 on the second whatever its outcome; the SOV of all brands of the scope adds up to 100 %.

**TAC6 — SOV on a legacy date (AC9, AC16)**

- Given: a pre-change snapshot (structured rows, at most 10 entities, two product entries of one family in one answer, one row with `total_entities = 0`)
- When: SOV is computed
- Then: the family counts once in that answer, the denominator is the families of each answer, the empty row adds 0, and all brands add up to 100 %.

**TAC7 — Legacy competitive (AC16)**

- Given: pre-change competitive rows, one of them with `total_entities = 0`
- When: AI Choice, question status and Target Sources legs are computed
- Then: values equal today's (rank 1 = win, else loss) on every row that names a brand; the `total_entities = 0` row is left out of the numerator and the denominator (today it counts as a loss, 53.7 T-C); no Conditional or Overlooked appears.

**TAC8 — Target Sources gaps (AC8)**

- Given: natural competitive answers Chosen, Conditional, Not chosen, Overlooked, and an excluded one
- When: candidates are selected
- Then: only Not chosen and Overlooked give `LOSING` legs.

**TAC9 — AI summaries**

- Given: a stored summary written before a half of this story is merged (`SCHEMA_VERSION = n`)
- When: the summary is requested after that half is released
- Then: it is not found, a new one is written with `SCHEMA_VERSION = n + 1`, and its prompt holds what that half changed: « AI Choice » and the outcome-based wins (50.7a), the new SOV definition (50.7b).

**TAC10 — Replay (AC16)**

- Given: a snapshot mixing natural and structured answers, with existing `response_sources` and `report_competitors`
- When: it is replayed
- Then: natural answers go through the reader, structured answers through today's enrichment, and `response_sources` and `report_competitors` are recomputed.

**TAC11 — Every view renders (AC1)**

- Given: the T11 fixture
- When: every endpoint is called
- Then: HTTP 200 and no empty widget where the structured-only snapshot had data.

**TAC12 — Unchanged rules (AC3, AC6, AC7, AC10, AC11, AC15)**

- Given: natural answers with a brand at rank 12, AI Choice values around the thresholds, themes with scores, and cards and ads in `reader_output`
- When: Average Position, improvements, matrices, bands, Sentiment and SOV are computed
- Then: rank 12 is ignored by Average Position, thresholds and bands are today's, Sentiment uses the theme scores as today, and cards and ads count nowhere.

## Technical Details

### Scope note

Backend only, depends on STORY-50.2 to 50.6 (GEO-1551 to GEO-1555). Every display change named above (AI Choice donut, engine pills, SOV tooltip text, labels, Excel layout) is GEO-1498. AC3 and AC11 to AC15 are delivered by the earlier stories and checked here by tests. Turning Grok's web search on is an Engineering investigation, not part of this story.

## Dependencies

- **Blocks:** GEO-1570, GEO-1571, GEO-1568, GEO-1569
- **Blocked by:** GEO-1551, GEO-1552, GEO-1553, GEO-1554, GEO-1555
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1556
- External Spec: [50-7-preserve-existing-metrics-and-downstream-views.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-7-preserve-existing-metrics-and-downstream-views.md)
