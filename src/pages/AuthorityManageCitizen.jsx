import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, TextField,
  MenuItem, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, Tabs, Tab,
  LinearProgress, useTheme, useMediaQuery, Avatar, IconButton,
  List, ListItem, ListItemText, ListItemAvatar, Divider, Badge
} from '@mui/material';
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Bell,
  Download,
  BarChart3,
  Users,
  AlertCircle,
  Award,
  Gift,
  Star,
  Shield,
  Ticket,
  Coins,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Minus
} from 'lucide-react';

// Mock data for citizens
const mockCitizens = [
  {
    id: 1,
    name: "Rajesh Kumar",
    citizenId: "CTZ001",
    ward: "Ward 5",
    society: "Green Valley Apartments",
    houseNumber: "B-204",
    contact: "9876543210",
    complianceStatus: "Good",
    activeComplaints: 0,
    complianceScore: 92,
    rewards: 450,
    penalties: 0,
    complianceHistory: [90, 88, 95, 92, 89, 93, 92],
    rewardHistory: [
      { id: 1, type: "Individual", points: 50, reason: "Perfect waste segregation", date: "2023-10-10" },
      { id: 2, type: "Individual", points: 100, reason: "Consistent compliance for 3 months", date: "2023-09-15" },
      { id: 3, type: "Community", points: 300, reason: "Society recycling initiative", date: "2023-10-05" }
    ],
    penaltyHistory: []
  },
  {
    id: 2,
    name: "Priya Sharma",
    citizenId: "CTZ002",
    ward: "Ward 3",
    society: "Sunrise Residency",
    houseNumber: "C-101",
    contact: "8765432109",
    complianceStatus: "Mixed",
    activeComplaints: 1,
    complianceScore: 65,
    rewards: 200,
    penalties: 50,
    complianceHistory: [60, 70, 55, 65, 60, 70, 65],
    rewardHistory: [
      { id: 1, type: "Individual", points: 50, reason: "Reporting illegal dumping", date: "2023-09-20" },
      { id: 2, type: "Community", points: 150, reason: "Community clean-up participation", date: "2023-08-12" }
    ],
    penaltyHistory: [
      { id: 1, type: "Minor", points: 50, reason: "Improper waste segregation", date: "2023-10-12" }
    ]
  },
  {
    id: 3,
    name: "Vikram Singh",
    citizenId: "CTZ003",
    ward: "Ward 5",
    society: "Green Valley Apartments",
    houseNumber: "A-102",
    contact: "7654321098",
    complianceStatus: "Repeat Offender",
    activeComplaints: 3,
    complianceScore: 35,
    rewards: 50,
    penalties: 300,
    complianceHistory: [40, 30, 35, 25, 40, 30, 35],
    rewardHistory: [
      { id: 1, type: "Community", points: 50, reason: "Society composting initiative", date: "2023-07-22" }
    ],
    penaltyHistory: [
      { id: 1, type: "Major", points: 100, reason: "Illegal dumping", date: "2023-10-14" },
      { id: 2, type: "Minor", points: 50, reason: "Missed waste disposal schedule", date: "2023-10-05" },
      { id: 3, type: "Major", points: 150, reason: "Repeated non-compliance", date: "2023-09-28" }
    ]
  },
  {
    id: 4,
    name: "Anjali Patel",
    citizenId: "CTZ004",
    ward: "Ward 2",
    society: "Ocean View Society",
    houseNumber: "D-305",
    contact: "6543210987",
    complianceStatus: "Good",
    activeComplaints: 0,
    complianceScore: 88,
    rewards: 380,
    penalties: 0,
    complianceHistory: [85, 90, 82, 88, 90, 85, 88],
    rewardHistory: [
      { id: 1, type: "Individual", points: 80, reason: "Excellent waste management", date: "2023-10-08" },
      { id: 2, type: "Individual", points: 100, reason: "Consistent compliance for 3 months", date: "2023-09-10" },
      { id: 3, type: "Community", points: 200, reason: "Society recycling program", date: "2023-08-15" }
    ],
    penaltyHistory: []
  },
  {
    id: 5,
    name: "Sanjay Mehta",
    citizenId: "CTZ005",
    ward: "Ward 3",
    society: "Sunrise Residency",
    houseNumber: "B-208",
    contact: "5432109876",
    complianceStatus: "Mixed",
    activeComplaints: 2,
    complianceScore: 58,
    rewards: 120,
    penalties: 100,
    complianceHistory: [50, 60, 55, 65, 50, 60, 58],
    rewardHistory: [
      { id: 1, type: "Community", points: 120, reason: "Society waste reduction campaign", date: "2023-09-05" }
    ],
    penaltyHistory: [
      { id: 1, type: "Minor", points: 50, reason: "Improper waste segregation", date: "2023-10-10" },
      { id: 2, type: "Minor", points: 50, reason: "Overflowing bin", date: "2023-09-22" }
    ]
  }
];

