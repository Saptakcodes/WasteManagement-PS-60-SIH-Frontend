import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserCheck,
  AlertCircle,
  Trash2,
  BarChart3,
  MapPin,
  Filter,
  Award,
  TrendingUp,
  Bell,
  CheckCircle,
  Send,
  BellRing,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  RefreshCw,
  MoreHorizontal,
  Clock,
  Eye,
  EyeOff,
  Star,
  Map,
  Settings,
  LogOut,
  User,
  HelpCircle,
  FileText,
  Shield,
  Truck,
  Calendar,
  Target,
  Cpu,
  Zap,
  AlertOctagon,
  Home,
  UserCog,
  Trash,
  MessageSquare,
  PieChart as PieChartIcon
} from 'lucide-react';

// Recharts for data visualization
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  ComposedChart,
  Scatter
} from 'recharts';

const AuthorityDashboard = () => {
  // State for all dashboard data
  const [dashboardData, setDashboardData] = useState(null);
  const [expandedCards, setExpandedCards] = useState({
    complaints: false,
    requests: false,
    workers: false
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [aiInsightsOpen, setAiInsightsOpen] = useState(true);
  const [showAllPredictions, setShowAllPredictions] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [systemStatusFilter, setSystemStatusFilter] = useState('all');

  // Generate more comprehensive mock data
  const generateMockData = () => {
    return {
      kpis: {
        totalCitizens: 125430,
        totalWorkers: 345,
        complaintsRegistered: 178,
        activeBins: {
          total: 2560,
          clean: 1890,
          overflowing: 420,
          mixed: 250
        },
        wasteCollected: {
          today: 42.5,
          week: 285.3,
          month: 1250.8
        },
        segregationRate: 72,
        avgResponseTime: '2.4h',
        recyclingRate: 38
      },
      workerPerformance: [
        { id: 'W001', name: 'Rajesh Kumar', attendance: 95, tasks: 88, resolved: 92, rating: 4.7, status: 'active', area: 'Zone A' },
        { id: 'W002', name: 'Priya Singh', attendance: 89, tasks: 94, resolved: 86, rating: 4.5, status: 'break', area: 'Zone B' },
        { id: 'W003', name: 'Amit Patel', attendance: 92, tasks: 82, resolved: 95, rating: 4.8, status: 'active', area: 'Zone C' },
        { id: 'W004', name: 'Sneha Desai', attendance: 98, tasks: 90, resolved: 89, rating: 4.6, status: 'off', area: 'Zone D' },
        { id: 'W005', name: 'Vikram Joshi', attendance: 87, tasks: 96, resolved: 91, rating: 4.4, status: 'active', area: 'Zone E' },
        { id: 'W006', name: 'Arun Mehta', attendance: 93, tasks: 85, resolved: 90, rating: 4.3, status: 'active', area: 'Zone F' },
        { id: 'W007', name: 'Neha Reddy', attendance: 91, tasks: 92, resolved: 87, rating: 4.6, status: 'break', area: 'Zone A' }
      ],
      citizenEngagement: {
        segregationCompliance: 72,
        complaintsTrend: [
          { day: 'Mon', complaints: 12, resolved: 10 },
          { day: 'Tue', complaints: 19, resolved: 16 },
          { day: 'Wed', complaints: 15, resolved: 14 },
          { day: 'Thu', complaints: 22, resolved: 18 },
          { day: 'Fri', complaints: 18, resolved: 15 },
          { day: 'Sat', complaints: 14, resolved: 12 },
          { day: 'Sun', complaints: 9, resolved: 8 }
        ],
        engagementGrowth: 15.3,
        rewardsDistributed: 2450,
        topAreas: [
          { name: 'Green Valley', compliance: 89, participation: 78 },
          { name: 'Sunrise Colony', compliance: 85, participation: 72 },
          { name: 'River Side', compliance: 82, participation: 68 },
          { name: 'Metro Heights', compliance: 79, participation: 65 },
          { name: 'Central Town', compliance: 75, participation: 62 }
        ]
      },
      binLocations: [
        { id: 'BIN-001', lat: 19.0760, lng: 72.8777, status: 'clean', fillLevel: 45, lastCollected: '2 hours ago', type: 'General', area: 'Commercial' },
        { id: 'BIN-002', lat: 19.0759, lng: 72.8785, status: 'overflowing', fillLevel: 95, lastCollected: '1 day ago', type: 'Recyclable', area: 'Residential' },
        { id: 'BIN-003', lat: 19.0765, lng: 72.8770, status: 'mixed', fillLevel: 80, lastCollected: '6 hours ago', type: 'General', area: 'Public' },
        { id: 'BIN-004', lat: 19.0762, lng: 72.8780, status: 'clean', fillLevel: 30, lastCollected: '3 hours ago', type: 'Organic', area: 'Commercial' },
        { id: 'BIN-005', lat: 19.0755, lng: 72.8775, status: 'overflowing', fillLevel: 100, lastCollected: '2 days ago', type: 'General', area: 'Residential' },
        { id: 'BIN-006', lat: 19.0768, lng: 72.8788, status: 'clean', fillLevel: 60, lastCollected: '5 hours ago', type: 'Recyclable', area: 'Public' },
        { id: 'BIN-007', lat: 19.0758, lng: 72.8790, status: 'mixed', fillLevel: 75, lastCollected: '8 hours ago', type: 'General', area: 'Commercial' },
        { id: 'BIN-008', lat: 19.0763, lng: 72.8765, status: 'clean', fillLevel: 25, lastCollected: '1 hour ago', type: 'Organic', area: 'Residential' },
        { id: 'BIN-009', lat: 19.0770, lng: 72.8760, status: 'overflowing', fillLevel: 92, lastCollected: '18 hours ago', type: 'General', area: 'Public' },
        { id: 'BIN-010', lat: 19.0745, lng: 72.8780, status: 'clean', fillLevel: 40, lastCollected: '4 hours ago', type: 'Recyclable', area: 'Commercial' }
      ],
      recentComplaints: [
        { id: 'CMP-1024', type: 'Overflowing Bin', location: 'MG Road', status: 'Pending', time: '15 min ago', priority: 'High', assignedTo: 'Unassigned' },
        { id: 'CMP-1023', type: 'Mixed Waste', location: 'Gandhi Nagar', status: 'In Progress', time: '45 min ago', priority: 'Medium', assignedTo: 'Rajesh Kumar' },
        { id: 'CMP-1022', type: 'Missed Collection', location: 'Nehru Colony', status: 'Resolved', time: '2 hours ago', priority: 'Low', assignedTo: 'Priya Singh' },
        { id: 'CMP-1021', type: 'Illegal Dumping', location: 'Market Square', status: 'Pending', time: '3 hours ago', priority: 'High', assignedTo: 'Unassigned' },
        { id: 'CMP-1020', type: 'Broken Bin', location: 'Central Park', status: 'In Progress', time: '5 hours ago', priority: 'Medium', assignedTo: 'Amit Patel' },
        { id: 'CMP-1019', type: 'Animal Menace', location: 'Lake View', status: 'Resolved', time: '1 day ago', priority: 'Low', assignedTo: 'Sneha Desai' }
      ],
      pendingRequests: [
        { id: 'REQ-0042', type: 'Worker Role Change', applicant: 'Sanjay Verma', time: '2 hours ago', status: 'Pending' },
        { id: 'REQ-0041', type: 'New Bin Request', applicant: 'Residents Association', time: '5 hours ago', status: 'Under Review' },
        { id: 'REQ-0040', type: 'Collection Schedule Change', applicant: 'Local Business Owner', time: '1 day ago', status: 'Pending' },
        { id: 'REQ-0039', type: 'Complaint Appeal', applicant: 'Rahul Sharma', time: '1 day ago', status: 'Under Review' },
        { id: 'REQ-0038', type: 'Area Transfer', applicant: 'Vikram Joshi', time: '2 days ago', status: 'Pending' }
      ],
      collectionMetrics: {
        daily: [
          { time: '00:00', collection: 120, trips: 15 },
          { time: '04:00', collection: 350, trips: 28 },
          { time: '08:00', collection: 720, trips: 42 },
          { time: '12:00', collection: 980, trips: 55 },
          { time: '16:00', collection: 650, trips: 38 },
          { time: '20:00', collection: 420, trips: 25 }
        ],
        weekly: [
          { day: 'Mon', collection: 42.5, trips: 120 },
          { day: 'Tue', collection: 48.2, trips: 135 },
          { day: 'Wed', collection: 39.8, trips: 115 },
          { day: 'Thu', collection: 51.3, trips: 145 },
          { day: 'Fri', collection: 45.7, trips: 130 },
          { day: 'Sat', collection: 38.2, trips: 110 },
          { day: 'Sun', collection: 19.6, trips: 75 }
        ],
        monthly: [
          { week: 'Week 1', collection: 285, recycling: 95 },
          { week: 'Week 2', collection: 312, recycling: 112 },
          { week: 'Week 3', collection: 298, recycling: 105 },
          { week: 'Week 4', collection: 355, recycling: 128 }
        ]
      },
      notifications: [
        { id: 'N001', type: 'alert', title: 'Bin Overflow Alert', message: 'BIN-002 is at 95% capacity', time: '10 min ago', read: false },
        { id: 'N002', type: 'info', title: 'New Request Received', message: 'New bin installation request from Green Valley', time: '25 min ago', read: false },
        { id: 'N003', type: 'success', title: 'Task Completed', message: 'Complaint CMP-1019 resolved by Sneha Desai', time: '1 hour ago', read: true },
        { id: 'N004', type: 'warning', title: 'Weather Alert', message: 'Heavy rains expected tomorrow. Collection might be delayed.', time: '2 hours ago', read: true },
        { id: 'N005', type: 'alert', title: 'Worker Shift Change', message: 'Rajesh Kumar has started his shift in Zone A', time: '3 hours ago', read: true },
        { id: 'N006', type: 'info', title: 'Monthly Report Ready', message: 'Monthly waste collection report is now available', time: '5 hours ago', read: true }
      ],
      aiPredictions: {
        overflowRisk: [
          { binId: 'BIN-002', location: 'Gandhi Nagar', risk: 'High', predictedTime: '3 hours' },
          { binId: 'BIN-005', location: 'Nehru Colony', risk: 'High', predictedTime: '5 hours' },
          { binId: 'BIN-009', location: 'Central Park', risk: 'Medium', predictedTime: '8 hours' },
          { binId: 'BIN-007', location: 'Market Square', risk: 'Medium', predictedTime: '12 hours' },
          { binId: 'BIN-003', location: 'Lake View', risk: 'Low', predictedTime: '24 hours' },
          { binId: 'BIN-010', location: 'MG Road', risk: 'Low', predictedTime: '36 hours' }
        ],
        optimizationSuggestions: [
          { type: 'Route Optimization', impact: 'High', saving: '15% fuel', description: 'Adjust collection routes based on traffic patterns' },
          { type: 'Worker Allocation', impact: 'Medium', saving: '8% time', description: 'Reassign workers to high-priority zones' },
          { type: 'Bin Placement', impact: 'Low', saving: '5% efficiency', description: 'Add bins in high-density areas' }
        ]
      },
      wasteComposition: [
        { name: 'Organic', value: 45, color: '#4CAF50' },
        { name: 'Recycle', value: 25, color: '#2196F3' },
        { name: 'General', value: 20, color: '#9E9E9E' },
        { name: 'Hazardous', value: 5, color: '#F44336' },
        { name: 'E-Waste', value: 5, color: '#FF9800' }
      ],
      systemStatus: [
        { name: 'API Connectivity', status: 'operational', lastChecked: '2 min ago' },
        { name: 'Database', status: 'operational', lastChecked: '5 min ago' },
        { name: 'Notification Service', status: 'degraded', lastChecked: '10 min ago' },
        { name: 'Mobile App Sync', status: 'operational', lastChecked: '1 min ago' },
        { name: 'Analytics Engine', status: 'maintenance', lastChecked: '15 min ago' }
      ]
    };
  };

  // Initialize data
  useEffect(() => {
    setDashboardData(generateMockData());
  }, []);

  // Function to simulate data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDashboardData(generateMockData());
      setIsRefreshing(false);
    }, 1500);
  };

  // Toggle card expansion
  const toggleCardExpansion = (card) => {
    setExpandedCards({
      ...expandedCards,
      [card]: !expandedCards[card]
    });
  };

  // Handle notification click
  const handleNotificationClick = (id) => {
    const updatedNotifications = dashboardData.notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    );
    setDashboardData({...dashboardData, notifications: updatedNotifications});
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    const updatedNotifications = dashboardData.notifications.map(notif => ({...notif, read: true}));
    setDashboardData({...dashboardData, notifications: updatedNotifications});
  };

  // Handle request action
  const handleRequestAction = (id, action) => {
    const updatedRequests = dashboardData.pendingRequests.filter(req => req.id !== id);
    setDashboardData({...dashboardData, pendingRequests: updatedRequests});
  };

  // Handle complaint assignment
  const assignComplaint = (complaintId, workerId) => {
    if (!workerId) return;
    
    const worker = dashboardData.workerPerformance.find(w => w.id === workerId);
    const updatedComplaints = dashboardData.recentComplaints.map(comp => 
      comp.id === complaintId ? {...comp, assignedTo: worker.name, status: 'In Progress'} : comp
    );
    setDashboardData({...dashboardData, recentComplaints: updatedComplaints});
  };

  // Handle export data
  const handleExport = () => {
    alert(`Data exported as ${exportFormat.toUpperCase()} format`);
  };

  // Handle quick actions
  const handleQuickAction = (action) => {
    switch(action) {
      case 'approve':
        alert('Opening request approval panel');
        break;
      case 'assign':
        alert('Opening task assignment panel');
        break;
      case 'notify':
        alert('Opening notification composer');
        break;
      case 'escalate':
        alert('Opening issue escalation form');
        break;
      default:
        break;
    }
  };

  // Handle AI prediction view
  const handleViewAllPredictions = () => {
    setShowAllPredictions(true);
  };

  // Handle notification view
  const handleViewAllNotifications = () => {
    setShowAllNotifications(true);
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C'];
  const STATUS_COLORS = {
    clean: '#10B981',
    overflowing: '#EF4444',
    mixed: '#F59E0B'
  };
  const PRIORITY_COLORS = {
    High: '#EF4444',
    Medium: '#F59E0B',
    Low: '#10B981'
  };

  if (!dashboardData) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading Dashboard...</div>;
  }

  // Filtered notifications based on showAll state
  const displayedNotifications = showAllNotifications 
    ? dashboardData.notifications 
    : dashboardData.notifications.slice(0, 4);

  // Filtered predictions based on showAll state
  const displayedPredictions = showAllPredictions
    ? dashboardData.aiPredictions.overflowRisk
    : dashboardData.aiPredictions.overflowRisk.slice(0, 3);

  // Filter system status based on filter
  const filteredSystemStatus = systemStatusFilter === 'all' 
    ? dashboardData.systemStatus 
    : dashboardData.systemStatus.filter(item => item.status === systemStatusFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900">SwachhaSebak Authority Dashboard</h1>
                <p className="text-sm text-gray-600">Central control hub for municipal waste management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-gray-900 focus:outline-none relative"
                >
                  <Bell className="h-6 w-6" />
                  {dashboardData.notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </motion.button> */}
                
                {/* Notification Panel */}
                <AnimatePresence>
                  {notificationPanelOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200"
                    >
                      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                        <button 
                          onClick={markAllNotificationsAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {displayedNotifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? 'bg-gray-50' : 'bg-white'}`}
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                                notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                                notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                                notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                'bg-yellow-100 text-yellow-600'
                              }`}>
                                {notification.type === 'alert' && <AlertCircle className="h-4 w-4" />}
                                {notification.type === 'info' && <Bell className="h-4 w-4" />}
                                {notification.type === 'success' && <CheckCircle className="h-4 w-4" />}
                                {notification.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-500">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {dashboardData.notifications.length > 4 && (
                        <div className="p-2 bg-gray-50 text-center">
                          <button 
                            className="text-sm text-blue-600 hover:text-blue-800"
                            onClick={handleViewAllNotifications}
                          >
                            {showAllNotifications ? 'Show Less' : 'View All Notifications'}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshData}
                className="flex items-center px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </motion.button>
              
              <div className="relative">
                {/* <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">AM</div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button> */}
                
                {/* User Menu Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                    >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="inline h-4 w-4 mr-2" />
                        Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="inline h-4 w-4 mr-2" />
                        Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <HelpCircle className="inline h-4 w-4 mr-2" />
                        Help & Support
                      </a>
                      <div className="border-t border-gray-100"></div>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogOut className="inline h-4 w-4 mr-2" />
                        Sign out
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto sm:overflow-visible border-b border-gray-200 scrollbar-hide">
            <div className="flex min-w-max sm:min-w-0">
              <button
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <Home className="h-4 w-4 mr-2" />
                Overview
              </button>

              <button
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                  activeTab === 'workers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('workers')}
              >
                <UserCog className="h-4 w-4 mr-2" />
                Workers
              </button>

              <button
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                  activeTab === 'bins'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('bins')}
              >
                <Trash className="h-4 w-4 mr-2" />
                Bins & Collection
              </button>

              <button
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                  activeTab === 'complaints'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('complaints')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Complaints
              </button>

              <button
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('analytics')}
              >
                <PieChartIcon className="h-4 w-4 mr-2" />
                Analytics
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* AI Insights Banner
        <AnimatePresence>
          {aiInsightsOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-200 relative"
            >
              <button 
                onClick={() => setAiInsightsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Cpu className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-blue-800">AI Insights & Predictions</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {displayedPredictions.map((prediction, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500">
                        <h4 className="text-sm font-medium text-gray-900">Overflow Risk: {prediction.binId}</h4>
                        <p className="text-xs text-gray-500">{prediction.location}</p>
                        <div className="mt-2 flex items-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            prediction.risk === 'High' ? 'bg-red-100 text-red-800' : 
                            prediction.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {prediction.risk} Risk
                          </span>
                          <span className="ml-2 text-xs text-gray-500">Predicted in {prediction.predictedTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {dashboardData.aiPredictions.overflowRisk.length > 3 && (
                    <div className="mt-4">
                      <button 
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        onClick={handleViewAllPredictions}
                      >
                        {showAllPredictions ? 'Show Less' : 'View All Predictions'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* Tab-specific content */}
        {activeTab === 'overview' && (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Total Citizens Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-blue-100 mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{dashboardData.kpis.totalCitizens.toLocaleString()}</h2>
                    <p className="text-sm text-gray-600">Total Citizens</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">+2.3% from last month</span>
                </div>
              </motion.div>

              {/* Total Workers Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-green-100 mr-4">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{dashboardData.kpis.totalWorkers}</h2>
                    <p className="text-sm text-gray-600">Total Workers</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <span className="text-gray-500">{dashboardData.workerPerformance.filter(w => w.status === 'active').length} currently active</span>
                </div>
              </motion.div>

              {/* Complaints Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-red-100 mr-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{dashboardData.kpis.complaintsRegistered}</h2>
                    <p className="text-sm text-gray-600">Complaints Registered</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <span className="text-red-500">{dashboardData.recentComplaints.filter(c => c.status !== 'Resolved').length} unresolved</span>
                </div>
              </motion.div>

              {/* Active Bins Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-yellow-100 mr-4">
                    <Trash2 className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{dashboardData.kpis.activeBins.total}</h2>
                    <p className="text-sm text-gray-600">Active Bins</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm space-x-2">
                  <span className="text-green-500">{dashboardData.kpis.activeBins.clean} clean</span>
                  <span className="text-red-500">{dashboardData.kpis.activeBins.overflowing} overflowing</span>
                </div>
              </motion.div>

              {/* Waste Collected Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-purple-100 mr-4">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{dashboardData.kpis.wasteCollected.today} tons</h2>
                    <p className="text-sm text-gray-600">Waste Collected Today</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <span className="text-gray-500">{dashboardData.kpis.wasteCollected.week} tons this week</span>
                </div>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Left Column - Bin Status Overview */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 h-full"
                >
                  <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Bin Status Overview</h2>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-green-800">Clean Bins</h3>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <p className="text-2xl font-bold mt-2 text-green-600">{dashboardData.kpis.activeBins.clean}</p>
                        <p className="text-sm text-green-700">{(dashboardData.kpis.activeBins.clean / dashboardData.kpis.activeBins.total * 100).toFixed(1)}% of total</p>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-red-800">Overflowing Bins</h3>
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        </div>
                        <p className="text-2xl font-bold mt-2 text-red-600">{dashboardData.kpis.activeBins.overflowing}</p>
                        <p className="text-sm text-red-700">{(dashboardData.kpis.activeBins.overflowing / dashboardData.kpis.activeBins.total * 100).toFixed(1)}% of total</p>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-yellow-800">Mixed Waste Bins</h3>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        </div>
                        <p className="text-2xl font-bold mt-2 text-yellow-600">{dashboardData.kpis.activeBins.mixed}</p>
                        <p className="text-sm text-yellow-700">{(dashboardData.kpis.activeBins.mixed / dashboardData.kpis.activeBins.total * 100).toFixed(1)}% of total</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-3 text-gray-800">Collection Priority Areas</h3>
                      <div className="space-y-3">
                        {dashboardData.binLocations
                          .filter(bin => bin.status === 'overflowing')
                          .slice(0, 5)
                          .map((bin, index) => (
                          <div key={bin.id} className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                            <div>
                              <div className="font-medium text-gray-800">{bin.id}</div>
                              <div className="text-sm text-gray-500">{bin.area} • {bin.type}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-red-600 font-medium">{bin.fillLevel}% full</div>
                              <div className="text-xs text-gray-500">Last: {bin.lastCollected}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center">
                        <span>View All Priority Collections</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Worker Performance */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 h-full"
                >
                  <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Worker Performance</h2>
                    <button 
                      onClick={() => toggleCardExpansion('workers')}
                      className="text-blue-600 text-sm flex items-center"
                    >
                      {expandedCards.workers ? 'Show Less' : 'View All'}
                      {expandedCards.workers ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dashboardData.workerPerformance.slice(0, 3)}>
                          <PolarGrid stroke="#ddd" />
                          <PolarAngleAxis dataKey="name" stroke="#555" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#555" />
                          <Radar name="Attendance" dataKey="attendance" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                          <Radar name="Tasks Completed" dataKey="tasks" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                          <Radar name="Complaints Resolved" dataKey="resolved" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                          <Legend />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="font-medium mb-2 text-gray-800">Top Performers</h3>
                      <div className="space-y-3">
                        {(expandedCards.workers ? dashboardData.workerPerformance : dashboardData.workerPerformance.slice(0, 3))
                          .map((worker, index) => (
                          <div key={worker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${
                                index === 0 ? 'bg-yellow-500' : 
                                index === 1 ? 'bg-gray-400' : 'bg-amber-900'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{worker.name}</div>
                                <div className="text-xs text-gray-500 flex items-center">
                                  <StarRating rating={worker.rating} />
                                  <span className="ml-1">{worker.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-800">{worker.attendance}%</div>
                              <div className="text-xs text-gray-500">Attendance</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Middle Grid - Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Waste Composition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Waste Composition</h2>
                </div>
                
                <div className="p-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dashboardData.wasteComposition}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {dashboardData.wasteComposition.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>

              {/* Collection Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Collection Metrics</h2>
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="pl-3 pr-8 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="day">Daily</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                  </select>
                </div>
                
                <div className="p-5">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={timeRange === 'day' ? dashboardData.collectionMetrics.daily : 
                              timeRange === 'week' ? dashboardData.collectionMetrics.weekly : 
                              dashboardData.collectionMetrics.monthly}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis dataKey={timeRange === 'day' ? 'time' : timeRange === 'week' ? 'day' : 'week'} stroke="#555" />
                        <YAxis yAxisId="left" stroke="#555" />
                        <YAxis yAxisId="right" orientation="right" stroke="#555" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey={timeRange === 'month' ? 'recycling' : 'collection'} fill="#8884d8" />
                        <Line yAxisId="right" type="monotone" dataKey="trips" stroke="#ff7300" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>

              {/* Citizen Engagement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Citizen Engagement</h2>
                </div>
                
                <div className="p-5">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={dashboardData.citizenEngagement.complaintsTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis dataKey="day" stroke="#555" />
                        <YAxis stroke="#555" />
                        <Tooltip />
                        <Area type="monotone" dataKey="complaints" stackId="1" stroke="#EF4444" fill="#FECACA" />
                        <Area type="monotone" dataKey="resolved" stackId="1" stroke="#10B981" fill="#BBF7D0" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {dashboardData.citizenEngagement.engagementGrowth}% engagement growth
                      </span>
                    </div>
                    <div className="flex items-center">
                      <select 
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="mr-2 pl-3 pr-8 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                      </select>
                      <button 
                        onClick={handleExport}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6"
            >
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
              </div>
              
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white flex items-center justify-between"
                    onClick={() => handleQuickAction('approve')}
                  >
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      <span>Approve Requests</span>
                    </div>
                    <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full">
                      {dashboardData.pendingRequests.length}
                    </span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white flex items-center"
                    onClick={() => handleQuickAction('assign')}
                  >
                    <Send className="h-5 w-5 mr-3" />
                    <span>Assign Tasks</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white flex items-center"
                    onClick={() => handleQuickAction('notify')}
                  >
                    <BellRing className="h-5 w-5 mr-3" />
                    <span>Send Notifications</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white flex items-center"
                    onClick={() => handleQuickAction('escalate')}
                  >
                    <AlertTriangle className="h-5 w-5 mr-3" />
                    <span>Escalate Issue</span>
                  </motion.button>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-800">System Status</h3>
                      <select 
                        value={systemStatusFilter}
                        onChange={(e) => setSystemStatusFilter(e.target.value)}
                        className="pl-3 pr-8 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="all">All</option>
                        <option value="operational">Operational</option>
                        <option value="degraded">Degraded</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      {filteredSystemStatus.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-800">{item.name}</span>
                          <span className={`w-3 h-3 rounded-full ${
                            item.status === 'operational' ? 'bg-green-500' :
                            item.status === 'degraded' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} title={`Last checked: ${item.lastChecked}`}></span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 text-gray-800">AI Optimization Tips</h3>
                    <div className="space-y-3">
                      {dashboardData.aiPredictions.optimizationSuggestions.map((suggestion, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-gray-800">{suggestion.type}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              suggestion.impact === 'High' ? 'bg-red-100 text-red-800' :
                              suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {suggestion.impact}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                          <p className="text-xs text-blue-600">Potential saving: {suggestion.saving}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Data Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Complaints */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Complaints</h2>
                  <button 
                    onClick={() => toggleCardExpansion('complaints')}
                    className="text-blue-600 text-sm flex items-center"
                    >
                    {expandedCards.complaints ? 'Show Less' : 'View All'}
                    {expandedCards.complaints ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                  </button>
                </div>
                
                <div className="p-5">
                  <div className="space-y-4">
                    {(expandedCards.complaints ? dashboardData.recentComplaints : dashboardData.recentComplaints.slice(0, 3))
                      .map((complaint, index) => (
                      <div key={complaint.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-800">{complaint.type}</div>
                          <div className="text-sm text-gray-500">{complaint.location}</div>
                          <div className="text-xs text-gray-400 mt-1">Assigned to: {complaint.assignedTo}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                            complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {complaint.status}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{complaint.time}</div>
                          <div className="mt-2 flex space-x-2">
                            <button 
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                              onClick={() => alert(`Viewing details for complaint ${complaint.id}`)}
                            >
                              Details
                            </button>
                            {complaint.status === 'Pending' && (
                              <select 
                                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                                onChange={(e) => assignComplaint(complaint.id, e.target.value)}
                                defaultValue=""
                              >
                                <option value="" disabled>Assign</option>
                                {dashboardData.workerPerformance
                                  .filter(worker => worker.status === 'active')
                                  .map(worker => (
                                  <option key={worker.id} value={worker.id}>{worker.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      Updated 5 minutes ago
                    </div>
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      onClick={() => alert('Opening complaint monitoring dashboard')}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Monitor All
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Pending Requests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Pending Requests</h2>
                  <button 
                    onClick={() => toggleCardExpansion('requests')}
                    className="text-blue-600 text-sm flex items-center"
                  >
                    {expandedCards.requests ? 'Show Less' : 'View All'}
                    {expandedCards.requests ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                  </button>
                </div>
                
                <div className="p-5">
                  <div className="space-y-4">
                    {(expandedCards.requests ? dashboardData.pendingRequests : dashboardData.pendingRequests.slice(0, 3))
                      .map((request, index) => (
                      <div key={request.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-800">{request.type}</div>
                          <div className="text-sm text-gray-500">{request.applicant}</div>
                          <div className={`text-xs mt-1 ${
                            request.status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'
                          }`}>
                            Status: {request.status}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{request.time}</div>
                          <div className="mt-2 flex space-x-2">
                            <button 
                              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                              onClick={() => handleRequestAction(request.id, 'approve')}
                            >
                              Approve
                            </button>
                            <button 
                              className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded"
                              onClick={() => handleRequestAction(request.id, 'reject')}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {dashboardData.pendingRequests.length} requests awaiting approval
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Workers Tab Content */}
        {activeTab === 'workers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Worker Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <UserCheck className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-blue-800">Total Workers</h3>
                    <p className="text-2xl font-bold text-blue-600">{dashboardData.kpis.totalWorkers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <UserCheck className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-green-800">Active Workers</h3>
                    <p className="text-2xl font-bold text-green-600">{dashboardData.workerPerformance.filter(w => w.status === 'active').length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center">
                  <UserCheck className="h-6 w-6 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-yellow-800">On Break</h3>
                    <p className="text-2xl font-bold text-yellow-600">{dashboardData.workerPerformance.filter(w => w.status === 'break').length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <UserCheck className="h-6 w-6 text-gray-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-800">Off Duty</h3>
                    <p className="text-2xl font-bold text-gray-600">{dashboardData.workerPerformance.filter(w => w.status === 'off').length}</p>
                  </div>
                </div>
                </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.workerPerformance.map((worker) => (
                    <tr key={worker.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                              {worker.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                            <div className="text-sm text-gray-500">{worker.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.area}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          worker.status === 'active' ? 'bg-green-100 text-green-800' :
                          worker.status === 'break' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {worker.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.attendance}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <StarRating rating={worker.rating} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-green-600 hover:text-green-900">Assign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Bins & Collection Tab Content */}
        {activeTab === 'bins' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Bins & Collection Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <Trash2 className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-green-800">Clean Bins</h3>
                    <p className="text-2xl font-bold text-green-600">{dashboardData.kpis.activeBins.clean}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <Trash2 className="h-6 w-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-red-800">Overflowing Bins</h3>
                    <p className="text-2xl font-bold text-red-600">{dashboardData.kpis.activeBins.overflowing}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center">
                  <Trash2 className="h-6 w-6 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Mixed Waste Bins</h3>
                    <p className="text-2xl font-bold text-yellow-600">{dashboardData.kpis.activeBins.mixed}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <Truck className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-blue-800">Today's Collection</h3>
                    <p className="text-2xl font-bold text-blue-600">{dashboardData.kpis.wasteCollected.today} tons</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-4 text-gray-800">Bin Status Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Clean', value: dashboardData.kpis.activeBins.clean, color: '#10B981' },
                          { name: 'Overflowing', value: dashboardData.kpis.activeBins.overflowing, color: '#EF4444' },
                          { name: 'Mixed', value: dashboardData.kpis.activeBins.mixed, color: '#F59E0B' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'Clean', value: dashboardData.kpis.activeBins.clean, color: '#10B981' },
                          { name: 'Overflowing', value: dashboardData.kpis.activeBins.overflowing, color: '#EF4444' },
                          { name: 'Mixed', value: dashboardData.kpis.activeBins.mixed, color: '#F59E0B' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-4 text-gray-800">Collection Progress</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dashboardData.collectionMetrics.daily}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                      <XAxis dataKey="time" stroke="#555" />
                      <YAxis stroke="#555" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="collection" fill="#3B82F6" name="Waste Collected (kg)" />
                      <Bar dataKey="trips" fill="#10B981" name="Collection Trips" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-medium mb-4 text-gray-800">Bin Locations & Status</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bin ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fill Level</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Collected</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.binLocations.map((bin) => (
                      <tr key={bin.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bin.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bin.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bin.area}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                bin.fillLevel < 50 ? 'bg-green-500' :
                                bin.fillLevel < 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${bin.fillLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{bin.fillLevel}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            bin.status === 'clean' ? 'bg-green-100 text-green-800' :
                            bin.status === 'overflowing' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {bin.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bin.lastCollected}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-green-600 hover:text-green-900">Schedule</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Complaints Tab Content */}
        {activeTab === 'complaints' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Complaint Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-red-800">Total Complaints</h3>
                    <p className="text-2xl font-bold text-red-600">{dashboardData.kpis.complaintsRegistered}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Pending</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {dashboardData.recentComplaints.filter(c => c.status === 'Pending').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <RefreshCw className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-blue-800">In Progress</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {dashboardData.recentComplaints.filter(c => c.status === 'In Progress').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-green-800">Resolved</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {dashboardData.recentComplaints.filter(c => c.status === 'Resolved').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Recent Complaints</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">All</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">Pending</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">In Progress</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">Resolved</button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.recentComplaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                            complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                            complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.assignedTo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          {complaint.status === 'Pending' && (
                            <button 
                              className="text-green-600 hover:text-green-900"
                              onClick={() => alert(`Assigning complaint ${complaint.id}`)}
                            >
                              Assign
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-4 text-gray-800">Complaint Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dashboardData.citizenEngagement.complaintsTrend}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                      <XAxis dataKey="day" stroke="#555" />
                      <YAxis stroke="#555" />
                      <Tooltip />
                      <Area type="monotone" dataKey="complaints" stackId="1" stroke="#EF4444" fill="#FECACA" name="Complaints" />
                      <Area type="monotone" dataKey="resolved" stackId="1" stroke="#10B981" fill="#BBF7D0" name="Resolved" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-4 text-gray-800">Complaint Types Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Overflowing Bin', value: 45 },
                          { name: 'Mixed Waste', value: 25 },
                          { name: 'Missed Collection', value: 15 },
                          { name: 'Illegal Dumping', value: 10 },
                          { name: 'Other', value: 5 }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'Overflowing Bin', value: 45, color: '#EF4444' },
                          { name: 'Mixed Waste', value: 25, color: '#F59E0B' },
                          { name: 'Missed Collection', value: 15, color: '#3B82F6' },
                          { name: 'Illegal Dumping', value: 10, color: '#8B5CF6' },
                          { name: 'Other', value: 5, color: '#6B7280' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-blue-800">Segregation Rate</h3>
                    <p className="text-2xl font-bold text-blue-600">{dashboardData.kpis.segregationRate}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-green-800">Recycling Rate</h3>
                    <p className="text-2xl font-bold text-green-600">{dashboardData.kpis.recyclingRate}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Avg Response Time</h3>
                    <p className="text-2xl font-bold text-yellow-600">{dashboardData.kpis.avgResponseTime}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-purple-800">Rewards Distributed</h3>
                    <p className="text-2xl font-bold text-purple-600">{dashboardData.citizenEngagement.rewardsDistributed.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-4 text-gray-800">Monthly Waste Collection Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dashboardData.collectionMetrics.monthly}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                      <XAxis dataKey="week" stroke="#555" />
                      <YAxis stroke="#555" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="collection" fill="#3B82F6" name="Total Waste (tons)" />
                      <Bar dataKey="recycling" fill="#10B981" name="Recycled Waste (tons)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-4 text-gray-800">Top Performing Areas</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dashboardData.citizenEngagement.topAreas}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                      <XAxis type="number" stroke="#555" />
                      <YAxis type="category" dataKey="name" width={80} stroke="#555" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="compliance" fill="#3B82F6" name="Compliance %" />
                      <Bar dataKey="participation" fill="#10B981" name="Participation %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-medium mb-4 text-gray-800">Export Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <FileText className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium mb-2 text-gray-800">Monthly Performance Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Detailed analysis of waste management performance</p>
                  <button className="w-full bg-blue-100 text-blue-800 py-2 rounded text-sm">Download PDF</button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <PieChartIcon className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-medium mb-2 text-gray-800">Citizen Engagement Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Participation and compliance metrics</p>
                  <button className="w-full bg-green-100 text-green-800 py-2 rounded text-sm">Download CSV</button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-medium mb-2 text-gray-800">Worker Performance Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Attendance, efficiency, and task completion</p>
                  <button className="w-full bg-purple-100 text-purple-800 py-2 rounded text-sm">Download Excel</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-4 text-gray-800">AI-Powered Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">Optimization Opportunities</h4>
                  <div className="space-y-3">
                    {dashboardData.aiPredictions.optimizationSuggestions.map((suggestion, index) => (
                      <div key={index} className="bg-white p-3 rounded border border-blue-100">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-gray-800">{suggestion.type}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            suggestion.impact === 'High' ? 'bg-red-100 text-red-800' :
                            suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {suggestion.impact} Impact
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                        <p className="text-xs text-blue-600">Potential saving: {suggestion.saving}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-3">Performance Forecast</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-green-100">
                      <h5 className="font-medium mb-2 text-gray-800">Next Month Projection</h5>
                      <p className="text-sm text-gray-600">Expected 8% increase in segregation compliance</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Current: 72%</span>
                        <span>Projected: 80%</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-green-100">
                      <h5 className="font-medium mb-2 text-gray-800">Resource Allocation</h5>
                      <p className="text-sm text-gray-600">Recommended worker redistribution based on zone demand</p>
                      <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Increase Zone A by 2 workers</li>
                        <li>• Decrease Zone C by 1 worker</li>
                        <li>• Add weekend shift in commercial areas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">Waste Management Authority Dashboard v1.0</span>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-sm text-gray-600">© 2023 Municipal Corporation. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < fullStars
              ? 'text-yellow-400 fill-current'
              : i === fullStars && hasHalfStar
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default AuthorityDashboard;