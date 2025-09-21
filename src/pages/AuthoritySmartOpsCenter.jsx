import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Bell,
  Download,
  Filter,
  MapPin,
  PieChart,
  Search,
  Send,
  Shield,
  Trash2,
  TrendingUp,
  Users,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Truck,
  Calendar,
  Target,
  Zap,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  RefreshCw,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Mail,
  MessageSquare,
  Star,
  Award,
  Home,
  Map,
  QrCode,
  Gauge,
  Cpu,
  Route,
  Plus
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

// Sample data generation functions
const generateWasteData = () => {
  return {
    segregation: [
      { name: 'Dry Waste', value: 45, color: '#4CAF50' },
      { name: 'Wet Waste', value: 35, color: '#2196F3' },
      { name: 'Hazardous', value: 10, color: '#F44336' },
      { name: 'Recyclable', value: 10, color: '#FF9800' }
    ],
    trends: {
      daily: [
        { day: 'Mon', dry: 120, wet: 95, hazardous: 15, recyclable: 25 },
        { day: 'Tue', dry: 135, wet: 105, hazardous: 18, recyclable: 28 },
        { day: 'Wed', dry: 125, wet: 98, hazardous: 16, recyclable: 26 },
        { day: 'Thu', dry: 140, wet: 110, hazardous: 20, recyclable: 30 },
        { day: 'Fri', dry: 155, wet: 120, hazardous: 22, recyclable: 32 },
        { day: 'Sat', dry: 130, wet: 100, hazardous: 17, recyclable: 27 },
        { day: 'Sun', dry: 115, wet: 90, hazardous: 14, recyclable: 24 }
      ],
      weekly: [
        { week: 'Week 1', total: 850, compliance: 72 },
        { week: 'Week 2', total: 920, compliance: 75 },
        { week: 'Week 3', total: 880, compliance: 78 },
        { week: 'Week 4', total: 950, compliance: 80 }
      ],
      monthly: [
        { month: 'Jan', total: 3500, compliance: 68 },
        { month: 'Feb', total: 3800, compliance: 72 },
        { month: 'Mar', total: 4200, compliance: 75 },
        { month: 'Apr', total: 3900, compliance: 77 },
        { month: 'May', total: 4100, compliance: 79 },
        { month: 'Jun', total: 4400, compliance: 82 }
      ]
    },
    wardComparison: [
      { ward: 'Ward 1', dry: 120, wet: 95, hazardous: 15, recyclable: 25, compliance: 85 },
      { ward: 'Ward 2', dry: 135, wet: 105, hazardous: 18, recyclable: 28, compliance: 78 },
      { ward: 'Ward 3', dry: 125, wet: 98, hazardous: 16, recyclable: 26, compliance: 82 },
      { ward: 'Ward 4', dry: 140, wet: 110, hazardous: 20, recyclable: 30, compliance: 75 },
      { ward: 'Ward 5', dry: 155, wet: 120, hazardous: 22, recyclable: 32, compliance: 88 },
      { ward: 'Ward 6', dry: 130, wet: 100, hazardous: 17, recyclable: 27, compliance: 80 },
      { ward: 'Ward 7', dry: 115, wet: 90, hazardous: 14, recyclable: 24, compliance: 83 }
    ],
    heatmapData: [
      { id: 1, ward: 'Ward 1', lat: 19.0760, lng: 72.8777, compliance: 85, wasteVolume: 255, status: 'good' },
      { id: 2, ward: 'Ward 2', lat: 19.0765, lng: 72.8780, compliance: 78, wasteVolume: 286, status: 'medium' },
      { id: 3, ward: 'Ward 3', lat: 19.0770, lng: 72.8785, compliance: 82, wasteVolume: 265, status: 'good' },
      { id: 4, ward: 'Ward 4', lat: 19.0775, lng: 72.8790, compliance: 75, wasteVolume: 300, status: 'poor' },
      { id: 5, ward: 'Ward 5', lat: 19.0780, lng: 72.8795, compliance: 88, wasteVolume: 240, status: 'excellent' },
      { id: 6, ward: 'Ward 6', lat: 19.0785, lng: 72.8800, compliance: 80, wasteVolume: 277, status: 'medium' },
      { id: 7, ward: 'Ward 7', lat: 19.0790, lng: 72.8805, compliance: 83, wasteVolume: 262, status: 'good' }
    ]
  };
};

