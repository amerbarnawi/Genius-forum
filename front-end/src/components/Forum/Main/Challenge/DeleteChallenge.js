import React, { useEffect, useState } from "react";
import useFetchByClick from "../../../Hooks/FetchByClick";
import { useFavorites } from "../../Favorites/FavoritesProvider";
import { useLoginDetails } from "../../Login/LoginProvider";
import { MdDelete } from "react-icons/md";

function DeleteChallenge({ challengeId, setIsChallengeHidden }) {
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

  useEffect(() => {
    if (data && !isLoading) {
      if (data.message.includes("done")) {
        setTimeout(() => {
          setIsChallengeHidden(true);
        }, 2500);
      }
    }
  }, [data, setIsChallengeHidden, isLoading]);

  const confirmDeletion = () => {
    setIsClicked(true);
    updateFavorite();
  };

  return (
    <div className="delete-challenge-container">
      <h2>Delete challenge</h2>

      {isLoading ? (
        <h3>{isClicked ? "Loading .." : ""}</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <h3>{data.message}</h3>
      )}
      <p>Click confirm to delete!</p>

      <button onClick={() => confirmDeletion()}>
        Delete <MdDelete className="icon" />
      </button>
    </div>
  );
}

export default DeleteChallenge;
