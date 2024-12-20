import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/userGetAllUsers";

export default function Users() {

  const { users, loading, error } = useGetAllUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-2 flex-deepak space-y-4 p-6 overflow-y-auto" style={{maxHeight : "calc(84vh - 1vh)"}}>
      {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
    </div>
  );
}
