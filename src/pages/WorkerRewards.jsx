import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Star, TrendingUp, Gift, Heart, Shield, Bike, Home, 
  Zap, Users, Target, Clock, Calendar, Trophy, Coins, 
  Sparkles, GiftIcon, Medal, BadgeCheck, Wallet, 
  Smartphone, CreditCard, HeartPulse, Car, BookOpen, User,
  ChevronRight, Crown, ZapIcon , Lock,
} from 'lucide-react';

const WorkerRewards = () => {
  // State management
  const [workerInfo, setWorkerInfo] = useState({
    name: 'Rajesh Kumar',
    points: 1250,
    level: 'Silver',
    nextLevel: 'Gold',
    progress: 65,
    rank: 12,
    totalWorkers: 50
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [missions, setMissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [rewards, setRewards] = useState({
    monetary: [],
    health: [],
    equipment: [],
    social: [],
    instant: []
  });

  // Multilingual content
  const content = {
    en: {
      tagline: "Your efforts make our city cleaner!",
      points: "Points",
      level: "Level",
      nextLevel: "Next Level",
      rank: "Rank",
      leaderboard: "Leaderboard",
      rewards: "Rewards",
      missions: "Missions",
      dashboard: "Dashboard",
      monetary: "Monetary",
      health: "Health & Safety",
      equipment: "Equipment",
      social: "Social Welfare",
      instant: "Instant Rewards",
      claim: "Claim Now",
      claimed: "Claimed",
      upcoming: "Upcoming",
      dailyMissions: "Daily Missions",
      weeklyMissions: "Weekly Missions",
      communityPool: "Community Pool",
      familyBenefits: "Family Benefits",
      recyclingBonus: "Recycling Bonus",
      pointsToNext: "points to next level",
      congratulations: "Congratulations!",
      rewardUnlocked: "You've unlocked a new reward!",
      continue: "Continue",
      viewAll: "View All",
      notEnoughPoints: "Not enough points",
      target: "Target",
      progress: "Progress",
      daysLeft: "days left",
      hoursLeft: "hours left",
      workers: "workers",
      redeem: "Redeem",
      viewDetails: "View Details"
    },
    hi: {
      tagline: "आपके प्रयास हमारे शहर को साफ बनाते हैं!",
      points: "अंक",
      level: "स्तर",
      nextLevel: "अगला स्तर",
      rank: "रैंक",
      leaderboard: "लीडरबोर्ड",
      rewards: "इनाम",
      missions: "मिशन",
      dashboard: "डैशबोर्ड",
      monetary: "मौद्रिक",
      health: "स्वास्थ्य और सुरक्षा",
      equipment: "उपकरण",
      social: "सामाजिक कल्याण",
      instant: "तत्काल इनाम",
      claim: "अभी दावा करें",
      claimed: "दावा किया गया",
      upcoming: "आगामी",
      dailyMissions: "दैनिक मिशन",
      weeklyMissions: "साप्ताहिक मिशन",
      communityPool: "सामुदायिक पूल",
      familyBenefits: "पारिवारिक लाभ",
      recyclingBonus: "रीसाइक्लिंग बोनस",
      pointsToNext: "अगले स्तर तक अंक",
      congratulations: "बधाई हो!",
      rewardUnlocked: "आपने एक नया इनाम अनलॉक किया है!",
      continue: "जारी रखें",
      viewAll: "सभी देखें",
      notEnoughPoints: "पर्याप्त अंक नहीं",
      target: "लक्ष्य",
      progress: "प्रगति",
      daysLeft: "दिन शेष",
      hoursLeft: "घंटे शेष",
      workers: "कर्मचारी",
      redeem: "भुनाना",
      viewDetails: "विवरण देखें"
    },
    ta: {
      tagline: "உங்கள் முயற்சிகள் நகரத்தை சுத்தமாக்குகின்றன!",
      points: "புள்ளிகள்",
      level: "நிலை",
      nextLevel: "அடுத்த நிலை",
      rank: "ரேங்க்",
      leaderboard: "முதலிடம்",
      rewards: "வெகுமதிகள்",
      missions: "பணிகள்",
      dashboard: "டாஷ்போர்டு",
      monetary: "பண",
      health: "சுகாதாரம் & பாதுகாப்பு",
      equipment: "உபகரணங்கள்",
      social: "சமூக நலன்",
      instant: "உடனடி வெகுமதிகள்",
      claim: "இப்போது கோருங்கள்",
      claimed: "கோரப்பட்டது",
      upcoming: "வரவிருக்கும்",
      dailyMissions: "தினசரி பணிகள்",
      weeklyMissions: "வாராந்திர பணிகள்",
      communityPool: "சமூக குழு",
      familyBenefits: "குடும்ப நலன்கள்",
      recyclingBonus: "மறுசுழற்சி போனஸ்",
      pointsToNext: "அடுத்த நிலைக்கு புள்ளிகள்",
      congratulations: "வாழ்த்துக்கள்!",
      rewardUnlocked: "நீங்கள் ஒரு புதிய வெகுமதியை திறந்துவிட்டீர்கள்!",
      continue: "தொடரவும்",
      viewAll: "அனைத்தையும் காட்டு",
      notEnoughPoints: "போதுமான புள்ளிகள் இல்லை",
      target: "இலக்கு",
      progress: "முன்னேற்றம்",
      daysLeft: "நாட்கள் மீதம்",
      hoursLeft: "மணிநேரம் மீதம்",
      workers: "தொழிலாளர்கள்",
      redeem: "பரிமாறிக் கொள்ளுங்கள்",
      viewDetails: "விவரங்களைக் காண்க"
    }
  };

  // Initialize data
  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = () => {
      // Sample missions
      setMissions([
        { id: 1, title: 'Complete 50 bins this week', target: 50, progress: 32, points: 500, type: 'weekly', daysLeft: 3 },
        { id: 2, title: 'Report 5 mixed waste violations', target: 5, progress: 2, points: 250, type: 'weekly', daysLeft: 3 },
        { id: 3, title: 'Zero absenteeism this month', target: 30, progress: 12, points: 1000, type: 'monthly', daysLeft: 18 },
        { id: 4, title: 'Complete safety training', target: 1, progress: 0, points: 200, type: 'daily', hoursLeft: 12 }
      ]);

      // Sample leaderboard
      setLeaderboard([
        { rank: 1, name: 'Vijay Singh', points: 2450, level: 'Platinum' },
        { rank: 2, name: 'Sunita Devi', points: 2100, level: 'Gold' },
        { rank: 3, name: 'Arun Kumar', points: 1950, level: 'Gold' },
        { rank: 4, name: 'Priya M', points: 1800, level: 'Gold' },
        { rank: 5, name: 'Rahul Sharma', points: 1650, level: 'Silver' },
        { rank: 11, name: 'You', points: 1250, level: 'Silver', highlight: true },
      ]);

      // Sample rewards
      setRewards({
        monetary: [
          { id: 1, title: '₹500 Mobile Recharge', points: 500, claimed: false, highlight: true },
          { id: 2, title: '₹1000 UPI Cashback', points: 1000, claimed: false },
          { id: 3, title: '₹2000 Municipal Wallet', points: 2000, claimed: false },
          { id: 4, title: '5% Recycling Bonus', points: 800, claimed: true }
        ],
        health: [
          { id: 1, title: 'Free Health Checkup', points: 750, claimed: false, highlight: true },
          { id: 2, title: 'Safety Kit (Gloves, Mask)', points: 300, claimed: false },
          { id: 3, title: 'Protective Boots', points: 400, claimed: false },
          { id: 4, title: 'Accident Insurance', points: 1500, claimed: false }
        ],
        equipment: [
          { id: 1, title: 'Bicycle Maintenance', points: 600, claimed: false },
          { id: 2, title: 'E-Rickshaw Charging', points: 800, claimed: false, highlight: true },
          { id: 3, title: 'Vehicle Service', points: 1200, claimed: false },
          { id: 4, title: 'Tool Upgrade Kit', points: 900, claimed: false }
        ],
        social: [
          { id: 1, title: 'Education Grant', points: 2500, claimed: false },
          { id: 2, title: 'Subsidized Housing', points: 3000, claimed: false, highlight: true },
          { id: 3, title: 'Monthly Ration Kit', points: 1000, claimed: false },
          { id: 4, title: 'Festival Bonus', points: 800, claimed: true }
        ],
        instant: [
          { id: 1, title: 'Clean Route Champion', points: 0, claimed: true, badge: true },
          { id: 2, title: '1000 Bins Cleared', points: 0, claimed: true, badge: true },
          { id: 3, title: 'Safety First Award', points: 0, claimed: false, badge: true, highlight: true },
          { id: 4, title: 'Team Player Badge', points: 0, claimed: false, badge: true }
        ]
      });

      // Sample unlocked rewards
      setUnlockedRewards([
        { id: 1, title: '₹200 Diwali Bonus', date: '2023-10-20' },
        { id: 2, title: 'Safety Gloves', date: '2023-10-15' },
        { id: 3, title: 'Mobile Recharge ₹100', date: '2023-10-10' }
      ]);
    };

    fetchData();
  }, []);

  // Handle reward claiming
  const handleClaimReward = (category, id) => {
    setRewards(prev => {
      const updated = { ...prev };
      updated[category] = updated[category].map(reward => 
        reward.id === id ? { ...reward, claimed: true } : reward
      );
      return updated;
    });

    // Add to unlocked rewards
    const claimedReward = rewards[category].find(r => r.id === id);
    setUnlockedRewards(prev => [
      { id: Date.now(), title: claimedReward.title, date: new Date().toISOString().split('T')[0] },
      ...prev
    ]);

    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // Deduct points (simplified)
    setWorkerInfo(prev => ({
      ...prev,
      points: prev.points - claimedReward.points
    }));
  };

  // Level colors
  const getLevelColor = (level) => {
    switch (level) {
      case 'Bronze': return 'text-amber-800 bg-amber-100 border border-amber-200';
      case 'Silver': return 'text-gray-700 bg-gray-100 border border-gray-200';
      case 'Gold': return 'text-yellow-700 bg-yellow-100 border border-yellow-200';
      case 'Platinum': return 'text-blue-700 bg-blue-100 border border-blue-200';
      case 'Green Champion': return 'text-green-700 bg-green-100 border border-green-200';
      default: return 'text-gray-700 bg-gray-100 border border-gray-200';
    }
  };

  // Render progress bar
  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 border border-gray-300">
      <motion.div 
        className="bg-green-600 h-2.5 rounded-full" 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>
    </div>
  );

  // Render reward card
  const RewardCard = ({ reward, category, canClaim }) => (
    <motion.div 
      className={`bg-white rounded-xl shadow-md p-4 border border-gray-200 ${reward.claimed ? 'opacity-80' : ''} ${
        reward.highlight ? 'ring-2 ring-amber-400 shadow-lg' : ''
      }`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{reward.title}</h3>
        {reward.badge ? (
          <BadgeCheck className="h-5 w-5 text-blue-500" />
        ) : (
          <div className="flex items-center text-amber-600">
            <Coins className="h-4 w-4 mr-1" />
            <span>{reward.points}</span>
          </div>
        )}
      </div>
      
      {reward.claimed ? (
        <div className="flex items-center text-green-600 text-sm">
          <BadgeCheck className="h-4 w-4 mr-1" />
          {content[language].claimed}
        </div>
      ) : (
        <motion.button
          onClick={() => handleClaimReward(category, reward.id)}
          disabled={!canClaim}
          className={`w-full mt-2 py-2 rounded-lg text-sm font-medium flex items-center justify-center border ${
            canClaim ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white border-green-600' : 'bg-gray-200 text-gray-500 border-gray-300'
          }`}
          whileHover={canClaim ? { scale: 1.03 } : {}}
          whileTap={canClaim ? { scale: 0.98 } : {}}
        >
          {canClaim ? content[language].claim : content[language].notEnoughPoints}
        </motion.button>
      )}
      
      {reward.highlight && (
        <div className="mt-2 flex items-center text-xs text-amber-600">
          <ZapIcon className="h-3 w-3 mr-1" />
          <span>Popular Choice</span>
        </div>
      )}
    </motion.div>
  );

  // Render mission card
  const MissionCard = ({ mission }) => (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm text-gray-800">{mission.title}</h3>
        <div className="flex items-center text-amber-600">
          <Coins className="h-4 w-4 mr-1" />
          <span>{mission.points}</span>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{content[language].progress}: {mission.progress}/{mission.target}</span>
          <span>{mission.type === 'daily' ? `${mission.hoursLeft} ${content[language].hoursLeft}` : `${mission.daysLeft} ${content[language].daysLeft}`}</span>
        </div>
        <ProgressBar progress={(mission.progress / mission.target) * 100} />
      </div>
      
      <button className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium flex items-center justify-center border border-blue-200">
        {content[language].viewDetails}
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </motion.div>
  );

  // Confetti component
  const Confetti = () => (
    <AnimatePresence>
      {showConfetti && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none flex justify-center items-center"
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 absolute"
              style={{
                backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][i % 6]
              }}
              initial={{ 
                x: window.innerWidth / 2, 
                y: window.innerHeight / 2,
                scale: 0
              }}
              animate={{
                x: window.innerWidth / 2 + Math.random() * 400 - 200,
                y: window.innerHeight / 2 + Math.random() * 400 - 200,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                ease: "easeOut"
              }}
            />
          ))}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-white p-6 rounded-lg shadow-xl text-center z-10 border border-gray-300"
          >
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2 text-gray-800">{content[language].congratulations}</h3>
            <p className="text-gray-600 mb-4">{content[language].rewardUnlocked}</p>
            <button 
              onClick={() => setShowConfetti(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg border border-green-700"
            >
              {content[language].continue}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-800">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 shadow-md border-b border-teal-700">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold">{workerInfo.name}</h1>
              <p className="text-sm opacity-90">{content[language].tagline}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <Star className="h-5 w-5 mr-1" fill="currentColor" />
                <span className="text-lg font-bold">{workerInfo.points}</span>
              </div>
              <p className="text-xs">{content[language].points}</p>
            </div>
          </div>

          {/* Level and Progress */}
          <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-3 border border-white border-opacity-30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">{content[language].level}</span>
              <span className="text-sm">{content[language].nextLevel}</span>
            </div>
            <div className="mb-2">
              <ProgressBar progress={workerInfo.progress} />
            </div>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(workerInfo.level)}`}>
                {workerInfo.level}
              </span>
              <span className="text-xs">
                {100 - workerInfo.progress} {content[language].pointsToNext}
              </span>
            </div>
          </div>

          {/* Rank */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-1" />
              <span className="text-sm">#{workerInfo.rank} {content[language].rank}</span>
            </div>
            <div className="text-xs">
              {workerInfo.rank}/{workerInfo.totalWorkers} {content[language].workers}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto flex overflow-x-auto">
          {[
            { id: 'dashboard', icon: TrendingUp, label: content[language].dashboard },
            { id: 'monetary', icon: Wallet, label: content[language].monetary },
            { id: 'health', icon: HeartPulse, label: content[language].health },
            { id: 'equipment', icon: Bike, label: content[language].equipment },
            { id: 'social', icon: Home, label: content[language].social },
            { id: 'instant', icon: Gift, label: content[language].instant }
          ].map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 flex flex-col items-center text-xs font-medium border-b-2 ${
                activeTab === tab.id 
                  ? 'text-green-600 border-green-600' 
                  : 'text-gray-500 border-transparent'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="h-5 w-5 mb-1" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leaderboard */}
            <section className="lg:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg flex items-center text-gray-800">
                  <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                  {content[language].leaderboard}
                </h2>
                <button className="text-green-600 text-sm flex items-center">
                  {content[language].viewAll}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
                {leaderboard.map((person, index) => (
                  <motion.div 
                    key={index} 
                    className={`flex items-center justify-between p-3 border-b border-gray-100 ${
                      person.highlight ? 'bg-green-50 font-medium' : 
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center">
                      <span className="w-6 text-center font-medium text-gray-700">{person.rank}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 border ${
                        person.rank <= 3 ? 'bg-amber-100 text-amber-600 border-amber-200' : 'bg-gray-200 text-gray-600 border-gray-300'
                      }`}>
                        {person.rank <= 3 ? <Medal className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </div>
                      <span className={person.highlight ? 'text-green-700' : 'text-gray-700'}>
                        {person.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">{person.points}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(person.level)}`}>
                        {person.level}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Missions */}
            <section className="lg:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg flex items-center text-gray-800">
                  <Target className="h-5 w-5 mr-2 text-blue-500" />
                  {content[language].missions}
                </h2>
                <div className="flex space-x-2">
                  <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs border border-blue-200">
                    {content[language].dailyMissions}
                  </button>
                  <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs border border-gray-200">
                    {content[language].weeklyMissions}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {missions.map(mission => (
                  <MissionCard key={mission.id} mission={mission} />
                ))}
              </div>
            </section>

            {/* Recent Rewards */}
            <section>
              <h2 className="font-bold text-lg mb-3 flex items-center text-gray-800">
                <GiftIcon className="h-5 w-5 mr-2 text-green-500" />
                Recently Unlocked
              </h2>
              
              <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
                {unlockedRewards.map((reward, index) => (
                  <motion.div 
                    key={reward.id} 
                    className={`flex items-center justify-between p-3 border-b border-gray-100 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 border border-green-200">
                        <Gift className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-gray-700">{reward.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">{reward.date}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Community Pool & Recycling Bonus */}
            <section className="space-y-4">
              {/* Community Pool */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow p-4 text-white border border-purple-600">
                <h3 className="font-bold text-lg mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {content[language].communityPool}
                </h3>
                <p className="text-sm mb-3">
                  Join forces with other workers to unlock community benefits!
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="text-xs">Current Goal</div>
                    <div className="font-bold">Community Rest Station</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs">Progress</div>
                    <div className="font-bold">4,250/10,000 pts</div>
                  </div>
                </div>
                <ProgressBar progress={42.5} />
                <button className="w-full mt-3 py-2 bg-white text-purple-600 rounded-lg font-medium border border-white">
                  Contribute Points
                </button>
              </div>

              {/* Recycling Bonus */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow p-4 text-white border border-amber-600">
                <h3 className="font-bold text-lg mb-2 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  {content[language].recyclingBonus}
                </h3>
                <p className="text-sm mb-3">
                  You've earned ₹245 from recycled materials this month!
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs">Available Balance</div>
                    <div className="font-bold">₹1,245</div>
                  </div>
                  <button className="px-4 py-2 bg-white text-amber-600 rounded-lg font-medium border border-white">
                    {content[language].redeem}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Monetary Rewards Tab */}
        {activeTab === 'monetary' && (
          <section>
            <h2 className="font-bold text-lg mb-4 flex items-center text-gray-800">
              <Wallet className="h-5 w-5 mr-2 text-green-500" />
              {content[language].monetary} {content[language].rewards}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.monetary.map(reward => (
                <RewardCard 
                  key={reward.id} 
                  reward={reward} 
                  category="monetary"
                  canClaim={!reward.claimed && workerInfo.points >= reward.points}
                />
              ))}
            </div>
          </section>
        )}

        {/* Health & Safety Rewards Tab */}
        {activeTab === 'health' && (
          <section>
            <h2 className="font-bold text-lg mb-4 flex items-center text-gray-800">
              <HeartPulse className="h-5 w-5 mr-2 text-red-500" />
              {content[language].health} {content[language].rewards}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.health.map(reward => (
                <RewardCard 
                  key={reward.id} 
                  reward={reward} 
                  category="health"
                  canClaim={!reward.claimed && workerInfo.points >= reward.points}
                />
              ))}
            </div>
          </section>
        )}

        {/* Equipment Rewards Tab */}
        {activeTab === 'equipment' && (
          <section>
            <h2 className="font-bold text-lg mb-4 flex items-center text-gray-800">
              <Bike className="h-5 w-5 mr-2 text-blue-500" />
              {content[language].equipment} {content[language].rewards}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.equipment.map(reward => (
                <RewardCard 
                  key={reward.id} 
                  reward={reward} 
                  category="equipment"
                  canClaim={!reward.claimed && workerInfo.points >= reward.points}
                />
              ))}
            </div>
          </section>
        )}

        {/* Social Welfare Rewards Tab */}
        {activeTab === 'social' && (
          <section>
            <h2 className="font-bold text-lg mb-4 flex items-center text-gray-800">
              <Home className="h-5 w-5 mr-2 text-purple-500" />
              {content[language].social} {content[language].rewards}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.social.map(reward => (
                <RewardCard 
                  key={reward.id} 
                  reward={reward} 
                  category="social"
                  canClaim={!reward.claimed && workerInfo.points >= reward.points}
                />
              ))}
            </div>

            {/* Family Benefits */}
            <div className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow p-4 text-white border border-cyan-600">
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {content[language].familyBenefits}
              </h3>
              <p className="text-sm mb-3">
                Your family can access education and health benefits through your rewards!
              </p>
              <button className="w-full py-2 bg-white text-blue-600 rounded-lg font-medium border border-white">
                View Family Benefits
              </button>
            </div>
          </section>
        )}

        {/* Instant Rewards Tab */}
        {activeTab === 'instant' && (
          <section>
            <h2 className="font-bold text-lg mb-4 flex items-center text-gray-800">
              <Gift className="h-5 w-5 mr-2 text-amber-500" />
              {content[language].instant} {content[language].rewards}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rewards.instant.map(reward => (
                <motion.div 
                  key={reward.id} 
                  className={`bg-white rounded-xl shadow-md p-4 text-center border border-gray-200 ${
                    reward.claimed ? 'opacity-100 ring-2 ring-amber-300 shadow-lg' : 'opacity-60'
                  } ${reward.highlight ? 'ring-2 ring-amber-400' : ''}`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center border border-amber-200">
                    <Medal className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-sm mb-2 text-gray-800">{reward.title}</h3>
                  {reward.claimed ? (
                    <div className="flex items-center justify-center text-green-600 text-xs">
                      <BadgeCheck className="h-4 w-4 mr-1" />
                      {content[language].claimed}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Complete tasks to unlock</div>
                  )}
                  
                  {reward.highlight && (
                    <div className="mt-2 flex items-center justify-center text-xs text-amber-600">
                      <Crown className="h-3 w-3 mr-1" />
                      <span>New!</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Digital Badges Collection */}
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Your Badge Collection</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <motion.div 
                    key={i} 
                    className={`aspect-square rounded-full flex items-center justify-center border ${
                      i <= 2 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white border-amber-500' : 'bg-gray-200 text-gray-400 border-gray-300'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {i <= 2 ? (
                      <Medal className="h-6 w-6" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                Unlock more badges by completing special achievements
              </p>
            </div>

            {/* Instant Rewards Info */}
            <div className="mt-6 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl shadow p-4 text-white border border-green-500">
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                How Instant Rewards Work
              </h3>
              <ul className="text-sm space-y-2 mb-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-white text-green-600 flex items-center justify-center mr-2 flex-shrink-0 border border-white">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <span>Complete special missions and challenges</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-white text-green-600 flex items-center justify-center mr-2 flex-shrink-0 border border-white">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <span>Earn badges and instant rewards automatically</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-white text-green-600 flex items-center justify-center mr-2 flex-shrink-0 border border-white">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <span>Show off your achievements to colleagues</span>
                </li>
              </ul>
              <button className="w-full py-2 bg-white text-green-600 rounded-lg font-medium border border-white">
                View Available Challenges
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Confetti Animation */}
      <Confetti />

      {/* Language Selector */}
      <motion.div 
        className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-2 border border-gray-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-transparent border-none text-sm focus:ring-0 text-gray-800"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ta">தமிழ்</option>
        </select>
      </motion.div>
    </div>
  );
};

export default WorkerRewards;