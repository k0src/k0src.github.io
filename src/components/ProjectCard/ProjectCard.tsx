import { Link } from "react-router-dom";
import { ChevronRight, Github } from "lucide-react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string;
  github?: string;
}

export function ProjectCard({
  slug,
  title,
  date,
  description,
  image,
  github,
}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      {image && <img src={image} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>{date}</span>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.actions}>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="View on GitHub"
          >
            <Github size={20} />
          </a>
        )}
        <Link
          to={`/projects/${slug}`}
          className={styles.iconLink}
          aria-label="View project"
        >
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
}
