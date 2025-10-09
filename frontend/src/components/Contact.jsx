import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";
import { API_URL } from "../api";
// Animation variants
const boxVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const boxesContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.4 } },
};

const formItemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const formContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "971",
    message: "",
  });

  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    if (value) setPhoneError("");
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone manually
    if (!formData.phone || formData.phone.trim() === "") {
      setPhoneError("Phone number is required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setError(false);
        setFormData({
          name: "",
          email: "",
          phone: "971",
          message: "",
        });
      } else {
        setError(true);
        setSubmitted(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setSubmitted(false);
    }
  };

  const closePopup = () => {
    setSubmitted(false);
    setError(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 px-6 md:px-20 bg-gradient-to-r from-gray-700 via-blue-900 to-gray-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 -z-10"></div>

      {/* Section Heading */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold mb-4 flex justify-center gap-2">
          <motion.span
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Contact
          </motion.span>
          <motion.span
            className="text-green-700"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Us
          </motion.span>
        </h2>
        <p className="text-lg text-gray-300">
          Let’s build something amazing together. Whether you’re looking for
          project consultation, business partnership, or just want to connect,
          the Rumooz team is ready to hear from you.
        </p>
      </div>

      {/* Contact Info and Form Section */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        variants={boxesContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Office Info */}
        <motion.div
          variants={boxVariants}
          className="bg-transparent bg-opacity-80 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between shadow-lg hover:scale-105 transition transform"
        >
          <div>
            <h3 className="text-3xl text-green-700 font-semibold">
              Our Office
            </h3>
            <p className="text-gray-300 leading-relaxed mt-4">
              We’re based in Abu Dhabi, but our services reach across the UAE
              and beyond. Drop by, give us a call, or send us a quick message –
              we’ll respond as fast as possible.
            </p>
            <div className="space-y-3 text-gray-300 mt-6">
              <div>
                <strong>📍 Address:</strong> Office-48, 12th floor, Prestige
                Tower 17, MBZ city, Abu Dhabi, UAE
              </div>
              <div>
                <strong>📞 Phone:</strong> +971 58 836 9622
              </div>
              <div>
                <strong>✉ Email:</strong>{" "}
                <a
                  href="mailto:info@rumooz.ae"
                  className="text-green-500 hover:underline"
                >
                  info@rumooz.ae
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full h-48 lg:h-64 rounded-lg overflow-hidden border border-gray-700 shadow-md">
            <iframe
              title="Rumooz Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.123456789!2d54.531664!3d24.374688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e472895a2dd1f%3A0xad4085be8be2a6fa!2sPrestige%20Tower%2017!5e0!3m2!1sen!2sae!4v1696164000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* Office Building Photos */}
        <motion.div
          variants={boxVariants}
          className="bg-transparent bg-opacity-80 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform w-full"
        >
          <h3 className="text-3xl font-semibold text-green-700">
            Office Building
          </h3>
          <br />
          <div className="grid grid-cols-[2fr_3fr] gap-4 w-full h-full">
            <div className="grid grid-rows-2 gap-4">
              <img
                src="/buildings/PrestigeTower1.jpg"
                alt="Prestige Tower 1"
                className="w-full h-48 md:h-60 object-cover rounded-lg"
              />
              <img
                src="/buildings/PrestigeTower2.jpg"
                alt="Prestige Tower 2"
                className="w-full h-48 md:h-60 object-cover rounded-lg"
              />
            </div>
            <img
              src="/buildings/PrestigeTower.jpg"
              alt="Prestige Tower Main"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={boxVariants}
          className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl p-8 flex flex-col justify-between shadow-lg hover:scale-105 transition transform"
        >
          <h3 className="text-2xl font-semibold mb-6 text-green-700">
            Send a Message
          </h3>

          <motion.form
            className="space-y-5"
            variants={formContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <motion.div variants={formItemVariants} className="flex flex-col">
              <label className="mb-2 text-sm font-medium">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={formItemVariants} className="flex flex-col">
              <label className="mb-2 text-sm font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </motion.div>

            {/* Phone */}
            <motion.div variants={formItemVariants} className="flex flex-col">
              <label className="mb-2 text-sm font-medium">
                Phone<span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country={"ae"}
                enableSearch
                value={formData.phone}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  height: "48px",
                  background: "#374151",
                  color: "#fff",
                  border: phoneError ? "1px solid red" : "1px solid #4B5563",
                  borderRadius: "0.5rem",
                  paddingLeft: "50px",
                }}
                buttonStyle={{
                  background: "transparent",
                  border: "none",
                  left: "10px",
                }}
                dropdownStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                searchStyle={{ backgroundColor: "#111827", color: "#fff" }}
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-2">{phoneError}</p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div variants={formItemVariants} className="flex flex-col">
              <label className="mb-2 text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              ></textarea>
            </motion.div>

            {/* Submit */}
            <motion.div variants={formItemVariants}>
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-900 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Success Popup */}
      {submitted && !error && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-10 max-w-md text-center shadow-2xl space-y-6"
          >
            <h3 className="text-2xl font-bold text-green-700">
              Thank you, {formData.name || "there"}!
            </h3>
            <p className="text-gray-700">
              Your request has been successfully submitted. We will contact you
              shortly.
            </p>
            <button
              onClick={closePopup}
              className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Error Popup */}
      {error && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-10 max-w-md text-center shadow-2xl space-y-6"
          >
            <h3 className="text-2xl font-bold text-red-600">
              Submission Failed!
            </h3>
            <p className="text-gray-700">
              Something went wrong while submitting your request. Please try
              again.
            </p>
            <button
              onClick={closePopup}
              className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}




