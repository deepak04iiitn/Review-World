import React, { useState } from "react";
import useSendMessage from "../../context/useSendMessage.js";
import { SendHorizontal } from "lucide-react";

export default function Type() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center h-[10vh] space-x-3 bg-gray-800">
        <div className="w-[70%] flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type here"
            className="rounded-xl input input-bordered w-full text-black"
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className={`
            p-3 rounded-xl transition-all duration-200
            ${message.trim() 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:scale-105' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
          `}
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};