'use client'

import styles from "./page.module.css";


import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { useLogin } from "./LoginContext";






export default function Login() {
    const router = useRouter()


    const { login, setLogin } = useLogin();

  return (

            <div className={styles.modal}>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        router.push("/home");
                        setLogin(login);
                        }}>


                        <label htmlFor="nameInput">Name</label>
                        <input
                          id="nameInput"
                          type="text"
                          required
                          placeholder="First and Last name with a space between..."
                          className={styles.search}
                          value={login.name}
                          onChange={(event) => setLogin({
                                ...login,
                                name: event.target.value,
                          })}
                        />


                        <label htmlFor="emailInput">Email</label>
                        <input
                          id="emailInput"
                          type="text"
                          required
                          placeholder="Email"
                          className={styles.search}
                          value={login.email}
                          onChange={(event) => setLogin({
                                ...login,
                                email: event.target.value
                          })}
                 
                        />



                        <div className={styles.middle}>
                            <button type="submit" className={styles.addButton}>
                              Log In 
                            </button>
               
                        </div>

                    </form>

                  </div>
  );
}

