 removed from 866762 by the user (2026-10-22) — dev 862858 defines "—" for an Other prompt with no theme: bug candidate | removed from 866762 by the user (2026-10-22) — partly covered by PO 859152 / 1.4 AC4 (brand family); single-engine case open | removed from 866762 by the user (2026-10-22) — epic 1.3 AC10 has no negative-only filter: bug candidate | ANSWERED (epic 1.8 AC3, found 2026-10-22): Other tab hidden at 0 by design; removed from 866762 | ANSWERED 2026-10-06 (PO 859152 + epic 1.2 AC5, found 2026-10-22): market adaptation rewords by design (buy → use); removed from 866762 | **BUG CREATED 2026-10-22: GEO-1528 (Low, exists in production)** | **BUG CREATED 2026-10-22: GEO-1527 (Low)** | **BUG CREATED 2026-10-22: GEO-1526 (Low)** | **BUG CREATED 2026-10-22: GEO-1525 (High)** | **BUG CREATED 2026-10-22: GEO-1524 (Medium)** |# GEO-1209 — MCP run findings to triage (GEO-R1.3)**BUG CREATED: GEO-1524** — Action Needed 23/10 (MiRider dot over the AT RISK caption), dev fix redeployed 23/10 13:20 → **Ready for QA, to retest** |**BUG CREATED: GEO-1525** — FIXED, Passed QA 2026-10-23 (867021) |**BUG CREATED: GEO-1527** — FIXED, Passed QA 2026-10-22 (866875) |**BUG CREATED: GEO-1528** (production, no parent) — FIXED, Passed QA 2026-10-23 (867338) |

**Campaign 1:** 8 story runs on staging, 20–21/10/2026, org QA-GEO, en-GB, unbranded flag ON — `runs/21102026-1027/MCP-Report-GEO-1209-consolidated.html` — 97 TCs, 46 PASS / 6 FAIL / 27 PARTIAL / 18 SKIP — CONDITIONAL 75.3%
**Campaign 2:** 8 story runs on staging, 22/10/2026, CSV synced 22/10 (PO copy 865635, step "Summary") — `runs/GEO-R1.3_GEO-1209_22102026-1752/MCP-Report-GEO-1209-r2-consolidated.html` — 97 TCs, 62 PASS / 1 FAIL / 19 PARTIAL / 15 SKIP — GO 87.2% (incl. the rerun of 6 aligned TCs, 22102026-1750) (PASS + 0.5 × PARTIAL) / (total − SKIP), 2 h 07

Run rules (QA decisions): read-only runs; campaign 2 with EXISTING analyses only (user decision 2026-10-22: no analysis created, every "Create Analysis" step SKIP); wizard drafts allowed; nothing saved in Manage Scope. Analyses: "Electric bikes" 42c3ab89 (GB, 1 category + Other, 5 prompts) and "bike" d3fd1b30 (unbranded, US, Mountain Bikes + Road Bikes, Competitive prompts kept).

Each item has an ID so PO / dev answers can be matched to it. Status: `OPEN` until an answer is found.
Roles: Quentin Reant = PO/PM (PO_DECISION); Youssef Ait Laydi and Abdenasser Aroukhsiss = devs (DEV_ANSWER).

---

## 1. Bugs raised

