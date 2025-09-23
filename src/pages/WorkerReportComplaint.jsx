import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Camera, Mic, Globe, Award, Clock, AlertTriangle,
  CheckCircle, XCircle, Upload, Send, Map, History,
  Volume2, ChevronDown, ChevronRight, Star, Zap,
  Truck, Trash2, User, Shield, Navigation
} from 'lucide-react';

const WorkerReportComplaint = () => {
  // State management
  const [workerInfo, setWorkerInfo] = useState({
    name: 'Rajesh Kumar',
    role: 'Dry Waste',
    zone: 'Zone 4B'
  });
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState({ 
    lat: null, 
    lng: null, 
    address: '',
    accuracy: null
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [evidence, setEvidence] = useState(null);
  const [language, setLanguage] = useState('en');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [complaintId, setComplaintId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [useVoice, setUseVoice] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [customComplaint, setCustomComplaint] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Sample complaint history data
  const [complaintHistory, setComplaintHistory] = useState([
    { id: 'COMP-1025', category: 'Overflowing Bins', date: '2023-10-15', status: 'Resolved', points: 15 },
    { id: 'COMP-1024', category: 'Mixed Waste Dumping', date: '2023-10-14', status: 'In Review', points: 10 },
    { id: 'COMP-1021', category: 'Non-Cooperative Household', date: '2023-10-12', status: 'Pending', points: 5 },
  ]);

  // Complaint categories with multilingual support
  const complaintCategories = [
    { id: 1, icon: '🗑️', name: { en: 'Mixed Waste Dumping', hi: 'मिश्रित कचरा डंपिंग', ta: 'கலப்பு குப்பை கொட்டுதல்' }, color: 'bg-amber-100' },
    { id: 2, icon: '🚮', name: { en: 'Overflowing Bins', hi: 'अतिप्रवाह डिब्बे', ta: 'ஓவர்ஃப்ளோ பின்கள்' }, color: 'bg-red-100' },
    { id: 3, icon: '📦', name: { en: 'Lack of Bins Available', hi: 'डिब्बे की कमी', ta: 'பீங்கள் இல்லாதது' }, color: 'bg-blue-100' },
    { id: 4, icon: '🚛', name: { en: 'Vehicle Overloading', hi: 'वाहन अधिभार', ta: 'வாகன ஓவர்லோடிங்' }, color: 'bg-purple-100' },
    { id: 5, icon: '🏠', name: { en: 'Non-Cooperative Household', hi: 'असहयोगी घर', ta: 'கூட்டுறவு அல்லாத குடும்பம்' }, color: 'bg-orange-100' },
    { id: 6, icon: '🌳', name: { en: 'Illegal Dumping', hi: 'अवैध डंपिंग', ta: 'சட்டவிரோத கொட்டுதல்' }, color: 'bg-green-100' },
    { id: 7, icon: '🛢️', name: { en: 'Hazardous Waste', hi: 'खतरनाक कचरा', ta: 'அபாயகரமான கழிவு' }, color: 'bg-yellow-100' },
    { id: 8, icon: '🐀', name: { en: 'Pests/Animals', hi: 'कीट/जानवर', ta: 'உள்ளீடுகள்/விலங்குகள்' }, color: 'bg-pink-100' },
    { id: 9, icon: '⚡', name: { en: 'Damaged Infrastructure', hi: 'क्षतिग्रस्त बुनियादी ढांचा', ta: 'சேதமான உள்கட்டமைப்பு' }, color: 'bg-gray-100' },
    { id: 10, icon: '🚧', name: { en: 'Blocked Access', hi: 'अवरुद्ध पहुंच', ta: 'தடுக்கப்பட்ட அணுகல்' }, color: 'bg-indigo-100' },
    { id: 11, icon: '🧑‍🤝‍🧑', name: { en: 'Worker Safety Issues', hi: 'कर्मचारी सुरक्षा मुद्दे', ta: 'தொழிலாளர் பாதுகாப்பு பிரச்சினைகள்' }, color: 'bg-red-100' },
    { id: 12, icon: '➕', name: { en: 'Other', hi: 'अन्य', ta: 'மற்றவை' }, color: 'bg-teal-100' },
  ];

  // Multilingual content
  const content = {
    en: {
      tagline: "Your report helps make our city cleaner!",
      selectCategory: "Select Complaint Type",
      location: "Location",
      description: "Short Description",
      priority: "Priority Level",
      low: "Low",
      medium: "Medium",
      urgent: "Urgent",
      evidence: "Upload Photo/Video Evidence",
      submit: "Submit Report",
      submitted: "Complaint Submitted Successfully",
      track: "Track your complaint with ID:",
      pointsEarned: "Points earned",
      history: "Complaint History",
      voiceInput: "Voice Input",
      customComplaint: "Describe your complaint",
      getLocation: "Get Current Location",
      locationFetching: "Fetching location...",
      locationError: "Location access denied",
      locationSuccess: "Location captured successfully",
      refreshLocation: "Refresh Location"
    },
    hi: {
      tagline: "आपकी रिपोर्ट हमारे शहर को साफ बनाने में मदद करती है!",
      selectCategory: "शिकायत का प्रकार चुनें",
      location: "स्थान",
      description: "संक्षिप्त विवरण",
      priority: "प्राथमिकता स्तर",
      low: "कम",
      medium: "मध्यम",
      urgent: "जरूरी",
      evidence: "फोटो/वीडियो सबूत अपलोड करें",
      submit: "रिपोर्ट जमा करें",
      submitted: "शिकायत सफलतापूर्वक दर्ज की गई",
      track: "अपनी शिकायत को आईडी से ट्रैक करें:",
      pointsEarned: "अर्जित अंक",
      history: "शिकायत इतिहास",
      voiceInput: "वॉयस इनपुट",
      customComplaint: "अपनी शिकायत का वर्णन करें",
      getLocation: "वर्तमान स्थान प्राप्त करें",
      locationFetching: "स्थान प्राप्त किया जा रहा है...",
      locationError: "स्थान एक्सेस अस्वीकृत",
      locationSuccess: "स्थान सफलतापूर्वक कैप्चर किया गया",
      refreshLocation: "स्थान ताज़ा करें"
    },
    ta: {
      tagline: "உங்கள் அறிக்கை நகரத்தை சுத்தமாக்க உதவுகிறது!",
      selectCategory: "புகார் வகையைத் தேர்ந்தெடுக்கவும்",
      location: "இடம்",
      description: "குறுகிய விளக்கம்",
      priority: "முன்னுரிமை நிலை",
      low: "குறைந்த",
      medium: "நடுத்தர",
      urgent: "அவசர",
      evidence: "புகைப்படம்/வீடியோ சான்றுகளைப் பதிவேற்றவும்",
      submit: "ரிப்போர்ட் சமர்ப்பிக்கவும்",
      submitted: "புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
      track: "புகார் ஐடியுடன் கண்காணிக்கவும்:",
      pointsEarned: "புள்ளிகள் பெற்றன",
      history: "புகார் வரலாறு",
      voiceInput: "குரல் உள்ளீடு",
      customComplaint: "உங்கள் புகாரை விவரிக்கவும்",
      getLocation: "தற்போதைய இடத்தைப் பெறுக",
      locationFetching: "இடம் பெறப்படுகிறது...",
      locationError: "இடம் அணுகல் மறுக்கப்பட்டது",
      locationSuccess: "இடம் வெற்றிகரமாக பிடிக்கப்பட்டது",
      refreshLocation: "இடத்தைப் புதுப்பிக்கவும்"
    }
  };

  // Enhanced location fetching function
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        try {
          // Try Google Maps Geocoding API first
          let address = 'Address not found';
          
          try {
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
          
          setLocation({
            lat: latitude,
            lng: longitude,
            address: address,
            accuracy: accuracy
          });

          setIsGettingLocation(false);
        } catch (error) {
          console.error('Error getting address:', error);
          // Fallback to just coordinates if address fetch fails
          const fallbackAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setLocation({
            lat: latitude,
            lng: longitude,
            address: fallbackAddress,
            accuracy: accuracy
          });
          
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('An unknown error occurred while getting your location.');
        }
        
        setLocation({ lat: null, lng: null, address: content[language].locationError, accuracy: null });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  };

  // Simplified location fetching as fallback
  const getCurrentLocationSimple = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        // Create a simple address using coordinates
        const simpleAddress = `Near ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        
        setLocation({
          lat: latitude,
          lng: longitude,
          address: simpleAddress,
          accuracy: accuracy
        });

        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred.');
        }
        
        setLocation({ lat: null, lng: null, address: content[language].locationError, accuracy: null });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Fetch current location on component mount
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get initial location
    getCurrentLocationSimple();

    return () => clearInterval(timer);
  }, []);

  // Update location content when language changes
  useEffect(() => {
    if (locationError) {
      setLocation(prev => ({ ...prev, address: content[language].locationError }));
    }
  }, [language, locationError]);

  // Handle evidence upload
  const handleEvidenceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvidence(URL.createObjectURL(file));
      
      // Simulate AI category detection for images
      if (file.type.startsWith('image/')) {
        setTimeout(() => {
          // Randomly suggest a category based on image "analysis"
          const detectedCategory = complaintCategories[Math.floor(Math.random() * 5)];
          setSelectedCategory(detectedCategory);
        }, 1000);
      }
    }
  };

  // Handle voice input
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDescription(transcript);

      // Try mapping category automatically if keywords match
      if (transcript.toLowerCase().includes("overflowing")) {
        setSelectedCategory(complaintCategories[1]);
        setPriority("high");
      }

      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  // Submit complaint
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate location
    if (!location.lat || !location.lng) {
      alert('Please capture your location before submitting the report');
      return;
    }
    
    // Generate a random complaint ID
    const newComplaintId = `COMP-${Math.floor(1000 + Math.random() * 9000)}`;
    setComplaintId(newComplaintId);
    
    // Add to history
    const newComplaint = {
      id: newComplaintId,
      category: selectedCategory.name[language],
      date: currentTime.toISOString().split('T')[0],
      status: 'Pending',
      points: 10,
      location: {
        lat: location.lat,
        lng: location.lng,
        address: location.address
      }
    };
    
    setComplaintHistory([newComplaint, ...complaintHistory]);
    setShowConfirmation(true);
  };

  // Calculate total points
  const totalPoints = complaintHistory.reduce((sum, complaint) => sum + complaint.points, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-800">
      {/* Header Section */}
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-xl font-bold">{workerInfo.name}</h1>
              <p className="text-sm flex items-center">
                {workerInfo.role} • {workerInfo.zone}
                <Shield className="ml-2 h-4 w-4" />
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">{currentTime.toLocaleDateString()}</p>
              <p className="text-sm">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm italic flex items-center">
              <Award className="mr-1 h-4 w-4" /> 
              {content[language].tagline}
            </p>
            <div className="flex items-center space-x-2">
              <div className="bg-green-700 px-2 py-1 rounded-full text-xs flex items-center border border-green-800">
                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                {totalPoints} pts
              </div>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="bg-green-700 px-2 py-1 rounded-full text-xs flex items-center border border-green-800"
              >
                <History className="h-3 w-3 mr-1" />
                {showHistory ? 'Hide' : 'Show'} History
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Language Selector */}
      <div className="bg-white p-3 shadow-sm flex justify-center border-b border-gray-200">
        <div className="flex space-x-2">
          {['en', 'hi', 'ta'].map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-sm flex items-center border ${language === lang ? 'bg-green-100 text-green-700 font-medium border-green-300' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
            >
              <Globe className="h-3 w-3 mr-1" />
              {lang.toUpperCase()}
            </button>
          ))}
          <button
            onClick={() => {/* Implement text-to-speech */}}
            className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 flex items-center border border-blue-300"
          >
            <Volume2 className="h-3 w-3 mr-1" />
            Read
          </button>
        </div>
      </div>

      {/* Complaint History Panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white shadow-md overflow-hidden border-b border-gray-200"
          >
            <div className="container mx-auto p-4">
              <h2 className="font-bold text-lg mb-3 flex items-center text-gray-800">
                <History className="h-5 w-5 mr-2" />
                {content[language].history}
              </h2>
              <div className="space-y-3">
                {complaintHistory.map(complaint => (
                  <div key={complaint.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm text-gray-800">{complaint.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800 border-green-300' :
                        complaint.status === 'In Review' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        'bg-gray-100 text-gray-800 border-gray-300'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-gray-700">{complaint.category}</p>
                    {complaint.location && (
                      <p className="text-xs text-gray-600 mt-1 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {complaint.location.address}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{complaint.date}</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center border border-amber-200">
                        <Star className="h-3 w-3 mr-1" fill="currentColor" />
                        +{complaint.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Enhanced Location Information */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium flex items-center text-gray-800">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              {content[language].location}
            </h2>
            <button 
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="text-blue-600 text-sm flex items-center border border-blue-200 bg-blue-50 px-2 py-1 rounded-md disabled:opacity-50"
            >
              {isGettingLocation ? (
                <>
                  <Clock className="h-4 w-4 mr-1 animate-spin" />
                  {content[language].locationFetching}
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4 mr-1" />
                  {content[language].refreshLocation}
                </>
              )}
            </button>
          </div>
          
          <p className="text-sm text-gray-700">
            {location.address || content[language].locationFetching}
          </p>
          
          {location.lat && location.lng && (
            <div className="mt-2 flex items-center text-xs text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              {content[language].locationSuccess}
              <span className="ml-2 text-gray-500">
                ({location.lat.toFixed(6)}, {location.lng.toFixed(6)})
              </span>
            </div>
          )}
          
          {locationError && (
            <div className="mt-2 flex items-center text-xs text-red-600">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {locationError}
            </div>
          )}
          
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            Updated {currentTime.toLocaleTimeString()}
            {location.accuracy && (
              <span className="ml-2">
                Accuracy: ±{Math.round(location.accuracy)} meters
              </span>
            )}
          </div>
        </div>

        {/* Rest of the form remains the same */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
          <h2 className="font-bold text-lg mb-4 flex items-center text-gray-800">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            {content[language].selectCategory}
          </h2>

          {/* Category Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {complaintCategories.map(category => (
              <motion.button
                key={category.id}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`p-3 rounded-lg flex flex-col items-center justify-center border ${selectedCategory?.id === category.id ? 'ring-2 ring-green-500 border-green-300 ' + category.color : 'bg-gray-50 border-gray-200'}`}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-xs font-medium mt-1 text-center text-gray-800">
                  {category.name[language]}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Custom Complaint Input */}
          {selectedCategory?.id === 12 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {content[language].customComplaint}
              </label>
              <input
                type="text"
                value={customComplaint}
                onChange={(e) => setCustomComplaint(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Describe your complaint..."
              />
            </motion.div>
          )}

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {content[language].description}
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10"
                placeholder="Provide details about the issue..."
              />
              <button
                type="button"
                onClick={startVoiceInput}
                className={`absolute right-2 bottom-2 p-1 rounded-full border ${isRecording ? 'bg-red-100 text-red-600 border-red-300 animate-pulse' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
            {isRecording && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-amber-600 mt-1 flex items-center"
              >
                <Zap className="h-3 w-3 mr-1" fill="currentColor" />
                Listening... Please describe your complaint
              </motion.p>
            )}
          </div>

          {/* Priority Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {content[language].priority}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'urgent'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPriority(level)}
                  className={`p-2 rounded-lg text-sm font-medium flex items-center justify-center border ${
                    priority === level ? 
                    (level === 'low' ? 'bg-green-100 text-green-700 ring-2 ring-green-500 border-green-300' :
                     level === 'medium' ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500 border-yellow-300' :
                     'bg-red-100 text-red-700 ring-2 ring-red-500 border-red-300') : 
                    'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  {level === 'urgent' && <Zap className="h-4 w-4 mr-1" />}
                  {content[language][level]}
                </button>
              ))}
            </div>
          </div>

          {/* Evidence Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {content[language].evidence}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${evidence ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400 bg-white'}`}>
                {evidence ? (
                  <div className="relative w-full h-full">
                    <img src={evidence} alt="Evidence" className="w-full h-full object-cover rounded-lg" />
                    <button 
                      type="button"
                      onClick={() => setEvidence(null)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 border border-red-600"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  </div>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*,video/*" 
                  onChange={handleEvidenceUpload} 
                  capture="environment"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!selectedCategory || !location.lat}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center border ${!selectedCategory || !location.lat ? 'bg-gray-400 border-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 border-green-700'}`}
          >
            <Send className="h-5 w-5 mr-2" />
            {content[language].submit}
          </motion.button>

          {!location.lat && (
            <p className="text-xs text-red-600 mt-2 text-center">
              Please capture your location before submitting the report
            </p>
          )}
        </form>

        {/* Motivational Section */}
        <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-lg shadow p-4 text-white border border-green-500">
          <h3 className="font-bold text-lg mb-2">Great Work!</h3>
          <p className="text-sm">
            You've reported {complaintHistory.length} issues this month. 
            Your efforts help keep our city clean and safe!
          </p>
          <div className="flex items-center mt-3">
            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-xs font-medium border border-white border-opacity-30">
              🏆 Top Reporter in your zone
            </div>
            <div className="ml-auto bg-white bg-opacity-20 rounded-full px-3 py-1 text-xs font-medium flex items-center border border-white border-opacity-30">
              <Star className="h-3 w-3 mr-1" fill="currentColor" />
              {totalPoints} Points
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full border border-gray-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-center mb-2 text-gray-800">{content[language].submitted}</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                {content[language].track} <span className="font-mono font-bold text-gray-800">{complaintId}</span>
              </p>
              <div className="bg-green-50 p-3 rounded-lg flex items-center justify-center mb-4 border border-green-200">
                <Award className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-700">
                  +10 {content[language].pointsEarned}
                </span>
              </div>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-2 bg-green-600 text-white rounded-lg font-medium border border-green-700"
              >
                Continue Reporting
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Command Interface */}
      <AnimatePresence>
        {useVoice && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg border-t border-blue-500"
          >
            <div className="container mx-auto">
              <h3 className="font-bold mb-2 flex items-center">
                <Mic className="h-5 w-5 mr-2" />
                Voice Command
              </h3>
              <p className="text-sm mb-3">Say something like: "Overflowing bin at Market Road"</p>
              <div className="flex justify-between">
                <button 
                  className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium border border-blue-200"
                  onClick={() => setUseVoice(false)}
                >
                  Cancel
                </button>
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center border border-red-600"
                  onClick={startVoiceInput}
                >
                  <Mic className="h-4 w-4 mr-1" />
                  {isRecording ? 'Listening...' : 'Start Speaking'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="container mx-auto flex justify-between">
          <button 
            className="flex flex-col items-center text-green-600"
            onClick={() => window.scrollTo(0, 0)}
          >
            <AlertTriangle className="h-6 w-6" />
            <span className="text-xs mt-1">Report</span>
          </button>
          <button 
            className="flex flex-col items-center text-gray-500"
            onClick={() => setShowHistory(true)}
          >
            <History className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </button>
          <button 
            className="flex flex-col items-center text-gray-500"
            onClick={() => setUseVoice(true)}
          >
            <Mic className="h-6 w-6" />
            <span className="text-xs mt-1">Voice</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Map className="h-6 w-6" />
            <span className="text-xs mt-1">Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerReportComplaint;