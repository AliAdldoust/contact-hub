import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import styles from "./page.module.css";

import { ContactsProvider } from "./ContactsContext";
import { LoginProvider } from "./LoginContext";



import Sidebar from "./Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">

      <body className={styles.container}>
        <LoginProvider>
            <ContactsProvider>
                <Sidebar />
                <main className={styles.main}>{children}</main>
          </ContactsProvider>
        </LoginProvider>
      </body>


    </html>
  );
}
