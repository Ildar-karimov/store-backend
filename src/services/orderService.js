const orderModel = require("../models/order-model");
const orderProductsModel = require('../models/order-product-model')
const {Op} = require("sequelize");
const {Product} = require("../models/models");
const productService = require('./productService')

class OrderService {
  async getBasket(userId) {
    return await orderModel.findOne({
      where: {
        [Op.and]: [{userId}, {status: 0}]
      }
    })
  }

  async getProductsOfOrder(orderId) {
    const productIds = await orderProductsModel.findAll({
      attributes: ['productId'],
      where: {orderId}
    })
    const products = await Product.findAll({
      where: {
        id: {
          [Op.or]: Array.from(productIds.map(i => i.productId))
        }
      }
    })
    return productService.formatProducts(products)
  }
}

module.exports = new OrderService()