# GEO-808: 28-3 — Delta on the Share of Voice chart

**Story:** GEO-808
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-577
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-808

## User Story
## Story

As a user, I want the dedicated Share of Voice chart to show its period-over-period change, so that I can read the evolution of my share even though it is no longer a KPI card.

## Acceptance Criteria
**AC1** — Given the dedicated Share of Voice chart, When it renders for a period with a comparable previous-period baseline, Then it shows a delta of the latest share against the previous-period average.

**AC2** — Given the SOV delta is shown, When the latest share is above/below the previous-period average, Then both direction and size are clearly indicated, coloured by impact (green = improvement, red = decline).

**AC3** — Given no comparable prior data, When the SOV chart renders, Then the delta is hidden (the doughnut shows without a delta).

**AC4** — Given I change the selected period, When the SOV chart refreshes, Then its delta recomputes against the new previous period (same length, immediately preceding).


**AC5** — The delta appears below the central share value (e.g. « 46% Share of Voice » then a « ↑20% » pill), same pill style as the KPI cards (arrow + magnitude, coloured by impact).

📋 Spec complète : [28-3-delta-on-share-of-voice-chart.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-28/28-3-delta-on-share-of-voice-chart.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-808
