// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  LogOut,
  Sun,
  Moon,
  Search,
  Home,
  GraduationCap,
  Upload,
  AlertCircle,
  Gift,
  Users,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  QrCode,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ userRole }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);};

  const notifications = [
    { id: 1, text: 'Your compost kit is ready for pickup', time: '10 mins ago' },
    { id: 2, text: 'You earned 50 Green Points!', time: '1 hour ago' },
    { id: 3, text: 'Community clean-up drive this weekend', time: '2 days ago' },
  ];

  const navItems = [
    { name: 'Home', icon: Home, path: '/', role: 'all' },
    { name: 'Impact', icon: TrendingUp, path: '/guide', role: 'citizen' },
    { name: 'Training', icon: GraduationCap, path: '/training', role: 'citizen' },
    { name: 'Upload Bins', icon: Upload, path: '/upload', role: 'citizen' },
    { name: 'QR Tracking', icon:  QrCode, path: '/citizenqrpage', role: 'citizen' },
    { name: 'Report Waste', icon: AlertCircle, path: '/report', role: 'citizen' },
    { name: 'Rewards', icon: Gift, path: '/rewards', role: 'citizen' },
    { name: 'Community', icon: Users, path: '/community', role: 'citizen' },
    
  ];

  return (
    <header className={`sticky top-0 z-50 bg-emerald-50 dark:bg-green-900 shadow-md transition-all duration-300 ${scrolled ? 'py-0' : 'py-2'}`}>
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left section - Logo */}
        <div className="flex items-center">
          <div className="flex items-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">G</span>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="ml-2 text-xl font-bold text-green-700 dark:text-emerald-300 hidden sm:block"
            >
              GreenGuard
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="ml-2 text-xl font-bold text-green-700 dark:text-emerald-300 sm:hidden"
            >
              GG
            </motion.span>
          </div>
        </div>

        {/* Middle section - Navigation items (visible on medium screens and up) */}
        <nav className="hidden md:flex items-center space-x-1 mx-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-green-800 dark:text-green-100 hover:bg-emerald-100 dark:hover:bg-green-800"
            >
              <item.icon size={16} className="mr-1" />
              {item.name}
            </motion.a>
          ))}
        </nav>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-full text-green-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-green-800"
          >
            <Search size={20} />
          </motion.button>

          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-green-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-green-800 hidden sm:block"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-full text-green-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-green-800 relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-green-800 rounded-md shadow-lg py-1 z-50 max-h-96 overflow-y-auto border border-green-200 dark:border-green-700"
                >
                  <div className="px-4 py-2 border-b border-green-200 dark:border-green-700 sticky top-0 bg-white dark:bg-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-100">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-4 py-3 hover:bg-emerald-50 dark:hover:bg-green-700 cursor-pointer border-b border-green-100 dark:border-green-600 last:border-b-0"
                      >
                        <p className="text-sm text-green-800 dark:text-green-100">
                          {notification.text}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                          {notification.time}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-green-800"
              aria-label="User profile"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center shadow-md">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-green-800 dark:text-emerald-300 hidden lg:block">
                {userRole || 'Guest'}
              </span>
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-green-800 rounded-md shadow-lg py-1 z-50 border border-green-200 dark:border-green-700"
                >
                  <div className="px-4 py-2 border-b border-green-200 dark:border-green-700">
                    <p className="text-sm text-green-600 dark:text-green-300">Signed in as</p>
                    <p className="text-sm font-medium text-green-800 dark:text-green-100">
                      {userRole || 'Guest'}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {/* Handle profile */}}
                      className="block w-full text-left px-4 py-2 text-sm text-green-700 dark:text-green-200 hover:bg-emerald-50 dark:hover:bg-green-700"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => {/* Handle settings */}}
                      className="block w-full text-left px-4 py-2 text-sm text-green-700 dark:text-green-200 hover:bg-emerald-50 dark:hover:bg-green-700"
                    >
                      Settings
                    </button>
                  </div>
                  <div className="py-1 border-t border-green-200 dark:border-green-700">
                    <button
                      onClick={() => {/* Handle logout */}}
                      className="flex items-center w-full px-4 py-2 text-sm text-green-700 dark:text-green-200 hover:bg-emerald-50 dark:hover:bg-green-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-green-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-green-800 md:hidden"
            aria-label="Mobile menu"
          >
            {mobileMenuOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile search bar (appears below navbar when active) */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-green-200 dark:border-green-700 bg-emerald-50 dark:bg-green-900 overflow-hidden"
          >
            <div className="p-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-green-300 dark:border-green-600 rounded-lg bg-white dark:bg-green-800 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-2.5 text-green-400 hover:text-green-600 dark:hover:text-green-300"
                >
                  <ChevronUp size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu dropdown */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ y: -100, opacity: 0 }} // start above viewport
      animate={{ y: 0, opacity: 1 }}    // slide down into view
      exit={{ y: -100, opacity: 0 }}    // slide up when closing
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="md:hidden border-t border-green-200 dark:border-green-700 bg-emerald-50 dark:bg-green-900 overflow-hidden shadow-md"
      style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50 }}
    >
      <nav className="px-2 pt-2 pb-4 space-y-1">
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-green-800 dark:text-green-100 hover:bg-emerald-100 dark:hover:bg-green-800"
          >
            <item.icon size={18} className="mr-3" />
            {item.name}
          </motion.a>
        ))}

        {/* Dark mode toggle for mobile */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-green-800 dark:text-green-100 hover:bg-emerald-100 dark:hover:bg-green-800"
        >
          {darkMode ? (
            <>
              <Sun size={18} className="mr-3" />
              Light Mode
            </>
          ) : (
            <>
              <Moon size={18} className="mr-3" />
              Dark Mode
            </>
          )}
        </button>
      </nav>
    </motion.div>
  )}
</AnimatePresence>
    </header>
  );
};

export default Navbar;