const Admin = require("../models/Admin");
const sendEmail = require("../utils/mailsend");
const { getAdminFormNotificationEmail } = require("../utils/emailTemplate");

// Handle contact form submissions
exports.submitContactForm = async (req, res) => {
  try {
    let { name, email, phone, whatsapp, message } = req.body;
    phone = "+" + phone;

    const admin = await Admin.findOne({
      attributes: ["id", "username", "email", "contact_mail"],
    });

    if (!admin || !admin.contact_mail) {
      return res
        .status(500)
        .json({ message: "Admin contact email not found." });
    }

    await sendEmail({
      to: admin.contact_mail,
      subject: "New Contact Form Submission",
      html: getAdminFormNotificationEmail({
        name,
        email,
        phone,
        whatsapp,
        message,
      }),
      text: "New contact form submitted.",
    });

    res.status(200).json({ message: "Form submitted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};