const generateComplaintsData = () => {
  return {
    complaints: [
      { 
        id: 'CMP-001', 
        type: 'Overflowing Bin', 
        category: 'Bin Issues',
        location: 'MG Road, Ward 1', 
        description: 'Public bin near metro station is overflowing',
        status: 'Pending', 
        priority: 'High',
        time: '15 min ago', 
        assignedTo: null,
        citizen: { name: 'Rahul Sharma', phone: '9876543210' },
        sla: { deadline: '2 hours', status: 'on_track' }
      },
      { 
        id: 'CMP-002', 
        type: 'Mixed Waste', 
        category: 'Household Issues',
        location: 'Gandhi Nagar, Ward 3', 
        description: 'Residents not segregating waste properly',
        status: 'In Progress', 
        priority: 'Medium',
        time: '45 min ago', 
        assignedTo: 'Rajesh Kumar',
        citizen: { name: 'Priya Patel', phone: '9876543211' },
        sla: { deadline: '6 hours', status: 'due_soon' }
      },
      { 
        id: 'CMP-003', 
        type: 'Vehicle Breakdown', 
        category: 'Vehicle Issues',
        location: 'Nehru Colony, Ward 5', 
        description: 'Collection truck has broken down',
        status: 'Pending', 
        priority: 'High',
        time: '1 hour ago', 
        assignedTo: null,
        citizen: { name: 'Municipal Worker', phone: '9876543212' },
        sla: { deadline: '1 hour', status: 'overdue' }
      },
      { 
        id: 'CMP-004', 
        type: 'Worker Conflict', 
        category: 'Worker Issues',
        location: 'Market Square, Ward 2', 
        description: 'Dispute between collection workers',
        status: 'Resolved', 
        priority: 'Medium',
        time: '2 hours ago', 
        assignedTo: 'Supervisor Amit',
        citizen: { name: 'Local Vendor', phone: '9876543213' },
        sla: { deadline: '4 hours', status: 'resolved' }
      },
      { 
        id: 'CMP-005', 
        type: 'Missed Collection', 
        category: 'Household Issues',
        location: 'Lake View, Ward 4', 
        description: 'Regular collection missed for 2 days',
        status: 'In Progress', 
        priority: 'Medium',
        time: '3 hours ago', 
        assignedTo: 'Vikram Joshi',
        citizen: { name: 'Residents Association', phone: '9876543214' },
        sla: { deadline: '8 hours', status: 'on_track' }
      },
      { 
        id: 'CMP-006', 
        type: 'Illegal Dumping', 
        category: 'Public Issues',
        location: 'Central Park, Ward 6', 
        description: 'People dumping construction waste illegally',
        status: 'Pending', 
        priority: 'High',
        time: '5 hours ago', 
        assignedTo: null,
        citizen: { name: 'Security Guard', phone: '9876543215' },
        sla: { deadline: '24 hours', status: 'on_track' }
      }
    ],
    categories: [
      { name: 'Household Issues', count: 45, resolved: 38 },
      { name: 'Bin Issues', count: 32, resolved: 25 },
      { name: 'Vehicle Issues', count: 18, resolved: 15 },
      { name: 'Worker Issues', count: 12, resolved: 10 },
      { name: 'Public Issues', count: 23, resolved: 18 }
    ],
    workers: [
      { id: 'W001', name: 'Rajesh Kumar', specialization: 'Bin Maintenance', location: 'Ward 1, Ward 3', availability: 'Available', complaintsHandled: 24 },
      { id: 'W002', name: 'Priya Singh', specialization: 'Collection', location: 'Ward 2, Ward 5', availability: 'On Duty', complaintsHandled: 32 },
      { id: 'W003', name: 'Amit Patel', specialization: 'Supervision', location: 'All Wards', availability: 'Available', complaintsHandled: 45 },
      { id: 'W004', name: 'Sneha Desai', specialization: 'Education', location: 'Ward 4, Ward 6', availability: 'On Break', complaintsHandled: 18 },
      { id: 'W005', name: 'Vikram Joshi', specialization: 'Collection', location: 'Ward 7', availability: 'Available', complaintsHandled: 29 }
    ]
  };
};