// Mock data for complaints
const mockComplaints = [
  {
    id: 1,
    citizenId: "CTZ002",
    citizenName: "Priya Sharma",
    type: "Waste not collected",
    ward: "Ward 3",
    society: "Sunrise Residency",
    date: "2023-10-15",
    status: "Pending",
    description: "Garbage not collected for 2 days"
  },
  {
    id: 2,
    citizenId: "CTZ003",
    citizenName: "Vikram Singh",
    type: "Overflowing bins",
    ward: "Ward 5",
    society: "Green Valley Apartments",
    date: "2023-10-14",
    status: "In Progress",
    description: "Community bin overflowing near building A"
  },
  {
    id: 3,
    citizenId: "CTZ003",
    citizenName: "Vikram Singh",
    type: "Worker misconduct",
    ward: "Ward 5",
    society: "Green Valley Apartments",
    date: "2023-10-10",
    status: "Resolved",
    description: "Worker was rude while collecting waste"
  },
  {
    id: 4,
    citizenId: "CTZ005",
    citizenName: "Sanjay Mehta",
    type: "Others",
    ward: "Ward 3",
    society: "Sunrise Residency",
    date: "2023-10-12",
    status: "Pending",
    description: "Stray animals scattering waste from bins"
  },
  {
    id: 5,
    citizenId: "CTZ003",
    citizenName: "Vikram Singh",
    type: "Waste not collected",
    ward: "Ward 5",
    society: "Green Valley Apartments",
    date: "2023-10-08",
    status: "In Progress",
    description: "Regular waste collection missed"
  }
];

