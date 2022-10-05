import React, { useState } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import useLoginFetch from "./loginFetch";

function Login() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, isLoading, message, isLoggedIn, getUserData } = useLoginFetch(
    email,
    password
  );

  const getUserName = (e) => {
    setEmail(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  if (isLoading) {
    return <h2>Loading ..</h2>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <Navigate to="/forum" state={{ from: location }} replace />
      ) : (
        <div>
          <h1>Log in</h1>
          {error ? (
            <h2>{error}</h2>
          ) : (
            <div>
              <h2>{message}</h2>
              <form>
                <input
                  type="text"
                  value={email}
                  name="userName"
                  placeholder="User name"
                  onChange={getUserName}
                  required
                />
                <input
                  type="text"
                  value={password}
                  name="password"
                  placeholder="Password"
                  required
                  onChange={getPassword}
                />
              </form>
              <button type="submit" onClick={() => getUserData()}>
                Submit
              </button>

              <NavLink to="/">Home page</NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
