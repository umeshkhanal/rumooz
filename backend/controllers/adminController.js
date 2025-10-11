const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const sendEmail = require("../utils/mailsend");
const {
  getVerificationEmail,
} = require("../utils/emailTemplate");

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    admin.verificationCode = code;
    admin.verificationExpires = new Date(Date.now() + 10 * 60 * 1000);
    await admin.save();

    res.status(403).json({
      message: "Please verify your email before login",
      email: admin.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(400).json({ message: "Email not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    admin.verificationCode = code;
    admin.verificationExpires = new Date(Date.now() + 10 * 60 * 1000);
    await admin.save();

    await sendEmail({
      to: email,
      subject: "Your Rumooz verification code",
      html: getVerificationEmail(admin.username || "Admin", code),
    });

    res.json({ message: "Verification code sent" });
  } catch {
    res.status(500).json({ message: "Error sending code" });
  }
};

exports.confirmCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(400).json({ message: "Email not found" });

    if (admin.verificationCode !== code)
      return res.status(400).json({ message: "Invalid code" });

    if (new Date() > new Date(admin.verificationExpires))
      return res.status(400).json({ message: "Code expired" });

    admin.verificationCode = null;
    admin.verificationExpires = null;
    await admin.save();

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Verified successfully", token });
  } catch {
    res.status(500).json({ message: "Error confirming code" });
  }
};

exports.changeEmail = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const { email, password, otp } = req.body;
    if (admin.verificationCode !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    admin.email = email;
    admin.verificationCode = null;
    admin.verificationExpires = null;
    await admin.save();

    res.json({ message: "Email updated successfully" });
  } catch {
    res.status(500).json({ message: "Error updating email" });
  }
};

exports.changeContactMail = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const { contact_mail, password, otp } = req.body;
    if (admin.verificationCode !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    admin.contact_mail = contact_mail;
    admin.verificationCode = null;
    admin.verificationExpires = null;
    await admin.save();

    res.json({ message: "Contact mail updated successfully" });
  } catch {
    res.status(500).json({ message: "Error updating contact mail" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const { currentPassword, newPassword, otp } = req.body;
    if (admin.verificationCode !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.verificationCode = null;
    admin.verificationExpires = null;
    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch {
    res.status(500).json({ message: "Error changing password" });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "contact_mail"],
    });
    if (!admin) return res.status(404).json({ message: "Not found" });
    res.json(admin);
  } catch {
    res.status(500).json({ message: "Error fetching admin profile" });
  }
};
