import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, TextField,
  MenuItem, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, Tabs, Tab,
  LinearProgress, useTheme, useMediaQuery, IconButton,
  Avatar, Badge, Fab, Switch, FormControlLabel, Divider
} from '@mui/material';
import {
  Search, Filter, AlertTriangle, CheckCircle2, TrendingUp,
  TrendingDown, Bell, Download, BarChart3, Users, AlertCircle,
  Map, Clock, Award, Shield, Calendar, MessageCircle,
  Navigation, RefreshCw, Play, Pause, Star, Crown,
  Phone, Mail, MapPin, UserCheck, UserX, Zap,
  Target, HeartPulse, FileText, Send, Loader
} from 'lucide-react';

// Mock data for workers
const mockWorkers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    workerId: "WRK001",
    photo: "https://i.pravatar.cc/150?img=1",
    specialization: "Dry Waste Collection",
    ward: "Ward 5",
    contact: "9876543210",
    status: "On Duty",
    location: { lat: 19.0760, lng: 72.8777 },
    performance: 92,
    binsCollected: 128,
    complaints: 2,
    punctuality: 95,
    rewards: 450,
    trainingCompleted: 5,
    healthStatus: "Good",
    shift: "Morning",
    vehicle: "Electric Vehicle E5",
    route: "Route A5",
    lastCheckIn: "2023-10-15T08:15:00",
    routeProgress: 65
  },
  {
    id: 2,
    name: "Priya Sharma",
    workerId: "WRK002",
    photo: "https://i.pravatar.cc/150?img=2",
    specialization: "Wet Waste Collection",
    ward: "Ward 3",
    contact: "8765432109",
    status: "Online",
    location: { lat: 19.0765, lng: 72.8782 },
    performance: 85,
    binsCollected: 115,
    complaints: 1,
    punctuality: 88,
    rewards: 380,
    trainingCompleted: 4,
    healthStatus: "Good",
    shift: "Evening",
    vehicle: "Truck T3",
    route: "Route B3",
    lastCheckIn: "2023-10-15T14:30:00",
    routeProgress: 40
  },
  {
    id: 3,
    name: "Vikram Singh",
    workerId: "WRK003",
    photo: "https://i.pravatar.cc/150?img=3",
    specialization: "Hazardous Waste",
    ward: "Ward 5",
    contact: "7654321098",
    status: "On Leave",
    location: null,
    performance: 78,
    binsCollected: 95,
    complaints: 5,
    punctuality: 82,
    rewards: 220,
    trainingCompleted: 3,
    healthStatus: "Needs Checkup",
    shift: "Morning",
    vehicle: "Special Handling Van",
    route: "Route H5",
    lastCheckIn: "2023-10-14T08:10:00",
    routeProgress: 0
  },
  {
    id: 4,
    name: "Anjali Patel",
    workerId: "WRK004",
    photo: "https://i.pravatar.cc/150?img=4",
    specialization: "Recycling",
    ward: "Ward 2",
    contact: "6543210987",
    status: "On Duty",
    location: { lat: 19.0755, lng: 72.8770 },
    performance: 96,
    binsCollected: 142,
    complaints: 0,
    punctuality: 98,
    rewards: 520,
    trainingCompleted: 6,
    healthStatus: "Excellent",
    shift: "Morning",
    vehicle: "Electric Vehicle E2",
    route: "Route R2",
    lastCheckIn: "2023-10-15T08:05:00",
    routeProgress: 80
  },
  {
    id: 5,
    name: "Sanjay Mehta",
    workerId: "WRK005",
    photo: "https://i.pravatar.cc/150?img=5",
    specialization: "General Waste",
    ward: "Ward 3",
    contact: "5432109876",
    status: "Inactive",
    location: null,
    performance: 65,
    binsCollected: 88,
    complaints: 3,
    punctuality: 70,
    rewards: 150,
    trainingCompleted: 2,
    healthStatus: "Fatigue Reported",
    shift: "Night",
    vehicle: "Truck T7",
    route: "Route C3",
    lastCheckIn: "2023-10-13T22:15:00",
    routeProgress: 0
  }
];

