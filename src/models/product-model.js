const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  count: {type: DataTypes.INTEGER, allowNull: false},
  additional_products: {type: DataTypes.JSON},
  img: {type: DataTypes.STRING},
})

module.exports = Product