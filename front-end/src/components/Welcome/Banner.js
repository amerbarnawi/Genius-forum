import React from "react";
import { NavLink } from "react-router-dom";
import { MdForum, MdSchool } from "react-icons/md";
import bannerImage from "../../assets/welcome-page/einstein.jpeg";
// import back from "../../assets/background.jpeg";

function Banner() {
  return (
    <div className="banner">
      <div className="banner-image">
        <img src={bannerImage} alt="banner-einstein" />
      </div>
      <div className="banner-info">
        <div className="about-us">
          <h3>About us</h3>
          <p>
            A platform for communication between people around the world who
            love scientific puzzles and logical challenges and who are highly
            intelligent.
          </p>
          <div className="links">
            <NavLink to="/iq-test" className="banner-link">
              IQ-test
              <MdSchool className="icon" />
            </NavLink>
            <NavLink to="/forum" className="banner-link">
              Forum <MdForum className="icon" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
