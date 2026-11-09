# GEO-1220: [GEO-Administration] API endpoint to override the source type of a domain

**Story ID:** GEO-1220
**Issue Type:** Story
**Title:** [GEO-Administration] API endpoint to override the source type of a domain
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Reporter:** Quentin.Reant (PO)
**Priority:** Medium
**Fix version:** 1.3
**Epic:** none yet (to be set by the PO / dev, see README.md)
**Created:** 2026-10-07
**Updated:** 2026-10-21
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1220

## Description (Jira, 2026-10-28)

As a super admin, I want to correct the source type of a domain from the back office API, so that a classification error reported by a client is fixed for every organisation without a SQL migration.

## Context

CNP Assurances reported that opinion-assurances.fr, a customer review site, is classified as Journalism instead of Review Sites. We told them we would fix it on our side. This will not be the last one, so we need a proper way to do it and not a one-off SQL each time.

Today a domain is classified in 3 levels (`SourceClassificationService.classify()`): the hard-coded regex lists, then the global cache table `domain_classifications`, then a Gemini call on the domain name only. The cache has no organisation and no TTL, so the first Gemini answer stays for every client forever. The result is then written into `response_sources.source_type` for each snapshot, so past snapshots keep the old type even if the cache changes.

There is no endpoint on `domain_classifications` today, the only precedent is the purge migration V2.1.1. Note that the regex list matches trustpilot.com only, so fr.trustpilot.com and it.trustpilot.com go to Gemini as well.

## Immediate step (do not wait for the endpoint)

Set opinion-assurances.fr to Review Sites in `domain_classifications` and update `response_sources.source_type` for the existing rows of that domain, so CNP sees the fix in their history too.

## Proposed endpoints

Same pattern as the other back office routes: `/api/v1/admin/**`, GET for ADMIN, mutations for SUPER_ADMIN only.

- GET /api/v1/admin/source-classifications?domain=&sourceType=&overridden=&page=&size= : search the cache, returns domain, sourceType, origin (REGEX, GEMINI, OVERRIDE), overriddenBy, overriddenAt, reason
- PUT /api/v1/admin/source-classifications/{domain} with body { "sourceType": "REVIEW_SITES", "reason": "CNP Assurances Q&A 2026-10-05", "applyToHistory": true } : creates or replaces the override
- DELETE /api/v1/admin/source-classifications/{domain}/override : removes the override, the domain is classified again at the next run

## Acceptance Criteria

### AC1 - An override is applied to every future run

- **Given:** a super admin sets opinion-assurances.fr to Review Sites with the PUT endpoint

- **When:** any organisation runs a report that cites opinion-assurances.fr

- **Then:** the source is stored as Review Sites, and no Gemini call is made for that domain

### AC2 - An override beats the regex lists

- **Given:** a domain that matches one of the hard-coded regex lists

- **When:** a super admin overrides it

- **Then:** the override wins, because it is the one decision a human made explicitly

### AC3 - The history is updated when asked

- **Given:** an override with applyToHistory = true

- **When:** the call returns

- **Then:** response_sources.source_type is updated for all existing rows of that domain in every organisation, the response gives the number of rows updated, and the source charts and the exports show the new type

### AC4 - The history is untouched when not asked

- **Given:** an override with applyToHistory = false

- **When:** the call returns

- **Then:** only the future runs use the new type

### AC5 - Overrides survive cache purges

- **Given:** a domain with an override

- **When:** a migration or a job purges or reclassifies the cache (like V2.1.1)

- **Then:** the overridden row is kept as it is

### AC6 - Removing an override

- **Given:** a domain with an override

- **When:** a super admin calls the DELETE endpoint

- **Then:** the override is removed and the domain goes back through regex, then Gemini, at the next run; past rows are not changed

### AC7 - Only super admins can change a type

- **Given:** an ADMIN, EDITOR or READER user

- **When:** they call PUT or DELETE

- **Then:** the API returns 403; ADMIN can still call the GET

### AC8 - Validation and audit

- **Given:** a PUT with an unknown sourceType or a domain that is not a root domain

- **When:** the call is made

- **Then:** the API returns 400 with the list of allowed types; every valid change is logged with the user, the old type, the new type and the reason

## Technical notes

- Add origin, overridden_by, overridden_at and reason to domain_classifications (Flyway migration). Level 2 cache lookup must read overrides before the Level 1 regex.
- Domain format must be the same as ResponseSource.getDomain(), otherwise the override never matches. Check how regional subdomains (fr.trustpilot.com) are normalised.
- Check if any table or cache aggregates source types per snapshot. If yes, applyToHistory must refresh it too.
- Cover with an integration test: override, run a report, check the stored type and that Gemini is not called.

## Out of scope

- A back office screen. The endpoint comes first, the screen can follow when Support needs it.
- Per organisation overrides. The classification is global today and stays global.
- Client self-service. Clients report errors to us, we fix them.

---

## Acceptance Criteria (refined in the tech spec — functional, for QA)

Note: `origin` only takes GEMINI or OVERRIDE (regex results are never stored, the GET reflects the table).

### AC1 - An override applies to every future run

- **Given:** a SUPER_ADMIN called `PUT /api/v1/admin/source-classifications/opinion-assurances.fr` with `{"sourceType":"REVIEW_SITES","reason":"CNP Assurances Q&A 2026-10-05","applyToHistory":false`}
- **When:** any organisation runs a report that cites opinion-assurances.fr
- **Then:** the source is stored as `REVIEW_SITES` and no Gemini call is made for this domain

