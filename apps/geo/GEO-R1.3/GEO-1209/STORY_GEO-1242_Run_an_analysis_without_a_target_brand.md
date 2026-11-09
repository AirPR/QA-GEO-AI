# GEO-1242: Run an analysis without a target brand

**Story ID:** GEO-1242
**Issue Type:** Story
**Title:** STORY-46.2: Run an analysis without a target brand
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1209
**Created:** 2026-10-08
**Updated:** 2026-10-19
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1242

## User Story

> As a user creating an unbranded analysis, I want the topic to replace the brand everywhere the analysis needs a subject, so that the analysis runs and measures every brand the answers name.

## Acceptance Criteria

**AC1 — Mode and topic stored, no target**

- Given: an unbranded analysis
- When: it is created
- Then: it stores its mode and topic with no target brand, and the topic is its name in the dashboard, emails and exports

**AC2 — No brand is the target**

- Given: its answers
- When: they are processed
- Then: no brand is scored or treated as the target, brand grouping protects no target, and source classification receives the topic and the brands named

**AC3 — Topic split into 2 categories**

- Given: Categories
- When: categories are discovered
- Then: the topic is split into 2 consumer search areas, such as "postal services" into "parcel delivery" and "international shipping", with no brand website

**AC4 — Production templates, [Competitor 4]** (Updated 2026-10-07)

- Given: Visibility and Competitive prompts
- When: they are generated
- Then: they use the 10 production templates of each type (frontend/src/utils/questionTemplates.ts): Visibility is unchanged and uses {category} only, and in Competitive the {entity} slot becomes [Competitor 4], so each competitive prompt compares the top 4 brands from that category and market's visibility answers

**AC5 — Adaptation with the topic** (Updated 2026-10-07)

- Given: prompts are adapted and translated for a market
- When: they are generated
- Then: QUESTION_ADAPTATION receives the topic instead of the brand and drops the "entity must not appear" rule, and the topic does not have to appear in the text since the category already carries it

**AC6 — 10 Category Topics prompts per category**

- Given: Category Topics prompts
- When: they are generated
- Then: each category gets these 10, one per theme:

| Theme | Prompt |
|---|---|
| Selection criteria | What should I look for in {category}? |
| Quality | What makes {category} good quality? |
| Price and value | What is good value for money in {category}? |
| Experience | What do people like most about {category}? |
| Problems | What are the most common problems with {category}? |
| Trust and safety | How do I know which {category} options I can trust? |
| Trends | What is changing in {category} right now? |
| Ethics and sustainability | What are the ethical and environmental concerns around {category}? |
| Expert advice | What do experts recommend about {category}? |
| Controversies | What are the main controversies in {category}? |

**AC7 — Category Topics questions run as written** (Updated 2026-10-09)

- Given: Category Topics prompts
- When: they run
- Then: they run as written without the Perception system instruction, like prompts with the Other type

**AC8 — Category Topics analysis** (Updated 2026-10-09)

- Given: a Category Topics answer
- When: it is analysed
- Then: the Category Topics analysis prompt attached to GEO-1209 returns the topics raised, their sentiment for the category as a whole and up to 3 brands attached to each topic as written in the answers, on the non engine-native extraction path even when engine-native concepts are on

**AC9 — Competitive with too few competitors** (Updated 2026-10-19)

- Given: a Competitive prompt of an unbranded analysis, outside the Other category
- When: fewer than 2 competitors were extracted for its category and market
- Then: it is not sent for this run and shows no result in the prompts table. A brand analysis still sends it with the empty slots removed (Q7)

**AC10 — Topic not editable** (Updated 2026-10-09)

- Given: an unbranded analysis
- When: I open Manage Scope
- Then: the topic cannot be changed, as the brand today

## Technical Details

### Rules (OS-Team, updated 2026-10-19)

- An unbranded analysis keeps its mode for life (adding a brand is a later version) and its topic cannot be edited (AC10).
- The topic is the analysis name everywhere a brand name shows today (analysis list, dashboard title, emails, exports).
- No brand is highlighted, starred or protected anywhere; every brand named by the answers is measured the same way.
- A competitive prompt compares the 4 brands most cited by that category and market's visibility answers; with 2 or 3, the missing slots are removed from the text; with 0 or 1, the prompt is not sent for this run and has no row in the prompts table (AC9). Competitive prompts of the Other category always run as written.
- Category Topics prompts are sent exactly as written: no system instruction about a brand.
- Each category keeps up to 12 topics (25 % / 10 % thresholds unchanged).
- A topic's sentiment describes the category as a whole (favourable or unfavourable presentation of that aspect), so it also works for non-commercial topics such as football.
- Each topic keeps up to 3 brands attached to it, as written in the answers; they are never displayed (no brand tags), InBrief uses them.
- Unbranded analysis and Other ship behind one global flag, off until validated, then on for every organisation.

### Reviews

📊 [Functional & design review](https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho) — PM questions Q1–Q15, design points D1–D14 and the frame-by-frame epic ↔ design table. PM answers of 2026-10-09 (GEO-1209 comment) applied below.

### PM decisions (2026-10-09)

- Q1: Category Topics analysis prompt attached to GEO-1209 (T6); the other prompts are written by us, shipped on staging and reviewed by the PM after his leave.
- Category Topics questions run as written, without the Perception system instruction (new AC7); their concepts are extracted with the attached prompt on the legacy path even when engine-native concepts are on (AC8).
- Q13: each topic keeps up to 3 brands as written in the answers; InBrief uses them; still no brand tags in Top Topics.
- Sentiment is for the category as a whole, not « towards the category » as a buyer.
- Q7: a competitive prompt with 0 or 1 competitor is sent with the cleaned text (new AC9) — replaced for unbranded analyses on 2026-10-19, see below.
- Q15: the topic is not editable in Manage Scope (new AC10).
- One global flag for unbranded and Other (T1b).

### PM decisions (2026-10-19)

- AC9, option A (GEO-1242 comment): in an unbranded analysis, a Competitive prompt whose market and category have fewer than 2 competitors is not sent for that run. Brand analyses and the Other category are unchanged.
- Category Topics extraction, option A (GEO-1209 comment): up to 12 topics per category instead of 7, the « prefer 4 confident concepts » rule removed.

### Open points

- 📝 **PM review after leave:** the prompts we write and ship on staging — discovery (T7), QUESTION_ADAPTATION (T8), source classification (T4) and the shared « as written » capture instruction (T5 / 46.7 T9).

### Design

- No frame of its own (backend story). The topic as analysis name is visible in 46.3 (U.1 sidebar « PS Postal services ») and 46.5 (exports, email).

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned in the ticket (the epic cannot start before the GEO-1002 / EPIC-034 wizard exists)
- **Related (mentioned in the ticket or the epic):**
  - GEO-1209 (Category Topics analysis prompt attached to the epic)
  - GEO-1243 / GEO-1245 (topic as analysis name visible in the Overview, exports and email)
  - GEO-1247 (46.7 T9: shared "as written" capture instruction)
  - GEO-1251 (STORY-45.13 of GEO-1002: competitor discovery disabled in unbranded V1, guards added by epic 46)

## Definition of Done

- [ ] All acceptance criteria verified (unbranded / Other global flag ON)
- [ ] Brand analysis behaviour unchanged (regression check)
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1209
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1242
- External Spec: [epic-46/46-2-run-an-analysis-without-a-target-brand.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-46/46-2-run-an-analysis-without-a-target-brand.md)
- Functional & design review: https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
