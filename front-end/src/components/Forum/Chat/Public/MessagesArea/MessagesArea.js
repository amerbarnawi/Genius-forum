import React, { useRef, useEffect } from "react";
import useFetchPerTime from "../../../../Hooks/FetchPerTime";
import { useLoginDetails } from "../../../Login/LoginProvider";
import MessageCard from "./MessageCard";

function MessagesArea() {
  const { userData } = useLoginDetails();
  const messageRef = useRef();

  const url = `http://localhost:5000/api/forum/chat/public/messages/?message=&email=${userData.email}&password=${userData.password}`;
  const { data: messages, error, isLoading } = useFetchPerTime(url, 1000);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [messages]);

  return (
    <>
      {isLoading ? (
        <h2>Loading..</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : messages.length > 0 ? (
        <div>
          {messages.slice(-20).map((message, index) => (
            <MessageCard key={index} message={message} />
          ))}
          <div ref={messageRef}></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MessagesArea;
