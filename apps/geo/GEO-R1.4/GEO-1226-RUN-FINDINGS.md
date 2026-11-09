# GEO-1226 — Run findings (EPIC-049 Target Sources Improvements for Review Pages)

Epic GEO-1226, fixVersion 1.4, stories GEO-1547 (49.1 judge lists every negative review), GEO-1548 (49.2 pages grouped into one article), GEO-1549 (49.3 panel); Design Task GEO-1497 (Done); bug GEO-1204 (Ready for QA, child). Files: `apps/geo/GEO-R1.4/GEO-1226/` (EPIC.md, STORY_GEO-1547/1548/1549, epic-data.json).

## Campagne

| Date | Phase | Output |
|---|---|---|
| 2026-11-03 | 0 Preflight | epic Ready for QA, 3 stories Ready for QA, import up to date, GEO-1204 Ready for QA → phase 8 |
| 2026-11-03 | 2 Analyse | this section (« Analyse », « Points ouverts », « Figma — liens détectés ») |
| 2026-11-03 | 2b Design | figmaScreens/14_GEO-1226_Review_pages, 6 frames |
| 2026-11-03 | 3 Test cases | csv/GEO-R1.4/testcases-coverage-epicGEO-1226.csv, 79 TCs (validated) |
| 2026-11-03 | 4 Test plan | GEO-1226/TEST-PLAN-GEO-1226.md, 68 scenarios, approved; Jira sub-task GEO-1577 (Backlog, fixVersion 1.4) |
| 2026-11-03 | 5 JDD | jdd/GEO-1226/default.json, 19 needs found, 60 missing (no stored review in any post-deploy staging analysis: grouped=true, pages=[], reviewCount=0; GEO Stress Test org ONE_TIME, pre-deploy) |
| 2026-11-03/04 | 6 Run | 19 TCs with data: 15 PASS, 1 FAIL, 3 PARTIAL (runs 03112026-1710, 04112026-0854, 04112026-0859); 60 blocked (D-1) |
| 2026-11-04 | 8 Bugs | GEO-1580 (B-1 Medium), GEO-1581 (B-2 Low), GEO-1582 (B-3 Medium), GEO-1583 (B-4 Medium), GEO-1584 (B-5 Low) — To Do, Sprint 2, assignee Abdenasser |
| 2026-11-04 | 8 Status | Epic GEO-1226 QA In Progress → Action Needed, stories GEO-1547 / 1548 / 1549 Ready for QA → Action Needed (user decision; bugs GEO-1580..1584 open, PO questions 872897) |
| 2026-11-04 | 8 Comments | PO questions P5 / P1 (872897), dev reply 872898 (bugs, data P6, Edmunds classic mode, GEO Stress Test runs) |
| 2026-11-04 | 7 Triage | section « Run 03–04/11 »: B-1 Medium, B-2 Low, D-1/D-2, C-1..C-5 |
| 2026-11-04 | 7 Dev answers | Firecrawl key reloaded (872714), bugs B-1/B-2 on hold until rerun; 5 technical TCs PASS on dev evidence |
| 2026-11-04 | 6 Rerun GEO-1547 | after forced crawl (snapshot 11:42 UTC): 19 TCs → 6 PASS, 5 FAIL, 2 PARTIAL, 6 SKIP (runs/04112026-1243); B-1 still present |
| 2026-11-04 | 6 Rerun GEO-1548 | 17 TCs → 7 PASS, 2 FAIL (015/016 PDF/PPTX, P5), 5 PARTIAL, 3 SKIP (runs/04112026-1255); B-2 still present (Last 30 days) |
| 2026-11-04 | 6 Rerun GEO-1549 | 25 TCs → 9 PASS, 2 FAIL, 6 PARTIAL, 8 SKIP (runs/04112026-1340) |
| 2026-11-04 | 7 Triage | 5 bugs approved (B-1…B-5), P2 answered by the user (expected), C-6 / C-7 applied, 1549-013 / 018 requalified PASS |
| 2026-11-05 | 7 PO answers | Quentin 873111: P5 = XLSX enough, PDF / PPTX count = number of articles (same as card) → C-8 applied, 1548-015 / 016 requalified PASS; P1 = grouped article with no stored review must not count as negative, no classic passage for a merged page → C-9 applied, 1548-024 FAIL |
| 2026-11-05 | 8 Bugs / comment | GEO-1585 (B-6 Medium, To Do, Sprint 2, Relates GEO-1548 / 1547); threaded reply 873250 to the PO (no tag) |
| 2026-11-05 | 8 Retest | GEO-1584 (B-5) NOT FIXED: page block headers still https:// (Orange, Last 7 days) → reply 873593 tagging Abdenasser, Ready for QA → Action Needed; proof .claude/Data/output/reports/runs/GEO-R1.4_GEO-1226_09112026-1229/screenshots-GEO-1584/bug_GEO-1584_final.png |
| 2026-11-05 | 8 Retest 2 | GEO-1584 FIXED after clean redeploy (dev 873618, bundle index-IBsC0_xt.js): page block headers without https:// (www. dropped as on the URL line) → reply 873708, Passed QA; TC-1549-001 header check now OK. GEO-1549 Action Needed → QA In Progress (no open bug, PARTIAL / SKIP waiting data P6 / P7 / P8) |
| 2026-11-09 | 8 Retest GEO-1204 | Org GEO Stress Test 2026-10 (runs 05/11 + USPS 09/11): review pages FIXED (MSC, VS .co.uk, Verisure); USPS press release negative but passage = related-link title; USPS FY2023 PDF not cited; Google Play hl=en_US still not negative → PARTIAL, comment 874966 tagging the PO (scope question), stays Ready for QA. Dev 873345: unit tests cover the P6 data cases (test report), Edmunds = crawl failure (re-crawl planned) |
| 2026-11-09 | 6 Rerun 2 GEO-1547 | 1547-019..023 on org GEO Stress Test 2026-10 (runs/09112026-1113): 019 / 020 / 021 PASS, 022 PASS (data adapted: VS nl / www .co.uk pages), 023 PARTIAL (prc.gov FY2023 PDF and comparador-alarmas securitas-direct page not cited; routard forum OK). Org back to QA-GEO |
| 2026-11-09 | 7 Requal | Dev unit-test evidence 873345: 1548-006 / 019 / 020, 1549-008 / 009 / 015 / 016 PASS; 1549-012 / 023 stay PARTIAL (singular label / both buttons together not covered); 1549-001 PASS on the GEO-1584 retest. es-ES PPTX AI summary in French = analysis insightsLanguage fr (by design, no bug) |
| 2026-11-09 | 9 Report | runs/GEO-R1.4_GEO-1226_09112026-1216: **GO 84.2 %** (77.8 % with SKIP) — 56 PASS, 6 FAIL, 11 PARTIAL, 6 SKIP / 79 |
| 2026-11-09 | 7 CSV C-10 | TC-1547-023 data adapted (user decision): routard.com forum + USPS prc.gov press release (the GEO-1192 prc.gov FY2023 PDF and comparador-alarmas securitas-direct page are no longer cited) → requalified PASS on rerun 09112026-1113. Report runs/GEO-R1.4_GEO-1226_09112026-1229: **GO 84.9 %** (78.5 % with SKIP) — 57 PASS, 6 FAIL, 10 PARTIAL, 6 SKIP |

## Analyse

Sources read on 2026-11-03: local epic / story files; Jira descriptions, attachments, remote links and ALL comments (with threaded replies) of GEO-1226 (6 comments), GEO-1547 / 1548 / 1549 (0 each), GEO-1497 (3), GEO-1204 (2), GEO-1192 (3), GEO-1224 (5). No remote links on any ticket. GitHub specs (AirPR/geo-analytics, branch `docs/GEO-1226-epic-49-stories`, `epic-49/49-1…`, `49-2…`, `49-3…`): **not read — `gh` CLI not installed on this machine** (local story files hold the Jira copy of the ACs and technical ACs). Strings sheet (Google Sheets, tab « GEO-1226 Review pages »): not read (no access from this workflow).

