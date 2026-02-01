---
title: Typst for Obsidian
date: 2026.01.09
description: A Typst editor and renderer in embedded directly in Obsidian.
image: https://i.imgur.com/CAOWBGG.png
github: https://github.com/k0src/Typst-for-Obsidian
---

## Typst for Obsidian

![Typst for Obsidian Screenshot](https://raw.githubusercontent.com/k0src/Typst-for-Obsidian/main/assets/tfo-ss.png)

🔗 [GitHub Repository](https://github.com/k0src/Typst-for-Obsidian)

---

Typst for Obsidian is a [Typst](https://typst.app) editor integrated directly into [Obsidian](https://obsidian.md), enabling you to create and preview Typst documents seamlessly within your notes. Create `.typ` files, edit with syntax highlighting, and render PDFs that adapt to the current Obsidian theme.

The plugin registers a custom Obsidian view type and file extension, so that `.typ` files render with the custom view instead of the default Markdown editor. The custom view contains two modes for editing and reading documents. The editor view uses [Monaco Editor](https://github.com/microsoft/monaco-editor) (the same editor used in VS Code) to edit Typst files, with syntax highlighting, autocomplete suggestions, and support for custom snippets.

### Features

- Open `.typ` files in Obsidian
- VSCode-Like editor with Typst syntax highlighting
- Customizable syntax highlighting colors for dark and light themes
- Toggle between source and PDF preview modes
- PDF export to vault
- Theme integration - rendered PDFs adapt to Obsidian themes
- Template variables for dynamic theming (`%THEMECOLOR%`, `%FONTSIZE%`, etc.)
- Package support - use local packages from data directory or auto-download from preview namespace
- System font support (desktop only)

![Fullscreen Screenshot](https://raw.githubusercontent.com/k0src/Typst-for-Obsidian/main/assets/tfo-full-screen.png)

### How it Works

#### Compilation

The plugin uses a Web Worker to run the Rust WASM compiler off the main thread. On desktop, the worker requests a file synchronously, the main thread receives the request, reads the file, and writes it to the `SharedArrayBuffer`.

```ts
const buffer = new Int32Array(new SharedArrayBuffer(4, { maxByteLength: 1e8 }));
postMessage({ buffer, path });
Atomics.wait(buffer, 0, 0);
```

On mobile, without `SharedArrayBuffer` support, it uses synchronous XHR; the main thread sets up an XHR intercept to serve files from the Obsidian vault.

```ts
xhr.open("GET", "http://localhost/_capacitor_file_" + path, false);
xhr.send();
return xhr.responseText;
```

#### PDF Compilation & Rendering

The plugin first replaces any template variables in the Typst document and injects colors, font sizes, etc., from the current Obsidian theme. Then, optional layout functions defined in the plugin settings are prepended to the document markup. Next, the markup source is sent to the WASM compiler worker, and the Rust code calls `typst::compile()` to compile the document as a PDF. Finally, the worker send the PDF bytes back to the main thread as a `Uint8Array`.

```ts
const result = compiler.compile_pdf(data.source, data.path);
postMessage(result);
```

#### PDF Rendering

Typst for Obsidian uses **PDFium** (Chrome's PDF viewer) to render the PDF in the DOM. Originally, I used PDF.js (Mozilla's PDF viewer) to render the PDF, however, at the scale the document is actually rendered at in Obsidian, I noticed some annoying aliasing and artifacting issues that made the text glyphs stick together and bunch up, making the text hard to read. Using PDFium seemed to fix this problem.

> ![pdf example](https://i.imgur.com/8Aq3OiF.png)
> _PDF.js vs. PDFium at the same zoom level (70%)_

PDFium is initialized from the WASM binary, memory is allocated, and the PDF data from the Rust compiler is loaded. Each page is render to a canvas at a configurable DPI. During this process, text layers and link layers are created from the PDF, so that text is selectable and links can be clicked.

#### Rust WASM Compiler

The compiler is a Rust crate that wraps the official Typst compiler library for WebAssembly.

```rs
#[wasm_bindgen]
pub struct Compiler {
    resizer: fr::Resizer,
    world: SystemWorld,
}

#[wasm_bindgen]
impl Compiler {
    pub fn compile_pdf(&mut self, text: String, path: String)
        -> Result<Vec<u8>, JsValue> {
        self.world.compile(text, path)
            .and_then(|document| render::to_pdf(document))
    }
}
```

#### Syntax Highlighting

The plugin uses a [TextMate grammar](https://github.com/Myriad-Dreamin/tinymist/tree/main/syntaxes/textmate) (by TinyMist) for highlighting for Typst syntax, over the different modes (code, math, etc.). TextMate grammars are the standard grammars used by Monaco Editor for syntax highlighting. This was the main reason for the switch from CodeMirror to Monaco for the plugin editor - CodeMirror does provide similar syntax highlighting features defined by custom grammars, however, it uses [Lezer](https://lezer.codemirror.net/) grammars, which don't provide the same lookahead and pattern matching needed to switch between different highlighting modes based on the current Typst mode.

### Plugin Usage

To use Typst for Obsidian, first install the plugin:

1. Download the latest release from the [Releases](https://github.com/k0src/Typst-for-Obsidian/releases) page
2. Extract `main.js`, `manifest.json`, `styles.css`, and `obsidian_typst_bg.wasm` to your Obsidian plugins folder (`.obsidian/plugins/typst-for-obsidian`)
3. Enable the plugin in Obsidian settings

Then, in Obsidian:

4. Create a new `.typ` file or open an existing one
5. Edit in source mode with syntax highlighting
6. Click the preview icon to render PDF
7. Click the export icon to save PDF to vault

#### Template Variables

Use these variables in your Typst documents to match Obsidian themes:

```typst
#set text(fill: rgb("#%THEMECOLOR%"), size: %FONTSIZE%)
#set page(fill: rgb("#%BGCOLOR%"), width: %LINEWIDTH%)
```

Available variables:

- `%THEMECOLOR%` - Primary text color
- `%FONTSIZE%` - Text size in pt
- `%BGCOLOR%` - Background color
- `%LINEWIDTH%` - Page width
- `%ACCENTCOLOR%`, `%FAINTCOLOR%`, `%MUTEDCOLOR%`
- `%BGPRIMARY%`, `%BGPRIMARYALT%`, `%BGSECONDARY%`, `%BGSECONDARYALT%`
- `%SUCCESSCOLOR%`, `%WARNINGCOLOR%`, `%ERRORCOLOR%`
- `%FONTTEXT%`, `%FONTMONO%`, `%HEADINGCOLOR%`

#### Custom Layout Functions

Configure default page layouts in settings:

- **Default Layout Functions** - Applied to all internal previews
- **PDF Export Layout Functions** - Applied only when exporting PDFs

#### Custom Snippets

You can add custom Typst snippets as JSON for autocomplete in settings. Each snippet has a prefix (trigger) and body (lines to insert). Use `$1`, `$2`, etc., for tab stops.

Example (inserting a table aligned to the center):

```json
{
  "table": {
    "prefix": "tbl",
    "body": [
      "#align(center,",
      "\ttable(",
      "\t\tcolumns: $1,",
      "\t\t[$2],",
      "\t)",
      ")"
    ]
  }
}
```

### Settings

- **Default Mode** - Open files in source or reading mode
- **Auto-download Packages** - Automatically fetch packages from Typst registry
- **Font Families** - System fonts to load (desktop only)
- **Layout Functions** - Custom Typst preambles for formatting
- **Enable Text Layer** - Enable text selection in PDF preview. Disabling this setting may improve performance
- **Custom Snippets** - Add custom Typst snippets for autocomplete
- **Syntax Highlighting** - Customize colors for 28 different syntax categories, separately for dark and light themes. Import/export color configurations as JSON

### Commands

- **Create new Typst file** - Create `.typ` file at specified path
- **Toggle source/reading mode** - Switch between editing and preview
- **Export to PDF** - Export current document to PDF file
- **Toggle bold** - Wrap selection with `*text*`
- **Toggle italic** - Wrap selection with `_text_`
- **Toggle underline** - Wrap selection with `#underline[text]`
- **Increase heading level** - Add one `=` to heading (max 6 levels)
- **Decrease heading level** - Remove one `=` from heading (min 2 levels)

> Since Obsidian doesn't let you use the same hotkeys for different views, to use `Ctrl+B` and `Ctrl+I` in both Typst files and Markdown files, unbind the default bold and italic hotkeys, and bind `Toggle bold` and `Toggle italic` to `Ctrl+B` and `Ctrl+I`. It will work for both Typst files and Markdown files. Alternatively, you can just use two different hotkeys.

### Official Template

You can use the [official template](https://github.com/k0src/Typsidian) designed for Typst in Obsidian. It includes support for light/dark modes, titles, headers, and useful functions for displaying notes.

![Template Screenshot](https://raw.githubusercontent.com/k0src/Typst-for-Obsidian/main/assets/tfo-template.png)

To get started, import the template at the top of your Typst file:

```typst
#import "@preview/typsidian:0.0.2": *;

#show: typsidian.with(
  theme: "dark",
  title: "My Document",
  course: "CS4999",
  standalone: false
)
```

This template is an Obsidian-like theme for Typst, with support for light/dark modes, titles, headers, and some useful functions for displaying notes.

When using this template, I recommend setting the custom layout function in the settings to:

```typst
#set page(
  width: %LINEWIDTH%,
  height: auto,
  margin: (x: 0.25em, y: 0.25em),
  fill: rgb("%BGCOLOR%")
)
```

Make sure to set `standalone: false`. This will prevent the template from adding its own page layout. Additionally, make sure you have the required fonts installed and added to the font families in settings:

- [Inter 24pt](https://fonts.google.com/specimen/Inter)
- [GeistMono NFP](https://github.com/ryanoasis/nerd-fonts/releases/)
- [Fira Math](https://github.com/firamath/firamath/releases/)

---

To view more features, documentation, and the source code of the plugin, visit the [GitHub repository](https://github.com/k0src/Typst-for-Obsidian).
