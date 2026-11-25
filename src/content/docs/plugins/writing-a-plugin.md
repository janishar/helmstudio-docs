---
title: Write a plugin
description: The plugin.json manifest, its fields per kind, how a plugin starts itself, and a minimal skill.
sidebar:
  order: 4
---

A plugin is a folder whose name is the plugin's name, with a `plugin.json` manifest in it. Put yours in
`~/.helm/plugins/` and turn it on in **Plugins** (see [Plugins](/plugins/)).

## plugin.json

Every plugin has these fields:

| Field | Required | What it is |
|---|---|---|
| `name` | yes | The folder's name: lowercase letters, digits and `-`, starting with a letter, at most 23 characters. |
| `title` | yes | The name people see, up to 60 characters. |
| `version` | yes | A version such as `0.1.0` or `0.2.0-beta.1`. |
| `kind` | yes | `skill`, `assistant-tools` or `model-provider`. |
| `description` | yes | One or two sentences, up to 300 characters. |
| `author` | yes | Who made it. |
| `may_do` | yes | 1 to 8 short lines, in plain words, of what it may do. Shown as **May do**. |
| `source` | no | Where it comes from, such as a repository link. |
| `disclaimer` | no | `{ "text": "…", "link": "https://…" }`, shown in its side panel. |

A manifest that is not valid, or whose `name` is not its folder's, is skipped.

### Skill

| Field | Required | What it is |
|---|---|---|
| `format` | yes | `1`. |
| `when` | yes | When the Assistant should read it, in one line (up to 200 characters). |
| `recipes` | no | Up to 16 suggested settings: `{ "name", "title", "workflow", "params", "note" }`. `params` names each value as `<node>.<param>`, as a run's inputs do. |

A skill has no `url`, `health`, `tools`, `provider` or `run`. Its folder holds `SKILL.md` (the guide) and up to 15
more `.md`, `.txt` or `.json` files.

### Assistant tools

| Field | Required | What it is |
|---|---|---|
| `url` | yes | The address of its program as helmstudio's services reach it, with no path, such as `http://host.docker.internal:8421`. It must be a local address: loopback, a private network, or `host.docker.internal`. |
| `health` | yes | A path that answers 2xx while it runs, such as `/health`. |
| `tools` | yes | 1 to 8 tools: `{ "name", "description", "input", "risk" }`. |
| `run` | no | How it starts itself (below). |
| `start` | no | How to start it by hand, shown while it is **Not running**. |

Each tool has:

- `name`: lowercase, digits and `_`, at most 24 characters.
- `description`: what it does, for the model.
- `input`: a JSON Schema of an object, with no `$ref`.
- `risk`: `{ "uses_gpu", "deletes", "sends_off_machine" }`. If any is `true`, the Assistant asks before each call.

helmstudio calls a tool as `POST <url>/tools/<name>` with `{"input": {…}}` and waits up to 30 seconds. Answer 200
with:

```json
{
  "result": {},
  "line": "What the chat line says",
  "sources": [{ "title": "…", "url": "…" }]
}
```

`result` goes to the model as data. `line` and `sources` (up to 5) are optional. Any other status is a failed call;
send `{"detail": "a short reason"}` and the chat shows it. The plugin never gets the database or a secret.

### Model provider

| Field | Required | What it is |
|---|---|---|
| `url`, `health` | yes | As for Assistant tools. |
| `provider` | yes | `{ "path", "models", "key_hint" }`: an OpenAI-compatible endpoint at `url` + `path` (such as `/v1`), its model names, and where an admin finds its key. Optional: `memory_gb`, `timeout_s`. |
| `run`, `start` | no | As for Assistant tools. |

## Start by itself: run

Add `run` to a plugin with a program, and helmstudio starts it on the Mac while it is on:

```json
"run": { "cmd": ["./run.sh"], "host": "mac" }
```

- `cmd` is the command and its arguments (up to 8), run in the plugin's folder. The first is a file inside the
  folder (`./run.sh`, `bin/start.sh`) or a program on the PATH (`python3`). Never an absolute path or `..`.
- `host` is the machine that runs it. The default is `mac`.
- Its output goes to `~/.helm/logs/<name>.log`.
- On turning off it gets SIGTERM, then SIGKILL after 5 seconds.

A plugin of yours can't replace a built-in one that starts itself: the built-in one stays in use.

## A skill

The smallest skill is a folder `~/.helm/plugins/storyboard/` with two files.

`plugin.json`:

```json
{
  "name": "storyboard",
  "title": "Storyboard",
  "version": "0.1.0",
  "kind": "skill",
  "format": 1,
  "description": "Teaches the Assistant to plan a storyboard: one keyframe per shot, then a review.",
  "author": "You",
  "may_do": ["Teach the Assistant how to plan a storyboard (text it reads)"],
  "when": "Planning a storyboard or keyframes for a short film."
}
```

`SKILL.md`:

```md
# Storyboard

1. Ask for the story in two or three sentences.
2. Write a shot list: number, what happens, length.
3. Make one keyframe per shot and show them side by side.
4. Wait for the user's pick before any video.
```

Then turn it on in **Plugins** and type `@storyboard` in the Assistant's chat.
