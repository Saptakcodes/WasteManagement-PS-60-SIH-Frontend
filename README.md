# ♻️ Waste Management System - Frontend

A comprehensive waste management solution built for **Smart India Hackathon (PS-60)** that enables efficient waste collection, tracking, and management through a role-based web application.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Team](#-team)
- [License](#-license)

---

## 🌟 Overview
The proposed solution is a QR code-based digital waste management system integrated with a gamified rewards platform. The prototype consists of a QR Code generation and scanning system, a centralized backend platform, a gamified rewards engine (GreenGuard), and a multi-role user interface (for Citizens, Collectors, and Supervisors).
 
The system supports **multiple user roles** with tailored interfaces and functionalities.

---

## ✨ Features

### 🔐 Multi-Role Authentication
- **Admin**: Complete system oversight and management    
- **Worker**: Waste collection and service management with training  
- **Citizen**: Waste disposal scheduling, complaint, reward system, penalization, community  

### 📊 Dashboard Analytics
- Real-time waste collection statistics  
- Points tracking and reports  
- Complaint resolution metrics  
- Interactive charts and data visualization  

### 🗑️ Waste Management
- Smart waste collection scheduling  
- Route optimization for workers  
- Waste categorization (Dry/Wet/Hazardous)  
- Collection history and tracking  

### 🐛 Complaint System  
- Status tracking (Open, In Progress, Resolved)  
- Priority-based issue resolution  
- Feedback mechanism  

### 💰 Reward Integration
- Green Points are given on good performance from individual or community   
- Perks like tax reduction, electricity bill reduction  
- Reward history with ranking system  
- Workers points for workers to get perks like free health checkup, masks, etc

---

## 📸 Demo

- **Login & Authentication**  
  ![Login](./demo/login.png)  

- **Admin Dashboard**  
  ![Admin Dashboard](./demo/admin-dashboard.png)  

- **Worker Interface**  
  ![Vendor Dashboard](./demo/vendor-dashboard.png)  

- **Citizen Portal**  
  ![Customer Dashboard](./demo/customer-dashboard.png)  

- **Complaint Management**  
  ![Complaint System](./demo/complaint-system.png)  

- **Mobile Responsive Design**  
  ![Mobile View](./demo/mobile-view.png)  

---

## 🚀 Installation

### Prerequisites
- Node.js (version **14 or higher**)  
- npm or yarn package manager  

### Setup Instructions

Clone the repository:
```bash
git clone https://github.com/Saptakcodes/WasteManagement-PS-60-SIH-Frontend.git
cd WasteManagement-PS-60-SIH-Frontend
```

### Install Dependencies

```bash
npm install
```

### Format for .env file in root directory

```bash
REACT_APP_API_BASE_URL=your_backend_api_url
REACT_APP_MAP_API_KEY=your_map_api_key
REACT_APP_APP_NAME=WasteManagement
```

### Starting the server

```bash
npm run dev
```

## 🛠 Technology Stack

### Frontend Development
- **React.js** - Component-based UI library
- **Vite** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript features
- **React Router DOM** - Single-page application routing
- **React Context API** - Global state management

### Backend Development
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Minimal web framework for APIs
- **RESTful APIs** - Architectural style for web services

### Database
- **MongoDB** - Document-based NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js

### Styling & UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Components** - Reusable React components
- **React Icons** - Comprehensive icon library
- **Responsive Design** - Mobile-first approach

### Data Visualization
- **Recharts** - Composable charting library
- **Custom Charts** - Analytics for waste management metrics

### Development Tools
- **ESLint** - JavaScript code linting
- **Prettier** - Automated code formatting
- **Git** - Version control system

## 📁 Project Structure


### Detailed Breakdown

**`/components`** - Reusable UI Components
- `common/` - Shared components like buttons, modals, loaders
- `forms/` - Form elements with validation
- `charts/` - Data visualization components for analytics
- `layout/` - Structural components for page layouts

**`/pages`** - Application Pages
- `auth/` - Authentication flows (login, registration)
- `dashboard/` - Role-specific dashboard views
- `complaints/` - Complaint creation and management
- `waste/` - Waste collection scheduling and tracking
- `profile/` - User profile and account management

**Supporting Directories**
- `hooks/` - Custom React hooks for reusable logic
- `context/` - Global state management using React Context
- `types/` - TypeScript type definitions and interfaces
- `utils/` - Helper functions and utilities
- `assets/` - Static resources (images, icons, fonts)
- `styles/` - Global CSS and Tailwind configurations

## 👥 Team

**Team Hacktrix** - Smart India Hackathon 2023 | PS-60

## 📄 License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
