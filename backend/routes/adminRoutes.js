const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  sendCode,
  confirmCode,
  changeEmail,
  changeContactMail,
  changePassword,
  getAdminProfile,
} = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/auth");

router.post("/login", loginAdmin);
router.post("/send-code", sendCode);
router.post("/confirm-code", confirmCode);
router.post("/change-email", changeEmail);
router.post("/change-contact-mail", changeContactMail);
router.post("/change-password", changePassword);
router.get("/profile", authenticateToken, getAdminProfile);

module.exports = router;
