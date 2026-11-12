### QA Test Plan for GEO-1226 — Target Sources Improvements for Review Pages

**Updated:** 2026-11-03 | **Source CSV:** testcases-coverage-epicGEO-1226.csv (79 TCs) | **Status:** Approved 2026-11-03

**Objective:** Verify that a review page of a source classified Review Sites reads as one article per review page in the Target Sources panel of the Actions Center: the paginated pages of the same host and path are grouped (never across subdomains or paths), the article title drops the page part, every negative review of each page is listed as its own verbatim entry of 140 characters or less (up to 10 per page, even when it does not name the brand), entries are shown by page under page URL links with a review-count chip, a "Show N more reviews" after the first 10 reviews, cited-by icons merged across pages and a Lack of visibility rule for grouped articles, and the card, the panel tabs, the card sort and the XLSX / PDF / PPTX exports all count articles. Review mode applies only to pages about one company of the brand family; comparison pages, Google Play / App Store pages and sources not classified Review Sites keep today's one-passage rule (PO 869090). The plan also checks the review pages that were misjudged or quoted with their header before this epic (dev 864969), and that the passage rules of other sources (no page chrome, no quote rather than a header, 140-character cut, brand name in the passage) do not change. The Figma frames of GEO-1497 (1.0 to 2.1) are the visual reference; where a frame and an AC disagree, the AC wins.

#### Test Scenarios & Detailed Test Cases

**Negative Review Entries (stories: GEO-1547)**

- Scenario 1: One Entry per Negative Review - Verify that a single-company review page where 4 users criticise the brand gives 4 entries, one per review, under its page block (Figma 1.1).
- Scenario 2: Long Review Cut at 140 Characters - Verify that a negative review longer than 140 characters is quoted verbatim and shortened to 140 characters or less with a single "…" on a word boundary, as in the GEO-1201 rule.
- Scenario 3: Short Review Shown Whole - Verify that a negative review of 140 characters or less is shown whole with no "…", although the demo reviews of Figma 1.1 and 1.2 end with "…".
- Scenario 4: Entry Quoted Verbatim - Verify that every entry is found word for word on the live page, in the language of the page, and that its page block opens that page.
- Scenario 5: Review Without the Brand Name - Verify that on a review page about one company of the brand family a negative review that does not name the brand (e.g. "A EVITER ABSOLUMENT - POUR PRENDRE VOTRE ARGENT ILS SONT FORTS") is listed (Figma 1.1).
- Scenario 6: No Page Chrome Quoted - Verify that no entry is the page title, a menu, a banner or a summary written by the site.
- Scenario 7: Criticism Listed Even in a 4–5★ Review, No Company Reply - Verify that a review that criticises the brand is listed even when it is rated 4 or 5 stars, and that a review holding no criticism of the brand or a reply from the company is never listed (PO decision GEO-1583 comment 876255, 2026-11-11: "Any criticism = listed").
- Scenario 8: Ten Entries per Page - Verify that a page with more than 10 negative reviews lists 10 entries and its count reads "10 negative reviews", with nothing saying that more exist.
- Scenario 9: Cap and Cut on One Page - Verify that a page with 11 or more negative reviews, one of them longer than 140 characters, lists 10 entries and the long one ends with "…" on a word boundary within 140 characters.
- Scenario 10: Page With One Negative Review - Verify that a review page holding a single negative review is negative and shows its page block with "1 negative review".
- Scenario 11: Review Page With No Negative Review - Verify that a review page whose reviews hold no criticism of the brand is not listed in Negative perception.
- Scenario 12: Comparison Page Keeps Today's Rule - Verify that a comparison page rating several companies on a Review Sites domain (e.g. seedly.sg, lecomparateurassurance.com) keeps one passage per page that names the brand (PO 869090).
- Scenario 13: App Store Pages Out of Scope - Verify that a Google Play or App Store page keeps today's one-passage rule and gets no review layout (PO 869090).
- Scenario 14: Other Sources Keep One Passage - Verify that a page of a source not classified Review Sites keeps one passage per page that names the brand, as today.
- Scenario 15: Reviews Kept on Reuse - Verify that after a later run that reuses the verdict of an unchanged review page, its review entries are still shown in the panel.

