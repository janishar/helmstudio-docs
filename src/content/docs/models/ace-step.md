---
title: ACE-Step 1.5
description: Fast songs and instrumentals from a style and lyrics, with BPM, key and a reference song, and Repaint, Cover and Extend for any music take.
sidebar:
  order: 7
---

ACE-Step 1.5 makes songs and instrumentals from a style in words and lyrics, fast. It can set the tempo, key and time,
borrow the sound of a reference song, and edit a song: make part of it again, cover it in a new style, or extend it.
Its edits work on any music take, MiniMax Music 3's too.

- **Media:** music, 48 kHz stereo
- **Runtime:** PyTorch. Tested on a Mac; NVIDIA hosts are listed but not tested yet.
- **Licence:** MIT License

## Workflows

| Workflow | Does |
|---|---|
| ACE-Step Music | A song from a style and lyrics, or an instrumental. |
| ACE-Step Repaint | Makes a range of a song again; the rest stays. |
| ACE-Step Cover | The same song in a new style. |
| ACE-Step Extend | Adds time at the end or the start of a song, in its style. |

Repaint, Cover and Extend show on a music take as **Repaint**, **Cover** and **Extend**. See
[Change a song](/studio/create/#change-a-song).

## Variants

| Variant | Does |
|---|---|
| 2B turbo | The default. Fast drafts and edits. About 10 GB to download. |
| XL turbo | The larger 4B model, better sound. It shares the planner, text encoder and decoder with 2B turbo, and adds about 20 GB. |

Either needs about 24 GB of memory for 30 s of song, and about 26 GB for 2 minutes. On a 64 GB Mac, 30 s of song
takes about 16 s with either.

## The plan

Before it composes, a planner (a small language model) rewrites your style and picks the length, BPM, key, time and
language you left on **Auto**. What it picked shows in the settings. The planner is seeded, so the same seed repeats
a song.

Turn on **No rewrite** under **Advanced** to keep your style as written. The length is then 30 s unless you set it.

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Lyrics | up to 4096 characters | empty | The words, with a section tag in square brackets on its own line: `[verse]`, `[chorus]`, `[bridge]`, `[intro]`, `[outro]`. Empty makes an instrumental. |
| Instrumental | on or off | off | No vocals; the lyrics are not sung. |
| Length | Auto, or 10 to 600 s | Auto | Auto lets the plan pick it. |
| BPM | Auto, or 30 to 300 | Auto | The tempo. |
| Key | Auto, or one of 24 major and minor keys | Auto | The key. |
| Time | Auto, 2/4, 3/4, 4/4, 6/8 | Auto | Beats per bar. |
| Vocal language | Auto, or one of 20 languages | Auto | The language sung. Auto tells it from the lyrics. |
| Reference | one song | none | A song, voice or sound whose sound the new song borrows. The first 30 s are used. |
| Steps | 1 to 20 | 8 | The turbo models are made for 8. |
| Seed | -1 or a number | -1 | -1 is random. |

## Edits

| Edit | Settings |
|---|---|
| Repaint | The range to make again, in the song's seconds. |
| Cover | **Keep the song**, 0 to 1, default 0.6: 1 stays with the melody and words, lower lets the new style take over. |
| Extend | **Add**, 5 to 300 s, default 30; **Where**, End or Start. A song may last at most 600 s. |

Repaint, Cover and Extend keep the song's length (Extend adds to it).

## Sections

A song made with tagged lyrics carries its sections. They show over the waveform on Create and as markers on a
[Magic](/studio/magic/) block; click one to play from there.

## Good to know

- The planner can drift from your words (genre, voice). Turn on **No rewrite** to keep them.
- Vocals and lyrics are less clean than [MiniMax Music 3](/models/minimax-music3/)'s.
- The same settings and seed give the same song on the same machine.
