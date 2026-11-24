---
title: MiniMax H3 Image
description: High-resolution stills and edits with up to 16 reference images.
sidebar:
  order: 2
---

MiniMax H3 Image makes high-resolution stills. It always renders at least 4 MP, and its default size is
2048 × 2048. It is also strong at edits that combine many reference images.

- **Media:** images
- **Runtime:** PyTorch, on a Mac or an NVIDIA host
- **Workflow:** MiniMax H3 Image. Without references it is text to image; with any reference it is an edit.
- **Licence:** MiniMax-H3-Image Community License. You accept it before the download.

## Variants

| Variant | Where | Notes |
|---|---|---|
| Base | Mac, NVIDIA | Stored as bf16 and always quantised to `int8` when it loads. |
| Base fp8 | NVIDIA only | Smaller community weights, fp8 as stored. |

The model samples in **6 fixed steps**. It has no steps, CFG or negative prompt settings.

## Settings

| Setting | Range | Default | What it does |
|---|---|---|---|
| Size | auto, fixed | auto | Auto with references: the first reference's aspect (from 1:4 to 4:1) at the area of width × height. Auto without references, or fixed: width × height. |
| Width, Height | 256 to 8192 px, step 32 | 2048 × 2048 | The image size. Below 4 MP the model still renders 4 MP and resizes after. |
| References | 0 to 16 images | none | Images to edit or combine, in order. Alpha is dropped. |
| Sampler | euler, lcm | euler | Euler repeats exactly with the same seed. LCM does not repeat on another machine. |
| No enhance | on, off | on | Turn it off to let the Enhancer rewrite the prompt and pick an aspect for an auto size. |
| Think | on, off | off | The Enhancer reasons longer: a better prompt, slower. |
| Seed | -1 or a number | -1 | -1 is random. |

## References

Add up to 16 images. In the prompt, name them `<Picture 1>`, `<Picture 2>` and so on, in order:

```text
The woman from <Picture 1> sitting in the café from <Picture 2>, golden hour.
```

## Presets

| Preset | Sets |
|---|---|
| Plain | No enhance |
| Enhanced | The Enhancer, Think off |
| Enhanced, think | The Enhancer, Think on |

The **Enhancer** is an optional add-on (a 27B model). The presets that enhance need it on the host that runs them.

## Memory and speed

- It is a heavy model: about 39 GB peak on a Mac, and about 2 to 2.5 minutes a run.
- The Enhancer, the text encoder and the image model never sit in memory together. A run loads each in turn.
- Each reference adds memory. Many references may not fit on a smaller machine; the run then fails with the reason.

Use [Qwen Image](/models/qwen-image/) for fast drafts, and MiniMax H3 Image when you need a large, detailed final.
