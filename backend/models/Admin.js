// models/Admin.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Admin = sequelize.define("Admin", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_mail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true },
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verificationExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Admin;
