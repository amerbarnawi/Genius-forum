import React from "react";
import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";

function ForumBanner() {
  const { userData } = useLoginDetails();
  return (
    <div>
      <div>
        <img src={userData.logo} alt={userData.userName} />
        <h3>{userData.userName.toUpperCase()}</h3>
      </div>
      <h1>Welcome to the forum</h1>
      <NavLink to="/forum/userHome/my-page">My page</NavLink>
      <br />
      <NavLink to="/forum/favorites/my-favorites">Favorites</NavLink>
      <br />
      <NavLink to="/forum">Forum Home</NavLink>
    </div>
  );
}

export default ForumBanner;
