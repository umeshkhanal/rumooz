import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-green-800 to-blue-900 text-white">
      <div className="w-full px-6 md:px-12 lg:px-20 py-14">
        {/* Top: Logo & Tagline */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.jpg"
                alt="Rumooz Logo"
                className="w-32 h-32 rounded-full object-cover border-2 border-green-500 mb-4"
              />
            </div>
            <h2 className="text-2xl font-bold">Rumooz Smart Solutions</h2>
          </div>
          {/* Tagline */}
          <p className="text-gray-300 mt-4 md:mt-0 text-center md:text-right max-w-md">
            Driving growth through innovative digital marketing, IT solutions,
            and creative branding that makes an impact.
          </p>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 ">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/#home"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer hover:text-green-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer hover:text-green-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/#services"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer hover:text-green-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer hover:text-green-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
              Our Services
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Digital Marketing</li>
              <li>Social Media Management</li>
              <li>Branding & Design</li>
              <li>Web Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>📍 MBZ City, Abu Dhabi, United Arab Emirates</li>
              <li>📞 +971 58 836 9622</li>
              <li>
                ✉️
                <span>
                  <a
                    href="mailto:info@rumooz.ae"
                    className="text-blue-500 hover:underline"
                  >
                    info@rumooz.ae
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
              Follow Us
            </h3>
            {/* Social Media Links */}
            <motion.div
              className="flex gap-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Instagram */}
              <a
                href="https://www.instagram.com/rumoozteam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition text-2xl"
              >
                <i className="fab fa-instagram"></i>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@rumoozteam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-black transition text-2xl"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-600 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Rumooz Smart Solutions. All Rights
            Reserved.
          </p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <Link to="privacy-policy" className="hover:text-green-300">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-green-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
