# GEO-R1.4 — Questions for the PO / PM

**Epics:** GEO-1537 (EPIC-051), GEO-1498 (EPIC-053), GEO-1005 (EPIC-054), GEO-678 (EPIC-050) — all in fixVersion 1.4
**Date:** 2026-11-12
**Sources:** read-only check of every comment (all dates, threaded replies), current descriptions and changelogs of the 4 epics, their stories, design tasks and linked bugs (2026-11-12). GEO-1226 open points stay in `GEO-1226-RUN-FINDINGS.md`.

Each item gives the current QA assumption. If the answer differs, only the tests of that item need an update.
Status: **OPEN** (no answer) · **PARTIAL** (part decided) · **ANSWERED** (decision quoted) · **TEXT** (decision exists, story text not aligned yet).
"Asked" = QA comment posted on 2026-11-12 (comment id given). "Not asked" = draft kept at the end of this file, to post on request.

---

## GEO-1537 — Show the Brands Behind Others

| # | Point | Status | Source | QA assumption | Asked |
|---|---|---|---|---|---|
| Q1 | Deck donut hole shows the Share of Voice of the whole selected period (dev correction 875702) — PM confirmation | OPEN | 875702 (Youssef, 10/11) vs 875646 (Quentin, 10/11); GEO-1590 text agrees with the dev | Whole period | 876542 → Quentin |
| Q2 | Tooltip tail anchored on the middle of the slice's outer edge (design 875353) — dev confirmation | OPEN | 875353 (Jalal, 09/11) | Checked visually against frames 1.1 / 1.2 | 876543 → Youssef |
| Q3 | FR / ES text of the tooltip header "Others" | OPEN | Epic string list gives the deck line only | "Autres" / "Otros" | 876542 → Quentin |
| T1 | US 1.3 AC5 (and GEO-1589 / GEO-1590 shared criterion) still holds the note in brackets that Quentin said he would remove | TEXT | 875646 (Quentin, 10/11) | Test without the note: slices and hole = whole period | 876542 → Quentin |
| T2 | US 1.1 AC7 / GEO-1588 AC7 ask for a "data variant" of the DS Tooltip; reference is the GEO-1543 component "GEO / Others Tooltip [2.0]" | TEXT | 875353 (Jalal, 09/11) | Test against the GEO-1543 component | 876543 → Youssef |
| T3 | GEO-1588 DAC2 still says "to confirm by design" | TEXT | 875353 (Jalal): "Agreed, above the item. New frame 1.4"; TAC8 already aligned | Confirmed: above the item | 876543 → Youssef |
| T4 | GEO-1587 AC4 "same cache" | ANSWERED | Change note in GEO-1587 (Youssef, 09/11, option C, = 875136): the Excel export reads the same computation without cache | Same slices, Others value and order; Excel not cached | — |

To retest: bug GEO-1591 (Excel export 504 on a long period of a large analysis, Done 10/11).

## GEO-1498 — Natural Answer Display in the Question Panel

| # | Point | Status | Source | QA assumption | Asked |
|---|---|---|---|---|---|
| Q1 | Engine not switched at release: display of one analysis date mixing a switched engine and a structured engine | OPEN | Quentin 870232 point 7 (29/10), no dev answer; GEO-1562 AC3 ("an engine not yet switched… stays on its API route") | No TC for a mixed date until answered | 876544 → Youssef, Abdenasser |
| Q2 | GEO-1567 P1 (FR / ES copy), P2 (AC5 "two numbers per row") and GEO-1564 D1 (clamp 184 px / 8 lines) built at the proposed defaults, "not yet confirmed" | OPEN | GEO-1567 implementation summary (Abdenasser, 04/11); GEO-1564 D1 (Abdenasser, 04/11) | Test the proposed defaults, marked "pending PO / design" | Not asked (draft D4) |
| T1 | GEO-1572 AC2: focus trap and arrow keys in both shells | TEXT | 870232 point 1 (Quentin, 29/10): "focus trap and arrow keys in both shells" | Both shells | 876544 |
| T2 | GEO-1566 AC1: every brand of the extracted ranking is highlighted | TEXT | 870232 point 6 (Quentin, 29/10) | Every ranked brand | 876544 |
| T3 | GEO-1566 AC4: chosen brand has no style of its own | ANSWERED | Epic edit 27/10 (Quentin) replaced the "left border" line; GEO-1017 "Decided on 26 Oct" list is outdated on this point | No style on the chosen brand | — |
| T4 | GEO-1566 AC11: one row per brand family | TEXT (PARTIAL) | GEO-1553 869746 / 870318 (Quentin, 29–30/10); gap tracked by bug GEO-1594 | One row per brand family | 876544 |
| T5 | GEO-1565 TAC3 "500-character preview" / "Show more" vs GEO-1564 (8 lines / 184 px, "Show full answer") | TEXT | Build follows GEO-1564 (876230, Youssef, 11/11, on GEO-1601) | GEO-1564 | 876544 |
| T6 | GEO-1569 AC7: only not-counted natural answers disappear; rows of older analyses stay | TEXT | 870232, Excel rows point 5 (Quentin, 29/10) | Older analyses keep "No ranking returned" rows | 876544 |
| T7 | GEO-1556 AC5: remove "Excel favorability and row colour" | TEXT | 870232, readiness point 1 (Quentin, 29/10); Brand Pillars keeps its column | Raw Data without Favorability column and tint | 876544 |

To retest: GEO-1601 to GEO-1605 and GEO-1607 (Done 11/11). PO approved the logo fix GEO-1606 ("A+B", 876328, 12/11).

## GEO-1005 — Add Google AI Overviews as a Tracked Surface

| # | Point | Status | Source | QA assumption | Asked |
|---|---|---|---|---|---|
| Q1 | Staging AI Overviews answers: Cloro dev key or mock vendor | PARTIAL | 870113 (Youssef, 29/10) + 870319 (Quentin, 30/10: Cloro on staging with the dev key, ChatGPT / Gemini); GEO-1596 not built | Cloro dev key once GEO-1596 is deployed | Not asked |
| Q2 | Approval to capture the Google surfaces | PARTIAL | Epic text (Quentin, 12/11): legal sign-off on UI capture obtained 11 Nov; Google surfaces approval "to confirm" | Staging only | Not asked (draft D5) |
| Q3 | "Not available" (excluded country) in Excel Raw Data and in trends | PARTIAL | "Not triggered" now in GEO-1597 text (no value, no Excel row); "Not available" only in dev note 876069 | Unknown — no TC until answered | Not asked (draft D5) |
| Q4 | "Not triggered" / "Not available" in the Questions Analysis table | OPEN | ACs and Figma cover the question panel only (frame 04d) | Unknown — no TC until answered | Not asked (draft D5) |
| Q5 | Excluded-country list applied on the test date | PARTIAL | Epic: 6 countries on 6 Nov (China, Cuba, Ethiopia, Iceland, Iran, Sri Lanka); 876069: vendor list, can change | The 6 countries; read the stored list before the run | Not asked (draft D5) |
| T1 | Whole excluded countries left out of the metrics (876069) not in US 1.2 / 1.3 | TEXT | 876069 (Youssef, 11/11) | Requirement question, not a bug | Not asked (draft D5) |

New 12/11 (epic edit, Quentin): run fails with "No selected engine applies to the selected countries"; softened "Not triggered" text; 7 Cloro credits per capture. GEO-1599 images cannot be built (vendor returns no images; PO 876290 leans to a follow-up story under GEO-1498).

## GEO-678 — Natural Answer Collection and Parsing

| # | Point | Status | Source | QA assumption | Asked |
|---|---|---|---|---|---|
| Q1 | Test data: add collected answers for Chosen, Not chosen and Overlooked (all 67 counted answers are Conditional) | OPEN | 873295 (Youssef, 05/11) on GEO-1554 | Test the three outcomes on staging with real prompts | 876545 → Quentin |
| Q2 | Manager rule at every level; employee approval rating of the CEO → Employer Brand | OPEN | 872753 (Youssef, 04/11) on GEO-1579; earlier answer 872445 (Quentin, 03/11) covers store / team managers only | Any level of management (dev rule, unconfirmed) | 876546 → Quentin |

To retest: GEO-1607 (Excel shows "Conditional · Decathlon", Done 11/11).

---

## Drafts not posted

### D4 — GEO-1567, new comment → Quentin + Jalal

> @Quentin @Jalal The implementation summary of this story lists open items built at the spec's proposed defaults, "not yet confirmed". Can you confirm them so we can test them as final?
> 1. P1 — FR / ES copy (as implemented)
> 2. P2 — AC5 "two numbers per row"
> 3. Design D1 on GEO-1564 — answer preview clamped at 184 px / 8 lines (pending Jalal's confirmation)
>
> Until confirmed, these checks are marked "pending PO / design" in our test cases.

### D5 — GEO-1005, reply in thread 876069 → Quentin + Jalal

> @Quentin @Jalal Open points before testing AI Overviews:
> 1. Excluded countries in the metrics: 876069 says AI Overviews is left out of the metrics for a whole excluded country. US 1.3 only covers prompts with no AI Overview. Can this rule be added to US 1.2 or 1.3?
> 2. "Not available" (excluded country): how does it show in Excel Raw Data (no row or a "Not available" row?) and in the trends (gap or no point)?
> 3. Questions Analysis table: the ACs and Figma cover "Not triggered" / "Not available" in the question panel only (frame 04d). How do these states show in the table?
> 4. Excluded-country list: the epic gives 6 countries as of 6 Nov (China, Cuba, Ethiopia, Iceland, Iran, Sri Lanka) and 876069 says the vendor list can change. We use this list as the baseline unless you tell us otherwise.
> 5. The epic says approval to capture the Google surfaces is still "to confirm". Who gives it and when? Until then we test on staging only.
