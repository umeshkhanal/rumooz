import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";
import { Monitor, PenTool, Code, Camera } from "lucide-react";
import { assets } from "../assets/assets";

export default function Home() {
  const [typingText, setTypingText] = useState("");
  const fullText = "WELCOME TO RUMOOZ SMART SOLUTIONS LLC";
  const [typingForward, setTypingForward] = useState(true);
  const videoRef = useRef(null);

  // For mobile carousel
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 3.0;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingText((prev) => {
        if (typingForward) {
          if (prev.length < fullText.length) return prev + fullText[prev.length];
          else {
            setTypingForward(false);
            return prev;
          }
        } else {
          if (prev.length > 0) return prev.slice(0, -1);
          else {
            setTypingForward(true);
            return "";
          }
        }
      });
    }, 100);
    return () => clearInterval(interval);
  }, [typingForward]);

  // Mobile carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 1000); // Change every second
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Digital Marketing",
      icon: Monitor,
      points: [
        "Strategic campaign planning",
        "Social media account management",
        "Paid advertising optimization",
      ],
    },
    {
      title: "Branding & Design",
      icon: PenTool,
      points: [
        "Visual identity development",
        "Social media graphic assets",
        "Marketing material creation",
      ],
    },
    {
      title: "Web Solutions",
      icon: Code,
      points: [
        "Custom website development",
        "E-commerce and CMS solutions",
        "Enterprise Email Solutions",
      ],
    },
    {
      title: "Visual Media Production",
      icon: Camera,
      points: [
        "Professional photo shoots",
        "Video production and editing",
        "Marketing visual content",
      ],
    },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-16 py-12 md:py-16 gap-8 md:gap-12 overflow-hidden text-white"
      id="home"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src={assets.homebg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left Column */}
      <div className="w-full md:w-1/2 flex flex-col justify-center z-10 space-y-4 md:space-y-6">
        <p className="text-xs sm:text-sm md:text-lg font-bold tracking-widest text-green-400 text-center md:text-left animate-fadeIn">
          {typingText}
          <span className="blinking-cursor">|</span>
        </p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold leading-snug sm:leading-tight md:leading-tight text-green-400 text-center md:text-left animate-fadeInUp">
          Transforming Ideas Into Digital Success
        </h1>

        {/* Paragraph as div with glass effect */}
        <div className="bg-glass p-4 sm:p-6 rounded-xl text-xs sm:text-sm md:text-base lg:text-xl text-gray-200 leading-relaxed max-w-full sm:max-w-xl font-bold text-justify animate-fadeInUp transition-all duration-500">
          At{" "}
          <span className="text-green-300 font-bold">Rumooz Smart Solutions</span>, we help brands grow through strategic digital marketing, branding,
          and web solutions. Our solutions are tailored to create measurable
          results, strengthen your online presence, and engage your audience.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 animate-fadeInUp justify-start">
          <Link
            to="services"
            smooth
            duration={500}
            className="flex-1 sm:flex-none cursor-pointer bg-green-600 hover:bg-green-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base text-center shadow-lg transition"
          >
            Our Services
          </Link>
          <Link
            to="contact"
            smooth
            duration={500}
            className="flex-1 sm:flex-none cursor-pointer border-2 border-green-400 text-green-400 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base text-center hover:bg-green-400 hover:text-black shadow-lg transition"
          >
            Find Us Here
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex justify-center items-center mt-6 md:mt-0 z-10">
        {/* Desktop: show grid, Mobile: show single rotating box */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full justify-items-center">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-glass p-4 sm:p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-green-800 hover:text-white transition transform w-72 max-w-full"
                style={{
                  animation: `fadeFromCenter 0.8s ease forwards`,
                  animationDelay: `${idx * 0.3}s`,
                  opacity: 0,
                }}
              >
                <Icon size={36} className="text-green-400 mb-2 mx-auto" />
                <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl text-green-300 font-bold mb-2 text-center">
                  {item.title}
                </h3>
                <ul className="text-xs sm:text-sm md:text-sm lg:text-sm text-gray-300 list-disc list-inside space-y-1 text-left">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Mobile: single box rotating */}
        <div className="sm:hidden flex justify-center items-center w-full h-64">
          {(() => {
            const item = features[currentFeature];
            const Icon = item.icon;
            return (
              <div className="bg-glass p-4 rounded-xl shadow-lg w-72 max-w-full transition-all duration-500 flex flex-col items-center justify-center text-center">
                <Icon size={36} className="text-green-400 mb-2" />
                <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl text-green-300 font-bold mb-2">
                  {item.title}
                </h3>
                <ul className="text-xs sm:text-sm md:text-sm lg:text-sm text-gray-300 list-disc list-inside space-y-1 text-left">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeFromCenter {
            0% { opacity: 0; transform: scale(0) translate(-50%, -50%); }
            50% { opacity: 0.5; transform: scale(1.05) translate(0, 0); }
            100% { opacity: 1; transform: scale(1) translate(0, 0); }
          }

          .blinking-cursor {
            animation: blink 1s infinite;
          }
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }

          .bg-glass {
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(6px);
            transition: all 0.5s ease;
          }
        `}
      </style>
    </section>
  );
}
