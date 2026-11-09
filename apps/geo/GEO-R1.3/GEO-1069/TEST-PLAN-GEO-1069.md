### QA Test Plan for GEO-1069 — Ask for the Brand Website when a Custom Brand is Entered

**Updated:** 2026-10-25 | **Source CSV:** testcases-coverage-epicGEO-1069.csv (35 TCs) | **Status:** Approved 2026-10-25

**Objective:** Verify that a custom brand can be given an optional website in Brand & Country, that any reasonable URL is normalized to the full hostname without www, that the logo of that domain is previewed with the general favicon and lettermark fallbacks, and that the captured domain is stored as the brand domain like a selected suggestion and used everywhere the brand appears (report list, dashboard, rankings, prompts table winner, competitive views, exports, category and competitor discovery, owned-domain exclusion), while older analyses keep today's behaviour. Cross-epic integration and non-regression checks are in the release plan TEST-PLAN-GEO-R1.3.

#### Test Scenarios & Detailed Test Cases

**Brand Website Field (stories: GEO-1260)**

- Scenario 1: Website Asked for a Custom Brand - Verify that choosing the "Custom Brand" row of the brand search shows an optional website field before Discover Categories.
- Scenario 2: Website Asked When the Search Returns Nothing - Verify that a brand name returning no suggestion at all shows the same custom row and the same optional website field.
- Scenario 3: Website Left Empty - Verify that leaving the website empty lets the setup continue normally, with no logo retrieval and the brand shown as a neutral lettermark.
- Scenario 4: Suggestion Selected - Verify that selecting a dropdown suggestion requests no website and keeps today's brand card and flow.
- Scenario 5: Website Field Placement and Copy - Verify that the website field is inline under the custom brand card, before category discovery, with the label "What is your brand's website? (optional)", the placeholder "example.com" and the hint "We use it to show the right logo. Leave it empty to show your brand's initial."
- Scenario 6: No Website in an Unbranded Analysis - Verify that Topic & Country of an unbranded analysis never asks for a website.
- Scenario 7: Website Change Resets Categories - Verify that changing the website after categories were discovered resets the discovered categories, as renaming the brand does.

**URL Normalization (stories: GEO-1261)**

