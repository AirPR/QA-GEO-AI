# GEO-1183: [Target Sources] The passage must always include the brand or product name

**Story ID:** GEO-1183
**Issue Type:** Story
**Title:** [Target Sources] The passage must always include the brand or product name
**Status:** [CODE REVIEW] Code Review
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-10-02
**Updated:** 2026-10-02
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1183

## User Story

_No "As a ... I want ... so that" block in the Jira description._

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

### Context

Today the judge prompt asks for "the exact passage that supports your verdict, verbatim from the page, at most 140 characters" (DepictionPrompt.java, depiction-v1). Nothing asks the passage to contain the brand, so when the sentence is longer than 140 characters the LLM keeps the criticism and drops the name.

Example on the Tesla analysis, caranddriver.com, "Presenting Car and Driver's 2024 EV of the Year" (an article about the Hyundai Ioniq 5 N). The sentence on the page is:

"And before any Tesla loyalists complain that we aren't giving the Cybertruck its due, know that the one we rented broke on the second day, effectively parking itself with just a few hundred miles on its odometer."

We show: "know that the one we rented broke on the second day, effectively parking itself with just a few hundred miles on its odometer."

The verdict is fine (a Cybertruck that broke on day two is negative), but the user cannot tell what "the one" is, and as the article is about Hyundai it is confusing. It also means there is nothing to highlight (same root as https://onclusive.atlassian.net/browse/GEO-1182#icft=GEO-1182).

### Requirement

The passage should always contain the matched brand or product name as written on the page, so the user sees who the criticism is about.

- When the supporting sentence fits in 140 characters, we keep it as is.
- When it does not fit, we keep the part with the name and the part with the criticism and join them with "…", eg: "…before any Tesla loyalists complain that we aren't giving the Cybertruck its due, know that the one we rented broke on the second day…"
- Each part stays verbatim from the page (no rewording, no case change), and the 140 character limit still applies to the whole passage.
- The entity returned by the judge should be the name exactly as it appears in the passage, so the highlight in the panel works.
- If the LLM still returns a passage without the name, we should fall back to the prefilter window around the first match rather than show a passage with no brand in it.

This changes the prompt wording, so we need to bump DepictionPrompt.VERSION and keep the copy in PromptTemplateBuilder.DEPICTION_SYSTEM_INSTRUCTION in sync. The existing verdicts will need to be judged again to get the new passages.

### Acceptance criteria

- On the caranddriver.com article above, the passage contains "Tesla" or "Cybertruck" and the name is highlighted in the panel.
- No passage in the Target Sources panel of the Tesla, Nike and Lidl Nederland analyses on staging is missing the brand or product name.
- Passages stay verbatim (apart from the "…" joins) and at most 140 characters.
- The verdicts themselves do not change after the re-judge.

### Evidence

- tesla_caranddriver_passage.png: the caranddriver.com panel on the Tesla analysis, Last 7 days.

_[image/attachment in Jira]_

## Technical Details

_No dedicated Technical Details / Implementation Notes section in the Jira description (see the repository spec link below if present)._

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** None mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] Localisation (en-US, en-GB, fr-FR, es-ES) checked where UI copy changes

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-152
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1183
