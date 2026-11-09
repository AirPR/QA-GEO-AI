# GEO-1121: [Target Sources] 10.7 — Empty state with PR value

**Story ID:** GEO-1121
**Issue Type:** Story
**Title:** [Target Sources] 10.7 — Empty state with PR value
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-24
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1121

## User Story

**As** a user whose brand shows no verified source problems,
**I want** the Actions Center to remain useful,
**so that** a clean result reads as an achievement rather than an empty page.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.7 of EPIC-010. Written by the team from the PM's 2026-09-14 epic rewrite, realigned on 2026-09-16._

**State:** ✅ Ready. The PM left no comment on this story, and its two ACs match the epic's User Story 1.7 word for word — nothing diverges.

---

**As** a user whose brand shows no verified source problems,
**I want** the Actions Center to remain useful,
**so that** a clean result reads as an achievement rather than an empty page.

### Functional ACs

_(copied verbatim from the epic)_

**AC1 — All-clear instead of an empty list**

- Given: no source survives the verification funnel
- When: the Actions Center is opened
- Then: an all-clear message is shown instead of an empty list

**AC2 — The message alone** ⭐ _replaces the healthy-sources list, removed by the PM on 2026-09-14_

- Given: the all-clear state
- When: it renders
- Then: it carries the all-clear message alone, and no source list is shown under it

---

## Design ACs

**DAC1 — All-clear (**`13746:124635`) — a single bordered green panel, centred check icon, title _"All clear, no verified source problems"_, and one line: _"Every article that AI engines cite in your scope either covers {brand} accurately or positively. No source needs corrective outreach right now."_ **No source list under it.** Figma: canvas **Action Center**, section `13719:92628`.

✅ **The stale component is gone.** `11463:1956` **Healthy Source Row**, built for the removed "relationships to maintain" list, **was deleted from the file** — verified on the canvas 2026-09-16.

---

### ⚠️ The same message now appears in a second situation — 2026-09-17

The PM deleted the verifying state from the **export** (GEO-1124, AC6), on production evidence that there is no completed-snapshot concept. The accepted consequence lands here: **a file exported while verification runs can render this all-clear message** even though the report is not clean.

On screen nothing changes — story 1.5 keeps its "verifying sources" state and never shows a partial list. **The screen and the file therefore disagree while verification runs**, deliberately. The PM asked that it not be filed as a defect; it is recorded on GEO-1119 and GEO-1124 as well.

### Closed by measurement — 2026-09-15, and reinforced by AC9 of story 1.6

An earlier reading raised a _"zero sources"_ case: a report with no source at all would reach AC1 by the same path as a genuinely healthy one, and the all-clear message would then claim something untrue in the export and in public shared links.

**Measured on 2026-09-15 and it does not occur.** Across every active report, joining each report's latest snapshot to `response_sources`, no report comes back with zero sources. **No** `NO_SOURCES` state is specified, and none is to be built — AC1 and AC2 are the whole story.

The measurement predates the 7-day window of story 1.6 but is not invalidated by it — the opposite. It was taken on each report's **latest snapshot**; the window pools up to seven of them, so a report can only gain sources, never lose them. The case is rarer under AC9 than when it was measured.

### Realigned on AC9 of story 1.6 — 2026-09-16

The 7-day floor made three passages of this story false. They are corrected in the spec:

- **The active scope now includes the effective window.** An all-clear computed on the selected range while the list is computed on the effective one would show "all clear" above a populated list.
- **The log line can no longer carry a single** `snapshotId` — the window pools several, so its boundaries and the snapshot count replace it.
- **The zero-source measurement holds** **_a fortiori_** (above), rather than being stale.

---

The **Technical Part** and the technical ACs live in the repository spec — they are dev context and are not read by QA. They cover the three-state view, the `totalSources` counter that keeps the two conditions distinguishable in the logs, and the scope handling above.

📋 Spec complète : [10-7-empty-state-with-pr-value.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-7-empty-state-with-pr-value.md)
📄 Epic README : [README.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md)
🔀 PR : https://github.com/AirPR/geo-analytics/pull/549

## Technical Details

_No dedicated Technical Details / Implementation Notes section in the Jira description (see the repository spec link below if present)._

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1121
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-7-empty-state-with-pr-value.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
