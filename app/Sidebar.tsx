"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./page.module.css";

import { useLogin } from "./LoginContext";





export default function Sidebar() {
    const pathname = usePathname();

    const { login, setLogin } = useLogin();


  return (
      <aside className={styles.sidebar}>
        <h1 className={styles.title}>ContactHub</h1>

        <nav className={styles.nav}>
          <Link href="/home" className={pathname === "/home" ? styles.activeLink : styles.link}>
            Dashboard
          </Link>

          <Link href="/contacts" className={pathname === "/contacts" ? styles.activeLink : styles.link}>
            Contacts
          </Link>
        </nav>

        <div className={styles.userInfo}>
          <p className={styles.mutedText}>Signed in as</p>
          <p className={styles.userName}>{login.name}</p>
          <p className={styles.mutedText}>{login.email}</p>
        </div>
      </aside>
  );
}