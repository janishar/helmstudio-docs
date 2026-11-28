---
title: Troubleshooting
description: Common problems with the stack, the runners, models and the Mac app, and how to fix them.
sidebar:
  order: 1
---

## "helmstudio is starting"

The app is restarting or can't be reached yet, for example while it updates. The page retries by itself every few
seconds and loads the studio as soon as it answers. **Retry** tries at once.

## A red dot on the logo

When a runner or the studio is down, the helmstudio logo above the rail gets a red dot, and its label says what:
**Runner down**, **No runner** or **Studio down**. Click the logo (or press Enter on it) to open the status panel:
the studio, each runner on each host, and each NVIDIA host, with its state. **Esc** closes it.

- In the Mac app, **Restart runners** restarts this Mac's runners. In a browser, restart them from helmstudio on the
  Mac.
- **Open Models** shows which models are on which machine.

The dot turns red only for a runner that was up since you opened helmstudio and then stopped. A machine that was
already off, such as a remote Mac you keep off, and an NVIDIA host you turn off show grey, **Offline since …**, in the
status panel. A runner off for over an hour no longer raises the dot either. When all is well, there is no dot and
the logo goes home.

## "Studio isn't answering"

A banner at the top of every page says **Studio isn't answering. Retrying…**, with the time to the next try. While it
shows, Generate and other keys that need the studio are greyed. **Retry** checks at once. When the studio answers, the
banner says **Back online** and every page loads again. A Magic edit made meanwhile is kept and sent when the studio
is back.

## Generate says "No runner for …"

No runner for that model's runtime is on, for example **No runner for mlx**. The line under the composer says what to
do: start helmstudio on your Mac, or pick another model or machine in Run on. Generate comes back by itself a few
seconds after a runner starts. A Magic block's Generate says the same.

