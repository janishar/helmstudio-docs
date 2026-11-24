---
title: Qwen Image 2.1
description: Everyday text to image and multi-reference edits, fast with Turbo.
sidebar:
  order: 1
---

Qwen Image 2.1 is the everyday image model. It makes an image from text, and edits, combines or restyles images when
you give it references. Turbo makes it fast enough for quick drafts.

- **Media:** images
- **Runtime:** PyTorch, on a Mac or an NVIDIA host
- **Workflow:** Qwen Image. Without references it is text to image; with any reference it is an edit.
- **Licence:** Apache License 2.0. The prompt enhancer add-ons use the Qwen Research License Agreement, which is
  non-commercial.

## Variants

| Variant | Where | Notes |
|---|---|---|
| Base | Mac, NVIDIA | Full quality. Steps 1 to 200, default 40. |
| Turbo | Mac, NVIDIA | 8 fixed steps, much faster. For drafts and quick looks. |
| Base fp8 | NVIDIA only | Smaller community weights. |
| Turbo fp8 | NVIDIA only | Smaller community weights, 8 fixed steps. |

**Precision** is `int8` (default, about half the memory) or `bf16`.

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Size | auto, fixed | auto | Auto with references: about 1 MP at the last reference's aspect. Auto without references, or fixed: width × height. |
| Width, Height | 256 to 4096 px, step 32 | 1024 × 1024 | The image size. Bigger costs memory fast. |
| Steps | 1 to 200 | 40 | Denoising steps. Base only; Turbo uses its own 8. |
| References | 0 to 10 images | none | Images to edit or combine, in order. Any reference makes the run an edit. |
| Transparent | on, off | off | Asks for an RGBA image with a transparent background. |
| No enhance | on, off | on | Turn it off to let Qwen's prompt enhancer rewrite the prompt and pick an aspect for an auto size. |
| Think | on, off | off | The enhancer thinks longer: a better prompt, minutes slower. |
| Tiled decode | auto, on, off | auto | Tiling cuts decode memory but changes pixels slightly. Auto tiles above 2.5 MP. |
| LoRA rows | up to 8, strength 0 to 2 | none | LoRAs from your library. |
| Seed | -1 or a number | -1 | -1 is random. The same seed and settings repeat a take. |

Quick tiles on Create add Elements and Looks (film, camera, colour, lighting) to the prompt.

## References

Add up to 10 images. In the prompt, name them `<image1>`, `<image2>` and so on, in order:

```text
Put the jacket from <image2> on the person in <image1>, studio light.
```

## Presets

| Preset | Sets |
|---|---|
| Plain | No enhance |
| Enhanced | The enhancer, Think off |
| Enhanced, think | The enhancer, Think on |

Enhance needs two add-ons on the host that runs it: the **Text enhancer** (used without references) and the
**Edit enhancer** (used with them). Each is a 9B model. Without them the presets that enhance are greyed out.

## Good values

- **Draft:** Turbo with the Plain preset.
- **Final:** Base at 40 steps. Use Enhanced for short prompts.
- **Portrait:** 832 × 1216 or similar. **Wide:** 1344 × 768.
- **Product shot:** clear words for the subject. Turn on Transparent when you need a cut-out.

## Memory and speed

- `int8` uses about half the memory of `bf16`.
- Memory grows quickly with the image size, and each reference adds more.
- The enhancer runs on its own before the image model, then unloads.
- Turbo is much faster than Base at the same size.

## Ask

The family also has an **Ask** workflow that uses Qwen Image's own text encoder (Qwen3-VL 8B) to answer questions
about takes. See [Ask](/models/ask/).
