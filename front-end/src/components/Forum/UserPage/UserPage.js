import React, { useState } from "react";
import Favorites from "../Favorites/Favorites";
import CreateChallenge from "../Main/Challenge/CreateChallenge";
import UserChallenges from "../UserChallenges/UserChallenges";

function UserPage() {
  const [isCreate, setIsCreate] = useState(false);
  const [isRender, setIsRender] = useState(false);

  if (isRender) {
    setTimeout(() => {
      setIsRender(false);
    }, 1000);
  }

  return (
    <div className="forum-user-page-columns">
      <div className="user-page-main">
        <textarea
          name="new-post"
          placeholder="Challenge us!"
          onClick={() => setIsCreate(true)}
          className="input-create-challenge"
        ></textarea>
        <>
          {isCreate ? (
            <CreateChallenge
              setIsCreate={setIsCreate}
              setIsRender={setIsRender}
            />
          ) : (
            ""
          )}
        </>

        <UserChallenges isRender={isRender} setIsRender={setIsRender} />
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
