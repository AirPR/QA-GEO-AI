# GEO-1558: STORY-50.9: Collect answers the way a real user sees them

**Story ID:** GEO-1558
**Issue Type:** Story
**Title:** STORY-50.9: Collect answers the way a real user sees them
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1558

## User Story

> As an analyst, I want the engines we already track collected as a real user sees them, so that my analysis reflects genuine engine behavior rather than an API approximation.

- **As** an analyst
- **I want** the engines we already track collected as a real user sees them
- **So that** my analysis reflects genuine engine behavior rather than an API approximation.

_As written in Jira:_

**User Story 1.9** — As an analyst, I want the engines we already track collected as a real user sees them, so that my analysis reflects genuine engine behavior rather than an API approximation.

## Acceptance Criteria

_11 functional ACs + 10 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

✅ **Ready for dev** (2026-10-30) — wave 2. Build and staging captures with the Cloro dev key approved by the PM on 2026-10-30 (comment on this ticket); the switch to rendered capture in production still waits for the legal sign-off and the capture vendor contract.

**Acceptance Criteria**

- Given an already-tracked engine whose surface is public and no-login, When collection runs after the switch, Then its answer is obtained by rendered capture rather than an API call
- Given a captured answer, When it is stored, Then it is stored raw with its capture time and its locale, and can be read again later without capturing it again
- Given an answer, When it is recorded, Then the collection route actually used (rendered interface or API) and the vendor are stored with it; the route of each engine is set in production, and an answer collected through the API fallback (story 1.12) stores the API route
- Given a rendered answer, When it is stored for parsing, Then the widget text and markup the capture leaves in it are removed first (eg: "Let me narrow it down for you", "Go to product viewer dialog"), and parsing never relies on markdown created by a capture vendor
- Given a capture attempt that fails, When it ends, Then the failure is recorded, no partial answer is stored, and the answer is collected through the API fallback (story 1.12)

**Also delivered here (User Story 1.12 AC1):** Given an engine on rendered capture, When a surface is captured, Then it goes through one capture vendor, behind a layer that lets the vendor be changed later without changing how answers are stored or parsed

**Delivered elsewhere:** AC3 route and vendor columns → STORY-50.1 (GEO-1550); AC5 API fallback → STORY-50.12.

---

### Acceptance Criteria (story file, synced at review — 2026-11-05)

##### Functional ACs (US 1.9)

**AC1 — Rendered capture for public surfaces**

- Given: an already-tracked engine whose surface is public and no-login
- When: collection runs after the switch
- Then: its answer is obtained by rendered capture rather than an API call

**AC2 — Raw capture kept**

- Given: a captured answer
- When: it is stored
- Then: it is stored raw with its capture time and its locale, and can be read again later without capturing it again

**AC3 — Route and vendor stored**

- Given: an answer
- When: it is recorded
- Then: the collection route actually used (rendered interface or API) and the vendor are stored with it; the route of each engine is set in production, and an answer collected through the API fallback (story 1.12) stores the API route

**AC4 — Capture residue removed**

- Given: a rendered answer
- When: it is stored for parsing
- Then: the widget text and markup the capture leaves in it are removed first (eg: "Let me narrow it down for you", "Go to product viewer dialog"), and parsing never relies on markdown created by a capture vendor

**AC5 — Failed capture**

- Given: a capture attempt that fails
- When: it ends
- Then: the failure is recorded, no partial answer is stored, and the answer is collected through the API fallback (story 1.12)

**US 1.12 AC1 — One vendor behind a layer**

- Given: an engine on rendered capture
- When: a surface is captured
- Then: it goes through one capture vendor, behind a layer that lets the vendor be changed later without changing how answers are stored or parsed

##### Rules (for QA)

QA can only check this story on staging, with the Cloro dev key and an engine set to the capture route on a test organisation.

- For an engine set to the capture route, every analysis question of that engine is captured through the vendor; the other engines of the same analysis keep their API route.
- For each captured answer, support can fetch back the raw capture as the vendor returned it, with its capture time and locale, without a new capture.
- Each answer shows its route (rendered or API) and its vendor in the stored data.
- The text the reader receives holds no widget text or markup (eg: "Let me narrow it down for you", "Go to product viewer dialog", `<Carousel>` tags).
- When a capture fails, no answer text is stored for it, and the failure (its kind) is visible in the stored data.
- With every engine on its API route (default), nothing changes.

##### Technical ACs (dev context, ignored by QA)

**TAC1 — Route per question** — Given `gemini` set to `RENDERED` with a capture vendor, `openai` on `API`, mock vendor; When a report with both engines is processed; Then Gemini messages carry `RENDERED` and go through `CaptureVendor`; ChatGPT messages carry `API` and get the 50.1 request; the counter reaches its total.

**TAC2 — Constraint** — Given a provider row with `collection_route = RENDERED` and `answer_mode = STRUCTURED`, or with no `capture_vendor`; When it is written; Then the CHECK constraint rejects it.

**TAC3 — Old messages** — Given a `QuestionMessage` without `collectionRoute` and a `ResponseEvent` without the new fields; When they are deserialised; Then they read as the API route and are processed as today.

**TAC4 — Raw kept** — Given a captured answer; When it is processed; Then the raw vendor response is kept byte for byte (`llm_response_payloads.raw_body`, decision of 2026-11-05: no object store, the Cloro JSON weighs 3–19 KB) with `captured_at` and `capture_locale`; the event stays under the 50.1 size guard (a larger capture ends as `CAPTURE_FAILED`); the row stores route `RENDERED` and the vendor key.

**TAC5 — Cleaning** — Given captured pages holding "Let me narrow it down for you", "Go to product viewer dialog", `<ElicitationsGroup>` and `<Carousel>` markup; When the cleaner runs; Then none of them is in `answer_text` and the remaining words are unchanged (Cloro gives no citation positions: captured answers keep their sources without citation links).

**TAC6 — Same reading as the API route** — Given a cleaned record and an API input with the same text and sources; When the reader's code-side computation runs on the same recorded reply; Then brands, ranks, spans and citation links are equal.

**TAC7 — Failed capture** — Given the vendor throwing each failure kind; When the dispatcher handles it; Then exactly one FAILED event per question and engine, with `captureFailure` set, no text, no body, no raw capture; retryable kinds were retried; the counter advances.

**TAC8 — Idempotent store** — Given the same capture processed twice; When both are consumed; Then one `llm_responses` row and one payload row (dedup unchanged).

**TAC9 — Tenancy** — Given captures of organisations A and B; When B's raw capture is read with A's id; Then nothing is returned (404), and repository reads return only A's rows.

**TAC10 — Default unchanged** — Given every provider at `collection_route = API`; When a report is processed; Then no message carries `RENDERED`, no capture runs, requests are those of 50.1.

📋 Spec complète : [epic-50/50-9-collect-answers-the-way-a-real-user-sees-them.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-9-collect-answers-the-way-a-real-user-sees-them.md)

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1558
- External Spec: [epic-50/50-9-collect-answers-the-way-a-real-user-sees-them.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-9-collect-answers-the-way-a-real-user-sees-them.md)
- External Spec: [epic-50/50-9-collect-answers-the-way-a-real-user-sees-them.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-9-collect-answers-the-way-a-real-user-sees-them.md)
