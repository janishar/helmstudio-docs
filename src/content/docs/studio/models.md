---
title: Models
description: See every model family, its variants and add-ons, and which machine and folder has them; download weights per machine; keep your LoRAs.
sidebar:
  order: 7
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
- **not connected**: the only copy is in a folder that is not there now, such as an unplugged drive. It can't run
  until the drive is back. See [Model folders](#model-folders).
- A download in progress shows its progress.

The host filter (**All hosts**) shows one machine at a time. Runs go only to a machine that has the weights; see
[Run on](/studio/create/#run-on).

## Model folders

A host can keep models in more than one folder, for example a folder on the Mac and an external drive. When a host
has more than one, the Models screen shows a **Folders** strip for it: each folder's name, path and free space, and
a **Downloads** tag on the folder new downloads go to.

- A host chip shows which folder its copy is in, and **also on …** when another folder has a second copy.
- Select a variant: **Copies on** the host, in the side panel, lists each copy, the one **used** and any **spare**.

### Which copy is used

The list is a priority order. When a model is in more than one folder, the host loads it from the first folder in
the list that has a complete copy. When that folder is missing or its drive is unplugged, it loads from the next one
that has it, with no prompt. A model whose only copy is on an unplugged drive shows **not connected**, not missing.

Parts that two variants share are found in any folder of the list, so a variant on a drive can still load a shared
part from the Mac.

### Edit the list (admins)

1. Choose **Edit…** on the Folders strip.
2. Drag the folders into the order you want, or use the row's right-click menu: **Move up** and **Move down**.
3. Pick the folder downloads go to with its **Downloads** choice (or **Use for downloads** in its menu). The order
   and the downloads folder are separate.
4. To add a folder, type its path as the host sees it (absolute, or starting with `~/`), or press **Browse…** in the
   Mac app. The host checks that it exists; the downloads folder must also be writable.
5. Press **Save**. The host looks through its folders again.

A host takes up to 8 folders. **Remove** (✕, or **Remove…** in its menu) takes a folder off the list only; its files stay on disk. The last
folder can't be removed. In the Mac app, a folder's menu also has **Open in Finder**, and a model's menu **Show in
Finder**.

When the downloads folder is unplugged, downloads go to the next connected folder in the list.

On Windows and Linux with Docker, a runner in a container sees only the folders mounted into it. A folder that is
not mounted shows as not connected.

## Download a model (admins)

1. Select the variant, or an add-on.
2. Choose **Download…**.
3. Check where it goes (**To host**, and **Folder** when the host has more than one), its **Size** and the free
   space, and read the licence text. The downloads folder is picked first; an unplugged folder is greyed.
4. Tick **I accept this licence**. Some licences are non-commercial: read them.
5. Start the download. It runs on that machine, and the list shows its progress.

Each machine downloads its own copy. To put a model on a second machine, download it again with that machine chosen.

Some weights are gated on Hugging Face (LTX-2.5, for example). The dialog says so; the machine then needs a Hugging
Face token. See [Hosts](/start/hosts/).

To free disk space, choose **Delete from host**. When the model is in more than one folder of that host, pick which
copy to delete, or **Both**. Each copy shows the space it gives back and the free space after; the copy in use is
marked. A copy that is loaded or used by a run can't be deleted until it is free; the spare copy can always go.

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
