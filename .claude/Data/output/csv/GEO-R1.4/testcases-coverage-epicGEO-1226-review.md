# GEO-1226 Target Sources Improvements for Review Pages — epic test case review (GEO-R1.4, generated 2026-11-03)

**Sources (read-only):** `apps/geo/GEO-R1.4/GEO-1226/` (EPIC.md, epic-data.json, STORY_GEO-1547 / 1548 / 1549) and `apps/geo/GEO-R1.4/GEO-1226-RUN-FINDINGS.md` (Analyse, decisions D1–D11, open points P1–P9, Design (Figma), gaps E1–E17). PO / dev decisions of the findings file override the raw AC wording and are cited in the TC descriptions. Phase 3 of `/senior-qa-campaign GEO-1226 GEO-R1.4`.

**Mode `--figma`:** the 6 PNGs already extracted in `figmaScreens/14_GEO-1226_Review_pages/` (Figma API not called again). Exact UI texts reused in the expected results: "17 negative reviews", "4 negative reviews", "1 negative review", "Show 7 more reviews", "Show 1 more review" (strings sheet), "Avis de CNP Assurances", "fr.trustpilot.com/review/cnp.fr?page=2", "Each of these articles mentions {brand} negatively.", "None of these articles mentions {brand} anywhere on the page.", "Lack of visibility (2)", "Negative perception (2)", "Review Sites", "Improve visibility", "Improve perception", "Previous" · "Source N of M" · "Next source". Demo texts tied to CNP are given as examples only (staging data differs).

**CSV:** `.claude/Data/output/csv/GEO-R1.4/testcases-coverage-epicGEO-1226.csv` — 79 TCs, 315 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. QA Parent = GEO-1226, Components = GEO, QA Component = GEO Module, Test Type = Manual, QA Regression = Yes for High. Labels: one label per TC (differs from the R1.3 CSVs where Labels was empty, on request). Not imported to Quality Plus, nothing written to Jira.

**Environment:** staging, main QA account (no AC names a role), en-GB except the FR / ES string TCs (switch, then restore en-GB and check `/geo/api/v1/auth/me`). Analyses must have run after the review-v1 deploy (GEO-1547 TAC2). Candidate staging analyses from the findings file (org "GEO Stress Test 2026-10", data of 2026-10-06, to confirm in the JDD phase): MSC Croisières dc801726, Victoria's Secret 0bd0b48c, Verisure 183bdb00, Great Eastern 595928ee; Toyota QA-GEO 439acd96 for non-review sources. CNP Assurances (epic example) is production only (P6).

## Summary

| Metric | Value |
|---|---|
| Test cases | 79 |
| Steps (CSV rows) | 315 |
| Stories | 3 |
| Coverage | happy path 40 · edge 16 · error / negative 13 · state 10 |
| Priority | Urgent 0 · High 30 · Medium 35 · Low 14 |
| UI / Functional | UI 4 · Functional 75 |
| Smoke = Yes | 4 |
| QA Regression = Yes | 30 |
| [Figma] TCs | 8 |
| Regression TCs "Related bug" | 8 |
| TCs "Needs dev evidence (logs / DB)" | 6 |
| TCs with an open point step | 5 (P1, P2, P5) + 2 language TCs pending P7 |

| Story | Title | ACs (functional + technical) | TCs | Steps | Smoke | High | Medium | Low |
|---|---|---|---|---|---|---|---|---|
| GEO-1547 | STORY-49.1 List every negative review of a review page | 7 + 5 | 26 | 111 | 1 | 14 | 9 | 3 |
| GEO-1548 | STORY-49.2 Group the pages of a review page into one article | 7 + 4 | 26 | 101 | 1 | 8 | 13 | 5 |
| GEO-1549 | STORY-49.3 Show review pages in the Target Sources panel | 7 + 3 | 27 | 103 | 2 | 8 | 13 | 6 |

## AC inventory and coverage (AC → TC)

### GEO-1547 — STORY-49.1 List every negative review of a review page

| AC | Label | TCs |
|---|---|---|
| AC-1 | Every negative review, one entry each | GEO-1547-001 |
| AC-2 | Verbatim, 140 characters | GEO-1547-002, GEO-1547-003 |
| AC-3 | Brand name not required on a review page (GEO-1183 kept elsewhere) | GEO-1547-004, GEO-1547-005, GEO-1547-012 |
| AC-4 | Never chrome or a positive review (PO GEO-1583 c876255, 2026-11-11: "Any criticism = listed", a 4–5★ review that criticises the brand is listed) | GEO-1547-006, GEO-1547-007, GEO-1547-010 |
| AC-5 | At most 10 per page | GEO-1547-008 |
| AC-6 | Negative page | GEO-1547-009, GEO-1547-010 |
| AC-7 | Other sources unchanged | GEO-1547-011, GEO-1547-012, GEO-1547-013, GEO-1547-023, GEO-1547-024, GEO-1547-025, GEO-1547-026 |
| TAC1 | Optional contract (dev evidence) | GEO-1547-017 |
| TAC2 | Only review pages re-judged (dev evidence + indirect UI) | GEO-1547-018 |
| TAC3 | Verbatim only (partly QA) | GEO-1547-014 |
| TAC4 | Cap and cut (QA when data exists) | GEO-1547-015 |
| TAC5 | Reviews survive reuse (partly QA) | GEO-1547-016 |

### GEO-1548 — STORY-49.2 Group the pages of a review page into one article

| AC | Label | TCs |
|---|---|---|
| AC-1 | One article per review page | GEO-1548-001 |
| AC-2 | Same page only (paths, subdomains) | GEO-1548-002, GEO-1548-003, GEO-1548-023 |
| AC-3 | Title without page part | GEO-1548-004 |
| AC-4 | Tabs (negative / Lack of visibility) | GEO-1548-005, GEO-1548-006, GEO-1548-007, GEO-1548-024 |
| AC-5 | Same number everywhere + card sort | GEO-1548-008, GEO-1548-009, GEO-1548-010, GEO-1548-011, GEO-1548-012, GEO-1548-026 |
| AC-6 | Review counts (panel + export) | GEO-1548-013, GEO-1548-014, GEO-1548-015, GEO-1548-016 |
| AC-7 | Non-review sources and Prompts section unchanged | GEO-1548-017, GEO-1548-018, GEO-1548-025 |
| TAC1 | articleKey (partly QA) | GEO-1548-019 |
| TAC2 | Not on other sources (QA if data) | GEO-1548-020 |
| TAC3 | Same count, NOT_FETCHED nowhere (dev evidence) | GEO-1548-021 |
| TAC4 | No vacuous Lack of visibility (dev evidence) | GEO-1548-022 |

### GEO-1549 — STORY-49.3 Show review pages in the Target Sources panel

| AC | Label | TCs |
|---|---|---|
| AC-1 | Reviews by page | GEO-1549-001, GEO-1549-002, GEO-1549-004, GEO-1549-017, GEO-1549-018, GEO-1549-024 |
| AC-2 | Article chip | GEO-1549-003, GEO-1549-004, GEO-1549-019, GEO-1549-020, GEO-1549-024, GEO-1549-026, GEO-1549-027 |
| AC-3 | URL line | GEO-1549-005, GEO-1549-006, GEO-1549-021 |
| AC-4 | Entry = quote only | GEO-1549-007, GEO-1549-019 |
| AC-5 | Show more | GEO-1549-008, GEO-1549-009, GEO-1549-010, GEO-1549-011, GEO-1549-012, GEO-1549-013, GEO-1549-023, GEO-1549-024, GEO-1549-026, GEO-1549-027 |
| AC-6 | Engines | GEO-1549-014 |
| AC-7 | Lack of visibility | GEO-1549-015, GEO-1549-016 |
| TAC1 | Step counts reviews (QA) | GEO-1549-008, GEO-1549-009 |
| TAC2 | One page (QA) | GEO-1549-006 |
| TAC3 | Older API (dev evidence) | GEO-1549-025 |

### Epic-level ACs

| Epic AC | Story AC | TCs |
|---|---|---|
| Epic AC-1 | GEO-1548 AC-1 | GEO-1548-001 |
| Epic AC-2 | GEO-1547 AC-1 | GEO-1547-001 |
| Epic AC-3 | 1547 TAC3 (verbatim) + 1549 AC-1 (page block opens the page) | GEO-1547-014, GEO-1549-001 |
| Epic AC-4 | GEO-1547 AC-4 | GEO-1547-006 |
| Epic AC-5 | GEO-1547 AC-3 | GEO-1547-004 |
| Epic AC-6 | GEO-1548 AC-2 | GEO-1548-002 |
| Epic AC-7 | GEO-1548 AC-5 | GEO-1548-008, GEO-1548-010 |
| Epic AC-8 | GEO-1549 AC-5 | GEO-1549-008 |
| Epic AC-9 | 1548 AC-4 + 1549 AC-7 | GEO-1548-006, GEO-1548-007, GEO-1549-015 |
| Epic AC-10 | GEO-1547 AC-5 | GEO-1547-008 |

Every functional AC, every epic AC and every technical AC has at least one dedicated TC. Technical ACs not verifiable by QA get one TC each with "Needs dev evidence (logs / DB)" in the precondition (1547 TAC1, 1547 TAC2, 1548 TAC3, 1548 TAC4, 1549 TAC3), so their coverage stays visible.

## Figma gaps E1–E17 → mapping

| Gap | Mapping |
|---|---|
| E1 "…" on short demo reviews | AC wins: GEO-1547-003 (no "…" at ≤ 140) + GEO-1547-002 (cut above 140) |
| E2 chip upper case | [Figma] GEO-1549-020; GEO-1549-003 compares case-insensitively |
| E3 expanded, no button left | [Figma] GEO-1549-010 |
| E4 one click reveals all vs GEO-1161 step | Open point P2: GEO-1549-013; 17-review case asserted per TAC1 in GEO-1549-009 |
| E5 pages without negative review not listed | [Figma] GEO-1549-017 |
| E6 link opens a new tab, open_in_new icon | [Figma] GEO-1549-018 |
| E7 LoV article: no chip, no count, page 1 link | [Figma] GEO-1549-016 |
| E8 subtitles unchanged | Regression [Figma] GEO-1549-022 |
| E9 one-page vs grouped URL line same style | [Figma] GEO-1549-021; behaviour in GEO-1549-005 and GEO-1549-006 |
| E10 dropped strings | [Figma] GEO-1549-019 |
| E11 panel order not by review count | Not tested: no AC on panel order by review count (panel order follows GEO-1184, regression outside this epic) |
| E12 OS native demo leftovers | Ignored; panel parity only in GEO-1549-024 (prerequisite P8) |
| E13 "Show 1 more review" without frame | GEO-1549-012 (text from the strings list) |
| E14 page without stored reviews in a group | Open point P1: GEO-1548-024; decided one-page case in GEO-1548-025 |
| E15 export label of the review count | Open point P5: GEO-1548-014, GEO-1548-015, GEO-1548-016 (number = chip) |
| E16 long URL wrapping | GEO-1549-002 (from AC-1, no design reference) |
| E17 Show more reviews + Show more articles | GEO-1549-023 (exploratory, from AC-5 / GEO-1161, no design reference) |

