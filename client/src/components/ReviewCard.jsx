import React from 'react';
import { Link } from 'react-router-dom';

export default function ReviewCard ({ review }) {
  return (
    <div className="w-full h-[28rem] p-4">
      <Link to={`/review/${review._id}`}>
        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
          {/* Image Section with Gradient Overlay */}
          <div className="absolute inset-0">
            <img 
              src={review.imageUrls[0]} 
              alt={review.subcategory}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          {/* Content Section */}
          <div className="relative h-full p-6 flex flex-col justify-end">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-1.5 text-sm font-medium bg-blue-500/20 text-blue-100 backdrop-blur-sm rounded-full border border-blue-500/30">
                {review.category}
              </span>
              <span className="px-4 py-1.5 text-sm font-medium bg-purple-500/20 text-purple-100 backdrop-blur-sm rounded-full border border-purple-500/30">
                {review.userTitle}
              </span>
            </div>

            {/* Title & Rating */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                {review.subcategory}
              </h3>

              {/* Rating Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-400'
                    } transition-all duration-300 group-hover:scale-110`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Preview */}
              <p className="text-gray-300 line-clamp-2 text-sm">
                {review.review}
              </p>

              {/* Stats Section */}
              <div className="flex items-center gap-6 pt-4 mt-4 border-t border-white/10">
                {/* Likes */}
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-green-500/20 backdrop-blur-sm">
                    <svg 
                      className="w-4 h-4 text-green-400"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{review.numberOfLikes}</span>
                </div>

                {/* Dislikes */}
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-red-500/20 backdrop-blur-sm">
                    <svg 
                      className="w-4 h-4 text-red-400"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5 6h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2.5" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{review.numberOfDislikes}</span>
                </div>

                {/* User Info */}
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm text-gray-300">by</span>
                  <span className="text-white font-medium">{review.userUsername}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};