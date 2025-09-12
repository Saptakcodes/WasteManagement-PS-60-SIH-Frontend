import React, { useState, useEffect } from "react";

export default function TestTheme() {
  const [darkMode, setDarkMode] = useState(false);

  // On mount, check saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Sync changes to <html> and localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-500">
      <h1 className="text-4xl font-bold mb-6">🌗 Light / Dark Mode Test</h1>

      <p className="mb-6 text-lg">
        Current Mode: {darkMode ? "🌙 Dark" : "☀️ Light"}
      </p>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300
                   bg-dark text-light 
                   dark:bg-light dark:text-dark"
      >
        Toggle Mode
      </button>
    </div>
  );
}
