---
title: MCP tools
description: Every tool helm mcp offers, by group, with what each one does.
sidebar:
  order: 2
---

`helm mcp` offers 27 tools and two resources. **Read** tools never change anything. **Write** tools may ask first,
depending on your client. **Destructive** tools are marked so your client can ask before each call. See
[Use helmstudio from Claude](/mcp/) to set it up.

Inputs such as images and clips are passed as **take ids**. `upload` turns a local image into a take.

## Workflows and runs

| Tool | Kind | What it does |
|---|---|---|
| `list_workflows` | Read | The workflows you can run (templates and your own), with their params. |
| `get_workflow` | Read | One workflow and its node schemas: params, types, ranges and defaults. |
| `plan_run` | Read | What a run would cost before it starts: the host, its planned memory, or why it cannot run. |
| `run_workflow` | Write | Starts a run and returns at once. At most 4 of this server's runs wait or run at a time. |
| `wait_run` | Read | Waits for a run to end, up to 10 minutes, with progress. Returns its take ids; `out_dir` also saves the files. |
| `cancel_run` | Write | Cancels a queued or running run. |
| `delete_run` | Destructive | Deletes a finished run. Its takes stay in the gallery. Cannot be undone. |
| `delete_session` | Destructive | Deletes a session with nothing running. Its takes stay. Cannot be undone. |

## Takes and library

| Tool | Kind | What it does |
|---|---|---|
| `search_takes` | Read | Searches your gallery: words in the title, prompt, @elements, workflow or model. |
| `get_take` | Read | One take with a small thumbnail the agent can see, what was made from it, where it can be used, and the decisions about it. |
| `upload` | Write | Uploads a local PNG, JPEG or WebP image as a take, to use as an input. |
| `delete_take` | Destructive | Deletes a take from your gallery. Cannot be undone. |
| `list_library` | Read | Your elements, looks, voices and LoRAs. With a pipeline id, that pipeline's memory. |

## Batches

| Tool | Kind | What it does |
|---|---|---|
| `start_batch` | Write | Runs one workflow or one of your pipelines over rows (lines, a table or a grid). Returns at once. |
| `batch_status` | Read | Your batches; with a batch id, its rows, review and director chat; with a row, its steps and decisions. |
| `review_batch` | Read | The rows waiting at a review gate or a Suggest judge, with their candidate takes and the judge's suggestion. |
| `pick` | Write | Answers the gate a row waits at: keep some takes, or reject them all. A note on a judge becomes an example in its memory. |
| `batch_chat` | Write | Says something to a pipeline batch's director. It answers in the chat. |

## Timeline

| Tool | Kind | What it does |
|---|---|---|
| `list_timelines` | Read | Your sequences. |
| `show_timeline` | Read | One sequence for an agent: its revision, tracks, every clip flat (ids, times in seconds and frames), and its exports. |
| `timeline_frame` | Read | The picture at a time, as an image. |
| `try_timeline_edit` | Read | Tries edits without saving: the result it would have, or the op that fails and why. |
| `edit_timeline` | Destructive | Applies edits (split, trim, move, remove, lift, replace, set, add, insert and more) in order, all or nothing, as one undo step. |
| `timeline_revisions` | Read | A sequence's history (the last 100 revisions: who, via what, which ops), or one revision. |
| `restore_timeline` | Destructive | Brings back a kept revision as a new one. |
| `add_to_timeline` | Write | Appends takes in order (V1, or A2 to A9 for sound). Without a timeline id, makes a new sequence. |
| `export_timeline` | Write | Exports the current revision as an MP4 take. `out` waits and saves the file; `plan_only` returns only the plan. |

### Editing a sequence

1. `show_timeline` for the clip ids and the revision.
2. `try_timeline_edit` to check the ops.
3. `edit_timeline` with the same ops and the same `base_revision`.

If someone else changed the sequence in between, the edit is refused with the new revision number: read it again and
plan again. Put several ops in one call; the last 100 revisions are kept. `restore_timeline` goes back.

## Resources

| Resource | What it holds |
|---|---|
| `helm://take/{id}` | A take: its metadata and thumbnail |
| `helm://workflow/{id}` | A workflow and its params, as JSON |
