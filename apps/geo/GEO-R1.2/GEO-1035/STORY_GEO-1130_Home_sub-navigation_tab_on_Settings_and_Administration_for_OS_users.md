# GEO-1130: Home sub-navigation tab on Settings and Administration for OS users

**Story ID:** GEO-1130
**Titre:** Home sub-navigation tab on Settings and Administration for OS users
**Statut:** 🟦 Ready for QA
**Assigné à:** Youssef.AitLaydi
**Epic:** GEO-1035
**Créée le:** 2026-09-17
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-1130

---

## User Story

> As a GEO user signed in through Onclusive Social, I want a "Home" tab on the Settings and Administration pages, so that I can get back to GEO in one click instead of being stranded on a page with no navigation.

Covers part of **Group A** of the epic's acceptance criteria — the Home tab.

---

## Acceptance Criteria

**AC1 — The Home tab exists on the Settings page**

- Given: a user signed in to GEO from Onclusive Social, on the Settings page
- When: they look below the top bar
- Then: they see a navigation bar with two tabs, "Home" and "Settings", with "Settings" marked as active

**AC2 — The Home tab exists on the Administration page**

- Given: a super admin signed in to GEO from Onclusive Social, on the Administration page
- When: they look below the top bar
- Then: they see a navigation bar with two tabs, "Home" and "Administration", with "Administration" marked as active

**AC3 — Return in one click**

- Given: a user on the Onclusive Social top bar, on Settings or Administration
- When: they click the "Home" tab
- Then: they land on the GEO homepage, the report list, with no full page reload

**AC4 — No sub-navigation anywhere else in Onclusive Social mode**

- Given: a user on the Onclusive Social top bar, on the GEO homepage
- When: they look below the top bar
- Then: no sub-navigation bar is shown

**AC5 — The active tab is not a second way to reload the page**

- Given: a user on Settings in Onclusive Social mode
- When: they click the "Settings" tab, already active
- Then: nothing happens

**AC6 — Translation**

- Given: a user whose interface language is fr-FR, en-US, en-GB or es-ES
- When: they open Settings or Administration in Onclusive Social mode
- Then: both tab labels are shown in their language

**AC7 — Unified Platform does not change**

- Given: a user who sees the Unified Platform top bar
- When: they navigate GEO, including Settings and Administration
- Then: the sub-navigation bar is exactly the one from before this story — a single non-clickable label, same colours, same height

---

## Design Acceptance Criteria

**AC-D1 — Appearance of the Onclusive Social sub-navigation**

45px tall bar, same grey background as the top bar, labels 20px from the left edge and 30px apart, 14px dark grey text. The active tab carries a 2px green underline across its full width; the inactive tab has none. No bottom border (unlike the Unified Platform variant).

**AC-D2 — Only the Home tab is clickable**

Cursor and keyboard focus signal only the inactive tab as actionable.

---

## Technical Details

- This story also fixes a defect that already exists: the "Administration" entry is already present in the avatar menu in Onclusive Social mode, so a super admin can already reach the backoffice today and is already stranded there.
- QA note: until the sibling story "Settings entry in the GEO avatar menu" ships, the Settings page has no entry point in Onclusive Social mode. AC1 is therefore only verifiable by typing the URL. AC2 (Administration) is testable normally.
- Scope is frontend only. No change to the Onclusive Social navbar itself, and none to Unified Platform.
- Design: Figma file xctSRqtM653zRS7QY3KMm0 — Settings sub-nav 13393:80936, Administration sub-nav 13393:80988.
- Open design points to confirm with design: the green accent (#18ae46) is an Onclusive Social colour absent from the current GEO palette; the focus ring is currently a GEO blue; on the backoffice this stacks two levels of tabs.

---

## Dépendances

- **Bloque :** GEO-1131 (must ship in same release)
- **Bloquée par :** —

---

## Definition of Done

- [ ] Sub-navigation bar (Home + Settings tabs) is visible on the Settings page in OS mode
- [ ] Sub-navigation bar (Home + Administration tabs) is visible on the Administration page in OS mode
- [ ] "Settings" / "Administration" tab is marked as active with 2px green underline
- [ ] Clicking "Home" tab navigates to GEO homepage without full page reload
- [ ] No sub-navigation bar shown on GEO homepage in OS mode
- [ ] Clicking the already-active tab does nothing
- [ ] Tab labels are translated per the active interface language
- [ ] Unified Platform sub-navigation bar is unchanged

---

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-1035
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-1130
- 📋 Spec externe : https://github.com/AirPR/geo-analytics/blob/hotfix/GEO-1035-geo-top-bar-for-os-users/docs/implementation-artifacts/epics/epic-44/44-2-home-sub-navigation-in-os-mode.md
- 🎨 Figma : https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0?node-id=13393-80936
