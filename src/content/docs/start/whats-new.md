---
title: What's new in 0.1.0-alpha.4
description: The latest release, with Hub and System in the rail, a one-step Assistant setup, and install on Windows and Linux with Docker.
sidebar:
  label: What's new
  order: 6
---

0.1.0-alpha.4 is out, released on 25 November 2026 as a pre-release. Get it from
[GitHub releases](https://github.com/janishar/helmstudio/releases). On a Mac from 0.1.0-alpha.2 on, choose
**Check for updates…** in the app's menu. New installs: [Install and run](/start/install/).

## Hub and System

- Admins get two new items in the rail. [Hub](/studio/hub/) holds everything AI: **Assistant**, **In pipelines**,
  **Providers** and **Plugins**. [System](/studio/system/) holds **Users**, **Hosts** and **API keys**.
- The old **Admin** and **Plugins** items are gone. Their pages now live in Hub and System.
- **Hub › In pipelines** sets the model a pipeline's AI step uses on **Auto**: a local model, a provider's model, or
  the same as the Assistant.

## Assistant

- It opens from the **Assistant** drawer, for everyone.
- Before it is set up, the drawer says so. An admin gets **Set up**; anyone else is asked to have their admin set it
  up. For an admin it opens this way once, on the first launch.
- Setup is one flow: pick who answers, the key, the model.
- On the Mac, [Your Claude subscription](/plugins/#your-claude-subscription) no longer needs a key pasted.

More in [Assistant](/studio/assistant/).

## Install on Windows and Linux

- Each release has one `compose.yml` for Docker. The first start makes the secrets and your admin account; no
  install script. See [Install and run](/start/install/#windows-and-linux-with-docker).
- The images run on Intel/AMD and ARM machines. `--profile nvidia` adds a GPU runner for an NVIDIA card.
- Windows is untested so far.
- The Mac app works as before.

## Create

- The **Image**, **Video** and **Audio** switch is now a panel of tabs, and keeps one size when you switch.

## Earlier releases

- **0.1.0-alpha.3:** an optional plugin to use your own Claude plan on the Mac, off by default.
- **0.1.0-alpha.2:** a much stronger [Assistant](/studio/assistant/) (full screen or a small bar, `@` to hand it
  takes, it sees images, **Auto mode**, shot lists that stick), [plugins](/plugins/) with
  [Web search](/plugins/web-search/), [skills](/plugins/skills/) and [Media tools](/plugins/media-tools/), render
  times on every take, a faster Gallery, and a Mac app that updates itself.

Every change is in the [changelog](https://github.com/janishar/helmstudio/blob/v0.1.0-alpha.4/CHANGELOG.md).
