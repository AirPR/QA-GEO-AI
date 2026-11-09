# GEO-1126: [Citation Sources] 10.11 — Replace the citation-count signal with the list of questions a source was used in

**Story ID:** GEO-1126
**Issue Type:** Story
**Title:** [Citation Sources] 10.11 — Replace the citation-count signal with the list of questions a source was used in
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-24
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1126

## User Story

**As** a user inspecting a cited domain,
**I want** the prompts that cite it and the URLs it was cited on,
**so that** I see where a domain actually appears instead of reading an opaque count.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Now_ **_User Story 1.11_** _of EPIC-010. Written by the team from the epic body on 2026-09-15; the PM added it to the epic description as a story on 2026-09-16, with these acceptance criteria._

**State:** ✅ Ready — no open question. Every reading this story made was confirmed, one of them by changing the epic to match.

|  | Settled |
| --- | --- |
| **Wording** | **"Related Prompts"**, as drawn. _"The design wins … my 'Used in questions:' came from the GEO-158 comment of 2026-07-21, and the surrounding UI already says 'prompts', so the design is the more consistent word. You made the right call; it is now_ **_decided rather than inferred_**_."_ |
| **Perception rows** | **Questions, like the other two tabs** — with the consequence accepted in full, see below |
| **Scope** | The panel follows the dashboard scope exactly, date included. **The 7-day floor of story 1.6 does not apply here** (AC11) |
| `marketCode` defect | Raised as **GEO-1128**, blocking GEO-1123 |
| **The design's arithmetic** | Sample data, not a rule. AC9 is the rule |

### The Perception tab — the consequence, accepted with its reason

> _"A perception answer that surfaced three negative concepts reads_ **_1, not 3_**_, and_ **_the negative concept names leave AI Citation Sources entirely_**_. That is the intended movement: a concept is a judgement, and judgement belongs in the Actions Center, exactly like the favourability label of 1.10._ **_One rework, one reason._**_"_

That last sentence is the epic's thesis applied twice: story 1.10 removes an unverified favourability label from the monitoring view, and this story removes unverified concept names from it. Both judgements move to the Actions Center, where a page was actually read. A reviewer seeing a Perception count drop from 3 to 1 is looking at the intent, not a regression.

---

**As** a user inspecting a cited domain,
**I want** the prompts that cite it and the URLs it was cited on,
**so that** I see where a domain actually appears instead of reading an opaque count.

### Functional ACs

_(copied verbatim from the epic, User Story 1.11)_

**AC1 — Two sections, in order, and the count block is gone**

- Given: a domain is selected in AI Citation Sources
- When: the details panel opens
- Then: it shows **"Related Prompts" first and "Cited URLs" second**, and the per-engine citation-count block is gone

**AC2 — What the panel previews**

- Given: the Related Prompts section
- When: it renders
- Then: it lists the first prompts, each with its text and the icons of the AI engines that produced it, followed by an **"All related Prompts"** control carrying the total count

**AC3 — Cited URLs preview**

- Given: the Cited URLs section
- When: it renders
- Then: its heading carries the total count, it lists the first URLs with their title, their address and the citing engine icons, followed by an **"All Cited URLs"** control carrying the same total

**AC4 — The prompts modal**

- Given: the All related Prompts control
- When: it is activated
- Then: a modal opens headed **"All related Prompts - {domain}"** with the prompt count, a search field over prompt text, and the full list

**AC5 — The prompts modal is tabbed by question type**

- Given: the prompts modal
- When: it renders
- Then: four tabs scope the list — **All, Visibility, Competitive and Perception** — each carrying its own count, and All is selected by default

**AC6 — A prompt appears once, whatever its engines**

- Given: one prompt produced by several AI engines
- When: it is listed
- Then: it appears **once**, carrying every citing engine's icon
- ⚠️ _This holds on_ **_both_** _surfaces — the panel preview of AC2 and the modal of AC4. The API returns one row per (question × engine), so the grouping is a real transform rather than a rename; it is the only genuine transformation in this story._

**AC7 — The Perception tab lists questions, not concepts** ⭐ _confirmed by the PM with its consequence, 2026-09-16_

- Given: the Perception tab
- When: it renders
- Then: it lists **questions, not concepts**: one perception answer that surfaced several negative concepts produces **one row**, and the negative concept names **no longer appear in AI Citation Sources**

**AC8 — Search is additive to the tab, not a replacement**

- Given: a tab is selected and a search term entered
- When: the list renders
- Then: it shows the prompts of that tab matching the term

