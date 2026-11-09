# GEO-810: 28-5 — Trendlines in Category view

**Story:** GEO-810
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-577
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-810

## User Story
## Story

As a user, I want the Category trend graph to show the brand and its top competitors, so that I can see how my competitive position evolved.

## Acceptance Criteria
**AC1** — Given I am in Category view, When the trend graph renders, Then I see one line per brand (the Top 10 brands) for the selected metric over the selected period — **no aggregate « all-brands » line**.

**AC2** — Given I hover a data point, When the tooltip opens, Then it shows a « Global » aggregate row plus one row per country (countries accepted by the user's filter, ordered from highest to lowest value).

**AC3** — Given the per-country breakdown, When the « Global » value is shown, Then it is computed the **same way the dashboard already computes a multi-market value** — by re-computing the metric over the **pooled responses of the filtered countries** (`KpiAggregatorService`, Epic 16) — **not a sum, not a naive average of per-country percentages**. (Per metric: Visibility/Win Rate = flat ratio over the union; SOV = mention-density re-computed over the union; Avg Position = flat mean of ranks, penalty 11, ceil; Sentiment = mean of per-(category×market) group sentiments.)

**AC4** — Given I change the selected period, When the trend graph redraws, Then the lines span the new period, bucketed per granularity (daily 7/30 days, weekly 3 months, monthly 12 months / All).

**AC5** — Given I change the metric (28-6), When the graph updates, Then the brand lines and the per-country hover reflect the selected metric.


**AC6** — Layout per Figma: title « Time Evolution », subtitle « Top 10 brands… », switcher, time X-axis, brand legend (target brand highlighted). **No all-brands line** — the Figma « all brands » line/subtitle is dropped (design to be updated).

**AC7** — The hover tooltip shows the date, the brand name, a « Global » row, then the countries (flag + value) ordered descending.

📋 Spec complète : [28-5-trendlines-category-view.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-28/28-5-trendlines-category-view.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-810
