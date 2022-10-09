import React, { useState, useContext, createContext, useEffect } from "react";

export const LoginContext = createContext();

export function useLoginDetails() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Session storage

  useEffect(() => {
    const user = sessionStorage.getItem("userData")
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";
    setUserData(user);
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </LoginContext.Provider>
  );
}
