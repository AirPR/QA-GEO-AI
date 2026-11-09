# Story 17.5a: Hybrid Write Strategy (ABANDONED)

**Story ID:** GEO-331
**Titre:** Story 17.5 — Hybrid Write Strategy (dual cookie persistence + bidirectional adapters)
**Statut:** Abandoned
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-331

> **Note:** This story was abandoned. The "dual cookie write" and "hybrid read chain" concepts were absorbed into Story 17.1 (GEO-327) after the cookie domain clarification confirmed that cross-subdomain sharing between GEO (`geo.onclusive.com`) and 360/Review is not technically possible. See GEO-327 for the implemented approach.

## User Story

As a **product engineer maintaining cross-module cookie consent compatibility**,
I want **GEO to persist consent into both `onclusive:mention:cookie-consent` (360 format) and `cc_cookie` (Review/vanilla-cookieconsent format) when the user makes a choice from the GEO banner**,
So that **the user is recognized as having consented regardless of which Onclusive module reads the cookie next, eliminating the legal risk of consent fragmentation across modules**.

## Reason for Abandonment

Cookie domain clarification (2026-05-06): GEO writes its consent cookie scoped to `geo.onclusive.com` (prod) / `staging-geo.onclusive.com` (staging). Writing to `.onclusive.com` (cross-subdomain) is not technically possible at this scope. As a result:

- Writing `onclusive:mention:cookie-consent` on domain `.onclusive.com` from GEO is not possible.
- The dual-write strategy is moot — GEO writes `cc_cookie` to `geo.onclusive.com` only.
- Story 17.1 (GEO-327) absorbs the store API, including handling the read chain for existing consent cookies.

## Original Acceptance Criteria (for reference only — not implemented)

**Given** a user clicks "Accept all" / "Essential only" / saves Preferences from the GEO banner or modal
**When** the choice is committed
**Then** **both** `onclusive:mention:cookie-consent` and `cc_cookie` are written, on cookie domain `.onclusive.com` (cross-subdomain), with `sameSite=lax`, with TTL = 180 days

**Given** the user has just consented from GEO
**When** the `onclusive:mention:cookie-consent` cookie is inspected
**Then** its payload conforms to the 360 schema: `{ consentId: string (UUID), version: "1.1", responded: ISO date, essentials: true, analytics: boolean, functional: boolean }`

**Given** the user has just consented from GEO
**When** the `cc_cookie` cookie is inspected
**Then** its payload conforms to vanilla-cookieconsent v3 native format, with categories `necessary` (always true), `analytics` (mapped from `analytics`), `functional_support` (mapped from `functional`), and any required lib-internal fields.

**Given** a user has consented previously on 360 (only `onclusive:mention:cookie-consent` exists) and now visits GEO
**When** the GEO app boots
**Then** GEO **does NOT** rewrite the cookies — read-only mode (write strategy only fires when GEO is the one collecting consent for the first time)

**Given** a user has consented on Review (only `cc_cookie` exists) and visits GEO
**When** the GEO app boots
**Then** GEO **does NOT** rewrite the cookies. The consent is honored read-only via Story 17.1's adapter.

## Dependencies (Original)

- **Blocked by:** 17.1 (store API), 17.2 (banner triggers write), 17.3 (modal triggers write)
- **Blocks:** None directly — but consumed by GEO-243 / GEO-244 / future HubSpot via the store from 17.1

## Technical Notes (Original, for reference)

- Cookie domain: `.onclusive.com` — NOT achievable from `geo.onclusive.com` scope (reason for abandonment)
- Two adapters were planned:
  - `unifiedToOnclusive360(state) -> string` — produces JSON payload for `onclusive:mention:cookie-consent`
  - `unifiedToVanillaCookieConsent(state) -> string` — produces vanilla-cookieconsent v3 native cookie payload
- `consentId` preservation: read existing consentId from either cookie before write; reuse if present, else `crypto.randomUUID()`
- TTL constant: `60 * 60 * 24 * 180` (180 days, matching 360)

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-331
- Implemented replacement: https://onclusive.atlassian.net/browse/GEO-327
