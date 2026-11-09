# GEO-688: [25.6] Send transactional emails in the recipient language

**Story:** GEO-688
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-576
**Cree:** 2026-06-18
**Jira:** https://onclusive.atlassian.net/browse/GEO-688

## User Story
As a GEO recipient (invited user, or report creator) whose language is known, I want the transactional emails I receive (welcome / set-password, analysis-ready) to be written in my own language, falling back to English when my language is not supported or not yet translated, so that I can read and act on them without translating them.

## Acceptance Criteria
1. **Given** a recipient has a language set, **When** they receive a transactional email from GEO, **Then** the email content is in their language.

2. **Given** a recipient has no supported language set, **When** they receive a transactional email from GEO, **Then** the email content falls back to English (en-US).


> ⚠️ **Content-block (QA, read before testing):** AC2 (English fallback) is **fully testable now**. **AC1 is content-blocked**: the mechanism is delivered, but the translated copy does not exist yet — the French/Spanish/British columns are **empty** for the 32 `email.*` keys in the source-of-truth CSV. Until the PM supplies the FR/ES copy, a `fr` recipient receives the email **in English** (per-key fallback) — that is the expected behaviour in this state, **not a bug**. Do not reject AC1 for "English email for a fr user" until the FR copy ships.  
⚠️ **V1 reachability:** only `en` (default) and `fr` are reachable via Auth0. `es` is not selectable until story 25.2 (backend currently normalizes `es → en`). `en-GB` is never auto-activated in V1. → Once FR copy ships, test AC1 with a recipient whose Auth0 language = `fr`.


1. A Spring `MessageSource` (emails basename) is configured and wired into the email `SpringTemplateEngine` (`EmailConfig.emailTemplateEngine()` via `setTemplateEngineMessageSource`); email templates render text from `messages_<locale>.properties` via Thymeleaf `#{...}` (no user-facing hardcoded text left in `welcome.html`, `analysis-ready.html`, `fragments/*`).

2. Email subjects (today concatenated in English in Java) are resolved via `messageSource.getMessage("email.<…>.subject", args, locale)` — subject and body follow the same locale.

3. Recipient language (`users.language`, heterogeneous format: short `en`/`fr` OR regional `fr-FR` per creation path — see 25.1 Q1) is resolved to a backend `Locale` **defensively** (mirror of the frontend `AUTH0_LANG_MAP`): `en|en-US|en-GB → en`, `fr|fr-FR → fr`, `es|es-ES → es`, any unknown → `en`.

4. The `EmailService` interface (`sendWelcomeEmail`, `sendAnalysisReadyEmail`) carries the recipient language, propagated by **all** call sites: `AdminUserService.provision`, `ReportStatusConsumer`, `ResendPasswordSetupService`, **and** `OpsController` (test endpoints). `NoOpEmailService` implements the new signature.

5. Mustache placeholders (`{{recipientFirstName}}`, `{{organisationName}}`, `{{year}}`) are converted to positional `{0}`/`{1}`… when emitting the `.properties`, and Java/Thymeleaf calls pass the args in the same order (otherwise interpolation fails silently).

6. A key missing from `messages_fr`/`messages_es` falls back to `messages.properties` (EN) — never blank, never `???key???` (`setUseCodeAsDefaultMessage(false)`, `setFallbackToSystemLocale(false)`, explicit EN default).

## Technical Details
1. A Spring `MessageSource` (emails basename) is configured and wired into the email `SpringTemplateEngine` (`EmailConfig.emailTemplateEngine()` via `setTemplateEngineMessageSource`); email templates render text from `messages_<locale>.properties` via Thymeleaf `#{...}` (no user-facing hardcoded text left in `welcome.html`, `analysis-ready.html`, `fragments/*`).

2. Email subjects (today concatenated in English in Java) are resolved via `messageSource.getMessage("email.<…>.subject", args, locale)` — subject and body follow the same locale.

3. Recipient language (`users.language`, heterogeneous format: short `en`/`fr` OR regional `fr-FR` per creation path — see 25.1 Q1) is resolved to a backend `Locale` **defensively** (mirror of the frontend `AUTH0_LANG_MAP`): `en|en-US|en-GB → en`, `fr|fr-FR → fr`, `es|es-ES → es`, any unknown → `en`.

4. The `EmailService` interface (`sendWelcomeEmail`, `sendAnalysisReadyEmail`) carries the recipient language, propagated by **all** call sites: `AdminUserService.provision`, `ReportStatusConsumer`, `ResendPasswordSetupService`, **and** `OpsController` (test endpoints). `NoOpEmailService` implements the new signature.

5. Mustache placeholders (`{{recipientFirstName}}`, `{{organisationName}}`, `{{year}}`) are converted to positional `{0}`/`{1}`… when emitting the `.properties`, and Java/Thymeleaf calls pass the args in the same order (otherwise interpolation fails silently).

6. A key missing from `messages_fr`/`messages_es` falls back to `messages.properties` (EN) — never blank, never `???key???` (`setUseCodeAsDefaultMessage(false)`, `setFallbackToSystemLocale(false)`, explicit EN default).

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-688
