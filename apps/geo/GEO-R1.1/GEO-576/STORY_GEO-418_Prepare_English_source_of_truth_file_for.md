# GEO-418: Prepare English source-of-truth file for all user-facing messages and gather translations

**Story:** GEO-418
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-576
**Cree:** 2026-05-11
**Jira:** https://onclusive.atlassian.net/browse/GEO-418

## User Story
As a product owner preparing the platform for multi-language support (French, British English, American English, Spanish), I want a single English source-of-truth file that lists every user-facing message in the app together with its surface and context, so that we can review and validate the English wording in one pass, then attach the translations for each target language alongside it.

## Acceptance Criteria
- Given the inventory is complete, When I read the document, Then every user-facing string in the platform is listed once with surface, trigger, and current English wording.
- Given a string appears in multiple surfaces, When the inventory is reviewed, Then it is noted in each context (so reviewers can spot inconsistencies in usage).
- Given dynamic strings (e.g., "X reports generated"), When listed, Then the template is captured with placeholders rather than a rendered example.
- Given the English column has been validated, When translations are added, Then there is one column per target language (French, British English, American English, Spanish) and each entry is filled in.
- Given UP already uses a term for a given concept, When the translation is filled in, Then the existing UP wording is reused for consistency (rather than inventing a new translation).
- Given the file exists, When localization implementation starts, Then this document becomes the single source of truth used to populate the translation keys across the platform.

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-418