## Regression TCs (linked bugs)

| Bug | TCs |
|---|---|
| GEO-1204 | GEO-1547-019 (Related bug), GEO-1547-020 (Related bug), GEO-1547-021 (Related bug) |
| GEO-1192 | GEO-1547-022 (Related bug), GEO-1547-023 (Related bug) |
| GEO-1224 | GEO-1547-006, GEO-1547-007, GEO-1547-024 (Related bug), GEO-1547-025 (Related bug) |
| GEO-1580 (Ready for QA 2026-11-11) | GEO-1547-024, GEO-1547-025 (retest) |
| GEO-1583 (Action Needed) | GEO-1547-006 (site-written text, strict), GEO-1547-007 / 010 (positive-review part by design, PO c876255) |
| GEO-1201 | GEO-1547-002, GEO-1547-026 (Related bug) |
| GEO-1183 | GEO-1547-005, GEO-1547-012 |

GEO-1204 cases outside this epic (USPS prc.gov press release still not negative, prc.gov PDF title passage) are not review pages: no TC here, they depend on open point P4 (accept as known limits or split before Passed QA). GEO-1204 Great Eastern Google Play: out of scope (PO c869090), checked by GEO-1547-013.

## Open points referenced

| # | Where |
|---|---|
| P6 | Every TC: common precondition (test data on staging, analysis run after the review-v1 deploy; CNP production only with approval, GEO-1548-001 / 004 / 008 / 009 / 010–012) |
| P9 | Every review-site TC: common precondition (dev or API tells which pages got review mode; key for GEO-1547-004 / 012, GEO-1548-024) |
| P1 | GEO-1547-012, GEO-1548-024 — answered 2026-11-04 (GEO-1226 c873111): no stored review = not negative, no classic passage for a merged page (bug GEO-1585, Passed QA) |
| P2 | GEO-1549-008, GEO-1549-013 |
| P3 | GEO-1548-004 |
| P5 | GEO-1548-014, GEO-1548-015, GEO-1548-016 |
| P7 | GEO-1549-026, GEO-1549-027 |
| P8 | GEO-1549-024 |
| P4 | No TC (GEO-1204 non-review cases, decision needed before the retest verdict) |

## Not covered and why

- **P3 title formats of non-Trustpilot review sites**: no TC asserting another format (rule not written; 1548-004 checks the Trustpilot format and that no "Page N" / "N of M" part remains).
- **P4 GEO-1204 non-review cases** (prc.gov): outside the epic, waiting for the decision.
- **E11 panel order by review count**: no AC.
- **Exact boundary "exactly 10 negative reviews on one page"** for the per-page cap: not added (AC-5 states "> 10"; 1547-008 asserts the cap at 10, 1549-011 covers the article-level boundary of 10).
- **Technical ACs 1547 TAC1 / TAC2, 1548 TAC3 / TAC4, 1549 TAC3**: kept as "Needs dev evidence" TCs; QA cannot produce the verdict alone.
- **FR / ES expected texts**: unknown until the strings sheet is readable (P7); the build texts are provisional (D8), so these 2 TCs are expected to FAIL until fixed — report as a dev request, not as a new bug.
- **Data risk**: the exact AC examples (4 / 2 / 3 / 2 = 11, 17 reviews with the cut in page 5, 1 review, 11 reviews, > 20 reviews, a page with > 10 negative reviews) may not exist on staging; each TC states the fallback data (any article in the same range) — to confirm in the JDD phase.

## Test cases

### GEO-1547 — STORY-49.1 List every negative review of a review page

**TC-GEO-1547-001 - Page with 4 negative reviews lists 4 entries, one per review** (AC-1, Epic AC-2) | Priority: High | Smoke: Yes | Regression: Yes | Functional | Label: review-entries | happy

- Description: Verify that a review page where several users criticise the brand gives one entry per negative review under its page block. Covers AC-1 (epic AC-2). Epic scope 2: "Each negative review is its own entry".
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a single-company review page of the brand on a Review Sites domain with one page whose live content holds 4 (or N >= 2) negative reviews from different users. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Analysis with a single-company review page (e.g. MSC Croisières dc801726, fr.trustpilot.com, org "GEO Stress Test 2026-10", to confirm in JDD)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — And the user opens the live page P of one page block and counts the reviews that criticise the brand [data: Page with 4 negative reviews from 4 users (e.g. fr.trustpilot.com/review/{company}?page=2)] → The live page shows its reviews; QA notes the number of negative reviews (here 4)
- Step 4 — Then the page block of P lists one entry per negative review → The page block header reads the page URL then "4 negative reviews", and 4 entries are listed under it
- Step 5 — And each entry is a different review of the live page → The 4 entries match 4 different reviews (4 different users) of page P; no review is listed twice

**TC-GEO-1547-002 - Review longer than 140 characters is cut with a single "…" on a word boundary** (AC-2) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-quote-length | edge

- Description: Verify that a negative review longer than 140 characters is quoted verbatim and shortened with the single "…" character on a word boundary, "…" included in the 140 characters (same rule as GEO-1201). Covers AC-2. Related GEO-1201.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page with one negative review longer than 140 characters. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Review page holding a negative review > 140 characters (e.g. MSC dc801726 or Verisure 183bdb00, to confirm in JDD)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user locates the entry of the review longer than 140 characters → The entry ends with the single "…" character
- Step 3 — And the user compares the entry with the full review on the live page → The text before "…" is identical to the beginning of the review (same words, case and punctuation, not translated)
- Step 4 — Then the entry is at most 140 characters including "…" → Entry length <= 140 characters, "…" included
- Step 5 — And the cut falls on a word boundary → The last word before "…" is a whole word of the review; one single "…" character (not "..." and not "……")

**TC-GEO-1547-003 - Review of 140 characters or less is shown whole without "…"** (AC-2) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-quote-length | edge

- Description: Verify that a negative review of 140 characters or less is quoted whole, with no "…". Covers AC-2 (boundary). Figma gap E1: frames 1.1 / 1.2 / 2.1 show "…" on 68–87 character demo reviews (e.g. "Trois mois pour un simple changement d'adresse, et toujours pas de confirmation écrite…"); the AC wins, the cut applies only above 140 characters.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page with a negative review of 140 characters or less (ideally 130 to 140). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Review page with a negative review of <= 140 characters (ideally 130–140)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user locates the entry of the review of 140 characters or less → The entry is displayed in quotes
- Step 3 — And the user compares it with the review on the live page → The entry is the whole review, verbatim
- Step 4 — Then the entry does not end with "…" → No "…" in the entry; its length equals the length of the review

**TC-GEO-1547-004 - Review that does not name the brand is listed on a review page** (AC-3, Epic AC-5) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-brand-name | happy

- Description: Verify that on a single-company review page of the brand, a negative review is listed although it does not name the brand. Covers AC-3 (epic AC-5). PO decision D1 (GEO-1226 comment 869090, 2026-10-28): review mode applies to a page that reviews one company of the brand family.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a single-company review page of the brand with a negative review naming neither the brand nor a product. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Review page of one company of the brand family with a negative review that does not name the brand (epic example: "A EVITER ABSOLUMENT - POUR PRENDRE VOTRE ARGENT ILS SONT FORTS", CNP Assurances fr.trustpilot.com)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the entries of the page blocks → The entries are listed under their page blocks
- Step 3 — Then a negative review that does not name the brand is listed → An entry such as "A EVITER ABSOLUMENT - POUR PRENDRE VOTRE ARGENT ILS SONT FORTS" is listed although it contains neither the brand nor a product name
- Step 4 — And the review is found verbatim on the page of its page block → The same text is found on the page opened by the page block URL

**TC-GEO-1547-005 - Passages of a non-review source still name the brand** (AC-3) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: brand-name-rule | happy

- Description: Verify that on a source not classified Review Sites the passage still contains the brand or one of its product names (GEO-1183 rule kept). Covers AC-3 (second part). Related GEO-1183.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a source not classified Review Sites with negative articles.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Analysis with a Journalism or Corporate source in Negative perception (e.g. Toyota QA-GEO 439acd96, edmunds.com / caradisiac.com)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the non-review source and selects the tab "Negative perception" → The panel shows the source badge (e.g. "Journalism"), one row per article URL, no page block
- Step 3 — And the user reads the passage of each article → Each article shows at most one passage
- Step 4 — Then every passage contains the brand or one of its product names → The brand or a product name is present in each passage (GEO-1183)

**TC-GEO-1547-006 - No entry is a page title, menu, banner or site summary** (AC-4, Epic AC-4) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-no-chrome | error

- Description: Verify that no entry of a review page is the page title, a menu, a banner or a summary written by the site. Covers AC-4 (epic AC-4). Related GEO-1224.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page whose live page has a title with a page part, a site menu, a cookie banner and a site-written summary. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Review page with title "… | 2 sur 29", menu, cookie banner and TrustScore / rating summary (e.g. fr.trustpilot.com page of MSC dc801726)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads every entry of every page block, after clicking "Show N more reviews" if present → All entries of the article are shown
- Step 3 — Then no entry is the page title → No entry such as "Avis de CNP Assurances | Lisez les avis marchands de cnp.fr | 2 sur 29" (today's passage, frame 1.0)
- Step 4 — And no entry is a menu, a banner or a summary written by the site → No navigation, cookie banner, TrustScore / rating summary or site-generated text in any entry

**TC-GEO-1547-007 - A review that criticises the brand is listed even when rated 4–5★; no review without criticism and no company reply** (AC-4, PO GEO-1583 c876255) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-no-positive | error

- Description: Verify that a review that criticises the brand is listed even when it is rated 4–5★, and that a review holding no criticism of the brand and a reply from the company are never listed as entries. Covers AC-4. PO decision (GEO-1583 comment 876255, Quentin Reant, 2026-11-11): "Any criticism = listed please", answering the dev question 876222 (option "Any criticism = listed, even in a 4 or 5-star review"). Related GEO-1224, GEO-1583.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page holding reviews without any criticism of the brand, negative reviews, at least one 4–5★ review that holds a criticism, and at least one reply from the company. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Review page with 4–5 star reviews, 1–2 star reviews and a company reply; a 4–5★ review that holds a criticism, e.g. cardekho.com Toyota Fortuner 4.2★ review "Fortuner 4wd" (Toyota QA-GEO 439acd96) (company reply e.g. "Réponse de …" / "Reply from …" on Trustpilot)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user compares each entry with the live page → Each entry is found on the live page
- Step 3 — Then a review that criticises the brand is listed even when it is rated 4–5★ → The 4–5★ review that holds a criticism is listed, its entry found verbatim in that review (e.g. cardekho.com Toyota Fortuner 4.2★: "There is no lack of power, but it is not for comfort, just a pure diesel roar…") — PO GEO-1583 comment 876255
- Step 4 — And no entry is a review holding no criticism of the brand → Every entry criticises the brand; the reviews of the page that hold no criticism of the brand are not listed
- Step 5 — And no entry is a reply from the company → No text of a company reply is listed

**TC-GEO-1547-008 - Page with more than 10 negative reviews keeps 10 entries and counts 10** (AC-5, Epic AC-10) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-cap-per-page | edge

- Description: Verify that a page with more than 10 negative reviews lists 10 entries and its count reads "10 negative reviews". Covers AC-5 (epic AC-10). Epic changelog 2026-10-22: at most 10 per page, counts use the reviews listed, the panel does not say that more exist.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page with more than 10 negative reviews on one page. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Page with > 10 negative reviews (e.g. very negative Trustpilot page; MSC dc801726, 65 % one-star, to confirm)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user clicks "Show N more reviews" if present → All page blocks of the article are shown
- Step 3 — And the user counts the negative reviews of that page on the live page → More than 10 reviews of the page criticise the brand
- Step 4 — Then the page block lists 10 entries → Exactly 10 entries under the page block
- Step 5 — And the page block count reads "10 negative reviews" → "10 negative reviews"; no text says that more exist

**TC-GEO-1547-009 - Page with one negative review is negative** (AC-6) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-page-verdict | edge

- Description: Verify that a page holding a single negative review is negative and shows as a page block. Covers AC-6 (boundary 1).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page whose page P holds exactly one negative review among positive ones. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Review page with one page holding exactly 1 negative review] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then page P shows as a page block with its count → The page block header reads the page URL then "1 negative review", with 1 entry
- Step 4 — And the article of page P is counted in the Negative perception tab → The article is listed and counted in "Negative perception (N)"

