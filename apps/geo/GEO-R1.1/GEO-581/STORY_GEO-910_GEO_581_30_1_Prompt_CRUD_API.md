# GEO-910: GEO-581 / 30.1 — Prompt CRUD API + change-log persistence (Manage Scope, backend)

**Story:** GEO-910
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-581
**Cree:** 2026-07-07
**Jira:** https://onclusive.atlassian.net/browse/GEO-910

## User Story
**As** an Editor managing a report's scope,
**I want** to add, edit and delete individual prompts (visibility, competitive, perception per category, and brand image at scope level) per country,
**so that** I can refine what the AI engines are asked without recreating the analysis, with each change recorded for later review.

## Acceptance Criteria
_Voir Jira._

## Technical Details
- New endpoints on `ScopeController`: `POST/PUT/DELETE /reports/{id}/prompts`; extend scope read with the prompt list.
- New append-only table `prompt_change_log` (write side here; read feed in 30.3). Retention: keep all, no cap (PM-confirmed).
- Re-run: reuse `armOneTimeRecollection` — **add + edit arm, delete does not** (DAILY = next daily cron). Doc `1-configuration.md` §1.8.2 is stale vs code → correct it.
- Multi-tenant scoping on every query; single `@Transactional` (all DB, no external I/O).
- ⏳ Conditional: `PUT /prompts:reset` bulk-replace endpoint — only if "Reset to defaults" is confirmed in scope by PM.

📋 Spec complète : [30-1-prompt-crud-and-change-log-api.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-30/30-1-prompt-crud-and-change-log-api.md)

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-581
- Story: https://onclusive.atlassian.net/browse/GEO-910
