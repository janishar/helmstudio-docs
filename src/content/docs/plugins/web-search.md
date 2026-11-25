---
title: Web search
description: Lets the Assistant search the web. Free, no key, and it asks before anything leaves your machine.
sidebar:
  order: 2
---

Web search is a built-in plugin of kind **Assistant tools**. It gives the [Assistant](/studio/assistant/) one tool,
`search`, so it can look things up on the web while it helps you.

## What it does

- Searches **DuckDuckGo** first. When DuckDuckGo refuses (it often answers scripts with no results), it tries
  **Bing**, then **Google**, then **Yahoo**.
- Free, with no key and no account.
- Returns up to 10 results (5 by default), each a title, a link and a short snippet.

In the chat, a search shows as a line such as **Searched the web · "…"**, with the first three results as short
sources and **+ N more** for the rest.

## What leaves your machine

Only the search words. Every search asks first: the Assistant shows a card with the query, tagged **sends off the
machine**, and you answer **Yes** or **Not now**.

## Turn it on

It is off until an admin turns it on.

1. Open **Hub** in the rail, on the **Assistant** tab.
2. Under **Tools**, turn on **Web search**.

It starts by itself on the Mac and shows **Starting…**, then **Running** in **Hub › Plugins**. It stays on across app launches until you
turn it off. See [Plugins that start themselves](/plugins/#plugins-that-start-themselves).

## Limits

DuckDuckGo has no official search API. The plugin reads public result pages through an unofficial library, so a
search can be rate-limited or stop working when the pages change. It is not affiliated with or endorsed by any of
the search engines, and their terms apply to you.

When the engines rate-limit it, the chat line says so: wait a minute and ask again.
