"use client";

import { createContext, useContext, useState } from "react";

type Login = {
  name: string;
  email: string;
};

const LoginContext = createContext<{
  login: Login;
  setLogin: React.Dispatch<React.SetStateAction<Login>>;
} | null>(null);

export function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [login, setLogin] = useState<Login>({
    name: "",
    email: "",
  });

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  return context;
  
}