**TC-GEO-1547-010 - Review page with no negative review is not in Negative perception** (AC-6) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-page-verdict | error

- Description: Verify that a page holding no negative review is not negative: it has no page block, and an article whose pages hold none is not in Negative perception. Covers AC-6 (negative). Per PO decision GEO-1583 comment 876255 (2026-11-11, "Any criticism = listed please"), a 4–5★ review that holds a criticism makes the page negative: page P must hold no criticism of the brand at all.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page of the brand whose page P holds only reviews with no criticism of the brand (a 4–5★ review with a complaint is listed, PO GEO-1583 comment 876255). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Review page with one page whose reviews hold no criticism of the brand (e.g. a recent ?page=N of 4–5★ reviews without any complaint)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then no page block is shown for page P → The URL of page P is absent from all page blocks
- Step 4 — And an article whose pages all hold no negative review is not listed → Such an article is absent from Negative perception and not counted in "Negative perception (N)"

**TC-GEO-1547-011 - Non-review source keeps one passage per page** (AC-7) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: non-review-unchanged | happy

- Description: Verify that a source not classified Review Sites keeps one passage per page, as today. Covers AC-7. DoD: no regression on sources not classified Review Sites.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Journalism source with several negative article URLs.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Toyota QA-GEO 439acd96 (Action Center, 261 target sources), Journalism source in Negative perception] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Journalism source and selects the tab "Negative perception" → The panel shows the badge "Journalism"
- Step 3 — Then each page URL is one article row with at most one passage → No page block, no "N negative reviews" chip, no "Show N more reviews" button; the URL line is a link as today
- Step 4 — And the tab count equals the number of article rows → "Negative perception (N)" = number of URL rows

**TC-GEO-1547-012 - Comparison page on a Review Sites domain keeps one passage naming the brand** (AC-3, AC-7) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: comparison-page | edge

- Description: Verify that a page comparing several companies on a Review Sites domain keeps today's rule: one passage that names the brand (GEO-1183). Covers AC-3 / AC-7 per PO decision D1 (GEO-1226 comment 869090, 2026-10-28). Related GEO-1183. A comparison page that is not the only page of its article: see open point P1 (TC-GEO-1548-024).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a comparison page on a Review Sites domain cited in the analysis, alone in its article. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Comparison page on a Review Sites domain (e.g. Great Eastern 595928ee seedly.sg; or lecomparateurassurance.com / which.co.uk / moneymax.ph)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the source and selects the tab "Negative perception" → The comparison page article is listed
- Step 3 — Then the comparison page shows one passage → One classic passage, no list of review entries, no "N negative reviews" chip
- Step 4 — And the passage names the brand → The brand or a product name is present in the passage

**TC-GEO-1547-013 - Google Play or App Store page keeps today's rule** (AC-7) | Priority: Low | Smoke: No | Regression: No | Functional | Label: out-of-scope-stores | edge

- Description: Verify that Google Play and App Store pages are out of the review mode and keep one passage per page. PO decision D1 (GEO-1226 comment 869090, 2026-10-28): Google Play and App Store left out for now (play.google.com = google.com, classified Corporate). Covers AC-7 (scope limit).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an analysis citing a play.google.com or apps.apple.com page.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Analysis citing Google Play (e.g. Great Eastern 595928ee, Google Play page from GEO-1204)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of google.com (or apple.com) → The panel opens
- Step 3 — Then the source badge is not Review Sites → Badge e.g. "Corporate"
- Step 4 — And the store page keeps one passage per page → No page block, no "N negative reviews" chip, at most one passage per URL

**TC-GEO-1547-014 - Every entry is found verbatim on the live page** (TAC3, Epic AC-3) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-verbatim | happy

- Description: Verify that every entry is quoted verbatim from its page, in the page language. Covers TAC3 (partly verifiable: a quote not in the page text must be dropped; the drop itself needs dev evidence) and epic AC-3 (verbatim part).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page with at least 5 entries, ideally in a foreign language. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Review page with >= 5 entries in Spanish (e.g. Verisure 183bdb00, es.trustpilot.com)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user opens each page block link and searches the text of each entry on the live page [data: Browser search (Ctrl+F) on the opened page] → Each search returns a match
- Step 3 — Then every entry is found verbatim on its page → No paraphrase, no translation, no text merged from two reviews
- Step 4 — And the entries stay in the page language → Spanish reviews are quoted in Spanish under the en-GB interface

**TC-GEO-1547-015 - Cap and cut together on a page with more than 10 negative reviews** (TAC4) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-cap-per-page | edge

- Description: Verify the cap of 10 entries and the 140-character cut together on one page. Covers TAC4 (QA-verifiable in the UI when the data exists; dev case: 14 negative reviews, one of 200 characters).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a page with at least 11 negative reviews, one of them longer than 140 characters. If the long review is not among the 10 kept, record "not verifiable on this page" and rely on TC-GEO-1547-002. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Page with >= 11 negative reviews, one > 140 characters] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user clicks "Show N more reviews" if present → All page blocks are shown
- Step 3 — Then the page block lists 10 entries and reads "10 negative reviews" → 10 entries, count "10 negative reviews"
- Step 4 — And the long review entry ends with "…" on a word boundary → <= 140 characters including the single "…", last word whole

**TC-GEO-1547-016 - Reviews are still shown after a later run reuses the page verdict** (TAC5) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-reuse | state

- Description: Verify that the reviews of an unchanged page are still returned for the panel after a later run reuses its verdict. Covers TAC5 (partly verifiable; GEO-1534 reuse window approach pending PO per the R1.3 test plan).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an analysis with two runs after the deploy and a review page unchanged between them. Confirmation that the verdict was reused (hash match or GEO-1534 window) needs dev evidence (logs / DB). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Snapshot of run R1; review page P unchanged between R1 and R2] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user notes the entries of page P on run R1 → List of entries noted
- Step 3 — And the user selects the snapshot of the next run R2 and reopens the panel → The panel shows the data of R2
- Step 4 — Then page P still shows its review entries → Same entries as on R1, under the same page block
- Step 5 — And page P does not fall back to a single passage → No single classic passage or page header for page P

**TC-GEO-1547-017 - Optional contract without review fields keeps today's behaviour** (TAC1) | Priority: Low | Smoke: No | Regression: No | Functional | Label: tech-dev-evidence | error

- Description: Verify that a candidate without reviewSite and a verdict without reviews / pageTitle are consumed with today's behaviour and no error. Covers TAC1 (Kafka contract, not verifiable by QA).
- Precondition: Needs dev evidence (logs / DB): not verifiable in the UI; QA records the evidence shared by the dev (unit test, log or query result). Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6).
- Step 1 — Given a candidate without reviewSite and a verdict without reviews / pageTitle are consumed [data: Dev test or log extract] → The dev shares the test or log evidence
- Step 2 — When QA reviews the evidence → The evidence covers both messages
- Step 3 — Then today's behaviour applies with no error → No consumer error; the page keeps its classic passage

**TC-GEO-1547-018 - Only review-site pages are re-judged after the deploy** (TAC2) | Priority: Low | Smoke: No | Regression: No | Functional | Label: tech-dev-evidence | state

- Description: Verify that verdicts judged depiction-v6 before the deploy are re-judged only for review-site pages. Covers TAC2 (not verifiable directly; indirect UI check on a non-review page).
- Precondition: Needs dev evidence (logs / DB): not verifiable in the UI; QA records the evidence shared by the dev (unit test, log or query result). Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6).
- Step 1 — Given verdicts judged depiction-v6 before the deploy [data: Dev logs / DB of the first run after the deploy] → The dev shares the dispatch log or query
- Step 2 — When the next run dispatches → The run completes
- Step 3 — Then a non-review page is not stale and a review-site page is stale once → Evidence shows review-site pages expect review-v1, non-review pages are reused
- Step 4 — And in the UI a non-review page keeps its passage after the deploy [data: Toyota QA-GEO 439acd96, Journalism source] → Same passage as before the deploy for an unchanged page

**TC-GEO-1547-019 - GEO-1204 Victoria's Secret uk.trustpilot.com now negative with review entries** (Related bug GEO-1204) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: regression-GEO-1204 | happy

- Description: Related bug: GEO-1204 (Ready for QA). Ticket case: Victoria's Secret uk.trustpilot.com judged not negative with a header passage; QA extra case (comment 858903): www / uk trustpilot. Expected now: negative with review entries (dev comment 864969: this epic also fixes GEO-1204 for review pages). Covers AC-1 / AC-4 / AC-6.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: Victoria's Secret analysis 0bd0b48c-e78a-4e43-b607-f0318b48f6ba (staging, org "GEO Stress Test 2026-10"), to confirm in JDD.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Victoria's Secret 0bd0b48c, source trustpilot.com] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then the uk.trustpilot.com article is listed → An article with the URL line uk.trustpilot.com/review/… is in Negative perception
- Step 4 — And it shows review entries, not the page header → Page blocks (or entries under the title for one page) with "N negative reviews"; no entry is the page title or header
- Step 5 — And the www.trustpilot.com article shows review entries too → Same result for www.trustpilot.com, as a separate article

**TC-GEO-1547-020 - GEO-1204 MSC fr.trustpilot.com shows review entries instead of the header passage** (Related bug GEO-1204) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: regression-GEO-1204 | happy

