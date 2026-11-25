---
title: Admin
description: Manage accounts, GPU hosts, API keys, model providers and which model each AI job uses.
sidebar:
  order: 7
---

The **Admin** screen is for the admin only. It has five tabs: **Users**, **Hosts**, **API keys**, **Model
providers** and **AI agents**.

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

## Model providers

Model providers are the text models that power the Assistant, pipeline agent nodes and session names. They never
make images, video or sound; those always run on your own hosts.

There are two kinds:

- **Local server**: any OpenAI-compatible server you run on a local or private address, such as Ollama, LM Studio or
  llama-server. Set the **GPU host** it runs on and its **Memory, GB**; that host keeps the memory reserved.
- **Remote**: a hosted provider over https: DeepSeek, OpenAI, Anthropic, Google Gemini, OpenRouter, Groq or Mistral.
  Remote providers work only while the deployment's remote switch is on.

### Add a provider

1. Choose **Add a model provider**.
2. Pick a **Preset**. It fills the form; every field stays editable.
3. Set the **Title users see**, and check the **Base URL**.
4. For a remote provider, paste the key under **API key** and press **Save key**. The key is checked with the
   provider, saved in a file on the server, and never shown again.
5. The models load from the provider. Tick the ones to use (up to 16), mark one as **Default**, and set each one's
   **Thinking** level (**Off**, **On**, **Low**, **Medium** or **High**, where the model offers them). Some models
   always think.
6. Save.

If the provider does not list a model, type its **Model id** and press **Add**. **Refresh** asks the provider again.

### Manage a provider

- Once a key is found, **Replace key** swaps it (the old key stays until the new one is saved) and **Remove key**
  deletes it.
- Each row's **⋯** menu has **Test**, **Edit**, **Enable** or **Disable**, and **Delete…**.

## AI agents

This tab says which model does each AI job, and what each job sends out of the machine. Press **Edit** on a row to
change it.

![Admin › AI agents: the Assistant's model and caps per user, Context and cache, and session names](/screens/admin-agents.jpg)

### Assistant

- **Assistant on**: turns the in-app [Assistant](/studio/assistant/) on or off for everyone.
- **Provider and model**: any enabled provider and one of its models.
- **Chat window, tokens**: the chosen model's real limit (60000 until set; each model keeps its own). Past 70% the
  oldest half of a chat folds once into a short summary, so plans and decisions stay. A smaller window costs less per
  answer.
- **Web search**: comes from the Web search plugin when it is on in [Plugins](/plugins/); the Assistant asks before
  it sends anything off the machine. Otherwise pick a search provider added in Model providers.
- **Caps per user**:

| Cap | What it limits |
|---|---|
| **Model calls a day** | Calls to the Assistant's model. |
| **Tokens a day** | Tokens the Assistant's model uses. |
| **Look at, an hour** | Takes it may look at with Look at. |
| **Messages a minute** | Messages a user sends. |
| **Auto takes, an hour** | Takes [Auto mode](/studio/assistant/#auto-mode) may start without asking (default 8). |
| **Auto GPU minutes, an hour** | GPU minutes Auto mode may use without asking (default 30). |

The thinking level is set per model in Model providers. Assistant tools such as web search, and skills, come from
plugins; see [Plugins](/plugins/).

### Prompt cache

Below the Assistant settings, **Prompt cache, last 30 days** lists each model with its **Calls** and **Cache hits**:
the share of prompt tokens the provider read from its cache, as each reply reported. Hits cost less. A model whose
replies report none is not listed. See [How it keeps long chats](/studio/assistant/#how-it-keeps-long-chats).

### Session names

Who names a new session from its first prompt:

- **Off**: titles stay as they are.
- **Local LLM**: Qwen3.8 27B on your own hosts. It uses the GPU queue and sends nothing out. Greyed while no host
  has it.
- **Remote**: an enabled model provider. A remote one sends the prompt out.
