# GEO-912: GEO-581 / 30.3 — Prompt version history (feed API + drawer)

**Story:** GEO-912
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-581
**Cree:** 2026-07-07
**Jira:** https://onclusive.atlassian.net/browse/GEO-912

## User Story
**As** a user in Manage Scope,
**I want** a Google-Docs-style history of prompt changes across my organisation,
**so that** I can see what changed, when, and by whom — with shared visibility and accountability, without any restore.

## Acceptance Criteria
**AC1 — Open the history**

- Given: I am in the Prompts section (READER or EDITOR)
- When: I click "Version history"
- Then: a right-side drawer titled "Prompts Version history" opens, closable via the ✕

**AC2 — Grouped by day with counts**

- Given: prompt changes exist for this report
- When: the drawer is open
- Then: entries are grouped by day ("Today", "March 25, 2026", …), each group header showing the number of changes, and groups are collapsible/expandable

**AC3 — Entry content (who / what / when)**

- Given: a change entry
- When: I read it
- Then: it shows the action + prompt type ("Edited a Competitive prompt", "Added a Visibility prompt", "Deleted a Competitive prompt"), and a line "{actor} · {category} · {market} · {time}"

**AC4 — Diff rendering per action**

- Given: an entry
- When: I read its text
- Then: Edited → previous text struck-through in red + new text in green; Added → new text in green; Deleted → the deleted text struck-through in red

**AC5 — Organisation-wide visibility**

- Given: teammates in my organisation also edited this report's prompts
- When: I open the history
- Then: I see their changes too (not only my own), each attributed to its actor

**AC6 — Read-only (no restore)**

- Given: the history
- When: I view any entry
- Then: there is no restore/revert action — the log is read-only (to undo, users re-edit forward)

**AC7 — Empty state**

- Given: no prompt change has ever been made on this report
- When: I open the drawer
- Then: an empty state is shown (no entries)

**AC8 — Long histories**

- Given: many changes exist
- When: I scroll the drawer
- Then: older entries load progressively (pagination / load-more) — the drawer does not attempt to render the entire history at once

---

## Technical Details
- Reads `prompt_change_log` (written by 30.1); no writes. Retention = keep all → pagination required.
- Backend: `GET /api/v1/reports/{id}/prompts/history?cursor=&limit=50` (role READER), keyset pagination on (created_at, id), org-scoped. Entry DTO returns raw market country/language codes (label built client-side) + category name translated for the entry's market.
- Frontend: `VersionHistoryDrawer.tsx` + `usePromptHistory` infinite query; opened by the button from 30.2; invalidated after any prompt mutation.
- i18n on all copy (4 locales); diff colors from design tokens.

📋 Spec complète : [30-3-prompt-version-history.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-30/30-3-prompt-version-history.md)

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-581
- Story: https://onclusive.atlassian.net/browse/GEO-912
