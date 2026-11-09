# Story 7: Design "Last analysis" screen to replace loading stage

**Story ID:** GEO-446
**Titre:** Design "Last analysis" screen to replace loading stage
**Type:** Story
**Statut:** 🟨 Requirements Needed
**Assigné à:** Unassigned
**Epic:** GEO-440 (Design Updates fix version 0.4)
**Créée le:** 2026-05-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-446

## Goal

Replace the generic "analysis in progress" loading view with a "last analysis" screen — show the previous report state (cards, charts, citations) with a banner/state indicator that a new analysis is running. Users get value immediately instead of staring at a spinner.

## Scope

- Design the layout: where the "running" status sits, how stale data is signaled (badge / banner / dim), CTA to view live progress
- Cover empty case (first-ever analysis — no previous data → fall back to current loading view)
- Cover error case (last analysis failed)
- Behavior when the new analysis completes (auto-refresh vs notify)

## Acceptance Criteria

No structured AC available — Requirements Needed status. See design reference.

## Dépendances

- **Bloquée par :** GEO-449 (design task must be completed first)

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-440
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-446
- 📋 Figma : https://www.figma.com/file/xctSRqtM653zRS7QY3KMm0?node-id=6426%3A70128&mode=dev
- 🔗 Design task : https://onclusive.atlassian.net/browse/GEO-449
