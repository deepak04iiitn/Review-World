import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

export default function User({user}) {

  const {selectedConversation , setSelectedConversation} = useConversation();

  const isSelected = selectedConversation ?. _id === user._id;

  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div 
      className={`hover:bg-slate-600 duration-300 ${
      isSelected ? "bg-slate-700" : ""
      }`} onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4 hover:bg-slate-600 duration-300 cursor-pointer px-8 py-7 rounded-lg">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img
              src={user.profilePicture}
              alt="User avatar"
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.username}</h1>
          <span className="text-gray-500">{user.email}</span>
        </div>
      </div>
    </div>
  );
}
