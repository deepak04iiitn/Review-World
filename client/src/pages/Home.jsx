import React, { useState, useEffect } from 'react';
import { Star, Award, PieChart, MessageCircle, BookmarkPlus, Globe, Sparkles, Trophy, Users, ThumbsUp } from 'lucide-react';

export default function Home() {

  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const features = [
    { icon: <Star size={24} />, title: "Rate & Review", description: "Share your experiences on products and services" },
    { icon: <Award size={24} />, title: "Earn Achievements", description: "Level up from Rising Star to Review Maestro" },
    { icon: <PieChart size={24} />, title: "Visual Insights", description: "See trends with AI-powered analytics" },
    { icon: <MessageCircle size={24} />, title: "Connect", description: "Chat with reviewers for deeper insights" },
    { icon: <BookmarkPlus size={24} />, title: "Save Reviews", description: "Bookmark reviews for later reference" },
    { icon: <Globe size={24} />, title: "Global Reach", description: "Connect with reviewers worldwide" }
  ];

  const topReviewers = [
    { rank: 1, name: "Sarah Johnson", country: "USA", reviews: 1547, rating: 4.9, badge: "Elite" },
    { rank: 2, name: "Mike Chen", country: "Singapore", reviews: 1423, rating: 4.8, badge: "Expert" },
    { rank: 3, name: "Anna Schmidt", country: "Germany", reviews: 1356, rating: 4.9, badge: "Elite" },
    { rank: 4, name: "Carlos Rodriguez", country: "Spain", reviews: 1298, rating: 4.7, badge: "Expert" },
    { rank: 5, name: "Yuki Tanaka", country: "Japan", reviews: 1245, rating: 4.8, badge: "Elite" }
  ];

  const categories = ["All", "Technology", "Food", "Travel", "Fashion", "Entertainment"];

  const recentAchievements = [
    { user: "Sarah J.", achievement: "1500+ Reviews", time: "2h ago" },
    { user: "Mike C.", achievement: "Perfect Month", time: "5h ago" },
    { user: "Anna S.", achievement: "Top Contributor", time: "1d ago" }
  ];

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
            Your Voice, Our Community
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300">
              Start Reviewing
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300">
              Learn More
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

      {/* Top Reviewers Table */}
      <div className="max-w-4xl mx-auto mt-16 bg-white/10 backdrop-blur-lg rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <Trophy className="text-yellow-400" />
            Top Reviewers Worldwide
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-300">Rank</th>
                  <th className="text-left py-3 text-gray-300">Name</th>
                  <th className="text-left py-3 text-gray-300">Country</th>
                  <th className="text-left py-3 text-gray-300">Reviews</th>
                  <th className="text-left py-3 text-gray-300">Rating</th>
                  <th className="text-left py-3 text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {topReviewers.map((reviewer) => (
                  <tr key={reviewer.rank} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 font-medium">{reviewer.rank}</td>
                    <td className="py-3">{reviewer.name}</td>
                    <td className="py-3">{reviewer.country}</td>
                    <td className="py-3">{reviewer.reviews}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {reviewer.rating}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        reviewer.badge === 'Elite'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}>
                        {reviewer.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <Users size={24} />, label: "Active Users", value: "50K+" },
          { icon: <MessageCircle size={24} />, label: "Reviews", value: "100K+" },
          { icon: <Globe size={24} />, label: "Countries", value: "150+" },
          { icon: <ThumbsUp size={24} />, label: "Helpful Votes", value: "500K+" }
        ].map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg transform hover:scale-105 transition-all duration-300">
            <div className="p-6 text-center">
              <div className="text-blue-400 mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {stat.value}
              </div>
              <div className="text-gray-300 mt-2">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="max-w-4xl mx-auto mt-16 space-y-4">
        <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Sparkles className="text-yellow-400" />
          Recent Achievements
        </h3>
        {recentAchievements.map((achievement, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="text-purple-400" />
                <span className="font-semibold">{achievement.user}</span>
                <span className="text-gray-300">earned</span>
                <span className="font-semibold">{achievement.achievement}</span>
              </div>
              <span className="text-gray-400 text-sm">{achievement.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Feature Highlight */}
      <div className="max-w-4xl mx-auto mt-16 bg-white/5 backdrop-blur-lg rounded-lg">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            AI-Powered Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <p>Smart Review Summaries</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <p>Trend Analysis</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <p>Sentiment Analysis</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p>Personalized Recommendations</p>
              </div>
            </div>
            <div className="relative">
              <div className="animate-pulse bg-gradient-to-r from-blue-500/20 to-purple-500/20 h-32 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <PieChart size={48} className="text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
