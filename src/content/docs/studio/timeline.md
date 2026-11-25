---
title: Timeline
description: Cut takes into a sequence, direct new shots and voice lines in place, re-render, and export an MP4.
sidebar:
  order: 5
---

The Timeline is where takes become a film. You arrange clips in a sequence, cut them, generate new shots and voice
lines where they belong, and export an MP4.

## Sequences

The sequence bar at the top shows the open sequence with its size, frame rate and length, the render time of its
shots in all (for example ⏱ 12:40), its cast and look defaults, undo and redo, **New sequence** and **Export**.

- **New sequence**: give it a name. Its width, height and frame rate come from the first clip; with no clip yet it is
  1280 × 720 at 24 fps. Sound is 48 kHz.
- **Switch, rename or delete**: open the sequence switcher (**Sequences**). Deleting a sequence keeps its clips in
  the Gallery and cancels an unfinished export.
- **Defaults for new shots**: a sequence can carry a cast (elements) and a look. Every new shot starts with them.

## Add clips

- In the Gallery, choose **Add to timeline** on a take, or on several selected takes in order. They go to the
  sequence you opened last.
- On the Timeline, choose **Add clips** and pick takes from the Gallery picker.

Images become clips with a duration you set. A clip whose take was deleted shows as offline and never breaks the
sequence.

## Tracks

- **V1** holds the picture.
- **A1** is V1's own sound, drawn under it, always in step with the picture.
- Extra audio tracks hold music, voice lines and other sounds.

The preview plays across cuts without rendering anything.

## Editing tools

Pick a tool from the tool row, or press its key. **Esc** goes back to Select.

| Tool | Key | What it does |
|---|---|---|
| **Select** | A | Drag a clip to reorder it (on V1) or move it (on an audio track). Drag an edge to trim with ripple. |
| **Trim** | T | Drag an edge to ripple trim. Drag the cut between two V1 clips to roll it. Drag the body to slip the clip inside its take; hold ⌥ to slide it between its neighbours. |
| **Blade** | B | Click to cut a clip. Hold ⇧ to cut every track. |
| **Range** | R | Drag to mark an in and an out. |
| **Overwrite** | P | Drag a clip over what is already there. |

While you slip, a source window shows the part of the take you are using.

Other edits:

- **S** splits at the playhead; **⌘B** blades at the playhead, **⇧⌘B** on every track.
- **Delete** removes a clip and closes the gap (ripple delete); **⇧Delete** lifts it and leaves a gap.
- **[** and **]** trim a frame; **⌥[** and **⌥]** trim to the playhead.
- **,** and **.** slip a frame; with ⌥ they roll, with ⇧ they slide.
- **I**, **O** and **X** mark in, out and the clip; **⌥X** clears the range.
- **⌘Z** and **⇧⌘Z** undo and redo.

Press **?** for the full shortcut sheet.

### Snapping

Drags snap to cuts, the playhead, the range's in and out, and markers. Press **N** to turn snapping on or off; hold
⌘ while dragging to invert it for that drag.

### Playing and moving

- **Space** plays and pauses. **J**, **K** and **L** play back, stop and play forward.
- **←** and **→** step one frame (with ⇧, one second). **↑** and **↓** jump to the previous or next cut.
- **Home** and **End** go to the start and end.
- **Hover scrub** (**⇧S**) shows the frame under the pointer.

### Zoom

Use **⌘=** and **⌘−**, the **−** and **+** buttons, or Ctrl+wheel or a trackpad pinch to zoom at the pointer. **Fit**
(**⇧Z**) fits the whole sequence.

### Linked clips

A sound clip on an audio track can be linked to a V1 clip; it shows a link mark. When V1 ripples, the linked clip
moves with it. Removing the V1 clip removes it, and cutting V1 cuts it too. Selecting either selects both; hold ⌥ and
click to select only one.

### Markers

Press **M** to add a marker at the playhead. Markers sit on the ruler, can have a name and a colour, and are snap
points. A sequence holds up to 200.

### The clip inspector

Select a clip to set its in and out, a dissolve (**Transition in**), its gain in dB and mute, or to **Replace with
another take**. The line under its title names the take it comes from and the take's render time (⏱).

## Generate in place

Four things generate from the timeline. Each queues a normal run; while it works, the slot shows a placeholder with
progress, and the new take also lands in the Gallery.

**New shot.** At the playhead, in a gap, or from a selected clip, choose **New shot**. Create's composer opens docked
in the timeline, with the sequence's cast and look. Where the workflow has keyframes, you can start from the previous
clip's last frame or end on the next clip's first frame. Press **Generate shot**.

**Take actions on a clip.** A video clip offers its take's actions under "Generate from this clip", such as Retake
over the marked range or Extend. Choose where the result goes: **Replace** (keeps the clip's in and out; nothing
moves), **Insert after** or **Insert before**.

**New line.** Choose **New line** to open the voice composer at the playhead. Write a **Voice-over** or a
**Dialogue** for the sequence's cast, then press **Generate line**. The line lands on an audio track at the playhead.

**Re-render.** Select clips (or none, for the whole sequence) and choose **Re-render**. Pick a preset, for example a
final quality one, or keep each clip's own settings. It runs as one batch, a step per clip with that clip's own
workflow, seed and inputs; each result becomes its slot's take.

## Export

1. Press **Export**. The plan shows first:
   - **Stream copy** when every clip matches the sequence's size, frame rate and codec. It is fast and loses nothing.
   - **Re-encode** otherwise, to H.264. On a Mac it uses VideoToolbox.
   - Sound is always re-encoded (AAC), so cuts stay in sync.
2. Start the export. You can leave the screen: the export keeps going.
3. The MP4 lands in the Gallery as a take (**From Timeline**). Open it from the dialog when it is done.

With [Media tools](/plugins/media-tools/) on, you can trim or re-sound an export in the Gallery, and the Assistant can
look at its frames.

## Revisions

Every edit is saved as a revision; helmstudio keeps the last 100. Undo and redo walk through them. If the sequence
changed in another tab, the Timeline reloads and applies your edit to the new version.

Agents can list a sequence's revisions and restore an earlier one through [helm mcp](/mcp/tools/).
