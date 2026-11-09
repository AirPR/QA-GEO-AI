# GEO-675: 24-4 — Concepts Render When One Engine Returns Nothing (US 1.4)

**Story:** GEO-675
**Statut:** [DONE] Done
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-648
**Cree:** 2026-06-16
**Jira:** https://onclusive.atlassian.net/browse/GEO-675

## User Story
## In plain terms

Now that **every** engine (not just Gemini) must return concepts, a weaker engine might occasionally return a broken or empty answer. This story makes sure that if one engine returns nothing usable, the **Top Concepts panel still shows the concepts from the other engines** instead of going blank. It also keeps **old reports** (created before this change) displaying correctly during the rollout.

## Acceptance Criteria
**AC1** — Given one AI engine returns no usable sources for a given analysis type, When the Top Concepts panel renders, Then concepts still render from the engines that did return sources, and the panel is not blanked by the one engine returning nothing.

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-648
- Story: https://onclusive.atlassian.net/browse/GEO-675
