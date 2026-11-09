# GEO-809: 28-4 — Trendlines on the Overview

**Story:** GEO-809
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-577
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-809

## User Story
## Story

As a user, I want the Overview trend graph to show one line per category plus a distinct all-categories line, so that I can compare how each category evolved over the period.

## Acceptance Criteria
**AC1** — Given I am on the Overview, When the trend graph renders, Then I see one line per category plus a distinct all-categories line for the selected metric over the selected period.

**AC2** — Given I hover a data point, When the tooltip opens, Then it shows a « Global » aggregate row plus one row per country, where the countries are those accepted by the user's current filter and are ordered from highest to lowest value.

**AC3** — Given the per-country breakdown, When the « Global » value is shown, Then it is computed the **same way the dashboard already computes a multi-market value** — by re-computing the metric over the **pooled responses of the filtered countries** (`KpiAggregatorService`, Epic 16) — **not a sum, not a naive average of per-country percentages**.

**AC4** — Given I change the selected period, When the trend graph redraws, Then the lines span the new period, bucketed per granularity (daily 7/30 days, weekly 3 months, monthly 12 months / All).

**AC5** — Given I change the metric (switcher, 28-6), When the graph updates, Then the lines and the per-country hover reflect the selected metric.


**AC6** — Layout per Figma: title « Time Evolution », metric switcher tabs, time X-axis, category legend (incl. « All categories »), all-categories line visually distinct.

**AC7** — The hover tooltip shows the date, the line name (category), a « Global » row, then the countries (flag + value) ordered descending.

📋 Spec complète : [28-4-trendlines-overview.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-28/28-4-trendlines-overview.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-809
