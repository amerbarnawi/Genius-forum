import React from "react";
import { useLoginDetails } from "../Forum/Login/LoginProvider";

function ForumBanner() {
  const { userData } = useLoginDetails();
  return (
    <div>
      <div>
        <img src={userData.logo} alt={userData.userName} />
        <h3>{userData.userName}</h3>
      </div>
      <h1>Welcome to the forum</h1>
    </div>
  );
}

export default ForumBanner;
