---
title: Stable Audio 3
description: Fast sound effects and ambiences from text, with Repaint, Vary and Extend of a sound.
sidebar:
  order: 9
---

Stable Audio 3 Small-SFX makes sound effects and ambiences from a short description: doors, footsteps, rain, impacts,
machines, rooms. It is fast, so Generate makes several variations at once for you to pick from.

- **Media:** sound, 44.1 kHz stereo
- **Runtime:** PyTorch. Tested on a Mac; NVIDIA hosts are listed but not tested yet.
- **Licence:** Stability AI Community License and Gemma Terms of Use (accept them before the download)

## Workflows

| Workflow | Does |
|---|---|
| Stable Audio 3 Sound | A sound from text, or starting from a sound you give it. Generate makes 4 (up to 8). |
| Stable Audio 3 Repaint | Makes a span of a sound again from the prompt; the rest stays. |
| Stable Audio 3 Vary | Makes a sound again from the prompt, starting from it. |
| Stable Audio 3 Extend | Adds seconds after the end or before the start of a sound. |

Repaint, Vary and Extend show on a sound take. See [Sound effects](/studio/create/#sound-effects).

## Variants

| Variant | Does |
|---|---|
| Small SFX | The model, about 3.5 GB to download. It needs about 4.5 GB of memory. |

A few seconds of sound take about half a second on a Mac.

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Length | 0.5 to 30 s | 4 s | Seconds of sound. A hit is 1 to 2 s; an ambience 10 to 30 s. |
| From a sound | one audio take, or a video's sound | none | Starts from that sound instead of noise. |
| Change | 0.05 to 1 | 0.7 | With From a sound, and on Vary: how far it may move. 0.5 keeps the timing and shape; 1 is a new sound. |
| Add (Extend) | 0.5 to 30 s | 4 s | Seconds to add. At most 60 s in all. |
| Where (Extend) | End or Start | End | Where the new seconds go. |
| Seed | -1 or a number | -1 | -1 is random. |

## Good to know

- It is for effects, not music or speech.
- There is no Avoid box: this model ignores a negative prompt.
- Levels are not evened out: some sounds come out quiet.
- To match a sound to a video, use [MMAudio](/models/mmaudio/). **Match a video** on Create switches to it.
- The weights are gated on Hugging Face: the host that downloads them needs a Hugging Face access token.
