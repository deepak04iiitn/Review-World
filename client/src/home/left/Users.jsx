import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/userGetAllUsers";

export default function Users() {
    const { users, loading, error } = useGetAllUsers();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 text-center">
                Error: {error}
            </div>
        );
    }

    if (!users?.length) {
        return (
            <div className="text-center p-4">
                No users found
            </div>
        );
    }

    return (
        <div className="py-2 flex-deepak space-y-4 p-6 overflow-y-auto" 
             style={{maxHeight: "calc(84vh - 1vh)"}}>
            {users.map((user) => (
                <User key={user._id} user={user} />
            ))}
        </div>
    );
}