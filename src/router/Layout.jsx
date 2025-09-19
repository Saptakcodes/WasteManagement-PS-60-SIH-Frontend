// src/Layout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIAssistant from "../components/AI-Assistant";

export default function Layout() {
  const [userRole, setUserRole] = useState("Citizen"); // Default role
  const navigate = useNavigate();

  // Function to handle role changes and redirect to appropriate landing page
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    
    // Redirect to the appropriate landing page based on the new role
    switch (newRole) {
      case "Worker":
        navigate("/worker/dashboard");
        break;
      case "Authority":
        navigate("/authority/dashboard");
        break;
      case "Citizen":
      default:
        navigate("/citizen/home");
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-500">
      {/* Navbar */}
      <Navbar userRole={userRole} setUserRole={handleRoleChange} />

      <Outlet context={{ userRole, setUserRole: handleRoleChange }} />

      {/* Footer */}
      <AIAssistant/>
      <Footer />
    </div>
  );
}