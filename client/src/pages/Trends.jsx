import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Trends = () => {
  // State management for analysis
  const [analysisType, setAnalysisType] = useState('single');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allReviews, setAllReviews] = useState([]);

  // Categories list - same as original
  const categories = [
    'College', 'School', 'Coaching-institute', 'Degree', 'Course', 
    'Stream', 'Branch', 'Skill', 'Company', 'Exam', 
    'Interview-experience', 'Hotel', 'PG', 'Hostel', 'Flat',
    'Property', 'Society', 'Hospital', 'Shop', 'Electronic-product',
    'Beauty-product', 'Medicinal-product', 'Clothing-brand', 'Building-product',
    'Agricultural-product', 'Vacation-place', 'Vehicle', 'Movie',
    'Web-series', 'Serials', 'City', 'State', 'Country', 'Village',
    'Theatre', 'Restaurant', 'Website', 'App', 'Bank', 'Courier-service'
  ];

  // Colors for multi-category comparison
  const categoryColors = {
    first: '#8B5CF6',
    second: '#EC4899',
    third: '#3B82F6'
  };

  // Data fetching effect
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/review/getall');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setAllReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Reset states when switching analysis types
  useEffect(() => {
    setSelectedCategory('');
    setSelectedCategories([]);
    setShowGraph(false);
    setGraphData(null);
  }, [analysisType]);

  // Handle category selection for multi-category analysis
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      }
      if (prev.length >= 3) return prev;
      return [...prev, category];
    });
  };

  // Data processing functions
  const analyzeSingleCategory = () => {
    const categoryReviews = allReviews.filter(
      review => review.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    const ratingCounts = {
      '5 stars': 0, '4 stars': 0, '3 stars': 0, '2 stars': 0, '1 star': 0
    };

    categoryReviews.forEach(review => {
      const rating = Math.floor(review.rating);
      const key = `${rating} star${rating === 1 ? '' : 's'}`;
      ratingCounts[key]++;
    });

    setGraphData(Object.entries(ratingCounts).map(([rating, count]) => ({
      rating,
      count
    })));
    setShowGraph(true);
  };

  const analyzeMultipleCategories = () => {
    const ratings = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'];
    const processedData = ratings.map(rating => {
      const dataPoint = { rating };
      selectedCategories.forEach(category => {
        const categoryReviews = allReviews.filter(
          review => review.category.toLowerCase() === category.toLowerCase()
        );
        const ratingValue = parseInt(rating);
        const count = categoryReviews.filter(
          review => Math.floor(review.rating) === ratingValue
        ).length;
        dataPoint[category] = count;
      });
      return dataPoint;
    });
    setGraphData(processedData);
    setShowGraph(true);
  };

  const handleAnalyze = () => {
    if (analysisType === 'single' && selectedCategory) {
      analyzeSingleCategory();
    } else if (analysisType === 'multi' && selectedCategories.length > 0) {
      analyzeMultipleCategories();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 md:mb-6">
            Review Rating Analysis
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Analyze rating trends for individual categories or compare multiple categories side by side.
          </p>
        </div>

        {/* Custom Tabs Implementation */}
        <div className="w-full mb-8">
          <div className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-100 p-1 rounded-lg">
            {['single', 'multi'].map((type) => (
              <button
                key={type}
                onClick={() => setAnalysisType(type)}
                className={`py-2 px-4 rounded-md transition-all duration-200 ${
                  analysisType === type
                    ? 'bg-white shadow-md text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {type === 'single' ? 'Single Category' : 'Compare Categories'}
              </button>
            ))}
          </div>

          {/* Analysis Content */}
          <div className="mt-6">
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-xl">
              {analysisType === 'single' ? (
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none transition-all bg-transparent text-gray-700 text-base md:text-lg"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        disabled={selectedCategories.length >= 3 && !selectedCategories.includes(category)}
                        className={`px-3 md:px-4 py-1 md:py-2 rounded-xl text-sm md:text-base font-medium transition-all
                          ${selectedCategories.includes(category)
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                          }
                          ${selectedCategories.length >= 3 && !selectedCategories.includes(category)
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                          }
                        `}
                      >
                        {category.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Analysis Button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={
                    (analysisType === 'single' && !selectedCategory) ||
                    (analysisType === 'multi' && selectedCategories.length === 0) ||
                    loading
                  }
                  className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium text-base md:text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 transform hover:scale-105 active:scale-95 transition-transform"
                >
                  {loading ? 'Loading...' : analysisType === 'single' ? 'Analyze Trends' : 'Compare Categories'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 text-center animate-[fadeIn_0.3s_ease-out]">
            {error}
          </div>
        )}

        {/* Graph Section */}
        {showGraph && graphData && (
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-xl animate-[scaleIn_0.5s_ease-out]">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">
              {analysisType === 'single' 
                ? `Rating Distribution for ${selectedCategory.replace('-', ' ')}`
                : 'Rating Distribution Comparison'
              }
            </h2>
            <div className="h-72 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={graphData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="rating" tick={{ fill: '#4B5563' }} />
                  <YAxis 
                    tick={{ fill: '#4B5563' }}
                    label={{ 
                      value: 'Number of Reviews', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: '#4B5563' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      padding: '12px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  {analysisType === 'single' ? (
                    <Bar 
                      dataKey="count" 
                      name="Number of Reviews"
                      fill="url(#colorGradient)" 
                      radius={[8, 8, 0, 0]}
                    />
                  ) : (
                    selectedCategories.map((category, index) => (
                      <Bar
                        key={category}
                        dataKey={category}
                        name={category.replace('-', ' ')}
                        fill={Object.values(categoryColors)[index]}
                        radius={[8, 8, 0, 0]}
                      />
                    ))
                  )}
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trends;