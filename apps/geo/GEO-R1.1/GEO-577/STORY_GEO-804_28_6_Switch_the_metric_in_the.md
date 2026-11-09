# GEO-804: 28-6 — Switch the metric in the trend graph

**Story:** GEO-804
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-577
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-804

## User Story
## Story

As a user viewing the trend graph, I want a metric switcher that lets me move between Share of Voice, Visibility, Average Position, AI choice and Sentiment, so that I can compare how each metric evolved over the selected period without leaving the view.

## Acceptance Criteria
**AC1** — Given I open the trend graph, When I switch between Share of Voice, Visibility, Average Position, AI choice and Sentiment, Then the graph updates to that metric without leaving the view (same chart, same lines, re-scaled).

**AC2** — Given I have switched the metric, When I hover a data point, Then the per-country breakdown reflects the selected metric.

**AC3** — Given I switch the metric, When the graph updates, Then it stays on the same view (Overview or Category), keeps the same selected period, and keeps the same set of lines (categories on Overview / Top-10 brands in Category view) — only the metric and its y-axis change.


**AC4** — The metric switcher is a horizontal tab bar of 5 tabs (icon + label) in order: Share of voice, Visibility, Avg. Position, AI choice, Sentiment; the active tab is visually distinct (underline + active colour).

**AC5** — The y-axis adapts per metric: Visibility / Share of Voice / AI choice → fixed 0–100% (25-pt steps); Sentiment → symmetric −100% → +100% with a zero midline; Average Position → inverted ordinal scale, rank 1 at top, 11 at bottom.

📋 Spec complète : [28-6-trend-graph-metric-switcher.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-28/28-6-trend-graph-metric-switcher.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-804
