import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { API_URL } from "../api";

export default function Clients() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    location: "",
    photo: null,
  });
  const [preview, setPreview] = useState(null);

  const isAdmin = !!sessionStorage.getItem("token");

  // Fetch clients
  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_URL}/api/team`);
      const data = await res.json();
      setTeam(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Modal handlers
  const openModal = (member = null) => {
    if (!isAdmin) return;
    if (member) {
      setEditingId(member.id);
      setFormData({
        name: member.name,
        business: member.business,
        location: member.location,
        photo: null,
      });
      setPreview(member.photo ? `${process.env.REACT_APP_API_URL}${member.photo}` : null);

    } else {
      setEditingId(null);
      setFormData({ name: "", business: "", location: "", photo: null });
      setPreview(null);
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const form = new FormData();
    Object.entries(formData).forEach(([k, v]) => form.append(k, v));

    try {
      const url = editingId
        ? `${process.env.REACT_APP_API_URL}/api/team/${editingId}`
        : `${process.env.REACT_APP_API_URL}/api/team`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: form });
      if (!res.ok) throw new Error("Failed to save client");

      await fetchTeam();
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: "", business: "", location: "", photo: null });
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed. Try again.");
    }
    window.location.reload();
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-gray-900 via-blue-900 to-green-800 text-white min-h-screen flex flex-col pt-40 py-24 px-6 md:px-20 font-sans">
      {/* Header */}
{/* Header */}
<div
  className="flex flex-col md:flex-row items-center mb-16 max-w-7xl mx-auto gap-6"
>
  <div
    className={`space-y-2 
      ${isAdmin ? "text-center md:text-left" : "text-center w-full"}`}
  >
    <h2 className="text-5xl font-bold">
      Our <span className="text-green-400">Partners</span>
    </h2>
    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
      Meet our partners. Rumooz Smart Solutions believes in serving partners at its best.
    </p>
  </div>

  {isAdmin && (
    <button
      onClick={() => openModal()}
      className="flex items-center gap-2 bg-green-700 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
    >
      <Plus size={20} /> Add Partner
    </button>
  )}
</div>


      {/* Team Grid */}
      <div className="flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="text-center text-gray-300 text-lg">
            Loading partners...
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {team.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                className="flex flex-col bg-gray-800 bg-opacity-70 rounded-2xl shadow-lg hover:shadow-green-700/30 overflow-hidden transition-transform hover:-translate-y-2"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={
                      member.photo
                        ? `${process.env.REACT_APP_API_URL}${member.photo}`
                        : "/default-avatar.png"
                    }
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center space-y-1">
                  <h3 className="text-xl font-semibold text-green-400">
                    {member.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{member.business}</p>
                  <p className="text-gray-400 text-sm">{member.location}</p>
                  {isAdmin && (
                    <div className="flex justify-center gap-2 mt-2">
                      <button
                        onClick={() => openModal(member)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {showModal && isAdmin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 text-white rounded-2xl p-8 w-full max-w-lg shadow-2xl relative border border-gray-700"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={22} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-green-400">
              {editingId ? "Edit Client" : "Add New Client"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "business", "location"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                />
              ))}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-gray-400"
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 mt-2 object-cover rounded-lg"
                />
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-green-700 hover:bg-green-900 font-semibold transition"
              >
                {editingId ? "Update Client" : "Add Client"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}

