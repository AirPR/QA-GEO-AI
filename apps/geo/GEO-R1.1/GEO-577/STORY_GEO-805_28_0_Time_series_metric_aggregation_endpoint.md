# GEO-805: 28-0 — Time-series metric aggregation endpoint (backend prerequisite)

**Story:** GEO-805
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-577
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-805

## User Story
## Story

As the dashboard frontend (28.1–28.5), I want a backend endpoint that returns historical metric values across immutable snapshots — bucketed by granularity, with per-country breakdown preserved and a previous-period aggregate — so that deltas, trendlines and the per-country hover all derive consistently from the user's selected period and country filter.

## Acceptance Criteria
**AC1** — Given a report with N daily snapshots and a selected period, When the time-series is requested for a metric, Then it returns one series per line (per category for the Overview ; per brand — Top 10 — for the Category view) spanning the period.

**AC2** — Given a metric series, When it is returned, Then each point carries the per-country value for the countries in the user's current filter, plus a « Global » value computed the **same way the dashboard already computes a multi-market value** — re-computing the metric over the **pooled responses of the filtered countries** (`KpiAggregatorService`, Epic 16), **not a sum nor a naive average of per-country percentages**.

**AC3** — Given the requested granularity, When the series is built, Then points are bucketed and averaged server-side: daily (7/30 days), weekly (3 months), monthly (12 months / All).

**AC4** — Given a selected period, When the endpoint responds, Then it exposes the previous-period average per line/metric (previous period = same length, immediately preceding) for delta computation.

**AC5** — Given the picker, When report run dates are requested, Then the endpoint exposes the list of report-run (snapshot) dates available in scope.

**AC6** — Given a report with 7 or fewer crawls, When the time-series is requested, Then the response indicates evolution is not yet available (gating), without error.

> Note — **two distinct aggregation axes**: (country / Global) = pooled re-computation over the union (Epic 16, AC2); (time / week-month bucket) = average of per-snapshot metric values (AC3). Composition order is an implementation detail (default: Global pooled per snapshot, then time-bucket average).

📋 Spec complète : [28-0-timeseries-metric-aggregation-backend.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-28/28-0-timeseries-metric-aggregation-backend.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-805
