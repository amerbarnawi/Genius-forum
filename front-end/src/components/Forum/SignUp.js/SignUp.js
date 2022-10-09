import React, { useEffect, useState } from "react";
import useFetchByClick from "../../Hooks/FetchByClick";
import { Navigate } from "react-router";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState("love");
  const [isClicked, setIsClicked] = useState(false);
  const [isNavigate, setIsNavigate] = useState(false);

  const getUserName = (e) => {
    setUserName(e.target.value);
  };
  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const getLogo = (e) => {
    setLogo(e.target.value);
  };

  const createAccount = () => {
    setIsClicked(true);
  };

  const newUser = {
    userName,
    email,
    password,
    logo: `https://robohash.org/${logo}`,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(newUser),
  };

  const url = `http://localhost:5000/api/user/create`;
  const {
    data: response,
    error,
    isLoading,
  } = useFetchByClick(isClicked, setIsClicked, url, requestOptions);

  useEffect(() => {
    if (!isLoading && !error && response.message.includes("done")) {
      setTimeout(() => {
        setIsNavigate(true);
      }, 3000);
    }
  }, [isLoading, error, response.message]);

  return (
    <div>
      <div>
        <h3>
          {isClicked
            ? isLoading
              ? "Loading.."
              : error
              ? error
              : response.message
              ? response.message
              : ""
            : response.message}
        </h3>
      </div>
      <div>
        <input
          type="text"
          value={userName}
          name="userName"
          placeholder="User name"
          onChange={getUserName}
        />
        <input
          type="text"
          value={email}
          name="email"
          placeholder="E-mail"
          onChange={getEmail}
          required
        />
        <input
          type="text"
          value={password}
          name="password"
          placeholder="Password"
          onChange={getPassword}
        />
        <div>
          <p>Write text to generate a unique image as your logo.</p>
          <img src={`https://robohash.org/${logo}`} alt="User Logo" />
          <input
            type="text"
            value={logo}
            name="logo"
            placeholder="text"
            onChange={getLogo}
          />
        </div>
      </div>

      <button onClick={() => createAccount()}>Submit</button>
      {/* <NavLink to="/login">Login</NavLink> */}

      {isNavigate ? <Navigate to="/login" /> : ""}
    </div>
  );
}

export default SignUp;
