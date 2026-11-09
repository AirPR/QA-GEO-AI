# Story 17.7: Privacy Fallback Modal "Your privacy is respected"

**Story ID:** GEO-334
**Titre:** Story 17.7 — Privacy Fallback Modal "Your privacy is respected"
**Statut:** ✅ Done
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-334

## Story Narrative

As a **GEO user who declined to enable live chat (Functional cookies)**,
I want **a confirmation modal that respects my privacy choice and offers me an alternative way to contact support (email)**,
So that **I don't feel locked out of getting help just because I declined cookies — GDPR-compliant fallback ("no consent wall")**.

## Context

- Pulled in-scope Epic 17 from GEO-243 by PM decision 2026-05-06 (Figma review).
- Figma node `12988:10517` (file `msZlgB0O4kKPc3jlwegBKx`, "Layout - Navigation").
- Triggered when user clicks "I'd still like to stay private" in JIT Bridge Modal (Story 17.6).

## Dependencies

- **Bloque par:** 17.6 (the store extends `isPrivacyFallbackModalOpen` state + actions, added in 17.6 Task 2.1).
- **Soft sync:** 17.5 (i18n keys `privacyRespected.*`).
- 17.6 + 17.7 can be delivered in the same PR (tight logical coupling, short scope each).

## Risks

- Email address `support@onclusive.com` to confirm with PM before merge (placeholder Figma is fictional).

## Acceptance Criteria

**AC1 — Trigger condition**
**Given** the JIT Bridge Modal (Story 17.6) is open
**When** the user clicks "I'd still like to stay private"
**Then**:
- Le JIT Bridge Modal se ferme.
- Le Privacy Fallback Modal s'ouvre immediatement (meme frame React, pas de flash de fond entre les deux modals).
- Aucun changement dans le store cookie consent.

**AC2 — Layout & content (Figma node 12988:10517)**
**Given** the modal is open
**When** rendu
**Then**:
- Header: icone check_circle 24x24 verte (text-green-700), titre "Your privacy is respected" (Inter Semi-Bold 16/22). Close icon 20x20 en haut a droite.
- Body: description Inter Medium 14/20 slate-600 + email card (container slate-50, border 1px slate-200, radius 4px, padding 16px) avec icone mail dans cercle sky-200 (radius 9999px, padding 10px, icone 16px sky-700) + 3 lignes texte (label slate-900, email sky-600 mailto:, help text slate-500).
- Footer: bouton unique "Close" (Stroke neutral, Medium 40).
- Modal width 480px, border-radius 4px, shadow modal standard.

**AC3 — Email link**
**Given** le modal est rendu
**When** the user clique sur support@onclusive.com
**Then** le browser ouvre le client email via `mailto:support@onclusive.com`. Le modal reste ouvert (pas de fermeture automatique).

**AC4 — Close action**
**Given** le modal est ouvert
**When** the user clique sur "Close", OU sur la croix, OU presse Escape
**Then**:
- Le modal se ferme.
- Aucune autre action (pas de re-open du JIT Bridge, pas de modification du store).

**AC5 — Accessibilite clavier & lecteur d'ecran**
**Given** the modal is open
**When** l'utilisateur navigue uniquement au clavier
**Then**:
- Focus trap actif tant que le modal est ouvert.
- Tab cycle dans l'ordre logique : titre -> close icon -> email link -> Close button.
- Escape ferme (equivalent Close — AC4).
- Markup: `role="dialog"`, `aria-labelledby` pointant sur le titre.
- L'icone check verte est marquee `aria-hidden="true"`.

**AC6 — Responsive mobile**
**Given** the user accede sur un viewport < 768px
**When** le modal est rendu
**Then** le modal occupe `calc(100vw - 32px)`. Bouton Close min-height 44px.

**AC7 — i18n EN/FR**
**Given** Story 17.5 livre les copies EN/FR pour `privacyRespected.*`
**When** le modal est rendu
**Then** toutes les strings sont sourcees via i18n — aucune string EN hardcodee. Seule l'adresse email reste fixe (proper noun).

**AC8 — Pas d'opt-out additionnel**
**Given** le user ouvre ce modal
**When** il l'utilise (lit le contenu, click email, click Close)
**Then** aucune ecriture au store cookie consent. L'utilisateur reste avec son consent state d'avant le JIT Bridge. Le modal est purement informatif.

## Definition of Done

- [ ] Privacy Fallback Modal opens from "I'd still like to stay private" in JIT Bridge Modal
- [ ] No consent state changes on any interaction with this modal
- [ ] mailto:support@onclusive.com link opens email client
- [ ] Close / X / Escape all close modal with no side effects
- [ ] All AC1-AC8 verified via unit tests
- [ ] Keyboard accessible with focus trap

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-334
- Spec complète: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-7-privacy-fallback-modal.md
