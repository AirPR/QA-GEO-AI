# GEO-598: Retrieve UP existing terminology inventory by language

**Story:** GEO-598
**Statut:** [DONE] Done
**Assigne:** Charlotte Hammond
**Epic:** GEO-576
**Cree:** 2026-06-02
**Jira:** https://onclusive.atlassian.net/browse/GEO-598

## User Story
As a product manager preparing GEO for multi-language support, I want a per-language inventory of the terminology already in use across UP (Universe Platform), so that the GEO translations can reuse existing UP wording for shared concepts instead of inventing new translations - keeping the platform consistent for users who already use other UP modules.

## Acceptance Criteria
- Given the inventory is delivered, When I open the file, Then I see one column per target language (French, British English, American English, Spanish) populated with the existing UP wording for each term.
- Given a UP term covers a concept also used in GEO, When the file is reviewed, Then the term is flagged as GEO-relevant so it can be picked up by the GEO English source-of-truth file.
- Given multiple UP variations exist for the same concept across modules, When the inventory is captured, Then the variations are listed together so reviewers can pick the canonical one.
- Given the file exists, When the GEO localization implementation starts, Then the GEO English-and-translations file reuses the UP wording for every term that overlaps.

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-598
