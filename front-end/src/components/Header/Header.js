import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";

function Header() {
  const { setUserData, setIsLoggedIn } = useLoginDetails();

  const logOut = () => {
    setUserData({});
    setIsLoggedIn(false);
    // window.location.reload(true);
  };

  return (
    <header>
      <h1>My website</h1>
      <NavLink to="/">Home page</NavLink>
      <NavLink onClick={() => logOut()}>Log out</NavLink>
      <NavLink to="/iq-test">IQ-test</NavLink>
      <NavLink to="/forum">Forum</NavLink>
      <hr />
    </header>
  );
}

export default Header;
