import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageCircle, 
  TrendingUp, 
  PlusIcon, 
  X, 
  Users, 
  UserCircle2, 
  CheckCircle2,
  Trash2,
  ArrowUpRight,
  PlusCircle
} from 'lucide-react';
import axios from 'axios';
import ReviewsHeader from '../components/ReviewsHeader';

export default function CommunityPolls() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('public');
  const [polls, setPolls] = useState([]);
  const [myPolls, setMyPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', '']
  });

  // Fetch public polls
  const fetchPublicPolls = async () => {
    try {
      const response = await axios.get('/api/polls');
      setPolls(response.data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  // Fetch my polls
  const fetchMyPolls = async () => {
    try {
      const response = await axios.get('/api/polls/my');
      setMyPolls(response.data);
    } catch (error) {
      console.error('Error fetching my polls:', error);
    }
  };

  useEffect(() => {
    fetchPublicPolls();
    fetchMyPolls();
  }, []);

  // Add option to new poll
  const addPollOption = () => {
    setNewPoll(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  // Create new poll
  const handleCreatePoll = async () => {
    try {
      const response = await axios.post('/api/polls', {
        question: newPoll.question,
        options: newPoll.options.filter(option => option.trim() !== '')
      });
      
      // Reset modal and refresh polls
      setIsModalOpen(false);
      setNewPoll({ question: '', options: ['', ''] });
      fetchPublicPolls();
      fetchMyPolls();
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  // Vote on a poll
  const handleVote = async (pollId, optionIndex) => {
    try {
      const response = await axios.post(`/api/polls/${pollId}/vote`, { option: optionIndex });
      
      // Update polls in both public and my polls lists
      const updatePolls = (currentPolls) => 
        currentPolls.map(poll => 
          poll._id === pollId ? response.data : poll
        );
      
      setPolls(updatePolls);
      setMyPolls(updatePolls);
    } catch (error) {
      console.error('Error voting on poll:', error);
    }
  };

  // Delete a poll
  const handleDeletePoll = async (pollId) => {
    try {
      await axios.delete(`/api/polls/${pollId}`);
      
      // Refresh polls after deletion
      fetchPublicPolls();
      fetchMyPolls();
    } catch (error) {
      console.error('Error deleting poll:', error);
    }
  };

  // Replace the entire renderPollCard function with this updated version
const renderPollCard = (poll, isMyPoll = false) => {
  const calculateVotePercentage = (optionIndex) => {
    const totalVotes = poll.votes.length;
    const optionVotes = poll.votes.filter(vote => vote.option === optionIndex).length;
    return totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
  };

  const userVote = poll.votes.find(vote => vote.user === poll.user);

  return (
    <motion.div
      key={poll._id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }}
      className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-[400px]"
    >
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      {/* Poll Badge and Date */}
      <div className="flex justify-between items-center mb-4">
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isMyPoll ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {isMyPoll ? 'Personal' : 'Community'}
        </div>
        <span className="text-sm font-medium text-gray-600">
          {new Date(poll.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Main Content Container - Now with internal scrolling */}
      <div className="flex flex-col flex-grow relative z-10 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            {isMyPoll ? <UserCircle2 className="text-purple-500" /> : <Users className="text-blue-500" />}
          </div>
          <TrendingUp className={`${isMyPoll ? 'text-purple-500' : 'text-blue-500'} opacity-50`} size={20} />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
          {poll.question}
        </h3>

        {/* Scrollable Options Container with Fixed Height */}
        <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="space-y-4">
            {poll.options.map((option, index) => {
              const votePercentage = calculateVotePercentage(index);
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`relative bg-white border rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all 
                    ${userVote && userVote.option === index 
                      ? 'ring-2 ring-blue-500 border-blue-200' 
                      : 'hover:border-blue-200'}`}
                  onClick={() => handleVote(poll._id, index)}
                >
                  <div 
                    className={`absolute inset-y-0 left-0 ${
                      isMyPoll ? 'bg-purple-200/30' : 'bg-blue-200/30'
                    }`} 
                    style={{ width: `${votePercentage}%` }}
                  />
                  <div className="relative p-4 flex items-center justify-between z-10">
                    <span className="text-gray-700 font-medium">{option}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500 font-semibold">
                        {votePercentage}%
                      </span>
                      {userVote && userVote.option === index && (
                        <CheckCircle2 size={20} className={`${
                          isMyPoll ? 'text-purple-600' : 'text-blue-600'
                        }`} />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-4 flex justify-between items-center text-gray-600 relative">
          <div className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
            <Star size={18} />
            <span className="text-sm">{poll.votes.length} Votes</span>
          </div>

          {/* Delete Poll Button - Centered in Footer */}
          {isMyPoll && (
            <motion.button 
              whileHover={{ scale: 1.2 }}
              onClick={() => handleDeletePoll(poll._id)}
              className="absolute right-0 text-red-500 hover:text-red-700 z-10 bg-red-50 rounded-full p-2"
            >
              <Trash2 size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        {/* Header with Modern Typography */}
        <ReviewsHeader />

        {/* Navigation and Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
        >
          {/* Tabs with Animated Underline */}
          <div className="flex space-x-6 relative">
            {['public', 'my polls'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 text-lg font-medium transition-colors duration-300 ${
                  activeTab === tab 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Create Poll Button with Hover Effect */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <PlusIcon size={20} />
            <span>Create Poll</span>
            <ArrowUpRight 
              size={18} 
              className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" 
            />
          </motion.button>
        </motion.div>

        {/* Polls Grid with Staggered Animation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activeTab === 'public' 
            ? polls.map(poll => renderPollCard(poll)) 
            : myPolls.map(poll => renderPollCard(poll, true))
          }
        </motion.div>

        {/* Create Poll Modal */}
        <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative overflow-hidden border-4 border-indigo-100"
            >
              {/* Decorative Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30 -z-10"></div>

              {/* Close Button */}
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10"
              >
                <X size={28} strokeWidth={1.5} />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8 space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center items-center space-x-2"
                >
                  <Star size={32} className="text-yellow-500" fill="#fbbf24" />
                  <h2 className="text-4xl font-extralight tracking-tight text-gray-800">
                    Community Poll
                  </h2>
                  <Star size={32} className="text-yellow-500" fill="#fbbf24" />
                </motion.div>
                <p className="text-gray-500 text-lg">
                  Spark conversation, gather insights, unite our community
                </p>
              </div>

              {/* Poll Creation Form */}
              <div className="space-y-6">
                {/* Question Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <input 
                    type="text" 
                    value={newPoll.question}
                    onChange={(e) => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="What burning question do you want to ask?" 
                    className="w-full px-5 py-4 border-2 border-indigo-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-indigo-400 text-lg transition-all placeholder-gray-400"
                  />
                </motion.div>
                
                {/* Poll Options */}
                {newPoll.options.map((option, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex space-x-3 items-center"
                  >
                    <input 
                      type="text" 
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newPoll.options];
                        newOptions[index] = e.target.value;
                        setNewPoll(prev => ({ ...prev, options: newOptions }));
                      }}
                      placeholder={`Option ${index + 1}`} 
                      className="flex-grow px-5 py-3 border-2 border-indigo-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    />
                    {index >= 1 && (
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          const newOptions = newPoll.options.filter((_, i) => i !== index);
                          setNewPoll(prev => ({ ...prev, options: newOptions }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={24} />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
                
                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={addPollOption}
                    disabled={newPoll.options.length >= 5}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 disabled:opacity-50 transition-all"
                  >
                    <PlusCircle size={20} className="mr-2" />
                    Add Option
                  </motion.button>
                  
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreatePoll}
                    disabled={!newPoll.question || newPoll.options.filter(o => o.trim() !== '').length < 2}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 flex items-center space-x-2 transition-all disabled:opacity-50 shadow-md hover:shadow-lg"
                  >
                    <CheckCircle2 size={20} className="mr-2" />
                    Create Poll
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}