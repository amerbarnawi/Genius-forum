import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useFetchByClick from "../../../Hooks/FetchByClick";
import { useLoginDetails } from "../../Login/LoginProvider";
import { MdSend } from "react-icons/md";

function CreateChallenge() {
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const getTitle = (e) => {
    setTitle(e.target.value);
  };
  const getBody = (e) => {
    setBody(e.target.value);
  };
  const getImage = (e) => {
    setImage(e.target.value);
  };

  const create = () => {
    setIsClicked(true);
  };

  const { userData } = useLoginDetails();
  const newChallenge = {
    title,
    body,
    image,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(newChallenge),
  };

  const url = `http://localhost:5000/api/forum/challenge/create?email=${userData.email}&password=${userData.password}`;
  const {
    data: { message },
    error,
  } = useFetchByClick(isClicked, setIsClicked, url, requestOptions);

  //   const { setIsReload } = useReload();
  //   if (message) {
  //     const isValid = message.includes("done");
  //     if (isValid) {
  //       setIsReload(true);
  //     }
  //   }

  return (
    <div className="create-update-challenge-div">
      <h3>Create challenge</h3>
      <div className="create-challenge-message">
        {error ? <h2>{error}</h2> : message ? <h2>{message}</h2> : ""}
      </div>
      <div className="create-update-challenge-form">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Challenge title"
          onChange={getTitle}
        />
        <textarea
          value={body}
          name="body"
          placeholder="The challenge .."
          onChange={getBody}
        ></textarea>
        <input
          type="text"
          value={image}
          name="image"
          placeholder="Image link"
          onChange={getImage}
        />
      </div>
      <NavLink onClick={() => create()}>
        Submit <MdSend />
      </NavLink>
    </div>
  );
}

export default CreateChallenge;
