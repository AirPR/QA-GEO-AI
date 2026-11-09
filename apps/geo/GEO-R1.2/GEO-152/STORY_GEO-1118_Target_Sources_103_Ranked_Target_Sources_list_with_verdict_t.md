# GEO-1118: [Target Sources] 10.3 — Ranked Target Sources list with verdict tabs

**Story ID:** GEO-1118
**Issue Type:** Story
**Title:** [Target Sources] 10.3 — Ranked Target Sources list with verdict tabs
**Status:** [QA IN PROGRESS] QA In Progress
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-25
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1118

## User Story

**As** a PR professional,
**I want** a ranked list of the verified sources most worth influencing,
**so that** I know where to start without interpreting analytics.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.3 of EPIC-010. Written by the team from the PM's 2026-09-14 epic rewrite, updated with his answers of 2026-09-16 and the design delivery of 2026-09-16 confirmed on 2026-09-17._

**State:** ✅ Ready — AC2 corrected by the PM, the three design observations answered and the frames delivered.

---

**As** a PR professional,
**I want** a ranked list of the verified sources most worth influencing,
**so that** I know where to start without interpreting analytics.

### Functional ACs

_(copied verbatim from the epic)_

**AC1 — Order and tie-break**

- Given: verified sources with failing articles
- When: the Actions Center is opened
- Then: a list titled "Target Sources" shows the sources ordered by failing article count, with ties broken first by number of reason badges and then by citations in qualifying answers

**AC2 — Source type filter** ⭐ _corrected by the PM, 2026-09-16 — the earlier wording was wrong_

- Given: the target list
- When: the user is on the Actions Center
- Then: a source type filter is available beside the tabs, and it offers **only the source types present in the current scope, each with its source count**, preceded by an **"All source types"** entry which is the default — **exactly as AI Citation Sources does today**

**AC3 — Two views, one fixed order**

- Given: the target list
- When: the user is on the Actions Center
- Then: a card view and a table view are both available, switchable by an explicit control, and both show the sources in the same fixed order with no user-triggered re-sorting

**AC4 — What a card shows**

- Given: a target source card
- When: it is displayed
- Then: it shows the rank, the source name with its icon, the source type, the applicable reason badges among "Improve visibility" and "Improve perception", the failing article count, and the citation count in qualifying answers

**AC5 — Where the badges come from** ⭐ _the epistemic rule of the whole epic_

- Given: a target source
- When: its reason badges are computed
- Then: they come from the **persisted verdicts of its failing articles only**: "Improve visibility" when at least one failing article does not name the brand family, and "Improve perception" when at least one failing article names the brand family negatively; a source carrying both verdicts shows both badges, and **no badge is derived from the outcome of an answer**

**AC6 — Three verdict tabs**

- Given: the target list
- When: the Actions Center is opened
- Then: three tabs scope the list: "All", "Improve visibility", and "Improve perception", and "All" is the tab selected by default

**AC7 — The "All" tab**

- Given: the "All" tab
- When: the list renders
- Then: each source shows its total failing article count across both verdicts, and the order follows the rules of AC1

**AC8 — A verdict tab ranks on that verdict alone**

- Given: the "Improve visibility" or the "Improve perception" tab
- When: the list renders
- Then: each source shows the failing article count of that verdict alone, and the sources are ordered by that count, with ties broken by citations in qualifying answers

**AC9 — Tab membership**

- Given: a source with no failing article of the selected verdict
- When: the "Improve visibility" or the "Improve perception" tab renders
- Then: that source does not appear in the tab

**AC10 — Badges do not change per tab**

- Given: a verdict tab
- When: it renders
- Then: the badges of a listed source stay the same as in the "All" tab

**AC11 — Empty tab**

- Given: a tab holding no source
- When: it renders
- Then: it states that no source carries that verdict in the current scope, and the other tabs stay reachable

**AC12 — Logo and neutral placeholder**

- Given: a target source
- When: it is displayed in the card view, in the table view, or in the explanation panel
- Then: the domain logo is shown next to the source name, retrieved the same way as in AI Citation Sources, and a neutral placeholder is shown when no logo is returned

**AC13 — Top ten, then an explicit control**

- Given: more than ten qualifying sources
- When: the list renders
- Then: the top ten are visible and the remainder are revealed by an explicit control

⚠️ **One rule of story 1.6 lands on this list:** after a filter, the **displayed ranks are renumbered 1…N with no gaps** — _"the rank is a position, not a stable identifier"_ (PM, 2026-09-17). See GEO-1120 AC1.

