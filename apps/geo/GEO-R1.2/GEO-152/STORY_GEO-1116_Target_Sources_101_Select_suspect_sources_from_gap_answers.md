# GEO-1116: [Target Sources] 10.1 — Select suspect sources from gap answers

**Story ID:** GEO-1116
**Issue Type:** Story
**Title:** [Target Sources] 10.1 — Select suspect sources from gap answers
**Status:** [QA IN PROGRESS] QA In Progress
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-09-24
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1116

## User Story

**As** a PR professional,
**I want** the analysis to identify the sources cited in answers where my brand underperforms,
**so that** the sources most involved in my visibility problems become candidates for action.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.1 of EPIC-010. Updated 2026-09-16 with one implementation constraint found on production,_ **_both open decisions settled 2026-09-17_**_._

**State:** ✅ Ready — AC4 confirmed, AC6 added, and the two points this story carried as open are now decided.

---

**As** a PR professional,
**I want** the analysis to identify the sources cited in answers where my brand underperforms,
**so that** the sources most involved in my visibility problems become candidates for action.

### Functional ACs

_(copied verbatim from the epic)_

**AC1 — Three qualifying legs**

- Given: a completed analysis
- When: suspect sources are selected
- Then: a source qualifies as suspect only if it is cited in at least one visibility question answer where the brand is entirely absent, one competitive question answer where the brand is not the chosen winner, or one negative concept

**AC2 — Being ranked low does not qualify**

- Given: a visibility answer where the brand is present but not ranked first
- When: suspect selection runs
- Then: that answer does not qualify any source on the visibility leg

**AC3 — Articles are recorded with the source**

- Given: a suspect source
- When: it is recorded
- Then: the specific articles it was cited on in qualifying answers are recorded with it

**AC4 — Owned and competitor domains excluded**

- Given: a domain owned by the analyzed brand or by a competitor
- When: suspect selection runs
- Then: that domain is excluded from the suspect list regardless of the answers citing it

**AC5 — Not bounded by the AI Citation Sources cap**

- Given: the sources cited in qualifying answers
- When: the suspect set is built
- Then: it covers every source cited in those answers, and it is never limited to the capped list of domains that AI Citation Sources displays

**AC6 — Model-declared URLs never qualify a source** ⭐ _added by the PM, 2026-09-16_

- Given: a source URL the model wrote from memory rather than opened during web search
- When: suspect selection runs
- Then: it never qualifies a source, and it is **excluded at selection** rather than left to fail at fetch

---

## Design ACs

**None — and confirmed.** No frame maps to this story: it has no UI surface.

---

### Recorded for the implementation

**The visibility predicate must be configurable.** The PM recorded a future evolution: today the leg counts only answers where the brand is entirely absent, and real-case testing may widen it to a rank threshold — worse than rank 5, for instance. _"Keep the selection rule configurable so that change is a parameter, not a rework."_

⚠️ Note that **AC2 is a consequence of the current threshold, not an absolute rule**. _"Being ranked low does not qualify"_ holds while the threshold is "entirely absent"; it becomes false the day the threshold moves. It should be implemented as the same predicate, not as a second independent rule.

**AC6 belongs in the selection query.** The PM's wording is explicit — _"excluded at selection, not left to fail at fetch"_ — so the provenance predicate belongs to the query itself, not to a downstream filter. Measured on production: **0 of 153 model-declared URLs could be found in a large article corpus used as a probe, against 12.4 % for grounded ones** — model-declared URLs are very often fabricated.

---

## ✅ Settled 2026-09-17 — the owned-domain exclusion of AC4

**The problem, found on production 2026-09-16.** `reports.entity_domain` holds **one address**, and a brand does not have one domain. While sampling the suspect set of a live report, this page came back **inside the suspect list**:

```
606 106 characters   https://www.toyota.fr/occasions/categorie/electrique
```

Three consequences, in increasing order of seriousness: every such page consumes an **acquisition credit**, and this one is 606 k characters · a brand's own site always names the brand, so it lands in the "match" branch and **inflates the citation counts** that break ties in story 1.3 · and the Actions Center would tell the client to go influence **their own website**, in a list whose whole promise is "sources to contact".

**The decision: the analyzed brand is a family of domains, exactly like a competitor.** `entity_domain` becomes a **seed**, not a bound.

- **Storage** reuses the per-family domain set that this epic already adds for `report_competitors` — a competitor has several country TLDs, and the brand is one more case. No table dedicated to the brand.
- **The set is seeded** by `entity_domain` **plus** every domain the enrichment step already resolves to the brand family, so it carries the country TLDs that actually exist for that client.
- **Comparison is on the registrable label, by strict equality**, never containment — the same rule the epic already imposes for competitors, so a competitor named "Bloom" never excludes `bloomberg.com`.
- **On doubt, exclude**, and log every exclusion with its reason. The two errors do not cost the same: a wrongly excluded source loses one opportunity, silently and recoverably; a wrongly included one costs the fetch and the judgement of a 606 k-character page **and** recommends that the client pitch their own site.

| Cited URL | Before | After |
| --- | --- | --- |
| `www.toyota.com/camry` | excluded ✅ | excluded ✅ |
| `www.toyota.fr/occasions/…` | **kept** ❌ _(606 k characters, seen on production)_ | excluded ✅ |
| `press.toyota.co.uk/news/…` | **kept** ❌ | excluded ✅ |
| `toyota.caranddriver.com/review` | kept ✅ | **kept** ✅ — the registrable label is `caranddriver` |
| `caranddriver.com/best-evs` | kept ✅ | kept ✅ |

_The fourth row is the one that matters: the rule must_ **_not_** _be greedy. A brand subdomain on a media site stays a legitimate target source — that is the core of the product._

## ✅ Settled 2026-09-17 — pre-hotfix rows and AC6

This story used to leave one decision open: rows written before the 1.15 hotfix carry **no origin**, and it is unrecoverable. Whether they are admitted was to be decided rather than inherited.

**They are excluded.** The predicate is the **whitelist** `provenance = 'GROUNDED'`, never the blacklist "anything but model-declared", and the count of rows dropped for unknown origin is logged.

**Why strict.** The PM's justification for AC6 is not that a model-declared URL carries a bad label, but that it _"cannot support a provable claim"_. A row with an **unknown** origin is equally unproven — same argument, same conclusion. And the asymmetry decides it: the analysis runs **daily**, so a source skipped today returns tomorrow carrying a real provenance, while admitting a fabricated URL costs the fetch, the judgement, and possibly a client-facing claim about a page no engine ever opened.

_Verified in the code on 2026-09-17: every row written since the hotfix carries a provenance unconditionally, so_ `NULL` is strictly pre-1.15 and the strict rule discards no live data.

---

The **Technical Part** and the technical ACs live in the repository spec — dev context, not read by QA.

📋 Spec complète : [10-1-select-suspect-sources.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-1-select-suspect-sources.md)
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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1116
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-1-select-suspect-sources.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
