import React from "react";

export default function User({user}) {
  return (
    <div>
      <div className="flex items-center space-x-4 hover:bg-slate-600 duration-300 cursor-pointer px-8 py-7 rounded-lg">
        <div className="avatar online">
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
