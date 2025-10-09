import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";
import Select from "react-select";
import { Country, City } from "country-state-city";

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


// Animation Variants
const formContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.6, ease: "easeOut" } },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Custom style for react-select
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#374151",
    borderRadius: "1rem",
    border: "1px solid #4B5563",
    color: "#fff",
    minHeight: "50px",
  }),
  singleValue: (provided) => ({ ...provided, color: "#fff" }),
  input: (provided) => ({ ...provided, color: "#fff" }),
  menu: (provided) => ({ ...provided, backgroundColor: "#1f2937", color: "#fff" }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#4B5563" : "#1f2937",
    color: "#fff",
  }),
  placeholder: (provided) => ({ ...provided, color: "#9CA3AF" }),
};

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: { label: "United Arab Emirates", value: "AE" }, // Default UAE
    city: null,
    service: "",
    phone: "971", // Default UAE code
    message: "",
  });

  const [cities, setCities] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // All countries for select
  const allCountries = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  // Load UAE cities on mount
  useEffect(() => {
    const uaeCities = City.getCitiesOfCountry("AE").map((c) => ({
      label: c.name,
      value: c.name,
    }));
    setCities(uaeCities);
  }, []);

  const handleCountryChange = (selected) => {
    setFormData({ ...formData, country: selected, city: null });
    if (selected) {
      const countryCities = City.getCitiesOfCountry(selected.value).map((c) => ({
        label: c.name,
        value: c.name,
      }));
      setCities(countryCities);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (selected) => setFormData({ ...formData, city: selected });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    setLoading(true);

    try {
      const payload = {
        ...formData,
        country: formData.country?.label || "United Arab Emirates",
        city: formData.city?.label || "",
        phone: "+" + phoneNumber,
      };

      const res = await fetch(`${process.env.REACT_APP_API_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      setSubmitted(true);
      setSubmittedName(formData.name);
      setError(false);

      // Reset form
      setFormData({
        name: "",
        email: "",
        country: { label: "United Arab Emirates", value: "AE" },
        city: null,
        service: "",
        phone: "971",
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

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-r from-gray-700 via-blue-900 to-green-900">
      <section className="pt-32 pb-20 px-6 md:px-20 flex flex-col justify-center">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-5xl font-bold mb-4 flex justify-center gap-2 text-white">
            <motion.span initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
              Request
            </motion.span>
            <motion.span className="text-green-500" initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
              Service
            </motion.span>
          </h2>
          <p className="text-gray-300 text-lg">
            Fill the form to submit a detailed service request. Provide all necessary information for us to process your requirements efficiently.
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto bg-gray-800/70 backdrop-blur-lg p-12 rounded-3xl shadow-2xl space-y-8 border border-gray-700"
          variants={formContainerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Name */}
          <motion.div variants={formItemVariants}>
            <label className="text-gray-200 font-medium mb-2 block">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-gray-700/80 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 border border-gray-600 outline-none transition"
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={formItemVariants}>
            <label className="text-gray-200 font-medium mb-2 block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-gray-700/80 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 border border-gray-600 outline-none transition"
            />
          </motion.div>

          {/* Country / City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={formItemVariants}>
              <label className="text-gray-200 font-medium mb-2 block">
                Country <span className="text-red-500">*</span>
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
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label className="text-gray-200 font-medium mb-2 block">
                City
              </label>
              <Select
                value={formData.city}
                onChange={handleCityChange}
                options={cities}
                styles={customSelectStyles}
                placeholder="Select City (optional)"
                isClearable
                isDisabled={!cities.length}
                isSearchable
              />
            </motion.div>
          </div>

          {/* Service & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={formItemVariants}>
              <label className="text-gray-200 font-medium mb-2 block">
                Service <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-xl bg-gray-700/80 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
              >
                <option value="">Select a Service</option>
                {services.map((s, i) => (
                  <option key={i} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label className="text-gray-200 font-medium mb-2 block">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country={"ae"}
                enableSearch
                value={formData.phone}
                onChange={handlePhoneChange}
                inputProps={{ required: true }}
                inputStyle={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "1rem",
                  paddingLeft: "60px",
                  background: "#374151",
                  color: "#fff",
                  border: phoneError ? "2px solid #ef4444" : "1px solid #4B5563",
                  fontSize: "16px",
                }}
                buttonStyle={{ background: "transparent", border: "none", left: "10px" }}
                dropdownStyle={{ backgroundColor: "#1f2937", color: "#fff", borderRadius: "0.75rem", border: "1px solid #4B5563" }}
              />
              {phoneError && <p className="text-red-500 mt-1 text-sm">{phoneError}</p>}
            </motion.div>
          </div>

          {/* Message */}
          <motion.div variants={formItemVariants}>
            <label className="text-gray-200 font-medium mb-2 block">
              Request Details <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              placeholder="Write your message..."
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-gray-700/80 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </motion.div>
          <motion.div variants={formItemVariants}>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-lg transition shadow-lg disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </motion.div>
        </motion.form>

        {/* Popups */}
        {submitted && !error && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl p-10 max-w-md text-center shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-green-700">Thank you, {submittedName}!</h3>
              <p className="text-gray-700">Your request has been successfully submitted. We will contact you shortly.</p>
              <button onClick={closePopup} className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition">
                Close
              </button>
            </motion.div>
          </div>
        )}

        {error && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl p-10 max-w-md text-center shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-red-600">Submission Failed!</h3>
              <p className="text-gray-700">Something went wrong while submitting your request. Please try again.</p>
              <button onClick={closePopup} className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition">
                Close
              </button>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}
