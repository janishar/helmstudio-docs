---
title: The helm CLI
description: Every command of helm, the helmstudio command-line client.
sidebar:
  order: 3
---

`helm` is the studio's command-line client. It runs workflows, follows them and saves the outputs, and it manages
your takes, timelines, workflows, pipelines and library. `helm mcp` turns it into an [MCP server](/mcp/).

Build it from the repository:

```sh
make -C cli build        # makes cli/bin/helm
```

The [Mac app](/start/mac-app/) ships it at `/Applications/helmstudio.app/Contents/Resources/bin/helm`.

`helm help` prints every command. Exit codes: 0 ok, 1 failed, 2 wrong usage.

## Sign in

| Command | What it does |
|---|---|
| `helm login --url <base> --email <email> [--api-key-file <path>]` | Signs in. It asks for the password, or reads `HELM_PASSWORD`. |
| `helm whoami` | Prints your account. |
| `helm logout` | Signs out. |

The client's API key comes from `HELM_API_KEY`, or from the file given to `helm login`. The sign-in is kept in
`~/.config/helm/config.json`; the key itself is never stored there. `helm` keeps one address, so it talks to one stack
at a time.

## Runs

```sh
helm run <workflow_id> [-p node.param=value ...] [-o <dir>]
```

| Flag | What it does |
|---|---|
| `-p node.param=value` | Sets a param. Repeat for each one. |
| `-o`, `--out <dir>` | Saves each output as `<dir>/<run_id>_<n>.<ext>`. |
| `--session <id\|new>` | The session the run belongs to. |
| `--host <host>` | Runs on that host only, like Run on. Fails at once if the host cannot take it now. |
| `--lora <id>:<strength>` | Fills the workflow's LoRA rows, in order. Repeatable. |
| `--look <id>` | Runs with a look. Repeatable. |
| `--image <take\|file>` | A video's first frame. A file is uploaded first. |
| `--keyframe <frame>:<take\|file>` | A keyframe. Repeatable. |
| `--duration <frames>\|auto` | A video's length. `auto` lets the model pick. |
| `--media node.param=<take>[:in:out]` | A video or audio take as a media input, optionally a part of it. |
| `--span start:end` | The range to regenerate, for a Retake, in the take's seconds. |

An image input takes a comma list of take ids and `@files`, for example `-p encode.refs=@a.png,<take_id>`. A prompt
may name your elements as `@handle`; write `@@` for a literal `@`.

## Batches

| Command | What it does |
|---|---|
| `helm batch <workflow_id> (--lines <file\|-> [--param node.param] \| --csv <file> \| --grid node.param=a,b,c ...)` | Runs a workflow once per row. Also takes `-p`, `--seeds N`, `--session <id>`, `--title <t>` and `--look <id>`. Exits 1 if any row failed. |
| `helm batch --pipeline <pipeline_id> (--lines ... \| --csv ... \| --grid inputs.name=a,b ...)` | Runs a pipeline once per row. Its inputs are the columns. |
| `helm batch review <batch_id>` | The rows waiting at a gate, with their candidate takes. |
| `helm batch pick <batch_id> <row> (<take_id>... \| --reject) [--note text]` | Answers the gate a row waits at. |
| `helm batch decisions <batch_id> [row]` | The judge, write and decide decisions. |
| `helm batch chat <batch_id> [text ...]` | The director's chat. With a text, says it. |
| `helm batches [--limit n] [--cursor c]` | Your batches. |
| `helm batch-stop <batch_id>` | Stops a batch. |

## Takes

| Command | What it does |
|---|---|
| `helm takes [--kind image\|video\|audio] [--source create\|upload] [--starred] [--session <id>] [--q <text>] [--limit n] [--cursor c]` | Lists and searches your takes. |
| `helm upload <file>` | Uploads a PNG, JPEG or WebP image into the gallery. |
| `helm take uses <take_id>` | Each workflow the take fits, with its `helm run` command filled in. |
| `helm use [--param node.param] <take_id> <workflow_id>` | Prints the `helm run` command with the take as an input. |