- Description: Related bug: GEO-1204 (Ready for QA). Ticket case: MSC Croisières fr.trustpilot.com negative with a header passage. Expected now: review entries, no header. Covers AC-1 / AC-4.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: MSC Croisières analysis dc801726-99e5-4e53-bf72-87b469ed5098 (staging, org "GEO Stress Test 2026-10"), to confirm in JDD.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: MSC Croisières dc801726, source trustpilot.com] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then the fr.trustpilot.com article shows review entries → Entries quoted from the reviews, with "N negative reviews" counts
- Step 4 — And no entry is the page header → No entry reads the page title or header text of fr.trustpilot.com

**TC-GEO-1547-021 - GEO-1204 Verisure es.trustpilot.com now negative with review entries** (Related bug GEO-1204) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: regression-GEO-1204 | happy

- Description: Related bug: GEO-1204 (Ready for QA). QA extra case (comment 858903): Verisure es.trustpilot.com had a negative passage with a not negative verdict. Expected now: negative with review entries, quoted in Spanish. Covers AC-1 / AC-6.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: Verisure analysis 183bdb00-e80a-4d98-8866-e3dc5645900c (staging, org "GEO Stress Test 2026-10"), to confirm in JDD.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Verisure 183bdb00, source trustpilot.com (es.trustpilot.com)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then the es.trustpilot.com article is in Negative perception → The article is listed and counted in "Negative perception (N)"
- Step 4 — And it shows its Spanish negative reviews as entries → Entries verbatim in Spanish, with "N negative reviews" counts
- Step 5 — And the article is not in Lack of visibility with a negative passage [data: Tab "Lack of visibility"] → No es.trustpilot.com article with a negative passage in Lack of visibility

**TC-GEO-1547-022 - GEO-1192 Trustpilot pages fixed in GEO-1192 stay negative** (Related bug GEO-1192) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: regression-GEO-1192 | happy

- Description: Related bug: GEO-1192 (Done, 1.2). The review-site pages fixed in GEO-1192 (MSC fr.trustpilot.com, Victoria's Secret nl-be and www trustpilot) stay negative, now with review entries. Covers AC-6.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: MSC dc801726 and Victoria's Secret 0bd0b48c (staging, org "GEO Stress Test 2026-10").
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: MSC dc801726 then Victoria's Secret 0bd0b48c, source trustpilot.com] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then the MSC fr.trustpilot.com article is in Negative perception → Listed with review entries
- Step 4 — And the Victoria's Secret nl-be.trustpilot.com and www.trustpilot.com articles are in Negative perception → Two separate articles, each with review entries
- Step 5 — And no negative passage shows with a not negative verdict [data: Tab "Lack of visibility"] → None of these pages is in Lack of visibility with a negative quote

**TC-GEO-1547-023 - GEO-1192 non-review pages fixed in GEO-1192 stay negative with one passage** (Related bug GEO-1192, AC-7) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: regression-GEO-1192 | happy

- Description: Related bug: GEO-1192 (Done, 1.2). The other pages fixed in GEO-1192 stay negative with one passage, as today: MSC routard.com forum, USPS prc.gov PDF, Verisure comparador-alarmas.es (1.15/5). Covers AC-7 (non-review sources unchanged; comparador-alarmas.es keeps one passage as a non-review or comparison page, D1).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: MSC dc801726, Verisure 183bdb00, USPS analysis (UUID to find in JDD).
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: MSC dc801726 (routard.com), USPS (prc.gov PDF), Verisure 183bdb00 (comparador-alarmas.es)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of each source and selects the tab "Negative perception" → The panel opens on each source
- Step 3 — Then the routard.com forum page, the prc.gov PDF and the comparador-alarmas.es page are in Negative perception → Each page is listed and counted
- Step 4 — And each of them shows one negative passage → One passage per page, no page block, no "N negative reviews" chip

**TC-GEO-1547-024 - GEO-1224 no title, menu, cookie banner or favourable sentence on non-review sources** (Related bug GEO-1224, AC-7) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: regression-GEO-1224 | error

- Description: Related bug: GEO-1224 (Done, 1.2). On non-review sources the passage is never a page title, cookie banner, menu or favourable sentence; the criticism is joined to the nearest brand name with "…". Covers AC-7 (unchanged).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: Toyota QA-GEO 439acd96-0b1b-4da4-9e07-612d38e9783e, sources edmunds.com, alvolante.it, frandroid.com, caradisiac.com.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Toyota QA-GEO 439acd96] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panels of edmunds, alvolante, frandroid and caradisiac and selects "Negative perception" → The article rows are shown
- Step 3 — Then no passage is a page title, a cookie banner, a menu or a favourable sentence → Every passage is a criticism of the brand
- Step 4 — And a criticism far from the brand name is joined to the nearest brand name with "…" → Passage of the form "{brand} … {criticism}"

**TC-GEO-1547-025 - GEO-1224 article without a good quote shows no quote rather than the header** (Related bug GEO-1224, Covers AC-7) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: regression-GEO-1224 | edge

- Description: Related bug: GEO-1224 (Done, 1.2). PO decision D11 (GEO-1224 comment 859761, 2026-10-07): "no quote rather than page header". A negative article without a good quote stays listed without a quote on non-review sources. Covers AC-7 (unchanged rule).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a non-review negative article with no quotable passage (Toyota QA-GEO 439acd96, automobile-magazine.fr "Défauts de batterie 12 V chez Toyota et Lexus…", listed without a quote since the GEO-1580 fix, QA comment 875748, 2026-11-10).
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Toyota QA-GEO 439acd96] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panels of the Journalism sources in Negative perception [data: Toyota 439acd96 (QA-GEO): guideautoweb.com, automobile-magazine.fr, largus.fr, article without a good quote: automobile-magazine.fr "Défauts de batterie 12 V chez Toyota et Lexus…" (Last 7 days, listed without a quote, GEO-1580 QA comment 875748, 2026-11-10)] → Article rows shown
- Step 3 — Then an article with no good quote is listed without a quote → The article row shows title and URL, no passage
- Step 4 — And no article shows its page header as a quote → No title / banner / menu passage

**TC-GEO-1547-026 - GEO-1201 passage cut at 140 characters on a whole word on non-review sources** (Related bug GEO-1201, AC-7) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: regression-GEO-1201 | edge

- Description: Related bug: GEO-1201 (story, Done). On non-review sources a passage longer than 140 characters ends on a whole word with a single "…", "…" included in the 140 characters. Covers AC-7 (unchanged rule).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: Toyota QA-GEO 439acd96, a Journalism article with a long passage.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Toyota QA-GEO 439acd96] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens a Journalism source panel with a passage ending with "…" → Passage shown
- Step 3 — Then the passage is at most 140 characters including "…" → Length <= 140
- Step 4 — And it ends on a whole word with one single "…" character → No cut word, no "..." or "……"

### GEO-1548 — STORY-49.2 Group the pages of a review page into one article

**TC-GEO-1548-001 - Pages of a review page show as one article per subdomain** (AC-1, Epic AC-1) | Priority: High | Smoke: Yes | Regression: Yes | Functional | Label: review-grouping | happy

- Description: Verify that the paginated pages of one review page show as one article per subdomain instead of one article per page. Covers AC-1 (epic AC-1). Figma 1.0 (today: 13 page articles) vs 1.1 (2 articles).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source with several ?page=N pages of the same review page on two subdomains. Production CNP Assurances only if the user approves a read-only check (P6). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: CNP Assurances (production example of the epic, read-only; UUID to find) or a staging equivalent with a paginated Trustpilot review page on fr. and fr-be. subdomains (open point P6)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then the fr.trustpilot.com pages show as one article → One article "Avis de CNP Assurances" with the URL line fr.trustpilot.com/review/cnp.fr and page blocks fr.trustpilot.com/review/cnp.fr?page=2, ?page=3 …
- Step 4 — And the fr-be.trustpilot.com pages show as another article → A second article "Avis de CNP Assurances" with the URL line fr-be.trustpilot.com/review/cnp.fr
- Step 5 — And no article is listed per page URL → No article row per ?page=N; the tab count reads articles (e.g. "Negative perception (2)" instead of 13)

**TC-GEO-1548-002 - Two pages on the same host with different paths are never grouped** (AC-2, Epic AC-6) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-grouping | error

- Description: Verify that two pages on the same host with different paths stay two articles. Covers AC-2 (epic AC-6).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source with two review pages on the same host and different paths (e.g. fr.trustpilot.com/review/cnp.fr and fr.trustpilot.com/review/cnp-prevoyance.fr, or /categories/assurance_vie). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Review Sites source with pages /review/{company-a} and /review/{company-b} on the same host] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then each path shows as its own article → Two articles, URL lines fr.trustpilot.com/review/cnp.fr and fr.trustpilot.com/review/cnp-prevoyance.fr (Figma 1.4)
- Step 4 — And no page block of one article belongs to the other path → Every page block URL shares the path of its article

**TC-GEO-1548-003 - Two subdomains of the same review page are never grouped** (AC-2) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-grouping | error

- Description: Verify that the same review page on different subdomains gives one article per subdomain. Covers AC-2 (subdomains).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: Victoria's Secret 0bd0b48c (www / uk / nl-be trustpilot), to confirm in JDD. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Victoria's Secret 0bd0b48c, source trustpilot.com] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then www.trustpilot.com, uk.trustpilot.com and nl-be.trustpilot.com show as separate articles → One article per subdomain, each with its own URL line
- Step 4 — And their reviews are not mixed → Every page block URL has the subdomain of its article

**TC-GEO-1548-004 - Grouped article title is the page title without the page part** (AC-3) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-title | happy

- Description: Verify that the title of a grouped article drops the page part of the page title. Covers AC-3. Figma 1.1: "Avis de CNP Assurances". Title formats of other review sites: open point P3 (not tested).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: Trustpilot pages titled "Avis de {company} | Lisez les avis marchands de {domain} | N sur M" (or English "… | Read Customer Service Reviews of … | N of M"). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: CNP Assurances (production example of the epic, read-only; UUID to find) or a staging equivalent with a paginated Trustpilot review page on fr. and fr-be. subdomains (open point P6)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — And the user opens a page block link and reads the title of the live page → Live title e.g. "Avis de CNP Assurances | Lisez les avis marchands de cnp.fr | 2 sur 30"
- Step 4 — Then the article title is the page title without the page part → Article title "Avis de CNP Assurances"
- Step 5 — And no article title holds a page part → No "| 2 sur 30", "N of M" or "Page N" in the titles of the grouped articles

**TC-GEO-1548-005 - Grouped article is negative when at least one of its pages is negative** (AC-4) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-tabs | state

- Description: Verify that a grouped article shows in Negative perception when only some of its pages are negative. Covers AC-4 (first part).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article where some pages hold negative reviews and others none. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Grouped article with pages with and without negative reviews (Figma 1.2: page 9 has none)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then the article is in Negative perception → The article is listed and counted in "Negative perception (N)"
- Step 4 — And only its negative pages show as page blocks → Blocks only for the pages with negative reviews

