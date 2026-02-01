import { useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import styles from "./Layout.module.css";

export function Layout() {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <ProfileCard />
        <main ref={mainRef} className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
