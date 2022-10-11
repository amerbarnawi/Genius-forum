import React, { useState, useContext, createContext } from "react";
import { useLoginDetails } from "../Login/LoginProvider";

export const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favoritesIds, setFavoritesArray] = useState([]);

  const { userData } = useLoginDetails();

  const FavoritesFetch = async (newFavoritesArray) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ favorites: newFavoritesArray }),
    };

    const url = `http://localhost:5000/api/user/favorites/${userData._id}?email=${userData.email}&password=${userData.password}`;
    await fetch(url, requestOptions);
  };

  function updateFavorite(id) {
    const isIdInFavoritesArray = favoritesIds.includes(id);

    if (!isIdInFavoritesArray) {
      const newFavoritesArray = [...favoritesIds, id];
      setFavoritesArray(newFavoritesArray);
      FavoritesFetch(newFavoritesArray);
    } else {
      const newFavoritesArray = favoritesIds.filter(
        (challengeId) => challengeId !== id
      );
      setFavoritesArray(newFavoritesArray);
      FavoritesFetch(newFavoritesArray);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{ favoritesIds, updateFavorite, setFavoritesArray }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
