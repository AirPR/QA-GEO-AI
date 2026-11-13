# Epic GEO-1006: Add Google AI Mode as a Tracked Surface

Data imported from Jira for epic **GEO-1006: Add Google AI Mode as a Tracked Surface**

> Last Jira sync: 2026-11-13 — 0 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview, full Jira description (planned user stories and their ACs verbatim) |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data (stories[] empty, plannedStories[] from the description) |

_No STORY_ / TASK_ file: the epic has no child Story or Task in Jira yet._

## Epic Overview

Google AI Mode is the conversational AI search of Google, opened from the "AI Mode" tab of Google Search. It is a different surface from AI Overviews (the summary above the search results, GEO-1005): AI Mode answers every question with a full answer, its sources and often images or product cards. Today GEO cannot say whether a brand appears in it: it has no official API, so the analysis does not track it.

The goal is to add AI Mode as one more engine of the analysis, with the same metrics, the same question panel and the same exports as the other engines. The answer can only be read on the rendered Google page, so this epic uses the rendered capture and the shared answer reader of GEO-678 (Natural Answer Collection and Parsing), and the full answer card of GEO-1498 (Natural Answer Display). It adds what is specific to AI Mode: it is not open in every country, there is no API to fall back on, only the first answer of the conversation is read, and the answer can carry images.

Production capture waits for the same decisions as GEO-678: the legal sign-off on UI capture, the vendor contract, and the approval to capture the Google surfaces.

The architect will go into the implementation details.

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| — | — | No child Story / Task in Jira | — | — |

Planned in the description (Story ID: TBD): 1.1 Select AI Mode as an engine; 1.2 Capture the AI Mode answer per country; 1.3 Handle the countries where AI Mode is not open; 1.4 Read the AI Mode answer like any other answer; 1.5 Read the AI Mode answer in the question panel; 1.6 Show AI Mode everywhere engines show.

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1006
- **Stories:** none yet
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- Status To Do, fix version 1.4. No child Story / Task yet: 6 user stories (36 ACs) are written in the epic description with Story ID: TBD.
- Dependency: GEO-678: the rendered capture, the vendor layer, the country setting and the shared reader. Without them stories 1.2 and 1.4 cannot ship.
- Dependency: GEO-1498: the full answer card and the "Not counted" state.
- Dependency: GEO-1005: the images and the fullscreen viewer of story 1.5 are built once, in whichever of the two epics ships first.
- Other children: none.
- Test cases cannot be generated per story until the stories exist in Jira (re-import this epic once they are created).

## Out of Scope

- Google AI Overviews (GEO-1005).
- The Lite Analysis (GEO-1532).
- Follow-up questions in the AI Mode conversation, and the queries Google runs behind the answer.
- Reading brands inside images, product cards, maps or local business cards.
