import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Filter, Search, X } from 'lucide-react';

const ReviewHeader = ({ 
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareAlert(true);
    setTimeout(() => setShowShareAlert(false), 3000);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Discover Reviews
          </motion.h1>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {showFilters ? <X size={20} /> : <Filter size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative mb-4"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search reviews, categories, or subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
          />
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <motion.select
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.replace('-', ' ')}
                    </option>
                  ))}
                </motion.select>

                <motion.input
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  type="text"
                  placeholder="Search subcategory..."
                  value={subcategorySearch}
                  onChange={(e) => setSubcategorySearch(e.target.value)}
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                />

                <motion.select
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="dateDesc">Newest First</option>
                  <option value="dateAsc">Oldest First</option>
                  <option value="ratingDesc">Highest Rated</option>
                  <option value="ratingAsc">Lowest Rated</option>
                </motion.select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Custom Toast Notification */}
      <AnimatePresence>
        {showShareAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
          >
            <span>✓ Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewHeader;