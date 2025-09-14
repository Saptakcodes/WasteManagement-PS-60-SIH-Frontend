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
  Lock,
  Unlock,
  Home,
  Share,
  Print
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Training2 = () => {
  // State for module progress
  const [currentModule, setCurrentModule] = useState(0);
  const [moduleProgress, setModuleProgress] = useState(
    Array(8).fill(false).map(() => ({ completed: false, score: 0, unlocked: false }))
  );
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [language, setLanguage] = useState('en');
  const [userName, setUserName] = useState('Green Champion');
  const [activeTab, setActiveTab] = useState('modules');
  
  // Unlock first module initially
  useEffect(() => {
    const newProgress = [...moduleProgress];
    newProgress[0] = { ...newProgress[0], unlocked: true };
    setModuleProgress(newProgress);
  }, []);

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
        ta: "கழிவு மேலாண்மை அறிமுகம்",
        te: "వేస్ట్ మేనేజ్మెంట్ పరిచయం",
        bn: "বর্জ্য ব্যবস্থাপনার পরিচয়",
        mr: "कचरा व्यवस्थापनाचा परिचय"
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
          description: "భారతదేశం యొక్క వేస్ట్ మేనేజ్మెంట్ సవాళ్లు మరియు పర్యావరణ స్థిరత్వం కోసం సరైన వేస్ట్ నిర్వహణ యొక్క ప్రాముఖ్యత గురించి తెలుసుకోండి.",
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
            { type: 'video', title: 'भारतात कचरा संकट', duration: '5:20' },
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
            mr: "भारतात किती टक्के कचऱ्याचे वैज्ञानिक पद्धतीने उपचार केले जाते?"
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
            te: "భారతదేశంలో శుభ్రతపై దృష్టి సారించిన మిషన్ ఏది?",
            bn: "ভারতে পরিচ্ছন্নতার উপর কোন মিশন ফোকাস করে?",
            mr: "भारतात स्वच्छतेवर कोणते मिशन लक्ष केंद्रित करते?"
          },
          options: [
            { id: 1, text: { en: "Digital India", hi: "डिजिटल इंडिया", ta: "டிஜிட்டல் இந்தியா", te: "డిజిటల్ ఇండియా", bn: "ডিজিটাল ইন্ডিয়া", mr: "डिजिटल इंडिया" } },
            { id: 2, text: { en: "Make in India", hi: "मेक इन इंडिया", ta: "மேக் இன் இந்தியா", te: "మేక్ ఇన్ ఇండియా", bn: "মেক ইন ইন্ডিয়া", mr: "मेक इन इंडिया" } },
            { id: 3, text: { en: "Swachh Bharat Mission", hi: "स्वच्छ भारत मिशन", ta: "சுவச் பாரத் மிஷன்", te: "స్వచ్ఛ్ భారత్ మిషన్", bn: "স্বচ্ছ ভারত মিশন", mr: "स्वच्छ भारत मिशन" } },
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
            te: "పొడి వేస్ట్ కోసం సాధారణంగా ఏ రంగు బిన్ ఉపయోగించబడుతుంది?",
            bn: "শুষ্ক বর্জ্যের জন্য সাধারণত কোন রঙের বিন ব্যবহার করা হয়?",
            mr: "कोरड्या कचऱ्यासाठी सामान्यत: कोणत्या रंगाचे कचरापेटी वापरले जाते?"
          },
          options: [
            { id: 1, text: { en: "Blue", hi: "नीला", ta: "நீலம்", te: "నీలం", bn: "নীল", mr: "निळा" } },
            { id: 2, text: { en: "Green", hi: "हरा", ta: "பச்சை", te: "పచ్చ", bn: "সবুজ", mr: "हिरवा" } },
            { id: 3, text: { en: "Black", hi: "काला", ta: "கருப்பு", te: "నలుపు", bn: "কালো", mr: "काळा" } },
            { id: 4, text: { en: "Red", hi: "लाल", ta: "சிவப்பு", te: "ఎరుపు", bn: "লাল", mr: "लाल" } }
          ],
          correctAnswer: 1
        },
        {
          question: {
            en: "What type of waste should go in green bins?",
            hi: "हरे डब्बे में किस प्रकार का कचरा डालना चाहिए?",
            ta: "பச்சை தொட்டிகளில் எந்த வகை கழிவுகள் போக வேண்டும்?",
            te: "ఆకుపచ్చ బిన్లలో ఎలాంటి వేస్ట్ వెళ్లాలి?",
            bn: "কোন ধরনের বর্জ্য সবুজ বিনে যাওয়া উচিত?",
            mr: "कोणत्या प्रकारचा कचरा हिरव्या कचरापेटीत जावा?"
          },
          options: [
            { id: 1, text: { en: "Plastic", hi: "प्लास्टिक", ta: "பிளாஸ்டிக்", te: "ప్లాస్టిక్", bn: "প্লাস্টিক", mr: "प्लॅस्टिक" } },
            { id: 2, text: { en: "Paper", hi: "कागज", ta: "காகிதம்", te: "కాగితం", bn: "কাগজ", mr: "कागद" } },
            { id: 3, text: { en: "Food waste", hi: "खाद्य अपशिष्ट", ta: "உணவு கழிவு", te: "ఆహార వేస్ట్", bn: "খাদ্য বর্জ্য", mr: "अन्न टाकाऊ" } },
            { id: 4, text: { en: "Glass", hi: "कांच", ta: "கண்ணாடி", te: "గాజు", bn: "কাচ", mr: "काच" } }
          ],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 3,
      title: {
        en: "Composting Techniques",
        hi: "कम्पोस्टिंग तकनीक",
        ta: "கம்போஸ்டிங் நுட்பங்கள்",
        te: "కంపోస్టింగ్ పద్ధతులు",
        bn: "কম্পোস্টিং কৌশল",
        mr: "कंपोस्टिंग तंत्रज्ञान"
      },
      duration: "25 min",
      content: {
        en: {
          description: "Learn various composting methods to convert organic waste into nutrient-rich compost for plants.",
          resources: [
            { type: 'video', title: 'Home Composting Guide', duration: '9:15' },
            { type: 'text', title: 'Types of Composting' },
            { type: 'infographic', title: 'Composting Process' },
            { type: 'interactive', title: 'Composting Simulation' }
          ]
        },
        hi: {
          description: "पौधों के लिए पोषक तत्वों से भरपूर खाद बनाने के लिए कार्बनिक कचरे को परिवर्तित करने की विभिन्न कम्पोस्टिंग विधियों के बारे में जानें।",
          resources: [
            { type: 'video', title: 'घर पर कम्पोस्टिंग गाइड', duration: '9:15' },
            { type: 'text', title: 'कम्पोस्टिंग के प्रकार' },
            { type: 'infographic', title: 'कम्पोस्टिंग प्रक्रिया' },
            { type: 'interactive', title: 'कम्पोस्टिंग सिमुलेशन' }
          ]
        },
        ta: {
          description: "தாவரங்களுக்கான ஊட்டச்சத்து நிறைந்த குழைவை உருவாக்க கரிம கழிவுகளை மாற்ற பல்வேறு கம்போஸ்டிங் முறைகளைக் கற்றுக்கொள்ளுங்கள்.",
          resources: [
            { type: 'video', title: 'வீட்டு கம்போஸ்டிங் வழிகாட்டி', duration: '9:15' },
            { type: 'text', title: 'கம்போஸ்டிங் வகைகள்' },
            { type: 'infographic', title: 'கம்போஸ்டிங் செயல்முறை' },
            { type: 'interactive', title: 'கம்போஸ்டிங் சிமுலேஷன்' }
          ]
        },
        te: {
          description: "ప్లాంట్లకు పోషకాలతో సమృద్ధిగా ఉండే కంపోస్ట్గా ఆర్గానిక్ వేస్ట్ను మార్చడానికి వివిధ కంపోస్టింగ్ పద్ధతులను నేర్చుకోండి.",
          resources: [
            { type: 'video', title: 'హోమ్ కంపోస్టింగ్ గైడ్', duration: '9:15' },
            { type: 'text', title: 'కంపోస్టింగ్ రకాలు' },
            { type: 'infographic', title: 'కంపోస్టింగ్ ప్రక్రియ' },
            { type: 'interactive', title: 'కంపోస్టింగ్ సిమ్యులేషన్' }
          ]
        },
        bn: {
          description: "গাছের জন্য পুষ্টি সমৃদ্ধ কম্পোস্টে জৈব বর্জ্য রূপান্তর করতে বিভিন্ন কম্পোস্টিং পদ্ধতি শিখুন।",
          resources: [
            { type: 'video', title: 'হোম কম্পোস্টিং গাইড', duration: '9:15' },
            { type: 'text', title: 'কম্পোস্টিং এর প্রকারভেদ' },
            { type: 'infographic', title: 'কম্পোস্টিং প্রক্রিয়া' },
            { type: 'interactive', title: 'কম্পোস্টিং সিমুলেশন' }
          ]
        },
        mr: {
          description: "वनस्पतींसाठी पोषकद्रव्यांनी समृद्ध कंपोस्ट तयार करण्यासाठी सेंद्रिय कचरा रूपांतरित करण्याच्या विविध कंपोस्टिंग पद्धती जाणून घ्या.",
          resources: [
            { type: 'video', title: 'घरगुती कंपोस्टिंग मार्गदर्शक', duration: '9:15' },
            { type: 'text', title: 'कंपोस्टिंगचे प्रकार' },
            { type: 'infographic', title: 'कंपोस्टिंग प्रक्रिया' },
            { type: 'interactive', title: 'कंपोस्टिंग सिम्युलेशन' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "Which of these is NOT suitable for composting?",
            hi: "इनमें से कौन सा कम्पोस्टिंग के लिए उपयुक्त नहीं है?",
            ta: "இவற்றில் எது கம்போஸ்டிங்கிற்கு ஏற்றதல்ல?",
            te: "ఈ క్రింది వాటిలో ఏది కంపోస్టింగ్ కు అనుకూలంగా లేదు?",
            bn: "নিচের কোনটি কম্পোস্টিং এর জন্য উপযুক্ত নয়?",
            mr: "यापैकी कोणते कंपोस्टिंगसाठी योग्य नाही?"
          },
          options: [
            { id: 1, text: { en: "Vegetable peels", hi: "सब्जी के छिलके", ta: "காய்கறி தோல்கள்", te: "కూరగాయల తొక్కలు", bn: "সবজির খোসা", mr: "भाजीपाल्याची साल" } },
            { id: 2, text: { en: "Egg shells", hi: "अंडे के छिलके", ta: "முட்டை ஓடுகள்", te: "గుడ్డు టోపీలు", bn: "ডিমের খোসা", mr: "अंड्याची कवच" } },
            { id: 3, text: { en: "Plastic bags", hi: "प्लास्टिक की थैलियाँ", ta: "பிளாஸ்டிக் பைகள்", te: "ప్లాస్టిక్ సంచులు", bn: "প্লাস্টিকের ব্যাগ", mr: "प्लॅस्टिकचे पिशव्या" } },
            { id: 4, text: { en: "Coffee grounds", hi: "कॉफी की सतह", ta: "காபி துகள்கள்", te: "కాఫీ మైదానాలు", bn: "কফির ভুসি", mr: "कॉफी ग्राउंड" } }
          ],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 4,
      title: {
        en: "Recycling Processes",
        hi: "रीसाइक्लिंग प्रक्रियाएं",
        ta: "மறுசுழற்சி செயல்முறைகள்",
        te: "రీసైక్లింగ్ ప్రక్రియలు",
        bn: "পুনর্ব্যবহার প্রক্রিয়া",
        mr: "पुनर्वापर प्रक्रिया"
      },
      duration: "20 min",
      content: {
        en: {
          description: "Understand the recycling journey of different materials and how to properly prepare items for recycling.",
          resources: [
            { type: 'video', title: 'Recycling Journey', duration: '6:30' },
            { type: 'text', title: 'Recycling Guidelines' },
            { type: 'infographic', title: 'Recycling Symbols' },
            { type: 'interactive', title: 'Recycling Sorting Game' }
          ]
        },
        hi: {
          description: "विभिन्न सामग्रियों की रीसाइक्लिंग यात्रा और रीसाइक्लिंग के लिए वस्तुओं को ठीक से तैयार करने का तरीका समझें।",
          resources: [
            { type: 'video', title: 'रीसाइक्लिंग यात्रा', duration: '6:30' },
            { type: 'text', title: 'रीसाइक्लिंग दिशानिर्देश' },
            { type: 'infographic', title: 'रीसाइक्लिंग प्रतीक' },
            { type: 'interactive', title: 'रीसाइक्लिंग सॉर्टिंग गेम' }
          ]
        },
        ta: {
          description: "பல்வேறு பொருட்களின் மறுசுழற்சி பயணம் மற்றும் மறுசுழற்சிக்கான பொருட்களை சரியாக எவ்வாறு தயாரிப்பது என்பதைப் புரிந்து கொள்ளுங்கள்.",
          resources: [
            { type: 'video', title: 'மறுசுழற்சி பயணம்', duration: '6:30' },
            { type: 'text', title: 'மறுசுழற்சி வழிகாட்டுதல்கள்' },
            { type: 'infographic', title: 'மறுசுழற்சி சின்னங்கள்' },
            { type: 'interactive', title: 'மறுசுழற்சி வரிசைப்படுத்தும் விளையாட்டு' }
          ]
        },
        te: {
          description: "విభిన్న పదార్ధాల రీసైక్లింగ్ ప్రయాణం మరియు రీసైక్లింగ్ కోసం వస్తువులను సరిగ్గా ఎలా సిద్ధం చేయాలో అర్థం చేసుకోండి.",
          resources: [
            { type: 'video', title: 'రీసైక్లింగ్ యాత్ర', duration: '6:30' },
            { type: 'text', title: 'రీసైక్లింగ్ మార్గదర్శకాలు' },
            { type: 'infographic', title: 'రీసైక్లింగ్ చిహ్నాలు' },
            { type: 'interactive', title: 'రీసైక్లింగ్ సార్టింగ్ గేమ్' }
          ]
        },
        bn: {
          description: "বিভিন্ন উপকরণের পুনর্ব্যবহার যাত্রা এবং পুনর্ব্যবহারের জন্য আইটেমগুলি সঠিকভাবে কীভাবে প্রস্তুত করা যায় তা বুঝুন।",
          resources: [
            { type: 'video', title: 'পুনর্ব্যবহার যাত্রা', duration: '6:30' },
            { type: 'text', title: 'পুনর্ব্যবহার নির্দেশিকা' },
            { type: 'infographic', title: 'পুনর্ব্যবহার প্রতীক' },
            { type: 'interactive', title: 'পুনর্ব্যবহার বাছাই的游戏' }
          ]
        },
        mr: {
          description: "विविध सामग्रीची पुनर्वापर प्रवास आणि पुनर्वापरासाठी वस्तू योग्य प्रकारे कशा तयार करायच्या याची माहिती घ्या.",
          resources: [
            { type: 'video', title: 'पुनर्वापर प्रवास', duration: '6:30' },
            { type: 'text', title: 'पुनर्वापर मार्गदर्शक तत्त्वे' },
            { type: 'infographic', title: 'पुनर्वापर चिन्हे' },
            { type: 'interactive', title: 'पुनर्वापर सॉर्टिंग गेम' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "Which plastic recycling code is for PET bottles?",
            hi: "पीईटी बोतलों के लिए कौन सा प्लास्टिक रीसाइक्लिंग कोड है?",
            ta: "PET பாட்டில்களுக்கு எந்த பிளாஸ்டிக் மறுசுழற்சி குறியீடு உள்ளது?",
            te: "PET బాటిళ్ళకు ఏ ప్లాస్టిక్ రీసైక్లింగ్ కోడ్ ఉపయోగించబడుతుంది?",
            bn: "PET বোতলের জন্য কোন প্লাস্টিক রিসাইক্লিং কোড?",
            mr: "PET बाटलींसाठी कोणता प्लॅस्टिक पुनर्वापर कोड वापरला जातो?"
          },
          options: [
            { id: 1, text: { en: "#1", hi: "#1", ta: "#1", te: "#1", bn: "#1", mr: "#1" } },
            { id: 2, text: { en: "#2", hi: "#2", ta: "#2", te: "#2", bn: "#2", mr: "#2" } },
            { id: 3, text: { en: "#5", hi: "#5", ta: "#5", te: "#5", bn: "#5", mr: "#5" } },
            { id: 4, text: { en: "#7", hi: "#7", ta: "#7", te: "#7", bn: "#7", mr: "#7" } }
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 5,
      title: {
        en: "Hazardous Waste Management",
        hi: "खतरनाक अपशिष्ट प्रबंधन",
        ta: "அபாயகரமான கழிவு மேலாண்மை",
        te: "హానికర వేస్ట్ మేనేజ్మెంట్",
        bn: "বিপজ্জনক বর্জ্য ব্যবস্থাপনা",
        mr: "धोकादायक कचरा व्यवस्थापन"
      },
      duration: "18 min",
      content: {
        en: {
          description: "Learn to identify and properly handle hazardous household waste to protect your family and environment.",
          resources: [
            { type: 'video', title: 'Identifying Hazardous Waste', duration: '5:45' },
            { type: 'text', title: 'Common Household Hazardous Items' },
            { type: 'infographic', title: 'Safe Disposal Methods' },
            { type: 'interactive', title: 'Hazardous Waste Quiz' }
          ]
        },
        hi: {
          description: "अपने परिवार और पर्यावरण की रक्षा के लिए खतरनाक घरेलू कचरे की पहचान करना और उसे ठीक से संभालना सीखें।",
          resources: [
            { type: 'video', title: 'खतरनाक कचरे की पहचान', duration: '5:45' },
            { type: 'text', title: 'सामान्य घरेलू खतरनाक वस्तुएं' },
            { type: 'infographic', title: 'सुरक्षित निपटान के तरीके' },
            { type: 'interactive', title: 'खतरनाक कचरा प्रश्नोत्तरी' }
          ]
        },
        ta: {
          description: "உங்கள் குடும்பத்தையும் சுற்றுச்சூழலையும் பாதுகாக்க அபாயகரமான வீட்டுக் கழிவுகளை அடையாளம் கண்டு சரியாக கையாள கற்றுக்கொள்ளுங்கள்.",
          resources: [
            { type: 'video', title: 'அபாயகரமான கழிவுகளை அடையாளம் காணுதல்', duration: '5:45' },
            { type: 'text', title: 'பொதுவான வீட்டு அபாயகரமான பொருட்கள்' },
            { type: 'infographic', title: 'பாதுகாப்பான அகற்றும் முறைகள்' },
            { type: 'interactive', title: 'அபாயகரமான கழிவு வினாடி வினா' }
          ]
        },
        te: {
          description: "మీ కుటుంబాన్ని మరియు పర్యావరణాన్ని రక్షించడానికి ప్రమాదకరమైన గృహ వేస్ట్ను గుర్తించడం మరియు సరిగ్గా నిర్వహించడం నేర్చుకోండి.",
          resources: [
            { type: 'video', title: 'ప్రమాదకర వేస్ట్ను గుర్తించడం', duration: '5:45' },
            { type: 'text', title: 'సాధారణ గృహ ప్రమాదకర వస్తువులు' },
            { type: 'infographic', title: 'సురక్షిత విసర్జన పద్ధతులు' },
            { type: 'interactive', title: 'ప్రమాదకర వేస్ట్ క్విజ్' }
          ]
        },
        bn: {
          description: "আপনার পরিবার এবং পরিবেশ রক্ষা করতে বিপজ্জনক গৃহস্থালি বর্জ্য সনাক্ত করা এবং সঠিকভাবে পরিচালনা করা শিখুন।",
          resources: [
            { type: 'video', title: 'বিপজ্জনক বর্জ্য সনাক্তকরণ', duration: '5:45' },
            { type: 'text', title: 'সাধারণ গৃহস্থালি বিপজ্জনক আইটেম' },
            { type: 'infographic', title: 'নিরাপদ নিষ্পত্তি পদ্ধতি' },
            { type: 'interactive', title: 'বিপজ্জনক বর্জ্য কুইজ' }
          ]
        },
        mr: {
          description: "तुमचे कुटुंब आणि पर्यावरण संरक्षित करण्यासाठी धोकादायक घरगुती कचरा ओळखणे आणि योग्य प्रकारे हाताळणे शिका.",
          resources: [
            { type: 'video', title: 'धोकादायक कचरा ओळखणे', duration: '5:45' },
            { type: 'text', title: 'सामान्य घरगुती धोकादायक वस्तू' },
            { type: 'infographic', title: 'सुरक्षित विसर्जन पद्धती' },
            { type: 'interactive', title: 'धोकादायक कचरा प्रश्नोत्तरी' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "Which of these is considered hazardous waste?",
            hi: "इनमें से किसे खतरनाक अपशिष्ट माना जाता है?",
            ta: "இவற்றில் எது அபாயகரமான கழிவாக கருதப்படுகிறது?",
            te: "ఈ క్రింది వాటిలో ఏది ప్రమాదకర వేస్ట్గా పరిగణించబడుతుంది?",
            bn: "নিচের কোনটি বিপজ্জনক বর্জ্য হিসেবে বিবেচিত?",
            mr: "यापैकी कोणते धोकादायक कचरा म्हणून ओळखले जाते?"
          },
          options: [
            { id: 1, text: { en: "Vegetable scraps", hi: "सब्जी के अवशेष", ta: "காய்கறி துண்டுகள்", te: "కూరగాయల స్క్రాప్స్", bn: "সবজির স্ক্র্যাপ", mr: "भाजीपाल्याचे कचरे" } },
            { id: 2, text: { en: "Used batteries", hi: "इस्तेमाल की हुई बैटरियां", ta: "பயன்படுத்தப்பட்ட பேட்டரிகள்", te: "వాడబడిన బ్యాటరీలు", bn: "ব্যবহৃত ব্যাটারি", mr: "वापरलेल्या बॅटऱ्या" } },
            { id: 3, text: { en: "Cardboard boxes", hi: "कार्डबोर्ड बक्से", ta: "அட்டை பெட்டிகள்", te: "కార్డ్బోర్డ్ పెట్టెలు", bn: "কার্ডবোর্ড বাক্স", mr: "कार्डबोर्ड बॉक्स" } },
            { id: 4, text: { en: "Glass jars", hi: "ग्लास जार", ta: "கண்ணாடி ஜாடிகள்", te: "గాజు జాడీలు", bn: "গ্লাস জার", mr: "काचेची जार" } }
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 6,
      title: {
        en: "Community Engagement",
        hi: "सामुदायिक सहभागिता",
        ta: "சமூக ஈடுபாடு",
        te: "కమ్యూనిటీ ఇంగేజ్మెంట్",
        bn: "সম্প্রদায়ের সম্পৃক্ততা",
        mr: "समुदाय सहभाग"
      },
      duration: "22 min",
      content: {
        en: {
          description: "Learn how to engage your community in waste management initiatives and create sustainable change.",
          resources: [
            { type: 'video', title: 'Community Organizing', duration: '8:10' },
            { type: 'text', title: 'Engagement Strategies' },
            { type: 'infographic', title: 'Awareness Campaign Ideas' },
            { type: 'interactive', title: 'Community Scenario' }
          ]
        },
        hi: {
          description: "अपने समुदाय को अपशिष्ट प्रबंधन पहलों में शामिल करना और स्थायी परिवर्तन करना सीखें।",
          resources: [
            { type: 'video', title: 'सामुदायिक संगठन', duration: '8:10' },
            { type: 'text', title: 'सहभागिता रणनीतियाँ' },
            { type: 'infographic', title: 'जागरूकता अभियान विचार' },
            { type: 'interactive', title: 'सामुदायिक परिदृश्य' }
          ]
        },
        ta: {
          description: "கழிவு மேலாண்மை முயற்சிகளில் உங்கள் சமூகத்தை ஈடுபடுத்துவது மற்றும் நிலையான மாற்றத்தை உருவாக்குவது எப்படி என்பதைக் கற்றுக்கொள்ளுங்கள்.",
          resources: [
            { type: 'video', title: 'சமூக அமைப்பு', duration: '8:10' },
            { type: 'text', title: 'ஈடுபாட்டு மூலோபாயங்கள்' },
            { type: 'infographic', title: 'விழிப்புணர்வு பிரச்சார யோசனைகள்' },
            { type: 'interactive', title: 'சமூக காட்சி' }
          ]
        },
        te: {
          description: "వేస్ట్ మేనేజ్మెంట్ ఉద్యమాలలో మీ కమ్యూనిటీని ఎలా న engaged ్యం చేయాలి మరియు స్థిరమైన మార్పును ఎలా సృష్టించాలో నేర్చుకోండి.",
          resources: [
            { type: 'video', title: 'కమ్యూనిటీ ఆర్గనైజింగ్', duration: '8:10' },
            { type: 'text', title: 'ఇంగేజ్మెంట్ వ్యూహాలు' },
            { type: 'infographic', title: 'అవగాహన ప్రచార ఆలోచనలు' },
            { type: 'interactive', title: 'కమ్యూనిటీ సన్నివేశం' }
          ]
        },
        bn: {
          description: "বর্জ্য ব্যবস্থাপনা উদ্যোগে আপনার সম্প্রদায়কে如何参与 এবং টেকসই পরিবর্তন如何创造 শিখুন।",
          resources: [
            { type: 'video', title: 'সম্প্রদায় সংগঠন', duration: '8:10' },
            { type: 'text', title: 'সম্পৃক্ততা কৌশল' },
            { type: 'infographic', title: 'সচেতনতা প্রচার ideas' },
            { type: 'interactive', title: 'সম্প্রদায় দৃশ্য' }
          ]
        },
        mr: {
          description: "कचरा व्यवस्थापन उपक्रमांमध्ये आपल्या समुदायाला कसे सहभागी करावे आणि शाश्वत बदल कसे निर्माण करावे याविषयी जाणून घ्या.",
          resources: [
            { type: 'video', title: 'समुदाय संघटन', duration: '8:10' },
            { type: 'text', title: 'सहभाग रणनीती' },
            { type: 'infographic', title: 'जागरूकता मोहीम कल्पना' },
            { type: 'interactive', title: 'समुदाय परिस्थिती' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "What is the most effective way to engage community members?",
            hi: "सामुदायिक सदस्यों को शामिल करने का सबसे प्रभावी तरीका क्या है?",
            ta: "சமூக உறுப்பினர்களை ஈடுபடுத்த மிகச் சிறந்த வழி எது?",
            te: "కమ్యూనిటీ సభ్యులను న engaged ్యం చేయడానికి అత్యంత ప్రభావవంతమైన మార్గం ఏది?",
            bn: "সম্প্রদায়ের সদস্যদের engaged ্য করতে সবচেয়ে effective way কী?",
            mr: "समुदाय सदस्यांना सहभागी करण्याचा सर्वात प्रभावी मार्ग कोणता?"
          },
          options: [
            { id: 1, text: { en: "One-way communication", hi: "एकतरफा संचार", ta: "ஒரு வழி தகவல்தொடர்பு", te: "ఏకముఖ సంభాషణ", bn: "একমুখী যোগাযোগ", mr: "एकमार्गी संवाद" } },
            { id: 2, text: { en: "Regular community meetings", hi: "नियमित सामुदायिक बैठकें", ta: "தொடர் சமூக கூட்டங்கள்", te: "నియమిత కమ్యూనిటీ సమావేశాలు", bn: "নিয়মিত সম্প্রদায় সভা", mr: "नियमित समुदाय बैठका" } },
            { id: 3, text: { en: "Ignoring local customs", hi: "स्थानीय रीति-रिवाजों को नजरअंदाज करना", ta: "உள்ளூர் பழக்கவழக்கங்களை புறக்கணித்தல்", te: "స్థానిక ఆచారాలను విస్మరించడం", bn: "স্থানীয় রীতিনীতি উপেক্ষা করা", mr: "स्थानिक रीतिरिवाजांकडे दुर्लक्ष करणे" } },
            { id: 4, text: { en: "Working in isolation", hi: "अलगाव में काम करना", ta: "தனிமையில் வேலை செய்தல்", te: "ఏకాంతంలో పని చేయడం", bn: "বিচ্ছিন্নভাবে কাজ করা", mr: "वेगळेपणाने काम करणे" } }
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 7,
      title: {
        en: "Waste to Wealth",
        hi: "कचरे से धन",
        ta: "கழிவிலிருந்து செல்வம்",
        te: "వేస్ట్ టు వెల్త్",
        bn: "বর্জ্য থেকে সম্পদ",
        mr: "कचऱ्यापासून संपत्ती"
      },
      duration: "25 min",
      content: {
        en: {
          description: "Discover entrepreneurial opportunities in waste management and how to create economic value from waste materials.",
          resources: [
            { type: 'video', title: 'Waste Entrepreneurship', duration: '10:20' },
            { type: 'text', title: 'Business Models' },
            { type: 'infographic', title: 'Value Chain of Waste' },
            { type: 'interactive', title: 'Business Plan Workshop' }
          ]
        },
        hi: {
          description: "अपशिष्ट प्रबंधन में उद्यमशीलता के अवसरों और कचरे से आर्थिक मूल्य कैसे बनाया जाए, इसकी खोज करें।",
          resources: [
            { type: 'video', title: 'अपशिष्ट उद्यमिता', duration: '10:20' },
            { type: 'text', title: 'व्यवसाय मॉडल' },
            { type: 'infographic', title: 'कचरे का मूल्य श्रृंखला' },
            { type: 'interactive', title: 'व्यवसाय योजना कार्यशाला' }
          ]
        },
        ta: {
          description: "கழிவு மேலாண்மையில் முனைவோர் வாய்ப்புகள் மற்றும் கழிவுப் பொருட்களிலிருந்து பொருளாதார மதிப்பை如何创造என்பதைக் கண்டறியவும்.",
          resources: [
            { type: 'video', title: 'கழிவு தொழில் முனைவோர்', duration: '10:20' },
            { type: 'text', title: 'வணிக மாதிரிகள்' },
            { type: 'infographic', title: 'கழிவின் மதிப்பு சங்கிலி' },
            { type: 'interactive', title: 'வணிகத் திட்டப் பட்டறை' }
          ]
        },
        te: {
          description: "వేస్ట్ మేనేజ్మెంట్ లో ఎంటర్ప్రెన్యూర్షిప్ అవకాశాలు మరియు వేస్ట్ మెటీరియల్స్ నుండి ఎకనామిక్ వెల్యూ ఎలా సృష్టించాలో అన్వేషించండి.",
          resources: [
            { type: 'video', title: 'వేస్ట్ ఎంటర్ప్రెన్యూర్షిప్', duration: '10:20' },
            { type: 'text', title: 'బిజినెస్ మోడల్స్' },
            { type: 'infographic', title: 'వేస్ట్ యొక్క వెల్యూ చైన్' },
            { type: 'interactive', title: 'బిజినెస్ ప్లాన్ వర్క్షాప్' }
          ]
        },
        bn: {
          description: "বর্জ্য ব্যবস্থাপনায় entrepreneurial opportunities এবং বর্জ্য materials থেকে economic value如何创造তা আবিষ্কার করুন।",
          resources: [
            { type: 'video', title: 'বর্জ্য উদ্যোক্তা', duration: '10:20' },
            { type: 'text', title: 'বusiness models' },
            { type: 'infographic', title: 'বর্জ্যের value chain' },
            { type: 'interactive', title: 'বusiness plan workshop' }
          ]
        },
        mr: {
          description: "कचरा व्यवस्थापनातील उद्योजकता संधी आणि कचऱ्यापासून आर्थिक मूल्य कसे निर्माण करावे याचा शोध घ्या.",
          resources: [
            { type: 'video', title: 'कचरा उद्योजकता', duration: '10:20' },
            { type: 'text', title: 'व्यवसाय मॉडेल्स' },
            { type: 'infographic', title: 'कचऱ्याची व्हॅल्यू चेन' },
            { type: 'interactive', title: 'व्यवसाय योजना कार्यशाळा' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "Which of these is an example of 'Waste to Wealth' initiative?",
            hi: "इनमें से कौन सा 'कचरे से धन' पहल का उदाहरण है?",
            ta: "இவற்றில் எது 'கழிவிலிருந்து செல்வம்' முயற்சிக்கான எடுத்துக்காட்டு?",
            te: "ఈ క్రింది వాటిలో ఏది 'వేస్ట్ టు వెల్త్' ఉద్యమానికి ఉదాహరణ?",
            bn: "নিচের কোনটি 'বর্জ্য থেকে সম্পদ' উদ্যোগের উদাহরণ?",
            mr: "यापैकी कोणते 'कचऱ्यापासून संपत्ती' उपक्रमाचे उदाहरण आहे?"
          },
          options: [
            { id: 1, text: { en: "Landfilling", hi: "लैंडफिलिंग", ta: "நிலம் நிரப்புதல்", te: "ల్యాండ్ఫిల్లింగ్", bn: "ল্যান্ডফিলিং", mr: "लँडफिलिंग" } },
            { id: 2, text: { en: "Incineration", hi: "भस्मीकरण", ta: "சொல்லைக்கரித்தல்", te: "దహనం", bn: "পোড়ানো", mr: "ज्वलन" } },
            { id: 3, text: { en: "Making compost from food waste", hi: "खाद्य अपशिष्ट से खाद बनाना", ta: "உணவுக் கழிவிலிருந்து குழைவு தயாரித்தல்", te: "ఆహార వేస్ట్ నుండి కంపోస్ట్ తయారు చేయడం", bn: "খাদ্য বর্জ্য থেকে কম্পোস্ট তৈরি", mr: "अन्न टाकाऊ पासून कंपोस्ट तयार करणे" } },
            { id: 4, text: { en: "Ocean dumping", hi: "समुद्र में डंपिंग", ta: "கடலில் கழிவுகளை கொட்டுதல்", te: "సముద్రంలో డంపింగ్", bn: "সমুদ্রে ডাম্পিং", mr: "समुद्रात टाकाऊ टाकणे" } }
          ],
          correctAnswer: 3
        }
      ]
    },
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
          description: "Test your knowledge across all modules to become a certified Green Champion.",
          resources: [
            { type: 'text', title: 'Assessment Guidelines' },
            { type: 'interactive', title: 'Practice Questions' }
          ]
        },
        hi: {
          description: "प्रमाणित ग्रीन चैंपियन बनने के लिए सभी मॉड्यूल में अपने ज्ञान का परीक्षण करें।",
          resources: [
            { type: 'text', title: 'मूल्यांकन दिशानिर्देश' },
            { type: 'interactive', title: 'अभ्यास प्रश्न' }
          ]
        },
        ta: {
          description: "சான்றளிக்கப்பட்ட கிரீன் சாம்பியன் ஆக எல்லா தொகுதிகளிலும் உங்கள் அறிவை சோதிக்கவும்.",
          resources: [
            { type: 'text', title: 'மதிப்பீட்டு வழிகாட்டிகள்' },
            { type: 'interactive', title: 'பயிற்சி கேள்விகள்' }
          ]
        },
        te: {
          description: "సర్టిఫైడ్ గ్రీన్ ఛాంపియన్ అవ్వడానికి అన్ని మాడ్యూల్స్లో మీ జ్ఞానాన్ని పరీక్షించండి.",
          resources: [
            { type: 'text', title: 'అసెస్మెంట్ గైడ్లైన్స్' },
            { type: 'interactive', title: 'ప్రాక్టీస్ ప్రశ్నలు' }
          ]
        },
        bn: {
          description: "একটি certified Green Champion হওয়ার জন্য সমস্ত মডিউল জুড়ে আপনার জ্ঞান পরীক্ষা করুন।",
          resources: [
            { type: 'text', title: 'মূল্যায়ন নির্দেশিকা' },
            { type: 'interactive', title: 'অনুশীলন প্রশ্ন' }
          ]
        },
        mr: {
          description: "प्रमाणित ग्रीन चॅम्पियन बनण्यासाठी सर्व मॉड्युल्समधील तुमचे ज्ञान चाचणी करा.",
          resources: [
            { type: 'text', title: 'मूल्यांकन मार्गदर्शक तत्त्वे' },
            { type: 'interactive', title: 'सराव प्रश्न' }
          ]
        }
      },
      quiz: [
        {
          question: {
            en: "What is the ultimate goal of proper waste management?",
            hi: "उचित अपशिष्ट प्रबंधन का अंतिम लक्ष्य क्या है?",
            ta: "சரியான கழிவு மேலாண்மையின் இறுதி நோக்கம் என்ன?",
            te: "సరైన వేస్ట్ మేనేజ్మెంట్ యొక్క అంతిమ లక్ష్యం ఏమిటి?",
            bn: "সঠিক বর্জ্য ব্যবস্থাপনার চূড়ান্ত লক্ষ্য কী?",
            mr: "योग्य कचरा व्यवस्थापनाचे अंतिम लक्ष्य काय आहे?"
          },
          options: [
            { id: 1, text: { en: "To eliminate all waste", hi: "सभी कचरे को खत्म करना", ta: "அனைத்து கழிவுகளையும் அகற்றுவது", te: "అన్ని వేస్ట్ను తొలగించడం", bn: "সমস্ত বর্জ্য নির্মূল করা", mr: "सर्व कचरा नष्ट करणे" } },
            { id: 2, text: { en: "To create a circular economy", hi: "एक परिपत्रक अर्थव्यवस्था बनाना", ta: "ஒரு சுழற்சி பொருளாதாரத்தை உருவாக்குவது", te: "సర్క్యులర్ ఎకనామీని సృష్టించడం", bn: "একটি বৃত্তাকার অর্থনীতি তৈরি করা", mr: "परिपत्रक अर्थव्यवस्था निर्माण करणे" } },
            { id: 3, text: { en: "To reduce government spending", hi: "सरकारी खर्च को कम करना", ta: "அரசாங்கச் செலவினங்களைக் குறைப்பது", te: "ప్రభుత్వ ఖర్చులు తగ్గించడం", bn: "সরকারি ব্যয় কমানো", mr: "सरकारी खर्च कमी करणे" } },
            { id: 4, text: { en: "To increase landfill space", hi: "लैंडफिल स्थान बढ़ाना", ta: "நிரப்பு தள இடத்தை அதிகரிப்பது", te: "ల్యాండ్ఫిల్ స్పేస్ పెంచడం", bn: "ল্যান্ডফিল স্থান বৃদ্ধি করা", mr: "लँडफिल जागा वाढवणे" } }
          ],
          correctAnswer: 2
        },
        {
          question: {
            en: "Which of these is NOT a principle of sustainable waste management?",
            hi: "इनमें से कौन सा स्थायी अपशिष्ट प्रबंधन का सिद्धांत नहीं है?",
            ta: "இவற்றில் எது நிலையான கழிவு மேலாண்மையின் கோட்பாடு அல்ல?",
            te: "ఈ క్రింది వాటిలో ఏది సస్టైనబుల్ వేస్ట్ మేనేజ్మెంట్ ప్రిన్సిపల్ కాదు?",
            bn: "নিচের কোনটি টেকসই বর্জ্য ব্যবস্থাপনার নীতি নয়?",
            mr: "यापैकी कोणते शाश्वत कचरा व्यवस्थापनाचे तत्त्व नाही?"
          },
          options: [
            { id: 1, text: { en: "Reduce", hi: "कम करना", ta: "குறைத்தல்", te: "తగ్గించు", bn: "হ্রাস করুন", mr: "कमी करा" } },
            { id: 2, text: { en: "Reuse", hi: "पुन: उपयोग", ta: "மீண்டும் பயன்படுத்துதல்", te: "మళ్లీ ఉపయోగించు", bn: "পুনরায় ব্যবহার করুন", mr: "पुन्हा वापरा" } },
            { id: 3, text: { en: "Recycle", hi: "रीसायकल", ta: "மறுசுழற்சி", te: "రీసైకిల్", bn: "রিসাইকেল", mr: "पुनर्वापर" } },
            { id: 4, text: { en: "Regret", hi: "पछताना", ta: "வருந்துதல்", te: "విచారించు", bn: "অনুশোচনা", mr: "पश्चाताप" } }
          ],
          correctAnswer: 4
        }
      ]
    }
  ];

  // Languages supported
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ];

  // Badges and achievements
  const badges = [
    { id: 1, name: { en: 'First Lesson', hi: 'पहला पाठ', ta: 'முதல் பாடம்', te: 'మొదటి పాఠం', bn: 'প্রথম পাঠ', mr: 'पहिला धडा' }, icon: '📚', earned: true },
    { id: 2, name: { en: 'Quiz Master', hi: 'क्विज मास्टर', ta: 'வினாடி வினா மாஸ்டர்', te: 'క్విజ్ మాస్టర్', bn: 'কুইজ মাস্টার', mr: 'क्विझ मास्टर' }, icon: '🧠', earned: false },
    { id: 3, name: { en: 'Eco Warrior', hi: 'पर्यावरण योद्धा', ta: 'பசுமை வீரர்', te: 'ఈకో వారియర్', bn: 'ইকো ওয়ারিয়র', mr: 'इको वॉरियर' }, icon: '🌱', earned: false },
    { id: 4, name: { en: 'Community Leader', hi: 'सामुदायिक नेता', ta: 'சமூக தலைவர்', te: 'కమ్యూనిటీ లీడర్', bn: 'সম্প্রদায় নেতা', mr: 'समुदाय नेता' }, icon: '👥', earned: false },
    { id: 5, name: { en: 'Perfect Score', hi: 'पूर्ण अंक', ta: 'சரியான மதிப்பெண்', te: 'పర్ఫెక్ట్ స్కోర్', bn: 'নিখুঁত স্কোর', mr: 'परफेक्ट स्कोर' }, icon: '⭐', earned: false },
    { id: 6, name: { en: 'Waste Innovator', hi: 'अपशिष्ट नवप्रवर्तक', ta: 'கழிவு புதுமைப்பித்தன்', te: 'వేస్ట్ ఇన్నోవేటర్', bn: 'বর্জ্য উদ্ভাবক', mr: 'कचरा नवीनताक' }, icon: '💡', earned: false },
    { id: 7, name: { en: 'Green Ambassador', hi: 'ग्रीन राजदूत', ta: 'பசுமை தூதர்', te: 'గ్రీన్ అంబాసిడర్', bn: 'গ্রীন অ্যাম্বাসেডর', mr: 'ग्रीन अॅम्बेसडर' }, icon: '🌍', earned: false }
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
    newProgress[moduleIndex] = { completed: true, score, unlocked: true };
    
    // Unlock the next module if it exists
    if (moduleIndex < trainingModules.length - 1) {
      newProgress[moduleIndex + 1] = { ...newProgress[moduleIndex + 1], unlocked: true };
    }
    
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
    if (currentModule < trainingModules.length - 1 && moduleProgress[currentModule + 1].unlocked) {
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
               language === 'bn' ? 'গ্রীন চ্যাম্পিয়ন প্রশিক্ষণ' :
               'ग्रीन चॅम्पियन प्रशिक्षण'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {language === 'en' ? 'Become a certified waste management expert and contribute to a cleaner, greener India' :
               language === 'hi' ? 'एक प्रमाणित अपशिष्ट प्रबंधन विशेषज्ञ बनें और स्वच्छ, हरित भारत में योगदान दें' :
               language === 'ta' ? 'ஒரு சான்றளிக்கப்பட்ட கழிவு மேலாண்மை நிபுணராக மாறி, சுத்தமான, பசுமை இந்தியாவிற்கு பங்களிக்கவும்' :
               language === 'te' ? 'ధృవీకరించబడిన వేస్ట్ మేనేజ్మెంట్ నిపుణుడిగా మారండి మరియు cleaner, greener భారతదేశానికి దోహదపడండి' :
               language === 'bn' ? 'একটি certified বর্জ্য ব্যবস্থাপনা বিশেষজ্ঞ হয়ে উঠুন এবং একটি cleaner, greener ভারততে contribute করুন' :
               'प्रमाणित कचरा व्यवस्थापन तज्ञ बना आणि स्वच्छ, हिरवी भारतात योगदान द्या'}
            </p>
            
            {/* Language Selector */}
            <div className="flex justify-center items-center mb-6">
              <Globe size={20} className="mr-2" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/20 text-white border-none rounded-md px-3 py-2 focus:ring-2 focus:ring-white"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="text-green-900">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
            >
              <Download size={20} className="mr-2" />
              {language === 'en' ? 'Download Training Materials' :
               language === 'hi' ? 'प्रशिक्षण सामग्री डाउनलोड करें' :
               language === 'ta' ? 'பயிற்சி பொருட்களைப் பதிவிறக்குக' :
               language === 'te' ? 'శిక్షణ సామగ్రి డౌన్లోడ్ చేయండి' :
               language === 'bn' ? 'প্রশিক্ষণ সামগ্রী ডাউনলোড করুন' :
               'प्रशिक्षण सामग्री डाउनलोड करा'}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-green-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-2 md:space-x-4">
              {[
                { id: 'modules', label: { en: 'Modules', hi: 'मॉड्यूल', ta: 'தொகுதிகள்', te: 'మాడ్యూల్స్', bn: 'মডিউল', mr: 'मॉड्युल्स' }, icon: BookOpen },
                { id: 'progress', label: { en: 'Progress', hi: 'प्रगति', ta: 'முன்னேற்றம்', te: 'ప్రోగ్రెస్', bn: 'অগ্রগতি', mr: 'प्रगती' }, icon: BarChart3 },
                { id: 'achievements', label: { en: 'Achievements', hi: 'उपलब्धियां', ta: 'சாதனைகள்', te: 'సాధనలు', bn: 'অর্জন', mr: 'यश' }, icon: Award }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 flex items-center text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-emerald-50 dark:bg-green-700 text-green-700 dark:text-emerald-50 border-b-2 border-green-500'
                        : 'text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-emerald-50'
                    }`}
                  >
                    <IconComponent size={18} className="mr-2" />
                    <span>{tab.label[language]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Tracker Section */}
      {activeTab === 'progress' && (
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
              <h2 className="text-3xl font-bold mb-6">
                {language === 'en' ? 'Your Learning Journey' :
                 language === 'hi' ? 'आपकी सीखने की यात्रा' :
                 language === 'ta' ? 'உங்கள் கற்றல் பயணம்' :
                 language === 'te' ? 'మీ లెర్నింగ్ జర్నీ' :
                 language === 'bn' ? 'আপনার শিক্ষার যাত্রা' :
                 'तुमची शिकण्याची प्रवास'}
              </h2>
              
              <div className="bg-emerald-100 dark:bg-green-700 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">
                    {language === 'en' ? 'Overall Progress' :
                     language === 'hi' ? 'कुल प्रगति' :
                     language === 'ta' ? 'மொத்த முன்னேற்றம்' :
                     language === 'te' ? 'మొత్తం ప్రోగ్రెస్' :
                     language === 'bn' ? 'সামগ্রিক অগ্রগতি' :
                     'एकूण प्रगती'}
                  </span>
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
                    <span className="font-semibold">
                      {language === 'en' ? 'Modules Completed' :
                       language === 'hi' ? 'मॉड्यूल पूर्ण' :
                       language === 'ta' ? 'முடிக்கப்பட்ட தொகுதிகள்' :
                       language === 'te' ? 'పూర్తయిన మాడ్యూల్స్' :
                       language === 'bn' ? 'সম্পূর্ণ মডিউল' :
                       'पूर्ण झालेले मॉड्युल्स'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">
                    {moduleProgress.filter(m => m.completed).length}/{trainingModules.length}
                  </p>
                </div>
                
                <div className="bg-emerald-50 dark:bg-green-600 p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-center mb-2">
                    <Award size={24} className="text-green-600 dark:text-emerald-50 mr-2" />
                    <span className="font-semibold">
                      {language === 'en' ? 'Average Score' :
                       language === 'hi' ? 'औसत स्कोर' :
                       language === 'ta' ? 'சராசரி மதிப்பெண்' :
                       language === 'te' ? 'సగటు స్కోరు' :
                       language === 'bn' ? 'গড় স্কোর' :
                       'सरासरी गुण'}
                    </span>
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
                    <span className="font-semibold">
                      {language === 'en' ? 'Time Spent' :
                       language === 'hi' ? 'लगा समय' :
                       language === 'ta' ? 'செலவழித்த நேரம்' :
                       language === 'te' ? 'గడిపిన సమయం' :
                       language === 'bn' ? 'ব্যয় করা সময়' :
                       'खर्च केलेला वेळ'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">~2h 15m</p>
                </div>
              </div>

              {/* Module Progress Details */}
              <div className="mt-12 bg-emerald-50 dark:bg-green-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6 text-center">
                  {language === 'en' ? 'Module-wise Progress' :
                   language === 'hi' ? 'मॉड्यूल-वार प्रगति' :
                   language === 'ta' ? 'தொகுதி வாரியான முன்னேற்றம்' :
                   language === 'te' ? 'మాడ్యూల్-వారీగా ప్రోగ్రెస్' :
                   language === 'bn' ? 'মডিউল অনুযায়ী অগ্রগতি' :
                   'मॉड्युल-निहाय प्रगती'}
                </h3>
                <div className="space-y-4">
                  {trainingModules.map((module, index) => (
                    <div key={module.id} className="flex items-center justify-between p-3 bg-white dark:bg-green-800 rounded-lg">
                      <div className="flex items-center">
                        {moduleProgress[index].completed ? (
                          <CheckCircle size={20} className="text-green-500 mr-3" />
                        ) : moduleProgress[index].unlocked ? (
                          <div className="w-5 h-5 rounded-full border-2 border-green-500 mr-3"></div>
                        ) : (
                          <Lock size={20} className="text-gray-400 mr-3" />
                        )}
                        <span className="font-medium">{module.title[language]}</span>
                      </div>
                      <div>
                        {moduleProgress[index].completed ? (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {moduleProgress[index].score}%
                          </span>
                        ) : moduleProgress[index].unlocked ? (
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {language === 'en' ? 'In Progress' :
                             language === 'hi' ? 'चालू' :
                             language === 'ta' ? 'நடந்து கொண்டிருக்கிறது' :
                             language === 'te' ? 'ప్రోగ్రెస్ లో ఉంది' :
                             language === 'bn' ? 'চলমান' :
                             'चालू'}
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {language === 'en' ? 'Locked' :
                             language === 'hi' ? 'लॉक' :
                             language === 'ta' ? 'பூட்டப்பட்டது' :
                             language === 'te' ? 'లాక్ చేయబడింది' :
                             language === 'bn' ? 'লক' :
                             'लॉक'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Current Module Section */}
      {activeTab === 'modules' && (
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
                    <h3 className="text-xl font-bold mb-4">
                      {language === 'en' ? 'Training Modules' :
                       language === 'hi' ? 'प्रशिक्षण मॉड्यूल' :
                       language === 'ta' ? 'பயிற்சி தொகுதிகள்' :
                       language === 'te' ? 'శిక్షణ మాడ్యూల్స్' :
                       language === 'bn' ? 'প্রশিক্ষণ মডিউল' :
                       'प्रशिक्षण मॉड्युल्स'}
                    </h3>
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
                                : moduleProgress[index].unlocked
                                  ? 'bg-gray-50 dark:bg-green-900 text-gray-700 dark:text-gray-300'
                                  : 'bg-gray-100 dark:bg-green-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={() => moduleProgress[index].unlocked && setCurrentModule(index)}
                        >
                          <div className="flex items-center">
                            {moduleProgress[index].completed ? (
                              <CheckCircle size={16} className="text-green-500 mr-2" />
                            ) : moduleProgress[index].unlocked ? (
                              <div className="w-4 h-4 rounded-full border border-green-500 mr-2"></div>
                            ) : (
                              <Lock size={16} className="text-gray-400 mr-2" />
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
                          <span>
                            {language === 'en' ? 'Previous' :
                             language === 'hi' ? 'पिछला' :
                             language === 'ta' ? 'முந்தைய' :
                             language === 'te' ? 'మునుపటి' :
                             language === 'bn' ? 'পূর্ববর্তী' :
                             'मागील'}
                          </span>
                        </motion.button>
                        
                        {!moduleProgress[currentModule].completed && moduleProgress[currentModule].unlocked && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startQuiz}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
                          >
                            <span>
                              {language === 'en' ? 'Take Quiz' :
                               language === 'hi' ? 'क्विज लें' :
                               language === 'ta' ? 'வினாடி வினா எடுக்க' :
                               language === 'te' ? 'క్విజ్ తీసుకోండి' :
                               language === 'bn' ? 'কুইজ নিন' :
                               'क्विझ घ्या'}
                            </span>
                            <ChevronRight size={20} />
                          </motion.button>
                        )}
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={nextModule}
                          disabled={currentModule === trainingModules.length - 1 || !moduleProgress[currentModule + 1].unlocked}
                          className={`px-4 py-2 rounded-lg flex items-center ${
                            currentModule === trainingModules.length - 1 || !moduleProgress[currentModule + 1].unlocked
                              ? 'bg-gray-200 dark:bg-green-900 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                              : 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-emerald-50 hover:bg-green-200 dark:hover:bg-green-600'
                          }`}
                        >
                          <span>
                            {language === 'en' ? 'Next' :
                             language === 'hi' ? 'अगला' :
                             language === 'ta' ? 'அடுத்தது' :
                             language === 'te' ? 'తరువాత' :
                             language === 'bn' ? 'পরবর্তী' :
                             'पुढील'}
                          </span>
                          <ChevronRight size={20} />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">
                        {language === 'en' ? 'Learning Materials' :
                         language === 'hi' ? 'सीखने की सामग्री' :
                         language === 'ta' ? 'கற்றல் பொருட்கள்' :
                         language === 'te' ? 'నేర్చుకునే సామగ్రి' :
                         language === 'bn' ? 'শিক্ষার উপকরণ' :
                         'शिकण्याची सामग्री'}
                      </h3>
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
                        <h4 className="font-semibold">
                          {language === 'en' ? 'Module Completed!' :
                           language === 'hi' ? 'मॉड्यूल पूर्ण!' :
                           language === 'ta' ? 'தொகுதி முடிந்தது!' :
                           language === 'te' ? 'మాడ్యూల్ పూర్తయింది!' :
                           language === 'bn' ? 'মডিউল সম্পূর্ণ!' :
                           'मॉड्यूल पूर्ण!'}
                        </h4>
                        <p className="text-sm">
                          {language === 'en' ? 'Your score: ' :
                           language === 'hi' ? 'आपका स्कोर: ' :
                           language === 'ta' ? 'உங்கள் மதிப்பெண்: ' :
                           language === 'te' ? 'మీ స్కోరు: ' :
                           language === 'bn' ? 'আপনার স্কোর: ' :
                           'तुमचे गुण: '}
                          {moduleProgress[currentModule].score}%
                        </p>
                      </div>
                      <button 
                        onClick={startQuiz}
                        className="ml-auto px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg"
                      >
                        {language === 'en' ? 'Retake Quiz' :
                         language === 'hi' ? 'क्विज फिर से लें' :
                         language === 'ta' ? 'வினாடி வினாவை மீண்டும் எடுக்க' :
                         language === 'te' ? 'క్విజ్ మళ్లీ తీసుకోండి' :
                         language === 'bn' ? 'কুইজ আবার নিন' :
                         'क्विझ पुन्हा घ्या'}
                      </button>
                    </motion.div>
                  )}

                  {!moduleProgress[currentModule].unlocked && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-800 rounded-xl flex items-center"
                    >
                      <Lock size={24} className="text-yellow-600 dark:text-yellow-300 mr-3" />
                      <div>
                        <h4 className="font-semibold">
                          {language === 'en' ? 'Module Locked' :
                           language === 'hi' ? 'मॉड्यूल लॉक' :
                           language === 'ta' ? 'தொகுதி பூட்டப்பட்டது' :
                           language === 'te' ? 'మాడ్యూల్ లాక్ చేయబడింది' :
                           language === 'bn' ? 'মডিউল লক' :
                           'मॉड्यूल लॉक'}
                        </h4>
                        <p className="text-sm">
                          {language === 'en' ? 'Complete the previous module to unlock this content' :
                           language === 'hi' ? 'इस सामग्री को अनलॉक करने के लिए पिछला मॉड्यूल पूरा करें' :
                           language === 'ta' ? 'இந்த உள்ளடக்கத்தை அன்லாக் செய்ய முந்தைய தொகுதியை முடிக்கவும்' :
                           language === 'te' ? 'ఈ కంటెంట్‌ను అన్‌లాక్ చేయడానికి మునుపటి మాడ్యూల్‌ను పూర్తి చేయండి' :
                           language === 'bn' ? 'এই সামগ্রী আনলক করতে পূর্ববর্তী মডিউলটি সম্পূর্ণ করুন' :
                           'हा मजकूर अनलॉक करण्यासाठी मागील मॉड्यूल पूर्ण करा'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Badges & Achievements Section */}
      {activeTab === 'achievements' && (
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
              <h2 className="text-3xl font-bold mb-2">
                {language === 'en' ? 'Your Achievements' :
                 language === 'hi' ? 'आपकी उपलब्धियां' :
                 language === 'ta' ? 'உங்கள் சாதனைகள்' :
                 language === 'te' ? 'మీ సాధనలు' :
                 language === 'bn' ? 'আপনার অর্জন' :
                 'तुमची यश'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {language === 'en' ? 'Earn badges as you progress through your training' :
                 language === 'hi' ? 'अपने प्रशिक्षण के दौरान बैज अर्जित करें' :
                 language === 'ta' ? 'உங்கள் பயிற்சியில் முன்னேறும்போது பேட்ஜ்களைப் பெறுங்கள்' :
                 language === 'te' ? 'మీ శిక్షణలో ముందుకు సాగే కొద్దీ బ్యాడ్జ్‌లను సంపాదించండి' :
                 language === 'bn' ? 'আপনার প্রশিক্ষণের অগ্রগতির সাথে সাথে ব্যাজ অর্জন করুন' :
                 'तुमच्या प्रशिक्षणात पुढे जाताना बॅज मिळवा'}
              </p>
              
              <motion.div
                variants={staggerChildren}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
                    <h3 className="font-semibold text-sm">{badge.name[language]}</h3>
                    <div className="mt-2 text-xs">
                      {badge.earned ? 
                        (language === 'en' ? 'Earned!' :
                         language === 'hi' ? 'अर्जित!' :
                         language === 'ta' ? 'பெறப்பட்டது!' :
                         language === 'te' ? 'సంపాదించబడింది!' :
                         language === 'bn' ? 'অর্জিত!' :
                         'मिळाले!') : 
                        (language === 'en' ? 'Locked' :
                         language === 'hi' ? 'लॉक' :
                         language === 'ta' ? 'பூட்டப்பட்டது' :
                         language === 'te' ? 'లాక్ చేయబడింది' :
                         language === 'bn' ? 'লক' :
                         'लॉक')
                      }
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Achievement Progress */}
              <div className="mt-12 bg-emerald-50 dark:bg-green-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6 text-center">
                  {language === 'en' ? 'Achievement Progress' :
                   language === 'hi' ? 'उपलब्धि प्रगति' :
                   language === 'ta' ? 'சாதனை முன்னேற்றம்' :
                   language === 'te' ? 'సాధన ప్రోగ్రెస్' :
                   language === 'bn' ? 'অর্জনের অগ্রগতি' :
                   'यश प्रगती'}
                </h3>
                <div className="w-full bg-gray-200 dark:bg-green-900 rounded-full h-4 mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(badges.filter(b => b.earned).length / badges.length) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                  />
                </div>
                <p className="text-center">
                  {badges.filter(b => b.earned).length} of {badges.length} {language === 'en' ? 'achievements earned' :
                   language === 'hi' ? 'उपलब्धियां अर्जित' :
                   language === 'ta' ? 'சாதனைகள் பெறப்பட்டன' :
                   language === 'te' ? 'సాధనలు సంపాదించబడ్డాయి' :
                   language === 'bn' ? 'অর্জন অর্জিত' :
                   'यश मिळाले'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
                  {language === 'en' ? 'Question' :
                   language === 'hi' ? 'प्रश्न' :
                   language === 'ta' ? 'கேள்வி' :
                   language === 'te' ? 'ప్రశ్న' :
                   language === 'bn' ? 'প্রশ্ন' :
                   'प्रश्न'} {currentQuestion + 1} {language === 'en' ? 'of' :
                   language === 'hi' ? 'का' :
                   language === 'ta' ? 'இன்' :
                   language === 'te' ? 'యొక్క' :
                   language === 'bn' ? 'এর' :
                   'पैकी'} {trainingModules[currentModule].quiz.length}
                </h3>
                <button onClick={() => setShowQuiz(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
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
                      {language === 'en' ? 'Correct! Well done.' :
                       language === 'hi' ? 'सही! बहुत अच्छे।' :
                       language === 'ta' ? 'சரி! நல்லது.' :
                       language === 'te' ? 'సరైనది! చాలా బాగుంది.' :
                       language === 'bn' ? 'সঠিক! ভালো কাজ।' :
                       'बरोबर! छान केलं.'}
                    </div>
                  ) : (
                    <div className="text-red-600 dark:text-red-400">
                      {language === 'en' ? 'Incorrect. Try again next time!' :
                       language === 'hi' ? 'गलत। अगली बार फिर से कोशिश करें!' :
                       language === 'ta' ? 'தவறு. அடுத்த முறை மீண்டும் முயற்சிக்கவும்!' :
                       language === 'te' ? 'తప్పు. తదుపరి సారి మళ్లీ ప్రయత్నించండి!' :
                       language === 'bn' ? 'ভুল। পরের বার আবার চেষ্টা করুন!' :
                       'चूक. पुढच्या वेळी पुन्हा प्रयत्न करा!'}
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
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="text-center border-2 border-dashed border-green-500 p-8 rounded-lg">
                <div className="mb-6">
                  <Trophy size={48} className="mx-auto text-yellow-500" />
                </div>
                
                <h2 className="text-3xl font-bold mb-2 text-green-700 dark:text-emerald-50">
                  {language === 'en' ? 'Certificate of Completion' :
                   language === 'hi' ? 'पूर्णता प्रमाणपत्र' :
                   language === 'ta' ? 'நிறைவு சான்றிதழ்' :
                   language === 'te' ? 'పూర్తి సర్టిఫికేట్' :
                   language === 'bn' ? 'সমাপ্তি সার্টিফিকেট' :
                   'पूर्णता प्रमाणपत्र'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'en' ? 'This certifies that' :
                   language === 'hi' ? 'यह प्रमाणित करता है कि' :
                   language === 'ta' ? 'இது சான்றளிக்கிறது' :
                   language === 'te' ? 'ఇది ధృవీకరిస్తుంది' :
                   language === 'bn' ? 'এটি প্রত证明 করে' :
                   'हे प्रमाणित करते'}
                </p>
                
                <h3 className="text-2xl font-bold mb-6 text-green-800 dark:text-emerald-50">{userName}</h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'en' ? 'has successfully completed the Green Champion Training Program and demonstrated proficiency in sustainable waste management practices.' :
                   language === 'hi' ? 'ने ग्रीन चैंपियन प्रशिक्षण कार्यक्रम सफलतापूर्वक पूरा किया है और स्थायी अपशिष्ट प्रबंधन प्रथाओं में दक्षता प्रदर्शित की है।' :
                   language === 'ta' ? 'கிரீன் சாம்பியன் பயிற்சி திட்டத்தை வெற்றிகரமாக முடித்து, நிலையான கழிவு மேலாண்மை நடைமுறைகளில் திறமையை நிரூபித்துள்ளார்.' :
                   language === 'te' ? 'గ్రీన్ ఛాంపియన్ శిక్షణ కార్యక్రమాన్ని విజయవంతంగా పూర్తి చేసి, సస్టైనబుల్ వేస్ట్ మేనేజ్మెంట్ పద్ధతులలో ప్రావీణ్యాన్ని ప్రదర్శించారు.' :
                   language === 'bn' ? 'গ্রীন চ্যাম্পিয়ন প্রশিক্ষণ 프로그램 সফলভাবে সম্পন্ন করেছেন এবং টেকসই বর্জ্য ব্যবস্থাপনা অনুশীলনে দক্ষতা প্রদর্শন করেছেন।' :
                   'ग्रीन चॅम्पियन प्रशिक्षण कार्यक्रम यशस्वीरित्या पूर्ण केला आहे आणि शाश्वत कचरा व्यवस्थापन पद्धतींमध्ये प्रावीण्य प्रदर्शित केले आहे.'}
                </p>
                
                <div className="flex justify-center mb-6">
                  <div className="border-t-2 border-green-500 w-32 mx-auto"></div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en' ? 'Date: ' :
                   language === 'hi' ? 'तारीख: ' :
                   language === 'ta' ? 'தேதி: ' :
                   language === 'te' ? 'తేదీ: ' :
                   language === 'bn' ? 'তারিখ: ' :
                   'तारीख: '}{new Date().toLocaleDateString()}
                </p>
                
                <div className="flex justify-center space-x-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
                  >
                    <Download size={20} className="mr-2" />
                    {language === 'en' ? 'Download' :
                     language === 'hi' ? 'डाउनलोड' :
                     language === 'ta' ? 'பதிவிறக்குக' :
                     language === 'te' ? 'డౌన్లోడ్' :
                     language === 'bn' ? 'ডাউনলোড' :
                     'डाउनलोड'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center"
                  >
                    <Share size={20} className="mr-2" />
                    {language === 'en' ? 'Share' :
                     language === 'hi' ? 'शेयर' :
                     language === 'ta' ? 'பகிர்' :
                     language === 'te' ? 'షేర్' :
                     language === 'bn' ? 'শেয়ার' :
                     'शेअर'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center"
                  >
                    <Print size={20} className="mr-2" />
                    {language === 'en' ? 'Print' :
                     language === 'hi' ? 'प्रिंट' :
                     language === 'ta' ? 'அச்சிடு' :
                     language === 'te' ? 'ప్రింట్' :
                     language === 'bn' ? 'প্রিন্ট' :
                     'प्रिंट'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Training2;