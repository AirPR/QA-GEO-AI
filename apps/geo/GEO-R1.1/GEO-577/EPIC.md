# Time Evolution Comparison (Trendlines and Period-over-Period Deltas)

**Epic ID:** GEO-577
**Statut:** [WIP] Ready for QA
**Assigne:** Youssef.AitLaydi
**Cree:** 2026-05-28
**MAJ:** 2026-07-20
**Jira:** https://onclusive.atlassian.net/browse/GEO-577

## Description
| Field | Value|
| Fix Version | 1.1|
| Status | Draft|
A user can see how an analysis has changed over time, directly inside the graphs they already use, through trendlines and period-over-period deltas, so they can answer "what changed since last time" at a glance. Today the dashboard shows a single point in time, so a user cannot tell whether their visibility, ranking, competitive position, or perception is improving or worsening. Surfacing evolution inside the existing graphs turns the dashboard from a snapshot into a view of progress.
Every in-scope metric is compared the same way: the latest value against the average of the previous period. A date range picker, consistent with Onclusive Analytics, lets the user select the current period and clearly indicates the previous period it is compared against. This is one uniform model applied to all metrics in scope, with no per-metric variation.
The KPI cards carry the delta for Visibility, Average Position, AI choice, and Sentiment. Share of Voice no longer sits in the per-brand KPI card set, so its delta is shown on the dedicated Share of Voice chart instead. The trend graph adds the evolution lines: on the Overview it shows one line per category plus a distinct all-categories line; in Category view it shows the brand and its top competitors. Hovering any data point reveals the per-country breakdown for that line, ordered from highest to lowest. A metric switcher lets the user move between Share of Voice, Visibility, Average Position, AI choice, and Sentiment without leaving the view. Evolution appears only once an analysis has at least one full week of history, and by default the view is set to the last 7 days once that history exists.

## Scope
Out of scope

- New and lost competitor detection
- A dedicated evolution or "what changed" view
- An email digest of changes
- Any per-metric variation of the averaging model (the MVP uses one uniform model)

Still open (non-blocking)

- Whether the all-categories Overview line and per-country hover ordering use the same scope filters (country, engines) as the rest of the view, or always show the full set

## Stories
| Story | Titre | Statut |
|-------|-------|--------|
| [GEO-976](https://onclusive.atlassian.net/browse/GEO-976) | [GEO-Export] Add Time Evolution data to the XLSX export (Overview and per-catego | [WIP] Ready for QA |
| [GEO-962](https://onclusive.atlassian.net/browse/GEO-962) | [GEO-Export] Add the "Time Evolution" chart and the selected time range to PPTX/ | [WIP] Ready for QA |
| [GEO-864](https://onclusive.atlassian.net/browse/GEO-864) | Increase resolution of Time Evolution line charts (taller plot + finer Y-axis st | [DONE] Done |
| [GEO-811](https://onclusive.atlassian.net/browse/GEO-811) | 28-7 — History gating and sensible defaults | [DONE] Done |
| [GEO-810](https://onclusive.atlassian.net/browse/GEO-810) | 28-5 — Trendlines in Category view | [DONE] Done |
| [GEO-809](https://onclusive.atlassian.net/browse/GEO-809) | 28-4 — Trendlines on the Overview | [DONE] Done |
| [GEO-808](https://onclusive.atlassian.net/browse/GEO-808) | 28-3 — Delta on the Share of Voice chart | [DONE] Done |
| [GEO-807](https://onclusive.atlassian.net/browse/GEO-807) | 28-2 — Period-over-period delta on KPI cards | [DONE] Done |
| [GEO-806](https://onclusive.atlassian.net/browse/GEO-806) | 28-1 — Select the period under view (report-based date range picker) | [DONE] Done |
| [GEO-805](https://onclusive.atlassian.net/browse/GEO-805) | 28-0 — Time-series metric aggregation endpoint (backend prerequisite) | [DONE] Done |
| [GEO-804](https://onclusive.atlassian.net/browse/GEO-804) | 28-6 — Switch the metric in the trend graph | [DONE] Done |

## Liens
- https://onclusive.atlassian.net/browse/GEO-577
- https://onclusive.atlassian.net/browse/GEO-976
- https://onclusive.atlassian.net/browse/GEO-962
- https://onclusive.atlassian.net/browse/GEO-864
- https://onclusive.atlassian.net/browse/GEO-811
- https://onclusive.atlassian.net/browse/GEO-810
- https://onclusive.atlassian.net/browse/GEO-809
- https://onclusive.atlassian.net/browse/GEO-808
- https://onclusive.atlassian.net/browse/GEO-807
- https://onclusive.atlassian.net/browse/GEO-806
- https://onclusive.atlassian.net/browse/GEO-805
- https://onclusive.atlassian.net/browse/GEO-804
