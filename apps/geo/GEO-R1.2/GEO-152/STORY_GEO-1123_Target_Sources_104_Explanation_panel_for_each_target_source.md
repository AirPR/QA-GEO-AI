# GEO-1123: [Target Sources] 10.4 — Explanation panel for each target source

**Story ID:** GEO-1123
**Issue Type:** Story
**Title:** [Target Sources] 10.4 — Explanation panel for each target source
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-10-02
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1123

## User Story

**As** a PR professional,
**I want** to open a target source and see the full evidence in plain language,
**so that** I can build my pitch directly from what the pages say.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.4 of EPIC-010. Written from the PM's 2026-09-14 epic rewrite, updated with his answers of 2026-09-16 and his decisions of 2026-09-17._

**State:** ✅ Ready — the design contradiction is settled and two criteria were narrowed on 2026-09-17. AC15 is blocked on a defect, not on a decision: see GEO-1128.

---

**As** a PR professional,
**I want** to open a target source and see the full evidence in plain language,
**so that** I can build my pitch directly from what the pages say.

### Functional ACs

_(copied verbatim from the epic)_

**AC1 — Panel open and close**

- Given: the target sources list
- When: I select a card
- Then: a panel opens beside the list showing a plain-language brief, the failing articles, and the failing prompts, and selecting the same card again closes the panel

**AC2 — The panel ignores the active verdict tab** ⭐

- Given: a verdict tab is selected
- When: I open a card from that tab
- Then: the panel shows **every** failing article of the source across both verdicts, and the brief states the full split; **the card count and the brief count therefore differ** when the source carries both verdicts

**AC3 — The brief is one deterministic sentence** ⭐ _fourth template row added by the PM, 2026-09-16_

- Given: the brief
- When: it is generated
- Then: it is one deterministic sentence with no AI generation, built as a **failing part** plus a **positive part** that is added only when the source has positive articles and that **replaces the full stop**:

| Case | Sentence |
| --- | --- |
| Failing part, one verdict, brand absent | This source has {n} unfavorable articles where the brand is entirely absent. |
| Failing part, one verdict, negative depiction ⭐ | This source has {n} unfavorable articles where the brand is depicted negatively. |
| Failing part, both verdicts | This source has {n} unfavorable articles: {a} where the brand is entirely absent and {b} where the brand is depicted negatively. |
| Positive part | , and {p} articles that cover the brand positively. |

**AC4 — No zero counts**

- Given: a source with no positive article
- When: the brief is generated
- Then: the positive part is omitted and no zero count is stated

**AC5 — Singular forms**

- Given: any count in the sentence equals one
- When: the brief is generated
- Then: the noun of that count takes its singular form ("1 unfavorable article", "1 article that covers the brand positively")

**AC6 — In-Brief visual treatment**

- Given: the brief
- When: it is displayed
- Then: it uses the In-Brief visual treatment of the platform; the treatment governs the presentation only, and the text stays deterministic

**AC7 — Not-named articles show no passage** ⭐ _reversed_

- Given: a failing article where the brand is not named
- When: it is displayed
- Then: it carries an explicit "no mention of the brand anywhere on this page" indication, **and no passage from the page is shown**

**AC8 — The verbatim passage**

- Given: a failing article with a negative mention
- When: it is displayed
- Then: the extracted passage is shown verbatim with the brand name highlighted, and the passage never exceeds 140 characters including spaces

**AC9 — Citing engines per article**

- Given: each failing article
- When: it is displayed
- Then: the AI engines that cited it are shown alongside it

**AC10 — Two evidence tabs** ⭐

- Given: the panel of a source that has positive articles
- When: it opens
- Then: two tabs separate the evidence, "Failing articles" and "Positive articles", each carrying its own count, and "Failing articles" is the tab selected by default

**AC11 — What a positive article shows, and what it must not claim** ⭐ _narrowed by the PM, 2026-09-17_

- Given: the "Positive articles" tab
- When: it renders
- Then: each entry shows the article title, its address, **the passage that supports the verdict**, and the AI engines that cited it, and **no verdict label is shown**

⚠️ _The two labels the design drew —_ "Covers {brand} accurately and positively" _and_ "{brand} ranked #1 on this page" _— are removed because the data cannot produce them. The verdict store of story 1.2 holds a_ **_single value_** _for this case,_ `NAMED_NOT_NEGATIVE`_, which carries a passage and nothing else; its AC10 routes an_ **_ambiguous_** _depiction to neutral, so neutral and ambiguous articles sit in the same bucket and the tab cannot assert "positively" about its own contents;_ "accurately" _asserts factual accuracy, which the page check does not test and which the epic puts out of scope; and_ "ranked #1" _is a ranking position the check never stores._

**AC12 — No positive articles, no tab** ⭐

- Given: a source that has no positive article
- When: the panel opens
- Then: the "Positive articles" tab is not shown

**AC13 — Panel header counts** ⭐

- Given: the panel header
- When: it renders
- Then: it states the failing article count, the positive article count, and the citation count in qualifying answers

**AC14 — Positive articles change nothing outside the panel** ⭐

