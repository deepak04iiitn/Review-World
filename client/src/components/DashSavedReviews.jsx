import React, { useState, useEffect } from 'react';
import { Star, Trash2, ExternalLink } from 'lucide-react';

const SavedReviewsTable = () => {
  const [savedReviews, setSavedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);


  useEffect(() => {
    const fetchSavedReviews = async () => {
      try {
        const res = await fetch('/api/user/saved-reviews');
        const data = await res.json();
        setSavedReviews(data);
      } catch (error) {
        setError('Failed to fetch saved reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedReviews();
  }, []);

  const handleRemove = async (reviewId) => {
    try {
      const res = await fetch(`/api/user/unsave-review/${reviewId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSavedReviews(prev => prev.filter(review => review._id !== reviewId));
      }
    } catch (error) {
      console.error('Error removing saved review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  return (
    
    <div className="w-full bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-xl p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Your Saved Reviews
        </h2>
        <p className="text-gray-600 mt-2">Browse your collection of saved product reviews</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-indigo-100 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <th className="text-left py-4 px-4 font-semibold">Sub-Category</th>
              <th className="text-left py-4 px-4 font-semibold">Category</th>
              <th className="text-left py-4 px-4 font-semibold">Rating</th>
              <th className="text-left py-4 px-4 font-semibold">Preview</th>
              <th className="text-left py-4 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100">
            {savedReviews.map((review, index) => (
              <tr 
                key={review._id}
                className="hover:bg-indigo-50/50 transition-colors duration-200"
              >
                <td className="py-4 px-4">
                  <span className="font-medium text-indigo-900">{review.subcategory}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200">
                    {review.category}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'text-amber-400' : 'text-gray-300'}
                        fill={i < review.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {review.rating}/5
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden ring-2 ring-indigo-100 hover:ring-4 hover:ring-indigo-200 transition-all duration-200">
                    <img
                      src={review.imageUrls[0]}
                      alt={review.subcategory}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleRemove(review._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-md"
                    >
                      <Trash2 size={18} />
                    </button>
                    <a
                      href={`/review/${review._id}`}
                      className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:shadow-md"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {savedReviews.length === 0 && (
        <div className="text-center py-12 bg-white/50 rounded-xl">
          <p className="text-gray-500 text-lg">No saved reviews yet!</p>
          <a 
            href="/reviews" 
            className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            Discover Reviews
          </a>
        </div>
      )}
    </div>
  );
};

export default SavedReviewsTable;