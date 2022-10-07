import React, { useState } from "react";
import useFetchData from "../../Hooks/FetchHook";
import ChallengeCard from "../UserChallenges/ChallengeCard";
import { useLoginDetails } from "../Login/LoginProvider";

function Search() {
  const [searchValue, setSearchValue] = useState("");

  const getSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const { userData } = useLoginDetails();
  const url = `http://localhost:3000/api/forum/challenge/title/?title=${searchValue}&email=${userData.email}&password=${userData.password}`;
  const { data, error, isLoading } = useFetchData(url);

  const StopDefaultSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <form>
          <input
            type="text"
            name="searchValue"
            placeholder="Challenge title"
            onBlur={getSearchValue}
          />
          <button onClick={StopDefaultSubmit}>Search</button>
        </form>
      </div>
      <div>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : data.message ? (
          <h2>{data.message}</h2>
        ) : (
          data.map((challenge, index) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))
        )}
      </div>
    </>
  );
}

export default Search;
