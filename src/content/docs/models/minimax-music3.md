---
title: MiniMax Music 3
description: The default music model, full songs with sung lyrics from a style and lyrics, the best sound but slow.
sidebar:
  order: 8
---

MiniMax Music 3 writes a whole song, vocals included, from a style in words and lyrics with section tags. It is the
default music model on Create and in Magic: it sounds best, but it is slow.

- **Media:** music, 44.1 kHz stereo
- **Runtime:** PyTorch. Tested on a Mac; NVIDIA hosts are listed but not tested yet.
- **Licence:** MiniMax-Music3 Community License (accept it before the download)

## Workflows

| Workflow | Does |
|---|---|
| MiniMax Music 3 | A song from a style and lyrics, or an instrumental. |

It makes songs from text only. To edit a MiniMax take (Repaint, Cover, Extend), use [ACE-Step 1.5](/models/ace-step/):
its edits work on any music take.

## Variants

| Variant | Does |
|---|---|
| Base | The full model, about 28.5 GB to download. It needs about 27 GB of memory. |

## Speed

About 5 seconds of work for each second of song on a Mac: 30 s of song takes about 2:30, and a 5-minute song about
25 minutes. Generate shows the time before you run. Try a style with a 30 s Length first.

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Lyrics | up to 4000 characters | empty | The words, with each section tag on its own line: `[verse]`, `[chorus]`, `[bridge]`, `[intro]`, `[outro]`. Text after a tag on the same line is dropped. |
| Instrumental | on or off | off | No vocals. Empty lyrics do the same. |
| Length | Auto, or 10 to 300 s | Auto | The longest the song may run. Auto allows up to 5 minutes and lets the model end it. |
| Seed | -1 or a number | -1 | -1 is random. |

There is no BPM, key, time, language or reference song: say the tempo and the voice in the style instead, such as
"warm indie pop, acoustic guitar, female vocal, 100 bpm".

## Good to know

- The prompt is the style, not the lyrics. Keep it short and concrete: genre, mood, voice, lead instruments, tempo.
- For an instrumental, say what carries the melody: "strings carry the melody, then piano".
- Length is an upper bound: the model may end a song early.
- The same style, lyrics, Length and seed on the same machine give the same song.
