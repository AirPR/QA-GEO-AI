# Multi-Language Support (French, British English, American English, Spanish)

**Epic ID:** GEO-576
**Statut:** [WIP] QA In Progress
**Assigne:** Youssef.AitLaydi
**Cree:** 2026-05-28
**MAJ:** 2026-07-20
**Jira:** https://onclusive.atlassian.net/browse/GEO-576

## Description
GEO is currently English only. Every screen, label, button, tooltip, empty state, wizard step, settings page, and notification is shown in English regardless of who is using it. This blocks adoption for users who do not work in English and leaves GEO out of step with the rest of the Onclusive platform, which already runs in several languages. A French or Spanish user has no way to work in their own language, and a user who reads English as a second language has to translate the interface in their head before they can act on what the analysis is telling them.
This EPIC makes the GEO interface available in four languages: French, British English, American English, and Spanish. Each user has an active language that drives the entire interface they see. The active language is seeded from the value Auth0 holds for the user, suggested as the default when the user is added to GEO, and can be overridden both at that moment and later by the user in their own settings. Because each Onclusive app handles language independently, the value the user chooses inside GEO stays inside GEO and is not written back to Auth0. Once a language is active, the full interface follows it: navigation, controls, labels, table headers, tooltips, and empty states, plus the analysis wizard, onboarding, the user administration and settings screens, and the transactional emails GEO sends, each delivered in the recipient's own language. Where a given piece of text has not yet been translated into the active language, the interface falls back to English rather than showing blank space or a missing-text marker, so a partially translated screen is always readable.
---
Story ID: TBD
> As an administrator adding a user to GEO, I want the user's language to be suggested from the value Auth0 already holds, so that most users get the right language without anyone having to set it manually.
Acceptance Criteria:

## Scope
In scope

- Interface text: navigation, buttons, labels, table headers, tooltips, and empty states
- The analysis wizard and onboarding
- User administration and settings screens
- Transactional emails, sent in the recipient's language

Out of scope

- Translating the analysis content itself (brand and competitor names, source text, and AI-generated narrative summaries), which follow the language of the markets being analysed
- Writing the GEO-chosen language back to Auth0 or to any other Onclusive app
- Adding languages beyond the four supported ones

Still open (non-blocking)

- Confirm that translation strings reuse the surrounding platform's existing terminology where equivalent terms already exist, rather than being authored fresh



Translation GEO - source of truth file for PM, R&D, and QA:
https://docs.google.com/spreadsheets/d/1OSuxEFY0ijLS6Pulny1_EubaaeFiMXW6nzwDSPYkxcc/edit?gid=314373573#gid=314373573

## Stories
| Story | Titre | Statut |
|-------|-------|--------|
| [GEO-812](https://onclusive.atlassian.net/browse/GEO-812) | [25.10] Collapse UI language to a single users.language column (technical refact | [DONE] Done |
| [GEO-802](https://onclusive.atlassian.net/browse/GEO-802) | [25.9] GEO UI language — self-service persistence + instant switch | [DONE] Done |
| [GEO-801](https://onclusive.atlassian.net/browse/GEO-801) | [25.8] GEO Settings — interface language page (self-service shell) | [DONE] Done |
| [GEO-721](https://onclusive.atlassian.net/browse/GEO-721) | [25.7] GEO UI language preference — admin-set at user creation | [DONE] Done |
| [GEO-688](https://onclusive.atlassian.net/browse/GEO-688) | [25.6] Send transactional emails in the recipient language | [DONE] Done |
| [GEO-687](https://onclusive.atlassian.net/browse/GEO-687) | [25.4] Translate the analysis wizard and onboarding | [DONE] Done |
| [GEO-686](https://onclusive.atlassian.net/browse/GEO-686) | [25.5] Translate user administration and settings | [DONE] Done |
| [GEO-685](https://onclusive.atlassian.net/browse/GEO-685) | [25.3] Translate the core interface | [DONE] Done |
| [GEO-684](https://onclusive.atlassian.net/browse/GEO-684) | [25.2] Seed the language from Auth0 at user creation | [DONE] Done |
| [GEO-683](https://onclusive.atlassian.net/browse/GEO-683) | [25.1] Foundation — i18n 4-locale extension + fallback chain | [DONE] Done |
| [GEO-598](https://onclusive.atlassian.net/browse/GEO-598) | Retrieve UP existing terminology inventory by language | [DONE] Done |
| [GEO-418](https://onclusive.atlassian.net/browse/GEO-418) | Prepare English source-of-truth file for all user-facing messages and gather tra | [DONE] Done |

## Liens
- https://onclusive.atlassian.net/browse/GEO-576
- https://onclusive.atlassian.net/browse/GEO-812
- https://onclusive.atlassian.net/browse/GEO-802
- https://onclusive.atlassian.net/browse/GEO-801
- https://onclusive.atlassian.net/browse/GEO-721
- https://onclusive.atlassian.net/browse/GEO-688
- https://onclusive.atlassian.net/browse/GEO-687
- https://onclusive.atlassian.net/browse/GEO-686
- https://onclusive.atlassian.net/browse/GEO-685
- https://onclusive.atlassian.net/browse/GEO-684
- https://onclusive.atlassian.net/browse/GEO-683
- https://onclusive.atlassian.net/browse/GEO-598
- https://onclusive.atlassian.net/browse/GEO-418
