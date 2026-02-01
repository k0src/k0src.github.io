import matter from "gray-matter";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import katex from "katex";

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  github?: string;
}

export interface Project extends ProjectMeta {
  html: string;
}

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  }),
);

function renderMath(text: string): string {
  const codeBlocks: string[] = [];
  const inlineCode: string[] = [];

  text = text.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `%%CODEBLOCK${codeBlocks.length - 1}%%`;
  });

  text = text.replace(/`[^`]+`/g, (match) => {
    inlineCode.push(match);
    return `%%INLINECODE${inlineCode.length - 1}%%`;
  });

  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return `<pre>${math}</pre>`;
    }
  });

  text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `<code>${math}</code>`;
    }
  });

  text = text.replace(/%%CODEBLOCK(\d+)%%/g, (_, i) => codeBlocks[parseInt(i)]);
  text = text.replace(
    /%%INLINECODE(\d+)%%/g,
    (_, i) => inlineCode[parseInt(i)],
  );

  return text;
}

const aboutRaw = import.meta.glob("../content/about.md", {
  query: "?raw",
  eager: true,
  import: "default",
}) as Record<string, string>;
const resumeRaw = import.meta.glob("../content/resume.md", {
  query: "?raw",
  eager: true,
  import: "default",
}) as Record<string, string>;
const projectsRaw = import.meta.glob("../content/projects/*.md", {
  query: "?raw",
  eager: true,
  import: "default",
}) as Record<string, string>;

function parseMarkdown(raw: string): {
  html: string;
  data: Record<string, unknown>;
} {
  const { content, data } = matter(raw);
  const withMath = renderMath(content);
  const html = marked.parse(withMath, { async: false }) as string;
  return { html, data };
}

export function getAboutHtml(): string {
  const raw = Object.values(aboutRaw)[0];
  return parseMarkdown(raw).html;
}

export function getResumeHtml(): string {
  const raw = Object.values(resumeRaw)[0];
  return parseMarkdown(raw).html;
}

export function getProjects(): ProjectMeta[] {
  const projects: ProjectMeta[] = [];

  for (const [path, raw] of Object.entries(projectsRaw)) {
    const { data } = parseMarkdown(raw);
    const slug = path.split("/").pop()?.replace(".md", "") || "";

    projects.push({
      slug,
      title: (data.title as string) || "Untitled",
      date: (data.date as string) || "",
      description: (data.description as string) || "",
      image: (data.image as string) || undefined,
      github: (data.github as string) || undefined,
    });
  }

  return projects.sort((a, b) => b.date.localeCompare(a.date));
}

export function getProject(slug: string): Project | null {
  for (const [path, raw] of Object.entries(projectsRaw)) {
    const fileSlug = path.split("/").pop()?.replace(".md", "") || "";
    if (fileSlug === slug) {
      const { html, data } = parseMarkdown(raw);
      return {
        slug,
        title: (data.title as string) || "Untitled",
        date: (data.date as string) || "",
        description: (data.description as string) || "",
        image: (data.image as string) || undefined,
        github: (data.github as string) || undefined,
        html,
      };
    }
  }
  return null;
}
