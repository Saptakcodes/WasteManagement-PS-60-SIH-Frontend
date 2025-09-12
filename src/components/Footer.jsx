// src/components/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-700 dark:bg-green-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="GreenGuard Logo" 
                className="h-10 w-10"
              />
              <span className="ml-2 text-xl font-bold">
                GreenGuard
              </span>
            </div>
            <p className="mt-4 text-sm text-white/80">
              Transforming waste management through technology and community participation for a cleaner, greener India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {["Home", "About Us", "Training", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {["Waste Segregation Guide", "Composting Tutorials", "Recycling Centers", "FAQ"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="text-white/80" />
                <span className="ml-2 text-sm text-white/80">
                  support@greenguard.gov.in
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
                <a key={i} href="#" className="text-white/80 hover:text-white">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/80">
            © 2025 GreenGuard. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
              <a key={link} href="#" className="text-sm text-white/80 hover:text-white">
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