- Given: the positive articles of a source
- When: any count outside the panel is computed
- Then: they change nothing: the rank, the badges, the card counts, the table counts, and the tab membership stay built from failing articles alone

**AC15 — Failing prompts carry no outcome** ⭐ _narrowed by the PM, 2026-09-17 — supersedes the 2026-09-16 answer_

- Given: the failing prompts section
- When: it is displayed
- Then: each entry shows the question, the engine and the country, and **no outcome is shown**; the three outcome values (brand absent, competitor chosen, unfavorable) **still decide which prompts qualify as failing**, and they are rendered on no surface

⚠️ _This criterion moved twice, so read the history before correcting a frame. The design drew_ `Brand absent: Tesla #1`_. On 2026-09-16 the PM removed the winner and kept the outcome, so it became_ `Brand absent`_. On 2026-09-17 he removed the outcome as well:_ "The outcome is removed from the row entirely." _Anyone applying the intermediate state is applying a superseded answer._

🔴 _Still blocked by_ **_GEO-1128_**_, and removing the outcome does not unblock it: the country rests on_ `VisibilityGapDto.marketCode` _and_ `CompetitiveLossDto.marketCode`_, which carry a market UUID where they declare a market code._

---

## Design ACs

Figma: canvas **Action Center**, section `13719:92628`. Frames reviewed 2026-09-14, re-reviewed 2026-09-16.

**DAC1 — Panel over the card view (**`13746:123761`) — right-side overlay, ~470 px, with a close ✕. Header: `#1 · caranddriver.com`, source type chip, verdict badge, then the count line _"3 failing articles · 2 positive · cited 12× in gap answers"_ (AC13). Below: the brief block, then the evidence tabs, then _"Failing prompts on this source"_. The list behind stays visible with the opened card in its `State=Selected` variant.

**DAC2 — Panel over the list view (**`13746:122399`) — same panel, table behind.

**DAC3 — Evidence tabs (**`13746:123761`, `13861:13367`) — `FAILING ARTICLES (3)` / `POSITIVE ARTICLES (2)`, each with its own count, failing selected by default (AC10). Section heading _"What each page says about {brand}"_.

**DAC4 — Article rows (component** `11433:518`) — three variants:

- `Verdict=No mention` → _"No mention of {brand} anywhere on this page"_, **no passage** (AC7)
- `Verdict=Negative mention` → _"Describes {brand} negatively on this page"_ + the quoted passage in an indented italic block (AC8)
- `Verdict=Positive` → the positive-article row of AC11 — ⭐ _changed 2026-09-17:_ **_no verdict label_**_, only title, address, passage and citing engines_

Each row: title, URL underneath, verdict line, citing-engine icons right-aligned (AC9).

**DAC5 — Failing prompt rows (component** `11432:474`) — engine icon, truncated question, country flag. ⭐ _The coloured outcome is removed on 2026-09-17_ (AC15).

### What the design still carries and must not ship — 2026-09-17

The frames were reviewed again on 2026-09-16 and the canvas has not yet been corrected on these three points. They are **decided**, not open:

| The frame shows | What ships |
| --- | --- |
| _"2 articles omit Toyota, 1 describes it negatively"_ then _"Fixing these three articles would flip this source healthy…"_ | the AC3 template **verbatim**, and the recommendation sentence removed — **two corrections, not one** |
| `Brand absent: Tesla #1` on a failing prompt row | question, engine, country — **no outcome at all** (AC15) |
| _"Covers Toyota accurately and positively"_ and _"Toyota ranked #1 on this page"_ on a positive row | title, address, passage, engines — **no verdict label** (AC11) |

### The brief block — decided 2026-09-16

The frame `13746:123761` draws the brief as **"Key Takeaways"**, carrying _"✨ Summary generated by artificial intelligence"_. What ships:

| Element | Decision |
| --- | --- |
| The In-Brief component | **kept as drawn** |
| The "generated by AI" disclaimer | **kept** — accurate, because AI produced the qualification the sentence reports |
| The designed copy | **replaced** by the epic template of AC3, verbatim |
| _"Fixing these three articles would flip this source healthy…"_ | **removed** — a prediction nothing establishes, and action advice is out of scope |

The block keeps its visual identity and loses its copy.

### The other design questions — answered 2026-09-16

- **AC2's count mismatch is intended.** The card count and the panel count differ by design when a source carries both verdicts. A frame has been asked for, but the rule does not wait for it.
- **The country per prompt is blocked by a defect**, not by the design — GEO-1128.

---

The **Technical Part** and the technical ACs live in the repository spec — dev context, not read by QA.

📋 Spec complète : [10-4-evidence-panel.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-4-evidence-panel.md)
📄 Epic README : [README.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md)
🔀 PR : https://github.com/AirPR/geo-analytics/pull/549

## Technical Details

_No dedicated Technical Details / Implementation Notes section in the Jira description (see the repository spec link below if present)._

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** GEO-1128

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] Localisation (en-US, en-GB, fr-FR, es-ES) checked where UI copy changes

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-152
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1123
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-4-evidence-panel.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