- Scenario 8: Reasonable URL Forms Accepted - Verify that a full URL, a bare domain, or an address with or without protocol, www prefix or trailing path is accepted and gives the full hostname without the protocol, the www prefix, the path or the query (https://www.brand.com/fr?x=1 gives brand.com, shop.brand.co.uk stays as is).
- Scenario 9: Invalid Website Inline Error - Verify that input that cannot be interpreted as a domain shows the inline message "Enter a valid website, such as example.com." on blur or on Discover Categories, blocks the step, and disappears once the value is valid or empty.
- Scenario 10: Derived Domain Stored - Verify that the derived domain is stored as the brand's domain of the created analysis, as shown by the domain-based logo after creation.

**Logo Preview (stories: GEO-1262)**

- Scenario 11: Logo Preview on Confirm - Verify that confirming a valid domain (blur or Enter) shows the retrieved logo in place of the 32px avatar of the custom brand card within moments, with the domain shown under the brand name.
- Scenario 12: General Favicon and Lettermark Fallbacks - Verify that a domain unknown to the brand logo service shows the general favicon (the site's favicon, or the generic globe when the site has none), and that the lettermark shows only when neither is available (the favicon fails to load).
- Scenario 13: Preview Follows a Website Correction - Verify that editing the website URL updates the preview to the logo of the new domain and never shows the previous domain's logo.
- Scenario 14: No Website, No Lookup - Verify that with no website provided the setup shows the lettermark as the brand visual and no logo lookup happens.

**Brand Logo Across the Analysis (stories: GEO-1263)**

- Scenario 15: Captured Domain Logo Everywhere - Verify that a custom brand with a captured domain shows the same domain-based logo in the report list, dashboard sidebar and header, rankings target row (Overview and Category views), competitive views and PowerPoint / PDF export.
- Scenario 16: Lettermark Everywhere Without Website - Verify that a custom brand with no website shows the neutral lettermark consistently in the same places, never a logo from a guessed domain (name search or AI-cited domain).
- Scenario 17: Older Analyses Unchanged - Verify that an analysis created before the release with no stored brand domain keeps today's logo behaviour on every surface.

**Captured Domain as the Brand Domain (stories: GEO-1263 & GEO-1261)**

- Scenario 18: Winner Logo in the Prompts Table - Verify that a prompt won by the target custom brand shows the captured-domain logo in the prompts table winner column, and the lettermark when no website was given.
- Scenario 19: Website Feeds Category Discovery - Verify that category discovery of a custom brand with a website uses that website as the brand domain, like a selected suggestion.
- Scenario 20: Owned-Domain Exclusion - Verify that cited sources on the captured domain are treated as the brand's own domain in AI Citation Sources.
- Scenario 21: Competitor Discovery Uses the Captured Domain - Verify that competitor discovery treats the captured domain as the analysed brand's domain, so a brand owned on that domain is not listed as a competitor.

#### Edge Cases & Boundary Conditions

* Brand name typed as an address (e.g. www.licter.com): website field prefilled with the normalized domain, so a logo is shown (OP-9 closed).
* URL normalization: https://www.licter.com/fr/about?x=1, http://licter.com, www.licter.com, licter.com/, LICTER.COM and licter.com:8080 give licter.com; shop.brand.co.uk stays shop.brand.co.uk (full hostname without www).
* Invalid website inputs: licter, licter .com, john@licter.com, ftp://licter.com, localhost and 192.168.0.1 show "Enter a valid website, such as example.com." and block the step; the server also refuses an invalid website at creation.
* Site with no favicon: the general favicon (Google's generic globe) is shown, not the lettermark (accepted by the PO, GEO-1262 AC2 amended 2026-10-20); the lettermark shows when there is no domain or the favicon fails to load.
* Website changed after a lookup: the previous domain's logo is never shown nor saved for the new domain; a grey pulsing placeholder shows during the lookup with no layout shift.
* Website changed after category discovery: the discovered categories are reset, as when the brand is renamed.
* Selected Brandfetch suggestion with neither domain nor logo (rare): now shows the lettermark.

#### Open Points (not blocking)

* GEO-1263 (P1 validated 2026-10-20, epic In scope): GEO-1263 has no AC for the new scope (category discovery, owned-domain exclusion, competitor discovery, prompts table winner); Scenarios 18 to 21 trace to the epic In scope; AC text requested from the PO.
* GEO-1263: "the brand checks" are named in P1 only, not in the epic In scope nor in any AC; no scenario until the PO writes an AC.
* GEO-1263 AC3 (B2): Scenario 17 needs a custom-brand analysis (no stored domain) with an export or logo screenshots taken before GEO-1069 was deployed (test data still to find).
* GEO-1262 AC1 (prerequisite): Scenario 11 needs the Brandfetch brand-profile quota available on staging; without it only the favicon fallback can be checked.
* GEO-1262 AC2: the epic text (User Story 1.3) still reads "the site's favicon", while the story was amended to "the general favicon"; the story is tested (Scenario 12).
* GEO-1260 AC5: the AC names the "Custom Brand" row while the Rules still say "{name} — custom"; scenarios use "Custom Brand".
* GEO-1260 AC7 (OP-6): whether categories are reset at once or at the next Discover Categories is not stated; Scenario 7 checks only that the previous categories are not kept.
* GEO-1069 (OP-2, OP-4, OP-8, still open): lettermark for a Brandfetch suggestion with neither domain nor logo vs GEO-1260 AC4 "flow unchanged"; which screens are the "competitive views" of GEO-1263 AC1 (Scenario 15, to be tested on a ranked analysis such as Nike or Decathlon); no target delay for "within moments" (Scenario 11).
* GEO-1069: no Figma (OS-Team exception); the design review was validated by the designer on 2026-10-22 (GEO-1069 comment 866460); en-US copy validated, en-GB, fr-FR and es-ES texts are machine translations still to be reviewed.
* GEO-1069: extending the website request to manually added competitors is still open (out of scope today).
* GEO-1263 TAC1 to TAC4: database / export technical checks, not counted as QA ACs and not turned into scenarios.

**Environment:** Staging — a Brandfetch-suggested brand and a custom brand, with a website that has a favicon only and one with no favicon; Brandfetch brand-profile quota available (GEO-1262 AC1); a ranked analysis (e.g. Nike or Decathlon) for the competitive views; a custom-brand analysis created before GEO-1069 for GEO-1263 AC3 (still to find).

**Priority:** High

**Assignee:** Assiya.Benramdane (to confirm)

#### AC Coverage by Story

Result: **17 / 17 ACs covered** (GEO-1260 7/7, GEO-1261 3/3, GEO-1262 4/4, GEO-1263 3/3). Every AC maps to at least one scenario. "Partial" = only the visible output is testable (see Open Points). Scenarios 18 to 21 also trace to the GEO-1069 epic In scope rule, which has no story AC yet.

**GEO-1260 — Ask for the brand website when no suggestion is selected**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | No suggestion selected | 1 | Yes |
| AC2 | No suggestion at all | 2 | Yes |
| AC3 | Left empty | 3 | Yes |
| AC4 | Suggestion selected | 4 | Yes |
| AC5 | Placement and texts (new 2026-10-20) | 5 | Yes |
| AC6 | Unbranded (new 2026-10-20) | 6 | Yes |
| AC7 | Website change resets categories (new 2026-10-20) | 7 | Yes (timing not stated) |

**GEO-1261 — Accept and normalize any reasonable URL input**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Any reasonable form (reworded 2026-10-20) | 8 | Yes |
| AC2 | Not a domain (reworded 2026-10-20) | 9 | Yes |
| AC3 | Stored | 10, 19, 20, 21 | Partial (verified through the logo and the domain uses after creation) |

**GEO-1262 — Retrieve and preview the logo from the provided domain**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Preview (reworded 2026-10-20) | 11 | Yes (needs the Brandfetch quota available) |
| AC2 | Fallbacks (amended 2026-10-20) | 12 | Yes |
| AC3 | Correction | 13 | Yes |
| AC4 | No website | 14 | Yes |

**GEO-1263 — Use the captured domain everywhere the brand appears**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Captured domain everywhere | 15, 18 | Yes |
| AC2 | No website: lettermark everywhere | 16, 18 | Yes |
| AC3 | Older analyses unchanged | 17 | Yes (needs pre-release custom-brand baseline, B2) |