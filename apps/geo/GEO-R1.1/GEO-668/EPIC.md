# Question Detail Status Labels

**Epic ID:** GEO-668
**Statut:** [DONE] Passed QA
**Assigne:** Youssef.AitLaydi
**Cree:** 2026-06-16
**MAJ:** 2026-07-06
**Jira:** https://onclusive.atlassian.net/browse/GEO-668

## Description
When a user opens a question in the questions analysis and inspects how a single AI engine answered it, the status shown for that engine must read as the true outcome for the brand. Two cases currently mislabel that outcome.
In a visibility question, an engine can place the brand somewhere in its ranking or leave the brand out of the ranking entirely. The per-engine status must read with the right severity across three tiers: a strong ranking is a leading result, a weak ranking is unfavorable, and not being ranked at all is the worst possible outcome and must read as such, rather than as a neutral, muted style.
In a competitive question, each engine makes a binary head-to-head choice: it either selects the brand or it selects a competitor. A single engine's outcome is therefore always either a win or a loss. Today, when the viewed engine did not select the brand, the detail can read "Split" rather than "Lost". "Split" only describes the aggregate across several engines that disagree with each other; it is never a valid description of one engine's answer. When the engine in view did not select the brand, that engine's result must read "Lost".
This EPIC corrects both labels in the per-engine question detail so the status always reflects the real outcome. The aggregate favorability rollup across engines is unchanged: a genuine disagreement across engines still reads as "Split".
> ⚡ PM revirement — Quentin, 2026-06-22 (supersedes the previous binary model). Visibility per-engine status follows a 3-tier model: rank 1–3 → Favorable (green) with the rank shown · rank 4–10 → "Unfavorable" (yellow/amber, same color as the competitive Split banner) with the rank shown · not ranked → "Unranked" (red). Applies to BOTH the engine pill badge and the favorability card. The aggregate rollup across engines is unchanged.
---

## Scope
Out of scope

- The aggregate "Split" label and the favorability rollup logic across multiple engines
- Perception question status, which is expressed as sentiment rather than win, loss, or rank
- Any change to how rankings, win rate, or sentiment are computed
- The competitive model itself: it stays Won (green) / Lost (red), with no per-engine "Split"

Resolved (was open)

- The not-ranked visibility result carries an explicit "Unranked" caption (red), distinct from the amber "Unfavorable" tier — styling alone is not used. (PM decision, 2026-06-22.)

## Stories
| Story | Titre | Statut |
|-------|-------|--------|
| [GEO-718](https://onclusive.atlassian.net/browse/GEO-718) | 27-3 — Aggregate "Split" across engines is preserved | [DONE] Done |
| [GEO-717](https://onclusive.atlassian.net/browse/GEO-717) | 27-2 — Not-selected competitive result reads as "Lost" | [DONE] Done |
| [GEO-716](https://onclusive.atlassian.net/browse/GEO-716) | 27-1 — Visibility per-engine status: 3-tier model (Favorable / Unfavorable / Unr | [DONE] Done |

## Liens
- https://onclusive.atlassian.net/browse/GEO-668
- https://onclusive.atlassian.net/browse/GEO-718
- https://onclusive.atlassian.net/browse/GEO-717
- https://onclusive.atlassian.net/browse/GEO-716
