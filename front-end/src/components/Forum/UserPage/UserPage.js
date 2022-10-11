import React, { useState } from "react";
import Favorites from "../Favorites/Favorites";
import CreateChallenge from "../Main/Challenge/CreateChallenge";
import Popup from "../Support/Popup";
import UserChallenges from "../UserChallenges/UserChallenges";

function UserPage() {
  const [trigger, setTrigger] = useState(false);

  const triggerPopup = () => {
    setTrigger(true);
  };

  return (
    <div className="forum-user-page-columns">
      {/* <div className="search-side">one</div> */}
      <div className="user-page-main">
        <textarea
          name="new-post"
          placeholder="Challenge us!"
          onClick={triggerPopup}
          className="input-create-challenge"
        ></textarea>

        <Popup isTrigger={trigger} setTrigger={setTrigger}>
          <CreateChallenge />
        </Popup>
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
