const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Order = sequelize.define('order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  status: {type: DataTypes.INTEGER, defaultValue: 0},
  sum_total: {type: DataTypes.INTEGER},
  start_date: {type: DataTypes.DATE},
  end_date: {type: DataTypes.DATE},
})

module.exports = Order