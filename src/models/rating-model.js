const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  info: {type: DataTypes.STRING, unique: true, allowNull: false},
  rate: {type: DataTypes.INTEGER, allowNull: false},
  date: {type: DataTypes.DATE, allowNull: false},
})

module.exports = Rating