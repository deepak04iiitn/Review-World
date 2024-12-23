import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  
  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`
        transform transition-all duration-300 ease-in-out
        hover:scale-[1.02] cursor-pointer
        ${isSelected ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'hover:bg-slate-700/50'}
        rounded-xl mx-2 my-1.5
      `}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Profile Picture Container */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-slate-800 ring-blue-400">
            <img
              src={user.profilePicture}
              alt={`${user.username}'s avatar`}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>
          {/* Online Status Indicator */}
          {isOnline && (
            <div className="absolute bottom-0 right-0">
              <div className="w-4 h-4 rounded-full bg-green-500 ring-2 ring-white" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className={`font-semibold text-lg truncate ${isSelected ? 'text-white' : 'text-gray-100'}`}>
            {user.username}
          </h3>
          <p className={`text-sm truncate ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;