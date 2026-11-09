# Index — GEO-1069: Ask for the Brand Website when a Custom Brand is Entered

## Files

1. **EPIC.md** — Epic overview, scope, out of scope, AC summary
2. **STORY_GEO-1260_Ask_for_the_brand_website_when_no_sugges.md** — STORY-47.1 Ask for the brand website when no suggestion is selected — ⏳ Ready for QA — 4 ACs
3. **STORY_GEO-1261_Accept_and_normalize_any_reasonable_URL.md** — STORY-47.2 Accept and normalize any reasonable URL input — ⏳ Ready for QA — 3 ACs
4. **STORY_GEO-1262_Retrieve_and_preview_the_logo_from_the_p.md** — STORY-47.3 Retrieve and preview the logo from the provided domain — ⏳ Ready for QA — 4 ACs
5. **STORY_GEO-1263_Use_the_captured_domain_everywhere_the_b.md** — STORY-47.4 Use the captured domain everywhere the brand appears — ⏳ Ready for QA — 3 ACs + 4 TACs
6. **README.md** — Epic summary and key points
7. **INDEX.md** — This file
8. **epic-data.json** — Structured data (single source of truth)

Dependencies between stories: GEO-1261 (normalization) and GEO-1262 (preview) build on the field of GEO-1260; GEO-1263 uses the domain stored by GEO-1261.

## Jira Links

- Epic: https://onclusive.atlassian.net/browse/GEO-1069
- GEO-1260: https://onclusive.atlassian.net/browse/GEO-1260
- GEO-1261: https://onclusive.atlassian.net/browse/GEO-1261
- GEO-1262: https://onclusive.atlassian.net/browse/GEO-1262
- GEO-1263: https://onclusive.atlassian.net/browse/GEO-1263
- Project: https://onclusive.atlassian.net/browse/GEO

## Progress

```
GEO-1069 Ask for the Brand Website when a Custom Brand is Entered  [Ready for QA]
├── GEO-1260  STORY-47.1 [Ready for QA]  4 ACs
├── GEO-1261  STORY-47.2 [Ready for QA]  3 ACs
├── GEO-1262  STORY-47.3 [Ready for QA]  4 ACs
└── GEO-1263  STORY-47.4 [Ready for QA]  3 ACs
```

- Ready for QA: 4
- Total: 4 (4 stories, 0 tasks) — 14 ACs

## Details

- **Epic assignee:** Youssef.AitLaydi
- **Stories assignee:** Youssef.AitLaydi
- **Epic created:** 2026-08-05 — **updated:** 2026-10-16
- **Epic status:** ⏳ Ready for QA
- **Version folder:** GEO-R1.3 (Jira fixVersion 1.3)
- **Imported from Jira:** 2026-10-19
- **Ignored children (not Story/Task):** none
- **Related epics:** GEO-1002 (Setup Revamp — website field on Brand & Country); GEO-1209 (unbranded analysis — no website field, P4)
- **Related bugs:** GEO-1151, GEO-1179 (Done)

## Key Components

- Wizard Brand & Country step: website field under the selected custom brand card, « {name} — custom » row of the brand search — GEO-1260
- URL normalization and inline validation, server-side refusal at creation — GEO-1261
- Logo preview (32px avatar, pulsing placeholder), Brandfetch lookup, Google favicon fallback, lettermark — GEO-1262
- Report fields `entity_domain`, `entity_logo_url`, `entity_domain_confirmed`; report list, dashboard sidebar / header, rankings target row, PowerPoint / PDF export cover and rankings — GEO-1263
