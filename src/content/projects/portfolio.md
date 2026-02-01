---
title: Custom Portfolio Site
date: 2026.01.30
description: A static portfolio website built with React, featuring custom Markdown processing with minimal dependencies.
image: https://i.imgur.com/mxITx2B.png
github: https://github.com/k0src/k0src.github.io
---

## Custom Portfolio Site

![Portfolio Screenshot](https://i.imgur.com/E3scuwL.png)

🔗 [GitHub Repository](https://github.com/k0src/k0src.github.io)

---

This portfolio website is a static single-page application built using React and TypeScript. It uses custom Markdown rendering with KaTeX support for math expressions, syntax highlighting for code blocks, and a minimal and responsive design. All custom content is written in Markdown files with YAML frontmatter, processed at build time, and rendered dynamically with custom parsing logic.

### Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Markdown**: Marked (parser), KaTeX (math rendering), Highlight.js (syntax highlighting)
- **Deployment**: GitHub Pages

### Features

- **Custom Markdown processing**: Parses Markdown files with YAML frontmatter using `gray-matter`
- **Math rendering**: Inline (`$...$`) and display (`$$...$$`) math expressions rendered with KaTeX
- **Syntax highlighting**: Code blocks highlighted with Highlight.js, supporting multiple languages
- **Theme system**: Light/dark theme toggle with persistent preference storage
- **Dynamic routing**: React Router handles navigation between projects, resume, and home
- **Static generation**: Content loaded at build time using Vite's `import.meta.glob`

### How it Works

#### Content Management

All content is stored as Markdown files in the `src/content/` directory. Projects are in `src/content/projects/*.md`, each with YAML frontmatter containing metadata like title, date, description, image, and GitHub link. The content loading system uses Vite's glob imports to eagerly load all Markdown files at build time:

#### Markdown & Math Parsing

The custom Markdown parser uses a multi-stage processing pipeline:

1. **Extract code blocks**: Code blocks are temporarily replaced with placeholders to prevent math parsing inside code
2. **Extract inline code**: Inline code is similarly protected from math processing
3. **Render display math**: Block math expressions (`$$...$$`) are rendered with KaTeX in display mode
4. **Render inline math**: Inline expressions (`$...$`) are rendered with KaTeX in inline mode
5. **Restore code**: Code blocks and inline code are restored to their original positions
6. **Parse Markdown**: The processed content is parsed with Marked, which also applies syntax highlighting

This ensures that dollar signs in code blocks aren't interpreted as math delimiters.

#### Routing Strategy

The site uses `HashRouter` instead of `BrowserRouter` for GitHub Pages compatibility. GitHub Pages serves all requests to the same `index.html`, but hash-based routing keeps the routing logic entirely client-side without requiring server configuration.

Routes are structured as:

- `/` → Home page
- `/projects` → Projects grid
- `/projects/:slug` → Individual project pages
- `/resume` → Resume page

Each project slug is its filename (e.g., `typst-ssg.md` → `/projects/typst-ssg`).

#### Theme System

The theme system uses React Context to manage light/dark mode state across the entire application. Theme preference is persisted to `localStorage` and automatically applied on initial load. CSS custom properties (`--bg-color`, `--text-color`, etc.) are updated when the theme changes.

---

To view the source code and implementation details, visit the [GitHub repository](https://github.com/k0src/k0src.github.io).