// Mock data for attendance
const mockAttendance = [
  { workerId: "WRK001", date: "2023-10-15", checkIn: "08:15", checkOut: "16:45", status: "Present" },
  { workerId: "WRK002", date: "2023-10-15", checkIn: "14:30", checkOut: "22:15", status: "Present" },
  { workerId: "WRK003", date: "2023-10-15", checkIn: "-", checkOut: "-", status: "On Leave" },
  { workerId: "WRK004", date: "2023-10-15", checkIn: "08:05", checkOut: "16:30", status: "Present" },
  { workerId: "WRK005", date: "2023-10-15", checkIn: "-", checkOut: "-", status: "Absent" },
];

// Mock data for leave requests
const mockLeaveRequests = [
  {
    id: 1,
    workerId: "WRK003",
    workerName: "Vikram Singh",
    type: "Sick Leave",
    startDate: "2023-10-15",
    endDate: "2023-10-17",
    reason: "Fever and cold",
    status: "Approved"
  },
  {
    id: 2,
    workerId: "WRK007",
    workerName: "Rahul Verma",
    type: "Personal Leave",
    startDate: "2023-10-16",
    endDate: "2023-10-16",
    reason: "Family function",
    status: "Pending"
  }
];

// Mock data for training modules
const mockTrainingModules = [
  { id: 1, name: "Hazardous Waste Handling", duration: "2 hours", status: "Mandatory", completedBy: 45 },
  { id: 2, name: "Waste Segregation Techniques", duration: "1.5 hours", status: "Mandatory", completedBy: 68 },
  { id: 3, name: "Safety Protocols", duration: "1 hour", status: "Mandatory", completedBy: 72 },
  { id: 4, name: "Advanced Recycling Methods", duration: "2.5 hours", status: "Optional", completedBy: 28 },
  { id: 5, name: "Customer Interaction Skills", duration: "1 hour", status: "Optional", completedBy: 32 },
];

// Mock data for alerts
const mockAlerts = [
  { id: 1, workerId: "WRK005", workerName: "Sanjay Mehta", type: "Health", message: "Reported fatigue", time: "2023-10-15T10:30:00", status: "Unaddressed" },
  { id: 2, workerId: "WRK008", workerName: "Laxmi Iyer", type: "Safety", message: "PPE shortage reported", time: "2023-10-15T09:15:00", status: "In Progress" },
  { id: 3, workerId: "WRK012", workerName: "Arun Mishra", type: "Panic", message: "Panic button activated", time: "2023-10-15T11:05:00", status: "Resolved" },
];