### AC2 - The override beats the regex

- **Given:** a domain matching a hard-coded regex list (e.g. `trustpilot.com`, REVIEW_SITES)
- **When:** a SUPER_ADMIN overrides it to `SOCIAL_UGC`
- **Then:** the next run stores `SOCIAL_UGC`

### AC2b - The override also applies to the lite analysis

- **Given:** an override `trustpilot.com → SOCIAL_UGC`
- **When:** a lite analysis cites `fr.trustpilot.com`
- **Then:** this domain shows with type `SOCIAL_UGC`, and the displayed domain stays `fr.trustpilot.com`

### AC3 - History updated on request

- **Given:** a PUT with `applyToHistory = true`
- **When:** the call returns
- **Then:** `response_sources.source_type` is updated for every non-deleted row of the domain in every organisation; the response gives `historyRowsUpdated` and `previousSourceType`; source charts and XLSX/PPTX exports show the new type without waiting for the cache to expire, on the pod that served the call

### AC3b - Replaying the same PUT changes nothing

- **Given:** a PUT `applyToHistory = true` already applied
- **When:** it is replayed identically
- **Then:** the response is 200 with `historyRowsUpdated = 0`

### AC4 - History untouched without request

- **Given:** a PUT with `applyToHistory = false`
- **When:** the call returns
- **Then:** no `response_sources` row is changed, `historyRowsUpdated = 0`, only future runs use the new type

### AC4b - Confirming Gemini's type still freezes the row

- **Given:** a domain classified `JOURNALISM` by Gemini
- **When:** a SUPER_ADMIN PUTs `JOURNALISM`
- **Then:** the row becomes `origin = OVERRIDE` with `overriddenBy`, `overriddenAt` and `reason` set, and Gemini can no longer change it

### AC5 - Overrides survive reclassifications

- **Given:** an overridden domain
- **When:** the Gemini classifier produces another type for it, or a purge respecting the documented rule `origin <> 'OVERRIDE'` runs
- **Then:** the override row is unchanged

### AC6 - Removing an override

- **Given:** an overridden domain
- **When:** a SUPER_ADMIN calls {{DELETE /api/v1/admin/source-classifications/{domain}/override}}
- **Then:** the response is 204; the domain no longer appears in the GET; at the next run it goes through the regex then Gemini, which writes the row back as `origin = GEMINI`; past `response_sources` rows do not change

### AC6b - DELETE without override

- **Given:** a domain without override (Gemini row or absent)
- **When:** the DELETE is called
- **Then:** the response is 404 `{"error":"NO_OVERRIDE", …`} and the Gemini row, if any, is intact

### AC7 - Only SUPER_ADMIN changes a type

- **Given:** an ADMIN, EDITOR or READER user
- **When:** they call PUT or DELETE
- **Then:** the API returns 403 `{"error":"ACCESS_DENIED", …`}; an ADMIN can call the GET; an EDITOR or READER gets 403 on the GET

### AC8 - Validation

- **Given:** a PUT with an unknown `sourceType`
- **When:** the call is made
- **Then:** the response is 400 `VALIDATION_ERROR` and the message lists the 9 allowed types

### AC8b - Domain validation

- **Given:** a PUT or DELETE on a domain that is not a canonical root domain (`fr.trustpilot.com`, `Trustpilot.com`, `trustpilot.com.`, `not a domain`, `localhost`)
- **When:** the call is made
- **Then:** the response is 400 `VALIDATION_ERROR` with a message giving the expected form; YouTube channels (`youtube.com/@X`) are not supported

### AC8c - Body field validation

- **Given:** a PUT without `reason`, or without `applyToHistory`
- **When:** the call is made
- **Then:** the response is 400 `VALIDATION_ERROR`

### AC8d - Audit

- **Given:** a valid PUT or DELETE
- **When:** the call succeeds
- **Then:** a `[SOURCE_CLASSIFICATION_OVERRIDE]` log line holds the action, domain, old type, new type, reason, `apply_to_history`, `history_rows_updated`, and the user's email and sub

### AC9 - Search

- **Given:** GEMINI and OVERRIDE rows in the cache
- **When:** an ADMIN calls `GET /api/v1/admin/source-classifications?domain=assurances&sourceType=REVIEW_SITES&overridden=true&page=0&size=20`
- **Then:** the response is paginated `{content, page, size, totalElements, totalPages`} with only matching rows, each giving `domain`, `sourceType`, `origin`, `overriddenBy`, `overriddenAt`, `reason`, `updatedAt`; `size > 100` or an unknown `sourceType` gives 400

### AC10 - Immediate CNP fix

- **Given:** the script `local/set-source-classification-override.sql` run in prod before the deployment with `domain=opinion-assurances.fr source_type=REVIEW_SITES`
- **When:** CNP looks at their reports
- **Then:** opinion-assurances.fr shows as Review Sites in the history (after at most 1 h of cache); after V2.10.6 is deployed, the GET shows it as `origin = OVERRIDE`, `overriddenBy = ops-script`

📋 Spec complète : [tech-spec-geo-1220-source-classification-override.md](https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/tech-spec-geo-1220-source-classification-override.md)

## Dependencies / links

- None in Jira

## Comments

- None

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: none yet
- Jira: https://onclusive.atlassian.net/browse/GEO-1220
- Test cases: .claude/Data/output/csv/GEO-R1.3/testcases-coverage-storyGEO-1220.csv (+ -review.md)
