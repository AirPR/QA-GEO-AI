# GEO-1125: [Citation Sources] 10.10 — Remove the Favorability column from AI Citation Sources

**Story ID:** GEO-1125
**Issue Type:** Story
**Title:** [Citation Sources] 10.10 — Remove the Favorability column from AI Citation Sources
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-24
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1125

## User Story

**As** a user reading AI Citation Sources,
**I want** the Favorability label gone,
**so that** the monitoring view states what it can measure and stops asserting a judgement it has not verified.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Now_ **_User Story 1.10_** _of EPIC-010. Written by the team from the epic body on 2026-09-15; the PM added it to the epic description as a story on 2026-09-16 and answered its open question._

**State:** ✅ Ready — no open question, and the last verification he asked for was done on 2026-09-17.

**The open question is closed: the Lite (PQL) result table IS in scope.**

> _"It is the same unverified label on the surface a prospect sees first, so the epic rationale applies to it word for word. Update AC6 and the scope guard table accordingly: the Lite table moves from 'keep' to 'remove'."_

The PM also confirmed the four other points: the XLSX table and the PPTX slide are in scope, the removal is a **full removal rather than a hide**, the five other favourability surfaces are untouched, and the 7-day source window of story 1.6 does not reach the Lite result (_"a lite analysis holds no history, so there is nothing to pool"_).

---

**As** a user reading AI Citation Sources,
**I want** the Favorability label gone,
**so that** the monitoring view states what it can measure and stops asserting a judgement it has not verified.

### Functional ACs

_(copied verbatim from the epic, User Story 1.10)_

**AC1 — The section and the modal carry three columns**

- Given: the AI Citation Sources section and the "All domains" modal
- When: either renders
- Then: it carries **Domain, Type and Frequency only**, and no Favorability column

**AC2 — Favorability is not a sort key**

- Given: either table
- When: the sortable headers render
- Then: Favorability is **not offered** as a sort key

**AC3 — No favorability badge anywhere on the surface**

- Given: the section, the modal, or the source details panel
- When: any of them renders
- Then: no favorable, mixed or unfavorable badge is shown for a domain

**AC4 — The exports drop it too**

- Given: the XLSX workbook and the PowerPoint deck
- When: the AI Citation Sources section is generated
- Then: the domain table carries **Domain, Type and Frequency only**

**AC5 — The Lite (PQL) result table too** ⭐ _added by the PM, 2026-09-16 — what the open question resolved to_

- Given: the Lite (PQL) result table
- When: it renders
- Then: it carries **no Favorability column either**

**AC6 — Removed, not hidden** ⭐ _promoted from a technical decision to a functional criterion_

- Given: the removal
- When: it is implemented
- Then: the **backend computation is removed with the column**, not hidden

**AC7 — Everything else is untouched**

- Given: the Questions Analysis favourability filter, the question detail panel, the Corporate Reputation sheet and the Raw Data sheet
- When: this story ships
- Then: they are unchanged: the removal covers the **source-level label only**
- ⚠️ _Note what is no longer on this list: the Lite result table used to sit here as a protected surface while the scope question was open. It moved to AC5. A reader working from an older copy would test the opposite of the decision._

---

## Design ACs

Figma: canvas **AI Citation Sources** (`11725:93655`). Reviewed 2026-09-15, **re-verified frame by frame 2026-09-16**.

**DAC1 — The card (**`11725:94037`) — title _"LLM Engines Citation Sources"_, subtitle, source type filter top-right, stacked bar + legend, then the table with exactly `Domain ⇅` · `Type ⇅` · `Frequency ⇅`, and the `All domains (522)` button underneath. **No fourth column.** ✅ _verified_

**DAC2 — The All Domains modal (**`11725:94227`) — header + domain count, a search field, then the same three columns. **No Favorability.** ✅ _verified_

**DAC3 — The two legend-hover frames (**`11725:93656`, `11725:93846`) — unchanged by this story, same three-column table behind them.

_No frame covers the Lite (PQL) result page — AC5 applies to it regardless; the removal of a column needs no design._

---

### ✅ What the Lite column actually renders — answered, as the PM asked

> _"Check what that column actually renders before removing it, and tell me if it turns out to be computing something else."_

**No, it is not computing something else: it computes nothing.** `LiteResultsSection.tsx` renders the cell as a blurred grey pill — `pointer-events-none`, `aria-hidden`, no value bound. It is an **upsell teaser**, not a label, which is why `LiteAnalysisService`'s Javadoc (_"NO perception aggregation and NO sentiment or favorability scoring"_) never contradicted it: the Javadoc described it exactly.

**This strengthens the removal rather than weakening it.** Nothing unverified is asserted to the prospect, because nothing is readable. But the column **advertises a feature this epic deletes**: a prospect sees a blur promising a Favorability that will not exist once AC1 to AC4 ship.

**Three consequences for the work, all in our favour:**

1. **No backend computation to remove on the Lite path.** AC6 has no Lite component — the removal there is purely front-end.
2. **✅ No sort is wired on that table either** — _established 2026-09-17, it used to be listed here as unverified._ The four headers each render a sort icon, but it is a plain SVG and **none of the** `<th>` **carries an onClick**. The icons are decorative on all four columns, so **AC2 has no Lite component**: there is no sort key to remove.
3. **It touches two tables, not one.** The real table and the gated **ghost rows** beneath it are both `table-fixed` and share a 5-entry `colgroup`; the source comment states the invariant outright — _"table-fixed with matching colgroup guarantees column alignment"_. Dropping the column from one and not the other **silently misaligns every row**, and no unit test catches it.

---

The **Technical Part** and the technical ACs live in the repository spec — they are dev context and are not read by QA. It carries the scope-guard table naming the five surfaces that must not change, the API contract change on the domain DTO, and the i18n keys to remove in the four locales.

📋 Spec complète : [10-10-remove-favorability-from-citation-sources.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-10-remove-favorability-from-citation-sources.md)
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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1125
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-10-remove-favorability-from-citation-sources.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
