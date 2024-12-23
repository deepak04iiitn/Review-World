import React from 'react'
import Search from './Search'
import Users from './Users'
import { motion, AnimatePresence } from 'framer-motion';

export default function Left() {
  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="font-bold text-3xl p-4 px-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
      >
        Chats
      </motion.h1>
      <Search />
      <motion.hr 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        className="border-gray-800"
      />
      <Users />
    </motion.div>
  );
};