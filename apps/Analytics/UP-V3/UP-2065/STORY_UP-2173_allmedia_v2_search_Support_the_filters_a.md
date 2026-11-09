# UP-2173: /allmedia/v2/search: Support the filters and sort fields needed to list the mentions behind an Analytics chart point

**Story ID:** UP-2173
**Issue Type:** Story
**Title:** /allmedia/v2/search: Support the filters and sort fields needed to list the mentions behind an Analytics chart point
**Status:** 🟨 In Progress
**Assigned to:** Jack.Trimboli
**Epic:** UP-2065
**Created:** 2026-10-13
**Updated:** 2026-10-26
**Jira link:** https://onclusive.atlassian.net/browse/UP-2173

## User Story

_No "As a ... I want ... so that" block in the Jira description (technical story). See Context / Acceptance Criteria._

## Acceptance Criteria

_No structured Acceptance Criteria in the Jira description; description copied as-is below._

## Requirement
In Analytics, the user clicks a point on a chart (a day, a media type, a sentiment, a source, a publication tier, ...) and a modal lists the mentions behind that point. The list must match the chart figure: same saved search, same period, same filters, plus the criterion of the clicked point.
The filters sent by Analytics must replace the ones configured on the saved search (same need as UP-2170 for `generate-search`), so that a filtered chart and its mentions agree.
## Assumptions
- Filter parameters to retrieve the mentions that match the clicked chart point
- Sorting of the mentions by relevance, reach, AVE or date, with the sort field names documented.
- Documented filter parameters: single value or list, separator, allowed values.
- A 400 error on an invalid filter parameter.
## Parameters sent by Analytics and matching CM parameters
| Analytics parameter | Origin | CM parameter |
| --- | --- | --- |
| `profileIds` | Saved search / clicked series | `id` |
| `startDate` | Date range, clamped to the clicked point's period | `minTime` |
| `endDate` | Date range, clamped to the clicked point's period | `maxTime` |
| `sort` | Mentions window (date, relevance, reach, AVE) |  |
| `order` | Mentions window (asc / desc) | `sortOrder` |
| `size` | Mentions window (page size) | `limit` |
| `mediaTypes` | Filter panel or chart click | `news`, `cTV`, `cRadio`, `podcast`, `facebook`, `instagram`, `youtube`, `linkedin`, `tiktok`, `newsSourceType` (web / print) |
| `articleSentiment` | Filter panel or chart click | `sentiment` |
| `countries` | Filter panel | `newsCountry` |
| `languages` | Filter panel | `languageCode` |
| `pageRank` | Filter panel |  |
| `relevance` | Filter panel |  |
| `webCategory` | Filter panel |  |
| `printCategory` | Filter panel |  |
| `podcastCategories` | Filter panel | `podcastCategory` |
| `hideRepost` | Filter panel |  |
| `includeComments` | Filter panel | `filterFacebookComments` |
| `verifiedAccountsOnly` | Filter panel |  |
| `excludeFinancialNews` | Filter panel |  |
| `excludePressReleases` | Filter panel |  |
| `excludeMarketResearch` | Filter panel |  |
| `excludeSocialMentionsWithLowReach` | Filter panel |  |
| `includedMediaLists` | Filter panel |  |
| `excludedMediaLists` | Filter panel |  |
| `sources` | Chart click |  |
| `topics` | Chart click |  |
| `publicationTiers` | Chart click |  |
| `domainAuthorities` | Chart click |  |

An empty cell means no parameter has been identified.
Please confirm, row by row, the CM parameter listed, and indicate for each filter whether it accepts a single value or a list. For the rows with an empty cell, please indicate whether an equivalent exists. Please also indicate which of these filters will be supported and which will not.

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
- Story Jira: https://onclusive.atlassian.net/browse/UP-2173
- External Spec: none in Jira description
