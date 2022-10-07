import React from "react";
import { Outlet, useParams } from "react-router-dom";
import UserChallenges from "./UserChallenges/UserChallenges";
import ForumBanner from "./ForumBanner";
import { CommentProvider } from "./Main/Challenge/CommentProvider";
import { LikeProvider } from "./Main/Challenge/LikeProvider";
import Main from "./Main/Main";
import Search from "./Search/Search";
import { FavoritesProvider } from "./Favorites/FavoritesProvider";

function Forum() {
  const { id } = useParams();

  return (
    <LikeProvider>
      <CommentProvider>
        <FavoritesProvider>
          <div className="forum-page">
            <ForumBanner />
            {id === "my-page" ? (
              <Outlet />
            ) : (
              <div className="forum-page-columns">
                <div className="search-side">
                  <h1>Search</h1>
                  <Search />
                </div>
                <div className="main">{id ? <Outlet /> : <Main />}</div>
                <div className="all-challenges-side">
                  <h1>My challenges</h1>
                  <UserChallenges />
                </div>
              </div>
            )}
          </div>
        </FavoritesProvider>
      </CommentProvider>
    </LikeProvider>
  );
}

export default Forum;
