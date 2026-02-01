---
title: Typst SSG
date: 2026.01.05
description: Full-stack music streaming application built with React, Node.js, and PostgreSQL.
---

## Typst SSG

![Typst SSG Screenshot](https://raw.githubusercontent.com/k0src/Typst-SSG/master/assets/tssg.png)

🔗 [GitHub Repository](https://github.com/k0src/Typst-SSG) / 🌐 [Live Demo](https://k0src.github.io/Typst-SSG/)

---

Typst SSG is a static site generator that compiles [Typst](https://typst.app/) documents to PDF and renders them in a browser viewer. Pages are written in Typst markup, compiled to PDF, then displayed in the DOM using a PDF viewer.

The Typst static site generator framework is an [npm package](https://github.com/k0src/Typst-SSG-Package) that Compiles Typst documents to PDF and renders them in a browser viewer with PDFium. The [Typst package](https://github.com/k0src/Typst-SSG-Util-Package) can be imported into a Typst file to use custom utility functions for Typst SSG.

### Creating a Static Site with Typst SSG

**Prerequisites**:

- Node.js ([download](https://nodejs.org/))
- Typst ([install](https://github.com/typst/typst#installation))

To create a static website with Typst SSG, first, install the npm package:

```bash
npm install typst-ssg
```

Then, use the `init` command to project structure for a new site:

```bash
npx tssg init my-site
cd my-site
```

**Example project structure:**

```txt
project/
├── src/
│   ├── pages/                # Pages content (required)
│   │   ├── index.typ         # Root layout
│   │   ├── home.typ          # Home page
│   │   └── blog/
│   │       ├── index.typ     # Blog layout
│   │       └── post.typ      # Blog post page
│   ├── components/           # Reusable components
│   │   └── card.typ
│   └── assets/               # Assets (images, etc.). Favicons go here
│       └── image.jpg
├── build/                    # Generated build output
├── tssg.config.js            # Config file
└── package.json
```

### Adding Content

The `pages/` folder contains the Typst (`.typ`) files that make up the individual pages of the website. The arrangement of the files in this folder defines the structure of the site.

- `pages/home.typ` → `/` (if set as `indexPage`)
- `pages/about.typ` → `/about/`
- `pages/blog/post.typ` → `/blog/post/`

index.typ files with a `#let layout(body) = { ... }` function define layout styles for pages contained in that folder. Other `.typ` files are rendered as pages.

### Configuration

Site configuration is managed using a config file, `tssg.config.js`, in the project root.

**Example `tssg.config.js`:**

```js
export default {
  // Source directory (default: "./src")
  src: "./src",

  // Output directory (default: "./build")
  output: "./build",

  // Base path for deployment (default: "/")
  // For GitHub Pages project sites, use "/repo-name/"
  // For user/org sites or custom domains, use "/"
  base: "/",

  // Which page maps to root route "/" (default: "index.typ")
  indexPage: "index.typ",

  // Layout inheritance: "none" | "fallback" | "merge" (default: "fallback")
  // - none: Pages only use same-directory layout
  // - fallback: Pages use nearest parent layout
  // - merge: Pages merge all ancestor layouts' set statements
  layoutInheritance: "fallback",

  // Maximum layout merge depth (default: 5)
  maxMergeDepth: 5,

  // PDF rendering quality multiplier (default: 2.0)
  // Higher = better quality but larger files and slower rendering
  pdfQuality: 2.0,

  // Sidebar configuration
  sidebar: {
    // Enable/disable sidebar globally (default: true)
    enabled: true,
  },

  // Table of contents configuration
  toc: {
    // Enable/disable TOC globally (default: true)
    enabled: true,

    // Minimum heading level to include (default: 1)
    // 1 = top-level headings only, 2 = second-level, etc.
    minLevel: 1,

    // Maximum heading level to include (default: 4)
    maxLevel: 4,
  },

  // Theme configuration for sidebar and TOC
  theme: {
    // Sidebar styling
    sidebarBg: "#f8f9fa", // Background color
    sidebarTextColor: "#333", // Text color
    sidebarActiveColor: "#007bff", // Active page highlight color

    // TOC styling
    tocBg: "#f8f9fa", // Background color
    tocTextColor: "#333", // Text color
  },
};
```

You can also configure sidebar and TOC on individual pages using the `page-config()` function in a Typst file:

```typ
#import "@local/tssg-util:0.1.0": page-config

// Disable sidebar and TOC on this page
#page-config(sidebar: false, toc: false)

// Or customize TOC levels for this page
#page-config(toc-min-level: 2, toc-max-level: 3)
```

### Viewing the Site

To view a live preview of the site:

```
npx npm run dev
```

To build the site for production:

```
npx npm run build
```

---

More information on the framework API can be found on the [GitHub repository](https://github.com/k0src/Typst-SSG-Package) for the npm package.
