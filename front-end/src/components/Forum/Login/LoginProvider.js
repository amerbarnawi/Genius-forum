import React, { useState, useContext, createContext } from "react";

export const LoginContext = createContext();

export function useLoginDetails() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider
      value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </LoginContext.Provider>
  );
}
