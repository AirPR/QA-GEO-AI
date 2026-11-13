# GEO-1572: STORY-53.9: Open the question panel as a drawer in both shells

**Story ID:** GEO-1572
**Issue Type:** Story
**Title:** STORY-53.9: Open the question panel as a drawer in both shells
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1572

## User Story

> As a GEO user, I want the question panel to open as a full-height drawer when I click a question, in GEO and inside Onclusive Social, so that a long answer has room to be read.

- **As** a GEO user
- **I want** the question panel to open as a full-height drawer when I click a question, in GEO and inside Onclusive Social
- **So that** a long answer has room to be read.

## Acceptance Criteria

_6 functional ACs + 16 technical / design ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, section "Host Shells")

The epic states this section as rules, not as a user story: the criteria below restate them in Given / When / Then form without changing their content.

- Given the questions table of a category view, When I click a row, Then the question panel opens as a full-height drawer over the page and over the host top bar, as drawn in GEO-1017 (frame 09, and the Unified Platform frame of the second round), instead of opening inline next to the table, which shrinks to make room today
- Given a category view, When it opens, Then no question opens by itself any more (the first-question auto-open of GEO-315 and GEO-345 is removed): the panel opens only when the user clicks a row
- Given the Unified Platform standalone shell (Onclusive Social native mode off), When the drawer opens, Then it renders the same as inside Onclusive Social, with the GEO sidebar, GEO top bar, organisation control and user menu mounted, and it behaves like the target sources drawer too (native dialog, focus trap, arrow keys to the previous or next question) — same as the next criterion (PM, 2026-10-30, answer on GEO-1498: "focus trap and arrow keys in both shells, it is the same drawer as Target Sources so it should behave the same way")
- Given the Onclusive Social shell (Onclusive Social native mode on), When the drawer opens, Then only the Onclusive Social top bar is mounted (no GEO sidebar, no GEO top bar), and the drawer and the citation mini card follow the Onclusive Social frame of GEO-1017 and behave like the target sources drawer (native dialog, focus trap, arrow keys to the previous or next question)
- Given either shell, When the drawer opens, Then it is 470px wide
- Given either shell, When the drawer opens, Then the sticky panel header (story 1.2) sits at the top of the drawer, which covers the host top bar, as in frame 09

Nothing in this story needs the settings entry or the organisation control.

### Technical Acceptance Criteria

**TAC1 — One mechanism**

- Given the Target Sources drawer, the question drawer (and `VersionHistoryDrawer` if T3 is in scope)
- When the code is read
- Then `showModal()`, the backdrop listener, the `onCancel` handling and the focus return of these drawers exist in one place (the T1 primitive); `grep -rn "\.showModal(" frontend/src --include="*.tsx" --exclude="*.test.tsx"` (calls only, not the comments that name `showModal()`) finds it only there, plus `VersionHistoryDrawer` if T3 is out of scope and `SearchableModal` if T7 opens it with `showModal()`

**TAC2 — Target Sources unchanged**

- Given the T1 refactor
- When the frontend tests run
- Then `TargetSourceDetailPanel.test.tsx` and `TargetSourcesSection.test.tsx` pass without any change to their assertions

**TAC3 — No auto-open**

- Given a category with questions of every type
- When `QuestionsTable` renders, then the category changes, then the type tab changes
- Then no dialog is in the document at any point; after a row is opened, new `data` without that question removes the dialog and opens no other question, and `data` that brings the question back does not reopen it

**TAC4 — Drawer opens and closes**

- Given the table
- When a row is clicked
- Then a `<dialog>` opened with `showModal()` (`open`, `:modal` in the browser) is rendered with the question text as accessible name and class `w-[470px]`; Escape, the close button and a click on the dialog element itself (backdrop) remove it; focus returns to that row

**TAC5 — Previous / next**

- Given a filtered table of 3 rows and the drawer open on the second
- When ArrowRight, then ArrowRight, then ArrowLeft are pressed on the dialog, and ArrowRight is pressed with the focus on an engine pill
- Then the drawer shows rows 3, 3 (last: no change), 2; the pill case changes the selected engine (tab list) and not the question; the dialog element is the same DOM node throughout (not remounted); after each question change its scroll container is back at `scrollTop = 0` and the first engine is selected, even if another engine was selected on the previous question

**TAC6 — Tooltips and « All sources » above the drawer**

- Given the drawer open on a Visibility question with sources
- When a pill tooltip is shown, « All sources » is opened, ArrowLeft / ArrowRight are typed in its search field, then Escape is pressed in it
- Then the tooltip content and the sources modal are rendered inside the top layer stack above the drawer (inside the dialog subtree or in a modal dialog opened after it); the arrows move the caret and the question does not change; Escape closes only the sources modal, the drawer stays open with the same question. The Escape part is checked in the browser (Chromium and Firefox) on staging: the jsdom polyfill does not model the browser's Escape handling of modal dialogs

**TAC7 — Both shells**

- Given `useIsOnclusiveSocialNativeMode` true, then false
- When the drawer opens on the category view
- Then the same drawer markup is rendered; `AppLayout` renders `OnclusiveSocialTopbar` only (true) or `MainSidebar` + `AppTopbar` (false), as today. Checked in the browser on staging: the drawer covers the Onclusive Social top bar (z-1200) and the GEO top bar

**TAC8 — Engine tab list**

- Given a Competitive question with 3 engines, then a Perception question with 3 engines
- When the panel renders
- Then in both, the pills are in a `role="tablist"`, each `role="tab"` with `aria-selected` true on exactly one; ArrowRight on the selected pill selects the next one

## Technical Details

### Scope note

Display only, no dependency on GEO-678: can start first. STORY-53.2 (sticky header) builds on it. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display", frame 09 and the Unified Platform / Onclusive Social frames of the second round).

## Dependencies

- **Blocks:** GEO-1565, GEO-1564, GEO-1567
- **Blocked by:** none in Jira links
- **relates to:** GEO-1603 (Bug, Done) — [GEO-Category] Prompt detail panel: closing the drawer by clicking the backdrop leaves the focus on the page body
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1572
- External Spec: [53-9-open-the-question-panel-as-a-drawer-in-both-shells.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-9-open-the-question-panel-as-a-drawer-in-both-shells.md)
