import React, { useContext, createContext } from "react";
import { useLoginDetails } from "../../Login/LoginProvider";

export const LikeContext = createContext();

export function useLike() {
  return useContext(LikeContext);
}

export function LikeProvider({ children }) {
  const { userData } = useLoginDetails();

  const updateLike = async (challenge, likes, setLikes, setIsLike, isLike) => {
    if (isLike) {
      if (likes > 0) {
        setLikes(likes - 1);
      }

      setIsLike(false);

      const requestOptions = {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ action: "delete", user: challenge.publisher }),
      };

      const url = `http://localhost:5000/api/forum/challenge/like/${challenge._id}?email=${userData.email}&password=${userData.password}`;
      await fetch(url, requestOptions);
    } else {
      setLikes(likes + 1);
      setIsLike(true);

      const requestOptions = {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ action: "add", user: challenge.publisher }),
      };

      const url = `http://localhost:5000/api/forum/challenge/like/${challenge._id}?email=${userData.email}&password=${userData.password}`;
      await fetch(url, requestOptions);
    }
  };

  return (
    <LikeContext.Provider value={{ updateLike }}>
      {children}
    </LikeContext.Provider>
  );
}