**TC-GEO-1548-006 - Grouped article whose pages never name the brand shows in Lack of visibility** (AC-4, Epic AC-9) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-tabs | state

- Description: Verify that a grouped article shows in Lack of visibility when none of its pages names the brand. Covers AC-4 (second part, epic AC-9).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page whose pages never name the brand (e.g. a competitor or category page on Trustpilot, Figma 1.3 "Avis Generali Vie"). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Review Sites source with a paginated competitor / category review page] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel and selects the tab "Lack of visibility" → Subtitle "None of these articles mentions {brand} anywhere on the page."
- Step 3 — Then the review page shows as one article → One article (e.g. "Avis Generali Vie", fr.trustpilot.com/review/generali.fr) counted once in "Lack of visibility (N)"
- Step 4 — And none of its pages names the brand on the live page → Search of the brand on each listed page returns nothing

**TC-GEO-1548-007 - Grouped article is not in Lack of visibility when one of its pages names the brand** (AC-4, Epic AC-9) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-tabs | error

- Description: Verify that a grouped article with at least one page naming the brand is not in Lack of visibility. Covers AC-4 (negative, epic AC-9 second part).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article where one page names the brand and the others do not. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Grouped review page where only one page names the brand] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel and selects the tab "Lack of visibility" → Lack of visibility list shown
- Step 3 — Then the grouped article is not listed in Lack of visibility → No article with that URL line; not counted in "Lack of visibility (N)"
- Step 4 — And none of its pages shows there as a separate article → No page URL of the group in the Lack of visibility tab

**TC-GEO-1548-008 - Card lines and panel tab counts give the same number of articles** (AC-5, Epic AC-7) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-counts | happy

- Description: Verify that the card and the panel tabs count articles, not pages. Covers AC-5 (epic AC-7). Figma 1.1: card "Not visible in 2 articles / Negative perception in 2 articles", tabs "Lack of visibility (2)" "Negative perception (2)".
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source with grouped articles in both tabs. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: CNP Assurances (production example of the epic, read-only; UUID to find) or a staging equivalent with a paginated Trustpilot review page on fr. and fr-be. subdomains (open point P6)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user reads the lines of the Review Sites card → "Not visible in N1 articles" and "Negative perception in N2 articles"
- Step 3 — And the user opens the panel of the card → Tabs "Lack of visibility (X1)" and "Negative perception (X2)"
- Step 4 — Then the card and the tabs give the same numbers → N1 = X1 and N2 = X2
- Step 5 — And each number counts grouped articles → X2 = number of article rows in Negative perception (not the number of pages or reviews)

**TC-GEO-1548-009 - Cards are sorted by the article count of review sites** (AC-5) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-counts | happy

- Description: Verify that the cards are sorted by the article count, so a review site no longer ranks first only because it is paginated. Covers AC-5 (sort). Sort rule of the cards to read with GEO-1184 (sort by prompts) at execution.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an analysis where a paginated review site ranked first before the deploy (e.g. CNP trustpilot.com, 1.0: 10 / 13 page articles). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: CNP Assurances (production example of the epic, read-only; UUID to find) or a staging equivalent with a paginated Trustpilot review page on fr. and fr-be. subdomains (open point P6)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user reads the rank and the article counts of the cards → Each card shows its rank and its article lines
- Step 3 — Then the rank order follows the article counts of the cards → The review site card is placed by its grouped article count (with the GEO-1184 tie rules), not by its page count

**TC-GEO-1548-010 - Excel export gives the same article count as the card** (AC-5, Epic AC-7) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: export-xlsx | happy

- Description: Verify that the Target Sources sheet of the Excel export counts grouped articles like the card and the panel. Covers AC-5 (export XLSX, epic AC-7).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source with grouped articles; export language = interface language (en-GB). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: CNP Assurances (production example of the epic, read-only; UUID to find) or a staging equivalent with a paginated Trustpilot review page on fr. and fr-be. subdomains (open point P6)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — And the user notes the card lines of the Review Sites source → "Not visible in N1 articles" / "Negative perception in N2 articles"
- Step 3 — When the user exports the analysis as "Spreadsheet .xls" [data: Same analysis, period and filters as the app] → A .xlsx file is downloaded
- Step 4 — Then the Target Sources sheet gives the same counts for the source [data: Sheet Target Sources] → Its "Brand absent" value = N1 and its "Depicted negatively" value = N2
- Step 5 — And the source rank matches the card order → Same rank as in the app

**TC-GEO-1548-011 - PDF export gives the same article count as the card** (AC-5) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: export-pdf | happy

- Description: Verify that the Target Sources page of the PDF export (last page, GEO-1173) counts grouped articles like the card. Covers AC-5 (export PDF).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source with grouped articles. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: CNP Assurances (production example of the epic, read-only; UUID to find) or a staging equivalent with a paginated Trustpilot review page on fr. and fr-be. subdomains (open point P6)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — And the user notes the card lines of the Review Sites source → N1 + N2 failing articles noted
- Step 3 — When the user exports the analysis as "PDF" [data: Same analysis, period and filters as the app] → A .pdf file is downloaded
- Step 4 — Then the Target Sources page gives the same failing article count for the source [data: Last page "ACTION CENTER · TARGET SOURCES"] → "Failing articles" of the source = the card total in articles, not pages

**TC-GEO-1548-012 - PowerPoint export gives the same article count as the card** (AC-5) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: export-pptx | happy

- Description: Verify that the Target Sources slide of the PowerPoint export (last slide, GEO-1173) counts grouped articles like the card. Covers AC-5 (export PPTX).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source with grouped articles. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: CNP Assurances (production example of the epic, read-only; UUID to find) or a staging equivalent with a paginated Trustpilot review page on fr. and fr-be. subdomains (open point P6)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — And the user notes the card lines of the Review Sites source → N1 + N2 failing articles noted
- Step 3 — When the user exports the analysis as "Presentation .pptx" [data: Same analysis, period and filters as the app] → A .pptx file is downloaded
- Step 4 — Then the Target Sources slide gives the same failing article count for the source [data: Last slide "ACTION CENTER · TARGET SOURCES"] → "Failing articles" of the source = the card total in articles, not pages

**TC-GEO-1548-013 - Article with pages of 4, 2, 3 and 2 negative reviews counts 11 in the panel** (AC-6) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-counts | happy

- Description: Verify that the chip of a grouped article is the sum of the negative reviews of its pages. Covers AC-6 (panel).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article with several page blocks (exact case 4 + 2 + 3 + 2 = 11 if available, else any group: sum of the blocks). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with 4 page blocks of 4, 2, 3 and 2 negative reviews] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user clicks "Show N more reviews" if present and adds the page block counts → 4 + 2 + 3 + 2 = 11
- Step 3 — Then the chip under the article title reads the sum → "11 negative reviews"

**TC-GEO-1548-014 - XLSX export shows the number of negative reviews per article, not the quotes** (AC-6) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: export-xlsx | happy

- Description: Verify that the XLSX export shows the number of negative reviews per grouped article and no quote. Covers AC-6 (export XLSX). Epic scope 3: "The export shows the number of negative reviews per article, not the quotes". Location and label of the number not specified: open point P5.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article whose chip is noted in the app (e.g. "11 negative reviews"). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with its chip "N negative reviews" noted] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user exports the analysis as "Spreadsheet .xls" [data: Same analysis, period and filters as the app] → A .xlsx file is downloaded
- Step 3 — Then the export shows the number of negative reviews of the article [data: Sheet Target Sources] → [Open point P5 — expected to confirm] The number equals the chip of the app (e.g. 11); QA records where and with which label it is shown
- Step 4 — And the export shows no review quote → No review text of the article in the export

**TC-GEO-1548-015 - PDF export shows the number of negative reviews per article, not the quotes** (AC-6) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: export-pdf | happy

- Description: Verify that the PDF export shows the number of negative reviews per grouped article and no quote. Covers AC-6 (export PDF). Epic scope 3: "The export shows the number of negative reviews per article, not the quotes". Location and label of the number not specified: open point P5.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article whose chip is noted in the app (e.g. "11 negative reviews"). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with its chip "N negative reviews" noted] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user exports the analysis as "PDF" [data: Same analysis, period and filters as the app] → A .pdf file is downloaded
- Step 3 — Then the export shows the number of negative reviews of the article [data: Last page "ACTION CENTER · TARGET SOURCES"] → [Open point P5 — expected to confirm] The number equals the chip of the app (e.g. 11); QA records where and with which label it is shown
- Step 4 — And the export shows no review quote → No review text of the article in the export

**TC-GEO-1548-016 - PPTX export shows the number of negative reviews per article, not the quotes** (AC-6) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: export-pptx | happy

- Description: Verify that the PPTX export shows the number of negative reviews per grouped article and no quote. Covers AC-6 (export PPTX). Epic scope 3: "The export shows the number of negative reviews per article, not the quotes". Location and label of the number not specified: open point P5.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article whose chip is noted in the app (e.g. "11 negative reviews"). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with its chip "N negative reviews" noted] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user exports the analysis as "Presentation .pptx" [data: Same analysis, period and filters as the app] → A .pptx file is downloaded
- Step 3 — Then the export shows the number of negative reviews of the article [data: Last slide "ACTION CENTER · TARGET SOURCES"] → [Open point P5 — expected to confirm] The number equals the chip of the app (e.g. 11); QA records where and with which label it is shown
- Step 4 — And the export shows no review quote → No review text of the article in the export

**TC-GEO-1548-017 - Non-review source keeps one article per URL** (AC-7) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: non-review-unchanged | happy

- Description: Verify that a source not classified Review Sites keeps one article per URL. Covers AC-7. PO / dev decision D2 (GEO-1226 comment 868944): grouping on Review Sites only.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Journalism source with several URLs of the same host.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Toyota QA-GEO 439acd96, Journalism source with several URLs] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Journalism source → The panel shows the badge "Journalism"
- Step 3 — Then every URL is its own article → One article row per URL, URL line as a link, no page block, no chip
- Step 4 — And the card and the tab count URLs as before → Card lines = tab counts = number of URL rows

**TC-GEO-1548-018 - Prompts associated with this source section is unchanged** (AC-7) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: prompts-section | happy

- Description: Verify that the "Prompts associated with this source" section does not change for a Review Sites source. Covers AC-7. Figma 1.3: tabs "All", "Gemini (2)", "ChatGPT (1)".
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source cited by at least two engines. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: CNP Assurances (production example of the epic, read-only; UUID to find) or a staging equivalent with a paginated Trustpilot review page on fr. and fr-be. subdomains (open point P6)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — And the user scrolls to the section "Prompts associated with this source" → The section shows the tabs "All" and one tab per engine with its count (e.g. "Gemini (2)", "ChatGPT (1)")
- Step 4 — Then the section lists the prompts as before → One prompt row per prompt with its engine and country icons; no review entries and no grouping in this section

**TC-GEO-1548-019 - Pagination parameters page, p and pg of one review page share one article** (TAC1) | Priority: Low | Smoke: No | Regression: No | Functional | Label: review-grouping | edge

