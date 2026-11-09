# GEO-806: 28-1 — Select the period under view (report-based date range picker)

**Story:** GEO-806
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-577
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-806

## User Story
## Story

As a user, I want a date range picker consistent with Onclusive Analytics, so that I can choose the current period and clearly see which previous period it is compared against.

## Acceptance Criteria
**AC1** — Given I open the date range picker, When I view the preset list, Then it is anchored by « Latest report » at the top and « All reports » at the bottom, time-based presets (Last 7 days / 30 days / 3 / 12 months) are disabled when no report run falls in their window, and the applied default is « Last 7 days » (once crawls > 7).

**AC2** — Given the calendar, When I view it, Then only report-run dates are selectable (days without a run are disabled).

**AC3** — Given a selection, When I look at the footer before committing, Then it restates the effective selection in report terms (Selected / Range / report count), and Apply is the single commit action (Cancel discards).

**AC4** — Given I select a period and press Apply, When the view updates, Then the trendlines redraw over that period and every delta recomputes against the previous period (same length, immediately preceding).

**AC5** — Given a committed selection, When I view graphs and KPI cards, Then they all reflect the same selected period and the same comparison previous period.


**AC6** — Layout = preset column (left) + 2-month calendar (prev/next chevrons); selected range highlighted (start/end darker); footer summary + Cancel (ghost) / Apply (primary). Days without a report run shown disabled.

📋 Spec complète : [28-1-report-based-date-range-picker.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-28/28-1-report-based-date-range-picker.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-806
