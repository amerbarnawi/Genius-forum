import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../Forum/Login/LoginProvider";

function Header() {
  const { setUserData, setIsLoggedIn } = useLoginDetails();

  const logOut = () => {
    setUserData({});
    setIsLoggedIn(false);
  };
  return (
    <header>
      <h1>My website</h1>
      <NavLink onClick={() => logOut()}>Log out</NavLink>
      <hr />
    </header>
  );
}

export default Header;
