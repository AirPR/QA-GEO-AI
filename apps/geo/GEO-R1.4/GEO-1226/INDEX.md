# Index — GEO-1226: Target Sources Improvements for Review Pages

## Files

1. **EPIC.md** — epic overview, scope, 10 epic ACs — Ready for QA
2. **STORY_GEO-1547_List_every_negative_review_of_a_review_p.md** — Story, 7 ACs + 5 technical ACs — Ready for QA
3. **STORY_GEO-1548_Group_the_pages_of_a_review_page_into_on.md** — Story, 7 ACs + 4 technical ACs — Ready for QA — shares the grouping with GEO-1549
4. **STORY_GEO-1549_Show_review_pages_in_the_Target_Sources.md** — Story, 7 ACs + 3 technical ACs — Ready for QA — depends on GEO-1547 (reviews) and GEO-1548 (grouping)
5. **README.md** — summary
6. **INDEX.md** — this file
7. **epic-data.json** — structured data

## Jira Links

- Epic: https://onclusive.atlassian.net/browse/GEO-1226
- GEO-1547: https://onclusive.atlassian.net/browse/GEO-1547
- GEO-1548: https://onclusive.atlassian.net/browse/GEO-1548
- GEO-1549: https://onclusive.atlassian.net/browse/GEO-1549
- Project: https://onclusive.atlassian.net/browse/GEO

## Progress

```
GEO-1226 [Ready for QA]  fixVersion 1.4
├── GEO-1547 Story [Ready for QA]  STORY-49.1: List every negative review of a review page
├── GEO-1548 Story [Ready for QA]  STORY-49.2: Group the pages of a review page into one article
└── GEO-1549 Story [Ready for QA]  STORY-49.3: Show review pages in the Target Sources panel

Not imported: GEO-1204 Bug [Ready for QA] | GEO-1497 Design Task [Done]
```

## Details

- Assignee: Abdenasser Aroukhsiss
- Created: 2026-10-07
- Updated: 2026-11-02
- Status: Ready for QA
- Fix version: 1.4

## Key Components

- Target Sources panel (TargetSourceDetailService) — article grouping, page blocks, chip, Show more
- Judge prompt (Flink, review-v1) — every negative review per page, cap 10, verbatim check
- Prefilter — whole captured page for Review Sites instead of 300-character excerpts
- Card counts and sort, exports (XLSX / PDF / PPTX)
- i18n keys views.targetSources.panel.negativeReviews / showMoreReviews
