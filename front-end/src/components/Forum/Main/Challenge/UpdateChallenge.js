import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useFetchByClick from "../../../Hooks/FetchByClick";
import { useLoginDetails } from "../../Login/LoginProvider";

function UpdateChallenge({ challenge, setIsUpdate }) {
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState(challenge.title);
  const [body, setBody] = useState(challenge.body);
  const [image, setImage] = useState(challenge.image);

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
    method: "PUT",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(newChallenge),
  };

  const url = `http://localhost:5000/api/forum/challenge/update/${challenge._id}?email=${userData.email}&password=${userData.password}`;
  const {
    data: { message },
    error,
  } = useFetchByClick(isClicked, setIsClicked, url, requestOptions);

  return (
    <div>
      <button onClick={() => setIsUpdate(false)}>Close</button>
      <div>{error ? <h2>{error}</h2> : message ? <h2>{message}</h2> : ""}</div>
      <form>
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
      </form>
      <NavLink onClick={() => create()}>Submit</NavLink>
    </div>
  );
}

export default UpdateChallenge;