### Removed by the PM — do not implement

The funnel-counts summary strip was removed on 2026-09-01. The funnel is unchanged; only its on-screen display is gone.

---

## Design ACs

Figma: canvas **Action Center** (`5767:49637`), section `13719:92628`. Frames reviewed 2026-09-14, **re-reviewed frame by frame on 2026-09-16**.

**DAC1 — Card view, "All" tab (**`13746:123270`) — page title "Target Sources" + subtitle _"The sources to influence to improve how AI engines see your brand, ranked by verified articles where {brand} is missing or depicted negatively."_ Card view / List view toggle top-right. Tab strip `ALL` · `IMPROVE VISIBILITY` · `IMPROVE PERCEPTION`, each verdict tab carrying its icon, `ALL` underlined as default (AC6). Source type dropdown "All source types" on the right of the tab strip (AC2). Cards in a 3-column grid, each: rank, circular logo slot, badge top-right, domain in bold, source type chip, `N failing article(s)`, `Cited N× in gap answers` (AC4). "Show N more source(s)" button below the grid (AC13).

**DAC2 — List view (**`13746:121687`) — the table projection of AC3, same order, same fields.

**DAC3 — Verdict tabs (**`13746:120262`, `13746:120339`) — the list scoped to one verdict (AC8/AC9). ⚠️ Both frames are **named after the old badge vocabulary** ("Filter · Not visible", "Filter · Unfavorable"); their **content uses the current one**. ⭐ _The rename was requested on 2026-09-16 and_ **_withdrawn on 2026-09-17 as cosmetic_**_: a layer name is read neither by the product nor by the QA. Nothing to do._

**DAC4 — Empty verdict tab (**`13746:120414`, `13746:120488`) — the "clean slate" state of AC11, with the other tabs still reachable.

**DAC5 — Source type filter open (**`13862:446929`) — the dropdown of AC2.

**DAC6 — Long source type names crop, the list does not** ⭐ _added by the designer, seen 2026-09-15_ — annotation `13969:25773` + example `13970:14902`, verbatim:

> _"Corner case: the list grows to fit the widest type name. The input stays at 200px and crops a long selection with an ellipsis; the full name shows in a tooltip on hover."_

Three separate rules, all testable: the **dropdown** widens to the widest option; the **input** is fixed at 200 px and truncates the selected label with an ellipsis (`Aggregator/Enc…`); the untruncated name is available **on hover**. "Aggregator/Encyclopedic" is the name that forced the decision — a real source type, so this fires on ordinary data.

**DAC7 — Two badges, two layouts, and that is deliberate** ⭐ _confirmed by the PM, 2026-09-17_

A source carrying both verdicts shows both badges, and the design places them **differently depending on the surface**: **stacked** on the list card (`14288:16725`, rank 4 `motortrend.com`), **inline** in the details panel header (`13746:123851`) and in the export (`14147:14906`). The card is 298 px wide and cannot hold them side by side next to the rank and the logo.

**Follow the design surface by surface — do not harmonise the component.** The PM: _"C'est voulu, ne pas harmoniser le composant."_ This **supersedes** his interim instruction of 2026-09-16 (_"until it lands, second badge beside the first"_), which was explicitly provisional; the frame has landed.

**Components** — `11430:310903` / `11596:12488` **Target Source Card**, variants `State=Default` and `State=Selected` (the selected state is what story 1.4 opens).

✅ **Stale components — deleted from the file**, verified on the canvas 2026-09-16: `11432:447` **Funnel Summary Strip** (removed by the PM on 2026-09-01) and the **Healthy Source Row** of story 1.7. Neither is still present.

### The three design observations — answered by the PM, 2026-09-16

1. **Vocabulary: "gap answers" wins.** The UI copy beats the epic wording. _"Cited 12× in gap answers"_ is what ships. `qualifying answers` remains the **internal** name of the rule, in code and specs — never on screen.
2. **Two badges** — ✅ _the frame landed and overrides the interim rule. See DAC7._
3. **The logo needs both states drawn** — ✅ _delivered_. Resolved logos are drawn alongside the generic placeholder of AC12 (`caranddriver.com` and `reddit.com` carry real favicons on the delivered frames).

---

The **Technical Part** and the technical ACs live in the repository spec — they are dev context and are not read by QA.

📋 Spec complète : [10-3-ranked-target-sources-list.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-3-ranked-target-sources-list.md)
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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1118
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-3-ranked-target-sources-list.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
