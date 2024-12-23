import React from "react";
import useConversation from "../../statemanage/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Chatuser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const isOnline = getOnlineUsersStatus(selectedConversation._id) === "Online";

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 transition-all duration-300 hover:from-gray-800 hover:to-gray-700">
      <div className="flex items-center gap-4 max-w-screen-xl mx-auto">
        <div className="relative">
          <img
            src={selectedConversation.profilePicture}
            alt={`${selectedConversation.username}'s avatar`}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 transition-transform duration-300 hover:scale-105"
          />
          <div 
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-gray-800 
              ${isOnline ? 'bg-green-500' : 'bg-gray-500'}
              transition-colors duration-300`}
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white tracking-wide">
            {selectedConversation.username}
          </h1>
          <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-400'} transition-colors duration-300`}>
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatuser;