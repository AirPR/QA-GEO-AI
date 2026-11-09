---
name: extract-figma-screen
description: Extracts screens from a Figma file via the REST API and organises them into figmaScreens/. Trigger before test case CSV generation.
---

<command-name>extract-figma-screen</command-name>

# Skill : Figma Screen Extraction

## Trigger
/extract-figma-screen --url {figma_url}

## Prerequisites
- Environment variable `FIGMA_TOKEN` defined in `.env`
- Valid Figma URL (format: `https://www.figma.com/design/{file_id}/...`)

## Parameters
- `--url`   : Figma file URL (required)
- `--scale` : Image resolution, default `2` (optional)
- `--format`: Export format, default `png` (optional)
- `--nodes` : Comma-separated node ids (`17435-4056` or `17435:4056`): export only those nodes and their direct child
  frames (optional; default = the `node-id` of the URL if present, else the whole file)
- `--section`: Output section name (optional), e.g. `GEO-1226_Review_pages` → `figmaScreens/{NN}_GEO-1226_Review_pages/`

## Execution Steps

1. Read `FIGMA_TOKEN` from `.env`
2. Extract the `file_id` from the Figma URL
3. Call `GET /v1/files/{file_id}` to retrieve the file structure — with `--nodes` (or a `node-id` in the URL) call
   `GET /v1/files/{file_id}/nodes?ids={ids}` instead and keep those nodes plus their direct child frames (skip `N0TE` frames)
4. List all frames with their `node_id` and `name`
5. Create the `figmaScreens/` folder structure organised by section (`--section` → one folder `{NN}_{section}` with the
   next free number; frames already exported with the same node id and file `lastModified` are kept)
6. Export frames as PNG in **batches of 3 maximum** via `GET /v1/images/{file_id}?ids=...`
7. Download and save each PNG in the correct subfolder
8. Display the final report

## Expected Output
```
figmaScreens/
├── 01_{Section}/
│   └── 01_{Frame}.png
├── 02_{Section}/
│   ├── 01_{Frame}.png
│   └── 02_{Frame}.png
└── ...
```
- Summary: X screens extracted, Y sections created, and the list node id → PNG path → frame name (used by the caller)
- Output folder path

## Agent Used
`extract-figma-screen-agent`
