---
title: Floating Headings Sidebar Obsidian Plugin
date: 2025.11.04
description: Obsidian plugin that displays a floating, collapsible outline of a note's headings on the right side of the editor.
image: https://i.imgur.com/FG4i6x2.png
github: https://github.com/k0src/Floating-Headings-Obsidian-Plugin
---

## Floating Headings Obsidian Plugin

<p align="center">
  <img src="https://i.imgur.com/FTu4b4S.png" width="400">
</p>

🔗 [GitHub Repository](https://github.com/k0src/Floating-Headings-Obsidian-Plugin)

---

Floating Headings is an [Obsidian](https://obsidian.md) plugin that displays a floating, collapsible outline of Markdown document's heading structure on the right side of the editor. It renders a minimalist collapsed sidebar with visual heading indicators that shows the full heading text when hovered.

### Features

- **Floating sidebar**: Collapsed view with visual heading indicators.
- **Hover expansion**: Full heading text in expandable panel.
- **Click navigation**: Jump to any heading instantly.
- **Filter search**: Search and filter headings in real-time.
- **Collapsible groups**: Expand/collapse heading hierarchies.
- **Position control**: Left/right sidebar placement and vertical positioning.
- **Level filtering**: Show only specific heading levels (H1-H6).
- **Custom parsing**: HTML tag stripping and regex pattern support.
- **Theme adaptive**: Automatically matches the Obsidian theme.

### How it Works

#### Heading Parsing

The parser supports three parsing modes with priority-based processing:

1. **Custom Regex Mode**: Uses user-defined regex patterns with named capture groups to extract specific heading text patterns.
   - For example, to extract the heading text from headings with backlinks (`[[]]`), we can use the regex patten `/^(#{1,6})\s+\[\[(?<heading_text>[^\]]+)\]\]\s*$/`.
   - Matches: `# [[Some Page]]` → `Some Page`
2. **HTML Parsing Mode**: Strips HTML tags before cleaning markdown.
3. **Standard Mode**: Markdown formatting cleanup (italics, bold, code, links).

#### State Management & Caching

The state manager maintains a cache of parsed headings to avoid redundant parsing operations. It generates cache keys from file paths and modification times, and to determine if headings need re-parsing, an optimization that checks if the current line or adjacent lines contain heading markers before triggering a full re-parse. This prevents unnecessary updates when editing content that's not a heading.

### Using the Plugin

1. Download the latest release from the [releases page](https://github.com/k0src/Floating-Headings-Obsidian-Plugin/releases).
2. Extract the files to your vault's `.obsidian/plugins/floating-headings/` folder.
3. Enable the plugin in Obsidian's Community Plugins settings.

#### Settings

Access via **Settings → Community Plugins → Floating Headings**

##### Basic

- **Enable plugin**: Toggle on/off
- **Enable filter**: Search headings in expanded panel
- **Hide panel on navigation**: Auto-hide after clicking headings
- **Sidebar position**: Left or right side placement
- **Vertical position**: Sidebar vertical positioning (0-100%)
- **Maximum heading level**: Filter by heading level (1-6)

##### Appearance

- **Panel width**: Expanded panel width (180-400px)
- **Panel max height**: Maximum panel height (100-800px)
- **Panel scroll position**: Top, previous position, or current header
- **Sidebar width**: Collapsed sidebar width (8-48px)
- **Line thickness**: Heading indicator line thickness (1-8px)
- **Animation duration**: Transition speed (50-500ms)

##### Advanced

- **Parse HTML elements**: Strip HTML tags from headings
- **Custom regex**: Define custom heading patterns with named groups

---

To view more features, documentation, and the source code of the plugin, visit the [GitHub repository](https://github.com/k0src/Typst-for-Obsidian).
