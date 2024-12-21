import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage.js";

export default function Type() {

  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3 h-[10vh] text-center bg-gray-800">
          <div className="w-[70%] mx-4">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Type here"
              className="rounded-xl input input-bordered w-full text-black mt-1"
            />
          </div>

          <button className="text-3xl">
            <IoIosSend />
          </button>
        </div>
      </form>
    </>
  );
}
