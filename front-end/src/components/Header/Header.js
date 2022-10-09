import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";
import { MdHome, MdLogout, MdForum, MdSchool } from "react-icons/md";

function Header() {
  const { setUserData, setIsLoggedIn } = useLoginDetails();

  const logOut = () => {
    setUserData({});
    setIsLoggedIn(false);
    // window.location.reload(true);
  };

  return (
    <header>
      <div className="app-logo">
        <img src="" alt="website-logo" />
      </div>
      <div className="app-title">
        <h1>Genius Forum</h1>
      </div>

      <div className="header-navbar">
        <div className="main-buttons">
          <div>
            <MdHome />
            <NavLink to="/">Home page</NavLink>
          </div>
          <div>
            <MdSchool />
            <NavLink to="/iq-test">IQ-test</NavLink>
          </div>
          <div>
            <MdForum />
            <NavLink to="/forum">Forum</NavLink>
          </div>
        </div>
        <div>
          <MdLogout />
          <NavLink onClick={() => logOut()}>Log out</NavLink>
        </div>
      </div>

      <hr />
    </header>
  );
}

export default Header;
