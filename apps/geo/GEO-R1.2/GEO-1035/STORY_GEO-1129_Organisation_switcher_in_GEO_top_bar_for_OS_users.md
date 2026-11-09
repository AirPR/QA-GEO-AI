# GEO-1129: Organisation switcher in the GEO top bar for OS users

**Story ID:** GEO-1129
**Titre:** Organisation switcher in the GEO top bar for OS users
**Statut:** 🟦 Ready for QA
**Assigné à:** Youssef.AitLaydi
**Epic:** GEO-1035
**Créée le:** 2026-09-17
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-1129

---

## User Story

> As a GEO user signed in through Onclusive Social who belongs to several organisations, I want the organisation switcher in the GEO top bar, so that I can change the active organisation and reach the reports of the others instead of being locked into the one I land in.

Covers **Group B** of the epic's acceptance criteria.

---

## Acceptance Criteria

**AC1 — The switcher is present and correctly placed**

- Given: a user signed in to GEO from Onclusive Social
- When: they look at the top bar
- Then: the organisation switcher appears on the left, immediately right of the logo, showing the avatar, the "Organisation" label, the active organisation name and a chevron

**AC2 — Behaviour is strictly the Unified Platform one**

- Given: a user on the Onclusive Social top bar opens the switcher
- Then: they see the list of their organisations with a search field, each row carries the role tag for that organisation, the active organisation is visually distinguished, and an organisation where they are suspended stays visible but is not selectable

**AC3 — Switching refreshes the context**

- Given: a user on the Onclusive Social top bar selects another organisation
- Then: a transition screen is shown during the switch, no data from the previous organisation remains visible afterwards, and no manual reload is required

**AC4 — The switcher is present on all three pages**

- Given: a user on the Onclusive Social top bar
- When: they are on the dashboard, the Settings page or the Administration page
- Then: the organisation switcher is present in the top bar, in the same state

**AC5 — Absent for accounts without organisation access**

- Given: a user with no organisation assigned, or whose account carries an access restriction
- When: they look at the Onclusive Social top bar
- Then: no organisation switcher is shown, and the rest of the top bar renders normally

**AC6 — The Unified Platform top bar does not change**

- Given: a user who sees the Unified Platform top bar
- When: they use the organisation switcher
- Then: its placement, appearance and behaviour are identical to before this story

---

## Design Acceptance Criteria

**AC-D1 — The logo becomes "Onclusive GEO"**

- Given: a user on the Onclusive Social top bar
- When: they look at the top-left corner
- Then: the logo shown is "Onclusive GEO", not "Onclusive Social"

**AC-D2 — Top bar geometry**

Logo 94×38, 12px gap, then the switcher in a 180×40 box. Left-aligned, 20px from the edge, vertically centred in a 48px bar.

**AC-D3 — The switcher reuses the Unified Platform appearance unchanged**

No restyling. The OS mock-up and the existing UP component describe the same box.

---

## Technical Details

- Inherited behaviour: this is the same component as the UP switcher built under GEO-681 (Epic 35). Any divergence between the OS switcher and the UP switcher is a defect.
- Scope is frontend only, in GEO's own OS top bar. No change to the Onclusive Social navbar itself, and none to Unified Platform.
- Design: Figma file xctSRqtM653zRS7QY3KMm0, section 13393:81456 — wrapper 14430:106627, Brand Dropdown 14424:20504, logo 13379:20071.
- Independent of the two sibling stories — recommended to start with this one.

---

## Dépendances

- **Bloque :** GEO-1130 (sibling), GEO-1131 (sibling) — all three stories ship in same release
- **Bloquée par :** —

---

## Definition of Done

- [ ] Organisation switcher appears in GEO OS top bar immediately right of logo
- [ ] Switcher shows avatar, "Organisation" label, active org name and chevron
- [ ] Switcher behaviour is identical to the Unified Platform one (GEO-681)
- [ ] Switching organisation triggers transition screen and refreshes context without manual reload
- [ ] Switcher is present on dashboard, Settings page and Administration page
- [ ] Switcher is absent when user has no organisation assigned
- [ ] Unified Platform top bar is unchanged
- [ ] Logo reads "Onclusive GEO" not "Onclusive Social" in OS mode

---

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-1035
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-1129
- 📋 Spec externe : https://github.com/AirPR/geo-analytics/blob/hotfix/GEO-1035-geo-top-bar-for-os-users/docs/implementation-artifacts/epics/epic-44/44-1-organisation-switcher-in-the-os-top-bar.md
- 🎨 Figma : https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0?node-id=13393-81456
