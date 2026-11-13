# GEO-1562: STORY-50.13: Compare each engine before switching it to rendered capture

**Story ID:** GEO-1562
**Issue Type:** Story
**Title:** STORY-50.13: Compare each engine before switching it to rendered capture
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1562

## User Story

> As a product owner, I want to see how an engine's results change between its API route and rendered capture, so that the switch of each engine is decided with the facts.

- **As** a product owner
- **I want** to see how an engine's results change between its API route and rendered capture
- **So that** the switch of each engine is decided with the facts.

_As written in Jira:_

**User Story 1.13** — As a product owner, I want to see how an engine's results change between its API route and rendered capture, so that the switch of each engine is decided with the facts.

## Acceptance Criteria

_6 functional ACs + 5 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

✅ **Ready for dev** (2026-10-30) — wave 2. Build and staging captures with the Cloro dev key approved by the PM on 2026-10-30 (GEO-1558), so the live comparison runs on staging; the switch to rendered capture in production still waits for the legal sign-off and the capture vendor contract. Depends on STORY-50.9 to 50.12 (GEO-1558 to GEO-1561); reuses the comparison endpoint of STORY-50.4 (GEO-1553).

**Acceptance Criteria**

- Given an engine planned for rendered capture, When the same prompts run through both routes, Then a comparison of the parsed results is produced (brands named and ranks, competitive outcomes, themes and tone, sources)
- Given the comparison, When the switch of that engine is decided, Then the decision is taken per engine from the comparison, with no pass or fail threshold
- Given an engine not yet switched, When collection runs, Then it stays on its API route

---

**Implemented — in review (2026-11-09)**, branch `feature/GEO-1562-route-comparison` → `feature/GEO-678-vague-2`.

**Functional ACs**

**AC1 — Comparison of the parsed results**

- Given: an engine planned for rendered capture
- When: the same prompts run through both routes
- Then: a comparison of the parsed results is produced (brands named and ranks, competitive outcomes, themes and tone, sources)

**AC2 — Decision per engine, no threshold**

- Given: the comparison
- When: the switch of that engine is decided
- Then: the decision is taken per engine from the comparison, with no pass or fail threshold

**AC3 — Not switched = API**

- Given: an engine not yet switched
- When: collection runs
- Then: it stays on its API route

**Rules (for QA)** — the comparison is a report for the PM, not a QA check. QA checks only:

- An engine that has not been switched answers through its API route in every analysis (stored route API, no capture).
- On staging, with the capture limited to the comparison organisation, the other organisations keep the API route for that engine.

**Technical ACs** (dev context, not read by QA)

**TAC1 — Answer-level comparison**

- Given: two reports of two organisations with 3 snapshots each, where one prompt's API answer names A, B, C and its captured answer names B, C, D (tracked brand B: rank 2 and rank 1), and a competitive answer Chosen on one side and Conditional on the other
- When: the endpoint is called by a SUPER_ADMIN
- Then: for that prompt and run, brands in both = B, C; only base = A; only compare = D; tracked rank 2 / 1; outcomes Chosen / Conditional; the response holds no pass or fail field.

**TAC2 — Themes and sources**

- Given: the same two reports, with themes per country × category and sources per answer
- When: the endpoint is called
- Then: each country × category lists both sides' labels with polarity and the labels in both; each answer lists both source counts and the domains in both.

**TAC3 — Not switched stays on API**

- Given: every provider at its default route and `GEO_CAPTURE_ORGANISATION_IDS` empty
- When: a report is processed
- Then: no message carries `RENDERED` (50.9 TAC10 kept green).

**TAC4 — Staging guard**

- Given: `gemini` set to `RENDERED` and `GEO_CAPTURE_ORGANISATION_IDS` = organisation B
- When: reports of organisations A and B are processed
- Then: B's Gemini messages carry `RENDERED`, A's carry `API`.

**TAC5 — Roles and tenancy**

- Given: the endpoint
- When: called by an ADMIN, or with a report id that does not exist
- Then: 403, then 404; each report is read with its own organisation id.

## Technical Details

_No technical details in the Jira description._

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** none in Jira links

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1562
- External Spec: [epic-50/50-13-compare-each-engine-before-switching-it-to-rendered-capture.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-13-compare-each-engine-before-switching-it-to-rendered-capture.md)
