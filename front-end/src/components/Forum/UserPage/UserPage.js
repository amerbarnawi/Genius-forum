import React, { useState } from "react";
import CreateChallenge from "../Main/Challenge/CreateChallenge";
import Popup from "../Support/Popup";
import UserChallenges from "../UserChallenges/UserChallenges";

function UserPage() {
  const [trigger, setTrigger] = useState(false);

  const triggerPopup = () => {
    setTrigger(true);
  };
  // const { isReload } = useReload();
  // if (isReload) {
  //   setTimeout(() => {
  //     window.location.reload(true);
  //   }, 2000);
  // }

  return (
    <div className="forum-page-columns">
      {/* <div className="search-side">one</div> */}
      <div className="user-page-main">
        <input type="text" placeholder="Challenge us!" onClick={triggerPopup} />
        <Popup isTrigger={trigger} setTrigger={setTrigger}>
          <CreateChallenge />
        </Popup>
        <UserChallenges />
      </div>
      <div className="search-side">three</div>
    </div>
  );
}

export default UserPage;
