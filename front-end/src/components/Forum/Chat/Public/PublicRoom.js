import React from "react";
import MessagesArea from "./MessagesArea/MessagesArea";
import OnlineUsers from "./OnlineUsers/OnlineUsers";
import UserPanel from "./UserPanel/UserPanel";

function PublicRoom() {
  return (
    <div className="chat-room-container">
      <div className="users-and-messages-area-container">
        <div className="online-users-area">
          <OnlineUsers />
        </div>
        <div className="messages-area">
          <MessagesArea />
        </div>
      </div>
      <div className="user-area">
        <UserPanel />
      </div>
    </div>
  );
}

export default PublicRoom;
