# GEO-1513 — Run findings (GEO-R1.3)

**Run:** 2026-10-23, MCP Playwright, staging, organisation QA-GEO, en-GB, analysis Toyota 439acd96 (read only; exports allowed) — `runs/GEO-R1.3_GEO-1513_23102026-2205/MCP-Report-GEO-1513-consolidated.html` (source run `runs/23102026-2205/`).
**Scope:** GEO-1184 (9 TCs: 5 from GEO-152 with the GEO-1208 wording, 4 from the design decisions). GEO-1534 not tested (Code Review, backend only, no AC).
**Result:** 5 PASS / 4 FAIL — the 4 FAILs (TC-GEO-1184-001, 003, 007, 008) are the same label mismatch (F-1); sort order, counts, ties, persistence / reset and exports behave as specified.

Roles: Quentin Reant = PO/PM; Abdenasser Aroukhsiss = dev (GEO-1184 assignee); Moulay AbdelJalal Aitelharch = designer (GEO-1208).

## 1. Findings — Decision column pre-filled (recommendation)

| ID | Finding | Evidence | AC / rule | Decision (recommended) |
|---|---|---|---|---|
| F-1 | The sort menu reads "Coverage" (default) / "Prompts" instead of "Failing articles" / "Most prompts"; the default option description reads "Articles where your brand is not visible or perceived negatively" (design: "Articles missing or negative about your brand"). Reset label after reload = "Coverage". | `TC-GEO-1184-001_step1_given.png`, `TC-GEO-1184-001_step2_when.png` | GEO-1184 AC text: sort option "Most prompts", current sort "failing articles"; design GEO-1208 D-2 | ~~BUG Low~~ **DECIDED 2026-10-27 (user): keep "Coverage" / "Prompts" as built — no bug.** CSV aligned (TC-GEO-1184-001 / 003 / 007 / 008 and the other GEO-1184 TCs, labels only); the 4 label FAILs of 23/10 become PASS on the recorded observations (behaviour was as specified). |
| F-2 | List view: the "Prompts" column header is clickable: under "Coverage" a click switches the sort to "Prompts"; under "Prompts" the order stays but the list drops back to 10 rows. | `TC-GEO-1184-007_extra_header_click_in_coverage.png` | Design GEO-1208 D-6: "header-click sorting not part of this ticket" | **DROPPED 2026-10-27 (user):** header sort accepted as built, no bug. |
| F-3 | One source is listed with the domain "com.cn" (domain parsing). | run 23102026-2205 notes | none in GEO-1513 | **Drop** (out of scope; note for the Target Sources epic) |

## 2. Designer open questions answered by the observed UI (no PO question)

| ID | Question (GEO-1208, 2026-10-20) | Observed on staging (2026-10-23) |
|---|---|---|
| Q-1 | Citations line kept on the card? | No "cited N× in gap answers" line on any card. |
| Q-2 | Does the prompt count follow the filters? | Yes: France only → 30 of 38 perception sources have a lower count; Perplexity only → largus.fr 156 → 87. |
| Q-3 | Panel total vs engine tabs | "All (N)" counts distinct prompts: elperiodico.com All (1) with ChatGPT (1) and Perplexity (1); largus.fr 156 distinct vs 303 engine sum. |
| Q-4 | Export follows the sort? | No: PPTX slide 32 and XLSX identical with "Prompts" and "Coverage" (TC-GEO-1184-009 PASS). |
| OP-7 | Prompts column kept under the default sort? | Yes, the column stays, without the indicator. |

## 3. CSV impact

- If F-1 is created as a bug: TC-GEO-1184-001 / 003 / 007 / 008 stay strict (expected "Failing articles" / "Most prompts").
- If the PO keeps "Coverage" / "Prompts": align the 4 TCs (label only).

## 4. Status posted 2026-10-27

GEO-1184 → **Passed QA**: 9/9 TCs PASS after the F-1 label decision (Coverage / Prompts kept), F-2 dropped. QA comment 868653 with proof qa_GEO-1184_proof_20261027.png (TC-GEO-1184-001_step3_then, attachment 772351).
