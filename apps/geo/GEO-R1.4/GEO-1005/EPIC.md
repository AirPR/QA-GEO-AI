# Add Google AI Overviews as a Tracked Surface

**Epic ID:** GEO-1005
**Status:** [ACTION NEEDED] Action Needed
**Assigned to:** Abdenasser Aroukhsiss
**Fix version:** 1.4
**Created:** 2026-07-20
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1005

## Description / Functional Need

Google AI Overviews is the AI summary shown at the top of Google Search results. For many audiences it is the AI answer they see most, and today GEO cannot say whether a brand appears in it: it has no official API, so the analysis does not track it.

The goal is to add AI Overviews as one more engine of the analysis, with the same metrics, the same question panel and the same exports as the other engines. The answer can only be read on the rendered Google page, so this epic uses the rendered capture and the shared answer reader of GEO-678 (Natural Answer Collection and Parsing), and the full answer card of GEO-1498 (Natural Answer Display). It adds what is specific to AI Overviews: Google does not show an AI Overview for every query, there is no API to fall back on, and the answer can carry images.

Production capture waits for the vendor contract (GEO-678) and the approval to capture the Google surfaces. The legal sign-off on UI capture is obtained (11 Nov 2026). (Updated 2026-11-12) Google AI Mode is a different surface, in GEO-1006.

Change log: 12 Nov 2026, after the review of the stories GEO-1595 to GEO-1600: a new organisation needs at least one engine (story 1.1), a run with no applicable engine fails (story 1.2), softer "Not triggered" tab text (story 1.3), full engine order (story 1.6), legal sign-off status and vendor spend (scope boundaries).

The architect will go into the implementation details.

---

Naming

| Where | Text |
|---|---|
| Engine name, everywhere an engine name shows (wizard, Manage Scope, back office, filters, pills, tabs, exports) | "Google AI Overviews" |
| Compact pills (4 engines or more), as today | Logo only, "Google AI Overviews" in the tooltip |
| Stored description, not shown, as for every engine today (en-GB, en-US) | "An AI-generated summary from Google, powered by Gemini, shown above Google Search results with links to its sources." |
| Stored description (fr-FR) | "Un résumé généré par l'IA de Google, propulsé par Gemini, affiché au-dessus des résultats de recherche Google avec des liens vers ses sources." |
| Stored description (es-ES) | "Un resumen generado por la IA de Google, impulsado por Gemini, que aparece encima de los resultados de búsqueda de Google con enlaces a sus fuentes." |

