# Story 6: GEO Analytics report — structural refactor (layout / visual)

**Story ID:** GEO-445
**Titre:** GEO Analytics report — structural refactor (layout / visual)
**Type:** Story
**Statut:** ⏳ Ready for QA
**Assigné à:** Youssef.AitLaydi
**Epic:** GEO-440 (Design Updates fix version 0.4)
**Créée le:** 2026-05-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-445

## Description

Apply the following changes to the GEO Analytics report page (Measure -> GEO Analytics, brand example: Adidas). This is a layout / visual refactor — do NOT touch data fetching, props, or component contracts.

## Changes Required

### 1. Remove the horizontal "Top Section" bar
Delete the row at the top of the content area containing:
- back-arrow + brand logo + brand name + "Generated [date]" (left)
- Analysis-date, LLM-Engines, Markets dropdowns (right)

This entire bar must not render.

### 2. Relocate the brand block into the left sidebar
Move the brand block (back-arrow + 40x40 logo + brand name + generated-date subtext) to the top of the left sidebar:
- position: top of sidebar, y = 0, height ~ 69 px
- sidebar width: 240 px → 254 px
- existing "Overview" / "Categories" nav items shift down to sit BELOW the brand block

### 3. Merge filter dropdowns into the section-tab row
The three filter dropdowns move into the same 48 px row as the Identity / Performance / Sources tabs:
- section tabs left-aligned, filter dropdowns right-aligned
- single row; must not wrap at viewport widths >= 1280 px

### 4. Delete the in-content "Overview" heading
Remove the H1 "Overview" rendered at the top of the content area. Content starts directly with the AI Perception Summary card.

### 5. Drop named section containers
Remove the "Corporate Reputation" wrapper container and its heading. Cards (Brand Image, Employer Brand, ESG / Sustainability, Leadership, etc.) sit directly on the page background — no wrapper card, no shared border.

### 6. Add uppercase section anchors
Add three non-interactive section labels matching the tab nav:
- `IDENTITY` — above identity charts
- `PERFORMANCE` — above performance charts
- `SOURCES` — above the sources table

Style:
- font-family: Inter
- font-weight: 700
- font-size: 16px
- text-transform: uppercase
- letter-spacing: 0.04em

### 7. Apply the new spacing rhythm
Use flex / grid gap (not child margins):
- gap between adjacent charts WITHIN a section: 16px
- gap BETWEEN sections (e.g. IDENTITY → PERFORMANCE): 24px

## Constraints

- Do not modify the global topbar (product logo + user avatar) or the global side nav (Mention / Review / Contact / Measure / Settings / Help / Log out).
- Keep all existing props, data fetching, and component contracts intact.
- Verify at 1280, 1440 and 1920 px widths: the tab + filter row must not wrap.
- Verify the "above-the-fold" content of the report now begins with the AI Perception Summary fully visible plus the start of the IDENTITY group.

## Acceptance Criteria

No structured AC available — see constraints and design reference.

## Definition of Done

- [ ] All 7 layout changes applied
- [ ] No data fetching or component contract modifications
- [ ] Tab + filter row does not wrap at 1280px, 1440px, 1920px
- [ ] Above-the-fold starts with AI Perception Summary + IDENTITY group
- [ ] Code reviewed and approved

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-440
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-445
- 📋 Figma : https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=6368-78934&t=5Lap68uPMkXtw9Ki-0
