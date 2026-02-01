import { MarkdownRenderer } from "../../components/MarkdownRenderer/MarkdownRenderer";
import { getResumeHtml } from "../../utils/content";
import styles from "./Resume.module.css";

export function Resume() {
  const resumeHtml = getResumeHtml();

  return (
    <div className={styles.resume}>
      <MarkdownRenderer html={resumeHtml} />
      <a
        href="./Koren_Stalnaker_Resume_2026.pdf"
        download
        className={styles.download}
      >
        download resume as pdf
      </a>
    </div>
  );
}
