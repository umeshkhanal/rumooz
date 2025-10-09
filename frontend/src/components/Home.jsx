import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";

export default function Home() {
  const [typingText, setTypingText] = useState("");
  const fullText = "WELCOME TO RUMOOZ SMART SOLUTIONS LLC";
  const [typingForward, setTypingForward] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3.0;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingText((prev) => {
        if (typingForward) {
          if (prev.length < fullText.length)
            return prev + fullText[prev.length];
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

  const features = [
  {
    title: "Digital Marketing",
    points: [
      "Strategic campaign planning",
      "Social media account management",
      "Paid advertising optimization",
    ],
  },
  {
    title: "Branding & Design",
    points: [
      "Visual identity development",
      "Social media graphic assets",
      "Marketing material creation",
    ],
  },
  {
    title: "Web Solutions",
    points: [
      "Custom website development",
      "E-commerce and CMS solutions",
      "Enterprise Email Solutions",
    ],
  },
  {
    title: "Visual Media Production",
    points: [
      "Professional photo shoots",
      "Video production and editing",
      "Marketing visual content",
    ],
  },
];



  return (
    <section
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 md:px-16 py-16 gap-12 overflow-hidden text-white"
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
        <source src="/2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left Column */}
      <div className="md:w-1/2 flex flex-col justify-center z-10 space-y-6">
        {/* Typing Text */}
        <p className="text-green-400 font-bold tracking-widest text-lg md:text-2xl text-center md:text-left animate-fadeIn">
          {typingText}
          <span className="blinking-cursor">|</span>
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-green-400 text-center md:text-left animate-fadeInUp">
          Transforming Ideas Into Digital Success
        </h1>

        <p className="text-gray-200 text-base md:text-xl leading-relaxed max-w-xl font-bold text-justify animate-fadeInUp shadow-md">
          At{" "}
          <span className="text-green-300 font-bold">
            Rumooz Smart Solutions
          </span>
          , we help brands grow through strategic digital marketing, branding,
          and web solutions. Our solutions are tailored to create measurable
          results, strengthen your online presence, and engage your audience.
        </p>

        {/* Buttons */}
        <div className="flex flex-row gap-4 mt-6 animate-fadeInUp justify-start">
          <Link
            to="services"
            smooth
            duration={500}
            className="flex-1 cursor-pointer sm:flex-none bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-center shadow-lg  transition"
          >
            Our Services
          </Link>
          <Link
            to="contact"
            smooth
            duration={500}
            className="flex-1 cursor-pointer sm:flex-none border-2 border-green-400 text-green-400 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-center hover:bg-green-400 hover:text-black shadow-lg transition"
          >
            Find Us Here
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 md:mt-0 z-10 justify-items-center">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-black bg-opacity-40 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-green-800 hover:text-white transition transform w-72 max-w-full"
            style={{
              animation: `fadeFromCenter 0.8s ease forwards`,
              animationDelay: `${idx * 0.3}s`,
              opacity: 0,
            }}
          >
            <h3 className="text-xl text-green-300 font-bold mb-3 text-center">
              {item.title}
            </h3>
            <ul className="text-gray-300 text-sm list-disc list-inside space-y-1 text-left">
              {item.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}

        <style>
          {`
            @keyframes fadeFromCenter {
              0% { opacity: 0; transform: scale(0) translate(-50%, -50%); }
              50% { opacity: 0.5; transform: scale(1.05) translate(0, 0); }
              100% { opacity: 1; transform: scale(1) translate(0, 0); }
            }
          `}
        </style>
      </div>
    </section>
  );
}