## Timelines

| Command | What it does |
|---|---|
| `helm timelines` | Your sequences. |
| `helm timeline show <id> [--agent]` | A sequence's tracks and clips. `--agent` prints the agent view as JSON. |
| `helm timeline edit <id> -f ops.json [--revision n] [--dry-run]` | Applies named edits in order, all or nothing. `-f -` reads stdin. |
| `helm timeline revisions <id> [--before n] [--limit k]` | The kept revisions, newest first. |
| `helm timeline restore <id> --to n --revision n` | Brings back a kept revision as a new one. |
| `helm timeline add <id> [--track A2] <take_id>...` | Appends takes in order. |
| `helm timeline export <id> [-o file.mp4] [--plan] [--host h]` | Exports and saves the MP4. `--plan` only shows whether it copies or re-encodes, and why. |

## Workflows and pipelines

| Command | What it does |
|---|---|
| `helm workflows [--media image\|video]` | Templates, then your own. |
| `helm workflow get <id>` | Prints a workflow as a file. |
| `helm workflow save file.json` | Saves yours, or creates one. Prints any problems. |
| `helm workflow validate file.json` | Prints every problem. Exits 1 if it cannot run. |
| `helm workflow copy <id> [--title t]` | Copies a template or one of yours. |
| `helm workflow rm <id>` | Deletes one of yours. |
| `helm pipelines` | Your pipelines. |
| `helm pipeline get\|save\|validate\|copy\|rm ...` | As `helm workflow`, for a pipeline. |
| `helm memory list --pipeline <id> [--kind judge_example\|note]` | A pipeline's memory. |
| `helm memory add --pipeline <id> [--key k] <text>` | Adds a note its next batches read. |
| `helm memory rm <item_id>` | Removes a memory item. |

## Library

| Command | What it does |
|---|---|
| `helm elements [--q prefix] [--group character\|location\|prop]` | Your elements. |
| `helm element get\|save\|rm ...` | An element as a file; save or delete it. |
| `helm looks [--group film\|camera\|colour\|lighting] [--source mine\|starter] [--workflow id]` | Looks. |
| `helm look get\|save\|rm ...` | A look as a file; save or delete it. |
| `helm loras [--source shared\|mine] [--family f] [--q words]` | LoRAs you can use. |
| `helm lora upload <file.safetensors>` | Uploads your own LoRA. |
| `helm lora rm <id>` | Deletes one of your LoRAs. |

## Hosts and models

| Command | What it does |
|---|---|
| `helm hosts` | Each host's memory, device, runners and what each holds. |
| `helm models` | Every model variant: precisions, size and state per host. |

## Admin

These need an admin account.

| Command | What it does |
|---|---|
| `helm hosts pin\|unpin <host> <env> <component> <model> <variant> <precision>` | Keeps a model part loaded, or stops keeping it. |
| `helm hosts unload <host> (--all \| --cached <env> \| <env> <component> <model> <variant> <precision>)` | Unloads from a host. |
| `helm hosts after-run <host> unload\|keep_warm\|keep_pinned [--idle-min n] [--reserve-gb x]` | Sets what the host does after its queue drains. |
| `helm model download <model> --host <h> [--variant v] [--accept-licence]` | Queues a download to a host. |
| `helm model pick --host <h> [--all-missing]` | Lists the host's variants and asks which to download, and asks for each licence. |
| `helm model rm <model> --host <h> [--variant v]` | Deletes a model's files on a host. |
| `helm providers` | Local servers and remote providers, and whether remote models are on. |
| `helm providers set <name> file.json \| rm <name> \| test <name> [--model m]` | Sets, removes or tests a provider. |
| `helm keys list \| new <client> \| revoke <id>` | Application API keys. A new key is shown once. |
| `helm import <path> --user <email> [--dry-run] [--limit n]` | Imports an older helmstudio gallery into a user's gallery. |

## MCP

| Command | What it does |
|---|---|
| `helm mcp` | Runs an MCP server over stdio. See [Use helmstudio from Claude](/mcp/). |
