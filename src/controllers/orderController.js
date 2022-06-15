const orderProductsModel = require('../models/order-product-model')
const orderService = require('../services/orderService')
const {Op} = require("sequelize");
const {Order, Product} = require("../models/models");
const orderModel = require("../models/order-model");

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
    return res.json(await orderService.changeOrderStatus(orderId, 3))
  }

  async readyToFinishOrder(req, res) {
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

  async getUserOrders(req, res) {
    const {id: userId} = req.user
    let userOrders = await orderModel.findAll({
      where: {
        [Op.or]: [{status: 1}, {status: 2}, {status: 3}],
        userId,
      },
    })
    for (const el of userOrders) {
      el.setDataValue('products', await orderService.getProductsOfOrder(el.id))
    }
    return res.json(userOrders)
  }

  async getAllOrders(req, res) {
    let orders = await orderModel.findAll({
      where: {
        [Op.or]: [{status: 1}, {status: 2}, {status: 3}],
      },
      include: [{
        model: orderProductsModel,
        attributes: ["productId"]
      }]
    })

    for (const el of orders) {
      el.setDataValue('products', await orderService.getProductsOfOrder(el.id))
    }
    return res.json(orders)
  }
}

module.exports = new OrderController()