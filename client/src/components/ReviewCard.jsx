import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkPlus, BookmarkCheck, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useSelector } from 'react-redux';

const SignInModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-md w-full backdrop-blur-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Sign In</h2>
          <p className="text-gray-600 mb-6">
            Sign in to save reviews and interact with our community
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => window.location.href = '/signin'}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
            <button 
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModernReviewCard = ({ review }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [localLikes, setLocalLikes] = useState(review.numberOfLikes);
  const [localDislikes, setLocalDislikes] = useState(review.numberOfDislikes);
  const [userAction, setUserAction] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);


  useEffect(() => {
    // Check if review is saved when component mounts
    const checkSavedStatus = async () => {
        if (!currentUser) return;
        try {
            const res = await fetch(`/api/user/saved-reviews`);
            const data = await res.json();
            setIsSaved(data.some(savedReview => savedReview._id === review._id));
        } catch (error) {
            console.error('Error checking saved status:', error);
        }
    };
    checkSavedStatus();
}, [currentUser, review._id]);

const handleSave = async () => {
    if (!currentUser) {
        setShowSignInModal(true);
        return;
    }

    try {
        if (!isSaved) {
            const res = await fetch(`/api/user/save-review/${review._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (res.ok) {
                setIsSaved(true);
            }
        } else {
            const res = await fetch(`/api/user/unsave-review/${review._id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setIsSaved(false);
            }
        }
    } catch (error) {
        console.error('Error saving/unsaving review:', error);
    }
};

  const handleLikeDislike = (action) => {
    if (!currentUser) {
      setShowSignInModal(true);
      return;
    }
    if (action === 'like') {
      setLocalLikes(prev => prev + (userAction === 'like' ? -1 : 1));
      setUserAction(userAction === 'like' ? null : 'like');
    } else {
      setLocalDislikes(prev => prev + (userAction === 'dislike' ? -1 : 1));
      setUserAction(userAction === 'dislike' ? null : 'dislike');
    }
  };

  return (
    <>
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
      
      <div 
        className="w-full p-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${isHovered ? 'shadow-2xl shadow-purple-500/20 scale-[1.02]' : 'shadow-xl'}`}>
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 backdrop-blur-sm z-10" />
            <img 
              src={review.imageUrls[0]} 
              alt={review.subcategory}
              className="w-full h-full object-cover transform scale-110 transition-transform duration-500"
              style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1.1)' }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 p-8 text-white">
            {/* Header Section with User Info */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500/80 to-blue-600/80 rounded-full backdrop-blur-md">
                    {review.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">by</span>
                  <span className="text-white font-medium">{review.userEmail}</span>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isSaved ? 'bg-purple-500/30 text-purple-200' : 'bg-gray-800/50 text-gray-300 hover:bg-purple-500/30 hover:text-purple-200'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
              </button>
            </div>

            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 transform ${
                    isHovered && i < review.rating ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-500'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Title and Review */}
            <h3 className="text-2xl font-bold mb-3 text-white">
              {review.subcategory}
            </h3>
            <p className="text-gray-300 line-clamp-1 mb-6">
              {review.review}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikeDislike('like')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    userAction === 'like' ? 'bg-green-500/30 text-green-200' : 'bg-gray-800/50 hover:bg-green-500/30'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{localLikes}</span>
                </button>

                <button
                  onClick={() => handleLikeDislike('dislike')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    userAction === 'dislike' ? 'bg-red-500/30 text-red-200' : 'bg-gray-800/50 hover:bg-red-500/30'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{localDislikes}</span>
                </button>
              </div>

              <button
                onClick={() => navigate(`/review/${review._id}`)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500/80 to-purple-600/80 rounded-full hover:from-blue-600/80 hover:to-purple-700/80 transition-all duration-300"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernReviewCard;