# Index — GEO-1513: Action center improvments

## Files

1. **EPIC.md** — Epic overview, scope, out of scope, AC summary
2. **STORY_GEO-1184_Target_Sources_Sort_the_cards_by_the_number_of_prompts_that_.md** — Most prompts sort + prompt count — ⏳ Ready for QA — 3 ACs — depends on GEO-1208 (design, Done)
3. **STORY_GEO-1534_Target_Sources_Firecrawl_usage_above_the_plan.md** — Reuse verdicts confirmed less than N days ago — 🔍 Code Review — 1 expected result (no AC section) — waiting for PO decision on N
4. **README.md** — Epic summary and key points
5. **INDEX.md** — This file
6. **epic-data.json** — Structured data (single source of truth)

## Jira Links

- Epic: https://onclusive.atlassian.net/browse/GEO-1513
- GEO-1184: https://onclusive.atlassian.net/browse/GEO-1184
- GEO-1534: https://onclusive.atlassian.net/browse/GEO-1534
- GEO-1208 (design reference): https://onclusive.atlassian.net/browse/GEO-1208
- Project: https://onclusive.atlassian.net/browse/GEO

## Progress

```
GEO-1513 Action center improvments  [Ready for QA]
├── GEO-1184  Most prompts sort       [Ready for QA]  3 ACs
└── GEO-1534  Firecrawl verdict reuse [Code Review]   1 expected result
(design ref) GEO-1208 [Done]
```

- Ready for QA: 1
- Code Review: 1
- Total: 2 (2 stories, 0 tasks) — 4 criteria

## Details

- **Epic assignee:** Abdenasser Aroukhsiss
- **Created:** 2026-10-20
- **Updated:** 2026-10-22
- **Fix version:** 1.3
- **Status:** Ready for QA
- **Imported:** 2026-10-23

## Key Components

- Target Sources list: sort control, cards ("Used in N prompts"), list view "Prompts" column
- Target Sources details panel: "Prompts associated with this source" (All (N) tab)
- `TargetSourcesService.java` (sort order)
- geo-backend verdict reuse before Firecrawl capture (PR #867), setting N
