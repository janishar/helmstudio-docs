---
title: MiniMax H3
description: Higher-quality video with sound, first and last frames, and video from image, video and sound references.
sidebar:
  order: 4
---

MiniMax H3 makes higher-quality clips with sound. It animates between a first and a last frame, and makes video from
references: images, videos and sounds together. It is slower than [LTX-2.5](/models/ltx/).

- **Media:** video with sound (MP4, H.264 and AAC, 24 fps)
- **Runtime:** native: the h3 engine on a Mac, SGLang on an NVIDIA host ([install it](/start/install/#minimax-h3-video-sglang-optional))
- **Licence:** MiniMax H3 Community License. You accept it before the download.

## Workflows

| Workflow | Does |
|---|---|
| Text to video | A clip from a prompt. |
| Image to video | Animates from a first frame, to a last frame, or both. |
| References | A clip from up to 9 images, 3 videos and 3 sounds. |

## Variants

| Variant | Where |
|---|---|
| Base | Mac only |
| Base fp8 | NVIDIA only (smaller community weights) |

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Width, Height | 256 to 1344 px, step 32, at most 768 × 1344 pixels in all | 864 × 480 (16:9) | The clip size. |
| Length | 5 to 362 frames, on a 5 + 17k grid | 124 (about 5 s) | 362 frames is about 15 s. |
| Frame rate | 24 | 24 | MiniMax H3 runs at 24 fps only. |
| Steps | 2 to 50 | 8 | 50 is reference quality, 4 a draft. The default is the Turbo preset's 8. |
| LoRA | none, turbo | turbo | Turbo: 8 steps, near the 50-step look. Needs the Turbo LoRA add-on (Turbo Ref LoRA for References). Use 8 steps. |
| Seed | -1 or a number | -1 | -1 is random. |

### Speed settings on a Mac (Base)

| Setting | Range | Default | What it does |
|---|---|---|---|
| Layers | 35 to 50 | 45 | Model blocks to run: 50 exact, 45 fast, 40 aggressive. |
| Reuse | 1 to 3 | 2 | 1 every step fresh, 2 fast, 3 aggressive. |
| Core reuse | 1 to 6 | 1 | Runs the costly core every n steps: 4 fast, 6 a rough preview. Only with Reuse 1. |
| Render | Full, 75%, 62.5% | Full | Renders smaller and scales up after: faster, less fine detail. Needs a size whose smaller same-shape size is also valid. |
| Token reduction | on, off | off | About 25% faster; can shift the composition. Not with 40 layers or fewer and Reuse 3. |

### Settings on NVIDIA (Base fp8)

| Setting | Range | Default | What it does |
|---|---|---|---|
| Mode | lossless, exact | lossless | Lossless uses SGLang's fast paths with the same maths. Exact matches the reference path bit for bit, slower. |
| Flow shift | 1 to 20 | 12 | How the noise schedule spends its steps on the picture. |
| Audio flow shift | 1 to 10 | 3 | How the noise schedule spends its steps on the sound. |

## Presets

| Preset | Sets |
|---|---|
| Draft | 4 steps |
| Fast | 20 steps, 45 layers, Reuse 2, Token reduction on |
| Turbo | The default. 8 steps with the Turbo LoRA (an add-on) |
| Default | 20 steps, 45 layers, Reuse 2 |
| Reference | 50 steps, every layer |

On NVIDIA a preset sets only the steps, so Fast and Default run the same there. The Turbo LoRA does not work on Base
fp8 yet.

## Image to video

Set a **First frame**, a **Last frame**, or both, from your gallery.

## References

| Kind | At most | Named in the prompt | Length |
|---|---|---|---|
| Images | 9 | `<Picture 1>`, `<Picture 2>`… | — |
| Videos | 3 | `<Video 1>`, `<Video 2>`… | 2 to 15 s each |
| Sounds | 3 | `<Audio 1>`, `<Audio 2>`… | 2 to 15 s each |

- At most 12 references in all, and 15 s of video and sound in all.
- A sound needs an image or video reference too.
- References never go with a first or last frame.
- Each video reference has a **Sound** setting: **keep** (the model hears the video's sound), **silent** (picture
  only) or **replace** (it hears a soundtrack you pick instead).

```text
<Picture 1> walks through the market from <Video 1>, speaking with the voice in <Audio 1>.
```

## Memory and speed

- Peak memory is about 24 GB plus an amount that grows with size × length.
- The Turbo LoRA adds about 4.5 GB.
- Draft with the Draft or Turbo preset, then render the final with Default or Reference.
