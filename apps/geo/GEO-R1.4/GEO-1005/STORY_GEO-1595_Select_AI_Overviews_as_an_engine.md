# GEO-1595: STORY-54.1: Select AI Overviews as an engine

**Story ID:** GEO-1595
**Issue Type:** Story
**Title:** STORY-54.1: Select AI Overviews as an engine
**Status:** [CODE REVIEW] Code Review
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1005
**Fix version:** 1.4
**Created:** 2026-11-11
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1595

## User Story

> As a GEO user, I want to add Google AI Overviews to my analysis, so that I measure my brand in the AI answer my audience sees on Google.

- **As** a GEO user
- **I want** to add Google AI Overviews to my analysis
- **So that** I measure my brand in the AI answer my audience sees on Google.

## Acceptance Criteria

_5 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1005, User Story 1.1)

- Given an organisation whose allowed AI engines include Google AI Overviews, When I open the engine step of the wizard or Manage Scope, Then it shows as one more engine card, after Gemini, with its name and logo, as the other engines (no description shows, as today)
- Given the back office, When I create or edit an organisation, Then Google AI Overviews is one more option of the allowed AI engines, off by default for new and existing organisations, as every engine today
- Given I turn on Google AI Overviews, When the prompt pool is computed, Then nothing changes: the pool counts prompts, never engines (GEO-1002)
- Given an existing analysis, When I turn Google AI Overviews on in Manage Scope, Then it is collected from the next run, as for any engine added today
- Given the back office, When I create an organisation, Then at least one AI engine is required, so that no engine is given to a new organisation without anyone choosing it (added to the epic by the PM, 2026-11-12)

## Technical Details

### What the code adds to the epic text

- **Back office: creating an organisation now requires at least one engine** (validated by the PM, 2026-11-12, and now an AC of the epic). Today the form shows every engine off, but the backend gives a new organisation every active engine when nothing is ticked (the creation request carries no engine list; the form sends the chosen engines in a second call, only if at least one is ticked). Left as is, AI Overviews would be granted to every new organisation created without ticking anything, which contradicts "off by default". The story sends the engine list in the creation request, makes it required (the Create button is disabled while no engine is ticked, and the API refuses an empty list), stores it in the same transaction as the organisation, and removes the implicit "every active engine" default. Editing an organisation is unchanged. Existing organisations already do not have the engine and are not changed (no backfill).
- "After Gemini" needs the order of the later engines to be shifted: the current orders are 1 to 5 with no gap. The shift is relative, because the production values were not checked. The order everywhere is the database one (validated by the PM, 2026-11-12, and written in story 1.6 of the epic): ChatGPT, Gemini, Google AI Overviews, the free slot kept for Google AI Mode, then Grok, Claude, Perplexity. In the PowerPoint export the engines read Grok then Claude (accepted by the PM).
- Engine presentation (names, logos, colours, order) is hard-coded in about eleven places and nothing tests it. The story starts with a separate refactor, with zero change for the five existing engines and characterization tests written first, then adds the engine.
- The engine row is created inactive and activated per environment: the epic says production capture waits for the legal sign-off, the vendor contract and the approval to capture the Google surfaces, and the engine has no API to fall back on.

### Scope note

Two PRs, both to the integration branch: PR 1 "engine presentation refactor" (no behaviour change), PR 2 "AI Overviews engine" (one database migration, creation of an organisation with its engines, back office, wizard, Manage Scope). First story of the epic: the others depend on its migration. Design: GEO-1017 (Figma "Measure - GEO Module"), logo `google-g.svg` attached to GEO-1005, border and pie colour #34A853.

## Dependencies

- **Blocks:** GEO-1596
- **Blocked by:** none in Jira links
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1005
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1595
- External Spec: [54-1-select-ai-overviews-as-an-engine.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1005-epic-54-stories/docs/implementation-artifacts/epics/epic-54/54-1-select-ai-overviews-as-an-engine.md)