| ID | Story | Finding | Jira | Status |
|---|---|---|---|---|
| F-01 | GEO-1241 / 1246 | Type select of an existing prompt never offered "Other" (TC-GEO-1241-014, TC-GEO-1246-003). A prompt already in Other shows Other as its current value and does not list it again (dev answer accepted, 46.7 AC5). | GEO-1509 (UAT, PO) | Passed QA 2026-10-21 |
| F-02 | GEO-1241 | "Category Topics" type badge overflowed into the Prompt column. | GEO-1508 (UAT, PO) | FIXED 2026-10-21 (comment 865980) |
| F-03 | GEO-1242 | Competitive prompts sent with fewer than 3 competitors end with "or ?" (TC-GEO-1242-012 / 013). Not verifiable: all 280 Competitive results in QA-GEO name 4 brands. Needs a niche analysis with 2–3 brands and Competitive prompts kept. | GEO-1249 | **FIXED 2026-10-27** (dev cases 868643: Zomato 0 competitor "Zomato for Restaurant Discovery?" OK; scan of 12 analyses clean; Orange 2-competitor text not visible, 1-competitor and FR/DE/ES not covered by data) — reply 868788 (thread 868643), Passed QA |
| F-04 | GEO-1245 | Unbranded PPTX export: the category section has no landscape (top 10 brands) slide; the XLSX and the category page have it. | GEO-1521 (Low) | BUG CREATED 2026-10-22 |
| F-05 | GEO-1246 | Add Country: the Visibility prompts of the new country keep the English category name ("¿Cuáles son las mejores Mountain Bikes?"); also "de commuting" / "decommuting" in ES Competitive prompts. | GEO-1522 (Medium) | BUG CREATED 2026-10-22 |
| F-06 | GEO-1245 | Unbranded XLSX export: the Raw Data sheet still has a "Favorability" column, N/A on every row (removed in 1.2, GEO-1125). | GEO-1523 (Low) | BUG CREATED 2026-10-22 |

## 2. Possible bugs not raised yet (to triage)

| ID | Story | Finding | Evidence | Status |
|---|---|---|---|---|
| F-07 | GEO-1244 / 1245 | Brand Prioritization: every brand in "At Risk" while the API returns "MONITOR"; the expanded cluster spills outside the plot (Tern below 0%, Ribble past the right edge). Same "At Risk" in the PPTX matrix slide. | run 22102026-1235 TC-GEO-1244-003, run 22102026-1237 | BUG (user 2026-10-22) — to create |
| F-08 | GEO-1244 | Changing the date does not reload the prompts table (it keeps the latest collection); same on Toyota (brand), so probably also in production. If intended, AC-5 "selected collection" can never be met (see Q-11). | run 22102026-1235 | NOT A BUG (user 2026-10-22) — by design, removed; TC-GEO-1244-008 aligned 2026-10-22 |
| F-09 | GEO-1243 | InBrief of "bike" / Road Bikes never generates: 3 loads (12:04–12:15, 22/10) returned `502 "Summary generation failed after 3 retries: TOPIC_SUMMARY"`. | run 22102026-1215 TC-GEO-1243-006 | BUG (user 2026-10-22) — to create |
| F-10 | GEO-1245 | Exports show dates in US format ("Oct 21, 2026") with lang=en-GB; PPTX "Mixed · 1 topics" (plural for 1). | run 22102026-1237 | **BUG CREATED: GEO-1526** (dates only; FIXED, Passed QA 2026-10-23, comment 866876). "1 topics" plural: not raised (user decision 2026-10-23) |
| F-11 | GEO-1244 | The topics list of an unbranded analysis has the aria-label "Perception topics" (GEO-1244 AC-7: "Category Topics, not Perception"); it comes from the en-gb.json string. | run 22102026-1235 TC-GEO-1244-010 | BUG (user 2026-10-22) — to create |
| F-12 | GEO-1244 | Share of Voice legend: rounded values add up to 101–102%. | runs 20/10 and 22/10 | BUG (user 2026-10-22) — to create |

## 3. Questions for the PO