Vocabulary (epic): **Review** = what one user wrote · **Page** = one URL (`…?page=3`) · **Article** = the panel line; for a review page it groups all pages of the same review page.

### Decisions PO / dev found in comments (they change or clarify the ACs)

| # | Ticket / comment | Date | Decision | Impact |
|---|---|---|---|---|
| D1 | GEO-1226 c869090 (Quentin Reant, reply to c868944) | 2026-10-28 | « ok for both your suggestion in 1 and to leave out google play and app store for now » | (a) **Review mode only for a page that reviews one company of the brand family** (the judge first checks who the page is about; « the brand » includes its products, e.g. a Digimind page = Onclusive). A **comparison page** on a Review Sites domain (which.co.uk, moneymax.ph, lecomparateurassurance.com, seedly.sg) **keeps today's rule** (one passage naming the brand, GEO-1183). Closes the « Waiting for the PM » open question of GEO-1547. (b) **Google Play and App Store out of scope** (play.google.com = google.com, classified Corporate). |
| D2 | GEO-1226 c868944 (Abdenasser) | 2026-10-27 | Section 1 grouping applies to **Review Sites only** (otherwise `?p=123` WordPress ids would be grouped on any site) | Confirmed by GEO-1548 TAC2 (Journalism `?p=` = two articles). |
| D3 | GEO-1497 c865680 (Quentin Reant) | 2026-10-21 | Entry = quote only (no user name / rating / date); no « of 20 reviews »; no « N pages » chip; page block header = page URL as link, then the count (no dot); grouped article URL line = plain text, one-page review page keeps its URL link; Show more after the **first 10 reviews**, counting reviews not pages, cut inside a page shows the page header above its first reviews; Lack of visibility only when none of the pages names the brand; cited-by icons = union of the pages; single « … » (GEO-1201); trustpilot card shows both Improve visibility and Improve perception | Already in the epic ACs (changelog 2026-10-21). |
| D4 | GEO-1497 c865921 (Jalal, designer) | 2026-10-21 | Final frames: 1.0 today (reference), 1.1 one article (cut inside page 5, « Show 7 more reviews »), 1.2 expanded, 1.3 Lack of visibility (page URLs as links, **no badge**), 1.4 one-page review page, 2.1 OS native; strings: {n} negative reviews, 1 negative review, Show {n} more reviews, Show 1 more review | LoV grouped article has no « N negative reviews » chip. |
| D5 | GEO-1226 epic changelog | 2026-10-22 | Cap: judge returns **at most 10 negative reviews per page**; counts use the reviews listed (a page never says more than « 10 negative reviews »). Strings locked EN/FR/ES | GEO-1547 AC5, epic AC10. |
| D6 | GEO-1548 dev note (Jira description) | 2026-10-27+ | A page without stored reviews (comparison page, ~half of review-site pages) « keeps its classic passage only when it is the article's only page » — **confirmed by « the user » of the dev agent, not by a PO comment** | Behaviour of such a page inside a multi-page article not written → open point P1. |
| D7 | GEO-1548 dev note | — | URL variants (scheme / www / trailing slash) of one review page are **never merged** (conservative default) | Two articles may appear for `https://` vs `http://` or `www.` variants: expected, not a bug. |
| D8 | GEO-1549 dev note | — | FR/ES texts of `negativeReviews` / `showMoreReviews` are **temporary literal translations**, to be corrected against the locked sheet before prod; EN matches the epic | FR/ES string TCs will FAIL until fixed → known, report as dev request, not new bug, unless the PO says otherwise. |
| D9 | GEO-1547 dev note | — | Judge validated on synthetic fixtures (real Firecrawl captures not found); re-run against the six real captures before prod; migration V2.10.10 | Risk: real pages may behave differently → test on real staging review pages, not only the ticket example. |
| D10 | GEO-1547 technical part | 2026-10-27 | « Capture of review pages checked on 2026-10-27 (GEO-1204 does not block) » | Epic « Dependencies » (capture must return the reviews first) is satisfied per dev; QA re-checks on Trustpilot pages with script-loaded reviews. |
| D11 | GEO-1224 c859761 (Quentin Reant) | 2026-10-07 | « no quote rather than page header » | Still valid for non-review sources (regression). |

### GEO-1547 — STORY-49.1 List every negative review of a review page

Testable functional ACs (7):

| AC | One line | QA check |
|---|---|---|
| AC1 | Page where 4 users criticise the brand → 4 entries, one per review | UI panel + compare with the live page |
| AC2 | Review > 140 chars → verbatim, shortened with « … » on a word boundary (GEO-1201) | UI: length ≤ 140 incl. « … », text found verbatim on the page |
| AC3 | Review not naming the brand (« A EVITER ABSOLUMENT… ») is listed on a review page; GEO-1183 rule stays for other pages | UI on a single-company review page; non-review source still names the brand |
| AC4 | No entry is page title, menu, banner, site summary, company reply or positive review (GEO-1224) | UI, read every entry vs live page |
| AC5 | Page with > 10 negative reviews → 10 entries, page counts 10 | UI, needs a very negative page |
| AC6 | Page negative when ≥ 1 negative review | UI (page block present in Negative perception) |
| AC7 | Source not classified Review Sites → one passage per page, as today | UI regression on Journalism / other sources |

Technical ACs (5): TAC1 optional contract (Kafka `reviewSite`, `reviews`, `pageTitle`) → **not verifiable by QA** (dev tests). TAC2 only review pages re-judged (`depiction-v6` → `review-v1`) → **not verifiable** directly (logs / DB); indirect: a non-review page keeps its passage after the deploy. TAC3 verbatim only (quote not in page text dropped) → **partly verifiable** (every shown entry is found verbatim on the live page). TAC4 cap 10 and cut ≤ 140 with « … » → **verifiable in UI** if a page with ≥ 11 negative reviews exists. TAC5 reviews survive reuse (hash match or GEO-1534 window) → **partly verifiable** (reviews still shown after a later run of the same analysis); GEO-1534 approach still pending PO (R1.3 test plan).

PO / dev decisions: D1 (review mode only for single-company pages of the brand family; comparison pages keep GEO-1183 rule; Google Play / App Store out), D5, D9, D10.

Data needs: an analysis whose brand has a **single-company review page on a Review Sites domain** (Trustpilot company page, trustradius / capterra product page) with several negative reviews, some not naming the brand; ideally one page with > 10 negative reviews and one review > 140 chars; a **comparison page** on a Review Sites domain (e.g. lecomparateurassurance.com, seedly.sg) for D1; a non-review source with a negative article (AC7). Candidates (to confirm in phase 5, staging data from 2026-10-06, may be stale): org « GEO Stress Test 2026-10 » — MSC Croisières `dc801726-99e5-4e53-bf72-87b469ed5098` (fr.trustpilot.com, 2.3/5, 65 % one-star), Victoria's Secret `0bd0b48c-e78a-4e43-b607-f0318b48f6ba` (www / uk / nl-be trustpilot), Verisure `183bdb00-e80a-4d98-8866-e3dc5645900c` (es.trustpilot.com, Spanish reviews), Great Eastern `595928ee-4314-457a-95fc-03b423d1ee5b` (seedly.sg comparison pages). Production: CNP Assurances (fr / fr-be trustpilot, epic example, UUID to find; prod = read-only).

Environment: staging, en-GB; FR/ES reviews in the page language (quotes are verbatim, not translated); pages are re-judged only at the next run (TAC2), so an analysis must have run **after the deploy** of review-v1.

Risks: judge validated on synthetic fixtures only (D9); « who is the page about » decision by the LLM (D1) may misclassify a single-company page as comparison (no UI marker of review mode → need the API `reviews[]` field or dev data to tell); review written in a foreign language / mixed positive-negative reviews; company replies inside the review list (AC4).

Dependencies: GEO-1204 (retest in phase 8 for review pages), GEO-1192, GEO-1224, GEO-1201, GEO-1183 (regression), GEO-1534 (reuse window, TAC5).

### GEO-1548 — STORY-49.2 Group the pages of a review page into one article

Testable functional ACs (7):

| AC | One line | QA check |
|---|---|---|
| AC1 | CNP Assurances, trustpilot.com → one article fr.trustpilot.com + one fr-be.trustpilot.com instead of one per page | UI (prod example; staging equivalent needed) |
| AC2 | Same host, different paths → never grouped; two subdomains never grouped | UI (e.g. www / uk / nl-be trustpilot of Victoria's Secret) |
| AC3 | Title « Avis de CNP Assurances | … | 2 sur 30 » → « Avis de CNP Assurances » | UI article title |
| AC4 | Article negative when ≥ 1 page negative; Lack of visibility only when no page names the brand | UI tabs |
| AC5 | Card, panel tabs and export give the same number of articles; cards sorted by that number | UI card + panel + XLSX / PDF / PPTX |
| AC6 | Pages with 4, 2, 3, 2 negative reviews → article counts 11 | UI chip + export |
| AC7 | Non-Review-Sites source and « Prompts associated with this source » unchanged (one article per URL) | UI regression |

Technical ACs (4): TAC1 `articleKey` (`?page=`, `?p=`, `?pg=` share a key; subdomain / other path own key) → **partly verifiable** (only the params present in real data; unit tests otherwise). TAC2 Journalism `?p=12` / `?p=34` stay two articles → **verifiable** if such a source exists, else dev tests. TAC3 13 page URLs / 2 articles, one `NOT_FETCHED`, card = panel = XLSX = 2 → **partly verifiable** (same count in the three places; the `NOT_FETCHED` state is not visible in UI → API / dev). TAC4 group all `NOT_FETCHED` / `CHECK_FAILED` → in no tab → **not verifiable** without dev data. Technical part also says the panel query gets the VERIFIED filter the card has (today card and panel can disagree) → regression check: card count = panel tab count on any source.

PO / dev decisions: D2 (Review Sites only), D6 (page without stored reviews inside a group: open point P1), D7 (URL variants never merged).

Data needs: a Review Sites source with **several paginated pages of the same review page** (`?page=N`) and at least two subdomains (trustpilot fr / fr-be, www / uk); a page title with a page part (« | 2 sur 29 », « Page 2 »); a review page whose pages never name the brand (Lack of visibility); a Journalism source with `?p=` URLs (TAC2, optional). Export: XLSX, PDF and PPTX of the same analysis and period.

Environment: exports (Excel, PDF, PPTX) all three; « Prompts associated with this source » section to compare before / after; card sort order on the IMPROVE PERCEPTION / IMPROVE VISIBILITY tabs.

Risks: card sort changes for review-site sources (they drop in rank) — expected, not a bug; card count vs panel count disagreement existing before the epic (VERIFIED filter); title stripping on non-Trustpilot title formats (P3).

Dependencies: GEO-1124 (Target Sources in the export), GEO-1184 (card sort by prompts — check which sort the cards use), GEO-1161 (show more step).

### GEO-1549 — STORY-49.3 Show review pages in the Target Sources panel

Testable functional ACs (7):

| AC | One line | QA check |
|---|---|---|
| AC1 | Reviews listed by page, in page order; page block = page URL link (opens the page) + count « 4 negative reviews » + reviews; URL in full even when long | UI |
| AC2 | Chip under the title « 17 negative reviews »; no page count, no « of 20 reviews » | UI |
| AC3 | Grouped article URL line = plain text; one-page review page: no page block, reviews under the title, URL line is a link | UI |
| AC4 | Entry = quote only (no user name, rating, date) | UI |
| AC5 | > 10 reviews → first 10, then « Show N more reviews »; step counts reviews; cut inside a page shows that page's header above its first reviews | UI |
| AC6 | Cited-by icons = engines citing any of its pages (union) | UI + API per page |
| AC7 | Lack of visibility tab: review page shown as one article with its pages as links, no quotes | UI |

Technical ACs (3): TAC1 4+2+3+2 then 6 more (17) → 10 entries (page 5 shows 1 of 2), « Show 7 more reviews », 17 after click → **verifiable in UI** (with any article > 10 reviews; the exact 17 case needs that data). TAC2 one page, 3 reviews → no page block, 3 entries, URL link → **verifiable**. TAC3 older API (`ArticleDto` without `pages`) → **not verifiable by QA** (dev test; indirect: non-review rows look as today).

Strings (EN locked 2026-10-22): `views.targetSources.panel.negativeReviews` « {{count}} negative reviews » / _one « 1 negative review »; `views.targetSources.panel.showMoreReviews` « Show {{count}} more reviews » / _one « Show 1 more review ». No other new text. FR / ES: provisional in the build (D8) → check against the sheet.

PO / dev decisions: D3, D4, D8.

Data needs: one article with > 10 negative reviews across several pages, ideally with the 10th review falling inside a page; one article with exactly 1 review (singular strings « 1 negative review », and a case with 11 reviews for « Show 1 more review »); a one-page review page; a Lack of visibility review page; pages cited by different engines (multi-engine analysis, AI Engines ≥ 2).

Environment: standalone shell and **OS native mode** (frame 2.1, Onclusive Social topbar) — access to the OS native shell on staging to confirm in phase 5; languages en-GB (default), fr-FR and es-ES only for the string TCs, then restore en-GB and check `/geo/api/v1/auth/me`; long URLs (no truncation) at standard viewport.

Risks: Show more rule after the first click (P2); pluralisation of FR / ES; long URL wrapping in narrow panel; « Show more » of reviews inside an article combined with the article list « Show more » (GEO-1161) in the same panel.

Dependencies: GEO-1497 (design), GEO-1161 (Show more step), GEO-1184 (article sort inside the panel, by prompts).

### Epic-level ACs (10) — mapping

AC1 → 1548 AC1 · AC2 → 1547 AC1 · AC3 → 1547 AC2 + 1549 AC1 · AC4 → 1547 AC4 · AC5 → 1547 AC3 · AC6 → 1548 AC2 · AC7 → 1548 AC5 · AC8 → 1549 AC5 · AC9 → 1548 AC4 + 1549 AC7 · AC10 → 1547 AC5. Every epic AC is covered by a story AC.

### Regression from the linked bugs

| Bug | Status | What to regression-test in this campaign |
|---|---|---|
| GEO-1204 | Ready for QA (child of GEO-1226) | Phase 8 retest. Ticket cases: Victoria's Secret uk.trustpilot.com judged not negative (header passage) → now negative with review entries; MSC Croisières fr.trustpilot.com negative but header passage → now review entries, no header; QA extra cases (c858903): VS www / uk trustpilot `.co.uk` and Verisure es.trustpilot.com negative passage with a not negative verdict → now negative with entries; Great Eastern seedly.sg (comparison pages → D1, today's rule). **Not covered by the epic**: USPS prc.gov press release and prc.gov PDF (not review sites), Great Eastern Google Play (out of scope, D1) → see P4. Dev c864969: « this epic also fixes GEO-1204 for review pages ». |
| GEO-1192 | Done (1.2) | The 5 pages fixed must stay negative: MSC fr.trustpilot.com and routard.com forum, VS nl-be and www trustpilot, USPS prc.gov PDF, Verisure comparador-alarmas.es (1.15/5). A negative passage with a not negative verdict must not appear. |
| GEO-1224 | Done (1.2) | On non-review sources (Toyota: edmunds, alvolante, frandroid, caradisiac): no page title, cookie banner, menu or favourable sentence as passage; criticism joined to the nearest brand name with « … »; no quote rather than a header (PO c859761). On review pages: no title / menu / banner / positive review / company reply (1547 AC4). |
| GEO-1201 / GEO-1183 (stories, Done) | — | ≤ 140 chars incl. « … », whole word, single « … » character; GEO-1183 brand-name rule kept on non-review sources and on comparison pages (D1). |

