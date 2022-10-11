import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useLoginFetch from "./loginFetch";
import { MdSend } from "react-icons/md";

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
    return <h2 className="login-loading">Loading ..</h2>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <Navigate to="/forum" state={{ from: location }} replace />
      ) : (
        <div className="login-container">
          <h1>Log in</h1>
          {error ? (
            <h3>{error}</h3>
          ) : (
            <div>
              <h3>{message}</h3>
              <div className="login-form">
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
              </div>
              <button type="submit" onClick={() => getUserData()}>
                Submit
                <MdSend className="btn-icon" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
