# GEO-1238: Leave the wizard

**Story ID:** GEO-1238
**Issue Type:** Story
**Title:** STORY-45.9: Leave the wizard
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1238

## User Story

> As a user who started a setup, I want a confirmation before I leave the wizard, so that I do not lose my choices by mistake.

## Acceptance Criteria

**AC1 — Confirmation on Back to Dashboard**

- Given: any step
- When: I click Back to Dashboard
- Then: a confirmation states that exiting discards every choice, since there is no save as draft

**AC2 — Cancel keeps everything**

- Given: the confirmation
- When: I cancel
- Then: I stay on the same step with my choices intact

## Technical Details

### Rules (settled — OS-Team, 2026-10-08; amended 2026-10-13)

- The confirmation opens from Back to Dashboard (sidebar) and from Back on the first step, on every step, as soon as something was entered: a brand or a topic, a market, a category or a prompt. With nothing entered, I leave directly. Picking the analysis type (Analysis Type step, STORY-46.1) is not a choice on its own: with only the type picked, I leave directly. *(Amended 2026-10-13 to align with STORY-46.1; same behaviour for a brand analysis.)*
- "Exit setup?" says there is no draft and that exiting discards every choice, including the prompts I kept. Resume Setup, the cross and Esc keep me on the same step with everything intact; Exit and Discard goes back to the dashboard.
- The message names the brand, or the topic for a topic analysis ("this brand" / "this topic" when none is entered yet).
- Back to Dashboard is disabled while categories are being discovered and while the analysis is being created, and hidden on the "Analysis created" confirmation (STORY-45.8).
- Reloading or closing the tab with choices entered shows the browser's own confirmation; logging out or a session expiry does not.
- Going back to a previous step with unsaved changes keeps today's message.
- Not guarded in this story: the app's sidebar links and the organisation switch.

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames 0.1 and 0.2.

### Change log

- 2026-10-13 — Rule 1 amended (STORY-46.1: the analysis type alone is not a choice; a category or a prompt counts); topic name in the message added. Implemented in PR #748.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1002
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1238
- External Spec: [epic-45/45-9-leave-the-wizard.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-9-leave-the-wizard.md)
