# GEO-1561: STORY-50.12: Fall back to the API when capture fails

**Story ID:** GEO-1561
**Issue Type:** Story
**Title:** STORY-50.12: Fall back to the API when capture fails
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1561

## User Story

> As a user, I want every prompt to get an answer in each run, so that a capture problem never leaves a hole in my analysis.

- **As** a user
- **I want** every prompt to get an answer in each run
- **So that** a capture problem never leaves a hole in my analysis.

_As written in Jira:_

**User Story 1.12** — As a user, I want every prompt to get an answer in each run, so that a capture problem never leaves a hole in my analysis.

## Acceptance Criteria

_11 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

🔍 **Code review** (2026-11-09) — dev finished on `feature/GEO-1561-api-fallback-on-capture-failure` (from `feature/GEO-678-vague-2`). Earlier: ✅ Ready for dev (2026-10-30) — wave 2. Build and staging captures with the Cloro dev key approved by the PM on 2026-10-30 (GEO-1558); the switch to rendered capture in production still waits for the legal sign-off and the capture vendor contract. Depends on STORY-50.9 (GEO-1558) and STORY-50.11 (GEO-1560).

**Acceptance Criteria**

- Given an engine on rendered capture, When a surface is captured, Then it goes through one capture vendor, behind a layer that lets the vendor be changed later without changing how answers are stored or parsed _(delivered by STORY-50.9, GEO-1558)_
- Given an engine on rendered capture, When the vendor returns no usable answer (vendor down or disallowed, engine not reachable, capture failed or cut), Then the answer is collected through the engine's official API with the bare question and the country sent as in story 1.11 (country parameter, or the country hint where the parameter does not reach the engine), the same request as the natural API route, so the prompt still gets an answer for that run _(updated by the PM on 2026-10-30)_
- Given an answer collected through the API fallback, When it is parsed and counted, Then it follows the same rules as any other answer and keeps the API route, so QA and support can see which answers came from the fallback
- Given the API fallback also fails, When the run ends, Then the answer is not counted (story 1.6)

**Rules (for QA)** — checkable on staging with the mock vendor set to fail

- An engine on rendered capture whose capture fails: the question still has that engine's answer for the run, with route API, vendor OpenRouter and the capture failure kind in the stored data.
- The fallback request holds the question alone and the country, through the engine's country parameter or the country hint, never both (same as an engine on its API route).
- The fallback answer appears in the metrics like any other answer.
- When both the capture and the API fail, that engine's answer for the question is not counted and the analysis completes (row FAILED, route API, capture failure kind kept, API error in the error message).
- Each question gets one answer per engine and run, never two (one captured and one fallback).

**Technical Acceptance Criteria** (dev context, ignored by QA)

- **TAC1 — Fallback on each kind:** Given the mock vendor throwing each `CaptureException.Kind` and a stubbed OpenRouter returning a natural body, When a `RENDERED` message is dispatched, Then one SUCCESS event with route `API`, vendor `OPENROUTER`, `captureFailure` = the kind, and the 50.1 natural request was sent.
- **TAC2 — Both fail:** Given the mock vendor failing and OpenRouter returning 500 on every attempt, When the message is dispatched, Then one FAILED event with `captureFailure` set, after the API retries; the counter advances.
- **TAC3 — One event:** Given a capture that fails then a fallback that succeeds, and the same message delivered twice, When both deliveries are processed, Then one event is emitted and one `llm_responses` row exists.
- **TAC4 — Same engine only:** Given a failed Gemini capture, When the fallback runs, Then the call goes to Gemini's OpenRouter model, never to another provider.
- **TAC5 — Counted like any answer:** Given a snapshot with captured, fallback and failed answers for the same engine, When enrichment and the KPIs run, Then captured and fallback answers are read and counted the same way; failed ones are not counted; the fallback rows show route `API` and a `capture_failure`.
- **TAC6 — Breaker open:** Given the capture breaker open, When messages arrive, Then no vendor call, each goes to the API at once.
- **TAC7 — Time budget:** Given a capture that takes its full timeout then a fallback that answers, When the message is dispatched with the configured timeouts, Then the fallback event is emitted before the async timeout fires.

**Implementation note (user decision 2026-11-09):** the capture runs in its own Flink operator since 50.9, so a failed capture's question is sent back to the same engine's API dispatcher (its own rate limiter, breaker, retries and 300 s async timeout) instead of an API call inside the capture call. No timeout value changes. A `[CAPTURE_FALLBACK]` log line per engine is written at report finalisation.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1561
- External Spec: [epic-50/50-12-fall-back-to-the-api-when-capture-fails.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-12-fall-back-to-the-api-when-capture-fails.md)
