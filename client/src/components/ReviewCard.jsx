import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

export default function ReviewCard({review}) {
    
    const [likes, setLikes] = useState(review.likes || 0);
    const [dislikes, setDislikes] = useState(review.dislikes || 0);
  
    const handleLike = async () => {
      try {
        const response = await fetch(`/api/review/likeReview/${review._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to like review');
        const data = await response.json();
        setLikes(data.likes);
        setDislikes(data.dislikes);
      } catch (error) {
        console.error('Error liking review:', error);
      }
    };
  
    const handleDislike = async () => {
      try {
        const response = await fetch(`/api/review/dislikeReview/${review._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to dislike review');
        const data = await response.json();
        setLikes(data.likes);
        setDislikes(data.dislikes);
      } catch (error) {
        console.error('Error disliking review:', error);
      }
    };
  
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }
    };
  
    const ratingVariants = {
      hover: { scale: 1.1 }
    };
  
    const iconVariants = {
      hover: { scale: 1.2 }
    };
  
    return (
      <motion.div
        key={review._id}
        variants={cardVariants}
        whileHover="hover"
        transition={{ duration: 0.3 }}
      >
        <Link to={`/review/${review._id}`} className="block h-full">
          <motion.div 
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300 flex flex-col h-full"
            whileHover={{ y: -5 }}
          >
            <div className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-2">
                <motion.span 
                  className="text-sm font-semibold text-blue-500"
                  whileHover={{ scale: 1.05 }}
                >
                  {review.category}
                </motion.span>
                <motion.span 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  whileHover={{ scale: 1.05 }}
                >
                  {review.subcategory}
                </motion.span>
              </div>
              <motion.div 
                className="flex items-center mb-2"
                variants={ratingVariants}
                whileHover="hover"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.svg 
                    key={i} 
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </motion.div>
              <motion.p 
                className="text-sm line-clamp-3 flex-grow text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {review.review}
              </motion.p>

              <motion.p 
                className="text-sm line-clamp-3 flex-grow text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {review.userTitle}
              </motion.p>
  
              <div className="flex items-center space-x-2">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  onClick={handleLike}
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300 cursor-pointer"
                >
                  <ThumbsUp size={18} />
                </motion.div>
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  onClick={handleDislike}
                  className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer"
                >
                  <ThumbsDown size={18} />
                </motion.div>
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors duration-300 cursor-pointer"
                >
                  <MessageCircle size={18} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    );
  };
