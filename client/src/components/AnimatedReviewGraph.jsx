import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles } from 'lucide-react';

const AnimatedReviewGraph = () => {
  const dummyData = [
    {
      month: 'Jan',
      reviews: 65,
      sentiment: 78,
      engagement: 45
    },
    {
      month: 'Feb',
      reviews: 75,
      sentiment: 82,
      engagement: 58
    },
    {
      month: 'Mar',
      reviews: 85,
      sentiment: 76,
      engagement: 67
    },
    {
      month: 'Apr',
      reviews: 78,
      sentiment: 85,
      engagement: 72
    },
    {
      month: 'May',
      reviews: 90,
      sentiment: 88,
      engagement: 80
    },
    {
      month: 'Jun',
      reviews: 95,
      sentiment: 92,
      engagement: 85
    }
  ];

  return (
    <div className="w-full h-[500px] p-4 bg-white/5 backdrop-blur-lg rounded-lg">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Your Review Analytics Journey
          </h3>
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          You'll have access to detailed analysis of reviews in each category - all in one beautiful, interactive dashboard in the Trends section.
        </p>

      </div>
      
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={dummyData} 
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="reviewGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="rgba(255,255,255,0.6)"
              padding={{ left: 30, right: 30 }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              domain={[0, 100]}
              padding={{ top: 20, bottom: 20 }}
            />
            <Tooltip 
                content={<div />} 
            />
            <Area
              type="monotone"
              dataKey="reviews"
              stroke="#3B82F6"
              fill="url(#reviewGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="sentiment"
              stroke="#4ADE80"
              fill="url(#sentimentGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="engagement"
              stroke="#A855F7"
              fill="url(#engagementGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnimatedReviewGraph;