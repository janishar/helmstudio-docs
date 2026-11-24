---
title: Ask
description: Local vision-language models that answer questions about takes, for pipelines and the Assistant.
sidebar:
  order: 7
---

The **Ask** workflows answer one question about one or more takes, in text. Pipeline agent nodes (judge, write and
decide) and the Assistant use them to look at images and clips. They run locally, on your own hosts.

| Workflow | Model | Runtime | Where |
|---|---|---|---|
| Ask Qwen3.8 27B | Qwen3.8 27B, stored 4-bit | MLX | Mac only |
| Ask Qwen Image (Qwen3-VL 8B) | Qwen Image 2.1's own text encoder | PyTorch | Mac or NVIDIA |

**Qwen3.8 27B** is the local model for pipeline judge, write and decide nodes. It is its own download, under the
Apache License 2.0.

**Qwen3-VL 8B** comes with [Qwen Image 2.1](/models/qwen-image/). When Qwen Image is already loaded on a host, asking
it loads nothing more.

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| System | up to 4000 characters | empty | The system message. |
| Prompt | up to 32768 characters | empty | The question. Pipelines fill it from a template. |
| Takes | 0 to 8 | none | Image or video takes, in order. Each is sent as a thumbnail; a video as 3 keyframes. |
| Answer schema | a JSON schema, up to 16384 characters | empty | The answer must match it. Empty means plain text. |
| Max tokens | 16 to 4096 | 800 | The longest answer. |

Answers use temperature 0 with thinking off, so they are steady from one run to the next. When an
answer does not match the schema, the model gets one more try in the same run.

## Remote and server models

Text jobs, such as the Assistant, pipeline agents and session names, can also use a model provider: a local LLM
server or a remote API. An admin sets these in Admin › Model providers. They only make text; they never make images,
video or sound. See [Admin](/studio/admin/).
