---
title: What's new in 0.1.0-alpha.5
description: The latest release, with a movable Assistant, settings popups in Create, Timeline clones and helmstudio's own right-click menus.
sidebar:
  label: What's new
  order: 6
---

0.1.0-alpha.5 is out, released on 26 November 2026 as a pre-release. Get it from
[GitHub releases](https://github.com/janishar/helmstudio/releases). On a Mac from 0.1.0-alpha.2 on, choose
**Check for updates…** in the app's menu. New installs: [Install and run](/start/install/).

## Assistant

- Move it. Drag the drawer's header or bar to float it anywhere on the screen; **Dock** (or a double-click) puts it
  back at the right edge. It remembers the place in this browser.
- **Close** stays on screen while a chip shows. A page's side form minimizes a docked drawer.

More in [Assistant](/studio/assistant/#move-it).

## Create

- Each setting chip under the prompt (model · precision, **Run on**, size, length · fps, audio) opens a small popup
  for just that setting.
- The sliders button opens all the settings on the right. They are open by default.
- Create offers only the variants that a host online now has.

## Timeline

- A **Clone** button in the Sequences dialog copies a sequence with all its clips, markers, cast and look. The copy
  uses the same takes.
- A sequence with no name is named from its shots' prompts. A name you type is kept.
- The sliders button in the tracks tool bar opens and closes the side panel.
- **New shot** has a **×**, and **+ New sequence** in the Sequences dialog works again.

## Right-click menus

- helmstudio's own right-click menus now work across the app: Timeline, Gallery, Create, Graph and Pipelines,
  Assistant chat, Models, the LoRA, voice and element libraries, and the Hub and System lists, with shortcuts shown.
- Text fields get **Cut**, **Copy**, **Paste**, **Select all** and **Insert @…**.
- Shift + right-click opens the browser's menu instead.

## Hosts and the Mac app

- In [System](/studio/system/#hosts) › **Hosts**, the memory budget is **Automatic** or **Custom**. Automatic uses the
  Mac's GPU memory limit when one is set.
- The Mac app window never scrolls; only the panels inside it do.

## Earlier releases

- **0.1.0-alpha.4:** [Hub](/studio/hub/) and [System](/studio/system/) in the rail for admins, the
  [Assistant](/studio/assistant/) for everyone with a one-step setup, a default model for pipelines (**Hub › In
  pipelines**), your Claude subscription with no key to paste, and install on Windows and Linux with Docker (one
  `compose.yml` per release; Windows is untested).
- **0.1.0-alpha.3:** an optional plugin to use your own Claude plan on the Mac, off by default.
- **0.1.0-alpha.2:** a much stronger [Assistant](/studio/assistant/) (full screen or a small bar, `@` to hand it
  takes, it sees images, **Auto mode**, shot lists that stick), [plugins](/plugins/) with
  [Web search](/plugins/web-search/), [skills](/plugins/skills/) and [Media tools](/plugins/media-tools/), render
  times on every take, a faster Gallery, and a Mac app that updates itself.

Every change is in the [changelog](https://github.com/janishar/helmstudio/blob/v0.1.0-alpha.5/CHANGELOG.md).
