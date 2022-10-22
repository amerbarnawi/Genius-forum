import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useFetchByClick from "../../../Hooks/FetchByClick";
import { useLoginDetails } from "../../Login/LoginProvider";
import { MdSend, MdEdit } from "react-icons/md";
import { CKEditor } from "ckeditor4-react";

function CreateChallenge({ setIsCreate, setIsRender }) {
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [isEditor, setIsEditor] = useState(false);

  const textEditor = () => {
    setIsEditor(!isEditor);
    setBody(body);
  };

  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  const getBody = (e) => {
    if (isEditor) {
      setBody(e.editor.getData());
    } else {
      setBody(e.target.value);
    }
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
    userLogo: userData.logo,
    userName: userData.userName,
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

  useEffect(() => {
    if (message) {
      if (message.includes("done")) {
        setIsRender(true);
      }
    }
  }, [setIsRender, message]);

  return (
    <div className="create-update-challenge-div">
      <button onClick={() => setIsCreate(false)}>Close</button>
      <h2>Create challenge</h2>
      <div className="create-challenge-message">
        {error ? <h2>{error}</h2> : message ? <h2>{message}</h2> : ""}
      </div>
      <div className="update-form">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Challenge title"
          onChange={getTitle}
          className="update-title"
        />

        <div className="text-editor">
          {isEditor ? (
            <CKEditor
              className="ck-ck"
              config={{
                uiColor: "#8a8888",
                removeButtons: ["Image"],
              }}
              initData={`${body}`}
              type="classic"
              style={{
                borderColor: "gray",
                marginBottom: "20px",
              }}
              onChange={getBody}
            />
          ) : (
            <textarea
              value={body}
              name="body"
              placeholder="The challenge .."
              onChange={getBody}
              className="update-body"
            ></textarea>
          )}
          <NavLink className="ckEditor-button" onClick={() => textEditor()}>
            <MdEdit className="icon" />
          </NavLink>
        </div>

        <input
          type="text"
          value={image}
          name="image"
          placeholder="Image link"
          onChange={getImage}
          className="update-image"
        />
      </div>
      <NavLink onClick={() => create()} className="create-challenge-button">
        Submit <MdSend />
      </NavLink>
    </div>
  );
}

export default CreateChallenge;
