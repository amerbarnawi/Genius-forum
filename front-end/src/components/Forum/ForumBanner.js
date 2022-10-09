import React from "react";
import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";
import { MdHome, MdFavorite, MdPerson } from "react-icons/md";

function ForumBanner() {
  const { userData } = useLoginDetails();
  return (
    <div>
      <div className="user-icon">
        <img src={userData.logo} alt={userData.userName} />
        <h3>{userData.userName.toUpperCase()}</h3>
      </div>

      <div className="banner-navbar">
        <div className="banner-buttons">
          <MdPerson />
          <NavLink to="/forum/userHome/my-page">My page</NavLink>
        </div>
        <div className="banner-buttons">
          <MdFavorite />
          <NavLink to="/forum/favorites/my-favorites">Favorites</NavLink>
        </div>
        <div className="banner-buttons">
          <MdHome />
          <NavLink to="/forum">Forum Home</NavLink>
        </div>
      </div>
    </div>
  );
}

export default ForumBanner;
