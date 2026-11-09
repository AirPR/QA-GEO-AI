# GEO-1144: Localize the deterministic Target Source brief (FR/ES) — currently English-only

**Story ID:** GEO-1144
**Issue Type:** Story
**Title:** Localize the deterministic Target Source brief (FR/ES) — currently English-only
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-22
**Updated:** 2026-09-24
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1144

## User Story

_No "As a ... I want ... so that" block in the Jira description._

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

**Found during QA-plan dry-run (GEO-1110) on the Actions Center, 2026-09-22.**

## The bug

The one-sentence brief shown under "Key Takeaways" / "Points clés" in the source evidence panel (story 1.4 / GEO-1123) is always rendered in English, regardless of the interface language. Every other string on the same panel (headings, tabs, labels) correctly switches with the user's `Interface Language` setting (Settings → Preferences); only this sentence does not.

Example, interface set to French:

```
Points clés                                          ← translated
This source has 1 unfavorable article where the      ← stays English
brand is depicted negatively, and 2 articles that
cover the brand positively.
```

## Root cause

`BriefBuilder.build()` (`geo-backend/src/main/java/com/onclusive/geo/backend/service/actions/BriefBuilder.java`) is a pure Java function that assembles the sentence from hardcoded English string literals (`"This source has "`, `" unfavorable article"`, `" where the brand is entirely absent"`, etc.). It takes no locale parameter. The frontend (`TargetSourceDetailPanel.tsx`) only displays `data.brief` verbatim — there is nothing to localize on the frontend, because the string arrives from the backend already built, in English, in every case.

## What's already locked, unused

The epic's UI strings reference sheet ("GEO EPIC-010 Target Sources - UI strings (4 locales)") already locks FR/ES wording for every branch of this sentence — `panel.briefAbsent_one/_other`, `panel.briefNegative_one/_other`, `panel.briefBoth`, `panel.briefPositive_one/_other`, `panel.briefPeriod` — confirmed against Quentin's terminology-lock comment on GEO-152 (2026-09-21). These keys exist in the locked sheet but were never added to the frontend locale files, because the frontend never receives a translatable payload for this sentence to begin with — the fix has to start on the backend.

## Suggested shape of the fix

`BriefBuilder.build()` needs a locale (or a template-key set) threaded through from the request — `TargetSourceDetailService` (or wherever it's called) → `BriefBuilder`, with FR/ES sentence templates matching the reference sheet's locked wording (singular/plural per count, "and" clause replacing the final stop, glossary terms `article problématique` / `artículo problemático`, `réponses défavorables` / `respuestas desfavorables`).

## Related fixes already merged on `feature/GEO-152-actions-center-target-sources`

A parallel pass (same QA dry-run) fixed 13 FR/ES strings that had drifted from the locked glossary/reference sheet in `fr-FR.json` / `es-ES.json` (title, gap-answers wording, failing-article wording, a couple of missing sentences) — commits `716cffda` and `3a2bd98c`. This ticket covers the one string those commits could not touch, because it isn't a frontend translation file at all.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1144
