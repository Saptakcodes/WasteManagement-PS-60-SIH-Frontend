import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  FileText, 
  User, 
  Shield, 
  Truck,
  Clock,
  MapPin,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Star,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Upload,
  Eye,
  EyeOff,
  BookOpen,
  Award,
  Calendar,
  BarChart3,
  Search,
  Filter,
  Download,
  Share,
  ThumbsUp,
  ThumbsDown,
  Languages,
  Volume2,
  Video,
  Image,
  Mic,
  Send,
  Bot,
  Users,
  Bell,
  Zap
} from 'lucide-react';

const WorkerHelpdesk = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAnonymousOption, setShowAnonymousOption] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showEvidenceOptions, setShowEvidenceOptions] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    faq: false,
    tickets: false,
    knowledge: false
  });
  const [language, setLanguage] = useState('en');
  const [ticketDetails, setTicketDetails] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    evidence: null,
    evidenceType: null
  });
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! How can I help you today?', time: '10:00 AM' },
    { id: 2, sender: 'bot', text: 'You can ask me about complaints, requests, or general information.', time: '10:00 AM' }
  ]);

  // Mock data for the helpdesk
  const [helpdeskData, setHelpdeskData] = useState({
    worker: {
      name: 'Rajesh Kumar',
      id: 'WM20245',
      role: 'Dry Waste Worker',
      zone: 'Ward 12, Sector 5'
    },
    tickets: {
      pending: 3,
      resolved: 12,
      escalated: 1,
      list: [
        { id: 'TKT001', title: 'Request for Safety Gear', category: 'Equipment', status: 'In Progress', date: '2023-10-15', priority: 'High' },
        { id: 'TKT002', title: 'Vehicle Maintenance', category: 'Vehicle', status: 'Resolved', date: '2023-10-10', priority: 'Medium' },
        { id: 'TKT003', title: 'Route Change Request', category: 'Role Change', status: 'Submitted', date: '2023-10-18', priority: 'Low' },
        { id: 'TKT004', title: 'Salary Delay Complaint', category: 'Payment', status: 'Resolved', date: '2023-10-05', priority: 'High' }
      ]
    },
    quickActions: [
      { id: 1, title: 'Contact Supervisor', icon: User, color: 'blue' },
      { id: 2, title: 'Contact Authorities', icon: Shield, color: 'red' },
      { id: 3, title: 'Chat Support', icon: MessageSquare, color: 'green' },
      { id: 4, title: 'Emergency Call', icon: Phone, color: 'red' }
    ],
    categories: [
      'Supervisor Issues',
      'Equipment Request',
      'Vehicle Issues',
      'Salary/Payment',
      'Work Conditions',
      'Safety Concerns',
      'Role Change',
      'Harassment',
      'Other'
    ],
    roleChangeOptions: [
      { id: 1, title: 'Change Waste Specialization', icon: Truck, options: ['Dry Waste', 'Wet Waste', 'Hazardous Waste', 'Recycling'] },
      { id: 2, title: 'Shift Change', icon: Clock, options: ['Day Shift', 'Night Shift'] },
      { id: 3, title: 'Vehicle Change', icon: Truck, options: ['Bicycle', 'E-Rickshaw', 'Auto', 'Truck'] },
      { id: 4, title: 'Zone/Route Change', icon: MapPin, options: ['Nearer to Home', 'Specific Area Request'] },
      { id: 5, title: 'Promotion Request', icon: TrendingUp, options: ['Supervisor Role', 'Team Lead'] },
      { id: 6, title: 'Training Request', icon: BookOpen, options: ['Recycling Training', 'Safety Training', 'Equipment Training'] }
    ],
    knowledgeBase: {
      categories: [
        {
          id: 1,
          title: 'Safety Procedures',
          articles: [
            { id: 1, title: 'How to request safety gear?', views: 124 },
            { id: 2, title: 'Proper handling of hazardous waste', views: 89 },
            { id: 3, title: 'Emergency procedures', views: 67 }
          ]
        },
        {
          id: 2,
          title: 'Equipment & Vehicles',
          articles: [
            { id: 4, title: 'What to do if vehicle breaks down?', views: 156 },
            { id: 5, title: 'Requesting new equipment', views: 72 },
            { id: 6, title: 'Maintenance requests', views: 93 }
          ]
        },
        {
          id: 3,
          title: 'Payments & Benefits',
          articles: [
            { id: 7, title: 'Salary delay issues', views: 203 },
            { id: 8, title: 'Understanding your payslip', views: 118 },
            { id: 9, title: 'Applying for benefits', views: 64 }
          ]
        }
      ],
      videos: [
        { id: 1, title: 'Safety Gear Usage', duration: '5:32', views: 245 },
        { id: 2, title: 'Proper Waste Segregation', duration: '7:15', views: 189 },
        { id: 3, title: 'Vehicle Maintenance Tips', duration: '4:47', views: 132 }
      ]
    },
    peerForum: {
      topics: [
        { id: 1, title: 'How to handle difficult households?', replies: 12, views: 45, anonymous: true },
        { id: 2, title: 'Best practices for wet waste collection', replies: 8, views: 32, anonymous: false },
        { id: 3, title: 'Dealing with hot weather conditions', replies: 15, views: 67, anonymous: true }
      ]
    }
  });

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Function to handle ticket submission
  const handleSubmitTicket = () => {
    if (ticketDetails.title && ticketDetails.description && ticketDetails.category) {
      alert(`Ticket submitted successfully! Your ticket ID is: TKT${Math.floor(1000 + Math.random() * 9000)}`);
      setTicketDetails({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        evidence: null,
        evidenceType: null
      });
      setSelectedCategory('');
      setShowAnonymousOption(false);
      setIsAnonymous(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  // Function to send chat message
  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        text: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
      
      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          sender: 'bot',
          text: 'Thank you for your message. I will help you with that.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  // Function to toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Function to handle evidence upload
  const handleEvidenceUpload = (type) => {
    setTicketDetails({
      ...ticketDetails,
      evidenceType: type
    });
    setShowEvidenceOptions(false);
    alert(`Please select your ${type} file`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Worker Helpdesk</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white p-2 rounded-lg shadow-sm border border-gray-200">
              <Languages className="h-5 w-5 text-gray-600 mr-2" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent outline-none text-gray-800"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="bn">Bengali</option>
              </select>
            </div>
            <Bell className="h-6 w-6 cursor-pointer text-gray-700" />
            <User className="h-8 w-8 rounded-full bg-blue-500 p-1 text-white cursor-pointer" />
          </div>
        </div>

        {/* Welcome Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="rounded-xl p-6 mb-6 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Hello, {helpdeskData.worker.name}!</h1>
              <p className="mt-1 opacity-90">We're here to help you with any issues or requests you may have.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="px-4 py-2 rounded-full font-semibold bg-white bg-opacity-20 mt-4 md:mt-0"
            >
              <Shield className="inline-block mr-2 h-5 w-5" />
              Your voice matters - We're here for you
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex mb-6 rounded-lg p-1 bg-white shadow-md border border-gray-200 overflow-x-auto">
          {['dashboard', 'raise-ticket', 'role-change', 'complaints', 'support', 'knowledge', 'forum'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-none py-2 px-4 rounded-md text-center font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Helpdesk Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Quick Actions */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 mr-2 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {helpdeskData.quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-lg flex flex-col items-center justify-center border ${
                          action.color === 'blue' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          action.color === 'red' ? 'bg-red-100 text-red-700 border-red-200' :
                          'bg-green-100 text-green-700 border-green-200'
                        }`}
                      >
                        <Icon className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">{action.title}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Ticket Overview */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 mr-2 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Ticket Overview</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">{helpdeskData.tickets.pending}</div>
                    <div className="text-sm text-gray-700">Pending</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                    <div className="text-2xl font-bold text-green-700">{helpdeskData.tickets.resolved}</div>
                    <div className="text-sm text-gray-700">Resolved</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center border border-red-200">
                    <div className="text-2xl font-bold text-red-700">{helpdeskData.tickets.escalated}</div>
                    <div className="text-sm text-gray-700">Escalated</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response time SLA: 48 hours</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('raise-ticket')}
                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium border border-blue-700"
                  >
                    Raise New Ticket
                  </motion.button>
                </div>
              </motion.div>

              {/* Recent Tickets */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 mr-2 text-orange-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Recent Tickets</h2>
                  </div>
                  <button 
                    onClick={() => toggleSection('tickets')}
                    className="flex items-center text-sm text-blue-600"
                  >
                    {expandedSections.tickets ? 'Show Less' : 'Show All'}
                    {expandedSections.tickets ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                  </button>
                </div>
                
                <div className={`space-y-3 ${expandedSections.tickets ? '' : 'max-h-60 overflow-hidden'}`}>
                  {helpdeskData.tickets.list.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-md bg-gray-50 border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-800">{ticket.title}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          ticket.status === 'Resolved' ? 'bg-green-100 text-green-800 border border-green-200' :
                          ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                          'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{ticket.category}</span>
                        <span>{ticket.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Weekly Resolution Summary */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Weekly Resolution Summary</h2>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>Issues Resolved:</span>
                    <span className="font-semibold">15/18</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-200 border border-gray-300">
                    <div 
                      className="h-full rounded-full bg-green-500" 
                      style={{ width: '83%' }}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>Average Response Time:</span>
                    <span className="font-semibold">22 hours</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-200 border border-gray-300">
                    <div 
                      className="h-full rounded-full bg-blue-500" 
                      style={{ width: '92%' }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Satisfaction Rate: 4.5/5</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-yellow-500'}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Rewards & Recognition */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 mr-2 text-yellow-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Rewards & Recognition</h2>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="text-3xl font-bold text-yellow-600">
                    3
                  </div>
                  <div className="ml-2 text-gray-700">Safety Points Earned</div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2 text-gray-800">Your Badges:</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-center border border-blue-200">
                      <Shield className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                      <span className="text-xs text-gray-700">Safety First</span>
                    </div>
                    <div className="p-2 bg-green-50 rounded-lg text-center border border-green-200">
                      <TrendingUp className="h-6 w-6 mx-auto text-green-600 mb-1" />
                      <span className="text-xs text-gray-700">Efficiency Star</span>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg text-center border border-purple-200">
                      <Users className="h-6 w-6 mx-auto text-purple-600 mb-1" />
                      <span className="text-xs text-gray-700">Team Player</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium border border-yellow-600"
                >
                  View All Rewards
                </motion.button>
              </motion.div>

              {/* Peer Support Forum Preview */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 mr-2 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Peer Support Forum</h2>
                </div>
                
                <div className="space-y-3 mb-4">
                  {helpdeskData.peerForum.topics.slice(0, 2).map((topic, index) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="p-3 rounded-md bg-gray-50 border border-gray-200"
                    >
                      <div className="flex items-start mb-1">
                        {topic.anonymous && <EyeOff className="h-4 w-4 mr-1 text-gray-500" />}
                        <span className="font-medium text-gray-800">{topic.title}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{topic.replies} replies</span>
                        <span>{topic.views} views</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('forum')}
                  className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium border border-indigo-600"
                >
                  Join Discussion
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Raise Ticket Section */}
          {activeTab === 'raise-ticket' && (
            <motion.div
              key="raise-ticket"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 mr-2 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Raise a New Ticket</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setTicketDetails({...ticketDetails, category: e.target.value});
                        setShowAnonymousOption(e.target.value === 'Harassment');
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    >
                      <option value="">Select a category</option>
                      {helpdeskData.categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Priority</label>
                    <select 
                      value={ticketDetails.priority}
                      onChange={(e) => setTicketDetails({...ticketDetails, priority: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
                    <input 
                      type="text" 
                      value={ticketDetails.title}
                      onChange={(e) => setTicketDetails({...ticketDetails, title: e.target.value})}
                      placeholder="Brief description of your issue"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                    <textarea 
                      value={ticketDetails.description}
                      onChange={(e) => setTicketDetails({...ticketDetails, description: e.target.value})}
                      rows={4}
                      placeholder="Please provide detailed information about your issue or request..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </div>
                  
                  {showAnonymousOption && (
                    <div className="md:col-span-2">
                      <label className="flex items-center text-gray-700">
                        <input 
                          type="checkbox" 
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm font-medium">Submit anonymously</span>
                      </label>
                      <p className="text-sm text-gray-600 mt-1">Your identity will be hidden from everyone except system administrators.</p>
                    </div>
                  )}
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Evidence (Optional)</label>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowEvidenceOptions(!showEvidenceOptions)}
                        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 text-gray-700"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Add Evidence
                      </motion.button>
                      
                      {ticketDetails.evidenceType && (
                        <div className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-200">
                          {ticketDetails.evidenceType === 'photo' && <Image className="h-5 w-5 mr-2" />}
                          {ticketDetails.evidenceType === 'video' && <Video className="h-5 w-5 mr-2" />}
                          {ticketDetails.evidenceType === 'audio' && <Mic className="h-5 w-5 mr-2" />}
                          <span className="text-sm">{ticketDetails.evidenceType.charAt(0).toUpperCase() + ticketDetails.evidenceType.slice(1)}</span>
                        </div>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {showEvidenceOptions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEvidenceUpload('photo')}
                              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
                            >
                              <Image className="h-5 w-5 mr-2" />
                              Photo
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEvidenceUpload('video')}
                              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
                            >
                              <Video className="h-5 w-5 mr-2" />
                              Video
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEvidenceUpload('audio')}
                              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
                            >
                              <Mic className="h-5 w-5 mr-2" />
                              Audio
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitTicket}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium border border-blue-700"
                  >
                    Submit Ticket
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Role Change Section */}
          {activeTab === 'role-change' && (
            <motion.div
              key="role-change"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Role Change & Requests</h2>
                </div>
                
                <p className="text-gray-600 mb-6">Request changes to your role, working conditions, or apply for promotions and training opportunities.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {helpdeskData.roleChangeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.div
                        key={option.id}
                        whileHover={{ y: -5 }}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer bg-white"
                      >
                        <div className="flex items-center mb-3">
                          <Icon className="h-6 w-6 mr-2 text-blue-600" />
                          <h3 className="font-medium text-gray-800">{option.title}</h3>
                        </div>
                        <ul className="text-sm text-gray-600">
                          {option.options.map((opt, idx) => (
                            <li key={idx} className="mb-1">• {opt}</li>
                          ))}
                        </ul>
                        <button className="mt-3 text-sm text-blue-600 font-medium">
                          Request Change →
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Support Chat Section */}
          {activeTab === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 mr-2 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Chat Support</h2>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4 h-80 overflow-y-auto mb-4 border border-gray-300">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}>
                        <div className="flex items-center mb-1">
                          {msg.sender === 'bot' && <Bot className="h-4 w-4 mr-2 text-green-600" />}
                          <span className="text-sm">{msg.text}</span>
                        </div>
                        <div className={`text-xs ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'} text-right`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Type your message here..."
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendChatMessage}
                    className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg border border-blue-700"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 border border-gray-300"
                  >
                    <Volume2 className="h-4 w-4 mr-1" />
                    Voice Message
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 border border-gray-300"
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Video Call
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 border border-gray-300"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call Support
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Knowledge Base Section */}
          {activeTab === 'knowledge' && (
            <motion.div
              key="knowledge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Knowledge Base</h2>
                </div>
                
                <div className="flex mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search articles, guides, and FAQs..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </div>
                  <button className="ml-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center text-gray-700 border border-gray-300">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-gray-800">Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {helpdeskData.knowledgeBase.categories.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ y: -5 }}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer bg-white"
                      >
                        <h4 className="font-medium mb-2 text-gray-800">{category.title}</h4>
                        <ul className="text-sm text-gray-600">
                          {category.articles.slice(0, 3).map((article) => (
                            <li key={article.id} className="mb-1 flex items-center">
                              <FileText className="h-3 w-3 mr-2 text-blue-500" />
                              {article.title}
                            </li>
                          ))}
                        </ul>
                        <button className="mt-3 text-sm text-blue-600 font-medium">
                          View all articles →
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800">Video Tutorials</h3>
                    <button className="text-sm text-blue-600 font-medium">
                      View all →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {helpdeskData.knowledgeBase.videos.map((video) => (
                      <motion.div
                        key={video.id}
                        whileHover={{ y: -5 }}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md bg-white"
                      >
                        <div className="h-32 bg-gray-200 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                              <Video className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-sm mb-1 text-gray-800">{video.title}</h4>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>{video.views} views</span>
                            <button className="text-blue-600">Watch</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Peer Forum Section */}
          {activeTab === 'forum' && (
            <motion.div
              key="forum"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl p-5 shadow-lg bg-white border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Users className="h-6 w-6 mr-2 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Peer Support Forum</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm border border-indigo-700"
                  >
                    New Topic
                  </motion.button>
                </div>
                
                <div className="flex mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search forum topics..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {helpdeskData.peerForum.topics.map((topic) => (
                    <motion.div
                      key={topic.id}
                      whileHover={{ y: -2 }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer bg-white"
                    >
                      <div className="flex items-start">
                        {topic.anonymous && (
                          <div className="mr-3 p-2 bg-gray-100 rounded-full">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium mb-1 text-gray-800">{topic.title}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-3">{topic.replies} replies</span>
                            <span>{topic.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm mr-3">12</span>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm text-gray-700">
                    Load More Topics
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkerHelpdesk;