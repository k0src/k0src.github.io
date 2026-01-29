import styles from "./ContactLinks.module.css";

export function ContactLinks() {
  return (
    <div className={styles.container}>
      <a href="mailto:korenstalnaker@gmail.com">email</a>
      <span className={styles.separator}>/</span>
      <a
        href="https://www.linkedin.com/in/korens"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin
      </a>
      <span className={styles.separator}>/</span>
      <a
        href="https://github.com/k0src"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
      <span className={styles.separator}>/</span>
      <a href="./Koren_Stalnaker_Resume_2026.pdf" download>
        download resume
      </a>
    </div>
  );
}
