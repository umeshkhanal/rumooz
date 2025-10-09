import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [popup, setPopup] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // Countdown timer for resending OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Update login state globally
  const syncLoginState = () => window.dispatchEvent(new Event("storage"));

  // ---------------- LOGIN ----------------
  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerifyMessage("");

    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("Login response:", res);
      const data = await res.json();
      console.log("Login data:", data);

      if (res.status === 403 && data.email) {
        setEmail(data.email);
        setShowVerify(true);
        await sendVerificationCode(data.email, true);
        return;
      }

      if (!res.ok) throw new Error(data.message || "Login failed");

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", "admin");
      syncLoginState();

      setPopup("success");
      setPopupMessage("✅ Login successful!");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      setPopup("error");
      setPopupMessage(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SEND VERIFICATION CODE ----------------
  const sendVerificationCode = async (email, initial = false) => {
    if (resendTimer > 0) return;

    try {
      const res = await fetch(`${API}/api/admin/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("Send code response:", data);

      if (!res.ok) throw new Error(data.message || "Failed to send code");

      setVerifyMessage(
        initial ? "✅ Verification code sent to your email" : "✅ New code sent!"
      );
      setResendTimer(30);
    } catch (err) {
      console.error("Send code error:", err);
      setVerifyMessage(err.message || "⚠️ Failed to send verification code");
    }
  };

  // ---------------- CONFIRM VERIFICATION CODE ----------------
  const confirmCode = async () => {
    if (!code) return setVerifyMessage("⚠️ Enter the verification code");
    setLoading(true);
    setVerifyMessage("");

    try {
      const res = await fetch(`${API}/api/admin/confirm-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      console.log("Confirm code data:", data);

      if (!res.ok) throw new Error(data.message || "Verification failed");

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", "admin");
      syncLoginState();

      setPopup("success");
      setPopupMessage("✅ Email verified successfully!");
      setShowVerify(false);
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      console.error("Confirm code error:", err);
      setVerifyMessage(err.message || "⚠️ Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      <motion.div
        className="bg-gray-800/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Admin Login
        </h2>

        {!showVerify ? (
          <form onSubmit={submitLogin} className="space-y-6">
            <div>
              <label className="text-gray-200 font-medium mb-1">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Your Username"
                required
                className="w-full px-5 py-3 rounded-xl bg-gray-700/80 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-gray-200 font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your Password"
                required
                className="w-full px-5 py-3 rounded-xl bg-gray-700/80 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-lg transition shadow-lg disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        ) : (
          <div className="mt-6 bg-gray-700/70 p-6 rounded-xl border border-gray-600 space-y-4">
            <p className="text-gray-200 text-sm">
              Enter the verification code sent to ({email})
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Verification code"
              className="w-full px-4 py-2 rounded-xl bg-gray-600/80 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-green-500 outline-none transition"
            />
            {verifyMessage && (
              <p
                className={`text-sm ${
                  verifyMessage.startsWith("✅") ? "text-green-400" : "text-red-400"
                }`}
              >
                {verifyMessage}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={confirmCode}
                disabled={loading}
                className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button
                onClick={() => sendVerificationCode(email)}
                disabled={loading || resendTimer > 0}
                className={`flex-1 py-2 rounded-xl font-medium transition ${
                  resendTimer > 0
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
              </button>
            </div>
          </div>
        )}

        {popup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl space-y-4"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                className={`text-2xl font-bold ${
                  popup === "success" ? "text-green-700" : "text-red-600"
                }`}
              >
                {popup === "success" ? "Success!" : "Error!"}
              </h3>
              <p className="text-gray-700">{popupMessage}</p>
              <button
                onClick={() => setPopup(null)}
                className={`mt-4 px-6 py-2 rounded-xl font-semibold transition ${
                  popup === "success"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
