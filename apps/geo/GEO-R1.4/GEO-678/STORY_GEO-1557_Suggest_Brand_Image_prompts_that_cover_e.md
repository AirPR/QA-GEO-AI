# GEO-1557: STORY-50.14: Suggest Brand Image prompts that cover each Corporate Reputation card

**Story ID:** GEO-1557
**Issue Type:** Story
**Title:** STORY-50.14: Suggest Brand Image prompts that cover each Corporate Reputation card
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1557

## User Story

_No user story in the story description. Epic GEO-678, User Story 1.14 (verbatim):_

> As a user, I want the suggested Brand Image prompts to ask about each part of Corporate Reputation, so that the cards still get data once engines answer naturally.

## Acceptance Criteria

_12 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional ACs (verbatim GEO-678, User Story 1.14)

**AC1 — The 10 suggested prompts**

- Given: suggestions are generated for a brand analysis
- When: Prompts loads
- Then: each country gets these 10 Brand Image prompts instead of the current ones, adapted to the language of the country as today: "What is {brand} known for?", "What is {brand}'s reputation?", "Is {brand} a trustworthy brand?", "What do customers complain about with {brand}?" (Brand Image), "Is {brand} a good company to work for?", "What do employees say about working at {brand}?" (Employer Brand), "How sustainable is {brand}?", "Is {brand} an ethical company?" (ESG / Sustainability), "Is {brand} a well-run company?", "Has {brand} been in the news recently?" (Leadership)

**AC2 — Pool count unchanged**

- Given: the new set
- When: the prompts are counted against the pool
- Then: it is still 10 Brand Image prompts per country, as in GEO-1002

**AC3 — Cards from what the answer says**

- Given: a natural Brand Image answer
- When: it is parsed
- Then: each card (Brand Image, Employer Brand, ESG / Sustainability, Leadership) gets data only from what the answer says, whatever prompt was asked, a card that no answer talks about shows "No data available", the card tone is the majority of the answers' tones and its bullets are in the AI insights language, as today. A card needs the answer to say something about its topic (a fact, an opinion, a criticism) that can become a bullet: a passing mention that only supports another topic does not fill it (eg: a Chief Sustainability Officer named in a sustainability answer feeds ESG / Sustainability, not Leadership)

**AC4 — Brand territories**

- Given: natural Brand Image answers
- When: they are parsed
- Then: the brand territories are the product categories or industries each answer links to the brand, read from every Brand Image answer, and they feed Brand Territory as today (on the test set, the 4 general prompts gave territories in every answer)

**AC5 — Founder or history is not Leadership**

- Given: an answer, or a part of it, that only gives the founder or the history of the brand (eg: "Who founded Dr. Martens?")
- When: it is parsed
- Then: it does not feed the Leadership card, which needs current or recent executives, management, strategy decisions or governance

**AC6 — Removal popup in the wizard**

- Given: the wizard
- When: I untick or delete a Brand Image prompt for the first time in this setup
- Then: a popup titled "Remove this Brand Image prompt?" says "Brand Image prompts feed the Corporate Reputation cards. Removing them can leave some cards empty." with Remove and Cancel and no close cross, Cancel keeps the prompt, and after Remove the popup does not show again in this setup

**AC7 — Removal warning in Manage Scope**

- Given: Manage Scope
- When: I untick or delete a Brand Image prompt for the first time since I opened it
- Then: the same text shows inside the delete or last-prompt confirmation, or in the wizard popup when the untick has no confirmation, and it does not show again until I open Manage Scope again
- Add country dialog (PM answer, comment 872445): when I untick or delete a ticked Brand Image prompt in the Add country dialog, the same popup as in the wizard shows, once per opening of the dialog (Cancel keeps the prompt, after Remove it does not show again until the dialog is closed and opened again)

**AC8 — No card sub-label**

- Given: the prompts table
- When: it renders
- Then: Brand Image prompts show no sub-label for their card

**AC9 — No Brand Image prompt kept**

- Given: no Brand Image prompt is kept
- When: Review loads
- Then: the warning built in GEO-1002 says the Corporate Reputation cards and Brand Territory stay empty, and in Manage Scope the "What stops from the next run" box names it, as built

**AC10 — Unbranded analysis**

- Given: an unbranded analysis
- When: prompts are generated
- Then: there is still no Brand Image prompt and no popup

**AC11 — Existing analyses get prompts 5 to 9**

- Given: an existing brand analysis
- When: the change ships
- Then: prompts 5 to 9 of the set are added to each country and its current Brand Image prompts stay; they count against the pool, an organisation can go over it, and adding prompts stays blocked until the count fits

**AC12 — A country added later gets the new set**

- Given: a country added later to an existing analysis
- When: its prompts are suggested
- Then: it gets the new set of 10, so one analysis can mix the old and new sets

## Technical Details

### Scope note

- Parts A (suggested set + one-shot addition of prompts 5 to 9) and B (removal popup, design GEO-1017 frame 16) depend on nothing and can ship first. Part C (reading natural Brand Image answers into the Corporate Reputation cards and Brand Territory) depends on 50.1 (GEO-1550) and 50.2 (GEO-1551).
- AC8 and AC9 are already in place; this story only covers them with tests.
- Dashboard display changes stay in GEO-1498; only the removal popup is built here.
- **Split (2026-11-02):** the spec is two files. **50.14a** = parts A and B (AC1, AC2, AC6 to AC12) — implemented; the Add country popup (PM answer 872445) added on 2026-11-04. **50.14b** = part C (AC3 to AC5) — implemented, in review; shipped as is (PM answer 872445): in an answer about working at the brand, employee pride or heritage, and complaints about store or team managers, may still fill Brand Image or Leadership as well as Employer Brand; the reader is tightened on these two points later.
- Sources of natural Brand Image cards: follow-up story GEO-1576 (50.15); past snapshots are not re-read (PM answer 872445).
- Prompts 5 to 9 reach existing analyses through a SUPER_ADMIN backoffice step run once after the release (not at deployment).

📋 Spec complète : [epic-50/50-14a-suggest-brand-image-prompts-that-cover-each-corporate-reputation-card.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-14a-suggest-brand-image-prompts-that-cover-each-corporate-reputation-card.md) (parts A + B) · [epic-50/50-14b-read-natural-brand-image-answers-into-the-corporate-reputation-cards.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-14b-read-natural-brand-image-answers-into-the-corporate-reputation-cards.md) (part C)

## Dependencies

- **Blocks:** GEO-1569
- **Blocked by:** GEO-1550, GEO-1551
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1557
- External Spec: [epic-50/50-14a-suggest-brand-image-prompts-that-cover-each-corporate-reputation-card.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-14a-suggest-brand-image-prompts-that-cover-each-corporate-reputation-card.md)
- External Spec: [epic-50/50-14b-read-natural-brand-image-answers-into-the-corporate-reputation-cards.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-50/50-14b-read-natural-brand-image-answers-into-the-corporate-reputation-cards.md)
