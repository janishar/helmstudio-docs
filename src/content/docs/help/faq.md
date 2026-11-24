---
title: FAQ
description: Short answers about privacy, models, Macs and NVIDIA, users, and licences.
sidebar:
  order: 2
---

## Does anything leave my machines?

Images, video and sound are always made on your own hosts. Model weights stay on each host's disk.

The only calls that leave are to **remote model providers** (such as OpenAI, Anthropic or DeepSeek), and only when an
admin turns them on and adds a provider in [Admin](/studio/admin/) › Model providers. They power text jobs only: the
[Assistant](/studio/assistant/), pipeline agents and session names. They never make images, video or sound. On the
local and production stacks they are off until `REMOTE_MODELS=on` is set in `deploy/.env`.

Model downloads come from Hugging Face, when an admin starts one.

## Which models does it run?

Images: Qwen Image 2.1 and MiniMax H3 Image. Video with sound: LTX-2.5 and MiniMax H3. Voice: Qwen3-TTS and ZONOS3.
Text answers about takes: the Ask workflows. Each has a page under [Models](/models/).

## Do I need a Mac, an NVIDIA machine, or both?

Either works, and you can mix them. A Mac with Apple Silicon runs every family. An NVIDIA host runs them too, with
smaller community fp8 and int8 variants. A few variants run on one kind only: LTX-2.5 Distilled and Dev, MiniMax H3
Base video and Qwen3.8 27B are Mac-only; every fp8 and int8 community variant is NVIDIA-only. See
[Hosts and runners](/start/hosts/).

## How much memory do I need?

It depends on the model and the settings. Generate shows each run's estimated peak memory before it starts, and a run
that fits on no host fails at once with the reason. MiniMax H3 Image, for example, peaks at about 39 GB on a Mac.
Each model's page lists its needs.

## Can several people use one studio?

Yes. An admin creates every account in [Admin](/studio/admin/) › Users; there is no public sign-up. Each person sees
only their own takes, sessions, pipelines and timelines.

## Can two runs happen at once?

Each host does one run at a time. With more hosts, more runs go at once. Other runs wait in a queue.

## Who accepts the model licences?

The admin, on each download. The download card shows the licence, and it must be accepted before the download starts.
Some licences are non-commercial or limit where a model may be used, so read them.

## What licence is helmstudio under?

Apache-2.0. Model weights are not part of helmstudio and keep their own licences.

## Can I use it without the web app?

Yes. The [helm CLI](/mcp/helm-cli/) runs workflows, batches and timeline edits from a terminal, and
[helm mcp](/mcp/) gives Claude and other agents the same tools.

## Is there a one-click install?

The [Mac app](/start/mac-app/) runs the whole studio in one window. It is a preview.
