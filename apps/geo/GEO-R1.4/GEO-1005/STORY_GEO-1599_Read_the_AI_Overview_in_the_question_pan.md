# GEO-1599: STORY-54.5: Read the AI Overview in the question panel

**Story ID:** GEO-1599
**Issue Type:** Story
**Title:** STORY-54.5: Read the AI Overview in the question panel
**Status:** [CODE REVIEW] Code Review
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1005
**Fix version:** 1.4
**Created:** 2026-11-11
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1599

## User Story

> As a GEO user, I want to read the AI Overview as Google showed it, so that I can check the extracted results against it.

- **As** a GEO user
- **I want** to read the AI Overview as Google showed it
- **So that** I can check the extracted results against it.

## Acceptance Criteria

_8 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1005, User Story 1.5)

- Given an AI Overview, When I open its tab in the question panel, Then it uses the full answer card of GEO-1498 (clamp, "Show full answer", brand highlights, citation mini card, Sources card) with no change
- Given an AI Overview with images, When it renders, Then the images show in the answer at the place Google showed them, as drawn in frames 08a and 08b of GEO-1017, and clicking an image opens it fullscreen, with Escape and the back button of frame 08b ("Back to answer") to come back to the answer
- Given a captured image with a caption, When it renders, Then the caption and its source show under the image, as in frame 08a ("The traditional US "Big Three" carriers · Source: Portal Warehousing"), and the fullscreen view shows the full credit with the title of the source page, as in frame 08b
- Given a captured image with no caption, When it renders, Then the caption line is not shown, in the answer and in the fullscreen view
- Given an answer with several images, When I open one of them fullscreen, Then the viewer shows that image only, with no previous or next control, as in frame 08b, and I go back to the answer to open another one
- Given an image that does not load, When the answer renders, Then the image is hidden and the text of the answer is not changed
- Given the answer header, When it counts characters and citations, Then images are not counted
- Given an AI Overview with no numbered citation, When it renders, Then the header shows "no inline citations" and the Sources card lists the sources, as for any engine in GEO-1498

**Note on these criteria (2026-11-12): criteria 2 to 5 (images in the answer, captions and credit, the fullscreen viewer) are not delivered by this story.** Option A of question P1 was chosen: images are postponed and nothing is built for them here. The images of the answer card, for all engines (ChatGPT first, frames 08a and 08b), move to the follow-up story GEO-1608 (STORY-53.10) under GEO-1498. Criteria 6 and 7 already hold because images are never rendered. Criteria 1 and 8 are covered by this story (verification and tests, no change expected).

## Technical Details

### Deviation from the epic text

The criteria about images (the second to the fifth, and the sixth and seventh for what they say about images) cannot be met from the data the capture vendor returns, so this story builds nothing for them.

- Covered by this story, as verification and tests with no change expected: the first criterion (the full answer card) and the last (no numbered citation).
- Already true because images are never rendered: the sixth (an image that does not load is hidden) and the seventh (images are not counted in the header).
- Not covered: the second to the fifth (images in the answer, captions and credit, the fullscreen viewer). They stay visibly unmet; question P1 is settled (option A, 2026-11-12) and they move to GEO-1608.

Why: the vendor returns **no image inside the AI Overview**: 0 images in 24 measured AI Overviews. What it returns: "videos" (title, source, platform, duration, a thumbnail hosted by Google) in 19 of 24, and, in 1 of 24, a block of page-level images (title, source, link, thumbnail) that Google shows on the results page, with no position in the answer. The epic's own example (the "Big Three" carriers image) is not reproducible: the matching measured query returned none. The application also has no image viewer today and its answer renderer ignores images on purpose. The viewer the epic says is "built once, in whichever epic ships first" is not built here; epic 55 inherits the same question. The measured sample is small (24 AI Overviews, US and FR, queries written for the test): a wider sample before closing question P1 is cheap.

### Questions for the PM

**P1 — Images in the AI Overview.** The epic asks for images shown in the answer at the place Google showed them, with caption, credit and a fullscreen view. The capture vendor returns no image inside the AI Overview (see above).

- Option A — postpone images (nothing is built; the criteria stay visibly unmet) and revisit when the vendor or the design changes.
- Option B — show the AI Overview's videos in a block apart, below the answer (not "at the place Google showed them").
- Option C — show the page-level images in a block apart, when present (1 in 24).
- Answered on 2026-11-12 (PM proposal, team agreed): option A for this story. Images of the answer card (all engines, ChatGPT first, frames 08a and 08b) move to the follow-up story GEO-1608 (STORY-53.10) under GEO-1498.
- If unanswered: A ships. Users see the AI Overview text and sources but no image or video, which is also what the vendor's data supports.
- Note for B and C: the thumbnails are Google-hosted URLs (or inline base64 data), so showing them loads images from another site, and the application sets no image content-security rule today. That would be a hosting and security decision to take then; it does not arise while A holds.

### Scope note

Frontend verification and tests only; no migration, no backend change expected. Depends on STORY-54.3 and STORY-54.4. Design: GEO-1017 frames 01, 02, 03, 05 (answer card). Frames 08a and 08b are cited by the epic but have no recorded node id in the repository: the story asks to locate them for the day images are decided.

## Dependencies

- **Blocks:** GEO-1600
- **Blocked by:** GEO-1598
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1005
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1599
- External Spec: [54-5-read-the-ai-overview-in-the-question-panel.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1005-epic-54-stories/docs/implementation-artifacts/epics/epic-54/54-5-read-the-ai-overview-in-the-question-panel.md)
