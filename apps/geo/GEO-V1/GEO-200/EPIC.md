# Cookie Consent for Hubspot/PQL

**Epic ID:** GEO-200
**Statut:** ⏳ Ready for QA
**Assigne a:** Youssef.AitLaydi
**Creee le:** 2026-04-14
**Mise a jour:** 2026-05-18
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-200

## Description / Functional Need

Implement a cookies and cookie policy solution for the Measure module that reuses the existing banner and preferences UI, adheres to the same consent categories, and gates all non-essential cookies and analytics for Measure behind explicit user consent.

This is a legal GDPR requirement for platforms operating in Europe as per [ICO — Cookies and similar technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/).

The Measure module must align with the Review module implementation from [UP-898](https://onclusive.atlassian.net/browse/UP-898) for the following areas.

## Scope

- Reuse the existing cross-application cookie banner and cookie preferences UI used by the Review module for the Measure module.
- Same banner component rendered on all Measure module entry points where cookies may be set or analytics may be loaded.
- Same preferences UI and interaction patterns (toggle controls, save actions, copy) as implemented for Review.
- Consistency in wording, styling, and behaviour, with only module-specific references updated where Measure is explicitly mentioned.
- Figma design attached to this ticket and live prototype: [https://onclusive-cookies-b.figma.site/](https://onclusive-cookies-b.figma.site/)
- Consent categories for Measure: Essential (always on), Support / Functional (opt-in, default off — includes HubSpot and/or Intercom), Analytics (opt-in, default off).
- Consent state for returning users must be respected across all Measure entry points.
- Privacy fallback: when non-essential consent is not granted, the module degrades gracefully (Intercom disabled, email fallback shown — no illegal "Consent Wall").
- Cookie inventory for Measure documented and surfaced via the existing cookie policy UI.

## Out of Scope

- Cross-subdomain cookie sharing between GEO (`geo.onclusive.com`) and 360/Review — not technically possible at this scope level (resolved in Story 17.1 / GEO-327).
- The original "hybrid write strategy" (dual cookie persistence) was abandoned — see GEO-331 (Abandoned).

## Stories Associees

| Story | ID Jira | Titre | Statut |
|-------|---------|-------|--------|
| 17.1 | GEO-327 | Consent State Provider + cc_cookie persistence | ✅ Done |
| 17.2 | GEO-328 | Cookie Banner Phase 1 | ✅ Done |
| 17.3 | GEO-329 | Cookie Preferences Modal | ✅ Done |
| 17.4 | GEO-330 | Cookie Inventory & Essentials Documentation | ✅ Done |
| 17.5a | GEO-331 | Hybrid Write Strategy (abandoned) | Abandoned |
| 17.5b | GEO-332 | i18n EN/FR for Cookie Consent | ✅ Done |
| 17.6 | GEO-333 | Help JIT Bridge Modal "Ready to chat?" | ✅ Done |
| 17.7 | GEO-334 | Privacy Fallback Modal "Your privacy is respected" | ✅ Done |
| — | GEO-237 | Hubspot PQL feedback into Hubspot | 🟨 QA In Progress |
| — | GEO-427 | Upsell page content refresh — align with Figma V2 | ✅ Done |

## Cookie Inventory (Reference from Epic)

| Cookie | Provider | Purpose |
|--------|----------|---------|
| intercom-session-* | Intercom | Enables live chat, instant messaging, and support history features. |
| intercom-id-* | Intercom | Recognizes you to keep your chat history active across pages. |
| HubSpot | HubSpot | Connects your session to our support desk for account context. |

## Functional Requirements Summary

### 1. Cookie banner and preferences UI reuse
Reuse the existing cross-application cookie banner and cookie preferences UI from the Review module. Ensure the same banner component is rendered on all Measure module entry points. Maintain consistency in wording, styling, and behaviour.

### 2. Consent categories and defaults
- **Essential:** always on, cannot be disabled.
- **Support / Functional:** opt-in, default off — must include HubSpot and/or Intercom.
- **Analytics:** opt-in, default off (equivalent to Fullstory in Reputation).

### 3. Privacy fallback behaviour
When the user clicks "I'd still like to stay private" on the Bridge Modal: Intercom is disabled, and the user is shown a message offering email support as an alternative. This ensures no illegal "Consent Wall".

### 4. Cookie inventory for Measure
Measure-specific cookies (Intercom, HubSpot) documented and surfaced via the cookie policy UI, with category and purpose specified for each entry.

## Acceptance Criteria — Synthese

- The cookie banner and preferences UI are visible and fully functional on all Measure module entry points that may set cookies or load analytics.
- Consent categories for Measure are exactly: Essential, Support / Functional, Analytics — non-essential categories default to off for users without an existing consent record.
- Triggering Measure-specific support features shows a JIT consent prompt when Support / Functional consent has not been granted; no support cookies or scripts are loaded if the user does not consent.
- All Measure core workflows operate correctly with only Essential cookies enabled; disabled non-essential functionality shows a clear privacy-related fallback message aligned with Review patterns.
- The cookie inventory clearly identifies Measure-related cookies and providers in the cookie policy UI, with category and purpose specified for each entry.
- Measure cookie and consent-related text appears correctly in all supported languages (EN/FR), matching the behaviour and quality of the Review implementation.
- Analytics scripts and tracking for Measure do not execute unless Analytics consent is granted, and are disabled or stopped when consent is withdrawn.

**Stories-level AC synthesis:**
- GEO-327: Zustand ConsentStateProvider with cc_cookie persistence and reactive getters for areFunctionalCookiesEnabled / areAnalyticsCookiesEnabled.
- GEO-328: Cookie banner visible on first visit, with Accept all / Essential only / Manage preferences options.
- GEO-329: Cookie Preferences Modal with per-category toggles and Save action.
- GEO-330: Cookie inventory grid showing all Measure cookies grouped by category.
- GEO-332: Full EN/FR i18n for all cookie consent text via 360 locale namespace.
- GEO-333: JIT Bridge Modal "Ready to chat?" triggered when clicking Help without Functional consent.
- GEO-334: Privacy Fallback Modal shown when user declines Functional cookies via Bridge Modal.
- GEO-237: HubSpot PQL upsell tracking — POST /geo/api/upsell/hubspot gated on Functional consent, with JIT prompt if not granted.
- GEO-427: Upsell page content aligned to Figma V2 (3 showcases, updated feature cards).

## Implementation Tasks

- Review existing Review module implementation from [UP-898](https://onclusive.atlassian.net/browse/UP-898) to document reusable components, consent flows, and integration points.
- Integrate the shared cookie banner and preferences UI into the Measure module shell so it renders on all relevant Measure pages.
- Identify all Measure support entry points and wrap them with the JIT consent flow for Support / Functional cookies.
- Audit Measure features and scripts to classify all cookies into Essential, Support / Functional, or Analytics; update the shared cookie inventory configuration.
- Implement gating for all Measure analytics scripts so they only run when Analytics consent is granted; ensure teardown when consent is revoked.

## Testing Notes

- Verify behaviour with a fresh user (no prior consent): banner display, default category states, ability to update preferences.
- Test all combinations of consent states (Essential only, Essential + Support/Functional, Essential + Analytics, all) and confirm Measure behaves correctly for each.
- Confirm JIT consent prompts appear only when needed; support tools do not load without consent.
- Use browser dev tools to confirm Measure-specific cookies and analytics scripts are only set/executed when corresponding consent categories are enabled.
- Validate cross-module behaviour: change consent in Review and confirm behaviour in Measure, and vice versa.

## Liens

- Jira Epic: https://onclusive.atlassian.net/browse/GEO-200
- GEO-327: https://onclusive.atlassian.net/browse/GEO-327
- GEO-328: https://onclusive.atlassian.net/browse/GEO-328
- GEO-329: https://onclusive.atlassian.net/browse/GEO-329
- GEO-330: https://onclusive.atlassian.net/browse/GEO-330
- GEO-331: https://onclusive.atlassian.net/browse/GEO-331
- GEO-332: https://onclusive.atlassian.net/browse/GEO-332
- GEO-333: https://onclusive.atlassian.net/browse/GEO-333
- GEO-334: https://onclusive.atlassian.net/browse/GEO-334
- GEO-237: https://onclusive.atlassian.net/browse/GEO-237
- GEO-427: https://onclusive.atlassian.net/browse/GEO-427
- Figma prototype: https://onclusive-cookies-b.figma.site/
- Reference epic (Review module): https://onclusive.atlassian.net/browse/UP-898
