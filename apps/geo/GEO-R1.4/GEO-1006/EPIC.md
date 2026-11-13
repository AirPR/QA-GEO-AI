# Add Google AI Mode as a Tracked Surface

**Epic ID:** GEO-1006
**Status:** [TO DO] To Do
**Assigned to:** Abdenasser Aroukhsiss
**Fix version:** 1.4
**Created:** 2026-07-20
**Updated:** 2026-11-13
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1006

## Description / Functional Need

_Jira description, verbatim._

Google AI Mode is the conversational AI search of Google, opened from the "AI Mode" tab of Google Search. It is a different surface from AI Overviews (the summary above the search results, GEO-1005): AI Mode answers every question with a full answer, its sources and often images or product cards. Today GEO cannot say whether a brand appears in it: it has no official API, so the analysis does not track it.

The goal is to add AI Mode as one more engine of the analysis, with the same metrics, the same question panel and the same exports as the other engines. The answer can only be read on the rendered Google page, so this epic uses the rendered capture and the shared answer reader of GEO-678 (Natural Answer Collection and Parsing), and the full answer card of GEO-1498 (Natural Answer Display). It adds what is specific to AI Mode: it is not open in every country, there is no API to fall back on, only the first answer of the conversation is read, and the answer can carry images.

Production capture waits for the same decisions as GEO-678: the legal sign-off on UI capture, the vendor contract, and the approval to capture the Google surfaces.

The architect will go into the implementation details.

---

Naming

| Where | Text |
|---|---|
| Engine name, everywhere an engine name shows (wizard, Manage Scope, back office, filters, pills, tabs, exports) | "Google AI Mode" |
| Compact pills (4 engines or more), as today | Logo only, "Google AI Mode" in the tooltip |
| Stored description, not shown, as for every engine today (en-GB, en-US) | "The conversational AI search mode of Google, powered by Gemini, delivering detailed answers with cited sources." |
| Stored description (fr-FR) | "Le mode de recherche conversationnel IA de Google, propulsé par Gemini, qui fournit des réponses détaillées accompagnées de sources citées." |
| Stored description (es-ES) | "El modo de búsqueda conversacional con IA de Google, impulsado por Gemini, que ofrece respuestas detalladas con fuentes citadas." |

