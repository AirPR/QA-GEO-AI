# Story 5: Issue #11: Scroll bar visibility

**Story ID:** GEO-444
**Titre:** Issue #11: Scroll bar visibility
**Type:** Story
**Statut:** ✅ Passed QA
**Assigné à:** Youssef.AitLaydi
**Epic:** GEO-440 (Design Updates fix version 0.4)
**Créée le:** 2026-05-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-444

## Description

**Scrollbar has low contrast and disappears too quickly, creating an accessibility issue.**

The scrollbar currently has very low contrast, making it barely visible. This creates an accessibility issue for users who rely on the scrollbar for precise scrolling. Additionally, the scrollbar disappears too quickly and doesn't reappear when the user hovers over the area on the right side where it should be.

## Proposed Solution

- Change the scrollbar color to slate-400 (`#94A3B8`) for better contrast.
- Make the scrollbar reappear whenever the user hovers over the right side of the container where it's available.

## Acceptance Criteria

No structured AC available — see description for expected behavior.

## Technical Details

- New scrollbar color: slate-400 `#94A3B8`
- Trigger: reappear on hover over the right edge of the scrollable container

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-440
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-444
