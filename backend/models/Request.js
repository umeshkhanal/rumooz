// models/Request.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // your db connection

const Request = sequelize.define(
  "Request",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    service: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "Requests", // make sure this matches your existing table
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = Request;
