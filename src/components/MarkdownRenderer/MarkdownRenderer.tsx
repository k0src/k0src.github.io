import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import styles from "./MarkdownRenderer.module.css";

interface MarkdownRendererProps {
  html: string;
}

export function MarkdownRenderer({ html }: MarkdownRendererProps) {
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