Existing QA material to reuse: GEO-152 CSV `.claude/Data/output/csv/GEO-R1.2/testcases-coverage-epicGEO-152.csv` (TC-GEO-1117-002 / -010, TCs updated 2026-10-13 per GEO-1224 and GEO-1201), TNR CSVs `testcases-tnr-GEO-152-action-center.csv` and `testcases-tnr-GEO-152-stories.csv` (same rules) → regression TCs for non-review sources; Docs/HowTo.txt « RÈGLES GEO-1224 / GEO-1201 DANS LES TCs »; staging Toyota QA-GEO `439acd96-0b1b-4da4-9e07-612d38e9783e` (Action Center, 261 target sources); prod Toyota `bfbb34ce-e1a3-435e-aec0-1b7a66d98c3c`. GEO-1220 (Done): back-office source-type overrides exist (e.g. a domain forced to REVIEW_SITES) — only with user approval and cleanup, if no natural Review Sites data is found.

## Points ouverts

Requirement questions and prerequisites only (no bugs). Answered points are cited, not asked again.

| # | Story | Question | Why (AC / comment) | Already answered? |
|---|---|---|---|---|
| P1 | GEO-1548 / 1549 | In an article that groups several pages, how is a page **without stored reviews** shown (comparison page judged with today's rule, or a page not yet re-judged with review-v1)? Page block with its classic passage, page block with no entry, or not shown? Does it still count for the article verdict (negative tab) and for the Lack of visibility rule? | Dev note GEO-1548 (« keeps its classic passage only when it is the article's only page », confirmed by the dev agent's user, no PO comment); 1548 AC4; 1549 AC1 | **Answered 2026-11-05 (873111)**: a grouped article with no stored review is not negative (tab, card, export); no classic passage for a merged page → bug GEO-1585 |
| P2 | GEO-1549 | After a click on « Show N more reviews », are **all** remaining reviews shown, or the next 10 with a new button? Is N the total remaining or min(10, remaining)? | Epic « the same step as the articles list (GEO-1161) » vs Figma 1.2 / c865575 « one click reveals the rest »; 1549 TAC1 covers only 17 reviews (7 left) | No (example never exceeds 20) |
| P3 | GEO-1548 | Title rule for review sites other than Trustpilot: which title formats count as the « page part » (« Page 2 », « - Page 3 », « (2/29) »…) and which page's title is used for the article (page 1, or the first page listed)? | 1548 AC3 gives only the Trustpilot format | No |
| P4 | GEO-1204 | Scope of the GEO-1204 retest: the epic fixes review pages only (c864969). What happens to the non-review cases of GEO-1204 — USPS prc.gov press release still not negative, prc.gov PDF with a title passage — and to Great Eastern Google Play (now out of scope, c869090)? Accept as known limits, or split into a new ticket before Passed QA? | GEO-1204 description and c858815 (whole-page fix measured for all pages); c869090 | Partly: Google Play out of scope (c869090); non-review cases not addressed |
| P5 | GEO-1548 | Export: where and with which label is the « number of negative reviews per article » shown in XLSX / PDF / PPTX (column, header text, FR / ES)? The strings sheet has only 4 panel strings (« No other new text ») | Epic scope 1 and 3 (« The export shows the number of negative reviews per article »); 1548 AC6 | **Answered 2026-11-05 (873111)**: XLSX is enough; PDF / PPTX show the top 10 sources, their count = number of articles (same as the card) |
| P6 | All | Prerequisite: test data on staging — an analysis with a paginated single-company review page (several `?page=N`, two subdomains, > 10 negative reviews, one page with > 10, a Lack of visibility review page), run **after** the review-v1 deploy. Is there a staging equivalent of CNP Assurances, or may QA run AC1 read-only on production CNP? | 1548 AC1 (CNP example is production); 1547 TAC2 (re-judged at next run) | No |
| P7 | GEO-1549 | Prerequisite: read access to the strings sheet tab « GEO-1226 Review pages » (FR / ES expected texts), and the date the provisional FR / ES translations are replaced | DoD « EN / FR / ES strings checked against the locked strings sheet »; dev note D8 | No |
| P8 | GEO-1549 | Prerequisite: access to the OS native (Onclusive Social) shell on staging to check frame 2.1 | GEO-1497 scope « Both host shells » | No |
| P9 | GEO-1547 | Prerequisite (dev support): a way to tell which pages got review mode (API field `reviews[]` / `pageTitle` in the panel response, or a list from the dev) and which were treated as comparison pages, so AC3 / AC7 and D1 are checked on known pages | D1 decision is taken by the LLM, no UI marker | No |

Answered, not asked again:
- Which review-site pages get review mode (GEO-1547 « Open question ») → only pages about one company of the brand family, comparison pages keep today's rule — PO c869090 (2026-10-28), proposal c868944.
- Google Play / App Store → out of scope — PO c869090 (2026-10-28).
- Cap per page → 10 reviews, counts = reviews listed — epic changelog 2026-10-22.
- User name / rating / date, « of 20 reviews », « N pages » chip, page header wording, Show more threshold (10 reviews), LoV rule, cited-by union → PO c865680 (2026-10-21), applied c865921.
- Capture of review pages (epic dependency on GEO-1204) → checked by dev 2026-10-27, does not block (GEO-1547 technical part).
- URL variants (scheme / www / slash) → never merged (GEO-1548 dev note).
- Article with no good quote on non-review sources → no quote rather than header — PO c859761 (GEO-1224).

## Figma — liens détectés

Figma API not called (phase 2b step 1 = detection only). One Figma file, one node id.

| # | URL | File key | node-id | Found in | Story |
|---|---|---|---|---|---|
| F1 | https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17435-4056 | `xctSRqtM653zRS7QY3KMm0` | `17435-4056` (Figma page « GEO-1497 - Review pages in the Target Sources panel ») | Local: EPIC.md (×2), epic-data.json, STORY_GEO-1547, STORY_GEO-1548, STORY_GEO-1549. Jira: GEO-1226 description (Design section), GEO-1497 comments c865575 (2026-10-20) and c865921 (2026-10-21) | All three: GEO-1547 (entries, frames 1.1 / 1.2), GEO-1548 (one article, title, frames 1.1 / 1.3), GEO-1549 (panel, all frames 1.1, 1.2, 1.3, 1.4, 2.1) |

No Figma link in the Jira descriptions of GEO-1547 / 1548 / 1549 (GEO-1549 names the Figma page without URL), nor in GEO-1204 / 1192 / 1224, nor in any remote link. Frames listed by the designer (c865921): 1.0 today (reference only), 1.1 review page as one article (first 10 reviews, cut in page 5, « Show 7 more reviews »), 1.2 Show more expanded, 1.3 Lack of visibility, 1.4 one-page review page, 2.1 OS native — the frame node ids are children of `17435-4056` (to resolve at extraction).

Other design material (not Figma): GEO-1497 attachment `geo1497-mockup-today-vs-target.png` (2026-10-20, wireframe, not the design); GEO-1226 attachment `Screenshot from 2026-10-27 18-30-12-20261027-183012.png` (dev proposal « judge first checks who the page is about »).

## Design (Figma)

Extracted on 2026-11-03 via the Figma REST API (`/v1/files/xctSRqtM653zRS7QY3KMm0/nodes?ids=17435:4056`, file `lastModified` 2026-10-29T10:27:25Z; PNG scale 2, 2 batches of 3). Node `17435:4056` is the Figma **page** « GEO-1497 - Review pages in the Target Sources panel »; the screens sit in two sections: « Flow 1 · Review page as one article · Standalone · GEO-1226 » (`17435:4323`) and « Flow 2 · OS native · GEO-1226 » (`17435:4324`). Not exported (not screens): frame « 📋 Design Rationale · GEO-1497 ↔ GEO-1226 » (annotations, quoted below), the 6 text notes « Note · 1.0 … 2.1 », components « Review Entry », « Review Page Header », « Review Article Header », asset « Trustpilot favicon ». Folder: `figmaScreens/14_GEO-1226_Review_pages/`. Demo data: CNP Assurances, source #1 trustpilot.com (Review Sites), panel tab Negative perception unless stated.

Common to frames 1.1 → 2.1 (unchanged vs today, regression): panel header « #1 · trustpilot.com » with chips « Review Sites », « Improve visibility », « Improve perception »; card « trustpilot.com / Review Sites / Not visible in 2 articles / Negative perception in 2 articles » (1.0: 10 and 13); tabs « Lack of visibility (2) » « Negative perception (2) »; section « Prompts associated with this source » with tabs « All », « Gemini (2) », « ChatGPT (1) »; footer « Previous » (disabled) · « Source 1 of 11 » · « Next source ». The chip is rendered in upper case (« 17 NEGATIVE REVIEWS ») from the string « 17 negative reviews » (Figma text-case style).

| PNG | Story | Screen & state | Exact UI texts | States / variants |
|---|---|---|---|---|
| `figmaScreens/14_GEO-1226_Review_pages/01_1.0_Today_one_article_per_page_13_pages_listed.png` (`17436:1261`) | Reference (today, not delivered) — baseline for GEO-1548 / 1549 | Today's panel: one article per page URL | Tabs « Lack of visibility (10) » « Negative perception (13) »; subtitle « Each of these articles mentions CNP Assurances negatively. »; 5 articles titled « Avis de CNP Assurances \| Lisez les avis marchands de cnp.f… », URL lines `fr.trustpilot.com/review/cnp.fr?page=2` … `?page=6`, passage = page title « “Avis de CNP Assurances \| Lisez les avis marchands de cnp.fr \| 2 sur 29” »; button « Show 8 more articles » | Before-state for comparison (13 page-articles → 2 articles) |
| `figmaScreens/14_GEO-1226_Review_pages/02_1.1_Review_page_as_one_article_quotes_only_first_10_reviews.png` (`17517:5626`) | GEO-1548 (grouped article, title) + GEO-1549 (page blocks, chip, Show more) + GEO-1547 (entries) | Negative perception tab, grouped article collapsed at 10 reviews | Article « Avis de CNP Assurances », plain URL line `fr.trustpilot.com/review/cnp.fr`, chip « 17 negative reviews »; page blocks `fr.trustpilot.com/review/cnp.fr?page=2` (link + open_in_new icon) « 4 negative reviews », `?page=3` « 2 negative reviews », `?page=4` « 3 negative reviews », `?page=5` « 2 negative reviews » showing 1 entry; button « Show 7 more reviews »; 2nd article « Avis de CNP Assurances » `fr-be.trustpilot.com/review/cnp.fr` chip « 4 negative reviews », blocks `?page=3` (2), `?page=4` « 1 negative review », `?page=5` (1). Entries quoted “…”, e.g. « “A EVITER ABSOLUMENT - POUR PRENDRE VOTRE ARGENT ILS SONT FORTS” », « “Trois mois pour un simple changement d'adresse, et toujours pas de confirmation écrite…” » | Cut inside page 5 (header shown + 1 of 2 reviews); cited-by icons Gemini + ChatGPT on the article row only; page 1 (no `?page`) absent; dividers between page blocks |
| `figmaScreens/14_GEO-1226_Review_pages/03_1.2_Show_more_expanded_all_17_reviews.png` (`17517:6591`) | GEO-1549 AC5 / TAC1 | Same article after the click on « Show 7 more reviews » | 8 page blocks: `?page=2` (4), `?page=3` (2), `?page=4` (3), `?page=5` (2), `?page=6` (2), `?page=7` « 1 negative review », `?page=8` (2), `?page=10` « 1 negative review »; extra entries e.g. « “Un conseiller différent à chaque appel, le dossier repart de zéro à chaque fois…” », « “Fuyez, le service après-vente n'existe tout simplement pas.” »; fr-be article unchanged (3 blocks) | Expanded state: **no button left** (no « Show less »); page 9 absent (no negative review); one click shows all 7 remaining |
| `figmaScreens/14_GEO-1226_Review_pages/04_1.3_Lack_of_visibility_tab_review_pages_with_no_mention_of_the_brand.png` (`17518:2846`) | GEO-1549 AC7 + GEO-1548 AC4 | Lack of visibility tab selected | Subtitle « None of these articles mentions CNP Assurances anywhere on the page. »; article « Assurance vie : les meilleures compagnies » (URL line `fr.trustpilot.com/categories/assurance_vie`) with 4 link lines `fr.trustpilot.com/categories/assurance_vie`, `…?page=2`, `…?page=3`, `…?page=4`; article « Avis Generali Vie » (`fr.trustpilot.com/review/generali.fr`) with 6 link lines `…/review/generali.fr` → `…?page=6` | No quote, **no chip**, no count per page; page 1 URL listed as a link too; cited-by icons kept |
| `figmaScreens/14_GEO-1226_Review_pages/05_1.4_One-page_review_page_no_page_block_reviews_under_the_title.png` (`17518:574892`) | GEO-1549 AC3 / TAC2 | Negative perception tab, one-page article above a paginated one | Article « Avis de CNP Assurances Prévoyance », URL line `fr.trustpilot.com/review/cnp-prevoyance.fr` (link, as today), chip « 3 negative reviews », 3 entries directly under the title (« “Contrat prévoyance résilié sans préavis, aucune explication malgré trois réclamations.” » …); then fr-be article with chip « 4 negative reviews » and page blocks `?page=3` « 2 negative reviews », `?page=4` « 1 negative review », `?page=5` « 1 negative review » | Contrast one-page vs grouped; the one-page URL line has the **same grey style** as the grouped plain line (only behaviour differs) |
| `figmaScreens/14_GEO-1226_Review_pages/06_2.1_OS_native_review_page_as_one_article_option_B.png` (`17435:4228`) | GEO-1549 (OS native shell) | Same panel as 1.1 inside the Onclusive Social topbar | Topbar « Onclusive Social » only (no GEO left nav Mention / Review / Contact / Measure); header « CNP Assurances / Generated Mar 24, 2026 »; panel texts identical to 1.1 (« 17 negative reviews », « Show 7 more reviews », …) | Panel identical to 1.1; demo leftovers in the shell (categories « Postal Services », « Package Shipping »; filter « LLM Engines » vs « AI Engines » in 1.x) |

### Annotation texts (designer rules, quoted)

Frame « 📋 Design Rationale · GEO-1497 ↔ GEO-1226 » (`17435:4057`):
- « This page covers GEO-1497, the design task for EPIC-049 (GEO-1226): a review page shows as one article in the Target Sources panel, with one block per page and one entry per negative review. It follows the PM wireframe and Quentin's review of 2026-10-21, with the GEO design system. It applies to sources classified as Review Sites only; other sources keep one passage per page. The card, the tab counts, the card sort, the Prompts section and the export do not change (the export shows the number of negative reviews per article). Example: CNP Assurances, source #1 trustpilot.com, 13 page URLs become 2 articles (fr.trustpilot.com and fr-be.trustpilot.com). »
- Frames 1.1 to 1.4: « The article row keeps the baseline card (favicon, title, second line, cited-by icons). Title = the page title without the page part: Avis de CNP Assurances. Second line = host and path, fr.trustpilot.com/review/cnp.fr, as plain text: each page block carries its own link, and fr.trustpilot.com and fr-be.trustpilot.com read as two articles. One badge under it, 17 negative reviews, the figure the export also shows; no page count (PM: each page has its own block). Cited-by icons = union of all pages. One-page article (1.4): nothing to group, so no page block; the second line is the page URL and stays the link, as today; the reviews sit directly under the title. »
- Frames 1.1, 1.2: « Under the article, one block per page in page order, separated by the ODS content divider. The block header is the page URL as an ODS Link Buttons [1.0] (Primary, Small 16, underlined, open_in_new icon), fr.trustpilot.com/review/cnp.fr?page=2, which opens the page in a new tab, then the count in Caption 1 text/sub-500: 4 negative reviews (singular: 1 negative review). No page total: the judge returns the negative reviews only. The header wraps when the URL is long. Pages without a negative review are not listed. »
- Frames 1.1 to 1.4: « Each negative review is a Review Entry: a grey card (bg/weak-100, radius 8, padding 8 and 12, like the prompt rows of the panel) with the baseline quote style (purple bar, italic text in quotes), verbatim, 140 characters max, cut with the single … character on a word boundary (GEO-1201). PM decision: quote only, no user name, rating or date; those options were reviewed and dropped. »
- Frames 1.1, 1.2: « The article shows its first 10 reviews, like the articles list (GEO-1161), then a Buttons [1.0] Neutral Stroke Small, centred, reads Show 7 more reviews (singular: Show 1 more review). The count is reviews, not pages. When the 10th review falls inside a page, that page block shows its header and the reviews before the cut (1.1: page 5 shows 1 of its 2); the rest comes after the click (1.2). »
- Frames 1.0, 1.3, all: « Only Review Sites sources get this layout; other sources keep one passage per page. Both reason tabs stay and their counts read articles: Lack of visibility (2), Negative perception (2); the card line and the card sort count articles too. An article goes in the Lack of visibility tab only when none of its pages names the brand (1.3): one article with its pages as links, no quote. The Prompts associated with this source section is untouched. The export shows the number of negative reviews per article. The panel still scrolls at the 832 viewport; the frames are taller only to show the full content. »
- Frames 2.1, all: « Strings for the Target Sources sheet (EN, FR and ES): {n} negative reviews · 1 negative review · Show {n} more reviews · Show 1 more review. Dropped after review: {n} pages, Page {n}, {rating}/5. Demo data aligned to the CNP Assurances analysis (categories Assurance vie and Prévoyance, insurance sources and prompts). OS native (2.1): Onclusive Social topbar only, the panel is identical. »

Frame notes:
- « Note · 1.0 »: « Today: the panel lists one article per URL, so the pages of the same Trustpilot review page show as 13 articles and the passage is mostly the page title. Reference only, not part of the delivery. »
- « Note · 1.1 »: « Review page as one article: title without the page part, host and path as plain text, badge with the negative review count. One block per page, headed by the page URL as a link, then its count. Quotes only. First 10 reviews, the cut falls inside page 5, then Show 7 more reviews. »
- « Note · 1.2 »: « Show more expanded: all 8 page blocks of the fr.trustpilot.com article (17 reviews) and the 3 blocks of fr-be, in page order. »
- « Note · 1.3 »: « Lack of visibility tab: an article goes here only when none of its pages names the brand. One article with its page URLs as links, no quote and no badge. Both tabs keep their article counts. »
- « Note · 1.4 »: « One-page review page: a Review Sites URL with no pagination keeps the review entries but has no page block; the reviews sit directly under the title and the grey URL line stays the link, as today. The paginated fr-be article below shows the contrast. »
- « Note · 2.1 »: « OS native: Onclusive Social topbar only, no GEO topbar. The panel is identical to 1.1; nothing in it depends on the topbar. »

### Écarts Figma ↔ AC

| # | Frame | Gap type | Detail | Recommendation |
|---|---|---|---|---|
| E1 | 1.1, 1.2, 2.1 | Figma contradicts an AC → AC wins | Reviews of 68–87 characters end with « … » (« …confirmation écrite… », « …à chaque fois… », « …question simple… ») although GEO-1547 AC2 / GEO-1201 cut only above 140 characters (the rationale also says « 140 characters max »). Demo text, not a rule | TC follows AC2: a review ≤ 140 chars is shown whole; « … » only when the verbatim is longer than 140. No PO question |
| E2 | 1.1 → 2.1 | Text without AC → candidate [Figma] TC | Chip rendered upper case « 17 NEGATIVE REVIEWS » while AC2 / strings read « 17 negative reviews » | Compare case-insensitively (string = « 17 negative reviews », upper case is a style); nothing to raise |
| E3 | 1.2 | State without AC → candidate [Figma] TC | Expanded article: the « Show N more reviews » button disappears, no « Show less » | [Figma] TC: after the click, all reviews shown and no button left in the article |
| E4 | 1.2 | Design vs epic wording → open point (already P2) | One click reveals all 7 remaining (« the rest comes after the click »); epic says « the same step as the articles list (GEO-1161) ». No frame shows > 20 reviews | Keep P2 open (case > 20 reviews: all at once or by 10). TCs assert « Show 7 more reviews » → 17 per TAC1 |
| E5 | 1.1, 1.2 | State without AC → candidate [Figma] TC | Pages without a negative review are not listed (page 1 and page 9 absent; rationale « Pages without a negative review are not listed ») — not written in GEO-1549 AC1 | [Figma] TC: no empty page block (every block has count ≥ 1 and ≥ 1 entry) |
| E6 | 1.1 | Text/state without AC → candidate [Figma] TC | Page URL link opens « in a new tab » with an open_in_new icon; AC1 only says « opens the page » | [Figma] TC: page block link opens a new tab (`target=_blank`) and shows the external icon |
| E7 | 1.3 | State without AC → candidate [Figma] TC | Lack of visibility review article: **no chip**, no per-page count, page 1 URL listed as a link, URL line plain; AC7 only says « pages as links, without quotes » | [Figma] TC: LoV review article = title + plain URL line + one link per page, no quote, no « N negative reviews » chip, no count |
| E8 | 1.3 | Existing text (no new AC) | Subtitles « None of these articles mentions CNP Assurances anywhere on the page. » / « Each of these articles mentions CNP Assurances negatively. » unchanged | Regression check only |
| E9 | 1.4 | State without AC → candidate [Figma] TC | One-page article URL line looks the same (grey) as a grouped plain line; only the behaviour differs (link vs plain text) | TC checks behaviour (link on one-page line, no link on grouped line), not the style |
| E10 | all | Text without AC → candidate [Figma] TC | Dropped strings « {n} pages », « Page {n} », « {rating}/5 » (rationale) — consistent with PO c865680 | Negative [Figma] TC: none of these texts, no « of 20 reviews », no user name / rating / date |
| E11 | 1.1, 1.4 | No AC on order | Articles in the panel are not ordered by review count (17 before 4 in 1.1, 3 before 4 in 1.4) — panel order follows GEO-1184 (prompts) | No TC on review-count order; regression on GEO-1184 sort only |
| E12 | 2.1 | Demo leftovers (no AC) | OS native shell shows categories « Postal Services », « Package Shipping », « Generated Mar 24, 2026 », « LLM Engines » (1.x: « AI Engines ») — rationale: « the panel is identical » | OS native TC asserts panel parity with 1.1 only; ignore shell texts. Needs OS native access (P8) |
| E13 | — | AC without design | « Show 1 more review » (singular) never shown in a frame, only in the strings list | TC with an article of 11 reviews (data need) — text from the sheet |
| E14 | — | AC without design | Page without stored reviews inside a multi-page article (comparison page / not re-judged) — no frame | Keep P1 open; no [Figma] TC |
| E15 | — | AC without design | Export (XLSX / PDF / PPTX) « number of negative reviews per article » — no frame, no label | Keep P5 open; TC checks the number only (= chip) |
| E16 | — | AC without design | Long page URL wrapping (« The header wraps when the URL is long », AC1 « URL shows in full ») — no long URL in frames | TC from AC: long URL fully visible (wrapped, no ellipsis) |
| E17 | — | AC without design | « Show N more reviews » inside an article combined with « Show N more articles » of the list (GEO-1161) in the same tab — 1.0 shows the article button, 1.1 / 1.2 only 2 articles | Exploratory TC when data has > 10 articles; no PO question now |

No contradiction between Figma and the PO / designer decisions D1 (c869090), D3 (c865680), D4 (c865921): quote only, no page chip, page URL header then count, first 10 reviews, cut inside a page, LoV only when no page names the brand (no chip), cited-by union, plain grouped URL line and linked one-page URL line all match.

## Run 03–04/11/2026 — résultats et tri (phase 6–7)

Runs (staging, QA-GEO, en-GB, SUPER_ADMIN, read-only except the 3 export requests):
- `runs/03112026-1710/MCP-Report-GEO-1226-GEO1547-mcp.html` — 7 TCs: 5 PASS, 1 FAIL, 1 PARTIAL (CONDITIONAL 78.6 %)
- `runs/04112026-0854/MCP-Report-GEO-1226-GEO1548-mcp.html` — 11 TCs: 9 PASS, 2 PARTIAL (GO 90.9 %)
- `runs/04112026-0859/MCP-Report-GEO-1226-GEO1549-mcp.html` — 1 TC: PASS
- 60 TCs not run: review entries not stored on staging (`grouped: true`, `pages: []`, `reviewCount: 0`), dev asked in GEO-1226 comment 872356 (2026-11-03, Abdenasser tagged), no answer on 2026-11-04 09:00 UTC.

Existing bugs checked (Jira, Target Sources bugs): GEO-1224 / 1201 / 1202 / 1182 / 1159 Done (1.2), GEO-1204 Ready for QA — no open bug covers B-1 / B-2.

### Bugs (Decision pre-filled)

| # | TC | Finding | Evidence | AC / rule | Decision (recommended) |
|---|---|---|---|---|---|
| B-1 | TC-GEO-1547-025 (FAIL), 1548 run note | The quote shown is the page header or the page title instead of a passage: automobile-magazine.fr « Essai Toyota bZ4X : la 1ère 100% électrique de Toyota enfin à l'épreuve des mesures Publié le 02/11/2023 à 08h45 share Partager : » (H1 + publication date + share widget); headlines quoted as passages on automobile-magazine.fr ×2, fiches-auto.fr ×2, motorbiscuit.com (title repeated twice), slashgear, lesnumeriques, autopista, elnacional; on review sites in classic mode: fr.trustpilot.com/review/www.orange.com?page=2 « Avis de Orange \| Lisez les avis marchands de www.orange.com \| 2 sur 6 » (panel + XLSX row 197). Toyota 439acd96 and Orange 16cdf040, runs of 2026-11-03 14:57 UTC. | `runs/03112026-1710/screenshots-GEO-1226-GEO1547-mcp/TC-GEO-1547-025_step3_then.png`, `…/TC-GEO-1547-025_obs_title_passages.png`, `runs/04112026-0854/…/TC-GEO-1548-008_step3_then.png` | GEO-1224 (Done 1.2): page title / header never quoted; PO c859761 « no quote rather than page header »; GEO-1547 AC (non-review sources keep today's rule) | **BUG Medium** → parent GEO-1226, Relates GEO-1547 + GEO-1224, assignee Abdenasser, fixVersion 1.4, Does not exist in Production (not checked on prod) |
| B-2 | TC-GEO-1548-008 / 010 | A grouped article with no title shows the raw URL with the scheme as its title (`https://ie.trustpilot.com/review/www.orange.ma`) in the panel and in the XLSX (row 196), while another row without title shows the URL without the scheme (`trustpilot.com/review/www.orange.fr`). | `runs/04112026-0854/…/TC-GEO-1548-008_step3_then.png`, `…/TC-GEO-1548-010_step3_then.png` | GEO-1548 AC-3 (article title of a grouped review page) | **BUG Low** → parent GEO-1226, Relates GEO-1548, assignee Abdenasser, fixVersion 1.4 |

