# GEO-1124: [Target Sources] 10.9 — Target Sources in the analysis export

**Story ID:** GEO-1124
**Issue Type:** Story
**Title:** [Target Sources] 10.9 — Target Sources in the analysis export
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-24
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1124

## User Story

**As** a PR professional,
**I want** the analysis export to carry the Target Sources list and its evidence,
**so that** the priorities I act on, and the pitch I send, stand up outside the product.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.9 of EPIC-010. Merges the former stories 1.9 and 1.10 (2026-09-14), updated with the PM's answers of 2026-09-16 and his decisions of 2026-09-17._ **_Design node ids refreshed 2026-09-17_** _after the section was rebuilt._

**State:** ✅ Ready — nothing is pending any more. Both blocking points of the canvas review were closed on 2026-09-17.

| Item | Status |
| --- | --- |
| Excel tab layout | ✅ **specified 2026-09-17** — one tab, four stacked tables, see AC4 |
| Positive articles in the export | ✅ **in, Excel only** — ⭐ _reverses the 2026-09-16 answer_ |
| Verifying state | ❌ **criterion deleted 2026-09-17** — the export carries none |
| Deck brief | ✅ **top three sources only** — the Excel tab keeps it for every source |
| Export design | ✅ delivered 2026-09-16, **rebuilt 2026-09-17** — PDF frames withdrawn, node ids changed |
| Period label | ✅ closed — the section carries none |
| Source window | ✅ the 7-day floor applies — AC8 |
| Legal review | ✅ recorded in the epic on 2026-09-15 |
| The verbatim-passage gate | ✅ satisfied — see below |

### Two questions this story carried, both closed

**The legal traceability gap is closed.** The epic now states it: _"2026-09-15: the legal review of fetching, storing and displaying third-party content is validated by the PM, export and public shared report links included."_

**The AC that the 1.9 / 1.10 merge appeared to drop was satisfied, not lost.** Changelog comment 840776 of 2026-08-31 set a gate: _"Verbatim extracted passages enter the export_ **_only after the legal review clears display and export of extracts, including the permissible length_**_."_ Both conditions are met — the review cleared display **and** export, and the permissible length is the **140-character** cap of story 1.2.

---

**As** a PR professional,
**I want** the analysis export to carry the Target Sources list and its evidence,
**so that** the priorities I act on, and the pitch I send, stand up outside the product.

> **The epic's framing:** _"The exported section reuses the rules of User Stories 1.3, 1.4, 1.6 and 1.7 for its content, its per-source fields, its briefs, its evidence and its ordering. The criteria below state only what the export does differently."_
> 
> This story is therefore **a delta, not a specification**.

### Functional ACs

_(copied verbatim from the epic)_

**AC1 — Always the "All" tab, whatever the user is looking at**

- Given: an analysis export in PowerPoint, PDF, or Excel
- When: it is generated
- Then: it carries a Target Sources section built from the **"All" tab**, with the total failing article count per source, **whatever tab and view the user stands on**

**AC2 — Recomputed inside the export scope**

- Given: the export scope (markets, AI engines, and date range)
- When: the section is built
- Then: the counts, the badges and the order are recomputed inside that scope under the rules of User Story 1.6

**AC3 — All categories and all source types, always**

- Given: the category and source type dimensions
- When: the section is built
- Then: all categories and all source types are always covered, and the on-screen category and source type filters have **no effect** on the section

**AC4 — Excel carries the full evidence of the panel, in four stacked tables** ⭐ _layout specified by the PM, 2026-09-17_

- Given: the Excel workbook
- When: it is generated
- Then: the Target Sources tab carries the full evidence of the panel of User Story 1.4: the ranked list, the brief, each failing article with its verdict and citing engines, **each positive article with its passage and citing engines**, and the failing prompts; the tab holds **four stacked tables**, in this order:

