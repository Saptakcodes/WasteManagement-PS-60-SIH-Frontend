// src/components/Training.jsx
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Award, 
  Play,
  FileText,
  Download,
  Clock,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  X,
  Star,
  Trophy,
  Users,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence, color } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Training = () => {
  // State for module progress
  const [currentModule, setCurrentModule] = useState(0);
  const [moduleProgress, setModuleProgress] = useState(
    Array(8).fill(false).map(() => ({ completed: false, score: 0 }))
  );
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [language, setLanguage] = useState('en');
  const [userName, setUserName] = useState('Green Champion');
  
  // Mock user data - in a real app, this would come from authentication
  useEffect(() => {
    // Simulate fetching user data
    setUserName('Rajesh Kumar');
  }, []);

  // Training modules data
  const trainingModules = [
    {
      id: 1,
      title: {
        en: "Introduction to Waste Management",
        hi: "अपशिष्ट प्रबंधन का परिचय",
        ta: "கழிவு மேலாண்மை அறிமுகம்"
      },
      duration: "15 min",
      content: {
        en: {
          description: "Learn about India's waste management challenges and the importance of proper waste handling for environmental sustainability.",
          resources: [
            { type: 'video', title: 'Waste Crisis in India', duration: '5:20' },
            { type: 'text', title: 'Key Statistics and Facts' },
            { type: 'infographic', title: 'Waste Generation Trends' }
          ]
        },
        hi: {
          description: "भारत की अपशिष्ट प्रबंधन चुनौतियों और पर्यावरणीय स्थिरता के लिए उचित अपशिष्ट प्रबंधन के महत्व के बारे में जानें।",
          resources: [
            { type: 'video', title: 'भारत में अपशिष्ट संकट', duration: '5:20' },
            { type: 'text', title: 'मुख्य आँकड़े और तथ्य' },
            { type: 'infographic', title: 'अपशिष्ट उत्पादन रुझान' }
          ]
        },
        ta: {
          description: "இந்தியாவின் கழிவு மேலாண்மை சவால்கள் மற்றும் சுற்றாடல் நிலைத்தன்மைக்கு சரியான கழிவு கையாளுதலின் முக்கியத்துவம் பற்றி அறிக.",
          resources: [
            { type: 'video', title: 'இந்தியாவில் கழிவு நெருக்கடி', duration: '5:20' },
            { type: 'text', title: 'முக்கிய புள்ளிவிவரங்கள் மற்றும் உண்மைகள்' },
            { type: 'infographic', title: 'கழிவு உற்பத்தி போக்குகள்' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "What percentage of waste in India is scientifically treated?",
            hi: "भारत में कितने प्रतिशत कचरे का वैज्ञानिक तरीके से उपचार किया जाता है?",
            ta: "இந்தியாவில் எத்தனை சதவீத கழிவுகள் விஞ்ஞான ரீதியாக சிகிச்சை அளிக்கப்படுகின்றன?"
          },
          options: [
            { id: 1, text: { en: "25%", hi: "25%", ta: "25%" } },
            { id: 2, text: { en: "54%", hi: "54%", ta: "54%" } },
            { id: 3, text: { en: "70%", hi: "70%", ta: "70%" } },
            { id: 4, text: { en: "85%", hi: "85%", ta: "85%" } }
          ],
          correctAnswer: 2
        },
        {
          question: {
            en: "Which mission focuses on cleanliness in India?",
            hi: "भारत में स्वच्छता पर कौन सा मिशन केंद्रित है?",
            ta: "இந்தியாவில் சுத்தத்தில் எந்த திட்டம் கவனம் செலுத்துகிறது?"
          },
          options: [
            { id: 1, text: { en: "Digital India", hi: "डिजिटल इंडिया", ta: "டிஜிட்டல் இந்தியா" } },
            { id: 2, text: { en: "Make in India", hi: "मेक इन इंडिया", ta: "மேக் இன் இந்தியா" } },
            { id: 3, text: { en: "Swachh Bharat Mission", hi: "स्वच्छ भारत मिशन", ta: "சுவச் பாரத் மிஷன்" } },
            { id: 4, text: { en: "Smart Cities Mission", hi: "स्मार्ट सिटीज मिशन", ta: "ஸ்மார்ட் சிட்டீஸ் மிஷன்" } }
          ],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 2,
      title: {
        en: "Waste Segregation & Three-Bin System",
        hi: "अपशिष्ट पृथक्करण और तीन-बिन प्रणाली",
        ta: "கழிவு பிரித்தல் மற்றும் மூன்று-பெட்டி அமைப்பு"
      },
      duration: "20 min",
      content: {
        en: {
          description: "Master the art of source segregation using the three-bin system for wet, dry, and hazardous waste.",
          resources: [
            { type: 'video', title: 'How to Segregate Properly', duration: '7:45' },
            { type: 'text', title: 'Three-Bin System Guide' },
            { type: 'infographic', title: 'Color Coding for Bins' },
            { type: 'interactive', title: 'Segregation Practice' }
          ]
        },
        hi: {
          description: "गीले, सूखे और खतरनाक कचरे के लिए तीन-बिन प्रणाली का उपयोग करके स्रोत पृथक्करण की कला में महारत हासिल करें।",
          resources: [
            { type: 'video', title: 'सही तरीके से कैसे अलग करें', duration: '7:45' },
            { type: 'text', title: 'तीन-बिन प्रणाली गाइड' },
            { type: 'infographic', title: 'बिन के लिए रंग कोडिंग' },
            { type: 'interactive', title: 'पृथक्करण अभ्यास' }
          ]
        },
        ta: {
          description: "ஈரமான, உலர் மற்றும் ஆபத்தான கழிவுகளுக்கான மூன்று-பெட்டி அமைப்பைப் பயன்படுத்தி மூலப் பிரித்தலின் கலைத்திறனில் தேர்ச்சி பெறவும்.",
          resources: [
            { type: 'video', title: 'சரியாக எவ்வாறு பிரிக்க வேண்டும்', duration: '7:45' },
            { type: 'text', title: 'மூன்று-பெட்டி அமைப்பு வழிகாட்டி' },
            { type: 'infographic', title: 'பெட்டிகளுக்கான வண்ண குறியீடு' },
            { type: 'interactive', title: 'பிரித்தல் பயிற்சி' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "Which color bin is typically used for dry waste?",
            hi: "आमतौर पर सूखे कचरे के लिए किस रंग की डस्टबिन का उपयोग किया जाता है?",
            ta: "உலர் கழிவுகளுக்கு பொதுவாக எந்த வண்ணத் தொட்டி பயன்படுத்தப்படுகிறது?"
          },
          options: [
            { id: 1, text: { en: "Blue", hi: "नीला", ta: "நீலம்" } },
            { id: 2, text: { en: "Green", hi: "हरा", ta: "பச்சை" } },
            { id: 3, text: { en: "Black", hi: "काला", ta: "கருப்பு" } },
            { id: 4, text: { en: "Red", hi: "लाल", ta: "சிவப்பு" } }
          ],
          correctAnswer: 1
        }
      ]
    },
    // Additional modules would be defined here (3-7)
    {
      id: 8,
      title: {
        en: "Final Assessment",
        hi: "अंतिम मूल्यांकन",
        ta: "இறுதி மதிப்பீடு"
      },
      duration: "30 min",
      content: {
        en: {
          description: "Master the art of source segregation using the three-bin system for wet, dry, and hazardous waste.",
          resources: [
            { type: 'video', title: 'How to Segregate Properly', duration: '7:45' },
            { type: 'text', title: 'Three-Bin System Guide' },
            { type: 'infographic', title: 'Color Coding for Bins' },
            { type: 'interactive', title: 'Segregation Practice' }
          ]
        },
        hi: {
          description: "गीले, सूखे और खतरनाक कचरे के लिए तीन-बिन प्रणाली का उपयोग करके स्रोत पृथक्करण की कला में महारत हासिल करें।",
          resources: [
            { type: 'video', title: 'सही तरीके से कैसे अलग करें', duration: '7:45' },
            { type: 'text', title: 'तीन-बिन प्रणाली गाइड' },
            { type: 'infographic', title: 'बिन के लिए रंग कोडिंग' },
            { type: 'interactive', title: 'पृथक्करण अभ्यास' }
          ]
        },
        ta: {
          description: "ஈரமான, உலர் மற்றும் ஆபத்தான கழிவுகளுக்கான மூன்று-பெட்டி அமைப்பைப் பயன்படுத்தி மூலப் பிரித்தலின் கலைத்திறனில் தேர்ச்சி பெறவும்.",
          resources: [
            { type: 'video', title: 'சரியாக எவ்வாறு பிரிக்க வேண்டும்', duration: '7:45' },
            { type: 'text', title: 'மூன்று-பெட்டி அமைப்பு வழிகாட்டி' },
            { type: 'infographic', title: 'பெட்டிகளுக்கான வண்ண குறியீடு' },
            { type: 'interactive', title: 'பிரித்தல் பயிற்சி' }
          ]
        },
        te: {
          description: "తడి, పొడి మరియు ప్రమాదకర వేస్ట్ కోసం త్రీ-బిన్ సిస్టమ్ ఉపయోగించి సోర్స్ సెగ్రిగేషన్ కళను నేర్చుకోండి.",
          resources: [
            { type: 'video', title: 'సరిగ్గా ఎలా వేరు చేయాలి', duration: '7:45' },
            { type: 'text', title: 'త్రీ-బిన్ సిస్టమ్ గైడ్' },
            { type: 'infographic', title: 'బిన్ల కోసం రంగు కోడింగ్' },
            { type: 'interactive', title: 'సెగ్రిగేషన్ ప్రాక్టీస్' }
          ]
        },
        bn: {
          description: "ভিজা, শুষ্ক এবং বিপজ্জনক বর্জ্যের জন্য তিন-বিন সিস্টেম ব্যবহার করে উৎস পৃথকীকরণের শিল্পে দক্ষতা অর্জন করুন।",
          resources: [
            { type: 'video', title: 'সঠিকভাবে কীভাবে আলাদা করবেন', duration: '7:45' },
            { type: 'text', title: 'তিন-বিন সিস্টেম গাইড' },
            { type: 'infographic', title: 'বিনের জন্য রঙের কোডিং' },
            { type: 'interactive', title: 'পৃথকীকরণ অনুশীলন' }
          ]
        },
        mr: {
          description: "ओले, कोरडे आणि धोकादायक कचऱ्यासाठी तीन-बिन प्रणालीचा वापर करून स्त्रोत वेगळे करण्याची कला मास्टर करा.",
          resources: [
            { type: 'video', title: 'योग्य प्रकारे कसे वेगळे करावे', duration: '7:45' },
            { type: 'text', title: 'तीन-बिन प्रणाली मार्गदर्शक' },
            { type: 'infographic', title: 'बिन्ससाठी रंग कोडिंग' },
            { type: 'interactive', title: 'वेगळे करण्याचा सराव' }
          ]
        }
      },
      quiz: [
        // Final assessment questions would go here
      ]
    }
  ];

  // Languages supported
const languages = [
  { code: 'en', name: 'English', color: 'blue' },
  { code: 'hi', name: 'हिन्दी', color: 'blue' },
  { code: 'ta', name: 'தமிழ்', color: 'blue' },
  { code: 'te', name: 'తెలుగు', color: 'blue' },
  { code: 'bn', name: 'বাংলা', color: 'blue' },
  { code: 'mr', name: 'मराठी', color: 'blue' }
];

  // Badges and achievements
  const badges = [
    { id: 1, name: 'First Lesson', icon: '📚', earned: true },
    { id: 2, name: 'Quiz Master', icon: '🧠', earned: false },
    { id: 3, name: 'Eco Warrior', icon: '🌱', earned: false },
    { id: 4, name: 'Community Leader', icon: '👥', earned: false },
    { id: 5, name: 'Perfect Score', icon: '⭐', earned: false }
  ];

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (moduleProgress.filter(module => module.completed).length / trainingModules.length) * 100
  );

  // Check if all modules are completed
  const allModulesCompleted = moduleProgress.every(module => module.completed);

  // Handle module completion
  const completeModule = (moduleIndex, score = 100) => {
    const newProgress = [...moduleProgress];
    newProgress[moduleIndex] = { completed: true, score };
    setModuleProgress(newProgress);
    
    // If this was the last module, show certificate
    if (moduleIndex === trainingModules.length - 1) {
      setTimeout(() => setShowCertificate(true), 1000);
    }
  };

  // Handle quiz answer selection
  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    
    // Check if answer is correct
    const currentQuiz = trainingModules[currentModule].quiz[currentQuestion];
    if (answerId === currentQuiz.correctAnswer) {
      setQuizScore(quizScore + 1);
    }
    
    // Move to next question or complete quiz
    setTimeout(() => {
      if (currentQuestion < trainingModules[currentModule].quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz completed
        const score = Math.round((quizScore / trainingModules[currentModule].quiz.length) * 100);
        completeModule(currentModule, score);
        setShowQuiz(false);
        setCurrentQuestion(0);
        setQuizScore(0);
      }
    }, 1000);
  };

  // Start quiz for current module
  const startQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowQuiz(true);
  };

  // Navigation functions
  const nextModule = () => {
    if (currentModule < trainingModules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  const prevModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  // Intersection Observer refs for animations
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [progressRef, progressInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [moduleRef, moduleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [badgesRef, badgesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-green-900 text-green-900 dark:text-emerald-50">
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-800 dark:to-emerald-700 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Green Champion Training
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Become a certified waste management expert and contribute to a cleaner, greener India
            </p>
            
            {/* Language Selector */}
            <div className="flex justify-center items-center mb-6">
              <Globe size={20} className="mr-2" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-blue-600 text-white border-none rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
            >
              <Download size={20} className="mr-2" />
              Download Training Materials
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Progress Tracker Section */}
      <section 
        ref={progressRef}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
                        animate={progressInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-6">Your Learning Journey</h2>
            
            <div className="bg-emerald-100 dark:bg-green-700 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Overall Progress</span>
                <span className="text-lg font-bold">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-green-900 rounded-full h-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-50 dark:bg-green-600 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen size={24} className="text-green-600 dark:text-emerald-50 mr-2" />
                  <span className="font-semibold">Modules Completed</span>
                </div>
                <p className="text-2xl font-bold">
                  {moduleProgress.filter(m => m.completed).length}/{trainingModules.length}
                </p>
              </div>
              
              <div className="bg-emerald-50 dark:bg-green-600 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <Award size={24} className="text-green-600 dark:text-emerald-50 mr-2" />
                  <span className="font-semibold">Average Score</span>
                </div>
                <p className="text-2xl font-bold">
                  {moduleProgress.filter(m => m.completed).length > 0 
                    ? Math.round(moduleProgress.filter(m => m.completed).reduce((sum, m) => sum + m.score, 0) / 
                      moduleProgress.filter(m => m.completed).length) 
                    : 0}%
                </p>
              </div>
              
              <div className="bg-emerald-50 dark:bg-green-600 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <Clock size={24} className="text-green-600 dark:text-emerald-50 mr-2" />
                  <span className="font-semibold">Time Spent</span>
                </div>
                <p className="text-2xl font-bold">~2h 15m</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Module Section */}
      <section 
        ref={moduleRef}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-emerald-50 dark:bg-green-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={moduleInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Module Navigation */}
              <div className="md:w-1/4">
                <div className="bg-white dark:bg-green-800 rounded-xl shadow-md p-4 sticky top-4">
                  <h3 className="text-xl font-bold mb-4">Training Modules</h3>
                  <div className="space-y-2">
                    {trainingModules.map((module, index) => (
                      <motion.div
                        key={module.id}
                        whileHover={{ x: 5 }}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          currentModule === index 
                            ? 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-emerald-50 font-semibold' 
                            : moduleProgress[index].completed 
                              ? 'bg-emerald-50 dark:bg-green-600 text-green-700 dark:text-emerald-50' 
                              : 'bg-gray-50 dark:bg-green-900 text-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => setCurrentModule(index)}
                      >
                        <div className="flex items-center">
                          {moduleProgress[index].completed ? (
                            <CheckCircle size={16} className="text-green-500 mr-2" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-green-500 mr-2"></div>
                          )}
                          <span className="text-sm">
                            {module.title[language]}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Module Content */}
              <div className="md:w-3/4">
                <div className="bg-white dark:bg-green-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-green-100 dark:border-green-700">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">
                        {trainingModules[currentModule].title[language]}
                      </h2>
                      <span className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                        <Clock size={16} className="mr-1" />
                        {trainingModules[currentModule].duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {trainingModules[currentModule].content[language].description}
                    </p>
                    
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevModule}
                        disabled={currentModule === 0}
                        className={`px-4 py-2 rounded-lg flex items-center ${
                          currentModule === 0 
                            ? 'bg-gray-200 dark:bg-green-900 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                            : 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-emerald-50 hover:bg-green-200 dark:hover:bg-green-600'
                        }`}
                      >
                        <ChevronLeft size={20} />
                        <span>Previous</span>
                      </motion.button>
                      
                      {!moduleProgress[currentModule].completed && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={startQuiz}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
                        >
                          <span>Take Quiz</span>
                          <ChevronRight size={20} />
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextModule}
                        disabled={currentModule === trainingModules.length - 1}
                        className={`px-4 py-2 rounded-lg flex items-center ${
                          currentModule === trainingModules.length - 1 
                            ? 'bg-gray-200 dark:bg-green-900 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                            : 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-emerald-50 hover:bg-green-200 dark:hover:bg-green-600'
                        }`}
                      >
                        <span>Next</span>
                        <ChevronRight size={20} />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Learning Materials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trainingModules[currentModule].content[language].resources.map((resource, index) => (
                        <motion.div
                          key={index}
                          variants={scaleIn}
                          className="bg-emerald-50 dark:bg-green-700 p-4 rounded-lg flex items-center cursor-pointer hover:bg-emerald-100 dark:hover:bg-green-600 transition-colors"
                        >
                          <div className="mr-4 p-2 bg-white dark:bg-green-800 rounded-full">
                            {resource.type === 'video' && <Play size={20} className="text-green-600 dark:text-emerald-50" />}
                            {resource.type === 'text' && <FileText size={20} className="text-green-600 dark:text-emerald-50" />}
                            {resource.type === 'infographic' && <BarChart3 size={20} className="text-green-600 dark:text-emerald-50" />}
                            {resource.type === 'interactive' && <Users size={20} className="text-green-600 dark:text-emerald-50" />}
                          </div>
                          <div>
                            <h4 className="font-semibold">{resource.title}</h4>
                            {resource.duration && (
                              <p className="text-sm text-gray-500 dark:text-gray-300">{resource.duration}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {moduleProgress[currentModule].completed && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-green-100 dark:bg-green-700 rounded-xl flex items-center"
                  >
                    <CheckCircle size={24} className="text-green-600 dark:text-emerald-50 mr-3" />
                    <div>
                      <h4 className="font-semibold">Module Completed!</h4>
                      <p className="text-sm">Your score: {moduleProgress[currentModule].score}%</p>
                    </div>
                    <button 
                      onClick={startQuiz}
                      className="ml-auto px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg"
                    >
                      Retake Quiz
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Badges & Achievements Section */}
      <section 
        ref={badgesRef}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={badgesInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-2">Your Achievements</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Earn badges as you progress through your training
            </p>
            
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
            >
              {badges.map(badge => (
                <motion.div
                  key={badge.id}
                  variants={scaleIn}
                  className={`p-4 rounded-xl text-center ${
                    badge.earned 
                      ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-green-900 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h3 className="font-semibold text-sm">{badge.name}</h3>
                  <div className="mt-2 text-xs">
                    {badge.earned ? 'Earned!' : 'Locked'}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-green-800 rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Question {currentQuestion + 1} of {trainingModules[currentModule].quiz.length}
                </h3>
                <button onClick={() => setShowQuiz(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-lg font-semibold">
                  {trainingModules[currentModule].quiz[currentQuestion].question[language]}
                </p>
              </div>
              
              <div className="space-y-3">
                {trainingModules[currentModule].quiz[currentQuestion].options.map(option => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedAnswer !== null
                        ? option.id === trainingModules[currentModule].quiz[currentQuestion].correctAnswer
                          ? 'bg-green-100 dark:bg-green-700 border-2 border-green-500'
                          : option.id === selectedAnswer
                            ? 'bg-red-100 dark:bg-red-900 border-2 border-red-500'
                            : 'bg-gray-100 dark:bg-green-900'
                        : 'bg-gray-100 dark:bg-green-900 hover:bg-gray-200 dark:hover:bg-green-700'
                    }`}
                  >
                    {option.text[language]}
                  </motion.button>
                ))}
              </div>
              
              {selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-lg text-center font-semibold"
                >
                  {selectedAnswer === trainingModules[currentModule].quiz[currentQuestion].correctAnswer ? (
                    <div className="text-green-600 dark:text-green-400 flex items-center justify-center">
                      <CheckCircle size={20} className="mr-2" />
                      Correct! Well done.
                    </div>
                  ) : (
                    <div className="text-red-600 dark:text-red-400">
                      Incorrect. Try again next time!
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-green-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 relative"
            >
              <button 
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              
              <div className="text-center border-2 border-dashed border-green-500 p-8 rounded-lg">
                <div className="mb-6">
                  <Trophy size={48} className="mx-auto text-yellow-500" />
                </div>
                
                <h2 className="text-3xl font-bold mb-2 text-green-700 dark:text-emerald-50">Certificate of Completion</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">This certifies that</p>
                
                <h3 className="text-2xl font-bold mb-6 text-green-800 dark:text-emerald-50">{userName}</h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  has successfully completed the Green Champion Training Program and demonstrated proficiency in sustainable waste management practices.
                </p>
                
                <div className="flex justify-center mb-6">
                  <div className="border-t-2 border-green-500 w-32 mx-auto"></div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date().toLocaleDateString()}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center mx-auto"
                >
                  <Download size={20} className="mr-2" />
                  Download Certificate
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Training;