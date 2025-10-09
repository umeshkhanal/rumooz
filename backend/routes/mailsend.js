// models/mailsend.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// ----- Create transporter -----
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // e.g., mail.rumz.ae
  port: process.env.MAIL_PORT, // e.g., 465
  secure: process.env.MAIL_SECURE === "true", // true for 465
  auth: {
    user: process.env.MAIL_USER, // e.g., info@rumooz.ae
    pass: process.env.MAIL_PASS, // your password
  },
  tls: {
    rejectUnauthorized: false, // bypass cert issues if needed
  },
});

// ----- Function to send email -----
async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"Rumooz Smart Solutions" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}

// ----- Export -----
module.exports = sendEmail;
