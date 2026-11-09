# GEO-1122: [Target Sources] 10.8 — Scope additions keep the target list current

**Story ID:** GEO-1122
**Issue Type:** Story
**Title:** [Target Sources] 10.8 — Scope additions keep the target list current
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-24
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1122

## User Story

**As** a user extending an existing analysis,
**I want** newly added scope to go through the same verification funnel,
**so that** the target list stays trustworthy after changes.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.8 of EPIC-010. Unblocked 2026-09-16 (PM rewrite), acquisition chain decided the same day, staleness window proposed the same day._

**State:** ✅ Ready — **no measurement blocks this story any more.**

> _"You were right on all three points. Competitors are not user-configured, there is nothing to merge into, and AI Engines was missing. Your proposed rewrite is accepted with one addition."_ — PM, 2026-09-16

**The PM also corrected the rewrite on a point of substance.** The proposed criterion said the stored verdict is reused and the article is _"neither re-fetched nor re-judged"_, which reads as never contacting the page again:

> _"Re-fetching and verdict reuse are not in conflict._ **_We do check the page every run_**_, we just pay for a conditional request instead of a full fetch and an LLM call."_

So the page is contacted on **every** run. What is saved is the body and the engine call, not the request — which is why AC3 reads _"re-fetched_ **_in full_**_"_.

### The three defects, kept for traceability

1. **"or a competitor is added"** — competitors are never user-configured. Manage Scope has four sections: Countries, Topics, AI Engines, Questions.
2. **"merged into the ranked list"** — there is nothing to merge into. Every scope change creates a new snapshot with a complete re-analysis.
3. **AI Engines was omitted** from the dimensions, although it changes which answers qualify.

---

**As** a user extending an existing analysis,
**I want** newly added scope to go through the same verification funnel,
**so that** the target list stays trustworthy after changes.

### Functional ACs

_(copied verbatim from the epic, rewritten by the PM on 2026-09-16)_

**AC1 — Any scope change, next scheduled execution**

- Given: an existing analysis
- When: any Manage Scope dimension changes (country, topic, AI engine, or question)
- Then: the change takes effect on the next scheduled execution, which produces a new snapshot with a complete re-analysis

**AC2 — The new scope is verified under the same rules**

- Given: the new snapshot's qualifying answers
- When: their suspect articles are selected
- Then: they are verified under exactly the same rules as any other article

**AC3 — The page is re-checked on every run** ⭐ _corrected by the PM, 2026-09-16_

- Given: an article already verified in a previous snapshot
- When: it reappears in a new snapshot
- Then: the page is re-checked with a **conditional request on every run**; an unchanged page reuses the stored verdict and is neither re-fetched **in full** nor re-judged, and a changed page is re-fetched and re-judged
- ⚠️ _Implementation note, 2026-09-16: the "conditional request" is satisfied by the acquisition provider's_ **_own change detection_**_, not by HTTP validators. The behaviour this AC describes is unchanged; only the mechanism is._

**AC4 — The staleness window overrides the conditional response** ⭐ _added by the PM, 2026-09-16_

- Given: a stored verdict
- When: it reaches the **staleness window**
- Then: the article is re-fetched and re-judged regardless of the conditional response

**AC5 — The list covers the full scope of the run**

- Given: the execution completes
- When: the Actions Center is opened
- Then: the target list covers the full scope of that run, ordered under the same rules

---

## Design ACs

**None — and confirmed.** No frame maps to this story: it has no UI surface of its own.

---

## ✅ What used to block this story is void — not answered, void

This story used to carry two blocking measurements, both waiting on crawler credentials. **Neither is needed any more.** Since 2026-09-16 the whole volume goes through a single acquisition provider, and its documentation settles both.

**AC3 does not rest on HTTP validators.** The provider compares each page to the snapshot it holds and returns the verdict itself — `new` / `same` / `changed` / `removed`, plus the previous scrape timestamp and a line-level diff. Two quotations command the design:

- _"Basic change tracking and git-diff mode have_ **_no additional cost_**_."_ — the change signal is free.
- _"_**_Cached results still cost 1 credit per page._** _Caching improves speed, not credit usage."_ — the fetch is billed on every pass, changed or not.

Snapshots are kept without expiry, so the comparison stays valid however long the gap between runs. **The question "does the publisher send an** `ETag`?" is void, and so is "what share of domains carry no validators". _Verified in production on 2026-09-16 rather than read from the documentation: two consecutive passes on the same page returned_ `changeStatus: "new"` _then_ `"same"`_, with_ `previousScrapeAt`.

### ✅ The staleness window of AC4 — 7 days proposed, 2026-09-16

The window **buys back no acquisition cost**: the page is paid for on every pass regardless of the verdict. It decides one thing only — how often a stored verdict is re-judged by the engine — and the engine is the cheaper of the two lines by a factor of ten.

**Proposed value: 7 days**, costed at roughly **+5 €/month**. It is an ordinary trade-off between the risk of a silently edited page and a re-judge cost that is small in absolute terms. ⏳ _Awaiting the PM's confirmation; nothing else waits on it._

### What does remain open — none of it blocking

- **The subscription tier and the commitment.** Public pricing assumes an annual engagement on a volume that is still moving.
- **The phase 2 schedule** (self-hosted), which removes per-page billing entirely.

_The end-to-end latency of the provider, which used to sit here, was_ **_measured on 2026-09-16_** _— p50 3.5 s, p90 8.4 s per page, and about four minutes for the biggest report at the tier the costing assumes. See GEO-1119._

---

The **Technical Part** and the technical ACs live in the repository spec — dev context, not read by QA. Two points worth knowing outside it: reuse requires **content** **_and_** **brand-family identity**, and a **failed** pass never silently reuses a stored verdict — it falls to the "check could not be completed" outcome of story 1.2 AC11, because a verdict reused without a successful pass is an unverified claim presented as a verified one.

📋 Spec complète : [10-8-scope-additions-keep-list-current.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-8-scope-additions-keep-list-current.md)
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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1122
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-8-scope-additions-keep-list-current.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