| ID | Story / TC | Question | Status |
|---|---|---|---|
| Q-01 | TC-GEO-1242-001 | Summary does not show the topic of an unbranded analysis (it does not show the brand of a brand analysis either). Expected? | ASKED 2026-10-22 (866762); PO asked for context on 2026-10-26 (867725); re-asked with context and screenshots 2026-10-26 (867843); **ANSWERED 2026-10-26** (PO 867869: "Q1 - no") — the Summary does not show the topic; TC-GEO-1242-001 expected result aligned in the CSV (2026-10-27) |
| Q-02 | TC-GEO-1242-004 | On GB (EN), the market adaptation rewords the Visibility templates ("Best Package Delivery service?", buy → use), while AC-4 says "unchanged". Allowed? (Competitive prompts are reworded too.) | ANSWERED 2026-10-06 (PO 859152 + epic 1.2 AC5, found 2026-10-22): market adaptation rewords by design (buy → use); removed from 866762 |
| Q-03 | GEO-1243 | The "Category Topics" tab of the sources modal lists only the prompts whose topic is negative, so it shows 0 everywhere on Electric bikes. Expected? | removed from 866762 by the user (2026-10-22) — epic 1.3 AC10 has no negative-only filter: bug candidate — **BUG CREATED 2026-10-22: GEO-1529 (Medium)** |
| Q-04 | GEO-1243 | The InBrief error of an unbranded analysis reads "Failed to generate perception summary." Should it have its own wording? | ✅ ANSWERED 2026-10-26 (PO, GEO-1209 comment 867725): "no need own wording" — the generic message stays for unbranded analyses (by design) |
| Q-05 | GEO-1243 | The Competitors card reads exactly 100. Is the count capped? | ASKED 2026-10-22 (866762); PO asked for context on 2026-10-26 (867725); re-asked with context and screenshots 2026-10-26 (867843) |
| Q-06 | GEO-1244 | With a single engine the winner shows the item name ("Ribble Hybrid AL e") instead of the brand family. Expected? | removed from 866762 by the user (2026-10-22) — partly covered by PO 859152 / 1.4 AC4 (brand family); single-engine case open — **BUG CREATED 2026-10-22: GEO-1530 (Low)** |
| Q-07 | GEO-1244 | How is a tie for the 5th place of the top 5 broken? (no tie on staging to test it) | ASKED 2026-10-22 (866762); PO asked for context on 2026-10-26 (867725); re-asked with context and screenshots 2026-10-26 (867843) |
| Q-08 | GEO-1244 | The "Other" tab only appears when its count is above 0, while "Competitive 0" and "Category Topics 0" are always shown. Expected? | ANSWERED (epic 1.8 AC3, found 2026-10-22): Other tab hidden at 0 by design; removed from 866762 |
| Q-09 | GEO-1244 | A Category Topics prompt with no theme leaves the Winner / Themes cell empty. Placeholder needed? | removed from 866762 by the user (2026-10-22) — dev 862858 defines a dash for an Other prompt with no theme: bug candidate — **BUG CREATED 2026-10-22: GEO-1531 (Low)** |
| Q-10 | TC-GEO-1244-005 | On a window with fewer than 7 collections, the Time Evolution widget is hidden (as on brand analyses), while the TC expects a "not enough data" state. Which one is right? | ANSWERED 2026-10-22 — QA decision (user): with fewer than 7 collections nothing is shown, the widget is hidden; TC-GEO-1244-005 aligned |
| Q-11 | GEO-1244 AC-5 | Is the prompts table meant to stay on the latest collection when the date changes (see F-08)? | ANSWERED 2026-10-22 — by design (QA decision, user): not a bug |
| Q-12 | TC-GEO-1244-007 | With only 2 engines, a 1-vs-1 disagreement shows "Split" and "No ranking returned" never appears. Should the TC accept the 2-engine case? | ANSWERED 2026-10-22 — QA decision (user): 2-engine case accepted; TC-GEO-1244-007 aligned |

## 4. Decisions taken (closed)

| ID | Item | Decision | Source / TC action |
|---|---|---|---|
| D-01 | "Other (0)" in the Type / Category filters (TC-GEO-1241-016; same as GEO-1002 Q-06) | Kept by design: it shows that no prompt is in Other | QA decision (user) 2026-10-22 — TC-GEO-1241-016 aligned |
| D-02 | A country already in the analysis is still offered in the country picker | Not a bug: the already-added languages are offered but not added again; the country disappears once all its languages are added (checked manually by the user) | QA decision (user) 2026-10-22 — no TC change |
| D-03 | Proposed strings (16 TCs) and the Other banner copy (TC-GEO-1247-009) | Validated by the PO, except 6 points rewritten | GEO-1209 comment 865635, Quentin Reant, 2026-10-21 — 19 TCs updated 2026-10-22 |
| D-04 | Wizard step "Review" | Renamed "Summary" (GEO-1507); the "Review & Launch" button is unchanged pending the PO's answers to the dev (GEO-1507 comment 866136) | CSVs GEO-1209, GEO-1002, GEO-1069 updated 2026-10-22 |

## 5. Still open from the questions file (PO-PM-QUESTIONS-GEO-R1.3.md)

Competitors in unbranded (GEO-1002 1.4 background call); GEO-1247 AC-6 doc fix; A1, A3, A6, A9, A10 (partial), A13, A14, A16, A17, A18, A20, A21; texts not quoted in the ACs (empty state, AI Citation Sources subtitle) to add to the strings sheet; docs (GEO-1186 behind GEO-1248 AC-9, EPIC-034 / EPIC-044 cited).

## 6. Missing test data (SKIP / PARTIAL)

Unbranded analysis with GB (EN) + FR (FR) and 2+ categories; 7+ collections; 3 engines; an engine returning an empty ranking; a prompt whose winner changes between collections; a prompt Other on one dimension only; a brand analysis with an Other prompt; a niche scope with 0–3 brands and Competitive prompts kept (GEO-1249); dev logs (TC-GEO-1242-002 / 006 / 008 / 009, TC-GEO-1243-004); QA mailbox (TC-GEO-1245-005); flag OFF environment (TC-GEO-1241-002).

---

## 7. PO comments on GEO-1209

Posted 2026-10-22: comment 866762 (reply to 865635, PO tagged), edited by the user the same day: Q-01, Q-04, Q-05, Q-07 only. A1 / A3 / A6 accepted as current behaviour (QA decision); A16 / A18 already answered (PO 859152, 06/10).

Older draft below (section 5 items), not posted yet:

Reply in the thread of the PO's last comment on GEO-1209 (865635), with his mention. To be completed with the Q-items above that are kept, then shown to the user for approval before posting.

```
[~accountid:712020:7343a240-d2eb-4be4-a0c8-1c73c97b140c] Thanks for the answers (option A, 12 topics, InBrief quotes) and for the copy review (865635) — the TCs are updated. Still open:
- Competitors in unbranded: GEO-1002 1.4 now resolves competitors with a background call when there is no usable Visibility answer, while GEO-1209 relies on "competitor search disabled in V1" for unbranded. Is unbranded still excluded from that call?
- GEO-1247 AC6 still says the Other warning "improves measurement accuracy", while the validated banner reads "…returns key concepts only, no metrics". Could you update the AC? (TC aligned on the banner)
- A1 What does the mode pill show before a card is selected? A3 After clearing, is a default market prefilled again? A6 Does the InBrief / Top Topics warning block Create Analysis, and is a Visibility or Competitive prompt in Other enough to hide it?
- A9 Does QUESTION_ADAPTATION rephrase English Category Topics prompts? A10 Does an unsent Competitive prompt (fewer than 2 competitors) still cost a pool slot?
- A13 "Brand / Topic" header: only when the list holds an unbranded analysis, or always? A14 Is the InBrief input capped at the 25 most frequent topics?
- A16 With a date range, is the winner the one of the latest collection? A17 Which slides and sheets are dropped in the unbranded export (no frame yet, GEO-1185), and is PDF in scope?
- A18 What is the "keyword graph" of GEO-1247 AC9? A20 Where is the sent wording (placeholders removed) visible? A21 Which export formats include the Other section?
- Texts not quoted in the ACs (empty state, AI Citation Sources subtitle): could the validated texts be added to the strings sheet, as Abdenasser suggested (865496)?
- Docs: GEO-1186 is still behind GEO-1248 AC9; the epic text cites EPIC-034 / EPIC-044.
```

