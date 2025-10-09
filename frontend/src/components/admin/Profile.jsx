import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    contact_mail: "",
    role: "",
  });
  const [section, setSection] = useState(""); // "email" | "contact_mail" | "password"
  const [emailInput, setEmailInput] = useState("");
  const [contactMailInput, setContactMailInput] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch admin data
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch admin");

        setAdminData({
          name: data.username,
          email: data.email,
          contact_mail: data.contact_mail,
          role: "admin",
        });
        setEmailInput(data.email);
        setContactMailInput(data.contact_mail);
      } catch (err) {
        setMessage(err.message);
      }
    };
    fetchAdmin();
  }, []);

  // Reset OTP and message when section changes
  useEffect(() => {
    setMessage("");
    setOtp("");
    setOtpSent(false);
  }, [section]);

  // OTP resend timer
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Send OTP
  const sendOtp = async () => {
    if (resendTimer > 0) return;
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: emailInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setOtpSent(true);
      setResendTimer(30);
      setMessage("OTP sent!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Handle Email Update
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return setMessage("Enter OTP sent to your email!");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/change-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          email: emailInput,
          password: passwords.currentPassword,
          otp,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update email");

      setAdminData({ ...adminData, email: emailInput });
      sessionStorage.setItem("email", emailInput);
      setMessage("Email updated successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setOtp("");
      setOtpSent(false);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Contact Mail Update
  const handleContactMailSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return setMessage("Enter OTP sent to your contact mail!");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/change-contact-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          contact_mail: contactMailInput,
          password: passwords.currentPassword,
          otp,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update contact mail");

      setAdminData({ ...adminData, contact_mail: contactMailInput });
      sessionStorage.setItem("contact_mail", contactMailInput);
      setMessage("Contact mail updated successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setOtp("");
      setOtpSent(false);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword)
      return setMessage("Passwords do not match!");
    if (!otp) return setMessage("Enter OTP sent to your email!");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
          otp,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");

      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setOtp("");
      setOtpSent(false);
      setMessage("Password updated successfully!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      <motion.div
        className="bg-transparent backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Admin Info */}
        <div className="flex-1 bg-gray-700/50 p-6 rounded-2xl text-white shadow-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
          <p><strong>Name:</strong> {adminData.name}</p>
          <p><strong>Email:</strong> {adminData.email}</p>
          <p><strong>Contact Mail:</strong> {adminData.contact_mail}</p>
          <p><strong>Role:</strong> {adminData.role}</p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setSection(section === "email" ? "" : "email")}
              className="flex-1 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition"
            >
              Change Email
            </button>
            <button
              onClick={() => setSection(section === "contact_mail" ? "" : "contact_mail")}
              className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl font-semibold transition"
            >
              Change Contact Mail
            </button>
            <button
              onClick={() => setSection(section === "password" ? "" : "password")}
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Email Form */}
          {section === "email" && (
            <EmailOrContactForm
              title="Change Email"
              inputValue={emailInput}
              setInputValue={setEmailInput}
              otp={otp}
              setOtp={setOtp}
              otpSent={otpSent}
              resendTimer={resendTimer}
              loading={loading}
              sendOtp={sendOtp}
              handleSubmit={handleEmailSubmit}
              passwordValue={passwords.currentPassword}
              setPasswordValue={(val) => setPasswords({ ...passwords, currentPassword: val })}
              inputPlaceholder="New Email"
              buttonColor="green"
            />
          )}

          {/* Contact Mail Form */}
          {section === "contact_mail" && (
            <EmailOrContactForm
              title="Change Contact Mail"
              inputValue={contactMailInput}
              setInputValue={setContactMailInput}
              otp={otp}
              setOtp={setOtp}
              otpSent={otpSent}
              resendTimer={resendTimer}
              loading={loading}
              sendOtp={sendOtp}
              handleSubmit={handleContactMailSubmit}
              passwordValue={passwords.currentPassword}
              setPasswordValue={(val) => setPasswords({ ...passwords, currentPassword: val })}
              inputPlaceholder="New Contact Mail"
              buttonColor="yellow"
            />
          )}

          {/* Password Form */}
          {section === "password" && (
            <PasswordForm
              passwords={passwords}
              setPasswords={setPasswords}
              otp={otp}
              setOtp={setOtp}
              otpSent={otpSent}
              resendTimer={resendTimer}
              loading={loading}
              sendOtp={sendOtp}
              handleSubmit={handlePasswordSubmit}
            />
          )}

          {/* Message */}
          {message && (
            <p className="text-center text-red-400 font-semibold mt-2">{message}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ----------------- Reusable Form Components -----------------

function EmailOrContactForm({
  title,
  inputValue,
  setInputValue,
  passwordValue,
  setPasswordValue,
  otp,
  setOtp,
  otpSent,
  resendTimer,
  loading,
  sendOtp,
  handleSubmit,
  inputPlaceholder,
  buttonColor = "green",
}) {
  return (
    <form onSubmit={handleSubmit} className="bg-gray-700/50 p-6 rounded-2xl shadow-md flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      {!otpSent ? (
        <button
          type="button"
          onClick={sendOtp}
          disabled={resendTimer > 0}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            resendTimer > 0
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : `bg-${buttonColor}-500 hover:bg-${buttonColor}-600 text-white`
          }`}
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Send OTP"}
        </button>
      ) : (
        <>
          <input
            type="email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputPlaceholder}
            required
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white"
          />
          <input
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="Current Password"
            required
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white"
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-${buttonColor}-500 hover:bg-${buttonColor}-600 text-white rounded-xl font-semibold transition`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </>
      )}
    </form>
  );
}

function PasswordForm({
  passwords,
  setPasswords,
  otp,
  setOtp,
  otpSent,
  resendTimer,
  loading,
  sendOtp,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} className="bg-gray-700/50 p-6 rounded-2xl shadow-md flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-white">Change Password</h3>
      {!otpSent ? (
        <button
          type="button"
          onClick={sendOtp}
          disabled={resendTimer > 0}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            resendTimer > 0 ? "bg-gray-500 text-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Send OTP"}
        </button>
      ) : (
        <>
          <input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            placeholder="Current Password"
            required
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white"
          />
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            placeholder="New Password"
            required
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white"
          />
          <input
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
            placeholder="Confirm New Password"
            required
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white"
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </>
      )}
    </form>
  );
}
