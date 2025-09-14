// src/components/Rewards.jsx
import React, { useState, useEffect } from 'react';
import {
  Award,
  Trophy,
  Star,
  Calendar,
  TrendingUp,
  Users,
  Leaf,
  Share,
  Zap,
  CreditCard,
  Gift,
  Crown,
  Target,
  Clock,
  CheckCircle,
  BarChart3,
  Download,
  RotateCcw,
  Sparkles,
  MapPin,
  Coins,
  TreePine,
  Recycle,
  Sparkle,
  Lightbulb,
  Earth
} from 'lucide-react';
import { motion } from 'framer-motion';

const Rewards = () => {
  // Mock user data with more realistic values
  const [userData, setUserData] = useState({
    name: 'Rajesh Kumar',
    role: 'Green Champion',
    points: 475,
    streak: 12,
    level: 3,
    nextLevelPoints: 125,
    impact: {
      co2Saved: 245, // kg
      wasteDiverted: 520, // kg
      treesEquivalent: 8, // trees
      communityCleanliness: 18 // %
    },
    rank: 42,
    totalUsers: 2560
  });

  // Mock achievements data with more variety
  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Report', earned: true, icon: Star, description: 'Submitted your first waste report', color: 'bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200' },
    { id: 2, name: '7-Day Streak', earned: true, icon: Trophy, description: 'Maintained a 7-day activity streak', color: 'bg-purple-100 border-purple-400 text-purple-800 dark:bg-purple-900 dark:border-purple-600 dark:text-purple-200' },
    { id: 3, name: 'Bin Master', earned: true, icon: Award, description: 'Uploaded 10+ verified bins', color: 'bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200' },
    { id: 4, name: 'Eco Educator', earned: false, icon: Users, description: 'Completed all training modules', color: 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300' },
    { id: 5, name: 'Community Hero', earned: false, icon: Crown, description: 'Organized a cleanup drive', color: 'bg-amber-100 border-amber-400 text-amber-800 dark:bg-amber-900 dark:border-amber-600 dark:text-amber-200' },
    { id: 6, name: 'Segregation Pro', earned: true, icon: Leaf, description: '30 days of proper segregation', color: 'bg-emerald-100 border-emerald-400 text-emerald-800 dark:bg-emerald-900 dark:border-emerald-600 dark:text-emerald-200' },
    { id: 7, name: 'Early Adopter', earned: true, icon: Zap, description: 'Joined in first month', color: 'bg-cyan-100 border-cyan-400 text-cyan-800 dark:bg-cyan-900 dark:border-cyan-600 dark:text-cyan-200' },
    { id: 8, name: 'Recycling Guru', earned: false, icon: Recycle, description: 'Recycled 100+ items', color: 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900 dark:border-green-600 dark:text-green-200' }
  ]);

  // Mock leaderboard data with more entries
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Priya S.', points: 1420, role: 'Green Champion', avatar: 'PS' },
    { rank: 2, name: 'Amit R.', points: 1285, role: 'Waste Worker', avatar: 'AR' },
    { rank: 3, name: 'You', points: 875, role: 'Green Champion', avatar: 'RK' },
    { rank: 4, name: 'Neha K.', points: 760, role: 'Citizen', avatar: 'NK' },
    { rank: 5, name: 'Vikram M.', points: 650, role: 'Citizen', avatar: 'VM' },
    { rank: 6, name: 'Sanjay T.', points: 620, role: 'Green Champion', avatar: 'ST' },
    { rank: 7, name: 'Lina P.', points: 590, role: 'Citizen', avatar: 'LP' }
  ]);

  // Mock rewards data with more details
  const [rewards, setRewards] = useState([
    { tier: 1, points: 100, benefits: ['Digital Badge', 'Social Recognition'], unlocked: true, color: 'from-gray-400 to-gray-600' },
    { tier: 2, points: 250, benefits: ['5% Bill Reduction', 'Priority Service'], unlocked: true, color: 'from-green-500 to-green-700' },
    { tier: 3, points: 500, benefits: ['10% Tax Rebate', 'Eco Starter Kit'], unlocked: false, color: 'from-blue-500 to-blue-700' },
    { tier: 4, points: 1000, benefits: ['Govt Priority', 'Workshop Passes'], unlocked: false, color: 'from-purple-500 to-purple-700' },
    { tier: 5, points: 2000, benefits: ['Education Credits', 'Hall of Fame'], unlocked: false, color: 'from-amber-500 to-amber-700' }
  ]);

  // Mock activity history with more variety
  const [activityHistory, setActivityHistory] = useState([
    { id: 1, action: 'Bin Upload', points: 20, date: '2023-10-25', status: 'approved', icon: Target },
    { id: 2, action: 'Waste Report', points: 15, date: '2023-10-24', status: 'approved', icon: BarChart3 },
    { id: 3, action: 'Daily Segregation', points: 5, date: '2023-10-24', status: 'approved', icon: Recycle },
    { id: 4, action: 'Training Completed', points: 50, date: '2023-10-23', status: 'approved', icon: Award },
    { id: 5, action: '7-Day Streak Bonus', points: 25, date: '2023-10-22', status: 'approved', icon: Zap },
    { id: 6, action: 'Referred Friend', points: 10, date: '2023-10-21', status: 'pending', icon: Users },
    { id: 7, action: 'Community Cleanup', points: 30, date: '2023-10-20', status: 'approved', icon: Users }
  ]);

  // Streak calendar data
  const [streakCalendar, setStreakCalendar] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      active: i >= 18 // Last 12 days are active (for the 12-day streak)
    }))
  );

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  // Calculate progress percentage
  const progressPercentage = (userData.points / (userData.points + userData.nextLevelPoints)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-900 dark:text-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
            <Earth className="text-white" size={28} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Green Rewards Dashboard
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-green-700 dark:text-emerald-200">
            Earn points, unlock rewards, and make a real impact on your community and environment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile and Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white dark:bg-green-800 rounded-2xl p-6 shadow-xl border border-green-100 dark:border-green-700"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4 shadow-md">
                  {userData.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <div className="flex items-center mt-1">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-700 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {userData.role}
                    </span>
                    <span className="ml-2 text-sm text-green-700 dark:text-emerald-300">Level {userData.level}</span>
                  </div>
                </div>
              </div>

              {/* Points Counter */}
              <div className="text-center mb-6">
                <div className="flex justify-center items-baseline">
                  <Coins className="text-amber-500 mr-2" size={28} />
                  <span className="text-5xl font-bold text-green-700 dark:text-white">{userData.points}</span>
                  <span className="text-lg text-green-600 dark:text-emerald-300 ml-2">Green Points</span>
                </div>
                <p className="text-sm text-green-600 dark:text-emerald-300 mt-2">
                  {userData.nextLevelPoints} points to next level
                </p>
                
                {/* Global Rank */}
                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-700 text-green-800 dark:text-emerald-200 text-sm">
                  <Crown size={14} className="mr-1 text-amber-500" />
                  Ranked #{userData.rank} of {userData.totalUsers} users
                </div>
              </div>

              {/* Progress Ring */}
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    className="text-green-200 dark:text-green-700 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  {/* Progress circle */}
                  <circle
                    className="text-green-600 dark:text-emerald-400  stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (progressPercentage / 100) * 251.2}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-700 dark:text-white">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>

              {/* Impact Stats */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Leaf className="mr-2 text-green-600" size={20} />
                  Your Environmental Impact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-700 dark:to-emerald-800 p-3 rounded-lg border border-green-100 dark:border-emerald-700">
                    <div className="flex items-center mb-1">
                      <TreePine size={16} className="text-green-600 mr-1" />
                      <p className="text-sm text-green-800 dark:text-emerald-200">CO₂ Saved</p>
                    </div>
                    <p className="text-xl font-bold text-green-900 dark:text-white">{userData.impact.co2Saved} kg</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-700 dark:to-emerald-800 p-3 rounded-lg border border-green-100 dark:border-emerald-700">
                    <div className="flex items-center mb-1">
                      <Recycle size={16} className="text-green-600 mr-1" />
                      <p className="text-sm text-green-800 dark:text-emerald-200">Waste Diverted</p>
                    </div>
                    <p className="text-xl font-bold text-green-900 dark:text-white">{userData.impact.wasteDiverted} kg</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-800 dark:to-amber-900 p-3 rounded-lg border border-amber-100 dark:border-amber-700">
                  <div className="flex items-center mb-1">
                    <Sparkle size={16} className="text-amber-600 mr-1" />
                    <p className="text-sm text-amber-800 dark:text-amber-200">Community Cleanliness</p>
                  </div>
                  <p className="text-xl font-bold text-amber-900 dark:text-white">+{userData.impact.communityCleanliness}%</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-800 dark:to-cyan-900 p-3 rounded-lg border border-blue-100 dark:border-cyan-700">
                  <div className="flex items-center mb-1">
                    <TreePine size={16} className="text-blue-600 mr-1" />
                    <p className="text-sm text-blue-800 dark:text-cyan-200">Trees Equivalent</p>
                  </div>
                  <p className="text-xl font-bold text-blue-900 dark:text-white">{userData.impact.treesEquivalent} trees</p>
                </div>
              </div>
            </motion.div>

            {/* Streak Tracker */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white dark:bg-green-800 rounded-2xl p-6 shadow-xl border border-green-100 dark:border-green-700"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 text-green-600" size={20} />
                Activity Streak
              </h3>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-green-700 dark:text-white">{userData.streak} days</span>
                  <div className="ml-3 flex items-center text-green-600 dark:text-emerald-300 bg-green-100 dark:bg-green-700 px-2 py-1 rounded-full">
                    <Zap size={14} className="mr-1 text-amber-500" />
                    Current streak
                  </div>
                </div>
                {userData.streak >= 7 && (
                  <div className="bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-xs font-medium px-2 py-1 rounded-full">
                    +25 weekly bonus
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {streakCalendar.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded flex items-center justify-center text-xs ${
                      day.active
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-sm'
                        : 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-300'
                    }`}
                    title={day.date.toLocaleDateString()}
                  >
                    {day.date.getDate()}
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg border border-blue-100 dark:border-blue-700">
                <div className="flex items-center">
                  <Lightbulb size={14} className="text-blue-500 mr-2" />
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    Maintain your streak for 7 days to earn bonus points!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Achievements and Activity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Achievements */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white dark:bg-green-800 rounded-2xl p-6 shadow-xl border border-green-100 dark:border-green-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Award className="mr-2 text-green-600" size={20} />
                  Badges & Achievements
                </h3>
                <span className="text-sm text-green-600 dark:text-emerald-300">
                  {achievements.filter(a => a.earned).length}/{achievements.length} earned
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ y: -5 }}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${achievement.color} ${
                        achievement.earned ? 'shadow-sm' : 'opacity-70'
                      }`}
                    >
                      <Icon
                        size={24}
                        className={`mx-auto mb-2 ${
                          achievement.earned ? 'text-green-600 dark:text-emerald-300' : 'text-gray-400'
                        }`}
                      />
                      <p className="text-sm font-medium">{achievement.name}</p>
                      <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">{achievement.description}</p>
                    </motion.div>
                  );
                })}
              </div>
              
              <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg">
                <Share size={18} className="mr-2" />
                Share Your Achievements
              </button>
            </motion.div>

            {/* Activity History */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white dark:bg-green-800 rounded-2xl p-6 shadow-xl border border-green-100 dark:border-green-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <TrendingUp className="mr-2 text-green-600" size={20} />
                  Recent Activity
                </h3>
                <span className="text-sm text-green-600 dark:text-emerald-300">
                  Total: {activityHistory.reduce((sum, activity) => sum + activity.points, 0)} pts
                </span>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {activityHistory.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-700/50 border border-green-100 dark:border-green-600">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 dark:bg-green-600 rounded-lg mr-3">
                          <Icon size={16} className="text-green-600 dark:text-emerald-300" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-green-600 dark:text-emerald-300">{activity.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                          activity.status === 'approved' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-emerald-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300'
                        }`}>
                          {activity.status}
                        </span>
                        <span className="text-green-700 dark:text-emerald-300 font-medium flex items-center">
                          +{activity.points} <Coins size={14} className="text-amber-500 ml-1" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button className="w-full mt-4 py-2.5 border border-green-500 text-green-600 dark:text-emerald-300 hover:bg-green-50 dark:hover:bg-green-700 font-medium rounded-lg transition-all flex items-center justify-center">
                <Download size={18} className="mr-2" />
                Download Full Report
              </button>
            </motion.div>
          </div>

          {/* Right Column - Rewards and Leaderboard */}
          <div className="lg:col-span-1 space-y-6">
            {/* Reward Tiers */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white dark:bg-green-800 rounded-2xl p-6 shadow-xl border border-green-100 dark:border-green-700"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Gift className="mr-2 text-green-600" size={20} />
                Reward Tiers
              </h3>
              
              <div className="space-y-4">
                {rewards.map((reward) => (
                  <motion.div
                    key={reward.tier}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 ${
                      reward.unlocked
                        ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-700 dark:to-emerald-800 shadow-sm'
                        : 'border-gray-200 dark:border-green-600 bg-white dark:bg-green-700/50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${reward.color} text-white text-sm font-bold mr-2`}>
                          {reward.tier}
                        </div>
                        <h4 className="font-semibold">Tier {reward.tier}</h4>
                      </div>
                      <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                        {reward.points} pts
                      </span>
                    </div>
                    
                    <ul className="text-sm space-y-1">
                      {reward.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle size={14} className="mr-2 text-green-600 dark:text-emerald-300" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    
                    {!reward.unlocked && (
                      <div className="mt-3 pt-2 border-t border-green-200 dark:border-green-600">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-green-600 dark:text-emerald-300">
                            {reward.points - userData.points} points needed
                          </span>
                          <button className="text-green-600 dark:text-emerald-300 hover:underline">
                            View details
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white dark:bg-green-800 rounded-2xl p-6 shadow-xl border border-green-100 dark:border-green-700"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="mr-2 text-green-600" size={20} />
                Community Leaderboard
              </h3>
              
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <motion.div
                    key={user.rank}
                    whileHover={{ y: -2 }}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      user.name === 'You'
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-700 dark:to-emerald-800 border-2 border-green-300 dark:border-emerald-500'
                        : 'bg-white dark:bg-green-900/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium mr-3 ${
                        user.rank === 1
                          ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-md'
                          : user.rank === 2
                          ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white'
                          : user.rank === 3
                          ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                          : 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-emerald-300'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-green-600 dark:text-emerald-300">{user.role}</p>
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold text-green-700 dark:text-emerald-300 flex items-center">
                      {user.points} <Coins size={14} className="text-amber-500 ml-1" />
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg">
                <MapPin size={18} className="mr-2" />
                View Ward Ranking
              </button>
            </motion.div>

            {/* Weekly Reward Wheel */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white dark:bg-green-800 rounded-2xl p-6 shadow-xl border border-green-100 dark:border-green-700 text-center"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center">
                <Sparkles className="mr-2 text-green-600" size={20} />
                Weekly Bonus Spin
              </h3>
              
              <div className="relative w-40 h-40 mx-auto mb-4">
                {/* Reward wheel visualization */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-200 to-emerald-300 dark:from-green-600 dark:to-emerald-700 flex items-center justify-center shadow-inner">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-600 dark:to-amber-700 flex items-center justify-center">
                    <p className="text-xs text-center text-amber-800 dark:text-amber-200 px-2">Spin to win bonus points!</p>
                  </div>
                </div>
                <button className="absolute inset-0 m-auto w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
                  <RotateCcw size={24} />
                </button>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-100 dark:border-amber-700">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <Zap size={14} className="inline-block mr-1 text-amber-500" />
                  Spin available in 2 days
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;