import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RequestForm from "./components/RequestDetails";
import TermsOfService from "./components/TermsOfService";
import RumoozPrivacyPolicy from "./components/RumoozPrivacyPolicy";
import Clients from "./components/Clients";
import AdminLogin from "./components/admin/AdminLogin";
import ProfilePage from "./components/admin/Profile";
import useAutoLogout from "./components/AutoLogout";

const App = () => {
  // 🔹 State to track admin login
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!sessionStorage.getItem("token") &&
      sessionStorage.getItem("role") === "admin"
  );

  // 🔹 Listen to storage changes from login/verify
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdminLoggedIn(
        !!sessionStorage.getItem("token") &&
          sessionStorage.getItem("role") === "admin"
      );
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 🔹 Auto-logout hook
  const { showWarning, countdown, stayLoggedIn, forceLogout } = useAutoLogout(
    5,
    20 
  );

  return (
    <Router>
      <div className="font-sans text-slate-900">
        <Routes>
          {/* 🏠 Home */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <About />
                <Services />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* 📋 Request Details */}
          <Route
            path="/request-details"
            element={
              <>
                <Navbar />
                <RequestForm />
                <Footer />
              </>
            }
          />

          {/* 👥 Clients */}
          <Route
            path="/clients"
            element={
              <>
                <Navbar />
                <Clients />
                <Footer />
              </>
            }
          />

          {/* 🔒 Policies */}
          <Route
            path="/privacy-policy"
            element={
              <>
                <Navbar />
                <RumoozPrivacyPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <>
                <Navbar />
                <TermsOfService />
                <Footer />
              </>
            }
          />

          {/* 🔑 Admin Login */}
          <Route
            path="/auth/rumooz/admin-8249f7d9/login"
            element={<AdminLogin />}
          />

          {/* 👤 Profile (Protected Route) */}
          <Route
            path="/profile"
            element={
              !isAdminLoggedIn ? (
                <>
                  <Navbar />
                  <ProfilePage />
                  <Footer />
                </>
              ) : (
                <motion.div
                  className="flex justify-center items-center min-h-screen text-red-500 text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  ❌ Access Denied. Please log in to view this page.
                </motion.div>
              )
            }
          />

          {/* ❌ 404 Page */}
          <Route
            path="*"
            element={
              <motion.div
                className="flex justify-center items-center min-h-screen text-red-500 text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ❌ 404 - Page Not Found
              </motion.div>
            }
          />
        </Routes>

        {/* ⚠️ Auto-Logout Warning (Admin Only) */}
        <AnimatePresence>
          {isAdminLoggedIn && showWarning && (
            <motion.div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900 text-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700 text-center"
              >
                <h3 className="text-xl font-bold text-red-500 mb-4">
                  ⚠️ Session Expiring Soon
                </h3>
                <p className="text-gray-300 mb-4">
                  You will be logged out in{" "}
                  <span className="font-bold text-white">{countdown}</span>{" "}
                  seconds due to inactivity.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={stayLoggedIn}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                  >
                    Stay Logged In
                  </button>
                  <button
                    onClick={forceLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                  >
                    Logout Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