### Dev requests / blockers

| # | Item | Decision |
|---|---|---|
| D-1 | Review entries not stored after the deploy (60 TCs blocked), forced runs for GEO-1204 data, dev evidence for 49.1 TAC1/TAC2, 49.2 TAC4, 49.3 TAC3 | POSTED 2026-11-03 (comment 872356) — wait for the answer, then rerun |
| D-2 | GEO-1204 retest (phase 8) | Not possible yet: its data (MSC, Victoria's Secret, Verisure, Great Eastern) is in org « GEO Stress Test 2026-10 », ONE_TIME, last run early October → wait for the forced runs asked in D-1 (then org switch with the user's OK) |

### CSV alignments (labels / data — applied without asking per CLAUDE.md, behaviour unchanged)

| # | TC | Change | Decision |
|---|---|---|---|
| C-1 | TC-GEO-1547-024 | Step names edmunds / alvolante / frandroid as non-review sources: edmunds.com is Review Sites on staging, the other two are not cited → use caradisiac.com, autoplus.fr, automobile-magazine.fr | Align data — DONE 2026-11-04 |
| C-2 | TC-GEO-1547-013 | Given data Great Eastern 595928ee (other org) → Orange 16cdf040 / play.google.com (as the When data) | Align data — DONE 2026-11-04 |
| C-3 | TC-GEO-1547-025 | « listed without a quote » step: no such article on staging → keep the step, data « to find at the next run » | Keep, SKIP until data — test data note added 2026-11-04 |
| C-4 | TC-GEO-1548-003 / 025 / 017 | Victoria's Secret → Orange / Decathlon trustpilot; Great Eastern seedly.sg → Orange choisir.com; lefigaro URLs → `/automobile` and `/automobile?page=130` | Align data — DONE 2026-11-04 |
| C-5 | TC-GEO-1548-011 / 012 | Expected label « Failing articles » does not exist in PDF / PPTX: the exports show an « Articles » column with the two card lines | Label fix — DONE 2026-11-04 |

