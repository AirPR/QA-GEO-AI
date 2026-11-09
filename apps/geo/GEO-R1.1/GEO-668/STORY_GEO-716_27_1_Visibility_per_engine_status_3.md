# GEO-716: 27-1 — Visibility per-engine status: 3-tier model (Favorable / Unfavorable / Unranked)

**Story:** GEO-716
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-668
**Cree:** 2026-06-19
**Jira:** https://onclusive.atlassian.net/browse/GEO-716

## User Story
## Story

As a viewer inspecting a visibility question, I want each engine's outcome for my brand to read with the right severity — **Favorable** when ranked in the top 3, **Unfavorable** (amber) when ranked 4 to 10, and **Unranked** (red) when the brand is not ranked at all — so that I instantly distinguish a leading result from a weak one and from a complete miss.

## Acceptance Criteria
**AC1** — Given a visibility question detail, When the viewed engine ranked the brand between rank 1 and 3 inclusive, Then the result is shown as "Favorable" in green, with the rank displayed (#1, #2 or #3).

**AC2** — Given a visibility question detail, When the viewed engine ranked the brand between rank 4 and 10 inclusive, Then the result is shown as "Unfavorable" in yellow/amber (the same shade as the competitive "Split" banner), with the rank displayed.

**AC3** — Given a visibility question detail, When the viewed engine did not rank the brand (not ranked), Then the result is shown as "Unranked" in red — a label distinct from "Unfavorable".

**AC4** — Given a single engine's visibility result, When it is shown, Then these three states (Favorable green 1–3 / Unfavorable amber 4–10 / Unranked red not-ranked) are the only possible ones, and the green/amber/red color is consistent between the engine pill badge and the favorability card.

📋 Spec complète : [27-1-not-ranked-visibility-unfavorable.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-27/27-1-not-ranked-visibility-unfavorable.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-668
- Story: https://onclusive.atlassian.net/browse/GEO-716
