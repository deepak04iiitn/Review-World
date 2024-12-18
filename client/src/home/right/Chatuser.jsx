import React from "react";

export default function Chatuser() {
  return (
    <>
      <div className="pt-5 pl-5 h-[12vh] bg-gray-900 hover:bg-gray-600 duration-300 flex space-x-4">
        <div>
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User avatar"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl">Ankit Pathak</h1>
          <span className="text-sm">Online</span>
        </div>
      </div>
    </>
  );
}
