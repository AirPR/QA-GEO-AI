# GEO-911: GEO-581 / 30.2 — Edit prompts inline in Manage Scope (frontend)

**Story:** GEO-911
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-581
**Cree:** 2026-07-07
**Jira:** https://onclusive.atlassian.net/browse/GEO-911

## User Story
**As** an Editor viewing a report's Manage Scope,
**I want** to see, add, edit and delete the prompts sent to the AI engines — organized per country and per prompt type —
**so that** I can refine my analysis in place without recreating it.

## Acceptance Criteria
_Voir Jira._

## Technical Details
- New components under `components/manage-scope/` (PromptsSection, PromptGroup, Edit/Delete modals); reuse wizard `QuestionItem`.
- Extend `useReportScope` + `types/scope.ts` with the prompt list (from 30.1); new mutation hooks (add/edit/delete) with query invalidation.
- Terminology: Reputation→PERCEPTION, Brand Image→BRAND_IMAGE, Visibility Analysis→VISIBILITY, Competitive Analysis→COMPETITIVE.
- i18n on all copy (4 locales); modal copy exact from Figma.
- ⏳ Reset button: scope pending PM (per-group vs global). Reuses wizard default-generation + AI `adapt-batch`; needs the 30.1 bulk-replace endpoint if in scope.

📋 Spec complète : [30-2-prompt-editor-manage-scope-ui.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-30/30-2-prompt-editor-manage-scope-ui.md)

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-581
- Story: https://onclusive.atlassian.net/browse/GEO-911
