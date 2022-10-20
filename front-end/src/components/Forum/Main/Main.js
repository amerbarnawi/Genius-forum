import React, { useEffect, useState } from "react";
import useFetchData from "../../Hooks/FetchHook";
import { useFavorites } from "../Favorites/FavoritesProvider";
import { useLoginDetails } from "../Login/LoginProvider";
import ChallengePost from "./Challenge/ChallengePost";
import CreateChallenge from "./Challenge/CreateChallenge";

function Main() {
  const { userData } = useLoginDetails();
  const { setFavoritesArray } = useFavorites();
  const { email, password } = userData;
  const [isCreate, setIsCreate] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [AllChallenges, setAllChallenges] = useState([]);

  const allChallengesUrl = `http://localhost:5000/api/forum/challenge/title/?title=&email=${email}&password=${password}`;
  const { data, error, isLoading } = useFetchData(allChallengesUrl, isRender);

  const favoritesUrl = `http://localhost:5000/api/user/login?email=${userData.email}&password=${userData.password}`;
  const { data: user, isLoading: isLoadingUser } = useFetchData(favoritesUrl);

  useEffect(() => {
    if (data && !isLoadingUser) {
      setFavoritesArray(user.favorites);
      setAllChallenges(data);
    }
  }, [isLoadingUser, data, setFavoritesArray, user.favorites]);

  if (isRender) {
    setTimeout(() => {
      setIsRender(false);
    }, 1000);
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="forum-home-main">
      <textarea
        name="new-post"
        placeholder="Challenge us!"
        className="input-create-challenge"
        onClick={() => setIsCreate(true)}
      ></textarea>

      <div>
        {isCreate ? (
          <CreateChallenge
            setIsCreate={setIsCreate}
            setIsRender={setIsRender}
          />
        ) : (
          ""
        )}
      </div>

      {isLoading ? (
        <h2>Loading ..</h2>
      ) : (
        <>
          {!AllChallenges[0] ? (
            <h2>There are no challenges</h2>
          ) : (
            AllChallenges.map((challenge, index) => {
              return (
                <ChallengePost
                  key={index}
                  originalChallenge={challenge}
                  setIsRender={setIsRender}
                />
              );
            })
          )}
        </>
      )}
    </div>
  );
}

export default Main;
