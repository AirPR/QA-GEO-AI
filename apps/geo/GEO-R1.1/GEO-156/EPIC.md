# Export (Excel, PowerPoint, PDF)

**Epic ID:** GEO-156
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Cree:** 2026-04-08
**MAJ:** 2026-07-20
**Jira:** https://onclusive.atlassian.net/browse/GEO-156

## Description
Stakeholders need to take an analysis out of the product: into a slide deck for a presentation, a flat document for offline sharing, and a spreadsheet for their own exploration. This epic delivers three exports that all draw from the same live analysis data, so the numbers always agree with the dashboard.
The PowerPoint deck mirrors the dashboard for the current snapshot and the selected markets, AI engines and categories. It opens with a cover that carries the brand, the snapshot date, the scope and an AI-generated In-Brief summary, then walks through identity, performance and sources at the overall level, and repeats a focused section for each category. Every chart is built from native, editable shapes (not screenshots), so a user can adjust any text after export. The PDF is the same deck flattened to a fixed-layout document for offline sharing. The Excel workbook is the data backbone: an Overview tab, a tab for the corporate-reputation pillars, one tab per category, and a Raw Data tab with one row per question and engine for downstream tooling.
Each export is bounded so a single slide or sheet stays readable: rankings and source lists are capped at the top entries, the share-of-voice chart groups the long tail into "Others", and the brand-territory view shows the strongest topics. The full totals are still surfaced (for example, the source slide states how many domains and citations the top ten were drawn from), so nothing silently disappears. Where a view shows everything (the prioritization matrix plots every category or brand per market, with overlapping points grouped into clusters that are listed in full in a side panel), that is intentional.
---
Story ID: TBD
> As a user, I want to export my analysis as a branded PowerPoint deck, so that I can present the findings to stakeholders.

## Scope
Story ID: TBD

> As a user, I want every export to reflect the snapshot and scope I am viewing, so that the shared artifact matches the dashboard.

Acceptance Criteria:

- Given a selected snapshot and a market and engine selection, When I export to any format, Then the deck, PDF and workbook reflect that snapshot and selection.
- Given the analysis covers multiple categories, When I export, Then each category gets its own deck section and its own workbook tab.
- Given a metric or list is capped on a slide or sheet, When I review it, Then the full total is still stated somewhere on that view so nothing is silently dropped.

---

## Stories
| Story | Titre | Statut |
|-------|-------|--------|
| [GEO-725](https://onclusive.atlassian.net/browse/GEO-725) | User Story 11.4: Scope and snapshot fidelity | [DONE] Passed QA |
| [GEO-724](https://onclusive.atlassian.net/browse/GEO-724) | User Story 11.3: Excel workbook export | [DONE] Passed QA |
| [GEO-723](https://onclusive.atlassian.net/browse/GEO-723) | User Story 11.2: PDF export | [DONE] Passed QA |
| [GEO-722](https://onclusive.atlassian.net/browse/GEO-722) | User Story 11.1: PowerPoint deck export | [DONE] Passed QA |

## Liens
- https://onclusive.atlassian.net/browse/GEO-156
- https://onclusive.atlassian.net/browse/GEO-725
- https://onclusive.atlassian.net/browse/GEO-724
- https://onclusive.atlassian.net/browse/GEO-723
- https://onclusive.atlassian.net/browse/GEO-722
