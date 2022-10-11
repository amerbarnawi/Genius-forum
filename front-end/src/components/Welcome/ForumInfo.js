import React from "react";
import { NavLink } from "react-router-dom";
import { MdForum } from "react-icons/md";
import forum from "../../assets/welcome-page/forum.jpeg";

function ForumInfo() {
  return (
    <div className="forum-info">
      <div className="forum-text">
        <h2>About our forum</h2>
        <p>
          A platform for communication between people around the world who love
          scientific puzzles and logical challenges and who are highly
          intelligent. The forum represents a social networking platform through
          which members can interact with each other and create challenges for
          others. You need to pass the IQ test by at least 80% to be able to
          register as a member of the forum.
        </p>

        <NavLink to="/forum" className="forum-info-button">
          The forum <MdForum className="icon" />
        </NavLink>
      </div>

      <div>
        <img src={forum} alt="online-forum" />
      </div>
    </div>
  );
}

export default ForumInfo;
