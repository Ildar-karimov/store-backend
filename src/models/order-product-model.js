const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const OrderProduct = sequelize.define('order_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: DataTypes.INTEGER, defaultValue: 1},
  price: {type: DataTypes.INTEGER},
})

module.exports = OrderProduct