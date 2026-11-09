# Epic GEO-200: Cookie Consent for Hubspot/PQL

Donnees importees depuis Jira pour l'epic **GEO-200: GEO — Cookie Consent for Hubspot/PQL**

## Structure du Projet

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic |
| **STORY_GEO-327_Consent_State_Provider_cc_cookie.md** | Story 17.1 — Zustand store + cc_cookie persistence |
| **STORY_GEO-328_Cookie_Banner_Phase_1.md** | Story 17.2 — Cookie Banner Phase 1 |
| **STORY_GEO-329_Cookie_Preferences_Modal.md** | Story 17.3 — Cookie Preferences Modal |
| **STORY_GEO-330_Cookie_Inventory_Essentials.md** | Story 17.4 — Cookie Inventory & Essentials |
| **STORY_GEO-331_Hybrid_Write_Strategy_ABANDONED.md** | Story 17.5a — Hybrid Write Strategy (Abandoned) |
| **STORY_GEO-332_i18n_EN_FR_Cookie_Consent.md** | Story 17.5b — i18n EN/FR for Cookie Consent |
| **STORY_GEO-333_Help_JIT_Bridge_Modal.md** | Story 17.6 — Help JIT Bridge Modal "Ready to chat?" |
| **STORY_GEO-334_Privacy_Fallback_Modal.md** | Story 17.7 — Privacy Fallback Modal |
| **STORY_GEO-237_Hubspot_PQL_Feedback.md** | HubSpot PQL upsell tracking (QA In Progress) |
| **STORY_GEO-427_Upsell_Page_Content_Refresh.md** | Upsell page content refresh — Figma V2 |
| **INDEX.md** | Index des fichiers et progression |
| **epic-data.json** | Donnees structurees (JSON) |

## Epic Overview

Implement a GDPR-compliant cookie consent solution for the GEO/Measure module that:

1. Reuses the existing cross-application cookie banner and preferences UI from the Review module.
2. Implements three consent categories: Essential (always on), Support/Functional (opt-in — Intercom + HubSpot), Analytics (opt-in).
3. Provides a JIT (Just-In-Time) consent bridge when users trigger features requiring non-essential cookies.
4. Implements a privacy fallback (no "Consent Wall") for users who decline Functional cookies.
5. Gates HubSpot PQL upsell tracking behind Functional cookie consent.
6. Supports full EN/FR i18n via react-i18next.

This is a legal GDPR requirement for platforms operating in Europe (ICO PECR).

## Stories

| Story | Titre | Statut | Lien Jira |
|-------|-------|--------|-----------|
| 17.1 | Consent State Provider + cc_cookie persistence | Done | https://onclusive.atlassian.net/browse/GEO-327 |
| 17.2 | Cookie Banner Phase 1 | Done | https://onclusive.atlassian.net/browse/GEO-328 |
| 17.3 | Cookie Preferences Modal | Done | https://onclusive.atlassian.net/browse/GEO-329 |
| 17.4 | Cookie Inventory & Essentials Documentation | Done | https://onclusive.atlassian.net/browse/GEO-330 |
| 17.5a | Hybrid Write Strategy | Abandoned | https://onclusive.atlassian.net/browse/GEO-331 |
| 17.5b | i18n EN/FR for Cookie Consent | Done | https://onclusive.atlassian.net/browse/GEO-332 |
| 17.6 | Help JIT Bridge Modal "Ready to chat?" | Done | https://onclusive.atlassian.net/browse/GEO-333 |
| 17.7 | Privacy Fallback Modal "Your privacy is respected" | Done | https://onclusive.atlassian.net/browse/GEO-334 |
| — | Hubspot PQL feedback into Hubspot | QA In Progress | https://onclusive.atlassian.net/browse/GEO-237 |
| — | Upsell page content refresh — Figma V2 | Done | https://onclusive.atlassian.net/browse/GEO-427 |

## Acces Direct Jira

- **Epic:** https://onclusive.atlassian.net/browse/GEO-200
- **GEO-327:** https://onclusive.atlassian.net/browse/GEO-327
- **GEO-328:** https://onclusive.atlassian.net/browse/GEO-328
- **GEO-329:** https://onclusive.atlassian.net/browse/GEO-329
- **GEO-330:** https://onclusive.atlassian.net/browse/GEO-330
- **GEO-331:** https://onclusive.atlassian.net/browse/GEO-331
- **GEO-332:** https://onclusive.atlassian.net/browse/GEO-332
- **GEO-333:** https://onclusive.atlassian.net/browse/GEO-333
- **GEO-334:** https://onclusive.atlassian.net/browse/GEO-334
- **GEO-237:** https://onclusive.atlassian.net/browse/GEO-237
- **GEO-427:** https://onclusive.atlassian.net/browse/GEO-427
- **Projet:** https://onclusive.atlassian.net/browse/GEO

## Points Cles

- Foundation story is GEO-327 (Zustand ConsentStateProvider) — all other stories depend on it.
- GEO uses `cc_cookie` scoped to `geo.onclusive.com` only (cross-subdomain sharing with 360/Review is not possible).
- The "hybrid write strategy" (GEO-331) was abandoned after domain scope clarification.
- Legal risk flagged: banner button styling abandons `equalWeightButtons` principle (PM-approved derogation pending legal review — see GEO-328 AC7).
- FR copies are a draft (Sally) — copywriter/legal review required before production merge.
- GEO-237 (HubSpot PQL tracking) is still in QA as of 2026-05-18 — amended with AC10-AC14 (SeeItInActionModal + 401 fix).

## Out of Scope

- Cross-subdomain cookie sharing between GEO and 360/Review.
- ES, DE, IT translations (deferred — V1 is EN/FR only).
- Intercom Messenger boot and wiring (GEO-243 scope).
- FullStory analytics integration (GEO-244 scope).
