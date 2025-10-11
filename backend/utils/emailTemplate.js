// utils/emailTemplates.js
const path = require("path");
const fs = require("fs");

// optional logo base64 if you have a logo.jpg in same folder
let logoImg = "";
try {
  const logoPath = path.join(__dirname, "./logo.jpg"); // adjust if needed
  const logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
  logoImg = `data:image/jpeg;base64,${logoBase64}`;
} catch (e) {
  // no logo found — safe to ignore
  logoImg = "";
}

// Your existing templates (I included the ones you sent earlier)
function getAcknowledgementEmail(name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Thank you for contacting Rumooz</title></head>
  <body style="font-family: 'Inter', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <div style="background-color: #16a34a; color: #ffffff; text-align: center; padding: 1.5rem; border-radius: 0.75rem 0.75rem 0 0;">
        <h1 style="margin: 0; font-size: 1.5rem; font-weight: 700;">Rumooz Smart Solutions</h1>
      </div>
      <div style="padding: 1.5rem 0; color: #1f2937; line-height: 1.6;">
        <p style="margin-bottom: 1rem;">Hello ${name},</p>
        <p style="margin-bottom: 1rem;">Thank you for contacting Rumooz. We have received your request and our team will reach out to you shortly.</p>
        <p style="margin-bottom: 1rem;">If you have urgent inquiries, you can reply to this email or contact us at <a href="mailto:info@rumooz.ae" style="color: #16a34a; text-decoration: underline;">info@rumooz.ae</a>.</p>
        <a href="https://rumooz.ae" style="display: inline-block; background-color: #16a34a; color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 0.375rem; text-decoration: none; font-weight: 600; margin-top: 1rem;">Visit Our Website</a>
      </div>
      <div style="font-size: 0.875rem; color: #6b7280; text-align: center; margin-top: 2rem; line-height: 1.4;">
        &copy; ${new Date().getFullYear()} Rumooz Smart Solutions. All rights reserved.<br>
        This is an automated email, please do not reply.
      </div>
    </div>
  </body>
  </html>
  `;
}

function getAdminNotificationEmail(requestData) {
  const { name, email, phone, country, city, service, message } = requestData;
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>New Request Notification</title></head>
  <body style="font-family: 'Inter', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <div style="background-color: #16a34a; color: #ffffff; text-align: center; padding: 1.5rem; border-radius: 0.75rem 0.75rem 0 0;">
        <h1 style="margin: 0; font-size: 1.5rem; font-weight: 700;">New Request Received</h1>
      </div>
      <div style="padding: 1.5rem 0; color: #1f2937; line-height: 1.6;">
        <p style="margin-bottom: 1rem;">A new request has been submitted via the website. Here are the details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
          <tr><td style="padding: 0.5rem; font-weight: 600; width: 30%;">Name:</td><td style="padding: 0.5rem;">${name}</td></tr>
          <tr style="background-color: #f9fafb;"><td style="padding: 0.5rem; font-weight: 600;">Email:</td><td style="padding: 0.5rem;">${email}</td></tr>
          <tr><td style="padding: 0.5rem; font-weight: 600;">Phone:</td><td style="padding: 0.5rem;">${phone}</td></tr>
          <tr style="background-color: #f9fafb;"><td style="padding: 0.5rem; font-weight: 600;">Country:</td><td style="padding: 0.5rem;">${country}</td></tr>
          <tr><td style="padding: 0.5rem; font-weight: 600;">City:</td><td style="padding: 0.5rem;">${city}</td></tr>
          <tr style="background-color: #f9fafb;"><td style="padding: 0.5rem; font-weight: 600;">Service:</td><td style="padding: 0.5rem;">${service}</td></tr>
          <tr><td style="padding: 0.5rem; font-weight: 600;">Message:</td><td style="padding: 0.5rem;">${
            message || "N/A"
          }</td></tr>
        </table>
        <p style="margin-top: 1.5rem;">Please follow up with the client as soon as possible.</p>
        <a href="https://rumooz.ae" style="display: inline-block; background-color: #16a34a; color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 0.375rem; text-decoration: none; font-weight: 600; margin-top: 1rem;">Visit Website</a>
      </div>
      <div style="font-size: 0.875rem; color: #6b7280; text-align: center; margin-top: 2rem; line-height: 1.4;">
        &copy; ${new Date().getFullYear()} Rumooz Smart Solutions. All rights reserved.<br>
        This is an automated notification.
      </div>
    </div>
  </body>
  </html>
  `;
}

function getAdminFormNotificationEmail(formData) {
  const { name, email, phone, whatsapp, message } = formData;
  return `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong><br/> ${message}</p>
          <p style="margin-top: 20px; font-size: 12px; color: #555;">This is an automated notification from Rumooz website.</p>
        </div>
      </body>
    </html>
  `;
}

function getVerificationEmail(name, code) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Email Verification - Rumooz Smart Solutions</title></head>
  <body style="font-family: 'Inter', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <div style="background-color: #16a34a; color: #ffffff; text-align: center; padding: 1.5rem; border-radius: 0.75rem 0.75rem 0 0;">
        <h1 style="margin: 0; font-size: 1.5rem; font-weight: 700;">Verify Your Email</h1>
      </div>
      <div style="padding: 1.5rem 0; color: #1f2937; line-height: 1.6;">
        <p>Hello ${name || "Admin"},</p>
        <p>To complete your action, please verify your email address using the code below:</p>

        <div style="text-align: center; margin: 1.5rem 0;">
          <div style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 1.5rem; font-weight: bold; padding: 1rem 2rem; border-radius: 0.5rem;">
            ${code}
          </div>
        </div>
        <p>This code will expire in 10 minutes. If you didn’t request this verification, you can safely ignore this email.</p>
      </div>
      <div style="font-size: 0.875rem; color: #6b7280; text-align: center; margin-top: 2rem; line-height: 1.4;">
        &copy; ${new Date().getFullYear()} Rumooz Smart Solutions. All rights reserved.<br>
        This is an automated email, please do not reply.
      </div>
    </div>
  </body>
  </html>
  `;
}

module.exports = {
  getAcknowledgementEmail,
  getAdminNotificationEmail,
  getAdminFormNotificationEmail,
  getVerificationEmail,
};