**On T9 · not connected · Models** means every copy of the model is on a drive that is unplugged. Plug it in, or
download a copy to a connected folder. See [Model folders](/studio/models/#model-folders).

## A run stopped or waits

- **Runner on … stopped · trying again (2 of 2)**: the runner stopped mid-run, and the run starts again once on a
  runner.
- **This run stopped**: the run failed, with the reason in plain words. **Retry** makes the same run again, with the
  same seed. **Show details** has the full error text.
- **Waiting · 2 ahead on …**: the machine is busy; the run starts when its turn comes.
- **Live updates paused**: the progress may be behind. It catches up when the connection is back; click it to try
  now.

## The stack does not become healthy

`make up` waits until every service is healthy and stops with an error if one is not.

1. Check that Docker is running.
2. See which service is unhealthy with `make ps`.
3. Read its logs with `make logs s=<service>`, for example `make logs s=studio`.

If a port is already taken on your Mac, change it in `deploy/.env` (for example `KONG_HTTP_PORT`). If the stack's
network clashes with another one, change `HELM_NET` there. Then run `make up` again.

For production, use `make prod-ps` and `make prod-logs s=<service>`.

## Docker was restarted

After Docker or OrbStack restarts, or the Mac reboots, the local stack does not fully come back on its own. Run `make up`.
Production restarts its services by itself unless you stopped them with `make prod-down`.

If the Mac no longer shows in [System › Hosts](/studio/system/#hosts) afterwards, restart the runners:

```sh
make runners-stop
make runners
```

## I cannot sign in as the admin

- The admin comes from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `auth_service/.env`. If `ADMIN_EMAIL` is empty, there is
  no admin. Fill both in and run `make up` again.
- The password is set only when the account is first made. If you changed it in the app, use the new one.

## The Mac does not show as a host

The Mac appears as host `mac` in [System › Hosts](/studio/system/#hosts) once its runners are up.

- The runners need a running stack. Run `make up` (or `make prod`) first, then `make runners`.
- For production, start them with `make runners STACK=prod`. Runners join one stack at a time: run
  `make runners-stop` before switching.
- Read the runner's log: `runner_service/.run/runner-mac-<env>.log`, where `<env>` is `torch`, `mlx` or `native`.
- If MiniMax H3 video or ZONOS3 never run, the native binaries may not have built. `make runner-native` builds them;
  it needs the Xcode Command Line Tools, CMake and Rust.

## A model is missing

A workflow whose weights are on no host cannot run. An admin downloads the model in [Models](/studio/models/): pick the
variant and the host, read the licence and accept it. Downloads happen per host, so a model on one machine is not on
another.

On a separate NVIDIA host, downloads need `MODELS_MODE=rw` in its `deploy/gpu-host/.env`.

## A download says the repo is gated

Some models, such as [LTX-2.5](/models/ltx/), are gated on Hugging Face. The host needs a Hugging Face token whose
account has access to the repo.

- **On a Mac, or an NVIDIA card on the stack's machine:** put the token in `deploy/secrets/hf_token` in the
  helmstudio folder the runners start from, readable only by you.
- **On a separate NVIDIA host:** put it in `deploy/gpu-host/secrets/hf_token`, readable only by the runner.

If the download still fails with "the token was refused", check that the token's account has accepted the model's
terms on Hugging Face.

## A run fails at once because it is too big

Before a run starts, the studio checks its peak memory against every host. If it fits on none, the run fails at once
and says why. To make it fit:

- lower the size or the length;
- pick a lower precision, such as int8 or int4;
- use a lighter variant or preset;
- pick another host in Run on.

A host that cannot take a run is greyed out in Run on, with the reason.

## A run waits a long time

Each host does one run at a time; other runs wait in a queue. A run set to a named host waits for that host, even if
another one is free. Choose **Auto** in Run on to let any eligible host take it.

## Remote model providers are not offered

On the local and production stacks, calls to remote providers are off by default. Set `REMOTE_MODELS=on` in
`deploy/.env` and run `make up` (or `make prod`) again. Then add a provider in [Hub › Providers](/studio/hub/#providers).

## The Assistant

- **It shows a message instead of a chat.** It is not set up yet, or it is off. An admin sets it up or turns it on
  from the drawer, or in [Hub › Assistant](/studio/hub/#assistant). See
  [Before it is set up](/studio/assistant/#before-it-is-set-up).
- **The message box is shut.** You reached a per-user cap. It opens again when the cap resets, or when the admin
  raises it.
- **"The model gave a broken answer twice."** Press **Retry**. If it keeps happening, the model may be too small for
  the job; the admin can pick another in Hub › Assistant.
- **Auto mode keeps asking.** A step past this hour's Auto cap, a delete, anything sent off the machine, or a run with
  no time estimate yet always asks. Its line says why. See [Auto mode](/studio/assistant/#auto-mode).
- **It forgot the start of a long chat.** The oldest part folds into a summary once the chat fills the model's window.
  Plans and shot lists stay: a film's shot list lives in Memory › Projects. The admin can raise the
  **Chat window** in Hub › Assistant if the model allows it.

## The Mac app

- **A first-open step failed.** The screen says which step. **Show log** opens its log; **Try again** goes on from
  that step.
- **A runner stalled, or you added a model.** Choose **Restart runners** in the menu bar menu. **Restart stack**
  restarts the services and the runners.
- **Something is down** (red dot in the menu bar). Choose **Open logs** to see the app's log and each runner's log.
- **"helmstudio stopped answering".** A window lists what is down. What you made is saved; runs that were going show
  as failed. **Restart** starts the services and the runners again (about a minute). It also comes back by itself
  when the studio answers.
- **"The mlx runner keeps stopping"** (or "didn't start"). After 5 stops in 10 minutes a runner is not restarted
  until you say so. **Restart runner** starts it again; **Show log** opens its log.
- **"Port … is in use".** Another app holds a port helmstudio needs. Quit that app, or type another port and press
  **Try again**.
- **"Your models folder on … isn't connected".** Plug the drive in and the start goes on by itself, or press
  **Continue** to start with the models on this Mac, or **Choose folder…** to pick another.
- **"Only N GB free".** helmstudio needs about 10 GB free to make takes and load models. Free some space, or press
  **Continue anyway**.
- **Quitting while runs are going.** The app asks first; the runs show as failed in Create, and **Retry** starts them
  again.
- **"The studio page didn't load".** **Reload** tries again; it also reloads by itself when the studio answers.

## Claude does not see helmstudio

- Run `claude mcp list`. If helmstudio is not connected, run `helm mcp` by hand: the error on start is the reason. Most
  often the sign-in has expired: run `helm login` again.
- Run `helm login` in a real terminal, not through a chat's `!` command: it asks for your password.
- Open a new Claude Code session. A session that was already open does not see a server added later.
- Claude Desktop needs the absolute path to `helm` and a restart after you change its config.

See [Use helmstudio from Claude](/mcp/).
