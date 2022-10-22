import React, { useContext, createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchByClick from "../../../Hooks/FetchByClick";
import { useLoginDetails } from "../../Login/LoginProvider";

export const chatContext = createContext();

export function usePublicChat() {
  return useContext(chatContext);
}

export function ChatProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const { userData } = useLoginDetails();

  const { id } = useParams();

  useEffect(() => {
    if (id !== "chat-room") {
      setIsLogOut(true);
    }
  }, [id]);

  let requestOptions = {};
  const online = {
    action: "add",
    userName: userData.userName,
    email: userData.email,
    logo: userData.logo,
  };
  const offline = {
    action: "delete",
    email: userData.email,
  };

  if (isLogin) {
    requestOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(online),
    };
  } else if (isLogOut) {
    requestOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(offline),
    };
  }

  const updateUserUrl = `http://localhost:5000/api/forum/chat/public/online?email=${userData.email}&password=${userData.password}`;
  const { error: loginError, isLoading: isLoginLoading } = useFetchByClick(
    isLogin,
    setIsLogin,
    updateUserUrl,
    requestOptions
  );

  const { error: logOutError, isLoading: isLogOutLoading } = useFetchByClick(
    isLogOut,
    setIsLogOut,
    updateUserUrl,
    requestOptions
  );

  const loginDetails = {
    loginError,
    isLoginLoading,
  };

  const logOutDetails = {
    logOutError,
    isLogOutLoading,
  };

  return (
    <chatContext.Provider
      value={{ setIsLogin, setIsLogOut, loginDetails, logOutDetails }}
    >
      {children}
    </chatContext.Provider>
  );
}
