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
  AlertSquare,
  PieChart,
  Navigation,
  ZoomIn,
  ZoomOut,
  X
} from 'lucide-react';

// Recharts for data visualization
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
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
  const [mapFilter, setMapFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState({
    complaints: false,
    requests: false,
    workers: false
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBin, setSelectedBin] = useState(null);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [aiInsightsOpen, setAiInsightsOpen] = useState(true);
  const [mapView, setMapView] = useState('standard');
  const [searchQuery, setSearchQuery] = useState('');

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
        { id: 'N004', type: 'warning', title: 'Weather Alert', message: 'Heavy rains expected tomorrow. Collection might be delayed.', time: '2 hours ago', read: true }
      ],
      aiPredictions: {
        overflowRisk: [
          { binId: 'BIN-002', location: 'Gandhi Nagar', risk: 'High', predictedTime: '3 hours' },
          { binId: 'BIN-005', location: 'Nehru Colony', risk: 'High', predictedTime: '5 hours' },
          { binId: 'BIN-009', location: 'Central Park', risk: 'Medium', predictedTime: '8 hours' },
          { binId: 'BIN-007', location: 'Market Square', risk: 'Medium', predictedTime: '12 hours' }
        ],
        optimizationSuggestions: [
          { type: 'Route Optimization', impact: 'High', saving: '15% fuel', description: 'Adjust collection routes based on traffic patterns' },
          { type: 'Worker Allocation', impact: 'Medium', saving: '8% time', description: 'Reassign workers to high-priority zones' },
          { type: 'Bin Placement', impact: 'Low', saving: '5% efficiency', description: 'Add bins in high-density areas' }
        ]
      },
      wasteComposition: [
        { name: 'Organic', value: 45, color: '#4CAF50' },
        { name: 'Recyclable', value: 25, color: '#2196F3' },
        { name: 'General', value: 20, color: '#9E9E9E' },
        { name: 'Hazardous', value: 5, color: '#F44336' },
        { name: 'E-Waste', value: 5, color: '#FF9800' }
      ],
      workerDetails: [
        { id: 'W001', name: 'Rajesh Kumar', age: 32, experience: '5 years', contact: '9876543210', zone: 'Zone A', performance: 'Excellent', tasksCompleted: 45, rating: 4.7 },
        { id: 'W002', name: 'Priya Singh', age: 28, experience: '3 years', contact: '9876543211', zone: 'Zone B', performance: 'Good', tasksCompleted: 38, rating: 4.5 },
        { id: 'W003', name: 'Amit Patel', age: 35, experience: '7 years', contact: '9876543212', zone: 'Zone C', performance: 'Excellent', tasksCompleted: 42, rating: 4.8 },
        { id: 'W004', name: 'Sneha Desai', age: 29, experience: '4 years', contact: '9876543213', zone: 'Zone D', performance: 'Good', tasksCompleted: 36, rating: 4.6 },
        { id: 'W005', name: 'Vikram Joshi', age: 31, experience: '5 years', contact: '9876543214', zone: 'Zone E', performance: 'Average', tasksCompleted: 32, rating: 4.4 },
        { id: 'W006', name: 'Arun Mehta', age: 27, experience: '2 years', contact: '9876543215', zone: 'Zone F', performance: 'Average', tasksCompleted: 28, rating: 4.3 },
        { id: 'W007', name: 'Neha Reddy', age: 30, experience: '4 years', contact: '9876543216', zone: 'Zone A', performance: 'Good', tasksCompleted: 40, rating: 4.6 }
      ],
      binAnalytics: [
        { zone: 'Zone A', totalBins: 450, clean: 380, overflowing: 45, mixed: 25, avgFillLevel: 42 },
        { zone: 'Zone B', totalBins: 380, clean: 310, overflowing: 50, mixed: 20, avgFillLevel: 48 },
        { zone: 'Zone C', totalBins: 520, clean: 450, overflowing: 55, mixed: 15, avgFillLevel: 39 },
        { zone: 'Zone D', totalBins: 410, clean: 350, overflowing: 40, mixed: 20, avgFillLevel: 45 },
        { zone: 'Zone E', totalBins: 370, clean: 300, overflowing: 55, mixed: 15, avgFillLevel: 51 },
        { zone: 'Zone F', totalBins: 430, clean: 360, overflowing: 60, mixed: 10, avgFillLevel: 47 }
      ],
      complaintStats: [
        { type: 'Overflowing Bin', count: 65, resolved: 45, avgResolutionTime: '3.2h' },
        { type: 'Mixed Waste', count: 42, resolved: 32, avgResolutionTime: '4.1h' },
        { type: 'Missed Collection', count: 28, resolved: 25, avgResolutionTime: '2.5h' },
        { type: 'Illegal Dumping', count: 22, resolved: 15, avgResolutionTime: '6.8h' },
        { type: 'Broken Bin', count: 12, resolved: 10, avgResolutionTime: '8.2h' },
        { type: 'Animal Menace', count: 9, resolved: 8, avgResolutionTime: '5.5h' }
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

  // Handle bin selection
  const handleBinSelect = (bin) => {
    setSelectedBin(bin);
  };

  // Handle notification click
  const handleNotificationClick = (id) => {
    const updatedNotifications = dashboardData.notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    );
    setDashboardData({...dashboardData, notifications: updatedNotifications});
  };

  // Handle request action
  const handleRequestAction = (id, action) => {
    const updatedRequests = dashboardData.pendingRequests.filter(req => req.id !== id);
    setDashboardData({...dashboardData, pendingRequests: updatedRequests});
  };

  // Handle complaint assignment
  const assignComplaint = (complaintId, workerId) => {
    const worker = dashboardData.workerPerformance.find(w => w.id === workerId);
    const updatedComplaints = dashboardData.recentComplaints.map(comp => 
      comp.id === complaintId ? {...comp, assignedTo: worker.name, status: 'In Progress'} : comp
    );
    setDashboardData({...dashboardData, recentComplaints: updatedComplaints});
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

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'workers':
        return renderWorkers();
      case 'bins':
        return renderBins();
      case 'complaints':
        return renderComplaints();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderOverview();
    }
  };

  // Overview Tab Content
  const renderOverview = () => (
    <>
      {/* AI Insights Banner */}
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
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-800">AI Insights & Predictions</h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dashboardData.aiPredictions.overflowRisk.slice(0, 3).map((prediction, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500">
                      <h4 className="text-sm font-medium text-gray-900">Overflow Risk: {prediction.binId}</h4>
                      <p className="text-xs text-gray-500">{prediction.location}</p>
                      <div className="mt-2 flex items-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          prediction.risk === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {prediction.risk} Risk
                        </span>
                        <span className="ml-2 text-xs text-gray-500">Predicted in {prediction.predictedTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    View All Predictions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <h2 className="text-2xl font-bold">{dashboardData.kpis.totalCitizens.toLocaleString()}</h2>
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
              <h2 className="text-2xl font-bold">{dashboardData.kpis.totalWorkers}</h2>
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
              <h2 className="text-2xl font-bold">{dashboardData.kpis.complaintsRegistered}</h2>
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
              <h2 className="text-2xl font-bold">{dashboardData.kpis.activeBins.total}</h2>
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
              <h2 className="text-2xl font-bold">{dashboardData.kpis.wasteCollected.today} tons</h2>
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
        {/* Left Column - Map */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 h-full"
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Waste Bin Map</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                  <Search className="h-4 w-4 text-gray-500 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search bins..." 
                    className="bg-transparent text-sm outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Filter className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    value={mapFilter}
                    onChange={(e) => setMapFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Bins</option>
                    <option value="clean">Clean Only</option>
                    <option value="overflowing">Overflowing Only</option>
                    <option value="mixed">Mixed Waste Only</option>
                  </select>
                </div>
                <div className="relative">
                  <Map className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    value={mapView}
                    onChange={(e) => setMapView(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="standard">Standard View</option>
                    <option value="satellite">Satellite View</option>
                    <option value="heatmap">Heatmap View</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-5 h-96 relative">
              {/* Map Container */}
              <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden relative">
                {/* Simulated map with bin markers */}
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                  {/* Simulated roads */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1 bg-gray-400 transform rotate-45"></div>
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1 bg-gray-400 transform -rotate-45"></div>
                  <div className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-gray-400"></div>
                  <div className="absolute top-1/4 left-1/2 h-1/2 w-1 bg-gray-400"></div>
                  
                  {/* Bin markers */}
                  {dashboardData.binLocations
                    .filter(bin => {
                      if (mapFilter === 'all') return true;
                      return bin.status === mapFilter;
                    })
                    .filter(bin => {
                      if (!searchQuery) return true;
                      return bin.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             bin.area.toLowerCase().includes(searchQuery.toLowerCase());
                    })
                    .map((bin, index) => (
                    <motion.button
                      key={bin.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer flex items-center justify-center ${
                        bin.status === 'clean' ? 'bg-green-500' :
                        bin.status === 'overflowing' ? 'bg-red-500' : 'bg-yellow-500'
                      } ${selectedBin?.id === bin.id ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}
                      style={{
                        left: `${50 + (bin.lng - 72.8777) * 500}%`,
                        top: `${50 + (bin.lat - 19.0760) * 500}%`
                      }}
                      onClick={() => handleBinSelect(bin)}
                    >
                      <span className="text-xs font-bold text-white">{bin.fillLevel}%</span>
                      <div className="absolute -top-8 -left-4 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                        <div>ID: {bin.id}</div>
                        <div>Fill: {bin.fillLevel}%</div>
                        <div>Last: {bin.lastCollected}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs">Clean</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-xs">Overflowing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-xs">Mixed Waste</span>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow flex">
                  <button className="p-1 bg-blue-100 rounded mr-2">
                    <Navigation className="h-4 w-4 text-blue-600" />
                  </button>
                  <button className="p-1 bg-gray-100 rounded mr-2">
                    <ZoomIn className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 bg-gray-100 rounded">
                    <ZoomOut className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Bin Details */}
            {selectedBin && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 border-t border-gray-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Bin Details: {selectedBin.id}</h3>
                  <button onClick={() => setSelectedBin(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <div className="flex items-center mt-1">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        selectedBin.status === 'clean' ? 'bg-green-500' :
                        selectedBin.status === 'overflowing' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm font-medium capitalize">{selectedBin.status}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fill Level</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          selectedBin.fillLevel < 70 ? 'bg-green-500' :
                          selectedBin.fillLevel < 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedBin.fillLevel}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1">{selectedBin.fillLevel}% full</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Collected</p>
                    <p className="text-sm font-medium">{selectedBin.lastCollected}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type & Area</p>
                    <p className="text-sm font-medium">{selectedBin.type} • {selectedBin.area}</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200">
                    Schedule Collection
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200">
                    View History
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Notifications and Performance */}
        <div className="space-y-6">
          {/* Notifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button 
                onClick={() => setNotificationPanelOpen(true)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </button>
            </div>
            <div className="p-5 max-h-80 overflow-y-auto">
              {dashboardData.notifications.slice(0, 4).map((notification, index) => (
                <motion.div 
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg mb-3 cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 mr-3 ${
                      notification.type === 'alert' ? 'bg-red-100' :
                      notification.type === 'info' ? 'bg-blue-100' :
                                            notification.type === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {notification.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      {notification.type === 'info' && <Bell className="h-4 w-4 text-blue-600" />}
                      {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {notification.type === 'warning' && <AlertOctagon className="h-4 w-4 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 ml-2"></div>
                    )}
                  </div>
                </motion.div>
              ))}
              {dashboardData.notifications.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <Bell className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm">No notifications</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Worker Performance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Top Performers</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            <div className="p-5">
              {dashboardData.workerPerformance.slice(0, 3).map((worker, index) => (
                <motion.div 
                  key={worker.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{worker.name}</h4>
                      <p className="text-xs text-gray-500">{worker.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{worker.rating}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      worker.status === 'active' ? 'bg-green-500' :
                      worker.status === 'break' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                </motion.div>
              ))}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Rating</span>
                  <span className="font-medium">
                    {(
                      dashboardData.workerPerformance.reduce((sum, worker) => sum + worker.rating, 0) / 
                      dashboardData.workerPerformance.length
                    ).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Active Workers</span>
                  <span className="font-medium">
                    {dashboardData.workerPerformance.filter(w => w.status === 'active').length}/
                    {dashboardData.workerPerformance.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Charts and Additional Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Waste Collection Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Waste Collection Metrics</h2>
            <div className="flex items-center space-x-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="pl-3 pr-8 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={timeRange === 'day' ? dashboardData.collectionMetrics.daily : 
                      timeRange === 'week' ? dashboardData.collectionMetrics.weekly : 
                      dashboardData.collectionMetrics.monthly}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey={timeRange === 'day' ? 'time' : timeRange === 'week' ? 'day' : 'week'} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="collection" 
                  name="Waste Collected (tons)" 
                  fill="#8884d8" 
                  barSize={20}
                />
                <Line 
                  type="monotone" 
                  dataKey="trips" 
                  name="Collection Trips" 
                  stroke="#ff7300" 
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Waste Composition Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Waste Composition</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span>This Month</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
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
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {dashboardData.wasteComposition.map((item, index) => (
              <div key={index} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 rounded-sm mr-1" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Complaints and Requests Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Complaints Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Complaints</h2>
            <button 
              onClick={() => toggleCardExpansion('complaints')}
              className="text-blue-600 hover:text-blue-800"
            >
              {expandedCards.complaints ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
                    <th className="pb-2">ID</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentComplaints
                    .slice(0, expandedCards.complaints ? undefined : 3)
                    .map((complaint, index) => (
                    <tr key={complaint.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 text-sm font-medium">{complaint.id}</td>
                      <td className="py-3 text-sm">{complaint.type}</td>
                      <td className="py-3 text-sm">{complaint.location}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500">{complaint.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!expandedCards.complaints && dashboardData.recentComplaints.length > 3 && (
              <div className="mt-4 text-center">
                <button 
                  onClick={() => toggleCardExpansion('complaints')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all {dashboardData.recentComplaints.length} complaints
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Pending Requests Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Pending Requests</h2>
            <button 
              onClick={() => toggleCardExpansion('requests')}
              className="text-blue-600 hover:text-blue-800"
            >
              {expandedCards.requests ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
                    <th className="pb-2">ID</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Applicant</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.pendingRequests
                    .slice(0, expandedCards.requests ? undefined : 3)
                    .map((request, index) => (
                    <tr key={request.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 text-sm font-medium">{request.id}</td>
                      <td className="py-3 text-sm">{request.type}</td>
                      <td className="py-3 text-sm">{request.applicant}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          request.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500">{request.time}</td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleRequestAction(request.id, 'approve')}
                            className="text-green-600 hover:text-green-800"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleRequestAction(request.id, 'reject')}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!expandedCards.requests && dashboardData.pendingRequests.length > 3 && (
              <div className="mt-4 text-center">
                <button 
                  onClick={() => toggleCardExpansion('requests')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all {dashboardData.pendingRequests.length} requests
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );

  // Workers Tab Content
  const renderWorkers = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-blue-100 mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.totalWorkers}</h2>
              <p className="text-sm text-gray-600">Total Workers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-green-100 mr-4">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {dashboardData.workerPerformance.filter(w => w.status === 'active').length}
              </h2>
              <p className="text-sm text-gray-600">Active Now</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-yellow-100 mr-4">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {dashboardData.workerPerformance.reduce((max, worker) => 
                  Math.max(max, worker.rating), 0).toFixed(1)}
              </h2>
              <p className="text-sm text-gray-600">Top Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-purple-100 mr-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {(
                  dashboardData.workerPerformance.reduce((sum, worker) => sum + worker.attendance, 0) / 
                  dashboardData.workerPerformance.length
                ).toFixed(1)}%
              </h2>
              <p className="text-sm text-gray-600">Avg. Attendance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Worker Management</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search workers..." 
                className="bg-transparent text-sm outline-none"
              />
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700">
              Add Worker
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
                  <th className="pb-3">Worker</th>
                  <th className="pb-3">Zone</th>
                  <th className="pb-3">Attendance</th>
                  <th className="pb-3">Tasks</th>
                  <th className="pb-3">Resolved</th>
                  <th className="pb-3">Rating</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.workerDetails.map((worker, index) => (
                  <tr key={worker.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{worker.name}</div>
                          <div className="text-xs text-gray-500">{worker.experience}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm">{worker.zone}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${worker.performance === 'Excellent' ? 100 : worker.performance === 'Good' ? 75 : 50}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{worker.performance}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-center">{worker.tasksCompleted}</td>
                    <td className="py-4 text-sm text-center">{(worker.tasksCompleted * 0.9).toFixed(0)}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{worker.rating}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        index % 5 === 0 ? 'bg-green-100 text-green-800' :
                        index % 5 === 1 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {index % 5 === 0 ? 'Active' : index % 5 === 1 ? 'Break' : 'Off'}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Bins Tab Content
  const renderBins = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-blue-100 mr-4">
              <Trash2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.activeBins.total}</h2>
              <p className="text-sm text-gray-600">Total Bins</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-green-100 mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.activeBins.clean}</h2>
              <p className="text-sm text-gray-600">Clean Bins</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-red-100 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.activeBins.overflowing}</h2>
              <p className="text-sm text-gray-600">Overflowing</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-yellow-100 mr-4">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.activeBins.mixed}</h2>
              <p className="text-sm text-gray-600">Mixed Waste</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Bin Analytics by Zone</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart
                data={dashboardData.binAnalytics}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clean" name="Clean" fill="#10B981" />
                <Bar dataKey="overflowing" name="Overflowing" fill="#EF4444" />
                <Bar dataKey="mixed" name="Mixed Waste" fill="#F59E0B" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Bin Status Distribution</h2>
          </div>
          <div className="p-5">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
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
                    label
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
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Bin Types</h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {[
                { type: 'General Waste', count: 1250, percentage: 49 },
                { type: 'Recyclable', count: 780, percentage: 30 },
                { type: 'Organic', count: 430, percentage: 17 },
                { type: 'Hazardous', count: 100, percentage: 4 }
              ].map((binType, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{binType.type}</span>
                    <span className="font-medium">{binType.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${binType.percentage}%`,
                        backgroundColor: 
                          index === 0 ? '#9E9E9E' : 
                          index === 1 ? '#2196F3' : 
                          index === 2 ? '#4CAF50' : '#F44336'
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {binType.count} bins
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Complaints Tab Content
  const renderComplaints = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-blue-100 mr-4">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.complaintsRegistered}</h2>
              <p className="text-sm text-gray-600">Total Complaints</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-green-100 mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {dashboardData.recentComplaints.filter(c => c.status === 'Resolved').length}
              </h2>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-yellow-100 mr-4">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {dashboardData.recentComplaints.filter(c => c.status === 'In Progress').length}
              </h2>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-red-100 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {dashboardData.recentComplaints.filter(c => c.status === 'Pending').length}
              </h2>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Complaints by Type</h2>
          </div>
          <div className="p-5">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={dashboardData.complaintStats}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="type" 
                    tick={{ fontSize: 12 }}
                    width={90}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Total Complaints" fill="#8884d8" />
                  <Bar dataKey="resolved" name="Resolved" fill="#82ca9d" />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Complaint Resolution Time</h2>
          </div>
          <div className="p-5">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dashboardData.citizenEngagement.complaintsTrend}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="complaints" 
                    name="Complaints Registered" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    name="Complaints Resolved" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">All Complaints</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search complaints..." 
                className="bg-transparent text-sm outline-none"
              />
            </div>
            <select className="pl-3 pr-8 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Assigned To</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentComplaints.map((complaint, index) => (
                  <tr key={complaint.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="py-4 text-sm font-medium">{complaint.id}</td>
                    <td className="py-4 text-sm">{complaint.type}</td>
                    <td className="py-4 text-sm">{complaint.location}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                        complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm">{complaint.assignedTo}</td>
                    <td className="py-4 text-sm text-gray-500">{complaint.time}</td>
                    <td className="py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Analytics Tab Content
  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-blue-100 mr-4">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.segregationRate}%</h2>
              <p className="text-sm text-gray-600">Segregation Rate</p>
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+5.2% from last month</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-green-100 mr-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.recyclingRate}%</h2>
              <p className="text-sm text-gray-600">Recycling Rate</p>
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+3.8% from last month</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-purple-100 mr-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dashboardData.kpis.avgResponseTime}</h2>
              <p className="text-sm text-gray-600">Avg. Response Time</p>
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500">+0.3h from last week</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Citizen Engagement Trends</h2>
          </div>
          <div className="p-5">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dashboardData.citizenEngagement.complaintsTrend}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="complaints" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="resolved" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Top Performing Areas</h2>
          </div>
          <div className="p-5">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dashboardData.citizenEngagement.topAreas[0]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Area" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {dashboardData.citizenEngagement.topAreas.slice(0, 2).map((area, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm">{area.name}</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Compliance:</span>
                      <span className="font-medium ml-1">{area.compliance}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Participation:</span>
                      <span className="font-medium ml-1">{area.participation}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Monthly Collection Trends</h2>
        </div>
        <div className="p-5">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={dashboardData.collectionMetrics.monthly}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="collection" name="Total Collection (tons)" fill="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="recycling" name="Recycling (tons)" stroke="#82ca9d" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trash2 className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="ml-2 text-xl font-semibold text-gray-900">WasteWise Authority Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={refreshData}
                disabled={isRefreshing}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              
              <button 
                onClick={() => setNotificationPanelOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 relative"
              >
                <Bell className="h-5 w-5" />
                {dashboardData.notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
                )}
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-sm text-left hidden md:block">
                    <div className="font-medium">Admin User</div>
                    <div className="text-gray-500">City Authority</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                
                {/* User Menu Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="h-4 w-4 inline mr-2" />
                        Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="h-4 w-4 inline mr-2" />
                        Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <HelpCircle className="h-4 w-4 inline mr-2" />
                        Help & Support
                      </a>
                      <div className="border-t border-gray-100 my-1"></div>
                      <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <LogOut className="h-4 w-4 inline mr-2" />
                        Sign out
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: <Home className="h-4 w-4" /> },
            { id: 'workers', label: 'Workers', icon: <Users className="h-4 w-4" /> },
            { id: 'bins', label: 'Bins', icon: <Trash2 className="h-4 w-4" /> },
            { id: 'complaints', label: 'Complaints', icon: <AlertCircle className="h-4 w-4" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderTabContent()}
      </main>

      {/* Notification Panel */}
      <AnimatePresence>
        {notificationPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setNotificationPanelOpen(false)}
            ></motion.div>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl z-50"
            >
              <div className="h-full flex flex-col">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">Notifications</h2>
                    <button 
                      onClick={() => setNotificationPanelOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {dashboardData.notifications.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {dashboardData.notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-6 cursor-pointer hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex items-start">
                            <div className={`rounded-full p-2 mr-4 ${
                              notification.type === 'alert' ? 'bg-red-100' :
                              notification.type === 'info' ? 'bg-blue-100' :
                              notification.type === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                              {notification.type === 'alert' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                              {notification.type === 'info' && <Bell className="h-5 w-5 text-blue-600" />}
                              {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                              {notification.type === 'warning' && <AlertOctagon className="h-5 w-5 text-yellow-600" />}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-medium">{notification.title}</h3>
                              <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                              <p className="mt-2 text-xs text-gray-500">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-blue-500 ml-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-sm font-medium text-gray-900">No notifications</h3>
                      <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
                    </div>
                  )}
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <button className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Mark all as read
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setUserMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AuthorityDashboard;