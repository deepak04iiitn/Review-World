import { Button, Spinner, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'flowbite-react';
import { FaShare } from 'react-icons/fa';
import { MdChat } from 'react-icons/md';
import { FaRegNewspaper } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import CommentSection from '../components/CommentSection';

export default function Review() {
  const params = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [answer, setAnswer] = useState('');
  
  // Like/Dislike state
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userAction, setUserAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/review/get/${params.reviewId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setReview(data);
        setLikes(data.numberOfLikes);
        setDislikes(data.numberOfDislikes);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchReview();
  }, [params.reviewId]);

  const handleAction = async (action) => {
    if (actionLoading) return;
    
    setActionLoading(true);
    setActionError('');
    
    try {
      const response = await fetch(`/api/review/${action}/${review._id}`, {
        method: 'PUT',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setUserAction(action === 'likeReview' ? 'liked' : 'disliked');
      
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const summarizeReview = async () => {
    setShowTextarea(true);
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fullPrompt = `
      Summarize the following review and suggest the customer what to do based on the review:
      Category: ${review.category}
      Subcategory: ${review.subcategory}
      Rating: ${review.rating}
      Review: ${review.review}
    `;
    const result = await model.generateContent(fullPrompt);
    setAnswer(result.response.text());
  };

  return (
    <main className="p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen relative">
      {loading && (
        <div className="flex justify-center">
          <Spinner size="lg" className="mt-10" />
        </div>
      )}

      {error && (
        <p className="text-center my-7 text-2xl text-red-500 dark:text-red-400">
          Something went wrong!
        </p>
      )}

      {review && !loading && !error && (
        <div className="relative">
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-8 relative">
            <Carousel pauseOnHover slideInterval={2000}>
              {review.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Slide ${index}`}
                  className="h-full w-full object-cover transition-transform transform hover:scale-105 duration-500 ease-in-out"
                />
              ))}
            </Carousel>

            <div className="absolute top-4 right-4 z-10 border dark:border-gray-700 shadow-lg rounded-full w-12 h-12 flex justify-center items-center bg-white dark:bg-gray-800 cursor-pointer transition-transform hover:scale-110 duration-300">
              <FaShare
                className="text-gray-800 dark:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              />
            </div>
          </div>

          {copied && (
            <p className="fixed top-4 right-4 z-10 rounded-md bg-blue-600 dark:bg-blue-500 text-white p-2 transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in">
              Link copied!
            </p>
          )}

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-[1.02] duration-500 ease-in-out border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 dark:text-gray-300">
                Category : <span className="text-indigo-600 dark:text-indigo-400">{review.category}</span>
              </h1>

              <div className="flex flex-col items-center space-y-4">
                <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                  Rating : <span className="text-yellow-500 dark:text-yellow-400">{review.rating} ⭐</span>
                </h1>

                {/* Simplified Like/Dislike Section */}
                <div className="flex items-center space-x-6">
                  {actionError && (
                    <div className="absolute -top-8 left-0 right-0 text-red-500 dark:text-red-400 text-sm text-center">
                      {actionError}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <button
                      className={`transition-all duration-200 ${
                        userAction === 'liked' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
                      } ${actionLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                      onClick={() => handleAction('likeReview')}
                      disabled={actionLoading}
                    >
                      <ThumbsUp className="h-6 w-6" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {likes}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      className={`transition-all duration-200 ${
                        userAction === 'disliked' ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                      } ${actionLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                      onClick={() => handleAction('dislikeReview')}
                      disabled={actionLoading}
                    >
                      <ThumbsDown className="h-6 w-6" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {dislikes}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4 mb-6">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white transition-colors hover:text-indigo-500 dark:hover:text-indigo-400">
                Title : {review.subcategory}
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                <span className="text-3xl text-gray-900 dark:text-white block mt-2">Review :</span>
                <span className="block mt-2 whitespace-pre-line">{review.review}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 group">
                <Button gradientDuoTone="purpleToPink" className="w-full px-6 py-2 rounded-md shadow-md flex items-center justify-center space-x-2">
                  <MdChat className="text-xl mr-2" />
                  <span>Chat with Reviewer</span>
                </Button>

                <div className="absolute bottom-full left-0 mb-2 w-full px-2 py-1 text-center text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Want to know complete details? Go ahead and have a chat with the reviewer!
                </div>
              </div>

              <div className="relative flex-1 group">
                <Button gradientDuoTone="cyanToBlue" className="w-full px-6 py-2 rounded-md shadow-md flex items-center justify-center space-x-2" onClick={summarizeReview}>
                  <FaRegNewspaper className="text-xl mr-2" />
                  <span>Summarize the Review</span>
                </Button>

                <div className="absolute bottom-full left-0 mb-2 w-full px-2 py-1 text-center text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Review is so long to read? Don't worry let us summarize it for you!
                </div>
              </div>
            </div>

            {showTextarea && (
              <div className="mt-10">
                {answer ? (
                  <Textarea rows={10} cols={4} value={answer} readOnly />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <Spinner size="lg" />
                    <p className="mt-4 text-gray-700 dark:text-gray-300">Summarizing your review...</p>
                  </div>
                )}
              </div>
            )}

            <CommentSection reviewId={review._id} />
          </div>
        </div>
      )}
    </main>
  );
}