---

## 8. Retest of the "Ready for QA" bugs (2026-10-22/23, /run-and-report, staging, bundle index-DErnavp2.js)

User rule: only FIXED bugs are posted (comment + Passed QA); the others wait for a decision.

| Bug | Finding | Verdict | Jira |
|---|---|---|---|
| GEO-1249 | F-03 | NOT VERIFIABLE — 279 Competitive prompts of the 11 QA-GEO analyses all name 3 competitors | nothing posted (draft for the PO ready) |
| GEO-1521 | F-04 | FIXED (PPTX + PDF landscape slide per category) | 867033, Passed QA |
| GEO-1522 | F-05 | PARTIALLY FIXED — bike ES OK; Electric bikes ES "Bicicletas Eléctricas De Commuter" / "decommuting" (translate-category unstable: 5/9 "decommuting", 2/9 "de Commuter", 2/9 correct) | comment 867085 (reply to 866824, Abdenasser tagged), status Action Needed (user decision 2026-10-23) |
| GEO-1523 | F-06 | FIXED (no Favorability in unbranded Raw Data, kept on brand) | 867025, Passed QA |
| GEO-1525 | F-09 | FIXED (Road Bikes InBrief 200, 3 loads) | 867021, Passed QA |
| GEO-1526 | F-10 | FIXED (en-GB "22 Oct 2026" in PPTX/XLSX/PDF) | 866876, Passed QA |
| GEO-1527 | F-11 | FIXED (aria-label "Category Topics" on unbranded) | 866875, Passed QA |

Side findings from the retests (not posted, to triage): PPTX "1 topics" plural in every language; en-US export Time Evolution subtitle day-first ("16/10/2026"); XLSX landscape tables sorted by Share of Voice while app/PPTX sort by Visibility (also Overview); export landscape subtitle "… in {category}" vs app "… across all topics"; letter instead of logo for some brands in exports (MiRider has a logo in the app); empty XLSX cell when AI Choice is "—"; Toyota Raw Data: 2 rows without Favorability (Grok empty answer row 8, "Not analysed" row 659), 306 rows without Category; bike Raw Data 1 row without sources; GEO-1522 side: title case category "Bicicletas De Montaña", "alguna/una Bicicletas".

### 8b. Second batch (2026-10-23, bundle index-CjFHQrBs.js)

| Bug | Finding | Verdict | Jira |
|---|---|---|---|
| GEO-1524 | F-07 | PARTIALLY FIXED — API now AT_RISK for the 5 brands (rule aligned on the UI, GEO-354), cards/dots/tooltip OK, dots inside the plot; MiRider dot still covers the "AT RISK" caption ("AT ● SK"); XLSX Quadrant column (branded analysis) not checked | comment 867359 (reply to 867177, Abdenasser tagged), status Action Needed (user decision 2026-10-23) |
| GEO-1528 | — | FIXED (legend = 100% on 8 cases; "Others" absorbs the rounding gap, up to ~1.6 pt off the API; dev asks the PO to confirm in the ticket) | 867338, Passed QA |
| GEO-1529 | Q-03 | FIXED (Category Topics counts all sentiments: Electric bikes 21 Oct 0 → 2, bike 6 → 9 = API) | 867344, Passed QA |
| GEO-1530 | Q-06 | FIXED (single engine winner = brand: Ribble, Tern) | 867345, Passed QA |
| GEO-1531 | Q-09 | FIXED (no-topic prompt shows engine themes; "—" checked on mocked empty data only) | 867347, Passed QA |