**Review Page as One Article (stories: GEO-1548)**

- Scenario 16: One Article per Subdomain - Verify that the paginated pages of one review page show as one article per subdomain (e.g. fr.trustpilot.com and fr-be.trustpilot.com for cnp.fr) instead of one article per page (Figma 1.0 vs 1.1).
- Scenario 17: Different Paths Never Grouped - Verify that two review pages on the same host with different paths (e.g. /review/cnp.fr and /review/axa.fr) stay two articles.
- Scenario 18: Subdomains Never Grouped - Verify that the same review page on two subdomains (e.g. www, uk or nl-be trustpilot.com) gives two articles.
- Scenario 19: Pagination Parameters Grouped - Verify that the pages of one review page that differ only by the page, p or pg parameter are grouped into one article.
- Scenario 20: URL Variants Not Merged - Verify that scheme, www or trailing-slash variants of one review page are not merged into one article (dev note GEO-1548).
- Scenario 21: Article Title Without Page Part - Verify that pages titled "Avis de CNP Assurances | Lisez les avis marchands de cnp.fr | 2 sur 30" give the article title "Avis de CNP Assurances" (Figma 1.1).
- Scenario 22: Grouped Article Negative - Verify that a grouped article shows in Negative perception when at least one of its pages is negative.
- Scenario 23: Grouped Article in Lack of Visibility - Verify that a grouped article whose pages never name the brand shows in Lack of visibility as one article (Figma 1.3).
- Scenario 24: Not in Lack of Visibility When Named - Verify that a grouped article is not in Lack of visibility when one of its pages names the brand.
- Scenario 25: Same Article Count on Card and Panel - Verify that the card lines "Not visible in N articles" and "Negative perception in N articles" and the panel tab counts give the same number of articles for a review site.
- Scenario 26: Card Sort by Articles - Verify that the card sort based on failing articles counts grouped articles, not pages, so a review site no longer ranks higher only because it is paginated.
- Scenario 27: Exports Give the Same Article Count - Verify that the XLSX, PDF and PPTX exports give the same number of articles per review site as the card and the panel.
- Scenario 28: Review Count of an Article - Verify that an article whose pages hold 4, 2, 3 and 2 negative reviews counts 11 negative reviews in its chip.
- Scenario 29: Review Count in the Exports - Verify that the XLSX, PDF and PPTX exports show the number of negative reviews per article, equal to the panel chip, and no quote.
- Scenario 30: Other Sources One Article per URL - Verify that a source not classified Review Sites keeps one article per URL, including URLs that differ only by ?p= on a Journalism source (dev 868944).
- Scenario 31: Prompts Section Unchanged - Verify that the "Prompts associated with this source" section of a review site is unchanged, with its All and per-engine tabs and prompt rows (Figma 1.1).
- Scenario 32: Comparison Page Alone in Its Article - Verify that a review-site page without stored reviews that is the only page of its article keeps its classic passage (dev note GEO-1548).
- Scenario 33: Page Without Reviews in a Group - Verify how a page without stored reviews is shown and counted inside a multi-page article, once the expected behaviour is decided (open point).
- Scenario 34: Card and Panel Agree on Any Source - Verify that the card count and the panel tab count also agree on a source not classified Review Sites, both counting verified pages only.

**Review Panel Layout (stories: GEO-1549)**

