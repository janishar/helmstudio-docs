---
title: LTX-2.5
description: Fast video with matching sound, keyframes, retake, extend and video that follows a sound.
sidebar:
  order: 3
---

LTX-2.5 makes short clips with matching sound, fast. It animates images at chosen times, regenerates part of a clip,
extends a clip, and makes video that follows a sound. Lip movement follows the sound, but it is not a lip-sync model.

- **Media:** video with sound (MP4, H.264 and AAC)
- **Runtime:** MLX on a Mac, PyTorch on an NVIDIA host
- **Licence:** LTX-2 Community License. The weights are gated on Hugging Face: the host that downloads them needs a
  Hugging Face access token.

## Workflows

| Workflow | Does | Variants |
|---|---|---|
| Text to video | A clip from a prompt. | Distilled |
| Image to video | Animates images pinned at chosen times. | Distilled |
| Retake | Regenerates a stretch of a clip and, if you want, its sound. | Distilled or Dev |
| Extend | Adds seconds after (or, with Dev, before) a clip. | Distilled or Dev |
| Audio to video | A clip that follows a sound, with optional keyframes. | Distilled or Dev |

On NVIDIA, Text and Image to video run Distilled fp8, and Retake, Extend and Audio to video run Dev int8 only.

## Variants

| Variant | Where | Notes |
|---|---|---|
| Distilled | Mac | 8 steps without guidance, about 10 times faster than Dev. |
| Dev | Mac | Guided, 30 steps by default, with CFG and STG. Needed for Extend before. |
| Distilled fp8 | NVIDIA only | Smaller community weights. |
| Dev int8 | NVIDIA only | Smaller community weights. Needs Distilled fp8 on the same host too. |

**Precision** (Mac): `int8` (default, about 19 GB for the transformer), `int4` (low memory) or `bf16` (best
quality, about 38 GB for the transformer).

**Compute** (Mac): `float32` (default) or `float16`, which is 10 to 20% faster and changes the picture slightly.

## Settings: text and image to video

| Setting | Range | Default | What it does |
|---|---|---|---|
| Width, Height | 128 to 1920 px, step 64 | 704 × 448 | The clip size, about 0.1 to 2.1 MP. |
| Length | 9 to 321 frames, on an 8k + 1 grid, or Auto | 49 (about 2 s) | Auto predicts a length of 1 to 20 s from the prompt. |
| Frame rate | 1 to 60 | 24 | LTX was trained at 24. Values far from it drift. |
| Recipe | Two-stage, One-stage, Detail | Two-stage | See below. |
| Prompt beats | up to 8 lines, each with a length of 0 to 20 s | none | Timed lines that steer picture and sound in order. A length of 0 shares the time left equally. |
| Negative prompt | up to 500 characters | empty | What the clip should not show, applied with NAG. About 10% slower. Mac only. |
| Audio | on, off | on | Off writes an MP4 without sound. The picture is the same. |
| LoRA rows | up to 8, strength 0 to 2 | none | LoRAs from your library. Adapter (applied at run time) or Bake (merged at load). Mac only. |
| Seed | -1 or a number | -1 | -1 is random. |

**Recipe:**

- **Two-stage** renders at half size, upscales ×2 and refines in 3 steps at full size.
- **One-stage** stops after the first stage: faster, softer, and the clip is half the canvas size.
- **Detail** is Two-stage plus a detail pass with Lightricks' detailing LoRA: sharper hair, edges and texture,
  about a third slower. Mac and Distilled only; it needs the **Detailer** add-on.

The stage steps are fixed by the distilled schedule: 8 for stage 1, 3 for stage 2.

### Image to video

Add up to 8 **Frames**. Each frame has:

| Setting | Range | Default | What it does |
|---|---|---|---|
| At | 0 s to the clip's end, step 0.1 | 0 | Where in the clip. At 0 s the clip starts from the image; later frames are passed through. |
| Strength | 0 to 1 | 1 | 1 holds the frame to the image; lower lets the model drift from it. |
| Binding | auto, replace, guide | auto | Auto replaces the start and guides later frames. Replace pins the frame exactly. Guide passes near it. NVIDIA uses auto only. |

## Retake

Pick a source video and the span to regenerate. The rest of the clip is kept as context, and the result is the whole
clip. The source's sides must be multiples of 32, at most 321 frames.

| Setting | Range | Default | What it does |
|---|---|---|---|
| Regenerate audio | on, off | on | Off keeps the sound of the source. |
| Steps | 1 to 60 | 30 | Dev only. |
| CFG | 1 to 10 | 3 | How strongly the prompt is followed. Dev only. |
| STG | 0 to 3 | 1 | Spatio-temporal guidance; 0 turns it off. Dev only. |
| Negative prompt | up to 500 characters | empty | Dev only. Empty uses a fixed negative prompt. |

## Extend

| Setting | Range | Default | What it does |
|---|---|---|---|
| Add | 0.1 to 10 s | 2 | Seconds to add, rounded up to whole 8-frame steps. |
| Where | after, before | after | Before needs Dev. |
| Steps, CFG, STG | as Retake | 30, 3, 1 | Dev only. |

## Audio to video

Pick a sound: an audio take, or a video's sound. The part you pick, up to 13.375 s, sets the clip's length. Audio to
video runs at 24 fps. You can add keyframes as in Image to video, and Dev takes Steps, CFG and STG as in Retake. Dev
needs the **Distilled LoRA** add-on. The Recipe offers Two-stage or Detail; Detail needs Distilled, on a Mac.

## Presets

| Workflow | Presets |
|---|---|
| Text to video, Image to video | **Fast** (`int8`, `float16`), **Quality** (`bf16`, `float32`), **Low memory** (`int4`) |
| Retake, Extend, Audio to video | **Fast** (`int8`), **Low memory** (`int4`) |

## Memory and speed

- The text encoder unloads before sampling, so it never sits beside the video model.
- Memory grows with size × length. Decoding a large, long clip is the biggest step.
- Guided Dev runs are much slower than Distilled: each step runs the model several times over the whole clip.
- On NVIDIA, LoRA rows, the negative prompt of Text and Image to video, the Detail recipe and the Compute setting are not available.

## Tips

- Draft with Distilled at the default size, then raise the size or use Quality for the final.
- Use prompt beats to change the action or the sound part-way through a clip.
- To continue a clip you like, use Extend. To fix one moment, use Retake.
