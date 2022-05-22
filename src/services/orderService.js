const orderModel = require("../models/order-model");
const {Op} = require("sequelize");

class OrderService {
  async getBasket(userId) {
    return await orderModel.findOne({
      where: {
        [Op.and]: [{userId}, {status: 0}]
      }
    })
  }
}

module.exports = new OrderService()