import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  X, 
  CheckCircle,
  Layers,
  Star,
  Cpu
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
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareAlert(true);
    setTimeout(() => setShowShareAlert(false), 3000);
  };

  return (
    <div 
      ref={filterRef}
      className="relative mb-16 w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-3xl overflow-hidden shadow-2xl border border-white/10 dark:border-gray-700/20"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 relative z-10"
      >
        {/* Futuristic Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4 flex-row"
          >
            <Cpu className="text-indigo-500 dark:text-indigo-400" size={40} />
            <div className="flex flex-col">
              <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
                Review Explorer
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Discover reviews for anything, from products to services.
              </p>
            </div>
          </motion.div>
          
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters(!showFilters)}
              className="p-3.5 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-md hover:shadow-xl transition-all"
            >
              {showFilters ? (
                <X className="text-gray-600 dark:text-gray-300" size={26} />
              ) : (
                <Filter className="text-gray-600 dark:text-gray-300" size={26} />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-3.5 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-md hover:shadow-xl transition-all"
            >
              <Share2 className="text-gray-600 dark:text-gray-300" size={26} />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Search Experience */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 via-purple-200/30 to-pink-200/30 rounded-3xl blur-2xl opacity-50 dark:opacity-20 -z-10" />
          
          <div className="relative">
            <Search 
              className={`absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors ${
                isSearchFocused 
                  ? "text-indigo-500 dark:text-indigo-400" 
                  : "text-gray-400 dark:text-gray-500"
              }`} 
              size={24} 
            />
            <input
              type="text"
              placeholder="Explore, Search, Discover Reviews..."
              value={searchTerm}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-xl font-medium transition-all duration-300 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20"
            />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: isSearchFocused ? '100%' : 0 }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Advanced Filters with Elegant Transitions */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Category Selector with Icon */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <Layers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500 dark:text-indigo-400" size={22} />
                  <select
                    className="w-full appearance-none pl-14 pr-10 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 font-medium"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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

                {/* Subcategory Search */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Refine by Subcategory..."
                    value={subcategorySearch}
                    onChange={(e) => setSubcategorySearch(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 font-medium"
                  />
                </motion.div>

                {/* Smart Sorting */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500 dark:text-indigo-400" size={22} />
                  <select
                    className="w-full appearance-none pl-14 pr-10 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 font-medium"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="dateDesc">Newest Reviews</option>
                    <option value="dateAsc">Oldest Reviews</option>
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

      {/* Subtle Background Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 opacity-10 z-0"
      />

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