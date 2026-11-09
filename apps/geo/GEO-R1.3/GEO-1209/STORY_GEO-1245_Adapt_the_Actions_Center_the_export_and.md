# GEO-1245: Adapt the Actions Center, the export and the emails for a topic

**Story ID:** GEO-1245
**Issue Type:** Story
**Title:** STORY-46.5: Adapt the Actions Center, the export and the emails for a topic
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1209
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1245

## User Story

> As a user of an unbranded analysis, I want every other surface to follow the same rules as the dashboard, so that nothing shows a brand scorecard I did not ask for.

## Acceptance Criteria

**AC1 — Actions Center hidden**

- Given: the sidebar
- When: it renders
- Then: the Actions Center entry is hidden

**AC2 — Export**

- Given: an XLSX or PowerPoint export
- When: I run it
- Then: the cover and titles use the topic, dropped sheets and slides are skipped, no text says "your brand" and no brand carries a target marker

**AC3 — Analysis ready email**

- Given: the analysis ready email
- When: it is sent
- Then: its subject and body use the topic as the analysis name

## Technical Details

### Rules (OS-Team, updated 2026-10-09)

- Opening the Actions Center URL of an unbranded analysis directly shows the dashboard, not an empty Actions Center.
- The export contains the same widgets as the unbranded dashboard, nothing more.
- Brand analyses are unchanged.
- The topic versions of the export texts are written by us, listed on a separate tab of the strings sheet (4 locales, status « Proposed ») and shipped on staging; the PM reviews the wording afterwards.

### Reviews

📊 [Functional & design review](https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho) — PM questions Q1–Q16, design points D1–D14 and the frame-by-frame epic ↔ design table. PM answer of 2026-10-09 (GEO-1245 comment) applied below.

### PM decisions (2026-10-09)

- No change of criteria on 46.5.
- Q8: the export texts of a topic (`ExportI18n`) are written by us, added on a separate tab of the strings sheet in en-US, en-GB, fr-FR and es-ES with status « Proposed », and shipped on staging (T8).

### Open points

- 📝 **PM review after leave:** the export texts we add with status « Proposed ».

### Design

- No frame for exports (review D8, GEO-1185 « PowerPoint export » still to come). Default: same layouts, dropped slides skipped, titles from the topic.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned in the ticket (the epic cannot start before the GEO-1002 / EPIC-034 wizard exists)
- **Related (mentioned in the ticket or the epic):**
  - GEO-152 (EPIC-010: Actions Center entry)
  - GEO-156 (EPIC-011: XLSX and PowerPoint exports)
  - GEO-428 (EPIC-017: analysis ready email)
  - GEO-1185 (Design Task: "PowerPoint export" still to come)

## Definition of Done

- [ ] All acceptance criteria verified (unbranded / Other global flag ON)
- [ ] Brand analysis behaviour unchanged (regression check)
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1209
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1245
- External Spec: [epic-46/46-5-adapt-the-actions-center-the-export-and-the-emails-for-a-topic.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-46/46-5-adapt-the-actions-center-the-export-and-the-emails-for-a-topic.md)
- Functional & design review: https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
