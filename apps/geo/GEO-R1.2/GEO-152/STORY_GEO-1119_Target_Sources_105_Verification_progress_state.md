# GEO-1119: [Target Sources] 10.5 — Verification progress state

**Story ID:** GEO-1119
**Issue Type:** Story
**Title:** [Target Sources] 10.5 — Verification progress state
**Status:** [QA IN PROGRESS] QA In Progress
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-25
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1119

## User Story

**As** a user opening the Actions Center before verification has finished,
**I want** a clear in-progress state,
**so that** I never mistake an incomplete list for the final one.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.5 of EPIC-010. Accepted as written by the PM on 2026-09-16. Its one dependency was_ **_measured on 2026-09-16_**_, and the export lost its equivalent criterion on 2026-09-17._

**State:** ✅ Ready — accepted as written, no AC contested.

---

**As** a user opening the Actions Center before verification has finished,
**I want** a clear in-progress state,
**so that** I never mistake an incomplete list for the final one.

### Functional ACs

_(copied verbatim from the epic)_

**AC1 — No partial list, ever**

- Given: an analysis whose article verification is still running
- When: the Actions Center is opened
- Then: the view shows a "verifying sources" state instead of a partial target list

**AC2 — Transition without a page reload**

- Given: verification completes
- When: the user is on the Actions Center
- Then: the target list becomes available without requiring a full page reload

### ⚠️ The screen and the export now disagree — and it is deliberate

⭐ _Recorded 2026-09-17._ This story keeps its on-screen state: **no partial list, ever**. On the same day the PM **deleted the equivalent criterion from the export** (GEO-1124, AC6), on production evidence — there is no notion of a completed snapshot to key it on.

**So while verification runs, the two surfaces contradict each other.** The screen refuses to show a partial list; a file exported at the same moment shows one, and when no source has been verified yet it renders the **all-clear message** of GEO-1124 AC7. The PM took that decision with the evidence in view and asked explicitly that it **not be filed as a defect**. It is written on both tickets so that neither is mistaken for a bug in the other.

### Removed by the PM — do not implement

The verifying state **no longer shows the funnel counts progressed so far** (removed 2026-09-01). It is a plain state.

---

## Design ACs

**DAC1 — Verifying state (**`13746:124411`) — the plain "verifying sources" state of AC1, shown instead of the list. No funnel counts, no partial list. Figma: canvas **Action Center**, section `13719:92628`.

---

### ✅ The one open dependency is measured — 2026-09-16

The PM asked for the duration this state is shown: _"Flag it to me once measured, because a long verifying state changes what we promise about the daily run."_

**Measured on 20 URLs drawn at random from the real suspect set of a production report, cache bypassed.** Per-page latency: **p50 3.5 s, mean 4.3 s, p90 8.4 s**.

But latency is not what drives the duration — **concurrency is**. At the tier the costing assumes, **the biggest report keeps a user waiting about four minutes**, and most reports are done in seconds. The env var of this story therefore no longer needs a conservative guess.

**Two caveats travel with the figure.** Only the free-tier row is measured; the higher tiers are linear projections from published concurrency limits and assume per-page latency does not degrade as concurrency rises — confirmable **only once a paid account exists**. And the distribution rests on **9 successful samples**: the order of magnitude is solid, the tail is not.

🔄 _The question also changed owner on 2026-09-16._ It used to target the Onclusive crawler and sat with that team. The acquisition chain now routes the whole volume through a **single external provider**, so the figure is ours to measure and no longer waits on anyone else.

**One rule stands regardless:** the PM validated the **mechanism**, not a value. The default stays a configurable parameter and, per CLAUDE.md, the dev agent _"MUST NOT assume values for configurable parameters"_ — ask before implementing.

---

The **Technical Part** and the technical ACs live in the repository spec — dev context, not read by QA. They cover the three-state view, the SSE transport for AC2, and the stalled-verification WARN.

📋 Spec complète : [10-5-verification-progress-state.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-5-verification-progress-state.md)
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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1119
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-5-verification-progress-state.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
