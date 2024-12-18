import React from "react";

export default function User() {
  return (
    <div>
      <div className="flex items-center space-x-4 hover:bg-slate-600 duration-300 cursor-pointer px-8 py-7 rounded-lg">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User avatar"
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">Ankit Pathak</h1>
          <span className="text-gray-500">ankit@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