- Scenario 35: Reviews by Page - Verify that a grouped article lists its reviews by page in page order, each page block starting with the page URL as a link, then its count (e.g. "4 negative reviews"), then its reviews (Figma 1.1, 1.2).
- Scenario 36: Long Page URL in Full - Verify that a long page URL in a page block is shown in full and wraps, with no truncation.
- Scenario 37: Page Link Opens a New Tab - Verify that the page URL of a page block opens that page in a new tab and shows the external link icon (Figma 1.1).
- Scenario 38: No Empty Page Block - Verify that a page with no negative review gets no page block, so every block shows a count of 1 or more and at least one entry (Figma 1.1, 1.2).
- Scenario 39: Article Chip - Verify that the chip under the article title reads the number of negative reviews of the article, e.g. "17 negative reviews", shown in upper case by the design style (Figma 1.1).
- Scenario 40: Singular Forms - Verify that an article or a page with one negative review reads "1 negative review" (Figma 1.1).
- Scenario 41: No Page Count or Total - Verify that the panel shows no page-count chip, no "of 20 reviews", no "Page N" and no rating (PO 865680).
- Scenario 42: Grouped URL Line Plain Text - Verify that the URL line of an article grouping several pages (e.g. fr.trustpilot.com/review/cnp.fr) is plain text and opens nothing (Figma 1.1).
- Scenario 43: One-Page Review Page - Verify that a review page with one page has no page block, shows its reviews under the title, and that its URL line opens the page, as today (Figma 1.4).
- Scenario 44: Quote-Only Entry - Verify that each entry is the quote only, with no user name, rating or date (Figma 1.1).
- Scenario 45: First 10 Reviews Then Show More - Verify that an article with 17 negative reviews shows its first 10 reviews, the header of the page where the cut falls above its first review, then "Show 7 more reviews" (Figma 1.1).
- Scenario 46: Show More Expands the Article - Verify that a click on "Show 7 more reviews" shows all 17 reviews in page order and leaves no button and no "Show less" in the article (Figma 1.2).
- Scenario 47: Exactly 10 Reviews - Verify that an article with exactly 10 negative reviews shows them all with no Show more button.
- Scenario 48: Show 1 More Review - Verify that an article with 11 negative reviews shows "Show 1 more review".
- Scenario 49: More Than 20 Reviews - Verify the Show more behaviour of an article with more than 20 negative reviews, once it is decided whether one click shows all of them or the next 10 (open point).
- Scenario 50: Reviews and Articles Show More Together - Verify that "Show N more reviews" inside an article and "Show N more articles" of the list work independently in the same tab.
- Scenario 51: Cited-By Union - Verify that the cited-by icons of a grouped article are the engines that cite any of its pages.
- Scenario 52: Lack of Visibility Pages as Links - Verify that a review page in Lack of visibility shows as one article listing each of its pages, page 1 included, as a link, with no quote (Figma 1.3).
- Scenario 53: Lack of Visibility Without Chip - Verify that a review article in Lack of visibility shows no "N negative reviews" chip and no count per page (Figma 1.3).
- Scenario 54: Panel Frame Unchanged - Verify that the panel header and its chips, the tab subtitles "Each of these articles mentions {brand} negatively." and "None of these articles mentions {brand} anywhere on the page.", and the footer "Previous" · "Source N of M" · "Next source" are unchanged (Figma 1.1, 1.3).
- Scenario 55: OS Native Shell - Verify that in the Onclusive Social native shell the review panel is identical to the standalone one (Figma 2.1).
- Scenario 56: French Strings - Verify with the interface in French that the chip, page count and Show more texts match the locked FR strings in singular and plural, then restore en-GB.
- Scenario 57: Spanish Strings - Verify with the interface in Spanish that the chip, page count and Show more texts match the locked ES strings in singular and plural, then restore en-GB.

**Checks Needing Dev Evidence (stories: GEO-1547 & GEO-1548 & GEO-1549)**

- Scenario 58: Optional Review Fields - Verify with dev evidence that candidates and verdicts without the new review fields keep today's behaviour with no error.
- Scenario 59: Only Review Pages Re-judged - Verify with dev evidence that after the deploy only review-site pages are re-judged once, while a non-review page keeps its passage.
- Scenario 60: Not-Fetched Page Counts Nowhere - Verify that a page that was not fetched counts nowhere, with the card, the panel and the XLSX giving the same article count (dev evidence for the page state).
- Scenario 61: Group Without Checked Page - Verify with dev evidence that a group whose pages were all not fetched or failed the check is in no tab.
- Scenario 62: Older Article Format - Verify with dev evidence that an article without pages in the API response renders as today's row with its passage.

