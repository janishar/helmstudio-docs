---
title: Pipelines and batches
description: Chain workflows into saved pipelines with review gates and agent nodes, and run a workflow or pipeline over a list while you are away.
sidebar:
  order: 4
---

The **Pipelines** screen is for work that runs without you: a workflow run once per row of a list, or a chain of
steps that hands its takes from one workflow to the next.

The screen lists your saved pipelines (search and filter them) and **Recent batches** (the newest four; **All
batches** shows the rest, with a search field and **All**, **Running**, **Waiting for you**, **Paused**, **Done** and
**Failed** chips). Select a pipeline to see its steps, the models it will load, its memory, and **Run**,
**Open graph** and **Duplicate**. **Rename** and **Delete** are in the **⋯** menu by its title.

## Pipelines

A pipeline is a saved graph of nodes:

| Node | What it does |
|---|---|
| **Inputs** | The batch's columns: one value per row. |
| **Step** | Runs a workflow and returns its takes. |
| **Gate** | Stops the row for you to pick a take. |
| **Judge** | A model checks takes against a checklist, keeps the best, and says why. |
| **Write** | Writes text: prompts from a brief, a shot list from a script, a prompt rewritten from a judge's reasons. |
| **Decide** | Answers a question and routes the row along one of its outgoing edges. |
| **Agent** | A model with tools that can search the gallery, read and write memory, add rows and route. It can be the pipeline's director. |
| **Memory** | Reads past picks and notes, or writes notes for the next batches. |
| **Output** | Names the collection the takes go to. |

Edges can branch and loop. Every loop has a cap, so a row cannot retry for ever.

### Make a pipeline

- Choose **New pipeline**, then add nodes on the graph. Drag from a port to connect two nodes, or drop a wire on
  empty canvas to add a node there. Press **A**, double-click or right-click to add a node; **Backspace** deletes.
- Or, in the Gallery, select a take and choose **Save as pipeline**: its lineage becomes a chain of steps.

Select a node to edit its settings in the side panel. Edits save as you go; **⌘Z** and **⇧⌘Z** undo and redo.

A pipeline also has a **Studio** view: its steps as cards, run one at a time like Create, with the take you pick
from one step going into the next.

### Agent nodes

**Judge.** Write the checklist in plain words. Set how many takes to **Keep**, what happens **If none pass** (retry
up to a cap, go to another node, or fail the row), and its **Trust**:

- **Suggest**: the row stops like a gate, with the judge's pick pre-selected and its reasons shown. You confirm each
  pick. Start here.
- **Auto**: the judge picks without stopping. Switch to it once you trust it.

**Test on takes** checks the saved judge against 1 to 8 takes you choose, without starting a batch.

**Write** and **Decide** take an instruction or a question. A write can rewrite the row's prompt; a decide routes to
one of the nodes it is wired to.

On **Runs on · Auto**, a write, decide or agent node uses the default an admin sets in
[Hub › In pipelines](/studio/hub/#default-model): the local text model unless changed. A judge on Auto keeps its
family's vision model. A node can name its own model instead, from the providers in
[Hub › Providers](/studio/hub/#providers). A pipeline that names a remote model must have its **Remote calls** turned
on; Submit shows exactly what leaves the machine.

### Memory

Each pipeline keeps a memory:

- **Judge examples**: takes you kept or rejected at a judge, with your note. This is how a judge learns your taste.
- **Notes**: short facts a memory or agent node wrote, or that you typed.

Open it with **Open memory**. Each item says where it came from and can be deleted. A batch reads the memory as it
was when the batch started; changes count from the next batch.

## Batches

A batch runs one workflow or one pipeline once per row.

To start one:

1. Choose **New batch**, or **Run** on a pipeline.
2. Pick a **Workflow** or a **Pipeline**. For a workflow, set its base settings as on Create.
3. Choose where the rows come from:
   - **Lines**: one value per line.
   - **CSV table**: paste or load a CSV, one column per input.
   - **Grid**: every combination of the values you list for a few settings.
4. Set **Seeds per row** and, if you want, the **First seed** (empty is random).
5. Press **Submit**. A batch has at most 500 rows.

### Follow a batch

The batch view shows its state and counts, and one line per row with a cell for each node the row reached. Open a
cell to see its takes; a judge's cell shows its verdict and the first check that failed.

- **Pause**, **Resume** and **Stop** control the whole batch.
- **Retry failed** runs the failed rows again.
- **Run again** starts a new batch from the same rows. For a pipeline, choose **Same decisions** or **Decide again**
  (every judge, write and decide asks its model again).
- **Open in gallery** shows a row's takes in the Gallery.
- Click a row's number to open its execution view: the graph as that row ran it, each step's runs and takes, and
  each decision with its reasons.

## Review gates

When rows stop at a gate or a Suggest-mode judge, **Pick** opens the review grid.

- Pick one take to keep for each row, in any order.
- Or keep none: the row then does what the gate says (try again, move on, or fail).
- At a judge, the judge's pick is pre-selected with its reasons. Press **A** to agree, and add a note if you like. The
  pick and note become a judge example.

Keys: the arrow keys move between takes, **Space** picks, **Enter** sends the pick, **R** rejects all, **F** opens the
take full screen.

## The director chat

A pipeline with a director agent has a chat. Open it with **Chat with director** on the batch.

The director wakes when you send a message or when a row finishes. You can ask it questions, or tell it which rows to
add or change. Every row it adds or changes goes through the same checks as Submit; a rejected row is answered in the
chat with the reason.

The director chat is yours alone: the in-app [Assistant](/studio/assistant/) can open it but never writes to it.
