# GEO-1261: Accept and normalize any reasonable URL input

**Story ID:** GEO-1261
**Issue Type:** Story
**Title:** 47.2 Accept and normalize any reasonable URL input
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1069
**Created:** 2026-10-14
**Updated:** 2026-10-20
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1261

## User Story

> As a user entering my brand's website, I want any reasonable form of the address to be accepted, so that I do not have to know the exact expected format.

## Acceptance Criteria

**AC1 — Any reasonable form** _(Updated 2026-10-20)_

- Given: the website field
- When: I enter a full URL, a bare domain, or an address with or without a protocol or a www prefix or a trailing path
- Then: the domain is derived from it: the full hostname without the protocol, the www prefix, the path or the query (https://www.brand.com/fr?x=1 gives brand.com, and shop.brand.co.uk stays as is)

**AC2 — Not a domain** _(Updated 2026-10-20)_

- Given: I enter something that cannot be interpreted as a domain
- When: I try to proceed
- Then: I see the inline message "Enter a valid website, such as example.com.", the step is blocked and I can correct the input

**AC3 — Stored**

- Given: the derived domain
- When: the analysis is created
- Then: that domain is stored as the brand's domain for the analysis

## Technical Details

### Examples (OS-Team, 2026-10-14)

| Input | Derived domain |
|---|---|
| https://www.licter.com/fr/about?x=1 | licter.com |
| http://licter.com | licter.com |
| www.licter.com | licter.com |
| licter.com/ | licter.com |
| LICTER.COM | licter.com |
| licter.com:8080 | licter.com |
| shop.brand.co.uk | shop.brand.co.uk |
| (empty) | none — the field is optional |
| licter, licter .com, john@licter.com, ftp://licter.com, localhost, 192.168.0.1 | inline error |

- The error shows when the field loses focus or on « Discover Categories », and the step cannot be left while it is shown. It disappears as soon as the value is valid or empty.
- The server also refuses an invalid website at creation; it never stores free text as the brand's domain.

### Validated by the PM (2026-10-20, GEO-1069)

- **P3:** the domain = the address's host, lowercase, without www., port or path. A subdomain other than www is kept (shop.brand.co.uk stays shop.brand.co.uk). Now AC1.
- Source: GEO-1069 comment 865135 (Quentin Reant, 2026-10-19 21:03 New York time): "OK for all your decisions, including storing the website as the brand domain like a selected suggestion."

### Design

No Figma for this epic (OS-Team exception): same error pattern as the brand error of step 1 (red border, red message under the field).

- Copy (en-US, validated by the PM): see AC2. The en-GB, fr-FR and es-ES texts are machine translations still to be reviewed.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned
- **Related (mentioned in the ticket or the epic):**
  - GEO-1231 (Set the brand and the markets, GEO-1002): same error pattern as the brand error of step 1, error also shown on « Discover Categories »

## Definition of Done

- [ ] All acceptance criteria verified against the examples table (valid inputs and inline-error inputs)
- [ ] Server-side refusal of an invalid website at creation verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1069
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1261
- External Spec: [epic-47/47-2-accept-and-normalize-any-reasonable-url-input.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-47/47-2-accept-and-normalize-any-reasonable-url-input.md)
