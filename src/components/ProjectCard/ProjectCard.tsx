import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export function ProjectCard({
  slug,
  title,
  date,
  description,
}: ProjectCardProps) {
  return (
    <Link to={`/projects/${slug}`} className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>{date}</span>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <ChevronRight size={20} className={styles.arrow} />
    </Link>
  );
}
