import React, { useState, useEffect } from 'react';
import { Star, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';

const DashMyReviews = () => {
  const { currentUser } = useSelector(state => state.user);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState('');

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/reviews/${currentUser._id}`);
        const data = await res.json();
        
        if (data.success === false) {
          setError('Failed to fetch reviews');
          return;
        }
        
        setUserReviews(data);
      } catch (error) {
        setError('An error occurred while fetching reviews');
      } finally {
        setLoading(false);
      }
    };

    getUserReviews();
  }, [currentUser._id]);

  const handleReviewDelete = async (reviewId) => {
    try {
      const res = await fetch(`/api/review/delete/${reviewId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        return;
      }

      setUserReviews((prev) => prev.filter((review) => review._id !== reviewId));
    } catch (error) {
      setError('Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-xl p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Your Reviews
        </h2>
        <p className="text-gray-600 mt-2">Manage and edit your product reviews</p>
      </div>

      {error && (
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg mb-6">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {userReviews && userReviews.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-indigo-100 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <th className="text-left py-4 px-4 font-semibold">Sub-Category</th>
                <th className="text-left py-4 px-4 font-semibold">Category</th>
                <th className="text-left py-4 px-4 font-semibold">Preview</th>
                <th className="text-left py-4 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-100">
              {userReviews.map((review) => (
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
                        onClick={() => {
                          setShowModal(true);
                          setReviewIdToDelete(review._id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-md"
                      >
                        <Trash2 size={18} />
                      </button>
                      <a
                        href={`/update-review/${review._id}`}
                        className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:shadow-md"
                      >
                        <Pencil size={18} />
                      </a>
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
      ) : (
        <div className="text-center py-12 bg-white/50 rounded-xl">
          <p className="text-gray-500 text-lg">You haven't created any reviews yet!</p>
          <a 
            href="/create-review" 
            className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            Create Review
          </a>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this review? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleReviewDelete(reviewIdToDelete);
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashMyReviews;