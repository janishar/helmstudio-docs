---
title: Elements and Looks
description: Name your characters, places and props once and call them with @; set a film, camera, colour or lighting style once and reuse it.
sidebar:
  order: 2
---

Elements and Looks are your own library. You make them once and use them in any prompt: on Create, in a timeline
shot, and in pipelines. They have no screen of their own; you open them from the composer.

## Elements

An element is a character, a location or a prop, with a name you call in a prompt as `@name`.

Each element has:

- **Name** and **handle**: the handle is what you type after `@`. It uses a-z, 0-9, `-` and `_`, starts with a letter
  and is at most 40 characters.
- **Group**: **Character**, **Location** or **Prop**.
- **Images**: 1 to 4 images from the Gallery, in order.
- **Text** (optional): words added after the prompt where the element is mentioned.
- **Voice** (characters only): the voice the character speaks in.

### Make an element

From the composer:

1. Press **Elements** in the composer.
2. Choose **New element**.
3. Fill in the name, group and text, and add 1 to 4 images with **Add from gallery**.
4. Press **Save**.

From the Gallery: select an image take (or select up to 4 with **Select several**) and choose **Save as element**.

### Use an element

Type `@` in a prompt and pick the element from the menu, or open **Elements** and insert it at the cursor. The
mention shows as a chip in the prompt. A handle that no longer exists is marked.

How strongly an element holds depends on the model. Families that take reference images (Qwen Image in edit mode,
MiniMax H3) use the element's images. Elsewhere only its words reach the prompt.

### Give a character a voice

Open the character with **Edit element** and press **Pick a voice** under **Voice**. In a dialogue script, each
`@name:` line is then spoken in that voice:

```
@mara (quiet): You said you'd be back by noon.
```

A deleted voice leaves the character with none. See [Voices](/studio/create/#voices).

## Looks

A look is a style: words, and sometimes a LoRA or a reference image, added to the run. Looks come in four groups:

- **Film**
- **Camera**
- **Colour**
- **Lighting**

The models ship **Starter** looks; the ones you make are under **Mine**.

A look nudges a result. It does not guarantee it: a camera look is a description, not a camera control.

### Choose a look

1. In the composer, press the tile for a group, such as **Lighting**.
2. Pick a look in the picker. Looks that do not fit the open model are greyed, with the reason.
3. To clear a group, choose **Auto**.

### Make a look

- From scratch: in the look picker, choose **New look**. Give it a name and the words to add after the prompt. You
  can also add LoRAs with **Add LoRA** and images with **Add from gallery**.
- From a take: in the Gallery, select a take and choose **Save as look**. Pick a name and group, and what to copy
  from the take: its prompt as typed, its LoRAs at their strengths, and the take itself as a reference image. A look
  needs at least one of them.

Edit or delete your own looks from the picker. Takes already made keep the version of the look they used.

## On the timeline

A sequence can carry a cast (elements) and a look as defaults. Every new shot starts with them. See
[Timeline](/studio/timeline/).
