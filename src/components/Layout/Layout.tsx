import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <ProfileCard />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
