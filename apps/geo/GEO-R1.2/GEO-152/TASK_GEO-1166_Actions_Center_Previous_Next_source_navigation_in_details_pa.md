# GEO-1166: Actions Center — Previous/Next source navigation in details panel

**Task ID:** GEO-1166
**Issue Type:** Task
**Title:** Actions Center — Previous/Next source navigation in details panel
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-28
**Updated:** 2026-09-28
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1166

## User Story

_No user story in Jira (Task)._

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

Add a sticky footer to the Target Source details panel that lets users step through the ranked source list without closing the panel. Currently reviewing sources requires close → select next card → reopen for every source; since the list is ranked and users triage it top-to-bottom, panel-level navigation removes two clicks per source and keeps context.

**Implementation notes:**

- Render a sticky footer inside the panel (always visible, content scrolls under it): `Previous` button (left), `Source {index + 1} of {total}` counter (center), `Next source` button (right). Use the existing DS Button component (Neutral / Stroke / Small), icons `arrow_back_ios_new` / `arrow_forward_ios`.
- Navigation operates on the list as rendered at panel-open time — reason tab, source-type filter, and country/engine/date scope already applied. Index = position in that filtered, ranked order, not the global rank.
- On navigate: swap panel content to the adjacent source (no close/reopen), update the selected state on the corresponding card/row in the background, reset panel scroll to top, reset the article tab to Failing.
- Disable `Previous` on index 0 and `Next source` on the last index (disabled state from DS button, no wrap-around).
- Keyboard: bind ArrowLeft/ArrowRight to Previous/Next while the panel has focus; buttons must be reachable by Tab and announce disabled state (aria-disabled).
- Analytics: fire an event per navigation (`action_center.source_nav`, direction + source rank) so we can validate the triage-flow hypothesis.

**Acceptance criteria:**

- Footer is sticky and visible at all panel scroll positions.
- Next/Previous swaps panel data in place and syncs the selected card/row behind the panel.
- Counter shows position within the current filtered scope.
- First/last items disable the corresponding button.
- Works in both card view and list view overlays.

## Technical Details

- Render a sticky footer inside the panel (always visible, content scrolls under it): `Previous` button (left), `Source {index + 1} of {total}` counter (center), `Next source` button (right). Use the existing DS Button component (Neutral / Stroke / Small), icons `arrow_back_ios_new` / `arrow_forward_ios`.
- Navigation operates on the list as rendered at panel-open time — reason tab, source-type filter, and country/engine/date scope already applied. Index = position in that filtered, ranked order, not the global rank.
- On navigate: swap panel content to the adjacent source (no close/reopen), update the selected state on the corresponding card/row in the background, reset panel scroll to top, reset the article tab to Failing.
- Disable `Previous` on index 0 and `Next source` on the last index (disabled state from DS button, no wrap-around).
- Keyboard: bind ArrowLeft/ArrowRight to Previous/Next while the panel has focus; buttons must be reachable by Tab and announce disabled state (aria-disabled).
- Analytics: fire an event per navigation (`action_center.source_nav`, direction + source rank) so we can validate the triage-flow hypothesis.

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** None mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] Localisation (en-US, en-GB, fr-FR, es-ES) checked where UI copy changes

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-152
- Task Jira: https://onclusive.atlassian.net/browse/GEO-1166
