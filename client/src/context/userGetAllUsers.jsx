import React, { useEffect, useState } from "react";

export default function useGetAllUsers() {  // Changed to proper camelCase naming
  const [allUsers, setAllUsers] = useState({ filteredUsers: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch("/api/user/profile", {
          credentials: "include",
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users: allUsers.filteredUsers, loading, error };
}