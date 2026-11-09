# GEO-962: [GEO-Export] Add the "Time Evolution" chart and the selected time range to PPTX/PDF exports

**Story:** GEO-962
**Statut:** [WIP] Ready for QA
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-577
**Cree:** 2026-07-13
**Jira:** https://onclusive.atlassian.net/browse/GEO-962

## User Story
## Context

On the dashboard, the **Time Evolution** section shows how a metric evolves over time, and the user can select a **time range** (e.g. "Last 7 days"). Neither of these currently appears in the **PPTX** and **PDF** exports — this story adds them.

## Acceptance Criteria
- **AC1** — _Given_ a "Last 7 days" range is selected, _When_ I export to PPTX/PDF, _Then_ the cover shows "Last 7 days".
- **AC2** — _Given_ a range is selected and the "Visibility" metric is active on the evolution chart, _When_ I export, _Then_ the export contains a Time Evolution chart for Visibility (aggregate + per-market) consistent with the dashboard.
- **AC3** — _Given_ a report without enough history (chart unavailable on the dashboard), _When_ I export, _Then_ the Time Evolution chart does not appear (no empty section).

## Technical Details
- **Frontend** — make the chart's selected metric readable by the export (lift it into a store); send as params: the metric + the time-range label.
- **Backend** — the export reuses the existing time-series service (`KpiTimeSeriesService`) to fetch the same data as the dashboard; granularity derived from the range duration.
- `PptxChartBuilder` — new multi-line chart rendering (Apache POI) + the time-range label on the cover. PDF is covered automatically (it re-renders the PPTX deck).

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-962
