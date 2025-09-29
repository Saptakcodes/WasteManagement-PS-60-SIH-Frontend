// src/components/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
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
  Clock,
  Search,
  TrendingUp,
  Shield,
  Award,
  Globe,
  Zap,
  Target,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';



const Home = () => {
  // State for testimonial carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  
  // State for blog posts
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "SwachhaSebak Launches Community Composting Initiative",
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
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Annual Sustainability Report Shows Promising Results",
      date: "2023-09-25",
      excerpt: "Our latest report demonstrates significant progress in community recycling rates.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ]);

  // Featured services/products
  const featuredServices = [
    {
      id: 1,
      title: "Smart Waste Bins",
      description: "IoT-enabled bins that monitor fill levels and optimize collection routes",
      image: "https://images.unsplash.com/photo-1587334207810-491003798e7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹4,999",
      rating: 4.8
    },
    {
      id: 2,
      title: "Composting Kit",
      description: "Home composting solution for organic waste with odor control",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹2,499",
      rating: 4.6
    },
    {
      id: 3,
      title: "Recycling Collection",
      description: "Scheduled pickup service for recyclable materials with rewards",
      image: "https://images.unsplash.com/photo-1577720643272-265f0936742f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹299/month",
      rating: 4.9
    },
    {
      id: 4,
      title: "Waste Audit",
      description: "Professional assessment of your waste streams and reduction plan",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹1,999",
      rating: 4.7
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Community Leader",
      quote: "SwachhaSebak has transformed how our neighborhood handles waste. We've reduced landfill contribution by 70% in just six months!",
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
      quote: "I'm impressed by SwachhaSebak's data-driven approach to waste management. Their impact metrics are transparent and credible.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: "Sanjay Kumar",
      role: "Municipal Commissioner",
      quote: "SwachhaSebak's technology platform has helped our city improve waste collection efficiency by 45% and reduce operational costs.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Benefits data
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

  // Intersection Observer refs for animations
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
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

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
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
            Join SwachhaSebak in creating a sustainable future through technology and community engagement
          </motion.p>
          <motion.div 
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="/login">Get started</a>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <a href="/guide">Learn More</a>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="animate-bounce w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Problem Statement Section */}
      <section 
        ref={problemRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={problemInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">The Waste Management Challenge in India</h2>
            <p className="text-xl max-w-5xl mx-auto">
              India faces a significant waste management crisis that demands immediate attention and innovative solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={problemInView ? "visible" : "hidden"}
              variants={slideInFromLeft}
            >
              <div className="bg-emerald-50 dark:bg-green-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-green-700 dark:text-emerald-300">Key Statistics (FY 2021-22)</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-700 dark:bg-emerald-600 rounded-full p-2 mr-4 flex-shrink-0">
                      <Trash2 size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">1.7 Lakh Tonnes</h4>
                      <p className="text-green-600 dark:text-emerald-100">Municipal solid waste generated daily across India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-700 dark:bg-emerald-600 rounded-full p-2 mr-4 flex-shrink-0">
                      <Filter size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Only 54% Treated</h4>
                      <p className="text-green-600 dark:text-emerald-100">Of the total waste generated is scientifically treated</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-700 dark:bg-emerald-600 rounded-full p-2 mr-4 flex-shrink-0">
                      <Target size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">24% to Landfills</h4>
                      <p className="text-green-600 dark:text-emerald-100">Ends up in landfills, causing environmental damage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-700 dark:bg-emerald-600 rounded-full p-2 mr-4 flex-shrink-0">
                      <Eye size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">22% Unaccounted</h4>
                      <p className="text-green-600 dark:text-emerald-100">Remains unaccounted due to leakages in waste management chain</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700 dark:text-red-200">
                    This unaccounted waste is often burned or disposed of in open areas, drains, or water bodies, posing severe environmental and public health risks.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={problemInView ? "visible" : "hidden"}
              variants={slideInFromRight}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-emerald-300">Our Solution</h3>
                <p className="text-lg mb-6">
                  SwachhaSebak addresses these challenges through a comprehensive technology platform that connects citizens, waste workers, and authorities to create an efficient, transparent waste management ecosystem.
                </p>
                
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-700 dark:to-emerald-600 rounded-xl p-6 text-white">
                  <h4 className="text-xl font-semibold mb-3">Key Features of Our Platform</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Smart waste collection scheduling and tracking
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Digital payment and incentive systems for recycling
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Real-time monitoring of waste processing facilities
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Community engagement and education programs
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Data analytics for policymakers and urban planners
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50 dark:bg-green-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl max-w-3xl mx-auto">
              SwachhaSebak is committed to revolutionizing waste management through innovative technology, community engagement, and sustainable practices that create a cleaner, greener India.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, title: "Community Participation", desc: "Engaging citizens in collective action for cleaner neighborhoods." },
              { icon: Filter, title: "Waste Segregation", desc: "Promoting proper waste separation at source for effective recycling." },
              { icon: Recycle, title: "Recycling & Composting", desc: "Transforming waste into valuable resources through advanced processing." },
              { icon: Cpu, title: "Technology & Innovation", desc: "Leveraging smart technology for efficient waste management systems." }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="p-3 bg-emerald-100 dark:bg-green-600 rounded-full mb-4">
                  <item.icon size={30} className="text-green-700 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-green-600 dark:text-emerald-100">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works / Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Our simple process makes sustainable waste management accessible to everyone.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Trash2, step: "1", title: "Collect Waste", desc: "Schedule pickups or drop off waste at designated centers." },
              { icon: Filter, step: "2", title: "Segregate Properly", desc: "Use our guidelines to separate recyclables, organics, and other waste." },
              { icon: Recycle, step: "3", title: "Recycle or Compost", desc: "We process materials efficiently to maximize recycling rates." },
              { icon: BarChart3, step: "4", title: "Track Impact", desc: "Monitor your environmental contribution through our dashboard." }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="relative bg-emerald-50 dark:bg-green-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-700 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold opacity-10 group-hover:opacity-20 transition-opacity">
                  {item.step}
                </div>
                <div className="p-3 bg-green-700 dark:bg-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <item.icon size={30} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-green-600 dark:text-emerald-100">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics / Impact Section */}
      <section 
        ref={statsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-900 dark:to-emerald-800 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">India's Waste Management Progress</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Current infrastructure and our potential impact in addressing the waste crisis.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { value: 170339, suffix: "TPD", label: "Waste Generated Daily", source: "CPCB 2021-22" },
              { value: 54, suffix: "%", label: "Scientifically Treated", source: "National Average" },
              { value: 249, suffix: "", label: "Waste-to-Energy Plants", source: "Across India" },
              { value: 819, suffix: "", label: "Biomass Power Plants", source: "Nationwide" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {statsInView ? (
                    <CountUp 
                      end={stat.value} 
                      duration={2.5} 
                      separator="," 
                    />
                  ) : 0}
                  {stat.suffix}
                </div>
                <div className="text-lg font-medium mb-1">{stat.label}</div>
                <div className="text-sm opacity-80">{stat.source}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>





      {/* Customer & Environmental Benefits Section */}
<section 
  className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50 dark:bg-gray-900"
>
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="text-center mb-16"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">
        Why Choose Us?
      </h2>
      <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
        Our platform not only makes your life easier but also helps protect the planet 🌍
      </p>
    </motion.div>

    {/* Benefits Grid */}
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {[
        {
          id: 1,
          title: "Cost Savings",
          description: "Save money through optimized waste collection and recycling credits.",
          icon: "💰"
        },
        {
          id: 2,
          title: "Convenience",
          description: "Easily schedule pickups and track your waste management from anywhere.",
          icon: "📱"
        },
        {
          id: 3,
          title: "Cleaner Communities",
          description: "Reduce pollution and improve sanitation in your locality.",
          icon: "🏡"
        },
        {
          id: 4,
          title: "Eco-Friendly",
          description: "Support sustainable recycling practices and reduce landfill waste.",
          icon: "🌱"
        },
        {
          id: 5,
          title: "Rewards & Recognition",
          description: "Earn points and rewards for contributing to a cleaner environment.",
          icon: "🎁"
        },
        {
          id: 6,
          title: "Future Impact",
          description: "Help build a greener future for the next generations.",
          icon: "🌍"
        },
      ].map((benefit) => (
        <motion.div
          key={benefit.id}
          variants={scaleIn}
          whileHover={{ y: -8 }}
          className="bg-white dark:bg-green-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
        >
          <div className="text-5xl mb-4">{benefit.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-emerald-300">
            {benefit.title}
          </h3>
          <p className="text-gray-600 dark:text-emerald-100">
            {benefit.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>






      {/* Benefits/Why Choose Us Section */}
      <section 
        ref={benefitsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose SwachhaSebak?</h2>
            <p className="text-xl max-w-3xl mx-auto">
              We provide comprehensive solutions that benefit citizens, workers, and authorities alike.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-emerald-50 dark:bg-green-800 rounded-xl p-6 flex items-start hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-green-700 dark:bg-emerald-600 rounded-full mr-4 flex-shrink-0">
                  <benefit.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-green-600 dark:text-emerald-100">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials / Community Section */}
      <section 
        ref={testimonialsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50 dark:bg-green-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">What Our Community Says</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Hear from citizens, workers, and authorities who are making a difference with GreenGuard.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div 
              className="overflow-hidden rounded-2xl bg-white dark:bg-green-700 shadow-xl"
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
                  className="p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                      <img 
                        src={testimonials[currentTestimonial].avatar} 
                        alt={testimonials[currentTestimonial].name}
                        className="w-24 h-24 rounded-full object-cover shadow-md"
                      />
                    </div>
                    <div>
                      <p className="text-lg md:text-xl italic mb-6">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                      <div>
                        <div className="font-semibold text-green-700 dark:text-emerald-300">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-green-600 dark:text-emerald-200">
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-green-600 rounded-full p-2 shadow-md hover:shadow-lg transition-all"
            >
              <ChevronLeft size={24} className="text-green-700 dark:text-white" />
            </button>
            <button 
              onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-green-600 rounded-full p-2 shadow-md hover:shadow-lg transition-all"
            >
              <ChevronRight size={24} className="text-green-700 dark:text-white" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-green-700 dark:bg-emerald-400' : 'bg-green-300 dark:bg-green-500'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section 
        ref={ctaRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-emerald-500 dark:from-green-800 dark:to-emerald-700 text-white"
      >
        <motion.div
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join the SwachhaSebak Revolution!</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Be part of the solution to India's waste management challenge. Together, we can create a cleaner, greener future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <a href="/register" className="flex items-center">
              Sign Up <ArrowRight size={20} className="ml-2" />
              </a>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <a href="/authority/dashboard">For Municipalities</a>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-emerald-700 dark:bg-green-900 text-white font-semibold rounded-full hover:bg-emerald-800 dark:hover:bg-green-800 transition-all duration-300"
            >
              <a href="/worker/dashboard">For Workers</a>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Latest News / Blog Section */}
      <section 
        ref={blogRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Latest News & Insights</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Stay updated with the latest developments in sustainable waste management.
            </p>
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
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className="bg-emerald-50 dark:bg-green-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-green-600 dark:text-emerald-300 mb-3">
                    <Calendar size={16} className="mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-green-700 dark:group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-green-600 dark:text-emerald-100 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center text-green-700 dark:text-emerald-300 font-semibold group-hover:underline">
                    Read more <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;