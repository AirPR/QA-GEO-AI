# Index — GEO-1209: Unbranded Analysis and Other Prompts

## Files

1. **EPIC.md** — Epic overview, scope, out of scope, AC summary
2. **STORY_GEO-1241_Choose_the_analysis_type.md** — STORY-46.1 Choose the analysis type — ⏳ Ready for QA — 13 ACs
3. **STORY_GEO-1242_Run_an_analysis_without_a_target_brand.md** — STORY-46.2 Run an analysis without a target brand — ⏳ Ready for QA — 10 ACs
4. **STORY_GEO-1243_Show_an_Overview_built_for_a_topic.md** — STORY-46.3 Show an Overview built for a topic — ⏳ Ready for QA — 12 ACs
5. **STORY_GEO-1244_Show_the_Category_view_and_the_prompts_f.md** — STORY-46.4 Show the Category view and the prompts for a topic — ⏳ Ready for QA — 8 ACs
6. **STORY_GEO-1245_Adapt_the_Actions_Center_the_export_and.md** — STORY-46.5 Adapt the Actions Center, the export and the emails for a topic — ⏳ Ready for QA — 3 ACs
7. **STORY_GEO-1246_Manage_the_prompts_of_an_unbranded_analy.md** — STORY-46.6 Manage the prompts of an unbranded analysis — ⏳ Ready for QA — 2 ACs
8. **STORY_GEO-1247_Classify_prompts_by_question_type_with_a.md** — STORY-46.7 Classify prompts by question type with an Other fallback — ⏳ Ready for QA — 9 ACs
9. **STORY_GEO-1248_Show_prompts_in_Other_on_the_dashboard.md** — STORY-46.8 Show prompts in Other on the dashboard — ⏳ Ready for QA — 12 ACs
10. **README.md** — Epic summary and key points
11. **INDEX.md** — This file
12. **epic-data.json** — Structured data (single source of truth)

## Jira Links

- Epic: https://onclusive.atlassian.net/browse/GEO-1209
- GEO-1241: https://onclusive.atlassian.net/browse/GEO-1241
- GEO-1242: https://onclusive.atlassian.net/browse/GEO-1242
- GEO-1243: https://onclusive.atlassian.net/browse/GEO-1243
- GEO-1244: https://onclusive.atlassian.net/browse/GEO-1244
- GEO-1245: https://onclusive.atlassian.net/browse/GEO-1245
- GEO-1246: https://onclusive.atlassian.net/browse/GEO-1246
- GEO-1247: https://onclusive.atlassian.net/browse/GEO-1247
- GEO-1248: https://onclusive.atlassian.net/browse/GEO-1248
- Project: https://onclusive.atlassian.net/browse/GEO

## Progress

```
GEO-1209 Unbranded Analysis and Other Prompts  [Ready for QA]
├── GEO-1241  STORY-46.1 [Ready for QA]  13 ACs
├── GEO-1242  STORY-46.2 [Ready for QA]  10 ACs
├── GEO-1243  STORY-46.3 [Ready for QA]  12 ACs
├── GEO-1244  STORY-46.4 [Ready for QA]  8 ACs
├── GEO-1245  STORY-46.5 [Ready for QA]  3 ACs
├── GEO-1246  STORY-46.6 [Ready for QA]  2 ACs
├── GEO-1247  STORY-46.7 [Ready for QA]  9 ACs
└── GEO-1248  STORY-46.8 [Ready for QA]  12 ACs
```

- Ready for QA: 8
- Total: 8 (8 stories, 0 tasks) — 69 ACs

## Details

- **Epic assignee:** Abdenasser Aroukhsiss
- **Stories assignee:** Abdenasser Aroukhsiss
- **Epic created:** 2026-10-06 — **updated:** 2026-10-19
- **Epic status:** ⏳ Ready for QA
- **Version folder:** GEO-R1.3
- **Imported from Jira:** 2026-10-19
- **Ignored children (not Story/Task):** GEO-1185 (Design Task), GEO-1186 (Design Task)
- **Related epic:** GEO-1002 (wizard and prompt pool, prerequisite)

## Key Components

- Feature flag (unbranded + Other, one global flag, `AuthMeResponse.features`) — GEO-1241, GEO-1242, GEO-1247
- Wizard Analysis Type step, mode pill, Topic & Country step, topic discovery screen — GEO-1241
- Unbranded prompt generation (Visibility, Competitive [Competitor 4], Category Topics templates, QUESTION_ADAPTATION with the topic) — GEO-1242
- Category Topics analysis prompt (non engine-native extraction path), up to 12 topics, up to 3 attached brands per topic — GEO-1242
- Unbranded Overview (sidebar block, InBrief topic prompt / TOPIC_SUMMARY, Top Topics, neutral SOV ring, landscape table, AI Citation Sources) and GEO dashboard list "Brand / Topic" — GEO-1243
- Unbranded Category view (Time Evolution top 10, Brand Prioritization top 5, winner / Split `findConsensusWinner`, detail panel) — GEO-1244
- Actions Center hidden, XLSX / PowerPoint export (`ExportI18n`), analysis ready email — GEO-1245
- Manage Scope suggestions and type select for unbranded — GEO-1246
- Other fallback in the wizard and Manage Scope (inline selects, warning tint, banner, Review card, column filters) — GEO-1247
- Other on the dashboard (sidebar Other category, Other tab, Other Details panel, concept extraction via ConceptExtractionService, export Other section) — GEO-1248
