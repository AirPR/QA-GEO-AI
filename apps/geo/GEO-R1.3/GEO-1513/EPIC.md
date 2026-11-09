# Action center improvments

**Epic ID:** GEO-1513
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Created:** 2026-10-20
**Updated:** 2026-10-22
**Fix version:** 1.3
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1513

## Description / Functional Need

Action center improvments

_The Jira epic description contains only its title (no comment on the epic). The functional need is carried by its stories: a "Most prompts" sort with a prompt count on the Target Sources cards (GEO-1184), and fewer Firecrawl captures by reusing recent verdicts (GEO-1534)._

## Scope

- GEO-1184 — Target Sources: "Most prompts" sort option and "Used in N prompts" count on each card (moved from GEO-152 / R1.2)
- GEO-1534 — a page whose verdict was confirmed by a capture less than N days ago is not captured again on Firecrawl; its verdict is reused (N = 3 proposed, pending PO)

## Out of Scope

- The export does not change (GEO-1184 / GEO-1208)
- PDFs served without a .pdf address — separate fix in the Actions Center job (GEO-1534)
- Excluding x.com — product decision (GEO-1534)

## Associated Stories & Tasks

| ID | Type | Title | Status |
|----|------|-------|--------|
| GEO-1184 | Story | [Target Sources] Sort the cards by the number of prompts that use each source | ⏳ Ready for QA |
| GEO-1534 | Story | [Target Sources] Firecrawl usage above the plan: the same pages are captured again every day | 🔍 Code Review |

**Design reference (not imported, Design Task):** GEO-1208 — Design the sort by number of prompts on Target Sources (✅ Done) — covers GEO-1184. Figma page "GEO-1208 - Sort by number of prompts": https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17348-160625

**Other child not imported:** GEO-1253 (Bug, Passed QA) — Lite (PQL) result table, "Frequency" header clipped.

## Architecture

- GEO-1184: Target Sources sort (`TargetSourcesService.java`), card + details panel ("Prompts associated with this source"), list view; standalone and OS native shells.
- GEO-1534: geo-backend only (PR #867), verdict reuse before the Firecrawl capture; the Actions Center job is not touched. N is a setting.

## Acceptance Criteria — Summary

- **GEO-1184** (3 ACs): with "Most prompts" selected, cards in descending order of the prompt count shown; card count = number of prompts listed in its panel; default sort and export unchanged when the option is not selected.
- **GEO-1534** (no AC section, 1 expected result): a page confirmed by a capture less than N days ago is not captured again and its verdict is reused (N = 3 proposed, pending PM confirmation).

## Links

- https://onclusive.atlassian.net/browse/GEO-1513
- GEO-1184: https://onclusive.atlassian.net/browse/GEO-1184
- GEO-1534: https://onclusive.atlassian.net/browse/GEO-1534
- GEO-1208 (design): https://onclusive.atlassian.net/browse/GEO-1208
