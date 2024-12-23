import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import useSendMessage from '../context/useSendMessage';
import useGetMessage from '../context/useGetMessage';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../statemanage/useConversation';
import useGetSocketMessage from '../context/useGetSocketMessage';


const ModernChatInterface = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessages } = useSendMessage();
    const { loading: messagesLoading, messages } = useGetMessage();
    const { selectedConversation } = useConversation();
    const { socket, onlineUsers = [] } = useSocketContext();
    const lastMsgRef = useRef();
    const {currentUser} = useSelector(state => state.user);
    
    // Only call useGetSocketMessage if socket exists
    useEffect(() => {
      if (socket) {
        useGetSocketMessage();
      }
    }, [socket]);
  
    useEffect(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!message.trim() || !socket) return;
      try {
        await sendMessages(message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
        // Optionally add error handling UI here
      }
    };
  
    const ChatMessage = ({ message }) => {
      const itsMe = message.senderId === currentUser?._id;
      const time = new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
  
      return (
        <div className={`flex ${itsMe ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
          <div className={`max-w-[70%] ${itsMe ? 'bg-blue-600' : 'bg-gray-700'} 
                          rounded-2xl px-4 py-2 transform transition-all duration-300 hover:scale-102
                          ${itsMe ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
            <p className="text-white">{message.message}</p>
            <span className="text-xs text-gray-300 mt-1 block">{time}</span>
          </div>
        </div>
      );
    };
  
    // Add loading state for socket connection
    if (!socket) {
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Connecting to chat...</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Header */}
        {selectedConversation && (
          <div className="flex items-center p-4 bg-gray-800 bg-opacity-50 backdrop-blur-md border-b border-gray-700">
            <div className="relative">
              <img
                src={selectedConversation.profilePicture}
                alt={selectedConversation.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full
                              ${onlineUsers.includes(selectedConversation._id) ? 'bg-green-500' : 'bg-gray-500'}
                              border-2 border-white`}></span>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg">{selectedConversation.username}</h3>
              <p className="text-sm text-gray-300">
                {onlineUsers.includes(selectedConversation._id) ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        )}
  
        {/* Rest of the component remains the same... */}
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {!selectedConversation ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 animate-fadeIn">
                <div className="text-6xl mb-4">👋</div>
                <h2 className="text-2xl font-bold">Welcome, {currentUser?.username}!</h2>
                <p className="text-gray-400">Select a chat to start messaging</p>
              </div>
            </div>
          ) : messagesLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div key={msg._id} ref={index === messages.length - 1 ? lastMsgRef : null}>
                  <ChatMessage message={msg} />
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-10 animate-fadeIn">
                  Start your conversation with a friendly hello! 👋
                </div>
              )}
            </>
          )}
        </div>
  
        {/* Message Input */}
        {selectedConversation && (
          <form onSubmit={handleSubmit} className="p-4 bg-gray-800 bg-opacity-50 backdrop-blur-md">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={loading || !message.trim() || !socket}
                className={`p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 
                           ${(loading || !message.trim() || !socket) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                ) : (
                  <IoIosSend className="text-xl" />
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };
  
  export default ModernChatInterface;