**Review Pages Previously Misjudged and Rules Kept on Other Sources (stories: GEO-1547)**

- Scenario 63: Trustpilot Pages Now Negative - Verify that review pages with negative reviews that were judged not negative (Victoria's Secret uk.trustpilot.com and trustpilot.com/review/www.victoriassecret.co.uk, Verisure es.trustpilot.com) are negative with review entries (dev 864969).
- Scenario 64: Review Entries Instead of Header - Verify that MSC Croisières fr.trustpilot.com shows review entries instead of the page header as its passage (dev 858815, 864969).
- Scenario 65: Negative Pages Stay Negative - Verify that MSC fr.trustpilot.com and the routard.com forum, Victoria's Secret nl-be and www trustpilot.com, the USPS prc.gov PDF and Verisure comparador-alarmas.es stay negative, with no negative passage on a page judged not negative (dev 858472).
- Scenario 66: No Chrome on Other Sources - Verify that on non-review sources (e.g. Toyota: edmunds, alvolante, frandroid, caradisiac) no passage is a page title, cookie banner, menu or favourable sentence, and that a criticism naming the brand late is joined to the nearest brand name with "…" (dev 860052).
- Scenario 67: No Quote Rather Than Header - Verify that a non-review article with no good quote stays listed without a quote rather than showing the page header (PO 859761).
- Scenario 68: 140-Character Rule on Other Sources - Verify that passages of non-review sources stay at 140 characters or less, cut with a single "…" on a whole word (GEO-1201 rule).

#### Edge Cases & Boundary Conditions

* Page with more than 10 negative reviews: 10 entries, count "10 negative reviews", nothing says more exist (epic changelog 2026-10-22).
* Review longer than 140 characters: cut to 140 or less, "…" included, single "…" character, on a word boundary; 140 or less: shown whole.
* Review that does not name the brand: listed on a single-company review page only; a comparison page on a Review Sites domain keeps the one-passage rule with the brand name (PO 869090).
* "The brand" includes its products: a review page of a product (e.g. Digimind) counts as a page about the brand (Onclusive) (dev 868944, PO 869090).
* Google Play and App Store pages: out of scope, today's rule (PO 869090).
* Same host, different paths: never grouped; same review page on two subdomains (fr vs fr-be, www vs uk): two articles.
* Scheme, www or trailing-slash variants of one review page: never merged (dev note GEO-1548).
* page, p or pg parameter: grouped on Review Sites only; ?p= on any other source type stays one article per URL (dev 868944).
* Grouped article with at least one negative page: Negative perception; Lack of visibility only when none of its pages names the brand.
* Group whose pages were all not fetched or failed the check: in no tab; a page not fetched counts nowhere.
* Comparison page without stored reviews alone in its article: classic passage (dev note GEO-1548).
* Article with exactly 10 reviews: no Show more; 11 reviews: "Show 1 more review"; 17 reviews: "Show 7 more reviews", then all 17 and no button left.
* 10th review inside a page: that page's header shows above the reviews before the cut, the rest after the click (Figma 1.1).
* One-page review page: no page block, reviews under the title, URL line is a link.
* Page with no negative review: no page block (Figma 1.1, 1.2).
* Long page URL: shown in full and wraps.
* Lack of visibility review article: pages as links, no quote, no chip, no count (Figma 1.3).
* Non-review article with no good quote: listed without a quote, never the page header (PO 859761).
* Reviews in a foreign language: quoted verbatim in the page language, not translated.

#### Open Points (not blocking)

* GEO-1548 / GEO-1549: how a page without stored reviews (comparison page judged with today's rule, or a page not yet re-judged) is shown inside a multi-page article (page block with its classic passage, block with no entry, or not shown), and whether it counts for the article verdict and the Lack of visibility rule; only the one-page case is decided (dev note GEO-1548, no PO comment) — Scenario 33.
* GEO-1549: after "Show N more reviews", are all remaining reviews shown (Figma 1.2, c865575 "one click reveals the rest") or the next 10 as in the articles list (epic "same step as GEO-1161")? Is N the total remaining or at most 10? No example exceeds 20 reviews — Scenario 49.
* GEO-1548 AC3: title rule for review sites other than Trustpilot — which title formats count as the page part ("Page 2", "- Page 3", "(2/29)"…) and which page's title the article uses.
* GEO-1226: the epic changes review pages only (dev 864969); non-review pages with the same symptom — the prc.gov press release judged not negative and the prc.gov PDF quoted with its title (dev 858472, 858815) — are not covered: accept them as known limits of this epic or handle them in a separate ticket? Google Play pages are out of scope (PO 869090).
* GEO-1548 AC6: where and with which label (EN / FR / ES) the number of negative reviews per article shows in the XLSX, PDF and PPTX exports; the strings sheet holds only the 4 panel strings and no frame shows the export — Scenarios 27 and 29 check the number only.
* GEO-1547 AC2 vs Figma 1.1, 1.2 and 2.1: demo reviews of 68 to 87 characters end with "…"; the AC wins (cut only above 140 characters) — Scenario 3.
* GEO-1547 TAC1, GEO-1548 TAC4, GEO-1549 TAC3: not testable in the UI, dev evidence needed (Scenarios 58, 61, 62); GEO-1547 TAC2, TAC3, TAC5 and GEO-1548 TAC1, TAC3 are only partly visible (Scenarios 59, 4, 15, 19, 60).
* GEO-1547 (dev note): the judge was validated on synthetic fixtures; the tests must use real staging review pages, not only the ticket example.
* Prerequisite (all stories): staging analyses with a paginated single-company review page on a Review Sites domain (several ?page=N, two subdomains, an article with more than 10 and one with exactly 10, 11 and 17 reviews, a page with more than 10, a review over 140 characters, a one-page review page, a Lack of visibility review page, a comparison page, pages cited by different engines), run after the review-v1 deploy; is there a staging equivalent of CNP Assurances, or may AC1 / AC3 be checked read-only on production?
* Prerequisite (GEO-1549): read access to the strings sheet tab "GEO-1226 Review pages" for the FR / ES expected texts, and the build where the provisional FR / ES translations are replaced (dev note GEO-1549) — Scenarios 56 and 57.
* Prerequisite (GEO-1549): access to the Onclusive Social native shell on staging (Figma 2.1); the shell demo texts of the frame are not part of the delivery — Scenario 55.
* Prerequisite (GEO-1547): review mode has no UI marker; the dev or the panel API response (reviews / pageTitle) must tell which pages got review mode and which were treated as comparison pages — Scenarios 5, 12, 32.
* Prerequisite: the GitHub specs of epic 49 were not read (no access from this workflow); the Jira ACs copied in the local story files are the reference.

**Environment:** Staging (https://staging-geo.onclusive.com/geo), org QA-GEO (candidate review-site analyses also in org GEO Stress Test 2026-10, to confirm in the test data phase), main QA account (SUPER_ADMIN), interface en-GB checked with GET /geo/api/v1/auth/me (FR and ES only for Scenarios 56 and 57, then en-GB restored); analyses run after the review-v1 deploy; XLSX, PDF and PPTX exports; standalone shell and Onclusive Social native shell.

**Priority:** High

#### AC Coverage by Story

Result: **31 / 31 functional ACs covered** (GEO-1226 10/10, GEO-1547 7/7, GEO-1548 7/7, GEO-1549 7/7), plus 12 technical ACs each mapped to a scenario (4 fully testable in the UI, 5 partly, 3 dev evidence only). "Partial" = only the visible output is testable (see Open Points).

**GEO-1226 — Epic-level ACs**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One article for fr and one for fr-be trustpilot | 16 | Yes (staging equivalent of CNP needed, open point) |
| AC2 | 4 negative reviews give 4 entries | 1 | Yes |
| AC3 | Verbatim entry, page block opens the page | 4, 35 | Yes |
| AC4 | No title, menu, banner or positive review | 6, 7 | Yes |
| AC5 | Review without the brand name listed | 5 | Yes (review mode marker needed) |
| AC6 | Different paths never grouped | 17 | Yes |
| AC7 | Same count on card, panel and export | 25, 27 | Yes |
| AC8 | First 10 reviews then Show N more | 45 | Yes |
| AC9 | Lack of visibility as one article, only when no page names the brand | 23, 24, 52 | Yes |
| AC10 | Page with more than 10 lists 10, count 10 | 8 | Yes (data needed) |

**GEO-1547 — List every negative review of a review page**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One entry per negative review | 1 | Yes |
| AC2 | Verbatim, 140 characters with "…" | 2, 3 | Yes |
| AC3 | Brand name not required on a review page | 5, 12, 14 | Yes (review mode marker needed) |
| AC4 | Never chrome or a positive review | 6, 7 | Yes |
| AC5 | At most 10 per page | 8 | Yes (data needed) |
| AC6 | Page negative with one negative review | 10, 11 | Yes |
| AC7 | Other sources unchanged | 13, 14, 66, 67, 68 | Yes |
| TAC1 | Optional contract | 58 | No — dev evidence |
| TAC2 | Only review pages re-judged | 59 | Partial (re-judgement not visible) |
| TAC3 | Verbatim only | 4 | Partial (dropped quotes not visible) |
| TAC4 | Cap and cut | 9 | Yes (data needed) |
| TAC5 | Reviews survive reuse | 15 | Partial (reuse not visible) |

**GEO-1548 — Group the pages of a review page into one article**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | One article per review page and subdomain | 16 | Yes (staging equivalent of CNP needed) |
| AC2 | Same page only, subdomains never grouped | 17, 18, 20 | Yes |
| AC3 | Title without the page part | 21 | Yes (other title formats, open point) |
| AC4 | Negative and Lack of visibility tabs | 22, 23, 24, 33 | Yes (page without reviews, open point) |
| AC5 | Same number everywhere, card sort | 25, 26, 27, 34 | Yes |
| AC6 | Review counts 4+2+3+2 = 11 | 28, 29 | Yes (export label, open point) |
| AC7 | Other sources and Prompts section unchanged | 30, 31, 32 | Yes |
| TAC1 | Grouping key page / p / pg | 19 | Partial (only parameters present in real data) |
| TAC2 | Journalism ?p= stays two articles | 30 | Yes (data needed) |
| TAC3 | Same count, not-fetched page nowhere | 60 | Partial (page state not visible) |
| TAC4 | No vacuous Lack of visibility | 61 | No — dev evidence |

**GEO-1549 — Show review pages in the Target Sources panel**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Reviews by page under page URL links | 35, 36, 37, 38 | Yes |
| AC2 | Article chip, no page count, no total | 39, 40, 41 | Yes |
| AC3 | Plain URL line, one-page review page | 42, 43 | Yes |
| AC4 | Quote-only entry | 44 | Yes |
| AC5 | First 10 reviews, Show N more, cut inside a page | 45, 46, 47, 48, 49, 50 | Yes (more than 20 reviews, open point) |
| AC6 | Cited-by icons union | 51 | Yes (multi-engine data needed) |
| AC7 | Lack of visibility pages as links, no quote | 52, 53 | Yes |
| TAC1 | Step counts reviews (17 → 10 + Show 7 more) | 45, 46 | Yes (data needed) |
| TAC2 | One page, no page block | 43 | Yes |
| TAC3 | Older API article without pages | 62 | No — dev evidence |
| DoD | EN / FR / ES strings, both shells | 39, 40, 48, 54, 55, 56, 57 | Yes (strings sheet and OS native access needed) |
