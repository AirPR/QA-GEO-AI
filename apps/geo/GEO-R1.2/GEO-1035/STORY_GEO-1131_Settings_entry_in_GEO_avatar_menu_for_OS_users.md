# GEO-1131: Settings entry in the GEO avatar menu for OS users

**Story ID:** GEO-1131
**Titre:** Settings entry in the GEO avatar menu for OS users
**Statut:** 🟦 Ready for QA
**Assigné à:** Youssef.AitLaydi
**Epic:** GEO-1035
**Créée le:** 2026-09-17
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-1131

---

## User Story

> As a GEO user signed in through Onclusive Social, I want a "Settings" entry in the GEO avatar menu, so that I can reach the settings page — interface language and user management — without depending on a navbar I do not have.

Covers part of **Group A** of the epic's acceptance criteria — the avatar dropdown.

**Depends on** the sibling story "Home sub-navigation tab on Settings and Administration" (GEO-1130): without it, the Settings page is a navigation dead end in Onclusive Social mode. The two must ship in the same release.

---

## Acceptance Criteria

**AC1 — The entry exists and leads to the Settings page**

- Given: a user signed in to GEO from Onclusive Social
- When: they open the avatar menu in the top bar
- Then: they see a "Settings" entry, and clicking it takes them to the GEO settings page and closes the menu

**AC2 — The entry is visible for every role**

- Given: a user on the Onclusive Social top bar, whatever their role (Reader, Editor, Admin, Super Admin)
- When: they open the avatar menu
- Then: the "Settings" entry is visible

Rationale: the settings page carries the interface language, which is available to everyone. Its "User admin" tab already enforces its own access rules.

**AC3 — Menu order follows the design**

- Given: a super admin on the Onclusive Social top bar
- When: they open the avatar menu
- Then: the entries appear in this order — Administration, Settings, Cookie Settings, Logout — with no "Help" entry and no timezone footer

- Given: a Reader or an Editor on the Onclusive Social top bar
- When: they open the avatar menu
- Then: the entries appear in this order — Settings, Cookie Settings, Logout — with no "Administration" entry, no "Help" entry and no timezone footer

**AC4 — The Unified Platform avatar menu does not change**

- Given: a user who sees the Unified Platform top bar
- When: they open the avatar menu
- Then: there is no "Settings" entry, the "Administration" entry keeps its current appearance including its role badge, the "Help" entry and the timezone footer are still present, and the menu is in every respect identical to before this story

**AC5 — The page reached is the same as via the Unified Platform path**

- Given: a user who reached the settings page from the avatar menu
- When: they change their interface language or manage users
- Then: the behaviour is strictly identical to the Unified Platform path

**AC6 — Translation**

- Given: a user whose interface language is fr-FR, en-US, en-GB or es-ES
- When: they open the avatar menu
- Then: the "Settings" entry is shown in their language

**AC7 — The entry is disabled on the Upsell page**

- Given: a user on the Onclusive Social top bar, without module access, on the upsell page
- When: they open the avatar menu
- Then: the "Settings" entry is visible but disabled, and clicking it triggers no navigation

Rationale: without this guard the click would bounce the user straight back to the upsell page through a full page reload. The Unified Platform path already applies exactly this guard.

---

## Design Acceptance Criteria

**AC-D1 — The Settings entry follows the menu item style**

Same typography, padding and hover behaviour as "Cookie Settings" and "Logout". No icon, no badge.

**AC-D2 — The Administration item is flattened, on Onclusive Social only**

- Given: an admin or super admin on the Onclusive Social top bar
- When: they open the avatar menu
- Then: the "Administration" entry is styled exactly like the other entries, with no tinted background, no icon and no role badge

- Given: an admin or super admin on the Unified Platform top bar
- When: they open the avatar menu
- Then: the "Administration" entry keeps its tinted background, its icon and its role badge

Accepted impact, on Onclusive Social only: the "super"/"admin" role badge disappears there. This is a deliberate visual regression to match the design.

---

## Technical Details

- The avatar dropdown is shared between both top bars, so all three changes — the Settings entry, the flattened Administration item, and hiding Help plus the timezone footer — are conditional on the Onclusive Social top bar. Unified Platform is untouched, which is the point of AC4.
- The epic's "Administration only for a super admin" requirement needs no code: no account currently carries the Admin role, so the existing guard already produces that behaviour.
- Scope is frontend only. No change to the Onclusive Social navbar itself, and none to Unified Platform.
- Design: Figma file xctSRqtM653zRS7QY3KMm0 — avatar dropdown 13379:60321.

---

## Dépendances

- **Bloque :** —
- **Bloquée par :** GEO-1130 — without the Home tab, the Settings page is a navigation dead end in OS mode; must ship in same release

---

## Definition of Done

- [ ] "Settings" entry is visible in the OS avatar menu for all roles (Reader, Editor, Admin, Super Admin)
- [ ] Clicking "Settings" navigates to the GEO settings page and closes the menu
- [ ] Settings page behaviour is identical to the UP path
- [ ] Super admin sees: Administration, Settings, Cookie Settings, Logout (no Help, no timezone footer)
- [ ] Reader/Editor sees: Settings, Cookie Settings, Logout (no Administration, no Help, no timezone footer)
- [ ] UP avatar menu is unchanged (no Settings entry, Administration keeps badge, Help and timezone footer present)
- [ ] "Settings" entry is translated per the active interface language
- [ ] "Settings" entry is visible but disabled on the Upsell page
- [ ] "Administration" entry in OS mode has no tinted background, no icon, no role badge

---

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-1035
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-1131
- 🔗 Story dépendante : https://onclusive.atlassian.net/browse/GEO-1130
- 📋 Spec externe : https://github.com/AirPR/geo-analytics/blob/hotfix/GEO-1035-geo-top-bar-for-os-users/docs/implementation-artifacts/epics/epic-44/44-3-settings-entry-in-the-geo-avatar-menu.md
- 🎨 Figma : https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0?node-id=13379-60321
