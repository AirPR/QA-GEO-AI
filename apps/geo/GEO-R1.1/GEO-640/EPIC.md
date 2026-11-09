# Share of Voice Dedicated Chart (Extract SOV from Per-Brand Metrics)

**Epic ID:** GEO-640
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Cree:** 2026-06-08
**MAJ:** 2026-07-07
**Jira:** https://onclusive.atlassian.net/browse/GEO-640

## Description
A user sees Share of Voice presented as what it is, a competitive share distributed across the brand and its competitors, in its own dedicated chart, instead of being shown as a per-brand metric alongside Visibility, Win Rate, Position and Sentiment where it misleads.
Share of Voice is a share split across all brands in a category, so a single brand rarely holds more than about 30 percent even when it dominates. Presenting it as a per-brand KPI with Good / Fair / Poor banding makes a strong brand read Poor, and using it as a quadrant axis squashes every brand into one corner. The quadrant axis was already switched away from Share of Voice to Visibility (ref GEO-354) for exactly this reason. This epic completes that move by giving Share of Voice the visualization that fits a share: a dedicated chart that compares the brand against its competitors.
- A dedicated Share of Voice chart that shows the target brand's share against its top competitors for the selected scope (country, category, engines, period), so the distribution and the brand's slice are immediately readable.
- The Share of Voice chart should be placed right below the KPI card.
- Share of Voice is removed from the per-brand KPI card set on the Overview and Category views, where it currently carries a Good / Fair / Poor quality pill that misrepresents a share
- The Share of Voice formula itself is unchanged; the mention-density model from EPIC-015 stays.

## Scope
- A dedicated Share of Voice chart that shows the target brand's share against its top competitors for the selected scope (country, category, engines, period), so the distribution and the brand's slice are immediately readable.
- The Share of Voice chart should be placed right below the KPI card.
- Share of Voice is removed from the per-brand KPI card set on the Overview and Category views, where it currently carries a Good / Fair / Poor quality pill that misrepresents a share


- The Share of Voice formula itself is unchanged; the mention-density model from EPIC-015 stays.
- The quadrant axis change, already delivered in GEO-354.
- Visibility, Win Rate (now AI choice), Position and Sentiment surfaces, unchanged.

## Out of Scope
- The Share of Voice formula itself is unchanged; the mention-density model from EPIC-015 stays.
- The quadrant axis change, already delivered in GEO-354.
- Visibility, Win Rate (now AI choice), Position and Sentiment surfaces, unchanged.

## Stories
| Story | Titre | Statut |
|-------|-------|--------|
| [GEO-664](https://onclusive.atlassian.net/browse/GEO-664) | 23-2 — Dedicated Share of Voice Doughnut Chart (Overview + Category) | [DONE] Passed QA |
| [GEO-663](https://onclusive.atlassian.net/browse/GEO-663) | 23-1 — Remove Share of Voice from Per-Brand Surfaces (Overview + Category) | [DONE] Done |

## Liens
- https://onclusive.atlassian.net/browse/GEO-640
- https://onclusive.atlassian.net/browse/GEO-664
- https://onclusive.atlassian.net/browse/GEO-663
