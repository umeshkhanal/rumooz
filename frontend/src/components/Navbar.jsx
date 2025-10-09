import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full z-50 bg-transparent">
      {" "}
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:text-xl text-green-600 font-bold">
        {" "}
        {/* Logo */}{" "}
        <div className="flex items-center space-x-2">
          {" "}
          <img
            src="/logoName.jpg"
            alt="Rumooz Logo"
            className="h-10 w-30 md:h-10 md:w-50"
          />{" "}
        </div>{" "}
        {/* Desktop Menu */}{" "}
        <nav className="hidden md:flex gap-20 space-x-6 items-center h-20">
          {" "}
          <Link
            to="/#home"
            smooth
            duration={500}
            className="cursor-pointer hover:text-green-900 flex items-center"
          >
            Home
          </Link>{" "}
          <Link
            to="/#about"
            smooth
            duration={500}
            className="cursor-pointer hover:text-green-900 flex items-center"
          >
            About
          </Link>{" "}
          <Link
            to="/#services"
            smooth
            duration={500}
            className="cursor-pointer hover:text-green-900 flex items-center"
          >
            Services
          </Link>{" "}
          <Link
            to="/#contact"
            smooth
            duration={500}
            className="cursor-pointer flex items-center bg-green-700 text-white px-4 py-1 rounded-full hover:bg-green-900 transition"
          >
            {" "}
            Contact{" "}
          </Link>{" "}
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <span className="text-2xl">✖</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>
      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-black via-blue-500 to-green-950 shadow-lg">
          <nav className="flex flex-col space-y-4 py-6 px-6 font-bold text-white">
            <Link
              onClick={toggleMenu}
              to="/#home"
              smooth
              duration={500}
              className="cursor-pointer hover:text-green-900"
            >
              Home
            </Link>
            <Link
              onClick={toggleMenu}
              to="/#about"
              smooth
              duration={500}
              className="cursor-pointer hover:text-green-900"
            >
              About
            </Link>
            <Link
              onClick={toggleMenu}
              to="/#services"
              smooth
              duration={500}
              className="cursor-pointer hover:text-green-900"
            >
              Services
            </Link>
            <Link
              onClick={toggleMenu}
              to="/#contact"
              smooth
              duration={500}
              className="cursor-pointer bg-green-700 hover:bg-green-900 transition text-white px-4 py-2 rounded-lg text-center"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
