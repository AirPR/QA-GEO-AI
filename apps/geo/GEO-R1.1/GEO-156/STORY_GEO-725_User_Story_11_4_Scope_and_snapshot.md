# GEO-725: User Story 11.4: Scope and snapshot fidelity

**Story:** GEO-725
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-156
**Cree:** 2026-06-19
**Jira:** https://onclusive.atlassian.net/browse/GEO-725

## User Story
As a **user**, I want every export to reflect the snapshot and scope I am currently viewing, so that the shared artifact matches exactly what I see on my dashboard and nothing is silently dropped.

---

## Acceptance Criteria
**AC1 — Snapshot + scope fidelity**

- **Given** I have selected a specific snapshot and a combination of markets and AI engines, **When** I export to any format (PPTX, PDF, or Excel), **Then** the deck, PDF, and workbook reflect that snapshot and those active LLM + country/language filters.

**AC2 — LLM and country filters respected**

- **Given** I am viewing the dashboard filtered to 2 of 4 available markets and 3 of 5 available AI engines, **When** I export to any format, **Then** the exported artifact contains only data for those 2 markets and 3 engines — not all markets or all engines.

**AC3 — Categories: PPTX/PDF always full**

- **Given** the analysis covers multiple categories, **When** I export to PPTX or PDF from any page (Overview or a category page), **Then** the deck always contains the full report: overview section + one 4-slide section per category, in the same order as the dashboard.

**AC4 — Categories: Excel always full**

- **Given** the analysis covers multiple categories, **When** I export to Excel from any page, **Then** the workbook always contains the full report: Overview tab + Brand Pillars tab + one tab per category + Raw Data tab.

**AC5 — No silent drops**

- **Given** a metric or list is capped on a slide or sheet (e.g. top 10 brands, top 10 domains), **When** I review it, **Then** the full total is still stated on that view (e.g. "Top 10 of 47 domains") so nothing is silently dropped.

**AC6 — Export always covers full report**

- **Given** the export is triggered from any page (Overview or a category page), **When** the export runs, **Then** the exported artifact always covers the **full report** (overview + all categories) — the active LLM filters and country/language filters are applied, but the content is never scoped to a single category. _(PM clarification, 2026-06-21)_

---

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-156
- Story: https://onclusive.atlassian.net/browse/GEO-725
