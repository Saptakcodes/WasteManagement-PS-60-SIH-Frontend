import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ClipboardList, 
  MapPin, 
  Gift, 
  TrendingUp, 
  Clock,
  AlertCircle,
  BookOpen,
  CheckCircle,
  XCircle,
  Play,
  HelpCircle,
  Star,
  Target,
  Award,
  Calendar,
  User,
  Trash2,
  Droplets,
  Biohazard,
  Truck,
  Bell,
  Shield,
  Coins,
  Zap,
  BarChart3,
  RefreshCw
} from 'lucide-react';

const WorkerDashboard = () => {
  // Mock data for the dashboard
  const [workerData, setWorkerData] = useState({
    name: 'Rajesh Kumar',
    role: 'Sanitation Worker',
    area: 'Ward 12, Sector 5',
    team: 'Dry Waste Collection',
    tasks: {
      assigned: 18,
      completed: 12,
      type: 'Dry Waste Collection',
      efficiency: 85
    },
    attendance: {
      status: 'Present',
      checkIn: '08:15 AM',
      checkOut: '--:--',
      marked: true,
      late: false
    },
    route: {
      name: 'Central City Route',
      stops: [
        {name: 'MG Road', households: 25, completed: 25, type: 'dry'},
        {name: 'Gandhi Nagar', households: 18, completed: 12, type: 'dry'},
        {name: 'Nehru Colony', households: 32, completed: 0, type: 'wet'},
        {name: 'Market Square', households: 42, completed: 0, type: 'commercial'}
      ],
      nextStop: 'Gandhi Nagar',
      progress: 45
    },
    complaints: {
      reportedToday: 3,
      resolved: 2,
      pending: 1
    },
    training: {
      progress: 65,
      nextModule: 'Waste Segregation Basics',
      dueDate: 'Tomorrow'
    },
    rewards: {
      points: 1250,
      badges: ['Eco Warrior', 'Punctuality Star', 'Safety First'],
      rank: 12,
      incentives: 350,
      nextMilestone: 1500
    },
    performance: {
      weeklyTasks: 32,
      punctuality: 92,
      feedback: 4.5,
      efficiency: 88
    },
    wasteStats: {
      dry: { collected: 120, units: 'kg', target: 150 },
      wet: { collected: 85, units: 'kg', target: 100 },
      hazardous: { collected: 5, units: 'kg', target: 10 },
      recycled: { collected: 45, units: 'kg', target: 50 }
    },
    equipment: {
      status: 'Good',
      issues: 0,
      lastMaintenance: '3 days ago'
    },
    safety: {
      incidents: 0,
      daysSinceIncident: 125,
      gearStatus: 'Complete'
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Toggle dark/light mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Function to mark attendance
  const markAttendance = (type) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (type === 'checkin') {
      setWorkerData({
        ...workerData,
        attendance: {
          status: 'Present',
          checkIn: currentTime,
          checkOut: '--:--',
          marked: true,
          late: currentTime > '08:30 AM' // Simple late check
        }
      });
    } else if (type === 'checkout') {
      setWorkerData({
        ...workerData,
        attendance: {
          ...workerData.attendance,
          checkOut: currentTime
        }
      });
      setShowCheckoutModal(false);
    }
  };

  // Function to update task completion
  const updateTaskCompletion = (stopIndex, completed) => {
    const updatedStops = [...workerData.route.stops];
    updatedStops[stopIndex].completed = completed;
    
    // Calculate total progress
    const totalHouseholds = updatedStops.reduce((sum, stop) => sum + stop.households, 0);
    const completedHouseholds = updatedStops.reduce((sum, stop) => sum + stop.completed, 0);
    const progress = Math.round((completedHouseholds / totalHouseholds) * 100);
    
    setWorkerData({
      ...workerData,
      route: {
        ...workerData.route,
        stops: updatedStops,
        progress: progress
      },
      tasks: {
        ...workerData.tasks,
        completed: Math.round((completedHouseholds / totalHouseholds) * workerData.tasks.assigned)
      }
    });
  };

  // Function to complete a stop
  const completeStop = (stopIndex) => {
    const updatedStops = [...workerData.route.stops];
    updatedStops[stopIndex].completed = updatedStops[stopIndex].households;
    
    // If this was the next stop, move to the next one
    let nextStopIndex = stopIndex + 1;
    if (nextStopIndex >= updatedStops.length) nextStopIndex = 0; // Loop back to start
    
    setWorkerData({
      ...workerData,
      route: {
        ...workerData.route,
        stops: updatedStops,
        nextStop: updatedStops[nextStopIndex]?.name || 'Completed',
        progress: Math.round((updatedStops.reduce((sum, stop) => sum + stop.completed, 0) / 
          updatedStops.reduce((sum, stop) => sum + stop.households, 0)) * 100)
      },
      tasks: {
        ...workerData.tasks,
        completed: updatedStops.reduce((sum, stop) => sum + stop.completed, 0)
      }
    });
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Dark Mode Toggle
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Waste Management Dashboard</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div> */}

        {/* Welcome Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className={`rounded-xl p-6 mb-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className={`rounded-full p-3 mr-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                <User className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Good Morning, {workerData.name}!</h1>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {workerData.role} • {workerData.team} • {workerData.area}
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`px-4 py-2 rounded-full font-semibold ${isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}
            >
              <Target className="inline-block mr-2 h-5 w-5" />
              Let's keep the city clean today!
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className={`flex mb-6 rounded-lg p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          {['overview', 'route', 'performance', 'rewards'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-center font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
                  : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Today's Work Overview Card */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <ClipboardList className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h2 className="text-lg font-semibold">Today's Work Overview</h2>
                </div>
                
                <div className={`mb-4 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <span className="font-medium">Work Type:</span>
                  <span className={`ml-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{workerData.tasks.type}</span>
                </div>
                
                <div className="mb-2 flex justify-between">
                  <span>Task Completion</span>
                  <span>{workerData.tasks.completed}/{workerData.tasks.assigned}</span>
                </div>
                
                <div className={`w-full h-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(workerData.tasks.completed / workerData.tasks.assigned) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${workerData.tasks.completed === workerData.tasks.assigned ? 'bg-green-500' : 'bg-blue-500'}`}
                  />
                </div>
                
                <div className="mt-3 flex justify-between">
                  <span>Efficiency:</span>
                  <span className="font-semibold text-green-500">{workerData.tasks.efficiency}%</span>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-3 text-sm"
                >
                  {workerData.tasks.completed === workerData.tasks.assigned ? (
                    <span className="text-green-500 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> All tasks completed! Great job!
                    </span>
                  ) : (
                    <span className="text-blue-500">Keep going! You're making progress!</span>
                  )}
                </motion.div>
              </motion.div>

              {/* Attendance & Check-in Status */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <Clock className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h2 className="text-lg font-semibold">Attendance Status</h2>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Status:</span>
                    <span className={`font-semibold ${
                      workerData.attendance.status === 'Present' ? 'text-green-500' : 
                      workerData.attendance.status === 'Late' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {workerData.attendance.status} {workerData.attendance.late ? '(Late)' : ''}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Check-in:</span>
                    <span>{workerData.attendance.checkIn}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{workerData.attendance.checkOut}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {!workerData.attendance.marked ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => markAttendance('checkin')}
                      className="py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center justify-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Check In
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`py-2 text-center rounded-lg ${isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}
                    >
                      Checked In
                    </motion.div>
                  )}
                  
                  {workerData.attendance.marked && workerData.attendance.checkOut === '--:--' ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCheckoutModal(true)}
                      className="py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center justify-center"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Check Out
                    </motion.button>
                  ) : workerData.attendance.checkOut !== '--:--' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`py-2 text-center rounded-lg ${isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`}
                    >
                      Checked Out
                    </motion.div>
                  ) : null}
                </div>
              </motion.div>

              {/* Waste Collection Stats */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <Trash2 className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <h2 className="text-lg font-semibold">Waste Collection Stats</h2>
                </div>
                
                <div className="space-y-3">
                  {/* Dry Waste */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="flex items-center">
                        <Shield className="h-4 w-4 mr-1 text-blue-500" />
                        Dry Waste
                      </span>
                      <span>{workerData.wasteStats.dry.collected}/{workerData.wasteStats.dry.target} {workerData.wasteStats.dry.units}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full rounded-full bg-blue-500" 
                        style={{ width: `${(workerData.wasteStats.dry.collected / workerData.wasteStats.dry.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Wet Waste */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="flex items-center">
                        <Droplets className="h-4 w-4 mr-1 text-green-500" />
                        Wet Waste
                      </span>
                      <span>{workerData.wasteStats.wet.collected}/{workerData.wasteStats.wet.target} {workerData.wasteStats.wet.units}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full rounded-full bg-green-500" 
                        style={{ width: `${(workerData.wasteStats.wet.collected / workerData.wasteStats.wet.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Hazardous Waste */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="flex items-center">
                        <Biohazard className="h-4 w-4 mr-1 text-red-500" />
                        Hazardous
                      </span>
                      <span>{workerData.wasteStats.hazardous.collected}/{workerData.wasteStats.hazardous.target} {workerData.wasteStats.hazardous.units}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full rounded-full bg-red-500" 
                        style={{ width: `${(workerData.wasteStats.hazardous.collected / workerData.wasteStats.hazardous.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Recycled */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="flex items-center">
                        <RefreshCw className="h-4 w-4 mr-1 text-yellow-500" />
                        Recycled
                      </span>
                      <span>{workerData.wasteStats.recycled.collected}/{workerData.wasteStats.recycled.target} {workerData.wasteStats.recycled.units}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full rounded-full bg-yellow-500" 
                        style={{ width: `${(workerData.wasteStats.recycled.collected / workerData.wasteStats.recycled.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Equipment Status */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <Truck className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <h2 className="text-lg font-semibold">Equipment Status</h2>
                </div>
                
                <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                  <div className="flex justify-between items-center">
                    <span>Overall Status:</span>
                    <span className={`font-semibold ${
                      workerData.equipment.status === 'Good' ? 'text-green-500' : 
                      workerData.equipment.status === 'Needs Attention' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {workerData.equipment.status}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Reported Issues:</span>
                    <span>{workerData.equipment.issues}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Last Maintenance:</span>
                    <span>{workerData.equipment.lastMaintenance}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white rounded-lg font-medium`}
                >
                  Report Equipment Issue
                </motion.button>
              </motion.div>

              {/* Safety Status */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <Shield className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <h2 className="text-lg font-semibold">Safety Status</h2>
                </div>
                
                <div className="text-center mb-4">
                  <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                    {workerData.safety.daysSinceIncident}
                  </div>
                  <div>Days Since Last Incident</div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Safety Gear:</span>
                    <span className={`font-semibold ${
                      workerData.safety.gearStatus === 'Complete' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {workerData.safety.gearStatus}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Incidents This Month:</span>
                    <span className={workerData.safety.incidents > 0 ? 'text-red-500' : 'text-green-500'}>
                      {workerData.safety.incidents}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg font-medium`}
                >
                  View Safety Guidelines
                </motion.button>
              </motion.div>

              {/* Rewards Preview */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <Gift className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <h2 className="text-lg font-semibold">Rewards & Incentives</h2>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                    {workerData.rewards.points}
                  </div>
                  <div className="ml-2">points</div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Earned Incentives:</h3>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                    <div className="flex justify-between">
                      <span>This Month:</span>
                      <span className="font-semibold">₹{workerData.rewards.incentives}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Next Milestone:</h3>
                  <div className="flex justify-between mb-1">
                    <span>Progress:</span>
                    <span>{workerData.rewards.points}/{workerData.rewards.nextMilestone}</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full rounded-full bg-yellow-500" 
                      style={{ width: `${(workerData.rewards.points / workerData.rewards.nextMilestone) * 100}%` }}
                    />
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('rewards')}
                  className={`w-full py-2 ${isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded-lg font-medium`}
                >
                  View All Rewards
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'route' && (
            <motion.div
              key="route"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Route Information Card */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <MapPin className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                  <h2 className="text-lg font-semibold">Route Information</h2>
                </div>
                
                <div className={`mb-4 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <span className="font-medium">Assigned Route:</span>
                  <span className="ml-2">{workerData.route.name}</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Route Progress:</span>
                    <span>{workerData.route.progress}%</span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full rounded-full bg-blue-500" 
                      style={{ width: `${workerData.route.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Stops:</h3>
                  <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {workerData.route.stops.map((stop, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className={`flex items-center justify-between p-3 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} ${stop.name === workerData.route.nextStop ? 'border-2 border-blue-500' : ''}`}
                      >
                        <div className="flex items-center">
                          {stop.name === workerData.route.nextStop ? (
                            <Play className="h-5 w-5 mr-2 text-blue-500" />
                          ) : (
                            <div className={`h-5 w-5 rounded-full mr-2 flex items-center justify-center ${
                              stop.completed === stop.households ? 'bg-green-500 text-white' : 
                              stop.completed > 0 ? 'bg-yellow-500 text-white' : 'bg-gray-300'
                            }`}>
                              {stop.completed === stop.households ? <CheckCircle size={14} /> : stop.completed > 0 ? '!' : index + 1}
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{stop.name}</div>
                            <div className="text-sm flex items-center">
                              <span className={`inline-block h-3 w-3 rounded-full mr-1 ${
                                stop.type === 'dry' ? 'bg-blue-500' :
                                stop.type === 'wet' ? 'bg-green-500' :
                                stop.type === 'hazardous' ? 'bg-red-500' : 'bg-purple-500'
                              }`}></span>
                              {stop.type} waste
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="mr-3">{stop.completed}/{stop.households} households</span>
                          {stop.name === workerData.route.nextStop ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => completeStop(index)}
                              className={`py-1 px-3 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-sm`}
                            >
                              Start
                            </motion.button>
                          ) : stop.completed < stop.households ? (
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => updateTaskCompletion(index, Math.max(0, stop.completed - 1))}
                                className={`h-6 w-6 rounded flex items-center justify-center ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                              >
                                -
                              </button>
                              <button 
                                onClick={() => updateTaskCompletion(index, Math.min(stop.households, stop.completed + 1))}
                                className={`h-6 w-6 rounded flex items-center justify-center ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <CheckCircle className="text-green-500" />
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium`}
                >
                  View Full Route Map
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Performance Summary */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <TrendingUp className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <h2 className="text-lg font-semibold">Performance Summary</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                    <div className="text-2xl font-bold text-green-500">{workerData.performance.weeklyTasks}</div>
                    <div>Tasks Completed This Week</div>
                  </div>
                  
                  <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <div className="text-2xl font-bold text-blue-500">{workerData.performance.punctuality}%</div>
                    <div>Punctuality Score</div>
                  </div>
                  
                  <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                    <div className="text-2xl font-bold text-yellow-500">{workerData.performance.feedback}/5</div>
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(workerData.performance.feedback) ? 'fill-yellow-500 text-yellow-500' : 'text-yellow-500'}`}
                        />
                      ))}
                    </div>
                    <div>Citizen Feedback Rating</div>
                  </div>
                  
                  <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                    <div className="text-2xl font-bold text-purple-500">{workerData.performance.efficiency}%</div>
                    <div>Efficiency Score</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Weekly Performance Trend</h3>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} h-40 flex items-end justify-between`}>
                    {[65, 72, 80, 75, 85, 88, 92].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className={`w-8 rounded-t ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
                          style={{ height: `${value}%` }}
                        ></div>
                        <div className="text-xs mt-1">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className="font-medium mb-2">Areas of Strength</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li className="text-green-500">Punctuality</li>
                      <li className="text-green-500">Safety compliance</li>
                      <li className="text-green-500">Citizen feedback</li>
                    </ul>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className="font-medium mb-2">Areas for Improvement</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li className="text-yellow-500">Hazardous waste handling</li>
                      <li className="text-yellow-500">Equipment maintenance reporting</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Rewards & Incentives Card */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`rounded-xl p-5 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <Gift className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <h2 className="text-lg font-semibold">Rewards & Incentives</h2>
                </div>
                
                <div className="flex items-center justify-center mb-6">
                  <div className={`text-4xl font-bold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                    {workerData.rewards.points}
                  </div>
                  <div className="ml-2 text-lg">points</div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Progress to Next Reward</h3>
                  <div className="flex justify-between mb-1">
                    <span>Next milestone at {workerData.rewards.nextMilestone} points</span>
                    <span>{workerData.rewards.points}/{workerData.rewards.nextMilestone}</span>
                  </div>
                  <div className={`w-full h-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full rounded-full bg-yellow-500" 
                      style={{ width: `${(workerData.rewards.points / workerData.rewards.nextMilestone) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Earned Incentives</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                      <div className="text-xl font-bold text-yellow-600">₹{workerData.rewards.incentives}</div>
                      <div className="text-sm">This Month</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                      <div className="text-xl font-bold text-yellow-600">₹1,250</div>
                      <div className="text-sm">Last Month</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                      <div className="text-xl font-bold text-yellow-600">₹4,850</div>
                      <div className="text-sm">This Year</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Badges Earned</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {workerData.rewards.badges.map((badge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-100'} border border-yellow-300`}
                      >
                        <Award className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`} />
                        <div className="font-medium">{badge}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Available Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="font-medium mb-1">Gift Voucher</div>
                      <div className="text-sm mb-2">₹500 shopping voucher</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">1,000 points</span>
                        <button className={`py-1 px-3 rounded text-sm ${workerData.rewards.points >= 1000 ? (isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')} text-white`} disabled={workerData.rewards.points < 1000}>
                          Redeem
                        </button>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="font-medium mb-1">Bonus Incentive</div>
                      <div className="text-sm mb-2">₹1,000 cash bonus</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">2,000 points</span>
                        <button className={`py-1 px-3 rounded text-sm ${workerData.rewards.points >= 2000 ? (isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')} text-white`} disabled={workerData.rewards.points < 2000}>
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <div className="flex justify-between">
                    <span>Leaderboard Rank:</span>
                    <span className="font-semibold">#{workerData.rewards.rank} out of 150 workers</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          className={`rounded-xl p-5 shadow-lg mt-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 rounded-lg font-medium flex flex-col items-center justify-center ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
              <AlertCircle className="h-6 w-6 mb-1" />
              Report Complaint
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 rounded-lg font-medium flex flex-col items-center justify-center ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              <Play className="h-6 w-6 mb-1" />
              Start Task
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 rounded-lg font-medium flex flex-col items-center justify-center ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
            >
              <BookOpen className="h-6 w-6 mb-1" />
              Training
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 rounded-lg font-medium flex flex-col items-center justify-center ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              <HelpCircle className="h-6 w-6 mb-1" />
              Helpdesk
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCheckoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-xl p-6 max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Check Out for the Day</h3>
              <p className="mb-4">Are you sure you want to check out? This will complete your workday.</p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className={`flex-1 py-2 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => markAttendance('checkout')}
                  className={`flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium`}
                >
                  Check Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkerDashboard;