# GEO-807: 28-2 — Period-over-period delta on KPI cards

**Story:** GEO-807
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-577
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-807

## User Story
## Story

As a user, I want each KPI card to show the change of its latest value against the previous-period average, so that I can tell at a glance whether the metric improved or worsened.

## Acceptance Criteria
**AC1** — Given an analysis with a comparable previous-period baseline, When I view the KPI cards, Then each card (Visibility, Average Position, AI choice, Sentiment) shows a delta of the latest value against the previous-period average.

**AC2** — Given a delta is shown, When the latest value is above/below the previous-period average, Then both direction and size are clearly indicated, the size being the relative percentage change vs the previous-period average.

**AC3** — Given a delta is shown, When it is coloured, Then the colour follows impact, not raw direction — green = improvement, red = decline — and for Average Position a movement toward rank #1 is shown as an improvement (green) even though the numeric rank decreases.

**AC4** — Given the Sentiment metric and a previous-period average near zero, When the relative formula would diverge, Then the delta is not shown as a misleading large percentage (it is hidden, treated as no comparable baseline).

**AC5** — Given no comparable prior data, When the cards render, Then the delta row is hidden entirely (value-only).

**AC6** — Given I change the selected period, When the cards refresh, Then each delta recomputes against the new previous period.


**AC7** — The delta row appears below the value as: arrow + percentage pill + « vs previous period ». Mixed-direction reference: ↓5% Visibility (red) · ↑20% Avg Position (green) · ↓19% AI Choice (red) · ↑30% Sentiment (green).

📋 Spec complète : [28-2-period-over-period-delta-kpi-cards.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-28/28-2-period-over-period-delta-kpi-cards.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-807
