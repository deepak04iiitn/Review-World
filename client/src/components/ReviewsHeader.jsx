import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  Award, 
  ChevronRight 
} from 'lucide-react';

const ReviewsHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }}
      className="relative overflow-hidden mb-10"
    >
      {/* Header Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-3 mb-6 items-center"
        >
          <Star 
            className="text-yellow-500" 
            fill="currentColor" 
            size={32} 
          />
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            <Award 
              className="text-emerald-600" 
              size={32} 
            />
          </motion.div>
          <TrendingUp 
            className="text-indigo-600" 
            size={32} 
          />
        </motion.div>

        <h1 className="text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
          Community Insights
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl max-w-2xl mx-auto mb-10 text-gray-700"
        >
          Dive into collective wisdom, uncover trending perspectives, and explore the pulse of community opinions
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button className="group relative px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center mx-auto space-x-3">
            <span>Explore Insights</span>
            <ChevronRight 
              className="transform transition-transform group-hover:translate-x-1" 
              size={20} 
            />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReviewsHeader;