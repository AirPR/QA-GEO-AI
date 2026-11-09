---
name: comment-jira-bug
description: Posts a QA comment on a Jira bug ticket — as a threaded reply to the last comment (tagging its author) when the ticket already has a comment to answer, or as a new comment otherwise. Embeds the single proof screenshot, applies an optional status transition and verifies everything after posting. Draft shown and confirmed by the user before any write.
---

# Command : /comment-jira-bug

## Usage

```
/comment-jira-bug --issue {ISSUE_KEY} [--proof {png_path}] [--status "{target status}"] [--mode reply|new]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--issue`  | Yes | Jira key of the bug (e.g. `GEO-1509`) |
| `--proof`  | No  | Local proof screenshot (the one image that shows the verdict) |
| `--status` | No  | Target status after the comment (e.g. `Passed QA`, `Action Needed`, `Ready for QA`) |
| `--mode`   | No  | Force `reply` or `new`. Default: decided in Phase 1 |

The comment content (verdict, observation, decision) comes from the conversation: a retest
result, a `/run-and-report` verdict, a `/run-mcp-PWT-tests` rerun, or the user's own words.

## Phase 1 — Read the ticket and its thread (read-only)

1. Read `.env` for `JIRA_URL`, `JIRA_EMAIL`, `JIRA_TOKEN` (never print the token).
2. `GET {JIRA_URL}/rest/api/3/issue/{KEY}?fields=summary,status,assignee,reporter,attachment`
3. `GET {JIRA_URL}/rest/api/3/issue/{KEY}/comment?orderBy=created&maxResults=100`
   Save responses under `.tmp-jira/` (Windows: never pipe curl to `/dev/stdin`) and parse with node.
4. Show the user: current status, assignee, and the last 3 comments (author, date, `parentId`, first lines).
5. **Choose the mode:**
   - `reply` — the ticket already holds a comment we answer (a dev or PO answer to a QA comment, a
     question to QA, a fix note). Reply to the **last comment** of that thread:
     `parentId` = id of the last comment, tag = its **author** only if a question or an action remains open.
   - `new` — nothing to answer (first QA verdict on the ticket, retest after a new fix with no comment).
     Tag the person the comment is addressed to: the PO (Quentin Reant) for a question or a decision,
     otherwise the assignee when an action is expected from them. No tag for a pure FYI.
   - Never add a separate new comment to answer an existing one.
   - **Tag only when something is expected from the person** (open question, decision, action). A bug validated as FIXED / Passed QA gets no tag, even in a reply (user rule 2026-10-22).

## Phase 2 — Draft (no write)

Write the draft to the scratchpad and show it to the user **in full, exactly as it will be posted**:

- **English only**, short: verdict line, what was checked (environment, date, org, language),
  Fixed / Still open, the question if any, the TCs that cover it.
- No "Steps replayed" section (the ticket holds the steps).
- Do not announce the status change in the comment (no "Moving to Passed QA."): the transition shows it (user rule 2026-10-22).
- **Tag** = a real Jira mention, never plain text: wiki markup `[~accountid:{accountId}]`.
  Resolve the accountId with `GET /rest/api/3/user/search?query={name}` (or from the comment `author.accountId`).
  - PO Quentin Reant: `712020:7343a240-d2eb-4be4-a0c8-1c73c97b140c`
- **Proof** (if any): one image only, preceded by a one-line caption, embedded with
  `!{uploaded_file_name}|width=800!`. Frame the defective / verified element in red when it helps
  (no "(red frame = QA annotation)" note in the text, user rule 2026-10-22). Step screenshots stay local.
- Status change (if any) stated in the draft summary for the user, not necessarily in the comment.

**Wait for the user's explicit approval of the exact text** before Phase 3. Any change to the text → show it again.

## Phase 3 — Post (after approval only)

1. **Upload the proof** (if any) as a copy suffixed with the date: `bug_{KEY}_final_YYYYMMDD.png`.
   Check the existing attachments first — never upload the same file twice. One curl per file:
   ```bash
   curl -s -u "$JIRA_EMAIL:$JIRA_TOKEN" -X POST -H "X-Atlassian-Token: no-check" \
     -F "file=@C:/path/bug_{KEY}_final_YYYYMMDD.png" \
     "$JIRA_URL/rest/api/3/issue/{KEY}/attachments" -o .tmp-jira/{key}-att.json
   ```
2. **Post the comment** with the v2 endpoint (wiki markup renders mentions and inline images).
   Build the JSON with node (`JSON.stringify`, UTF-8), post with `--data-binary @file`:
   - mode `new`: `{ "body": "..." }`
   - mode `reply`: `{ "body": "...", "parentId": {thread_root_id} }` — Jira threads have ONE level: if the last comment is itself a reply (it has a `parentId`), use ITS `parentId` (the thread root); otherwise use the last comment id. Posting with a child comment as parent fails with "Parent comment not found, and no child comments exist".
   ```
   POST {JIRA_URL}/rest/api/2/issue/{KEY}/comment
   Content-Type: application/json; charset=utf-8
   ```
3. **Transition** (if `--status`): `GET /rest/api/2/issue/{KEY}/transitions`, pick the transition whose
   `to.name` matches the target status (ids differ per workflow — never hard-code), then
   `POST /rest/api/2/issue/{KEY}/transitions` with `{"transition":{"id":"…"}}` (expect HTTP 204).
   Always after the comment, never before.

## Phase 4 — Verify (mandatory)

`GET {JIRA_URL}/rest/api/3/issue/{KEY}/comment/{new_id}` and check:
- exactly one `media` node per embedded image (0 if no proof);
- one `mention` node with the expected accountId (when a tag was planned);
- mode `reply`: `parentId` equals the replied comment id. If Jira ignored `parentId`
  (field missing or null), tell the user — do not delete or repost without their approval;
- special characters (×, –, quotes, accents) are intact;
- `GET /rest/api/3/issue/{KEY}?fields=status` equals the target status (if a transition was asked).

If a check fails on an image: delete only the comment just created and repost with the other method
(ADF `mediaSingle` with `mediaApiFileId` when present, otherwise v2 wiki markup).

## Phase 5 — Report

```
Comment posted on {KEY} ({mode}, reply to comment {parentId} by {author} | new) — tag {name} ✓, proof embedded ✓
Status: {old} → {new}
Link: https://onclusive.atlassian.net/browse/{KEY}?focusedCommentId={new_id}
```
Then record the outcome where the project tracks it (findings file, rerun real.json, bugs JSON) if the
user asked for it.

## Rules

- **Never post, edit, delete or transition without the user's explicit approval of the exact text / action.**
- Answer an existing comment **in its thread** (reply to the last comment, tag its author) — never as a separate new comment.
- Comments addressed to the PO always tag him with the Jira mention.
- Never edit someone else's comment.
- Everything written to Jira is in English, even when the user chats in French.
- Partially fixed bug → say what is fixed and what is still open, ask the question, status `Action Needed` (if the user asks).
- Dev answer that explains a behaviour = DEV_ANSWER: show it to the user, who decides whether it is accepted
  (the PO's comments are decisions).
- Only the proof screenshot goes to Jira; step screenshots stay local.

## Used by

`/run-and-report` (Phase 5), `/create-bugs` (comments on existing bugs), reruns of `/run-mcp-PWT-tests`
when a linked bug is retested.
