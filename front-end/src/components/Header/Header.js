import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";
import { MdHome, MdLogout, MdForum, MdSchool } from "react-icons/md";
import logo from "../../assets/logo.png";

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
        <img src={logo} alt="website-logo" />
        <div className="app-title">
          <h1>Genius Forum</h1>
        </div>
      </div>

      <div className="header-navbar">
        <div className="log-out navbar-button">
          <MdLogout className="icon" />
          <NavLink onClick={() => logOut()} className="button-title">
            Log out
          </NavLink>
        </div>
        <div className="main-buttons">
          <div className="navbar-button">
            <MdHome className="icon" />
            <NavLink to="/" className="button-title">
              Home
            </NavLink>
          </div>
          <div className="navbar-button">
            <MdSchool className="icon" />
            <NavLink to="/iq-test" className="button-title">
              IQ-test
            </NavLink>
          </div>
          <div className="navbar-button">
            <MdForum className="icon" />
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
