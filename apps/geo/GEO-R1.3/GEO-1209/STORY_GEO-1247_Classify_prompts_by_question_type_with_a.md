# GEO-1247: Classify prompts by question type with an Other fallback

**Story ID:** GEO-1247
**Issue Type:** Story
**Title:** STORY-46.7: Classify prompts by question type with an Other fallback
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1209
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1247

## User Story

> As a user, I want every prompt labelled with a category and a question type, defaulting to Other when one is missing, so that no prompt is lost and I can see the analytical mix.

## Acceptance Criteria

**AC1 — Type badges in a brand analysis**

- Given: the table renders in a brand analysis
- When: I look at the type badges
- Then: they show Visibility, Competitive, Reputation, Brand Image or Other

**AC2 — Each missing dimension falls back alone**

- Given: a prompt misses its category or its type
- When: it is saved
- Then: that dimension alone is Other, so a prompt can be Other on one or both

**AC3 — Inline add never blocked**

- Given: I add a prompt inline
- When: I confirm with its category or type empty
- Then: that dimension falls back to Other, instead of the confirm staying disabled as in EPIC-034

**AC4 — Other in the column filters**

- Given: the Category or Type column filter
- When: it opens
- Then: Other is a value of its own with its live count

**AC5 — « Other » in an inline select** (Updated 2026-10-09)

- Given: a prompt in Other
- When: it renders in the wizard or in Manage Scope
- Then: the missing dimension reads "Other" in an inline select, ticked or not, a kept row is on the warning tint, and picking a value removes the tint and updates the counts

**AC6 — Non-blocking table warning**

- Given: kept prompts sit in Other
- When: the table renders
- Then: a warning states that classifying them improves measurement accuracy, and nothing blocks the launch

**AC7 — Review card** (Updated 2026-10-09)

- Given: kept prompts sit in Other
- When: Review loads
- Then: a card titled with "Other" (never "Unclassified" or "uncategorised") lists each with its market and an inline select for the missing value, states it returns key concepts only until classified, and never blocks launch; with none, the card is hidden

**AC8 — Manage Scope**

- Given: Manage Scope
- When: I open Prompts
- Then: Other prompts show on inline selects

**AC9 — Cost and output of an Other-type prompt** (Updated 2026-10-07)

- Given: a prompt is Other on its type
- When: it runs
- Then: it consumes a full slot and returns key concepts only, no keyword graph

## Technical Details

### Rules (OS-Team, updated 2026-10-09)

- A prompt is Other on its category, on its type, or on both; each dimension is shown and filtered on its own.
- A prompt in Other costs one slot per market, like any kept prompt; an unticked one costs nothing.
- Suggested prompts always carry a category and a type: only prompts typed by the user can be in Other.
- Classifying an Other prompt never blocks and never deletes it; it changes from the next collection (46.8).
- Unticked prompts in Other are not listed on the Review card (they do not run).
- Brand Image prompts never have a category: they are never shown as « Other » on the Category column.
- « Other » is the only term, in the wizard, Manage Scope, the banner and the Review card: never « Pick category », « Unclassified » or « uncategorised ».
- Unbranded analysis and Other ship behind one global flag, off until validated, then on for every organisation; flag off, no prompt can be saved in Other.
- New texts (banner, Review card, footnote) are added to the strings sheet in 4 locales with status « Proposed » and shipped on staging; the PM reviews the wording afterwards.

### Reviews

📊 [Functional & design review](https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho) — PM questions Q1–Q16, design points D1–D14 and the frame-by-frame epic ↔ design table. PM answers of 2026-10-09 (GEO-1209 comment, GEO-1247 comment) applied below.

### PM decisions (2026-10-09)

- D3 / D12: « Other » everywhere, in the wizard too: a missing dimension reads « Other » in its inline select, ticked or not (no « Pick category »); the Review card and the banner say « Other » (no « Unclassified », no « uncategorised ») (AC5, AC7, T14, T16, T17).
- Q9: one global flag for unbranded and Other, OFF until validated then ON for everyone; how the frontend reads it is our call → `AuthMeResponse.features` (46.2 T1b) (T20).
- Q1: an Other-type prompt runs as written, without the Perception system instruction; we write the capture instruction (T9).
- Q8: card, banner and footnote keys added by us in 4 locales, status « Proposed », shipped on staging (T29).