// Filter options
const statusOptions = ["All", "Online", "On Duty", "On Leave", "Inactive"];
const wardOptions = ["All", "Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5"];
const specializationOptions = ["All", "Dry Waste Collection", "Wet Waste Collection", "Hazardous Waste", "Recycling", "General Waste"];
const shiftOptions = ["All", "Morning", "Evening", "Night"];

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Worker Profile Dialog Component
function WorkerProfileDialog({ open, onClose, worker }) {
  if (!worker) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Worker Profile - {worker.name}
        <Chip 
          label={worker.status} 
          color={
            worker.status === "On Duty" ? "success" : 
            worker.status === "Online" ? "primary" : 
            worker.status === "On Leave" ? "warning" : "error"
          } 
          sx={{ ml: 2 }}
        />
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
            <Avatar src={worker.photo} sx={{ width: 120, height: 120 }} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>{worker.name}</Typography>
            <Typography variant="body1" gutterBottom><strong>Worker ID:</strong> {worker.workerId}</Typography>
            <Typography variant="body1" gutterBottom><strong>Specialization:</strong> {worker.specialization}</Typography>
            <Typography variant="body1, gutterBottom"><strong>Ward:</strong> {worker.ward}</Typography>
            <Typography variant="body1, gutterBottom"><strong>Shift:</strong> {worker.shift}</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Contact Information
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Phone size={16} style={{ marginRight: 8 }} />
                  <Typography variant="body2">{worker.contact}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Mail size={16} style={{ marginRight: 8 }} />
                  <Typography variant="body2">{worker.workerId.toLowerCase()}@wastemgt.com</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Vehicle & Route
                </Typography>
                <Typography variant="body2" gutterBottom><strong>Vehicle:</strong> {worker.vehicle}</Typography>
                <Typography variant="body2"><strong>Route:</strong> {worker.route}</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="primary.main">
                      {worker.performance}%
                    </Typography>
                    <Typography variant="body2">
                      Performance
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="success.main">
                      {worker.binsCollected}
                    </Typography>
                    <Typography variant="body2">
                      Bins Collected
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color={worker.complaints > 0 ? "error.main" : "success.main"}>
                      {worker.complaints}
                    </Typography>
                    <Typography variant="body2">
                      Complaints
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="info.main">
                      {worker.punctuality}%
                    </Typography>
                    <Typography variant="body2">
                      Punctuality
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Health & Training Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <HeartPulse size={16} style={{ marginRight: 8 }} />
                      <Typography variant="body2"><strong>Health Status:</strong></Typography>
                    </Box>
                    <Chip 
                      label={worker.healthStatus} 
                      color={
                        worker.healthStatus === "Excellent" ? "success" : 
                        worker.healthStatus === "Good" ? "primary" : "warning"
                      } 
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Award size={16} style={{ marginRight: 8 }} />
                      <Typography variant="body2"><strong>Training Completed:</strong></Typography>
                    </Box>
                    <Typography variant="h6">{worker.trainingCompleted} modules</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" color="primary">
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Map Component for Worker Tracking
function WorkerTrackingMap({ workers, selectedWorker, onWorkerSelect }) {
  // In a real implementation, this would be an interactive map
  return (
    <Card sx={{ height: 400, position: 'relative' }}>
      <CardContent sx={{ p: 0, height: '100%' }}>
        <Box 
          sx={{ 
            height: '100%', 
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Typography variant="h6" color="primary.main">
            Live Worker Tracking Map
          </Typography>
          
          {/* Simulated worker markers */}
          {workers.filter(w => w.location).map(worker => (
            <Box
              key={worker.id}
              onClick={() => onWorkerSelect(worker)}
              sx={{
                position: 'absolute',
                left: `${50 + (worker.location.lng - 72.8777) * 500}%`,
                top: `${50 - (worker.location.lat - 19.0760) * 500}%`,
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Badge
                color={
                  worker.status === "On Duty" ? "success" : 
                  worker.status === "Online" ? "primary" : "error"
                }
                variant="dot"
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar 
                  src={worker.photo} 
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: selectedWorker && selectedWorker.id === worker.id ? '2px solid #1976d2' : '2px solid white',
                    boxShadow: 2
                  }} 
                />
              </Badge>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 1,
                  mt: 0.5,
                  px: 0.5
                }}
              >
                {worker.name}
              </Typography>
            </Box>
          ))}
          
          {/* Map controls */}
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <IconButton color="primary">
              <RefreshCw size={20} />
            </IconButton>
            <IconButton color="primary">
              <Zap size={20} />
            </IconButton>
          </Box>
          
          {/* Map legend */}
          <Box sx={{ 
            position: 'absolute', 
            bottom: 16, 
            left: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 1,
            p: 1
          }}>
            <Typography variant="caption" display="block">
              <Box component="span" sx={{ color: 'success.main' }}>●</Box> On Duty
            </Typography>
            <Typography variant="caption" display="block">
              <Box component="span" sx={{ color: 'primary.main' }}>●</Box> Online
            </Typography>
            <Typography variant="caption" display="block">
              <Box component="span" sx={{ color: 'error.main' }}>●</Box> Inactive
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// AI Recommendation Component
function AIRecommendations() {
  const [recommendations] = useState([
    { id: 1, type: "Workload", message: "Reassign 15 bins from Route A5 to Route B3 for better balance", priority: "High" },
    { id: 2, type: "Training", message: "Assign Hazardous Waste Handling training to 3 workers in Ward 5", priority: "Medium" },
    { id: 3, type: "Safety", message: "Schedule vehicle maintenance for Truck T7 - due for service", priority: "Medium" },
  ]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Zap size={24} color="#ff9800" style={{ marginRight: 8 }} />
          <Typography variant="h6">AI Recommendations</Typography>
        </Box>
        
        {recommendations.map(rec => (
          <Box 
            key={rec.id} 
            sx={{ 
              p: 2, 
              mb: 1, 
              borderRadius: 1,
              backgroundColor: rec.priority === "High" ? '#ffebee' : '#fff8e1',
              borderLeft: `4px solid ${rec.priority === "High" ? '#f44336' : '#ffc107'}`
            }}
          >
            <Typography variant="body2" gutterBottom>
              <strong>{rec.type}:</strong> {rec.message}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Chip 
                label={rec.priority} 
                size="small" 
                color={rec.priority === "High" ? "error" : "warning"} 
              />
              <Button size="small" variant="outlined">
                Apply
              </Button>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

// Main Component
const AuthorityManageWorker = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State variables
  const [activeTab, setActiveTab] = useState(0);
  const [workers, setWorkers] = useState(mockWorkers);
  const [filteredWorkers, setFilteredWorkers] = useState(mockWorkers);
  const [attendance, setAttendance] = useState(mockAttendance);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [trainingModules, setTrainingModules] = useState(mockTrainingModules);
  const [alerts, setAlerts] = useState(mockAlerts);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState("All");
  const [wardFilter, setWardFilter] = useState("All");
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [shiftFilter, setShiftFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [trackingView, setTrackingView] = useState(false);
  
  // Multi-select state
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  
  // Apply filters to workers
  useEffect(() => {
    let result = [...workers];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(worker => 
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.workerId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter(worker => worker.status === statusFilter);
    }
    
    // Apply ward filter
    if (wardFilter !== "All") {
      result = result.filter(worker => worker.ward === wardFilter);
    }
    
    // Apply specialization filter
    if (specializationFilter !== "All") {
      result = result.filter(worker => worker.specialization === specializationFilter);
    }
    
    // Apply shift filter
    if (shiftFilter !== "All") {
      result = result.filter(worker => worker.shift === shiftFilter);
    }
    
    setFilteredWorkers(result);
  }, [searchQuery, statusFilter, wardFilter, specializationFilter, shiftFilter, workers]);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle worker row click
  const handleWorkerClick = (worker) => {
    setSelectedWorker(worker);
    setProfileDialogOpen(true);
  };
  
  // Handle leave request action
  const handleLeaveAction = (requestId, action) => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId ? { ...request, status: action } : request
      )
    );
  };
  
  // Handle alert status change
  const handleAlertStatusChange = (alertId, newStatus) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, status: newStatus } : alert
      )
    );
  };
  
  // Handle send notification
  const handleSendNotification = () => {
    alert("Notification sent to selected workers!");
  };
  
  // Handle generate report
  const handleGenerateReport = () => {
    alert("Worker performance report generation started!");
  };

  // Toggle tracking view
  const toggleTrackingView = () => {
    setTrackingView(!trackingView);
  };

  // Simulate worker status change
  const simulateWorkerStatusChange = (workerId, newStatus) => {
    setWorkers(prevWorkers => 
      prevWorkers.map(worker => 
        worker.id === workerId ? { ...worker, status: newStatus } : worker
      )
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
<Typography
  variant="h4"
  gutterBottom
  sx={{
    mb: 3,
    fontSize: '1.875rem', // ~text-3xl
    fontWeight: 'bold',
    color: 'text.primary', // ensures proper contrast in light/dark mode
  }}
>
  Worker Management Dashboard
</Typography>

      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="manage workers tabs">
          <Tab icon={<Users size={20} />} label="Worker Directory" />
          <Tab icon={<Map size={20} />} label="Live Tracking" />
          <Tab icon={<Calendar size={20} />} label="Attendance & Leave" />
          <Tab icon={<Award size={20} />} label="Performance & Rewards" />
          <Tab icon={<Shield size={20} />} label="Safety & Training" />
        </Tabs>
      </Box>
      
      {/* Worker Directory Tab */}
      <TabPanel value={activeTab} index={0}>
        <AIRecommendations />
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Filters & Search
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    endAdornment: <Search size={20} />
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <TextField
                  fullWidth
                  select
                  label="Ward"
                  value={wardFilter}
                  onChange={(e) => setWardFilter(e.target.value)}
                >
                  {wardOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <TextField
                  fullWidth
                  select
                  label="Specialization"
                  value={specializationFilter}
                  onChange={(e) => setSpecializationFilter(e.target.value)}
                >
                  {specializationOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <TextField
                  fullWidth
                  select
                  label="Shift"
                  value={shiftFilter}
                  onChange={(e) => setShiftFilter(e.target.value)}
                >
                  {shiftOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        <Grid container spacing={3}>
          <Grid item xs={12} lg={trackingView ? 7 : 12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    Worker Directory ({filteredWorkers.length} workers)
                  </Typography>
                  <Box>
                    <Button 
                      startIcon={<Download size={20} />} 
                      sx={{ mr: 1 }} 
                      onClick={handleGenerateReport}
                    >
                      Export
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<Bell size={20} />} 
                      onClick={handleSendNotification}
                    >
                      Notify
                    </Button>
                  </Box>
                </Box>
                
                <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="worker directory table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Worker</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Specialization</TableCell>
                        <TableCell>Ward</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Performance</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredWorkers.map((worker) => (
                        <TableRow 
                          key={worker.id} 
                          hover 
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell onClick={() => handleWorkerClick(worker)}>
                            <Box display="flex" alignItems="center">
                              <Avatar src={worker.photo} sx={{ width: 40, height: 40, mr: 2 }} />
                              {worker.name}
                            </Box>
                          </TableCell>
                          <TableCell onClick={() => handleWorkerClick(worker)}>
                            {worker.workerId}
                          </TableCell>
                          <TableCell onClick={() => handleWorkerClick(worker)}>
                            {worker.specialization}
                          </TableCell>
                          <TableCell onClick={() => handleWorkerClick(worker)}>
                            {worker.ward}
                          </TableCell>
                          <TableCell onClick={() => handleWorkerClick(worker)}>
                            <Chip 
                              label={worker.status} 
                              color={
                                worker.status === "On Duty" ? "success" : 
                                worker.status === "Online" ? "primary" : 
                                worker.status === "On Leave" ? "warning" : "error"
                              } 
                              size="small"
                            />
                          </TableCell>
                          <TableCell onClick={() => handleWorkerClick(worker)}>
                            <Box display="flex" alignItems="center">
                              <LinearProgress 
                                variant="determinate" 
                                value={worker.performance} 
                                sx={{ 
                                  width: 60, 
                                  mr: 1,
                                  backgroundColor: 
                                    worker.performance >= 80 ? 'rgba(76, 175, 80, 0.2)' : 
                                    worker.performance >= 60 ? 'rgba(255, 152, 0, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: 
                                      worker.performance >= 80 ? '#4caf50' : 
                                      worker.performance >= 60 ? '#ff9800' : '#f44336'
                                  }
                                }}
                              />
                              <Typography variant="body2">
                                {worker.performance}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="small" 
                              onClick={() => handleWorkerClick(worker)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {trackingView && (
            <Grid item xs={12} lg={5}>
              <WorkerTrackingMap 
                workers={filteredWorkers} 
                selectedWorker={selectedWorker}
                onWorkerSelect={setSelectedWorker}
              />
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button 
                  variant="outlined" 
                  startIcon={<MapPin size={20} />}
                  onClick={() => alert("Route optimization in progress...")}
                >
                  Optimize Routes
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
        
        <Box mt={2} display="flex" justifyContent="center">
          <Button 
            variant="contained" 
            startIcon={trackingView ? <UserX size={20} /> : <UserCheck size={20} />}
            onClick={toggleTrackingView}
          >
            {trackingView ? "Hide Tracking" : "Show Live Tracking"}
          </Button>
        </Box>
      </TabPanel>
      
      {/* Live Tracking Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <WorkerTrackingMap 
              workers={workers} 
              selectedWorker={selectedWorker}
              onWorkerSelect={setSelectedWorker}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Route Management
                </Typography>
                
                <Box mb={2}>
                  <Typography variant="body2" gutterBottom>
                    Assign New Route
                  </Typography>
                  <Box display="flex" gap={1} mb={2}>
                    <TextField
                      select
                      size="small"
                      label="Worker"
                      fullWidth
                    >
                      {workers.map(worker => (
                        <MenuItem key={worker.id} value={worker.id}>
                          {worker.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button variant="contained">Assign</Button>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" gutterBottom>
                  AI Route Optimization
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<Zap size={20} />}
                  onClick={() => alert("AI optimizing routes based on current workload...")}
                >
                  Optimize All Routes
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Alerts
                </Typography>
                
                {alerts.filter(a => a.status !== "Resolved").map(alert => (
                  <Box 
                    key={alert.id}
                    sx={{ 
                      p: 2, 
                      mb: 1, 
                      borderRadius: 1,
                      backgroundColor: 
                        alert.type === "Panic" ? '#ffebee' : 
                        alert.type === "Safety" ? '#fff8e1' : '#e8f5e9',
                      borderLeft: `4px solid ${
                        alert.type === "Panic" ? '#f44336' : 
                        alert.type === "Safety" ? '#ffc107' : '#4caf50'
                      }`
                    }}
                  >
                    <Typography variant="body2" gutterBottom>
                      <strong>{alert.workerName}</strong> • {alert.type} Alert
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {alert.message}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      {new Date(alert.time).toLocaleString()}
                    </Typography>
                    <Box mt={1} display="flex" justifyContent="space-between">
                      <Chip 
                        label={alert.status} 
                        size="small" 
                        color={
                          alert.status === "Resolved" ? "success" : 
                          alert.status === "In Progress" ? "primary" : "warning"
                        } 
                      />
                      <Button 
                        size="small" 
                        onClick={() => handleAlertStatusChange(alert.id, "In Progress")}
                      >
                                               Mark In Progress
                      </Button>
                    </Box>
                  </Box>
                ))}
                
                {alerts.filter(a => a.status !== "Resolved").length === 0 && (
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
                    No active alerts
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      {/* Attendance & Leave Tab */}
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Today's Attendance ({new Date().toLocaleDateString()})
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Worker</TableCell>
                        <TableCell>Check In</TableCell>
                        <TableCell>Check Out</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendance.map((record) => {
                        const worker = workers.find(w => w.workerId === record.workerId);
                        return (
                          <TableRow key={record.workerId}>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Avatar src={worker?.photo} sx={{ width: 40, height: 40, mr: 2 }} />
                                <Box>
                                  <Typography variant="body2">{worker?.name}</Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    {record.workerId}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>{record.checkIn}</TableCell>
                            <TableCell>{record.checkOut}</TableCell>
                            <TableCell>
                              <Chip 
                                label={record.status} 
                                color={
                                  record.status === "Present" ? "success" : 
                                  record.status === "On Leave" ? "warning" : "error"
                                } 
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {record.status === "Absent" && (
                                <Button size="small" color="error">
                                  Follow Up
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Leave Requests
                </Typography>
                
                {leaveRequests.map((request) => (
                  <Box 
                    key={request.id}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 
                        request.status === "Approved" ? 'success.main' : 
                        request.status === "Rejected" ? 'error.main' : 'warning.main',
                      backgroundColor: 
                        request.status === "Approved" ? 'rgba(76, 175, 80, 0.1)' : 
                        request.status === "Rejected" ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 152, 0, 0.1)'
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      {request.workerName} ({request.workerId})
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {request.type}: {request.startDate} to {request.endDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Reason: {request.reason}
                    </Typography>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                      <Chip 
                        label={request.status} 
                        size="small" 
                        color={
                          request.status === "Approved" ? "success" : 
                          request.status === "Rejected" ? "error" : "warning"
                        } 
                      />
                      
                      {request.status === "Pending" && (
                        <Box>
                          <Button 
                            size="small" 
                            color="success" 
                            sx={{ mr: 1 }}
                            onClick={() => handleLeaveAction(request.id, "Approved")}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="small" 
                            color="error"
                            onClick={() => handleLeaveAction(request.id, "Rejected")}
                          >
                            Reject
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
                
                {leaveRequests.length === 0 && (
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
                    No pending leave requests
                  </Typography>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Attendance Summary
                </Typography>
                
                <Box display="flex" justifyContent="space-around" textAlign="center" mt={2}>
                  <Box>
                    <Typography variant="h4" color="success.main">
                      {attendance.filter(a => a.status === "Present").length}
                    </Typography>
                    <Typography variant="body2">Present</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" color="warning.main">
                      {attendance.filter(a => a.status === "On Leave").length}
                    </Typography>
                    <Typography variant="body2">On Leave</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" color="error.main">
                      {attendance.filter(a => a.status === "Absent").length}
                    </Typography>
                    <Typography variant="body2">Absent</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      {/* Performance & Rewards Tab */}
      <TabPanel value={activeTab} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Metrics
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Worker</TableCell>
                        <TableCell align="center">Performance</TableCell>
                        <TableCell align="center">Bins Collected</TableCell>
                        <TableCell align="center">Punctuality</TableCell>
                        <TableCell align="center">Complaints</TableCell>
                        <TableCell align="center">Rewards</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {workers.map((worker) => (
                        <TableRow key={worker.id}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar src={worker.photo} sx={{ width: 40, height: 40, mr: 2 }} />
                              <Box>
                                <Typography variant="body2">{worker.name}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {worker.workerId}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex" alignItems="center" justifyContent="center">
                              <LinearProgress 
                                variant="determinate" 
                                value={worker.performance} 
                                sx={{ 
                                  width: 60, 
                                  mr: 1,
                                  backgroundColor: 
                                    worker.performance >= 80 ? 'rgba(76, 175, 80, 0.2)' : 
                                    worker.performance >= 60 ? 'rgba(255, 152, 0, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: 
                                      worker.performance >= 80 ? '#4caf50' : 
                                      worker.performance >= 60 ? '#ff9800' : '#f44336'
                                  }
                                }}
                              />
                              <Typography variant="body2">
                                {worker.performance}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2">
                              {worker.binsCollected}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2">
                              {worker.punctuality}%
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography 
                              variant="body2" 
                              color={worker.complaints > 0 ? "error.main" : "success.main"}
                            >
                              {worker.complaints}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex" alignItems="center" justifyContent="center">
                              <Award size={16} color="#ff9800" style={{ marginRight: 4 }} />
                              <Typography variant="body2">
                                {worker.rewards}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Performers
                </Typography>
                
                {workers
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 3)
                  .map((worker, index) => (
                    <Box 
                      key={worker.id}
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{ position: 'relative', mr: 2 }}>
                        <Avatar src={worker.photo} sx={{ width: 50, height: 50 }} />
                        {index === 0 && (
                          <Crown 
                            size={20} 
                            color="#ffd700" 
                            style={{ 
                              position: 'absolute', 
                              top: -5, 
                              right: -5,
                              filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))'
                            }} 
                          />
                        )}
                      </Box>
                      <Box flexGrow={1}>
                        <Typography variant="body2" fontWeight="medium">
                          {worker.name}
                        </Typography>
                        <Typography variant="caption" display="block" color="textSecondary">
                          {worker.workerId} • {worker.ward}
                        </Typography>
                        <Typography variant="body2" color="primary.main">
                          Performance: {worker.performance}%
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="h6" color="warning.main">
                          #{index + 1}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                
                <Button fullWidth variant="outlined" startIcon={<Award size={20} />}>
                  View All Rewards
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reward Worker
                </Typography>
                
                <TextField
                select
                fullWidth
                label="Select Workers"
                multiline
                SelectProps={{ multiple: true }}
                sx={{ mb: 2 }}
                value={selectedWorkers}        // <-- ensure this is always an array
                onChange={e => setSelectedWorkers(e.target.value)}
                >
                {workers.map(worker => (
                    <MenuItem key={worker.id} value={worker.id}>
                    {worker.name} ({worker.workerId})
                    </MenuItem>
                ))}
                </TextField>

                
                <TextField
                  fullWidth
                  label="Reward Points"
                  type="number"
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Reason"
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
                
                <Button fullWidth variant="contained">
                  Award Points
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      {/* Safety & Training Tab */}
      <TabPanel value={activeTab} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Training Modules
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Module Name</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Completed By</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trainingModules.map((module) => (
                        <TableRow key={module.id}>
                          <TableCell>
                            <Typography variant="body2">
                              {module.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {module.duration}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={module.status} 
                              color={module.status === "Mandatory" ? "primary" : "default"} 
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {module.completedBy} workers
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button size="small">Assign</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Safety Alerts & Incidents
                </Typography>
                
                {alerts.map((alert) => (
                  <Box 
                    key={alert.id}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 
                        alert.type === "Panic" ? 'error.main' : 
                        alert.type === "Safety" ? 'warning.main' : 'success.main',
                      backgroundColor: 
                        alert.type === "Panic" ? 'rgba(244, 67, 54, 0.1)' : 
                        alert.type === "Safety" ? 'rgba(255, 152, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)'
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="subtitle2">
                        {alert.workerName} • {alert.type} Alert
                      </Typography>
                      <Chip 
                        label={alert.status} 
                        size="small" 
                        color={
                          alert.status === "Resolved" ? "success" : 
                          alert.status === "In Progress" ? "primary" : "warning"
                        } 
                      />
                    </Box>
                    
                    <Typography variant="body2" gutterBottom>
                      {alert.message}
                    </Typography>
                    
                    <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
                      {new Date(alert.time).toLocaleString()}
                    </Typography>
                    
                    <Box mt={1} display="flex" gap={1}>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => {
                          const worker = workers.find(w => w.workerId === alert.workerId);
                          if (worker) {
                            setSelectedWorker(worker);
                            setProfileDialogOpen(true);
                          }
                        }}
                      >
                        View Worker
                      </Button>
                      
                      {alert.status !== "Resolved" && (
                        <Button 
                          size="small" 
                          variant="contained"
                          onClick={() => handleAlertStatusChange(alert.id, "Resolved")}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Health Status Overview
                </Typography>
                
                {workers.map((worker) => (
                  <Box 
                    key={worker.id}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 
                        worker.healthStatus === "Excellent" ? 'success.main' : 
                        worker.healthStatus === "Good" ? 'primary.main' : 'warning.main',
                      backgroundColor: 
                        worker.healthStatus === "Excellent" ? 'rgba(76, 175, 80, 0.1)' : 
                        worker.healthStatus === "Good" ? 'rgba(33, 150, 243, 0.1)' : 'rgba(255, 152, 0, 0.1)'
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <Avatar src={worker.photo} sx={{ width: 40, height: 40, mr: 2 }} />
                      <Box flexGrow={1}>
                        <Typography variant="body2" fontWeight="medium">
                          {worker.name}
                        </Typography>
                        <Typography variant="caption" display="block" color="textSecondary">
                          {worker.workerId}
                        </Typography>
                      </Box>
                      <Chip 
                        label={worker.healthStatus} 
                        size="small" 
                        color={
                          worker.healthStatus === "Excellent" ? "success" : 
                          worker.healthStatus === "Good" ? "primary" : "warning"
                        } 
                      />
                    </Box>
                    
                    {worker.healthStatus !== "Excellent" && worker.healthStatus !== "Good" && (
                      <Button size="small" fullWidth variant="outlined">
                        Schedule Checkup
                      </Button>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Schedule Training
                </Typography>
                
                
                
                <Button fullWidth variant="contained">
                  Schedule Training
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      {/* Worker Profile Dialog */}
      <WorkerProfileDialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
        worker={selectedWorker}
      />
    </Box>
  );
};

export default AuthorityManageWorker;