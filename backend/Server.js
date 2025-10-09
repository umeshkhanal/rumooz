const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const sequelize = require("./db");
const Request = require("./models/Request");
const Clients = require("./models/Clients");
const Admin = require("./models/Admin");
const sendEmail = require("./routes/mailsend");
const { authenticateToken } = require("./middleware/auth");
const {
  getAcknowledgementEmail,
  getAdminNotificationEmail,
  getAdminFormNotificationEmail,
  getVerificationEmail,
} = require("./routes/emailTemplate");

dotenv.config();
const app = express();

app.use(cors({
  origin : "https://rumooz-frontend.onrender.com"
}
));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- DATABASE CONNECTION ----------
sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch((err) => console.error("Unable to connect to database:", err));

sequelize
  .sync()
  .then(() => console.log("Database & tables synced"))
  .catch((err) => console.error("Sync error:", err));

// ---------- BASIC ROUTE ----------
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ---------- PROTECTED TEST ROUTE ----------
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "🔒 Protected route accessed", user: req.user });
});
app.post("/api/test-post", (req, res) => {
    console.log("POST received:", req.body);
    res.json({ message: "POST works!", data: req.body });
});

// ---------- ADMIN LOGIN ----------
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", req.body);
    const admin = await Admin.findOne({ where: { username } });
    console.log("Found admin:", admin?.toJSON());
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Always generate a verification code for this login attempt
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    admin.verificationCode = code;
    admin.verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await admin.save();

    return res.status(403).json({
      message: "Please verify your email before login",
      email: admin.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// ---------- SEND VERIFICATION CODE ----------
app.post("/api/admin/send-code", async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(400).json({ message: "Email not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    admin.verificationCode = code;
    admin.verificationExpires = expires;
    await admin.save();

    await sendEmail({
      to: email,
      subject: "Your Rumooz verification code",
      html: getVerificationEmail(admin.username || "Admin", code),
      text: `Your verification code is: ${code}`,
    });

    res.json({ message: "Verification code sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error sending code" });
  }
});

app.post("/api/admin/confirm-code", async (req, res) => {
  try {
    const { email, code } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(400).json({ message: "Email not found" });

    if (!admin.verificationCode || admin.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (
      admin.verificationExpires &&
      new Date() > new Date(admin.verificationExpires)
    ) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    // Clear code (optional, just to be safe)
    admin.verificationCode = null;
    admin.verificationExpires = null;
    await admin.save();

    // Generate JWT token for this session
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token valid for 1 day
    );

    res.json({ message: "Email verified successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error confirming code" });
  }
});

// ---------- CHANGE EMAIL (requires current password + OTP) ----------
app.post("/api/admin/change-email", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const { email, password, otp } = req.body;

    // Verify OTP
    if (!admin.verificationCode || admin.verificationCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (new Date() > new Date(admin.verificationExpires)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify current password
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return res.status(400).json({ message: "Incorrect current password" });

    // Update email
    admin.email = email;

    // Clear OTP
    admin.verificationCode = null;
    admin.verificationExpires = null;

    await admin.save();

    res.json({ message: "Email updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating email" });
  }
});

// ---------- CHANGE CONTACT MAIL (requires current password + OTP) ----------
app.post("/api/admin/change-contact-mail", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const { contact_mail, password, otp } = req.body;

    // Verify OTP
    if (!admin.verificationCode || admin.verificationCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (new Date() > new Date(admin.verificationExpires)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify current password
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return res.status(400).json({ message: "Incorrect current password" });

    // Update contact mail
    admin.contact_mail = contact_mail;

    // Clear OTP
    admin.verificationCode = null;
    admin.verificationExpires = null;

    await admin.save();

    res.json({ message: "Contact mail updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating contact mail" });
  }
});

// ---------- CHANGE PASSWORD (requires current password + OTP) ----------
app.post("/api/admin/change-password", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const { currentPassword, newPassword, otp } = req.body;

    // Verify OTP
    if (!admin.verificationCode || admin.verificationCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (new Date() > new Date(admin.verificationExpires)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify current password
    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid)
      return res.status(400).json({ message: "Incorrect current password" });

    // Hash and update new password
    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;

    // Clear OTP
    admin.verificationCode = null;
    admin.verificationExpires = null;

    await admin.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error changing password" });
  }
});

// GET - fetch admin info
app.get("/api/admin/profile", authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "contact_mail"], // use underscore
    });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching admin" });
  }
});

