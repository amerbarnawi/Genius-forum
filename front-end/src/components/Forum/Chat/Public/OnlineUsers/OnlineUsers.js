import React from "react";
import useFetchPerTime from "../../../../Hooks/FetchPerTime";
import { useLoginDetails } from "../../../Login/LoginProvider";
import OnlineUserCard from "./OnlineUserCard";

function OnlineUsers() {
  const { userData } = useLoginDetails();

  const onlineUsersUrl = `http://localhost:5000/api/forum/chat/public/online-users?email=${userData.email}&password=${userData.password}`;
  const {
    data: onlineUsers,
    error: onlineUsersError,
    isLoading: isOnlineUsersLoading,
  } = useFetchPerTime(onlineUsersUrl, 3000);

  return (
    <>
      {isOnlineUsersLoading ? (
        <h2>Loading..</h2>
      ) : onlineUsersError ? (
        <h2>{onlineUsersError}</h2>
      ) : (
        <div>
          {onlineUsers.map((user, index) => (
            <OnlineUserCard key={index} user={user} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default OnlineUsers;
