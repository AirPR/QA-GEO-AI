# Epic GEO-1513: Action center improvments

Data imported from Jira for epic **GEO-1513: Action center improvments**

> Last Jira sync: 2026-10-23 — 2 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_GEO-1184_Target_Sources_Sort_the_cards_by_the_number_of_prompts_that_.md** | Most prompts sort + prompt count on Target Sources cards |
| **STORY_GEO-1534_Target_Sources_Firecrawl_usage_above_the_plan.md** | Reuse recent verdicts instead of capturing pages again on Firecrawl |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

Fix version 1.3. Two Target Sources / Actions Center improvements: a "Most prompts" sort with a "Used in N prompts" count on each card (GEO-1184, moved from GEO-152 / R1.2, design in GEO-1208), and a Firecrawl cost fix that reuses a verdict confirmed less than N days ago instead of capturing the page again (GEO-1534).

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1184 | Story | [Target Sources] Sort the cards by the number of prompts that use each source | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1184 |
| GEO-1534 | Story | [Target Sources] Firecrawl usage above the plan: the same pages are captured again every day | 🔍 Code Review | https://onclusive.atlassian.net/browse/GEO-1534 |

**Design reference:** GEO-1208 (Design Task, Done) — https://onclusive.atlassian.net/browse/GEO-1208 — Figma: https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17348-160625

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1513
- **Stories:** GEO-1184, GEO-1534
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- GEO-1184: count = distinct prompts citing the domain in the period (not `qualifyingAnswerCitations`), must equal the panel list; ties by failing articles then domain; default sort unchanged.
- GEO-1208 design: sort control in the page header left of the Card/List switch; "Failing articles" / "Most prompts"; "Used in N prompts" line; panel "All (N)"; list view "Prompts" column; choice kept across tabs/views/filters, reset on next visit.
- GEO-1208 open design questions (citations line, filters, panel total, export, wording lock) have no written PO answer; PO wrote "design done ready for dev" on 2026-10-22.
- GEO-1534: backend only (draft PR #867), N = 3 proposed; PR stays in draft until the PO confirms N.

## Out of Scope

- Export unchanged (GEO-1184)
- PDFs without a .pdf address, excluding x.com (GEO-1534)
