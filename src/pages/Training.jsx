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
  Globe,
  Recycle,
  Facebook, // Add these social media icons
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [timeSpent, setTimeSpent] = useState(0); // in minutes
  
  // Mock user data - in a real app, this would come from authentication
  useEffect(() => {
    // Simulate fetching user data
    setUserName('Rajesh Kumar');
    
    // Set up interval to track time spent
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Training modules data
  const trainingModules = [
    {
      id: 1,
      title: {
        en: "Introduction to Waste Management",
        hi: "अपशिष्ट प्रबंधन का परिचय",
        ta: "கழிவு மேலாண்மை அறிமுகம்",
        te: "వేస్ట్ మేనేజ్మెంట్ పరిచయం",
        bn: "বর্জ্য ব্যবস্থাপনার পরিচয়",
        mr: "कचरा व्यवस्थापना परिचय"
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
        },
        te: {
          description: "భారతదేశంలో వేస్ట్ మేనేజ్మెంట్ సవాళ్లు మరియు పర్యావరణ స్థిరత్వం కోసం సరైన వేస్ట్ నిర్వహణ యొక్క ప్రాముఖ్యత గురించి తెలుసుకోండి.",
          resources: [
            { type: 'video', title: 'భారతదేశంలో వేస్ట్ సంక్షోభం', duration: '5:20' },
            { type: 'text', title: 'ప్రధాన గణాంకాలు మరియు వాస్తవాలు' },
            { type: 'infographic', title: 'వేస్ట్ జనరేషన్ ట్రెండ్స్' }
          ]
        },
        bn: {
          description: "ভারতের বর্জ্য ব্যবস্থাপনার চ্যালেঞ্জ এবং পরিবেশগত স্থায়িত্বের জন্য সঠিক বর্জ্য ব্যবস্থাপনার গুরুত্ব সম্পর্কে জানুন।",
          resources: [
            { type: 'video', title: 'ভারতে বর্জ্য সংকট', duration: '5:20' },
            { type: 'text', title: 'প্রধান পরিসংখ্যান এবং তথ্য' },
            { type: 'infographic', title: 'বর্জ্য উৎপাদনের প্রবণতা' }
          ]
        },
        mr: {
          description: "भारतातील कचरा व्यवस्थापन आव्हाने आणि पर्यावरणीय शाश्वततेसाठी योग्य कचरा व्यवस्थापनाचे महत्व जाणून घ्या.",
          resources: [
            { type: 'video', title: 'भारतातील कचरा संकट', duration: '5:20' },
            { type: 'text', title: 'मुख्य आकडेवारी आणि तथ्य' },
            { type: 'infographic', title: 'कचरा निर्मितीचे कल' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "What percentage of waste in India is scientifically treated?",
            hi: "भारत में कितने प्रतिशत कचरे का वैज्ञानिक तरीके से उपचार किया जाता है?",
            ta: "இந்தியாவில் எத்தனை சதவீத கழிவுகள் விஞ்ஞான ரீதியாக சிகிச்சை அளிக்கப்படுகின்றன?",
            te: "భారతదేశంలో ఎంత శాతం వేస్ట్ శాస్త్రీయంగా చికిత్స చేయబడుతుంది?",
            bn: "ভারতে কত শতাংশ বর্জ্য বৈজ্ঞানিকভাবে চিকিত্সা করা হয়?",
            mr: "भारतात किती टक्के कचरा वैज्ञानिक पद्धतीने उपचारित केला जातो?"
          },
          options: [
            { id: 1, text: { en: "25%", hi: "25%", ta: "25%", te: "25%", bn: "25%", mr: "25%" } },
            { id: 2, text: { en: "54%", hi: "54%", ta: "54%", te: "54%", bn: "54%", mr: "54%" } },
            { id: 3, text: { en: "70%", hi: "70%", ta: "70%", te: "70%", bn: "70%", mr: "70%" } },
            { id: 4, text: { en: "85%", hi: "85%", ta: "85%", te: "85%", bn: "85%", mr: "85%" } }
          ],
          correctAnswer: 2
        },
        {
          question: {
            en: "Which mission focuses on cleanliness in India?",
            hi: "भारत में स्वच्छता पर कौन सा मिशन केंद्रित है?",
            ta: "இந்தியாவில் சுத்தத்தில் எந்த திட்டம் கவனம் செலுத்துகிறது?",
            te: "భారతదేశంలో శుభ్రతపై ఏ మిషన్ దృష్టి పెడుతుంది?",
            bn: "ভারতে পরিষ্কার-পরিচ্ছন্নতার উপর কোন মিশন ফোকাস করে?",
            mr: "भारतात स्वच्छतेवर कोणते मिशन लक्ष्य केंद्रित करते?"
          },
          options: [
            { id: 1, text: { en: "Digital India", hi: "डिजिटल इंडिया", ta: "டிஜிட்டல் இந்தியா", te: "డిజిటల్ ఇండియా", bn: "ডিজিটাল ইন্ডিয়া", mr: "डिजिटल इंडिया" } },
            { id: 2, text: { en: "Make in India", hi: "मेक इन इंडिया", ta: "மேக் இன் இந்தியா", te: "మేక్ ఇన్ ఇండియా", bn: "মেক ইন ইন্ডিয়া", mr: "मेक इन इंडिया" } },
            { id: 3, text: { en: "Swachh Bharat Mission", hi: "स्वच्छ भारत मिशन", ta: "சுவச் பாரத் மிஷன்", te: "స్వచ్ఛ భారత్ మిషన్", bn: "স্বচ্ছ ভারত মিশন", mr: "स्वच्छ भारत मिशन" } },
            { id: 4, text: { en: "Smart Cities Mission", hi: "स्मार्ट सिटीज मिशन", ta: "ஸ்மார்ட் சிட்டீஸ் மிஷன்", te: "స్మార్ట్ సిటీస్ మిషన్", bn: "স্মার্ট সিটিজ মিশন", mr: "स्मार्ट सिटीज मिशन" } }
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
        ta: "கழிவு பிரித்தல் மற்றும் மூன்று-பெட்டி அமைப்பு",
        te: "వేస్ట్ సెగ్రిగేషన్ & త్రీ-బిన్ సిస్టమ్",
        bn: "বর্জ্য পৃথকীকরণ এবং তিন-বিন সিস্টেম",
        mr: "कचरा वेगळे करणे आणि तीन-बिन प्रणाली"
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
        {
          question: {
            en: "Which color bin is typically used for dry waste?",
            hi: "आमतौर पर सूखे कचरे के लिए किस रंग की डस्टबिन का उपयोग किया जाता है?",
            ta: "உலர் கழிவுகளுக்கு பொதுவாக எந்த வண்ணத் தொட்டி பயன்படுத்தப்படுகிறது?",
            te: "డ్రై వేస్ట్ కోసం సాధారణంగా ఏ రంగు బిన్ ఉపయోగించబడుతుంది?",
            bn: "শুকনো বর্জ্যের জন্য সাধারণত কোন রঙের বিন ব্যবহার করা হয়?",
            mr: "कोरड्या कचऱ्यासाठी सामान्यत: कोणत्या रंगाचे बिन वापरले जाते?"
          },
          options: [
            { id: 1, text: { en: "Blue", hi: "नीला", ta: "நீலம்", te: "నీలం", bn: "নীল", mr: "निळा" } },
            { id: 2, text: { en: "Green", hi: "हरा", ta: "பச்சை", te: "పచ్చ", bn: "সবুজ", mr: "हिरवा" } },
            { id: 3, text: { en: "Black", hi: "काला", ta: "கருப்பு", te: "నలుపు", bn: "কালো", mr: "काळा" } },
            { id: 4, text: { en: "Red", hi: "लाल", ta: "சிவப்பு", te: "ఎరుపు", bn: "লাল", mr: "लाल" } }
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
        ta: "இறுதி மதிப்பீடு",
        te: "ఫైనల్ అసెస్మెంట్",
        bn: "চূড়ান্ত মূল্যায়ন",
        mr: "अंतिम मूल्यांकन"
      },
      duration: "30 min",
      content: {
        en: {
          description: "Comprehensive assessment of all waste management concepts covered in the training program.",
          resources: [
            { type: 'text', title: 'Study Guide for Final Assessment' },
            { type: 'interactive', title: 'Practice Test' }
          ]
        },
        hi: {
          description: "प्रशिक्षण कार्यक्रम में शामिल सभी अपशिष्ट प्रबंधन अवधारणाओं का व्यापक मूल्यांकन।",
          resources: [
            { type: 'text', title: 'अंतिम मूल्यांकन के लिए अध्ययन गाइड' },
            { type: 'interactive', title: 'अभ्यास परीक्षण' }
          ]
        },
        ta: {
          description: "பயிற்சி திட்டத்தில் உள்ள அனைத்து கழிவு மேலாண்மை கருத்துகளின் விரிவான மதிப்பீடு.",
          resources: [
            { type: 'text', title: 'இறுதி மதிப்பீட்டிற்கான படிப்பு வழிகாட்டி' },
            { type: 'interactive', title: 'பயிற்சி சோதனை' }
          ]
        },
        te: {
          description: "ట్రెయినింగ్ ప్రోగ్రామ్‌లో కవర్ చేయబడిన అన్ని వేస్ట్ మేనేజ్మెంట్ కాన్సెప్ట్‌ల సమగ్ర అంచనా.",
          resources: [
            { type: 'text', title: 'ఫైనల్ అసెస్మెంట్ కోసం స్టడీ గైడ్' },
            { type: 'interactive', title: 'ప్రాక్టీస్ టెస్ట్' }
          ]
        },
        bn: {
          description: "প্রশিক্ষণ কর্মসূচিতে আচ্ছাদিত সমস্ত বর্জ্য ব্যবস্থাপনা ধারণার ব্যাপক মূল্যায়ন।",
          resources: [
            { type: 'text', title: 'চূড়ান্ত মূল্যায়নের জন্য স্টাডি গাইড' },
            { type: 'interactive', title: 'অনুশীলন পরীক্ষা' }
          ]
        },
        mr: {
          description: "प्रशिक्षण कार्यक्रमात समाविष्ट केलेल्या सर्व कचरा व्यवस्थापन संकल्पनांचे सर्वसमावेशक मूल्यांकन.",
          resources: [
            { type: 'text', title: 'अंतिम मूल्यांकनासाठी अभ्यास मार्गदर्शक' },
            { type: 'interactive', title: 'सराव चाचणी' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "What is the first step in effective waste management?",
            hi: "प्रभावी अपशिष्ट प्रबंधन में पहला कदम क्या है?",
            ta: "திறமையான கழிவு மேலாண்மையில் முதல் படி என்ன?",
            te: "సమర్థవంతమైన వేస్ట్ మేనేజ్మెంట్‌లో మొదటి దశ ఏమిటి?",
            bn: "কার্যকর বর্জ্য ব্যবস্থাপনার প্রথম পদক্ষেপ কি?",
            mr: "प्रभावी कचरा व्यवस्थापनात पहिली पायरी काय आहे?"
          },
          options: [
            { id: 1, text: { en: "Collection", hi: "संग्रह", ta: "சேகரிப்பு", te: "సేకరణ", bn: "সংগ্রহ", mr: "संग्रह" } },
            { id: 2, text: { en: "Segregation", hi: "पृथक्करण", ta: "பிரித்தல்", te: "విభజన", bn: "বিচ্ছেদ", mr: "विभाजन" } },
            { id: 3, text: { en: "Disposal", hi: "निपटान", ta: "அகற்றுதல்", te: "విసర్జన", bn: "নিষ্পত্তি", mr: "विल्हेवाट" } },
            { id: 4, text: { en: "Transportation", hi: "परिवहन", ta: "போக்குவரத்து", te: "రవాణా", bn: "পরিবহন", mr: "वाहतूक" } }
          ],
          correctAnswer: 2
        },
        {
          question: {
            en: "Which of the following is NOT a category in the three-bin system?",
            hi: "निम्नलिखित में से कौन सी तीन-बिन प्रणाली में एक श्रेणी नहीं है?",
            ta: "பின்வருவனவற்றில் எது மூன்று-பெட்டி அமைப்பில் ஒரு வகை அல்ல?",
            te: "కింది వాటిలో ఏది త్రీ-బిన్ సిస్టమ్‌లో కేటగిరీ కాదు?",
            bn: "নিম্নলিখিতগুলির মধ্যে কোনটি তিন-বিন সিস্টেমের একটি বিভাগ নয়?",
            mr: "खालीलपैकी कोणते तीन-बिन प्रणालीतील श्रेणी नाही?"
          },
          options: [
            { id: 1, text: { en: "Wet waste", hi: "गीला कचरा", ta: "ஈரமான கழிவு", te: "తడి వేస్ట్", bn: "ভিজা বর্জ্য", mr: "ओला कचरा" } },
            { id: 2, text: { en: "Dry waste", hi: "सूखा कचरा", ta: "உலர் கழிவு", te: "డ్రై వేస్ట్", bn: "শুকনো বর্জ্য", mr: "कोरडा कचरा" } },
            { id: 3, text: { en: "Hazardous waste", hi: "खतरनाक कचरा", ta: "அபாயகரமான கழிவு", te: "హానికరమైన వేస్ట్", bn: "বিপজ্জনক বর্জ্য", mr: "धोकादायक कचरा" } },
            { id: 4, text: { en: "Liquid waste", hi: "तरल कचरा", ta: "திரவ கழிவு", te: "లిక్విడ్ వేస్ట్", bn: "তরল বর্জ্য", mr: "द्रव कचरा" } }
          ],
          correctAnswer: 4
        }
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
    { id: 1, name: { en: 'First Lesson', hi: 'पहला पाठ', ta: 'முதல் பாடம்', te: 'మొదటి పాఠం', bn: 'প্রথম পাঠ', mr: 'पहिला धडा' }, icon: '📚', earned: true },
    { id: 2, name: { en: 'Quiz Master', hi: 'क्विज मास्टर', ta: 'வினாடி வினா மாஸ்டர்', te: 'క్విజ్ మాస్టర్', bn: 'কুইজ মাস্টার', mr: 'क्विझ मास्टर' }, icon: '🧠', earned: false },
    { id: 3, name: { en: 'Eco Warrior', hi: 'पर्यावरण योद्धा', ta: 'சூழல் வீரர்', te: 'ఈకో వారియర్', bn: 'ইকো ওয়ারিয়র', mr: 'इको वॉरियर' }, icon: '🌱', earned: false },
    { id: 4, name: { en: 'Community Leader', hi: 'समुदाय नेता', ta: 'சமூக தலைவர்', te: 'కమ్యూనిటీ లీడర్', bn: 'সম্প্রদায় নেতা', mr: 'समुदाय नेता' }, icon: '👥', earned: false },
    { id: 5, name: { en: 'Perfect Score', hi: 'पूर्ण अंक', ta: 'சரியான மதிப்பெண்', te: 'పర్ఫెక్ట్ స్కోర్', bn: 'নিখুঁত স্কোর', mr: 'परफेक्ट स्कोर' }, icon: '⭐', earned: false }
  ];

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (moduleProgress.filter(module => module.completed).length / trainingModules.length) * 100
  );

  // Check if all modules are completed
  const allModulesCompleted = moduleProgress.every(module => module.completed);

  // Calculate average score
  const completedModules = moduleProgress.filter(m => m.completed);
  const averageScore = completedModules.length > 0 
    ? Math.round(completedModules.reduce((sum, m) => sum + m.score, 0) / completedModules.length) 
    : 0;

  // Format time spent
  const formatTimeSpent = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Handle module completion
  const completeModule = (moduleIndex, score = 100) => {
    const newProgress = [...moduleProgress];
    newProgress[moduleIndex] = { completed: true, score };
    setModuleProgress(newProgress);
    
    // Update badges based on progress
    updateBadges(moduleIndex, score);
    
    // If this was the last module, show certificate
    if (moduleIndex === trainingModules.length - 1 && allModulesCompleted) {
      setTimeout(() => setShowCertificate(true), 1000);
    }
  };

  // Update badges based on user progress
  const updateBadges = (moduleIndex, score) => {
    // In a real app, this would update the badges state based on achievements
    // For now, we'll just simulate some badge earning logic
    if (moduleIndex === 0) {
      badges[0].earned = true; // First Lesson badge
    }
    if (score === 100) {
      badges[4].earned = true; // Perfect Score badge
    }
    if (moduleProgress.filter(m => m.completed).length >= 3) {
      badges[2].earned = true; // Eco Warrior badge
    }
  };

  // Handle quiz answer selection
  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    
    // Check if answer is correct
    const currentQuiz = trainingModules[currentModule].quiz[currentQuestion];
    const isCorrect = answerId === currentQuiz.correctAnswer;
    
    if (isCorrect) {
      setQuizScore(quizScore + 1);
    }
    
    // Move to next question or complete quiz
    setTimeout(() => {
      if (currentQuestion < trainingModules[currentModule].quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz completed
        const score = Math.round((quizScore + (isCorrect ? 1 : 0)) / trainingModules[currentModule].quiz.length * 100);
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
              {language === 'en' ? 'Green Champion Training' : 
               language === 'hi' ? 'ग्रीन चैंपियन प्रशिक्षण' :
               language === 'ta' ? 'கிரீன் சாம்பியன் பயிற்சி' :
               language === 'te' ? 'గ్రీన్ ఛాంపియన్ శిక్షణ' :
               language === 'bn' ? 'গ্রিন চ্যাম্পিয়ন প্রশিক্ষণ' :
               'ग्रीन चॅम्पियन प्रशिक्षण'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {language === 'en' ? 'Become a certified waste management expert and contribute to a cleaner, greener India' :
               language === 'hi' ? 'एक प्रमाणित अपशिष्ट प्रबंधन विशेषज्ञ बनें और एक स्वच्छ, हरित भारत में योगदान दें' :
               language === 'ta' ? 'ஒரு சான்றிதழ் பெற்ற கழிவு மேலாண்மை நிபுணராக மாறி, சுத்தமான, பசுமை இந்தியாவிற்கு பங்களிக்கவும்' :
                  language === 'te' ? 'ధృవీకరించబడిన వేస్ట్ మేనేజ్మెంట్ నిపుణుడిగా మారండి మరియు క్లీనర్, గ్రీనర్ ఇండియాకు దోహదపడండి' :
   language === 'bn' ? 'একটি প্রত্যয়িত বর্জ্য ব্যবস্থাপনা বিশেষজ্ঞ হয়ে উঠুন এবং একটি পরিষ্কার, সবুজ ভারতের অবদান রাখুন' :
   'प्रमाणित कचरा व्यवस्थापन तज्ञ बना आणि स्वच्छ, हिरव्या भारतात योगदान द्या'}
            </p>
            
            {/* Language Selector */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <Globe size={20} />
              <span className="font-medium">
                {language === 'en' ? 'Language: ' :
                 language === 'hi' ? 'भाषा: ' :
                 language === 'ta' ? 'மொழி: ' :
                 language === 'te' ? 'భాష: ' :
                 language === 'bn' ? 'ভাষা: ' :
                 'भाषा: '}
              </span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white text-green-900 px-3 py-1 rounded-md border-none focus:ring-2 focus:ring-emerald-300"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Clock size={18} className="mr-2" />
                <span>
                  {language === 'en' ? 'Time spent: ' :
                   language === 'hi' ? 'लगा समय: ' :
                   language === 'ta' ? 'செலவழித்த நேரம்: ' :
                   language === 'te' ? 'గడిపిన సమయం: ' :
                   language === 'bn' ? 'ব্যয় করা সময়: ' :
                   'वेळ घालवला: '}
                  {formatTimeSpent(timeSpent)}
                </span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <BarChart3 size={18} className="mr-2" />
                <span>
                  {language === 'en' ? 'Progress: ' :
                   language === 'hi' ? 'प्रगति: ' :
                   language === 'ta' ? 'முன்னேற்றம்: ' :
                   language === 'te' ? 'ప్రోగ్రెస్: ' :
                   language === 'bn' ? 'অগ্রগতি: ' :
                   'प्रगती: '}
                  {completionPercentage}%
                </span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Star size={18} className="mr-2" />
                <span>
                  {language === 'en' ? 'Avg. Score: ' :
                   language === 'hi' ? 'औसत स्कोर: ' :
                   language === 'ta' ? 'சராசரி மதிப்பெண்: ' :
                   language === 'te' ? 'సగటు స్కోరు: ' :
                   language === 'bn' ? 'গড় স্কোর: ' :
                   'सरासरी गुण: '}
                  {averageScore}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress Section */}
      <section ref={progressRef} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={progressInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              {language === 'en' ? 'Your Learning Journey' :
               language === 'hi' ? 'आपकी सीखने की यात्रा' :
               language === 'ta' ? 'உங்கள் கற்றல் பயணம்' :
               language === 'te' ? 'మీ లెర్నింగ్ జర్నీ' :
               language === 'bn' ? 'আপনার শিক্ষার যাত্রা' :
               'तुमची शिक्षण प्रवास'}
            </h2>
            
            <div className="bg-white dark:bg-green-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">
                  {language === 'en' ? 'Overall Progress' :
                   language === 'hi' ? 'कुल प्रगति' :
                   language === 'ta' ? 'மொத்த முன்னேற்றம்' :
                   language === 'te' ? 'మొత్తం ప్రోగ్రెస్' :
                   language === 'bn' ? 'সামগ্রিক অগ্রগতি' :
                   'एकूण प्रगती'}
                </span>
                <span className="font-bold">{completionPercentage}%</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-green-700 rounded-full h-4 mb-6">
                <div 
                  className="bg-emerald-500 h-4 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-emerald-100 dark:bg-green-700 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {moduleProgress.filter(m => m.completed).length}
                  </div>
                  <div className="text-sm">
                    {language === 'en' ? 'Completed' :
                     language === 'hi' ? 'पूर्ण हुए' :
                     language === 'ta' ? 'முடிந்தது' :
                     language === 'te' ? 'పూర్తయింది' :
                     language === 'bn' ? 'সম্পন্ন' :
                     'पूर्ण झाले'}
                  </div>
                </div>
                
                <div className="bg-amber-100 dark:bg-amber-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                    {trainingModules.length - moduleProgress.filter(m => m.completed).length}
                  </div>
                  <div className="text-sm">
                    {language === 'en' ? 'Remaining' :
                     language === 'hi' ? 'शेष' :
                     language === 'ta' ? 'மீதம்' :
                     language === 'te' ? 'మిగిలినవి' :
                     language === 'bn' ? 'অবশিষ্ট' :
                     'उर्वरित'}
                  </div>
                </div>
                
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {averageScore}%
                  </div>
                  <div className="text-sm">
                    {language === 'en' ? 'Avg. Score' :
                     language === 'hi' ? 'औसत स्कोर' :
                     language === 'ta' ? 'சராசரி மதிப்பெண்' :
                     language === 'te' ? 'సగటు స్కోరు' :
                     language === 'bn' ? 'গড় স্কোর' :
                     'सरासरी गुण'}
                  </div>
                </div>
                
                <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {badges.filter(b => b.earned).length}
                  </div>
                  <div className="text-sm">
                    {language === 'en' ? 'Badges' :
                     language === 'hi' ? 'बैज' :
                     language === 'ta' ? 'பேட்ஜ்கள்' :
                     language === 'te' ? 'బ్యాడ్జ్‌లు' :
                     language === 'bn' ? 'ব্যাজ' :
                     'बॅजेस'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Module Content Section */}
      <section ref={moduleRef} className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={moduleInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Module Navigation */}
              <div className="lg:w-1/4">
                <div className="bg-emerald-50 dark:bg-green-700 rounded-xl shadow-md p-6 sticky top-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <BookOpen size={20} className="mr-2" />
                    {language === 'en' ? 'Training Modules' :
                     language === 'hi' ? 'प्रशिक्षण मॉड्यूल' :
                     language === 'ta' ? 'பயிற்சி தொகுதிகள்' :
                     language === 'te' ? 'ట్రైనింగ్ మాడ్యూల్స్' :
                     language === 'bn' ? 'প্রশিক্ষণ মডিউল' :
                     'प्रशिक्षण मॉड्युल्स'}
                  </h3>
                  
                  <div className="space-y-2">
                    {trainingModules.map((module, index) => (
                      <div
                        key={module.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          currentModule === index
                            ? 'bg-emerald-500 text-white shadow-md'
                            : moduleProgress[index].completed
                            ? 'bg-emerald-100 dark:bg-green-600 text-emerald-800 dark:text-emerald-100'
                            : 'bg-gray-100 dark:bg-green-800 hover:bg-gray-200 dark:hover:bg-green-700'
                        }`}
                        onClick={() => setCurrentModule(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {moduleProgress[index].completed ? (
                              <CheckCircle size={16} className="mr-2" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-emerald-500 mr-2"></div>
                            )}
                            <span className="text-sm font-medium">
                              {module.title[language]}
                            </span>
                          </div>
                          <Clock size={14} />
                        </div>
                        <div className="text-xs mt-1 ml-6">
                          {module.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Current Module Content */}
              <div className="lg:w-3/4">
                <div className="bg-white dark:bg-green-700 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-emerald-100 dark:border-green-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {trainingModules[currentModule].title[language]}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-emerald-200 mt-1 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {trainingModules[currentModule].duration}
                        </p>
                      </div>
                      
                      {moduleProgress[currentModule].completed ? (
                        <div className="bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          {language === 'en' ? 'Completed' :
                           language === 'hi' ? 'पूर्ण' :
                           language === 'ta' ? 'முடிந்தது' :
                           language === 'te' ? 'పూర్తయింది' :
                           language === 'bn' ? 'সম্পন্ন' :
                           'पूर्ण झाले'}
                        </div>
                      ) : (
                        <div className="bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-100 px-3 py-1 rounded-full text-sm font-medium">
                          {language === 'en' ? 'In Progress' :
                           language === 'hi' ? 'चालू' :
                           language === 'ta' ? 'நடப்பில்' :
                           language === 'te' ? 'ప్రోగ్రెస్‌లో ఉంది' :
                           language === 'bn' ? 'চলমান' :
                           'प्रगतीपथावर'}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 dark:text-emerald-100 mb-6">
                      {trainingModules[currentModule].content[language].description}
                    </p>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={prevModule}
                        disabled={currentModule === 0}
                        className={`px-4 py-2 rounded-lg flex items-center ${
                          currentModule === 0
                            ? 'bg-gray-200 dark:bg-green-800 text-gray-400 dark:text-green-400 cursor-not-allowed'
                            : 'bg-emerald-100 dark:bg-green-600 text-emerald-800 dark:text-white hover:bg-emerald-200 dark:hover:bg-green-500'
                        }`}
                      >
                        <ChevronLeft size={16} className="mr-1" />
                        {language === 'en' ? 'Previous' :
                         language === 'hi' ? 'पिछला' :
                         language === 'ta' ? 'முந்தைய' :
                         language === 'te' ? 'మునుపటి' :
                         language === 'bn' ? 'পূর্ববর্তী' :
                         'मागील'}
                      </button>
                      
                      <button
                        onClick={nextModule}
                        disabled={currentModule === trainingModules.length - 1}
                        className={`px-4 py-2 rounded-lg flex items-center ${
                          currentModule === trainingModules.length - 1
                            ? 'bg-gray-200 dark:bg-green-800 text-gray-400 dark:text-green-400 cursor-not-allowed'
                            : 'bg-emerald-100 dark:bg-green-600 text-emerald-800 dark:text-white hover:bg-emerald-200 dark:hover:bg-green-500'
                        }`}
                      >
                        {language === 'en' ? 'Next' :
                         language === 'hi' ? 'अगला' :
                         language === 'ta' ? 'அடுத்தது' :
                         language === 'te' ? 'తదుపరి' :
                         language === 'bn' ? 'পরবর্তী' :
                         'पुढील'}
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                      <FileText size={20} className="mr-2" />
                      {language === 'en' ? 'Learning Resources' :
                       language === 'hi' ? 'सीखने के संसाधन' :
                       language === 'ta' ? 'கற்றல் வளங்கள்' :
                       language === 'te' ? 'నేర్చుకునే వనరులు' :
                       language === 'bn' ? 'শেখার সম্পদ' :
                       'शिक्षण संसाधने'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {trainingModules[currentModule].content[language].resources.map((resource, index) => (
                        <motion.div
                          key={index}
                          variants={scaleIn}
                          className="bg-emerald-50 dark:bg-green-600 p-4 rounded-lg border border-emerald-100 dark:border-green-500 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start">
                            {resource.type === 'video' && <Play size={20} className="text-emerald-600 dark:text-emerald-300 mr-3 mt-1" />}
                            {resource.type === 'text' && <FileText size={20} className="text-emerald-600 dark:text-emerald-300 mr-3 mt-1" />}
                            {resource.type === 'infographic' && <BarChart3 size={20} className="text-emerald-600 dark:text-emerald-300 mr-3 mt-1" />}
                            {resource.type === 'interactive' && <Award size={20} className="text-emerald-600 dark:text-emerald-300 mr-3 mt-1" />}
                            
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              {resource.duration && (
                                <p className="text-sm text-gray-500 dark:text-emerald-200 mt-1">
                                  {resource.duration}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {!moduleProgress[currentModule].completed && (
                      <button
                        onClick={startQuiz}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
                      >
                        <Award size={20} className="mr-2" />
                        {language === 'en' ? 'Take Quiz' :
                         language === 'hi' ? 'क्विज लें' :
                         language === 'ta' ? 'வினாடி வினா எடுக்கவும்' :
                         language === 'te' ? 'క్విజ్ తీసుకోండి' :
                         language === 'bn' ? 'কুইজ নিন' :
                         'क्विझ घ्या'}
                      </button>
                    )}
                    
                    {moduleProgress[currentModule].completed && (
                      <div className="bg-emerald-100 dark:bg-emerald-800 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                        <div className="flex items-center">
                          <CheckCircle size={24} className="text-emerald-600 dark:text-emerald-300 mr-3" />
                          <div>
                            <h4 className="font-medium">
                              {language === 'en' ? 'Module Completed!' :
                               language === 'hi' ? 'मॉड्यूल पूरा हुआ!' :
                               language === 'ta' ? 'தொகுதி முடிந்தது!' :
                               language === 'te' ? 'మాడ్యూల్ పూర్తయింది!' :
                               language === 'bn' ? 'মডিউল সম্পন্ন হয়েছে!' :
                               'मॉड्यूल पूर्ण झाले!'}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-emerald-200">
                              {language === 'en' ? `Your score: ${moduleProgress[currentModule].score}%` :
                               language === 'hi' ? `आपका स्कोर: ${moduleProgress[currentModule].score}%` :
                               language === 'ta' ? `உங்கள் மதிப்பெண்: ${moduleProgress[currentModule].score}%` :
                               language === 'te' ? `మీ స్కోరు: ${moduleProgress[currentModule].score}%` :
                               language === 'bn' ? `আপনার স্কোর: ${moduleProgress[currentModule].score}%` :
                               `तुमचे गुण: ${moduleProgress[currentModule].score}%`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Badges & Achievements Section */}
      <section ref={badgesRef} className="py-12 px-4 sm:px-6 lg:px-8 bg-emerald-50 dark:bg-green-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={badgesInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              {language === 'en' ? 'Badges & Achievements' :
               language === 'hi' ? 'बैज और उपलब्धियां' :
               language === 'ta' ? 'பேட்ஜ்கள் & சாதனைகள்' :
               language === 'te' ? 'బ్యాడ్జ్‌లు & సాధనలు' :
               language === 'bn' ? 'ব্যাজ ও অর্জন' :
               'बॅजेस आणि कामगिरी'}
            </h2>
            
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  variants={scaleIn}
                  className={`bg-white dark:bg-green-800 rounded-xl p-4 text-center shadow-md ${
                    badge.earned ? 'ring-2 ring-emerald-500' : 'opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h3 className="font-medium text-sm">
                    {badge.name[language]}
                  </h3>
                  <div className="mt-2 text-xs">
                    {badge.earned ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle size={12} className="mr-1" />
                        {language === 'en' ? 'Earned' :
                         language === 'hi' ? 'अर्जित' :
                         language === 'ta' ? 'பெறப்பட்டது' :
                         language === 'te' ? 'సంపాదించబడింది' :
                         language === 'bn' ? 'অর্জিত' :
                         'मिळवले'}
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-green-400">
                        {language === 'en' ? 'Locked' :
                         language === 'hi' ? 'लॉक्ड' :
                         language === 'ta' ? 'பூட்டப்பட்டது' :
                         language === 'te' ? 'లాక్ చేయబడింది' :
                         language === 'bn' ? 'তালাবদ্ধ' :
                         'लॉक केले'}
                      </span>
                    )}
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
              className="bg-white dark:bg-green-800 rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  {language === 'en' ? 'Module Quiz' :
                   language === 'hi' ? 'मॉड्यूल क्विज' :
                   language === 'ta' ? 'தொகுதி வினாடி வினா' :
                   language === 'te' ? 'మాడ్యూల్ క్విజ్' :
                   language === 'bn' ? 'মডিউল কুইজ' :
                   'मॉड्यूल क्विझ'}
                </h3>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-green-300 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 dark:text-green-300 mb-2">
                  <span>
                    {language === 'en' ? `Question ${currentQuestion + 1} of ${trainingModules[currentModule].quiz.length}` :
                     language === 'hi' ? `प्रश्न ${currentQuestion + 1} / ${trainingModules[currentModule].quiz.length}` :
                     language === 'ta' ? `கேள்வி ${currentQuestion + 1} / ${trainingModules[currentModule].quiz.length}` :
                     language === 'te' ? `ప్రశ్న ${currentQuestion + 1} / ${trainingModules[currentModule].quiz.length}` :
                     language === 'bn' ? `প্রশ্ন ${currentQuestion + 1} / ${trainingModules[currentModule].quiz.length}` :
                     `प्रश्न ${currentQuestion + 1} / ${trainingModules[currentModule].quiz.length}`}
                  </span>
                  <span>
                    {language === 'en' ? `Score: ${quizScore}/${currentQuestion}` :
                     language === 'hi' ? `स्कोर: ${quizScore}/${currentQuestion}` :
                     language === 'ta' ? `மதிப்பெண்: ${quizScore}/${currentQuestion}` :
                     language === 'te' ? `స్కోరు: ${quizScore}/${currentQuestion}` :
                     language === 'bn' ? `স্কোর: ${quizScore}/${currentQuestion}` :
                     `गुण: ${quizScore}/${currentQuestion}`}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-green-700 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / trainingModules[currentModule].quiz.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-4 text-lg">
                  {trainingModules[currentModule].quiz[currentQuestion].question[language]}
                </h4>
                
                <div className="space-y-3">
                  {trainingModules[currentModule].quiz[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedAnswer === option.id
                          ? option.id === trainingModules[currentModule].quiz[currentQuestion].correctAnswer
                            ? 'bg-emerald-100 dark:bg-emerald-800 border-emerald-500 text-emerald-800 dark:text-emerald-100'
                            : 'bg-rose-100 dark:bg-rose-800 border-rose-500 text-rose-800 dark:text-rose-100'
                          : 'border-gray-300 dark:border-green-600 hover:border-emerald-400 dark:hover:border-emerald-400'
                      }`}
                    >
                      {option.text[language]}
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedAnswer && (
                <div className={`p-3 rounded-lg mb-4 ${
                  selectedAnswer === trainingModules[currentModule].quiz[currentQuestion].correctAnswer
                    ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100'
                    : 'bg-rose-100 dark:bg-rose-800 text-rose-800 dark:text-rose-100'
                }`}>
                  {selectedAnswer === trainingModules[currentModule].quiz[currentQuestion].correctAnswer ? (
                    <span className="flex items-center">
                      <CheckCircle size={16} className="mr-2" />
                      {language === 'en' ? 'Correct! Well done.' :
                       language === 'hi' ? 'सही! बहुत अच्छे।' :
                       language === 'ta' ? 'சரி! நல்லது.' :
                       language === 'te' ? 'సరైనది! చాలా బాగుంది.' :
                       language === 'bn' ? 'সঠিক! ভালো কাজ।' :
                       'बरोबर! छान काम केलं.'}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <X size={16} className="mr-2" />
                      {language === 'en' ? 'Incorrect. Try again next time.' :
                       language === 'hi' ? 'गलत। अगली बार फिर से कोशिश करें।' :
                       language === 'ta' ? 'தவறு. அடுத்த முறை மீண்டும் முயற்சிக்கவும்.' :
                       language === 'te' ? 'తప్పు. తదుపరి సారి మళ్లీ ప్రయత్నించండి.' :
                       language === 'bn' ? 'ভুল। পরের বার আবার চেষ্টা করুন।' :
                       'चूक झाली. पुढच्या वेळी पुन्हा प्रयत्न करा.'}
                    </span>
                  )}
                </div>
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
              className="bg-white dark:bg-green-800 rounded-xl shadow-xl max-w-2xl w-full p-8 relative"
            >
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-green-300 dark:hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="text-center border-4 border-emerald-500 dark:border-emerald-400 p-8 rounded-lg">
                <div className="mb-6">
                  <Trophy size={48} className="mx-auto text-amber-500 mb-4" />
                  <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                    {language === 'en' ? 'Certificate of Completion' :
                     language === 'hi' ? 'पूर्णता प्रमाणपत्र' :
                     language === 'ta' ? 'நிறைவு சான்றிதழ்' :
                     language === 'te' ? 'పూర్తి సర్టిఫికేట్' :
                     language === 'bn' ? 'সমাপ্তি সার্টিফিকেট' :
                     'पूर्णता प्रमाणपत्र'}
                  </h2>
                  <p className="text-gray-600 dark:text-emerald-200">
                    {language === 'en' ? 'This certifies that' :
                     language === 'hi' ? 'यह प्रमाणित करता है कि' :
                     language === 'ta' ? 'இது சான்றளிக்கிறது' :
                     language === 'te' ? 'ఇది ధ్రువీకరిస్తుంది' :
                     language === 'bn' ? 'এটি প্রত্যয়িত করে' :
                     'हे प्रमाणित करते'}
                  </p>
                </div>
                
                <h3 className="text-2xl font-bold text-emerald-800 dark:text-white mb-4">{userName}</h3>
                
                <p className="text-gray-700 dark:text-emerald-100 mb-6">
                  {language === 'en' ? 'has successfully completed the Green Champion Training Program and demonstrated proficiency in waste management practices.' :
                   language === 'hi' ? 'ने ग्रीन चैंपियन प्रशिक्षण कार्यक्रम सफलतापूर्वक पूरा किया है और अपशिष्ट प्रबंधन प्रथाओं में दक्षता प्रदर्शित की है।' :
                   language === 'ta' ? 'கிரீன் சாம்பியன் பயிற்சி திட்டத்தை வெற்றிகரமாக முடித்துள்ளார் மற்றும் கழிவு மேலாண்மை நடைமுறைகளில் திறமையை நிரூபித்துள்ளார்.' :
                   language === 'te' ? 'గ్రీన్ ఛాంపియన్ శిక్షణ కార్యక్రమాన్ని విజయవంతంగా పూర్తి చేసి, వేస్ట్ మేనేజ్మెంట్ పద్ధతులలో ప్రావీణ్యాన్ని ప్రదర్శించారు.' :
                   language === 'bn' ? 'গ্রিন চ্যাম্পিয়ন প্রশিক্ষণ 프로그램 সফলভাবে সম্পন্ন করেছে এবং বর্জ্য ব্যবস্থাপনা অনুশীলনে দক্ষতা প্রদর্শন করেছে।' :
                   'ग्रीन चॅम्पियन प्रशिक्षण कार्यक्रम यशस्वीरित्या पूर्ण केला आहे आणि कचरा व्यवस्थापन पद्धतींमध्ये कुशलता दर्शविली आहे.'}
                </p>
                
                <div className="flex justify-between items-center mt-8">
                  <div>
                    <div className="h-0.5 bg-gray-300 dark:bg-green-600 mb-1"></div>
                    <p className="text-sm text-gray-600 dark:text-emerald-200">
                      {language === 'en' ? 'Date' :
                       language === 'hi' ? 'तारीख' :
                       language === 'ta' ? 'தேதி' :
                       language === 'te' ? 'తేదీ' :
                       language === 'bn' ? 'তারিখ' :
                       'तारीख'}
                    </p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <div className="h-0.5 bg-gray-300 dark:bg-green-600 mb-1"></div>
                                    <p className="text-sm text-gray-600 dark:text-emerald-200">
                  {language === 'en' ? 'Score' :
                   language === 'hi' ? 'स्कोर' :
                   language === 'ta' ? 'மதிப்பெண்' :
                   language === 'te' ? 'స్కోరు' :
                   language === 'bn' ? 'স্কোর' :
                   'गुण'}
                </p>
                <p>{averageScore}%</p>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="h-0.5 bg-gray-300 dark:bg-green-600 w-48 mx-auto mb-1"></div>
              <p className="text-sm text-gray-600 dark:text-emerald-200">
                {language === 'en' ? 'Green India Initiative' :
                 language === 'hi' ? 'ग्रीन इंडिया पहल' :
                 language === 'ta' ? 'கிரீன் இந்தியா முயற்சி' :
                 language === 'te' ? 'గ్రీన్ ఇండియా ఇనిషియేటివ్' :
                 language === 'bn' ? 'গ্রিন ইন্ডিয়া উদ্যোগ' :
                 'ग्रीन इंडिया उपक्रम'}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={downloadCertificate}
              className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <Download size={20} className="mr-2" />
              {language === 'en' ? 'Download' :
               language === 'hi' ? 'डाउनलोड' :
               language === 'ta' ? 'பதிவிறக்க' :
               language === 'te' ? 'డౌన్లోడ్' :
               language === 'bn' ? 'ডাউনলোড' :
               'डाउनलोड'}
            </button>
            
            <button
              onClick={shareCertificate}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <Share2 size={20} className="mr-2" />
              {language === 'en' ? 'Share' :
               language === 'hi' ? 'शेयर' :
               language === 'ta' ? 'பகிர்' :
               language === 'te' ? 'షేర్ చేయండి' :
               language === 'bn' ? 'শেয়ার' :
               'शेअर'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Footer
  <footer className="bg-green-900 text-white py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold flex items-center">
            <Recycle className="mr-2" />
            {language === 'en' ? 'Green Champion Training' :
             language === 'hi' ? 'ग्रीन चैंपियन प्रशिक्षण' :
             language === 'ta' ? 'கிரீன் சாம்பியன் பயிற்சி' :
             language === 'te' ? 'గ్రీన్ ఛాంపియన్ ట్రైనింగ్' :
             language === 'bn' ? 'গ্রিন চ্যাম্পিয়ন প্রশিক্ষণ' :
             'ग्रीन चॅम्पियन प्रशिक्षण'}
          </h3>
          <p className="text-emerald-200 text-sm mt-1">
            {language === 'en' ? 'Empowering citizens for sustainable waste management' :
             language === 'hi' ? 'सतत अपशिष्ट प्रबंधन के लिए नागरिकों को सशक्त बनाना' :
             language === 'ta' ? 'நிலையான கழிவு மேலாண்மைக்காக குடிமக்களை அதிகாரபூர்வமாக்குதல்' :
             language === 'te' ? 'స్థిరమైన వేస్ట్ మేనేజ్మెంట్ కోసం పౌరులను సశక్తీకరించడం' :
             language === 'bn' ? 'টেকসই বর্জ্য ব্যবস্থাপনার জন্য নাগরিকদের ক্ষমতায়ন' :
             'शाश्वत कचरा व्यवस्थापनासाठी नागरिकांना सक्षम करणे'}
          </p>
        </div>
        
        <div className="flex space-x-4">
          <a href="#" className="text-emerald-200 hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-emerald-200 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-emerald-200 hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-emerald-200 hover:text-white transition-colors">
            <Youtube size={20} />
          </a>
        </div>
      </div>
      
      <div className="border-t border-emerald-800 mt-6 pt-6 text-sm text-emerald-300 text-center">
        <p>
          {language === 'en' ? '© 2023 Green India Initiative. All rights reserved.' :
           language === 'hi' ? '© 2023 ग्रीन इंडिया पहल। सर्वाधिकार सुरक्षित।' :
           language === 'ta' ? '© 2023 கிரீன் இந்தியா முயற்சி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' :
           language === 'te' ? '© 2023 గ్రీన్ ఇండియా ఇనిషియేటివ్. అన్ని హక్కులు రక్షించబడ్డాయి.' :
           language === 'bn' ? '© 2023 গ্রিন ইন্ডিয়া উদ্যোগ। সর্বস্বত্ব সংরক্ষিত।' :
           '© 2023 ग्रीन इंडिया उपक्रम. सर्व हक्क राखीव.'}
        </p>
      </div>
    </div>
  </footer> */}
</div>
);
};

export default Training;