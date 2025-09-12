// src/components/Card.jsx
import React from 'react';

const Card = ({ title, value, icon: Icon, subtitle, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-green-800 rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-green-700 dark:text-green-300">{title}</h3>
          {Icon && <Icon size={18} className="text-green-600 dark:text-green-400" />}
        </div>
      )}
      
      {value && (
        <div className="text-2xl font-bold text-green-900 dark:text-green-100">{value}</div>
      )}
      
      {subtitle && (
        <p className="text-sm text-green-600 dark:text-green-400 mt-1">{subtitle}</p>
      )}
      
      {children}
    </div>
  );
};

export default Card;