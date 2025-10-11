import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";
import Select from "react-select";
import { Country, City } from "country-state-city";
import { API_URL } from "../api";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3 } },
};

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "971",
    country: { label: "United Arab Emirates", value: "AE" },
    city: null,
    service: "",
    message: "",
  });

  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const services = [
    { title: "Digital Marketing & Campaigns" },
    { title: "Social Media Management" },
    { title: "Creative Graphic Design" },
    { title: "Professional Photo Shoots" },
    { title: "Video Production & Editing" },
    { title: "Website Creation & Development" },
    { title: "Creation of Official Company Emails" },
    { title: "Hosting & Server Management Services" },
    { title: "Others" },
  ];

  const allCountries = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  useEffect(() => {
    const uaeCities = City.getCitiesOfCountry("AE").map((c) => ({
      label: c.name,
      value: c.name,
    }));
    setCities(uaeCities);
  }, []);

  const handleCountryChange = (selected) => {
    setFormData({ ...formData, country: selected, city: null });
    const countryCities = selected
      ? City.getCitiesOfCountry(selected.value).map((c) => ({
          label: c.name,
          value: c.name,
        }))
      : [];
    setCities(countryCities);
  };

  const handleCityChange = (selected) =>
    setFormData({ ...formData, city: selected });
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

  // Mandatory fields validation
  if (!formData.name.trim() || !formData.email.trim() || !formData.service.trim()) {
    return;
  }

  setPhoneError("");
  setLoading(true);

  const payload = {
    ...formData,
    country: formData.country?.label || "United Arab Emirates",
    city: formData.city?.label || "",
    phone: "+" + phoneNumber,
  };

  try {
    const res = await fetch(`${API_URL}/api/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to submit request");

    setSubmitted(true);
    setSubmitted(formData.name);
    setError(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "971",
      country: { label: "United Arab Emirates", value: "AE" },
      city: null,
      service: "",
      message: "",
    });

    const uaeCities = City.getCitiesOfCountry("AE").map((c) => ({
      label: c.name,
      value: c.name,
    }));
    setCities(uaeCities);

  } catch (err) {
    console.error(err);
    setError(true);
    setSubmitted(false);
  } finally {
    setLoading(false);
  }
};


  const closePopup = () => {
    setSubmitted(false);
    setError(false);
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f3f4f6",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      minHeight: "42px",
    }),
    singleValue: (provided) => ({ ...provided, color: "#000" }),
    input: (provided) => ({ ...provided, color: "#000" }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f3f4f6",
      color: "#000",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#e5e7eb" : "#f3f4f6",
      color: "#000",
    }),
    placeholder: (provided) => ({ ...provided, color: "#9CA3AF" }),
  };

  return (
    <section
      id="request"
      className="relative w-full bg-gradient-to-b from-gray-100 via-white to-gray-100 text-black py-20 px-4 sm:px-6 md:px-20 overflow-hidden"
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

      <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex justify-center gap-2 flex-wrap">
          <motion.span
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Request
          </motion.span>
          <motion.span
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-green-700"
          >
            Service
          </motion.span>
        </h2>
        <motion.p
          className="text-black text-sm sm:text-base md:text-lg mt-2 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Fill the form to submit a detailed service request.
        </motion.p>
      </div>

      <motion.div
        className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl"
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.form
          className="space-y-3 sm:space-y-4 md:space-y-5"
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

          {/* Country / City / Service */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col space-y-3 sm:space-y-4"
          >
            <label className="mb-1 sm:mb-2 text-sm sm:text-base md:text-base font-medium">
              Country<span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.country}
              onChange={handleCountryChange}
              options={allCountries}
              styles={customSelectStyles}
              placeholder="Select Country"
              isClearable
              isSearchable
            />

            <label className="mb-1 sm:mb-2 text-sm sm:text-base md:text-base font-medium">
              City
            </label>
            <Select
              value={formData.city}
              onChange={handleCityChange}
              options={cities}
              styles={customSelectStyles}
              placeholder="Select City (optional)"
              isClearable
              isSearchable
            />

            <label className="mb-1 sm:mb-2 text-sm sm:text-base md:text-base font-medium">
              Service<span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-200 text-black border border-gray-300"
            >
              <option value="">Select a Service</option>
              {services.map((s, i) => (
                <option key={i} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
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
            />
            {phoneError && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {phoneError}
              </p>
            )}
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <label className="mb-1 sm:mb-2 text-sm sm:text-base md:text-base font-medium">
              Request Details<span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="3"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-200 text-black border border-gray-300"
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeInUp}>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-900 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </motion.div>
        </motion.form>
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
              Your request has been successfully submitted. We will contact you
              shortly.
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
              Something went wrong while submitting your request. Please try
              again.
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
