const orderProductsModel = require('../models/order-product-model')
const orderService = require('../services/orderService')
const {Op} = require("sequelize");

class OrderController {
  async getBasketProducts() {

  }

  async createProductAtBasket(req, res) {
    const {id: productId, price} = req.body
    const {id: userId} = req.user
    const {id: orderId} = await orderService.getBasket(userId)
    const orderProduct = await orderProductsModel.create({orderId, price, productId})

    return res.json(orderProduct)
  }

  async deleteProductAtBasket(req, res) {
    let {id: productId} = req.body
    const {id: userId} = req.user
    let {id: orderId} = await orderService.getBasket(userId)
    let deletedOrderProduct = await orderProductsModel.destroy({
      where: {
        [Op.and]: [{orderId}, {productId}]
      }
    })

    return res.json(deletedOrderProduct)
  }

  async getOrders() {

  }
}

module.exports = new OrderController()