// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [currentRole, setCurrentRole] = useState(localStorage.getItem('currentRole') || 'Citizen');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the current role from localStorage to stay in sync with navbar
    const handleStorageChange = () => {
      const role = localStorage.getItem('currentRole') || 'Citizen';
      setCurrentRole(role);
    };

    // Set initial role
    setCurrentRole(localStorage.getItem('currentRole') || 'Citizen');
    
    // Listen for storage changes (when navbar changes role)
    window.addEventListener('storage', handleStorageChange);
    
    // Also set up an interval to check for changes (in case event doesn't fire)
    const intervalId = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // Define footer sections for each role (matching the navbar structure)
  const citizenFooterSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/citizen/home' },
        { name: 'Impact', path: '/guide' },
        { name: 'Training', path: '/training' },
        { name: 'Upload Bins', path: '/upload' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'QR Tracking', path: '/citizenqrpage' },
        { name: 'Report Waste', path: '/report' },
        { name: 'Rewards', path: '/rewards' },
        { name: 'Community', path: '/community' },
        { name: 'Community Impact', path: '/communityimpact' },
      ]
    }
  ];

  const workerFooterSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Dashboard', path: '/worker/dashboard' },
        { name: 'Training', path: '/worker/training' },
        { name: 'Tasks', path: '/worker/tasks' },
        { name: 'Report Complain', path: '/worker/reportcomplaint' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Rewards', path: '/worker/rewards' },
        { name: 'Safety', path: '/worker/safety' },
        { name: 'Helpdesk', path: '/worker/helpdesk' },
      ]
    }
  ];

  const authorityFooterSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Dashboard', path: '/authority/dashboard' },
        { name: 'Manage Citizens', path: '/authority/citizens' },
        { name: 'Manage Workers', path: '/authority/workers' },
      ]
    },
    {
      title: 'Operations',
      links: [
        { name: 'Smart Operating Center', path: '/authority/smartops' },
      ]
    }
  ];

  // Get the appropriate footer sections based on currentRole
  const getFooterSections = () => {
    switch (currentRole) {
      case 'Worker':
        return workerFooterSections;
      case 'Authority':
        return authorityFooterSections;
      case 'Citizen':
      default:
        return citizenFooterSections;
    }
  };

  const footerSections = getFooterSections();

  // Handle portal change from footer
  const handlePortalChange = (portal) => {
    let newRole;
    let newPath;
    
    switch (portal) {
      case 'Citizen Portal':
        newRole = 'Citizen';
        newPath = '/citizen/home';
        break;
      case 'Worker Portal':
        newRole = 'Worker';
        newPath = '/worker/dashboard';
        break;
      case 'Authority Portal':
        newRole = 'Authority';
        newPath = '/authority/dashboard';
        break;
      default:
        return;
    }
    
    // Update localStorage and state
    localStorage.setItem('currentRole', newRole);
    setCurrentRole(newRole);
    
    // Navigate to the new path
    navigate(newPath);
    
    // Dispatch a storage event to notify navbar (and other components)
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <footer className="bg-green-700 dark:bg-green-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <img 
                src="/swachhasebak-logo.jpg" 
                alt="GreenGuard Logo" 
                className="h-10 w-10"
              />
              <span className="ml-2 text-xl font-bold">
                SwachhaSebak
              </span>
            </div>
            <p className="mt-4 text-sm text-white/80">
              Transforming waste management through technology and community participation for a cleaner, greener India.
            </p>
            
            {/* Portal Selection for Footer */}
            {/* <div className="mt-4">
              <label className="text-sm font-semibold text-white">Switch Portal:</label>
              <select 
                className="mt-1 block w-full pl-3 pr-10 py-1 text-base bg-green-800 border border-green-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md text-white"
                value={`${currentRole} Portal`}
                onChange={(e) => handlePortalChange(e.target.value)}
              >
                <option value="Citizen Portal">Citizen Portal</option>
                <option value="Worker Portal">Worker Portal</option>
                <option value="Authority Portal">Authority Portal</option>
              </select>
            </div> */}
          </div>

          {/* Dynamic sections based on role */}
          {footerSections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.path} 
                      className="text-white/80 hover:text-white block py-1"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.path);
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="text-white/80" />
                <span className="ml-2 text-sm text-white/80">
                  support@swachhasebak.in
                </span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-white/80" />
                <span className="ml-2 text-sm text-white/80">
                  1800-123-4567
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6 flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-white/80 hover:text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/80">
            © 2025 SwachhaSebak. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-sm text-white/80 hover:text-white"
                onClick={(e) => e.preventDefault()}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;