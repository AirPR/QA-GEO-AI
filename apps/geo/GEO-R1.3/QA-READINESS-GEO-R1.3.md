# GEO-R1.3 — QA readiness across epics

**Epics:** GEO-1002, GEO-1069, GEO-1209, GEO-1068
**Date:** 2026-10-19
**Source:** local imports in `apps/geo/GEO-R1.3/{EPIC_KEY}/` (Jira state on 2026-10-19)

---

## 1. Overview

| Epic | Jira number | Subject | Stories | ACs | Status | Assignee |
|---|---|---|---|---|---|---|
| [GEO-1002](https://onclusive.atlassian.net/browse/GEO-1002) | EPIC-045 | New-analysis wizard + shared prompt pool quota | 13 | 69 | Ready for QA | Youssef.AitLaydi |
| [GEO-1069](https://onclusive.atlassian.net/browse/GEO-1069) | EPIC-047 | Brand website asked for a custom brand | 4 | 14 (+4 technical) | Ready for QA | Youssef.AitLaydi |
| [GEO-1209](https://onclusive.atlassian.net/browse/GEO-1209) | EPIC-046 | Unbranded analysis + Other prompt category | 8 | 69 | Ready for QA | Abdenasser Aroukhsiss |
| [GEO-1068](https://onclusive.atlassian.net/browse/GEO-1068) | EPIC-048 | Simplified key concepts sentiment display | 4 | 11 | Ready for QA | Abdenasser Aroukhsiss |

Total: 29 stories, 163 ACs, all Ready for QA.

---

## 2. Dependencies and test order

```
GEO-1002 (wizard + prompt pool)  ← foundation
   ├── GEO-1069 : website field in the Brand & Country step
   └── GEO-1209 : Analysis Type step added to the wizard (4 → 5 steps)
            └── GEO-1068 : same concept list used by Top Topics and the Other page
```

Recommended test order: **GEO-1002 → GEO-1069 → GEO-1209 → GEO-1068**.

Dependencies outside R1.3:
- GEO-152 (Actions Center), GEO-156 (exports), GEO-428 ("analysis ready" email), GEO-680 (back office)
- Brandfetch and the Google favicon service, for the GEO-1069 logos

---

## 3. Screens touched by several epics (test together)

| Screen | Epics | What to know |
|---|---|---|
| **Wizard — Analysis Type step** | 1209 | New first step, behind a feature flag. Flag OFF = 4-step wizard (GEO-1241 AC1b). GEO-1231 AC7 already expects this step. |
| **Wizard — Brand & Country** | 1002, 1069, 1209 | Website field under the custom brand, before "Discover Categories". Changing the website clears categories already discovered (GEO-1232). No website field in an unbranded analysis. |
| **Wizard — prompts** | 1002, 1209 | **GEO-1247 AC3 overrides GEO-1234 AC3**: the confirm button is no longer disabled when category or type is empty. GEO-1246 extends GEO-1239 (Manage Scope). |
| **Wizard — Review** | 1002, 1209 | GEO-1241 AC12 extends the GEO-1237 warning. |
| **Competitors** | 1002, 1209, 1069 | GEO-1233 AC2 is delivered by GEO-1251. Unbranded: no competitor discovery, Other category excluded. If GEO-1069 proposal P1 is validated, the captured domain also feeds competitor discovery. |
| **Concept list (Top Concepts / Top Topics / Other)** | 1068, 1209 | One shared component for all three lists, so GEO-1266 to 1268 must also be tested on GEO-1243 and GEO-1248. GEO-1267 changes the detail panel in branded and unbranded analyses. |
| **PPTX / PDF / XLSX exports** | 1068, 1069, 1209 | Different sections of the same file: concepts (GEO-1269), cover and brand row in rankings (GEO-1263), unbranded adaptation (GEO-1245, GEO-1248). The XLSX "Score" column is removed. Sentiment labels in EN, FR and ES. |
| **Brand logo** | 1069, 1209 | Brand initial when there is no logo. Generic globe when the site has no favicon (known limit, GEO-1262 AC2). Unbranded: first letter of the topic (GEO-1243). |

---

## 4. Decisions taken by the dev team, not yet validated by the PM

| Epic | Decision | QA impact |
|---|---|---|
| 1069 | **P1**: the website becomes the brand domain everywhere (categories, competitors, owned sources). Contradicts the epic Out of Scope. | Expected results still uncertain |
| 1069 | **P3**: root-domain definition | URL normalization cases |
| 1069 | **P4**: no website field in an unbranded analysis | Consistent with GEO-1241 |
| 1069 | **P5**: field inline on Brand & Country | Field position |
| 1069 | **P2** (validated by dev team only): a stored field (`entity_domain_confirmed`) keeps older analyses unchanged | Non-regression on older analyses |
| 1068 | **D0 to D7**: no Figma, white pill in the panel header, sort by frequency then A–Z, no XLSX "Score" column, no quotes in the panel, coloured % in exports, category-level sentiment tile kept (D5) | Visual and export assertions |
| 1209 | On-screen strings in "Proposed" status, reviewed by the PM on return | Exact-text assertions are fragile |
| 1209, 1069 | Figma to be updated (1209), Figma exception (1069) | ACs are the reference |

---

## 5. Epic descriptions out of date vs stories (stories are the reference)

- **GEO-1209**:
  - GEO-1242 AC9: a Competitive prompt with fewer than 2 competitors is **no longer sent**
  - GEO-1243 AC4: InBrief also gets one quote per topic
  - up to **12 topics** per category, not 7
- **GEO-1068**: the category-level sentiment tile is kept (D5), while the epic still lists it as an open question.
- **GEO-1069**: P1 widens the scope beyond the epic Out of Scope.
- **GEO-1002, 1068, 1069**: stories are listed as "Story ID: TBD" in the epic text. The mapping is recorded in each `epic-data.json`.

---

## 6. Inconsistent epic numbers in the descriptions

| Cited in | As | Real Jira number |
|---|---|---|
| GEO-1209 → GEO-1002 | EPIC-034 | EPIC-045 |
| GEO-1002 → GEO-1209 | EPIC-035 | EPIC-046 |
| GEO-1002 → GEO-1069 | EPIC-045 | EPIC-047 |
| GEO-1209 → GEO-1068 | EPIC-044 | EPIC-048 |

To report to the PO. In TCs, use GEO-xxxx keys only.

---

## 7. Test environment prerequisites

- **Unbranded feature flag ON** for GEO-1209 and the unbranded part of GEO-1068, plus one run with the flag OFF for GEO-1241 AC1b.
- **Organisation with a prompt pool** configured in the back office (GEO-1230).
- **Two brand types** for GEO-1069: a brand suggested by Brandfetch and a custom brand.
- **Older analyses**, to check they are unchanged (GEO-1069 P2, and GEO-1068 on concepts).

---

## 8. Exclusions and ACs not to test as written

- **GEO-1233 AC2**: delivered by GEO-1251.
- **GEO-1237 TAC1–TAC5** and **GEO-1263 TAC1–TAC4**: database / export technical checks, not counted as ACs.
- **Excluded from the import**:
  - Bugs already open on GEO-1002: GEO-1271, GEO-1272, GEO-1274
  - Design Tasks: GEO-1012, GEO-1185, GEO-1186
- **Bugs linked to GEO-1069**: GEO-1151 and GEO-1179, both Done.

---

## 9. Open points

- **GEO-1069**: extend the website request to manually added competitors? Should the captured domain drive owned-source classification?
- **GEO-1209**:
  - InBrief capped at the 25 most frequent topics
  - Category Topics thresholds to check on the first unbranded runs
  - no export frame for GEO-1245 yet
  - "Brand / Topic" column header shown only when the list contains an unbranded analysis
- **GEO-1068**: is the score still computed internally? (out of scope)
