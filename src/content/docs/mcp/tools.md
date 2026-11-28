---
title: MCP tools
description: Every tool helm mcp offers, by group, with what each one does.
sidebar:
  order: 2
---

`helm mcp` offers 43 tools and two resources. **Read** tools never change anything. **Write** tools may ask first,
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
| `get_take` | Read | One take with a small thumbnail the agent can see (a video as a 12-frame picture), what was made from it, where it can be used, and the decisions about it. A video or audio take has its facts: length, loudness, peak, silence at the ends, an abrupt end and scene cuts. |
| `listen` | Write | Asks the local listen model one question about a video or audio take's sound and picture, with a transcript. Says which model answered. See [Qwen Omni](/models/qwen-omni/). |
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
| `edit_timeline` | Destructive | Applies edits (split, trim, move, remove, lift, replace, set, add, insert and more) in order, all or nothing, as one undo step. `set` takes a clip's fades and crossfade; `ducking` sets Duck music. |
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

## Magic boards

The same board tools the in-app [Assistant](/studio/assistant/#on-a-magic-board) has. Over MCP there is no card: a
write does what it says when it is called, and your client's own ask is the Yes.

| Tool | Kind | What it does |
|---|---|---|
| `list_boards` | Read | Your [Magic](/studio/magic/) boards, newest first; `q` finds them by name. |
| `show_board` | Read | One board for an agent: its revision, lanes, every block with its request, status, takes and level, the assets with their views and voices, and the estimate for what is not done. |
| `magic_kinds` | Read | Each kind's models: the fields each fills, the ones greyed and why, and its Advanced settings. |
| `try_board_edit` | Read | Tries edits without saving: the diff and warnings, or the edit that fails and why. |
| `plan_board` | Read | What running blocks would cost: GPU seconds per block, lane and in all, the machine and the run order. |
| `board_frame` | Read | What each lane shows at a time: the block, its take and the second into it. |
| `create_board` | Write | A new empty board, with its name, size and frame rate. |
| `run_blocks` | Write | Runs named blocks, a lane's, or every block not done. It plans first and answers the plan with the runs. |
| `cancel_runs` | Write | Stops a board's runs still going: of named blocks, a lane, named runs, or all. A queued run drops at once, a running one at its next safe point. |
| `make_views` | Write | One image run per view of an asset ("Front", "Side", or your own name), each joining its sheet. Takes a size, a variant and a precision; by default Qwen Image on Turbo at about 1K. |
| `design_voice` | Write | Designs a character's voice from words and starts one run saying a line. |
| `save_voice` | Write | Keeps the take you picked as that voice's clip and sets it on the asset. Needs `consent: true`: you have the right to use this voice. |
| `send_to_timeline` | Write | The board as a new sequence; the answer says what went and what it bakes. |
| `edit_board` | Destructive | Applies edits in order, all or nothing, as one undo step. A block's `gain_db` sets its level, `fade_in` and `fade_out` its fades; a `crossfade` join blends two sound blocks; `ducking` sets Duck music. |
| `restore_board` | Destructive | Brings back a kept revision as a new one. |

### Building a board

1. `create_board`, then `show_board` for its ids and revision.
2. `try_board_edit`, then `edit_board` with the same edits and the same `base_revision`.
3. `plan_board` to see the cost, then `run_blocks`. Over MCP nothing asks before a run, so plan first.
4. `send_to_timeline` when it plays right.

Runs add their takes to the board as they finish. An edit made on an older revision still applies when only new
takes came in since; if anything else changed, it is refused with the new revision number: read the board again.

## Resources

| Resource | What it holds |
|---|---|
| `helm://take/{id}` | A take: its metadata and thumbnail |
| `helm://workflow/{id}` | A workflow and its params, as JSON |
