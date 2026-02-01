---
title: PresetBase
date: 2025.10.12
description: A community-sourced synth preset database. Browse presets used across different songs, artists, and albums.
image: https://i.imgur.com/qVg9i7J.png
github: https://github.com/k0src/PresetBase
---

## PresetBase

![PresetBase Screenshot](https://i.imgur.com/0f46flP.png)

🔗 [GitHub Repository](https://github.com/k0src/PresetBase) / 🌐 ~~Live Demo~~ (maintenance)

PresetBase is a community-sourced database of synth presets used in songs, across different artists, albums, and synths, and the relationships between them. It is built with React, Node.js, Express, TypeScript, and Supabase. Audio files and other assets are stored in Supabase Storage.

PresetBase is essentially the [WhoSampled](https://www.whosampled.com/) of synth presets”. It is meant for cases where you keep hearing the same sound across multiple songs and want to know where it comes from, how to recreate it, or just browse presets and synths used in music you like.

### Features

#### Site-Wide Search

Search PresetBase for songs, artists, albums, synths, and individual presets. The same search index is used everywhere to keep behavior consistent.

#### Browse Views

Browse trending presets, all-time most used presets, recently submitted entries, or browse entire categories such as songs, synths, or presets. Presets can also be browsed by era - view presets from 80s hardware synths or modern VST plugins.

#### Stats & Connections

A dedicated stats page aggregates usage data and relationships in the database. On this page, view presets used in the most songs, most widely used synths, and currently trending presets. You can also explore connections by seeing which songs share presets or synths.

> **Sample Stats:**
>
> - The presets “In Memoriam” (Spectrasonics Omnisphere) and “Organ 2” (Korg M1) are currently tied for first place, each appearing in 9 songs.
> - reFX Nexus is currently the most-used synth, appearing in 54 songs. Its most-used preset is “ST 70s Vinyl Strings”, with a usage count of 5.

Stats also reveal less obvious relationships, such as “underrated” synths. For example, the synth SQ8L (an emulation of the Ensoniq SQ80) by Siegfried Kullmann has relatively low overall usage, no other synths by this developer exist in the database, yet a few very popular songs use it exclusively.

#### User Submissions

Authenticated users can submit songs, synths, and presets. All submissions are reviewed and approved by site moderation before becoming publicly visible.

### Preset and Song Information

![Song Entry Page Screenshot](https://i.imgur.com/RXgbEuX.png)

Each song has a dedicated page showing all presets used in that track, the synth each preset comes from, and how the preset is used.

For each preset, you can listen to a short recreation of the of the specific track in the song corresponding to each preset. Any significant modifications to the original preset are listed when applicable, for example effects or processing that substantially alter the sound.

From this page, it is also possible to navigate to related entities, including other songs by the same artist, the album, the synth, and the preset itself.

Artists, albums, presets, and synths each have their own pages. The synth page shows general information about the synth, all presets for that synth in the database, and their original authors when known.

### Implementation

- **Frontend:** Built with React and TypeScript.
- **Backend:** Node.js with Express, written in TypeScript.
- **Database and storage:** Supabase used for the database, authentication, and file storage.