### Dropped (no AC / rule behind)
- Passages ending with « .… » (caranddriver, motorbiscuit), autoblog ASCII « ... » at 130 chars (source text) — no rule on punctuation before the ellipsis.
- Prompts block shows no Grok tab when Grok has no prompt for the source — expected.
- play.google.com row shows its URL as title (API returns no title) — non-review source, out of scope.

### Dev answers of 2026-11-04 (thread of 872356)
- **872642** — not a bug: the Firecrawl staging key was capped at 100 credits/week, so no page could be captured (empty reviews, `pages: []`). **872714** — key reloaded, staging now has 1,500 credits/day. The user asks the dev to force the crawl of Toyota and Orange; then rerun the 60 blocked TCs and re-check B-1 / B-2 **before creating any bug** (both may come from the missing captures; drafts kept in `bugs_to_create_20261104.json`, status to_create, on hold).
- **872651 / 872714** — technical ACs covered by the PR automated tests: backend https://github.com/AirPR/geo-analytics/actions/runs/40885465592/job/123487970441 (49.1 TAC1/TAC2, 49.2 TAC4), frontend …/job/123487970703 (49.3 TAC3). **Accepted as dev evidence (user, 2026-11-04)** → TC-GEO-1547-017/018, 1548-021/022, 1549-025 PASS in `test-results-GEO-1226-dev-evidence-mcp-real.json`.

