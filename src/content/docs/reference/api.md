---
title: API overview
description: How to call the helmstudio HTTP API - base URL, authentication, errors, long work and live updates.
sidebar:
  order: 2
---

Everything the studio does is available over HTTP. The web app, the `helm` command line and the MCP server all use
the same API. This page covers the rules every call follows; the [HTTP API reference](/reference/http/) lists every
endpoint with its request and response shapes.

## Base URL

All calls go through the gateway. On a local install that is:

```text
http://localhost:8300
```

| Prefix | Served by | Covers |
|---|---|---|
| `/auth/` | auth | Sign-in, tokens, users and API keys |
| `/v1/studio/` | studio | Sessions, workflows, runs, takes, the library, pipelines, timelines, models, hosts |
| `/files/` | files | Signed downloads and uploads |

## Authentication

Every `/v1` call needs two things:

- **An API key** in the `x-api-key` header. It identifies the calling application. An admin creates API keys on the
  Admin screen, under **API keys**.
- **An access token** in the `Authorization: Bearer <token>` header. It identifies the user.

Get a token by signing in with an email and password. The access token is short-lived; use the refresh token to get
a new pair.

```bash
curl -s http://localhost:8300/auth/signin \
  -H "x-api-key: $HELM_API_KEY" \
  -H "content-type: application/json" \
  -d '{"email": "you@example.com", "password": "…"}'

curl -s http://localhost:8300/v1/studio/sessions \
  -H "x-api-key: $HELM_API_KEY" \
  -H "authorization: Bearer $ACCESS_TOKEN"
```

There is no public sign-up. The admin creates every account.

Signed `/files` links carry their own signature, so they need no key or token.

## Errors

Errors are JSON with one field:

```json
{"detail": "a short reason"}
```

| Status | Means |
|---|---|
| `401` | Missing or expired token. |
| `403` | The call needs a role you do not have, such as admin. |
| `404` | Not found. **Another user's id is also a 404**, as is a malformed id. |
| `409` | The resource's state forbids the call, for example a run that has already finished. |
| `422` | Invalid input. `detail` says which rule failed. |
| `503` | A service behind the gateway is not answering. Try again. |

Errors from the gateway itself, such as a missing API key or a rate limit, use `{"message": string}` instead.

## Long work answers 202

A call that starts long work, such as a run, answers `202 Accepted` at once with the new resource. Follow its
progress through the event stream rather than waiting on the request. Every other call that changes something
returns the updated resource.

## Live updates

Follow a session with:

```text
GET /v1/studio/sessions/{session_id}/events
```

- With `Accept: text/event-stream` it is a server-sent event stream. Each event's `id` is its sequence number, and
  the stream sends a keep-alive comment every 15 seconds. To resume after a drop, send the last id in the
  `Last-Event-ID` header.
- Without it, the same URL answers JSON: the events after `since`, for polling.

Batches and Assistant chats have event streams of the same kind.

## Files

Takes and other files come back as signed, time-limited `url` fields. Treat them as opaque links. They support range
requests, so video can be streamed. Uploads start with an API call that returns a single-use upload link; the file is
then sent to that link.

## Ids

Ids are UUIDs, except workflow ids and host names, which are short strings.
