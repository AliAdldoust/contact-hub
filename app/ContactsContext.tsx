"use client";

import { createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";


type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type ContactsContextType = {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
};

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export function ContactsProvider({
  children,
}: {
  children: React.ReactNode;
}) 
{
  const [contacts, setContacts] = useState<Contact[]>([]);
    
  useEffect(() => {
    async function loadContacts() {
      const { data, error } = await supabase
        .from("contacts")
        .select("id, name, email, phone")
        .order("id", { ascending: true });


        setContacts(data ?? []);
      
    }

    void loadContacts();
  }, []);


  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error("useContacts must be used inside ContactsProvider");
  }

  return context;
}