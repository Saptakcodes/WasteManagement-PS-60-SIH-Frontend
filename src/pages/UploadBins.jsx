// src/components/UploadBins.jsx
import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  Camera, 
  Upload, 
  Trash2, 
  Filter, 
  Search, 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Award,
  BarChart3,
  Plus,
  Minus,
  Navigation
} from 'lucide-react';
import { motion } from 'framer-motion';

const UploadBins = () => {
  // State for form data
  const [formData, setFormData] = useState({
    binType: '',
    location: {
      address: '',
      lat: null,
      lng: null
    },
    photo: null,
    notes: '',
    status: 'pending'
  });

  // State for uploaded bins list
  const [uploadedBins, setUploadedBins] = useState([
    {
      id: 1,
      binType: 'dry',
      location: {
        address: '123 Main Street, Bengaluru',
        lat: 12.9716,
        lng: 77.5946
      },
      photo: 'https://images.unsplash.com/photo-1577720643272-265f0936742f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      notes: 'Blue bin near the park entrance',
      status: 'approved',
      points: 50,
      uploadedDate: '2023-10-15',
      verifiedDate: '2023-10-16'
    },
    {
      id: 2,
      binType: 'wet',
      location: {
        address: '456 Oak Avenue, Mumbai',
        lat: 19.0760,
        lng: 72.8777
      },
      photo: 'https://images.unsplash.com/photo-1587334207810-491003798e7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      notes: 'Green bin next to community center',
      status: 'pending',
      points: 0,
      uploadedDate: '2023-10-20'
    },
    {
      id: 3,
      binType: 'hazardous',
      location: {
        address: '789 Pine Road, Delhi',
        lat: 28.7041,
        lng: 77.1025
      },
      photo: 'https://images.unsplash.com/photo-1581515286345-dc35b793c28d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      notes: 'Red bin for batteries and electronics',
      status: 'rejected',
      points: 0,
      uploadedDate: '2023-10-18',
      verifiedDate: '2023-10-19',
      rejectionReason: 'Incorrect location details'
    }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    binType: 'all',
    status: 'all',
    searchQuery: ''
  });

  // State for map view
  const [mapView, setMapView] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);

  // Ref for file input
  const fileInputRef = useRef(null);

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
    // In a real app, this would send data to the backend
    const newBin = {
      id: uploadedBins.length + 1,
      ...formData,
      points: 0,
      uploadedDate: new Date().toISOString().split('T')[0]
    };
    
    setUploadedBins(prev => [newBin, ...prev]);
    
    // Reset form
    setFormData({
      binType: '',
      location: {
        address: '',
        lat: null,
        lng: null
      },
      photo: null,
      notes: '',
      status: 'pending'
    });
    
    alert('Bin uploaded successfully! It will be reviewed by our team.');
  };

  // Filter bins based on selected filters
  const filteredBins = uploadedBins.filter(bin => {
    const matchesType = filters.binType === 'all' || bin.binType === filters.binType;
    const matchesStatus = filters.status === 'all' || bin.status === filters.status;
    const matchesSearch = bin.location.address.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'approved':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'rejected':
        return { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' };
      default:
        return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Upload Waste Bins</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Help us map waste bins in your area and contribute to a cleaner environment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-1"
          >
            <div className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg sticky top-6">
              <h2 className="text-2xl font-semibold mb-6">Add New Bin</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bin Type Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Bin Type *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['dry', 'wet', 'hazardous'].map(type => (
                      <div
                        key={type}
                        className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all ${
                          formData.binType === type
                            ? 'border-green-600 bg-green-100 dark:bg-green-700 text-green-800 dark:text-white'
                            : 'border-gray-300 dark:border-green-600 hover:border-green-400'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, binType: type }))}
                      >
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full mb-1 ${
                            type === 'dry' ? 'bg-blue-500' :
                            type === 'wet' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm capitalize">{type}</span>
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
                      placeholder="Enter address or location"
                      className="w-full p-3 pr-10 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                      required
                    />
                    <MapPin className="absolute right-3 top-3.5 text-gray-400" size={18} />
                  </div>
                  <button
                    type="button"
                    className="mt-2 flex items-center text-sm text-green-600 dark:text-emerald-300"
                  >
                    <Navigation size={16} className="mr-1" />
                    Use current location
                  </button>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Bin Photo *</label>
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
                          alt="Bin preview"
                          className="h-32 object-cover rounded-lg mb-2"
                        />
                        <span className="text-sm text-green-600 dark:text-emerald-300">
                          Photo uploaded ✓
                        </span>
                      </div>
                    ) : (
                      <div className="py-8">
                        <Camera className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-sm">Click to upload a photo</p>
                        <p className="text-xs text-gray-500 dark:text-green-300 mt-1">
                          JPG or PNG, max 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any details about the bin condition, accessibility, etc."
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.binType || !formData.location.address || !formData.photo}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  <Upload size={20} className="mr-2" />
                  Upload Bin
                </button>

                {/* Points Information */}
                <div className="bg-green-100 dark:bg-green-700 p-3 rounded-lg flex items-start">
                  <Award className="text-green-600 dark:text-emerald-300 mt-0.5 mr-3" size={20} />
                  <div>
                    <p className="text-sm font-medium">Earn 50 points for each verified bin upload!</p>
                    <p className="text-xs mt-1">Points will be credited after approval by our team.</p>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Bins List & Map View Section */}
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
                  <h2 className="text-2xl font-semibold mr-4">Your Uploaded Bins</h2>
                  <span className="bg-green-600 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {uploadedBins.length}
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
                  <label className="text-sm font-medium mr-2">Bin Type:</label>
                  <select
                    value={filters.binType}
                    onChange={(e) => setFilters(prev => ({ ...prev, binType: e.target.value }))}
                    className="border border-gray-300 dark:border-green-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-700 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="dry">Dry Waste</option>
                    <option value="wet">Wet Waste</option>
                    <option value="hazardous">Hazardous</option>
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
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </motion.div>
             {/* Statistics Panel */}


            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            >
              {/* Total Points Card */}
              <div className="bg-emerald-100 dark:bg-green-700 p-4 rounded-xl flex items-center">
                <div className="bg-green-600 p-3 rounded-xl mr-4">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-green-800 dark:text-emerald-200">Total Points</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-white">
                    {uploadedBins.reduce((total, bin) => total + bin.points, 0)}
                  </p>
                </div>
              </div>

              {/* Approved Bins Card */}
              <div className="bg-green-100 dark:bg-green-700 p-4 rounded-xl flex items-center">
                <div className="bg-green-600 p-3 rounded-xl mr-4">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-green-800 dark:text-emerald-200">Approved Bins</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-white">
                    {uploadedBins.filter(bin => bin.status === 'approved').length}
                  </p>
                </div>
              </div>

              {/* Pending Review Card */}
              <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-xl flex items-center">
                <div className="bg-yellow-600 p-3 rounded-xl mr-4">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-white">
                    {uploadedBins.filter(bin => bin.status === 'pending').length}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bins List View */}
            {!mapView ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="space-y-4"
              >
                {filteredBins.length === 0 ? (
                  <div className="text-center py-12 bg-emerald-50 dark:bg-green-800 rounded-2xl">
                    <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-lg font-medium text-gray-600 dark:text-green-300">
                      No bins found matching your filters
                    </p>
                  </div>
                ) : (
                  filteredBins.map(bin => {
                    const StatusIcon = getStatusInfo(bin.status).icon;
                    const statusColor = getStatusInfo(bin.status).color;
                    const statusBgColor = getStatusInfo(bin.status).bgColor;
                    
                    return (
                      <motion.div
                        key={bin.id}
                        variants={fadeIn}
                        className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Bin Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={bin.photo}
                              alt={`${bin.binType} waste bin`}
                              className="w-32 h-32 object-cover rounded-xl"
                            />
                          </div>
                          
                          {/* Bin Details */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusBgColor} ${statusColor}`}>
                                <StatusIcon size={16} className="inline mr-1" />
                                {bin.status}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                                bin.binType === 'dry' ? 'bg-blue-100 text-blue-800' :
                                bin.binType === 'wet' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {bin.binType} waste
                              </span>
                              {bin.points > 0 && (
                                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                                  <Award size={16} className="inline mr-1" />
                                  +{bin.points} points
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-2">{bin.location.address}</h3>
                            
                            {bin.notes && (
                              <p className="text-gray-600 dark:text-green-300 mb-4">{bin.notes}</p>
                            )}
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-green-400">
                              <span>Uploaded: {bin.uploadedDate}</span>
                              {bin.verifiedDate && (
                                <span>Verified: {bin.verifiedDate}</span>
                              )}
                            </div>
                            
                            {bin.rejectionReason && (
                              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                                <p className="text-sm text-red-600 dark:text-red-300">
                                  <strong>Reason for rejection:</strong> {bin.rejectionReason}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setSelectedBin(bin)}
                              className="flex items-center text-green-600 dark:text-emerald-300 hover:text-green-800 dark:hover:text-emerald-100 text-sm"
                            >
                              <MapPin size={16} className="mr-1" />
                              View on map
                            </button>
                            <button className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm">
                              <Trash2 size={16} className="mr-1" />
                              Remove
                            </button>
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
                  {/* Placeholder for actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto text-green-600 mb-4" size={48} />
                      <p className="text-lg font-medium text-gray-600 dark:text-green-300">
                        Map integration would go here
                      </p>
                      <p className="text-sm text-gray-500 dark:text-green-400 mt-2">
                        Showing {filteredBins.length} bin locations
                      </p>
                    </div>
                  </div>
                  
                  {/* Map controls */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white dark:bg-green-600 p-2 rounded-lg shadow-md">
                      <Plus size={20} />
                    </button>
                    <button className="bg-white dark:bg-green-600 p-2 rounded-lg shadow-md">
                      <Minus size={20} />
                    </button>
                  </div>
                </div>
                
                {selectedBin && (
                  <div className="mt-4 p-4 bg-white dark:bg-green-700 rounded-lg">
                    <h4 className="font-semibold mb-2">{selectedBin.location.address}</h4>
                    <p className="text-sm text-gray-600 dark:text-green-300 capitalize">
                      {selectedBin.binType} waste bin • {selectedBin.status}
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

export default UploadBins;