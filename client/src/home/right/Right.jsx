import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../statemanage/useConversation.js";
import { CiMenuFries } from "react-icons/ci";
import { useSelector } from "react-redux";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-800 text-gray-200">
      <div className="h-full relative">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <div className="flex flex-col h-full">
            <div className="border-b border-slate-700/50">
              <Chatuser />
            </div>
            <div 
              className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
              style={{ maxHeight: "calc(100vh - 16vh)" }}
            >
              <Messages />
            </div>
            <div className="border-t border-slate-700/50">
              <Type />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const NoChatSelected = () => {
  const { currentUser } = useSelector(state => state.user);
  
  return (
    <div className="h-full relative">
      <label
        htmlFor="my-drawer-2"
        className="absolute left-4 top-4 p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 lg:hidden"
      >
        <CiMenuFries className="text-gray-200 text-xl" />
      </label>
      
      <div className="flex h-full items-center justify-center px-6">
        <div className="text-center max-w-md mx-auto space-y-4 animate-fadeIn">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {currentUser.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-100">
            Welcome, {currentUser.username}!
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Start a conversation by selecting someone from your contacts. Your messages will appear here.
          </p>
          <div className="mt-8 inline-flex items-center text-sm text-blue-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Select a contact to begin
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;