Logo: the Google "G" in its four colours, next to the name "AI Overviews". The file is attached to this epic (google-g.svg) and is also in the Onclusive Design System brand logos. Google gives AI Overviews no icon of its own, and the Gemini spark is already the logo of the Gemini engine in GEO: the spark would make the two engines look the same. On the wizard and Manage Scope card, the border colour is Google green (#34A853), and the same colour is the engine colour in the Brand Territory pie: Gemini is already blue, so a third blue would make the engines look the same.

## Scope

- GEO-1595 — STORY-54.1: Select AI Overviews as an engine
- GEO-1596 — STORY-54.2: Capture the AI Overview per country
- GEO-1597 — STORY-54.3: Handle the prompts where Google shows no AI Overview
- GEO-1598 — STORY-54.4: Read the AI Overview like any other answer
- GEO-1599 — STORY-54.5: Read the AI Overview in the question panel
- GEO-1600 — STORY-54.6: Show AI Overviews everywhere engines show

### Dependencies

- GEO-678: the rendered capture, the vendor layer, the country setting and the shared reader. Without them stories 1.2 and 1.4 cannot ship.
- GEO-1498: the full answer card and the "Not counted" state. The images and the fullscreen viewer of story 1.5 are moved from GEO-1498 to this epic and to GEO-1006, and are built once, in whichever of the two ships first.

### Vendor spend

- Each AI Overviews capture costs 7 Cloro credits, whether Google shows an AI Overview or not. No daily budget and no credit alert are built: the team watches the Cloro vendor dashboard (Updated 2026-11-12)

## Out of Scope

- Google AI Mode (GEO-1006).
- The Lite Analysis (GEO-1532).
- The queries Google runs behind the AI Overview, and the AI Overview of a follow-up search.
- Reading brands inside images.

Still open (decision-gated, blocking production capture)

- The vendor contract (GEO-678). The legal sign-off on UI capture is obtained (11 Nov 2026).
- Approval to capture the Google surfaces: to confirm, the legal sign-off may not cover it.

Still open (non-blocking)

- Before the build, the team measures on a sample of prompts how often Google shows an AI Overview (eg: "AI Overview shown for 12 of 40 questions"), and then we decide whether the analysis shows this share as coverage context.

## Associated Stories & Tasks

| ID | Type | Title | Status | Fix version |
|----|------|-------|--------|-------------|
| GEO-1595 | Story | STORY-54.1: Select AI Overviews as an engine | [CODE REVIEW] Code Review | 1.4 |
| GEO-1596 | Story | STORY-54.2: Capture the AI Overview per country | [CODE REVIEW] Code Review | 1.4 |
| GEO-1597 | Story | STORY-54.3: Handle the prompts where Google shows no AI Overview | [CODE REVIEW] Code Review | 1.4 |
| GEO-1598 | Story | STORY-54.4: Read the AI Overview like any other answer | [CODE REVIEW] Code Review | 1.4 |
| GEO-1599 | Story | STORY-54.5: Read the AI Overview in the question panel | [CODE REVIEW] Code Review | 1.4 |
| GEO-1600 | Story | STORY-54.6: Show AI Overviews everywhere engines show | [CODE REVIEW] Code Review | 1.4 |

## Architecture

_No dedicated architecture section in the epic description; see the « Scope note » and technical sections of each story._

## Acceptance Criteria — Summary

_Epic user stories and acceptance criteria, copied verbatim from the epic description. The child stories restate them, sometimes with later changes._

#### User Story 1.1: Select AI Overviews as an engine

Story ID: TBD

> As a GEO user, I want to add Google AI Overviews to my analysis, so that I measure my brand in the AI answer my audience sees on Google.

Acceptance Criteria:

- Given an organisation whose allowed AI engines include Google AI Overviews, When I open the engine step of the wizard or Manage Scope, Then it shows as one more engine card, after Gemini, with its name and logo, as the other engines (no description shows, as today)
- Given the back office, When I create or edit an organisation, Then Google AI Overviews is one more option of the allowed AI engines, off by default for new and existing organisations, as every engine today
- Given the back office, When I create an organisation, Then at least one engine must be ticked: the Create button stays disabled while no engine is ticked, and a new organisation gets only the engines ticked (today the backend gives every active engine when none is ticked, which would give Google AI Overviews to every new organisation). Editing an organisation is unchanged, and existing organisations are not changed
- Given I turn on Google AI Overviews, When the prompt pool is computed, Then nothing changes: the pool counts prompts, never engines (GEO-1002)
- Given an existing analysis, When I turn Google AI Overviews on in Manage Scope, Then it is collected from the next run, as for any engine added today

#### User Story 1.2: Capture the AI Overview per country

Story ID: TBD

> As a customer tracking several countries, I want the AI Overview captured in each country, so that I see what users in that country get.

Acceptance Criteria:

- Given a prompt configured for a country, When collection runs, Then the AI Overview is captured from a Google Search page of that country, through the capture vendor of GEO-678 and its country setting, with no instruction added to the question
- Given an AI Overview that Google shows in part behind "Show more", When it is captured, Then the full AI Overview is stored, as a user reads it after "Show more"
- Given a captured AI Overview, When it is stored, Then the raw answer is kept with its route, vendor, country and date, as for any engine of GEO-678 (answer text, images, sources and the place of each source in the answer)
- Given the vendor returns no usable AI Overview (vendor down, page not reached, capture cut), When the run ends, Then the answer is not counted (GEO-678 story 1.6): there is no API for AI Overviews, so there is no API fallback, and the question is never sent to the Gemini API in its place
- Given a country where the capture vendor cannot capture AI Overviews (on 6 Nov 2026, 6 of the 196 GEO countries: China, Cuba, Ethiopia, Iceland, Iran, Sri Lanka), When collection runs in that country, Then no AI Overview is collected there
- Given I selected Google AI Overviews and one country or more where it is not available, When the Review step of the wizard renders, Then the amber banner that lists what is left out today (countries and categories) adds the line "Google AI Overviews won't apply to {countries}." with every such country named (eg: "Google AI Overviews won't apply to China and Iran."), and the creation of the analysis stays allowed
- Given every country I selected is one where Google AI Overviews is not available, When the Review step renders, Then the line reads "Google AI Overviews won't apply to any of your selected countries." and the creation stays allowed, even when Google AI Overviews is the only engine selected
- Given an analysis where no selected engine applies to any selected country (eg: Google AI Overviews is the only engine and every selected country is excluded), When a run starts, Then the run fails with a clear message ("No selected engine applies to the selected countries."), and it is never left in progress or announced as complete
- Given both Google engines are selected and each one leaves out countries, When the Review step renders, Then one banner shows, with one line for each engine
- Given Manage Scope, When I add a country where Google AI Overviews is not available to an analysis with Google AI Overviews, Then the add-country dialog shows the same line ("Google AI Overviews won't apply to {countries}.") before I confirm, and adding the country stays allowed
- Given Manage Scope of an analysis with Google AI Overviews and one country or more where it is not available, When I turn Google AI Overviews on, or open Manage Scope later, Then the same amber line shows under the AI engines of Manage Scope, for as long as the analysis has such a country

#### User Story 1.3: Handle the prompts where Google shows no AI Overview

Story ID: TBD

> As a GEO user, I want to know when Google shows no AI Overview for a question, so that I do not read it as my brand being absent.

Acceptance Criteria:

- Given a prompt for which the Google page of that country shows no AI Overview, When capture runs, Then the absence is stored as "not triggered", which is a result and not a failed capture
- Given a country where the vendor cannot capture AI Overviews, When I open a question of that country, Then the AI Overviews pill shows "Not available" in the same grey badge, and its tab shows "Google AI Overviews is not available in {country}" with no extracted block and no sources, as frame 04d draws "Not counted"
- Given a prompt with no AI Overview, When the metrics are computed, Then AI Overviews is left out of every metric for that prompt and that date: it does not count as not named, unranked or not chosen
- Given a prompt with no AI Overview, When I open the question panel, Then the AI Overviews pill shows "Not triggered" in the grey badge of "Not counted" (GEO-1498, frame 04d), in the place and size of the rank badge, compact form included, and its tab shows "No AI Overview was returned for this question in {country}." (fr-FR "Aucune AI Overview n'a été renvoyée pour cette question ({country}).", es-ES "No se ha devuelto ninguna AI Overview para esta pregunta ({country}).") with no extracted block and no sources: the text says what the capture vendor received, which can differ from what a signed-in user sees (Updated 2026-11-12)
- Given a prompt that had an AI Overview on one date and none on the next, When I read the trends, Then the date with no AI Overview gives no AI Overviews value for that prompt, as for an answer that is not counted
- Given the Excel Raw Data sheet, When a prompt has no AI Overview, Then it has no AI Overviews row, as for answers that are not counted (GEO-1498 story 1.6)

#### User Story 1.4: Read the AI Overview like any other answer

Story ID: TBD

> As a GEO user, I want the AI Overview read with the same rules as the other engines, so that its rankings, outcomes, themes and sources compare with theirs.

Acceptance Criteria:

- Given a captured AI Overview, When it is parsed, Then the shared reader of GEO-678 extracts the ranking, the competitive outcome, the themes and tone and the sources with the same rules as for the other engines, brand family included
- Given the widget text and markup that the Google page leaves in a capture (eg: "Show more", "AI responses may include mistakes", the feedback buttons), When the answer is stored for parsing, Then it is removed first, as GEO-678 story 1.10 does for the other rendered answers
- Given an AI Overview that cites sources as links next to its paragraphs and not as numbered markers, When the sources are read, Then each source keeps the place where the AI Overview cites it, so the panel numbers them as in GEO-1498 story 1.4
- Given an image in the AI Overview, When the answer is parsed, Then the image is not read: brands, outcomes and themes come from the text only

#### User Story 1.5: Read the AI Overview in the question panel

Story ID: TBD

> As a GEO user, I want to read the AI Overview as Google showed it, so that I can check the extracted results against it.

Acceptance Criteria:

- Given an AI Overview, When I open its tab in the question panel, Then it uses the full answer card of GEO-1498 (clamp, "Show full answer", brand highlights, citation mini card, Sources card) with no change
- Given an AI Overview with images, When it renders, Then the images show in the answer at the place Google showed them, as drawn in frames 08a and 08b of GEO-1017, and clicking an image opens it fullscreen, with Escape and the back button of frame 08b ("Back to answer") to come back to the answer
- Given a captured image with a caption, When it renders, Then the caption and its source show under the image, as in frame 08a ("The traditional US "Big Three" carriers · Source: Portal Warehousing"), and the fullscreen view shows the full credit with the title of the source page, as in frame 08b
- Given a captured image with no caption, When it renders, Then the caption line is not shown, in the answer and in the fullscreen view
- Given an answer with several images, When I open one of them fullscreen, Then the viewer shows that image only, with no previous or next control, as in frame 08b, and I go back to the answer to open another one
- Given an image that does not load, When the answer renders, Then the image is hidden and the text of the answer is not changed
- Given the answer header, When it counts characters and citations, Then images are not counted
- Given an AI Overview with no numbered citation, When it renders, Then the header shows "no inline citations" and the Sources card lists the sources, as for any engine in GEO-1498

#### User Story 1.6: Show AI Overviews everywhere engines show

Story ID: TBD

> As a GEO user, I want AI Overviews shown like the other engines, so that I compare it with them on every view.

Acceptance Criteria:

- Given an analysis with AI Overviews, When I use an engine filter or read a per-engine breakdown (KPIs, Brand Rankings, trends, sources, the Corporate Reputation panel, the Brand Territory pie, the Related Prompts modal), Then AI Overviews is one more engine, with its name and its logo
- Given the engine order, When engines show in a list (wizard, Manage Scope, filters, question panel pills, Actions Center tabs, engine lists of the exports), Then AI Overviews takes the same place everywhere: ChatGPT, Gemini, Google AI Overviews, Google AI Mode, then Grok, Claude and Perplexity
- Given an analysis with 4 engines or more, When the question panel pills render in their compact form, Then the AI Overviews pill shows its logo only and "Google AI Overviews" in the tooltip, as for every engine today
- Given the logo of AI Overviews, When any view shows an engine logo (wizard, Manage Scope, back office, engine filters, pills, Sources card, Actions Center, exports), Then the AI Overviews logo shows there, and never a blank or a default icon
- Given an analysis with AI Overviews, When I export it to Excel, PowerPoint or PDF, Then AI Overviews shows wherever the export shows an engine, with the name "Google AI Overviews"
- Given an analysis without AI Overviews, When I open it, Then AI Overviews shows nowhere and the other engines show as today

## Links

- https://onclusive.atlassian.net/browse/GEO-1005
- GEO-1595: https://onclusive.atlassian.net/browse/GEO-1595
- GEO-1596: https://onclusive.atlassian.net/browse/GEO-1596
- GEO-1597: https://onclusive.atlassian.net/browse/GEO-1597
- GEO-1598: https://onclusive.atlassian.net/browse/GEO-1598
- GEO-1599: https://onclusive.atlassian.net/browse/GEO-1599
- GEO-1600: https://onclusive.atlassian.net/browse/GEO-1600
