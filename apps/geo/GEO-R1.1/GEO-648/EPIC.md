# Top Concepts - Verbatim Source Attribution

**Epic ID:** GEO-648
**Statut:** [WIP] Action Needed
**Assigne:** Abdenasser Aroukhsiss
**Cree:** 2026-06-09
**MAJ:** 2026-07-20
**Jira:** https://onclusive.atlassian.net/browse/GEO-648

## Description
The "Top Concepts Associated with Your Brand" panel must attribute each concept to the sources that genuinely support it, and assign each concept a sentiment that reflects what those sources actually say about the brand. Today both the attribution and the sentiment are produced by an after-the-fact guess that the user cannot trust as proof.
The Top Concepts panel shows each concept with a sentiment and a list of supporting sources. Today the analysis collects sources and concepts separately, then a secondary step tries to guess, after the fact, which source backs which concept and which sentiment. That guessing step has three failure modes the user can see: a source is attributed to a concept it does not actually discuss; a source that never mentions the brand still appears under a concept; and a concept's sentiment is inferred rather than evidenced, so the user cannot verify why a concept reads positive, mixed, or negative. The result is that the "Click on a concept to view sources" experience cannot be fully trusted as proof, which undermines the whole panel for a user trying to understand and defend their brand perception.
The binding between a concept and its supporting sources, and the sentiment assigned to each concept, must reflect what the cited sources actually say about the brand rather than an after-the-fact guess. This is achieved by asking each AI engine to return its concepts with the supporting sources nested directly inside each concept, so every source sits under the concept the engine actually used it for and there is no separate step guessing which source backs which concept (see Requested output schema below). Everything else stays the same: the brand ranking shape, the source-typing rules, the sentiment dimensions, the channel and publisher fields, and the existing source fields.
---
> Exception: this analysis normally describes behavior only, with no schemas or field names in the body. The schema below is included deliberately because the nesting of sources inside concepts is the change this analysis delivers, so the requested shape is the requirement, not an implementation detail.
The analysis asks each AI engine to return its concepts with their supporting sources nested inside each concept, rather than as a separate flat list bound afterward:

## Scope
Out of scope

- Capturing or displaying verbatim passages attached to each source - out of scope for this analysis.
- The Top Concepts panel layout, the sentiment distribution bar, and the sort and filter controls - unchanged.
- The concept list itself (which concepts surface, frequency ordering) - unchanged except that attribution and sentiment become trustworthy.
- The other analysis surfaces (brand rankings, win rate, visibility) - unchanged.

Still open (non-blocking)

- Re-analysis of existing analyses. Analyses produced before this fix keep their old attribution until re-run. Whether to backfill or only apply forward is a product decision.

## Stories
| Story | Titre | Statut |
|-------|-------|--------|
| [GEO-675](https://onclusive.atlassian.net/browse/GEO-675) | 24-4 — Concepts Render When One Engine Returns Nothing (US 1.4) | [DONE] Done |
| [GEO-674](https://onclusive.atlassian.net/browse/GEO-674) | 24-3 — Preserve the Existing Analysis Shape, No Regression (US 1.3) | [DONE] Done |
| [GEO-673](https://onclusive.atlassian.net/browse/GEO-673) | 24-2 — Evidenced Concept Sentiment (US 1.2) | [DONE] Done |
| [GEO-672](https://onclusive.atlassian.net/browse/GEO-672) | 24-1 — Trustworthy Concept-Source Attribution (US 1.1) | [DONE] Done |

## Liens
- https://onclusive.atlassian.net/browse/GEO-648
- https://onclusive.atlassian.net/browse/GEO-675
- https://onclusive.atlassian.net/browse/GEO-674
- https://onclusive.atlassian.net/browse/GEO-673
- https://onclusive.atlassian.net/browse/GEO-672
