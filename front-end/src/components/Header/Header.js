import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";
import { MdHome, MdLogout, MdForum, MdSchool } from "react-icons/md";

function Header() {
  const { setUserData, setIsLoggedIn } = useLoginDetails();

  const logOut = () => {
    setUserData({});
    setIsLoggedIn(false);
    sessionStorage.clear();
    // window.location.reload(true);
  };

  return (
    <header>
      <div className="app-logo">
        <img src="" alt="website-logo" />
        <div className="app-title">
          <h1>Genius Forum</h1>
        </div>
      </div>

      <div className="header-navbar">
        <div className="log-out navbar-button">
          <MdLogout />
          <NavLink onClick={() => logOut()} className="button-title">
            Log out
          </NavLink>
        </div>
        <div className="main-buttons">
          <div className="navbar-button">
            <MdHome />
            <NavLink to="/" className="button-title">
              Home page
            </NavLink>
          </div>
          <div className="navbar-button">
            <MdSchool />
            <NavLink to="/iq-test" className="button-title">
              IQ-test
            </NavLink>
          </div>
          <div className="navbar-button">
            <MdForum />
            <NavLink to="/forum" className="button-title">
              Forum
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
