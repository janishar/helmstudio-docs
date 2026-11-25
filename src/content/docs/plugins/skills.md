---
title: Skills
description: Skills teach the Assistant a craft, such as making a short film. Use the built-in ones or drop in your own.
sidebar:
  order: 4
---

A skill is a plugin of kind **Skill**: a guide the [Assistant](/studio/assistant/) reads to learn a craft, with an
order of work, templates and suggested settings. A skill is text only. It never runs anything itself; the Assistant
still works through its own tools and asks as it always does.

## Built-in skills

| Skill | Call it with | Teaches |
|---|---|---|
| **Cinematic filmmaker** | `@cinematic-filmmaker` | A short film that looks live action, end to end: script and shot list, character sheets saved as elements with voices, places and a look, a keyframe then a video per shot, dialogue and sound, and the edit on the Timeline to an MP4. |
| **Animator** | `@animator` | A cartoon film end to end: script and shot list, character model sheets, elements and voices, keyframes, animation in one held style, dialogue, the Timeline edit and MP4 export. |

Each comes with extra files the Assistant can read when it needs them, such as a shot list template, a character
sheet guide and an edit checklist.

## Turn a skill on

Skills are off until an admin turns them on, like every plugin.

1. Open **Hub** in the rail, on the **Assistant** tab.
2. Under **Skills**, turn the skill on.

To see when a skill is used, its files and how many recipes it has, click it in **Hub › Plugins**. Its status there
reads **On**.

Once on, every user's Assistant can use it.

## Use a skill

- **Call it**: type `@` in the Assistant's chat. Skills are listed first in the picker. Pick one, or type its name,
  such as `@animator`. The Assistant reads it before it answers.
- **Let it choose**: when your ask fits a skill that is on, the Assistant reads it by itself.

The chat shows a line such as **Using skill: Animator**. Tap it to see the skill.

### Recipes

A skill can suggest settings as recipes, for example "Keyframe draft, Turbo" or "LTX final shot, 1344 x 768, 4 s".
helmstudio checks each recipe against the workflows you have; one that doesn't fit is skipped, and the side panel
says why (for example "2 · 1 skipped: …").

## Add your own

You can add a skill without updating helmstudio:

1. Make a folder named after the skill, with a `plugin.json` and a `SKILL.md` (see
   [Write a plugin](/plugins/writing-a-plugin/#a-skill)).
2. Drop the folder, or a `.zip` of it, into `~/.helm/plugins/`.
3. It appears in **Hub › Plugins** within a few seconds, **Off**. Press **Rescan** if you don't want to wait.
4. Turn it on in **Hub › Assistant**.

**Your copy wins.** A skill of yours with the same name as a built-in one is used instead of it. If your copy is
broken or needs a newer helmstudio, the built-in one stays in use and its row says why, for example "Your copy is
broken: …; using built in."

### Limits

| | Limit |
|---|---|
| Files | `plugin.json`, `SKILL.md` and up to 15 more `.md`, `.txt` or `.json` files, each under 64 KB, with plain names |
| `.zip` | At most 5 MB, 64 entries and 2 MB unpacked. Plain relative paths only: no `..`, no absolute paths, no links. |
| Format | This helmstudio reads skill `"format": 1`. A higher one is listed as **Needs a newer helmstudio**. |

A skill that breaks these rules is listed as **Can't be read** and nothing in it is used. A skill that is on and
then breaks stays on, and is used again once it reads well.
