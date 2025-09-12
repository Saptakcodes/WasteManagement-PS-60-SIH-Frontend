// src/components/Communities.jsx
import React, { useState, useEffect } from 'react';
import {
  Users,
  Trophy,
  Award,
  Calendar,
  MessageSquare,
  MapPin,
  Search,
  Filter,
  Plus,
  BarChart3,
  TrendingUp,
  Leaf,
  Sparkles,
  HeartHandshake,
  Target,
  Clock,
  ChevronRight,
  Star,
  CheckCircle,
  Zap,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

const Communities = () => {
  // State for user's current community
  const [userCommunity, setUserCommunity] = useState(null);
  
  // State for all communities
  const [communities, setCommunities] = useState([
    
    {
      id: 1,
      name: 'Green Valley Apartments',
      type: 'housing',
      members: 142,
      cleanlinessScore: 87,
      segregationPercentage: 92,
      greenPoints: 12500,
      level: 'Gold',
      streak: 45,
      challenges: ['100% Segregation', 'Plastic-Free Week'],
      location: 'Sector 45, Gurugram',
      joinType: 'automatic' // automatic, request, approval
    },
    {
      id: 2,
      name: 'Eco Warriors NGO',
      type: 'ngo',
      members: 89,
      cleanlinessScore: 95,
      segregationPercentage: 98,
      greenPoints: 18700,
      level: 'Platinum',
      streak: 67,
      challenges: ['Zero Waste Challenge', 'Composting Drive'],
      location: 'South Delhi',
      joinType: 'request'
    },
    {
      id: 3,
      name: 'Delhi Public School',
      type: 'school',
      members: 210,
      cleanlinessScore: 79,
      segregationPercentage: 85,
      greenPoints: 9800,
      level: 'Silver',
      streak: 32,
      challenges: ['Paper Recycling', 'E-Waste Collection'],
      location: 'RK Puram, Delhi',
      joinType: 'approval'
    },
    {
      id: 4,
      name: 'TechPark Offices',
      type: 'business',
      members: 76,
      cleanlinessScore: 82,
      segregationPercentage: 88,
      greenPoints: 11200,
      level: 'Gold',
      streak: 41,
      challenges: ['Reduce Single-Use Plastic', 'Car Pool Week'],
      location: 'Noida Sector 62',
      joinType: 'automatic'
    },
     {
    id: 5,
    name: 'Sunshine Apartments',
    type: 'housing',
    members: 95,
    cleanlinessScore: 90,
    segregationPercentage: 96,
    greenPoints: 13200,
    level: 'Platinum',
    streak: 58,
    challenges: ['No-Plastic Market', 'Rainwater Harvesting'],
    location: 'Dwarka Sector 10, Delhi',
    joinType: 'approval'
  },
  {
    id: 6,
    name: 'Youth for Earth NGO',
    type: 'ngo',
    members: 120,
    cleanlinessScore: 88,
    segregationPercentage: 93,
    greenPoints: 15900,
    level: 'Gold',
    streak: 49,
    challenges: ['Beach Cleanup', 'E-Waste Awareness'],
    location: 'Mumbai, Maharashtra',
    joinType: 'request'
  },
  {
    id: 7,
    name: 'National Institute of Technology',
    type: 'school',
    members: 340,
    cleanlinessScore: 85,
    segregationPercentage: 90,
    greenPoints: 20500,
    level: 'Platinum',
    streak: 70,
    challenges: ['Hostel Composting', 'Solar Energy Drive'],
    location: 'Kurukshetra, Haryana',
    joinType: 'automatic'
  },
  {
    id: 8,
    name: 'CyberHub Corporate Park',
    type: 'business',
    members: 150,
    cleanlinessScore: 92,
    segregationPercentage: 97,
    greenPoints: 25000,
    level: 'Diamond',
    streak: 80,
    challenges: ['Workplace Segregation', 'Green Commute Month'],
    location: 'Gurugram Cyber City',
    joinType: 'approval'
  },
  {
    id: 9,
    name: 'Green Warriors Community',
    type: 'housing',
    members: 60,
    cleanlinessScore: 77,
    segregationPercentage: 81,
    greenPoints: 7200,
    level: 'Bronze',
    streak: 18,
    challenges: ['Weekly Clean Drive', 'Ban Plastic Bags'],
    location: 'Kolkata, West Bengal',
    joinType: 'request'
  },
  {
    id: 10,
    name: 'Tree Lovers Club',
    type: 'ngo',
    members: 45,
    cleanlinessScore: 85,
    segregationPercentage: 88,
    greenPoints: 6500,
    level: 'Silver',
    streak: 25,
    challenges: ['Tree Plantation Drive', 'Adopt a Park'],
    location: 'Chennai, Tamil Nadu',
    joinType: 'automatic'
  }
    
  ]);

  // State for community challenges
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: '30 Days Segregation Streak',
      description: 'Maintain 100% waste segregation for 30 consecutive days',
      progress: 65,
      endDate: '2023-11-30',
      participants: 89,
      communityId: 1
    },
    {
      id: 2,
      title: 'Plastic-Free Community',
      description: 'Eliminate single-use plastic from our community',
      progress: 42,
      endDate: '2023-12-15',
      participants: 124,
      communityId: 1
    },
    {
      id: 3,
      title: 'Neighborhood Cleanup Drive',
      description: 'Join hands to clean up our local park and streets',
      progress: 100,
      endDate: '2023-10-28',
      participants: 67,
      communityId: 2,
      completed: true
    }
  ]);

  // State for community events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Composting Workshop',
      date: '2023-11-05',
      time: '10:00 AM',
      location: 'Community Hall',
      organizer: 'Green Valley RWA',
      attendees: 34,
      communityId: 1
    },
    {
      id: 2,
      title: 'E-Waste Collection Camp',
      date: '2023-11-12',
      time: '9:00 AM - 2:00 PM',
      location: 'Main Gate',
      organizer: 'Eco Warriors NGO',
      attendees: 0,
      communityId: 2
    },
    {
      id: 3,
      title: 'Tree Plantation Drive',
      date: '2023-11-20',
      time: '8:00 AM',
      location: 'Central Park',
      organizer: 'DPS Eco Club',
      attendees: 0,
      communityId: 3
    }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    searchQuery: '',
    communityType: 'all',
    sortBy: 'points'
  });

  // State for creating new community
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    type: 'housing',
    location: '',
    description: ''
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  // Filter communities based on filters
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         community.location.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesType = filters.communityType === 'all' || community.type === filters.communityType;
    
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (filters.sortBy === 'points') return b.greenPoints - a.greenPoints;
    if (filters.sortBy === 'members') return b.members - a.members;
    if (filters.sortBy === 'score') return b.cleanlinessScore - a.cleanlinessScore;
    return 0;
  });

  // Handle joining a community
  const handleJoinCommunity = (communityId) => {
    const community = communities.find(c => c.id === communityId);
    
    if (community.joinType === 'automatic') {
      setUserCommunity(community);
      alert(`You've successfully joined ${community.name}!`);
    } else if (community.joinType === 'request') {
      alert(`Join request sent to ${community.name}. Waiting for approval.`);
    } else {
      alert(`Your request to join ${community.name} has been submitted for review.`);
    }
  };

  // Handle creating a new community
  const handleCreateCommunity = (e) => {
    e.preventDefault();
    const newComm = {
      id: communities.length + 1,
      ...newCommunity,
      members: 1,
      cleanlinessScore: 0,
      segregationPercentage: 0,
      greenPoints: 0,
      level: 'Bronze',
      streak: 0,
      challenges: [],
      joinType: 'approval'
    };
    
    setCommunities(prev => [...prev, newComm]);
    setUserCommunity(newComm);
    setShowCreateForm(false);
    setNewCommunity({
      name: '',
      type: 'housing',
      location: '',
      description: ''
    });
    
    alert('Your community has been created and is pending verification!');
  };

  // Get level color
  const getLevelColor = (level) => {
    switch(level) {
      case 'Bronze': return 'text-amber-800 bg-amber-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-blue-600 bg-blue-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-green-900 text-green-900 dark:text-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Communities</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join hands with your community to create a cleaner, greener India together
          </p>
        </motion.div>

        {/* User Community Banner (if joined) */}
        {userCommunity && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <Users size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Your Community</h2>
                  <p className="text-emerald-100">{userCommunity.name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{userCommunity.cleanlinessScore}</p>
                  <p className="text-sm text-emerald-100">Cleanliness Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{userCommunity.segregationPercentage}%</p>
                  <p className="text-sm text-emerald-100">Segregation</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{formatNumber(userCommunity.greenPoints)}</p>
                  <p className="text-sm text-emerald-100">Green Points</p>
                </div>
              </div>
              
              <button className="bg-white text-green-700 font-semibold px-6 py-2 rounded-lg hover:bg-emerald-50 transition-colors mt-4 md:mt-0">
                View Dashboard
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Community List */}
          <div className="lg:col-span-2">
            {/* Filters and Search */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg mb-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-semibold">Explore Communities</h2>
                
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={20} className="mr-2" />
                  Create Community
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search communities..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  />
                </div>
                
                {/* Community Type Filter */}
                <div>
                  <select
                    value={filters.communityType}
                    onChange={(e) => setFilters(prev => ({ ...prev, communityType: e.target.value }))}
                    className="border border-gray-300 dark:border-green-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="housing">Housing Society</option>
                    <option value="school">School</option>
                    <option value="business">Business</option>
                    <option value="ngo">NGO</option>
                    <option value="ward">Ward</option>
                    <option value="village">Village</option>
                  </select>
                </div>
                
                {/* Sort Filter */}
                <div>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="border border-gray-300 dark:border-green-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  >
                    <option value="points">Most Points</option>
                    <option value="members">Most Members</option>
                    <option value="score">Highest Score</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Community List */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="space-y-6"
            >
              {filteredCommunities.map(community => (
                <motion.div
                  key={community.id}
                  variants={fadeIn}
                  className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Community Image/Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl bg-green-600 flex items-center justify-center">
                        <Users size={40} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Community Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold">{community.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(community.level)}`}>
                          {community.level}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                          {community.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-green-300 mb-4 flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {community.location}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-2xl font-bold text-green-700 dark:text-emerald-300">{formatNumber(community.members)}</p>
                          <p className="text-sm text-gray-600 dark:text-green-400">Members</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-700 dark:text-emerald-300">{community.cleanlinessScore}</p>
                          <p className="text-sm text-gray-600 dark:text-green-400">Clean Score</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-700 dark:text-emerald-300">{community.segregationPercentage}%</p>
                          <p className="text-sm text-gray-600 dark:text-green-400">Segregation</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-700 dark:text-emerald-300">{formatNumber(community.greenPoints)}</p>
                          <p className="text-sm text-gray-600 dark:text-green-400">Points</p>
                        </div>
                      </div>
                      
                      {/* Active Challenges */}
                      {community.challenges.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Active Challenges:</p>
                          <div className="flex flex-wrap gap-2">
                            {community.challenges.map((challenge, index) => (
                              <span key={index} className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs">
                                {challenge}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-green-400">
                        <Zap size={16} className="mr-1 text-amber-500" />
                        <span className="mr-4">{community.streak} days streak</span>
                        <Users size={16} className="mr-1" />
                        <span>Join: {community.joinType}</span>
                      </div>
                    </div>
                    
                    {/* Join Button */}
                    <div className="flex flex-col justify-center">
                      <button
                        onClick={() => handleJoinCommunity(community.id)}
                        disabled={userCommunity?.id === community.id}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                          userCommunity?.id === community.id
                            ? 'bg-gray-300 dark:bg-green-700 text-gray-500 dark:text-green-300'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {userCommunity?.id === community.id ? 'Joined' : 'Join Community'}
                      </button>
                      
                      {userCommunity?.id === community.id && (
                        <button className="mt-2 text-green-600 dark:text-emerald-300 text-sm font-medium">
                          View Dashboard <ChevronRight size={16} className="inline" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Challenges, Events, Leaderboard */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Challenges */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Community Challenges</h2>
                <Target className="text-green-600 dark:text-emerald-300" />
              </div>
              
              <div className="space-y-4">
                {challenges.map(challenge => (
                  <div key={challenge.id} className={`p-4 rounded-xl ${
                    challenge.completed ? 'bg-green-100 dark:bg-green-700' : 'bg-white dark:bg-green-900'
                  }`}>
                    <h3 className="font-medium mb-2">{challenge.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-green-300 mb-3">{challenge.description}</p>
                    
                    {!challenge.completed ? (
                      <>
                        <div className="w-full bg-gray-200 dark:bg-green-700 rounded-full h-2 mb-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-green-400">
                          <span>{challenge.progress}% complete</span>
                          <span>Ends: {challenge.endDate}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center text-green-600 dark:text-emerald-300">
                        <CheckCircle size={16} className="mr-1" />
                        <span className="text-sm">Completed! {challenge.participants} participants</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-center text-green-600 dark:text-emerald-300 font-medium text-sm">
                View All Challenges
              </button>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
                <Calendar className="text-green-600 dark:text-emerald-300" />
              </div>
              
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="p-4 bg-white dark:bg-green-900 rounded-xl">
                    <h3 className="font-medium mb-2">{event.title}</h3>
                    <div className="text-sm text-gray-600 dark:text-green-300 space-y-1 mb-3">
                      <p className="flex items-center">
                        <Clock size={14} className="mr-2" />
                        {event.date} • {event.time}
                      </p>
                      <p className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        {event.location}
                      </p>
                      <p>By: {event.organizer}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-green-400">
                        {event.attendees} attending
                      </span>
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors">
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-center text-green-600 dark:text-emerald-300 font-medium text-sm">
                View All Events
              </button>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Top Communities</h2>
                <Trophy className="text-amber-500" />
              </div>
              
              <div className="space-y-4">
                {communities
                  .sort((a, b) => b.greenPoints - a.greenPoints)
                  .slice(0, 5)
                  .map((community, index) => (
                    <div key={community.id} className="flex items-center p-3 bg-white dark:bg-green-900 rounded-xl">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                        index === 0 ? 'bg-amber-100 text-amber-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{community.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-green-400">{community.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatNumber(community.greenPoints)}</p>
                        <p className="text-xs text-gray-500 dark:text-green-400">points</p>
                      </div>
                    </div>
                  ))
                }
              </div>
              
              <button className="w-full mt-4 text-center text-green-600 dark:text-emerald-300 font-medium text-sm">
                View Full Leaderboard
              </button>
            </motion.div>

            {/* Impact Statistics */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Collective Impact</h2>
                <BarChart3 className="text-green-600 dark:text-emerald-300" />
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-green-900 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Leaf className="text-green-600 mr-2" size={20} />
                    <h3 className="font-medium">Waste Reduced</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700 dark:text-emerald-300">28.5 tons</p>
                  <p className="text-sm text-gray-500 dark:text-green-400">This month across all communities</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-green-900 rounded-xl">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="text-green-600 mr-2" size={20} />
                    <h3 className="font-medium">CO₂ Saved</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700 dark:text-emerald-300">42.8 tons</p>
                  <p className="text-sm text-gray-500 dark:text-green-400">Equivalent to planting 1,950 trees</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-green-900 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Users className="text-green-600 mr-2" size={20} />
                    <h3 className="font-medium">Active Participants</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700 dark:text-emerald-300">5,247</p>
                  <p className="text-sm text-gray-500 dark:text-green-400">Working together for a cleaner India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Community Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-green-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-6">Create New Community</h2>
            
            <form onSubmit={handleCreateCommunity} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Community Name *</label>
                <input
                  type="text"
                  value={newCommunity.name}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Green Valley Apartments"
                  className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Community Type *</label>
                <select
                  value={newCommunity.type}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  required
                >
                  <option value="housing">Housing Society</option>
                  <option value="school">School/College</option>
                  <option value="business">Business/Office</option>
                  <option value="ngo">NGO/Organization</option>
                  <option value="ward">Ward/Area</option>
                  <option value="village">Village</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <input
                  type="text"
                  value={newCommunity.location}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Full address"
                  className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell us about your community..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-3 border border-gray-300 dark:border-green-600 text-gray-700 dark:text-green-300 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Create Community
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

{/* ✅ Reward Showcase Section – Right Column */}
<div className="col-span-1">
  <div className="p-4 bg-white dark:bg-green-900 rounded-2xl shadow-lg mt-6">
    <h2 className="text-lg font-bold text-green-700 dark:text-emerald-300 mb-4">
      🎁 Community Rewards – Unlock Together!
    </h2>

    {/* Progress Bar */}
    <div className="w-full bg-gray-200 dark:bg-green-800 rounded-full h-3 mb-3">
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{
          width: `${(7200 / 50000) * 100}%`, // Example: community points progress
        }}
      ></div>
    </div>
    <p className="text-xs text-green-700 dark:text-green-200 mb-4">
      Your Community: <b>7,200 pts</b>
    </p>

    {/* Rewards Ladder */}
    <div className="space-y-3">
      {/* Reward 1 */}
      <div className="flex items-center justify-between p-3 rounded-xl border bg-green-100 border-green-400 dark:bg-green-800 dark:border-emerald-400">
        <div className="flex items-center space-x-2">
          <span className="text-green-600 dark:text-emerald-300">✅</span>
          <div>
            <p className="font-semibold text-green-700 dark:text-emerald-300">
              Free Dustbin Upgrades
            </p>
            <p className="text-xs text-gray-500 dark:text-green-400">5,000 pts</p>
          </div>
        </div>
        <span className="text-green-600 dark:text-emerald-300 font-bold text-sm">
          Unlocked
        </span>
      </div>

      {/* Reward 2 */}
      <div className="flex items-center justify-between p-3 rounded-xl border bg-gray-100 border-gray-300 dark:bg-green-950 dark:border-green-700">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-green-500">🔒</span>
          <div>
            <p className="font-semibold text-gray-600 dark:text-green-200">
              5% Property Tax Rebate
            </p>
            <p className="text-xs text-gray-500 dark:text-green-400">10,000 pts</p>
          </div>
        </div>
      </div>

      {/* Reward 3 */}
      <div className="flex items-center justify-between p-3 rounded-xl border bg-gray-100 border-gray-300 dark:bg-green-950 dark:border-green-700">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-green-500">🔒</span>
          <div>
            <p className="font-semibold text-gray-600 dark:text-green-200">
              Solar Panel Subsidy for Apartments
            </p>
            <p className="text-xs text-gray-500 dark:text-green-400">20,000 pts</p>
          </div>
        </div>
      </div>

      {/* Reward 4 */}
      <div className="flex items-center justify-between p-3 rounded-xl border bg-gray-100 border-gray-300 dark:bg-green-950 dark:border-green-700">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-green-500">🔒</span>
          <div>
            <p className="font-semibold text-gray-600 dark:text-green-200">
              Govt. Recognition & Felicitation
            </p>
            <p className="text-xs text-gray-500 dark:text-green-400">50,000 pts</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

);
};

export default Communities;

