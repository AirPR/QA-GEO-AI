# GEO-722: User Story 11.1: PowerPoint deck export

**Story:** GEO-722
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-156
**Cree:** 2026-06-19
**Jira:** https://onclusive.atlassian.net/browse/GEO-722

## User Story
As a **user**, I want to export my analysis as a branded PowerPoint deck, so that I can present the findings to stakeholders with an editable, native-shapes presentation.

---

## Acceptance Criteria
**AC1 — Export trigger & flow**

- **Given** an analysis with results, **When** I click the export icon button in the dashboard toolbar and select "Presentation .pptx", **Then** a "Your export has started" toast appears immediately and the download begins.
- **Given** the PPTX download is ready, **When** it completes, **Then** a "Your export has completed" success toast appears with a "Download Export" action.
- **Given** the export fails, **When** the failure is detected, **Then** an error toast appears with a "Try again" action and no broken file is downloaded.

**AC2 — Native editable shapes**

- **Given** any chart in the deck, **When** I open it in PowerPoint, **Then** every text element is editable because all charts and visuals are built from native shapes — not images or screenshots.

**AC3 — Footer**

- **Given** the deck is generated, **When** I review any content slide, **Then** it carries a consistent footer: "Onclusive – GEO AI Analysis" on the left, "{Brand} AI Visibility Report – {slide number}" on the right. The cover slide has no footer.

**AC4 — 8 overview slides**

- **Given** the deck is generated, **When** I open it, **Then** the overview section contains exactly these 8 slides:

| Slide | Contents | Cap|
| Cover | Brand name + logo, snapshot date, scope (markets/engines/categories), InBrief lockup "powered by AI Sense" | Summary trimmed to fitting bullets|
| How AI perceives your brand | Corporate reputation: 4 dimensions (Brand Image, Employer Brand, ESG/Sustainability, Leadership) with sentiment + insights | 4 dimensions, up to 3 insights each|
| What your brand is known for | Brand-territory topics as proportional bubbles | Top 8 topics|
| The concepts shaping how you're seen | Concepts by frequency with sentiment + source counts (two columns) | Top 10 concepts|
| How your brand performs across AI engines | 4 KPI cards (Visibility, Avg Position, LLM Choice, Sentiment) + SOV-by-engine donut below; target brand's SOV always shown in donut centre | 4 metrics; donut = top brands + "Others" tail|
| Category performance matrix | Visibility x LLM Choice quadrants (50%/50%), one flag marker per category x market; overlapping markers collapse into lettered cluster bubbles with full-membership panel | All categories + markets plotted; clusters listed in full|
| How you rank against competitors | Brand ranking by visibility; no SOV column | Top 10 brands|
| Which sources shape your AI presence | Media-type split + domains with favorability; subtitle states full domain + citation totals | Top 10 domains|

**AC5 — Per-category sections**

- **Given** the analysis covers categories, **When** I open the deck, **Then** each category adds its own 4-slide section: (a) KPI cards + SOV-by-engine donut, (b) brand prioritization matrix (your brand vs competitors on Visibility x LLM Choice), (c) top 10 concepts, (d) top 10 of N sources.

**AC6 — Export button availability**

- The export button is present on both the Overview page and each Category page.
- Regardless of which page the export is triggered from, the exported deck always covers the **full report** (overview + all categories) — only the active LLM filters and country/language filters are applied. The export is never scoped to a single category. _(PM clarification, 2026-06-21)_

---

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-156
- Story: https://onclusive.atlassian.net/browse/GEO-722
