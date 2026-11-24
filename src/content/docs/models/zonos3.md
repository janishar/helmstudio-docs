---
title: ZONOS3
description: Fast speech in 44 languages from 27 preset voices or a cloned voice, with fine control of delivery.
sidebar:
  order: 6
---

ZONOS3 is a fast, small voice model, about 2 GB. It speaks 44 languages, clones a voice from a short clip, and gives
fine control of emotion, energy, whispering and pace.

- **Media:** audio (44.1 kHz)
- **Runtime:** native, on a Mac or an NVIDIA host
- **Variant:** Mini
- **Licence:** Apache License 2.0

## Workflows

| Workflow | Does |
|---|---|
| Voice-over | Reads the text in one voice. |
| Dialogue | Speaks a script line by line, each in its speaker's voice, as one take. |

## Voices

- **27 preset voices** in several languages and accents, for example Imogen and Rupert (British English), Savannah
  and Wyatt (American English), Gaspard (French), Liesel and Wolfgang (German) and Ananya (Hindi).
- **Your own voices:** any saved voice with a clip. Clone one from a clip of 3 to 30 seconds of an audio take or a
  video's sound, and save it to your library.

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Voice | a preset or a saved voice with a clip | — | Who speaks. |
| Language | 44 languages | en-US | The language of the text. It decides how numbers and abbreviations are read. |
| Emotion | 0 to 1 | 0.5 | Low sounds sad, high sounds happy. 0.5 adds nothing. |
| Energy | 0 to 1 | 0.5 | Low is calm and soft, high is excited. 0.5 adds nothing. |
| Whisper | 0 to 1 | 0 | 0 speaks out loud; 1 whispers every word. |
| Speaking rate | 0.5 to 1.5 | 1 | 1 is a normal pace. |
| Guidance | 1 to 5 | 2 | How closely it keeps to the voice. 1 is off; high values strain. |
| Seed | -1 or a number | -1 | -1 is random. |

A take holds at most 900 characters, about 60 seconds. Longer text is split on sentences and joined.

The languages are: en-US, en-GB, fr, de, es, it, pt-BR, ja, zh, ko, ar, bn, bg, cs, da, nl, fi, ka, el, gu, he, hi,
hu, id, kn, ms, ml, mr, no, or, pl, pa, ro, ru, sk, sv, tl, ta, te, th, tr, uk, ur and vi.

## Presets

| Preset | Emotion | Energy | Whisper | Speaking rate | Guidance |
|---|---|---|---|---|---|
| Neutral | 0.5 | 0.5 | 0 | 1 | 2 |
| Warm | 0.7 | 0.45 | 0 | 0.95 | 2 |
| Tense | 0.3 | 0.75 | 0 | 1.1 | 2.5 |
| Whisper | 0.5 | 0.25 | 0.9 | 0.9 | 2 |

## Dialogue

Write a script as for [Qwen3-TTS](/models/qwen3-tts/#dialogue): one line each, `@name: text` or
`@name (style): text`. Each speaker can be a preset or a cloned voice.

A line's style words set its delivery: whisper, calm, warm, happy, sad, tense, angry, excited, slow, fast.

- Up to 40 lines. An empty line adds a longer pause.
- **Pause between lines:** 0 to 2 s, default 0.35.

## When to choose ZONOS3

Choose ZONOS3 for cloned voices, for languages beyond the ten Qwen3-TTS reads, and for fine control of delivery.
Choose [Qwen3-TTS](/models/qwen3-tts/) for its preset speakers with styles in words, and for designed voices.
