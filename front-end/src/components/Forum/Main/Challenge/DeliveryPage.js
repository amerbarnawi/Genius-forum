import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../../Hooks/FetchHook";
import { useLoginDetails } from "../../Login/LoginProvider";
import ChallengePost from "./ChallengePost";

function ChallengeById() {
  const { id } = useParams();

  const { userData } = useLoginDetails();

  const url = `http://localhost:3000/api/forum/challenge/${id}?email=${userData.email}&password=${userData.password}`;

  const { data, error, isLoading } = useFetchData(url);

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <ChallengePost originalChallenge={data} />
      )}
    </div>
  );
}

export default ChallengeById;
