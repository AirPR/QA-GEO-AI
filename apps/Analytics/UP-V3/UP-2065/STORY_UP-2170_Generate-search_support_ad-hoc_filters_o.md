# UP-2170: Generate-search: support ad-hoc filters overriding the saved search's filters

**Story ID:** UP-2170
**Issue Type:** Story
**Title:** Generate-search: support ad-hoc filters overriding the saved search's filters
**Status:** ⬜ Backlog
**Assigned to:** Ibtissam Fattah
**Epic:** UP-2065
**Created:** 2026-10-12
**Updated:** 2026-10-26
**Jira link:** https://onclusive.atlassian.net/browse/UP-2170

## User Story

_No "As a ... I want ... so that" block in the Jira description (technical story). See Context / Acceptance Criteria._

## Acceptance Criteria

_No structured Acceptance Criteria in the Jira description; description copied as-is below._

## Requirement
Analytics lets the user filter results by filters (media types, languages, sentiment, countries, ...) and displays the charts for that selection. The filter sent must replace the filter configured on the saved search, for the request concerned.
## Assumptions
- `GET /allmedia/generate-search` accepts optional filter parameters, named like the alert fields (camelCase).
- A parameter that is present replaces the saved value
- The generated `media_api_query` reflects the filter sent.
- The caller's contract entitlements remain applied.
- An invalid filter parameter returns a 400 error instead of being ignored.
## Mapping between Analytics filters and CM fields
Fields taken from the `GET /allmedia/alert` response and from the API reference.
| Analytics filter | CM field (alert) |
| --- | --- |
| Media type - Web | news (covers web and print together) |
| Media type - Print | news (covers web and print together) |
| Media type - TV | cTV |
| Media type - Radio | cRadio |
| Media type - Podcast | podcast |
| Social network - Facebook | facebook |
| Social network - Twitter | twitter |
| Social network - Instagram | instagram |
| Social network - YouTube | youtube |
| Social network - LinkedIn | linkedin |
| Social network - TikTok | tiktok |
| Web category | newsCategory |
| Print category | newsCategory |
| Podcast category | podcastCategory |
| Publication rank | sourceRank |
| Languages | languageCode |
| Sentiment | sentiment |
| Countries | newsCountry / tvCountry / radioCountry |
| Include comments (Facebook) | filterFacebookComments |
| Mention relevance | no field identified |
| Exclude financial news | no field identified |
| Exclude press releases | no field identified |
| Exclude market research | no field identified |
| Exclude social mentions with low reach | no field identified |
| Hide reposts (Twitter) | no field identified |
| Verified accounts only (Twitter) | no field identified |
| Media lists (include / exclude) | no field identified |

## Confirmation request
Please confirm, for each row of the table, that the CM field listed is the one that matches the filter, or indicate the equivalent field. For filters with no field identified, please indicate whether an equivalent exists on the CM side.
## To clarify
- Allowed formats and values (single value or list) for each filter

## Technical Details

_No technical details section in the Jira description._

## Dependencies
- **Blocks:** not mentioned in description
- **Blocked by:** not mentioned in description

## Definition of Done
- [ ] All Acceptance Criteria implemented and verified
- [ ] QA tests passed on staging
- [ ] No regression on the Analytics module
- [ ] Deployed to production

## Links
- Parent Epic: https://onclusive.atlassian.net/browse/UP-2065
- Story Jira: https://onclusive.atlassian.net/browse/UP-2170
- External Spec: none in Jira description
