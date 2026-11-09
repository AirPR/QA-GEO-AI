# GEO-811: 28-7 — History gating and sensible defaults

**Story:** GEO-811
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-577
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-811

## User Story
## Story

As a user, I want evolution to appear only once there is enough history, so that I am never shown misleading trends on a new analysis.

## Acceptance Criteria
**AC1** (view gate) — Given an analysis with 7 or fewer crawls, When I view the app, Then no evolution trendline or delta is shown.

**AC2** (view gate / default) — Given an analysis with more than 7 crawls, When I open the app, Then the view defaults to « Last 7 days ».

**AC3** (picker) — Given insufficient history for a time-based preset, When I open the date range picker, Then that preset is disabled; I cannot select a period longer than the available data.

**AC4** (delta gate) — Given a selected period without a comparable previous-period baseline, When the KPI cards / SOV chart render, Then the delta row is hidden (value-only) — independent of the view gate.

**AC5** (delta gate) — Given a selected period with a comparable previous-period baseline, When the cards/chart render, Then the delta is shown.


**AC6** — Given insufficient history (≤ 7 crawls), When the dashboard renders, Then it shows in its current snapshot state without evolution controls — no error, no empty trendline.

📋 Spec complète : [28-7-history-gating-and-defaults.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-28/28-7-history-gating-and-defaults.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-811
