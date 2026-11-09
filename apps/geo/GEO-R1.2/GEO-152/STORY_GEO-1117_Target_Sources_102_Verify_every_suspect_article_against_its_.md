# GEO-1117: [Target Sources] 10.2 — Verify every suspect article against its page

**Story ID:** GEO-1117
**Issue Type:** Story
**Title:** [Target Sources] 10.2 — Verify every suspect article against its page
**Status:** [QA IN PROGRESS] QA In Progress
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-25
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1117

## User Story

**As** a PR professional,
**I want** each suspect article checked for what it actually says about my brand,
**so that** the target list only contains sources with a confirmed problem I can act on.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.2 of EPIC-010. Updated 2026-09-16 — acquisition chain decided, money cost produced._

**State:** ✅ Ready — no blocking item left.

| Item | Status |
| --- | --- |
| Depiction engine | ✅ **Gemini** through `LlmGateway` in OpenRouter mode (option C1), decided 2026-09-14. Variant and temperature proposed 2026-09-16 after testing: `gemini-2.5-flash-lite`, `temperature = 0.1`, on its own row |
| Legal review | ✅ validated 2026-09-15, recorded in the epic |
| Definition of _negative_ | ✅ set 2026-09-16 — AC10 |
| Third verdict | ✅ added — AC11 |
| Funnel cap | ✅ no cap needed — measured |
| **Acquisition chain** | ✅ **decided 2026-09-16** — one provider for the whole volume, SaaS then self-hosted. **GCH is out of the chain** |
| **Money cost** | ✅ **produced** — see below |

---

**As** a PR professional,
**I want** each suspect article checked for what it actually says about my brand,
**so that** the target list only contains sources with a confirmed problem I can act on.

### Functional ACs

_(copied verbatim from the epic — unchanged by the acquisition decision)_

**AC1 — Every article, no cap**

- Given: the suspect articles of an analysis
- When: verification runs
- Then: every suspect article is fetched and checked, with no cap on the number of articles

**AC2 — What the check determines** — engine decided 2026-09-14: **Gemini**, variant proposed 2026-09-16: **2.5 Flash-Lite at temperature 0.1**

- Given: a fetched article
- When: it is checked
- Then: the check determines whether the brand family (parent brand, brand variations, and products) is named anywhere on the page, and if named, whether the depiction is negative, neutral, or positive

**AC3 — Extended scope: products discovered on the page**

- Given: a page that names a brand-family entity that never appeared in any LLM answer (typically a product of the brand)
- When: the check runs
- Then: that naming counts as the brand family being named; the brand variations and the products already resolved to the parent brand seed the check, but they do not bound it

**AC4 — Verdicts are persisted and never re-judged**

- Given: a verification verdict for an article
- When: it is produced
- Then: the verdict is persisted with the article, and every later read uses the persisted verdict; an article is never re-judged within the same analysis
- _"Never re-judged" applies_ **_inside one analysis_**_. Across snapshots the page is re-checked — that rule lives in story 1.8._

**AC5 — False positives are kept, but never counted**

- Given: a fetched article that names the brand family with a neutral or positive depiction
- When: verification concludes
- Then: it **never counts towards the failing article count, the ranking, or the badges**; the panel of story 1.4 shows it as a positive article

**AC6 — False positives are persisted like failing articles**

- Given: a false positive article
- When: it is recorded
- Then: its verdict **and its supporting passage** are persisted with it in the same way as a failing article

**AC7 — What is kept, and the passage**

- Given: a fetched article where the brand family is not named, or is named negatively
- Then: the article is kept as a failing article, and for negative mentions the exact passage is extracted, limited to **140 characters** including spaces

**AC8 — Unfetchable articles count for nothing**

- Given: an article that could not be fetched
- When: verification concludes
- Then: it contributes nothing to any source's failing article count or rank

**AC9 — A source with zero failing articles disappears**

- Given: a source whose failing article count reaches zero after verification
- When: the target list is built
- Then: that source does not appear in it

**AC10 — What counts as negative** ⭐ _set by the PM, 2026-09-16_

