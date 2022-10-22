import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useFetchByClick from "../../../../Hooks/FetchByClick";
import { useLoginDetails } from "../../../Login/LoginProvider";
import { usePublicChat } from "../ChatProvider";

function UserPanel() {
  const [isClicked, setIsClicked] = useState(false);
  const [body, setBody] = useState("");
  const { userData } = useLoginDetails();

  const { setIsLogOut } = usePublicChat();

  const sendMessage = () => {
    if (body !== "") {
      setIsClicked(true);
    }
  };

  useEffect(() => {
    if (isClicked) {
      setIsClicked(false);
      setBody("");
    }
  }, [isClicked]);

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  const getBody = (e) => {
    setBody(e.target.value);
  };

  const message = {
    userLogo: userData.logo,
    userName: userData.userName,
    message: body,
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(message),
  };

  const url = `http://localhost:5000/api/forum/chat/public?email=${userData.email}&password=${userData.password}`;

  const {
    data: response,
    error,
    isLoading,
  } = useFetchByClick(isClicked, setIsClicked, url, requestOptions);

  return (
    <>
      {isLoading && isClicked ? (
        <p>Sending..</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{response.message}</p>
      )}
      <input
        value={body}
        name="body"
        placeholder="Your message.."
        onChange={getBody}
        onKeyDown={(e) => handleKeypress(e)}
        className="user-message-textarea"
      />
      <NavLink className="user-area-button" onClick={() => sendMessage()}>
        Submit
      </NavLink>
      <NavLink
        className="user-area-button"
        to="/forum"
        onClick={() => setIsLogOut(true)}
      >
        Log out
      </NavLink>
    </>
  );
}

export default UserPanel;
