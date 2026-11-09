# Epic GEO-1035: GEO Top Bar for OS Users

Données importées depuis Jira pour l'epic **GEO-1035: GEO Top Bar for OS Users - Organisation Switch, Settings & Administration (No UP Navbar)**

## Structure du Projet

| Fichier | Description |
|---------|-------------|
| **EPIC.md** | Vue d'ensemble de l'epic, problem statement, proposed solution, AC synthèse |
| **STORY_GEO-1129_Organisation_switcher_in_GEO_top_bar_for_OS_users.md** | Organisation switcher in the GEO top bar |
| **STORY_GEO-1130_Home_sub-navigation_tab_on_Settings_and_Administration_for_OS_users.md** | Home sub-navigation tab on Settings and Administration |
| **STORY_GEO-1131_Settings_entry_in_GEO_avatar_menu_for_OS_users.md** | Settings entry in the GEO avatar menu |
| **INDEX.md** | Index des fichiers et progression |
| **epic-data.json** | Données structurées (source unique de vérité) |

## Epic Overview

GEO users signed in through Onclusive Social (OS) cannot access Settings & Administration, and cannot switch organisations, because these affordances only exist in the UP navbar they don't have. This epic adds three elements to the GEO OS top bar to fix this:

1. **Organisation switcher** (GEO-1129) — left of the bar, same component as UP
2. **Home sub-navigation tab** (GEO-1130) — on Settings and Administration pages, one-click return to GEO
3. **Settings entry** (GEO-1131) — in the avatar dropdown, visible for all roles

The fix is OS-side only and delivered in GEO's own OS top bar. No change to the UP navbar or the OS navbar itself.

## Stories

| ID | Titre | Statut | Lien |
|----|-------|--------|------|
| GEO-1129 | Organisation switcher in the GEO top bar for OS users | 🟦 Ready for QA | https://onclusive.atlassian.net/browse/GEO-1129 |
| GEO-1130 | Home sub-navigation tab on Settings and Administration for OS users | 🟦 Ready for QA | https://onclusive.atlassian.net/browse/GEO-1130 |
| GEO-1131 | Settings entry in the GEO avatar menu for OS users | 🟦 Ready for QA | https://onclusive.atlassian.net/browse/GEO-1131 |

## Accès Direct Jira

- **Epic :** https://onclusive.atlassian.net/browse/GEO-1035
- **GEO-1129 :** https://onclusive.atlassian.net/browse/GEO-1129
- **GEO-1130 :** https://onclusive.atlassian.net/browse/GEO-1130
- **GEO-1131 :** https://onclusive.atlassian.net/browse/GEO-1131
- **Projet :** https://onclusive.atlassian.net/browse/GEO

## Points Clés

- All three stories are frontend-only — no OS navbar changes, no UP changes
- GEO-1129 (switcher) is independent and recommended to start first
- GEO-1130 and GEO-1131 must ship in the same release (GEO-1131 depends on GEO-1130)
- The org switcher is the same component as GEO-681 (Epic 35) — any divergence is a defect
- The Administration entry in OS avatar menu is flattened (no badge, no icon) — deliberate visual regression per design
- "Settings" is disabled (not hidden) on the Upsell page

## Out of Scope

- Any change to the UP navbar or the merged UP settings/admin experience
- Any change to the OS navbar itself
- The multi-organisation membership model (GEO-681)
- Cookie Settings behaviour

## Design

Figma: https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0?node-id=13393-81456 — section "GEO OS - Settings & Admin", frames "GEO OS - Dashboard", "GEO OS - Settings", "GEO OS - Administration (Super Admin)"
