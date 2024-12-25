import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaSignOutAlt, FaComment} from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sticky top-0 z-50 isolate">
      <header
        className={`relative transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-blue-900/80 backdrop-blur-md shadow-2xl"
            : "bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0.1))]"></div>

        <nav className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-24">
            {/* Mobile Layout */}
            <div className="flex justify-between items-center w-full md:hidden">
              {/* Hamburger - Left */}
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </motion.button>

              {/* Logo - Center */}
              <Link
                to="/"
                className="flex items-center space-x-2 group absolute left-1/2 transform -translate-x-1/2"
              >
                <motion.img
                  src="/assets/Review4All.png"
                  alt="Review World"
                  className="h-12 w-18"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
              </Link>

              {/* Sign In - Right */}
              <div>
                {currentUser ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.img
                        src={currentUser.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full border-2 border-purple-300"
                        whileHover={{ borderColor: "#EC4899" }}
                      />
                    </motion.button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-300 z-50"
                        >
                          <Link
                            to="/dashboard?tab=profile"
                            className="flex items-center px-6 py-3 text-gray-800 font-semibold text-lg rounded-lg transition-all hover:bg-blue-100 hover:scale-105 ease-in-out"
                          >
                            <FaUserCircle
                              className="mr-3 text-blue-500"
                              size={20}
                            />
                            Profile
                          </Link>
                          <Link
                            to="/chathome"
                            className="flex items-center px-6 py-3 text-gray-800 font-semibold text-lg rounded-lg transition-all hover:bg-blue-100 hover:scale-105 ease-in-out"
                          >
                            <FaComment
                              className="mr-3 text-blue-500"
                              size={20}
                            />
                            Chat
                          </Link>
                          <button
                            onClick={handleSignout}
                            className="flex items-center block w-full text-left px-6 py-3 text-gray-800 font-semibold text-lg rounded-lg mt-2 transition-all hover:bg-red-100 hover:scale-105 ease-in-out"
                          >
                            <FaSignOutAlt
                              className="mr-3 text-red-500"
                              size={20}
                            />
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/sign-in"
                      className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Desktop Layout - Unchanged */}
            <div className="hidden md:flex-shrink-0 md:w-1/4 md:flex">
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.img
                  src="/assets/Review4All.png"
                  alt="Review World"
                  className="h-14 w-18"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  Review4All
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center flex-grow">
              <div className="flex items-center space-x-12">
                {["Home", "About", "Reviews", "Trends", "Polls"].map(
                  (item, index) => (
                    <NavLink
                      key={item}
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      icon={["🏠", "ℹ️", "⭐", "📈", "📊"][index]}
                      delay={index * 0.1}
                    >
                      {item}
                    </NavLink>
                  )
                )}
              </div>
            </div>

            <div className="hidden md:flex-shrink-0 md:w-1/4 md:flex md:justify-end">
              <div className="flex items-center space-x-4">
                {currentUser ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 focus:outline-none"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.img
                        src={currentUser.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full border-2 border-purple-300"
                        whileHover={{ borderColor: "#EC4899" }}
                      />
                      <span className="text-gray-200">
                        {currentUser.username}
                      </span>
                    </motion.button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-300 z-50"
                        >
                          <Link
                            to="/dashboard?tab=profile"
                            className="flex items-center px-6 py-3 text-gray-800 font-semibold text-lg rounded-lg transition-all hover:bg-blue-100 hover:scale-105 ease-in-out"
                          >
                            <FaUserCircle
                              className="mr-3 text-blue-500"
                              size={20}
                            />
                            Profile
                          </Link>
                          <Link
                            to="/chathome"
                            className="flex items-center px-6 py-3 text-gray-800 font-semibold text-lg rounded-lg transition-all hover:bg-blue-100 hover:scale-105 ease-in-out"
                          >
                            <FaComment
                              className="mr-3 text-blue-500"
                              size={20}
                            />
                            Chat
                          </Link>
                          <button
                            onClick={handleSignout}
                            className="flex items-center block w-full text-left px-6 py-3 text-gray-800 font-semibold text-lg rounded-lg mt-2 transition-all hover:bg-red-100 hover:scale-105 ease-in-out"
                          >
                            <FaSignOutAlt
                              className="mr-3 text-red-500"
                              size={20}
                            />
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/sign-in"
                      className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Unchanged */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl md:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {["Home", "About", "Reviews", "Trends", "Polls"].map(
                    (item, index) => (
                      <MobileNavLink
                        key={item}
                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        icon={["🏠", "ℹ️", "⭐", "📈", "📊"][index]}
                        delay={index * 0.1}
                      >
                        {item}
                      </MobileNavLink>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const NavLink = ({ href, children, icon, delay }) => (
  <motion.a
    href={href}
    className="flex items-center space-x-1 text-gray-200 hover:text-purple-300 transition-colors relative group"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05 }}
  >
    <span className="group-hover:rotate-12 transition-transform duration-300">
      {icon}
    </span>
    <span>{children}</span>
    <motion.div
      className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-300"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.a>
);

const MobileNavLink = ({ href, children, icon, delay }) => (
  <motion.a
    href={href}
    className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors py-2"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ x: 10 }}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{children}</span>
  </motion.a>
);
