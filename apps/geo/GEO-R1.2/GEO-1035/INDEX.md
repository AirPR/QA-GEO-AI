# INDEX — GEO-1035: GEO Top Bar for OS Users

**Version:** GEO-V1.2
**Epic:** GEO-1035
**Statut:** 🟨 QA In Progress
**Release:** 1.2 (2026-09-24)
**Importé le:** 2026-09-22

---

## Fichiers du Dossier

1. **epic-data.json** — Source unique de vérité, toutes les données structurées de l'epic et des stories
2. **EPIC.md** — Vue d'ensemble, problem statement, proposed solution, AC epic-level
3. **STORY_GEO-1129_Organisation_switcher_in_GEO_top_bar_for_OS_users.md** — Organisation switcher (Group B)
4. **STORY_GEO-1130_Home_sub-navigation_tab_on_Settings_and_Administration_for_OS_users.md** — Home tab on Settings/Admin (Group A)
5. **STORY_GEO-1131_Settings_entry_in_GEO_avatar_menu_for_OS_users.md** — Settings entry in avatar menu (Group A)
6. **README.md** — Overview table, liens, points clés
7. **INDEX.md** — Ce fichier

---

## Liens Jira

- **Epic :** https://onclusive.atlassian.net/browse/GEO-1035
- **GEO-1129 :** https://onclusive.atlassian.net/browse/GEO-1129
- **GEO-1130 :** https://onclusive.atlassian.net/browse/GEO-1130
- **GEO-1131 :** https://onclusive.atlassian.net/browse/GEO-1131
- **Projet GEO :** https://onclusive.atlassian.net/browse/GEO

---

## Progression

```
Epic GEO-1035 — QA In Progress
│
├── GEO-1129 [🟦 Ready for QA] Organisation switcher in the GEO top bar
│   Priority: 1 (highest) — Independent, recommended to start first
│   AC: 6 functional + 3 design
│   GitHub spec: 44-1-organisation-switcher-in-the-os-top-bar.md
│
├── GEO-1130 [🟦 Ready for QA] Home sub-navigation tab on Settings and Administration
│   Priority: 2 — Must ship with GEO-1131
│   AC: 7 functional + 2 design
│   GitHub spec: 44-2-home-sub-navigation-in-os-mode.md
│
└── GEO-1131 [🟦 Ready for QA] Settings entry in the GEO avatar menu
    Priority: 2 — Depends on GEO-1130 (must ship together)
    AC: 7 functional + 2 design
    GitHub spec: 44-3-settings-entry-in-the-geo-avatar-menu.md
```

**Stories: 3 / 3 — Ready for QA**

---

## Détails

| Champ | Valeur |
|-------|--------|
| Epic Assignee | Youssef.AitLaydi |
| Stories Assignee | Youssef.AitLaydi (all) |
| Epic Created | 2026-07-24 |
| Stories Created | 2026-09-17 |
| Epic Updated | 2026-09-21 |
| Fix Version | 1.2 (release 2026-09-24) |
| Component | GEO Module |
| Labels | August26 |

---

## Composants Clés

| Composant | Story | Détails |
|-----------|-------|---------|
| Organisation Switcher | GEO-1129 | Réutilise le composant UP (GEO-681 / Epic 35) sans restyling. Même comportement. |
| GEO OS Top Bar | GEO-1129 | Logo "Onclusive GEO" 94x38, switcher 180x40, barre 48px. |
| Sub-navigation Settings/Admin | GEO-1130 | Barre 45px, fond gris, underline 2px vert (#18ae46) sur l'onglet actif, Home seul cliquable. |
| Avatar Dropdown | GEO-1131 | Shared entre UP et OS. Conditionnellement modifié pour OS uniquement. |

---

## Specs GitHub (hotfix branch)

Toutes les specs sont sur la branche `hotfix/GEO-1035-geo-top-bar-for-os-users` :

- [44-1-organisation-switcher-in-the-os-top-bar.md](https://github.com/AirPR/geo-analytics/blob/hotfix/GEO-1035-geo-top-bar-for-os-users/docs/implementation-artifacts/epics/epic-44/44-1-organisation-switcher-in-the-os-top-bar.md)
- [44-2-home-sub-navigation-in-os-mode.md](https://github.com/AirPR/geo-analytics/blob/hotfix/GEO-1035-geo-top-bar-for-os-users/docs/implementation-artifacts/epics/epic-44/44-2-home-sub-navigation-in-os-mode.md)
- [44-3-settings-entry-in-the-geo-avatar-menu.md](https://github.com/AirPR/geo-analytics/blob/hotfix/GEO-1035-geo-top-bar-for-os-users/docs/implementation-artifacts/epics/epic-44/44-3-settings-entry-in-the-geo-avatar-menu.md)
