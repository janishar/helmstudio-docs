---
title: What's new in 0.1.0-alpha.6
description: The latest release, with Magic and its director Assistant, an Assistant that listens, audio fades, crossfades and ducking, music and sound effects on Create, several model folders per host, a new rail and clearer error states.
sidebar:
  label: What's new
  order: 6
---

0.1.0-alpha.6 is out, released on 28 November 2026 as a pre-release. Get it from
[GitHub releases](https://github.com/janishar/helmstudio/releases). On a Mac from 0.1.0-alpha.2 on, choose
**Check for updates…** in the app's menu. New installs:
[Install and run](/start/install/).

## Magic

A new page in the rail, after Create, to lay out a short film in time.

- **New board** asks the name, the size (four presets or a custom width and height) and the frame rate. They stay
  as set; the top bar shows them with a lock.
- Lanes for the **Assets** row, **Storyboard**, **Shots**, **Voice**, **Music**, **Sound**, and lanes you name.
- **Add** at any point on a lane: a shot, a still, a line, a dialogue, a music cue, a sound or a storyboard frame,
  5 s, 10 s or a custom length. **From Gallery** places a take you already have.
- Every block is a generation with a preview and a status: draft, running, done, out of date or failed.
- The same few fields for every model of a kind, a **Variant** choice beside the model (Base or Turbo, for example),
  and each model's own settings under **Advanced**. Every run and take says the variant it ran on.
- Characters, props and places as the board's own assets, with `@` picks. **Make views** draws their views on Qwen
  Image Turbo at about 1K (3:4 for a character, square for a prop), with your own views too, and a line to change the
  size, variant and precision. A view opens full screen on a click.
- Storyboard frames in the film's own style (**Film**, the default), or **Sketch**, **Rough** or **Full**.
  **Generate from board** and the **Rough cut**.
- Voice and music tied to their shots, dialogue lines on each speaker's voice, songs with their sections, and sounds
  made from a shot's video. Voice, music and sound blocks have a **Level** in dB, with **Louder** and **Quieter**.
- Joins: cut, dissolve, fade, wipe and a generated morph. Effects: grade, slow and stabilize.
- **Play** plays the board from the playhead: the shots, or the storyboard frames where there are no shots yet.
- **Run board** shows its estimate; runs above your limit (10 GPU minutes by default) ask first. **Stop** stops a block's run, and **Stop runs**
  stops the board's.
- One warning icon at the bottom left gathers the blocks that failed, are out of date or no longer fit, each with its
  fixes, and **Run all**.
- Snapshots and history, **Undo** and **Redo**. Boards name themselves. The player has a full screen (**F**; **Esc**
  comes back).
- **Export** makes the MP4 in one press. **Send to Timeline**, beside it, always makes a new sequence; it never
  changes one you have.

More in [Magic](/studio/magic/) and on the [Magic page](/magic/).

## Audio fades, crossfades and ducking

- Every Timeline audio clip and every Magic voice, music and sound block has a fade in and a fade out, 0 to 10 s:
  drag the handles at its top corners, type them in, or right-click **Fade in…**, **Fade out…** or **Remove fades**.
- **Crossfade into next** blends a music or sound block into the next on its lane, or an audio clip into the one
  touching it. On a board, the cue runs longer so the two overlap. A take made before the crossfade dips instead,
  with a warning and **Run again**.
- **Duck music** dips music under voice (−12 dB by default): on for a new Magic board, off for a new sequence.
- The player and Export apply all of it.
- Drag the playhead by its line anywhere down the lanes, in Magic and on the Timeline.

More in [Magic](/studio/magic/#fades-crossfades-and-ducking) and on the
[Timeline](/studio/timeline/#fades-crossfades-and-ducking).

## The Assistant

- **On Magic** it works as a director, with the built-in **Magic director** skill: a plan you OK before any GPU
  time, then the board, the assets and their views, the characters' voices, frames, shots, sound, a review and the
  send.
- Its change is drawn on the board first, for you to **Apply** or **Discard**. History marks it **by Assistant**. Its
  edits apply on top of takes that land while it works.
- It designs a speaking character's voice and keeps the one you pick; that card's **Yes** is your tick that you have
  the right to use the voice.
- Runs above your limit ask first, with the estimate. Storyboard frames run without asking. **Stop** offers **Stop
  its runs too**.
- Every step shows as a line the moment it starts, and ticks when done. An answer shows its steps first, then the
  answer, then the choices. While a card waits, the choices are off: answer the card.
- One answer can take up to 12 steps at once.
- **It watches and listens.** A video goes to it as one picture of 12 frames with their times. Every video and audio
  take has exact facts: length, loudness, peak, silence at the ends, an abrupt end and scene cuts, measured the first
  time it asks. And it can listen: a local model, [Qwen Omni](/models/qwen-omni/), hears a take and answers its
  question, with a transcript. The answer says which model replied.

More in [On a Magic board](/studio/assistant/#on-a-magic-board).

## Create: Music and Sound

- Create's kinds are now **Image**, **Video**, **Voice**, **Music** and **Sound**, each tab with its kind's orb.
  Voice is what Audio was.
- **Music** with [MiniMax Music 3](/models/minimax-music3/) (the default: best sound, slower) and
  [ACE-Step 1.5](/models/ace-step/) 2B turbo or XL turbo (fast, with BPM, key and a reference song). Long lyrics
  scroll after 10 lines; **Expand** opens them big.
- ACE-Step's **Repaint**, **Cover** and **Extend** work on any music take.
- **Sound** with [Stable Audio 3](/models/stable-audio-3/) (fast effects from words, 4 variations at a time) and
  [MMAudio](/models/mmaudio/) (from words, or matched to a video, which also gives the video with its new sound).
- The Gallery filters **Voice**, **Music** and **Sound**. Music takes show as album covers, sound and voice takes as
  orbs.

More in [Music](/studio/create/#music) and [Sound effects](/studio/create/#sound-effects).

## Model folders

- A host can keep models in several folders, such as a folder on the Mac and an external drive. Admins edit the list
  on the Models screen.
- The list is a priority order: a model loads from the first folder that has it, then the next.
- A model on an unplugged drive shows **not connected**, not missing. The Models screen shows which copy is used and
  that another copy exists.
- Download asks which folder; Delete asks which copy.

More in [Model folders](/studio/models/#model-folders).

## The rail and the studio's state

- The rail is one panel: the six tools and the Assistant at the top; Hub, System and Settings at its foot. On a
  short window an admin's three fold into one **Setup** gear. The order is **Create**, **Magic**, **Gallery**,
  **Timeline**, **Pipelines**, **Models**.
- When a runner stops or the studio is down, the logo gets a red dot; click it to see what is down and restart the
  runners (in the Mac app). A machine that was already off, or an NVIDIA host you turn off, shows grey instead.
- While the Assistant is closed, its rail item shows a dot: yellow when a card waits, the accent colour for an answer
  you have not read.
- Clear messages when something isn't there: **Studio isn't answering** with a retry count, **No runner for …** on
  Generate, a run that stopped with **Retry**, **Waiting · 2 ahead**, and a model on an unplugged drive. While the app
  restarts, a **helmstudio is starting** page retries by itself.
- The Mac app says what is wrong and how to fix it: the studio stopped answering, a runner that keeps stopping, a port
  in use, the models drive unplugged, low disk, quitting with runs going. The menu bar adds **Restart stack**.

See [Troubleshooting](/help/troubleshooting/).

## helm mcp

- The Magic board tools: list, create and show boards, the kinds and their models, try and apply edits (with a
  block's level), restore, plan, run and stop runs, make views (with size, variant and precision), design and save a
  voice (`consent: true`), look at a time, and send to the Timeline. Fades, crossfades and Duck music in the board and
  timeline edits.
- `listen` asks the local listen model about a take; `get_take` adds the take's facts and a video's 12-frame picture.

See [MCP tools](/mcp/tools/#magic-boards).

## Smaller changes

- Image and video open on the fast variants: Qwen Image on **Turbo**, MiniMax H3 on its **Turbo** preset, LTX-2.5 on
  **Distilled**.
- Search in long lists: sessions, boards, sequences, chats, pipelines and batches, the element, look and voice
  pickers, users and API keys. Press **/** to search, **Esc** to clear; older items are found too.
- Create's text boxes keep one height and scroll, with **Expand**; the main box takes the composer's free height.
  The picked kind tab stands out.
- Scrollbars are thin and show only while you scroll.
- Every slider has the same look: a thin track filled up to the value and a round handle.
- A take card's title and the line under it no longer run into the card's edge, in the Gallery and every picker.

## Earlier releases

- **0.1.0-alpha.5:** a movable [Assistant](/studio/assistant/#move-it), setting popups and **All settings** on
  [Create](/studio/create/), **Clone** and self-named sequences on the [Timeline](/studio/timeline/), helmstudio's own
  right-click menus across the app, and host memory **Automatic** or **Custom** in [System](/studio/system/#hosts).
- **0.1.0-alpha.4:** [Hub](/studio/hub/) and [System](/studio/system/) in the rail for admins, the
  [Assistant](/studio/assistant/) for everyone with a one-step setup, a default model for pipelines (**Hub › In
  pipelines**), your Claude subscription with no key to paste, and install on Windows and Linux with Docker (one
  `compose.yml` per release; Windows is untested).
- **0.1.0-alpha.3:** an optional plugin to use your own Claude plan on the Mac, off by default.
- **0.1.0-alpha.2:** a much stronger [Assistant](/studio/assistant/) (full screen or a small bar, `@` to hand it
  takes, it sees images, **Auto mode**, shot lists that stick), [plugins](/plugins/) with
  [Web search](/plugins/web-search/), [skills](/plugins/skills/) and [Media tools](/plugins/media-tools/), render
  times on every take, a faster Gallery, and a Mac app that updates itself.

Every change is in the [changelog](https://github.com/janishar/helmstudio/blob/v0.1.0-alpha.6/CHANGELOG.md).
