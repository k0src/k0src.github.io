import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Navbar.module.css";

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.name}>
          Koren Stalnaker
        </Link>
        <div className={styles.links}>
          <Link to="/" className={isActive("/") ? styles.active : ""}>
            home
          </Link>
          <span className={styles.separator}>/</span>
          <Link
            to="/projects"
            className={isActive("/projects") ? styles.active : ""}
          >
            projects
          </Link>
          <span className={styles.separator}>/</span>
          <Link
            to="/resume"
            className={isActive("/resume") ? styles.active : ""}
          >
            resume
          </Link>
          <span className={styles.separator}>/</span>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
        <div className={styles.mobileControls}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={styles.hamburger}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link
            to="/"
            className={isActive("/") ? styles.active : ""}
            onClick={closeMenu}
          >
            home
          </Link>
          <Link
            to="/projects"
            className={isActive("/projects") ? styles.active : ""}
            onClick={closeMenu}
          >
            projects
          </Link>
          <Link
            to="/resume"
            className={isActive("/resume") ? styles.active : ""}
            onClick={closeMenu}
          >
            resume
          </Link>
        </div>
      )}
    </nav>
  );
}
