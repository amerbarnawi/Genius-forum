import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import { useLogin } from "./Login/LoginProvider";

function Forum() {
  // const loggedIn = useLogin;
  return (
    <div>
      <main>
        <h1>Welcome to the forum</h1>
        <Outlet />
        <NavLink to="/">Home page</NavLink>
      </main>
    </div>
  );
}

export default Forum;
