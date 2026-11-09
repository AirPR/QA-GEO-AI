# EPIC-32 Persist AI summaries in backend (move from frontend cache to server-side store)

**Epic ID:** GEO-539
**Statut:** 🟨 QA In Progress
**Assigné à:** Abdenasser Aroukhsiss
**Reporté par:** Quentin.Reant
**Créée le:** 2026-05-22
**Mise à jour:** 2026-08-03
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-539
**Fix Version:** 1.2 (2026-09-24)
**Label:** August26

## Description / Functional Need

The AI-narrated summaries shown in the analysis (the bullet-style perception panels on the overview and category views, and any other narrated text) are produced on demand but kept only in the viewer's browser. The same summary is regenerated for every new viewer, every page reload, and every shared-link visitor, because none of them can see what another browser already produced. This adds avoidable cost on every view and slows the panel each time it loads. Downstream consumers — the analysis-ready email and the export — regenerate independently for the same reason, multiplying the waste.

This EPIC keeps generation lazy but persists each summary on the server the moment it is computed. A summary is still produced the first time someone requests a given view; the change is what happens to the result. Once computed, it is stored on the server, identified by the exact combination of inputs that produced it — the analysis, the scope (global or category), the category when the scope is a category, the country (or "all"), and the set of selected AI engines. From the second request onward, any requester with the same inputs receives the stored result with no new generation. When an analysis is rerun, summaries stored from the previous run are invalidated so the next request regenerates against fresh data, and a stored summary that cannot be read back cleanly is treated as if it were never stored.

## Scope

**In scope:**
- The AI perception summaries on the overview and category views (the bullet-list panels)
- Any other narrative block currently generated on demand and held only in the browser
- Server-side persistence of summaries keyed by: analysis + scope + category (when scope=category) + country + set of selected AI engines
- Invalidation of stored summaries when an analysis is rerun
- Graceful handling of unreadable/corrupt stored summaries (regenerate + replace)
- Email and export reuse of stored summaries

**Out of scope:**
- Precomputing summaries before a viewer requests them — generation stays lazy
- Rule-based banners and insights that do not call an AI engine
- Per-question detail panels, which read raw responses rather than summaries

**Still open (non-blocking):**
- Confirm the full inventory of narrative blocks beyond the perception panels that should move to the server-side store

## Stories Associées

| Story | ID | Titre | Statut |
|-------|-----|-------|--------|
| US 1.1 | GEO-539-US1.1 | Generate and store on first request | ⏳ TBD |
| US 1.2 | GEO-539-US1.2 | Serve the stored summary on every repeat request | ⏳ TBD |
| US 1.3 | GEO-539-US1.3 | Identify summaries by their full input combination | ⏳ TBD |
| US 1.4 | GEO-539-US1.4 | Treat an unreadable stored summary as a miss | ⏳ TBD |
| US 1.5 | GEO-539-US1.5 | Email and export reuse stored summaries | ⏳ TBD |

> Note: User stories are defined inline in the epic description. Separate Jira story tickets have not been created yet (Story ID: TBD).

## Acceptance Criteria — Synthèse

- **US1.1:** On first request for a never-generated filter combination, the summary is generated on demand and stored server-side before being returned.
- **US1.2:** On repeat requests for the same filter combination (any browser, session, or shared link), the stored summary is returned with no new generation; the result is identical to what the first requester received.
- **US1.3:** Each distinct combination of (analysis, scope, category?, country, AI engines) has its own stored entry; switching any dimension returns the correct stored or freshly-generated summary.
- **US1.4:** A corrupt or unreadable stored summary is treated as a cache miss — regenerated on demand and the corrupt entry replaced with the fresh result.
- **US1.5:** The analysis-ready email and all exports read from the server-side store rather than triggering independent generation; if no stored summary exists they generate and store it first.

## Liens

- Epic : https://onclusive.atlassian.net/browse/GEO-539
- Projet : https://onclusive.atlassian.net/browse/GEO
