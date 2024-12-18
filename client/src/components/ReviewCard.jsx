import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MessageCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

// Sign-in Modal Component
const SignInModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Sign In</h2>
          <p className="text-gray-600 mb-6">
            You need to sign in to perform this action. 
            Please log in or create an account to continue.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => {
                // Replace with your actual sign-in route/logic
                window.location.href = '/signin';
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Sign In
            </button>
            <button 
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default function ModernReviewCard({ review }) {

  const [isHovered, setIsHovered] = useState(false);
  const [isChatHovered, setIsChatHovered] = useState(false);
  const [localLikes, setLocalLikes] = useState(review.numberOfLikes);
  const [localDislikes, setLocalDislikes] = useState(review.numberOfDislikes);
  const [userAction, setUserAction] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const navigate = useNavigate();

  const {currentUser} = useSelector(state => state.user);


  const dispatch = useDispatch();


  const handleChatClick = () => {
    if (!currentUser) {
        setShowSignInModal(true);
        return;
    }
    setShowChatModal(true);
};



  const handleLikeDislike = async (action) => {

    try {

      if (!currentUser) {
        setShowSignInModal(true);
        return;
      }

      const response = await axios.put(`/api/review/${action}/${review._id}`, {}, {
        withCredentials: true
      });

      const { likes, dislikes } = response.data;
      setLocalLikes(likes);
      setLocalDislikes(dislikes);
      
      // Update user action state
      setUserAction(action === 'likeReview' ? 'liked' : 'disliked');

      // Optional: Call parent component's update method if provided
      if (onLikeDislikeUpdate) {
        onLikeDislikeUpdate(review._id, likes, dislikes);
      }
    } catch (error) {
      console.error('Error performing like/dislike action:', error);
      // Optionally handle error (show toast, etc.)
    }
  };



  // Animated star rating component
  const AnimatedStars = () => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          initial={{ scale: 1 }}
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered && i < review.rating ? [0, 15, -15, 0] : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 10 
          }}
          className={`w-5 h-5 ${
            i < review.rating 
              ? 'text-yellow-400' 
              : 'text-gray-400/50'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );


  return (
    
    <>

      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />

      <motion.div 
        className="w-full p-4 perspective-1000"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div 
          className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-800 to-gray-900"
          initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
          animate={{ 
            scale: isHovered ? 1.03 : 1,
            rotateX: isHovered ? -5 : 0,
            rotateY: isHovered ? 5 : 0,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
        >
          {/* Partial Image Background with Blur */}
          <div className="absolute inset-0 opacity-50 blur-sm">
            <img 
              src={review.imageUrls[0]} 
              alt={review.subcategory}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content Section with Translucent Background */}
          <div className="relative p-6 bg-black/30 backdrop-blur-md text-white space-y-4">
            {/* Category & Title Section */}
            <div className="flex justify-between items-start">
              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.7, 
                  y: isHovered ? 0 : 20 
                }}
              >
                <span className="px-3 py-1 text-xs font-semibold bg-blue-500/30 text-blue-200 rounded-full">
                  {review.category}
                </span>
                <span className="px-3 py-1 text-xs font-semibold bg-purple-500/30 text-purple-200 rounded-full">
                  {review.userTitle}
                </span>
              </motion.div>

              {/* Animated Rating */}
              <AnimatedStars />
            </div>

            {/* Review Title and Preview */}
            <motion.div
              initial={{ opacity: 0.7, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.7, 
                y: isHovered ? 0 : 10 
              }}
            >
              <h3 className="text-2xl font-bold mb-2 text-white/90 hover:text-blue-200 transition-colors">
                {review.subcategory}
              </h3>

              <div className="relative">
                <p className="text-sm text-gray-300 line-clamp-2">
                  {review.review}
                </p>

                <div className="w-full text-center mt-2 flex flex-row items-center justify-center gap-6">
                  {/* Read More Button */}
                  <motion.span
                    className="text-blue-300 cursor-pointer hover:text-blue-500 flex items-center justify-center gap-1"
                    onClick={() => navigate(`/review/${review._id}`)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block transform transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </motion.span>

                  {/* Chat Button with Tooltip */}
                  <div className="relative group">
                    <motion.button
                      className="cursor-pointer px-5 py-2 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transition-all"
                      onClick={handleChatClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H6.414l-3.707 3.707A1 1 0 011 16.293V5z" />
                      </svg>
                      Chat
                    </motion.button>
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                      Chat with Reviewer
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Stats Section with Hover Effects */}
            <motion.div 
              className="flex items-center justify-between pt-4 border-t border-white/10"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 1 : 0.6 }}
            >

              {/* Likes and Dislikes with Hover Animations */}
              <div className="flex items-center space-x-4">

                {/* Like Button */}
                <motion.div 
                  className="flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLikeDislike('likeReview')}
                >
                  <div className={`p-2 rounded-full ${userAction === 'liked' ? 'bg-green-500/50' : 'bg-green-500/20'}`}>
                    <svg 
                      className={`w-4 h-4 ${userAction === 'liked' ? 'text-green-200' : 'text-green-400'}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{localLikes}</span>
                </motion.div>

                {/* Dislike Button */}
                <motion.div 
                  className="flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLikeDislike('dislikeReview')}
                >
                  <div className={`p-2 rounded-full ${userAction === 'disliked' ? 'bg-red-500/50' : 'bg-red-500/20'}`}>
                    <svg 
                      className={`w-4 h-4 ${userAction === 'disliked' ? 'text-red-200' : 'text-red-400'}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5 6h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2.5" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{localDislikes}</span>
                </motion.div>
              </div>

              {/* User Info */}
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xs text-gray-400">by</span>
                <span className="text-white font-medium text-sm">
                  {review.userUsername}
                </span>
              </motion.div>
            </motion.div>

          </div>
          
        </motion.div>
      </motion.div>
    </>

  );
}