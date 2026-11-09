# GEO-1263: Use the captured domain everywhere the brand appears

**Story ID:** GEO-1263
**Issue Type:** Story
**Title:** 47.4 Use the captured domain everywhere the brand appears
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1069
**Created:** 2026-10-14
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1263

## User Story

> As a user consuming the analysis, I want the logo resolved at setup to be the one shown everywhere, so that the brand is represented consistently across the product.

## Acceptance Criteria

**AC1 — Captured domain everywhere**

- Given: a custom brand with a captured domain
- When: the analysis is displayed
- Then: the same domain-based logo is used in the header, rankings, competitive views and exports

**AC2 — No website: lettermark everywhere**

- Given: a custom brand with no website URL provided
- When: the analysis is displayed
- Then: the neutral lettermark is shown consistently in the same places, with no attempt to retrieve a logo from a guessed domain

**AC3 — Older analyses unchanged**

- Given: an analysis created before this change with no stored brand domain
- When: it is displayed
- Then: it keeps today's behavior unchanged

## Technical Details

### Where the brand logo appears (OS-Team, 2026-10-14)

| Place | Today, when no domain is stored |
|---|---|
| Report list | logo searched by brand name |
| Dashboard sidebar + header | favicon of the domain most cited by the AI answers |
| Brand rankings, target brand row (Overview, Category views) | favicon of the domain cited by the AI answers |
| Prompts table, target winner | stored domain only — already correct |
| PowerPoint / PDF export, cover | stored logo, then favicon of the stored domain, then initial — already correct |
| PowerPoint / PDF export, rankings target row | favicon of the domain cited by the AI answers |
| XLSX export, e-mails | no brand logo |

For analyses created after this change, the guessed sources (name search, AI-cited domain) are no longer used: stored logo → favicon of the stored domain → lettermark. Competitor logos and the brand's variant rows are unchanged.

- Behaviour change: a selected suggestion that Brandfetch returned with neither domain nor logo (rare) now shows the lettermark.

### Proposals to be validated by the PM

- **P1:** the website is stored as the analysis's brand domain, so it also feeds category discovery, the brand checks, owned-domain detection of sources, competitor discovery and the winner logo of the prompts table.
- **P2 (validated by OS-Team, 2026-10-14):** a new analysis is marked as « domain confirmed at setup » so older analyses (AC3), which look the same in the database, keep today's behaviour.

### Design

None: no visual change, only which domain and logo the existing components receive.

### Technical Acceptance Criteria

**TAC1 — New custom brand without website: no guess anywhere**

- Given: a BRAND report with `entity_domain_confirmed = TRUE`, `entity_domain` NULL, `entity_logo_url` NULL, and rankings where the target brand's AI-cited domain is `other.com`
- When: the report list, Overview (sidebar, header, rankings) and a Category view render
- Then: the target brand row / visual is the letter everywhere (list, sidebar, header, rankings target row), no request to `v1/brands/search`, no favicon of `other.com`; variant rows unchanged.

**TAC2 — Older report unchanged**

- Given: the same data with `entity_domain_confirmed = FALSE`
- When: the same screens render
- Then: today's behaviour (name search in the list, `other.com` favicon in sidebar / header / target row) — existing tests stay green.

**TAC3 — Export**

- Given: a confirmed report with `entity_domain = licter.com` and no logo URL, then a confirmed one with no domain whose ranking domain is `other.com`, then the same unconfirmed
- When: the PowerPoint is generated
- Then: cover and rankings target row use the `licter.com` favicon; then the initial on both (never `other.com`); then today's `other.com` favicon on the target row.

**TAC4 — Flag set once**

- Given: a BRAND then an UNBRANDED creation
- When: the reports are saved
- Then: `entity_domain_confirmed` is TRUE then FALSE, and no update path changes it.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned
- **Related (mentioned in the ticket or the epic):**
  - GEO-1251 (Resolve competitors when no Visibility prompts, GEO-1002): competitor discovery would also use the stored domain if P1 is validated
  - GEO-1209 (unbranded analysis): TAC4, an UNBRANDED creation stores entity_domain_confirmed = FALSE
  - GEO-1269 (exports, GEO-1068): same PPTX / PDF export generator, different sections (cover / rankings vs key concepts)

## Definition of Done

- [ ] All acceptance criteria verified on every place listed in the « Where the brand logo appears » table, including PowerPoint / PDF export
- [ ] Older analyses (created before the change) unchanged
- [ ] Technical acceptance criteria TAC1 to TAC4 covered by dev tests
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1069
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1263
- External Spec: [epic-47/47-4-use-the-captured-domain-everywhere-the-brand-appears.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-47/47-4-use-the-captured-domain-everywhere-the-brand-appears.md)
