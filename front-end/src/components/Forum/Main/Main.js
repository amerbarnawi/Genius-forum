import React, { useEffect } from "react";
import useFetchData from "../../Hooks/FetchHook";
import { useFavorites } from "../Favorites/FavoritesProvider";
import { useLoginDetails } from "../Login/LoginProvider";
import ChallengePost from "./Challenge/ChallengePost";

function Main() {
  const { userData } = useLoginDetails();
  const { setFavoritesArray } = useFavorites();
  const { email, password } = userData;

  const allChallengesUrl = `http://localhost:5000/api/forum/challenge/title/?title=&email=${email}&password=${password}`;
  const { data, error, isLoading } = useFetchData(allChallengesUrl);

  const favoritesUrl = `http://localhost:5000/api/user/login?email=${userData.email}&password=${userData.password}`;
  const { data: user, isLoading: isLoadingUser } = useFetchData(favoritesUrl);

  useEffect(() => {
    if (data && !isLoadingUser) {
      setFavoritesArray(user.favorites);
    }
  }, [isLoadingUser, data, setFavoritesArray, user.favorites]);

  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div>
      {isLoading ? (
        <h2>Loading ..</h2>
      ) : (
        data.map((challenge, index) => {
          return <ChallengePost key={index} originalChallenge={challenge} />;
        })
      )}
    </div>
  );
}

export default Main;
