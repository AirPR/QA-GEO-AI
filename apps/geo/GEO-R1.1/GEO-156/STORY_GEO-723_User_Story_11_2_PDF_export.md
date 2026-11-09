# GEO-723: User Story 11.2: PDF export

**Story:** GEO-723
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-156
**Cree:** 2026-06-19
**Jira:** https://onclusive.atlassian.net/browse/GEO-723

## User Story
As a **user**, I want to export my analysis as a PDF, so that I can share a flat, offline document that anyone can open without PowerPoint.

---

## Acceptance Criteria
**AC1 — Export trigger & flow**

- **Given** an analysis with results, **When** I click the export icon button in the toolbar and select "PDF", **Then** a "Your export has started" toast appears immediately and the download begins.
- **Given** the PDF download is ready, **When** it completes, **Then** a "Your export has completed" success toast appears with a "Download Export" action.
- **Given** the export fails, **When** the failure is detected, **Then** an error toast appears with a "Try again" action and no broken file is downloaded.

**AC2 — Same content as PPTX, fixed layout**

- **Given** the PowerPoint deck (Story 11.1), **When** I export to PDF, **Then** I receive the same slides flattened to a fixed-layout document with identical content and ordering.
- **Given** the PDF is generated, **When** I open it, **Then** every slide from the PPTX deck is present (cover + 7 overview slides + 4 slides per category) in the same order, with the same footer on all content slides.

---

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-156
- Story: https://onclusive.atlassian.net/browse/GEO-723
