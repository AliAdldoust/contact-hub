"use client";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import styles from "@/app/page.module.css"

import { useContacts } from "../ContactsContext";





type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};


export default function ContactsPage() {
  const { contacts, setContacts } = useContacts();

  const [search, setSearch] = useState("");


  
  const filteredContacts  = contacts.filter( (contact) => {

    return (
      contact.name.toLowerCase().includes(search.toLowerCase())
    )

  })


  const [isModalOpen, setIsModalOpen] = useState(false)


  const [newContact, setNewContact] = useState({name:"", email:"", phone:""})




  async function handleSaveContact(event: React.FormEvent<HTMLFormElement>){

      event.preventDefault();

      setContacts((contacts) => [...contacts, newContact]);

      const {data, error} = await supabase
      .from("contacts")
      .insert({
      id: Date.now(),
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
    })
    if (error){
      console.error("Failed to save contact:", error.message);
    }
    return;
}

  async function handleDeleteContact(id: number){

      const {data, error} = await supabase
      .from("contacts")
      .delete()
      .eq("id", id)
    
      setContacts(contacts.filter(contact => contact.id !== id))

}




  return (

    <div className={styles.container}>

        <main className={styles.main}>
            <section className={styles.sectionHeader}>
              <div>
                <h2>
                  All Contacts
                </h2>

                <p className={styles.statValue}>
                  {contacts.length} contacts
                </p>

              </div>

              <div className={styles.nav}>
                <input
                  type="search"
                  placeholder="Search contacts by name..."
                  className={styles.search}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

                <button type="button" className={styles.addButton}
                  onClick={() => setIsModalOpen(true)}>
                    + Add Contact
                </button>

                {isModalOpen && 
                  <div className={styles.modal}>
                    <form onSubmit={handleSaveContact}>


                        <label htmlFor="nameInput">Name</label>
                        <input
                          id="nameInput"
                          type="text"
                          placeholder="First and Last name with a space between..."
                          className={styles.search}
                          value={newContact.name}
                          onChange={(event) => setNewContact({
                            ...newContact,
                            name:event.target.value
                          })}
                        />

                        <label htmlFor="nameInput">Phone</label>
                        <input
                          id="phoneInput"
                          type="text"
                          placeholder="Phone Number"
                          className={styles.search}
                          value={newContact.phone}
                          onChange={(event) => setNewContact({
                            ...newContact,
                            phone:event.target.value
                          })}
                        />


                        <label htmlFor="emailInput">Email</label>
                        <input
                          id="emailInput"
                          type="text"
                          placeholder="Email"
                          className={styles.search}
                          value={newContact.email}
                          onChange={(event) => setNewContact({
                            ...newContact,
                            email:event.target.value
                          })}
                        />



                        <div className={styles.middle}>
                            <button type="button" className={styles.addButton} 
                                    onClick={() => setIsModalOpen(false)}>
                              Close 
                            </button>
                            <button className={styles.addButton} type="submit">
                              Save 
                            </button>
                        </div>

                    </form>

                  </div>}

              </div>
            </section>

            <div>
                  <table className={styles.table}>
                    <thead className={styles.tableHead}>
                      <tr>
                        <th>
                          Name
                        </th>

                        <th>
                          Email
                        </th>

                        <th>
                          Phone
                        </th>

                        <th>
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody  className={styles.tableRow}>
                      {filteredContacts.map((contact) => (
                        <tr
                          key={contact.id}
                        >
                          <td className={styles.tableCell}>
                            {contact.name}
                          </td>

                          <td className={styles.tableCell}>
                            {contact.email}
                          </td>

                          <td className={styles.tableCell}>
                            {contact.phone}
                          </td>

                          <td className={styles.tableCell}>
                            <button onClick={() => handleDeleteContact(contact.id)}>
                                <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
            </div>
            
        </main>
    </div>
  );
}