## Rerun 04/11/2026 after the forced crawl (snapshot 11:42 UTC) — triage (phase 7)

Runs (staging, QA-GEO, en-GB, SUPER_ADMIN, read-only except export downloads), period Last 7 days unless stated:
- `runs/04112026-1243/MCP-Report-GEO-1226-GEO1547-rerun-mcp.html` — 19 TCs: 6 PASS, 5 FAIL, 2 PARTIAL, 6 SKIP
- `runs/04112026-1255/MCP-Report-GEO-1226-GEO1548-rerun-mcp.html` — 17 TCs: 7 PASS, 2 FAIL, 5 PARTIAL, 3 SKIP
- `runs/04112026-1340/MCP-Report-GEO-1226-GEO1549-rerun-mcp.html` — 25 TCs: 9 PASS, 2 FAIL, 6 PARTIAL, 8 SKIP
- Decathlon not re-crawled (reviewCount 0). Trustpilot / Edmunds live pages answer 403 to the test browser. Jira checked 13:40 UTC: no new comment, no open bug covering the points below (GEO-1224 Done covers title quotes on non-review pages; GEO-1204 Ready for QA = the opposite case, negative pages judged not negative).

### Bugs (Decision pre-filled)

| # | TC | Finding | Evidence (run folder / screenshots-…) | AC / rule | Decision (recommended) |
|---|---|---|---|---|---|
| B-1 | 1547-024, 1547-025 (FAIL) | Still present after the crawl: page title / H1 + date + share widget quoted as the passage (automobile-magazine bZ4X, « Défauts de batterie 12 V … - L'Automobile Magazine », caradisiac Yaris Cross; Orange fr.trustpilot ?page=2 in Last 30 days; Edmunds « Used 2023 Toyota RAV4 SUV Consumer Reviews » quotes its own title) | 1243: `TC-GEO-1547-025_step3_then.png`, `TC-GEO-1547-025_obs_B1_orange_trustpilot_30d.png`, `SIDE_edmunds_title_as_quote.png` | GEO-1224, PO c859761, GEO-1547 AC (non-review keep today's rule) | **BUG Medium** — CREATED 2026-11-04 GEO-1580 (To Do, Sprint 2) |
| B-2 | 1548-008 / 010 | Still present (Last 30 days): grouped untitled article titled `https://ie.trustpilot.com/review/www.orange.ma` (panel + XLSX row 193); other untitled article shows `trustpilot.com/review/www.orange.fr`. Also review-site titles with separators replaced by runs of spaces + review total (« Orange   Avis   246 », « Toyota España   Opiniones   182 ») | 1255: `B2_recheck_panel_last30days_zoom.png`, `B2_recheck_xlsx_last30days.png` | GEO-1548 AC-3 | **BUG Low** — CREATED 2026-11-04 GEO-1581 (To Do, Sprint 2) |
| B-3 | 1547-001 (FAIL), 1548-001/003, 1549-009 | The same review is listed twice: 2 reviews repeated in www.trustpilot.com/review/www.orange.ma page 1 (8 distinct under « 10 negative reviews »); the ?page=2 / ?page=4 blocks start with the same 4 entries as page 1 → counts and chip overstated | 1243: `TC-GEO-1547-001_step3_then.png`, `SIDE_trustpilot_page2_repeats_page1.png` | GEO-1547 AC (every negative review listed once, count = entries); GEO-1548 (page blocks) | **BUG Medium** — CREATED 2026-11-04 GEO-1582 (To Do, Sprint 2) |
| B-4 | 1547-006, 1547-007 (FAIL) | Entries that are not negative reviews are listed: site-written text (auto123 « La marque nippone Toyota a toujours été synonyme de qualité… », Edmunds editorial summaries corolla-hybrid/2023, sequoia) and positive reviews (cardekho 4.5★ and 4.2★) | 1243: `TC-GEO-1547-006_step3_then.png`, `TC-GEO-1547-007_step3_then.png` | GEO-1547 AC (only negative reviews written by users; site text and positive reviews excluded) | **BUG Medium** — CREATED 2026-11-04 GEO-1583 (To Do, Sprint 2) |
| B-5 | 1549-001 (FAIL) | Page block header keeps `https://` (`https://www.trustpilot.com/review/www.orange.ma?page=2`), while Figma 1.1/1.2 and the article URL line drop the scheme | 1340: `TC-GEO-1549-001_step4_header.png` | GEO-1549 AC (page URL header), Figma 1.1 / 1.2 | **BUG Low** — CREATED 2026-11-04 GEO-1584 (To Do, Sprint 2) |