- Given: a page where the brand family is named
- When: the depiction is judged
- Then: it is negative when the page **states or implies a criticism, a failure, a risk, or a harm attributable to the brand or to one of its products**, with these boundaries:
  - a favourable statement about a **competitor** is not negative
  - a **factual report of unfavourable news** — a recall, a lawsuit, a poor result — **is** negative
  - a **weak or incidental criticism** inside an otherwise neutral article is **not** negative
  - **when the depiction is ambiguous, the verdict is neutral, never negative**

**AC11 — A check that could not be completed** ⭐ _added by the PM, 2026-09-16_

- Given: a check that cannot conclude — engine unavailable, unsupported language, unusable content
- When: verification concludes
- Then: the article carries that outcome and contributes nothing to any count or rank

---

## Design ACs

**None — and confirmed.** No frame maps to this story: it has no UI surface. Its verdicts are rendered by story 1.3 (badges) and story 1.4 (article rows).

---

## ✅ Acquisition — decided 2026-09-16

> **Decided on the team side, confirmed by Mouad. Not yet committed on the purchasing side** — the tier and the subscription remain to be contracted.

| Phase | Form |
| --- | --- |
| **1** | **SaaS** — billed per page, immediate start, no infrastructure |
| **2** | **Self-hosted** behind an internal API — per-page billing disappears, replaced by infrastructure cost |

**GCH leaves the chain.** It was axis 1 of the spike and covered 12.4 % of cited URLs. Everything now goes through one provider: one acquisition path, one rule set, one place to diagnose a failure. **Spike axes A1, A2 and A4 are abandoned.**

**Change detection is native and free**, which removes the `If-None-Match` / `304` construction the spike described. The provider returns `changeStatus` — `new` / `same` / `changed` / `removed` — plus the previous scrape timestamp and a line-level diff. Its documentation settles two points:

- _"Basic change tracking and git-diff mode have_ **_no additional cost_**_."_
- _"_**_Cached results still cost 1 credit per page._** _Caching improves speed, not credit usage."_

Snapshots never expire, so **no HTTP validator is involved** and the question _"does the publisher send an_ `ETag`?" is void.

**⚠️ AC1 versus a stored copy — the contradiction is lifted.** Serving a verdict from a stored copy used to substitute stored content for a live read. With `changeStatus`, the provider goes to the page on **every pass**: a `same` status is the result of a read, not the blind reuse of a cache.

---

## ✅ The money cost — produced 2026-09-16

| Figure | Value | Source |
| --- | --- | --- |
| Engine unit price | 0.10 $ / 1M input tokens, 0.40 $ output | public grid, **cross-checked against the real invoice** |
| Mean page | **4 291 tokens** (median 3 146) | 1 461 production pages actually fetched |
| Engine line | **~28 €/month** | 215 370 pages, verdict reuse included |
| **Acquisition line** | **~289 €/month** | 500 000-credit tier, 1 credit per page per pass |
| **Total** | **~317 €/month** | 18 active reports, daily verification |

⚠️ **Acquisition weighs ten times the engine.** A costing that counts only tokens is costing the wrong line — which is what this story did until 2026-09-16.

⚠️ **On the 14.2 % quoted in earlier versions of this story: it is not a suspect ratio.** The 2026-09-08 table defines it as `urls / total_src` — a **deduplication** ratio, measuring how many times the same URL is cited by different answers. That pass never measured qualification. The first suspect measurement is 2026-09-16: **36 %** of cited URLs enter the funnel, i.e. **8 012 pages a day** across the 18 active reports.

Two caveats that travel with the figure: page size is measured with a 200 k-character guard, so **the stated bill is an upper bound**; and the acquisition tariff assumes an annual commitment on a volume still moving.

---

The **Technical Part** and the technical ACs live in the repository spec — dev context, not read by QA.

📋 Spec complète : [10-2-verify-articles-against-their-page.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-2-verify-articles-against-their-page.md)
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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1117
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-2-verify-articles-against-their-page.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
