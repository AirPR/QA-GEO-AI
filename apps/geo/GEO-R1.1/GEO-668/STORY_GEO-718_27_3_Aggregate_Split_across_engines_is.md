# GEO-718: 27-3 — Aggregate "Split" across engines is preserved

**Story:** GEO-718
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-668
**Cree:** 2026-06-19
**Jira:** https://onclusive.atlassian.net/browse/GEO-718

## User Story
## Story

As a viewer scanning the questions list, I want a question to still read as **"Split"** when engines genuinely disagree, so that the aggregate view keeps distinguishing mixed results from clear wins or losses.

## Acceptance Criteria
**AC1** — Given a question where some engines are favorable and others are not, When the aggregate status is shown across all selected engines, Then it still reads "Split".

**AC2** — Given the favorability rollup at the top of the questions analysis, When statuses are tallied, Then the counts of favorable, split, and unfavorable results are unchanged by this EPIC.

📋 Spec complète : [27-3-aggregate-split-preserved.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-27/27-3-aggregate-split-preserved.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-668
- Story: https://onclusive.atlassian.net/browse/GEO-718
