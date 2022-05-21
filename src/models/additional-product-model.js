const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const additionalProduct = sequelize.define('additional_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  addProductId: {type: DataTypes.INTEGER, allowNull: false},
})

module.exports = additionalProduct