import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";
import { API_URL } from "../api";
import { assets } from "../assets/assets";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3 } },
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
    const [load, setLoad] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    if (value) setPhoneError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const phoneNumber = formData.phone.replace(/\D/g, ""); // Remove non-digit chars

  // Phone validation
  if (!phoneNumber || phoneNumber.length < 9) {
    setPhoneError("Phone number is required");
    return;
  }


  setPhoneError("");
  setLoad(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setError(false);
        setFormData({ name: "", email: "", phone: "971", message: "" });
      } else {
        setError(true);
        setSubmitted(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setSubmitted(false);
    } finally{
      setLoad(false);
    }
  };

  const closePopup = () => {
    setSubmitted(false);
    setError(false);
  };

  return (
    <section
      id="contact"
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
            Contact
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
          Let’s build something amazing together.
        </motion.p>
      </div>

      {/* Contact Info and Form Section */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Office Info */}
        <motion.div
          className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl"
          variants={fadeInUp}
        >
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-semibold">
              Our Office
            </h3>
            <p className="text-black text-sm sm:text-base md:text-base leading-relaxed mt-3 md:mt-4">
              We’re based in Abu Dhabi, but our services reach across the UAE
              and beyond. Drop by, give us a call, or send us a quick message – 
              we’ll respond as fast as possible.
            </p>
            <div className="space-y-2 md:space-y-3 text-black mt-4 md:mt-6 text-sm sm:text-base">
              <div>
                <strong>📍 Address:</strong> Office-48, 12th floor, Prestige Tower 17, MBZ city, Abu Dhabi, UAE
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

          <div className="mt-4 md:mt-6 w-full h-40 sm:h-48 md:h-64 rounded-lg overflow-hidden border border-gray-300 shadow-md">
            <iframe
              title="Rumooz Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.123456789!2d54.531664!3d24.374688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e472895a2dd1f%3A0xad4085be8be2a6fa!2sPrestige%20Tower%2017!5e0!3m2!1sen!2sae!4v1696164000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              load="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* Office Building Photos */}
        <motion.div
          className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 sm:p-8 flex flex-col items-center text-center shadow-xl"
          variants={fadeInUp}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-700">
            Office Building
          </h3>
          <div className="grid grid-cols-[2fr_3fr] gap-2 sm:gap-4 mt-4">
            <div className="grid grid-rows-2 gap-2 sm:gap-4">
              <img
                src={assets.PrestigeTower1}
                alt="Prestige Tower 1"
                className="w-full h-32 sm:h-48 md:h-60 object-cover rounded-lg"
              />
              <img
                src={assets.PrestigeTower2}
                alt="Prestige Tower 2"
                className="w-full h-32 sm:h-48 md:h-60 object-cover rounded-lg"
              />
            </div>
            <img
              src={assets.PrestigeTower}
              alt="Prestige Tower Main"
              className="w-full h-64 sm:h-full md:h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl"
          variants={fadeInUp}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-green-700">
            Send a Message
          </h3>

          <motion.form
            className="space-y-3 sm:space-y-4 md:space-y-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <motion.div variants={fadeInUp} className="flex flex-col">
              <label className="mb-1 sm:mb-2 text-sm sm:text-base md:text-base font-medium">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-200 text-black border border-gray-300"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeInUp} className="flex flex-col">
              <label className="mb-1 sm:mb-2 text-sm sm:text-base md:text-base font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-200 text-black border border-gray-300"
              />
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeInUp} className="flex flex-col">
              <label className="mb-1 sm:mb-2 text-sm sm:text-base md:text-base font-medium">
                Phone<span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country={"ae"}
                enableSearch
                value={formData.phone}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  height: "42px",
                  background: "#f3f4f6",
                  color: "#000",
                  border: phoneError ? "1px solid red" : "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  paddingLeft: "50px",
                  fontSize: "14px",
                }}
                buttonStyle={{
                  background: "transparent",
                  border: "none",
                  left: "10px",
                }}
                dropdownStyle={{ backgroundColor: "#e5e7eb", color: "#000" }}
                searchStyle={{ backgroundColor: "#d1d5db", color: "#000" }}
              />
              {phoneError && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{phoneError}</p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeInUp} className="flex flex-col">
              <label className="mb-1 sm:mb-2 text-sm sm:text-base md:text-base font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="3"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-200 text-black border border-gray-300"
              ></textarea>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeInUp}>
              <button
                type="submit"
                disabled={load}
                className="w-full bg-green-700 hover:bg-green-900 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition cursor-pointer"
              >
                {load ? "Sending..." : "Send Message"}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Popups */}
      {submitted && !error && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center shadow-2xl space-y-4 sm:space-y-6"
          >
            <h3 className="text-lg sm:text-2xl font-bold text-green-700">
              Thank you, {formData.name || "there"}!
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              Your request has been successfully submitted. We will contact you shortly.
            </p>
            <button
              onClick={closePopup}
              className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-sm sm:text-base transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center shadow-2xl space-y-4 sm:space-y-6"
          >
            <h3 className="text-lg sm:text-2xl font-bold text-red-600">
              Submission Failed!
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              Something went wrong while submitting your request. Please try again.
            </p>
            <button
              onClick={closePopup}
              className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm sm:text-base transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