Logo: the icon that Google shows on the "AI Mode" tab of Google Search (a magnifying glass with a spark), single colour like the ChatGPT and Grok logos, next to the name "AI Mode". The file is copied from a Google Search page captured on 20 Oct 2026 and is attached to this epic (google-ai-mode.svg). There is no fallback: AI Mode never uses the Google "G", which is the AI Overviews logo, and never the Gemini spark, which is the Gemini logo. On the wizard and Manage Scope card, the border colour is Google red (#EA4335), and the same colour is the engine colour in the Brand Territory pie: Gemini is already blue, so a third blue would make the engines look the same.

---

#### User Story 1.1: Select AI Mode as an engine

Story ID: TBD

> As a GEO user, I want to add Google AI Mode to my analysis, so that I measure my brand in Google's conversational AI answers.

Acceptance Criteria:

- Given an organisation whose allowed AI engines include Google AI Mode, When I open the engine step of the wizard or Manage Scope, Then it shows as one more engine card, after Google AI Overviews, with its name and logo, as the other engines (no description shows, as today)
- Given the back office, When I create or edit an organisation, Then Google AI Mode is one more option of the allowed AI engines, off by default for new and existing organisations, as every engine today
- Given I turn on Google AI Mode, When the prompt pool is computed, Then nothing changes: the pool counts prompts, never engines (GEO-1002)
- Given an existing analysis, When I turn Google AI Mode on in Manage Scope, Then it is collected from the next run, as for any engine added today

#### User Story 1.2: Capture the AI Mode answer per country

Story ID: TBD

> As a customer tracking several countries, I want the AI Mode answer captured in each country, so that I see what users in that country get.

Acceptance Criteria:

- Given a prompt configured for a country where AI Mode is open, When collection runs, Then the question is asked in AI Mode from that country, through the capture vendor of GEO-678 and its country setting, with no instruction added to the question
- Given the AI Mode conversation, When the answer is captured, Then only the first answer to the question is kept: no follow-up question is asked and the follow-up suggestions are not stored
- Given a captured AI Mode answer, When it is stored, Then the raw answer is kept with its route, vendor, country and date, as for any engine of GEO-678 (answer text, images, sources and the place of each source in the answer)
- Given the vendor returns no usable answer (vendor down, page not reached, capture cut), When the run ends, Then the answer is not counted (GEO-678 story 1.6): there is no API for AI Mode, so there is no API fallback, and the question is never sent to the Gemini API in its place

#### User Story 1.3: Handle the countries where AI Mode is not open

Story ID: TBD

> As a GEO user, I want to know before I run an analysis when AI Mode is not open in a country, so that I do not read the missing answers as my brand being absent.

Acceptance Criteria:

- Given the list of countries where AI Mode is open comes from the Google Search Help page "AI Mode" (https://support.google.com/websearch/answer/16011537), When it is set, Then it does not come from the capture vendor, which returns answers even where Google does not open AI Mode (eg: China and Iran on 6 Nov 2026)
- Given the Google list on 6 Nov 2026, When it is compared with the 196 GEO countries, Then AI Mode is not open in 4 of them: China, Cuba, Iran, North Korea
- Given I selected Google AI Mode and one country or more where it is not available, When the Review step of the wizard renders, Then the amber banner that lists what is left out today (countries and categories) adds the line "Google AI Mode won't apply to {countries}." with every such country named (eg: "Google AI Mode won't apply to China and Iran."), and the creation of the analysis stays allowed
- Given every country I selected is one where Google AI Mode is not available, When the Review step renders, Then the line reads "Google AI Mode won't apply to any of your selected countries." and the creation stays allowed, even when Google AI Mode is the only engine selected
- Given both Google engines are selected and each one leaves out countries, When the Review step renders, Then one banner shows, with one line for each engine
- Given Manage Scope, When I add a country where Google AI Mode is not available to an analysis with Google AI Mode, Then the add-country dialog shows the same line ("Google AI Mode won't apply to {countries}.") before I confirm, and adding the country stays allowed
- Given Manage Scope of an analysis with Google AI Mode and one country or more where it is not available, When I turn Google AI Mode on, or open Manage Scope later, Then the same amber line shows under the AI engines of Manage Scope, for as long as the analysis has such a country
- Given a country where AI Mode is not open, When collection runs, Then no AI Mode answer is collected for that country, and this is not a failed capture
- Given a country with no AI Mode answer, When the metrics are computed, Then AI Mode is left out of every metric for that country, and the other countries keep their AI Mode values
- Given a country where AI Mode is not open, When I open a question of that country, Then the AI Mode pill shows "Not available" in the grey badge of "Not counted" (GEO-1498, frame 04d), and its tab shows "Google AI Mode is not available in {country}" with no extracted block and no sources

#### User Story 1.4: Read the AI Mode answer like any other answer

Story ID: TBD

> As a GEO user, I want the AI Mode answer read with the same rules as the other engines, so that its rankings, outcomes, themes and sources compare with theirs.

Acceptance Criteria:

- Given a captured AI Mode answer, When it is parsed, Then the shared reader of GEO-678 extracts the ranking, the competitive outcome, the themes and tone and the sources with the same rules as for the other engines, brand family included
- Given the widget text and markup that the Google page leaves in a capture (eg: the follow-up suggestions, "AI responses may include mistakes", the feedback and share buttons), When the answer is stored for parsing, Then it is removed first, as GEO-678 story 1.10 does for the other rendered answers
- Given an AI Mode answer that cites sources as link chips inside its text and as a list of sources next to it, When the sources are read, Then each source keeps the place where the answer cites it, so the panel numbers them as in GEO-1498 story 1.4, and the sources of the list that the text does not cite follow without a number
- Given an image, a product card, a map or a local business card in the answer, When the answer is parsed, Then it is not read: brands, outcomes and themes come from the text only

#### User Story 1.5: Read the AI Mode answer in the question panel

Story ID: TBD

> As a GEO user, I want to read the AI Mode answer as Google showed it, so that I can check the extracted results against it.

Acceptance Criteria:

- Given an AI Mode answer, When I open its tab in the question panel, Then it uses the full answer card of GEO-1498 (clamp, "Show full answer", brand highlights, citation mini card, Sources card) with no change
- Given an AI Mode answer with images, When it renders, Then the images show in the answer at the place Google showed them, as drawn in frames 08a and 08b of GEO-1017, and clicking an image opens it fullscreen, with Escape and the back button of frame 08b ("Back to answer") to come back to the answer
- Given a product card, a map or a local business card in the answer, When it renders, Then it does not show: the panel shows the text and the images only
- Given a captured image with a caption, When it renders, Then the caption and its source show under the image, as in frame 08a ("The traditional US "Big Three" carriers · Source: Portal Warehousing"), and the fullscreen view shows the full credit with the title of the source page, as in frame 08b
- Given a captured image with no caption, When it renders, Then the caption line is not shown, in the answer and in the fullscreen view
- Given an answer with several images, When I open one of them fullscreen, Then the viewer shows that image only, with no previous or next control, as in frame 08b, and I go back to the answer to open another one
- Given an image that does not load, When the answer renders, Then the image is hidden and the text of the answer is not changed
- Given the answer header, When it counts characters and citations, Then images are not counted

#### User Story 1.6: Show AI Mode everywhere engines show

Story ID: TBD

> As a GEO user, I want AI Mode shown like the other engines, so that I compare it with them on every view.

Acceptance Criteria:

- Given an analysis with AI Mode, When I use an engine filter or read a per-engine breakdown (KPIs, Brand Rankings, trends, sources, the Corporate Reputation panel, the Brand Territory pie, the Related Prompts modal), Then AI Mode is one more engine, with its name and its logo
- Given the engine order, When engines show in a list (wizard, Manage Scope, filters, question panel pills, Actions Center tabs, engine lists of the exports), Then AI Mode takes the same place everywhere: ChatGPT, Gemini, Google AI Overviews, Google AI Mode, then the other engines
- Given an analysis with 4 engines or more, When the question panel pills render in their compact form, Then the AI Mode pill shows its logo only and "Google AI Mode" in the tooltip, as for every engine today
- Given the logo of AI Mode, When any view shows an engine logo (wizard, Manage Scope, back office, engine filters, pills, Sources card, Actions Center, exports), Then the AI Mode logo shows there, and never a blank or a default icon
- Given an analysis with AI Mode, When I export it to Excel, PowerPoint or PDF, Then AI Mode shows wherever the export shows an engine, with the name "Google AI Mode"
- Given an analysis without AI Mode, When I open it, Then AI Mode shows nowhere and the other engines show as today

---

### Scope boundaries

Dependencies

- GEO-678: the rendered capture, the vendor layer, the country setting and the shared reader. Without them stories 1.2 and 1.4 cannot ship.
- GEO-1498: the full answer card and the "Not counted" state.
- GEO-1005: the images and the fullscreen viewer of story 1.5 are built once, in whichever of the two epics ships first.

Out of scope

- Google AI Overviews (GEO-1005).
- The Lite Analysis (GEO-1532).
- Follow-up questions in the AI Mode conversation, and the queries Google runs behind the answer.
- Reading brands inside images, product cards, maps or local business cards.

## Scope

_No "Scope" section in the Jira description. The scope is the 6 user stories written in the description (Story ID: TBD in Jira, no child Story / Task created yet):_

- User Story 1.1: Select AI Mode as an engine
- User Story 1.2: Capture the AI Mode answer per country
- User Story 1.3: Handle the countries where AI Mode is not open
- User Story 1.4: Read the AI Mode answer like any other answer
- User Story 1.5: Read the AI Mode answer in the question panel
- User Story 1.6: Show AI Mode everywhere engines show

**Dependencies (verbatim):**

- GEO-678: the rendered capture, the vendor layer, the country setting and the shared reader. Without them stories 1.2 and 1.4 cannot ship.
- GEO-1498: the full answer card and the "Not counted" state.
- GEO-1005: the images and the fullscreen viewer of story 1.5 are built once, in whichever of the two epics ships first.

## Out of Scope

- Google AI Overviews (GEO-1005).
- The Lite Analysis (GEO-1532).
- Follow-up questions in the AI Mode conversation, and the queries Google runs behind the answer.
- Reading brands inside images, product cards, maps or local business cards.

## Associated Stories & Tasks

_No child Story or Task in Jira for this epic at import time._

| ID | Type | Title | Status |
|----|------|-------|--------|
| — | — | No child Story / Task | — |

**Stories planned in the epic description (not Jira issues yet):**

| Ref | Title | Story ID | ACs |
|-----|-------|----------|-----|
| User Story 1.1 | Select AI Mode as an engine | TBD | 4 |
| User Story 1.2 | Capture the AI Mode answer per country | TBD | 4 |
| User Story 1.3 | Handle the countries where AI Mode is not open | TBD | 10 |
| User Story 1.4 | Read the AI Mode answer like any other answer | TBD | 4 |
| User Story 1.5 | Read the AI Mode answer in the question panel | TBD | 8 |
| User Story 1.6 | Show AI Mode everywhere engines show | TBD | 6 |

Other children, not imported: none.

## Architecture

_No architecture section in the description._ The description says: "The architect will go into the implementation details."

## Acceptance Criteria — Summary

_No epic-level AC section. Aggregated from the 6 planned user stories (36 ACs, full text verbatim in the Description section above):_

- **User Story 1.1: Select AI Mode as an engine** (4 ACs) — I want to add Google AI Mode to my analysis, so that I measure my brand in Google's conversational AI answers.
- **User Story 1.2: Capture the AI Mode answer per country** (4 ACs) — I want the AI Mode answer captured in each country, so that I see what users in that country get.
- **User Story 1.3: Handle the countries where AI Mode is not open** (10 ACs) — I want to know before I run an analysis when AI Mode is not open in a country, so that I do not read the missing answers as my brand being absent.
- **User Story 1.4: Read the AI Mode answer like any other answer** (4 ACs) — I want the AI Mode answer read with the same rules as the other engines, so that its rankings, outcomes, themes and sources compare with theirs.
- **User Story 1.5: Read the AI Mode answer in the question panel** (8 ACs) — I want to read the AI Mode answer as Google showed it, so that I can check the extracted results against it.
- **User Story 1.6: Show AI Mode everywhere engines show** (6 ACs) — I want AI Mode shown like the other engines, so that I compare it with them on every view.

## Links

- https://onclusive.atlassian.net/browse/GEO-1006
- https://support.google.com/websearch/answer/16011537
