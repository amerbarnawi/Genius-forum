import React, { useState } from "react";
import useFetchByClick from "../../../Hooks/FetchByClick";
import { useFavorites } from "../../Favorites/FavoritesProvider";
import { useLoginDetails } from "../../Login/LoginProvider";

function DeleteChallenge({ challengeId }) {
  const [isClicked, setIsClicked] = useState(false);
  const { userData } = useLoginDetails();
  const { updateFavorite } = useFavorites();

  const requestOptions = {
    method: "Delete",
  };
  const url = `http://localhost:3000/api/forum/challenge/delete/${challengeId}?email=${userData.email}&password=${userData.password}`;
  const { data, error, isLoading } = useFetchByClick(
    isClicked,
    setIsClicked,
    url,
    requestOptions
  );

  // const { setIsReload } = useReload();
  // if (data.message) {
  //   const isValid = data.message.includes("done");
  //   if (isValid) {
  //     setTimeout(() => {
  //       setRefresh(true);
  //     }, 1000);
  //     // setIsReload(true);
  //   }
  // }

  const confirmDeletion = () => {
    setIsClicked(true);
    updateFavorite();
  };

  return (
    <div>
      <h2>Delete challenge</h2>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <h2>{data.message}</h2>
      )}
      <p>Click confirm to delete!</p>
      <div>
        <button onClick={() => confirmDeletion()}>Delete</button>
      </div>
    </div>
  );
}

export default DeleteChallenge;
