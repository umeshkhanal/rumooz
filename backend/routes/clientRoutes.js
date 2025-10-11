const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  addTeamMember,
  getAllTeamMembers,
  updateTeamMember,
} = require("../controllers/clientController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("photo"), addTeamMember);
router.get("/", getAllTeamMembers);
router.put("/:id", upload.single("photo"), updateTeamMember);

module.exports = router;
