---
title: System
description: Manage accounts, GPU hosts and API keys.
sidebar:
  order: 8
---

**System** is for admins only. It is in the rail after **Hub**, and has three tabs: **Users**, **Hosts** and **API
keys**. Everything AI (the Assistant, models for pipelines, model providers and plugins) is in [Hub](/studio/hub/).

The admin account itself is set on the server when helmstudio is installed. Its row is locked: its roles, password
and state can only change there. See [Install and run](/start/install/).

## Users

Every account, with its roles, state and last sign-in.

- **Add a user**: enter the **Name**, **Email** and a temporary password (at least 10 characters, or press
  **Generate**). Pick the roles and press **Create user**. Share the email and password with the person; they can
  change the password in [Settings](/studio/settings/). There is no public sign-up.
- **Roles**: **User** (Create, Gallery, Pipelines, Timeline) and **Dev** (also sees jobs and logs). The admin role
  belongs to the admin account alone and cannot be given here.
- **Reset password** sets a new password for the account.
- **Disable** stops an account from signing in; **Enable** lets it back.

Each person sees only their own takes, sessions, pipelines and sequences.

## Hosts

One card per machine with runners. Each card shows its runtimes (**Envs**), its memory budget and what fills it, the
**Current run**, and its **Resident components**: the model parts loaded in memory.

- **Pin** keeps a component loaded between runs. **Unload** frees it now.
- **Unload all** frees every component on the host, pinned ones included. A running run finishes first; pins stay set.

Select a host to change its **Host settings**. They apply to every runtime on it, at once:

- **After the queue drains**: **Unload everything**, **Keep warm**, or **Keep pinned only**. Only Unload everything
  is sure to give the memory back.
- **Idle timeout, minutes** (0 = never).
- **Memory reserve, GB**: the budget is the machine's memory (the GPU's on an NVIDIA host) minus this reserve.
- **Evict all** empties the host now.

To add a machine, see [Hosts](/start/hosts/).

## API keys

Application keys let services and the `helm` command line talk to helmstudio. The tab lists **Active keys** with
their prefix, dates and last use, and **Revoked** ones.

- **New key**: keys are made on the server, not in the browser. Copy the command shown (**Copy command**) and run it
  where the auth service runs. The full key is printed once.
- **Revoke** a key: every request with it is refused from then on.

See [helm CLI](/mcp/helm-cli/) for using a key.
