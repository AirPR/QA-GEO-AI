# Story 3: Issue #10: LLM Engines Citation Sources — expanding one Citation Signal card resizes all others and creates unnecessary scroll

**Story ID:** GEO-442
**Titre:** Issue #10: LLM Engines Citation Sources — expanding one Citation Signal card resizes all others and creates unnecessary scroll
**Type:** Story
**Statut:** 🟨 Action Needed
**Assigné à:** Youssef.AitLaydi
**Epic:** GEO-440 (Design Updates fix version 0.4)
**Créée le:** 2026-05-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-442

## Description

Currently, when one Citation Signal card in the details panel is expanded, it stretches all the other cards to match its height. If any of them contains a long list of questions/topics, this creates an unnecessary scroll on the whole details panel.

## Proposed Solution

- When the user clicks **+N more**, show only 2–3 questions/topics at a time (depending on their length). The user then scrolls _inside_ the card to see the rest, so the card height stays bounded.
- On hover, the external link icon appears on each source row to indicate that clicking opens the source in a new tab. The click target spans the whole row, not just the icon.

## Acceptance Criteria

No structured AC available — see description and Figma reference for expected behavior.

## Technical Details

- Scroll behaviour: contained within the expanded card, not the panel
- Click target: full row (not icon only)
- Link: opens source in new tab on click

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-440
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-442
- 📋 Figma : https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=5405-9357&t=AKEbXoZ6BKSGhsc0-4
