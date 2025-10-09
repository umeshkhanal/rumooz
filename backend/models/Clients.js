const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Clients = sequelize.define("Clients", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  business: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  photo: { type: DataTypes.STRING },
});

module.exports = Clients;