### Open points

- 🎨 **Designer (non-blocking):** « Other » everywhere in 4.3 / 4.8 / 5.1 / 5.2 / 7.4; unbranded Review 5.3 / 7.5 lose the plans / Upgrade block and get the Other card and the InBrief / Top Topics warning; GEO-1186 follows (GEO-1247 comment #860373). Dev follows the ACs meanwhile.
- 📝 **PM review after leave:** the « as written » capture instruction and the strings we add with status « Proposed ».

### Design

Figma `Measure - GEO Module`, page « Onboarding / New Analysis V3 » (node `13458:101707`):

- **DAC1 — 4.3 Other fallback warning** (`13491:5303`): yellow banner on the 4.3 layout, rows on the warning tint with compact selects. Copy: the frame's « 2 prompts are uncategorised… » loses « uncategorised » (PM D12) — the text says « Other » and comes from the strings sheet.
- **DAC2 — 4.10 Assign an Other prompt** (`13615:13518`): the category select opens on the analysis categories.
- **DAC3 — 4.11 Other prompt assigned** (`13615:14168`): tint removed once both dimensions are set.
- **DAC4 — 7.4 Prompts · Unbranded types** (`13533:11984`): table footnote on the 7.4 layout (the second sentence was left out of 45.6 DAC2 on purpose); its « uncategorised » wording becomes « Other » (strings sheet). The empty cell reads « Other », ticked or not — never « Pick category » (4.8, 7.4; PM D3).
- **DAC5 — Review card** on the V3 brand Review frames **5.1** (`13494:7504`) and **5.2** (`13498:7740`): one row per prompt (text, market, inline select of the missing value, type badge) and the note on key concepts and the never-blocked launch; title with « Other », not « Unclassified Prompts » (PM D12). The unbranded Review frames 5.3 / 7.5 reuse the 5.1 card.
- 🎨 **Designer update requested (GEO-1247 #860373, non-blocking):** « Other » everywhere (no « Pick category » in 4.8 / 7.4, no « uncategorised » in 4.3, no « Unclassified Prompts » in 5.1 / 5.2); unbranded Review 5.3 / 7.5 lose the « Available on higher plans / Upgrade » block and get the 5.1 Other card and the InBrief / Top Topics warning (46.1 AC12); GEO-1186 follows. The ACs above already state the target; dev does not wait for the frames.
- V3 frames pre-date the GEO-1012 restyle: take layout and copy from V3, visuals from the GEO-1012 table (45.4 / 45.6).
- **Copy:** strings sheet shared with GEO-1002 (4 locales). Missing keys of this story are added by us with status « Proposed » (T29); the PM reviews them after his leave.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned in the ticket (the epic cannot start before the GEO-1002 / EPIC-034 wizard exists)
- **Related (mentioned in the ticket or the epic):**
  - GEO-1234 (STORY-45.5: inline add, confirm no longer disabled when category or type is empty)
  - GEO-1233 / GEO-1235 (STORY-45.4 / 45.6: table layout and visuals)
  - GEO-1239 (STORY-45.10: Manage Scope Prompts)
  - GEO-1241 (STORY-46.1 AC12: InBrief / Top Topics warning on Review)
  - GEO-1242 (46.2 T1b: global flag via AuthMeResponse.features)
  - GEO-1248 (STORY-46.8: classification takes effect from the next collection)
  - GEO-1186 (Design Task: Other category and Other question type, to be updated)

## Definition of Done

- [ ] All acceptance criteria verified (unbranded / Other global flag ON)
- [ ] Brand analysis behaviour unchanged (regression check)
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1209
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1247
- External Spec: [epic-46/46-7-classify-prompts-by-question-type-with-an-other-fallback.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-46/46-7-classify-prompts-by-question-type-with-an-other-fallback.md)
- Functional & design review: https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
