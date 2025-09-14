// src/Layout.jsx
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIAssistant from "../components/AI-Assistant";

export default function Layout() {
  const [userRole, setUserRole] = useState("citizen"); // Default role

  return (
    <div className="min-h-screen flex flex-col bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-500">
      {/* Navbar */}
      <Navbar userRole={userRole} />

      <Outlet context={{ userRole, setUserRole }} />

      {/* Footer */}
      <AIAssistant/>
      <Footer />
    </div>
  );
}
