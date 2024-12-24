import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Share2, 
  ChevronDown,
  X, 
  CheckCircle,
  Layers,
  Star,
  Cpu,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

const AdvancedReviewHeader = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  subcategorySearch,
  setSubcategorySearch,
  sortBy,
  setSortBy,
  categories
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const filterRef = useRef(null);

  // Fetch reviews data and calculate statistics
  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const response = await fetch('/api/review/getall');
        const reviews = await response.json();
        
        // Calculate total reviews
        setTotalReviews(reviews.length);
        
        // Calculate average rating
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
          const avgRating = totalRating / reviews.length;
          setAverageRating(Number(avgRating.toFixed(1)));
        }
      } catch (error) {
        console.error('Error fetching review statistics:', error);
      }
    };

    fetchReviewStats();
  }, []);

  // Floating animation for stats
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareAlert(true);
    setTimeout(() => setShowShareAlert(false), 3000);
  };

  const generateStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </motion.span>
    ));
  };

  return (
    <div className="relative w-full">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div 
        ref={filterRef}
        className="relative mb-16 w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-700/95 rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/30 backdrop-blur-xl"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 relative z-10"
        >
          {/* Enhanced Header with Stats */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 space-y-6 lg:space-y-0">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-6"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"
              >
                <Cpu className="text-white" size={40} />
              </motion.div>
              
              <div className="flex flex-col">
                <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
                  Review Explorer
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                  Discover authentic reviews from our community
                </p>
              </div>
            </motion.div>

            {/* Animated Stats Cards */}
            <div className="flex flex-wrap gap-4">
              <motion.div
                animate={floatingAnimation}
                className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="text-indigo-500" size={20} />
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">{totalReviews.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Reviews</p>
              </motion.div>

              <motion.div
                animate={floatingAnimation}
                className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400" size={20} />
                  <div className="flex items-center">
                    {generateStars(Math.floor(averageRating))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Average Rating ({averageRating})</p>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{
                boxShadow: isSearchFocused 
                  ? "0 0 30px rgba(99, 102, 241, 0.3)" 
                  : "0 0 0px rgba(99, 102, 241, 0)"
              }}
              className="relative"
            >
              <Search 
                className={`absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isSearchFocused 
                    ? "text-indigo-500 scale-110" 
                    : "text-gray-400"
                }`} 
                size={24} 
              />
              <input
                type="text"
                placeholder="Search reviews, products, or categories..."
                value={searchTerm}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-xl font-medium transition-all duration-300 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20"
              />
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: isSearchFocused ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {showFilters ? (
                <>
                  <X size={20} />
                  <span>Hide Filters</span>
                </>
              ) : (
                <>
                  <Filter size={20} />
                  <span>Show Filters</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-3 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Share2 className="text-gray-600 dark:text-gray-300" size={24} />
            </motion.button>
          </div>

          {/* Enhanced Filters Section */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative group"
                  >
                    <Layers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500" size={22} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none pl-14 pr-10 py-4 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 font-medium transition-all duration-300 focus:ring-4 focus:ring-indigo-500/20"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Filter by subcategory..."
                      value={subcategorySearch}
                      onChange={(e) => setSubcategorySearch(e.target.value)}
                      className="w-full px-6 py-4 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 font-medium transition-all duration-300 focus:ring-4 focus:ring-indigo-500/20"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative group"
                  >
                    <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500" size={22} />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none pl-14 pr-10 py-4 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 font-medium transition-all duration-300 focus:ring-4 focus:ring-indigo-500/20"
                    >
                      <option value="dateDesc">Newest First</option>
                      <option value="dateAsc">Oldest First</option>
                      <option value="ratingDesc">Highest Rated</option>
                      <option value="ratingAsc">Lowest Rated</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Advanced Share Notification */}
      <AnimatePresence>
        {showShareAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center space-x-3"
          >
            <CheckCircle className="mr-3" size={28} />
            <span className="text-lg font-semibold tracking-tight">Shareable Link Captured!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedReviewHeader;