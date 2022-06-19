const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const UserDataset = sequelize.define('user_dataset', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  age: {type: DataTypes.INTEGER},
  sex: {type: DataTypes.INTEGER},
  categoryId: {type: DataTypes.INTEGER},
  r2: {type: DataTypes.INTEGER},
  r3: {type: DataTypes.INTEGER},
  r4: {type: DataTypes.INTEGER},
  r5: {type: DataTypes.INTEGER},
  r6: {type: DataTypes.INTEGER},
  r7: {type: DataTypes.INTEGER},
  r8: {type: DataTypes.INTEGER},
})

module.exports = UserDataset