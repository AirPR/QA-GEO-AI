# Story 17.2: Cookie Banner Phase 1

**Story ID:** GEO-328
**Titre:** Story 17.2 — Cookie Banner Phase 1 (vanilla-cookieconsent v3 React wrapper + initial UI)
**Statut:** ✅ Done
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-328

## User Story

As a first-time GEO user without prior consent on `geo.onclusive.com`,
I want to see a clear cookie consent banner with Accept all / Essential only / Manage preferences options,
So that I can make an informed GDPR-compliant choice before any non-essential script or cookie is loaded.

## Out of Scope

- Custom Settings Grid (17.3)
- Cookie inventory rows (17.4)
- i18n EN/FR (17.5)
- JIT bridge / Privacy fallback (17.6 / 17.7)

## Dependencies

- **Blocked by:** 17.1 (consent state provider) — done.
- **Blocks:** 17.3 (Cookie Preferences Modal UI hooks into the same lib instance).

## Acceptance Criteria

**AC1 — Initial display without cc_cookie**
Given a user lands on GEO with no `cc_cookie` set on `geo.onclusive.com`,
When the GEO app boots and CookieConsentProvider (Story 17.1) is mounted,
Then the cookie banner is rendered at the bottom of the viewport, above all GEO content, with title, description, and three CTAs aligned with Figma Make UP-898.

**AC2 — Accept all**
Given the cookie banner is visible,
When the user clicks Accept all,
Then `useCookieConsentStore.acceptAll()` is called, `cc_cookie` is written with `categories=[necessary, analytics, functional_support]`, the store transitions to `hasRespondedToConsent=true` and `shouldShowBanner=false`, the banner disappears.

**AC3 — Essential only**
Given the cookie banner is visible,
When the user clicks Essential only,
Then `useCookieConsentStore.acceptEssentialOnly()` is called, `cc_cookie` is written with `categories=[necessary]` only, the store transitions to `hasRespondedToConsent=true` and `shouldShowBanner=false`, the banner disappears.

**AC4 — Manage preferences (handoff to 17.3)**
Given the cookie banner is visible,
When the user clicks Manage preferences,
Then the native preferencesModal of vanilla-cookieconsent v3 opens above the banner. The banner stays in the background, no consent committed. 17.2 delivers the lib default shell; the custom Settings Grid is delivered by 17.3.

**AC5 — Persistence until decision**
Given the cookie banner is visible,
When the user reloads without clicking any of the three CTAs,
Then the banner reappears after reload. The lib only writes `cc_cookie` on explicit user action. And no analytics or functional cookie is written before user action.

**AC6 — No display if already consented**
Given the user has previously responded,
When the GEO app boots on a subsequent visit,
Then the banner is not rendered. The lib v3 auto-disables when a valid cookie is detected (synchronized with `shouldShowBanner=false`).

**AC7 — Button styles aligned with Figma (PM 2026-05-06)**
Given the buttons Manage preferences, Essential Only and Accept All are rendered,
When observed visually,
Then the styles strictly follow Figma node 12986:63154: Manage preferences = Ghost primary (transparent, sky-700 text), Essential Only = Stroke neutral (white background, slate-200 border, slate-700 text, soft shadow), Accept All = Filled primary (sky-700 bg, white text). Three CTAs share the same height (36 px Small) and typography (Inter Medium 14/20).
**EXPLICIT LEGAL RISK** — PM decision 2026-05-06: this style abandons the equalWeightButtons principle (anti-dark-pattern ICO PECR / GDPR). PM-approved derogation pending legal review.

**AC8 — Mobile responsive**
Given viewport <768px,
When the banner is rendered,
Then it remains readable, all CTAs tappable (>=44x44 px), buttons stack vertically, no horizontal overflow.

**AC9 — Keyboard and screen reader accessibility**
Given the banner is visible,
When the user navigates by keyboard only,
Then initial focus lands on the first CTA, Tab cycles between the three buttons, Enter/Space activate the focused button, focus is visible (outline >=2px). Markup contains `role=dialog` (lib v3 native). Verified via vitest-axe (0 serious or critical violation).

**AC10 — i18n placeholder**
Given Story 17.5 (i18n EN/FR) is not yet delivered,
When the banner is rendered in 17.2,
Then strings are hardcoded in English with explicit migration marker (`TODO 17.5 — replace with t cookieConsent.banner.*`). The string import path is isolated in `frontend/src/lib/cookieConsent/copy.en.ts` to ease the swap in 17.5.

