# Index - Epic GEO-99

## 📄 Fichiers du Projet

### 1. **README.md** ⭐ Commencer ici
   - Vue d'ensemble des snapshots et tour guidé
   - Architecture des composants
   - Liens rapides vers Jira

### 2. **EPIC.md**
   - Epic GEO-99 complète
   - Synthèse des 3 stories
   - Vue d'ensemble générale

### 3. **STORY_7.1_Immutable_Snapshot_Storage.md**
   - Story GEO-57
   - Immutable Snapshot Storage
   - **Statut:** Backlog
   - **Dépendances:** Aucune

### 4. **STORY_7.2_Snapshot_Navigation.md**
   - Story GEO-56
   - Snapshot Navigation
   - **Statut:** Backlog
   - **Dépendances:** Story 7.1

### 5. **STORY_7.3_Guided_Tour.md**
   - Story GEO-55
   - Guided Tour
   - **Statut:** Backlog
   - **Dépendances:** Story 7.1, optionnellement 7.2

### 6. **epic-data.json**
   - Données structurées en JSON
   - Contient toutes les informations détaillées
   - Format: Epic → Stories → Détails techniques
   - Peut être utilisé pour intégration programmée

## 🔗 Liens Jira

- [Epic GEO-99](https://onclusive.atlassian.net/browse/GEO-99)
- [Story GEO-57](https://onclusive.atlassian.net/browse/GEO-57)
- [Story GEO-56](https://onclusive.atlassian.net/browse/GEO-56)
- [Story GEO-55](https://onclusive.atlassian.net/browse/GEO-55)
- [Projet GEO](https://onclusive.atlassian.net/browse/GEO)

## 📊 Progression

```
[Backlog Story 7.1] Immutable Snapshot Storage
[Backlog Story 7.2] Snapshot Navigation
[Backlog Story 7.3] Guided Tour
```

**Epic Status:** 🔵 **BACKLOG** (0 stories done, 0 to do, 3 backlog)

## 👨‍💼 Détails

- **Epic:** EPIC-007: Snapshots & Guided Tour
- **Assigné à:** Youssef.AitLaydi
- **Créée le:** 2026-03-18
- **Statut:** Backlog
- **Projet:** GEO

## 💡 Comment Utiliser

1. **Pour une vue d'ensemble:** Lisez `README.md`
2. **Pour l'epic complet:** Ouvrez `EPIC.md`
3. **Pour les détails techniques:** Consultez chaque `STORY_X.X.md`
4. **Pour l'intégration:** Utilisez `epic-data.json`

## 🏗️ Composants Clés

- **Immutable Snapshots:** Point-in-time records of analysis execution (Story 7.1)
- **Snapshot Navigation:** Previous/Next controls to compare results over time (Story 7.2)
- **Guided Tour:** Interactive onboarding with contextual tooltips (Story 7.3)
- **Demo Data Support:** Tour works without real report data
- **URL Activation:** Activate tour via `?tour=true` parameter
