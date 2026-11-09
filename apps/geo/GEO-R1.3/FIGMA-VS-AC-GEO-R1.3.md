# GEO-R1.3 — Figma vs Acceptance Criteria (GEO-1209, GEO-1002, GEO-1513)

**Date:** 2026-10-26
**Figma file:** "Measure - GEO Module" (`xctSRqtM653zRS7QY3KMm0`, last modified 2026-10-26), 3 pages, 160 frames:
- `13458:101707` "GEO-1209 - Unbranded/Other Prompts" (59 frames) → epic GEO-1209 (GEO-1241..1248)
- `16364:78415` "GEO-1012 - Wizard/Prompt Pool" (68 frames) → epic GEO-1002 (GEO-1229..1240, 1251, 1515)
- `17348:160625` "GEO-1208 - Sort by number of prompts" (33 frames) → epic GEO-1513 (GEO-1184)

**Sources compared:** `.tmp-jira/figma/r13-frames-text.json` (frame names, ids and visible text); ACs, Rules and PO / dev decisions in `apps/geo/GEO-R1.3/{EPIC}/STORY_*.md` and `EPIC.md`; context only: `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-epic{EPIC}-review.md`, `apps/geo/GEO-R1.3/{EPIC}-RUN-FINDINGS.md`, `apps/geo/GEO-R1.3/PO-PM-QUESTIONS-GEO-R1.3.md`.

**Method:** text only, no screenshots, no Figma / Jira call. Layout, colours and positions cannot be checked from text. A text present in a frame but not readable as a state (e.g. a placeholder vs. a column label) is marked "intent unclear". Frames are en-US ("analyzing", "analyze"), the runs and TCs en-GB ("analysing"): this spelling difference is not reported. Points already decided in the findings / questions files are cited, not raised again.

**Not compared (no frame in the input):** GEO-1242 (backend), GEO-1243 / 1244 / 1245 / 1248 (dashboard frames U.1–U.4 and "Other Details" are on the page "Analysis - Unbranded", not exported), GEO-1251 and GEO-1515 (backend), GEO-1534 (backend).

Classes: **FIGMA_ONLY** (shown in Figma, no AC) · **AC_ONLY** (AC with no frame, only when relevant) · **CONFLICT** (Figma and AC / later decision disagree) · **WORDING** (UI string differs) · **OK_SUPERSEDED** (Figma outdated, a later decision already applies).

---

## Summary

| Epic | Frames | CONFLICT | WORDING | FIGMA_ONLY | AC_ONLY | OK_SUPERSEDED | Total |
|---|---|---|---|---|---|---|---|
| GEO-1513 (GEO-1184) | 33 | 2 | 2 | 5 | 0 | 0 | 9 |
| GEO-1209 | 59 | 2 | 1 | 4 | 3 | 6 | 16 |
| GEO-1002 | 68 | 2 | 2 | 3 | 5 | 12 | 24 |
| **Total** | 160 | **6** | **5** | **12** | **8** | **18** | **49** |

Items that appear on both wizard pages (the "Primary" tag, the step "Review", the higher-plans block, market wording, pool messages, confirmation) are counted once, under GEO-1002, with the frame ids of both pages.

**Main takeaway:** the GEO-1208 page (updated after a "PM review of 2026-10-21") is newer than the design comment recorded in the GEO-1184 story file (2026-10-20). Staging follows the Figma page, so run finding F-1 ("Coverage" / "Prompts") is most likely the delivered design, not a bug. Figma also answers Q-1 to Q-4 the way staging behaves.

---

## GEO-1513 — GEO-1184 Target Sources sort by number of prompts

Design rationale frame: `📋 Design Rationale · GEO-1208 ↔ GEO-1184` [17354:43071] (D1–D6). Notes 1.1–2.3 [17363:10159..10165]. The frames under "Reference · Action Center baseline" [17348:160838..162237] are GEO-152 baseline, "not changed by GEO-1208" (note [17363:10166]), and are not compared.

