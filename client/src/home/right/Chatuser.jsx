import React from "react";
import useConversation from "../../statemanage/useConversation";
import { useSocketContext } from "../../context/SocketContext";

export default function Chatuser() {

  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <>
      <div className="pt-5 pl-5 h-[12vh] bg-gray-900 hover:bg-gray-600 duration-300 flex space-x-4">
        <div>
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img
                src={selectedConversation.profilePicture}
                alt="User avatar"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl">{selectedConversation.username}</h1>
          <span className="text-sm">{getOnlineUsersStatus(selectedConversation._id)}</span>
        </div>
      </div>
    </>
  );
}
