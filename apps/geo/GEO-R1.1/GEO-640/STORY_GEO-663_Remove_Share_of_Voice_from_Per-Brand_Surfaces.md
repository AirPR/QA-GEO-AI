# Story 23.1 — Remove Share of Voice from Per-Brand Surfaces (Overview + Category)

**Story ID:** GEO-663
**Epic:** GEO-640 — EPIC-023: Share of Voice Dedicated Chart
**Statut:** Done ✅
**Assigné à:** Abdenasser Aroukhsiss
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-663
**Créé le:** 2026-06-15
**Mis à jour:** 2026-06-16

---

## User Story

As an Editor or Reader viewing the Overview and Category dashboards,
I want Share of Voice to no longer appear as a per-brand KPI card with a Good/Fair/Poor quality pill, nor as a column in the Brand Rankings table,
so that I am not misled into reading a competitive _share_ as if it were a per-brand quality score, and SOV has a single, correct home in its dedicated chart (Story 23.2).

**Frontend-only.** Reuses existing data; no backend/DTO/endpoint change. Ships as one grouped release with 23.2 (never independently — else SOV vanishes from all surfaces).

---

## Acceptance Criteria

**AC1** — Given I am on the Overview view, When the Performance KPI row renders, Then it shows exactly 4 KPI cards — Visibility, Avg Position, AI Choice, Sentiment — in that order, And there is no Share of Voice KPI card, And no Good/Fair/Poor quality pill for Share of Voice is rendered.

**AC2** — Given I am on a Category view, When the Performance KPI row renders, Then it shows the same 4 KPI cards (no Share of Voice), And the row layout reflows cleanly for 4 cards (no empty 5th cell / broken grid).

**AC3** — Given I am on the Overview or a Category view, When the Brand Rankings table renders, Then its columns are Rank · Brand · Visibility% · Avg Position · LLM Choice%, And there is no SoV% column (neither header nor any parent or variant row cell).

**AC4** — Given the Brand Rankings table renders with the SoV% column removed, When no explicit user sort is applied, Then the table's default row order is Visibility% descending (D1 resolved), And the "Rank" column reflects that order (rank 1 = highest Visibility%), And the target brand highlight (🏆 / "YOU" badge + amber row) still renders correctly.

**AC5** — Given SOV is removed from both surfaces, When the components render, Then all now-unused SOV-specific i18n strings, tooltips, and quality-band references tied to these two surfaces are removed/unreachable, And no missing-translation-key console warnings are produced.

**AC6** — Given the existing component test suites, When SOV is removed, Then the suites assert the 4-card row and the SoV-less column set, And any test asserting the presence of the SOV card / SoV% column is updated to assert its absence.

---

## Liens

- 📋 Spec complète : [23-1-remove-sov-from-per-brand-surfaces.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-23/23-1-remove-sov-from-per-brand-surfaces.md)
- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-640
- 🔗 Story liée (ships together) : https://onclusive.atlassian.net/browse/GEO-664
