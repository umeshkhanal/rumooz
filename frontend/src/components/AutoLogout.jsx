import { useEffect, useRef, useState } from "react";

export default function useAutoLogout(timeoutMinutes = 5, warningSeconds = 30) {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(warningSeconds);
  const [isAdmin, setIsAdmin] = useState(!!sessionStorage.getItem("role") && sessionStorage.getItem("role") === "admin");

  const inactivityRef = useRef(null);
  const countdownRef = useRef(null);

  // Force logout
  const forceLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role"); // clear admin role
    setIsAdmin(false);
    window.dispatchEvent(new Event("storage")); // triggers App.jsx re-render
    setShowWarning(false);
    clearInterval(countdownRef.current);
    clearTimeout(inactivityRef.current);
  };

  // Start warning countdown
  const startCountdown = () => {
    setCountdown(warningSeconds);
    setShowWarning(true);

    clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current);
          forceLogout();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  // Reset inactivity timer
  const resetInactivity = () => {
    clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(
      startCountdown,
      timeoutMinutes * 60 * 1000 - warningSeconds * 1000
    );
  };

  // Listen to user activity
  useEffect(() => {
    if (!isAdmin) return; // only track if logged in as admin

    resetInactivity();

    const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart", "click"];
    events.forEach((ev) => window.addEventListener(ev, resetInactivity));

    return () => {
      clearTimeout(inactivityRef.current);
      clearInterval(countdownRef.current);
      events.forEach((ev) => window.removeEventListener(ev, resetInactivity));
    };
  }, [timeoutMinutes, warningSeconds, isAdmin]);

  // Stay logged in
  const stayLoggedIn = () => {
    setShowWarning(false);
    setCountdown(warningSeconds);
    resetInactivity();
  };

  // Listen for storage changes (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(!!sessionStorage.getItem("role") && sessionStorage.getItem("role") === "admin");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { showWarning, countdown, stayLoggedIn, forceLogout, isAdmin };
}
