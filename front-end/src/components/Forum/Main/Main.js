import React from "react";
import useFetchData from "../../Hooks/FetchHook";
import { useLoginDetails } from "../Login/LoginProvider";
import ChallengePost from "./Challenge/ChallengePost";

function Main() {
  const { userData } = useLoginDetails();
  const { email, password } = userData;

  const url = `http://localhost:5000/api/forum/challenge/title/?title=&email=${email}&password=${password}`;

  const { data, error, isLoading } = useFetchData(url);

  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div>
      {isLoading ? (
        <h2>Loading ..</h2>
      ) : (
        data.map((challenge, index) => {
          return <ChallengePost key={index} challenge={challenge} />;
        })
      )}
    </div>
  );
}

export default Main;
