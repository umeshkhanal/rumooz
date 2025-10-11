import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const services = [
  {
    title: "Digital Marketing & Campaigns",
    bullets: [
      "Targeted campaigns to increase reach",
      "Paid ads management for best ROI",
      "Content creation and marketing strategy",
      "Email marketing and analytics",
    ],
    img: assets.dm,
  },
  {
    title: "Social Media Management",
    bullets: [
      "Content calendar planning and scheduling posts",
      "Managing audience engagement and community building",
      "Performance analytics and campaign optimization",
      "Building a strong social media presence",
    ],
    img: assets.socialmedia,
  },
  {
    title: "Creative Graphic Design",
    bullets: [
      "Brand identity design and logos",
      "Social media graphics and advertising creatives",
      "Business cards, brochures, and marketing materials",
      "Custom visuals reflecting your brand style",
    ],
    img: assets.graphic,
  },
  {
    title: "Professional Photo Shoots",
    bullets: [
      "Studio and on-location product shoots",
      "Lifestyle and promotional photography",
      "Post-processing and retouching",
      "Creating professional visual content for marketing",
    ],
    img: assets.photoshoot,
  },
  {
    title: "Video Production & Editing",
    bullets: [
      "Scripting and storyboarding for impactful videos",
      "Filming, animation, and voiceovers",
      "Editing and post-production",
      "Marketing and social media video content",
    ],
    img: assets.videoedit,
  },
  {
    title: "Website Creation & Development",
    bullets: [
      "Designing user-friendly and responsive websites",
      "Implementing e-commerce features",
      "Ensuring website performance and SEO optimization",
      "Maintaining a strong digital presence online",
    ],
    img: assets.web,
  },
  {
    title: "Creation of Official Company Emails",
    bullets: [
      "Professional email setup for your organization",
      "Enhance credibility and brand trust",
      "Custom domains for all employees",
      "Integration with collaboration tools and apps",
    ],
    img: assets.email,
  },
  {
    title: "Hosting & Server Management Services",
    bullets: [
      "Reliable hosting for speed and uptime",
      "Security measures and data protection",
      "Regular backups and server monitoring",
      "Ensuring continuity of online services",
    ],
    img: assets.server,
  },
];

// Animation Variants
const titleVariants = { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8 } } };
const titleVariants2 = { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8 } } };
const cardVariants = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } } };

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: true,
    beforeChange: (_, newIndex) => setCurrentIndex(newIndex),
  };

  const handleSelectService = (e) => {
    const index = services.findIndex((s) => s.title === e.target.value);
    if (index >= 0) {
      sliderRef.current.slickGoTo(index);
      setCurrentIndex(index);
    }
  };

  return (
    <section id="services" className="relative w-full text-white py-16 px-4 sm:px-8 md:px-20 overflow-hidden">
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${services[currentIndex].img})`,
          }}
        />
      </AnimatePresence>

      {/* Section Title */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold flex justify-center gap-2 flex-wrap">
          <motion.span initial="hidden" whileInView="visible" viewport={{ once: true }} variants={titleVariants}>
            Our
          </motion.span>
          <motion.span className="text-green-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={titleVariants2}>
            Services
          </motion.span>
        </h2>
        <motion.p className="text-white text-sm sm:text-base md:text-lg mt-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          Explore our solutions that help your business grow and succeed online.
        </motion.p>
      </div>

      {/* Services Slider */}
      <Slider ref={sliderRef} {...settings}>
        {services.map((service, index) => (
          <div key={index}>
            <div className="flex flex-col items-center justify-center px-2 sm:px-6 min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
              {/* Mobile Dropdown */}
              <div className="w-full max-w-md mb-4">
                <select
                  defaultValue=""
                  onChange={handleSelectService}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 border-green-600 bg-white text-black font-semibold text-sm sm:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    🔍 Search for a Service
                  </option>
                  {services.map((s, i) => (
                    <option key={i} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Card */}
              <motion.div
                className="service-card w-full max-w-xl p-6 sm:p-8 rounded-xl shadow-lg"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  background: "rgba(0,0,0,0.55)",
                  textAlign: "left",
                  width: "100%",
                  backdropFilter: "blur(4px)",
                }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-green-700">{service.title}</h3>
                <h4 className="text-sm sm:text-lg font-semibold mb-2 text-white">What you get:</h4>
                <ul className="mb-4 pl-4 list-disc text-xs sm:text-sm text-white">
                  {service.bullets.map((b, i) => (
                    <li key={i} className="mb-1 sm:mb-2">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <Link
                    to="/request-details"
                    className="bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Request Service
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Services;
