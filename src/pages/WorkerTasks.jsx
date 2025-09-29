import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, CheckCircle, AlertCircle, 
  Trophy, Award, Calendar, Clock4, 
  User, Shield, Phone, Wifi, WifiOff,
  Star, TrendingUp, Bell, Map,
  Menu, X, ChevronDown, ChevronUp
} from 'lucide-react';

const WorkerTasks = () => {
  // State management (unchanged)
  const [userRole, setUserRole] = useState('Dry Waste Collector');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [selectedTab, setSelectedTab] = useState('All');
  const [rewards, setRewards] = useState({ points: 0, badges: [] });
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showShiftSummary, setShowShiftSummary] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock data (unchanged)
  const taskData = {
    'Dry Waste Collector': [
      { id: 1, type: 'Dry Waste', location: 'Sector 15 Market', priority: 'High', estimatedTime: '45 mins', status: 'Pending', notes: 'Cardboard boxes accumulation', coordinates: { lat: 28.6129, lng: 77.2295 } },
      { id: 2, type: 'Dry Waste', location: 'Central Park Area', priority: 'Normal', estimatedTime: '30 mins', status: 'Pending', notes: 'Regular collection', coordinates: { lat: 28.6145, lng: 77.2275 } },
      { id: 3, type: 'Dry Waste', location: 'Residential Block B', priority: 'Urgent', estimatedTime: '60 mins', status: 'Pending', notes: 'Construction debris reported', coordinates: { lat: 28.6132, lng: 77.2312 } }
    ],
    'Wet Waste Collector': [
      { id: 4, type: 'Wet Waste', location: 'Food Court Zone', priority: 'High', estimatedTime: '50 mins', status: 'Pending', notes: 'Food waste buildup', coordinates: { lat: 28.6120, lng: 77.2300 } },
      { id: 5, type: 'Wet Waste', location: 'Restaurant Row', priority: 'Normal', estimatedTime: '40 mins', status: 'Pending', notes: 'Daily collection', coordinates: { lat: 28.6130, lng: 77.2280 } }
    ],
    'Hazardous Waste Collector': [
      { id: 6, type: 'Hazardous Waste', location: 'Hospital Road', priority: 'Urgent', estimatedTime: '75 mins', status: 'Pending', notes: 'Medical waste disposal', coordinates: { lat: 28.6150, lng: 77.2250 } },
      { id: 7, type: 'Hazardous Waste', location: 'Industrial Area', priority: 'High', estimatedTime: '90 mins', status: 'Pending', notes: 'Chemical containers', coordinates: { lat: 28.6160, lng: 77.2220 } }
    ],
    'General': [
      { id: 8, type: 'Mixed Waste', location: 'City Center', priority: 'Normal', estimatedTime: '60 mins', status: 'Pending', notes: 'General cleanup', coordinates: { lat: 28.6110, lng: 77.2320 } }
    ]
  };

  // Mock route data (unchanged)
  const routeData = [
    { id: 1, location: 'Sector 15 Market', status: 'pending', order: 1 },
    { id: 2, location: 'Central Park Area', status: 'pending', order: 2 },
    { id: 3, location: 'Residential Block B', status: 'pending', order: 3 },
    { id: 4, location: 'Food Court Zone', status: 'pending', order: 4 },
    { id: 5, location: 'Hospital Road', status: 'pending', order: 5 }
  ];

  // Mock complaints data (unchanged)
  const complaintsData = [
    { id: 1, location: 'Sector 15 Market', description: 'Bin overflowing with cardboard', status: 'open', taskId: 1 },
    { id: 2, location: 'Central Park Area', description: 'Plastic bottles littered around bin', status: 'open', taskId: 2 }
  ];

  // Initialize data (unchanged)
  useEffect(() => {
    setTasks(taskData[userRole] || []);
    setFilteredTasks(taskData[userRole] || []);
    
    setAttendance({
      today: { status: 'Not Marked', hours: 0 },
      weekly: { percentage: 0, daysPresent: 0 },
      monthly: { percentage: 0, daysPresent: 0 }
    });
    
    setRewards({
      points: 1250,
      badges: ['First Day', 'Safety First', '5 Day Streak', 'Efficiency Expert'],
      todayPoints: 0
    });
    
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [userRole]);

  // Filter tasks based on selected tab (unchanged)
  useEffect(() => {
    if (selectedTab === 'All') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === selectedTab));
    }
  }, [selectedTab, tasks]);

  // Handle check-in (unchanged)
  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setAttendance(prev => ({
      ...prev,
      today: { ...prev.today, status: 'Checked In', checkInTime: now }
    }));
  };

  // Handle check-out (unchanged)
  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    
    const hoursWorked = checkInTime 
      ? ((now - checkInTime) / (1000 * 60 * 60)).toFixed(1)
      : 0;
    
    setAttendance(prev => ({
      ...prev,
      today: { 
        ...prev.today, 
        status: 'Checked Out', 
        checkOutTime: now,
        hours: hoursWorked
      }
    }));
    
    setShowShiftSummary(true);
  };

  // Update task status (unchanged)
  const updateTaskStatus = (taskId, status) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    );
    
    setTasks(updatedTasks);
    
    if (status === 'Completed') {
      setRewards(prev => ({
        ...prev,
        points: prev.points + 50,
        todayPoints: prev.todayPoints + 50
      }));
    }
  };

  // Mark route stop as completed (unchanged)
  const completeRouteStop = (stopId) => {
    console.log(`Stop ${stopId} completed`);
  };

  // Resolve complaint (unchanged)
  const resolveComplaint = (complaintId) => {
    console.log(`Complaint ${complaintId} resolved`);
  };

  // Toggle language (unchanged)
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  // Toggle dropdown (unchanged)
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Get safety tip based on role (unchanged)
  const getSafetyTip = () => {
    switch(userRole) {
      case 'Wet Waste Collector':
        return 'Wear gloves and boots to avoid contamination';
      case 'Hazardous Waste Collector':
        return 'Ensure full PPE is worn at all times';
      default:
        return 'Use protective gear and stay hydrated';
    }
  };

  // Render priority badge - UPDATED FOR BETTER VISIBILITY
  const renderPriorityBadge = (priority) => {
    const priorityClasses = {
      'Normal': 'bg-blue-100 text-blue-800 border border-blue-300',
      'High': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      'Urgent': 'bg-red-100 text-red-800 border border-red-300'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority]}`}>
        {priority}
      </span>
    );
  };

  // Render status badge - UPDATED FOR BETTER VISIBILITY
  const renderStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'bg-gray-100 text-gray-800 border border-gray-300',
      'In Progress': 'bg-blue-100 text-blue-800 border border-blue-300',
      'Completed': 'bg-green-100 text-green-800 border border-green-300'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  // Format time (unchanged)
  const formatTime = (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800"> {/* Added text color */}
      {/* Mobile Header */}
      <header className="bg-green-600 text-white p-4 shadow-md lg:hidden">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">SwachhaSebak Worker</h1>
            <p className="text-green-100 text-sm">Together, we build a cleaner tomorrow!</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleLanguage}
              className="bg-green-700 hover:bg-green-800 px-2 py-1 rounded-md text-xs"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-green-700 text-white lg:hidden"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isOnline ? (
                    <Wifi className="text-green-300 mr-1" size={18} />
                  ) : (
                    <WifiOff className="text-yellow-300 mr-1" size={18} />
                  )}
                  <span className="text-sm">{isOnline ? 'Online' : 'Offline Mode'}</span>
                </div>
                <div className="text-sm">
                  <User className="inline mr-1" size={16} />
                  Rajesh
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-green-600 hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center">
                  <Calendar className="mr-1" size={16} />
                  Attendance
                </button>
                <button className="bg-green-600 hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center">
                  <AlertCircle className="mr-1" size={16} />
                  Complaints
                </button>
                <button className="bg-green-600 hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center">
                  <Trophy className="mr-1" size={16} />
                  Rewards
                </button>
                <button className="bg-green-600 hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center">
                  <Phone className="mr-1" size={16} />
                  Helpdesk
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Header */}
      <header className="bg-green-600 text-white p-4 shadow-md hidden lg:block">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">SwachhaSebak Worker Portal</h1>
            <p className="text-green-100">Together, we build a cleaner tomorrow!</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded-md text-sm"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            <div className="flex items-center">
              {isOnline ? (
                <Wifi className="text-green-300 mr-1" size={18} />
              ) : (
                <WifiOff className="text-yellow-300 mr-1" size={18} />
              )}
              <span className="text-sm">{isOnline ? 'Online' : 'Offline Mode'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Welcome Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <User className="mr-2" size={24} />
                Good Morning, Rajesh!
              </h2>
              <p className="text-gray-600 mt-1">{userRole}</p>
              <p className="text-gray-500 mt-2 flex items-center">
                <Calendar className="mr-1" size={16} />
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-gray-500 mt-1 flex items-center">
                <Clock4 className="mr-1" size={16} />
                Shift: 8:00 AM - 4:00 PM
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 bg-green-50 p-3 rounded-lg border border-green-200"> {/* Added border */}
              <p className="text-green-800 font-medium">Today's Motivation</p>
              <p className="text-green-600">"Your work makes our city healthier. Thank you!"</p>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Role Tabs - Mobile Dropdown */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="lg:hidden">
                <button 
                  onClick={() => toggleDropdown('role')}
                  className="w-full flex justify-between items-center bg-gray-100 p-3 rounded-md border border-gray-300" // Added border
                >
                  <span className="text-gray-800">Select Role: {userRole.replace(' Collector', '')}</span> {/* Added text color */}
                  {activeDropdown === 'role' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'role' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 bg-gray-50 rounded-md overflow-hidden border border-gray-300" // Added border
                    >
                      {['Dry Waste', 'Wet Waste', 'Hazardous Waste', 'General'].map(role => (
                        <button
                          key={role}
                          onClick={() => {
                            setUserRole(`${role} Collector`);
                            setActiveDropdown(null);
                          }}
                          className="block w-full text-left p-3 hover:bg-gray-200 text-gray-800" // Added text color
                        >
                          {role}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="hidden lg:flex flex-wrap gap-2">
                {['Dry Waste', 'Wet Waste', 'Hazardous Waste', 'General'].map(role => (
                  <button
                    key={role}
                    onClick={() => setUserRole(`${role} Collector`)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      userRole === `${role} Collector` 
                        ? 'bg-green-500 text-white border border-green-600' // Added border
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' // Added border
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Attendance Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="mr-2" size={20} />
                Attendance & Shift Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"> {/* Added border */}
                  <p className="text-gray-600">Today's Status</p>
                  <p className="text-lg font-medium mt-1 text-gray-800">{attendance.today?.status}</p> {/* Added text color */}
                  
                  <div className="mt-4 flex space-x-2">
                    {!checkInTime ? (
                      <button 
                        onClick={handleCheckIn}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center text-sm border border-green-600" // Added border
                      >
                        <CheckCircle className="mr-1" size={16} />
                        Check In
                      </button>
                    ) : !checkOutTime ? (
                      <button 
                        onClick={handleCheckOut}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center text-sm border border-blue-600" // Added border
                      >
                        Check Out
                      </button>
                    ) : null}
                  </div>
                  
                  {checkInTime && (
                    <p className="text-sm text-gray-500 mt-3">
                      Checked in at: {formatTime(checkInTime)}
                    </p>
                  )}
                  
                  {checkOutTime && (
                    <p className="text-sm text-gray-500 mt-1">
                      Checked out at: {formatTime(checkOutTime)}
                    </p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"> {/* Added border */}
                  <p className="text-gray-600">Hours Worked Today</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {attendance.today?.hours || 0} hrs
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Weekly Attendance</p>
                      <p className="text-sm font-medium text-gray-800">{attendance.weekly?.percentage || 0}%</p> {/* Added text color */}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Monthly Attendance</p>
                      <p className="text-sm font-medium text-gray-800">{attendance.monthly?.percentage || 0}%</p> {/* Added text color */}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Tasks List */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-lg font-semibold mb-2 md:mb-0">Assigned Tasks</h3>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Pending', 'In Progress', 'Completed'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        selectedTab === tab
                          ? 'bg-green-500 text-white border-green-600' // Added border
                          : 'bg-gray-100 text-gray-700 border-gray-300' // Added border
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredTasks.map(task => (
                    <motion.div 
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white" // Added bg color
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-start">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-medium text-gray-800">Task #{task.id}</span> {/* Added text color */}
                            <span className="hidden md:inline text-gray-400">•</span>
                            {renderPriorityBadge(task.priority)}
                            <span className="hidden md:inline text-gray-400">•</span>
                            {renderStatusBadge(task.status)}
                          </div>
                          
                          <div className="mt-2 flex items-center text-gray-600">
                            <MapPin size={14} className="mr-1 flex-shrink-0" />
                            <span className="text-sm truncate">{task.location}</span>
                            <a 
                              href={`https://maps.google.com/?q=${task.coordinates.lat},${task.coordinates.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 text-sm ml-2 whitespace-nowrap"
                            >
                              (View Map)
                            </a>
                          </div>
                          
                          <div className="mt-2 flex items-center text-gray-600">
                            <Clock size={14} className="mr-1" />
                            <span className="text-sm">Est. Time: {task.estimatedTime}</span>
                          </div>
                          
                          {task.notes && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Notes:</span> {task.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 md:ml-4 w-full md:w-auto justify-end">
                          {task.status === 'Pending' && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'In Progress')}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs whitespace-nowrap border border-blue-600" // Added border
                            >
                              Start Task
                            </button>
                          )}
                          
                          {task.status === 'In Progress' && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'Completed')}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs whitespace-nowrap border border-green-600" // Added border
                            >
                              Mark Completed
                            </button>
                          )}
                          
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs whitespace-nowrap border border-gray-300"> {/* Added border */}
                            Report Issue
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No tasks found for the selected filter.
                  </div>
                )}
              </div>
            </motion.section>

            {/* Complaints Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertCircle className="mr-2" size={20} />
                Citizen Complaints in Your Area
              </h3>
              
              <div className="space-y-4">
                {complaintsData.map(complaint => (
                  <div key={complaint.id} className="border rounded-lg p-4 bg-white"> {/* Added bg color */}
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">Complaint #{complaint.id}</div> {/* Added text color */}
                        <div className="mt-1 text-sm text-gray-600 flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {complaint.location}
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{complaint.description}</p> {/* Added text color */}
                      </div>
                      
                      <button 
                        onClick={() => resolveComplaint(complaint.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs h-fit mt-4 md:mt-0 md:ml-4 border border-green-600" // Added border
                      >
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                ))}
                
                {complaintsData.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No active complaints in your area.
                  </div>
                )}
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Route Management */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Map className="mr-2" size={20} />
                Today's Route
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"> {/* Added border */}
                <div className="mb-4 h-40 bg-gray-200 rounded flex items-center justify-center border border-gray-300"> {/* Added border */}
                  <span className="text-gray-500">Map Preview</span>
                </div>
                
                <div className="space-y-3">
                  {routeData.map(stop => (
                    <div key={stop.id} className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 border ${
                        stop.status === 'completed' ? 'bg-green-500 border-green-600' : 'bg-gray-300 border-gray-400' // Added border
                      }`}>
                        <span className="text-white text-xs">{stop.order}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{stop.location}</p> {/* Added text color */}
                      </div>
                      <button 
                        onClick={() => completeRouteStop(stop.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs border border-green-600" // Added border
                      >
                        Complete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Performance Insights */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="mr-2" size={20} />
                Performance Insights
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"> {/* Added border */}
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Today's Progress</span>
                    <span className="font-medium text-gray-800">3/8 tasks</span> {/* Added text color */}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: '37.5%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Weekly Target</span>
                    <span className="font-medium text-gray-800">65%</span> {/* Added text color */}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-gray-600 mb-2">Punctuality Score</p>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-3 border border-green-200"> {/* Added border */}
                      <span className="text-green-600 font-bold text-xl">92%</span>
                    </div>
                    <p className="text-sm text-gray-600">You're on time 92% of shifts this month</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Rewards & Gamification */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="mr-2" size={20} />
                Rewards & Recognition
              </h3>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200"> {/* Added border */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600">Today's Points</p>
                    <p className="text-2xl font-bold text-yellow-600">{rewards.todayPoints}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Total Points</p>
                    <p className="text-2xl font-bold text-yellow-600">{rewards.points}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Badges Earned</p>
                  <div className="flex flex-wrap gap-2">
                    {rewards.badges.map(badge => (
                      <div key={badge} className="bg-white border border-yellow-300 rounded-full px-3 py-1 flex items-center">
                        <Award size={14} className="text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-800">{badge}</span> {/* Added text color */}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-yellow-200">
                  <p className="text-center text-sm text-yellow-600">
                    Complete 5 more tasks to earn the "Weekly Champion" badge!
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Health & Safety */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="mr-2" size={20} />
                Health & Safety
              </h3>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200"> {/* Added border */}
                <div className="mb-4">
                  <p className="font-medium text-blue-800">Safety Tip</p>
                  <p className="text-blue-600 mt-1">{getSafetyTip()}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="font-medium text-blue-800">Emergency Contact</p>
                  <div className="flex items-center mt-2">
                    <Phone size={16} className="text-blue-600 mr-2" />
                    <span className="text-blue-600">+91 1800-123-HELP</span>
                  </div>
                  <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm w-full border border-blue-700"> {/* Added border */}
                    Request Safety Support
                  </button>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Shift Summary Modal */}
      <AnimatePresence>
        {showShiftSummary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowShiftSummary(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Shift Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Tasks Completed:</span> {/* Added text color */}
                  <span className="font-medium text-gray-800">3/8</span> {/* Added text color */}
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-700">Points Earned:</span> {/* Added text color */}
                  <span className="font-medium text-yellow-600">150</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-700">Hours Worked:</span> {/* Added text color */}
                  <span className="font-medium text-gray-800">{attendance.today?.hours || 0} hrs</span> {/* Added text color */}
                </div>
                
                <div className="pt-4 border-t mt-4">
                  <p className="text-center text-green-600 font-medium">
                    Great job today! Thank you for your service.
                  </p>
                </div>
                
                <button 
                  onClick={() => setShowShiftSummary(false)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md mt-4 border border-green-600" // Added border
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button className="flex flex-col items-center justify-center p-2 text-green-600">
            <Calendar size={20} />
            <span className="text-xs mt-1">Attendance</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 text-gray-600">
            <AlertCircle size={20} />
            <span className="text-xs mt-1">Complaints</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 text-gray-600">
            <Trophy size={20} />
            <span className="text-xs mt-1">Rewards</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 text-gray-600">
            <Phone size={20} />
            <span className="text-xs mt-1">Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerTasks;