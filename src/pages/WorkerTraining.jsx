// src/components/WorkerTraining.jsx
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
  Globe,
  Volume2,
  HelpCircle,
  TrendingUp,
  Calendar,
  Target,
  Quote,
  Home,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
  Search,
  Bookmark,
  Shield,
  AlertTriangle,
  Recycle,
  Truck,
  MessageCircle,
  ThumbsUp,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WorkerTraining = () => {
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
  const [learningStreak, setLearningStreak] = useState(3);
  const [totalPoints, setTotalPoints] = useState(450);
  const [showHelp, setShowHelp] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('training');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [bookmarkedModules, setBookmarkedModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResources, setShowResources] = useState(true);
  const [activeResource, setActiveResource] = useState(0);
  
  // Mock user data - in a real app, this would come from authentication
  useEffect(() => {
    // Simulate fetching user data
    setUserName('Rajesh Kumar');
    
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

// Training modules data
  const trainingModules = [
    {
      id: 1,
      title: {
        en: "Introduction to Waste Management",
        hi: "अपशिष्ट प्रबंधन का परिचय",
        bn: "বর্জ্য ব্যবস্থাপনার পরিচিতি",
        ta: "கழிவு மேலாண்மை அறிமுகம்"
      },
      duration: "15 min",
      icon: '📚',
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
        bn: {
          description: "ভারতের বর্জ্য ব্যবস্থাপনার চ্যালেঞ্জ এবং পরিবেশগত স্থায়িত্বের জন্য সঠিক বর্জ্য হ্যান্ডলিং এর গুরুত্ব সম্পর্কে জানুন।",
          resources: [
            { type: 'video', title: 'ভারতে বর্জ্য সংকট', duration: '5:20' },
            { type: 'text', title: 'প্রধান পরিসংখ্যান এবং তথ্য' },
            { type: 'infographic', title: 'বর্জ্য উৎপাদনের প্রবণতা' }
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
            bn: "ভারতে কত শতাংশ বর্জ্য বৈজ্ঞানিকভাবে চিকিত্সা করা হয়?",
            ta: "இந்தியாவில் எத்தனை சதவீத கழிவுகள் விஞ்ஞான ரீதியாக சிகிச்சை அளிக்கப்படுகின்றன?"
          },
          options: [
            { id: 1, text: { en: "25%", hi: "25%", bn: "25%", ta: "25%" } },
            { id: 2, text: { en: "54%", hi: "54%", bn: "54%", ta: "54%" } },
            { id: 3, text: { en: "70%", hi: "70%", bn: "70%", ta: "70%" } },
            { id: 4, text: { en: "85%", hi: "85%", bn: "85%", ta: "85%" } }
          ],
          correctAnswer: 2,
          explanation: {
            en: "Only about 54% of waste in India is scientifically treated, highlighting the need for better waste management practices.",
            hi: "भारत में केवल लगभग 54% कचरे का वैज्ञानिक तरीके से उपचार किया जाता है, जो बेहतर अपशिष्ट प्रबंधन प्रथाओं की आवश्यकता को रेखांकित करता है।",
            bn: "ভারতে মাত্র ৫৪% বর্জ্য বৈজ্ঞানিকভাবে চিকিত্সা করা হয়, যা更好 বর্জ্য ব্যবস্থাপনা অনুশীলনের প্রয়োজনীয়তা তুলে ধরে।",
            ta: "இந்தியாவில் சுமார் 54% கழிவுகள் மட்டுமே விஞ்ஞான ரீதியாக சிகிச்சை அளிக்கப்படுகின்றன, இது சிறந்த கழிவு மேலாண்மை நடைமுறைகளின் தேவையை எடுத்துக்காட்டுகிறது."
          }
        },
        {
          question: {
            en: "Which mission focuses on cleanliness in India?",
            hi: "भारत में स्वच्छता पर कौन सा मिशन केंद्रित है?",
            bn: "ভারতে পরিষ্কার-পরিচ্ছন্নতার উপর কোন মিশন ফোকাস করে?",
            ta: "இந்தியாவில் சுத்தத்தில் எந்த திட்டம் கவனம் செலுத்துகிறது?"
          },
          options: [
            { id: 1, text: { en: "Digital India", hi: "डिजिटल इंडिया", bn: "ডিজিটাল ইন্ডিয়া", ta: "டிஜிட்டல் இந்தியா" } },
            { id: 2, text: { en: "Make in India", hi: "मेक इन इंडिया", bn: "মেক ইন ইন্ডিয়া", ta: "மேக் இன் இந்தியா" } },
            { id: 3, text: { en: "Swachh Bharat Mission", hi: "स्वच्छ भारत मिशन", bn: "স্বচ্ছ ভারত মিশন", ta: "சுவச் பாரத் மிஷன்" } },
            { id: 4, text: { en: "Smart Cities Mission", hi: "स्मार्ट सिटीज मिशन", bn: "স্মার্ট সিটিজ মিশন", ta: "ஸ்மார்ட் சிட்டீஸ் மிஷன்" } }
          ],
          correctAnswer: 3,
          explanation: {
            en: "Swachh Bharat Mission (Clean India Mission) is the national campaign by the Government of India covering 4,041 statutory cities and towns to clean the streets, roads and infrastructure of the country.",
            hi: "स्वच्छ भारत मिशन भारत सरकार द्वारा देश की सड़कों, सड़कों और बुनियादी ढांचे को साफ करने के लिए 4,041 वैधानिक शहरों और कस्बों को कवर करने वाला एक राष्ट्रीय अभियान है।",
            bn: "স্বচ্ছ ভারত মিশন হল ভারত সরকারের একটি জাতীয় প্রচারণা যা দেশের রাস্তা, সড়ক এবং অবকাঠামো পরিষ্কার করতে ৪,০৪১টি সংবিধিবদ্ধ শহর এবং শহরগুলিকে কভার করে।",
            ta: "சுவச் பாரத் மிஷன் என்பது நாட்டின் தெருக்கள், சாலைகள் மற்றும் உள்கட்டமைப்பை சுத்தம் செய்வதற்காக 4,041 சட்டப்பூர்வ நகரங்கள் மற்றும் பட்டணங்களை உள்ளடக்கிய இந்திய அரசின் தேசிய பிரச்சாரமாகும்."
          }
        }
      ]
    },
    {
      id: 2,
      title: {
        en: "Waste Segregation & Three-Bin System",
        hi: "अपशिष्ट पृथक्करण और तीन-बिन प्रणाली",
        bn: "বর্জ্য পৃথকীকরণ এবং তিন-বিন সিস্টেম",
        ta: "கழிவு பிரித்தல் மற்றும் மூன்று-பெட்டி அமைப்பு"
      },
      duration: "20 min",
      icon: '🗑️',
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
        bn: {
          description: "ভিজা, শুকনো এবং বিপজ্জনক বর্জ্যের জন্য তিন-বিন সিস্টেম ব্যবহার করে উৎস পৃথকীকরণের শিল্পে দক্ষতা অর্জন করুন।",
          resources: [
            { type: 'video', title: 'সঠিকভাবে কীভাবে আলাদা করবেন', duration: '7:45' },
            { type: 'text', title: 'তিন-বিন সিস্টেম গাইড' },
            { type: 'infographic', title: 'বিনের জন্য রঙের কোডিং' },
            { type: 'interactive', title: 'পৃথকীকরণ অনুশীলন' }
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
            bn: "শুকনো বর্জ্যের জন্য সাধারণত কোন রঙের বিন ব্যবহার করা হয়?",
            ta: "உலர் கழிவுகளுக்கு பொதுவாக எந்த வண்ணத் தொட்டி பயன்படுத்தப்படுகிறது?"
          },
          options: [
            { id: 1, text: { en: "Blue", hi: "नीला", bn: "নীল", ta: "நீலம்" } },
            { id: 2, text: { en: "Green", hi: "हरा", bn: "সবুজ", ta: "பச்சை" } },
            { id: 3, text: { en: "Black", hi: "काला", bn: "কালো", ta: "கருப்பு" } },
            { id: 4, text: { en: "Red", hi: "लाल", bn: "লাল", ta: "சிவப்பு" } }
          ],
          correctAnswer: 1,
          explanation: {
            en: "Blue bins are typically used for dry/recyclable waste like paper, plastic, metal, and glass.",
            hi: "नीले डिब्बे आमतौर पर सूखे/पुनर्नवीनीकरण योग्य कचरे जैसे कागज, प्लास्टिक, धातु और कांच के लिए उपयोग किए जाते हैं।",
            bn: "নীল বিন সাধারণত শুকনো/পুনর্ব্যবহারযোগ্য বর্জ্যের জন্য ব্যবহার করা হয় যেমন কাগজ, প্লাস্টিক, ধাতু এবং কাচ।",
            ta: "நீலம் நிற தொட்டிகள் பொதுவாக காகிதம், பிளாஸ்டிக், உலோகம் மற்றும் கண்ணாடி போன்ற உலர்/மறுசுழற்சி கழிவுகளுக்குப் பயன்படுத்தப்படுகின்றன."
          }
        }
      ]
    },
    {
      id: 3,
      title: {
        en: "Safety Protocols & Equipment",
        hi: "सुरक्षा प्रोटोकॉल और उपकरण",
        bn: "সুরক্ষা প্রোটোকল এবং সরঞ্জাম",
        ta: "பாதுகாப்பு நெறிமுறைகள் மற்றும் உபகரணங்கள்"
      },
      duration: "25 min",
      icon: '🛡️',
      content: {
        en: {
          description: "Learn essential safety measures and proper usage of protective equipment during waste handling.",
          resources: [
            { type: 'video', title: 'Safety First: Protective Gear', duration: '8:30' },
            { type: 'text', title: 'Safety Guidelines Handbook' },
            { type: 'infographic', title: 'PPE Checklist' },
            { type: 'interactive', title: 'Safety Scenario Quiz' }
          ]
        },
        hi: {
          description: "अपशिष्ट प्रबंधन के दौरान आवश्यक सुरक्षा उपायों और सुरक्षात्मक उपकरणों के उचित उपयोग के बारे में जानें।",
          resources: [
            { type: 'video', title: 'सुरक्षा पहले: सुरक्षात्मक गियर', duration: '8:30' },
            { type: 'text', title: 'सुरक्षा दिशानिर्देश हैंडबुक' },
            { type: 'infographic', title: 'पीपीई चेकलिस्ट' },
            { type: 'interactive', title: 'सुरक्षा परिदृश्य क्विज' }
          ]
        },
        bn: {
          description: "বর্জ্য হ্যান্ডলিং এর期间 প্রয়োজনীয় সুরক্ষা ব্যবস্থা এবং সুরক্ষামূলক সরঞ্জামের সঠিক ব্যবহার সম্পর্কে জানুন।",
          resources: [
            { type: 'video', title: 'সুরক্ষা প্রথম: প্রতিরক্ষামূলক গিয়ার', duration: '8:30' },
            { type: 'text', title: 'সুরক্ষা নির্দেশিকা হ্যান্ডবুক' },
            { type: 'infographic', title: 'পিপিই চেকলিস্ট' },
            { type: 'interactive', title: 'সুরক্ষা পরিস্থিতি কুইজ' }
          ]
        },
        ta: {
          description: "கழிவு கையாளுதலின் போது அத்தியாவசிய பாதுகாப்பு நடவடிக்கைகள் மற்றும் பாதுகாப்பு உபகரணங்களின் சரியான பயன்பாடு பற்றி அறிக.",
          resources: [
            { type: 'video', title: 'பாதுகாப்பு முதலில்: பாதுகாப்பு கியர்', duration: '8:30' },
            { type: 'text', title: 'பாதுகாப்பு வழிகாட்டிகள் கையேடு' },
            { type: 'infographic', title: 'PPE சரிபார்ப்புப் பட்டியல்' },
            { type: 'interactive', title: 'பாதுகாப்பு சூழ்நிலை வினாடி வினா' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "Which of these is NOT a recommended safety equipment for waste workers?",
            hi: "इनमें से कौन सा अपशिष्ट कर्मियों के लिए अनुशंसित सुरक्षा उपकरण नहीं है?",
            bn: "নিম্নলিখিতগুলির মধ্যে哪一个 বর্জ্য কর্মীদের জন্য প্রস্তাবিত সুরক্ষা সরঞ্জাম নয়?",
            ta: "இவற்றில் எது கழிவு தொழிலாளர்களுக்கு பரிந்துரைக்கப்படும் பாதுகாப்பு உபகரணம் அல்ல?"
          },
          options: [
            { id: 1, text: { en: "Safety goggles", hi: "सुरक्षा चश्मा", bn: "সুরক্ষা চশমা", ta: "பாதுகாப்பு கண்ணாடிகள்" } },
            { id: 2, text: { en: "Open-toed sandals", hi: "खुले पंजे की सैंडल", bn: "খোলা পায়ের স্যান্ডেল", ta: "திறந்த விரல் செருப்புகள்" } },
            { id: 3, text: { en: "Heavy-duty gloves", hi: "भारी-शुल्क दस्ताने", bn: "হেভি-ডিউটি গ্লাভস", ta: "கனரக கையுறைகள்" } },
            { id: 4, text: { en: "Reflective vest", hi: "चिंतनशील बनियान", bn: "রিফ্লেক্টিভ ভেস্ট", ta: "பிரதிபலிப்பு மார்புச்சட்டை" } }
          ],
          correctAnswer: 2,
          explanation: {
            en: "Open-toed sandals provide no protection against sharp objects, chemicals, or heavy items that might fall on feet.",
            hi: "खुले पंजे की सैंडल तेज वस्तुओं, रसायनों या पैरों पर गिरने वाली भारी वस्तुओं से कोई सुरक्षा प्रदान नहीं करती हैं।",
            bn: "খোলা পায়ের স্যান্ডেল তীক্ষ্ণ বস্তু, রাসায়নিক বা পায়ে পড়তে পারে এমন ভারী জিনিস থেকে任何 সুরক্ষা提供 করে না।",
            ta: "திறந்த விரல் செருப்புகள் கூர்மையான பொருள்கள், இரசாயனங்கள் அல்லது கால்களில் விழக்கூடிய கனரக பொருட்களிலிருந்து எந்தப் பாதுகாப்பையும் வழங்காது."
          }
        }
      ]
    },
    {
      id: 4,
      title: {
        en: "Collection & Transportation",
        hi: "संग्रह और परिवहन",
        bn: "সংগ্রহ এবং পরিবহন",
        ta: "சேகரிப்பு மற்றும் போக்குவரத்து"
      },
      duration: "18 min",
      icon: '🚛',
      content: {
        en: {
          description: "Learn efficient collection methods and safe transportation practices for different types of waste.",
          resources: [
            { type: 'video', title: 'Collection Best Practices', duration: '6:15' },
            { type: 'text', title: 'Transportation Guidelines' },
            { type: 'infographic', title: 'Route Optimization' },
            { type: 'interactive', title: 'Vehicle Safety Check' }
          ]
        },
        hi: {
          description: "विभिन्न प्रकार के कचरे के लिए कुशल संग्रह विधियों और सुरक्षित परिवहन प्रथाओं के बारे में जानें।",
          resources: [
            { type: 'video', title: 'संग्रह सर्वोत्तम प्रथाएँ', duration: '6:15' },
            { type: 'text', title: 'परिवहन दिशानिर्देश' },
            { type: 'infographic', title: 'मार्ग अनुकूलन' },
            { type: 'interactive', title: 'वाहन सुरक्षा जांच' }
          ]
        },
        bn: {
          description: "বিভিন্ন ধরনের বর্জ্যের জন্য দক্ষ সংগ্রহ পদ্ধতি এবং নিরাপদ পরিবহন অনুশীলন সম্পর্কে জানুন।",
          resources: [
            { type: 'video', title: 'সংগ্রহের সেরা অনুশীলন', duration: '6:15' },
            { type: 'text', title: 'পরিবহন নির্দেশিকা' },
            { type: 'infographic', title: 'রুট অপ্টিমাইজেশন' },
            { type: 'interactive', title: 'গাড়ির নিরাপত্তা পরীক্ষা' }
          ]
        },
        ta: {
          description: "பல்வேறு வகையான கழிவுகளுக்கான திறமையான சேகரிப்பு முறைகள் மற்றும் பாதுகாப்பான போக்குவரத்து நடைமுறைகளைக் கற்றுக்கொள்ளுங்கள்.",
          resources: [
            { type: 'video', title: 'சேகரிப்பு சிறந்த நடைமுறைகள்', duration: '6:15' },
            { type: 'text', title: 'போக்குவரத்து வழிகாட்டிகள்' },
            { type: 'infographic', title: 'வழி தேர்வுமுறை' },
            { type: 'interactive', title: 'வாகன பாதுகாப்பு சோதனை' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "What is the maximum recommended capacity for waste collection vehicles?",
            hi: "कचरा संग्रह वाहनों के लिए अधिकतम अनुशंसित क्षमता क्या है?",
            bn: "বর্জ্য সংগ্রহ যানবাহনের জন্য সর্বোচ্চ প্রস্তাবিত ক্ষমতা是什么?",
            ta: "கழிவு சேகரிப்பு வாகனங்களுக்கு அதிகபட்ச பரிந்துரைக்கப்பட்ட திறன் என்ன?"
          },
          options: [
            { id: 1, text: { en: "60%", hi: "60%", bn: "60%", ta: "60%" } },
            { id: 2, text: { en: "75%", hi: "75%", bn: "75%", ta: "75%" } },
            { id: 3, text: { en: "85%", hi: "85%", bn: "85%", ta: "85%" } },
            { id: 4, text: { en: "95%", hi: "95%", bn: "95%", ta: "95%" } }
          ],
          correctAnswer: 3,
          explanation: {
            en: "Vehicles should not be loaded beyond 85% capacity to ensure safe transportation and prevent spillage.",
            hi: "सुरक्षित परिवहन और रिसाव को रोकने के लिए वाहनों को 85% क्षमता से अधिक नहीं लोड किया जाना चाहिए।",
            bn: "নিরাপদ পরিবহন এবং ছড়িয়ে পড়া রোধ করতে যানবাহনগুলি 85% ক্ষমতার বেশি লোড করা উচিত নয়।",
            ta: "பாதுகாப்பான போக்குவரத்து மற்றும் கசிவைத் தடுக்க வாகனங்கள் 85% திறனுக்கு மேல் ஏற்றக்கூடாது."
          }
        }
      ]
    },
    {
      id: 5,
      title: {
        en: "Processing & Treatment",
        hi: "प्रसंस्करण और उपचार",
        bn: "প্রক্রিয়াকরণ এবং চিকিত্সা",
        ta: "செயலாக்கம் மற்றும் சிகிச்சை"
      },
      duration: "22 min",
      icon: '⚙️',
      content: {
        en: {
          description: "Understand various waste processing techniques and treatment methods for different waste types.",
          resources: [
            { type: 'video', title: 'Composting Techniques', duration: '8:45' },
            { type: 'text', title: 'Waste-to-Energy Processes' },
            { type: 'infographic', title: 'Treatment Flowchart' },
            { type: 'interactive', title: 'Virtual Plant Tour' }
          ]
        },
        hi: {
          description: "विभिन्न प्रकार के कचरे के लिए विभिन्न कचरा प्रसंस्करण तकनीकों और उपचार विधियों को समझें।",
          resources: [
            { type: 'video', title: 'कम्पोस्टिंग तकनीक', duration: '8:45' },
            { type: 'text', title: 'अपशिष्ट-से-ऊर्जा प्रक्रियाएं' },
            { type: 'infographic', title: 'उपचार फ्लोचार्ट' },
            { type: 'interactive', title: 'आभासी संयंत्र भ्रमण' }
          ]
        },
        bn: {
          description: "বিভিন্ন ধরনের বর্জ্যের জন্য বিভিন্ন বর্জ্য প্রক্রিয়াকরণ কৌশল এবং চিকিত্সা পদ্ধতি বুঝুন।",
          resources: [
            { type: 'video', title: 'কম্পোস্টিং কৌশল', duration: '8:45' },
            { type: 'text', title: 'বর্জ্য-থেকে-শক্তি প্রক্রিয়া' },
            { type: 'infographic', title: 'চিকিত্সা ফ্লোচার্ট' },
            { type: 'interactive', title: 'ভার্চুয়াল প্ল্যান্ট ট্যুর' }
          ]
        },
        ta: {
          description: "பல்வேறு வகையான கழிவுகளுக்கான பல்வேறு கழிவு செயலாக்க நுட்பங்கள் மற்றும் சிகிச்சை முறைகளைப் புரிந்து கொள்ளுங்கள்.",
          resources: [
            { type: 'video', title: 'கூட்டு வைக்கும் நுட்பங்கள்', duration: '8:45' },
            { type: 'text', title: 'கழிவு-முதல்-ஆற்றல் செயல்முறைகள்' },
            { type: 'infographic', title: 'சிகிச்சை பாய்வு விளக்கப்படம்' },
            { type: 'interactive', title: 'மெய்நிகர் ஆலை சுற்றுப்பயணம்' }
          ]
        }
      },
      quiz: [
          {
"question": {
"en": "Which method is most suitable for organic waste treatment?",
"hi": "जैविक कचरे के उपचार के लिए कौन सी विधि सबसे उपयुक्त है?",
"bn": "জৈব বর্জ্য চিকিত্সার জন্য哪一种 পদ্ধতি সবচেয়ে উপযুক্ত?",
"ta": "கரிம கழிவு சிகிச்சைக்கு எ哪一种 முறை மிகவும் பொருத்தமானது?"
},
"options": [
{ "id": 1, "text": { "en": "Incineration", "hi": "भस्मीकरण", "bn": "পোড়ানো", "ta": "எரித்தல்" } },
{ "id": 2, "text": { "en": "Landfilling", "hi": "लैंडफिलिंग", "bn": "ল্যান্ডফিলিং", "ta": "நிரப்புதல்" } },
{ "id": 3, "text": { "en": "Composting", "hi": "कम्पोस्टिंग", "bn": "কম্পোস্টিং", "ta": "கூட்டு வைத்தல்" } },
{ "id": 4, "text": { "en": "Recycling", "hi": "रीसाइक्लिंग", "bn": "রিসাইক্লিং", "ta": "மறுசுழற்சி" } }
],
"correctAnswer": 3,
"explanation": {
"en": "Composting is the most suitable method for organic waste as it converts waste into nutrient-rich compost for agriculture.",
"hi": "कम्पोस्टिंग जैविक कचरे के लिए सबसे उपयुक्त विधि है क्योंकि यह कचरे को कृषि के लिए पोषक तत्वों से भरपूर खाद में परिवर्तित करती है।",
"bn": "কম্পোস্টিং জৈব বর্জ্যের জন্য সবচেয়ে উপযুক্ত পদ্ধতি কারণ এটি বর্জ্যকে কৃষির জন্য পুষ্টি-সমৃদ্ধ কম্পোস্টে রূপান্তরিত করে।",
"ta": "கரிம கழிவுகளுக்கு கூட்டு வைத்தல் மிகவும் பொருத்தமான முறையாகும், ஏனெனில் இது கழிவுகளை விவசாயத்திற்கான ஊட்டச்சத்து நிறைந்த உரமாக மாற்றுகிறது."
}
}
]
},
{
"id": 6,
"title": {
"en": "Community Engagement & Communication",
"hi": "सामुदायिक जुड़ाव और संचार",
"bn": "সম্প্রদায় সম্পৃক্ততা এবং যোগাযোগ",
"ta": "சமூக ஈடுபாடு மற்றும் தகவல்தொடர்பு"
},
"duration": "20 min",
"icon": '🗣️',
"content": {
"en": {
"description": "Develop skills to effectively communicate with residents and promote community participation in waste management.",
"resources": [
{ "type": "video", "title": "Effective Communication Strategies", "duration": "9:10" },
{ "type": "text", "title": "Overcoming Common Objections" },
{ "type": "infographic", "title": "Do's and Don'ts of Engagement" },
{ "type": "interactive", "title": "Role-Playing Scenarios" }
]
},
"hi": {
"description": "निवासियों के साथ प्रभावी ढंग से संवाद करने और अपशिष्ट प्रबंधन में सामुदायिक भागीदारी को बढ़ावा देने के लिए कौशल विकसित करें।",
"resources": [
{ "type": "video", "title": "प्रभावी संचार रणनीतियाँ", "duration": "9:10" },
{ "type": "text", "title": "आम आपत्तियों पर काबू पाना" },
{ "type": "infographic", "title": "जुड़ाव के do's and don'ts" },
{ "type": "interactive", "title": "रोल-प्लेइंग परिदृश्य" }
]
},
"bn": {
"description": "বাসিন্দাদের সাথে কার্যকরভাবে যোগাযোগ করতে এবং বর্জ্য ব্যবস্থাপনায় সম্প্রদায়ের অংশগ্রহণকে উৎসাহিত করতে দক্ষতা উন্নত করুন।",
"resources": [
{ "type": "video", "title": "কার্যকর যোগাযোগ কৌশল", "duration": "9:10" },
{ "type": "text", "title": "সাধারণ আপত্তি কাটিয়ে ওঠা" },
{ "type": "infographic", "title": "জড়িত হওয়ার do's and don'ts" },
{ "type": "interactive", "title": "ভূমিকা অভিনয় পরিস্থিতি" }
]
},
"ta": {
"description": "குடியிருப்பாளர்களுடன் திறம்பட தொடர்புகொள்ளும் மற்றும் கழிவு மேலாண்மையில் சமூக பங்கேற்பை ஊக்குவிக்கும் திறன்களை வளர்த்துக் கொள்ளுங்கள்.",
"resources": [
{ "type": "video", "title": "திறனான தகவல்தொடர்பு உத்திகள்", "duration": "9:10" },
{ "type": "text", "title": "பொதுவான ஆட்சேபனைகளை சமாளித்தல்" },
{ "type": "infographic", "title": "ஈடுபாட்டின் செய்ய வேண்டியவை மற்றும் செய்யக் கூடாதவை" },
{ "type": "interactive", "title": "பாத்திரத்தில் நடிப்பு காட்சிகள்" }
]
}
},
"quiz": [
{
"question": {
"en": "What is the most effective way to address residents' concerns about waste collection?",
"hi": "कचरा संग्रह को लेकर निवासियों की चिंताओं को दूर करने का सबसे प्रभावी तरीका क्या है?",
"bn": "বর্জ্য সংগ্রহ নিয়ে বাসিন্দাদের উদ্বেগ মোকাবেলা করার সবচেয়ে কার্যকর উপায়是什么?",
"ta": "கழிவு சேகரிப்பு குறித்த குடியிருப்பாளர்களின் கவலைகளை சமாளிக்க மிகவும் பயனுள்ள முறை எது?"
},
"options": [
{ "id": 1, "text": { "en": "Ignore them", "hi": "उन्हें नजरअंदाज करें", "bn": "তাদের উপেক্ষা করুন", "ta": "அவற்றை புறக்கணிக்கவும்" } },
{ "id": 2, "text": { "en": "Active listening and empathy", "hi": "सक्रिय सुनना और सहानुभूति", "bn": "সক্রিয় শোনা এবং সহানুভূতি", "ta": "செயலில் கேட்டல் மற்றும் பச்சாத்தாபம்" } },
{ "id": 3, "text": { "en": "Impose fines immediately", "hi": "तुरंत जुर्माना लगाएं", "bn": "অবিলম্বে জরিমানা আরোপ করুন", "ta": "உடனடியாக அபராதம் விதிக்கவும்" } },
{ "id": 4, "text": { "en": "Avoid contact", "hi": "संपर्क से बचें", "bn": "যোগাযোগ এড়িয়ে চলুন", "ta": "தொடர்பு தவிர்க்கவும்" } }
],
"correctAnswer": 2,
"explanation": {
"en": "Active listening and showing empathy helps build trust, understand the root cause of concerns, and find mutually acceptable solutions.",
"hi": "सक्रिय रूप से सुनना और सहानुभूति दिखाना विश्वास बनाने, चिंताओं के मूल कारण को समझने और परस्पर स्वीकार्य समाधान खोजने में मदद करता है।",
"bn": "সক্রিয়ভাবে শোনা এবং সহানুভূতি দেখানো বিশ্বাস গড়ে তুলতে, উদ্বেগের মূল কারণ বুঝতে এবং পারস্পরিকভাবে গ্রহণযোগ্য সমাধান খুঁজে পেতে সাহায্য করে।",
"ta": "செயலில் கேட்டல் மற்றும் பச்சாத்தாபம் காட்டுவது நம்பிக்கையை உருவாக்க, கவலைகளின் மூல காரணத்தைப் புரிந்துகொள்ள மற்றும் பரஸ்பர ஏற்றுக்கொள்ளக்கூடிய தீர்வுகளைக் கண்டறிய உதவுகிறது."
}
}
]
}
];


  // Filter modules based on search query
  const filteredModules = trainingModules.filter(module => 
    module.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.content[language].description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle module completion
  const completeModule = (moduleIndex, score) => {
    const newProgress = [...moduleProgress];
    newProgress[moduleIndex] = { completed: true, score };
    setModuleProgress(newProgress);
    
    // Award points based on performance
    const pointsEarned = score >= 80 ? 100 : score >= 60 ? 75 : 50;
    setTotalPoints(prev => prev + pointsEarned);
    
    // Increase learning streak
    setLearningStreak(prev => prev + 1);
  };

  // Handle quiz submission
  const handleQuizSubmit = () => {
    const score = Math.round((quizScore / trainingModules[currentModule].quiz.length) * 100);
    completeModule(currentModule, score);
    setShowQuiz(false);
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
  };

  // Handle answer selection
  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    if (answerId === trainingModules[currentModule].quiz[currentQuestion].correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  // Toggle bookmark
  const toggleBookmark = (moduleId) => {
    if (bookmarkedModules.includes(moduleId)) {
      setBookmarkedModules(bookmarkedModules.filter(id => id !== moduleId));
    } else {
      setBookmarkedModules([...bookmarkedModules, moduleId]);
    }
  };

  // Navigation functions
  const nextModule = () => {
    if (currentModule < trainingModules.length - 1) {
      setCurrentModule(prev => prev + 1);
    }
  };

  const prevModule = () => {
    if (currentModule > 0) {
      setCurrentModule(prev => prev - 1);
    }
  };

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Progress calculation
  const overallProgress = Math.round(
    (moduleProgress.filter(m => m.completed).length / trainingModules.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-green-800 shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* <div className="flex items-center space-x-2">
            <Recycle size={32} className="text-green-600 dark:text-green-300" />
            <span className="text-xl font-bold text-green-700 dark:text-white">GreenWork</span>
          </div> */}
          
          <div className="hidden md:flex ml-10 space-x-6">
            <button 
              className={`px-3 py-2 rounded-lg font-medium ${activeTab === 'training' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-white' : 'hover:text-green-600 dark:hover:text-green-300'}`}
              onClick={() => setActiveTab('training')}
            >
              Training
            </button>
            <button 
              className={`px-3 py-2 rounded-lg font-medium ${activeTab === 'progress' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-white' : 'hover:text-green-600 dark:hover:text-green-300'}`}
              onClick={() => setActiveTab('progress')}
            >
              My Progress
            </button>
            <button 
              className={`px-3 py-2 rounded-lg font-medium ${activeTab === 'community' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-white' : 'hover:text-green-600 dark:hover:text-green-300'}`}
              onClick={() => setActiveTab('community')}
            >
              Community
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-green-50 dark:bg-green-900 rounded-full py-1 px-3">
            <Trophy size={18} className="text-yellow-500" />
            <span className="font-medium">{totalPoints}</span>
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2 bg-green-100 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600 rounded-full py-2 px-4 transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <User size={20} />
              <span className="hidden sm:block truncate max-w-xs">{userName}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </button>
            
            {showMobileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-green-800 rounded-md shadow-lg py-1 z-10">
                <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-green-100 dark:hover:bg-green-700">
                  <User size={16} className="mr-2" />
                  Profile
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-green-100 dark:hover:bg-green-700">
                  <Bookmark size={16} className="mr-2" />
                  Bookmarks
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-green-100 dark:hover:bg-green-700">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-green-800 shadow-md px-6 py-4"
          >
            <div className="flex flex-col space-y-3">
              <button 
                className={`py-2 px-4 rounded-lg ${activeTab === 'training' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-white' : ''}`}
                onClick={() => { setActiveTab('training'); setShowMobileMenu(false); }}
              >
                Training
              </button>
              <button 
                className={`py-2 px-4 rounded-lg ${activeTab === 'progress' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-white' : ''}`}
                onClick={() => { setActiveTab('progress'); setShowMobileMenu(false); }}
              >
                My Progress
              </button>
              <button 
                className={`py-2 px-4 rounded-lg ${activeTab === 'community' ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-white' : ''}`}
                onClick={() => { setActiveTab('community'); setShowMobileMenu(false); }}
              >
                Community
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Worker Training Program</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Build your skills in waste management and become a sustainability champion
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Language Selector */}
            <div className="relative">
              <select 
                className="bg-white dark:bg-green-800 border border-green-300 dark:border-green-600 rounded-lg py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <Globe size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>
            
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search modules..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-green-800 border border-green-300 dark:border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* TTS Toggle */}
            <button 
              className={`p-2 rounded-lg ${ttsEnabled ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700'}`}
              onClick={() => setTtsEnabled(!ttsEnabled)}
              aria-label="Text-to-speech"
            >
              <Volume2 size={20} />
            </button>
            
            {/* Help Button */}
            <button 
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-700"
              onClick={() => setShowHelp(true)}
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-green-800 border border-green-300 dark:border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Progress Overview */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white dark:bg-green-800 rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray={`${overallProgress}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{overallProgress}%</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Overall Progress</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {moduleProgress.filter(m => m.completed).length} of {trainingModules.length} modules completed
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Calendar size={18} className="text-green-600 dark:text-green-400" />
                  <span className="font-semibold">{learningStreak} days</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Learning streak</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Trophy size={18} className="text-yellow-500" />
                  <span className="font-semibold">{totalPoints}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Total points</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star size={18} className="text-blue-500" />
                  <span className="font-semibold">{bookmarkedModules.length}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Saved</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Module List Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-green-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-green-100 dark:border-green-700">
                <h3 className="font-semibold flex items-center">
                  <BookOpen size={18} className="mr-2" />
                  Training Modules
                </h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {filteredModules.map((module, index) => (
                  <div 
                    key={module.id}
                    className={`p-4 border-b border-green-100 dark:border-green-700 cursor-pointer transition-colors ${
                      currentModule === index 
                        ? 'bg-green-50 dark:bg-green-900' 
                        : 'hover:bg-gray-50 dark:hover:bg-green-700'
                    }`}
                    onClick={() => setCurrentModule(index)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl mt-1">{module.icon}</div>
                        <div>
                          <h4 className="font-medium">{module.title[language]}</h4>
                          <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                            <Clock size={14} className="mr-1" />
                            {module.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(module.id);
                          }}
                          className="text-gray-400 hover:text-yellow-500"
                        >
                          <Bookmark 
                            size={16} 
                            fill={bookmarkedModules.includes(module.id) ? 'currentColor' : 'none'} 
                          />
                        </button>
                        
                        {moduleProgress[index].completed ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress bar for completed modules */}
                    {moduleProgress[index].completed && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${moduleProgress[index].score}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          Score: {moduleProgress[index].score}%
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 bg-white dark:bg-green-800 rounded-xl shadow-md p-4">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-700 rounded-lg transition-colors">
                  <span>Continue Learning</span>
                  <Play size={16} />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-700 rounded-lg transition-colors">
                  <span>Take Assessment</span>
                  <BarChart3 size={16} />
                </button>
                <button 
                  className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-700 rounded-lg transition-colors"
                  onClick={() => setShowCertificate(true)}
                >
                  <span>View Certificate</span>
                  <Award size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Module Content */}
          <div className="lg:w-3/4">
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
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    className={`flex items-center px-4 py-2 rounded-lg ${showResources ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700'}`}
                    onClick={() => setShowResources(true)}
                  >
                    <FileText size={16} className="mr-2" />
                    Resources
                  </button>
                  <button 
                    className={`flex items-center px-4 py-2 rounded-lg ${!showResources ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700'}`}
                    onClick={() => setShowResources(false)}
                  >
                    <BarChart3 size={16} className="mr-2" />
                    Quiz Prep
                  </button>
                  
                  {!moduleProgress[currentModule].completed && (
                    <button 
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg ml-auto"
                      onClick={() => setShowQuiz(true)}
                    >
                      Take Quiz
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Resources Section */}
              {showResources && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainingModules[currentModule].content[language].resources.map((resource, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          activeResource === index 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                        }`}
                        onClick={() => setActiveResource(index)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            resource.type === 'video' ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' :
                            resource.type === 'text' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' :
                            resource.type === 'infographic' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' :
                            'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300'
                          }`}>
                            {resource.type === 'video' && <Play size={16} />}
                            {resource.type === 'text' && <FileText size={16} />}
                            {resource.type === 'infographic' && <BarChart3 size={16} />}
                            {resource.type === 'interactive' && <TrendingUp size={16} />}
                          </div>
                          
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            {resource.duration && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Duration: {resource.duration}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {activeResource === index && (
                          <div className="mt-4">
                            {resource.type === 'video' && (
                              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <Play size={40} className="mx-auto text-gray-500" />
                                  <p className="mt-2 text-gray-600 dark:text-gray-300">Video playback would appear here</p>
                                </div>
                              </div>
                            )}
                            
                            {resource.type === 'text' && (
                              <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300">
                                  Detailed text content about {resource.title.toLowerCase()} would appear here. This would include important information, guidelines, and best practices related to the module topic.
                                </p>
                                <button className="flex items-center text-green-600 dark:text-green-400 mt-3">
                                  <Download size={16} className="mr-1" />
                                  Download PDF
                                </button>
                              </div>
                            )}
                            
                            {resource.type === 'infographic' && (
                              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                                  <BarChart3 size={40} className="text-gray-500" />
                                </div>
                                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-3">
                                  Visual infographic illustrating key concepts
                                </p>
                              </div>
                            )}
                            
                            {resource.type === 'interactive' && (
                              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-600 dark:text-gray-300 mb-3">
                                  Interactive exercise to practice what you've learned
                                </p>
                                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                                  Start Exercise
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quiz Preparation Section */}
              {!showResources && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quiz Preparation</h3>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <HelpCircle size={20} className="text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-300">What to Expect</h4>
                        <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-1">
                          This quiz contains {trainingModules[currentModule].quiz.length} questions. You need to score at least 60% to pass and complete this module.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Key Topics</h4>
                      <ul className="space-y-2">
                        {trainingModules[currentModule].quiz.map((question, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full p-1 mr-2 mt-0.5">
                              <Target size={12} />
                            </div>
                            <span className="text-sm">{question.question[language].substring(0, 60)}...</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Tips for Success</h4>
                      <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Review all learning materials before attempting the quiz</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Take notes on important concepts</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Don't rush - read each question carefully</span>
                          </li>
                        </ul>
                      </div>
                      
                      <button 
                        className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center"
                        onClick={() => setShowQuiz(true)}
                      >
                        Start Quiz
                        <ChevronRight size={18} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation Between Modules */}
            <div className="flex justify-between mt-6">
              <button 
                className="flex items-center px-4 py-2 bg-white dark:bg-green-800 border border-green-300 dark:border-green-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={prevModule}
                disabled={currentModule === 0}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>
              
              <button 
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={nextModule}
                disabled={currentModule === trainingModules.length - 1}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
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
              className="bg-white dark:bg-green-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-green-100 dark:border-green-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    {trainingModules[currentModule].title[language]} - Quiz
                  </h3>
                  <button onClick={() => setShowQuiz(false)}>
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span>Question {currentQuestion + 1} of {trainingModules[currentModule].quiz.length}</span>
                  <span className="mx-2">•</span>
                  <span>{quizScore} correct</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${((currentQuestion + 1) / trainingModules[currentModule].quiz.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-medium mb-6">
                  {trainingModules[currentModule].quiz[currentQuestion].question[language]}
                </h4>
                
                <div className="space-y-3">
                  {trainingModules[currentModule].quiz[currentQuestion].options.map(option => (
                    <button
                      key={option.id}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedAnswer === option.id
                          ? option.id === trainingModules[currentModule].quiz[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50 dark:bg-green-900'
                            : 'border-red-500 bg-red-50 dark:bg-red-900'
                          : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                      }`}
                      onClick={() => handleAnswerSelect(option.id)}
                      disabled={selectedAnswer !== null}
                    >
                      {option.text[language]}
                    </button>
                  ))}
                </div>
                
                {selectedAnswer !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-4 rounded-lg ${
                      selectedAnswer === trainingModules[currentModule].quiz[currentQuestion].correctAnswer
                        ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}
                  >
                    <div className="font-medium mb-2">
                      {selectedAnswer === trainingModules[currentModule].quiz[currentQuestion].correctAnswer
                        ? 'Correct!'
                        : 'Incorrect'
                      }
                    </div>
                    <p>{trainingModules[currentModule].quiz[currentQuestion].explanation[language]}</p>
                  </motion.div>
                )}
              </div>
              
              <div className="p-6 border-t border-green-100 dark:border-green-700 flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                
                {currentQuestion < trainingModules[currentModule].quiz.length - 1 ? (
                  <button
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      setCurrentQuestion(prev => prev + 1);
                      setSelectedAnswer(null);
                    }}
                    disabled={selectedAnswer === null}
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    onClick={handleQuizSubmit}
                    disabled={selectedAnswer === null}
                  >
                    Finish Quiz
                  </button>
                )}
              </div>
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
              className="bg-white dark:bg-green-800 rounded-xl shadow-xl max-w-2xl w-full"
            >
              <div className="p-6 border-b border-green-100 dark:border-green-700 flex justify-between items-center">
                <h3 className="text-xl font-bold">Course Completion Certificate</h3>
                <button onClick={() => setShowCertificate(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="border-2 border-green-500 rounded-lg p-8 text-center">
                  <div className="mb-6">
                    <Award size={48} className="mx-auto text-green-500" />
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-2">Certificate of Completion</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">This certifies that</p>
                  
                  <h5 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">{userName}</h5>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    has successfully completed the Waste Management Training Program with a score of {overallProgress}%
                  </p>
                  
                  <div className="flex justify-center space-x-10 mt-8">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Certificate ID</p>
                      <p className="font-medium">GW-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6 space-x-4">
                  <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                  <button className="flex items-center px-4 py-2 border border-green-600 text-green-600 dark:text-green-400 rounded-lg">
                    <Share2 size={16} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
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
              className="bg-white dark:bg-green-800 rounded-xl shadow-xl max-w-2xl w-full"
            >
              <div className="p-6 border-b border-green-100 dark:border-green-700 flex justify-between items-center">
                <h3 className="text-xl font-bold">Help & Support</h3>
                <button onClick={() => setShowHelp(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h4>How to Use This Platform</h4>
                  <p>This training platform is designed to help waste management workers learn essential skills and knowledge. Here's how to make the most of it:</p>
                  
                  <h5>Navigation</h5>
                  <ul>
                    <li>Use the sidebar to browse through different modules</li>
                    <li>Click on any module to view its content</li>
                    <li>Use the next/previous buttons to navigate between modules</li>
                  </ul>
                  
                  <h5>Learning Resources</h5>
                  <ul>
                    <li>Each module contains videos, text resources, infographics, and interactive exercises</li>
                    <li>Click on any resource to view it in detail</li>
                    <li>Bookmark important modules for quick access later</li>
                  </ul>
                  
                  <h5>Quizzes</h5>
                  <ul>
                    <li>Each module ends with a quiz to test your understanding</li>
                    <li>You need to score at least 60% to pass a module</li>
                    <li>You can retake quizzes if you don't pass on the first attempt</li>
                  </ul>
                  
                  <h5>Getting Help</h5>
                  <p>If you need additional assistance, please contact your supervisor or the training coordinator at your facility.</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-green-100 dark:border-green-700">
                  <h5 className="font-medium mb-3">Frequently Asked Questions</h5>
                  
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-medium">How do I reset my password?</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Contact your facility administrator to reset your password.</p>
                    </div>
                    
                    <div>
                      <h6 className="font-medium">What happens if I fail a quiz?</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-300">You can retake the quiz after reviewing the module materials again.</p>
                    </div>
                    
                    <div>
                      <h6 className="font-medium">Can I access this training on my mobile phone?</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Yes, the platform is fully responsive and works on mobile devices.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkerTraining;