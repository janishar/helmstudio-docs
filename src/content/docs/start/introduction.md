---
title: What is helmstudio
description: A self-hosted studio for images, video and sound that runs open models on your own machines.
sidebar:
  order: 1
---

helmstudio is a studio for making images, video and sound with open models. It runs on your own machines: Macs with
Apple Silicon and NVIDIA hosts. Nothing you make leaves them. Install it on a Mac with the app, or on Windows and
Linux with Docker.

It is self-hosted and multi-user. An admin runs it and adds accounts. Each person sees only their own work.

## What you can make

| Media | Model families |
|---|---|
| Images | Qwen Image 2.1, MiniMax H3 Image |
| Video with sound | LTX-2.5, MiniMax H3 |
| Voice | Qwen3-TTS, ZONOS3 |
| Text answers about takes | Qwen3.8 and Qwen3-VL "Ask" workflows |

Each family has its own page under [Models](/models/).

## The ideas

**Workflow.** A small graph of typed steps for one model family, such as "Qwen Image" or "LTX-2.5". You can see it
two ways: as a **Studio** (a form) or as a **Graph** (the same document on a node canvas). Editing one edits the other.

**Take.** One output: an image, a clip or a sound. It keeps the exact settings and inputs that made it, so you can
repeat it or build on it.

**Session.** A project on Create: your prompt history and its takes. Sessions name themselves; you can rename them.

**Gallery.** Where every take lands. You search, star and reuse takes from here.

**Pipeline.** A saved graph of workflow steps, review gates and agent nodes. A **batch** runs a workflow or pipeline
once per row of a list, while you are away.

**Host.** A machine with runners. A Mac runs MLX, PyTorch and native runners. An NVIDIA host runs PyTorch and native
runners. Each host does one run at a time; other runs wait in a queue.

**Elements and Looks.** Elements are your characters, places and props, called by name with `@`. Looks are styles for
film, camera, colour and lighting, set once and reused.

## The screens

The rail on the left holds **Create**, **Pipelines**, **Gallery**, **Timeline** and **Models**. Admins also see
**Hub**, for everything AI (the Assistant, the model pipelines use, providers and plugins), and **System**, for
users, hosts and API keys. The **Assistant** and **Settings** come last. See [Hub](/studio/hub/) and
[System](/studio/system/).

## How it is built

The studio is a set of small services behind one gateway, plus model runners that run natively on each machine so
they can use its GPU. See [Architecture](/reference/architecture/) for the details.

## Next

- [Install and run](/start/install/) the studio on a Mac, Windows or Linux.
- Take a tour of [Create](/studio/create/), the main screen.
