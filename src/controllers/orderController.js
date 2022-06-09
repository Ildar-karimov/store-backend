const orderProductsModel = require('../models/order-product-model')
const orderService = require('../services/orderService')
const {Op} = require("sequelize");
const {Order} = require("../models/models");

class OrderController {
  async getBasketProducts(req, res) {
    const {id: userId} = req.user
    const {id: orderId} = await orderService.getBasket(userId)
    const productsData = await orderService.getProductsOfOrder(orderId)

    return res.json(productsData)
  }

  async createOrder(req, res) {
    const {id: userId} = req.user
    const {id: orderId} = await orderService.getBasket(userId)
    let orderData = await orderService.changeOrderStatus(orderId, 1)
    await Order.create({userId})

    return res.json(orderData)
  }

  async finishOrder(req, res) {
    const {orderId} = req.body
    return res.json(await orderService.changeOrderStatus(orderId, 2))
  }

  async createProductAtBasket(req, res) {
    const {id: productId, price} = req.body
    const {id: userId} = req.user
    const {id: orderId} = await orderService.getBasket(userId)
    const orderProduct = await orderProductsModel.create({orderId, price, productId})

    return res.json(orderProduct)
  }

  async deleteProductAtBasket(req, res) {
    const {id: productId} = req.params
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