- Description: Verify that the pages of one review page using ?page=, ?p= or ?pg= share one article on a Review Sites source. Covers TAC1 (partly verifiable: only the parameters present in real data; other parameters need the dev unit test evidence).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: Review Sites pages with the parameters present in real data (e.g. ?page= on Trustpilot; ?p= / ?pg= if any). For the parameters not found: dev evidence (unit test of articleKey). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Review page with page 1 (no parameter) and ?page=N pages; other parameters if found] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the page block URLs of the article → Page blocks listed in page order
- Step 3 — Then page 1 and the ?page= / ?p= / ?pg= pages of the same path are in the same article → One article for the path
- Step 4 — And a page of another company on the same host has its own article [data: e.g. fr.trustpilot.com/review/axa.fr?page=2] → Separate article

**TC-GEO-1548-020 - Journalism URLs with ?p= stay two articles** (TAC2) | Priority: Low | Smoke: No | Regression: No | Functional | Label: non-review-unchanged | error

- Description: Verify that WordPress-like ?p= URLs of a Journalism source are never grouped. Covers TAC2. Decision D2 (GEO-1226 comment 868944). If no such source exists: dev evidence.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Journalism source with two URLs that differ only by ?p= (e.g. blog.example.com/?p=12 and ?p=34); if none, Needs dev evidence (logs / DB).
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Journalism source with ?p=12 and ?p=34 URLs] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Journalism source → Article rows shown
- Step 3 — Then the two ?p= URLs are two articles → Two rows, each with its own passage

**TC-GEO-1548-021 - NOT_FETCHED page counts nowhere and card, panel and Excel agree** (TAC3) | Priority: Low | Smoke: No | Regression: No | Functional | Label: tech-dev-evidence | error

- Description: Verify that a NOT_FETCHED page of a group is not counted and that card, panel and XLSX give the same article count. Covers TAC3 (the NOT_FETCHED state is not visible in the UI).
- Precondition: Needs dev evidence (logs / DB): not verifiable in the UI; QA records the evidence shared by the dev (unit test, log or query result). Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: the dev names a review site with a NOT_FETCHED page in a group.
- Step 1 — Given the dev identifies a group with one NOT_FETCHED page [data: Dev query or log] → Page URL and group noted
- Step 2 — When the user reads the card, the panel tabs and the Excel export of that source → Three counts noted
- Step 3 — Then the three counts are equal → Card = panel = XLSX
- Step 4 — And the NOT_FETCHED page shows nowhere → No page block or article for that URL

**TC-GEO-1548-022 - Group with all pages NOT_FETCHED or CHECK_FAILED is in no tab** (TAC4) | Priority: Low | Smoke: No | Regression: No | Functional | Label: tech-dev-evidence | error

- Description: Verify that a group whose pages are all NOT_FETCHED or CHECK_FAILED is in no tab (no vacuous Lack of visibility). Covers TAC4.
- Precondition: Needs dev evidence (logs / DB): not verifiable in the UI; QA records the evidence shared by the dev (unit test, log or query result). Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: the dev names such a group.
- Step 1 — Given the dev identifies a group whose pages are all NOT_FETCHED or CHECK_FAILED [data: Dev query or log] → Group noted
- Step 2 — When the user opens the panel of the source → Both tabs readable
- Step 3 — Then the group shows in neither Lack of visibility nor Negative perception → No article for the group in either tab

**TC-GEO-1548-023 - URL variants of one review page are not merged** (AC-2) | Priority: Low | Smoke: No | Regression: No | Functional | Label: review-grouping | edge

- Description: Verify the conservative default: scheme, www or trailing-slash variants of one review page are never merged. Dev decision D7 (GEO-1548 dev note). Two articles for such variants are expected, not a bug. Covers AC-2 (never grouped beyond the pagination parameter).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page cited with two URL variants (http / https, www / no www, trailing slash), if found. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Review page cited as two URL variants] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the URL lines of the articles → Both variants found
- Step 3 — Then each variant is its own article → Two articles, not merged

**TC-GEO-1548-024 - Page without stored reviews inside a grouped article** (AC-4, GEO-1549 AC-1, P1 answered 873111, related bug GEO-1585) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: open-point | state

- Description: Verify that a page without stored reviews inside a multi-page article shows no classic passage, and that a grouped article none of whose pages holds a stored review does not count as negative. PO answer P1 (GEO-1226 comment 873111, 2026-11-04): no review stored = no negative page and no negative article (not in the tab, on the card or in the export); no classic passage for a merged page (GEO-1224). Covers AC-4 / GEO-1549 AC-1. Related bug: GEO-1585.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article holding one page without stored reviews (comparison page or not re-judged). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with one page without stored reviews (dev to name it, P9)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the page blocks of the article → Page blocks listed
- Step 3 — Then the page without stored reviews shows no classic passage → No page block, no entry and no classic passage for that page
- Step 4 — And a grouped article with no stored review is not counted as negative [data: e.g. Orange 16cdf040, Last 30 days, trustpilot.com: ie.trustpilot.com/review/www.orange.ma (pages = [])] → Not listed in the Negative perception tab, not counted in the tab, on the source card or in the export

**TC-GEO-1548-025 - Comparison page alone in its article keeps its classic passage** (AC-7) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: comparison-page | state

- Description: Verify that a page without stored reviews keeps its classic passage when it is the only page of its article. Dev decision D6 (GEO-1548 dev note) and PO decision D1 (GEO-1226 comment 869090). Covers AC-7.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a comparison page on a Review Sites domain with no other page in its article (e.g. Great Eastern 595928ee seedly.sg). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Great Eastern 595928ee, seedly.sg comparison page] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then the comparison page shows as an article with its classic passage → One passage naming the brand, no "N negative reviews" chip, URL line as a link

**TC-GEO-1548-026 - Card and panel counts agree on a non-review source** (AC-5) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-counts | happy

- Description: Verify that the card and the panel tab counts agree on a non-review source (GEO-1548 technical part: the panel query gets the VERIFIED filter the card already has; before, they could disagree). Covers AC-5 (same number everywhere).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: several non-review sources of one analysis.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Toyota QA-GEO 439acd96] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user reads the card lines of 3 non-review sources and opens their panels → Card lines and tab counts noted
- Step 3 — Then each card line equals its panel tab count → "Not visible in N articles" = "Lack of visibility (N)"; "Negative perception in M articles" = "Negative perception (M)"

### GEO-1549 — STORY-49.3 Show review pages in the Target Sources panel

**TC-GEO-1549-001 - Reviews are listed by page in page order under page URL links** (AC-1, Epic AC-3) | Priority: High | Smoke: Yes | Regression: Yes | Functional | Label: review-panel | happy

- Description: Verify that a grouped article lists its reviews by page, in page order, each page block starting with the page URL as a link that opens the page, then its count, then its reviews. Covers AC-1 (epic AC-3: page block opens the page). Figma 1.1 / 1.2.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article with at least 3 page blocks. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/02_1.1_Review_page_as_one_article_quotes_only_first_10_reviews.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Grouped review article with >= 3 pages (e.g. MSC dc801726 fr.trustpilot.com, or CNP)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source and selects the tab "Negative perception" [data: Source with the badge "Review Sites" (e.g. trustpilot.com)] → The panel header shows "#N · trustpilot.com" with the chip "Review Sites"; the tab "Negative perception (N)" is active with the subtitle "Each of these articles mentions {brand} negatively."
- Step 3 — Then the page blocks are listed in page order → e.g. fr.trustpilot.com/review/cnp.fr?page=2, then ?page=3, then ?page=4 (increasing page number)
- Step 4 — And each page block starts with its page URL then its count → Header "fr.trustpilot.com/review/cnp.fr?page=2" then "4 negative reviews", then its entries
- Step 5 — When the user clicks the page URL of a page block → The page of that URL opens (e.g. ?page=2), not page 1 or another page

**TC-GEO-1549-002 - Long page URL is shown in full in the page block** (AC-1) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-panel | edge

- Description: Verify that a long page URL shows in full (wrapped, not truncated). Covers AC-1 ("The URL shows in full even when it is long"). Figma gap E16: no long URL in the frames; designer rationale "The header wraps when the URL is long".
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a review page with a long URL (long company slug or extra parameters), standard viewport (panel scrolls at 832 px height). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Page block with a URL longer than the panel width] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the header of that page block → The URL is displayed
- Step 3 — Then the whole URL is visible → The URL wraps on several lines; no ellipsis, no cut, no horizontal scroll
- Step 4 — And the count follows the URL → "N negative reviews" still shown after the URL

**TC-GEO-1549-003 - Article chip reads the number of negative reviews** (AC-2) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-chip | happy

- Description: Verify the chip under the title of a grouped article and the absence of page count and "of 20 reviews". Covers AC-2. Figma 1.1: chip "17 negative reviews" (rendered upper case, see TC-GEO-1549-020). PO decision D3 (GEO-1497 comment 865680).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article with more than 1 negative review (17 in the AC example). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with 17 (or N > 1) negative reviews] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the line under the article title → A chip is shown under the URL line
- Step 3 — Then the chip reads the number of negative reviews of the article → "17 negative reviews" (case-insensitive), = sum of its page block counts
- Step 4 — And there is no page count and no total of reviews → No "N pages" chip, no "of 20 reviews"

**TC-GEO-1549-004 - Singular form for one negative review** (AC-2, AC-1) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-chip | edge

- Description: Verify the _one form of the string negativeReviews on the chip and on a page block. Covers AC-2 / AC-1 (boundary 1). Strings locked 2026-10-22: "1 negative review"; Figma 1.1 page block "1 negative review".
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an article with exactly 1 negative review (chip) and a page block with 1 review. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Article with 1 negative review; grouped article with a page block of 1 review (Figma 1.1 fr-be ?page=4)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the chip of the article with 1 negative review → "1 negative review" (not "1 negative reviews")
- Step 3 — Then the page block with one review reads the singular count → "1 negative review"

**TC-GEO-1549-005 - URL line of a grouped article is plain text** (AC-3) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-url-line | happy

- Description: Verify that the URL line of an article grouping several pages is plain text. Covers AC-3 (first part). Figma 1.1: "fr.trustpilot.com/review/cnp.fr" plain line.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article (e.g. fr.trustpilot.com/review/cnp.fr)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user hovers and clicks the URL line under the article title → No pointer cursor, no underline
- Step 3 — Then nothing opens → The URL line "fr.trustpilot.com/review/cnp.fr" is plain text; only the page block URLs open pages

**TC-GEO-1549-006 - One-page review page shows its reviews under the title with a linked URL line** (AC-3, TAC2) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-one-page | happy

