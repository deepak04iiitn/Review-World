import React from "react";
import User from "./User";

export default function Users() {
  return (
    <div className="py-2 flex-deepak space-y-4 p-6 overflow-y-auto" style={{maxHeight : "calc(84vh - 1vh)"}}>
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
    </div>
  );
}
