import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";
import { MdHome, MdFavorite, MdPerson, MdChat } from "react-icons/md";
import { usePublicChat } from "./Chat/Public/ChatProvider";

function ForumBanner() {
  const { userData } = useLoginDetails();
  const { id } = useParams();

  const { setIsLogin } = usePublicChat();

  return (
    <div className="forum-banner">
      <div className="banner-navbar">
        {/* Chat room button */}
        <div className="banner-button">
          <MdChat className={id === "chat-room" ? "icon clicked" : "icon"} />
          <NavLink
            onClick={() => setIsLogin(true)}
            to="/forum/chat/chat-room"
            className={
              id === "chat-room"
                ? "forum-banner-link clicked"
                : "forum-banner-link"
            }
          >
            Chat Room
          </NavLink>
        </div>
        {/* User page button */}
        <div className="banner-button">
          <MdPerson className={id === "my-page" ? "icon clicked" : "icon"} />
          <NavLink
            to="/forum/userHome/my-page"
            className={
              id === "my-page"
                ? "forum-banner-link clicked"
                : "forum-banner-link"
            }
          >
            My page
          </NavLink>
        </div>
        {/* Favorites button */}
        <div className="banner-button">
          <MdFavorite
            className={id === "my-favorites" ? "icon clicked" : "icon"}
          />
          <NavLink
            to="/forum/favorites/my-favorites"
            className={
              id === "my-favorites"
                ? "forum-banner-link clicked"
                : "forum-banner-link"
            }
          >
            Favorites
          </NavLink>
        </div>
        {/* Home button */}
        <div className="banner-button">
          <MdHome className={id === undefined ? "icon clicked" : "icon"} />
          <NavLink
            to="/forum"
            className={
              id === undefined
                ? "forum-banner-link clicked"
                : "forum-banner-link"
            }
          >
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
