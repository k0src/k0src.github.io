import { Link } from "react-router-dom";
import { MarkdownRenderer } from "../../components/MarkdownRenderer/MarkdownRenderer";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { ContactLinks } from "../../components/ContactLinks/ContactLinks";
import { getAboutHtml, getProjects } from "../../utils/content";
import styles from "./Home.module.css";

export function Home() {
  const aboutHtml = getAboutHtml();
  const projects = getProjects().slice(0, 3);

  return (
    <div className={styles.home}>
      <MarkdownRenderer html={aboutHtml} />

      <section className={styles.projects}>
        <div className={styles.projectsHeader}>
          <h2>Recent Projects</h2>
          <Link to="/projects">View all projects</Link>
        </div>
        <div className={styles.projectsList}>
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              date={project.date}
              image={project.image}
              github={project.github}
              compact
            />
          ))}
        </div>
      </section>

      <section className={styles.contact}>
        <h2>Contact</h2>
        <ContactLinks />
      </section>
    </div>
  );
}
