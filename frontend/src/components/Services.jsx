import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Digital Marketing & Campaigns",
    bullets: [
      "Targeted campaigns to increase reach",
      "Paid ads management for best ROI",
      "Content creation and marketing strategy",
      "Email marketing and analytics",
    ],
    img: "dm1.jpg",
  },
  {
    title: "Social Media Management",
    bullets: [
      "Content calendar planning and scheduling posts",
      "Managing audience engagement and community building",
      "Performance analytics and campaign optimization",
      "Building a strong social media presence",
    ],
    img: "socialmedia.jpg",
  },
  {
    title: "Creative Graphic Design",
    bullets: [
      "Brand identity design and logos",
      "Social media graphics and advertising creatives",
      "Business cards, brochures, and marketing materials",
      "Custom visuals reflecting your brand style",
    ],
    img: "graphic.jpg",
  },
  {
    title: "Professional Photo Shoots",
    bullets: [
      "Studio and on-location product shoots",
      "Lifestyle and promotional photography",
      "Post-processing and retouching",
      "Creating professional visual content for marketing",
    ],
    img: "photoshoot.jpg",
  },
  {
    title: "Video Production & Editing",
    bullets: [
      "Scripting and storyboarding for impactful videos",
      "Filming, animation, and voiceovers",
      "Editing and post-production",
      "Marketing and social media video content",
    ],
    img: "videoedit.jpg",
  },
  {
    title: "Website Creation & Development",
    bullets: [
      "Designing user-friendly and responsive websites",
      "Implementing e-commerce features",
      "Ensuring website performance and SEO optimization",
      "Maintaining a strong digital presence online",
    ],
    img: "web5.jpg",
  },
  {
    title: "Creation of Official Company Emails",
    bullets: [
      "Professional email setup for your organization",
      "Enhance credibility and brand trust",
      "Custom domains for all employees",
      "Integration with collaboration tools and apps",
    ],
    img: "email1.jpg",
  },
  {
    title: "Hosting & Server Management Services",
    bullets: [
      "Reliable hosting for speed and uptime",
      "Security measures and data protection",
      "Regular backups and server monitoring",
      "Ensuring continuity of online services",
    ],
    img: "server1.jpg",
  },
];

// Animation Variants
const titleVariants = {
  hidden: { x: 200, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
};
const titleVariants2 = {
  hidden: { x: -200, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
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
    <section
      id="services"
      className="relative w-full text-white py-20 px-6 md:px-20 overflow-hidden"
    >
      {/* Animated Background with Smooth Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('/background/${services[currentIndex].img}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        />
      </AnimatePresence>

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold flex justify-center gap-2">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleVariants}
          >
            Our
          </motion.span>
          <motion.span
            className="text-green-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleVariants2}
          >
            Services
          </motion.span>
        </h2>
        <motion.p
          className="text-white text-lg mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Explore our solutions that help your business grow and succeed online.
        </motion.p>
      </div>

      {/* Services Slider */}
      <Slider ref={sliderRef} {...settings}>
        {services.map((service, index) => (
          <div key={index}>
            <div className="flex justify-center items-center flex-col min-h-[80vh]">
              {/* Dropdown */}
              <div className="w-full max-w-md mb-5">
                <select
                  value=""
                  onChange={handleSelectService}
                  className="w-full px-4 py-3 rounded-lg border-2 border-green-600 bg-white text-black font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled selected>
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
                className="service-card w-full max-w-2xl p-8 rounded-xl shadow-lg"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  background: "rgba(0,0,0,0.55)", // slightly transparent for readability
                  color: "#fff",
                  textAlign: "left",
                  width: "100%",
                  backdropFilter: "blur(5px)", // optional soft blur effect
                }}
              >
                <h3 className="text-3xl font-bold mb-4 text-green-600">
                  {service.title}
                </h3>
                <h4 className="text-lg font-semibold mb-3">
                  What you get from us:
                </h4>
                <ul className="mb-6 pl-5 list-disc">
                  {service.bullets.map((b, i) => (
                    <li key={i} className="text-base mb-2">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <Link
                    to="/request-details"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
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