// Mock data for societies
const mockSocieties = [
  {
    name: "Green Valley Apartments",
    ward: "Ward 5",
    compliance: 76,
    activeComplaints: 4,
    rewards: 1200,
    penalties: 300,
    citizens: 120,
    rewardHistory: [
      { id: 1, type: "Recycling", points: 500, reason: "50% recycling rate achieved", date: "2023-10-10" },
      { id: 2, type: "Composting", points: 400, reason: "Community composting initiative", date: "2023-09-15" },
      { id: 3, type: "Cleanliness", points: 300, reason: "Zero litter week", date: "2023-09-05" }
    ],
    penaltyHistory: [
      { id: 1, type: "Violation", points: 200, reason: "Multiple improper disposal cases", date: "2023-10-14" },
      { id: 2, type: "Violation", points: 100, reason: "Overflowing community bins", date: "2023-09-28" }
    ]
  },
  {
    name: "Sunrise Residency",
    ward: "Ward 3",
    compliance: 62,
    activeComplaints: 3,
    rewards: 800,
    penalties: 450,
    citizens: 85,
    rewardHistory: [
      { id: 1, type: "Awareness", points: 400, reason: "Waste management workshop", date: "2023-09-20" },
      { id: 2, type: "Recycling", points: 400, reason: "Improved recycling rates", date: "2023-08-15" }
    ],
    penaltyHistory: [
      { id: 1, type: "Violation", points: 250, reason: "Illegal dumping incidents", date: "2023-10-12" },
      { id: 2, type: "Violation", points: 200, reason: "Consistent non-compliance", date: "2023-09-20" }
    ]
  },
  {
    name: "Ocean View Society",
    ward: "Ward 2",
    compliance: 88,
    activeComplaints: 0,
    rewards: 1500,
    penalties: 0,
    citizens: 95,
    rewardHistory: [
      { id: 1, type: "Excellence", points: 700, reason: "Zero waste policy implementation", date: "2023-10-05" },
      { id: 2, type: "Innovation", points: 500, reason: "Waste-to-energy initiative", date: "2023-09-10" },
      { id: 3, type: "Consistency", points: 300, reason: "6 months perfect compliance", date: "2023-08-15" }
    ],
    penaltyHistory: []
  },
  {
    name: "Royal Palms",
    ward: "Ward 4",
    compliance: 71,
    activeComplaints: 2,
    rewards: 950,
    penalties: 200,
    citizens: 110,
    rewardHistory: [
      { id: 1, type: "Improvement", points: 500, reason: "30% compliance improvement", date: "2023-09-25" },
      { id: 2, type: "Recycling", points: 450, reason: "Plastic recycling drive", date: "2023-08-30" }
    ],
    penaltyHistory: [
      { id: 1, type: "Violation", points: 200, reason: "Improper waste management", date: "2023-10-08" }
    ]
  },
  {
    name: "Maple Towers",
    ward: "Ward 1",
    compliance: 81,
    activeComplaints: 1,
    rewards: 1300,
    penalties: 100,
    citizens: 75,
    rewardHistory: [
      { id: 1, type: "Innovation", points: 600, reason: "Community composting system", date: "2023-10-01" },
      { id: 2, type: "Consistency", points: 400, reason: "3 months perfect compliance", date: "2023-09-10" },
      { id: 3, type: "Awareness", points: 300, reason: "Environmental awareness campaign", date: "2023-08-20" }
    ],
    penaltyHistory: [
      { id: 1, type: "Violation", points: 100, reason: "Single violation incident", date: "2023-09-15" }
    ]
  }
];

// Reward types for individuals
const individualRewardTypes = [
  { value: "compliance", label: "Consistent Compliance", points: 100, description: "Reward for maintaining good compliance for a continuous period" },
  { value: "segregation", label: "Perfect Segregation", points: 50, description: "Reward for proper waste segregation" },
  { value: "reporting", label: "Issue Reporting", points: 75, description: "Reward for reporting waste management issues" },
  { value: "innovation", label: "Innovative Solution", points: 150, description: "Reward for suggesting innovative waste management solutions" },
  { value: "participation", label: "Event Participation", points: 80, description: "Reward for participating in community clean-up events" }
];

// Reward types for communities
const communityRewardTypes = [
  { value: "recycling", label: "Recycling Achievement", points: 500, description: "Reward for achieving recycling targets" },
  { value: "composting", label: "Composting Initiative", points: 400, description: "Reward for community composting programs" },
  { value: "cleanliness", label: "Cleanliness Excellence", points: 300, description: "Reward for maintaining exceptional cleanliness" },
  { value: "awareness", label: "Awareness Campaign", points: 350, description: "Reward for organizing waste management awareness programs" },
  { value: "innovation", label: "Innovative Project", points: 600, description: "Reward for implementing innovative waste management projects" }
];

// Penalty types
const penaltyTypes = [
  { value: "minor", label: "Minor Violation", points: 50, description: "Penalty for minor infractions like improper segregation" },
  { value: "major", label: "Major Violation", points: 100, description: "Penalty for major violations like illegal dumping" },
  { value: "repeat", label: "Repeat Offense", points: 150, description: "Penalty for repeated non-compliance" },
  { value: "community", label: "Community Violation", points: 200, description: "Penalty for community-level violations" }
];

// Compliance status options
const complianceStatusOptions = [
  "All",
  "Good",
  "Mixed",
  "Repeat Offender"
];

// Ward options
const wardOptions = [
  "All",
  "Ward 1",
  "Ward 2",
  "Ward 3",
  "Ward 4",
  "Ward 5"
];

// Society options
const societyOptions = [
  "All",
  ...new Set(mockCitizens.map(citizen => citizen.society))
];

