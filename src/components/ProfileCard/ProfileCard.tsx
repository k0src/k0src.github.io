import { MapPin, Mail, Linkedin, Github, University } from "lucide-react";
import portrait from "../../assets/portrait.png";
import styles from "./ProfileCard.module.css";

export function ProfileCard() {
  return (
    <aside className={styles.card}>
      <img src={portrait} alt="Profile" className={styles.portrait} />
      <h2 className={styles.name}>Koren Stalnaker</h2>
      <p className={styles.subtitle}>
        Computer Science Senior at the University of Houston
      </p>
      <ul className={styles.links}>
        <li>
          <MapPin size={16} />
          <span>Houston, Texas</span>
        </li>
        <li>
          <Mail size={16} />
          <a href="mailto:korenstalnaker@gmail.com">korenstalnaker@gmail.com</a>
        </li>
        <li>
          <Linkedin size={16} />
          <a
            href="https://linkedin.com/in/korens"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/korens
          </a>
        </li>
        <li>
          <Github size={16} />
          <a
            href="https://github.com/k0src"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/k0src
          </a>
        </li>
        <li>
          <University size={16} />
          <a href="https://cs.uh.edu" target="_blank" rel="noopener noreferrer">
            cs.uh.edu
          </a>
        </li>
      </ul>
    </aside>
  );
}
