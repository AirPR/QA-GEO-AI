# GEO-663: 23-1 — Remove Share of Voice from Per-Brand Surfaces (Overview + Category)

**Story:** GEO-663
**Statut:** [DONE] Done
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-640
**Cree:** 2026-06-15
**Jira:** https://onclusive.atlassian.net/browse/GEO-663

## User Story
## Story

As an Editor or Reader viewing the Overview and Category dashboards,

## Acceptance Criteria
**AC1** — Given I am on the Overview view, When the Performance KPI row renders, Then it shows exactly 4 KPI cards — Visibility, Avg Position, AI Choice, Sentiment — in that order, And there is no Share of Voice KPI card, And no Good/Fair/Poor quality pill for Share of Voice is rendered.

**AC2** — Given I am on a Category view, When the Performance KPI row renders, Then it shows the same 4 KPI cards (no Share of Voice), And the row layout reflows cleanly for 4 cards (no empty 5th cell / broken grid).

**AC3** — Given I am on the Overview or a Category view, When the Brand Rankings table renders, Then its columns are Rank · Brand · Visibility% · Avg Position · LLM Choice%, And there is no SoV% column (neither header nor any parent or variant row cell).

**AC4** — Given the Brand Rankings table renders with the SoV% column removed, When no explicit user sort is applied, Then the table's default row order is Visibility% descending (D1 resolved), And the "Rank" column reflects that order (rank 1 = highest Visibility%), And the target brand highlight (🏆 / "YOU" badge + amber row) still renders correctly.

**AC5** — Given SOV is removed from both surfaces, When the components render, Then all now-unused SOV-specific i18n strings, tooltips, and quality-band references tied to these two surfaces are removed/unreachable, And no missing-translation-key console warnings are produced.

**AC6** — Given the existing component test suites, When SOV is removed, Then the suites assert the 4-card row and the SoV-less column set, And any test asserting the presence of the SOV card / SoV% column is updated to assert its absence.

📋 Spec complète : [23-1-remove-sov-from-per-brand-surfaces.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-23/23-1-remove-sov-from-per-brand-surfaces.md)

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-640
- Story: https://onclusive.atlassian.net/browse/GEO-663
