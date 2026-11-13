# GEO-1560: STORY-50.11: Keep per-country capture

**Story ID:** GEO-1560
**Issue Type:** Story
**Title:** STORY-50.11: Keep per-country capture
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1560

## User Story

> As a customer tracking several countries, I want each country still captured in its own locale, so that country-level answers do not regress.

- **As** a customer tracking several countries
- **I want** each country still captured in its own locale
- **So that** country-level answers do not regress.

_As written in Jira:_

**User Story 1.11** — As a customer tracking several countries, I want each country still captured in its own locale, so that country-level answers do not regress.

## Acceptance Criteria

_10 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

✅ **Ready for dev** (2026-10-30) — wave 2. Build and staging captures with the Cloro dev key approved by the PM on 2026-10-30 (GEO-1558); the switch to rendered capture in production still waits for the legal sign-off and the capture vendor contract. Depends on STORY-50.9 (GEO-1558).

**Acceptance Criteria**

- Given a prompt configured for a country, When rendered capture runs, Then it returns the answer served in that country, as the API route did
- Given the same prompt across several countries, When it is captured, Then each country's answer is stored and attributed to its country
- Given an engine on its API route, natural or fallback, When the question is sent, Then the country goes through the engine's own country parameter where a staging check shows it reaches the engine, otherwise through the country hint "The user is located in {country}" as the only system instruction, never both, with no instruction on sources (today's "Prioritize {country}-language sources" goes), and the question is sent bare, with no "Market:", "Question:" or "Category:" line, as a real user would not type them _(updated by the PM on 2026-10-30; delivered by STORY-50.1, GEO-1550)_
- Given rendered capture, When a country is targeted, Then it uses the capture vendor's country setting and no instruction is added
- Given the capture vendor cannot target a country for an engine, When that engine is collected in that country, Then it uses the API fallback (story 1.12)

---

**Dev done (2026-11-05) — in review.** Branch `feature/GEO-1560-per-country-capture` → `feature/GEO-678-vague-2`.

**Functional ACs (Given / When / Then)**

**AC1 — Answer of the country**

- Given: a prompt configured for a country
- When: rendered capture runs
- Then: it returns the answer served in that country, as the API route did

**AC2 — One answer per country**

- Given: the same prompt across several countries
- When: it is captured
- Then: each country's answer is stored and attributed to its country

**AC3 — Country parameter, or the hint, on the API route** _(delivered by 50.1)_

- Given: an engine on its API route, natural or fallback
- When: the question is sent
- Then: the country goes through the engine's own country parameter where it reaches the engine, otherwise through the hint "The user is located in {country}", never both, and the question is sent bare

**AC4 — Vendor country setting, no instruction**

- Given: rendered capture
- When: a country is targeted
- Then: it uses the capture vendor's country setting and no instruction is added

**AC5 — Country the vendor cannot target**

- Given: the capture vendor cannot target a country for an engine
- When: that engine is collected in that country
- Then: it uses the API fallback (story 1.12) — this story ends the capture as `COUNTRY_NOT_SUPPORTED` without calling the vendor; the API fallback itself ships with 50.12

**Rules for QA:** the same prompt in two countries gives two captured answers, each on its own country with its own locale; the text sent to the vendor is exactly the prompt text; a country outside the engine's coverage (`FLINK_CAPTURE_COUNTRIES_<PROVIDER>`, Cloro mode only — the mock supports every country) ends with reason `COUNTRY_NOT_SUPPORTED`; a country the vendor reports serving wrongly ends as `COUNTRY_MISMATCH` (Cloro reports none).

📋 Spec complète : [epic-50/50-11-keep-per-country-capture.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-11-keep-per-country-capture.md)

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1560
- External Spec: [epic-50/50-11-keep-per-country-capture.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-11-keep-per-country-capture.md)
- External Spec: [epic-50/50-11-keep-per-country-capture.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-11-keep-per-country-capture.md)