- Description: Verify that a review page with one page has no page block, its reviews under the title and a URL line that opens the page. Covers AC-3 (second part) and TAC2 (one page, 3 reviews). Figma 1.4: "Avis de CNP Assurances Prévoyance", "fr.trustpilot.com/review/cnp-prevoyance.fr", "3 negative reviews".
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites URL with no pagination and 3 (or N) negative reviews. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/05_1.4_One-page_review_page_no_page_block_reviews_under_the_title.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: One-page review page with 3 negative reviews] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the one-page article → Title, URL line, chip "3 negative reviews"
- Step 3 — Then its reviews show directly under the title → 3 entries, no page block header
- Step 4 — When the user clicks the URL line → The page (e.g. fr.trustpilot.com/review/cnp-prevoyance.fr) opens, as today

**TC-GEO-1549-007 - Entry is the quote only, without user name, rating or date** (AC-4) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-entry | happy

- Description: Verify that each entry is the quote only. Covers AC-4. PO decision D3 (GEO-1497 comment 865680, 2026-10-21). Figma: grey card, purple bar, italic text in quotes.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: any grouped article with entries. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with entries] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads each entry → Each entry is a quoted text, e.g. “A EVITER ABSOLUMENT - POUR PRENDRE VOTRE ARGENT ILS SONT FORTS”
- Step 3 — Then no entry shows the user name, the rating or the date → No reviewer name, no stars or "{rating}/5", no date next to or inside the entries

**TC-GEO-1549-008 - Article with more than 10 reviews shows the first 10 then Show 7 more reviews** (AC-5, TAC1, Epic AC-8) | Priority: High | Smoke: Yes | Regression: Yes | Functional | Label: review-show-more | happy

- Description: Verify the Show more step of an article: first 10 reviews, step counting reviews, cut inside a page with its header shown. Covers AC-5 and TAC1 (epic AC-8). Figma 1.1: blocks 4 + 2 + 3 + 1 of 2 (page 5), "Show 7 more reviews". Open point P2 for more than 20 reviews (TC-GEO-1549-013).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an article with 17 negative reviews over pages of 4, 2, 3, 2 then 6 more (exact TAC1 case if available; else any article with 11 to 20 reviews: expected "Show {total-10} more reviews"). Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/02_1.1_Review_page_as_one_article_quotes_only_first_10_reviews.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Article with 17 negative reviews (pages 4, 2, 3, 2, then 6 more)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user counts the entries shown before any click → 10 entries
- Step 3 — Then the cut inside page 5 shows its header above its first review → Page block "…?page=5" with "2 negative reviews" and 1 entry shown
- Step 4 — And the button below reads the number of remaining reviews → "Show 7 more reviews" (reviews, not pages)

**TC-GEO-1549-009 - Click on Show 7 more reviews shows all 17 reviews in page order** (AC-5, TAC1) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-show-more | state

- Description: Verify that after the click the rest of the reviews show, in page order. Covers AC-5 ("the rest shows after the click") and TAC1 (17 entries after the click). Figma 1.2: 8 page blocks ?page=2 … ?page=10, page 9 absent.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: same article as TC-GEO-1549-008. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/03_1.2_Show_more_expanded_all_17_reviews.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Article with 17 negative reviews collapsed at 10] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user clicks "Show 7 more reviews" → The article expands
- Step 3 — Then 17 entries are shown → 17 entries; the second review of page 5 shows under the same page 5 block
- Step 4 — And the page blocks follow page order → e.g. ?page=2, 3, 4, 5, 6, 7, 8, 10; the sum of block counts = 17 = chip

**TC-GEO-1549-010 - [Figma] Expanded article has no button left and no Show less** (Figma E3, AC-5) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: figma | state

- Description: [Figma] Verify that once expanded, the article has no Show more button left and no "Show less". Figma gap E3 (frame 1.2, state without AC). Covers AC-5.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: same article as TC-GEO-1549-008 (11 to 20 reviews). Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/03_1.2_Show_more_expanded_all_17_reviews.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Article with 11 to 20 negative reviews] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user clicks "Show N more reviews" → All reviews shown
- Step 3 — Then no button is left in the article → No "Show N more reviews" and no "Show less" in the article

**TC-GEO-1549-011 - Article with exactly 10 reviews has no Show more button** (AC-5) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-show-more | edge

- Description: Verify the boundary of the Show more step: an article with 10 negative reviews or fewer shows all of them and no button. Covers AC-5 (boundary "more than 10").
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an article with exactly 10 (or 2 to 10) negative reviews. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Article with exactly 10 negative reviews] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the article → Chip "10 negative reviews"
- Step 3 — Then all 10 entries are shown → 10 entries
- Step 4 — And there is no Show more button in the article → No "Show N more reviews"

**TC-GEO-1549-012 - Article with 11 reviews shows Show 1 more review** (AC-5, Figma E13) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-show-more | edge

- Description: Verify the singular form of showMoreReviews. Covers AC-5. Figma gap E13: "Show 1 more review" is only in the strings list (no frame); strings locked 2026-10-22.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an article with exactly 11 negative reviews. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Article with 11 negative reviews] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the bottom of the article → 10 entries shown
- Step 3 — Then the button reads the singular form → "Show 1 more review"
- Step 4 — When the user clicks it → 11 entries shown, no button left

**TC-GEO-1549-013 - Show more on an article with more than 20 reviews** (AC-5, Open point P2) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: open-point | state

- Description: Check the Show more step when more than 10 reviews remain. Open point P2 (epic "the same step as the articles list (GEO-1161)" vs Figma 1.2 "the rest comes after the click"; Figma gap E4). Covers AC-5.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an article with more than 20 negative reviews (several pages of up to 10). Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Article with > 20 negative reviews (e.g. 25)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the button under the first 10 reviews → [Open point P2 — expected to confirm] "Show 15 more reviews" (all remaining) or "Show 10 more reviews" (next step); QA records the text
- Step 3 — And the user clicks it → [Open point P2 — expected to confirm] all remaining reviews, or the next 10 with a new button; QA records the result

**TC-GEO-1549-014 - Cited-by icons of an article are the engines citing any of its pages** (AC-6) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-engines | happy

- Description: Verify that the cited-by icons of a grouped article are the union of the engines citing its pages. Covers AC-6. PO decision D3 (GEO-1497 comment 865680). Figma 1.1: Gemini + ChatGPT icons on the article row only.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a multi-engine analysis (AI Engines >= 2) with a grouped article whose pages are cited by different engines; engines per page from the Prompts section, the AI Engines filter or the API. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Multi-engine analysis, grouped article with page A cited by Gemini only and page B by ChatGPT only] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user notes the engines citing each page [data: AI Engines filter set to one engine at a time] → Engines per page noted
- Step 3 — Then the article row shows the icons of all these engines [data: AI Engines filter: all] → Gemini and ChatGPT icons on the article row
- Step 4 — And the page blocks show no engine icons → Icons only on the article row

**TC-GEO-1549-015 - Lack of visibility review article shows its pages as links without quotes** (AC-7, Epic AC-9) | Priority: High | Smoke: No | Regression: Yes | Functional | Label: review-lack-of-visibility | happy

- Description: Verify that a review page whose pages never name the brand shows in Lack of visibility as one article with its pages as links and no quotes. Covers AC-7 (epic AC-9). Figma 1.3: subtitle "None of these articles mentions CNP Assurances anywhere on the page.", article "Avis Generali Vie" with 6 page links.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a paginated review page whose pages never name the brand. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/04_1.3_Lack_of_visibility_tab_review_pages_with_no_mention_of_the_brand.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Review Sites source with a paginated competitor / category review page] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel and selects the tab "Lack of visibility" → Subtitle "None of these articles mentions {brand} anywhere on the page."
- Step 3 — Then the review page shows as one article with one link per page → e.g. "Avis Generali Vie", links fr.trustpilot.com/review/generali.fr, …?page=2 … ?page=6
- Step 4 — And no quote is shown → No entry, no passage under the article
- Step 5 — When the user clicks one page link → That page opens

**TC-GEO-1549-016 - [Figma] Lack of visibility review article has no chip and no count** (Figma E7, AC-7) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: figma | happy

- Description: [Figma] Verify the Lack of visibility layout of a grouped article: no chip, no count per page, page 1 listed as a link, URL line plain. Figma gap E7 (frame 1.3, note 1.3 "no quote and no badge"; designer comment 865921). Covers AC-7.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: same as TC-GEO-1549-015. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/04_1.3_Lack_of_visibility_tab_review_pages_with_no_mention_of_the_brand.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Review Sites source with a paginated review page in Lack of visibility] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel and selects the tab "Lack of visibility" → The grouped article is listed
- Step 3 — Then the article has no "N negative reviews" chip → No chip under the URL line
- Step 4 — And the page links have no count → Each page line is the URL with the open_in_new icon only
- Step 5 — And page 1 is listed as a link and the URL line is plain text → First link e.g. fr.trustpilot.com/review/generali.fr; the grey URL line under the title does not open anything

**TC-GEO-1549-017 - [Figma] Pages without a negative review are not listed as page blocks** (Figma E5, AC-1) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: figma | edge

- Description: [Figma] Verify that no page block is empty: a page without negative review is not listed. Figma gap E5 (frames 1.1 / 1.2: page 1 and page 9 absent; rationale "Pages without a negative review are not listed"). Covers AC-1.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article where some pages hold no negative review. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/03_1.2_Show_more_expanded_all_17_reviews.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with gaps in page numbers (e.g. ?page=8 then ?page=10)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user clicks "Show N more reviews" if present and reads all page blocks → All page blocks shown
- Step 3 — Then every page block has a count of at least 1 and at least 1 entry → No block with "0 negative reviews" or without entry
- Step 4 — And a page without negative review has no block → e.g. ?page=9 absent

**TC-GEO-1549-018 - [Figma] Page block link opens in a new tab with the external icon** (Figma E6, AC-1) | Priority: Low | Smoke: No | Regression: No | UI | Label: figma | happy

- Description: [Figma] Verify that the page block URL is a link with the open_in_new icon that opens a new tab. Figma gap E6 (frame 1.1, rationale "opens the page in a new tab"). Covers AC-1.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: any grouped article. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/02_1.1_Review_page_as_one_article_quotes_only_first_10_reviews.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads a page block header → URL link followed by the open_in_new icon, underlined on hover
- Step 3 — And the user clicks the URL → The page opens in a new browser tab; the GEO panel stays open in the first tab

**TC-GEO-1549-019 - [Figma] Dropped texts are not shown** (Figma E10, AC-2, AC-4) | Priority: Low | Smoke: No | Regression: No | Functional | Label: figma | error

- Description: [Figma] Verify that the texts dropped at the design review are not shown: "{n} pages", "Page {n}", "{rating}/5", "of 20 reviews". Figma gap E10 (rationale "Dropped after review"), consistent with PO decision D3 (GEO-1497 comment 865680). Covers AC-2 / AC-4.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article and a one-page article. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article and one-page article] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the article rows, page blocks and entries, expanded → All texts shown
- Step 3 — Then none of the dropped texts is shown → No "N pages", no "Page N" header, no "N/5" rating, no "of 20 reviews"

**TC-GEO-1549-020 - [Figma] Article chip is rendered in upper case** (Figma E2, AC-2) | Priority: Low | Smoke: No | Regression: No | UI | Label: figma | happy

