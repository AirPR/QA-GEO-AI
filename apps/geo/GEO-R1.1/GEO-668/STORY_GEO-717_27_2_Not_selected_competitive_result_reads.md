# GEO-717: 27-2 — Not-selected competitive result reads as "Lost"

**Story:** GEO-717
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-668
**Cree:** 2026-06-19
**Jira:** https://onclusive.atlassian.net/browse/GEO-717

## User Story
## Story

As a viewer inspecting a competitive question, I want an engine that did **not select my brand** to read as **"Lost"**, so that I am not shown an ambiguous **"Split"** for a single engine's binary choice.

## Acceptance Criteria
**AC1** — Given a competitive question detail, When the viewed engine did not select the brand, Then that engine's result reads "Lost", never "Split".

**AC2** — Given a competitive question detail, When the viewed engine selected the brand, Then that engine's result reads "Won".

**AC3** — Given a competitive question, When a single engine's outcome is shown, Then "Split" never appears for that single engine because its choice is always either a win or a loss.

📋 Spec complète : [27-2-not-selected-competitive-lost.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-27/27-2-not-selected-competitive-lost.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-668
- Story: https://onclusive.atlassian.net/browse/GEO-717
