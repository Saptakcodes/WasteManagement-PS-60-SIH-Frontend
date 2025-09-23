// src/components/ReportWaste.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Camera, 
  AlertTriangle, 
  Filter, 
  Search, 
  CheckCircle,
  Clock,
  XCircle,
  Award,
  BarChart3,
  Plus,
  Minus,
  Navigation,
  Shield,
  Eye,
  EyeOff,
  Share,
  TrendingUp,
  Leaf,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

const ReportWaste = () => {
  // State for form data
  const [formData, setFormData] = useState({
    complaintType: '',
    location: {
      address: '',
      lat: null,
      lng: null
    },
    photo: null,
    description: '',
    anonymous: false
  });

  // State for current location
  const [currentLocation, setCurrentLocation] = useState({
    lat: 12.9716, // Default to Bengaluru
    lng: 77.5946,
    address: 'Bengaluru, Karnataka, India'
  });

  // State for location loading
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // State for reported issues list
  const [reportedIssues, setReportedIssues] = useState([
    {
      id: 1,
      complaintType: 'illegal-dumping',
      location: {
        address: '123 Main Street, Bengaluru',
        lat: 12.9716,
        lng: 77.5946
      },
      photo: 'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: 'Large pile of construction waste dumped illegally near the park',
      status: 'resolved',
      points: 100,
      reportedDate: '2023-10-15',
      resolvedDate: '2023-10-18',
      ticketNumber: 'COMP-001235'
    },
    {
      id: 2,
      complaintType: 'overflowing-bins',
      location: {
        address: '456 Oak Avenue, Mumbai',
        lat: 19.0760,
        lng: 72.8777
      },
      photo: 'https://images.unsplash.com/photo-1621550179736-8ad6d5d8dc56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: 'Community bin overflowing for 3 days, attracting stray animals',
      status: 'in-progress',
      points: 50,
      reportedDate: '2023-10-20',
      ticketNumber: 'COMP-001236'
    },
    {
      id: 3,
      complaintType: 'burning-waste',
      location: {
        address: '789 Pine Road, Delhi',
        lat: 28.7041,
        lng: 77.1025
      },
      photo: 'https://images.unsplash.com/photo-1616627563236-c81c0b6f672c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: 'Regular open burning of plastic waste in empty lot',
      status: 'pending',
      points: 0,
      reportedDate: '2023-10-22',
      ticketNumber: 'COMP-001237'
    }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    complaintType: 'all',
    status: 'all',
    searchQuery: ''
  });

  // State for map view
  const [mapView, setMapView] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [mapZoom, setMapZoom] = useState(16);

  // Ref for file input
  const fileInputRef = useRef(null);

  // Complaint types with icons and colors
  const complaintTypes = [
    { id: 'illegal-dumping', name: 'Illegal Dumping', color: 'bg-red-500', icon: '🚛' },
    { id: 'overflowing-bins', name: 'Overflowing Bins', color: 'bg-orange-500', icon: '🗑️' },
    { id: 'waste-not-collected', name: 'Waste Not Collected', color: 'bg-yellow-500', icon: '📦' },
    { id: 'burning-waste', name: 'Burning Waste', color: 'bg-purple-500', icon: '🔥' },
    { id: 'hazardous-waste', name: 'Hazardous Waste', color: 'bg-rose-600', icon: '☣️' }
  ];

  // Get current location with simplified approach
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Try to get address using reverse geocoding
          let address = 'Address not found';
          
          try {
            // Try Google Maps Geocoding API first
            const googleResponse = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBVQWV55sFWUtTNhlX32FWe88N4TFZrNT4`
            );
            const googleData = await googleResponse.json();
            
            if (googleData.status === 'OK' && googleData.results.length > 0) {
              address = googleData.results[0].formatted_address;
            } else {
              // Fallback to OpenStreetMap Nominatim
              const osmResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
              );
              const osmData = await osmResponse.json();
              
              if (osmData.display_name) {
                address = osmData.display_name;
              } else {
                address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
              }
            }
          } catch (error) {
            console.error('Error getting address from APIs:', error);
            // Final fallback - just use coordinates
            address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          }
          
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            address: address
          });

          // Auto-fill the form with current location
          setFormData(prev => ({
            ...prev,
            location: {
              address: address,
              lat: latitude,
              lng: longitude
            }
          }));

          setIsGettingLocation(false);
        } catch (error) {
          console.error('Error getting address:', error);
          // Fallback to just coordinates if address fetch fails
          const fallbackAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            address: fallbackAddress
          });
          
          setFormData(prev => ({
            ...prev,
            location: {
              address: fallbackAddress,
              lat: latitude,
              lng: longitude
            }
          }));
          
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied. Please enable location permissions in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out.');
            break;
          default:
            alert('An unknown error occurred while getting your location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  };

  // Alternative simpler approach without reverse geocoding
  const getCurrentLocationSimple = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Create a simple address using coordinates
        const simpleAddress = `Near ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        
        setCurrentLocation({
          lat: latitude,
          lng: longitude,
          address: simpleAddress
        });

        // Auto-fill the form with current location
        setFormData(prev => ({
          ...prev,
          location: {
            address: simpleAddress,
            lat: latitude,
            lng: longitude
          }
        }));

        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied. Please enable location permissions in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out. Please try again.');
            break;
          default:
            alert('An unknown error occurred while getting your location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle location change
  const handleLocationChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        address: value
      }
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            photo: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('File size must be less than 5MB');
      }
    } else {
      alert('Please upload a JPG or PNG image');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate location coordinates
    if (!formData.location.lat || !formData.location.lng) {
      alert('Please use the "Use current location" button to capture coordinates');
      return;
    }
    
    // In a real app, this would send data to the backend
    const newIssue = {
      id: reportedIssues.length + 1,
      ...formData,
      points: 0,
      status: 'pending',
      reportedDate: new Date().toISOString().split('T')[0],
      ticketNumber: `COMP-${Math.floor(100000 + Math.random() * 900000)}`
    };
    
    setReportedIssues(prev => [newIssue, ...prev]);
    
    // Reset form
    setFormData({
      complaintType: '',
      location: {
        address: '',
        lat: null,
        lng: null
      },
      photo: null,
      description: '',
      anonymous: false
    });
    
    alert('Complaint submitted successfully! Track its status using your ticket number.');
  };

  // Filter issues based on selected filters
  const filteredIssues = reportedIssues.filter(issue => {
    const matchesType = filters.complaintType === 'all' || issue.complaintType === filters.complaintType;
    const matchesStatus = filters.status === 'all' || issue.status === filters.status;
    const matchesSearch = issue.location.address.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'resolved':
        return { 
          icon: CheckCircle, 
          color: 'text-green-600', 
          bgColor: 'bg-green-100 dark:bg-green-800',
          text: 'Resolved'
        };
      case 'in-progress':
        return { 
          icon: Clock, 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-100 dark:bg-blue-800',
          text: 'In Progress'
        };
      default:
        return { 
          icon: AlertTriangle, 
          color: 'text-yellow-600', 
          bgColor: 'bg-yellow-100 dark:bg-yellow-800',
          text: 'Pending'
        };
    }
  };

  // Get complaint type info
  const getComplaintTypeInfo = (typeId) => {
    return complaintTypes.find(type => type.id === typeId) || 
           { name: 'Unknown', color: 'bg-gray-500', icon: '❓' };
  };

  // Get map URL for current location or selected issue
  const getMapUrl = () => {
    if (selectedIssue && selectedIssue.location.lat && selectedIssue.location.lng) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBVQWV55sFWUtTNhlX32FWe88N4TFZrNT4&q=${selectedIssue.location.lat},${selectedIssue.location.lng}&zoom=${mapZoom}&maptype=roadmap`;
    }
    if (currentLocation.lat && currentLocation.lng) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBVQWV55sFWUtTNhlX32FWe88N4TFZrNT4&q=${currentLocation.lat},${currentLocation.lng}&zoom=${mapZoom}&maptype=roadmap`;
    }
    // Default to Bengaluru if no location available
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBVQWV55sFWUtTNhlX32FWe88N4TFZrNT4&q=12.9716,77.5946&zoom=12&maptype=roadmap`;
  };

  // Zoom in/out functions
  const zoomIn = () => setMapZoom(prev => Math.min(prev + 1, 20));
  const zoomOut = () => setMapZoom(prev => Math.max(prev - 1, 1));

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  // Stats for motivation section
  const stats = {
    monthlyReports: 1200,
    resolutionRate: 80,
    wasteDiverted: 500,
    activeCommunities: 42
  };

  return (
    <div className="min-h-screen bg-white dark:bg-green-900 text-green-900 dark:text-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Report Waste Issues</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Be the change in your community. Report waste mismanagement and help create a cleaner, greener India.
          </p>
        </motion.div>

        {/* Motivation & Stats Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Reports Make a Difference!</h2>
              <p className="mb-6">
                Every report contributes to cleaner streets, healthier communities, and a better environment 
                for all. Together, we're building a movement for sustainable waste management across India.
              </p>
              <div className="flex items-center bg-green-600 bg-opacity-50 rounded-lg p-3">
                <Leaf className="mr-3" size={24} />
                <div>
                  <p className="font-semibold">Impact Counter</p>
                  <p>Your reports have helped divert {stats.wasteDiverted} kg of waste from open burning</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">{stats.monthlyReports}+</p>
                <p className="text-sm">Issues Reported This Month</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">{stats.resolutionRate}%</p>
                <p className="text-sm">Resolution Rate</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">{stats.activeCommunities}</p>
                <p className="text-sm">Active Communities</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">100+</p>
                <p className="text-sm">Green Champions</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Form Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-1"
          >
            <div className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg sticky top-6">
              <h2 className="text-2xl font-semibold mb-6">Report an Issue</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Complaint Type Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Issue Type *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {complaintTypes.map(type => (
                      <div
                        key={type.id}
                        className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all ${
                          formData.complaintType === type.id
                            ? 'border-green-600 bg-green-100 dark:bg-green-700 text-green-800 dark:text-white'
                            : 'border-gray-300 dark:border-green-600 hover:border-green-400'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, complaintType: type.id }))}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xl mb-1">{type.icon}</span>
                          <span className="text-xs">{type.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      value={formData.location.address}
                      onChange={handleLocationChange}
                      placeholder="Enter address or use current location"
                      className="w-full p-3 pr-10 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                      required
                    />
                    <MapPin className="absolute right-3 top-3.5 text-gray-400" size={18} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="flex-1 flex items-center justify-center text-sm text-green-600 dark:text-emerald-300 disabled:text-gray-400 bg-green-100 dark:bg-green-700 px-3 py-2 rounded-lg"
                    >
                      {isGettingLocation ? (
                        <>
                          <Clock size={16} className="mr-1 animate-spin" />
                          Getting location...
                        </>
                      ) : (
                        <>
                          <Navigation size={16} className="mr-1" />
                          Use current location
                        </>
                      )}
                    </button>
                  </div>
                  {formData.location.lat && (
                    <p className="text-xs text-green-600 dark:text-emerald-300 mt-2">
                      ✓ Location captured: {formData.location.lat.toFixed(6)}, {formData.location.lng.toFixed(6)}
                    </p>
                  )}
                  {!formData.location.lat && (
                    <p className="text-xs text-gray-500 dark:text-green-300 mt-2">
                      Click "Use current location" to automatically capture coordinates
                    </p>
                  )}
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Evidence *</label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                      formData.photo
                        ? 'border-green-500 bg-green-50 dark:bg-green-700'
                        : 'border-gray-300 dark:border-green-600 hover:border-green-400'
                    }`}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/jpeg,image/png"
                      className="hidden"
                      required
                    />
                    
                    {formData.photo ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={formData.photo}
                          alt="Issue preview"
                          className="h-32 object-cover rounded-lg mb-2"
                        />
                        <span className="text-sm text-green-600 dark:text-emerald-300">
                          Photo uploaded ✓
                        </span>
                      </div>
                    ) : (
                      <div className="py-8">
                        <Camera className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-sm">Click to upload photo evidence</p>
                        <p className="text-xs text-gray-500 dark:text-green-300 mt-1">
                          JPG or PNG, max 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Please describe the issue in detail..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                    required
                  />
                </div>

                {/* Anonymous Reporting */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.anonymous}
                    onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900 dark:text-white">
                    Report anonymously
                  </label>
                  <Shield className="ml-2 text-gray-500" size={16} />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.complaintType || !formData.location.address || !formData.photo || !formData.description || !formData.location.lat}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  <AlertTriangle size={20} className="mr-2" />
                  Report Issue
                </button>

                {/* Rewards Information */}
                <div className="bg-green-100 dark:bg-green-700 p-3 rounded-lg flex items-start">
                  <Award className="text-green-600 dark:text-emerald-300 mt-0.5 mr-3" size={20} />
                  <div>
                    <p className="text-sm font-medium">Earn rewards for verified reports!</p>
                    <p className="text-xs mt-1">
                      Get 50 points for each report, bonus points for hazardous waste alerts, 
                      and unlock achievement badges as you contribute more.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Reported Issues Section */}
          <div className="lg:col-span-2">
            {/* Filters and Toggle */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg mb-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center">
                  <h2 className="text-2xl font-semibold mr-4">Your Reported Issues</h2>
                  <span className="bg-green-600 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {reportedIssues.length}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search locations..."
                      value={filters.searchQuery}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                    />
                  </div>
                  
                  {/* View Toggle */}
                  <div className="flex bg-green-200 dark:bg-green-700 rounded-lg p-1">
                    <button
                      onClick={() => setMapView(false)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        !mapView 
                          ? 'bg-white dark:bg-green-600 text-green-800 dark:text-white shadow' 
                          : 'text-green-600 dark:text-emerald-300'
                      }`}
                    >
                      List
                    </button>
                    <button
                      onClick={() => setMapView(true)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        mapView 
                          ? 'bg-white dark:bg-green-600 text-green-800 dark:text-white shadow' 
                          : 'text-green-600 dark:text-emerald-300'
                      }`}
                    >
                      Map
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Filter Options */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div>
                  <label className="text-sm font-medium mr-2">Issue Type:</label>
                  <select
                    value={filters.complaintType}
                    onChange={(e) => setFilters(prev => ({ ...prev, complaintType: e.target.value }))}
                    className="border border-gray-300 dark:border-green-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    {complaintTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mr-2">Status:</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="border border-gray-300 dark:border-green-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Statistics Panel */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
            >
              {/* Total Points Card */}
              <div className="bg-emerald-100 dark:bg-green-700 p-4 rounded-xl flex items-center">
                <div className="bg-green-600 p-3 rounded-xl mr-4">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-green-800 dark:text-emerald-200">Total Points</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-white">
                    {reportedIssues.reduce((total, issue) => total + issue.points, 0)}
                  </p>
                </div>
              </div>

              {/* Resolved Issues Card */}
              <div className="bg-green-100 dark:bg-green-700 p-4 rounded-xl flex items-center">
                <div className="bg-green-600 p-3 rounded-xl mr-4">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-green-800 dark:text-emerald-200">Resolved</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-white">
                    {reportedIssues.filter(issue => issue.status === 'resolved').length}
                  </p>
                </div>
              </div>

              {/* In Progress Card */}
              <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-xl flex items-center">
                <div className="bg-blue-600 p-3 rounded-xl mr-4">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">In Progress</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-white">
                    {reportedIssues.filter(issue => issue.status === 'in-progress').length}
                  </p>
                </div>
              </div>

              {/* Pending Review Card */}
              <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-xl flex items-center">
                <div className="bg-yellow-600 p-3 rounded-xl mr-4">
                  <AlertTriangle className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-white">
                    {reportedIssues.filter(issue => issue.status === 'pending').length}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Issues List View */}
            {!mapView ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="space-y-4"
              >
                {filteredIssues.length === 0 ? (
                  <div className="text-center py-12 bg-emerald-50 dark:bg-green-800 rounded-2xl">
                    <AlertTriangle className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-lg font-medium text-gray-600 dark:text-green-300">
                      No issues found matching your filters
                    </p>
                    <p className="text-sm text-gray-500 dark:text-green-400 mt-2">
                      Be the first to report a waste issue in your area!
                    </p>
                  </div>
                ) : (
                  filteredIssues.map(issue => {
                    const StatusIcon = getStatusInfo(issue.status).icon;
                    const statusColor = getStatusInfo(issue.status).color;
                    const statusBgColor = getStatusInfo(issue.status).bgColor;
                    const statusText = getStatusInfo(issue.status).text;
                    
                    const complaintType = getComplaintTypeInfo(issue.complaintType);
                    
                    return (
                      <motion.div
                        key={issue.id}
                        variants={fadeIn}
                        className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Issue Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={issue.photo}
                              alt={`${complaintType.name} issue`}
                              className="w-32 h-32 object-cover rounded-xl"
                            />
                          </div>
                          
                          {/* Issue Details */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBgColor} ${statusColor}`}>
                                <StatusIcon size={16} className="inline mr-1" />
                                {statusText}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${complaintType.color} text-white`}>
                                {complaintType.icon} {complaintType.name}
                              </span>
                              {issue.points > 0 && (
                                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                                  <Award size={16} className="inline mr-1" />
                                  +{issue.points} points
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-2">{issue.location.address}</h3>
                            
                            <p className="text-gray-600 dark:text-green-300 mb-4">{issue.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-green-400">
                              <span>Reported: {issue.reportedDate}</span>
                              {issue.resolvedDate && (
                                <span>Resolved: {issue.resolvedDate}</span>
                              )}
                              <span className="font-mono">Ticket: {issue.ticketNumber}</span>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 self-center">
                            <button
                              onClick={() => {
                                setSelectedIssue(issue);
                                setMapView(true);
                              }}
                              className="flex items-center text-green-600 dark:text-emerald-300 hover:text-green-800 dark:hover:text-emerald-100 text-sm"
                            >
                              <MapPin size={16} className="mr-1" />
                              View on map
                            </button>
                            {issue.status === 'resolved' && (
                              <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                                <Share size={16} className="mr-1" />
                                Share
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            ) : (
              /* Map View */
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="h-96 relative rounded-xl overflow-hidden bg-gray-200 dark:bg-green-700">
                  {/* Google Maps Embed */}
                  <iframe
                    src={getMapUrl()}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Waste Issues Map"
                  />
                  
                  {/* Map controls */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={zoomIn}
                      className="bg-white dark:bg-green-600 p-2 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-green-500"
                    >
                      <Plus size={20} />
                    </button>
                    <button 
                      onClick={zoomOut}
                      className="bg-white dark:bg-green-600 p-2 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-green-500"
                    >
                      <Minus size={20} />
                    </button>
                  </div>

                  {/* Location Indicator */}
                  <div className="absolute bottom-4 left-4 bg-white dark:bg-green-600 p-3 rounded-lg shadow-md max-w-xs">
                    <p className="text-sm font-medium">
                      {selectedIssue ? 'Selected Issue Location' : 'Current Location View'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-green-300 mt-1">
                      Zoom: {mapZoom}x
                    </p>
                  </div>
                </div>
                
                {selectedIssue ? (
                  <div className="mt-4 p-4 bg-white dark:bg-green-700 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold mb-2">{selectedIssue.location.address}</h4>
                        <p className="text-sm text-gray-600 dark:text-green-300 capitalize">
                          {getComplaintTypeInfo(selectedIssue.complaintType).name} • {selectedIssue.status}
                        </p>
                        {selectedIssue.description && (
                          <p className="text-sm mt-2">{selectedIssue.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedIssue(null)}
                        className="text-gray-500 hover:text-gray-700 dark:text-green-300 dark:hover:text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-4 bg-white dark:bg-green-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-green-300">
                      💡 Click "View on map" on any issue to see its specific location
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportWaste;