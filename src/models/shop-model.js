const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Shop = sequelize.define('shop', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  address: {type: DataTypes.STRING, allowNull: false},
})

module.exports = Shop