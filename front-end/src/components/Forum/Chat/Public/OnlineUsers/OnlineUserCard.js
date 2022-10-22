import React from "react";

function OnlineUserCard({ user }) {
  return (
    <div className="online-user-card">
      <img src={user.logo} alt="user-logo" />
      <h4>{user.userName.toUpperCase()}</h4>
    </div>
  );
}

export default OnlineUserCard;
