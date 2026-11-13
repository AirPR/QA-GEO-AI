# GEO-1596: STORY-54.2: Capture the AI Overview per country

**Story ID:** GEO-1596
**Issue Type:** Story
**Title:** STORY-54.2: Capture the AI Overview per country
**Status:** [CODE REVIEW] Code Review
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1005
**Fix version:** 1.4
**Created:** 2026-11-11
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1596

## User Story

> As a customer tracking several countries, I want the AI Overview captured in each country, so that I see what users in that country get.

- **As** a customer tracking several countries
- **I want** the AI Overview captured in each country
- **So that** I see what users in that country get.

## Acceptance Criteria

_11 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1005, User Story 1.2)

- Given a prompt configured for a country, When collection runs, Then the AI Overview is captured from a Google Search page of that country, through the capture vendor of GEO-678 and its country setting, with no instruction added to the question
- Given an AI Overview that Google shows in part behind "Show more", When it is captured, Then the full AI Overview is stored, as a user reads it after "Show more"
- Given a captured AI Overview, When it is stored, Then the raw answer is kept with its route, vendor, country and date, as for any engine of GEO-678 (answer text, images, sources and the place of each source in the answer)
- Given the vendor returns no usable AI Overview (vendor down, page not reached, capture cut), When the run ends, Then the answer is not counted (GEO-678 story 1.6): there is no API for AI Overviews, so there is no API fallback, and the question is never sent to the Gemini API in its place
- Given a country where the capture vendor cannot capture AI Overviews (on 6 Nov 2026, 6 of the 196 GEO countries: China, Cuba, Ethiopia, Iceland, Iran, Sri Lanka), When collection runs in that country, Then no AI Overview is collected there
- Given I selected Google AI Overviews and one country or more where it is not available, When the Review step of the wizard renders, Then the amber banner that lists what is left out today (countries and categories) adds the line "Google AI Overviews won't apply to {countries}." with every such country named (eg: "Google AI Overviews won't apply to China and Iran."), and the creation of the analysis stays allowed
- Given every country I selected is one where Google AI Overviews is not available, When the Review step renders, Then the line reads "Google AI Overviews won't apply to any of your selected countries." and the creation stays allowed, even when Google AI Overviews is the only engine selected
- Given no engine of the analysis applies to the selected countries, When the run starts, Then the run fails with the message "No selected engine applies to the selected countries." (added to the epic by the PM, 2026-11-12)
- Given both Google engines are selected and each one leaves out countries, When the Review step renders, Then one banner shows, with one line for each engine
- Given Manage Scope, When I add a country where Google AI Overviews is not available to an analysis with Google AI Overviews, Then the add-country dialog shows the same line ("Google AI Overviews won't apply to {countries}.") before I confirm, and adding the country stays allowed
- Given Manage Scope of an analysis with Google AI Overviews and one country or more where it is not available, When I turn Google AI Overviews on, or open Manage Scope later, Then the same amber line shows under the AI engines of Manage Scope, for as long as the analysis has such a country

## Technical Details

### What the code and the vendor measurements add to the epic text

- The vendor has no AI Overviews route: the AI Overview is part of a Google Search capture (another endpoint, request body and response root than ChatGPT and Gemini), so the capture layer becomes a registry of per-surface strategies keyed by data.
- "No API fallback" cannot be a single flag. Today every failed capture goes back to the engine's API, the organisation guards also downgrade to the API, and a report only completes if the capture step itself emits a terminal event. The story makes "no API request, ever, for this engine" an invariant in the backend, the message and Flink, and writes the exemption of the epic 50 rule ("every failed capture falls back to the API") in the docs.
- An excluded country is not refused by the vendor: it answers like "Google showed no AI Overview", billed. So the backend sends no question at all for an excluded country, in both analysis phases, with consistent totals.
- "Show more": the vendor does not document it, but all 31 recorded vendor AI Overviews end like a complete answer (closing questions or a closing sentence, none stops mid-list), which indicates the vendor returns the unfolded text. It is indirect evidence (the content changes on each call), so the story carries a verification task on more queries.
- Capture failure rate on real prompts (PM request, 2026-11-12): 0 failed captures out of 165 (three analyses; fr-FR, es-ES, ar-MA, en-GB, en-US; HTTP 200 on every call, median 10.7 s, maximum 28.2 s). Small sample, one call per prompt and pass.

### Questions for the PM

**P1 — A run where every question is skipped.** The epic keeps creation allowed when AI Overviews is the only engine and every selected country is excluded, and does not say what the run then does. At run time there is nothing to dispatch.

- Option A — the run fails with a clear message ("no selected engine applies to the selected countries"), like an analysis with no usable engine today. Option B — the run completes with zero responses and shows nothing.
- Answered by the PM on 2026-11-12: option A, the run fails with the message "No selected engine applies to the selected countries."
- If unanswered: A ships. Without any rule the code would leave the report in "processing" and announce "Analysis complete" with an empty status, which must not ship.

### Scope note

Depends on STORY-54.1 (the engine row and its columns). Covers the capture strategies, the no-API invariant, the excluded-country table and its use in both analysis phases, and the amber lines in the Review step, the add-country dialog and Manage Scope. Deploy order: Flink first, backend second. Out of repository: the engine key to add to the Flink provider list in the deployment overlays. Production capture also waits for the vendor contract and the approval to capture the Google surfaces (decisions of GEO-678).

## Dependencies

- **Blocks:** GEO-1597
- **Blocked by:** GEO-1595
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1005
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1596
- External Spec: [54-2-capture-the-ai-overview-per-country.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1005-epic-54-stories/docs/implementation-artifacts/epics/epic-54/54-2-capture-the-ai-overview-per-country.md)