// ---------- REQUESTS ----------
app.post("/requests", async (req, res) => {
  try {
    const newRequest = await Request.create(req.body);

    // Fetch admin (your single admin)
    const admin = await Admin.findOne({
      attributes: ["id", "username", "email", "contact_mail"], // underscore
    });

    // Send acknowledgment to client
    await sendEmail({
      to: newRequest.email,
      subject: "We received your request at Rumooz",
      html: getAcknowledgementEmail(newRequest.name),
      text: `Hello ${newRequest.name},\n\nWe have received your request. Our team will contact you shortly.\n\n- Rumooz Smart Solutions`,
    });

    // Notify admin using contact_mail
    await sendEmail({
      to: admin.contact_mail, // <-- use contact_mail from DB
      subject: "New Request Received",
      html: getAdminNotificationEmail(newRequest),
      text: `A new request has been submitted.`,
    });

    res.status(201).json({
      message: "Request submitted and email sent",
      data: newRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/requests", async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ---------- CONTACT FORM ----------
app.post("/contact", async (req, res) => {
  try {
    let { name, email, phone, whatsapp, message } = req.body;
    phone = "+" + phone;
    console.log("📩 Contact form data received:", req.body);
    // Fetch the single admin (no ID needed)
    const admin = await Admin.findOne({
      attributes: ["id", "username", "email", "contact_mail"], // underscore
    });
    console.log(admin);
    if (!admin || !admin.contact_mail) {
      return res.status(500).json({ message: "Admin contact email not found." });
    }

    // Send notification to admin
    await sendEmail({
      to: admin.contact_mail, // use contact_mail from DB
      subject: "New Contact Form Submission",
      html: getAdminFormNotificationEmail({
        name,
        email,
        phone,
        whatsapp,
        message,
      }),
      text: "New form submitted",
    });

    res.status(200).json({ message: "Form submitted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// ---------- TEAM SECTION ----------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST - add new member
app.post("/api/team", upload.single("photo"), async (req, res) => {
  try {
    const { name, business, location } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const member = await Clients.create({
      name,
      business,
      location,
      photo,
    });

    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add team member" });
  }
});

// GET - fetch all members
app.get("/api/team", async (req, res) => {
  try {
    const members = await Clients.findAll({ order: [["id", "ASC"]] });
        console.log("team successfully");
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

app.put("/api/team/:id", upload.single("photo"), async (req, res) => {
  try {
    const { name, business, location } = req.body;
    const newPhoto = req.file ? `/uploads/${req.file.filename}` : undefined;

    const member = await Clients.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({ error: "Team member not found" });

    // Delete old photo if a new one is uploaded
    if (newPhoto && member.photo) {
      const oldPhotoPath = path.join(__dirname, member.photo);
      fs.unlink(oldPhotoPath, (err) => {
        if (err) console.error("Failed to delete old photo:", err);
      });
    }

    await member.update({
      name,
      business,
      location,
      ...(newPhoto && { photo: newPhoto }),
    });

    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update team member" });
  }
});


// 🔹 Function to initialize Admin table if empty
const initializeAdmin = async () => {
  try {
    // Ensure Admin table exists
    await Admin.sync(); // or await sequelize.sync({ alter: true }) for all tables

    // Check if there are any admins
    const count = await Admin.count();
    if (count === 0) {
      console.log("Admin table is empty. Creating default admin...");

      const hashedPassword = await bcrypt.hash("admin123", 10);

      await Admin.create({
        username: "rumooz",
        email: "khanalumesh14@gmail.com",
        password: hashedPassword,
        contact_mail: "khanalumesh14@gmail.com",
      });

      console.log("Default admin created successfully.");
    } else {
      console.log("Admin table already has data. Skipping initialization.");
    }
  } catch (err) {
    console.error("Error initializing admin table:", err);
  }
};



const startServer = async () => {
  try {
    // Connect to DB
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");

    // Sync all tables
    await sequelize.sync({ alter: true });
    console.log("Database & tables synced");

    // Initialize default admin if table is empty
    await initializeAdmin();

    // Start server
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();














