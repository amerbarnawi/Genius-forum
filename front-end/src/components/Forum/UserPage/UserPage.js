import React, { useState } from "react";
import Favorites from "../Favorites/Favorites";
import CreateChallenge from "../Main/Challenge/CreateChallenge";
import UserChallenges from "../UserChallenges/UserChallenges";

function UserPage() {
  const [isCreate, setIsCreate] = useState(false);

  return (
    <div className="forum-user-page-columns">
      {/* <div className="search-side">one</div> */}
      <div className="user-page-main">
        <textarea
          name="new-post"
          placeholder="Challenge us!"
          onClick={() => setIsCreate(true)}
          className="input-create-challenge"
        ></textarea>
        <>{isCreate ? <CreateChallenge setIsCreate={setIsCreate} /> : ""}</>

        <UserChallenges />
      </div>
      <div className="user-page-right-side">
        <div className="title">
          <h2>My favorites</h2>
        </div>
        <div className="favorites">
          <Favorites />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
