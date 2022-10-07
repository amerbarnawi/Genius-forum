import React from "react";
import UserChallenges from "../UserChallenges/UserChallenges";

function UserPage() {
  return (
    <div className="forum-page-columns">
      {/* <div className="search-side">one</div> */}
      <div className="user-page-main">
        <UserChallenges />
      </div>
      <div className="search-side">three</div>
    </div>
  );
}

export default UserPage;
