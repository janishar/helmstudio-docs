---
title: Troubleshooting
description: Common problems with the stack, the runners, models and the Mac app, and how to fix them.
sidebar:
  order: 1
---

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
- **A runner stalled, or you added a model.** Choose **Restart runners** in the menu bar menu.
- **Something is down** (red dot in the menu bar). Choose **Open logs** to see the app's log and each runner's log.

## Claude does not see helmstudio

- Run `claude mcp list`. If helmstudio is not connected, run `helm mcp` by hand: the error on start is the reason. Most
  often the sign-in has expired: run `helm login` again.
- Run `helm login` in a real terminal, not through a chat's `!` command: it asks for your password.
- Open a new Claude Code session. A session that was already open does not see a server added later.
- Claude Desktop needs the absolute path to `helm` and a restart after you change its config.

See [Use helmstudio from Claude](/mcp/).
