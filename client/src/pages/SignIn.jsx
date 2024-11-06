import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { Move, Star, Users, MessageSquare } from 'lucide-react';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields!'));
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center mt-10 mb-10 justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-gray-800">
        
        {/* Left Panel - Hero Section */}
        <div className="flex-1 relative overflow-hidden min-h-[300px] md:min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
          <div className="relative flex items-center justify-center w-full p-6 md:p-12">
            <div className="max-w-xl">
              <div className="mb-6 md:mb-12 flex items-center space-x-4">
                <div className="p-2 md:p-3 bg-white bg-opacity-10 rounded-2xl backdrop-blur-lg">
                  <Move className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-white">Review World</h1>
              </div>
              <div className="space-y-4 md:space-y-8">
                <div className="space-y-2 md:space-y-4">
                  <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    Welcome Back!<br />Ready to Share More?
                  </h2>
                  <p className="text-lg md:text-xl text-blue-50 leading-relaxed">
                    Your voice matters in our community. Sign in to continue sharing your valuable experiences.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg p-3 md:p-6 rounded-2xl">
                    <Users className="h-4 w-4 md:h-6 md:w-6 text-blue-200 mb-2 md:mb-4" />
                    <h3 className="font-bold text-lg md:text-2xl text-white mb-1">10K+</h3>
                    <p className="text-blue-100 text-sm md:text-base">Active Users</p>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg p-3 md:p-6 rounded-2xl">
                    <Star className="h-4 w-4 md:h-6 md:w-6 text-blue-200 mb-2 md:mb-4" />
                    <h3 className="font-bold text-lg md:text-2xl text-white mb-1">50K+</h3>
                    <p className="text-blue-100 text-sm md:text-base">Reviews</p>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg p-3 md:p-6 rounded-2xl">
                    <MessageSquare className="h-4 w-4 md:h-6 md:w-6 text-blue-200 mb-2 md:mb-4" />
                    <h3 className="font-bold text-lg md:text-2xl text-white mb-1">98%</h3>
                    <p className="text-blue-100 text-sm md:text-base">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Sign In Form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full space-y-6 md:space-y-8">
            <div className="text-center space-y-2 md:space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to continue your review journey
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 md:mt-8 space-y-4 md:space-y-6">
              <div className="space-y-4 md:space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    onChange={handleChange}
                    className="block w-full px-4 py-3 md:py-3.5 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    onChange={handleChange}
                    className="block w-full px-4 py-3 md:py-3.5 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 md:py-4 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              
              <div className="mt-4">
                <OAuth />
              </div>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <a href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Sign up for free
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Error Dialog */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-4 md:p-6 transform transition-all">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Error
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {errorMessage}
            </p>
            <button
              onClick={() => dispatch(signInFailure(null))}
              className="mt-2 w-full bg-red-500 text-white rounded-xl p-3 hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}