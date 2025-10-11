const Request = require("../models/Request");
const Admin = require("../models/Admin");
const sendEmail = require("../utils/mailsend");
const {
  getAcknowledgementEmail,
  getAdminNotificationEmail,
} = require("../utils/emailTemplate");

// Create new quotation request
exports.createRequest = async (req, res) => {
  try {
    const newRequest = await Request.create(req.body);

    const admin = await Admin.findOne({
      attributes: ["id", "username", "email", "contact_mail"],
    });

    if (!admin || !admin.contact_mail)
      return res
        .status(500)
        .json({ message: "Admin contact email not found." });

    // Send acknowledgment to client
    await sendEmail({
      to: newRequest.email,
      subject: "We received your request at Rumooz",
      html: getAcknowledgementEmail(newRequest.name),
      text: `Hello ${newRequest.name},\n\nWe have received your request. Our team will contact you shortly.\n\n- Rumooz Smart Solutions`,
    });

    // Notify admin
    await sendEmail({
      to: admin.contact_mail,
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
};

// Fetch all requests (for admin dashboard)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({ order: [["id", "DESC"]] });
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