### PO questions (one comment on GEO-1226 tagging the PO)

| # | TC | Point | Decision (recommended) |
|---|---|---|---|
| Q-1 (P5) | 1548-015 / 016 (FAIL) | PDF / PPTX last page lists the top 10 sources only — no article row, no negative-review number; XLSX has it (« Negative reviews » column). Does the epic scope « the export shows the number of negative reviews per article » apply to PDF / PPTX? | POSTED 2026-11-04 (872897) — **ANSWERED 873111**: XLSX enough, PDF / PPTX count = articles = card (9 = 9 checked) → CSV C-8, 015 / 016 requalified PASS |
| Q-2 (P1) | 1548-024, 1548-005 | A grouped article whose pages have no stored reviews (ie orange.ma Last 30 days; es.trustpilot toyota.es) shows no block, no entry, no passage, but still counts as negative; a page merged into a group loses its classic passage | POSTED 2026-11-04 (872897) — **ANSWERED 873111**: must not count as negative → **BUG Medium GEO-1585** (B-6); no classic passage = expected → CSV C-9, 024 FAIL (known bug) |
| Q-3 (P2) | 1549-013 | « Show 20 more reviews »: one click shows all the rest (not 10 by 10) | **Answered by the user 2026-11-04: expected** — no PO question; 1549-013 requalified PASS (`-requal-` real.json) |

### Dev requests (reply in the thread of 872356, tagging Abdenasser)

| # | Point | Decision (recommended) |
|---|---|---|
| D-3 | Bugs B-1…B-5 created (keys) — FYI in the same reply | POSTED 2026-11-04 (reply 872898 in thread 872356) |
| D-4 (P6) | Data missing on staging for 8 PARTIAL / 9 SKIP: page < 10 reviews, articles with 11 / 17 reviews, page block with 1 review, cut inside a page, long page URL, multi-page review article in Lack of visibility, tab > 10 articles, `?p=` / `?pg=` URLs. Ask whether unit tests of the PRs cover them (as for the 5 technical TCs) | POSTED (872898) — accept unit-test evidence for the steps not reproducible on staging |
| D-5 | 3 Edmunds consumer-reviews pages (corolla-cross 2024, 4runner 2026, rav4 2023) stayed in classic mode after the crawl while 2 got review entries | POSTED (872898) |
| D-6 | Forced runs of the GEO Stress Test 2026-10 analyses (MSC, Victoria's Secret, Verisure, Great Eastern) for 1547-019…023 and the GEO-1204 retest; USPS uuid | POSTED again (872898) |

### CSV alignments

| # | TC | Change | Decision (recommended) |
|---|---|---|---|
| C-6 | 1549-018 | « Underlined URL » → « URL underlined on hover, with the external-link icon » (Figma 1.1 shows no underline; app underlines on hover) | DONE 2026-11-04 (user OK) — CSV aligned, 1549-018 requalified PASS (`-requal-` real.json) |
| C-7 | 1549-006 | Data adapted to Toyota edmunds corolla-hybrid/2026 consumer-reviews | DONE 2026-11-04 |

### Not run, waiting

| TCs | Reason | Decision (recommended) |
|---|---|---|
| 1547-016 | needs two runs with reviews (verdict reuse) | Rerun after tomorrow's daily run (~14:57 UTC) |
| 1549-026 / 027 | FR / ES interface switch + strings sheet (P7) | Run after P7 is answered, with your OK for the language switch (en-GB restored) |
| 1549-024 | OS native shell (P8) | Keep SKIP until access |
