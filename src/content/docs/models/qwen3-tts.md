---
title: Qwen3-TTS
description: Speech from preset speakers with a style in words, voices designed from a description, and dialogue.
sidebar:
  order: 5
---

Qwen3-TTS reads text aloud. It has nine preset speakers that take a speaking style in plain words, and it can design a
new voice from a description.

- **Media:** audio
- **Runtime:** PyTorch, on a Mac or an NVIDIA host
- **Licence:** Apache License 2.0

## Workflows

| Workflow | Does |
|---|---|
| Voice-over | Reads the text in one voice. |
| Voice design | Reads the text in a voice designed from words. |
| Dialogue | Speaks a script line by line, each in its speaker's voice, as one take. |

## Variants

| Variant | Does |
|---|---|
| Custom voice | 9 preset speakers, each with an optional Style. |
| Voice design | A voice designed from a description. |

## Preset speakers

| Speaker | Native language | Voice |
|---|---|---|
| Vivian | Chinese | Bright, slightly edgy young female |
| Serena | Chinese | Warm, gentle young female |
| Uncle Fu | Chinese | Seasoned male, low and mellow |
| Dylan · Beijing | Chinese | Youthful Beijing male |
| Eric · Sichuan | Chinese | Lively Chengdu male, slightly husky |
| Ryan | English | Dynamic male with strong rhythm |
| Aiden | English | Sunny American male |
| Ono Anna | Japanese | Playful Japanese female |
| Sohee | Korean | Warm Korean female |

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Voice | a preset speaker or a designed voice | — | Who speaks. |
| Language | auto, en, zh, ja, ko, de, fr, ru, pt, es, it | auto | The language of the text. Auto lets the model tell. |
| Style | up to 500 characters | empty | How to say it, in words: calm, angry, whispering. Custom voice only. |
| Variation | 0.1 to 1.2 | 0.3 | Low keeps the voice steady; high is livelier and drifts. |
| Seed | -1 or a number | -1 | -1 is random. |

A take holds at most 900 characters, about 60 seconds. Longer text is split on sentences and joined.

## Presets

| Preset | Sets |
|---|---|
| Steady | Variation 0.3 |
| Lively | Variation 0.9 |

## Voice design

Describe the voice in words, for example "a calm, low male voice with a slight rasp". Save a voice you like to your
library, and give it to a character Element so it speaks in that voice.

## Dialogue

Write a script with one line each:

```text
@mara: Did you hear that?
@ken (whispering): Stay still.

@mara (calm): It's only the wind.
```

- Each `@name` speaks in its Element's voice. A `(style)` before the colon sets that line's style.
- An empty line adds a longer pause.
- Up to 40 lines, and preset speakers only: a designed voice drifts between lines.
- **Pause between lines:** 0 to 2 s, default 0.35.

The take records each line's start and end, so you can place lines on the [Timeline](/studio/timeline/).
