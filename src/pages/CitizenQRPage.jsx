// src/components/CitizenQRPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  CheckCircle, 
  Clock, 
  Award, 
  User, 
  QrCode,
  Leaf,
  RotateCcw,
  AlertCircle,
  Home,
  Trash2,
  Package,
  Biohazard,
  Cpu,
  Star,
  Trophy,
  Bell,
  BarChart3,
  Users,
  Globe,
  Download,
  Shield,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CitizenQRPage = () => {
  // State management
  const [scanning, setScanning] = useState(true);
  const [citizenId, setCitizenId] = useState('');
  const [wasteCategory, setWasteCategory] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, submitting, success, error
  const [greenCredits, setGreenCredits] = useState(350);
  const [disposalHistory, setDisposalHistory] = useState([]);
  const [showManualInput, setShowManualInput] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [activeTab, setActiveTab] = useState('scan');
  const [showQRDetails, setShowQRDetails] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // Mock data for demonstration
  const mockHistory = [
    { id: 1, date: '2023-10-25', category: 'Wet Waste', status: 'Collected', credits: 5, weight: '2.5kg', worker: 'Rajesh K.' },
    { id: 2, date: '2023-10-23', category: 'Dry Waste', status: 'Received at Plant', credits: 3, weight: '1.8kg', worker: 'Priya M.' },
    { id: 3, date: '2023-10-20', category: 'Hazardous Waste', status: 'In Transit', credits: 8, weight: '0.5kg', worker: 'Anil S.' },
    { id: 4, date: '2023-10-18', category: 'Dry Waste', status: 'Collected', credits: 3, weight: '2.1kg', worker: 'Suresh D.' },
    { id: 5, date: '2023-10-15', category: 'Wet Waste', status: 'Processed', credits: 5, weight: '3.2kg', worker: 'Laxmi P.' },
  ];

  // Mock notifications
  const mockNotifications = [
    { id: 1, type: 'credit', message: 'You earned 5 credits for proper waste disposal', time: '2 hours ago', read: false },
    { id: 2, type: 'collection', message: 'Your dry waste was collected by Worker #4582', time: '1 day ago', read: true },
    { id: 3, type: 'reward', message: 'Congratulations! You reached Silver Level', time: '2 days ago', read: true },
    { id: 4, type: 'alert', message: 'Heavy rain forecasted - collection may be delayed', time: '3 days ago', read: true },
  ];

  // Household data with QR parameters
  const householdData = {
    id: "HH-2023-75843",
    type: "household",
    zone: "WARD-12",
    bin: "BIN-007",
    address: "No. 45, Green Valley Layout, Bengaluru",
    residents: 4,
    joinDate: "2023-06-15"
  };

  // Waste categories with icons and colors
  const wasteCategories = [
    { id: 'wet', name: 'Wet Waste', icon: '🌱', color: 'bg-green-500', description: 'Organic/Food Waste' },
    { id: 'dry', name: 'Dry Waste', icon: '📦', color: 'bg-blue-500', description: 'Paper, Plastic, Glass, Metal' },
    { id: 'hazardous', name: 'Hazardous Waste', icon: '☣️', color: 'bg-red-500', description: 'Sanitary, Batteries, Chemicals' },
    { id: 'other', name: 'Other Waste', icon: '💻', color: 'bg-purple-500', description: 'E-Waste, Bulky Items' },
  ];

  // Initialize with mock data
  useEffect(() => {
    setDisposalHistory(mockHistory);
    setNotifications(mockNotifications);
  }, []);

  // Handle QR scan success
  const handleScan = (data) => {
    if (data) {
      setCitizenId(data);
      setScanning(false);
      setCameraError(null);
    }
  };

  // Handle QR scan errors
  const handleError = (err) => {
    console.error('QR Scanner error:', err);
    setCameraError('Camera access denied or not available. Please use manual input.');
  };

  // Handle waste category selection
  const handleCategorySelect = (categoryId) => {
    setWasteCategory(categoryId);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    
    // Simulate API call
    try {
      // In a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add to history (in a real app, this would come from the API response)
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        category: wasteCategories.find(cat => cat.id === wasteCategory)?.name || wasteCategory,
        status: 'Marked as Ready',
        credits: calculateCredits(wasteCategory),
        weight: `${(Math.random() * 3 + 0.5).toFixed(1)}kg`
      };
      
      setDisposalHistory(prev => [newEntry, ...prev.slice(0, 4)]);
      setGreenCredits(prev => prev + newEntry.credits);
      setSubmissionStatus('success');
      
      // Add notification
      const newNotification = {
        id: Date.now(),
        type: 'credit',
        message: `You earned ${newEntry.credits} credits for ${newEntry.category} disposal`,
        time: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
      
      // Reset after success
      setTimeout(() => {
        setWasteCategory('');
        setScanning(true);
        setSubmissionStatus('idle');
      }, 2500);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
    }
  };

  // Calculate credits based on waste type
  const calculateCredits = (category) => {
    const creditValues = {
      'wet': 5,
      'dry': 3,
      'hazardous': 8,
      'other': 2
    };
    return creditValues[category] || 0;
  };

  // Reset the process
  const handleReset = () => {
    setScanning(true);
    setCitizenId('');
    setWasteCategory('');
    setSubmissionStatus('idle');
    setCameraError(null);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Marked as Ready': return 'bg-blue-100 text-blue-800';
      case 'Collected': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-yellow-100 text-yellow-800';
      case 'Received at Plant': return 'bg-purple-100 text-purple-800';
      case 'Processed': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const pulse = {
    animate: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 mb-2">
            EcoTrack Waste Portal
          </h1>
          <p className="text-green-700">Smart waste management for sustainable communities</p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex bg-white rounded-2xl shadow-lg mb-6 overflow-hidden"
        >
          <button 
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all ${activeTab === 'scan' ? 'bg-green-600 text-white' : 'text-green-700 hover:bg-green-50'}`}
          >
            <QrCode className="inline-block mr-2" size={18} />
            Scan & Dispose
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all ${activeTab === 'history' ? 'bg-green-600 text-white' : 'text-green-700 hover:bg-green-50'}`}
          >
            <Clock className="inline-block mr-2" size={18} />
            History
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all ${activeTab === 'rewards' ? 'bg-green-600 text-white' : 'text-green-700 hover:bg-green-50'}`}
          >
            <Award className="inline-block mr-2" size={18} />
            Rewards
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all ${activeTab === 'profile' ? 'bg-green-600 text-white' : 'text-green-700 hover:bg-green-50'}`}
          >
            <User className="inline-block mr-2" size={18} />
            Profile
          </button>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats and QR Code */}
          <div className="lg:col-span-1 space-y-6">
            {/* Green Credits Display */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-2xl p-5 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-green-800">Green Credits</h2>
                <Award className="text-green-600" size={20} />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-green-800">{greenCredits}</p>
                <motion.div
                  variants={pulse}
                  animate="animate"
                >
                  <Leaf className="text-green-500" size={32} />
                </motion.div>
              </div>
              <div className="mt-4 bg-green-50 rounded-lg p-3">
                <p className="text-sm text-green-700 flex items-center">
                  <Star className="mr-1 text-yellow-500" size={14} />
                  <span className="font-medium">Silver Level</span> - 50% to Gold
                </p>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
              </div>
            </motion.div>

            

            {/* Household QR Code */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-2xl p-5 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-green-800">Your Household QR</h2>
                <button 
                  onClick={() => setShowQRDetails(!showQRDetails)}
                  className="text-green-600 hover:text-green-800"
                >
                  {showQRDetails ? <Eye size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-green-200 flex justify-center">
                {/* QR Code Display - In a real app, generate with a library like qrcode.react */}
                <div className="border-4 border-green-300 p-4 rounded-lg">
                  <div className="w-40 h-40 bg-white flex items-center justify-center">
                    <div className="text-center">
                      <QrCode size={80} className="text-green-800 mx-auto" />
                      <p className="text-xs mt-2 text-green-700 font-mono">HH-2023-75843</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-green-100 hover:bg-green-200 text-green-800 py-2 rounded-lg flex items-center justify-center transition-colors">
                <Download size={16} className="mr-2" />
                Download QR
              </button>

                      {/* User Guidance */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white rounded-2xl p-5 shadow-lg mb-6"
        >
          <h2 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <User className="mr-2" size={20} />
            How It Works
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-green-700">
            <li>Scan your household QR code using your camera</li>
            <li>Select the type of waste you're disposing</li>
            <li>Confirm your submission</li>
            <li>Earn green credits for proper waste disposal!</li>
          </ol>
        </motion.div>
              
              {/* QR Details */}
              <AnimatePresence>
                {showQRDetails && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 bg-green-50 rounded-lg p-4 overflow-hidden"
                  >
                    <h3 className="font-medium text-green-800 mb-2">QR Code Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-600">Household ID:</span>
                        <span className="font-mono text-green-800">{householdData.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Zone:</span>
                        <span className="font-mono text-green-800">{householdData.zone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Bin Number:</span>
                        <span className="font-mono text-green-800">{householdData.bin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Address:</span>
                        <span className="text-green-800 text-right">{householdData.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Residents:</span>
                        <span className="text-green-800">{householdData.residents}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Notifications */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-2xl p-5 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-green-800">Notifications</h2>
                <Bell className="text-green-600" size={18} />
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                    notification.type === 'credit' ? 'border-green-500 bg-green-50' :
                    notification.type === 'alert' ? 'border-red-500 bg-red-50' :
                    notification.type === 'reward' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <p className="text-sm text-green-800">{notification.message}</p>
                    <p className="text-xs text-green-600 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              
              {notifications.length > 3 && (
                <button className="w-full mt-3 text-green-600 hover:text-green-800 text-sm">
                  View all notifications
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scan & Dispose Section */}
            {activeTab === 'scan' && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-6 flex items-center">
                  <Camera className="mr-2" size={24} />
                  Waste Disposal Logging
                </h2>
                
                {/* QR Code Scanner Section */}
                {scanning && !citizenId && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-green-700 mb-4">Scan QR Code</h3>
                    
                    <div className="relative">
                      {/* QR Scanner Placeholder - in a real app, use react-qr-reader or similar */}
                      <div className="border-2 border-dashed border-green-300 rounded-xl h-64 flex flex-col items-center justify-center bg-green-50">
                        <div className="relative">
                          <QrCode className="text-green-400 mb-3" size={64} />
                          <motion.div 
                            className="absolute inset-0 border-2 border-green-400 rounded-lg"
                            animate={{ 
                              opacity: [0, 1, 0],
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                            }}
                          />
                        </div>
                        <p className="text-green-600 text-center mb-4">Position QR code within frame</p>
                        
                        {/* Simulated scanning effect */}
                        <motion.div 
                          className="w-full h-1 bg-green-400 rounded-full"
                          animate={{ 
                            opacity: [0, 1, 0],
                            y: [0, 256, 256],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      
                      {/* Simulated scan button for demo purposes */}
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => handleScan("HH-2023-75843")}
                          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center mx-auto"
                        >
                          <Camera size={18} className="mr-2" />
                          Simulate QR Scan
                        </button>
                      </div>
                    </div>
                    
                    {cameraError && (
                      <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                        <AlertCircle size={18} className="mr-2" />
                        {cameraError}
                      </div>
                    )}
                    
                    {/* Manual Input Toggle */}
                    <div className="mt-4 text-center">
                      <button 
                        onClick={() => setShowManualInput(!showManualInput)}
                        className="text-green-600 hover:text-green-800 text-sm flex items-center justify-center w-full"
                      >
                        {showManualInput ? 'Hide manual input' : 'Having trouble scanning? Enter manually'}
                      </button>
                    </div>
                    
                    {/* Manual Input Form */}
                    {showManualInput && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                        <label htmlFor="citizenId" className="block text-sm font-medium text-green-700 mb-2">
                          Household ID
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            id="citizenId"
                            value={citizenId}
                            onChange={(e) => setCitizenId(e.target.value)}
                            placeholder="Enter your household ID"
                            className="flex-1 border border-green-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <button
                            onClick={() => setScanning(false)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r-lg"
                          >
                            Submit
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Waste Category Selection */}
                {!scanning && citizenId && !wasteCategory && submissionStatus === 'idle' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-green-700">Select Waste Category</h3>
                      <div className="flex items-center text-green-700">
                        <Home size={16} className="mr-1" />
                        <span className="font-mono">{citizenId}</span>
                        <button 
                          onClick={handleReset}
                          className="ml-3 text-green-600 hover:text-green-800 text-sm flex items-center"
                        >
                          <RotateCcw size={14} className="mr-1" />
                          Rescan
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {wasteCategories.map((category) => (
                        <motion.button
                          key={category.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`p-4 rounded-xl border-2 border-green-100 hover:border-${category.color.split('-')[1]}-300 transition-all flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md`}
                        >
                          <span className="text-3xl mb-2">{category.icon}</span>
                          <span className="font-medium text-green-800">{category.name}</span>
                          <span className="text-xs text-green-600 mt-1">{category.description}</span>
                          <div className="mt-2 text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                            +{calculateCredits(category.id)} credits
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirmation Section */}
                {wasteCategory && submissionStatus === 'idle' && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                  >
                    <h3 className="text-lg font-medium text-green-700 mb-4">Confirm Disposal</h3>
                    
                    <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-200">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 text-2xl">
                          {wasteCategories.find(cat => cat.id === wasteCategory)?.icon}
                        </div>
                        <div>
                          <p className="font-medium text-green-800">
                            {wasteCategories.find(cat => cat.id === wasteCategory)?.name}
                          </p>
                          <p className="text-sm text-green-600">
                            +{calculateCredits(wasteCategory)} green credits
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSubmit}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
                      >
                        <CheckCircle size={20} className="mr-2" />
                        Confirm Disposal
                      </button>
                      
                      <button 
                        onClick={() => setWasteCategory('')}
                        className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors"
                      >
                        Back
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Submission Status */}
                <AnimatePresence>
                  {submissionStatus !== 'idle' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6"
                    >
                      {submissionStatus === 'submitting' && (
                        <div className="text-center py-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"
                          />
                          <p className="text-green-700">Submitting your disposal log...</p>
                        </div>
                      )}
                      
                      {submissionStatus === 'success' && (
                        <div className="text-center py-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                          >
                            <CheckCircle className="text-green-600" size={32} />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-green-800 mb-2">Success!</h3>
                          <p className="text-green-700">
                            Waste successfully marked as ready for pickup.
                          </p>
                          <p className="text-green-600 mt-2 font-medium">
                            +{calculateCredits(wasteCategory)} green credits added to your account!
                          </p>
                        </div>
                      )}
                      
                      {submissionStatus === 'error' && (
                        <div className="text-center py-4">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="text-red-600" size={32} />
                          </div>
                          <h3 className="text-xl font-semibold text-red-800 mb-2">Submission Failed</h3>
                          <p className="text-red-700">
                            There was an error submitting your disposal. Please try again.
                          </p>
                          <button
                            onClick={() => setSubmissionStatus('idle')}
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* History Section */}
            {activeTab === 'history' && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-6 flex items-center">
                  <Clock className="mr-2" size={24} />
                  Disposal History
                </h2>
                
                {disposalHistory.length === 0 ? (
                  <p className="text-green-600 text-center py-8">No disposal history found.</p>
                ) : (
                  <div className="space-y-4">
                    {disposalHistory.map((item) => (
                      <div key={item.id} className="p-4 border border-green-100 rounded-xl hover:bg-green-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-4 text-2xl">
                              {wasteCategories.find(cat => cat.name === item.category)?.icon || '🗑️'}
                            </div>
                            <div>
                              <p className="font-medium text-green-800">{item.category}</p>
                              <p className="text-xs text-green-600">{item.date} • {item.weight}</p>
                              {item.worker && (
                                <p className="text-xs text-green-500 mt-1">Collected by {item.worker}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                            <p className="text-sm text-green-700 mt-2 font-medium">+{item.credits} credits</p>
                          </div>
                        </div>
                        
                        {/* Timeline for disposal status */}
                        <div className="mt-4 flex items-center justify-between text-xs text-green-600">
                          <div className={`text-center ${item.status !== 'Marked as Ready' ? 'text-green-800 font-medium' : ''}`}>
                            <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
                            <span>Logged</span>
                          </div>
                          <div className="h-0.5 bg-green-200 flex-1 mx-2"></div>
                          <div className={`text-center ${item.status === 'Collected' || item.status === 'In Transit' || item.status === 'Received at Plant' || item.status === 'Processed' ? 'text-green-800 font-medium' : ''}`}>
                            <div className={`w-3 h-3 rounded-full ${item.status !== 'Marked as Ready' ? 'bg-green-500' : 'bg-green-200'} mx-auto mb-1`}></div>
                            <span>Collected</span>
                          </div>
                          <div className="h-0.5 bg-green-200 flex-1 mx-2"></div>
                          <div className={`text-center ${item.status === 'Received at Plant' || item.status === 'Processed' ? 'text-green-800 font-medium' : ''}`}>
                            <div className={`w-3 h-3 rounded-full ${item.status === 'Received at Plant' || item.status === 'Processed' ? 'bg-green-500' : 'bg-green-200'} mx-auto mb-1`}></div>
                            <span>At Plant</span>
                          </div>
                          <div className="h-0.5 bg-green-200 flex-1 mx-2"></div>
                          <div className={`text-center ${item.status === 'Processed' ? 'text-green-800 font-medium' : ''}`}>
                            <div className={`w-3 h-3 rounded-full ${item.status === 'Processed' ? 'bg-green-500' : 'bg-green-200'} mx-auto mb-1`}></div>
                            <span>Processed</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {disposalHistory.length > 0 && (
                  <button className="w-full mt-6 border border-green-300 text-green-700 hover:bg-green-50 py-2 rounded-lg transition-colors">
                    View Full History
                  </button>
                )}
              </motion.div>
            )}

            {/* Rewards Section */}
            {activeTab === 'rewards' && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-6 flex items-center">
                  <Award className="mr-2" size={24} />
                  Rewards & Benefits
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Available Rewards */}
                  <div className="bg-green-50 rounded-xl p-5">
                    <h3 className="font-medium text-green-800 mb-4 flex items-center">
                      <Star className="mr-2 text-yellow-500" size={18} />
                      Available Rewards
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-green-800">10% Electricity Bill Discount</span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">100 credits</span>
                        </div>
                        <p className="text-sm text-green-600">Redeem for discount on next electricity bill</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-green-800">Metro Travel Pass</span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">150 credits</span>
                        </div>
                        <p className="text-sm text-green-600">1-week unlimited travel pass</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-green-800">Local Market Coupon</span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">50 credits</span>
                        </div>
                        <p className="text-sm text-green-600">₹100 off on groceries</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Leaderboard */}
                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="font-medium text-blue-800 mb-4 flex items-center">
                      <Trophy className="mr-2 text-yellow-500" size={18} />
                      Community Leaderboard
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { rank: 1, name: 'Green Valley Apartments', credits: 842 },
                        { rank: 2, name: 'Eco Homes Society', credits: 756 },
                        { rank: 3, name: 'Sunshine Residency', credits: 698 },
                        { rank: 4, name: 'Your Community', credits: 350 },
                        { rank: 5, name: 'Harmony Layout', credits: 312 },
                      ].map((item) => (
                        <div key={item.rank} className={`flex items-center justify-between p-2 rounded-lg ${item.rank === 4 ? 'bg-green-100 border border-green-300' : 'bg-white'}`}>
                          <div className="flex items-center">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              item.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                              item.rank === 2 ? 'bg-gray-100 text-gray-800' :
                              item.rank === 3 ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {item.rank}
                            </span>
                            <span className="ml-2 text-sm font-medium text-green-800">{item.name}</span>
                          </div>
                          <span className="text-sm text-green-700 font-medium">{item.credits} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-purple-50 rounded-xl p-5">
                  <h3 className="font-medium text-purple-800 mb-2 flex items-center">
                    <BarChart3 className="mr-2" size={18} />
                    Your Environmental Impact
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                      <p className="text-2xl font-bold text-purple-700">12kg</p>
                      <p className="text-xs text-purple-600">Plastic diverted</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                      <p className="text-2xl font-bold text-purple-700">4kg</p>
                      <p className="text-xs text-purple-600">CO₂ reduced</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                      <p className="text-2xl font-bold text-purple-700">12</p>
                      <p className="text-xs text-purple-600">Trees saved</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-purple-200">
                      <p className="text-2xl font-bold text-purple-700">12kL</p>
                      <p className="text-xs text-purple-600">Water conserved</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Section */}
            {activeTab === 'profile' && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-6 flex items-center">
                  <User className="mr-2" size={24} />
                  Household Profile
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-5">
                    <h3 className="font-medium text-green-800 mb-4 flex items-center">
                      <Shield className="mr-2" size={18} />
                      Account Details
                    </h3>
                    
                    <div className="space-y-3">
                      {Object.entries(householdData).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm text-green-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-sm font-medium text-green-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="font-medium text-blue-800 mb-4 flex items-center">
                      <BarChart3 className="mr-2" size={18} />
                      Statistics
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-600">Segregation Accuracy</span>
                          <span className="font-medium text-blue-800">92%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '92%'}}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-600">Monthly Participation</span>
                          <span className="font-medium text-blue-800">100%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-600">Community Rank</span>
                          <span className="font-medium text-blue-800">#4</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-yellow-50 rounded-xl p-5">
                  <h3 className="font-medium text-yellow-800 mb-4 flex items-center">
                    <Globe className="mr-2" size={18} />
                    Environmental Impact
                  </h3>
                  
                  <p className="text-sm text-yellow-700 mb-4">
                    Your household has been part of our sustainability program since {householdData.joinDate}. 
                    Here's the positive impact you've made:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 text-center border border-yellow-200">
                      <p className="text-xl font-bold text-yellow-700">42</p>
                      <p className="text-xs text-yellow-600">Successful disposals</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-yellow-200">
                      <p className="text-xl font-bold text-yellow-700">186</p>
                      <p className="text-xs text-yellow-600">Total credits earned</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-yellow-200">
                      <p className="text-xl font-bold text-yellow-700">58kg</p>
                      <p className="text-xs text-yellow-600">Waste recycled</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-yellow-200">
                      <p className="text-xl font-bold text-yellow-700">3</p>
                      <p className="text-xs text-yellow-600">Badges earned</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenQRPage;