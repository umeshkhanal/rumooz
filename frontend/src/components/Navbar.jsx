import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { assets } from "../assets/assets";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsOpen(!isOpen);

  // Track scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "contact"];
      const scrollY = window.scrollY + 100; // offset for navbar height
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Navbar background */}
      <div className="w-full bg-gray-900 md:bg-transparent md:backdrop-blur-none md:shadow-none md:relative md:top-0 md:z-auto">
        <div className="container mx-auto flex justify-between items-center py-4 px-6 md:text-xl text-green-600 font-bold">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={assets.logoName}
              alt="Rumooz Logo"
              className="h-5 w-20 md:h-10 md:w-30"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center h-20">
            {["home", "about", "services", "contact"].map((sec) => (
              <Link
                key={sec}
                to={`/#${sec}`}
                smooth
                duration={500}
                className={`cursor-pointer relative px-2 py-1 ${
                  activeSection === sec
                    ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-green-500"
                    : ""
                } hover:text-green-900`}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <span className="text-2xl">✖</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg">
          <nav className="flex flex-col space-y-4 py-6 px-6 font-bold text-white">
            {["home", "about", "services", "contact"].map((sec) => (
              <Link
                key={sec}
                onClick={toggleMenu}
                to={`/#${sec}`}
                smooth
                duration={500}
                className={`cursor-pointer px-2 py-1 ${
                  activeSection === sec ? "border-l-4 border-green-500" : ""
                } hover:text-green-400`}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