Side findings (not posted, to triage): prompts table and detail panel ignore the date picker (always latest collection, no from/to in the request); Toyota > VUS Gemini winner "SUV" (generic word); same brand with several sites / spellings (Ribble ribble.com vs ribblecycles.co.uk, Santa Cruz 4 sites, "Seat"/"SEAT", Peugeot → autojournal.fr); Cube exactly at 50% visibility counted At Risk (≥ 50% rule not written).

### 8c. Jira pass (2026-10-23 15:00)

- GEO-1522 (F-05): dev 867352 "Category translation is now stable" (temperature 0, 10/10 "Bicicletas eléctricas de cercanías") + 867353 asks the PO to confirm → **Ready for QA again, to retest**.
- GEO-1524 (F-07): dev 867364 caption outline so "AT RISK" reads over a dot → **Ready for QA again, to retest**.
- GEO-1249 (F-03): still not verifiable (no Competitive prompt with fewer than 3 competitors).
- Open bugs by story: GEO-1242 → GEO-1249; GEO-1244 → GEO-1524; GEO-1246 → GEO-1522; GEO-1243 and GEO-1245 → none.
- PO questions of 866762: Q-04 answered on 2026-10-26 (867725, generic InBrief error kept); Q-01, Q-05, Q-07 re-asked with context and screenshots on 2026-10-26 (867843, reply in thread 865635; Q-07 offers to check the tie-break with Abdenasser if the PO has no rule).
- Retest 2026-10-23 (read-only): **GEO-1522 FIXED** (9/9 "Bicicletas eléctricas de cercanías", 30 ES prompts, no English word; bike Mexico 60 prompts OK) → reply 867401 (thread 867352), Passed QA. **GEO-1524 FIXED** (AT RISK caption readable over MiRider, API / cards / tooltip agree, Toyota XLSX Quadrant = Visibility × AI Choice at 50%) → reply 867402 (thread 867177), Passed QA.
- Side findings (not posted): Competitive ES prompts lowercase "bicicletas eléctricas de cercanías" in 3/9 attempts (others Title Case); Toyota Category Prioritization: the AT_RISK point (VUS fr-FR 95% / 47.5%) seems grouped in a cluster drawn above 50% in STARS (At Risk card 1, no dot in the quadrant, cluster not opened — not confirmed); matrix dot aria-label still says "win rate" instead of "AI Choice".
- Open bugs left on GEO-1209: GEO-1249 (not verifiable). Stories GEO-1244 and GEO-1246 have no open bug any more.
- Disposable-analysis rerun 2026-10-23 (run 23102026-1950, D 714f2985 "Postal services" GB + FR, 5 prompts, created and deleted, pool 1000 → 1050 → 1000, 998 / 1000 at the end — 998 already before the run): TC-GEO-1243-007 PASS, TC-GEO-1243-015 PARTIAL, TC-GEO-1246-001 PASS, TC-GEO-1246-002 PARTIAL (only one category on D). Consolidated `runs/GEO-R1.3_GEO-1209_23102026-1951/` GO 87.5%.
- To triage: Competitors card 96 → 105 after D's first collection (+9) while D detects about 20 brands absent from the other analyses (to add to PO question Q-05 "is the count capped?"); FR Visibility suggestions keep the Title Case category ("Services De Messagerie", same as GEO-1002 Q-01).
- Statuses posted 2026-10-23: GEO-1245 (comment 867408) and GEO-1246 (comment 867409) → Passed QA. Still Ready for QA: GEO-1242 (GEO-1249, Q-01), GEO-1243 (Q-04, Q-05), GEO-1244 (Q-07).
- Statuses posted 2026-10-27: GEO-1249 FIXED (reply 868788 in thread 868643) → Passed QA; GEO-1242 (comment 868793, TC-001 aligned on Q-01) → Passed QA. Still Ready for QA: GEO-1243 (Q-05), GEO-1244 (Q-07) if not moved since.
