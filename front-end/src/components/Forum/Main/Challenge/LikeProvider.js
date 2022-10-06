import React, { useContext, createContext } from "react";
import { useLoginDetails } from "../../Login/LoginProvider";

export const LikeContext = createContext();

export function useLike() {
  return useContext(LikeContext);
}

export function LikeProvider({ children }) {
  const { userData } = useLoginDetails();

  async function updateLikeRequest(challenge, action) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ action: action, user: userData.userName }),
    };

    const url = `http://localhost:5000/api/forum/challenge/like/${challenge._id}?email=${userData.email}&password=${userData.password}`;
    await fetch(url, requestOptions);
  }

  const updateLike = async (challenge, setChallenge) => {
    const isLike = challenge.interaction.likes.includes(userData.userName);
    if (isLike) {
      const newLikesArray = challenge.interaction.likes.filter(
        (user) => user !== userData.userName
      );
      challenge.interaction.likes = newLikesArray;
      setChallenge((challenge) => {
        return { ...challenge };
      });
      updateLikeRequest(challenge, "delete");
    } else {
      challenge.interaction.likes.push(userData.userName);
      setChallenge((challenge) => {
        return { ...challenge };
      });
      updateLikeRequest(challenge, "add");
    }
  };

  return (
    <LikeContext.Provider value={{ updateLike }}>
      {children}
    </LikeContext.Provider>
  );
}