const generatePerformanceData = () => {
  return {
    workers: [
      { 
        id: 'W001', 
        name: 'Rajesh Kumar', 
        attendance: 95, 
        complaintsResolved: 24, 
        avgResolutionTime: '2.4h',
        binsCleared: 128, 
        rewards: 450,
        area: 'Zone A',
        rating: 4.7
      },
      { 
        id: 'W002', 
        name: 'Priya Singh', 
        attendance: 89, 
        complaintsResolved: 32, 
        avgResolutionTime: '1.8h',
        binsCleared: 156, 
        rewards: 620,
        area: 'Zone B',
        rating: 4.8
      },
      { 
        id: 'W003', 
        name: 'Amit Patel', 
        attendance: 92, 
        complaintsResolved: 45, 
        avgResolutionTime: '3.2h',
        binsCleared: 142, 
        rewards: 580,
        area: 'Zone C',
        rating: 4.5
      },
      { 
        id: 'W004', 
        name: 'Sneha Desai', 
        attendance: 98, 
        complaintsResolved: 18, 
        avgResolutionTime: '2.1h',
        binsCleared: 135, 
        rewards: 390,
        area: 'Zone D',
        rating: 4.6
      },
      { 
        id: 'W005', 
        name: 'Vikram Joshi', 
        attendance: 87, 
        complaintsResolved: 29, 
        avgResolutionTime: '2.8h',
        binsCleared: 121, 
        rewards: 510,
        area: 'Zone E',
        rating: 4.4
      }
    ],
    citizens: [
      { 
        society: 'Green Valley Apartments', 
        ward: 'Ward 1',
        compliance: 89, 
        complaintsRaised: 12, 
        complaintsResolved: 11,
        penalties: 1,
        rewards: 1200
      },
      { 
        society: 'Sunrise Colony', 
        ward: 'Ward 3',
        compliance: 85, 
        complaintsRaised: 8, 
        complaintsResolved: 7,
        penalties: 2,
        rewards: 950
      },
      { 
        society: 'River Side Homes', 
        ward: 'Ward 5',
        compliance: 82, 
        complaintsRaised: 15, 
        complaintsResolved: 13,
        penalties: 3,
        rewards: 1100
      },
      { 
        society: 'Metro Heights', 
        ward: 'Ward 2',
        compliance: 79, 
        complaintsRaised: 18, 
        complaintsResolved: 15,
        penalties: 5,
        rewards: 850
      },
      { 
        society: 'Central Town', 
        ward: 'Ward 4',
        compliance: 75, 
        complaintsRaised: 22, 
        complaintsResolved: 18,
        penalties: 7,
        rewards: 700
      }
    ]
  };
};

const generateResourceData = () => {
  return {
    bins: [
      { 
        id: 'BIN-001', 
        qrCode: 'QR-998877', 
        location: 'MG Road, Ward 1',
        type: 'General Waste', 
        capacity: '120L',
        status: 'Functional', 
        fillLevel: 45,
        lastCleaned: '2023-06-15',
        nextMaintenance: '2023-07-15',
        area: 'Commercial'
      },
      { 
        id: 'BIN-002', 
        qrCode: 'QR-998878', 
        location: 'Gandhi Nagar, Ward 3',
        type: 'Recyclable', 
        capacity: '100L',
        status: 'Damaged', 
        fillLevel: 95,
        lastCleaned: '2023-06-10',
        nextMaintenance: '2023-06-25',
        area: 'Residential'
      },
      { 
        id: 'BIN-003', 
        qrCode: 'QR-998879', 
        location: 'Nehru Colony, Ward 5',
        type: 'General Waste', 
        capacity: '120L',
        status: 'Functional', 
        fillLevel: 80,
        lastCleaned: '2023-06-12',
        nextMaintenance: '2023-07-12',
        area: 'Public'
      },
      { 
        id: 'BIN-004', 
        qrCode: 'QR-998880', 
        location: 'Market Square, Ward 2',
        type: 'Organic', 
        capacity: '80L',
        status: 'Missing', 
        fillLevel: 0,
        lastCleaned: '2023-05-20',
        nextMaintenance: '2023-06-20',
        area: 'Commercial'
      },
      { 
        id: 'BIN-005', 
        qrCode: 'QR-998881', 
        location: 'Lake View, Ward 4',
        type: 'Recyclable', 
        capacity: '100L',
        status: 'Functional', 
        fillLevel: 30,
        lastCleaned: '2023-06-14',
        nextMaintenance: '2023-07-14',
        area: 'Residential'
      }
    ],
    vehicles: [
      {
        id: 'VH-001',
        type: 'Collection Truck',
        capacity: '5 tons',
        registration: 'MH01AB1234',
        status: 'In Use',
        currentDriver: 'Rajesh Kumar',
        lastService: '2023-05-15',
        nextService: '2023-07-15',
        mileage: '45,200 km'
      },
      {
        id: 'VH-002',
        type: 'Collection Truck',
        capacity: '3 tons',
        registration: 'MH01CD5678',
        status: 'Available',
        currentDriver: 'Not Assigned',
        lastService: '2023-06-01',
        nextService: '2023-08-01',
        mileage: '38,500 km'
      },
      {
        id: 'VH-003',
        type: 'Mini Truck',
        capacity: '1.5 tons',
        registration: 'MH01EF9012',
        status: 'Under Maintenance',
        currentDriver: 'Not Assigned',
        lastService: '2023-04-20',
        nextService: '2023-06-20',
        mileage: '52,100 km'
      }
    ],
    safetyGear: [
      {
        id: 'SG-001',
        type: 'Gloves',
        totalStock: 500,
        allocated: 345,
        available: 155,
        lowStockThreshold: 50,
        status: 'Adequate'
      },
      {
        id: 'SG-002',
        type: 'Masks',
        totalStock: 300,
        allocated: 250,
        available: 50,
        lowStockThreshold: 40,
        status: 'Low'
      },
      {
        id: 'SG-003',
        type: 'Boots',
        totalStock: 200,
        allocated: 180,
        available: 20,
        lowStockThreshold: 25,
        status: 'Low'
      },
      {
        id: 'SG-004',
        type: 'Sanitary Kits',
        totalStock: 150,
        allocated: 120,
        available: 30,
        lowStockThreshold: 20,
        status: 'Adequate'
      }
    ]
  };
};

