import React, { useEffect, useState } from "react";
import useFetchData from "../../Hooks/FetchHook";
import { useFavorites } from "../Favorites/FavoritesProvider";
import { useLoginDetails } from "../Login/LoginProvider";
import Popup from "../Support/Popup";
import ChallengePost from "./Challenge/ChallengePost";
import CreateChallenge from "./Challenge/CreateChallenge";

function Main() {
  const [trigger, setTrigger] = useState(false);
  const { userData } = useLoginDetails();
  const { setFavoritesArray } = useFavorites();
  const { email, password } = userData;

  const triggerPopup = () => {
    setTrigger(true);
  };

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
      <input type="text" placeholder="Challenge us!" onClick={triggerPopup} />
      <Popup isTrigger={trigger} setTrigger={setTrigger}>
        <CreateChallenge />
      </Popup>
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
