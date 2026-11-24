---
title: Assistant
description: The in-app Assistant works every screen for you, asks before anything costly, can look at your takes, and can be steered while it answers.
sidebar:
  order: 9
---

The Assistant is a chat that works the app for you. Say what you want in plain words; it does it on screen, where
you can see each step.

## Open it

Press **Assistant** in the dock, or **⌘J** (Ctrl+J). It opens over the right edge of any screen; on a phone it is a
sheet at the bottom.

The **Sees** chips under its title say what it is reading now: the screen, the session, the workflow, Run on and
your elements.

If nothing comes up, your admin has not turned it on. See [AI agents](/studio/admin/#ai-agents).

## What it can do

It works every screen:

- **Anywhere**: take you to any screen with the right thing open, explain what is on screen, and answer "how do I…".
- **Create**: write prompts with `@elements`, pick looks and voices, switch Image, Video or Audio, pick the workflow,
  variant, Run on and preset, set size, steps, seeds and LoRAs, and prepare **Generate**. It can stop a run and
  explain a failed one.
- **Graph**: build a workflow from a description and fix its problems.
- **Pipelines**: turn a brief into a pipeline, test a judge, and start, pause, resume, retry or stop a batch.
- **Timeline**: place, trim, split and order clips, make shots and voice lines, re-render and export.
- **Gallery**: find takes, filter, sort, star, rename and delete them.
- **Models**: explain variants, add-ons, licences and machines. For an admin, it prepares a download.

It chains steps. "Make an image, then animate it" prepares the image, waits for your OK and the run, then prepares
the video with the new take.

Each step shows as a line in the chat, such as "Opened Timeline", with **Undo** where the screen can undo it.

Try: "Take me to my newest batch", "What is on this screen?" or "Why did my last run fail?"

## It asks before costly actions

Anything that uses the GPU, deletes something, or sends data out of the machine stops at a card. The card says what
will happen, for example the model, machine, size and estimated time for a run, or "This can't be undone." for a
delete. The card's button (such as **Generate**) is your click and runs the screen's own button. **Not now** cancels.

Some things always stay yours. The Assistant points at them but never does them:

- Saving files to or from your disk.
- Signing in or out, your password and your theme.
- Admin changes: users, API keys, model providers, host pins and settings.
- The licence tick when downloading a model.
- Messages to a pipeline's director chat.

## It can look at your takes

Ask "Which of these four is sharpest?" or "Does the video match the prompt?". It looks at up to 8 takes at a time (a
video as a few keyframes). This needs an "Ask" workflow's model on one of your machines. See
[Ask](/models/ask/).

## Steer it while it answers

You do not have to wait for it to finish. While it works, the message box reads **Steer the answer…**: type and press
**Enter** to steer the answer it is giving now. Your message waits at the bottom of the chat until the Assistant
reads it at its next step. Press **Stop** to stop the answer.

While a thinking model works, a **Thinking… N s** bubble at the bottom of the chat counts the seconds. The reply
replaces it. Models that do not think show no bubble.

## Chats and memory

- **Chats** lists your conversations. **New chat** starts another.
- The Assistant remembers useful things across chats, such as your preferences and what worked. It shows a
  "Remembered: …" line with **Undo** when it saves one.
- **Memory** lists everything it remembers, in four tabs: **Likes**, **Projects**, **Worked** and **Chats**. Edit or
  delete any item, or **Clear all**.

If the chat is open in two browser tabs, only one acts; the other is **Read-only** until you press **Continue here**.

## Which model powers it

The Assistant runs on a text model your admin picks in [Admin › AI agents](/studio/admin/#ai-agents), from the
providers set up in [Model providers](/studio/admin/#model-providers). It can be a local server on your own network
or a remote provider. With a remote provider, your messages and the screen summary go to that provider; your images
never do.

The admin also sets per-user caps and whether it may search the web.