**AC9 — Counts agree**

- Given: the panel control, the modal header, and the sum of the tab counts
- When: they render for the same domain
- Then: they state the **same total**

**AC10 — Empty tab**

- Given: a tab holding no prompt
- When: it renders
- Then: it says so and the other tabs stay reachable

**AC11 — The panel respects the active scope, and the 7-day floor does not reach it** ⭐ _clause added by the PM, 2026-09-16_

- Given: the market, AI engine and date filters of the dashboard
- When: the panel opens
- Then: its prompts and URLs are those of the current scope; **the 7-day source window of User Story 1.6 does not apply here**
- ⚠️ _Consequence stated and accepted by the PM: on a range shorter than 7 days this panel and the Actions Center cover different periods and their source sets do not tie. "Expect the two views to disagree on a range shorter than 7 days, and_ **_do not reconcile them_**_."_

---

## Design ACs

Figma: canvas **AI Citation Sources** (`11725:93655`). Reviewed 2026-09-15, **re-reviewed frame by frame 2026-09-16**.

**DAC1 — Details panel (**`11725:125298`) — right-side overlay, header _"LLM Engines Citation Source Details"_ with a close ✕. **Related Prompts** section: cards carrying the prompt text and a row of engine icons, then the `All related Prompts` control. Below, **Cited URLs**: cards with a favicon, the title and the address.

**DAC2 — Panel scrolled (**`11725:95897`) — the bottom: the `Cited URLs (N)` heading carries the count (AC3), and the section ends with `All Cited URLs (N)`. ⚠️ _The count belongs on the heading in_ **_all three_** _panel frames; the two unscrolled ones render it bare._

**DAC3 — Prompts modal (**`11763:23353`) — centred modal, _"All related Prompts - {domain}"_ + the prompt count, the search field, the four tabs. **This is the frame we build on.**

⚠️ **A second variant sits at the same coordinates and must leave the file** — `11725:127097` draws the same modal **without tabs**, with a _"Search by keyword or LLM"_ field. Had it been the current one, AC5, AC8 and AC10 would have had no surface and AC7 no tab to live in. It is dead; hidden behind the other, it will cost the next reader the same question it cost this review.

**DAC4 — URLs modal (**`11725:96680`) — _"Cited URLs - {domain}"_ + the source count, a search field over title and address, rows with favicon, title, address and engine icons.

🚩 **One requirement the epic does not carry.** AC3 requires an _"All Cited URLs"_ control carrying the total, but **no criterion says what activating it opens**. The prompts side has its modal specified by AC4; the URLs side has a control that leads nowhere in the criteria. The design does specify it — this frame — so the requirement is real. Either the epic gains the criterion, or the control is specified as opening nothing, which the design contradicts.

⚠️ **The panel frame contradicts AC6.** `11725:125298` lists the same prompt **twice** with two different icon groups, while the modal of DAC3 groups it into one row. The rule is AC6 and it applies to both surfaces: **one row per prompt, carrying every engine icon.** The panel frame is what is wrong.

⚠️ **The numbers in the frames are sample data, not rules.** The tab counts add to 17 against a stated 12, and the **34** on the prompts control is the Cited URLs count reused. **AC9 is the rule** — and those numbers must not be reproduced as test fixtures either. Confirmed by the PM on 2026-09-16.

🧹 **File hygiene:** `11725:95113` and `11725:125298` are two pixel-identical copies of the details panel, and three frames are named _"Cited URLs Modal + Hover"_ although two of them draw the **prompts** modal — including `11763:23353`, which DAC3 above references as the prompts modal.

---

### Adjacent defect, now filed — GEO-1128

`DomainAccumulator.addSource` builds both prompt DTOs with `parentResponse.getMarketId()`, so `VisibilityGapDto.marketCode` and `CompetitiveLossDto.marketCode` hold a **UUID**, not `en-US`. **The field name lies.**

It does not block this story — no frame here shows a country. It blocks **story 1.4**, whose failing-prompt rows show a country flag per prompt. Filed at the PM's request as **GEO-1128**, linked as _blocks_ GEO-1123.

---

The **Technical Part** and the technical ACs live in the repository spec — they are dev context and are not read by QA. It covers the two fields to add to the perception DTO, the dedup key behind AC6, and the fact that grouping is a real transform rather than a rename.

📋 Spec complète : [10-11-citation-sources-related-prompts-panel.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-11-citation-sources-related-prompts-panel.md)
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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1126
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-11-citation-sources-related-prompts-panel.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