const generateAIData = () => {
  return {
    overflowPredictions: [
      { binId: 'BIN-002', location: 'Gandhi Nagar, Ward 3', risk: 'High', predictedTime: '3 hours', currentFillLevel: 95 },
      { binId: 'BIN-007', location: 'Central Market, Ward 2', risk: 'High', predictedTime: '5 hours', currentFillLevel: 88 },
      { binId: 'BIN-012', location: 'Railway Station, Ward 1', risk: 'Medium', predictedTime: '8 hours', currentFillLevel: 75 },
      { binId: 'BIN-018', location: 'City Park, Ward 4', risk: 'Medium', predictedTime: '12 hours', currentFillLevel: 70 },
      { binId: 'BIN-023', location: 'Residential Complex, Ward 5', risk: 'Low', predictedTime: '24 hours', currentFillLevel: 60 }
    ],
    wasteGrowthPredictions: [
      { ward: 'Ward 1', current: 255, predicted: 280, growth: '+9.8%' },
      { ward: 'Ward 2', current: 286, predicted: 310, growth: '+8.4%' },
      { ward: 'Ward 3', current: 265, predicted: 290, growth: '+9.4%' },
      { ward: 'Ward 4', current: 300, predicted: 330, growth: '+10.0%' },
      { ward: 'Ward 5', current: 240, predicted: 260, growth: '+8.3%' }
    ],
    optimizationSuggestions: [
      { type: 'Route Optimization', impact: 'High', saving: '15% fuel', description: 'Adjust collection routes based on traffic patterns' },
      { type: 'Worker Allocation', impact: 'Medium', saving: '8% time', description: 'Reassign workers to high-priority zones' },
      { type: 'Bin Placement', impact: 'Low', saving: '5% efficiency', description: 'Add bins in high-density areas' }
    ]
  };
};

