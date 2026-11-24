---
title: Models
description: See every model family, its variants and add-ons, and which machine has them; download weights per machine; keep your LoRAs.
sidebar:
  order: 6
---

The **Models** screen has two tabs: **Models** and **LoRAs**. Everyone can see both. Only admins download or delete
model weights.

For what each model is good at and its settings, see the [model pages](/models/).

## Families, variants and add-ons

- A **family** is one model, such as Qwen Image 2.1 or LTX-2.5. Each family's workflows are named after it on Create.
- A **variant** is one set of weights for a family. For example: **Base** (full quality), **Turbo** (fewer steps,
  much faster), **Distilled** (LTX: about 10 times faster than Dev), and fp8 or int8 community weights (smaller,
  NVIDIA only). A variant that runs on only one kind of machine says so, such as **Mac only**.
- **Optional add-ons** are extra downloads listed under a family, such as prompt enhancers, Turbo LoRAs and LTX's
  Detailer. A setting that needs a missing add-on is greyed on Create, with the reason.

## Which machine has them

Select a variant to see its folder, its parts and their sizes, and its state on each host:

- **present**: the weights are on that machine.
- **missing**: they are not.
- **partial**: some parts are there.
- **hash mismatch**: a file does not match; download it again.
- A download in progress shows its progress.

The host filter (**All hosts**) shows one machine at a time. Runs go only to a machine that has the weights; see
[Run on](/studio/create/#run-on).

## Download a model (admins)

1. Select the variant, or an add-on.
2. Choose **Download…**.
3. Check where it goes (**To host**), its **Size** and the free space, and read the licence text.
4. Tick **I accept this licence**. Some licences are non-commercial: read them.
5. Start the download. It runs on that machine, and the list shows its progress.

Each machine downloads its own copy. To put a model on a second machine, download it again with that machine chosen.

Some weights are gated on Hugging Face (LTX-2.5, for example). The dialog says so; the machine then needs a Hugging
Face token. See [Hosts](/start/hosts/).

To free disk space, choose **Delete from host**.

## The LoRA library

A LoRA is a small add-on file that teaches a model a style or a subject. The **LoRAs** tab holds them:

- **Yours**: LoRAs you uploaded. Choose **Upload .safetensors** to add one; progress shows on its tile. You can
  rename and delete your own. Each person can keep at most 50 LoRAs and 20 GB, 2 GB per file.
- **Shared**: LoRA files already on the machines' disks. An admin deletes one from one machine at a time.

Select a LoRA to see its details, including its licence.

### Use a LoRA

On Create, families that take LoRAs have a LoRA section in the Inspector. Choose **Add LoRA** and pick one; LoRAs
that do not fit the family are greyed, with the reason.

- A workflow takes at most **8** LoRA rows.
- Each row has a **strength** from **0 to 2**.
- Drag rows to reorder them, or use Alt+arrow keys.
