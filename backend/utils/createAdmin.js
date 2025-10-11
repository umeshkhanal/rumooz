// scripts/createAdmin.js
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const Admin = require("../models/Admin");
const sequelize = require("../db");

(async () => {
  try {
    await sequelize.authenticate();
    const username = process.argv[2] || "umeshkhanal";
    const email = process.argv[3] || "khanalumesh14@gmail.com";
    const password = process.argv[4] || "Admin@123";

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const [admin, created] = await Admin.findOrCreate({
      where: { username },
      defaults: { email, password: hashed, isVerified: false },
    });

    if (!created) {
      console.log("Admin already exists. Updating password & email.");
      admin.password = hashed;
      admin.email = email;
      await admin.save();
    }

    console.log(`Admin ready: username=${username}, email=${email}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
