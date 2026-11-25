---
title: What's new in 0.1.0-alpha.2
description: The coming release, with a stronger Assistant, plugins and skills, faster Gallery, and a Mac app that updates itself.
sidebar:
  label: What's new
  order: 6
---

0.1.0-alpha.2 is the coming release. It is not released yet, and it may still change.

## Assistant

- Expand it to full screen, or shrink it to a small bar while you work.
- Type `@` to hand it a take, an upload, an element or a skill.
- It sees images itself when its model can, including the takes it just made, to check them against your ask.
- Its answers show takes as pictures and players, with **Open** and **Use in…**, and offer choices as cards you
  click.
- **Auto mode** runs safe steps without asking, within limits an admin sets, each with **Stop** and **Undo**.
- It keeps your film's shot list, and asks when the next shot is unclear.
- **Stop** works at once, even while it is thinking. Long chats are folded into a summary instead of being cut.
- It can search the web and use skills (see Plugins).

More in [Assistant](/studio/assistant/).

## Plugins

- A new **Plugins** page for admins: add-ons that plug new features in, each off until you turn it on.
  See [Plugins](/plugins/).
- [Web search](/plugins/web-search/) for the Assistant: free, no key, and it asks before anything leaves your machine.
- [Skills](/plugins/skills/) teach the Assistant a craft. Built in: **Cinematic filmmaker** and **Animator**. Add
  your own by dropping a folder or `.zip` into `~/.helm/plugins/`.
- Plugins with a program of their own start themselves on the Mac while they are on.
- [Write your own](/plugins/writing-a-plugin/).
- Coming: media tools (crop, trim, resize and more) for the Assistant and the Gallery.

## Create, Gallery and Timeline

- Picture prompts and audio scripts are kept apart: switching to an audio workflow never carries the picture prompt
  into the script. See [Create](/studio/create/).
- Each take shows its render time (⏱ 1:14) on Create and in the Gallery's **Made with**; the
  [Timeline](/studio/timeline/) shows it per clip and in all for the sequence.
- In a narrow window, the input fields on Create keep an even grid.
- Double-click a take in the [Gallery](/studio/gallery/) to open its full preview.
- Large galleries, and the Gallery picker on Create, stay fast with thousands of takes.

## Mac app

- **Check for updates…** and install an update from inside the app; each download is checked against its SHA256.
- The first start after an update shows the progress of the new images, and removes the old ones once the new
  version runs.
- The first open labels the image sizes: **0.6 GB download · 2.2 GB on disk**.

More in [The Mac app](/start/mac-app/).
