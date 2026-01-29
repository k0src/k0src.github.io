import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MarkdownRenderer } from "../../components/MarkdownRenderer/MarkdownRenderer";
import { getProject } from "../../utils/content";
import styles from "./Project.module.css";

export function Project() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : null;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className={styles.project}>
      <Link to="/projects" className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>back to projects</span>
      </Link>
      <MarkdownRenderer html={project.html} />
    </div>
  );
}
