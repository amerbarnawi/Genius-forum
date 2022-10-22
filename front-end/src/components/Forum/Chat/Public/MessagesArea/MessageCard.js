import React from "react";

function MessageCard({ message }) {
  return (
    <div key={message._id} className="message-card">
      <div>
        <img src={message.userLogo} alt="user-logo" />
      </div>
      <div className="user-name-and-message">
        <h4>{message.userName.toUpperCase()}</h4>
        <p>{message.message}</p>
      </div>
    </div>
  );
}

export default MessageCard;