## Visual Acceptance Criteria — Rectification Option B (2026-05-07)

PM decisions D1-D6 actees 2026-05-07 (Charlotte Hammond / Quentin Reant). D1: Option B (wrapper React custom). D2: ghost-link footer modal maintenu. D3: copy generique GDPR active a ship Epic 17. D4: placement bottom center. D5: inventaire Essential = APP_TOKEN + GEO_OAUTH_REQ + cc_cookie. D6: copy FR draft Sally a valider copywriter avant merge 17.5.

Le rendu DOM lib v3.1.0 est desactive (autoShow:false verifie) ; un composant React `<CookieConsentBanner>` rend la structure DOM Figma exacte.

**B1** — Container : bg white, border 1px slate-200, border-radius 4px (PAS 12px), padding 16px 20px 24px, shadow sh-modal, max-width 1120px, position bottom center.
**B2** — Header title-row contient un container icon 32x32 bg sky-100 radius 4px avec SVG cookie 24x24 color sky-700, gap 13px avec le titre.
**B3** — Title : `<p>` Inter 700 16/22 color slate-900.
**B4** — Subtitle : `<p>` separe (PAS un span dans description), Inter 700 16/22 color slate-600.
**B5** — Description : `<p>` Inter 500 14/20 color slate-600. Active variant Epic 17 (D3) : copy generique GDPR sans `<strong>`.
**B6** — Bouton Manage preferences : Ghost primary, transparent bg, text sky-700, height 36px, padding 0 14px, icone gear 16x16 a gauche avec gap 6px, font Inter 500 14/20.
**B7** — Bouton Essential Only : Stroke neutral, bg white, border 1px slate-200, text slate-700, shadow sh-stroke, height 36px, padding 0 14px, font Inter 500 14/20.
**B8** — Bouton Accept All : Filled primary, bg sky-700, text white, height 36px, padding 0 14px, font Inter 500 14/20, border 0.
**B9** — Hover/active/focus-visible respectent spec (Ghost: bg slate-100; Stroke: bg slate-50; Filled: bg sky-600; focus outline 2px sky-700 offset 2px sur les 3).
**B10** — Responsive <768px : actions stackees verticalement, gap 8px, tous CTAs min-height 44px, pas d'overflow horizontal sur viewport 375x667.
**B11** — A11y : `role=dialog`, `aria-labelledby` pointe sur le H1 title, focus initial sur titre (tabindex=-1) ou 1er CTA, Tab cycle entre les 3 boutons, Enter/Space activent le bouton focuse, 0 violation serious/critical.
**B12** — Aucune string hardcodee hors de `copy.en.generic.ts` (active a ship Epic 17) et `copy.fr.generic.ts` (au ship 17.5).

## Technical Details

- Library: vanilla-cookieconsent v3.x (orestbida) — React wrapper `CookieConsentProvider` mounted in `main.tsx` (Story 17.1).
- Banner config (PM 2026-05-06 Figma override): `layout=box wide`, `position=bottom center`, `flipButtons=false`, `equalWeightButtons=false`.
- Strings hardcoded EN in `frontend/src/lib/cookieConsent/copy.en.ts` with TODO 17.5 marker for the i18n swap.
- File structure: wrapper React `frontend/src/components/cookieConsent/CookieConsentBanner.tsx` (NEW), inventaire `frontend/src/lib/cookieConsent/cookieInventory.ts` (NEW).
- Tests: 16 unit Banner + 6 unit copy gate + 2 unit Provider Option B + config refactor (83/83 verts).

## Definition of Done

- [ ] Cookie banner renders at bottom center with 3 CTAs on first visit
- [ ] Accept all / Essential only / Manage preferences flows all working
- [ ] No banner shown on return visit with valid cc_cookie
- [ ] All Visual ACs B1-B12 verified
- [ ] Mobile responsive and keyboard accessible (vitest-axe 0 violations)

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-328
- Spec complète: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-2-cookie-banner-phase-1.md
- Spec rectification: https://github.com/AirPR/geo-analytics/blob/main/docs/planning-artifacts/ux-design-specification-epic-17.md
- Brief rectification: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-2-rectification-brief.md
