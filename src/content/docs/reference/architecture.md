---
title: Architecture
description: The services behind helmstudio, how a run flows through them, and how each user's data stays private.
sidebar:
  order: 1
---

helmstudio is a set of small services behind one gateway, plus model runners that run on each machine with a GPU.
Go services own sign-in and the API. Python owns model execution and pipelines. Postgres holds the data, and NATS
JetStream carries the messages between services.

## Services

| Service | Built with | Does |
|---|---|---|
| Gateway | Kong, with an API-key plugin | The only entry point. Routing, API-key checks, rate and size limits, correlation ids. |
| auth | Go | Sign-in, refresh and sign-out; users and roles; API keys. Issues RS256 access tokens with rotating refresh tokens. |
| studio | Go | Every `/v1/studio` route: sessions, workflows, runs, takes, the library, pipelines, batches, timelines, models and hosts. Runs the dispatcher and the live event stream. |
| files | Go | Serves signed `/files` links from the object store, with range requests. Receives uploads. |
| pipelines | Python, LangGraph | Runs pipeline graphs and the in-app Assistant. Asks studio to create runs and resumes when they finish. Calls model providers for text. |
| runners | Python, one process per runtime on each GPU host | Execute workflow runs: the node graph, caching, which model parts stay loaded, LoRAs. Also ffmpeg jobs such as thumbnails and exports. |
| web | Next.js | The user interface, and a backend for it that holds the web app's API key and the user's tokens in httpOnly cookies. |
| Postgres | Postgres | One instance, with one database per service that needs one: auth, studio and pipelines. |
| NATS JetStream | NATS | Streams for commands, events and dead letters; key-value stores for the model registry, host state and cancels. |
| Object store | S3 API | Every take, upload, cached result and export. |

Runners come in three runtimes: **MLX** and **PyTorch** on a Mac, **PyTorch** on NVIDIA hosts, and **native** runners
that drive a model's own engine as a child process. On a Mac the runners run natively so they can use the GPU and
share its one memory budget. Model weights live on each host's own disk.

```
 browser ──▶ gateway ──▶ web ──▶ gateway ──┬──▶ auth ─────┐
                                           ├──▶ studio ───┼──▶ Postgres
                                           └──▶ files     │
                                                          │
              studio ◀──────▶ NATS JetStream ◀──────▶ pipelines
                                    ▲
                                    ├──▶ runner (MLX)      on a Mac
                                    ├──▶ runner (PyTorch)  on a Mac or an NVIDIA host
                                    └──▶ runner (native)   on a Mac or an NVIDIA host

  studio, files, pipelines and runners ──▶ object store (S3 API)
  runners ──▶ model weights on the host's own disk
```

## How a run flows

Long work, such as a run, never blocks a request. It flows through messages:

| Step | What happens |
|---|---|
| 1. Request | The UI asks studio for a run. Studio writes the run and an **outbox** row in one transaction, and answers `202 Accepted`. |
| 2. Command | When the dispatcher releases the run, a relay publishes the **command** for one host and runtime. |
| 3. Worker | The runner does the work. It reads and writes media in the object store and publishes **events**, each with a sequence number. |
| 4. Projector | Studio's **projector** applies the events to its tables, once each and in order, and appends them to the session's event log. |
| 5. Live updates | The UI follows the session's event stream over **server-sent events (SSE)**, and resumes from the last event id after a drop. |

Step progress and previews are too frequent to store. Runners send them live to the stream: each frame goes only to
the user who owns the session, and is never kept. When a take is done, a small strip of step previews is stored for
the scrubber.

Messages and rows hold **object keys**, never file bytes or URLs. Studio signs a time-limited `/files` link only for
a key the caller can see.

## The dispatcher

The run queue lives in studio, and the dispatcher decides what goes where:

- **One run at a time per host**, across runtimes, because they share its memory.
- **Order:** interactive runs go before batch items. Within each, users take turns. Among one user's runs, one that
  uses what is already loaded goes first.
- **Placement:** a host is eligible if it has the run's runtime, every weight file the run uses and enough memory.
  Among eligible hosts, it prefers one with the model already loaded, then the one idle longest. If no host is
  eligible, the run fails at once with the reason.
- **Run on:** a run sent to a named host never moves to another.
- **Retries:** if a host stops reporting, or a run makes no progress for too long, the run is queued again, once. A
  second loss fails it with the reason.
- **Cancel:** a queued run is cancelled at once. A running one stops at its next cancel point and keeps the takes
  already stored.

## Private by design

- **Two credentials.** An API key identifies the calling application, checked at the gateway. A short-lived access
  token identifies the user.
- **Owner-only rows.** Every row in the studio database has an owner, and Postgres row-level security lets each user
  read and write only their own.
- **Owner-only files.** Every object key sits under the owner's own prefix, and every message carries the owner.
- **Another user's id is a 404**, never a 403, so ids reveal nothing.
- **Nothing leaks through shared parts.** Cache keys include the owner. Host state shown to a user is redacted:
  another user's run shows as "busy".
- Models and GPUs are shared; galleries, sessions, library items, pipelines and timelines are per user.

## Contracts

Everything that crosses a service boundary has one written contract: the HTTP API as an OpenAPI document, each
message as a JSON Schema, and the model registry as a schema. Services are built and tested against these
contracts. See the [API overview](/reference/api/).
