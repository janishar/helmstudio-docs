---
title: Create
description: Make one image, clip or sound at a time, keep every take, and build on the ones you like.
sidebar:
  order: 1
---

Create is the main screen. You pick a workflow, write a prompt and press **Generate**. Each result is a **take**: it
shows on the stage, joins the session's strip and lands in the [Gallery](/studio/gallery/).

## The screen

- **Top bar**: the session menu, the workflow chip, the **Studio | Graph** switch and the memory chip.
- **Stage**: the take you are looking at, or the run in progress.
- **Takes strip**: this session's takes and runs.
- **Composer** (bottom): the **Image / Video / Audio** switch, the model chip, **Run on**, the prompt, the seed count
  and **Generate**.
- **Inspector** (right): the **Preset** chips and the workflow's settings, grouped in sections.

In a narrow window the row of input fields (for example First frame, Elements, Film, Camera and Lighting) wraps onto
more lines. The fields keep one width, as an even grid.

Before the first run, the stage gives way to a short "What will you make?" headline with the composer in the middle.

## Pick a workflow

A workflow is named after its model family, such as "Qwen Image" or "LTX-2.5". One workflow can do several tasks: Qwen
Image is text to image without references and an edit with them.

To pick one:

1. Choose **Image**, **Video** or **Audio** in the composer. The switch filters which workflows you are offered.
2. Open the workflow chip in the top bar and pick one. **Templates** are the ones that ship; **Mine** are your own.
3. To pick a variant of the model (for example Base or Turbo, and its precision), open the model chip in the
   composer.

A workflow whose model is not on any machine shows **Not downloaded · Models**. An admin downloads it on the
[Models](/studio/models/) screen.

Your own workflows can be renamed, duplicated and deleted from the workflow chip. To change a template, duplicate it
first.

Switching workflow keeps your prompt, references, elements, looks, canvas and seed where they still fit.

Picture and sound keep separate texts. Image and video workflows share one prompt; audio workflows keep their own
script. Switching to an audio workflow brings back the last script, never the picture prompt, and switching back
brings back the prompt.

## Studio and Graph

The same workflow has two views:

- **Studio** is a form: the composer and the Inspector.
- **Graph** is the workflow's node canvas. Each node is a card with the same settings.

Switch with the **Studio | Graph** control or **⌘\\** (Ctrl+\\). Editing one edits the other.

## Presets

A preset is a named set of values the workflow offers, such as Draft, Turbo or Quality. Choose one from the
**Preset** chips at the top of the Inspector. A preset that cannot apply right now is greyed, with the reason.

## Run on

**Run on** sits after the model chip. Choose:

- **Auto**: helmstudio picks a free machine that has the model's runtime, its weights and the memory. It prefers one
  that already has the model loaded.
- **A named machine**: the run goes there and never moves to another one.

A machine that cannot take the run is greyed, with the reason. Some variants run only on a Mac and some only on
NVIDIA. See [Hosts](/start/hosts/).

## Seeds

The seed setting decides the noise a run starts from. **-1** means random; the seed used is saved with the take. The
same seed and settings repeat a take.

To make several takes at once, raise the seed count beside **Generate** with **More seeds** and **Fewer seeds**.
Each seed is one run.

## Generate

Press **Generate** or **⌘+Enter** (Ctrl+Enter). The button shows the estimated time; hover it to see the planned
peak memory too. While a run is active the button reads **Add to queue**, and new runs wait their turn.

The button tells you when something stops a run, for example **Not downloaded**, **Pick a voice**, or a count of
problems to fix in the Inspector. A run too large for every machine fails at once with the reason.

While a run works, the run strip under the stage shows each step with its progress and the time left. To stop it,
press **Stop**.

Some workflows rewrite your prompt first (an enhancer). What it wrote shows in a card under the stage. The take still
keeps your own prompt.

## Sessions

A session is a project on Create: your prompts and their takes.

- **Names**: a new session names itself from its first prompt when your admin has set a model for it. A short
  "named by …" note appears once under the title.
- **Open or start one**: open the session menu (the title chip) and pick a session, or choose **New session**.
- **Rename**: in the session menu, choose **Rename**, type the title and press **Save**.
- **Delete**: in the session menu, choose **Delete**. Its runs go; its takes stay in the Gallery. You cannot delete a
  session while one of its runs is going: stop it first.

## Takes

Click a take in the strip to show it on the stage. The label at the top shows its render time, the time from the
start of the run to the file, for example **Take · ⏱ 1:14**.

On the stage you can:

- **Star** it.
- **Compare** it with another take (a wipe between two takes, or a grid of seeds).
- **Explain run**: see the settings after defaults, the preset, what each element or look added, the model and the
  planned memory.
- Open it **Full screen** (**F**). Esc closes it; the arrow keys step through the takes.

**Use in…** in the strip puts the take into another workflow's input: an image to edit or animate, a video to extend
or retake, a sound to drive a video. A video take also offers its **Last frame in…** and **First frame in…**.

To delete a take, open its **⋯** menu in the strip and choose **Delete**. It leaves the Gallery and Create and cannot
be undone. A failed or stopped run has a small ✕; **Clear** after the strip removes all of them at once.

More take actions, such as **Reuse settings**, **Save as element** and **Save as look**, are in the
[Gallery](/studio/gallery/)'s side panel.

## References

Workflows that take images (and, for MiniMax H3, videos and sounds) have a references list in the Inspector.

- Add a reference from the Gallery picker, or upload one by picking a file, dropping it or pasting it. An upload
  becomes a Gallery take first.
- Drag to reorder, or use Alt+arrow keys.
- Each reference shows how the prompt names it, such as `<image1>`.

How many references a family takes, and what they do, is on each [model page](/models/).

## Voices

Audio workflows speak in a voice. Click the **Voice** tile to open the voice picker. It has two tabs:

- **Presets**: voices that come with the models. Play one to hear it. They are read-only.
- **Mine**: voices you cloned or designed. You can rename and delete them.

Voices that do not fit the open workflow are greyed, with the reason.

### Design a voice

With Qwen3-TTS:

1. In the voice picker, choose **Design a voice**.
2. Describe the voice in words, for example "Male, about 60, low and warm, slow, a slight rasp".
3. Type a line to hear it say, and press **Hear it**. Each try may sound a little different.
4. Give it a name. The voice is kept under **Mine**.

### Clone a voice from a clip

With ZONOS3:

1. In the voice picker, choose **Clone from a clip**, or use **Save as voice** on an audio take.
2. Pick a take or upload a clip.
3. Drag over the waveform to choose 3 to 30 seconds of one clear speaker, with no music.
4. Name the voice and press **Hear it** to hear a line in it.
5. Tick **I have the right to use this voice**, then press **Save voice**.

The part you cloned is kept with the voice, so deleting the take later does not break it.

Some audio workflows have a **Voice-over | Dialogue** switch. In a dialogue, each script line starts with an
element's `@name`, and the line is spoken in that character's voice. See [Elements and Looks](/studio/elements-and-looks/).
