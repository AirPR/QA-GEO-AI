---
name: analyze-gaps
description: Detects gaps between documented Acceptance Criteria (Jira description + Confluence "Complete Spec" page) and the Test Cases in the epic CSV. Produces a markdown report listing covered ACs, uncovered ACs, orphan TCs and stories without a Confluence link. Trigger with /analyze-gaps [epic_id] [epic_jira_url].
---

<command-name>analyze-gaps</command-name>

# Skill : AC ↔ Test Cases Gap Analysis

## Trigger
/analyze-gaps [epic_id] [epic_jira_url]

Example: `/analyze-gaps 174 https://onclusive.atlassian.net/browse/GEO-174`

## Arguments
- `epic_id` (required): short numeric epic identifier, used to name files (`epic{ID}`)
- `epic_jira_url` (required): full Jira URL of the epic, provided by the user. Used to:
  - Derive the **Atlassian base URL** (e.g. `https://onclusive.atlassian.net`) → clickable links in the report
  - Derive the **Jira epic key** (e.g. `GEO-174`) → root of the JQL `parent = …`
  - Serve as Confluence fallback if the Confluence site shares the same base URL

## Prerequisites
- Operational MCP Atlassian access (`mcp__claude_ai_Atlassian__*`) — auth is handled by OAuth, **no JIRA_* env vars required**
- Epic CSV present: `.claude/Data/output/csv/testcases - epic{ID}.csv`
- Valid Confluence access for "Complete Spec" pages linked in stories

## Sources of Truth
| Source | Origin | Role |
|--------|--------|------|
| User Stories | Jira (parent epic = epic_id) | List of stories to cover |
| Jira Description | `description` field of each story | Contains the "Complete Spec" Confluence link |
| Confluence Page | URL extracted from description | **Canonical source** of Acceptance Criteria (AC1, AC2, ...) |
| Testcases CSV | `output/csv/testcases - epic{ID}.csv` | List of implemented TCs |

## Execution Steps

0. **Parse the provided Jira URL**
   - Extract the **base URL**: everything before `/browse/` (e.g. `https://onclusive.atlassian.net`)
   - Extract the **epic key**: segment after `/browse/` (e.g. `GEO-174`)
   - Store both to build report links and the JQL

1. **List epic User Stories**
   - JQL: `parent = {EPIC_KEY}` (or `"Epic Link" = {EPIC_KEY}` depending on Jira config)
   - Tool: `mcp__claude_ai_Atlassian__searchJiraIssuesUsingJql`
   - Keep `key`, `summary`, `description`, `status`

2. **Per story — extract Confluence link**
   - Parse Jira description (ADF → text) looking for a link after the `Spec complete` marker (case-insensitive, accents tolerated)
   - Accepted patterns:
     - `Spec complete : <url>`
     - `Spec complète : <url>`
     - Line containing `confluence` or `atlassian.net/wiki` at end of description
   - If no link found → mark story `no_confluence_link` (bucket: no-link)
   - If link found but 404/401 on fetch → mark `broken_confluence_link` (bucket: no-link)

3. **Per story — extract ACs from Confluence**
   - Load page via `mcp__claude_ai_Atlassian__getConfluencePage` (format `view` or `storage`)
   - Locate the "Acceptance Criteria" / "AC" section
   - Extract numbered items according to these patterns (priority order):
     - `AC1:`, `AC1 -`, `AC1.` at start of line or bullet
     - Numbering `1.`, `2.`, ... under the AC heading
     - Bullets `- Given ... When ... Then ...` under the AC heading
   - For each AC: keep `id` (AC1, AC2...), `text` (verbatim, not rephrased), `position`
   - If no detectable ACs despite the accessible page → mark `confluence_unparseable` (no-link bucket with note)

