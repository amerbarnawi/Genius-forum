import React from "react";
import { useParams } from "react-router-dom";

import useFetchData from "../../Hooks/FetchHook";
import { useLoginDetails } from "../Login/LoginProvider";
import ChallengePost from "../Main/Challenge/ChallengePost";

import ChallengeCard from "./ChallengeCard";

function UserChallenges() {
  const { userData } = useLoginDetails();
  const { email, password } = userData;
  const { id } = useParams();

  const url = `http://localhost:5000/api/forum/challenge/title/?title=&email=${email}&password=${password}`;

  const { data, error, isLoading } = useFetchData(url);

  return (
    <>
      <h2>My challenges</h2>

      <div
        className={
          id === "my-page"
            ? "personal-page-challenges"
            : "home-user-challenge-cards"
        }
      >
        {isLoading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          data
            .filter((challenge) => challenge.publisher === email)
            .map((challenge, index) => {
              return id === "my-page" ? (
                <ChallengePost key={index} originalChallenge={challenge} />
              ) : (
                <ChallengeCard key={index} challenge={challenge} />
              );
            })
        )}
      </div>
    </>
  );
}

export default UserChallenges;
