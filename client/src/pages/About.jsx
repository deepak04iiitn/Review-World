import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ title, time, children, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative pl-8 pb-16 border-l border-blue-200 last:border-l-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] w-4 h-4 rounded-full bg-blue-500" />
      
      {/* Content */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-lg p-6 ml-4 hover:shadow-xl transition-shadow"
      >
        <span className="text-sm text-blue-500 font-medium">{time}</span>
        <h3 className="text-2xl font-bold mt-2 mb-4 text-gray-800">{title}</h3>
        <div className="text-gray-600 leading-relaxed space-y-2">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

const HighlightText = ({ children }) => (
  <span className="font-semibold text-blue-600">{children}</span>
);

export default function About() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Review World
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your trusted destination for authentic reviews and meaningful connections
        </p>
      </motion.div>

      {/* Timeline Content */}
      <div className="max-w-3xl mx-auto">
        <AboutSection title="Who Are We?" time="August 2024" delay={0.2}>
          <p>
            We are <HighlightText>Review World</HighlightText>, your go-to platform for reading and posting reviews about everything that exists. Our mission is to create a comprehensive, user-friendly space where you can find detailed, trustworthy reviews to make informed decisions about products, services, and experiences.
          </p>
        </AboutSection>

        <AboutSection title="What Makes Us Different?" time="August 2024" delay={0.4}>
          <p>
            At Review World, we go beyond traditional review platforms by offering innovative features designed to enhance your experience:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>
              <HighlightText>Unique Chat Functionality</HighlightText> - Direct interaction with reviewers for real-time answers
            </li>
            <li>
              <HighlightText>Community-Driven</HighlightText> - Building connections through authentic discussions
            </li>
            <li>
              <HighlightText>Real-Time Updates</HighlightText> - Stay informed with the latest reviews and trends
            </li>
          </ul>
        </AboutSection>

        <AboutSection title="Why Choose Us?" time="August 2024" delay={0.6}>
          <div className="space-y-4">
            <p>
              Choosing Review World means choosing efficiency and clarity. Our platform offers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-blue-50 rounded-lg"
              >
                <h4 className="font-semibold text-blue-700 mb-2">AI Summarizer</h4>
                <p className="text-sm text-gray-600">
                  Intelligent condensation of reviews for quick decision-making
                </p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-blue-50 rounded-lg"
              >
                <h4 className="font-semibold text-blue-700 mb-2">Visual Analytics</h4>
                <p className="text-sm text-gray-600">
                  Comprehensive graphical analyses for clear trend visualization
                </p>
              </motion.div>
            </div>
          </div>
        </AboutSection>
      </div>
    </div>
  );
}