const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const sequelize = require("./db");

dotenv.config();
const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors({
  origin:"https://rumooz-frontend.onrender.com",
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- ROUTES ----------
const adminRoutes = require("./routes/adminRoutes");
const requestRoutes = require("./routes/requestRoutes");
const contactRoutes = require("./routes/contactRoutes");
const teamRoutes = require("./routes/clientRoutes");

// ---------- DATABASE CONNECTION ----------
sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ Unable to connect to database:", err));

sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Database & tables synced"))
  .catch((err) => console.error("❌ Sync error:", err));

// ---------- BASIC ROUTE ----------
app.get("/", (req, res) => {
  res.send("🚀 Rumooz Smart Solutions API is running...");
});

// ---------- API ROUTES ----------
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/team", teamRoutes);

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));

