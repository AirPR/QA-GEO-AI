# GEO Top Bar for OS Users - Organisation Switch, Settings & Administration (No UP Navbar)

**Epic ID:** GEO-1035
**Statut:** 🟨 QA In Progress
**Assigné à:** Youssef.AitLaydi
**Créée le:** 2026-07-24
**Mise à jour:** 2026-09-21
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-1035
**Design Figma:** https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0?node-id=13393-81456 — section "GEO OS - Settings & Admin"

---

## Problem

On UP, admin and settings were deliberately merged: interface language and user management live on the GEO settings page (https://geo.onclusive.com/geo/settings), reached via the Settings entry in the UP navbar. The organisation switcher is likewise a UP navbar affordance.

Two capabilities are therefore unreachable for OS users of GEO:

1. **Settings and Administration.** No way to change the interface language, and no way to manage users. The settings page's only entry point is a navbar they do not have.
2. **Organisation switch.** A user who belongs to more than one organisation cannot change the active organisation, so they are locked into whichever organisation they land in and cannot reach the reports of the others.

Both have the same root cause: **GEO's own top bar carries no account affordances when GEO runs inside OS.**

## Decision Context

- The UP experience stays as designed and is not compromised for OS. Admin merged with settings on UP is the coherent target experience.
- The fix is OS-side only, and it is delivered **in GEO's OS top bar, not in the classic OS navbar**. GEO owns that bar in both contexts, so no OS-side navbar change is required.

## Proposed Solution

Three additions to the GEO top bar as rendered for OS users:

1. **Organisation switcher** - left of the bar, beside the GEO logo: avatar, "Organisation" label, active organisation name, chevron.
2. **Avatar dropdown** - right of the bar: user name header, then Administration (super admin only), Settings, Cookie Settings, then Logout.
3. **Home sub-navigation tab** on the Settings and Administration pages, returning the user to GEO in one click. This replaces the "back button" originally proposed; the design uses a Home tab.

## Scope

- Organisation switcher in the GEO top bar for OS users (GEO-1129)
- Home sub-navigation tab on Settings and Administration pages for OS users (GEO-1130)
- Settings entry in the GEO avatar menu for OS users (GEO-1131)

## Out of Scope

- Any change to the UP navbar or the merged UP settings/admin experience.
- Any change to the OS navbar itself.
- The multi-organisation membership model itself (GEO-681). This epic only surfaces the switch in the OS GEO top bar.
- Cookie Settings behaviour, which is unchanged.

## Inherited Behaviour

The organisation switcher in the OS top bar is the same component, with the same behaviour, as the switcher in UP. It is surfaced in a new place; it is not redesigned.

Everything not stated in this epic follows the UP switcher as built under GEO-681 (Epic 35) - default organisation at sign-in, visibility when the user has no organisation, the role tag per row, post-switch data refresh and cache clearing, the transition screen, and the resolution of the organisation list from user_org_memberships.

Any divergence between the OS switcher and the UP switcher is a defect in this epic.

---

## Stories Associées

| Story ID | Titre | Statut |
|----------|-------|--------|
| [GEO-1129](https://onclusive.atlassian.net/browse/GEO-1129) | Organisation switcher in the GEO top bar for OS users | 🟦 Ready for QA |
| [GEO-1130](https://onclusive.atlassian.net/browse/GEO-1130) | Home sub-navigation tab on Settings and Administration for OS users | 🟦 Ready for QA |
| [GEO-1131](https://onclusive.atlassian.net/browse/GEO-1131) | Settings entry in the GEO avatar menu for OS users | 🟦 Ready for QA |

---

## Acceptance Criteria — Synthèse

### Group A — Settings and Administration access

- An OS user with GEO access can open the avatar dropdown in the GEO top bar and reach the GEO settings page from it.
- The Administration entry appears only for a super admin; every other role sees Settings, Cookie Settings and Logout only.
- The settings page offers Preferences (interface language) and User admin, and both behave identically to the UP path.
- From Settings or Administration, the Home tab returns the user to the GEO homepage in one click.
- No change to the UP navbar or the UP settings/admin experience.

### Group B — Organisation switch

- An OS user sees the organisation switcher in the GEO top bar, in the same position and state as a UP user with the same memberships would see it.
- Opening it, searching it, and selecting an organisation behave identically to UP, including the role tag shown per row.
- After a switch, the OS context refreshes exactly as UP does: no data from the previous organisation remains visible, and no manual reload is required.
- The switcher is present on the dashboard, the Settings page and the Administration page.
- No change to the switcher's behaviour on UP.

---

## Liens

- 🔗 Epic : https://onclusive.atlassian.net/browse/GEO-1035
- 🔗 GEO-1129 : https://onclusive.atlassian.net/browse/GEO-1129
- 🔗 GEO-1130 : https://onclusive.atlassian.net/browse/GEO-1130
- 🔗 GEO-1131 : https://onclusive.atlassian.net/browse/GEO-1131
- 🎨 Figma : https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0?node-id=13393-81456
