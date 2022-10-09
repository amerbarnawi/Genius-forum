import React from "react";
import { NavLink } from "react-router-dom";
import { MdForum, MdSchool } from "react-icons/md";

function Banner() {
  return (
    <div className="banner">
      <div>
        <h3>About us</h3>
        <p>
          A platform for communication between people around the world who love
          scientific puzzles and logical challenges and who are highly
          intelligent.
        </p>
      </div>
      <div>
        <div>
          <NavLink to="/iq-test">
            IQ-test
            <MdSchool />
          </NavLink>
          <NavLink to="/forum">
            Forum <MdForum />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Banner;
