---
title: Qwen Omni (listen)
description: The local model the Assistant listens with. It hears a take's sound, watches its picture and answers one question, with a transcript of the speech.
sidebar:
  order: 12
---

Qwen Omni is the model behind the Assistant's **listen** step. Ask it one question about a video or audio take, such
as "Does the music end abruptly?" or "Is the line clear?". It hears the sound, watches the picture, and answers in
words. Qwen3-ASR 1.7B writes down the speech beside it.

- **Media:** a video or audio take in, text out. Up to the first 120 s of a take.
- **Runtime:** MLX, on a Mac.
- **Licence:** Qwen3-Omni under the Apache License 2.0. The smaller Qwen2.5-Omni 3B is under the Qwen Research License
  Agreement (accept it before the download).

## Variants

| Variant | Size | Notes |
|---|---|---|
| **Q8_0** (Qwen3-Omni 30B) | About 38 GB with the speech model | The one it uses. About a minute to load the first time, then a few seconds per answer while it stays loaded. |
| **3B Q8_0** (Qwen2.5-Omni 3B) | About 10 GB with the speech model | The fallback, when the 30B cannot run (its drive is unplugged, it is not downloaded, or there is no room). Quick, but terser and less sure. |

When the smaller model answers, the reply says so and why, for example "Answered by the smaller listen model
(Qwen2.5-Omni-3B): Qwen3-Omni is not on this Mac."

## When it can't listen

The Assistant offers to listen only while it can. When neither model can run, it says why in plain words: no runner
that can listen is on, the drive that holds the model is not connected, or the model is not on this Mac (download it
in [Models](/studio/models/)).

## Used by

- The Assistant's **listen** step. See [Watch and listen](/studio/assistant/#watch-and-listen).
- `listen` in [helm mcp](/mcp/tools/#takes-and-library).

Exact numbers, such as a take's length, loudness and silence at its ends, come from the take's facts, not from this
model. See [Watch and listen](/studio/assistant/#watch-and-listen).