// Complaint status options
const complaintStatusOptions = [
  "All",
  "Pending",
  "In Progress",
  "Resolved"
];

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

// Reward Dialog Component
function RewardDialog({ open, onClose, type, onAddReward }) {
  const [selectedReward, setSelectedReward] = useState("");
  const [points, setPoints] = useState(0);
  const [reason, setReason] = useState("");
  const [recipient, setRecipient] = useState("");
  
  const rewardTypes = type === "individual" ? individualRewardTypes : communityRewardTypes;

  const handleAddReward = () => {
    const reward = rewardTypes.find(r => r.value === selectedReward);
    onAddReward({
      type: type,
      points: points || reward.points,
      reason: reason || reward.description,
      recipient: recipient
    });
    onClose();
    setSelectedReward("");
    setPoints(0);
    setReason("");
    setRecipient("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add {type === "individual" ? "Individual" : "Community"} Reward
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Reward Type"
              value={selectedReward}
              onChange={(e) => {
                setSelectedReward(e.target.value);
                const reward = rewardTypes.find(r => r.value === e.target.value);
                if (reward) {
                  setPoints(reward.points);
                  setReason(reward.description);
                }
              }}
            >
              {rewardTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} ({option.points} points)
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Points"
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason"
              multiline
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={type === "individual" ? "Citizen ID" : "Society Name"}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleAddReward}
          disabled={!selectedReward || !recipient}
        >
          Add Reward
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Penalty Dialog Component
function PenaltyDialog({ open, onClose, onAddPenalty }) {
  const [selectedPenalty, setSelectedPenalty] = useState("");
  const [points, setPoints] = useState(0);
  const [reason, setReason] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientType, setRecipientType] = useState("individual");

  const handleAddPenalty = () => {
    const penalty = penaltyTypes.find(p => p.value === selectedPenalty);
    onAddPenalty({
      type: recipientType,
      points: points || penalty.points,
      reason: reason || penalty.description,
      recipient: recipient
    });
    onClose();
    setSelectedPenalty("");
    setPoints(0);
    setReason("");
    setRecipient("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add Penalty
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Recipient Type"
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="community">Community</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Penalty Type"
              value={selectedPenalty}
              onChange={(e) => {
                setSelectedPenalty(e.target.value);
                const penalty = penaltyTypes.find(p => p.value === e.target.value);
                if (penalty) {
                  setPoints(penalty.points);
                  setReason(penalty.description);
                }
              }}
            >
              {penaltyTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} ({option.points} points)
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Points"
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason"
              multiline
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={recipientType === "individual" ? "Citizen ID" : "Society Name"}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          color="error"
          onClick={handleAddPenalty}
          disabled={!selectedPenalty || !recipient}
        >
          Add Penalty
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Citizen Profile Dialog Component
function CitizenProfileDialog({ open, onClose, citizen }) {
  if (!citizen) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Citizen Profile - {citizen.name}
        <Chip 
          label={citizen.complianceStatus} 
          color={
            citizen.complianceStatus === "Good" ? "success" : 
            citizen.complianceStatus === "Mixed" ? "warning" : "error"
          } 
          sx={{ ml: 2 }}
        />
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Citizen ID:</strong> {citizen.citizenId}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Contact:</strong> {citizen.contact}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Ward:</strong> {citizen.ward}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Society:</strong> {citizen.society}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>House Number:</strong> {citizen.houseNumber}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Compliance Overview
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Box width="100%" mr={1}>
                <LinearProgress 
                  variant="determinate" 
                  value={citizen.complianceScore} 
                  color={
                    citizen.complianceScore >= 80 ? "success" : 
                    citizen.complianceScore >= 60 ? "warning" : "error"
                  }
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">
                  {`${citizen.complianceScore}%`}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Award color="success" size={24} style={{ marginRight: 8 }} />
                  <Typography variant="h6" color="success.main">
                    {citizen.rewards} pts
                  </Typography>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Reward Points
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <AlertCircle color="error" size={24} style={{ marginRight: 8 }} />
                  <Typography variant="h6" color="error.main">
                    {citizen.penalties} pts
                  </Typography>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Penalty Points
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Reward History
            </Typography>
            <List dense>
              {citizen.rewardHistory.map((reward, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.light' }}>
                      <Star size={20} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`+${reward.points} pts - ${reward.reason}`}
                    secondary={`${reward.type} • ${reward.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Penalty History
            </Typography>
            {citizen.penaltyHistory.length > 0 ? (
              <List dense>
                {citizen.penaltyHistory.map((penalty, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'error.light' }}>
                        <AlertCircle size={20} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`-${penalty.points} pts - ${penalty.reason}`}
                      secondary={`${penalty.type} • ${penalty.date}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No penalties recorded
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Active Complaints: {citizen.activeComplaints}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" color="primary">
          View Full History
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Main Component
const AuthorityManageCitizen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State variables
  const [activeTab, setActiveTab] = useState(0);
  const [citizens, setCitizens] = useState(mockCitizens);
  const [filteredCitizens, setFilteredCitizens] = useState(mockCitizens);
  const [complaints, setComplaints] = useState(mockComplaints);
  const [filteredComplaints, setFilteredComplaints] = useState(mockComplaints);
  const [societies, setSocieties] = useState(mockSocieties);
  
  // Filter states
  const [wardFilter, setWardFilter] = useState("All");
  const [societyFilter, setSocietyFilter] = useState("All");
  const [complianceFilter, setComplianceFilter] = useState("All");
  const [activeComplaintsFilter, setActiveComplaintsFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Complaint filter states
  const [complaintWardFilter, setComplaintWardFilter] = useState("All");
  const [complaintStatusFilter, setComplaintStatusFilter] = useState("All");
  
  // Dialog states
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [rewardDialogType, setRewardDialogType] = useState("individual");
  const [penaltyDialogOpen, setPenaltyDialogOpen] = useState(false);
  
  // Apply filters to citizens
  useEffect(() => {
    let result = [...citizens];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(citizen => 
        citizen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        citizen.citizenId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply ward filter
    if (wardFilter !== "All") {
      result = result.filter(citizen => citizen.ward === wardFilter);
    }
    
    // Apply society filter
    if (societyFilter !== "All") {
      result = result.filter(citizen => citizen.society === societyFilter);
    }
    
    // Apply compliance status filter
    if (complianceFilter !== "All") {
      result = result.filter(citizen => citizen.complianceStatus === complianceFilter);
    }
    
    // Apply active complaints filter
    if (activeComplaintsFilter) {
      result = result.filter(citizen => citizen.activeComplaints > 0);
    }
    
    setFilteredCitizens(result);
  }, [searchQuery, wardFilter, societyFilter, complianceFilter, activeComplaintsFilter, citizens]);
  
  // Apply filters to complaints
  useEffect(() => {
    let result = [...complaints];
    
    // Apply ward filter
    if (complaintWardFilter !== "All") {
      result = result.filter(complaint => complaint.ward === complaintWardFilter);
    }
    
    // Apply status filter
    if (complaintStatusFilter !== "All") {
      result = result.filter(complaint => complaint.status === complaintStatusFilter);
    }
    
    setFilteredComplaints(result);
  }, [complaintWardFilter, complaintStatusFilter, complaints]);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle citizen row click
  const handleCitizenClick = (citizen) => {
    setSelectedCitizen(citizen);
    setProfileDialogOpen(true);
  };
  
  // Handle complaint status change
  const handleComplaintStatusChange = (complaintId, newStatus) => {
    setComplaints(prevComplaints => 
      prevComplaints.map(complaint => 
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      )
    );
  };
  
  // Handle send notification
  const handleSendNotification = () => {
    alert("Notification sent to selected citizens!");
  };
  
  // Handle generate report
  const handleGenerateReport = () => {
    alert("Report generation started! This may take a few moments.");
  };
  
  // Handle add reward
  const handleAddReward = (reward) => {
    if (reward.type === "individual") {
      // Find citizen by ID and add reward
      setCitizens(prevCitizens => 
        prevCitizens.map(citizen => 
          citizen.citizenId === reward.recipient 
            ? { 
                ...citizen, 
                rewards: citizen.rewards + reward.points,
                rewardHistory: [
                  ...citizen.rewardHistory,
                  {
                    id: citizen.rewardHistory.length + 1,
                    type: "Individual",
                    points: reward.points,
                    reason: reward.reason,
                    date: new Date().toISOString().split('T')[0]
                  }
                ]
              }
            : citizen
        )
      );
    } else {
      // Find society by name and add reward
      setSocieties(prevSocieties => 
        prevSocieties.map(society => 
          society.name === reward.recipient 
            ? { 
                ...society, 
                rewards: society.rewards + reward.points,
                rewardHistory: [
                  ...society.rewardHistory,
                  {
                    id: society.rewardHistory.length + 1,
                    type: reward.reason.includes("Recycling") ? "Recycling" : 
                          reward.reason.includes("Composting") ? "Composting" : 
                          reward.reason.includes("Cleanliness") ? "Cleanliness" : "Other",
                    points: reward.points,
                    reason: reward.reason,
                    date: new Date().toISOString().split('T')[0]
                  }
                ]
              }
            : society
        )
      );
    }
    alert(`Added ${reward.points} points to ${reward.recipient}`);
  };
  
  // Handle add penalty
  const handleAddPenalty = (penalty) => {
    if (penalty.type === "individual") {
      // Find citizen by ID and add penalty
      setCitizens(prevCitizens => 
        prevCitizens.map(citizen => 
          citizen.citizenId === penalty.recipient 
            ? { 
                ...citizen, 
                penalties: citizen.penalties + penalty.points,
                penaltyHistory: [
                  ...citizen.penaltyHistory,
                  {
                    id: citizen.penaltyHistory.length + 1,
                    type: penalty.reason.includes("Minor") ? "Minor" : 
                          penalty.reason.includes("Major") ? "Major" : "Other",
                    points: penalty.points,
                    reason: penalty.reason,
                    date: new Date().toISOString().split('T')[0]
                  }
                ]
              }
            : citizen
        )
      );
    } else {
      // Find society by name and add penalty
      setSocieties(prevSocieties => 
        prevSocieties.map(society => 
          society.name === penalty.recipient 
            ? { 
                ...society, 
                penalties: society.penalties + penalty.points,
                penaltyHistory: [
                  ...society.penaltyHistory,
                  {
                    id: society.penaltyHistory.length + 1,
                    type: "Violation",
                    points: penalty.points,
                    reason: penalty.reason,
                    date: new Date().toISOString().split('T')[0]
                  }
                ]
              }
            : society
        )
      );
    }
    alert(`Added ${penalty.points} penalty points to ${penalty.recipient}`);
  };
  
  // Handle open reward dialog
  const handleOpenRewardDialog = (type) => {
    setRewardDialogType(type);
    setRewardDialogOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
<Box sx={{ flexGrow: 1, p: 3 }}>
  <Typography
    variant="h4"
    gutterBottom
    sx={{
      mb: 3,
      fontSize: '1.875rem', // ~text-3xl
      fontWeight: 'bold',
      color: 'text.primary', // ensures visibility in light/dark mode
    }}
  >
    Manage Citizens
  </Typography>
</Box>

      
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="manage citizens tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab icon={<Users size={20} />} label="Citizens" />
            <Tab icon={<AlertCircle size={20} />} label="Complaints" />
            <Tab icon={<BarChart3 size={20} />} label="Performance" />
          </Tabs>
        </Box>

        {/* Citizen Database Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {/* Search Field */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search size={20} style={{ marginRight: 8 }} />
                }}
              />
            </Grid>
            
            {/* Filter Fields - Stack vertically on mobile */}
            <Grid item xs={6} sm={6} md={2}>
              <TextField
                fullWidth
                size="small"
                select
                label="Ward"
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
              >
                {wardOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={6} sm={6} md={2}>
              <TextField
                fullWidth
                size="small"
                select
                label="Society"
                value={societyFilter}
                onChange={(e) => setSocietyFilter(e.target.value)}
              >
                {societyOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={6} sm={6} md={2}>
              <TextField
                fullWidth
                size="small"
                select
                label="Compliance"
                value={complianceFilter}
                onChange={(e) => setComplianceFilter(e.target.value)}
              >
                {complianceStatusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            {/* Action Buttons */}
            <Grid item xs={6} sm={6} md={3}>
              <Box display="flex" gap={0.5} flexDirection={{ xs: 'column', sm: 'row' }}>
                <Button
                  variant="outlined"
                  startIcon={<Filter size={18} />}
                  onClick={() => setActiveComplaintsFilter(!activeComplaintsFilter)}
                  color={activeComplaintsFilter ? "primary" : "inherit"}
                  size="small"
                  sx={{ minWidth: 'auto', flex: 1 }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Active
                  </Box>
                  <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                    <Filter size={16} />
                  </Box>
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Bell size={18} />}
                  onClick={handleSendNotification}
                  size="small"
                  sx={{ minWidth: 'auto', flex: 1 }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Notify
                  </Box>
                  <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                    <Bell size={16} />
                  </Box>
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Action Buttons Row */}
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => handleOpenRewardDialog("individual")}
                fullWidth
                size="small"
                color="success"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Add Reward
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Reward
                </Box>
              </Button>
            </Grid>
            
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="contained"
                startIcon={<Minus size={16} />}
                onClick={() => setPenaltyDialogOpen(true)}
                fullWidth
                size="small"
                color="error"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Add Penalty
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Penalty
                </Box>
              </Button>
            </Grid>
            
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<Download size={16} />}
                onClick={handleGenerateReport}
                fullWidth
                size="small"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Export Data
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Export
                </Box>
              </Button>
            </Grid>
            
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<BarChart3 size={16} />}
                onClick={() => setActiveTab(2)}
                fullWidth
                size="small"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  View Societies
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Societies
                </Box>
              </Button>
            </Grid>
          </Grid>

          {/* Table - Responsive version */}
          <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="citizen table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Citizen</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>ID</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Ward</TableCell>
                  <TableCell>Society</TableCell>
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Compliance</TableCell>
                  <TableCell>Complaints</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Rewards</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Penalties</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCitizens.map((citizen) => (
                  <TableRow
                    key={citizen.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleCitizenClick(citizen)}
                  >
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                          {citizen.name.charAt(0)}
                        </Avatar>
                        {citizen.name}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {citizen.citizenId}
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {citizen.ward}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                          {citizen.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {citizen.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {citizen.society}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {citizen.society}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                      <Box display="flex" alignItems="center">
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={citizen.complianceScore}
                            color={
                              citizen.complianceScore >= 80 ? "success" :
                              citizen.complianceScore >= 60 ? "warning" : "error"
                            }
                            sx={{ height: 8, borderRadius: 5 }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="textSecondary">
                            {`${citizen.complianceScore}%`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Badge
                        badgeContent={citizen.activeComplaints}
                        color="error"
                        invisible={citizen.activeComplaints === 0}
                      >
                        <AlertTriangle size={20} color={
                          citizen.activeComplaints === 0 ? theme.palette.success.main :
                          citizen.activeComplaints === 1 ? theme.palette.warning.main :
                          theme.palette.error.main
                        } />
                      </Badge>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Box display="flex" alignItems="center" color="success.main">
                        <Award size={18} style={{ marginRight: 4 }} />
                        {citizen.rewards}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Box display="flex" alignItems="center" color="error.main">
                        <AlertCircle size={18} style={{ marginRight: 4 }} />
                        {citizen.penalties}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Bell size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredCitizens.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <AlertCircle size={48} color={theme.palette.text.secondary} />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                No citizens found matching your filters
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Complaint Management Tab - Mobile Responsive */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                select
                label="Filter by Ward"
                value={complaintWardFilter}
                onChange={(e) => setComplaintWardFilter(e.target.value)}
              >
                {wardOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                select
                label="Filter by Status"
                value={complaintStatusFilter}
                onChange={(e) => setComplaintStatusFilter(e.target.value)}
              >
                {complaintStatusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<Download size={16} />}
                onClick={handleGenerateReport}
                fullWidth
                size="small"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Export Complaints
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Export
                </Box>
              </Button>
            </Grid>
            
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => alert("Add new complaint feature would open here")}
                fullWidth
                size="small"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Add Complaint
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Add
                </Box>
              </Button>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="complaints table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Complaint ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Citizen</TableCell>
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Ward</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      #{complaint.id}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: { xs: 'flex', sm: 'block' }, flexDirection: 'column' }}>
                        <Typography variant="body2" fontWeight="bold">
                          {complaint.type}
                        </Typography>
                        <Typography variant="caption" sx={{ display: { xs: 'block', sm: 'none' } }}>
                          #{complaint.id} • {complaint.date}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                          {complaint.citizenName.charAt(0)}
                        </Avatar>
                        {complaint.citizenName}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                      {complaint.ward}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status}
                        color={
                          complaint.status === "Resolved" ? "success" :
                          complaint.status === "In Progress" ? "primary" : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex">
                        <IconButton
                          size="small"
                          onClick={() => alert(`View details of complaint #${complaint.id}`)}
                        >
                          <Search size={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleComplaintStatusChange(complaint.id, "Resolved")}
                          disabled={complaint.status === "Resolved"}
                        >
                          <CheckCircle2 size={16} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredComplaints.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircle2 size={48} color={theme.palette.success.main} />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                No complaints found matching your filters
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Society Performance Tab - Mobile Responsive */}
        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                select
                label="Filter by Ward"
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
              >
                {wardOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => handleOpenRewardDialog("community")}
                fullWidth
                size="small"
                color="success"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Community Reward
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Reward
                </Box>
              </Button>
            </Grid>
            
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<Download size={16} />}
                onClick={handleGenerateReport}
                fullWidth
                size="small"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Export Report
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Export
                </Box>
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<Users size={16} />}
                onClick={() => setActiveTab(0)}
                fullWidth
                size="small"
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  View Citizens
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Citizens
                </Box>
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {societies
              .filter(society => wardFilter === "All" || society.ward === wardFilter)
              .map((society) => (
                <Grid item xs={12} sm={6} lg={4} key={society.name}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {society.name}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {society.ward} • {society.citizens} residents
                      </Typography>
                      
                      <Box display="flex" alignItems="center" sx={{ my: 2 }}>
                        <Box width="100%" mr={1}>
                          <LinearProgress
                            variant="determinate"
                            value={society.compliance}
                            color={
                              society.compliance >= 80 ? "success" :
                              society.compliance >= 60 ? "warning" : "error"
                            }
                            sx={{ height: 10, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="body2">
                          {society.compliance}%
                        </Typography>
                      </Box>
                      
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" color="success.main">
                            <TrendingUp size={16} style={{ marginRight: 4 }} />
                            <Typography variant="body2">
                              {society.rewards} pts
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" color="error.main">
                            <TrendingDown size={16} style={{ marginRight: 4 }} />
                            <Typography variant="body2">
                              {society.penalties} pts
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center">
                            <AlertTriangle size={16} style={{ marginRight: 4 }} />
                            <Typography variant="body2">
                              {society.activeComplaints} complaints
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ mt: 2 }}>
                        <Button
                          size="small"
                          onClick={() => alert(`View details for ${society.name}`)}
                        >
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/* Dialogs (unchanged) */}
        <CitizenProfileDialog
          open={profileDialogOpen}
          onClose={() => setProfileDialogOpen(false)}
          citizen={selectedCitizen}
        />

        <RewardDialog
          open={rewardDialogOpen}
          onClose={() => setRewardDialogOpen(false)}
          type={rewardDialogType}
          onAddReward={handleAddReward}
        />

        <PenaltyDialog
          open={penaltyDialogOpen}
          onClose={() => setPenaltyDialogOpen(false)}
          onAddPenalty={handleAddPenalty}
        />
    </Box>
  );
};

export default AuthorityManageCitizen;