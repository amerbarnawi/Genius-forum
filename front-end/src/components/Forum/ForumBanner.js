import React from "react";
import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";
import { MdHome, MdFavorite, MdPerson } from "react-icons/md";

function ForumBanner() {
  const { userData } = useLoginDetails();
  return (
    <div className="forum-banner">
      <div className="banner-navbar">
        <div className="banner-button">
          <MdPerson className="icon" />
          <NavLink to="/forum/userHome/my-page" className="forum-banner-link">
            My page
          </NavLink>
        </div>
        <div className="banner-button">
          <MdFavorite className="icon" />
          <NavLink
            to="/forum/favorites/my-favorites"
            className="forum-banner-link"
          >
            Favorites
          </NavLink>
        </div>
        <div className="banner-button">
          <MdHome className="icon" />
          <NavLink to="/forum" className="forum-banner-link">
            Forum Home
          </NavLink>
        </div>
      </div>
      <div className="user-icon">
        <img src={userData.logo} alt={userData.userName} />
        <h4>{userData.userName.toUpperCase()}</h4>
      </div>
    </div>
  );
}

export default ForumBanner;
