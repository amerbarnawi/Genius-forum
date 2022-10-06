import React from "react";
import { Outlet } from "react-router-dom";
import { LikeProvider } from "./Main/Challenge/LikeProvider";
import Main from "./Main/Main";
// import { useLogin } from "./Login/LoginProvider";

function Forum() {
  // const loggedIn = useLogin;
  return (
    <LikeProvider>
      <div className="forum-page">
        <div className="forum-page-columns">
          <div className="search-side">
            <h1>Search</h1>
          </div>
          <div className="main">
            <h1>Welcome to the forum</h1>
            <Main />
            <Outlet />
          </div>
          <div className="all-challenges-side">
            <h1>All challenges</h1>
          </div>
        </div>
      </div>
    </LikeProvider>
  );
}

export default Forum;
