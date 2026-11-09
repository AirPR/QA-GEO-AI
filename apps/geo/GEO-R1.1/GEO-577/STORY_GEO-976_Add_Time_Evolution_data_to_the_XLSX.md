# GEO-976: [GEO-Export] Add Time Evolution data to the XLSX export (Overview and per-category)

**Story:** GEO-976
**Statut:** [WIP] Ready for QA
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-577
**Cree:** 2026-07-15
**Jira:** https://onclusive.atlassian.net/browse/GEO-976

## User Story
As a user, I want the Time Evolution data included in the XLSX export, so that I can analyze metric trends over time outside the platform.

### Context

## Acceptance Criteria
- Given an analysis that meets the same Time Evolution availability rules as the app (enough historical data for trendlines), When I export to XLSX, Then the workbook contains a Time Evolution sheet with one table per metric (SOV, Visibility, Avg Position, AI Choice, Sentiment), snapshot dates as columns, and the aggregate plus each category as rows
- Given an analysis that does not meet the Time Evolution availability rules (the trend graph shows its no-data state in the app), When I export to XLSX, Then the Time Evolution sheets are omitted
- Given an analysis with categories, When I export to XLSX, Then each category has its own Time Evolution sheet with the same five tables where rows are the target brand and its competitors, target brand listed first
- Given a selected time range, When I export to XLSX, Then the Time Evolution tables cover only that range, with the same date buckets the app displays for it
- Given active market, AI engine or period filters, When I export to XLSX, Then all Time Evolution values reflect the filtered scope
- Given the dashboard hover shows a per-market breakdown, When I export to XLSX, Then per-market values are not included - each table contains Global values only
- Given the Time Evolution sheets, When I inspect them, Then they contain value tables only, with no embedded charts
- Given number formatting, When I read the tables, Then percentages show one decimal, Avg Position shows whole ranks, and Sentiment shows signed points

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-577
- Story: https://onclusive.atlassian.net/browse/GEO-976
