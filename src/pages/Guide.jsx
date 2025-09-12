// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import {
  Users,
  Recycle,
  Leaf,
  Cpu,
  Trash2,
  Filter,
  Sprout,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  Search,
  Shield,
  Award,
  Globe,
  Zap,
  GraduationCap,
  Trophy,
  MapPin,
  BookOpen,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Guide = () => {
  // Testimonial carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBenefit, setActiveBenefit] = useState(0);

  // Blog posts state
  const [blogPosts] = useState([
    {
      id: 1,
      title: "GreenGuard Launches Community Composting Initiative",
      date: "2023-10-15",
      excerpt: "Our new program helps neighborhoods turn organic waste into nutrient-rich compost.",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "How Technology is Revolutionizing Waste Management",
      date: "2023-10-08",
      excerpt: "Discover the innovative tech solutions making recycling smarter and more efficient.",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "5 Simple Ways to Reduce Your Household Waste",
      date: "2023-10-01",
      excerpt: "Practical tips for minimizing waste and living a more sustainable lifestyle.",
      image: "https://images.unsplash.com/photo-1587334274527-ba54f0b5a357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Annual Sustainability Report Shows Promising Results",
      date: "2023-09-25",
      excerpt: "Our latest report demonstrates significant progress in community recycling rates.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ]);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Community Leader",
      quote: "GreenGuard has transformed how our neighborhood handles waste. We've reduced landfill contribution by 70% in just six months!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Raj Patel",
      role: "Local Business Owner",
      quote: "The recycling incentives program has been fantastic. We're saving money while doing our part for the environment.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Anjali Mehta",
      role: "Environmental Scientist",
      quote: "I'm impressed by GreenGuard's data-driven approach to waste management. Their impact metrics are transparent and credible.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: "Sanjay Kumar",
      role: "Municipal Commissioner",
      quote: "GreenGuard's technology platform has helped our city improve waste collection efficiency by 45% and reduce operational costs.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Platform benefits data
  const benefits = [
    {
      icon: Globe,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint and contribute to a cleaner environment"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Trusted by thousands of households and businesses across India"
    },
    {
      icon: Zap,
      title: "Cost Effective",
      description: "Save money through efficient waste management and recycling incentives"
    },
    {
      icon: Award,
      title: "Government Approved",
      description: "Compliant with all Swachh Bharat Mission guidelines and regulations"
    }
  ];

  // Customer benefits data
  const customerBenefits = [
    {
      id: 1,
      icon: GraduationCap,
      title: "Structured Learning & Certification",
      description: "Access comprehensive training modules and earn a Green Champion Certificate upon completion",
      features: ["Interactive learning modules", "Video tutorials", "Knowledge quizzes", "Official certification"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Start Learning"
    },
    {
      id: 2,
      icon: BarChart3,
      title: "Citizen Dashboard & Rewards",
      description: "Track your environmental impact and earn reward points for sustainable practices",
      features: ["Personal impact dashboard", "Reward points system", "Progress tracking", "Redeemable benefits"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "View Dashboard"
    },
    {
      id: 3,
      icon: BookOpen,
      title: "Interactive Learning Resources",
      description: "Easy-to-follow guides and tutorials for waste segregation, composting, and recycling",
      features: ["Step-by-step guides", "Visual tutorials", "Best practices", "Troubleshooting tips"],
      image: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Explore Resources"
    },
    {
      id: 4,
      icon: MapPin,
      title: "Digital Reporting & Facility Locator",
      description: "Report waste issues and find nearby recycling centers with our interactive map",
      features: ["Issue reporting system", "Recycling center locator", "Collection schedules", "Facility ratings"],
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Find Centers"
    },
    {
      id: 5,
      icon: Trophy,
      title: "Gamification & Recognition",
      description: "Earn badges, climb leaderboards, and get recognized as a Green Champion in your community",
      features: ["Achievement badges", "Community leaderboards", "Green Champion status", "Social recognition"],
      image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "See Achievements"
    },
    {
      id: 6,
      icon: Shield,
      title: "Verified Government-Backed Initiative",
      description: "Participate in a certified program that contributes to national sustainability goals",
      features: ["Government certification", "Official recognition", "Policy alignment", "National impact"],
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c3c6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Learn About Certification"
    }
  ];

  // Intersection Observer refs for animations
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [customerBenefitsRef, customerBenefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [blogRef, blogInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Auto-rotate testimonials
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  // Search form handler
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality as required
    // For now: just logs the query
    console.log("Searching for:", searchQuery);
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
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };
  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };

  // Main render
  return (
    <div className="min-h-screen bg-white dark:bg-green-900 text-green-900 dark:text-emerald-50">
      {/* Hero Section with Search Bar */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-700/90 to-emerald-500/90 dark:from-green-900/90 dark:to-emerald-700/90 z-0"
        />
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center mix-blend-overlay z-0"
        />

        {/* Search Bar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl px-4">
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onSubmit={handleSearch}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search for services, products, or information..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-6 pr-12 rounded-full shadow-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-green-700 hover:text-green-900"
            >
              <Search size={24} />
            </button>
          </motion.form>
        </div>

        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            Revolutionizing Waste Management in India
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl sm:text-2xl mb-10 text-emerald-100"
          >
            Join GreenGuard in creating a sustainable future through technology and community engagement
          </motion.p>
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:bg-emerald-50 transition-colors"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="animate-bounce">
            <ChevronRight size={32} className="text-white rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Problem Statement Section */}
      <section
        ref={problemRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50 dark:bg-green-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={problemInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl font-bold mb-6">
              India's Waste Management Challenge
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-green-700 dark:text-emerald-100 max-w-3xl mx-auto">
              With over 62 million tons of waste generated annually, India faces a critical need for innovative waste management solutions.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={problemInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Trash2,
                title: "Massive Waste Generation",
                description: "Urban India generates 62 million tons of waste annually, with only 70% collected and 20% processed."
              },
              {
                icon: Filter,
                title: "Poor Segregation",
                description: "Less than 30% of households practice waste segregation at source, leading to contamination."
              },
              {
                icon: Sprout,
                title: "Limited Processing",
                description: "Only 20% of collected waste gets processed, with the rest ending up in landfills or water bodies."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-green-700 p-8 rounded-xl shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                    <item.icon size={32} className="text-green-700 dark:text-emerald-100" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-green-700 dark:text-emerald-100">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About GreenGuard Section */}
      <section
        ref={aboutRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={slideInFromLeft}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">What is GreenGuard?</h2>
              <p className="text-lg mb-6">
                GreenGuard is a comprehensive technology platform that connects citizens, waste management professionals,
                and government bodies to create an efficient, transparent, and sustainable waste management ecosystem.
              </p>
              <p className="text-lg mb-8">
                Our mission is to revolutionize waste management in India through innovation, education, and community engagement,
                contributing to the Swachh Bharat Mission and sustainable development goals.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Learn About Our Mission
              </motion.button>
            </motion.div>

            <motion.div
              variants={slideInFromRight}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-emerald-100 dark:bg-emerald-800 p-6 rounded-xl">
                <Users size={48} className="text-green-700 dark:text-emerald-100 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
                <p>Engaging citizens in sustainable practices</p>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-800 p-6 rounded-xl">
                <Cpu size={48} className="text-green-700 dark:text-emerald-100 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tech Driven</h3>
                <p>Leveraging AI and IoT for smart solutions</p>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-800 p-6 rounded-xl">
                <Recycle size={48} className="text-green-700 dark:text-emerald-100 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Circular Economy</h3>
                <p>Promoting recycling and upcycling initiatives</p>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-800 p-6 rounded-xl">
                <Leaf size={48} className="text-green-700 dark:text-emerald-100 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sustainable Future</h3>
                <p>Working towards a cleaner, greener India</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-800 dark:to-emerald-700 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: 50, suffix: "K+", label: "Active Users" },
              { number: 120, suffix: "+", label: "Cities Covered" },
              { number: 75, suffix: "%", label: "Waste Reduction" },
              { number: 25, suffix: "K+", label: "Tons Recycled" }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeIn} className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {statsInView ? (
                    <CountUp end={stat.number} suffix={stat.suffix} duration={2} />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50 dark:bg-green-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl font-bold mb-6">
              Why Choose GreenGuard?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-green-700 dark:text-emerald-100 max-w-3xl mx-auto">
              Our platform offers comprehensive solutions for individuals, communities, and businesses
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-green-700 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                    <benefit.icon size={32} className="text-green-700 dark:text-emerald-100" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-green-700 dark:text-emerald-100">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Benefits Section */}
      <section
        ref={customerBenefitsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={customerBenefitsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl font-bold mb-6">
              Benefits for Citizens
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-green-700 dark:text-emerald-100 max-w-3xl mx-auto">
              Discover how GreenGuard empowers you to make a difference and be rewarded for it
            </motion.p>
          </motion.div>
          <div className="mb-8 flex justify-center">
            <div className="flex flex-wrap gap-2">
              {customerBenefits.map((benefit, index) => (
                <button
                  key={benefit.id}
                  onClick={() => setActiveBenefit(index)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeBenefit === index
                      ? 'bg-green-600 text-white'
                      : 'bg-emerald-100 text-green-700 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-100 dark:hover:bg-emerald-700'
                  }`}
                >
                  {benefit.title}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBenefit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full mr-4">
                    {
                      // render the icon dynamically
                      React.createElement(customerBenefits[activeBenefit].icon, {
                        size: 32,
                        className: "text-green-700 dark:text-emerald-100"
                      })
                    }
                  </div>
                  <h3 className="text-2xl font-semibold">{customerBenefits[activeBenefit].title}</h3>
                </div>
                <p className="text-lg mb-6">{customerBenefits[activeBenefit].description}</p>

                <ul className="space-y-2 mb-8">
                  {customerBenefits[activeBenefit].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  {customerBenefits[activeBenefit].cta}
                  <ArrowRight size={20} className="ml-2" />
                </motion.button>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={customerBenefits[activeBenefit].image}
                  alt={customerBenefits[activeBenefit].title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50 dark:bg-green-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl font-bold mb-6">
              What People Say
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-green-700 dark:text-emerald-100 max-w-3xl mx-auto">
              Hear from our community of environmental champions
            </motion.p>
          </motion.div>
          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-green-700 p-8 md:p-12 rounded-xl shadow-lg"
              >
                <div className="flex items-start mb-6">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover mr-6"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{testimonials[currentTestimonial].name}</h3>
                    <p className="text-green-600 dark:text-emerald-200">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                <p className="text-lg italic">"{testimonials[currentTestimonial].quote}"</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentTestimonial === index ? 'bg-green-600' : 'bg-green-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 p-2 bg-white dark:bg-green-600 rounded-full shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 p-2 bg-white dark:bg-green-600 rounded-full shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-800 dark:to-emerald-700 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl mb-10 max-w-3xl mx-auto">
              Join thousands of environmentally conscious citizens and start your journey towards sustainable living today.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:bg-emerald-50 transition-colors"
              >
                Sign Up Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Download App
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        ref={blogRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl font-bold mb-6">
              Latest from Our Blog
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-green-700 dark:text-emerald-100 max-w-3xl mx-auto">
              Stay updated with the latest news, tips, and insights on waste management and sustainability
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={fadeIn}
                className="bg-emerald-50 dark:bg-green-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-green-600 dark:text-emerald-200 mb-3">
                    <Calendar size={16} className="mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-green-700 dark:text-emerald-100 mb-4">{post.excerpt}</p>
                  <button className="text-green-600 dark:text-emerald-200 font-semibold hover:underline flex items-center">
                    Read More
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <motion.div
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Articles
            </motion.button>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Guide;
