const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const PayType = sequelize.define('pay_type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

module.exports = PayType