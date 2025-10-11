import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Normal routing
import { HashLink } from "react-router-hash-link"; // Only for scrolling
import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="w-full px-6 sm:px-12 md:px-20 py-12">

        {/* Top Logo */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden">
              <img src={assets.logo} alt="Rumooz Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
              Rumooz Smart Solutions
            </h2>
          </div>
          <p className="text-gray-400 text-center md:text-right max-w-xs sm:max-w-md md:max-w-md text-sm sm:text-base">
            Driving growth through innovative digital marketing, IT solutions, and creative branding.
          </p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-gray-700 pt-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-3 uppercase">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <HashLink
                    to={`/#${item.toLowerCase()}`}
                    smooth
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-3 uppercase">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Digital Marketing", "Social Media Management", "Branding & Design", "Web Development"].map((service) => (
                <li key={service} className="hover:text-white transition-colors">{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-3 uppercase">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 MBZ City, Abu Dhabi, UAE</li>
              <li>📞 +971 58 836 9622</li>
              <li>
                ✉️{" "}
                <a href="mailto:info@rumooz.ae" className="hover:text-white transition-colors">
                  info@rumooz.ae
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-3 uppercase">Follow Us</h3>
            <div className="flex gap-4 mt-4 text-xl sm:text-2xl">
              <a href="https://www.instagram.com/rumoozteam/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@rumoozteam" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Rumooz Smart Solutions. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <RouterLink to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</RouterLink>
            <RouterLink to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
