import React, { useState } from "react";
import useFetchData from "../../Hooks/FetchHook";
import ChallengeCard from "../UserChallenges/ChallengeCard";
import { useLoginDetails } from "../Login/LoginProvider";
import { MdSearch } from "react-icons/md";

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
      <div className="search-container">
        <h2>Search</h2>
        <input
          type="text"
          name="searchValue"
          placeholder="Challenge title"
          onBlur={getSearchValue}
        />
        <button onClick={StopDefaultSubmit}>
          <MdSearch /> Search
        </button>
      </div>
      <div className="search-results-container">
        <div className="search-form"></div>
        <div className="search-result">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : data.message ? (
            <h2>{data.message}</h2>
          ) : (
            <div className="search-result-cards">
              {data.map((challenge) => (
                <ChallengeCard key={challenge._id} challenge={challenge} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
