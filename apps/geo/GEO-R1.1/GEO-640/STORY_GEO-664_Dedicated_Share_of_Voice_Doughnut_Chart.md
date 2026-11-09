# Story 23.2 — Dedicated Share of Voice Doughnut Chart (Overview + Category)

**Story ID:** GEO-664
**Epic:** GEO-640 — EPIC-023: Share of Voice Dedicated Chart
**Statut:** Done ✅
**Assigné à:** Abdenasser Aroukhsiss
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-664
**Créé le:** 2026-06-15
**Mis à jour:** 2026-06-16

---

## User Story

As an Editor or Reader viewing the Overview and Category dashboards,
I want Share of Voice shown in a dedicated full-width doughnut chart, placed directly below the KPI cards, that compares my brand's share against its top competitors and visually highlights my brand,
so that I can read SOV as the competitive _share_ it actually is instead of a misleading per-brand number.

**Frontend-only.** Reuses `BrandRankingsResponse.rankings[].sov` (per-parent SOV, variants grouped) — no new API. **Design: top 10 + "Others" slice** (node 7666:206807). Ships as one grouped release with 23.1.

---

## Acceptance Criteria

**AC1** — Given the Overview view (and, with parity, a Category view), When the page loads with data, Then a full-width "Share of Voice" card renders directly below the KPI card row, with title "Share of Voice" + subtitle "By brand, your brand is highlighted", and a doughnut comparing the target brand vs top competitors.

**AC2** — Given the doughnut, When it renders, Then it shows the top 10 brands by SOV (descending), And all remaining share is aggregated into a single "Others" slice, And each arc has an outside % callout (callouts < ~2% hidden; legend still lists the brand), And a bottom-centered legend lists each brand (color dot + name + bold %), ordered by SOV desc with "Others" last, And colors are assigned by SOV rank (extended palette + gray "Others").

**AC3** — Given the target brand IS in the top 10, When the doughnut renders, Then its arc is emphasized by size (structural, not a reserved color), And the persistent center label shows the target brand's name + SOV value + "Share of Voice" — even when it is not the largest slice.

**AC3b** — Given the target brand is NOT in the top 10, When the doughnut renders, Then the center label still shows the target brand's name + SOV value (sourced from KPI shareOfVoice), And no slice is popped out or highlighted for it — its share is absorbed into "Others".

**AC4** — Given a brand slice, When its value is computed, Then it uses the aggregated SOV of the brand incl. variants/products — exactly the per-parent-brand SOV from the Brand Rankings data (normalized_name grouping, mention-density), with no separate recomputation.

**AC5** — Given a scope with no responses, When the card would render, Then it shows an empty state ("No data to show" / "Adjust your filters or widen the date range to see this metric") inside the card, keeping the header, never a misleading 0%.

**AC6** — Given the chart data fails to load, When the card renders, Then it keeps its header and shows the error state (crossed-chart icon, "Couldn't load this chart", helper text, Reload button), And clicking Reload re-fetches inline without a full page reload.

**AC7** — Given the chart is fetching, When the request is in flight, Then a loading skeleton occupies the chart area, keeping the card header.

**AC8** — Given market/category/engine/period filters change, When the user updates any filter, Then the doughnut, callouts, legend and center label recompute for the new scope.

**AC9** — Given the new component, When tested, Then unit tests cover: top-10 selection from SOV-desc data, "Others" residual (100 − Σtop10, clamped ≥ 0, last), center label from KPI shareOfVoice (incl. target not largest), callout hiding < ~2%, legend order + colors, empty state, error + reload, loading skeleton.

---

## Liens

- 📋 Spec complète : [23-2-dedicated-sov-doughnut-chart.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-23/23-2-dedicated-sov-doughnut-chart.md)
- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-640
- 🔗 Story liée (ships together) : https://onclusive.atlassian.net/browse/GEO-663
