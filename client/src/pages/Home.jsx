import React, { useState, useEffect } from 'react';
import { Search, PieChart, MessageCircle, BarChart2, FileText, ArrowLeftRight, Filter, SortDesc } from 'lucide-react';
import AnimatedReviewGraph from '../components/AnimatedReviewGraph';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const features = [
    { 
      icon: <PieChart size={24} />, 
      title: "Review Analytics", 
      description: "Visualize review trends and patterns across different categories with interactive charts" 
    },
    { 
      icon: <MessageCircle size={24} />, 
      title: "Direct Connect", 
      description: "Chat directly with reviewers to get detailed insights and ask specific questions" 
    },
    { 
      icon: <ArrowLeftRight size={24} />, 
      title: "Compare Categories", 
      description: "Side-by-side comparison of reviews across different product categories" 
    },
    { 
      icon: <FileText size={24} />, 
      title: "AI Summary", 
      description: "Get instant AI-generated summaries of multiple reviews for quick insights" 
    },
    { 
      icon: <Search size={24} />, 
      title: "Advanced Search", 
      description: "Find exactly what you need with filters for price, rating, date, and more" 
    },
    { 
      icon: <SortDesc size={24} />, 
      title: "Smart Sorting", 
      description: "Sort reviews by relevance, helpfulness, recency, or rating distribution" 
    }
  ];

  const categories = ["All", "Technology", "Food", "Travel", "Fashion", "Entertainment" , "Many More ....."];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen mb-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white p-8">
      {/* Hero Section */}
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center pt-20">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
            Review4All
          </h1>
          <p className="text-2xl mb-8 text-gray-300">
            Discover. Compare. Connect.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300"
              onClick={() => navigate('/create-review')}
            >
              Write a Review
            </button>
            <button 
              className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300"
              onClick={() => navigate('/reviews')}
            >
              Explore Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-4xl mx-auto mt-16 flex justify-center gap-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer hover:scale-105 transition-all ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-white/10 backdrop-blur-lg rounded-lg transform transition-all duration-500 hover:scale-105 ${
              activeFeature === index ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            <div className="p-6">
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <AnimatedReviewGraph />
      </div>

      {/* Analysis Features Showcase */}
      <div className="max-w-4xl mx-auto mt-16 bg-white/5 backdrop-blur-lg rounded-lg">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Powerful Analysis Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <p>Interactive Data Visualization</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <p>Cross-Category Comparison</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <p>Real-time Review Analytics</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p>Smart Review Summaries</p>
              </div>
            </div>
            <div className="relative">
              <div className="animate-pulse bg-gradient-to-r from-blue-500/20 to-purple-500/20 h-32 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart2 size={48} className="text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}