| ID | Class | Frame (id) | AC / rule | Figma shows | AC / story / TC / staging says | Recommendation |
|---|---|---|---|---|---|---|
| S-01 | CONFLICT | 1.1 [17348:160756], 1.2 [17360:8824], 1.3 [17360:9295], Rationale D2 | AC "sort option "Most prompts"… current sort (failing articles) stays the default" | Control values "Coverage" (default) and "Prompts"; "Sort values after the PM review of 2026-10-21: Coverage (default) and Prompts" | AC: "Most prompts" / failing articles; story design decision (designer comment 2026-10-20): "Failing articles" / "Most prompts"; TC-GEO-1184-001/003/007/008 expect "Failing articles" / "Most prompts"; staging = "Coverage" / "Prompts" (F-1, 4 FAIL). Newer: Figma (2026-10-21) > comment (2026-10-20); PO "design done ready for dev" 2026-10-22 came after | Do not create the F-1 bug; one-line PO confirmation (the 2026-10-21 PM review is only cited in Figma, not found in Jira), then **TC to review** TC-GEO-1184-001 / 003 / 007 / 008 (label only) and re-run; AC text stays a doc fix for the PO |
| S-02 | WORDING | 1.2 [17360:8824], D2 / D6 | Story design decision 2 (menu descriptions) | "Articles where your brand is not visible or perceived negatively" / "Prompts whose answers cite this source" | Story (2026-10-20): "Articles missing or negative about your brand"; staging = Figma (F-1 evidence); no TC asserts it (review OP-6) | Nothing to do (Figma = staging); optional: add the Figma description to TC-GEO-1184-001 step 2 |
| S-03 | WORDING | 1.1–1.4, 2.1–2.3, D2 / D6 | Story design decision 3 (subtitle shortened, "revert possible") | Subtitle "Sources to target to improve how AI engines represent your brand." (key `views.targetSources.subtitle`, EN/FR/ES change). Baseline frames still read "…sorted by the number of articles where your brand is missing or negatively represented" | No AC; no TC (OP-6); not recorded in the run | **TC to review** TC-GEO-1184-001 step 1 (or 003 step 1): assert the shortened subtitle |
| S-04 | CONFLICT | 2.2 [17348:160907], note 2.2, D5 | Story design decision 6: "header-click sorting not part of this ticket" | "Clicking a sortable header should set the same sort as the control (recommended, to confirm with dev)"; Prompts column (forum badge) after Articles with the descending indicator | TC-GEO-1184-007 step 6 expects the order unchanged on header click; staging: a click under "Coverage" switches to "Prompts" (F-2), i.e. the Figma behaviour | **TC to review** TC-GEO-1184-007 step 6 (align on D5 once the dev confirms); narrow F-2 to the remaining part "under Prompts the list drops back to 10 rows" (**possible bug**, Low; Figma does not describe paging on header click) |
| S-05 | FIGMA_ONLY | D3, 1.4 [17360:9940] | AC "all LLMs and locales together"; open question Q-2 | "The count follows the period, scope, LLM and market filters like the rest of the card." | Staging follows the filters (Q-2 observed: France only, Perplexity only); TC-GEO-1184-004 step 5 only asserts "lower than or equal" | Q-2 can be closed citing D3; **TC to review** TC-GEO-1184-004 step 5 (optional: card count = panel "All (N)" under the filter) |
| S-06 | FIGMA_ONLY | 2.1 [17361:14015], note 2.1, D5 | none | "Previous and Next source follow the active order, so Next from wikipedia.org opens reddit.com"; "Source 1 of 11 · Next source" | No AC, no TC ("Next source" not in any TC) | **TC to review**: add a step to TC-GEO-1184-002 or 008 (with "Prompts" active, Next source opens the card ranked #2) |
| S-07 | FIGMA_ONLY | 2.3 OS native [17354:19173], note 2.3, D1 | Story "Design" section: "in both host shells, standalone and OS native mode" | "OS native: Onclusive Social topbar only… placement and behaviour are identical to 1.3" | No TC runs in OS native mode ("OS native" not in the TC review) | **TC to review**: add an OS native variant of TC-GEO-1184-001 if an OS native environment is available |
| S-08 | FIGMA_ONLY | D2 / D6 | none | Tooltip and accessible name of the control: "Sort by" (FR "Trier par", ES "Ordenar por") | TCs use "Sort by" as the control name only | Nothing to do (optional accessibility check) |
| S-09 | FIGMA_ONLY | D6 | Open question Q-5 (wording lock, FR/ES) | EN / FR / ES strings: "Coverage / Retombées / Cobertura", "Prompts", the two descriptions, "Used in {n} prompts", "Used in 1 prompt", "Prompts" column, strings sheet link | TCs en-GB only; DoD "Localisation (en-US, en-GB, fr-FR, es-ES) checked" | Optional FR / ES check (switch language and restore en-GB); Q-5 partly answered by the Figma list |

### GEO-1513 open questions Q-1 to Q-5 vs Figma

| Q | Question (GEO-1208, 2026-10-20) | Figma (rationale D1–D6) | Staging (run 23/10) | Status proposed |
|---|---|---|---|---|
| Q-1 | Citations line still on the card? | D3: the prompt line sits "under the coverage lines"; no frame shows "cited N× in gap answers" | No citations line | Consistent — close |
| Q-2 | Count follows engine / market filters? | D3: "follows the period, scope, LLM and market filters" | Yes | Consistent — close (S-05) |
| Q-3 | Panel "All" vs engine tabs | D5: "All is the distinct union, so it can be smaller than the sum"; 2.1 "All (24) · Gemini (14) · ChatGPT (10)" | Distinct count (largus.fr 156 vs 303) | Consistent — close |
| Q-4 | Export follows the sort? | D4 "The export is unchanged"; D6 out of scope: "the export" | No (TC-GEO-1184-009 PASS) | Consistent — TC-GEO-1184-009 can drop "assumed" |
| Q-5 | Wording lock (FR / ES) | D6 lists EN / FR / ES values, with "Coverage" / "Prompts" (not the 2026-10-20 wording) | EN = Figma | Partly answered — PO lock not found in Jira (S-01, S-09) |

Consistent, no item: tie rule (D4 "coverage first … then domain A to Z" = AC "failing articles, then domain"), card line "Used in N prompts" / "Used in 1 prompt" (D3 = TC-GEO-1184-006), ranks restart at 1 per tab and reset on the next visit (D4 = TC-GEO-1184-004 / 008), control placement left of Card view / List view (D1 = TC-GEO-1184-001 step 1).

---

## GEO-1209 — Unbranded analysis and Other prompts (wizard page)

Design rationale frame [16767:11] says "PM decisions of 2026-10-09 … are applied". Designer updates requested in GEO-1241 #860365, GEO-1243 #860368 and GEO-1247 #860373 are visible on this page: no "You can add a brand later" on 1.1–1.3, stepper "Topic & Country" on 2.4 / 7.2, "Other" instead of "uncategorised" / "Pick category" / "Unclassified" in 4.3 and 5.x, no plans block on 5.3 / 7.5, "Brand / Topic" on 0.1. The copy changed by the PO on 2026-10-21 (GEO-1209 comment 865635) is **not** in the frames yet.

| ID | Class | Story | Frame (id) | AC / rule | Figma shows | AC / TC / decision says | Recommendation |
|---|---|---|---|---|---|---|---|
| U-01 | OK_SUPERSEDED | GEO-1241 | 1.1 [13480:5744], 1.2 [13480:1924], 1.3 [13480:5977], 7.1 [13532:11221] | AC1 | "Track how AI engines present your brand against its field." / "Measure an industry or topic instead of a brand. Football, car insurance, frozen food."; check line "No brand scorecard"; title "What do you want to measure?" | PO 865635 points 4–5: "Measure how AI engines see, rank and compare your brand against its competitors." / "Measure an industry or a topic: which brands AI engines name, and what they say about it.", no "No brand scorecard", subtitle "Choose what you want to measure" (TC-GEO-1241-001) | Nothing to do (TC follows the PO) |
| U-02 | FIGMA_ONLY | GEO-1241 | 1.1–1.3, 7.1 | AC1 "each say what they measure" | Badges "Default" / "Advanced"; check lines "Visibility, position and share of voice", "Head to head against competitors", "What is said about your brand" / "Who appears in this topic and where", "What the topic is judged on" | No AC text, not asserted by TC-GEO-1241-001 | Nothing to do (record at run) |
| U-03 | OK_SUPERSEDED | GEO-1241 | 2.4 [13485:3506], 7.2 [13532:11287] | AC4 helper | "The topic frames the analysis. It is never measured. What gets measured is whichever brands the AI answers name." | PO 865635 point 5: "The topic frames the analysis and is never measured. We measure the brands AI engines name." (TC-GEO-1241-006) | Nothing to do |
| U-04 | FIGMA_ONLY | GEO-1241 | 2.4 [13485:3506], 7.2 | AC3 / AC4 | Step subtitle "Choose the industry or topic and the countries you want to analyze." | No AC, no TC | Nothing to do (optional record) |
| U-05 | OK_SUPERSEDED | GEO-1241 | 0.3 [16737:11] | AC6 | "Switching the mode clears your brand or topic, your markets, your categories and your prompts." | PO 865635 point 2: "…your countries…" (TC-GEO-1241-008 / 010) | Nothing to do |
| U-06 | FIGMA_ONLY | GEO-1241 | 0.3 [16737:11] | AC6 / rule "cancelling keeps everything" | Title "Switch the analysis type?", lines "Nothing is saved: this cannot be undone." / "Cancel to keep your current setup.", buttons "Cancel" / "Switch type" | AC only asks to state what is cleared; TC-GEO-1241-008 / 009 assert the first sentence only | Nothing to do (optional: name the buttons in TC-GEO-1241-009) |
| U-07 | AC_ONLY | GEO-1241 | (none; 2.3 [13485:3059] is the brand error "Add your brand to continue.") | AC5 empty topic | No topic error frame | PO text "Add your industry or topic to continue." (865635, TC-GEO-1241-007) | Nothing to do |
| U-08 | AC_ONLY | GEO-1241 | 2.5 [13485:3723] is the brand version only | AC7 topic discovery text | "Scanning how AI engines see Acme Foods across your markets." / "…your brand, your markets and their languages." | PM D13: no new frame; PO texts "…across your countries." / "…your topic, your countries and their languages." (TC-GEO-1241-011) | Nothing to do |
| U-09 | OK_SUPERSEDED | GEO-1242 | 3.4 [13490:4294], 7.3 [13532:11337], 7.6 [13535:12353] | AC3 "split into 2" | 3 topic categories ("Comprehensive car insurance", "Young driver insurance", "Multi-car insurance"), "…across 2 markets and 3 categories" | Story DAC4: "sample shows 3 categories; discovery returns 2" | Nothing to do (AC wins) |
| U-10 | OK_SUPERSEDED | GEO-1247 | 4.3 [13491:5303] | AC6 "classifying them improves measurement accuracy" | "2 prompts are in Other." / "Pick a category and a type. Anything left as Other still runs, but it returns key concepts only, no metrics." | Same text validated by the PO (865635) and asserted by TC-GEO-1247-009; AC6 doc fix already requested (PO-PM-QUESTIONS §4) | Nothing to do |
| U-11 | WORDING | GEO-1247 / GEO-1235 | Master [13460:20], 4.1 [13491:4371], 4.8, 4.10, 4.11, 4.14–4.17, 4.21, 4.22, 7.4 [13533:11984] | GEO-1235 rule (footnote first sentence only); GEO-1247 DAC4 ("uncategorised" becomes "Other") | "Unticked prompts cost nothing and stay on the analysis. Pick a category for in Other ones so they count toward metrics." (broken sentence, a find / replace of "uncategorised") | No AC quote; no TC asserts the second sentence | Check the shipped footnote at the next GEO-1247 run; if it reads the same, **PO / designer question** (copy fix, Low) |
| U-12 | CONFLICT | GEO-1247 / GEO-1248 | 5.1 [13494:7504], 5.2 [13498:7740], 5.3 [13498:8175], 7.5 [13532:11395]; banner 4.3 | GEO-1247 AC7 "returns key concepts only until classified"; GEO-1248 AC4 / AC7 | Review card: "A prompt can be in Other on its category, its type, or both. It returns key concepts only until both are set. Assign what is missing here; launch is never blocked." | GEO-1248 AC4 / AC7: a Visibility or Competitive prompt in the Other category "is ranked like any other prompt" (winner or "Split") and "produce[s] no concepts". The copy (validated 865635, TC-GEO-1247-010) is wrong for that case | **PO / designer question** (Low, copy accuracy): should the note say "metrics" rather than "key concepts only" for a prompt that is Other on its category only? No TC change |
| U-13 | CONFLICT | GEO-1241 | 5.3 [13498:8175], 7.5 [13532:11395] | AC12 (warning only with no kept Category Topics and no kept Other prompt) | Warning "InBrief and Top Topics will not be produced." / "No Category Topics or Other prompts are kept. Keep at least one so the analysis can build InBrief and Top Topics." shown while the same frame lists a kept Other prompt | TC-GEO-1241-016 / 017 follow AC12 (warning hidden as soon as an Other prompt is kept); PO validated the text (865635) | Nothing for the TC logic (frame sample data, designer note); optional **TC to review** TC-GEO-1241-016 step 5: assert the exact warning text |
| U-14 | FIGMA_ONLY | GEO-1243 | 0.1 [13474:431] (vs GEO-1012 page 0.1 [16279:335]) | AC12 "Brand / Topic"; open point A13 | With an unbranded analysis in the list: column "Brand / Topic" and subtitle "Monitor your presence across AI search engines"; without (GEO-1012 page): "Brand" and "Monitor your brand's presence across AI search engines" | A13 assumption "only when the list holds an unbranded analysis" (TC-GEO-1243-014); neutral subtitle not quoted in any AC / TC | A13 consistent with the design (can be closed); **TC to review** TC-GEO-1243-014: assert the neutral subtitle if shipped |
| U-15 | OK_SUPERSEDED | GEO-1247 / GEO-1234 | 4.2 [13491:4551], 4b.1 [13517:9293], 4.13 [13762:14930] | GEO-1247 AC3 (empty dimension falls back to Other) | Inline add row shows "Category" / "Type" (intent unclear: placeholders or labels) | TC-GEO-1234-003 / 004 expect the placeholder "Other" (Q-06, sync 2026-10-22) | Nothing to do |
| U-16 | AC_ONLY | GEO-1246 | (none) | AC1 fresh suggestions 10 / 10 / 10; AC2 type select | No frame (story: reuse MS.x with 7.4 labels) | TC-GEO-1246-001..004 | Nothing to do |

Shared with GEO-1002 (counted there): "Primary" tag (W-01), step "Review" (W-03), higher-plans block on 7.6 (W-02), market wording (W-04), at-limit message 4.4 [13492:5457] (W-09), confirmation 7.6 without the next-run sentence (W-11). Parked frames 4.6 [13492:6656] / 4.7 [13492:6889] (request a 50 prompt pack) are out of scope (W-23).

---

## GEO-1002 — Wizard and prompt pool

Design rationale frame [16308:11] (US 1.1–1.12). Several story files already state "the frame shows X; the AC applies" — those are listed as OK_SUPERSEDED.

| ID | Class | Story | Frame (id) | AC / rule | Figma shows | AC / TC / decision says | Recommendation |
|---|---|---|---|---|---|---|---|
| W-01 | OK_SUPERSEDED | GEO-1231 / GEO-1237 | 2.2c [16279:24577], 2.2d [16279:24636], 5.1–5.4 (1209: 13560:12948, 13561:13043, 5.1–5.3, 7.5, 7.6); rationale US 1.2 "language prefilled with the primary" | GEO-1231 AC2 "primary language" | "Primary" tag on languages and Review markets | GEO-1231 / 1237 Rules "No Primary tag"; PO 860312 (A6); TC-GEO-1231-004, TC-GEO-1237-001 assert no "Primary" | Nothing to do (AC2 wording doc fix already listed, A6) |
| W-02 | OK_SUPERSEDED | GEO-1237 | 5.1 [16279:41196], 5.2 [16279:41280], 5.3 [16291:11], 5.4 [16279:42932], 1209 5.1, 5.2, 7.6 | AC3 | "Available on higher plans", Claude / Grok, "Upgrade", "Google AI Overviews, Google AI Mode and Copilot also join on the Scale plan." | GEO-1237 Rule: no "higher plans" or "Upgrade" block; TC-GEO-1237-006 step 4 asserts absence | Nothing to do |
| W-03 | OK_SUPERSEDED | GEO-1231..1237 | All shells (stepper "Review", button "Review & Launch"), 3.1–3.5 "One with no prompts is dropped at Review." | — | Step "Review" | GEO-1507 renamed the step "Summary" (D-04, Passed QA 2026-10-22); button kept pending the PO (GEO-1507 comment 866136) | Nothing to do |
| W-04 | OK_SUPERSEDED | GEO-1231 / 1237 / 1239 | 2.1–2.3 [16279:24271/24322/24378], 5.2, MS.1–MS.11 [16302:348083…] (and 1209 2.1–2.4) | — | Helper "A market is one country and one language. Language is auto-detected and stays editable."; "1 market will be dropped: France."; Manage Scope "Add Market" | GEO-1514 (country instead of market, To Do); TC-GEO-1239-009 / 010 use "Add Country" (staging) | Nothing now; recheck the helper and the "dropped" banner when GEO-1514 ships |
| W-05 | OK_SUPERSEDED | GEO-1237 | 5.2 [16279:41280] (1209 [13498:7740]) | AC1 | Markets "UK - EN", "DE - DE", "FR - FR" (5.1 reads "United Kingdom · English") | PO 865137: ISO codes "GB (EN)" in the table, "United Kingdom · English" on the Review card; "Figma frames to be updated by design" | Nothing to do |
| W-06 | OK_SUPERSEDED | GEO-1232 | 3.3 [16279:24829] | AC3 (count of prompts deleted) | "Are you sure you want to remove Athletic Shoes ? This action cannot be undone." (no count) | Story Design: "Frame 3.3 does not show the prompt count; AC3 applies"; GEO-1501 fixed ("30 prompts across your markets will be deleted with it.") | Nothing to do (space before "?" see W-22) |
| W-07 | OK_SUPERSEDED | GEO-1235 | 4.14 [16279:30679], 4.15, 4.16 | AC3 (live counts) | Menus "Sort ascending / Sort descending / Clear filter" with no counts | Story Design: "The frames show no counts in the menus; AC3 applies"; TC-GEO-1235-003 / 004 | Nothing to do |
| W-08 | OK_SUPERSEDED | GEO-1235 / GEO-1247 | Master [16279:13], 4.1, 4.8, 4.15, 4.16, 4.21, 4.22, MS.4 [16302:352475] | — | "Pick category" selects; footnote "…Pick a category for uncategorised ones so they count toward metrics." | PM D3 / D12: "Other" everywhere; GEO-1235 Design: "Pick category" selects belong to EPIC-035 (the GEO-1209 page is updated, see U-11) | Nothing to do |
| W-09 | CONFLICT | GEO-1236 | 4.4 [16279:28500] (1209 [13492:5457]); 4.5 [16279:28756] | AC3 (Updated 2026-10-09), Rule "Add prompt and ticking stay possible at the limit and over" | Amber message "Pool full. Adding another prompt needs room."; 4.5 greys Add prompt | PO GEO-1236 comment 860379 (A10); story Design: 4.5 superseded; TC-GEO-1236-002 asserts "its at-limit message" without text | **TC to review** TC-GEO-1236-002 step 3: record the shipped amber text; if it says adding needs room while adding stays possible in the wizard → **PO / designer question** (copy) |
| W-10 | OK_SUPERSEDED | GEO-1237 | 5.2 [16279:41280] (1209 [13498:7740]) | AC2 (names the metrics) | "No Brand Image prompts are kept either, so those cards stay empty with a prompt to add questions." | GEO-1271 fix (Passed QA 2026-10-20), TC-GEO-1237-004: "No Brand Image prompts are kept, so the Corporate Reputation cards and Brand Territory stay empty, with a prompt to add questions." | Nothing to do |
| W-11 | AC_ONLY | GEO-1237 | 5.4 [16279:42932], 1209 7.6 [13535:12353] | AC6 "that prompt changes apply at the next run" | "Analysis created", "{name} is scheduled.", "36 prompts across 2 markets and 3 categories run on ChatGPT, Gemini and Perplexity.", "7 suggested prompts you did not keep stay on the analysis. Activate them any time.", "View analysis", "Go to Dashboard" — no next-run sentence (the rationale claims "the next-run rule") | TC-GEO-1237-010 expects "the next-run sentence" | Nothing to do (AC wins); if staging has no such sentence, TC-GEO-1237-010 fails on AC6 |
| W-12 | CONFLICT | GEO-1239 | "Manage Scope - Delete Prompt Modal" [16302:350882] | AC4; Rules "per-group Reset button removed", "Deleting asks for confirmation (no Undo here)" | "Delete Prompt" / "Deleting this prompt cannot be individually undone. To restore it, you would need to reset all prompts to default, which may impact other customizations. Changes will be reflected on the next analysis re-run." | No reset action exists any more (GEO-1233 / 1239 Rules); F-12 dropped (staging asks for confirmation, "Delete Prompt" dialog); TC-GEO-1239-004 does not check the body | **TC to review** TC-GEO-1239-004 step 2: read the dialog body; if it still mentions resetting prompts to default → **possible bug** (copy, Low) |
| W-13 | FIGMA_ONLY | GEO-1239 | MS.5 [16302:348911], MS.6, MS.7, MS.8, MS.9, MS.12 [17413:25314] | AC6 | Entries "Edited a Competitive prompt · Alex Turner · Frozen Foods · United Kingdom (English) · 2:05 PM" with original and edited wording; header "March 22, 2026 · 8 Changes"; Brand Image under "Overview" | AC6 asks date grouping, count, original and edited wording only; author / category / market / time are design-only; GEO-1535 already open (unticked logged as "Added", day count, Category Topics as "Reputation") | Nothing to do (optional: add author and market to TC-GEO-1239-006) |
| W-14 | FIGMA_ONLY | GEO-1231 | 2.1 [16279:24271] | AC1 | Subtitle "Choose your brand and dive into the country you want to check out!" | No AC, no TC | Nothing to do |
| W-15 | WORDING | GEO-1231 / GEO-1239 | MS.1 [16302:348083] and all MS frames | GEO-1231 AC4 | Manage Scope: "This language applies AI insights and summaries in this analysis. It won't affect your other analyses." (missing "to"); wizard 2.1: "Applies to AI insights and summaries in this analysis…" | No TC on the Manage Scope helper | Check the shipped Manage Scope text; if copied verbatim → **possible bug** (copy, Low, can join GEO-1533) |
| W-16 | FIGMA_ONLY | GEO-1235 | 4.18 [16279:31538], 4.12 [16279:30562] | AC4, AC5 | "No prompts match these filters" / "Category Ready Meals and type Brand Image have no prompts in common. Widen one of the two, or clear the filters." / "Clear all filters"; empty: "No prompts yet" / "Add your first prompt, or adjust the filters above. Suggested prompts appear at the end of the table when there are any." | TC-GEO-1235-005 / 006 assert the behaviour, not the text; F-08 item 4 ("adjust the filters above") not reproduced | Optional **TC to review** TC-GEO-1235-005 step 3 (exact no-results text) |
| W-17 | AC_ONLY | GEO-1239 | (none) | AC9 (no free slot: Add prompt / Add country / Add category disabled, ticks blocked) | No Manage Scope frame at the limit or over | PO 865136; TC-GEO-1239-011 / 012 / 013 | Nothing to do |
| W-18 | AC_ONLY | GEO-1239 | (none) | AC5 (last prompt of a group, warning naming the metrics) | No frame | Bug GEO-1536 (warning names the group, not the metrics); TC-GEO-1239-005 | Nothing to do |
| W-19 | AC_ONLY | GEO-1229 / 1236 / 1240 | (none) | Rule: grey ring "— / —" with "contact the account manager" when no pool is set | No frame | Not applicable after GEO-1515 ("None is left not configured"); TC-GEO-1239-013 | Nothing to do |
| W-20 | OK_SUPERSEDED | GEO-1240 | 0.1 [16279:335], 0.1b [16292:349], 0.1c [16292:1326], 0.1d [16313:11] | Rules ("Reports" table) | "20 reports", "Show all 10 reports", KPI "REPORTS" | QA decision 2026-10-19: the app says "Analysis" ("5 analyses"), TCs aligned (PO-PM-QUESTIONS §4) | Nothing to do |
| W-21 | OK_SUPERSEDED | GEO-1230 | BO.2 [16299:11] | AC4 (Frequency column and filter stay) | Columns NAME, CUSTOMER NUMBER, USER QUOTA, PROMPTS, STATUS only | Rule: "The Frequency, US and Created columns stay … (AC4 wins)" | Nothing to do |
| W-22 | WORDING | GEO-1232 / GEO-1238 | 3.3 [16279:24829], 3.2 [16279:24753], 0.2 [16279:459] (1209 [13474:657]) | GEO-1533 (F-08, Low) | "Are you sure you want to remove Athletic Shoes ? …" (space before "?"); modal title "Add Category" vs button "Add category"; "Exiting now discards every choice made during this session, including the prompts you kept." | Staging = Figma; QA bug GEO-1533 (items 1–3) asks to change these texts | Nothing new; if the dev answers "as designed", the Figma text supports them: decide with the PO (keep strict or close GEO-1533 items) |
| W-23 | OK_SUPERSEDED | GEO-1236 / GEO-1242 | Parked 4.6 / 4.7 (1209 [13492:6656], [13492:6889]); Parked "Add a brand to unbranded" [16302:352850], [16302:353190] | Rationale "No buying in the product"; GEO-1242 rule "keeps its mode for life" | "Request a 50 prompt pack · $1,200 per year"; "Add a brand" dialog | Explicitly parked / dropped | Nothing to do |
| W-24 | AC_ONLY | GEO-1229 | (none) | AC5 (dashboard country filter, languages roll up) | No frame | TC-GEO-1229-007 (F-09 accessibility still open) | Nothing to do |

Consistent, no item: pool popovers "In use by other analyses / Kept in this analysis / Free in the pool / Need more room? Contact your account manager." (4.4, 4.5, 4.20 = GEO-1236 AC1 and Rules), over-pool text "9 prompts over. Untick prompts or contact your account manager." (= TC-GEO-1236-005), Review over the pool 5.3 (= GEO-1237 AC5, A13), dashboard 0.1b "Pool full at 150 of 150. New Analysis stays available." and 0.1c "12 prompts over the pool. Analyses can be created but not launched until the count fits." (= GEO-1240 AC2 / AC3), back office BO.1 "138 of 150 prompts in use." and BO.1b warning (= GEO-1230 AC2 / AC3), inline add 4.2 "Confirm disabled until classified" (= GEO-1234 AC3, flag OFF; flag ON = U-15), toast "Prompt added. It uses one pool slot." (= GEO-1234 Rule), Show prompts "All / Selected only / Unselected only" (= GEO-1235 AC8), exit dialog "Resume Setup" / "Exit and Discard" (= GEO-1238 Rules), table market labels "GB (EN)" (= PO 865137).

---

## Recommended actions

### TCs to review

| TC | Change | Ref |
|---|---|---|
| TC-GEO-1184-001, 003, 007, 008 | Sort labels "Failing articles" / "Most prompts" → "Coverage" / "Prompts" (label only), after a one-line PO confirmation; re-run | S-01 |
| TC-GEO-1184-007 step 6 | Header click on "Prompts" sets the same sort as the control (Figma D5), once the dev confirms | S-04 |
| TC-GEO-1184-001 step 1 | Assert the shortened subtitle "Sources to target to improve how AI engines represent your brand." | S-03 |
| TC-GEO-1184-002 or 008 | Add: with "Prompts" active, Next source follows the active order | S-06 |
| TC-GEO-1184-001 (variant) | OS native shell, if an environment is available | S-07 |
| TC-GEO-1184-004 step 5, TC-GEO-1184-009 | Optional: assert the count follows the filter (D3); drop "assumed" on the export (D4) | S-05, Q-4 |
| TC-GEO-1236-002 step 3 | Record the shipped at-limit amber text | W-09 |
| TC-GEO-1239-004 step 2 | Read the "Delete Prompt" dialog body | W-12 |
| TC-GEO-1241-016 step 5, TC-GEO-1243-014, TC-GEO-1235-005 | Optional exact texts (InBrief / Top Topics warning, neutral list subtitle, no-results card) | U-13, U-14, W-16 |

### PO / designer questions (one line each, after checking staging)

- **S-01** GEO-1184: confirm "Coverage" / "Prompts" (Figma, "PM review of 2026-10-21") replaces "Failing articles" / "Most prompts" (AC and designer comment of 2026-10-20) — recommended answer: yes, keep staging; AC wording to update.
- **S-04** GEO-1184: header click on the "Prompts" column sets the sort (Figma D5 "to confirm with dev") — confirm with the dev (Abdenasser).
- **U-12** GEO-1247 / 1248: the Other note "returns key concepts only" is wrong for a Visibility or Competitive prompt that is Other on its category only (ranked, no concepts, GEO-1248 AC4 / AC7) — keep or adjust the copy?
- **U-11** GEO-1247: footnote "Pick a category for in Other ones so they count toward metrics." (designer copy fix, if shipped as is).
- **W-09** GEO-1236: amber "Pool full. Adding another prompt needs room." contradicts the wizard rule (adding allowed at and over the limit) — only if staging shows this text.
- Designer, for information (no QA impact): 5.3 / 7.5 show the InBrief / Top Topics warning with an Other prompt kept (U-13); 5.4 / 7.6 lack the next-run sentence of GEO-1237 AC6 (W-11); 5.2 market labels "UK - EN" (W-05); PO 865635 copy not yet in 1.1–1.3, 2.4, 0.3 (U-01, U-03, U-05).

### Possible bugs (staging differs from both Figma and the AC)

- **S-04 (rest of F-2)** GEO-1184: under "Prompts", a click on the "Prompts" header drops the list back to 10 rows — not described by Figma (D4 keeps the choice while paging with Show more). Low, to confirm with the dev before raising.
- **W-12** GEO-1239: if the shipped "Delete Prompt" body still offers to "reset all prompts to default" (no such action any more). Low.
- **W-15** GEO-1231 / 1239: if Manage Scope ships "This language applies AI insights…" (missing "to"). Low, can join GEO-1533.

### No action (decided or superseded)

F-1 (GEO-1513) should not be raised as a bug as written (S-01). Q-1 to Q-4 of GEO-1513 are consistent with Figma and staging. A13 (GEO-1243 "Brand / Topic" header) is consistent with the design (U-14). The 18 OK_SUPERSEDED items need no change: each one is already covered by a recorded PO / dev / QA decision or a story note "the AC applies".
