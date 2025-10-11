const path = require("path");
const fs = require("fs");
const Clients = require("../models/Clients");

// Add new team member (Client)
exports.addTeamMember = async (req, res) => {
  try {
    const { name, business, location } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const member = await Clients.create({
      name,
      business,
      location,
      photo,
    });

    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add team member" });
  }
};

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    const members = await Clients.findAll({ order: [["id", "ASC"]] });
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
};

// Update a team member
exports.updateTeamMember = async (req, res) => {
  try {
    const { name, business, location } = req.body;
    const newPhoto = req.file ? `/uploads/${req.file.filename}` : undefined;

    const member = await Clients.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({ error: "Team member not found" });

    // Delete old photo if new one uploaded
    if (newPhoto && member.photo) {
      const oldPhotoPath = path.join(__dirname, "..", member.photo);
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
};
