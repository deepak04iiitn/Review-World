import { useState, useEffect } from "react";

export default function useGetAllUsers() {
    const [allUsers, setAllUsers] = useState({ filteredUsers: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("/api/user/profile", {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Server didn't return JSON");
                }

                const data = await response.json();
                
                if (!data || !data.filteredUsers) {
                    throw new Error("Invalid response format");
                }

                setAllUsers(data);
                setError(null);
            } catch (error) {
                console.error("Error in useGetAllUsers:", error);
                setError(error.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    return {
        users: allUsers.filteredUsers || [],
        loading,
        error
    };
}