import React from "react";
import { Outlet, useParams } from "react-router-dom";
import AllChallenges from "./AllChallenges/AllChallenges";
import ForumBanner from "./ForumBanner";
import { CommentProvider } from "./Main/Challenge/CommentProvider";
import { LikeProvider } from "./Main/Challenge/LikeProvider";
import Main from "./Main/Main";

function Forum() {
  const { id } = useParams();
  console.log(id);
  return (
    <LikeProvider>
      <CommentProvider>
        <div className="forum-page">
          <ForumBanner />
          <div className="forum-page-columns">
            <div className="search-side">
              <h1>Search</h1>
            </div>
            <div className="main">
              {console.log(`id from outlet`)}
              {id ? <Outlet /> : <Main />}
            </div>
            <div className="all-challenges-side">
              <h1>All challenges</h1>
              <AllChallenges />
            </div>
          </div>
        </div>
      </CommentProvider>
    </LikeProvider>
  );
}

export default Forum;
