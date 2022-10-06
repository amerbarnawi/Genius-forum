import { NavLink } from "react-router-dom";

function Header() {
  const logOut = () => {
    window.location.reload(true);
  };
  return (
    <header>
      <h1>My website</h1>
      <NavLink to="/">Home page</NavLink>
      <NavLink onClick={() => logOut()}>Log out</NavLink>
      <hr />
    </header>
  );
}

export default Header;
