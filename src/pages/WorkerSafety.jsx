import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Shield,
  AlertCircle,
  Calendar,
  Phone,
  Truck,
  Package,
  Video,
  BookOpen,
  Star,
  Award,
  Bell,
  User,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Zap,
  Coins,
  Mic,
  Volume2,
  Languages,
  Download,
  Share2,
  ThumbsUp,
  HelpCircle
} from 'lucide-react';

const WorkerSafety = () => {
  // State for worker data and UI controls
  const [workerData, setWorkerData] = useState({
    name: 'Rajesh Kumar',
    safetyScore: 85,
    safetyLevel: 'Guardian',
    safetyStreak: 12,
    points: 1250,
    badges: ['Safety First', 'Health Champion', 'Protection Pro'],
    language: 'en',
    voiceAssistant: false
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quizActive, setQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Mock data for health status
  const healthData = {
    lastCheckup: '2023-08-15',
    nextCheckup: '2023-09-15',
    status: 'Good',
    family: [
      { name: 'Sunita Kumar', relation: 'Spouse', lastCheckup: '2023-07-20', nextDue: '2023-10-20' },
      { name: 'Amit Kumar', relation: 'Son', lastCheckup: '2023-08-05', nextDue: '2023-11-05' }
    ]
  };

  // Mock data for upcoming health camps
  const healthCamps = [
    { id: 1, name: 'Free Vaccination Drive', date: '2023-09-05', type: 'Vaccination', location: 'Community Health Center' },
    { id: 2, name: 'Eye Checkup Camp', date: '2023-09-12', type: 'Eye Care', location: 'Municipal Hospital' },
    { id: 3, name: 'Respiratory Health Screening', date: '2023-09-20', type: 'Respiratory', location: 'Urban Health Clinic' }
  ];

  // Mock data for safety products
  const safetyProducts = [
    { id: 1, name: 'Disposable Gloves', category: 'Hand Protection', stock: 'In Stock', delivery: '2 days', maxQuantity: 10 },
    { id: 2, name: 'N95 Masks', category: 'Respiratory Protection', stock: 'In Stock', delivery: '2 days', maxQuantity: 20 },
    { id: 3, name: 'Safety Boots', category: 'Foot Protection', stock: 'Low Stock', delivery: '5 days', maxQuantity: 2 },
    { id: 4, name: 'Sanitizers', category: 'Hygiene', stock: 'In Stock', delivery: '3 days', maxQuantity: 5 },
    { id: 5, name: 'Raincoats', category: 'Weather Protection', stock: 'Out of Stock', delivery: '7 days', maxQuantity: 0 },
    { id: 6, name: 'Safety Goggles', category: 'Eye Protection', stock: 'In Stock', delivery: '4 days', maxQuantity: 5 },
    { id: 7, name: 'First Aid Kits', category: 'Emergency', stock: 'In Stock', delivery: '2 days', maxQuantity: 3 },
    { id: 8, name: 'Reflective Vests', category: 'Visibility', stock: 'In Stock', delivery: '3 days', maxQuantity: 5 }
  ];

  // Mock data for safety tips
  const safetyTips = [
    { id: 1, tip: 'Always wear gloves when handling wet waste', category: 'General Safety' },
    { id: 2, tip: 'Use masks when dealing with dust or hazardous materials', category: 'Respiratory Safety' },
    { id: 3, tip: 'Wash hands thoroughly after waste handling', category: 'Hygiene' },
    { id: 4, tip: 'Report any injuries immediately to your supervisor', category: 'Emergency' }
  ];

  // Mock data for training videos
  const trainingVideos = [
    { id: 1, title: 'Proper Waste Handling Techniques', duration: '5:32', points: 10 },
    { id: 2, title: 'Using PPE Correctly', duration: '7:15', points: 15 },
    { id: 3, title: 'Emergency Response Procedures', duration: '6:45', points: 20 }
  ];

  // Mock data for quizzes
  const safetyQuiz = [
    {
      question: 'What should you wear when handling hazardous waste?',
      options: ['Only gloves', 'Complete PPE kit', 'Regular clothes', 'No special equipment'],
      correctAnswer: 1
    },
    {
      question: 'How often should you wash your hands during work?',
      options: ['Once at the end of the day', 'After every meal', 'After handling waste and before eating', 'Only when they look dirty'],
      correctAnswer: 2
    },
    {
      question: 'What should you do if you get a cut while working?',
      options: ['Continue working', 'Clean it with water and cover it', 'Ignore it', 'Report to supervisor and get first aid'],
      correctAnswer: 3
    }
  ];

  // Mock data for pending requests
  const pendingRequests = [
    { id: 1, product: 'N95 Masks', quantity: 5, status: 'Approved', deliveryDate: '2023-09-03' },
    { id: 2, product: 'Safety Boots', quantity: 1, status: 'Processing', deliveryDate: '2023-09-10' }
  ];

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Open product request modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowProductModal(true);
  };

  // Submit product request
  const submitProductRequest = () => {
    // In a real app, this would send an API request
    alert(`Request submitted for ${quantity} ${selectedProduct.name}`);
    setShowProductModal(false);
  };

  // Start safety quiz
  const startQuiz = () => {
    setQuizActive(true);
    setQuizScore(0);
    setCurrentQuestion(0);
  };

  // Handle quiz answer
  const handleAnswer = (answerIndex) => {
    if (answerIndex === safetyQuiz[currentQuestion].correctAnswer) {
      setQuizScore(quizScore + 10);
    }

    if (currentQuestion < safetyQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizActive(false);
      // Award points for completing the quiz
      setWorkerData({
        ...workerData,
        points: workerData.points + quizScore + 20 // Bonus for completion
      });
    }
  };

  // Toggle voice assistant
  const toggleVoiceAssistant = () => {
    setWorkerData({
      ...workerData,
      voiceAssistant: !workerData.voiceAssistant
    });
    alert(`Voice assistant ${!workerData.voiceAssistant ? 'activated' : 'deactivated'}`);
  };

  // Change language
  const changeLanguage = (lang) => {
    setWorkerData({
      ...workerData,
      language: lang
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold">Worker Safety & Sanitation</h1>
            <p className="text-gray-600">Your health and safety is our priority</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleVoiceAssistant} className={`p-2 rounded-full ${workerData.voiceAssistant ? 'bg-green-100 text-green-600' : 'bg-gray-200'}`}>
              <Mic className="h-5 w-5" />
            </button>
            <div className="relative">
              <button 
                onClick={() => toggleSection('language')}
                className="flex items-center space-x-1 p-2 bg-white rounded-lg shadow-sm"
              >
                <Languages className="h-5 w-5" />
                <span className="text-sm">{workerData.language === 'en' ? 'EN' : workerData.language === 'hi' ? 'HI' : 'TA'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {expandedSections.language && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10"
                  >
                    <button 
                      onClick={() => changeLanguage('en')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      English
                    </button>
                    <button 
                      onClick={() => changeLanguage('hi')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Hindi
                    </button>
                    <button 
                      onClick={() => changeLanguage('ta')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Tamil
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Bell className="h-6 w-6" />
            <User className="h-8 w-8 rounded-full bg-blue-500 p-1 text-white" />
          </div>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 mb-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Hello, {workerData.name}!</h2>
              <p className="mb-4">Your safety keeps your family safe. Stay protected!</p>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>Safety Score: {workerData.safetyScore}%</span>
                <span className="mx-2">•</span>
                <Award className="h-5 w-5 mr-2" />
                <span>Level: {workerData.safetyLevel}</span>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-4 md:mt-0"
            >
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span>Safety Streak</span>
                  <Zap className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold">{workerData.safetyStreak} days</div>
                <p className="text-sm">Keep it up!</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex mb-6 rounded-lg bg-white p-1 shadow-md overflow-x-auto"
        >
          {['dashboard', 'health', 'products', 'safety', 'training', 'requests'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-none py-2 px-4 rounded-md text-center font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Health Status Card */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Heart className="h-6 w-6 mr-2 text-red-500" />
                  <h2 className="text-lg font-semibold">Health Status</h2>
                </div>
                
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Last Checkup:</span>
                    <span className="font-medium">{healthData.lastCheckup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Checkup:</span>
                    <span className="font-medium text-blue-600">{healthData.nextCheckup}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Family Health</h3>
                  {healthData.family.map((member, index) => (
                    <div key={index} className="flex justify-between mb-2 p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.relation}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Next: {member.nextDue}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
                >
                  Book Checkup
                </motion.button>
              </motion.div>

              {/* Emergency Hotline Card */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 mr-2 text-red-500" />
                  <h2 className="text-lg font-semibold">Emergency Support</h2>
                </div>
                
                <div className="text-center mb-4">
                  <p className="mb-4">In case of emergency, immediately contact:</p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="tel:108"
                    className="inline-flex items-center justify-center p-4 bg-red-500 text-white rounded-full text-lg font-bold"
                  >
                    <Phone className="h-6 w-6 mr-2" />
                    EMERGENCY: 108
                  </motion.a>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Quick Contacts</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Supervisor</span>
                      <a href="tel:+911234567890" className="text-blue-500">+91 1234567890</a>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Health Coordinator</span>
                      <a href="tel:+911234567891" className="text-blue-500">+91 1234567891</a>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Safety Officer</span>
                      <a href="tel:+911234567892" className="text-blue-500">+91 1234567892</a>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
                >
                  Report Emergency
                </motion.button>
              </motion.div>

              {/* Upcoming Health Camps */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 mr-2 text-green-500" />
                  <h2 className="text-lg font-semibold">Upcoming Health Camps</h2>
                </div>
                
                <div className="space-y-4">
                  {healthCamps.map((camp) => (
                    <motion.div 
                      key={camp.id}
                      whileHover={{ y: -5 }}
                      className="p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="font-medium mb-1">{camp.name}</div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{camp.date}</span>
                        <span>{camp.type}</span>
                      </div>
                      <div className="flex items-center mt-2 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {camp.location}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                >
                  View All Camps
                </motion.button>
              </motion.div>

              {/* Safety Tip of the Day */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 mr-2 text-blue-500" />
                  <h2 className="text-lg font-semibold">Safety Tip of the Day</h2>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                  <p className="font-medium">"Always wear gloves when handling wet waste"</p>
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    I Follow This
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium flex items-center"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Learn More
                  </motion.button>
                </div>
              </motion.div>

              {/* Rewards & Badges */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 mr-2 text-yellow-500" />
                  <h2 className="text-lg font-semibold">Safety Rewards</h2>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">{workerData.points}</div>
                  <div>Safety Points</div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Earned Badges</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {workerData.badges.map((badge, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-gray-100 rounded-lg text-center"
                      >
                        <Star className="h-6 w-6 mx-auto text-yellow-500" />
                        <div className="text-xs mt-1">{badge}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
                >
                  Redeem Rewards
                </motion.button>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('products')}
                    className="p-3 bg-blue-100 rounded-lg flex flex-col items-center"
                  >
                    <Package className="h-6 w-6 text-blue-500 mb-2" />
                    <span>Request Gear</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('health')}
                    className="p-3 bg-green-100 rounded-lg flex flex-col items-center"
                  >
                    <Heart className="h-6 w-6 text-green-500 mb-2" />
                    <span>Book Checkup</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('training')}
                    className="p-3 bg-purple-100 rounded-lg flex flex-col items-center"
                  >
                    <Video className="h-6 w-6 text-purple-500 mb-2" />
                    <span>Training</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('safety')}
                    className="p-3 bg-red-100 rounded-lg flex flex-col items-center"
                  >
                    <Shield className="h-6 w-6 text-red-500 mb-2" />
                    <span>Safety Info</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Health Tab */}
          {activeTab === 'health' && (
            <motion.div
              key="health"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4">Health Checkups & Appointments</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Routine Checkups */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-3">Routine Checkups</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>General Physician</span>
                        <span className="text-blue-600">Free</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Skin Checkup</span>
                        <span className="text-blue-600">Free</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Respiratory Checkup</span>
                        <span className="text-blue-600">Free</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Vaccinations</span>
                        <span className="text-blue-600">Free</span>
                      </li>
                    </ul>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
                    >
                      Book Routine Checkup
                    </motion.button>
                  </div>
                  
                  {/* Family Coverage */}
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium mb-3">Family Health Coverage</h3>
                    <p className="mb-3">Your family is eligible for discounted health services:</p>
                    
                    <div className="mb-4">
                      {healthData.family.map((member, index) => (
                        <div key={index} className="flex justify-between mb-2">
                          <span>{member.name} ({member.relation})</span>
                          <span className="text-green-600">Eligible</span>
                        </div>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                    >
                      Book Family Checkup
                    </motion.button>
                  </div>
                </div>
                
                {/* Sick Leave Request */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium mb-3">Sick Leave Request</h3>
                  <p className="mb-3">Feeling unwell? Inform your supervisor and request sick leave directly through the portal.</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
                  >
                    Request Sick Leave
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4">Request Safety Products</h2>
                <p className="mb-6">Request sanitary and safety items you need for your work. Items will be delivered to your designated collection point.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {safetyProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      className={`p-4 border rounded-lg ${product.stock === 'Out of Stock' ? 'opacity-50' : 'cursor-pointer'}`}
                      onClick={() => product.stock !== 'Out of Stock' && openProductModal(product)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{product.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.stock === 'In Stock' ? 'bg-green-100 text-green-800' :
                          product.stock === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                      <p className="text-sm">Delivery in: {product.delivery}</p>
                      
                      {product.stock !== 'Out of Stock' ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openProductModal(product);
                          }}
                          className="w-full mt-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                        >
                          Request
                        </motion.button>
                      ) : (
                        <button className="w-full mt-3 py-1 bg-gray-300 text-gray-600 rounded text-sm cursor-not-allowed">
                          Out of Stock
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Safety Tab */}
          {activeTab === 'safety' && (
            <motion.div
              key="safety"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4">Safety Awareness & Guidelines</h2>
                
                {/* Safety Tips */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Essential Safety Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {safetyTips.map((tip) => (
                      <motion.div
                        key={tip.id}
                        whileHover={{ y: -3 }}
                        className="p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="font-medium mb-1">{tip.tip}</div>
                        <div className="text-sm text-gray-600">{tip.category}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Waste Handling Guidelines */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Waste Handling Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium mb-2">Dry Waste</h4>
                      <ul className="text-sm list-disc pl-5">
                        <li>Always wear gloves</li>
                        <li>Use masks for dust protection</li>
                        <li>Sort materials carefully</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium mb-2">Wet Waste</h4>
                      <ul className="text-sm list-disc pl-5">
                        <li>Wear waterproof gloves</li>
                        <li>Sanitize hands after handling</li>
                        <li>Use proper containers</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium mb-2">Hazardous Waste</h4>
                      <ul className="text-sm list-disc pl-5">
                        <li>Always use full protective gear</li>
                        <li>Follow special handling procedures</li>
                        <li>Report spills immediately</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Safety Quiz */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium mb-3">Test Your Knowledge</h3>
                  <p className="mb-3">Complete the safety quiz to earn extra points and badges!</p>
                  
                  {!quizActive ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startQuiz}
                      className="py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium"
                    >
                      Start Safety Quiz
                    </motion.button>
                  ) : (
                    <div>
                      <div className="mb-3 font-medium">
                        Question {currentQuestion + 1}/{safetyQuiz.length}: {safetyQuiz[currentQuestion].question}
                      </div>
                      <div className="space-y-2">
                        {safetyQuiz[currentQuestion].options.map((option, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswer(index)}
                            className="w-full text-left p-3 bg-white rounded-lg border border-gray-200"
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Training Tab */}
          {activeTab === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4">Safety Training & Awareness</h2>
                
                {/* Training Videos */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Training Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trainingVideos.map((video) => (
                      <motion.div
                        key={video.id}
                        whileHover={{ y: -5 }}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="h-32 bg-gray-200 flex items-center justify-center">
                          <Video className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium mb-1">{video.title}</h4>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{video.duration}</span>
                            <span className="text-sm text-yellow-600">{video.points} points</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full mt-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                          >
                            Watch Video
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Downloadable Resources */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Safety Posters & Resources</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Hand Hygiene', 'PPE Guide', 'Emergency Procedures', 'Waste Segregation'].map((resource, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        className="p-3 bg-gray-100 rounded-lg text-center"
                      >
                        <BookOpen className="h-8 w-8 mx-auto text-gray-600 mb-2" />
                        <div className="font-medium text-sm">{resource}</div>
                        <div className="flex justify-center mt-2">
                          <button className="p-1 text-blue-500">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-green-500">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Daily Reminders */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium mb-3">Daily Safety Reminders</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Drink water regularly to stay hydrated</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Wash hands after waste collection</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Report cuts or injuries immediately</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Check your safety gear before starting work</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <motion.div
              key="requests"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={itemVariants}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4">My Requests & Tracking</h2>
                
                {/* Pending Requests */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Pending Requests</h3>
                  {pendingRequests.length > 0 ? (
                    <div className="space-y-3">
                      {pendingRequests.map((request) => (
                        <motion.div
                          key={request.id}
                          whileHover={{ y: -3 }}
                          className="p-3 border rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{request.product}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              request.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {request.status}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Quantity: {request.quantity}</span>
                            <span>Est. delivery: {request.deliveryDate}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No pending requests</p>
                  )}
                </div>
                
                {/* Raise Safety Concern */}
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium mb-3">Raise Safety Concern</h3>
                  <p className="mb-3">Report unsafe conditions, equipment issues, or other safety concerns.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Issue Type</label>
                      <select className="w-full p-2 border rounded">
                        <option>Unsafe Route</option>
                        <option>Faulty Equipment</option>
                        <option>Overloaded Vehicle</option>
                        <option>Lack of Safety Gear</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <input type="text" className="w-full p-2 border rounded" placeholder="Where is the issue?" />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea className="w-full p-2 border rounded" rows="3" placeholder="Describe the issue in detail"></textarea>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
                  >
                    Submit Concern
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Request Modal */}
        <AnimatePresence>
          {showProductModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-md w-full"
              >
                <h2 className="text-xl font-bold mb-4">Request {selectedProduct?.name}</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Availability:</span>
                    <span className={`font-medium ${
                      selectedProduct?.stock === 'In Stock' ? 'text-green-600' :
                      selectedProduct?.stock === 'Low Stock' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {selectedProduct?.stock}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <span>Delivery Timeline:</span>
                    <span className="font-medium">{selectedProduct?.delivery}</span>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Quantity (Max: {selectedProduct?.maxQuantity})</label>
                    <div className="flex items-center">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 bg-gray-200 rounded-l"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        max={selectedProduct?.maxQuantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(selectedProduct?.maxQuantity, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-16 text-center p-2 border-y"
                      />
                      <button 
                        onClick={() => setQuantity(Math.min(selectedProduct?.maxQuantity, quantity + 1))}
                        className="p-2 bg-gray-200 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProductModal(false)}
                    className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={submitProductRequest}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    Confirm Request
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkerSafety;