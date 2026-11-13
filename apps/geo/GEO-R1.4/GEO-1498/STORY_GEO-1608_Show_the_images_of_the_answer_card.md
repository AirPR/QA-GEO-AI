# GEO-1608: STORY-53.10: Show the images of the answer card

**Story ID:** GEO-1608
**Issue Type:** Story
**Title:** STORY-53.10: Show the images of the answer card
**Status:** [BACKLOG] Backlog
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** none
**Created:** 2026-11-12
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1608

## User Story

> As a GEO user, I want to see the images of an answer where the engine showed them, so that I read the answer as the engine gave it.

- **As** a GEO user
- **I want** to see the images of an answer where the engine showed them
- **So that** I read the answer as the engine gave it.

Follow-up of STORY-54.5 (GEO-1599, question P1, option A, decided with the PM on 2026-11-12): the images of the answer card are a feature of the card for **all engines**, not only AI Overviews. ChatGPT first.

## Acceptance Criteria

_6 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (the image criteria of the epic's story 1.5, GEO-1005, generalised to every engine)

- Given an answer with images, When it renders, Then the images show in the answer at the place the engine showed them, as drawn in frames 08a and 08b of GEO-1017, and clicking an image opens it fullscreen, with Escape and the back button of frame 08b ("Back to answer") to come back to the answer
- Given a captured image with a caption, When it renders, Then the caption and its source show under the image, as in frame 08a, and the fullscreen view shows the full credit with the title of the source page, as in frame 08b
- Given a captured image with no caption, When it renders, Then the caption line is not shown, in the answer and in the fullscreen view
- Given an answer with several images, When I open one of them fullscreen, Then the viewer shows that image only, with no previous or next control, as in frame 08b, and I go back to the answer to open another one
- Given an image that does not load, When the answer renders, Then the image is hidden and the text of the answer is not changed
- Given the answer header, When it counts characters and citations, Then images are not counted

**Note (2026-11-12): the measurements below show that the capture vendor returns images of three different kinds, none "at the place the engine showed them" in the text. The first four criteria (place in the answer, caption and credit, fullscreen) probably need to be revised with the PM before development.**

## Technical Details

### What we measured on 2026-11-12 (the three engines captured through the vendor)

Method: the same prompt, "What are the best running shoes for flat feet?" (country US), asked (1) in a real browser, signed in (Gemini Pro on the work account, ChatGPT Free, Google Search with its AI Overview), then (2) to the capture vendor (Cloro) with the default request. Extra vendor calls: ChatGPT with `include.shopping`, Gemini with `include.rawResponse`. About 8 billed calls in all, plus the earlier AI Overview sample (165 prompts) and recordings.

| Engine | What the real page shows | What the vendor returns |
|---|---|---|
| **Google AI Overviews** | Bulleted text; to its right, source cards with a thumbnail (RunRepeat, Shoe Station) and a YouTube video. No image inside the text for this question. | `aioverview`: `text`, `markdown`, `sources` (no thumbnail), `citationPills`, `videos`. **No image field**, in the 159 captured AI Overviews or in the recordings. A page-level `inlineImages` block exists on pages without an AI Overview (3 images in one case), with no position in any answer. |
| **ChatGPT** | A product thumbnail beside each model (Brooks Adrenaline GTS 25, ASICS Gel-Kayano 33, New Balance Fresh Foam X 860 v15, ...), with tags such as "Best overall". | Default request: text only (also on two prompts that asked for pictures). **With **`include.shopping` (paid add-on): `inlineProducts`, 7 products, each with 1 image (`image_urls`, hosted on `images.openai.com`), plus `title`, `description`, `price`, `featured_tag`, `position`; `shoppingCards` was empty. No marker of the product in the text, only the product's `position` in the list. |
| **Gemini** | A carousel of product images (Brooks Adrenaline GTS 25, ASICS Gel-Kayano 33, Saucony Hurricane 26, ...), each with a caption "Source: ...". | Default request: `text`, `sources`, `citationPills` only. No `shoppingCards`, no `places`, on this prompt and on a places prompt ("best coffee shops near the Eiffel Tower"). With `include.rawResponse` (562,000 characters): 11 image-looking URLs, which are Google thumbnails of the source pages (`encrypted-tbn*.gstatic.com`), and the shoe names, but **not the carousel images**. |

What the vendor's documentation says (docs for the ChatGPT and Gemini endpoints): ChatGPT images are product images only, in `shoppingCards[].products[].image_urls`, `inlineProducts[].product.image_urls` and `entities[].product.image_urls`, and come only with `include.shopping`; Gemini lists `places[].thumbnail`, `shoppingCards[].thumbnail` and `shoppingCards[].images` with no paid option, but we did not get them. The AI Overview endpoint documents no image field.

What this means:

- The only images we can obtain today are ChatGPT **product** images, behind a paid option. They exist on product-type questions only, not on reputation or perception prompts.
- For Gemini the image shows in the real page and the vendor does not return it: a limit of what the vendor extracts, or a difference of session (a signed-in Pro account against the vendor's anonymous one). We cannot tell which with two prompts.
- For AI Overviews there is nothing to show in the answer; the only images are source thumbnails and videos, which the vendor does not return as images.
- None of the images has a position in the text, a caption or a credit as drawn in frames 08a and 08b (only a title, a price and a tag for a ChatGPT product).
- The image URLs are hosted by the engines (`images.openai.com`, Google), see the security point below.

Limits of the measurement: one product prompt compared in the browser, one signed-in account per engine, a handful of vendor calls. Not measured: the engines' API route (OpenRouter), and the engines that are not captured (Claude and Grok are account-gated and never captured, Perplexity is not reachable).

Questions to put to the vendor: (1) are AI Overview images extracted, and in which field and with which option? (2) when are `shoppingCards` and `places` filled for Gemini? (3) is there an option, other than `include.shopping`, that returns the images of ChatGPT's informative answers? Questions for the PM: is a block of product images acceptable instead of images in the text, and is the cost of the ChatGPT `shopping` option (billed on every capture) acceptable?

### What is known today (to verify when the story starts)

- The PM measured images in 28 of 30 ChatGPT answers of the GEO-678 Cloro dataset (not re-checked here: our default requests returned none, the measurements above explain when they appear); 0 of 24 AI Overviews measured in the 54.x spike had one inside the answer.
- The answer renderer (`AnswerMarkdown`) ignores images on purpose today; the application has no image viewer; the cleaned capture record keeps no image field (the raw capture may hold them).
- The thumbnails of captured images can be hosted by another site (Google or the engine's), and the application sets no image content-security rule today: showing them is a hosting and security decision for the team to take in this story.
- Frames 08a and 08b of GEO-1017 are cited by the epic but have no recorded node id in the repository.

### Scope note

Depends on STORY-53.1 (the full answer card) and on the capture storing the images it receives (for ChatGPT, a request option that is billed). Frontend and, probably, a field in the capture record and the question-detail response. Design: GEO-1017 frames 08a and 08b. Not part of STORY-54.5 (GEO-1599).

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** none in Jira links
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1608
