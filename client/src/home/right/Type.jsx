import React from "react";
import { IoIosSend } from "react-icons/io";

export default function Type() {
  return (
    <>
      <div className="flex space-x-3 h-[10vh] text-center bg-gray-800">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            className="rounded-xl input input-bordered w-full text-black mt-1"
          />
        </div>

        <button className="text-3xl">
          <IoIosSend />
        </button>
      </div>
    </>
  );
}
