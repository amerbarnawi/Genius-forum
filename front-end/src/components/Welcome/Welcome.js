import React from "react";
import Banner from "./Banner";
import ForumInfo from "./ForumInfo";
import IqInfo from "./IqInfo";

function Welcome() {
  return (
    <main>
      <Banner />
      <div>
        <div className="welcome-right-side">
          <IqInfo />
          <ForumInfo />
        </div>
      </div>
    </main>
  );
}

export default Welcome;