| Block | Columns, in order |
| --- | --- |
| Ranked sources | Rank, Domain, Source type, Badges, Failing articles, Brand absent, Depicted negatively, Positive articles, Citations in qualifying answers, Brief |
| Failing articles | Domain, Source rank, Article title, URL, Verdict, Passage, Citing engines |
| Positive articles | Domain, Source rank, Article title, URL, Passage, Citing engines |
| Failing prompts | Domain, Source rank, Question, Engine, Country |

- The sheet header follows the house style of `buildOverviewSheet`: **one title line**, `{entity} - {sheet}  ({markets} · {engines} · snapshot {date})`. No key/value block, and the all-categories / all-source-types coverage of AC3 is **not printed** — covering everything is the default, not a statement the file has to make, and no other sheet announces it either
- The **Passage** cell is empty for a brand-absent article: the Verdict cell already carries _"No mention of {brand} anywhere on this page"_
- Block 3 carries **no Verdict column** and block 4 carries **no Outcome column** — see GEO-1123
- The two article blocks **stay separate**, and that is a correctness rule rather than a layout preference: AC14 of story 1.4 says positive articles never enter a count, and a single merged table invites a reader to total every row and **be wrong by the positive count**
- A sample workbook is attached to this story as `target-sources-excel-sample.xlsx`, carrying the populated tab and the all-clear state

_The epic described three levels, source → article → prompt. The PM corrected that on 2026-09-17:_ "It is not. A source has **two sibling lists**, failing articles and failing prompts, **of different lengths**. That is why one flat table cannot hold both."

**AC5 — PowerPoint carries the brief for the top three sources only** ⭐ _capped by the PM, 2026-09-17_

- Given: the PowerPoint deck
- When: it is generated
- Then: it carries the brief for the **top three sources** and the failing article count for every other displayed source, and when the sources exceed what a slide holds, the top sources are shown and the full totals are stated, following the capping convention of the other slides
- _This cap applies to the deck alone._ The Excel tab keeps the brief for **every** source under AC4, so the split for ranks 4 to 10 stays readable there

**~~AC6 — Verifying state~~** ❌ **deleted by the PM, 2026-09-17 — do not implement**

- The export keeps the snapshot resolution of today and carries **no verifying state**. The decision rests on production evidence gathered before it was taken: `Snapshot` has no status column, `ReportStatus` sits on `Report`, there is no `findLatestCompleted` anywhere, `OverviewQueryHelper.getLatestSnapshot()` is a plain `ORDER BY created_at DESC LIMIT 1`, `ReportProcessingService.processReport()` writes the snapshot row **before** the first LLM call, and `ExportMenu.tsx` does not disable the button while a report is `PROCESSING`

**AC7 — All-clear state**

- Given: no source survives verification in the exported scope
- When: the section is built
- Then: it carries the all-clear message alone

**AC8 — The 7-day source window applies to the export** ⭐ _added by the PM, 2026-09-16_

- Given: the export scope
- When: the Target Sources section is built
- Then: the source window rule of User Story 1.6 applies unchanged: **at least 7 days**, the full range when it is longer, and every available day on a report younger than 7 days
- _Scoped to this section only: "the AI Citation Sources section of the export keeps the export scope unchanged."_

### ⚠️ Three accepted consequences — do not file them as defects

The PM took each of these with the evidence in view and asked explicitly that they not be reopened as bugs.

1. **An export started while verification runs can carry the all-clear message**, because production has no completed-snapshot concept. The underlying race affects **every** export section, not only this one, and deserves its own ticket.
2. **The screen and the file disagree while verification runs.** Story 1.5 keeps its on-screen _"verifying sources"_ state; the export has no equivalent. The screen refuses to show a partial list, the file shows one.
3. **No export surface states the scope of this section.** A three-day export can show sources drawn from the seven-day floor of AC8 **with no indication**, and the _"all source types"_ constant of AC3 is stated nowhere on the deck. The Excel sheet header is the only surface that carries the markets, the engines and the snapshot.

### Removed by the PM — do not implement

The funnel counters criterion was removed on 2026-09-01; the exported section carries no funnel counters. ⭐ _And since 2026-09-17 it carries no verifying state either — see the struck-through AC6._

