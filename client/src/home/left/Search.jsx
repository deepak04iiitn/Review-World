import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import useGetAllUsers from "../../context/userGetAllUsers";
import useConversation from "../../statemanage/useConversation";

function Search() {
  const [search, setSearch] = useState("");
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
    <div className=" h-[10vh]">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className=" border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
              <input
                type="text"
                className="grow outline-none bg-transparent"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button>
              <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;