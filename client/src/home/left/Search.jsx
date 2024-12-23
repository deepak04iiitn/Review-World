import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import useGetAllUsers from "../../context/userGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import { motion, AnimatePresence } from 'framer-motion';

function Search() {

  const [search, setSearch] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { users: allUsers } = useGetAllUsers();  // Fix: destructure the object properly
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    
    const conversation = allUsers?.find((user) =>  // Add optional chaining
      user.email?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
      <div className="h-[10vh] px-4 py-2 mb-6">
        <form onSubmit={handleSubmit}>
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <motion.div 
              animate={{ 
                boxShadow: isInputFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none"
              }}
              className="flex-1 relative overflow-hidden rounded-xl bg-gray-800"
            >
              <input
                type="text"
                className="w-full p-3 pl-4 bg-transparent outline-none transition-all duration-300"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors"
            >
              <FaSearch className="text-xl" />
            </motion.button>
          </motion.div>
        </form>
      </div>
    );
  };
  
export default Search;