---

## Design ACs

✅ **The frames landed on 2026-09-16 and the section was rebuilt on 2026-09-17**, Figma section **Export** (`14147:14889`).

⚠️ **The node ids changed.** The designer did not edit the frames, he **replaced the section**: the seven frames of 2026-09-16 are gone and three new ones stand in their place. Every id this ticket used to carry is dead. The section id itself survived.

| Frame | Node |  |
| --- | --- | --- |
| PPT/PDF · List slide · Template | `14430:82210` | ⭐ _was_ `14150:14889` |
| PPT/PDF · List slide · Example (Toyota) | `14430:82112` | ⭐ _was_ `14147:14890` |
| PPT/PDF · Corner · All clear | `14430:82200` | ⭐ _was_ `14149:14889` |
| ~~PDF · Page template, Example, All clear, Long table overflow~~ | `14153:14889` `14151:14889` `14154:14889` `14154:14935` | ❌ **deleted** |

✅ **The frames are now named** `PPT/PDF`, which records in the file itself that the PDF is the PowerPoint slide in landscape rather than a layout of its own.

**DAC1 — The slide (**`14430:82112`) — title _"Where PR effort pays first"_, subtitle _"Top {n} of {N} verified target sources · every claim checked against the page itself"_. Three top cards carrying rank, favicon, domain, action badges and the brief; then a table for ranks 4 to 10 with `#` · `Source` · `Type` · `Action` · `Failing articles` · `Cited`.

⚠️ _One change to confirm with the designer: the footer lost its totals line (_"The {n} sources shown hold {a} of the {b} failing articles"_). The cap of AC5 is still stated by the subtitle,_ "Top 10 of 11"_, so the criterion holds — but the article coverage is now stated nowhere. Probably deliberate; worth a word._

**DAC2 — All-clear (**`14430:82200`) — checkmark, _"All clear, no verified source problems"_, the message alone with no list under it. Matches AC7 and story 1.7.

**DAC3 — The PDF is the PowerPoint slide in landscape.** ⭐ _2026-09-17._ There is no separate PDF layout: `PdfExportService` produces the PDF by flattening the deck (story 26.2 / GEO-723) — one slide, one page, at the deck's own geometry, **960 × 540 landscape**. The four Figma frames were A4 portrait, 794 × 1123, so nothing could have rendered them; implementing them would have meant writing a second renderer. The footer and the variable slots went with them.

### Every finding of the canvas review is closed

| Finding of 2026-09-16 | Resolution of 2026-09-17 |
| --- | --- |
| **1.** The Excel tab of AC4 is drawn nowhere | ✅ **specified** — four stacked tables, sample workbook attached |
| **2.** The verifying state of AC6 is drawn in no format | ✅ **the criterion is deleted** |
| **3.** The four PDF frames cannot be rendered as drawn | ✅ **the frames are deleted from the file** |
| **4.** The PDF footnote invents an excluded-domains requirement | ✅ **void with the frames** — the footer went with them |
| **5.** AC5's split is honoured for the top 3 only | ✅ **that is now the rule** |
| **6.** The header slots contradict AC3 | ✅ **the slots are gone** — no scope line, no period label |

⚠️ _On finding 4, one nuance worth writing down: the excluded-domains note disappears_ **_by consequence, not by an explicit decision_** _— it went with the PDF footer. The effect is right, since story 1.2 makes such a source vanish silently and nothing ever required naming it, but nobody decided it in so many words. Recorded so it is not re-raised later as a lost requirement._

---

The **Technical Part** and the technical ACs live in the repository spec — dev context, not read by QA. One point worth knowing outside it: **the effective window of AC8 is resolved in the export scope validator**, alongside the anchor snapshot and the range snapshot list, and must produce the **same value** as the on-screen computation of story 1.6. Two implementations of the 7-day floor would be invisible until a client compares a screen to a deck.

📋 Spec complète : [10-9-target-sources-in-export.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-9-target-sources-in-export.md)
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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1124
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-9-target-sources-in-export.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
