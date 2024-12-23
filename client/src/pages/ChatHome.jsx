import React, { useState } from 'react';
import Left from '../home/left/Left';
import Right from '../home/right/Right';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function ChatHome() {
  const { currentUser } = useSelector(state => state.user);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) return <Navigate to='/sign-in' />;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-28 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Responsive Layout */}
      <div className="h-full flex">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:relative
            w-80 lg:w-[30%] lg:min-w-[30%] lg:max-w-[30%]
            h-full
            transition-transform duration-300 ease-in-out
            z-40 lg:z-auto
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <Left className="w-full h-full" />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-[70%] lg:min-w-[70%] lg:max-w-[70%]">
          <Right className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}