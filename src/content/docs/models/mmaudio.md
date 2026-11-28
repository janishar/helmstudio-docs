---
title: MMAudio
description: Sound effects from text, or a sound matched to a video, which gives the sound and the video with it.
sidebar:
  order: 10
---

MMAudio large 44k v2 makes sound effects from a short description, or for a video: it watches the picture so steps,
hits and engines land on the right frames. From a video, one run gives two takes: the sound, and the video with that
sound.

- **Media:** sound, 44.1 kHz mono
- **Runtime:** PyTorch. Tested on a Mac; NVIDIA hosts are listed but not tested yet.
- **Licence:** MMAudio's weights CC BY-NC 4.0 (non-commercial), the DFN5B CLIP helper's Apple research licence, and
  BigVGAN's MIT License (accept them before the download)

## Workflows

| Workflow | Does |
|---|---|
| MMAudio Sound | A sound from text. Generate makes 4 (up to 8). |
| MMAudio Sound from a video | The sound of a video, and the video with that sound. The video you picked is not changed. |

See [Sound for a video](/studio/create/#sound-for-a-video). In [Magic](/studio/magic/), a sound made from a shot's
video runs on MMAudio.

## Variants

| Variant | Does |
|---|---|
| Large 44k v2 | The model and its two helpers, about 15 GB to download. It needs about 8 GB of memory from text, and about 16 GB from a video. |

On a Mac, 8 s of sound takes about 4 s from text and about 9 s from a video.

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Video | a video take, 1 to 30 s | none | The video to give a sound (Sound from a video). Its own sound, if any, is replaced. |
| Length | 1 to 30 s; from a video, Auto or 1 to 30 s | 8 s; from a video, Auto | Auto covers the whole video. A Length cuts the video to its first seconds. |
| Avoid | up to 400 characters | empty | What should not be heard, such as "music, speech". |
| Guidance | 1 to 10 | 4.5 | How closely the sound follows the text. Higher is closer and less varied. |
| Steps | 10 to 50 | 25 | More is slower and rarely better past 25. |
| Seed | -1 or a number | -1 | -1 is random. |

From a video, the prompt is optional: a few words of what is heard steer it, such as "truck engine on a road".

## Good to know

- It was trained on 8 s clips. Longer sounds work but hold less detail.
- It is for effects, not music or speech.
- Mono only, and levels are not evened out: loud sounds can clip.
- Its weights are for non-commercial use only.