- Description: [Figma] Verify the style of the article chip: the string "17 negative reviews" is rendered in upper case. Figma gap E2 (frames 1.1 to 2.1 show "17 NEGATIVE REVIEWS"; text-case style). Covers AC-2.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a grouped article. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/02_1.1_Review_page_as_one_article_quotes_only_first_10_reviews.png.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Grouped article with 17 (or N) negative reviews] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user reads the chip under the URL line → Chip shown
- Step 3 — Then the chip text is displayed in upper case → "17 NEGATIVE REVIEWS" (same text as "17 negative reviews", style only)

**TC-GEO-1549-021 - [Figma] One-page and grouped URL lines look the same but only one is a link** (Figma E9, AC-3) | Priority: Low | Smoke: No | Regression: No | UI | Label: figma | happy

- Description: [Figma] Verify that the URL line of a one-page article and of a grouped article share the same grey style while only the one-page line is a link. Figma gap E9 (frame 1.4). Covers AC-3.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a one-page article and a grouped article in the same tab. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/05_1.4_One-page_review_page_no_page_block_reviews_under_the_title.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: One-page article above a grouped article (Figma 1.4)] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user compares the two URL lines → Same grey text style
- Step 3 — Then only the one-page URL line opens a page → Click on fr.trustpilot.com/review/cnp-prevoyance.fr opens the page; click on fr-be.trustpilot.com/review/cnp.fr opens nothing

**TC-GEO-1549-022 - [Figma] Panel header, tab subtitles and footer are unchanged** (Figma E8) | Priority: Low | Smoke: No | Regression: No | UI | Label: figma | happy

- Description: [Figma] Regression check of the texts the epic does not change. Figma gap E8 (frames 1.1 / 1.3): subtitles "Each of these articles mentions {brand} negatively." and "None of these articles mentions {brand} anywhere on the page.", header chips, footer navigation.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source in both tabs. Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages
- Step 1 — Given the user is on Actions Center > Target Sources of analysis A [data: Review Sites source in both tabs (e.g. CNP or MSC dc801726)] → The Target Sources cards are displayed with the tabs ALL, IMPROVE VISIBILITY and IMPROVE PERCEPTION
- Step 2 — When the user opens the panel of the Review Sites source → Header "#N · trustpilot.com" with chips "Review Sites", "Improve visibility", "Improve perception"
- Step 3 — Then the Negative perception subtitle is unchanged → "Each of these articles mentions {brand} negatively."
- Step 4 — And the Lack of visibility subtitle is unchanged [data: Tab "Lack of visibility"] → "None of these articles mentions {brand} anywhere on the page."
- Step 5 — And the footer navigation is unchanged → "Previous" · "Source N of M" · "Next source"

**TC-GEO-1549-023 - Show more reviews and Show more articles work together in one tab** (AC-5, Figma E17) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: review-show-more | state

- Description: Exploratory check of the article Show more ("Show N more reviews", AC-5) combined with the list Show more ("Show N more articles", GEO-1161) in the same tab. Figma gap E17 (AC without design; frame 1.0 shows "Show 8 more articles"). Covers AC-5.
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: a Review Sites source with more than 10 articles in one tab and one article with more than 10 reviews. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the Negative perception tab of the panel of a Review Sites source is open [data: Tab with > 10 articles, one of them with > 10 reviews] → The grouped articles of the source are listed with their page blocks and entries
- Step 2 — When the user clicks "Show N more reviews" in the article → Only that article expands; the list button "Show N more articles" keeps its number
- Step 3 — And the user clicks "Show N more articles" → The next articles show; the expanded article stays expanded
- Step 4 — Then each button counts its own items → Reviews for the article button, articles for the list button

**TC-GEO-1549-024 - OS native shell shows the same review panel** (AC-1, AC-2, AC-5) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: os-native | happy

- Description: Verify that the review panel is identical in the OS native shell (Figma 2.1, Onclusive Social topbar). Covers AC-1 / AC-2 / AC-5 in the second host shell (GEO-1497 scope "Both host shells"). Shell demo texts ignored (Figma gap E12). Prerequisite: access to the OS native shell on staging (open point P8).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: same analysis as TC-GEO-1549-008, opened in the OS native shell (P8). Design: Figma GEO-1497, figmaScreens/14_GEO-1226_Review_pages/06_2.1_OS_native_review_page_as_one_article_option_B.png. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the user opens the analysis in the Onclusive Social native shell [data: OS native access on staging (P8)] → Topbar "Onclusive Social" only, no GEO left navigation
- Step 2 — When the user opens Actions Center > Target Sources and the panel of the Review Sites source → The panel opens
- Step 3 — Then the grouped article shows the same chip, page blocks and button as in the standalone shell → e.g. "17 negative reviews", page blocks with URL links and counts, "Show 7 more reviews"

**TC-GEO-1549-025 - Older API article without pages renders as today** (TAC3) | Priority: Low | Smoke: No | Regression: No | Functional | Label: tech-dev-evidence | error

- Description: Verify that an ArticleDto without pages renders today's article row with its passage. Covers TAC3 (older API, not verifiable by QA; indirect: non-review rows look as today, TC-GEO-1548-017).
- Precondition: Needs dev evidence (logs / DB): not verifiable in the UI; QA records the evidence shared by the dev (unit test, log or query result). Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6).
- Step 1 — Given an ArticleDto without pages is rendered [data: Dev component test] → The dev shares the test result
- Step 2 — When QA reviews the evidence → Evidence available
- Step 3 — Then today's article row with its passage is rendered → No page block, passage shown, no error

**TC-GEO-1549-026 - FR strings of the review panel** (AC-2, AC-5, DoD strings) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: i18n | happy

- Description: Verify the FR texts of the 4 new strings (negativeReviews, negativeReviews_one, showMoreReviews, showMoreReviews_one) against the locked strings sheet, tab "GEO-1226 Review pages". Covers AC-2 / AC-5 and the DoD. Dev note D8: the FR texts in the build are provisional literal translations; a mismatch is a known dev request. Open point P7 (sheet access).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an article with > 10 reviews, a page block of 1 review and an article of 11 reviews. Interface language switched to French (fr-FR) for this TC only, then restored to en-GB and checked with GET /geo/api/v1/auth/me. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the interface language is set to French [data: Settings > language fr-FR] → The interface is in French
- Step 2 — When the user opens the panel of the Review Sites source and the grouped article with more than 10 reviews → Chip, page block counts and button shown in French
- Step 3 — Then the chip and page block counts read the FR plural and singular forms → [expected FR text to confirm from the strings sheet, P7]
- Step 4 — And the button reads the FR plural and singular forms [data: Articles with 17 and 11 reviews] → [expected FR text to confirm from the strings sheet, P7]
- Step 5 — And the user restores the interface language to British English [data: Settings > language en-GB] → Interface back in en-GB; /auth/me returns en-GB

**TC-GEO-1549-027 - ES strings of the review panel** (AC-2, AC-5, DoD strings) | Priority: Medium | Smoke: No | Regression: No | Functional | Label: i18n | happy

- Description: Verify the ES texts of the 4 new strings (negativeReviews, negativeReviews_one, showMoreReviews, showMoreReviews_one) against the locked strings sheet, tab "GEO-1226 Review pages". Covers AC-2 / AC-5 and the DoD. Dev note D8: the ES texts in the build are provisional literal translations; a mismatch is a known dev request. Open point P7 (sheet access).
- Precondition: Staging https://staging-geo.onclusive.com/geo, main QA account logged in, interface language British English (en-GB), checked with GET /geo/api/v1/auth/me. The analysis used has run at least once after the review-v1 deploy (pages are re-judged only at the next run, GEO-1547 TAC2). Candidate data to confirm in the JDD (phase 5, open point P6). Data: an article with > 10 reviews, a page block of 1 review and an article of 11 reviews. Interface language switched to Spanish (es-ES) for this TC only, then restored to en-GB and checked with GET /geo/api/v1/auth/me. Review mode has no UI marker (open point P9): confirm with the dev or the panel API response (reviews[] / pageTitle) which pages got review mode.
- Step 1 — Given the interface language is set to Spanish [data: Settings > language es-ES] → The interface is in Spanish
- Step 2 — When the user opens the panel of the Review Sites source and the grouped article with more than 10 reviews → Chip, page block counts and button shown in Spanish
- Step 3 — Then the chip and page block counts read the ES plural and singular forms → [expected ES text to confirm from the strings sheet, P7]
- Step 4 — And the button reads the ES plural and singular forms [data: Articles with 17 and 11 reviews] → [expected ES text to confirm from the strings sheet, P7]
- Step 5 — And the user restores the interface language to British English [data: Settings > language en-GB] → Interface back in en-GB; /auth/me returns en-GB

## Sync 2026-11-12 (/sync-tcs-epic, full history since 2026-10-07)

Jira ACs unchanged (epic, GEO-1547 / 1548 / 1549 match the local files). Changes mirrored from the CSV (79 TCs before = 79 after, 314 → 315 step rows):

| TC | Action | Source |
|---|---|---|
| TC-GEO-1547-007 | UPDATE — title, description, precondition, Given data; step 3 rewritten ("a review that criticises the brand is listed even when rated 4–5★", cardekho Fortuner 4.2★ example) and new step 4 "no entry is a review holding no criticism of the brand"; company-reply step unchanged. Rerun | PO decision GEO-1583 comment 876255 (Quentin Reant, 2026-11-11): "Any criticism = listed please" |
| TC-GEO-1547-010 | UPDATE — description, precondition and Given data: page P holds no criticism of the brand (a 4–5★ review with a complaint makes the page negative). Rerun | same |
| TC-GEO-1547-025 | UPDATE data (C-3 closed) — automobile-magazine.fr "Défauts de batterie 12 V chez Toyota et Lexus…" listed without a quote; FIX REF "Covers AC-7 (unchanged rule)". Rerun with GEO-1580 | GEO-1580 QA comment 875748 (2026-11-10) |
| TC-GEO-1548-024 | Review file aligned with the CSV (C-9 of 2026-11-05 was not mirrored) | GEO-1226 comment 873111 |
| TC-GEO-1549-018, TC-GEO-1547-025 step 2 | Review file aligned with the CSV (C-6 of 2026-11-04 "underlined on hover" and the step 2 test data were not mirrored) | RUN-FINDINGS C-6 |
| TC-GEO-1549-010, -016, -017, -018, -019, -020, -021, -023 | FIX REF "Related AC-N" → "Covers AC-N" (010 AC-5, 016 AC-7, 017 / 018 AC-1, 019 AC-2 / AC-4, 020 AC-2, 021 AC-3, 023 AC-5). TC-GEO-1549-022 unchanged (regression of unchanged texts, no AC) | user decision 2026-11-12 |
| TC-GEO-1547-006, TC-GEO-1547-024 | KEEP strict — open bugs GEO-1583 (site-written text, QA 876201) and GEO-1580 (Ready for QA 2026-11-11) | — |
