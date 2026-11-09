# GEO-1515: Set the prompt pool of existing organisations from their old quota

**Story ID:** GEO-1515
**Issue Type:** Story
**Title:** STORY-45.14: Set the prompt pool of existing organisations from their old quota
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Priority:** High
**Fix version:** 1.3
**Created:** 2026-10-21
**Updated:** 2026-10-22
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1515

## User Story

> As an Onclusive admin, I want every existing organisation to get its prompt pool from the quota it has today, so that no client is blocked on release day and nobody has to set each organisation by hand.

Today the release leaves the pool empty for every existing organisation, which means "not configured" and no prompt can be added until someone fills it in the back office. We replace that manual step with an automatic one, done once in 1.3.

The pool is the old quota converted into prompts:

```
pool = countries x (categories x (Visibility + Competitive + Perception per category) + Brand Image per country)
```

Example: 3 countries, 2 categories, 10 Visibility, 10 Competitive and 10 Perception per category, 5 Brand Image per country gives 3 x (2 x 30 + 5) = 195 prompts.

## Acceptance Criteria

_`customfield_10049` is empty: ACs extracted from the description._

**AC1 — Pool from the old quota**

- Given: an existing organisation with no prompt pool
- When: release 1.3 is deployed
- Then: its pool is set with the formula above, from the quota values it has in the back office

**AC2 — Current usage is not taken into account**

- Given: an organisation that uses fewer prompts than its old quota, or none
- When: the pool is set
- Then: the pool is still the full old quota, not the number of prompts in use

**AC3 — Pools already set are not touched**

- Given: an organisation whose pool was already set by an admin
- When: release 1.3 is deployed
- Then: its pool stays as it is

**AC4 — Deleted organisations are skipped**

- Given: a deleted organisation
- When: release 1.3 is deployed
- Then: no pool is set for it

**AC5 — Review list before production**

- Given: the conversion is ready
- When: before it runs in production
- Then: the PM gets the list of production organisations with their name, their old quota values, the computed pool and the prompts they use today, and the organisations still on the default quota (25 countries, 5 categories, 20 prompts per type, so 8,000 prompts) are flagged

**AC6 — Done in 1.3**

- Given: the old quota values are removed in the release after 1.3
- When: we plan the release
- Then: this conversion ships in 1.3, before the old quota values are removed

_Out of scope:_ new organisations. Their pool is required at creation (STORY-45.12).

## Technical Details

### Technical Acceptance Criteria (dev, ignored by QA)

- **TAC1: Formula** — Given legacy values 3/2/10/10/10/5 and a NULL pool, When V2.10.7 runs, Then `prompt_pool = 195`; with the defaults 25/5/20/20/20/20, `8000`
- **TAC2: Deleted quota row** — Given a quota row with `is_deleted = true` on a live organisation, When V2.10.7 runs, Then its pool stays NULL
- **TAC3: Suspended organisation** — Given a suspended (not deleted) organisation, When V2.10.7 runs, Then it gets its pool
- **TAC4: Quota computing to 0** — Given legacy values whose product is 0, When V2.10.7 runs, Then the pool stays NULL and the migration does not fail on `quotas_prompt_pool_check`
- **TAC4b: Overflow and negative values** — Given legacy values whose product exceeds 2147483647, or a negative legacy value, When V2.10.7 runs, Then the pool is capped at 2147483647 and the migration does not fail; with a negative value the pool stays NULL
- **TAC5: Re-run** — Given V2.10.7 already ran, When the same file runs again, Then no pool changes, including one changed by hand in between
- **TAC6: Review script on 1.2 and 1.3** — Given prod 1.2 (no `prompt_pool` column), When `local/geo-1515-prod-review.sql` runs, Then sections 1 and 2 return and section 3 is skipped without error; on 1.3, section 3 returns `prompt_pool` next to `computed_pool`
- **TAC7: Startup** — Given the integration-test context (`ddl-auto: validate`), When it starts, Then Flyway applies V2.10.7 after V2.10.0 and the context loads

### Implementation

- Conversion delivered in PR #825 (Flyway migration V2.10.7), runs automatically when 1.3 is deployed (dev comment #866014).
- Review list attached to the ticket: `geo-1515-1-organisations.csv` (columns `organisation, organisation_id, is_suspended, countries, categories, visibility, competitive, perception, brand_image, computed_pool, prompts_used_today, default_quota_8000, warning`; 84 live production organisations, read-only run on prod 1.2, 2026-10-21).

## Comments

**#865802 — Quentin Reant (2026-10-21)**

> @Youssef.AitLaydi @Abdenasser Aroukhsiss @Assiya.Benramdane FYI

**#866014 — Youssef Ait Laydi (2026-10-21)**

> **AC5: review list from production (1.2, read-only run on 2026-10-21)**
>
> The full list is in the attached `geo-1515-1-organisations.csv`. For each organisation it gives the name, the old quota values, the computed pool, the prompts used today and a default-quota flag. The conversion is in PR #825 (Flyway migration V2.10.7) and runs automatically when 1.3 is deployed.
>
> **Summary (84 live organisations)**
>
> - No organisation is on the default quota (8,000).
> - No organisation will start above its pool, so none shows "exceeded" from 1.3.
> - Every organisation has a quota and gets a pool. None is left "not configured".
>
> **Points for you to decide**
>
> 1. **Two organisations will be full on day one**:
>    - Nabep: 105 / 105
>    - Roche Italia: 70 / 70
> 2. They keep everything they have, but they cannot add a single prompt until their pool is raised in the back office. These two are close to full:
>    - Trial - Great Eastern: 113 / 140
>    - Toshiba Tec France: 70 / 84
> 3. **Is "categories" per country or per organisation?**
>    - In 1.2, the categories limit is checked as a total for the whole organisation, not per country.
>    - The AC1 formula multiplies it by the number of countries, as written.
>    - This changes nothing for the 56 organisations with 1 country or 1 category, but it gives very large pools to the 28 others. Examples (countries × categories → computed pool):
>      - America - Custom Demo and France - Custom Demo: 40 × 40 → 96,800 each
>      - Spain - Custom demo and UK - Custom demo: 30 × 30 → 54,600 each
>      - QA-GEO: 20 × 20 → 24,400
>      - Onclusive: 25 × 10 → 15,500
>    - The code follows AC1 as written. If that is intended, nothing to do. If not, please tell us the formula to use before 1.3.
> 4. **No prompts today**: Onclusive - TechOps, Onclusive Tech & Test, and Trial - National Motor Freight Traffic Association.
>
> Any adjustment goes through the back office after 1.3, not through the conversion. The list can still change before the deploy, because quotas remain editable in 1.2. We will run it again right after the deploy to check the pools that were written.

_No PO answer to points 1 to 4 on 2026-10-22._

## Dependencies

- **Blocks:** Not mentioned (must ship before the old quota values are removed, release after 1.3)
- **Blocked by:** GEO-1230 (STORY-45.12, back office Prompt pool field) — related, not a Jira link

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1002
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1515
- External Spec: [epic-45/45-14-set-the-prompt-pool-of-existing-organisations-from-their-old-quota.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-14-set-the-prompt-pool-of-existing-organisations-from-their-old-quota.md)
