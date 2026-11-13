# GEO-1597: STORY-54.3: Handle the prompts where Google shows no AI Overview

**Story ID:** GEO-1597
**Issue Type:** Story
**Title:** STORY-54.3: Handle the prompts where Google shows no AI Overview
**Status:** [CODE REVIEW] Code Review
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1005
**Fix version:** 1.4
**Created:** 2026-11-11
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1597

## User Story

> As a GEO user, I want to know when Google shows no AI Overview for a question, so that I do not read it as my brand being absent.

- **As** a GEO user
- **I want** to know when Google shows no AI Overview for a question
- **So that** I do not read it as my brand being absent.

## Acceptance Criteria

_6 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1005, User Story 1.3)

- Given a prompt for which the Google page of that country shows no AI Overview, When capture runs, Then the absence is stored as "not triggered", which is a result and not a failed capture
- Given a country where the vendor cannot capture AI Overviews, When I open a question of that country, Then the AI Overviews pill shows "Not available" in the same grey badge, and its tab shows "Google AI Overviews is not available in {country}" with no extracted block and no sources, as frame 04d draws "Not counted"
- Given a prompt with no AI Overview, When the metrics are computed, Then AI Overviews is left out of every metric for that prompt and that date: it does not count as not named, unranked or not chosen
- Given a prompt with no AI Overview, When I open the question panel, Then the AI Overviews pill shows "Not triggered" in the grey badge of "Not counted" (GEO-1498, frame 04d), in the place and size of the rank badge, compact form included, and its tab shows "No AI Overview was returned for this question in {country}." (en-GB, en-US), "Aucune AI Overview n'a été renvoyée pour cette question ({country})." (fr-FR), "No se ha devuelto ninguna AI Overview para esta pregunta ({country})." (es-ES), with no extracted block and no sources
- Given a prompt that had an AI Overview on one date and none on the next, When I read the trends, Then the date with no AI Overview gives no AI Overviews value for that prompt, as for an answer that is not counted
- Given the Excel Raw Data sheet, When a prompt has no AI Overview, Then it has no AI Overviews row, as for answers that are not counted (GEO-1498 story 1.6)

## Technical Details

### What the code and the vendor measurements add to the epic text

- "Not triggered" is an observed fact and is stored as a result: a new reason on the existing "not counted" mechanism. "Not available" is a configuration fact (no question is dispatched for an excluded country, see STORY-54.2) and is computed when the panel is read: the question detail only loads successful rows, so the backend has to build the entry of an engine that has no row.
- A failed capture is not a reason: stories 50.6 and 50.9 settled that it stays a failed row with its cause. It shows in the panel as for every engine today ("No data available", the panel loads only successful rows); the failure is recorded and visible in the report health view.
- Without a distinct success path, an absent AI Overview would end as a cut capture and, with no API, as a failed row. The vendor answers "200" with the AI Overview key absent, billed.
- Measured: 24 of 25 test queries had an AI Overview. The one absence was absent in 5 of 5 vendor calls while a signed-in browser showed one, so "not triggered" describes what the vendor's session received. The epic's wording is kept as written.
- Share of prompts with an AI Overview on real prompts (PM request, 2026-11-12): 97 % over 165 prompts of three analyses (160 with, 5 without on the first pass; 159 and 6 on the second). By market: en-US 100 % (15), es-ES 100 % (30), ar-MA 100 % (30), fr-FR 98 % (60), en-GB 87 % (30). The absences concentrate on generic visibility prompts: four UK visibility prompts had none on both passes, the other absences differ from one pass to the other, so "not triggered" is not stable for every prompt. Small sample, UK from a single analysis.
- The new reason needs its database CHECK replaced before any writer is deployed; a build older than the value fails when it loads such a row.

### Scope note

Depends on STORY-54.2. Design: GEO-1017, frame 04d "Not counted". Includes one database migration (the "not counted" reason CHECK), to be applied before the backend that writes the new reason is deployed.

## Dependencies

- **Blocks:** GEO-1598
- **Blocked by:** GEO-1596
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1005
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1597
- External Spec: [54-3-handle-the-prompts-where-google-shows-no-ai-overview.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1005-epic-54-stories/docs/implementation-artifacts/epics/epic-54/54-3-handle-the-prompts-where-google-shows-no-ai-overview.md)
