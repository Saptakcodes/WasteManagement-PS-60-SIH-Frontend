// src/components/CommunityImpact.jsx
import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Star,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Award,
  Zap,
  Leaf,
  BarChart3,
  Filter,
  ChevronRight,
  Info,
  Scan,
  Map,
  Flag,
  Target,
  Gift,
  Download,
  Crown,
  TrendingUp as TrendingUpIcon,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

const CommunityImpact = () => {
  // State for society data
  const [societyData, setSocietyData] = useState({
    id: 1,
    name: 'Green Valley Apartments',
    score: 7200,
    weeklyProgress: 80,
    status: 'good', // good, warning, bad
    streak: 45,
    members: 142,
    rewardsUnlocked: ['Free Dustbin Upgrades'],
    nextReward: '5% Property Tax Rebate (at 10,000 pts)',
    lastScan: '2023-11-03T10:30:00',
    lastContamination: '2023-10-28T09:15:00',
    cityRank: 3,
    totalSocieties: 25,
    violationsThisMonth: 2,
    complianceRate: 92
  });

  // State for scan history
  const [scanHistory, setScanHistory] = useState([
    { date: '2023-11-03', status: 'clean', points: +10, compliance: '95%', violations: 'Plastic bag in wet waste (2 households)' },
    { date: '2023-11-02', status: 'clean', points: +10, compliance: '98%', violations: 'None' },
    { date: '2023-11-01', status: 'clean', points: +10, compliance: '97%', violations: 'Paper in wet waste (1 household)' },
    { date: '2023-10-31', status: 'clean', points: +10, compliance: '96%', violations: 'None' },
    { date: '2023-10-30', status: 'contaminated', points: -20, reason: 'Food waste in dry bin', compliance: '82%', violations: 'Food waste in dry bin (12 households)' },
    { date: '2023-10-29', status: 'clean', points: +10, compliance: '94%', violations: 'Glass mixed with dry waste (3 households)' },
    { date: '2023-10-28', status: 'contaminated', points: -20, reason: 'Mixed waste', compliance: '79%', violations: 'Mixed waste (18 households)' }
  ]);

  // State for star segregators
  const [starSegregators, setStarSegregators] = useState([
    { id: 101, name: 'Sharma Family', points: 450, streak: 30, daysToNextMilestone: 5 },
    { id: 102, name: 'Patel Residence', points: 420, streak: 28, daysToNextMilestone: 2 },
    { id: 103, name: 'Mehta Household', points: 390, streak: 25, daysToNextMilestone: 5 },
    { id: 104, name: 'Kumar Home', points: 370, streak: 22, daysToNextMilestone: 8 },
    { id: 105, name: 'Singh Residence', points: 350, streak: 18, daysToNextMilestone: 12 }
  ]);

  // State for community rewards
  const [communityRewards, setCommunityRewards] = useState([
    { id: 1, points: 5000, title: 'Free Dustbin Upgrades', description: 'New segregated bins for all households', unlocked: true },
    { id: 2, points: 10000, title: '5% Property Tax Rebate', description: 'Discount on next property tax payment', unlocked: false },
    { id: 3, points: 20000, title: 'Solar Panel Subsidy', description: 'Subsidized solar installation for common areas', unlocked: false },
    { id: 4, points: 50000, title: 'Govt. Recognition & Felicitation', description: 'Award ceremony with local officials', unlocked: false }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    timeframe: 'week',
    sortBy: 'recent'
  });

  // State for heatmap data
  const [heatmapData, setHeatmapData] = useState([
    { id: 1, name: 'Green Valley Apartments', cleanliness: 92, status: 'good', color: 'green' },
    { id: 2, name: 'Sunrise Residency', cleanliness: 85, status: 'good', color: 'green' },
    { id: 3, name: 'Palm Grove Society', cleanliness: 45, status: 'bad', color: 'red' },
    { id: 4, name: 'Ocean View Apartments', cleanliness: 78, status: 'warning', color: 'orange' },
    { id: 5, name: 'Hill Crest Homes', cleanliness: 92, status: 'good', color: 'green' },
    { id: 6, name: 'Maple Leaf Society', cleanliness: 35, status: 'bad', color: 'red' },
    { id: 7, name: 'Royal Palms', cleanliness: 88, status: 'good', color: 'green' }
  ]);

  // State for current challenges
  const [currentChallenges, setCurrentChallenges] = useState([
    { id: 1, title: 'Reduce Plastic Waste', target: '20% reduction', progress: 65, daysLeft: 3, reward: 500 },
    { id: 2, title: '100% Dry Waste Segregation', target: 'Perfect segregation', progress: 92, daysLeft: 5, reward: 300 },
    { id: 3, title: 'E-Waste Collection Drive', target: '50kg collection', progress: 40, daysLeft: 7, reward: 700 }
  ]);

  // State for rewards store
  const [rewardsStore, setRewardsStore] = useState([
    { id: 1, title: 'Extra Cleaning Service', points: 2000, description: 'Professional deep cleaning of common areas' },
    { id: 2, title: 'Community Garden Kit', points: 1500, description: 'Tools, seeds, and gardening supplies' },
    { id: 3, title: 'Eco-Friendly Products Pack', points: 800, description: 'Sustainable products for all households' },
    { id: 4, title: 'Solar Lights Installation', points: 5000, description: 'Solar-powered lighting for common areas' }
  ]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'clean': return 'text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-300';
      case 'contaminated': return 'text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'clean': return <CheckCircle size={16} />;
      case 'contaminated': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Calculate weekly progress percentage
  const calculateWeeklyProgress = () => {
    const cleanScans = scanHistory.filter(scan => 
      scan.status === 'clean' && 
      new Date(scan.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    
    const totalScans = scanHistory.filter(scan => 
      new Date(scan.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    
    return totalScans > 0 ? Math.round((cleanScans / totalScans) * 100) : 0;
  };

  // Update weekly progress on component mount
  useEffect(() => {
    setSocietyData(prev => ({
      ...prev,
      weeklyProgress: calculateWeeklyProgress()
    }));
  }, []);

  // Function to handle whistleblower report
  const handleWhistleblowerReport = () => {
    // In a real app, this would open a modal or navigate to a form
    alert("Thank you for helping keep our community clean! Your report will be anonymous. Please provide details of the violation you witnessed.");
  };

  // Function to download monthly report
  const downloadMonthlyReport = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading monthly eco-report for Green Valley Apartments...");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-green-900 text-green-900 dark:text-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Community Impact</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Track your society's waste management performance and collective rewards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Society Scoreboard and Stats */}
          <div className="lg:col-span-2">
            {/* Society Scoreboard */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg mb-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{societyData.name}</h2>
                  <p className="text-green-600 dark:text-emerald-300 flex items-center">
                    <Users size={16} className="mr-1" />
                    {societyData.members} households • Rank #{societyData.cityRank} of {societyData.totalSocieties} in the city
                  </p>
                </div>
                
                <div className="flex items-center bg-white dark:bg-green-700 px-4 py-2 rounded-lg">
                  <Trophy size={20} className="text-amber-500 mr-2" />
                  <span className="text-xl font-bold">{societyData.score}</span>
                  <span className="ml-1 text-gray-500 dark:text-green-300">points</span>
                </div>
              </div>
              
              {/* Weekly Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">This week's cleanliness</span>
                  <span className="font-semibold">{societyData.weeklyProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-green-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      societyData.weeklyProgress >= 80 ? 'bg-green-500' : 
                      societyData.weeklyProgress >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${societyData.weeklyProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-green-400 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              
              {/* Status Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-green-900 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                    {societyData.status === 'good' ? (
                      <CheckCircle size={24} className="text-green-500" />
                    ) : societyData.status === 'warning' ? (
                      <AlertTriangle size={24} className="text-amber-500" />
                    ) : (
                      <XCircle size={24} className="text-red-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium">Current Status</p>
                  <p className={`text-xs ${
                    societyData.status === 'good' ? 'text-green-600' : 
                    societyData.status === 'warning' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {societyData.status === 'good' ? 'Good' : 
                     societyData.status === 'warning' ? 'Needs Improvement' : 'Poor'}
                  </p>
                </div>
                
                <div className="bg-white dark:bg-green-900 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                    <Zap size={24} className="text-amber-500" />
                  </div>
                  <p className="text-sm font-medium">Clean Streak</p>
                  <p className="text-xs text-amber-600">{societyData.streak} days</p>
                </div>
                
                <div className="bg-white dark:bg-green-900 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                    <Shield size={24} className="text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">Compliance Rate</p>
                  <p className="text-xs text-blue-600">{societyData.complianceRate}%</p>
                </div>
                
                <div className="bg-white dark:bg-green-900 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar size={24} className="text-purple-500" />
                  </div>
                  <p className="text-sm font-medium">Violations (Month)</p>
                  <p className="text-xs text-purple-600">{societyData.violationsThisMonth}</p>
                </div>
              </div>
            </motion.div>

            {/* Bin Cleanliness Heatmap */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Map className="mr-2" /> Bin Cleanliness Heatmap
                </h2>
                <div className="text-sm text-gray-500 dark:text-green-400">
                  Updated: Today, 11:30 AM
                </div>
              </div>
              
              <div className="bg-white dark:bg-green-900 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Nearby Societies</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                      <span className="text-xs">Good (&gt;80%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                      <span className="text-xs">Average (60-80%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                      <span className="text-xs">Poor (&lt;60%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {heatmapData.map(society => (
                    <div key={society.id} className={`border rounded-lg p-3 ${
                      society.id === 1 
                        ? 'border-2 border-green-500 bg-green-50 dark:bg-green-700' 
                        : 'border-gray-200 dark:border-green-600'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{society.name}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          society.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100' :
                          society.color === 'orange' ? 'bg-amber-100 text-amber-800 dark:bg-amber-600 dark:text-amber-100' :
                          'bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-100'
                        }`}>
                          {society.cleanliness}%
                        </div>
                      </div>
                      {society.id === 1 && (
                        <div className="mt-2 text-xs text-green-600 dark:text-green-300">
                          Your society • Rank #{societyData.cityRank}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <button className="text-green-600 dark:text-emerald-300 font-medium text-sm flex items-center justify-center mx-auto">
                  View Full City Map <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </motion.div>

            {/* Waste Reduction Challenges */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Target className="mr-2" /> Waste Reduction Challenges
                </h2>
                <div className="text-sm text-green-600 dark:text-emerald-300 font-medium">
                  {currentChallenges.length} Active
                </div>
              </div>
              
              <div className="space-y-4">
                {currentChallenges.map(challenge => (
                  <div key={challenge.id} className="bg-white dark:bg-green-900 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-green-400">{challenge.target}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-600 dark:text-amber-400 font-semibold">+{challenge.reward} pts</div>
                        <div className="text-xs text-gray-500 dark:text-green-500">{challenge.daysLeft} days left</div>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-green-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500" 
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-2 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-700 dark:text-green-200 rounded-lg text-sm font-medium transition-colors">
                      View Challenge Details
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Scan History with Penalty Breakdown */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Scan History & Penalty Breakdown</h2>
                <div className="flex items-center gap-2">
                  <Filter size={18} />
                  <select
                    value={filters.timeframe}
                    onChange={(e) => setFilters(prev => ({ ...prev, timeframe: e.target.value }))}
                    className="border border-gray-300 dark:border-green-600 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {scanHistory.map((scan, index) => (
                  <div key={index} className="bg-white dark:bg-green-900 rounded-xl overflow-hidden">
                    <div className={`flex items-center justify-between p-4 ${
                      scan.status === 'clean' ? 'bg-green-50 dark:bg-green-800' : 'bg-red-50 dark:bg-red-900'
                    }`}>
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-4 ${getStatusColor(scan.status)}`}>
                          {getStatusIcon(scan.status)}
                        </div>
                        <div>
                          <p className="font-medium">{formatDate(scan.date)}</p>
                          {scan.reason && (
                            <p className="text-sm text-gray-500 dark:text-green-400">{scan.reason}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className={`font-semibold ${scan.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {scan.points > 0 ? '+' : ''}{scan.points}
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-100 dark:border-green-700">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Compliance Rate: </span>
                          <span className={scan.compliance >= '90%' ? 'text-green-600' : 'text-amber-600'}>
                            {scan.compliance}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Violations: </span>
                          <span>{scan.violations || 'None'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-center text-green-600 dark:text-emerald-300 font-medium text-sm">
                View Full History <ChevronRight size={16} className="inline" />
              </button>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-6">How Our System Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-green-900 p-5 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 dark:bg-green-700 p-2 rounded-lg mr-3">
                      <Scan size={24} className="text-green-600 dark:text-emerald-300" />
                    </div>
                    <h3 className="font-semibold">Society-Level Scanning</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-green-400">
                    Waste workers scan the society bin QR code only. Points are awarded or deducted at the community level based on segregation quality.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-green-900 p-5 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-lg mr-3">
                      <Star size={24} className="text-amber-600 dark:text-amber-300" />
                    </div>
                    <h3 className="font-semibold">Individual Recognition</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-green-400">
                    Through random spot checks and optional photo uploads, compliant households get recognized as Star Segregators.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-green-900 p-5 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg mr-3">
                      <Award size={24} className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="font-semibold">Collective Rewards</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-green-400">
                    As your society accumulates points, everyone benefits from community rewards like tax rebates and infrastructure upgrades.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-green-900 p-5 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg mr-3">
                      <BarChart3 size={24} className="text-purple-600 dark:text-purple-300" />
                    </div>
                    <h3 className="font-semibold">Transparent Reporting</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-green-400">
                    See exactly when and why points were lost, and how many households were compliant versus non-compliant.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Rewards, Star Segregators, and Additional Features */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Rewards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Community Rewards</h2>
                <Gift className="text-amber-500" />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress to Next Reward</span>
                  <span className="text-sm text-green-600 dark:text-emerald-300">
                    {societyData.score}/10,000 pts
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-green-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(societyData.score / 10000) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-4">
                {communityRewards.map(reward => (
                  <div 
                    key={reward.id} 
                    className={`p-4 rounded-xl border ${
                      reward.unlocked 
                        ? 'bg-green-100 dark:bg-green-700 border-green-300 dark:border-green-500' 
                        : 'bg-white dark:bg-green-900 border-gray-200 dark:border-green-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-semibold ${
                        reward.unlocked 
                          ? 'text-green-700 dark:text-emerald-300' 
                          : 'text-gray-700 dark:text-green-200'
                      }`}>
                        {reward.title}
                      </h3>
                      {reward.unlocked ? (
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-green-800 text-gray-600 dark:text-green-300 rounded text-xs font-medium">
                          {reward.points} pts
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-green-400 mb-2">{reward.description}</p>
                    {reward.unlocked && (
                      <p className="text-xs text-green-600 dark:text-emerald-300 font-medium">
                        Unlocked! Contact RWA to claim.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Rewards Store */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">🛒 Community Rewards Store</h2>
                <Gift className="text-green-500" />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-green-400 mb-4">
                Redeem your society's points for these community benefits
              </p>
              
              <div className="space-y-4">
                {rewardsStore.map(reward => (
                  <div key={reward.id} className="bg-white dark:bg-green-900 p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{reward.title}</h3>
                      <span className="px-2 py-1 bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300 rounded text-xs font-medium">
                        {reward.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-green-400 mb-3">{reward.description}</p>
                    <button className="w-full py-2 bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 text-green-700 dark:text-green-200 rounded-lg text-sm font-medium transition-colors">
                      Redeem for Community
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Star Segregators with Streaks */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">🌟 Star Segregators</h2>
                <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium">
                  <Zap size={16} className="mr-1" />
                  Streak Leaders
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-green-400 mb-4">
                Recognized for excellent waste segregation and maintaining streaks
              </p>
              
              <div className="space-y-4">
                {starSegregators.map((segregator, index) => (
                  <div key={segregator.id} className="flex items-center p-4 bg-white dark:bg-green-900 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center mr-3">
                      {index === 0 ? <Crown size={18} className="text-amber-500" /> : <Star size={18} className="text-amber-500" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{segregator.name}</h3>
                      <div className="flex items-center text-xs text-gray-500 dark:text-green-400">
                        <span className="mr-3">{segregator.points} pts</span>
                        <span className="flex items-center">
                          <Zap size={12} className="mr-1" />
                          {segregator.streak} days
                        </span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 dark:bg-green-700 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full bg-amber-500" 
                          style={{ width: `${(segregator.streak % 30) / 30 * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        {segregator.daysToNextMilestone} days to next milestone
                      </div>
                    </div>
                    <Award size={20} className="text-amber-500" />
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-center text-green-600 dark:text-emerald-300 font-medium text-sm">
                How to Get Featured <ChevronRight size={16} className="inline" />
              </button>
            </motion.div>

            {/* Penalty Transparency */}
<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeIn}
  className="bg-red-50 dark:bg-red-900 rounded-2xl p-6 shadow-xl border border-red-200 dark:border-red-700"
>
  {/* Header with Warning */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-bold text-red-700 dark:text-red-300 flex items-center">
      <AlertTriangle className="mr-2 text-red-600 dark:text-red-400" size={22} />
      Penalty & Violations
    </h2>
    <Info className="text-red-500 dark:text-red-300" />
  </div>

  {/* Last Contamination Warning */}
  {societyData.lastContamination && (
    <div className="bg-white dark:bg-red-800 p-4 rounded-xl mb-4 border-l-4 border-red-600">
      <div className="flex items-center mb-2">
        <XCircle size={20} className="text-red-600 mr-2" />
        <h3 className="font-semibold text-red-700 dark:text-red-300">
          Last Contamination Incident
        </h3>
      </div>
      <p className="text-sm text-gray-700 dark:text-red-200 mb-1">
        {new Date(societyData.lastContamination).toLocaleDateString('en-IN', { 
          weekday: 'long',
          day: 'numeric', 
          month: 'long',
          year: 'numeric'
        })}
      </p>
      <p className="text-sm text-red-700 dark:text-red-200 font-medium">
        🚫 Mixed waste contamination detected in society bins.
        This caused a <strong>–20 points penalty for the society</strong>.
      </p>
    </div>
  )}

  {/* Penalty Breakdown */}
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">Clean Scan Points</span>
      <span className="text-sm text-green-600 dark:text-green-300 font-bold">+10 pts</span>
    </div>
    
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">Minor Contamination</span>
      <span className="text-sm text-amber-600 dark:text-amber-400 font-bold">-5 pts</span>
    </div>
    
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">Major Contamination</span>
      <span className="text-sm text-red-600 dark:text-red-400 font-bold">-20 pts</span>
    </div>
    
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">Repeat Offense</span>
      <span className="text-sm text-red-700 dark:text-red-300 font-bold">Double Penalty ❗</span>
    </div>
  </div>

  {/* Impact Message + Whistleblower */}
  <div className="mt-5 pt-4 border-t border-red-300 dark:border-red-600">
    <p className="text-sm text-red-700 dark:text-red-300 mb-3 font-medium">
      ⚠️ Remember: One contaminated bin affects <strong>all households</strong>.  
      Society loses rewards, and fines may apply. Let’s keep it clean together.
    </p>
    <button 
      onClick={handleWhistleblowerReport}
      className="w-full flex items-center justify-center py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-md"
    >
      <Flag size={16} className="mr-2" />
      Report Violation Anonymously
    </button>
  </div>
</motion.div>


            {/* Monthly Report Download */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Monthly Eco-Report</h2>
                <BarChart3 className="text-blue-500" />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-green-400 mb-4">
                Download your society's detailed waste management performance report
              </p>
              
              <div className="bg-white dark:bg-green-900 p-4 rounded-xl mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">October 2023 Report</span>
                  <div className="px-2 py-1 bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                    Ready
                  </div>
                </div>
                <ul className="text-sm text-gray-600 dark:text-green-400 space-y-1">
                  <li className="flex items-center">
                    <TrendingUpIcon size={14} className="mr-2 text-green-500" />
                    <span>15% improvement from September</span>
                  </li>
                  <li className="flex items-center">
                    <Users size={14} className="mr-2 text-blue-500" />
                    <span>92% household participation rate</span>
                  </li>
                  <li className="flex items-center">
                    <Target size={14} className="mr-2 text-amber-500" />
                    <span>65 kgs of waste diverted from landfill</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={downloadMonthlyReport}
                className="w-full flex items-center justify-center py-3 bg-green-600 hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download size={18} className="mr-2" />
                Download Report (PDF)
              </button>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white"
            >
              <h2 className="text-xl font-semibold mb-3">Share Your Success!</h2>
              <p className="mb-4">
                Post your society's achievements on social media and inspire others to improve their waste management.
              </p>
              <div className="flex space-x-3">
                <button className="flex-1 py-2 bg-white text-green-600 rounded-lg font-medium">
                  Share
                </button>
                <button className="flex-1 py-2 bg-green-800 hover:bg-green-900 text-white rounded-lg font-medium">
                  Invite Neighbors
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityImpact;
                    
                   