4. **Load and index the epic CSV**
   - Read `.claude/Data/output/csv/testcases - epic{ID}.csv` (UTF-8 BOM encoding)
   - Group rows by `tc_id` (CSV may have N rows per TC due to Cucumber unrolling)
   - Index by `qa_parent` (= `story_key`)
   - For each TC, determine the covered AC:
     - **Prefer** an explicit `ac_id` column if present
     - **Otherwise**: look for an `AC\d+` pattern in `test_name`, `description`, or `labels`
     - **Otherwise**: mark `unmapped` → orphan bucket candidate

5. **Compare ACs ↔ TCs per story**
   - For each documented AC: find at least one TC that references it
     - Found → covered bucket (AC → TC[s] link)
     - Not found → uncovered bucket (AC without TC)
   - For each TC without a mapped AC: orphan bucket (orphan TC)
   - If story is `no_confluence_link` or `broken_confluence_link` or `confluence_unparseable`: no-link bucket (and **do not** list its TCs as orphans — analysis is inconclusive for this story)
   - Ambiguous mapping (a TC could cover AC2 or AC3): classify as covered with mention `ambiguous` rather than uncovered or orphan

6. **Generate the markdown report**
   - Path: `.claude/Data/output/gap-reports/gap-report-epic{ID}-YYYYMMDD.md`
   - Locked structure (see template below)
   - Write **nothing elsewhere** (no intermediate file in `processed/`)

## Report Template (locked)

```markdown
# Gap Report — Epic GEO-{ID}

**Run date:** YYYY-MM-DD
**Epic:** [GEO-{ID} — {Title}]({jira_url})

## Global Summary

| Stories | Documented ACs | Covered ACs | Orphan TCs | Stories without link |
|---------|---------------|-------------|------------|---------------------|
| {N} | {M} | {K} ({pct}%) | {L} | {P} |

---

## Story {STORY_KEY} — {Story title}

**Coverage:** {covered}/{total} ACs covered
[Jira]({jira_url}) · [Confluence Spec]({confluence_url})

### ACs covered by TCs
- **AC1** — "{verbatim text}" → `TC-GEO-{ID}-001`, `TC-GEO-{ID}-002`
- **AC2** — "{verbatim text}" → `TC-GEO-{ID}-003` *(ambiguous)*

### ACs not covered in the CSV
- **AC6** — "{verbatim text}"
- **AC7** — "{verbatim text}"

### Orphan TCs in the CSV
- `TC-GEO-{ID}-009` — "{test_name}" (no AC matched)

### Stories without Confluence link or broken link
*(none for this story)*

---

## Story {STORY_KEY_NO_LINK} — {title}

**Coverage:** N/A — incomplete analysis
[Jira]({jira_url}) · No "Complete Spec" link in description

*No AC/TC analysis possible for this story.*
```

## Strict Rules
- **Read-only** on Jira/Confluence/CSV — the agent does not modify any source
- **Verbatim**: copy AC text exactly as found in Confluence, no rephrasing
- **Conservative**: when in doubt about a TC↔AC mapping, prefer orphan rather than a false covered
- **Single output file** per run, named with today's date
- **Pilot epic 174** first — generalise to multi-epic only after format validation

## Expected Output
- File created: `.claude/Data/output/gap-reports/gap-report-epic{ID}-YYYYMMDD.md`
- Terminal summary:
  - `Stories analysed: N`
  - `Documented ACs: M`
  - `Coverage: K/M ({pct}%)`
  - `Orphan TCs: L`
  - `Stories without Confluence link: P`
- Alert if `confluence_unparseable` → ask user to check page format

## Known Limitations
- AC extraction depends on Confluence format consistency; if the format varies significantly across stories, the agent may under-detect — in that case, report in the output rather than inventing.
- TC↔AC mapping without an explicit `ac_id` column is inferential — reliability increases significantly if an `ac_id` column is added to the CSV.
- Semantic drift (modified AC but TC not updated) **is not detected** by this version — bucket to add later if needed.
