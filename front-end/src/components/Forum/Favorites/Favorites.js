import React from "react";
import useFetchData from "../../Hooks/FetchHook";
import { useLoginDetails } from "../Login/LoginProvider";
import ChallengePost from "../Main/Challenge/ChallengePost";
import { useFavorites } from "./FavoritesProvider";

function Favorites() {
  const { favoritesIds } = useFavorites();

  const { userData } = useLoginDetails();
  const url = `http://localhost:3000/api/forum/challenge/title/?title=&email=${userData.email}&password=${userData.password}`;
  const { data: allChallenges, error, isLoading } = useFetchData(url);

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : allChallenges.filter((challenge) =>
          favoritesIds.includes(challenge._id)
        ).length > 0 ? (
        allChallenges
          .filter((challenge) => favoritesIds.includes(challenge._id))
          .map((challenge, index) => (
            <ChallengePost key={index} originalChallenge={challenge} />
          ))
      ) : (
        <h3>Your favorite is empty.</h3>
      )}
    </div>
  );
}

export default Favorites;
