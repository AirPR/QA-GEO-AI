# QA Test Plan — GEO-1035
## GEO Top Bar for OS Users: Organisation Switch, Settings & Administration

**Updated:** 2026-09-22
**Environment:** Staging
**Priority:** High

**Objective:** GEO runs inside Onclusive Social (OS) without the Unified Platform (UP) navbar. OS users therefore have no way to change their active organisation and no entry point to the GEO settings page. This epic adds three affordances to GEO's own OS top bar: an organisation switcher (left of the bar), an avatar dropdown with a Settings entry and a role-gated Administration entry (right of the bar), and a Home sub-navigation tab on the Settings and Administration pages so users can return to GEO in one click. All three additions are OS-side only; the UP experience is unchanged.

---

### Test Scenarios & Detailed Test Cases

**Organisation Switcher in OS Top Bar (stories: GEO-1129)**

- Scenario 1: Switcher Placement & Anatomy - Verify that an OS user sees the organisation switcher on the left of the GEO top bar, immediately right of the logo, displaying an avatar, the "Organisation" label, the active organisation name and a chevron.
- Scenario 2: Switcher Behaviour Mirrors UP - Verify that opening the OS switcher shows the full list of organisations with a search field, a role tag per row, the active organisation visually distinguished, and a suspended organisation visible but not selectable.
- Scenario 3: Organisation Switch Context Refresh - Verify that selecting another organisation in the OS switcher shows a transition screen during the switch, leaves no data from the previous organisation visible afterwards, and requires no manual reload.
- Scenario 4: Switcher Present on All Three Pages - Verify that the organisation switcher is present and in the same state on the GEO dashboard, the Settings page and the Administration page when accessed in OS mode.
- Scenario 5: Switcher Absent Without Org Assignment - Verify that a user with no organisation assigned sees no organisation switcher in the OS top bar, and that the rest of the top bar renders normally.
- Scenario 6: UP Top Bar Unaffected - Verify that for a UP user the organisation switcher's placement, appearance and behaviour are identical to before this story.
- Scenario 7: Logo Identity in OS Mode - Verify that an OS user sees the "Onclusive GEO" logo in the top-left corner, not the "Onclusive Social" logo.

**Settings & Administration Access via Avatar Menu and Home Tab (stories: GEO-1131 & GEO-1130)**

- Scenario 8: Home Tab on Settings Page - Verify that an OS user on the Settings page sees a sub-navigation bar with two tabs — "Home" and "Settings" — and that the "Settings" tab is marked as active.
- Scenario 9: Home Tab on Administration Page - Verify that a super admin OS user on the Administration page sees a sub-navigation bar with two tabs — "Home" and "Administration" — and that the "Administration" tab is marked as active.
- Scenario 10: Home Tab Navigation - Verify that clicking the "Home" tab from Settings or Administration in OS mode lands the user on the GEO homepage without triggering a full page reload.
- Scenario 11: No Sub-Nav on GEO Homepage - Verify that no sub-navigation bar is displayed below the top bar when an OS user is on the GEO homepage.
- Scenario 12: Active Tab Click Is a No-Op - Verify that clicking the already-active tab ("Settings" on the Settings page, "Administration" on the Administration page) in OS mode produces no navigation and no page reload.
- Scenario 13: Sub-Navigation Tab Labels Translated - Verify that the "Home" and "Settings" / "Administration" tab labels are displayed in the user's active interface language (fr-FR, en-US, en-GB, es-ES).
- Scenario 14: UP Sub-Navigation Unchanged - Verify that for a UP user navigating to Settings or Administration the sub-navigation bar remains a single non-clickable label with the same colours and height as before this story.
- Scenario 15: Settings Entry Opens Settings Page - Verify that an OS user who clicks the "Settings" entry in the GEO avatar menu is taken to the GEO settings page and the menu closes.
- Scenario 16: Settings Entry Visible for All Roles - Verify that the "Settings" entry in the OS avatar menu is visible for all roles: Reader, Editor, Admin and Super Admin.
- Scenario 17: Avatar Menu Order per Role - Verify that a super admin OS user sees the entries in the order Administration → Settings → Cookie Settings → Logout with no Help entry and no timezone footer, and that a Reader or Editor OS user sees Settings → Cookie Settings → Logout with no Administration entry, no Help entry and no timezone footer.
- Scenario 18: UP Avatar Menu Unaffected - Verify that for a UP user the avatar menu contains no "Settings" entry, the "Administration" entry keeps its tinted background, icon and role badge, and the Help entry and timezone footer are still present.
- Scenario 19: Settings Page Behaviour Identical to UP Path - Verify that an OS user who reaches the settings page via the avatar menu can change the interface language and manage users with behaviour strictly identical to the UP path.
- Scenario 20: Settings Entry Translation - Verify that the "Settings" entry label in the OS avatar menu is displayed in the user's active interface language (fr-FR, en-US, en-GB, es-ES).
- Scenario 21: Settings Entry Disabled on Upsell Page - Verify that on the upsell page the "Settings" entry in the OS avatar menu is visible but disabled and clicking it triggers no navigation.
- Scenario 22: Administration Entry Flattened in OS Mode - Verify that in OS mode the "Administration" entry in the avatar menu has no tinted background, no icon and no role badge, while in UP mode it retains all three.

---

### Edge Cases & Boundary Conditions

* Suspended organisation in switcher: a suspended organisation remains visible in the list but cannot be selected.
* Active tab click: clicking the already-active tab in the OS sub-navigation bar produces no navigation and no reload.
* Settings entry on Upsell page: the "Settings" entry is visible but disabled; clicking it must not navigate or trigger a page reload.
* User with no organisation assigned: no switcher is rendered and the rest of the top bar remains intact.
* UP avatar menu isolation: the Administration entry retains its tinted background, icon and role badge on UP regardless of OS changes.

---

### Coverage Summary

| Metric | Count |
|---|---|
| Functional groups | 2 |
| Total scenarios | 22 |
| Edge cases | 5 |
| Functional ACs covered | 22 / 22 |