const SmartOpsCenter = () => {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [wasteData, setWasteData] = useState(null);
  const [complaintsData, setComplaintsData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [resourceData, setResourceData] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const [complaintFilter, setComplaintFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAllPredictions, setShowAllPredictions] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  // Initialize data
  useEffect(() => {
    setWasteData(generateWasteData());
    setComplaintsData(generateComplaintsData());
    setPerformanceData(generatePerformanceData());
    setResourceData(generateResourceData());
    setAiData(generateAIData());
  }, []);

  // Simulate data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setWasteData(generateWasteData());
      setComplaintsData(generateComplaintsData());
      setPerformanceData(generatePerformanceData());
      setResourceData(generateResourceData());
      setAiData(generateAIData());
      setIsRefreshing(false);
    }, 1500);
  };

  // Handle complaint assignment
  const assignComplaint = (complaintId, workerId) => {
    if (!complaintId || !workerId) return;
    
    const updatedComplaints = complaintsData.complaints.map(comp => 
      comp.id === complaintId ? {...comp, assignedTo: workerId, status: 'In Progress'} : comp
    );
    setComplaintsData({...complaintsData, complaints: updatedComplaints});
    setSelectedComplaint(null);
  };

  // Handle complaint status update
  const updateComplaintStatus = (complaintId, status) => {
    const updatedComplaints = complaintsData.complaints.map(comp => 
      comp.id === complaintId ? {...comp, status} : comp
    );
    setComplaintsData({...complaintsData, complaints: updatedComplaints});
  };

  // Handle export
  const handleExport = (section) => {
    alert(`Exported ${section} data as ${exportFormat.toUpperCase()}`);
  };

  // Filter complaints based on selected filter
  const filteredComplaints = useMemo(() => {
    if (!complaintsData) return [];
    if (complaintFilter === 'all') return complaintsData.complaints;
    return complaintsData.complaints.filter(comp => comp.status.toLowerCase() === complaintFilter.toLowerCase());
  }, [complaintsData, complaintFilter]);

  if (!wasteData || !complaintsData || !performanceData || !resourceData || !aiData) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading SmartOps Center...</div>;
  }

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
                <h1 className="text-3xl font-bold text-gray-900">SmartOps Center</h1>
                <p className="text-sm text-gray-600">Unified Reports, Complaints & Resource Management Hub</p>
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
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </motion.button> */}
                
                {/* Notification Panel */}
                <AnimatePresence>
                  {notificationPanelOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {aiData.overflowPredictions.slice(0, 3).map((prediction, index) => (
                          <div key={index} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                <AlertTriangle className="h-4 w-4" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">Bin Overflow Alert</p>
                                <p className="text-sm text-gray-500">{prediction.binId} at {prediction.location}</p>
                                <p className="text-xs text-gray-400 mt-1">Predicted in {prediction.predictedTime}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                              <AlertCircle className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                              <p className="text-sm text-gray-500">Masks and boots are running low</p>
                              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Complaint Resolved</p>
                              <p className="text-sm text-gray-500">CMP-004 has been successfully resolved</p>
                              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 text-center">
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshData}
                className="flex items-center px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
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
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Waste Reports
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                activeTab === 'complaints'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('complaints')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Complaints Hub
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                activeTab === 'performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('performance')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Performance
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                activeTab === 'resources'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('resources')}
            >
              <Truck className="h-4 w-4 mr-2" />
              Resources
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                activeTab === 'ai'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('ai')}
            >
              <Cpu className="h-4 w-4 mr-2" />
              AI Insights
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-blue-100 mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">125,430</h2>
                    <p className="text-sm text-gray-600">Total Citizens</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">+2.3% from last month</span>
                </div>
              </motion.div>
                            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-green-100 mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">78%</h2>
                    <p className="text-sm text-gray-600">Compliance Rate</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">+5.2% from last month</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-red-100 mr-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">42</h2>
                    <p className="text-sm text-gray-600">Active Complaints</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">+8 from yesterday</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-purple-100 mr-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">92%</h2>
                    <p className="text-sm text-gray-600">SLA Adherence</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">+3.1% from last week</span>
                </div>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Waste Segregation Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Waste Segregation</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={wasteData.segregation}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {wasteData.segregation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Waste Trends Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Waste Collection Trends</h3>
                  <div className="flex items-center space-x-2">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="day">Daily</option>
                      <option value="week">Weekly</option>
                      <option value="month">Monthly</option>
                    </select>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeRange === 'day' ? wasteData.trends.daily : 
                            timeRange === 'week' ? wasteData.trends.weekly : 
                            wasteData.trends.monthly}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={timeRange === 'day' ? 'day' : timeRange === 'week' ? 'week' : 'month'} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {timeRange === 'day' ? (
                        <>
                          <Bar dataKey="dry" fill="#4CAF50" name="Dry Waste" />
                          <Bar dataKey="wet" fill="#2196F3" name="Wet Waste" />
                          <Bar dataKey="hazardous" fill="#F44336" name="Hazardous" />
                          <Bar dataKey="recyclable" fill="#FF9800" name="Recyclable" />
                        </>
                      ) : (
                        <>
                          <Bar dataKey="total" fill="#4CAF50" name="Total Waste (kg)" />
                          <Line type="monotone" dataKey="compliance" stroke="#8884d8" name="Compliance %" />
                        </>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Recent Complaints & AI Predictions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Complaints */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Recent Complaints</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {complaintsData.complaints.slice(0, 5).map((complaint) => (
                    <div key={complaint.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${
                          complaint.priority === 'High' ? 'bg-red-100 text-red-600' :
                          complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {complaint.priority === 'High' ? <AlertCircle className="h-4 w-4" /> :
                           complaint.priority === 'Medium' ? <Clock className="h-4 w-4" /> :
                           <CheckCircle className="h-4 w-4" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{complaint.type}</h4>
                          <p className="text-xs text-gray-500">{complaint.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{complaint.time}</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* AI Predictions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">AI Predictions</h3>
                  <button 
                    onClick={() => setShowAllPredictions(!showAllPredictions)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {showAllPredictions ? 'Show Less' : 'View All'}
                  </button>
                </div>
                <div className="space-y-4">
                  {(showAllPredictions ? aiData.overflowPredictions : aiData.overflowPredictions.slice(0, 3)).map((prediction, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full mr-3 ${
                            prediction.risk === 'High' ? 'bg-red-100 text-red-600' :
                            prediction.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Bin Overflow Risk</h4>
                            <p className="text-xs text-gray-500">{prediction.binId} at {prediction.location}</p>
                            <div className="mt-1 flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    prediction.currentFillLevel > 90 ? 'bg-red-600' :
                                    prediction.currentFillLevel > 70 ? 'bg-yellow-600' :
                                    'bg-green-600'
                                  }`}
                                  style={{ width: `${prediction.currentFillLevel}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{prediction.currentFillLevel}% full</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Predicted in</p>
                          <p className="text-sm font-medium text-gray-900">{prediction.predictedTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Waste Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Waste Management Reports</h2>
              <div className="flex items-center space-x-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                  onClick={() => handleExport('waste')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </motion.button>
              </div>
            </div>

            {/* Ward Comparison Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Ward-wise Waste Comparison</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={wasteData.wardComparison}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ward" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="dry" fill="#4CAF50" name="Dry Waste" />
                    <Bar dataKey="wet" fill="#2196F3" name="Wet Waste" />
                    <Bar dataKey="hazardous" fill="#F44336" name="Hazardous" />
                    <Bar dataKey="recyclable" fill="#FF9800" name="Recyclable" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Compliance Rate by Ward */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Compliance Rate by Ward</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={wasteData.wardComparison}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ward" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="compliance" fill="#8884d8" name="Compliance %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Waste Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Detailed Waste Data</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search wards..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ward
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dry Waste
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wet Waste
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hazardous
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recyclable
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Compliance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {wasteData.wardComparison.map((ward) => (
                      <tr key={ward.ward} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ward.ward}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ward.dry} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ward.wet} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ward.hazardous} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ward.recyclable} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ward.dry + ward.wet + ward.hazardous + ward.recyclable} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            ward.compliance >= 85 ? 'bg-green-100 text-green-800' :
                            ward.compliance >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {ward.compliance}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Complaints Hub Tab */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Complaints Management Hub</h2>
              <div className="flex items-center space-x-3">
                <select
                  value={complaintFilter}
                  onChange={(e) => setComplaintFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Complaints</option>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Complaint
                </motion.button>
              </div>
            </div>

            {/* Complaint Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-gray-100 mr-4">
                    <MessageSquare className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{complaintsData.complaints.length}</h2>
                    <p className="text-sm text-gray-600">Total Complaints</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-yellow-100 mr-4">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{complaintsData.complaints.filter(c => c.status === 'Pending').length}</h2>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-blue-100 mr-4">
                    <RefreshCw className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{complaintsData.complaints.filter(c => c.status === 'In Progress').length}</h2>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-green-100 mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{complaintsData.complaints.filter(c => c.status === 'Resolved').length}</h2>
                    <p className="text-sm text-gray-600">Resolved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Complaints List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">All Complaints</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search complaints..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {complaint.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{complaint.type}</div>
                            <div className="text-xs text-gray-500">{complaint.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {complaint.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                            complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {complaint.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedComplaint(complaint)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Complaint Categories Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Complaints by Category</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={complaintsData.categories}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Total Complaints" />
                    <Bar dataKey="resolved" fill="#82ca9d" name="Resolved" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Complaint Detail Modal */}
        <AnimatePresence>
          {selectedComplaint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedComplaint(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Complaint Details</h3>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Complaint ID</h4>
                      <p className="text-lg font-medium text-gray-900">{selectedComplaint.id}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Category</h4>
                      <p className="text-lg font-medium text-gray-900">{selectedComplaint.category}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Type</h4>
                    <p className="text-lg font-medium text-gray-900">{selectedComplaint.type}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="text-lg font-medium text-gray-900 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      {selectedComplaint.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                    <p className="text-gray-900">{selectedComplaint.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedComplaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                        selectedComplaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedComplaint.priority}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Status</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedComplaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        selectedComplaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedComplaint.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">SLA Status</h4>
                    <div className="flex items-center">
                      <span className={`mr-2 ${
                        selectedComplaint.sla.status === 'overdue' ? 'text-red-600' :
                        selectedComplaint.sla.status === 'due_soon' ? 'text-yellow-600' :
                        selectedComplaint.sla.status === 'on_track' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {selectedComplaint.sla.status === 'overdue' ? <AlertCircle className="h-4 w-4" /> :
                         selectedComplaint.sla.status === 'due_soon' ? <Clock className="h-4 w-4" /> :
                         selectedComplaint.sla.status === 'on_track' ? <CheckCircle className="h-4 w-4" /> :
                         <CheckCircle className="h-4 w-4" />}
                      </span>
                      <span className={`text-sm ${
                        selectedComplaint.sla.status === 'overdue' ? 'text-red-600' :
                        selectedComplaint.sla.status === 'due_soon' ? 'text-yellow-600' :
                        selectedComplaint.sla.status === 'on_track' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {selectedComplaint.sla.status === 'overdue' ? 'Overdue' :
                         selectedComplaint.sla.status === 'due_soon' ? 'Due Soon' :
                         selectedComplaint.sla.status === 'on_track' ? 'On Track' :
                         'Resolved'} - Deadline: {selectedComplaint.sla.deadline}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Citizen Details</h4>
                    <p className="text-gray-900">{selectedComplaint.citizen.name} - {selectedComplaint.citizen.phone}</p>
                  </div>
                  {selectedComplaint.assignedTo && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
                      <p className="text-gray-900">{selectedComplaint.assignedTo}</p>
                    </div>
                  )}
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
                  {selectedComplaint.status !== 'Resolved' && (
                    <>
                      {!selectedComplaint.assignedTo ? (
                        <div className="flex-1 mr-2">
                          <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => assignComplaint(selectedComplaint.id, e.target.value)}
                          >
                            <option value="">Assign to worker</option>
                            {complaintsData.workers.map(worker => (
                              <option key={worker.id} value={worker.name}>
                                {worker.name} ({worker.specialization}) - {worker.availability}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateComplaintStatus(selectedComplaint.id, 'Resolved')}
                          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
              <div className="flex items-center space-x-3">
                <select
                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                  onClick={() => handleExport('performance')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </motion.button>
              </div>
            </div>

            {/* Worker Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Worker Performance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Worker
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Area
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Complaints Resolved
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg. Resolution Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bins Cleared
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceData.workers.map((worker) => (
                      <tr key={worker.id} className="hover:bg-gray-50">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {worker.area}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="h-2 rounded-full bg-green-600"
                                style={{ width: `${worker.attendance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{worker.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {worker.complaintsResolved}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {worker.avgResolutionTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {worker.binsCleared}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium text-gray-900">{worker.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Citizen Compliance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Citizen & Society Compliance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Society
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ward
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Compliance Rate
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Complaints Raised
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Complaints Resolved
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Penalties
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rewards
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceData.citizens.map((citizen, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {citizen.society}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {citizen.ward}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  citizen.compliance >= 85 ? 'bg-green-600' :
                                  citizen.compliance >= 75 ? 'bg-yellow-600' :
                                  'bg-red-600'
                                }`}
                                style={{ width: `${citizen.compliance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{citizen.compliance}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {citizen.complaintsRaised}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {citizen.complaintsResolved}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            citizen.penalties > 5 ? 'bg-red-100 text-red-800' :
                            citizen.penalties > 2 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {citizen.penalties}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">
                          {citizen.rewards} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Worker Attendance Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Worker Attendance Rate</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData.workers}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="attendance" fill="#8884d8" name="Attendance %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Complaints Resolution Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Complaints Resolution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData.workers}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="complaintsResolved" fill="#82ca9d" name="Complaints Resolved" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                  onClick={() => handleExport('resources')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </motion.button>
              </div>
            </div>

            {/* Resource Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-blue-100 mr-4">
                    <QrCode className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{resourceData.bins.length}</h2>
                    <p className="text-sm text-gray-600">Total Bins</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-medium text-gray-500">
                    {resourceData.bins.filter(bin => bin.status === 'Functional').length} Functional, 
                    {' '}{resourceData.bins.filter(bin => bin.status === 'Damaged').length} Damaged,
                    {' '}{resourceData.bins.filter(bin => bin.status === 'Missing').length} Missing
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-green-100 mr-4">
                    <Truck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{resourceData.vehicles.length}</h2>
                    <p className="text-sm text-gray-600">Total Vehicles</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-medium text-gray-500">
                    {resourceData.vehicles.filter(vehicle => vehicle.status === 'Available').length} Available, 
                    {' '}{resourceData.vehicles.filter(vehicle => vehicle.status === 'In Use').length} In Use,
                    {' '}{resourceData.vehicles.filter(vehicle => vehicle.status === 'Under Maintenance').length} Maintenance
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-purple-100 mr-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{resourceData.safetyGear.length}</h2>
                    <p className="text-sm text-gray-600">Safety Gear Types</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-medium text-gray-500">
                    {resourceData.safetyGear.filter(gear => gear.status === 'Low').length} Low Stock,
                    {' '}{resourceData.safetyGear.filter(gear => gear.status === 'Adequate').length} Adequate
                  </span>
                </div>
              </div>
            </div>

            {/* Bins Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Smart Bins Inventory</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bins..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bin ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        QR Code
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fill Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Cleaned
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resourceData.bins.map((bin) => (
                      <tr key={bin.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bin.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bin.qrCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bin.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bin.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            bin.status === 'Functional' ? 'bg-green-100 text-green-800' :
                            bin.status === 'Damaged' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {bin.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  bin.fillLevel > 90 ? 'bg-red-600' :
                                  bin.fillLevel > 70 ? 'bg-yellow-600' :
                                  'bg-green-600'
                                }`}
                                style={{ width: `${bin.fillLevel}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{bin.fillLevel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bin.lastCleaned}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vehicles Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Fleet Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Driver
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Service
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Service
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resourceData.vehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {vehicle.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.registration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                            vehicle.status === 'In Use' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.currentDriver}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.lastService}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.nextService}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Safety Gear Inventory */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Safety Gear Inventory</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gear ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Allocated
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Available
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resourceData.safetyGear.map((gear) => (
                      <tr key={gear.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {gear.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {gear.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {gear.totalStock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {gear.allocated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {gear.available}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            gear.status === 'Adequate' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {gear.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            <Plus className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">AI-Powered Insights</h2>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                  onClick={() => handleExport('ai-insights')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Insights
                </motion.button>
              </div>
            </div>

            {/* AI Predictions Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-red-100 mr-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{aiData.overflowPredictions.filter(p => p.risk === 'High').length}</h2>
                    <p className="text-sm text-gray-600">High Risk Bins</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-yellow-100 mr-4">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">+9.2%</h2>
                    <p className="text-sm text-gray-600">Avg. Waste Growth</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-green-100 mr-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">15%</h2>
                    <p className="text-sm text-gray-600">Potential Fuel Saving</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bin Overflow Predictions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Bin Overflow Predictions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bin ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Fill Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Predicted Overflow
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {aiData.overflowPredictions.map((prediction, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {prediction.binId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {prediction.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            prediction.risk === 'High' ? 'bg-red-100 text-red-800' :
                            prediction.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {prediction.risk} Risk
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  prediction.currentFillLevel > 90 ? 'bg-red-600' :
                                  prediction.currentFillLevel > 70 ? 'bg-yellow-600' :
                                  'bg-green-600'
                                }`}
                                style={{ width: `${prediction.currentFillLevel}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{prediction.currentFillLevel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {prediction.predictedTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Send className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Waste Growth Predictions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Waste Growth Predictions by Ward</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                    data={aiData.wasteGrowthPredictions}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ward" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#8884d8" name="Current Waste (kg)" />
                    <Bar dataKey="predicted" fill="#82ca9d" name="Predicted Waste (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Optimization Suggestions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">AI Optimization Suggestions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {aiData.optimizationSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{suggestion.type}</h4>
                        <p className="mt-1 text-sm text-gray-600">{suggestion.description}</p>
                        <div className="mt-3 flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            suggestion.impact === 'High' ? 'bg-red-100 text-red-800' :
                            suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Impact: {suggestion.impact}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Saving: {suggestion.saving}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Implement
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictive Analytics Dashboard */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Predictive Analytics Dashboard</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Collection Route Optimization</h4>
                  <div className="h-64 bg-white rounded-md p-3 flex items-center justify-center border border-gray-200">
                    <div className="text-center">
                      <Route className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">AI-optimized collection routes</p>
                      <p className="text-xs text-gray-500 mt-1">15% more efficient than current routes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Waste Composition Analysis</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={wasteData.segregation}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {wasteData.segregation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">SmartOps Center - Unified Waste Management System</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-600">© 2023 City Municipal Corporation. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <HelpCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default SmartOpsCenter;
