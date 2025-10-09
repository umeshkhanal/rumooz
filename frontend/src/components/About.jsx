import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HashLink as HLink } from "react-router-hash-link";

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
      className="relative w-full bg-gradient-to-r from-gray-900 via-blue-900 to-green-800 text-white py-20 px-6 md:px-20 overflow-hidden"
    >
      {/* Section Heading */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold mb-4 flex justify-center gap-2">
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
          className="text-gray-300 text-lg mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Designing Digital Experiences That Define Industries. We combine
          creativity, technology, and strategy to make brands shine online.
        </motion.p>
      </div>

      {/* Story + Leaders */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Left Column: Story + Vision */}
        <motion.div className="space-y-8" variants={fadeInUp}>
          <h3 className="text-3xl font-bold text-green-700">Our Story</h3>
          <p className="text-gray-300 leading-relaxed text-justify">
            Founded with a bold vision to empower brands in the digital age,
            Rumooz Smart Solutions has grown from a small startup into a trusted
            digital agency. We focus on creating smart, integrated strategies
            that help businesses strengthen their presence, connect with their
            audience, and achieve meaningful growth.
          </p>

          <h3 className="text-3xl font-bold text-green-700">Our Vision</h3>
          <p className="text-gray-300 leading-relaxed text-justify">
            To become the most trusted digital partner for companies and
            institutions, delivering innovative solutions that elevate digital
            presence, strengthen brands, and accelerate business growth.
          </p>
        </motion.div>

        {/* Right Column: Mission + CTA + Social Media */}
        <motion.div className="flex flex-col gap-6" variants={fadeInUp}>
          <h3 className="text-3xl font-bold text-green-700">Our Mission</h3>
          <p className="text-gray-300 leading-relaxed text-justify">
            We craft and implement practical, integrated digital marketing and
            technology solutions, combining creativity, expertise, and strategy
            to give our clients a true competitive edge in the marketplace.
          </p>

          <div className="flex flex-col items-center mt-6 gap-4">
            {/* CTA Button */}
            <Link
              to="/clients"
              smooth
              duration={500}
              className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-md font-semibold text-sm transition"
            >
              Meet Our Partners
            </Link>

            {/* Social Media Links */}
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a
                href="https://www.instagram.com/rumoozteam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition text-2xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
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
        </motion.div>
      </motion.div>

      {/* Video Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-16 relative rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <video
          ref={videoRef}
          src="/3.mp4"
          autoPlay
          loop
          muted
          className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
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
          smooth
          duration={500}
          className="bg-green-700 hover:bg-green-900 text-white px-8 cursor-pointer py-4 rounded-lg font-semibold transition"
        >
          Ready to Build Your Vision? Let's Talk
        </HLink>
      </motion.div>
    </section>
  );
};

export default About;
