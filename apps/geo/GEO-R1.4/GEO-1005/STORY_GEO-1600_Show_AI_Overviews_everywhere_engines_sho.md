# GEO-1600: STORY-54.6: Show AI Overviews everywhere engines show

**Story ID:** GEO-1600
**Issue Type:** Story
**Title:** STORY-54.6: Show AI Overviews everywhere engines show
**Status:** [CODE REVIEW] Code Review
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1005
**Fix version:** 1.4
**Created:** 2026-11-11
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1600

## User Story

> As a GEO user, I want AI Overviews shown like the other engines, so that I compare it with them on every view.

- **As** a GEO user
- **I want** AI Overviews shown like the other engines
- **So that** I compare it with them on every view.

## Acceptance Criteria

_6 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1005, User Story 1.6)

- Given an analysis with AI Overviews, When I use an engine filter or read a per-engine breakdown (KPIs, Brand Rankings, trends, sources, the Corporate Reputation panel, the Brand Territory pie, the Related Prompts modal), Then AI Overviews is one more engine, with its name and its logo
- Given the engine order, When engines show in a list (wizard, Manage Scope, filters, question panel pills, Actions Center tabs, engine lists of the exports), Then AI Overviews takes the same place everywhere: ChatGPT, Gemini, Google AI Overviews, Google AI Mode, then Grok, Claude and Perplexity (full order added to the epic by the PM, 2026-11-12)
- Given an analysis with 4 engines or more, When the question panel pills render in their compact form, Then the AI Overviews pill shows its logo only and "Google AI Overviews" in the tooltip, as for every engine today
- Given the logo of AI Overviews, When any view shows an engine logo (wizard, Manage Scope, back office, engine filters, pills, Sources card, Actions Center, exports), Then the AI Overviews logo shows there, and never a blank or a default icon
- Given an analysis with AI Overviews, When I export it to Excel, PowerPoint or PDF, Then AI Overviews shows wherever the export shows an engine, with the name "Google AI Overviews"
- Given an analysis without AI Overviews, When I open it, Then AI Overviews shows nowhere and the other engines show as today

## Technical Details

### What the code adds to the epic text

- Most of this story is already true once STORY-54.1 has moved engine names and order to the database and logos and colours to one registry. What is left is to prove it on every surface and to catch the places the refactor may miss: the improvement card logo, the Actions Center fallback (a text instead of a logo for an unknown engine), the compact pills (which already overflowed once on staging) and the export classes that used to name engines with fixed lists.
- The deliverable is a six-engine test fixture and one sweep test per surface, plus the five-engine analysis pinned as unchanged.
- The order of the other engines is the database one (Grok, Claude, Perplexity), validated by the PM on 2026-11-12: the PowerPoint export lists Grok before Claude, as the screens do.

### Scope note

Closes the epic. Depends on STORY-54.1 (presentation refactor), STORY-54.3 (states) and STORY-54.5 (the panel). Frontend and exports; no migration. Lite Analysis is out of scope (GEO-1532).

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** GEO-1599
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1005
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1600
- External Spec: [54-6-show-ai-overviews-everywhere-engines-show.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1005-epic-54-stories/docs/implementation-artifacts/epics/epic-54/54-6-show-ai-overviews-everywhere-engines-show.md)
