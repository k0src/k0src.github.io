import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { getProjects } from "../../utils/content";
import styles from "./Projects.module.css";

export function Projects() {
  const projects = getProjects();

  return (
    <div className={styles.projects}>
      <h1>Projects</h1>
      <div className={styles.list}>
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            date={project.date}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
}
