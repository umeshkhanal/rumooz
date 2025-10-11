import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HashLink as HLink } from "react-router-hash-link";
import { assets } from "../assets/assets";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3 } },
};

const About = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
      videoRef.current.play();
    }
  };

  return (
<section
  id="about"
  className="relative w-full bg-gradient-to-b from-gray-100 via-white to-gray-100 text-black py-20 px-4 sm:px-6 md:px-20 overflow-hidden"
>
  {/* Decorative shapes */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

  {/* Section Heading */}
  <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex justify-center gap-2 flex-wrap">
      <motion.span
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About
      </motion.span>
      <motion.span
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-green-700"
      >
        Us
      </motion.span>
    </h2>
    <motion.p
      className="text-black text-sm sm:text-base md:text-lg mt-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      Designing Digital Experiences That Define Industries.
    </motion.p>
  </div>

  {/* Story + Leaders */}
  <motion.div
    className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
  >
    {/* Left Column */}
    <motion.div className="space-y-6 sm:space-y-8 p-6 bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl" variants={fadeInUp}>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
        Our Story
      </h3>
      <p className="text-black text-sm sm:text-base md:text-lg leading-relaxed text-justify">
        Founded with a bold vision to empower brands in the digital age, Rumooz Smart Solutions has grown from a small startup into a trusted digital agency. We focus on creating smart, integrated strategies that help businesses strengthen their presence, connect with their audience, and achieve meaningful growth.
      </p>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
        Our Vision
      </h3>
      <p className="text-black text-sm sm:text-base md:text-lg leading-relaxed text-justify">
        To become the most trusted digital partner for companies and institutions, delivering innovative solutions that elevate digital presence, strengthen brands, and accelerate business growth.
      </p>
    </motion.div>

    {/* Right Column */}
    <motion.div className="space-y-6 sm:space-y-8 p-6 bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl" variants={fadeInUp}>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
        Our Mission
      </h3>
      <p className="text-black text-sm sm:text-base md:text-lg leading-relaxed text-justify">
        We craft and implement practical, integrated digital marketing and technology solutions, combining creativity, expertise, and strategy to give our clients a true competitive edge in the marketplace.
      </p>

      <div className="flex flex-col items-center mt-4 sm:mt-6 gap-3 sm:gap-4">
        <Link
          to="/clients"
          smooth="true"
          duration={500}
          className="px-3 sm:px-4 py-2 sm:py-3 bg-green-700 hover:bg-green-900 text-white rounded-md font-semibold text-sm sm:text-base transition"
        >
          Meet Our Partners
        </Link>

        <motion.div
          className="flex gap-4 sm:gap-6 text-xl sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://www.instagram.com/rumoozteam/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-500 transition"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.tiktok.com/@rumoozteam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-black transition"
          >
            <i className="fab fa-tiktok"></i>
          </a>
        </motion.div>
      </div>
    </motion.div>
  </motion.div>

  {/* Video Section */}
  <motion.div
    className="max-w-7xl mx-auto mb-16 relative rounded-xl overflow-hidden shadow-xl"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <video
      ref={videoRef}
      src={assets.rumooz}
      autoPlay
      loop
      muted
      className="w-full h-full object-cover rounded-xl"
    />
    <button
      onClick={toggleMute}
      className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition"
    >
      {muted ? "Unmute" : "Mute"}
    </button>
  </motion.div>

  {/* CTA */}
  <motion.div
    className="max-w-7xl mx-auto text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <HLink
      to="/#contact"
      smooth="true"
      duration={500}
      className="bg-green-700 hover:bg-green-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition"
    >
      Ready to Build Your Vision? Let's Talk
    </HLink>
  </motion.div>
</section>

  );
};

export default About;
