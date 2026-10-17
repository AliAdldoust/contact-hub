'use client'

import styles from "../page.module.css";


import {useState} from 'react'

import { useContacts } from "../ContactsContext";


export default function Home() {
  const { contacts } = useContacts();



  return (

      <main className={styles.main}>


        <header className={styles.header}>
          <div>
            <h2 className={styles.pageTitle}>Dashboard</h2>
            <p className={styles.subtitle}>
              Manage your contacts.
            </p>
          </div>

        </header>

        <section className={styles.stats}>
          <StatCard
            value={contacts.length}
            description="People in your contact list"
          />
        </section>
      </main>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  description: string;
};

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statDescription}>{description}</p>
    </div>
  );
}